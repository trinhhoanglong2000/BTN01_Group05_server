const express = require("express");
const router = express.Router();
const gradeController = require("./gradeController");

const poolean = require("../../Database/index.js");

const passport = require("../../authentication/index");
router.get("/", function (req, res, next) {
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
        gradeController.GetAllGrade(req, res,user);
      }
    )(req, res, next);
  });
  router.get("/getAllGradeFromClass/:id", function (req, res, next) {
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
        gradeController.GetAllGradeFromClass(req, res,user);
      }
    )(req, res, next);
  });
  router.post("/UpdateGrades", function (req, res, next) {
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
        gradeController.UpdateAllGradeFromClass(req.body.data,res);
      }
    )(req, res, next);
  });
  

  module.exports = router;