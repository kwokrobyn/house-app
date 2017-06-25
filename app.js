require('dotenv').config({silent: true});
const logger = require('morgan');
const lessMiddleware = require('less-middleware');
const index = ('./routes/index');
const Debug = require('debug');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI);
// Prevents Deprecation Warning
mongoose.Promise = global.Promise;

// Routes
const routes = require('./routes/index');
const account = require('./routes/account');
const start = require('./routes/start');
const dashboard = require('./routes/dashboard');

// Init App
const app = express();
const debug = Debug('house-app:app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// BodyParser Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// More Middleware
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
}));

// Flash
app.use(flash());


// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Give Views/Layouts direct access to session data.
app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.user = req.user || null;
  res.locals.name = req.user;
  next();
});

// Set Routes
app.use('/', routes);
app.use('/account', account);
app.use('/start', start);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

// Set Port

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server started on port '+app.get('port'));
});
