const HomeworkService = require("./HomeWorkService");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.AddHomeWork = async (req, res) => {
  let userData = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var authToken = req.headers.authorization.split(" ")[1];
    try {
      userData = jwt.verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      res.status(404).json({
        message: "User not valid",
        success: false,
      });
    }
  } else {
    res.status(404).json({
      message: "User not valid",
      success: false,
    });
  }
  var HomeworkInfo = { ...req.body, startday: getCurrentTime() };
  // Validation
  try {
    // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
    //     res.status(400).json({message: "Only teacher can create homework"})
    if (!(await HomeworkService.CheckClass(HomeworkInfo.idclass))) {
      res.status(400).json({
        message: "Class not found",
        data: HomeworkInfo,
        success: false,
      });
      return;
    }
    if (
      !(await HomeworkService.CheckGradeStructure(
        HomeworkInfo.idgradestructure
      ))
    ) {
      res.status(400).json({
        message: "GradeStructure not found",
        data: HomeworkInfo,
        success: false,
      });

      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Validation process error",
      data: HomeworkInfo,
      success: false,
    });

    return;
  }
  if (!isTimestamp(HomeworkInfo.endday)) {
    res
      .status(400)
      .json({ message: "Time error", data: HomeworkInfo, success: false });
  } else {
    const _id = uuidv4();

    if (!(await HomeworkService.AddHomeWork(HomeworkInfo, _id))) {
      res.status(400).json({
        message: "Storaged error",
        data: HomeworkInfo,
        success: false,
      });

      return;
    } else {
      res
        .status(200)
        .json({
          message: "Successful",
          data: { ...HomeworkInfo, id: _id },
          success: true,
        });
    }
  }
};
exports.UpdateHomeWork = async (req, res) => {
  let userData = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var authToken = req.headers.authorization.split(" ")[1];
    try {
      userData = jwt.verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      res.status(404).json({
        message: "User not valid",
        success: false,
      });
    }
  } else {
    res.status(404).json({
      message: "User not valid",
      success: false,
    });
  }
  var UpdateInfo = { ...req.body };
  // Validation
  try {
    // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
    //     res.status(400).json({message: "Only teacher can change homework"})
    if (!(await HomeworkService.CheckHomeWork(UpdateInfo.id))){
      res.status(400).json({
        message: "HomeWork not found",
        data: UpdateInfo,
        success: false,
      });
      return
    }
    if (
      !(await HomeworkService.CheckGradeStructure(UpdateInfo.idgradestructure))
    ) {
      res.status(400).json({
        message: "GradeStructure not found",
        data: HomeworkInfo,
        success: false,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Validation process error",
      data: UpdateInfo,
      success: false,
    });
    return;
  }
  if (!isTimestamp(UpdateInfo.endday)) {
    res
      .status(400)
      .json({ message: "Time error", data: UpdateInfo, success: false });
    return;
  } else {
    if (!(await HomeworkService.UpdateHomeWork(UpdateInfo))) {
      res
        .status(400)
        .json({ message: "Storaged error", data: UpdateInfo, success: false });
    } else {
      res
        .status(200)
        .json({ message: "Successful", data: UpdateInfo, success: true });
    }
  }
};

exports.RemoveHomeWork = async (req, res) => {
  let userData = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var authToken = req.headers.authorization.split(" ")[1];
    try {
      userData = jwt.verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      res.status(404).json({
        message: "User not valid",
        success: false,
      });
    }
  } else {
    res.status(404).json({
      message: "User not valid",
      success: false,
    });
  }

  var HomoWorkID = { ...req.body };
  // Validation
  try {
    // if(!await HomeworkService.CheckTeacher(HomeworkInfo.idclass, userData.id))
    //     res.status(400).json({message: "Only teacher can remove homework"})
    if (!(await HomeworkService.CheckHomeWork(HomoWorkID.id)))
      res.status(400).json({ message: "HomeWork not found", data: HomoWorkID,success: false, });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Validation process error", data: HomoWorkID,success: false, });
  }

  if (!(await HomeworkService.RemoveHomeWork(HomoWorkID))) {
    res.status(400).json({ message: "Storaged error", data: HomoWorkID,success: false, });
  } else {
    res.status(200).json({ message: "Successful", data: HomoWorkID,success: true, });
  }
};

exports.GetHomeWorkByClassID = async (req, res) => {
  let userData = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var authToken = req.headers.authorization.split(" ")[1];
    try {
      userData = jwt.verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      res.status(404).json({
        message: "User not valid",
      });
    }
  } else {
    res.status(404).json({
      message: "User not valid",
    });
  }
  var classID = req.query.classid;
  try {
    // if(!await HomeworkService.CheckTeacher(HomeWorkID, userData.id))
    //     res.status(400).json({message: "Only teacher can remove homework"})
    if (!(await HomeworkService.CheckClass(classID)))
      res
        .status(400)
        .json({ message: "Class not found", data: { classId: classID } });
    const homeWorks = await HomeworkService.GetHomeWorkByClassID(classID);
    res.status(200).json({ message: "Successful", data: homeWorks });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "Error processing",
    });
  }
};

function isTimestamp(input) {
  let endTime = null;
  let currentdate = new Date();
  try {
    endTime = Date.parse(input, "yyyy/MM/dd HH:mm:ss");
  } catch (error) {
    console.log(error);
  }
  if (isNaN(endTime)) return false;
  console.log(currentdate.getTime() - endTime);
  if (currentdate.getTime() - endTime > 0) return false;

  return true;
}

function getCurrentTime() {
  let date_ob = new Date();

  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = ("0" + date_ob.getHours()).slice(-2);

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}
