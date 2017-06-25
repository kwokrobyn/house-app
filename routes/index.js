const express = require('express')
const router = express.Router();

const User = require('../models/user');
const userController = require('../controller/userController');

const House = require('../models/house');
const houseController = require('../controller/houseController');

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
