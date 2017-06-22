const mongoose = require('mongoose');
const shortid = require('shortid');

const userModel = require('./userModel');

const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
  key: {
    type: String,
    'default': shortid.generate
  },
});

const houseModel = mongoose.model('houseModel', houseSchema);

module.exports = houseModel;
