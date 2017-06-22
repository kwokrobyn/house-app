const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const houseModel = require('./houseModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {unique: true}
  },
  password: String,
  email: {
    type: String,
    index: {unique: true}
  },
  name: String,
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'houseModel'}
})

const userModel = module.exports = mongoose.model('userModel', userSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(newUser.password, salt, (err, hash) => {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
