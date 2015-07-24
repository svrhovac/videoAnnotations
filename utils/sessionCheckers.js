var db = require(mainConfig.paths.db.mongodb);
var sessionCheckers  = {};
var sessionUtils = require('./sessionUtils');

sessionCheckers.requireLogin = function(req, res, next){
  if (sessionUtils.isLogedIn(req)) {
    next();
  } else {
    return res.sendStatus(401); //unauthorized
  }
};

sessionCheckers.increaseUsersWatchedVideos = function(req, res, next) {
  if (sessionUtils.isLogedIn(req)) {
    db.user.update({_id: req.session.authUser._id}, {$inc : { numberOfWatchedVideos : 1}}, function(err){
      next(err);
    });
  }
  next(null);
};



module.exports = sessionCheckers;
