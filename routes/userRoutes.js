const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));

module.exports = router;