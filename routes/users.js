var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
var db = require(mainConfig.paths.db.mongodb);

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "edit2015comtrade@gmail.com",
    pass: "comtrade2015"
  }
});



//create random security code for user
function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}


router.get('/register/users/verification/email/:uniqeID', function(req,res){
    var id = req.params.uniqeID;
    var jsonMsg = {};
    db.user.update({securityCode: id}, {$set : {active: true}},function(err, result){
      if(err){
        jsonMsg.status = "error";
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
              jsonMsg.status = "error";
              jsonMsg.message = "Error happened while registrating";
              res.json(jsonMsg);
              //res.end("Error happened while registrating");
            }else{
              jsonMsg.status = "success";
              jsonMsg.message = "Mail confirmation sent";
              res.json(jsonMsg);
              //res.end("Mail confirmation sent!");
            }
          });
        }else{
          jsonMsg.status = "error";
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
      jsonMsg.status = "error";
      jsonMsg.message = "Error happened while getting user from database";
      res.json(jsonMsg);
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
          jsonMsg.status = "error";
          jsonMsg.message = "Error happened while registrating";
          res.json(jsonMsg);
        }else{
          jsonMsg.status = "success";
          jsonMsg.message = "Mail confirmation sent";
          res.json(jsonMsg);
        }
      });
    }
    else {
      jsonMsg.status = "error";
      jsonMsg.message = "User with that email already exists";
      res.json(jsonMsg);
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
      jsonMsg.status = "error";
      jsonMsg.message = "User not found";
      res.json(jsonMsg);
    }
    else{
      if(user.active === false){
        jsonMsg.status = "error";
        jsonMsg.message = "Users email is not verified";
        res.json(jsonMsg);
      }else if(user.active === true && passwordHash.verify(password,user.password)){
        jsonMsg.status = "success";
        jsonMsg.message = "User successfully logged in";

        req.session.authUser = {email : user.email, _id : user._id};

        res.json(jsonMsg);
      }else{
        jsonMsg.status = "error";
        jsonMsg.message = "User not found";
        res.json(jsonMsg);
      }
    }
  });
});


module.exports = router;
