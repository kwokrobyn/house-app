const mongoose = require('mongoose');
const shortid = require('shortid');

const User = require('./User');

const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  key: {
    type: String,
    'default': shortid.generate
  },
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
