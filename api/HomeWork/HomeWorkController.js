const HomeworkService = require('./HomeWorkService');
exports.AddHomeWork = async (req,res) =>{
    // let userData = null;
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    // ) {
    //     var authToken = req.headers.authorization.split(" ")[1];
    //     try {
    //     userData = jwt.verify(authToken, process.env.JWT_SECRET);
    //     } catch (err) {
    //     res.status(404).json({
    //         message: "User not valid",
    //     });
    //     }
    // } else {
    //     res.status(404).json({
    //     message: "User not valid",
    //     });
    // }
   
    var HomeworkInfo = {...req.body, startday : getCurrentTime() }
    console.log(HomeworkInfo);
    // Validation
    try{
        // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
        //     res.status(400).json({message: "Only teacher can create homework"}) 
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
exports.UpdateHomeWork = async (req,res) =>{
    // let userData = null;
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    // ) {
    //     var authToken = req.headers.authorization.split(" ")[1];
    //     try {
    //     userData = jwt.verify(authToken, process.env.JWT_SECRET);
    //     } catch (err) {
    //     res.status(404).json({
    //         message: "User not valid",
    //     });
    //     }
    // } else {
    //     res.status(404).json({
    //     message: "User not valid",
    //     });
    // }

    var UpdateInfo = {...req.body }
    console.log(UpdateInfo);
    // Validation
    try{
        // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
        //     res.status(400).json({message: "Only teacher can change homework"}) 
        if(!(await HomeworkService.CheckHomeWork(UpdateInfo.id)))
            res.status(400).json({message: "HomeWork not found", data:UpdateInfo}) 
    }catch(err){
        console.log(err)
        res.status(400).json({message: "Validation process error", data:UpdateInfo })
    }
    if(!isTimestamp(UpdateInfo.endday))
        res.status(400).json({message: "Time error", data:UpdateInfo}) 
    else{
        if(!await HomeworkService.UpdateHomeWork(UpdateInfo)){
            res.status(400).json({message: "Storaged error", data:UpdateInfo })
        }else{
            res.status(200).json({message: "Successful", data:UpdateInfo })
        }
    }
   
}

exports.RemoveHomeWork = async (req,res) =>{
    // let userData = null;
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    // ) {
    //     var authToken = req.headers.authorization.split(" ")[1];
    //     try {
    //     userData = jwt.verify(authToken, process.env.JWT_SECRET);
    //     } catch (err) {
    //     res.status(404).json({
    //         message: "User not valid",
    //     });
    //     }
    // } else {
    //     res.status(404).json({
    //     message: "User not valid",
    //     });
    // }
    
    var HomoWorkID = {...req.body }
    console.log(HomoWorkID);
    // Validation
    try{
        // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
        //     res.status(400).json({message: "Only teacher can remove homework"}) 
        if(!(await HomeworkService.CheckHomeWork(HomoWorkID.id)))
            res.status(400).json({message: "HomeWork not found", data:HomoWorkID}) 
    }catch(err){
        console.log(err)
        res.status(400).json({message: "Validation process error", data:HomoWorkID })
    }
    
    if(!await HomeworkService.RemoveHomeWork(HomoWorkID)){
        res.status(400).json({message: "Storaged error", data:HomoWorkID })
    }else{
        res.status(200).json({message: "Successful", data:HomoWorkID })
    }       
   
}

exports.GetHomeWorkByClassID = async (req, res) => {
    // let userData = null;
    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.split(" ")[0] === "Bearer"
    // ) {
    //   var authToken = req.headers.authorization.split(" ")[1];
    //   try {
    //     userData = jwt.verify(authToken, process.env.JWT_SECRET);
    //   } catch (err) {
    //     res.status(404).json({
    //       message: "User not valid",
    //     });
    //   }
    // } else {
    //   res.status(404).json({
    //     message: "User not valid",
    //   });
    // }
    var classID = req.query.classid 
    console.log(classID)
    try {
        // if(!await HomeworkService.CheckTeacher(HomeWorkID, userData.id))
        //     res.status(400).json({message: "Only teacher can remove homework"}) 
        if(!(await HomeworkService.CheckClass(classID)))
            res.status(400).json({message: "Class not found", data:{classId: classID}}) 
        const homeWorks = await HomeworkService.GetHomeWorkByClassID(classID)
        res.status(200).json({message: "Successful", data:homeWorks})
    } catch (err) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(404).json({
        message: "Error processing",
        });
    }
  };

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
