var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require(mainConfig.paths.routes.commonParams);

router.param('videoId', commonParams.videoIdParam);

router.get('/videos', function(req, res){

  var skip = 0;
  var limit = 50;

  var callback = function(err, videos){
      res.json(videos);
  };

  //if skip and limit are defined, and there are errors, then return error
  if(req.query.skip || req.query.limit) {
    req.checkQuery('skip', 'Skip must be positive integer or 0').notEmpty().isInt({min: 0});
    req.checkQuery('limit', 'Limit must be positive integer or 0').notEmpty().isInt({min: 1});
    var error = req.validationErrors();

    if(error) {
      return next(error);
    }

    if(req.query.skip) skip = parseInt(req.query.skip);
    if(req.query.limit) limit = parseInt(req.query.limit);

  }

  db.video.find({},{path: 0, description: 0, countView : 0, lastViewDate : 0 }).skip(skip).limit(limit, callback);

});


router.get('/videos/:videoId', function(req, res){
    //countView and lastViewDate updated every time we get a request for the specific video
    db.video.update({_id : db.ObjectId(req.params.videoId)},{$inc : {countView : 1},$set: { lastViewDate : new Date()}});
    res.json(req.video);

});


var mergeSearchVideoQueries = function(videosV, videosA, callback){
  var map = new Map();

  for (var j = 0; j < videosV.length; j++) {
    videosV[j].videoMatches = true;
    map.set(videosV[j]._id.toHexString(), videosV[j]);
  }

  var val;
  for (j = 0; j < videosA.length; j++) {
    if((val = map.get(videosA[j]._id.toHexString())) != void 0) {
      val.annotationMatches = true;
    } else {
      videosA[j].annotationMatches = true;
      map.set(videosA[j]._id.toHexString(), videosA[j]);
    }
  }

  var returnArray = new Array(map.size);
  var it = map.values();
  var curr;
  j = 0;

  while (!(curr = it.next()).done) {
      returnArray[j] = curr.value;
      j++;
  }

  callback(returnArray);

};

var excludeRegexChars = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
};

router.get('/searchvideos', function(req, res){

  var skip = 0;
  var limit = 50;

  //if skip and limit are defined, and there are errors, then return error
  if(req.query.skip || req.query.limit) {
    req.checkQuery('skip', 'Skip must be positive integer or 0').notEmpty().isInt({min: 0});
    req.checkQuery('limit', 'Limit must be positive integer or 0').notEmpty().isInt({min: 1});
    var error = req.validationErrors();

    if(error) {
      return next(error);
    }

   if(req.query.skip) skip = parseInt(req.query.skip);
   if(req.query.limit) limit = parseInt(req.query.limit);

  }

  req.checkQuery('text', 'Search query text must be provided').notEmpty();
  var error = req.validationErrors();

  if(error) {
    return next(error);
  }

  var text = req.query.text;

  var tokens = text.split(' ');

  var regexArray = [];

  for ( var i = 0; i < tokens.length; i++) {
    regexArray.push(new RegExp(excludeRegexChars(tokens[i]),"i"));
  }

  var videoFilter = {path: 0, countView : 0, lastViewDate : 0 };

  var queryVideo = {
    $or : [
      { title: {$in : regexArray} },
      { description : {$in : regexArray} },
      { author : {$in : regexArray} }
    ]
  };

  var tagsQuery = {
      "name" : { $in : regexArray }
  };

  db.tag.find(tagsQuery, { name: 0 }, function(err, tagz){
    if(err){
        return res.sendStatus(500);
    }

    if (!tagz) {
      res.sendStatus(422);
    }

    var tagsIds = new Array(tagz.length);

    for (var k = 0; k < tagsIds.length; k++) {
        tagsIds[k] = tagz[k]._id;
    }

    var queryAnnotations = {
      $or : [
        { "annotations.text" : {$in : regexArray } },
        { "annotations.tags" : {$in : tagsIds } }
      ]
    };

    db.video.find(queryVideo, videoFilter, function(err, videosV){
      if(err){
          return res.sendStatus(500);
      }

      db.video.find(queryAnnotations, videoFilter, function(err, videosA){
        if(err) {
          res.sendStatus(500);
        }

        mergeSearchVideoQueries(videosV, videosA, function(returnArray) {
            res.json(returnArray.slice(skip, skip+limit));
        });

      });

    });

  });



});


module.exports = router;
