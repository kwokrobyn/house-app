const mongoose = require('mongoose');
const shortid = require('shortid');

const User = require('./user');

const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  _id: {
    type: String,
    'default': shortid.generate
  },
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
