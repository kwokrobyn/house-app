const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* Passport Config */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

/* User Functions */
exports.renderLogin = (req, res, next) => {
  res.render('login');
}

exports.renderRegister = (req, res, next) => {
  res.render('register');
}

exports.registerUser = (req, res, next) => {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();

	if(errors){

    req.flash('errors', errors);
    return res.redirect('/account/register');

	} else {

		const newUser = new User ({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
      req.flash('success', { msg: 'Success! You are registered and can now log in.' });
      res.redirect('/account/login');
    })
  };
}

exports.postLogin = (req, res, next) => {
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/account/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Log In Successful' });
      res.redirect('/dashboard');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', {msg: 'You are logged out.'});
  res.redirect('/account/login');
}

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('errors', {msg: 'Log in required.'})
  res.redirect('/account/login');
};

exports.hasHouse = (req, res, next) => {
  if (req.user.house != null) {
    console.log('has a house!');
    return next();
  }
  res.redirect('/start');
}
