const mongoose = require('mongoose');

const User = require('./user');
const House = require('./house');

const taskSchema = new mongoose.Schema({
  name: String,
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedDate: Date,
  dueDate: Date,
  active: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
