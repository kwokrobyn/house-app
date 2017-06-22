const express = require('express')
const router = express.Router();

const userModel = require('../models/userModel');
const userController = require('../controller/userController');

const houseModel = require('../models/houseModel');
const houseController = require('../controller/houseController');

// GET start
router.get('/', userController.isAuthenticated, (req, res, next) => {
  res.render('start', {
    user: req.user.name
  });
})

// GET newhouse
router.get('/newhouse', userController.isAuthenticated, (req, res, next) => {
  res.render('newhouse');
})

// GET joinhouse
router.get('/joinhouse', (req, res, next) => {
  res.render('joinhouse');
})

// POST newhouse
router.post('/newhouse', houseController.createHouse);

// POST joinhouse
router.post('/joinhouse', houseController.joinHouse);

module.exports = router;
