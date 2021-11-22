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
        if(COUNT != 0 ){
            return true
        }else{
            return false
        }
      } catch (err) {
        return false
      }
}