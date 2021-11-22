const express = require('express');
const router = express.Router();
const HomeWorkController = require('./HomeWorkController');
const passport = require('../../authentication/index')

router.post('/AddHomeWord', HomeWorkController.AddHomeWork);
module.exports = router;