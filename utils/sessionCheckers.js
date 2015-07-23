var db = require(mainConfig.paths.db.mongodb);
var sessionCheckers  = {};

var isLogedIn = function(req){
  return (req.session && req.session.authUser && req.session.authUser.email);
}

sessionCheckers.requireLogin = function(req, res, next){
  if (isLogedIn(req)) {
    next();
  } else {
    return res.sendStatus(401); //unauthorized
  }
};

sessionCheckers.increaseUsersWatchedVideos = function(req, res, next) {
  if (isLogedIn(req)) {
    db.user.update({_id: req.session.authUser._id}, {$inc : { numberOfWatchedVideos : 1}}, function(err){
      next(err);
    });
  }
};

module.exports = sessionCheckers;
