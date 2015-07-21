var mconfig = require('./config/config');
global.mainConfig = mconfig;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var videoRoutes = require(mainConfig.paths.routes.videos);

var tagRoutes = require(mainConfig.paths.routes.tags);
var ownerRoutes = require(mainConfig.paths.routes.owners);

var annotationRoutes = require(mainConfig.paths.routes.annotation);

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
    },
    isArrayPlusParse : function(value, resultHolder) {
      if( value.constructor === Array ) {
        resultHolder.result = value;
        return true;
      }

      try {
        var arr = JSON.parse(value);
        if(arr.constructor === Array){
          resultHolder.result = arr;
          return true;
        }
      } catch(err) {
        return false;
      }
    }
 },
 customSanitizers: {
   toArray: function(value) {
         if(value.constructor && value.constructor === Array) {
           return value;
         }
         try {
           var arr = JSON.parse(value);
           if(arr.constructor === Array){
             return true;
           }
         } catch(err) {
           return false;
         }
         return
   }
 }
}));

/* to add some tweaks to express-validator */

app.use(function(req, res, next) {

  var origValidationErrors = req.validationErrors;
  var tweakedValidationErrors = function() {

    var errors = origValidationErrors.call(this);

    if (errors) {
      errors.vaErrorType = 'validation';
    }

    return errors;

  };
  req.validationErrors = tweakedValidationErrors;
  next();

});


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
app.use(function(err, req, res, next){

  if (err.vaErrorType) {
    var status = err.status || 400;
    res.status(status);

    if(err.vaErrorType === 'validation') {
      var msgs = [];
      for (var i = 0; i < err.length; i++) {
        msgs.push(err[i].msg);
      }
      return res.json(msgs);
    }

  }

  next(err);

});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if(err && err.stack) {
      console.log(err.stack);
    }
    var status = err ? err.status || 500 : 500;
    res.sendStatus(status);
  });
}

module.exports = app;
