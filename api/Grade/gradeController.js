const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
exports.GetAllGrade = async (req, res, user) => {
  //const id = req.params.id;
  //Validate if the user is exist in the class

  try {
    //
    const data = await poolean.query(
      `
    SELECT "Classes".name, "Classes".section, "Homework".name as homeworkName, grade.grade, grade.idaccount, grade.idclass,grade.idhomework
    FROM ((grade
    INNER JOIN "Classes" ON "Classes".id = grade.idclass)
    INNER JOIN "Homework" ON "Homework".id = grade.idhomework)
    WHERE grade.idaccount = $1;
    `,
      [user.id]
    );
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No grade available",
      success: false,
    });
  }
};
exports.GetAllGradeFromClass = async (req, res, user) => {
  const id = req.params.id;
  console.log(id);
  //Validate if the user is exist in the class

  try {
    //
    const data = await poolean.query(
      `
    SELECT * from
    GRADE
    WHERE grade.idclass = $1;
    `,
      [id]
    );
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No grade available",
      success: false,
    });
  }
};
exports.UpdateAllGradeFromClass = async (data, res) => {
  try {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      const COUNT = await poolean.query(
        `
        SELECT COUNT(*) 
        FROM GRADE 
        WHERE idaccount = $1 AND idclass =$2 AND idhomework =$3
        `,
        [element.idaccount, element.idclass, element.idhomework]
      );
      if (COUNT.rows[0].count == 0) {
        //new
        await poolean.query(
          `
        INSERT INTO GRADE (idaccount, idclass, idhomework,grade)
        VALUES ($1, $2, $3,$4)
        RETURNING *
        `,
          [
            element.idaccount,
            element.idclass,
            element.idhomework,
            element.grade,
          ]
        );
      } else {
        //kiem tra thang do co trong lop do khong
        const count = await poolean.query(
          `
          SELECT COUNT(*) 
          FROM "classesaccount" 
          WHERE accountid = $1 AND classid =$2 
          `,
          [element.idaccount, element.idclass]
        );
        
        if (count.rows[0].count !== 0) {
          await poolean.query(
            `UPDATE GRADE  
            SET grade=$1
            WHERE idhomework=$2 AND idaccount=$3 `,
            [element.grade, element.idhomework, element.idaccount]
          );
        }
      }
    }

    //

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No grade available",
      success: false,
    });
  }
};
