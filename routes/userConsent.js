var express = require('express');
var router = express.Router();
var euCountryCodes = require.main.require('./config/euCountryCodes');
var geoLocation = require.main.require('./utils/geoLocation');

var isUserConsentRequired = function(remoteAddress, callback) {

  geoLocation.getLocationData(remoteAddress, function(err, obj){
    if(err) {
      callback(err);
    } else {
      callback(null, euCountryCodes[obj.country_code]);
    }
  })

};

router.get('/userconsentrequired', function(req, res){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  isUserConsentRequired(ip, function(err, isit){
    if (isit) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

});


module.exports = router;
