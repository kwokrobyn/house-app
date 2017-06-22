const express = require('express')
const router = express.Router();

const User = require('../models/User');
const userController = require('../controller/userController');

const House = require('../models/House');
const houseController = require('../controller/houseController');

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
  console.log(req.user.id)
});

module.exports = router;
