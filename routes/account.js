const express = require('express')
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/userModel');
const userController = require('../controller/userController');

// Register (GET register)
router.get('/register', userController.renderRegister);

// Login (GET login)
router.get('/login', userController.renderLogin);

// Register User (POST register)
router.post('/register', userController.registerUser);

// Authenticate User (POST login)
router.post('/login', userController.postLogin);

// Logout (GET logout)
router.get('/logout', userController.logout);

module.exports = router;
