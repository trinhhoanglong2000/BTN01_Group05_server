const express = require('express');
const router = express.Router();
const HomeWorkController = require('./HomeWorkController');
const passport = require('../../authentication/index')

router.post('/AddHomeWord',  passport.authenticate('jwt', { session: false }), HomeWorkController.AddHomeWork);
router.post('/UpdateHomeWork', passport.authenticate('jwt', { session: false }), HomeWorkController.UpdateHomeWork);
router.post('/RemoveHomeWork',  passport.authenticate('jwt', { session: false }),HomeWorkController.RemoveHomeWork);

module.exports = router;