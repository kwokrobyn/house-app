const express = require('express')
const router = express.Router();

const userModel = require('../models/userModel');
const userController = require('../controller/userController');

const houseModel = require('../models/houseModel');
const houseController = require('../controller/houseController');

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
  console.log(req.user.id)
});

module.exports = router;
