var express = require('express');
var router = express.Router();
var euCountryCodes = require.main.require('./config/euCountryCodes');
var https = require("https");

router.isUserConsentRequired = function(remoteAddress, callback) {

  var requestOptions = {
    host: 'freegeoip.net',
    port: 443,
    path: '/json/' + remoteAddress
  };

  var req = https.request(requestOptions, function(res){

    if (res.statusCode != 200) {
      return callback({statusCode : res.statusCode});
    }

    res.setEncoding('utf8');

    var databufstr = '';

    res.on('data', function(chunk){
      databufstr += chunk;
    });

   res.on('end', function(){
      var obj = JSON.parse(databufstr);
      callback(null, euCountryCodes[obj.country_code]);
    })

  });

  req.on('error', function(err){
    callback(err);
  });

  req.end();

};

router.get('/userconsentrequired', function(req, res){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  router.isUserConsentRequired(ip, function(err, isit){
    if (isit) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

});


module.exports = router;
