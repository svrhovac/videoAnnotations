var mconfig = require('./config/config');
global.mainConfig = mconfig;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var videoRoutes = require(mainConfig.paths.routes.videos);
<<<<<<< HEAD
var tagRoutes = require(mainConfig.paths.routes.tags);
var ownerRoutes = require(mainConfig.paths.routes.owners);
=======
var annotationRoutes = require(mainConfig.paths.routes.annotation);
>>>>>>> 419099073418e949b76f161794d21a463841f1be
var indexRoutes = require(mainConfig.paths.routes.index);



var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
 customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    }
 },
 customSanitizers: {
   toArray: function(value) {
       try {
         var parsed = JSON.parse(value);
         if ( parsed.constructor === Array ) {
           return parsed;
         } else {
           return false;
         }
       } catch(err) {
         return false;
       }
   }
 }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(annotationRoutes);

app.use(videoRoutes);
app.use(tagRoutes);
app.use(ownerRoutes);
app.use(indexRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if(err.stack) console.log(err.stack);
    var msg = (err.constructor === Array) ? err[0].msg : err.message ;
    res.status(err.status || 500).send(msg);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
