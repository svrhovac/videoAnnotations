var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
var db = require(mainConfig.paths.db.mongodb);
var geoLocation = require.main.require('./utils/geoLocation');

var randomUtils = require.main.require('./utils/randomUtils');
var randomString = randomUtils.randomString;

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "edit2015comtrade@gmail.com",
    pass: "comtrade2015"
  }
});



router.get('/register/users/verification/email/:uniqeID', function(req,res){
    var id = req.params.uniqeID;
    var jsonMsg = {};
    db.user.update({securityCode: id}, {$set : {active: true}},function(err, result){
      if(err){
        jsonMsg.status = false;
        jsonMsg.message = "Error happened while inserting user into database";
        res.json(jsonMsg);
      }else if(result.nModified===1){
          var mailOptions={
            to : "edit2015comtrade@gmail.com",
            subject : "Verification mail!",
            text : "New user registered and verified!"
          }
          smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
              res.redirect('/');
              //res.end("Error happened while registrating");
            }else{
              res.redirect('/');
              //res.end("Mail confirmation sent!");
            }
          });
        }else{
          jsonMsg.status = false;
          jsonMsg.message = "User already verified";
          res.json(jsonMsg);
        }
      });

});


//register new user using email and password
router.post('/register',function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  var jsonMsg = {};

  //check if entered email and pass are valid
  req.checkBody('email','Email is mandatory').isEmail();
  req.checkBody('password','Password is mandatory').notEmpty();

  var error = req.validationErrors();
  if (error) {
    return next(error);
  }

  var hashedPassword = passwordHash.generate(password);
  var randomStr = randomString(32,'#aA');

 db.user.findOne({email: email}, function(err, user){
    if(err){
      jsonMsg.status = false;
      jsonMsg.message = "Error happened while getting user from database";
      res.status(500).json(jsonMsg);
    }else if(user===null){
      db.user.insert({email: email, password: hashedPassword, securityCode : randomStr, active: false});
      var emailLink = "http://localhost:3000/register/users/verification/email/" + randomStr;

      var mailOptions={
        to : email,
        subject : "Confirmation email!",
        text : emailLink
      }
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          jsonMsg.status = false;
          jsonMsg.message = "Error happened while registrating";
          res.json(jsonMsg);
        }else{
          jsonMsg.status = true;
          jsonMsg.message = "Mail confirmation sent";
          res.json(jsonMsg);
        }
      });
    }
    else {
      jsonMsg.status = false;
      jsonMsg.message = "User with that email already exists";
      res.status(401).json(jsonMsg);
    }
  });

});


//service for login
router.post('/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  //check if entered email and pass are valid
  req.checkBody('email','Email is mandatory').isEmail();
  req.checkBody('password','Password is mandatory').notEmpty();

  var error = req.validationErrors();
  if (error) {
    return next(error);
  }
  var jsonMsg = {};
  db.user.findOne({email: email},function(err, user){
    if(err){

    }else if(user===null){
      jsonMsg.status = false;
      jsonMsg.message = "User not found";
      res.status(401).json(jsonMsg);
    }
    else{
      if(user.active === false){
        jsonMsg.status = false;
        jsonMsg.message = "Users email is not verified";
        res.status(401).json(jsonMsg);
      }else if(user.active === true && passwordHash.verify(password,user.password)){
        jsonMsg.status = true;
        jsonMsg.message = "User successfully logged in";

        req.session.authUser = {email : user.email, _id : user._id};
        //insert a date of visit in user collection
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        geoLocation.getLocationData(ip, function(err, data){
            var usersCountry = data.country_name || "";
            var usersCity = data.city || data.time_zone.split("/")[1] || "";
            db.user.update({email : email},{$set : { "country" : usersCountry, "city": usersCity }, $inc: {numberOfVisits: 1}, $push: {dateOfLogin: new Date()}});
        });

        res.json(jsonMsg);

      }else{
        jsonMsg.status = false;
        jsonMsg.message = "User not found";
        res.status(401).json(jsonMsg);
      }
    }
  });
});

router.post('/logout', function(req,res,next){

  var jsonMsg = {};
  db.user.update({email : req.session.authUser.email},{$push: {dateOfLogout: new Date()}},function(err, result){
    if(err){
      jsonMsg.status = false;
      res.status(500).json(jsonMsg);
    }else if(result.nModified===1){
      req.session.destroy();
      jsonMsg.status = true;
      jsonMsg.message = "Logout successful";
      res.json(jsonMsg);
    }
  });
});

module.exports = router;
