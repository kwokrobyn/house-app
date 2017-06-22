const mongoose = require('mongoose');
const House = require('../models/house');
const passport = require('passport');
const User = require('../models/user');
const Task = require('../models/task');

// CREATE task
exports.createTask = (req, res) => {
  console.log('you made it to the server');
  const name = req.body.name;
  const assigned = req.body.assigned;
  const dueDate = req.body.dueDate;

  // find the current house
  House.findById(req.user.house)
  .populate('users')
  .exec((err, house) => {
    if (err) throw err;
    // find assigned id from users in house
    house.users.forEach((user, index) => {
      if (user.name == assigned) {
        const assignedID = user._id;
        console.log('matching user found', assignedID);

        const newTask = new Task ({
          name: name,
          creatorID: req.user._id,
          assignedID: assignedID,
          assignedDate: new Date(),
          dueDate: dueDate,
          active: true
        })
        console.log('newtask created');
        newTask.save();
        res.redirect('/dashboard');

      }
    })
  })
}
