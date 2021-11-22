const HomeworkService = require('./HomeWorkService');
exports.AddHomeWork = async (req,res) =>{
    var HomeworkInfo = {...req.body, startday : getCurrentTime() }
    console.log(HomeworkInfo);
    // Validation
    try{
        if(!(await HomeworkService.CheckClass(HomeworkInfo.idclass)))
            res.status(400).json({message: "Class not found", data:HomeworkInfo}) 
        if(!(await HomeworkService.CheckGradeStructure(isTimestamp.idgradestructure) ))
            res.status(400).json({message: "GradeStructure not found", data:HomeworkInfo}) 
      
    }catch(err){
        console.log(err)
        res.status(400).json({message: "Validation process error", data:HomeworkInfo })
    }
    if(!isTimestamp(HomeworkInfo.endday))
        res.status(400).json({message: "Time error", data:HomeworkInfo}) 
    else{
        if(!await HomeworkService.AddHomeWork(HomeworkInfo)){
            res.status(400).json({message: "Storaged error", data:HomeworkInfo })
        }else{
            res.status(200).json({message: "Successful", data:HomeworkInfo })
        }
    }
   
}

function isTimestamp(input){
    let endTime = null 
    let currentdate = new Date();
    try {
        endTime = Date.parse(input, "yyyy/MM/dd HH:mm:ss");
    } catch (error) {
        console.log(error)
    }
    if(isNaN(endTime))
        return false
    console.log(currentdate.getTime() - endTime)
    if (currentdate.getTime() - endTime > 0)
        return false
    
    return true
}

function getCurrentTime(){
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + ( date_ob.getHours())).slice(-2);

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
