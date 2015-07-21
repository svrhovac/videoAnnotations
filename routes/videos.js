var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require(mainConfig.paths.routes.commonParams);

router.param('videoId', commonParams.videoIdParam);

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

  db.video.find({},{path: 0, description: 0, countView : 0, lastViewDate : 0 }).skip(skip).limit(limit, callback);

});


router.get('/videos/:videoId', function(req, res){
    //countView and lastViewDate updated every time we get a request for the specific video
    db.video.update({_id : db.ObjectId(req.params.videoId)},{$inc : {countView : 1},$set: { lastViewDate : new Date()}});
    res.json(req.video);

});






module.exports = router;
