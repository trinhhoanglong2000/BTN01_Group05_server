const express = require('express');
const router = express.Router();
const HomeWorkController = require('./HomeWorkController');
const passport = require('../../authentication/index')

router.post('/AddHomeWork',passport.authenticate('jwt', { session: false }), HomeWorkController.AddHomeWork);
router.post('/UpdateHomeWork',passport.authenticate('jwt', { session: false }), HomeWorkController.UpdateHomeWork);
router.post('/RemoveHomeWork',passport.authenticate('jwt', { session: false }),HomeWorkController.RemoveHomeWork);
router.get('/GetHomeWorkByClassID',passport.authenticate('jwt', { session: false }),HomeWorkController.GetHomeWorkByClassID);
router.post('/UploadScore',passport.authenticate('jwt', { session: false }),HomeWorkController.UploadScore);
//Long-TP ADD START 2022/1/3
router.post('/MakeDone',passport.authenticate('jwt', { session: false }),HomeWorkController.MakeDone);
router.post('/InProcess',passport.authenticate('jwt', { session: false }),HomeWorkController.InProcess);
//Long-TP ADD END 2022/1/3
module.exports = router;