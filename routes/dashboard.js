const express = require('express')
const router = express.Router();

const User = require('../models/user');
const userController = require('../controller/userController');

const House = require('../models/house');
const houseController = require('../controller/houseController');

const Task = require('../models/task');
const taskController = require('../controller/taskController');

// Render Dash
router.get('/',
userController.isAuthenticated,
userController.hasHouse,
houseController.renderDash
)

// Create New Task
router.post('/create', taskController.createTask);




module.exports = router;
