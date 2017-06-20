const mongoose = require('mongoose');

const User = require('./user');

const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  key: Number
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
