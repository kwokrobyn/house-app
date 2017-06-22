const express = require('express')
const router = express.Router();

const userModel = require('../models/userModel');
const userController = require('../controller/userController');

const houseModel = require('../models/houseModel');
const houseController = require('../controller/houseController');

const taskModel = require('../models/taskModel');
const taskController = require('../controller/taskController');

// Render Dash
router.get('/',
userController.isAuthenticated,
userController.hasHouse,
houseController.renderDash
)

// Create New Task
router.post('/create', taskController.createTask);

// Update Task
router.put('/edit', taskController.editTask);

// Delete task
router.delete('/delete', taskController.deleteTask);

module.exports = router;
