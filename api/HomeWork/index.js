const express = require('express');
const router = express.Router();
const HomeWorkController = require('./HomeWorkController');
const passport = require('../../authentication/index')

router.post('/AddHomeWork',passport.authenticate('jwt', { session: false }), HomeWorkController.AddHomeWork);
router.post('/UpdateHomeWork',passport.authenticate('jwt', { session: false }), HomeWorkController.UpdateHomeWork);
router.post('/RemoveHomeWork',passport.authenticate('jwt', { session: false }),HomeWorkController.RemoveHomeWork);
router.get('/GetHomeWorkByClassID',passport.authenticate('jwt', { session: false }),HomeWorkController.GetHomeWorkByClassID);
router.post('/UploadScore',passport.authenticate('jwt', { session: false }),HomeWorkController.UploadScore);
module.exports = router;