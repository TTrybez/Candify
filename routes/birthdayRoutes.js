const express = require('express');
const birthdayController = require('../controllers/birthdayController');

const router = express.Router();

router.post('/test-birthdays', birthdayController.triggerBirthdayCheck.bind(birthdayController));

module.exports = router;