const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
const { number } = require("joi");

exports.AddHomeWork =async (homeWork,id) =>{
    try {
        await poolean.query(
        `
        INSERT INTO \"Homework\" (id, idclass, name,description, grade, startday,endday,idgradestructure)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
        [
            id,
            homeWork.idclass,
            homeWork.name,
            homeWork.description,
            homeWork.grade,
            homeWork.startday,
            homeWork.endday,
            homeWork.idgradestructure
        ]
        );
    }catch(err){
        console.log(err);
        return false;
    }
    return true
}
exports.CheckClass = async (idclass) => {
    try {
        const COUNT = await poolean.query(
        `
        SELECT COUNT(*) 
        FROM "Classes"
        WHERE id = $1
        `,
          [idclass]
        );
 

        if(COUNT.rows[0].count != 0 ){
            return true
        }else{
            return false
        }
      } catch (err) {
        return false
      }
}
exports.CheckGradeStructure = async (idgradestructure) => {

    if (idgradestructure==null) return false    
    try {
        const COUNT = await poolean.query(
        `
        SELECT COUNT(*) 
        FROM "GradeStructure"
        WHERE id = $1
        `,
          [idgradestructure]
        );

        if(COUNT.rows[0].count != 0 )
            return true;
        else
            return false;
      } catch (err) {
        return false
      }
}
exports.CheckHomeWork = async (id) => {
  try {
      const COUNT = await poolean.query(
      `
      SELECT COUNT(*) 
      FROM  \"Homework\"
      WHERE id = $1
      `,
        [id]
      );
      
      if(COUNT.rows[0].count != 0 )
          return true
      else
          return false
    } catch (err) {
      return false
    }
}
exports.UpdateHomeWork =async (homeWork) =>{
  try {
       await poolean.query(
        `UPDATE \"Homework\"
        SET  name =$2 ,description = $3, grade = $4, endday=$5, idgradestructure=$6
        WHERE id=$1 `,
      [
          homeWork.id,
          homeWork.name,
          homeWork.description,
          homeWork.grade,
          homeWork.endday,
          homeWork.idgradestructure,
      ]
      );
  }catch(err){
      console.log(err);
      return false;
  }
  return true
}

exports.RemoveHomeWork = async (homeWorkID) =>{
  try {
      const homeWork = await poolean.query(
      `
      SELECT * 
      FROM  \"Homework\"
      WHERE id = $1
      LIMIT 1
      `,
        [homeWorkID.id]
      );
      await poolean.query(
        `DELETE FROM "grade" WHERE idclass = $1 AND idhomework = $2;
         `,
      [
        homeWork.rows[0].idclass,
        homeWork.rows[0].idhomework
      ]
      );
      await poolean.query(
        `
        DELETE FROM "Homework" WHERE id = $1;
         `,
      [
        homeWork.rows[0].id
      ]
      );
  }catch(err){
      console.log(err);
      return false;
  }
  return true
}
exports.GetHomeWorkByClassID = async (classId) =>{
  try {
      const homeWork = await poolean.query(
      `
      SELECT * 
      FROM  \"Homework\"
      WHERE idclass = $1
      ORDER BY startday ASC
      `,
        [classId]
      );
      return homeWork.rows
  }catch(err){
      console.log(err);
      return null;
  }
}
exports.CheckTeacher = async (ClassID, UserID) =>{
  try {
    const COUNT = await poolean.query(
    `
    SELECT COUNT(*) 
    FROM \"classesaccount\"
    WHERE classid = $1 AND accountid = $2 AND type = true
    `,
    [ClassID, UserID]
    );
    if(COUNT.rows[0].count != 0 )
        return true
    else
        return false
  } catch (err) {
    return false
  }
}
//Long-TP Add Start 2022/1/3
exports.MakeDone = async (homeWorkID) =>{
  try {
    await poolean.query(
     `UPDATE \"Homework\"
     SET isdone = true
     WHERE id=$1 `,
    [
      homeWorkID,  
    ]
    );
    }catch(err){
      console.log(err);
      return false;
    }
    return true
}
exports.CancelDone   = async (homeWorkID) =>{
  try {
    await poolean.query(
     `UPDATE \"Homework\"
     SET isdone = false
     WHERE id=$1 `,
    [
      homeWorkID,  
    ]
    );
    }catch(err){
      console.log(err);
      return false;
    }
    return true
}
exports.CheckReviewRequest = async (homeWorkID,idaccount)=> {
  try {
      const COUNT = await poolean.query(
      `
      SELECT COUNT(*) 
      FROM  \"gradereview\"
      WHERE idhomework = $1 AND idaccount = $2
      `,
        [homeWorkID,idaccount]
      );
      console.log("Test " + COUNT.rows[0].count)
      if( COUNT.rows[0].count != 0 )
          return true
      else
          return false
    } catch (err) {
      return false
    }
}
exports.AddReviewRequest =async (homeWorkID,idaccount,expectationMess,expectationGrade,createDate, oldGrade) =>{
  console.log("AddReviewRequest 1");
  try {
    console.log("AddReviewRequest 2");
      if(await this.CheckReviewRequest(homeWorkID,idaccount)){
        console.log("AddReviewRequest 3");
        return false
      }
        
        console.log("AddReviewRequest 4");
      await poolean.query(
      `
      INSERT INTO \"gradereview\" (idhomework,idaccount,expectationMess,expectationGrade,createDate,oldGrade, finalgrade,teachermess,donedate)
      VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)
      `,
      [
        homeWorkID,idaccount,expectationMess,expectationGrade,createDate,oldGrade,null,null,null
      ]
      )
      console.log("AddReviewRequest 5");
      console.log("AddReviewRequest after");
  }catch(err){
      console.log(err);
      return false;
  }
  return true
}
exports.UploadReviewRequest   = async (homeWorkID,idaccount,expectationMess,expectationGrade,createDate, oldGrade) =>{
  try {
    if(!(await this.CheckReviewRequest(homeWorkID,idaccount))){
      return false
    }
     
      console.log("UpdateHomeWork")
     await poolean.query(
     `UPDATE \"gradereview\"
      SET expectationMess=$3,
      expectationgrade=$4 , createdate=$5, oldgrade=$6, finalgrade= $7,teachermess=$8, donedate=$9
      WHERE idhomework = $1 AND idaccount = $2 `,
    [
      homeWorkID,idaccount,expectationMess,expectationGrade,createDate,oldGrade,null,null,null
    ]
    )
    }catch(err){
      console.log(err);
      return false;
    }
    return true
}
exports.CofirmReviewRequest   = async (homeWorkID,idaccount,finalgrade,teachermess,donedate, oldGrade) =>{
  try {
    if(!(await this.CheckReviewRequest(homeWorkID,idaccount)))
      return false
     await poolean.query(
     `UPDATE \"gradereview\"
      SET oldgrade=$3, finalgrade= $4,teachermess=$5, donedate=$6
      WHERE idhomework = $1 AND idaccount = $2 `,
    [
      homeWorkID,idaccount, oldGrade,finalgrade,teachermess,donedate
    ]
    )
     
    }catch(err){
      console.log(err);
      return false;
    }
    return true
}
exports.UpdateHomeWorkReview =async (homeWorkID,grade,endday) =>{
  try {
       await poolean.query(
        `UPDATE \"grade\"
        SET  grade = $2
        WHERE id=$1 `,
      [
        homeWorkID,grade
      ]
      );
  }catch(err){
      console.log(err);
      return false;
  }
  return true
}
exports.GetReviewRequest = async (homeWorkID,idaccount) =>{
  try {
      const ReviewRequest = await poolean.query(
      `
      SELECT * 
      FROM  \"gradereview\"
      WHERE idhomework = $1 AND idaccount = $2
      ORDER BY createDate ASC
      `,
        [homeWorkID,idaccount]
      );
      return ReviewRequest.rows
  }catch(err){
      console.log(err);
      return null;
  }
}

exports.GetAllReviewRequest = async (idclass) =>{
  try {
      const ReviewRequest = await poolean.query(
      `
      Select * From 
      (SELECT * 
        FROM  gradereview as gr
      LEFT JOIN public."Homework" as hw
      ON gr.idhomework = hw.id
      Where hw.idclass =$1
      ORDER BY gr.createdate DESC )as reviewreq
      LEFT JOIN public."Account" as acc ON reviewreq.idaccount = acc.id
      `,
        [idclass]
      );
      return ReviewRequest.rows
  }catch(err){
      console.log(err);
      return null;
  }
}
//Long-TP Add END 2022/1/3