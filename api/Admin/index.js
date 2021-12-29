const express = require("express");
const router = express.Router();
const passport = require("../../authentication/index.js");
const adminController = require("./adminController");
router.post("/Update", function (req, res, next) {
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
        
        adminController.updateUser({...req.body}, res,user.id);
      }
    )(req, res, next);
  });


module.exports = router;
