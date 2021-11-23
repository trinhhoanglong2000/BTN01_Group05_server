const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");

exports.AddHomeWork =async (homeWork) =>{
    try {
        Account = await poolean.query(
        `
        INSERT INTO \"Homework\" (id, idclass, name,description, grade, startday,endday,idgradestructure)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
        [
            uuidv4(),
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
        FROM \"Classes\"
        WHERE id = $1
        `,
          [idclass]
        );
        if(COUNT != 0 ){
            return true
        }else{
            return false
        }
      } catch (err) {
        return false
      }
}
exports.CheckGradeStructure = async (idgradestructure) => {
    try {
        const COUNT = await poolean.query(
        `
        SELECT COUNT(*) 
        FROM \"GradeStructure\"
        WHERE id = $1
        `,
          [idgradestructure]
        );
        if(COUNT != 0 )
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
      if(COUNT != 0 )
          return true
      else
          return false
    } catch (err) {
      return false
    }
}
exports.UpdateHomeWork =async (homeWork) =>{
  try {
      Account = await poolean.query(
        `UPDATE "Homework" 
        SET  name =$2 ,description = $3, grade = $4, endday=$5
        WHERE id=$1 `,
      [
          uuidv4(),
          homeWork.name,
          homeWork.description,
          homeWork.grade,
          homeWork.endday
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
        [homeWorkID]
      );
    
      Account = await poolean.query(
        `DELETE FROM "grade" WHERE idclass = $1 AND idhomework = $2;
        DELETE FROM "Homework" WHERE id = $3;
         `,
      [
        homeWork.rows[0].idclass,
        homeWork.rows[0].idhomework,
        homeWork.rows[0].id
      ]
      );
  }catch(err){
      console.log(err);
      return false;
  }
  return true
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
    if(COUNT != 0 )
        return true
    else
        return false
  } catch (err) {
    return false
  }
}
