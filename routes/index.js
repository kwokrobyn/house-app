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
  console.log(req.user.id)
});

router.get('/dashboard', userController.isAuthenticated, userController.hasHouse, (req, res, next) => {
  House.find({}, (err, houses) => {
    if (err) throw err;
    res.render('dashboard', {
      user: req.user.name,
    })
  })
})

module.exports = router;
