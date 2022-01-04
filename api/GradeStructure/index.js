const express = require("express");
const router = express.Router();
const gradeStructureController = require("./GradeStructureController");
const poolean = require("../../Database/index.js");

const passport = require("../../authentication/index");
router.get("/GetStructure/:id", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(401);
        res.send({ message: info.message, success: false });
        return;
      }
      gradeStructureController.GetGradeStructure(req, res, user);
    }
  )(req, res, next);
});

router.post("/AddStructure/:id", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (err, user, info) {

      if (err) {
        return next(err);
      }
      if (!user) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(401);
        res.send({ message: info.message, success: false });
        return;
      }

      gradeStructureController.addStructure({ ...req.body, userid: user.id, classid: req.params.id }, res)

    }
  )(req, res, next);
}
);

router.post("/RemoveStructure", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (err, user, info) {

      if (err) {
        return next(err);
      }
      if (!user) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(401);
        res.send({ message: info.message, success: false });
        return;
      }
      console.log(req.body)
      gradeStructureController.removeStructure(req, res)

    }
  )(req, res, next);
}
);
router.post("/UpdateStructure", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (err, user, info) {

      if (err) {
        return next(err);
      }
      if (!user) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(401);
        res.send({ message: info.message, success: false });
        return;
      }
      gradeStructureController.updateStructure(req, res)

    }
  )(req, res, next);
}
);
module.exports = router;