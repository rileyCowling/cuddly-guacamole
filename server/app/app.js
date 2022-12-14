////  make sure you are in the right directory 
////  This is the app.js file you run with $ node app.js  ////
////  If you want it to continuously update the website
////  while working in vs code use $ npm run devStart and goto http://localhost:3000


//Express Generated
var createError = require('http-errors');
var express = require('express');
const https = require('https'); //add https dependency
var path = require('path');
const fs = require('fs'); //add fs to read files
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');     // Parses JSON in body

/********* Important **********/
//Needed for adding routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var physicianRouter = require('./routes/physicians');
var patientRouter = require('./routes/patients');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// This is to enable cross-origin access
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/********* Important **********/
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Our Routes
app.use("/physicians", physicianRouter);
app.use("/patients", patientRouter);

// Express Generated
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//app.listen(3000); // Port 3000
const sslServer = https.createServer({ //create http server
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), //find certificate key
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) //find certificate
}, app)

sslServer.listen(3000, () => console.log('Secure server')); //start listening

module.exports = app;

// Welcome message displayed on console
console.log("\n\t\t\t**** Welcome ****\n\nHere's the Link if you're running this with EC2: http://13.57.240.26:3000 \n\nIf you're using a local host: http://localhost:3000\n\n");
