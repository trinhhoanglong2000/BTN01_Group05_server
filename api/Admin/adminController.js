const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
const validation = require("../../authentication/validation");

exports.updateUser = async (req, res,id) => {
  try {
    //Check valid
   
    // const { error } = await validation.UpdateValidation(req);
    // if (error) {
    //   res.header({ "Access-Control-Allow-Origin": "*" });
    //   res.status(404).json({
    //     success: false,
    //     message: error.details[0].message ,
    //   });
    //   return
    // }
    
    const check = await poolean.query(
        'SELECT * FROM "Account" WHERE "Account".id=$1 ',
        [id]
      );
    
      //check admin
      if (!check.rows[0].admin){
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(404).json({
          success: false,
          message: "No class available",
        });
        return
      }
    
    const data = await poolean.query(
      `UPDATE "Account" 
      SET admin=$1, firstname=$2, lastname=$3, dob=$4,  phone = $5, student_id = $6,email = $7,gender = $8, isban = $9
      WHERE id=$10 `,
      [req.admin,req.firstname,req.lastname,req.dob,req.phone,req.student_id,req.email,req.gender,req.isban,req.id]
    );

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(201).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      success: false,
      message: "No class available",
    });
  }
};


