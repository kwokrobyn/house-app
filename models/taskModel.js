const mongoose = require('mongoose');

const userModel = require('./userModel');
const houseModel = require('./houseModel');

const taskSchema = new mongoose.Schema({
  name: String,
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
  assignedID: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
  assignedDate: Date,
  dueDate: Date,
  active: Boolean
});

const taskModel = mongoose.model('taskModel', taskSchema);

module.exports = taskModel;
