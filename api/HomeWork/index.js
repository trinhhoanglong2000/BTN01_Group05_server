const express = require('express');
const router = express.Router();
const HomeWorkController = require('./HomeWorkController');
const passport = require('../../authentication/index')

router.post('/AddHomeWord', HomeWorkController.AddHomeWork);
router.post('/UpdateHomeWork', HomeWorkController.UpdateHomeWork);
router.post('/RemoveHomeWork', HomeWorkController.RemoveHomeWork);

module.exports = router;