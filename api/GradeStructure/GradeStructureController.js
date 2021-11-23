const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
exports.GetGradeStructure = async (req, res, user) => {
    //const id = req.params.id;
    try {
        //
        const data = await poolean.query(`
    SELECT *
    FROM "GradeStructure"
    WHERE idclass = $1
    `, [req.params.id])
        console.log(data.rows)
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(200).json({ data: data.rows, success: true });
    } catch (err) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(404).json({
            message: "No grade available",
            success: false
        });
    }
};

//const
exports.addStructure = async function (req, res) {
    const StructureInfo = req;
    console.log(StructureInfo)
    
    try {
        const Structureid = uuidv4();
        const StructureItem = await poolean.query(
            `
      INSERT INTO \"GradeStructure\" (id, idclass, description, grade)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
            [
                Structureid,
                StructureInfo.classid,
                StructureInfo.description,
                StructureInfo.grade

            ]
        );
        res.status(201).json({ data: StructureItem.rows, success: true });
    } catch (err) {
        res.status(404).json({
            message: "Recheck your submit information",
        });
    }
};