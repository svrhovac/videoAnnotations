var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);

router.get('/videos', function(req, res){

  var skip = 0;
  var limit = 0;

  var callback = function(err, videos){
      res.json(videos);
  };

  req.checkQuery('skip', 'Skip must be positive integer or 0').notEmpty().isInt({min: 0});
  req.checkQuery('limit', 'Limit must be positive integer or 0').notEmpty().isInt({min: 0});
  var error = req.validationErrors();

  //if skip and limit are defined, and there are errors, then return error
  if(req.query.skip || req.query.limit) {
    if(error) {
      return next(error);
    }

   skip = req.query.skip;
   limit = req.query.limit;

  }

  db.video.find({}).skip(skip).limit(limit, callback);


});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('../html/index.html');
});

module.exports = router;
