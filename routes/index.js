const express = require('express')
const router = express.Router();

const User = require('../models/user');
const userController = require('../controller/userController');

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
  console.log(req.user.id)
});

router.get('/dashboard', userController.isAuthenticated, userController.hasHouse, (req, res, next) => {
  res.render('dashboard', {
    user: req.user.name,
  })
})

router.get('/start', userController.isAuthenticated, (req, res, next) => {
  res.render('start', {
    user: req.user.name
  });
})



module.exports = router;
