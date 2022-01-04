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


exports.removeStructure = async function (req, res) {
    try {
        //
        const data = await poolean.query(`
    SELECT *
    FROM "Homework"
    WHERE idgradestructure = $1
    `, [req.body.id])
        res.header({ "Access-Control-Allow-Origin": "*" });
        console.log(data.rows)
        for (var i = 0; i < data.rows.length; i++) {

            const deleteDataGrade = await poolean.query(`
                    DELETE FROM grade
                    WHERE idhomework = $1
                `, [data.rows[i].id])
            const deleteDataHomeWork = await poolean.query(`
                DELETE FROM "Homework"
                WHERE id = $1
            `, [data.rows[i].id])

        }

        const dataRemoved = await poolean.query(`
        DELETE FROM "GradeStructure"
        WHERE id = $1
        `, [req.body.id])
        console.log(dataRemoved)
        res.status(200).json({ data: dataRemoved.rows, success: true });
    } catch (err) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(404).json({
            message: "No grade available",
            success: false
        });
    }
};

exports.updateStructure = async function (req, res) {
    try {
        data = await poolean.query(`
        UPDATE "GradeStructure"
        SET description = $1, grade = $2
        WHERE id = $3
        `,[
            req.body.description,
            req.body.grade,
            req.body.id
        ]);
        res.status(200).json({ data: data.rows, success: true });
    } catch (err) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(404).json({
            message: "No grade available",
            success: false
        });
    }
};