const express = require('express')
const router = express.Router();

const User = require('../models/User');
const userController = require('../controller/userController');

const House = require('../models/House');
const houseController = require('../controller/houseController');

const Task = require('../models/Task');
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
