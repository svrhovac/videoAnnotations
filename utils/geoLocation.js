var https = require("https");

var exp = {};

exp.getLocationData = function(remoteAddress, callback) {

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
      callback(null, obj);
    })

  });

  req.on('error', function(err){
    callback(err);
  });

  req.end();

};

module.exports = exp;
