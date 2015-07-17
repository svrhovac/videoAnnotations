var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require("./commonParams");

router.param("videoId", commonParams.videoIdParam);

var restConfig = require.main.require('./config/restConfig');

router.get('/videos', function(req, res, next){

  var skip = 0;
  var limit = restConfig.maxVideosLimit;

  var callback = function(err, videos){
      res.json(videos);

  };

  req.checkQuery('skip', 'Skip must be positive integer or 0').notEmpty().isInt({min: 0});
  req.checkQuery('limit', 'Limit must be integer between 1 and ' + restConfig.maxVideosLimit).notEmpty().isInt({min: 1, max: restConfig.maxVideosLimit});
  var error = req.validationErrors();

  //if skip and limit are defined, and there are errors, then return error
  if(req.query.skip || req.query.limit) {
    if(error) {
      return next(error);
    }

   skip = parseInt(req.query.skip);
   limit = parseInt(req.query.limit);

  }

  db.video.find({},{path: 0, description: 0}).skip(skip).limit(limit, callback);


});

router.get('/videos/:videoId', function(req, res){
     res.json(req.video);

});
router.post('/videos/annotation/:videoId')


module.exports = router;
