require('./app_api/models/user');
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var cors = require('cors');  // Import the CORS middleware
const passport = require('passport'); 

require('./app_api/models/db');

require('./app_api/config/passport');

// Routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var app = express();

// Enable CORS globally for all routes
app.use(cors({
    origin: 'http://localhost:4200',  // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE',  // Allowed methods
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

// Allow CORS
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "message": err.name + ": " + err.message });
    } else {
        next(err);
    }
});

// Define your routes
app.use('/', indexRouter);  // Homepage routes
app.use('/users', usersRouter);  // User-related routes
app.use('/travel', travelRouter);  // Travel-related routes
app.use('/api', apiRouter);  // API routes for data

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // Provide error details in development mode
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
