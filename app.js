'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const signinRouter = require('./routes/signin');
const cartRouter = require('./routes/cart');
const singleUserProfileRouter = require('./routes/singleUserProfile');
const adminRouter = require('./routes/admin');
const authenticationRouter = require('./routes/authentication');

//const signinRouter = require('./routes/signin');


const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');


const app = express();

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(sassMiddleware({
  src: join(__dirname, 'public'),
  dest: join(__dirname, 'public'),
  outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
  sourceMap: true
}));

//app.use('/signin', signinRouter);







app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 24 * 1000 },
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

// Custom piece of middleware
app.use((req, res, next) => {
  // Access user information from within my templates
  res.locals.user = req.session.user;
  // Keep going to the next middleware or route handler
  next();
});


app.use('/', indexRouter);
app.use('/', adminRouter);
app.use('/user', usersRouter);
app.use('/register', registerRouter);
app.use('/signin', signinRouter);
app.use('/singleUserProfile', singleUserProfileRouter);
app.use('/cart', cartRouter);
app.use('/authentication', authenticationRouter);


// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
