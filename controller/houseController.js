const House = require('../models/house');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/user');

exports.createHouse = (req, res, next) => {
  var name = req.body.name;
  var address = req.body.address;

  // Validation
	req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('address', 'Address is required').notEmpty();

  const errors = req.validationErrors();

	if (errors) {
    req.flash('errors', errors);
    return res.redirect('/start/newhouse');
	} else {
    const newHouse = new House ({
      name: name,
      address: address,
      users: [req.user._id]
    });
    newHouse.save((err, house) => {
      console.log('created house', house);
      if (err) throw err;
      User.findByIdAndUpdate(req.user.id,
      { house: house.id }, (err, updatedUser) => {
        if (err) throw err;
        console.log('updatedUser', updatedUser);
      });
    });

    req.flash('success', { msg: 'New house created!' });
    res.redirect('/dashboard');
  }
}

exports.joinHouse = (req, res, next) => {
  var key = req.body.key;
  var house;
  House.find({ _id: key}, (err, houses) => {
    if (err) throw err;
    if (houses.length == 1) {
      house = houses[0];
      console.log('house', house);
      req.user.house = house._id;
      house.users.push(req.user._id);
      req.flash('success', { msg: 'House ' + house.name + ' joined!' })
      res.redirect('/dashboard');
    } else {
      req.flash('error', { msg: 'No house found.' })
      res.redirect('/start/joinhouse');
    }

  })
}
