var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require("./commonParams");


router.param("videoId", commonParams.videoIdParam);
router.param("annotationId", commonParams.annotationIdParam);

router.post('/annotation/:videoId/add', function(req, res, next){
  var video = req.video;
  req.checkBody('startTime','Start time must be greater or equals to 0').notEmpty().isInt({min: 0, max: video.duration});
  var error = req.validationErrors();
  if (error) {
    return next(error);
  }
  var startTime = parseInt(req.body.startTime);
  req.checkBody('endTime','Start time must be less than end time').notEmpty().isInt({min: startTime+1, max: video.duration});

  var tags = req.sanitizeBody('tags').toArray();
  var error = req.validationErrors();
  if(!tags){
    var te = new Error('Tags must be array');
    if(error) {
      error.push(te);
    } else {
      error = te;
    }
  }

  if (error) {
    return next(error);
  }

  var tagsArray = [];
  for( var i = 0; i < tags.length; i++ ){
    var id = db.ObjectId(tags[i]);
    tagsArray.push(id);
  }

  var text = req.body.text;
  var endTime = parseInt(req.body.endTime);

  var d = new Date();
  var value = { "id": db.ObjectId(),
                "text": text,
                "dateCreated": d,
                "startTime": startTime,
                "endTime": endTime,
                "tags": tagsArray
              };

  db.video.update({_id: video._id}, {
    $push: {
      annotations: value
    }
  }, function(err, video){
    res.send("Annotions succesfully inserted");
  });
});

router.put('/annotation/:videoId/edit/:annotationId', function(req, res, next){
  var video = req.video;
  var ann = req.annotation;
  var updt = {};

 /* validate startTime if exists */
  if(req.body.startTime !== undefined){
    req.checkBody('startTime','Start time must be greater or equals to 0').notEmpty().isInt({min: 0, max: video.duration});
    var error = req.validationErrors();
    if (error) {
      return next(error);
    }
    var startTime = parseInt(req.body.startTime);
    updt['annotations.$.startTime'] = startTime;
  }else{
    var startTime = ann.startTime;
  }

  /* validate endTime if exists */
  if(req.body.endTime !== undefined){
    req.checkBody('endTime','Start time must be less than end time').notEmpty().isInt({min: startTime+1, max: video.duration});
    var error = req.validationErrors();
    if (error) {
      return next(error);
    }
    updt['annotations.$.endTime'] = parseInt(req.body.endTime);
  }

  /* validate tags if exists */
  if(req.body.tags !== undefined){
    var tags = req.sanitizeBody('tags').toArray();
    var error = req.validationErrors();
    if(!tags){
      var te = new Error('Tags must be array');
      if(error) {
        error.push(te);
      } else {
        error = te;
      }
    }

    if (error) {
      return next(error);
    }

    var tagsArray = [];
    for( var i = 0; i < tags.length; i++ ){
      var id = db.ObjectId(tags[i]);
      tagsArray.push(id);
    }
    updt['annotations.$.tags'] = tagsArray;
  }
  if(req.body.text !== undefined){
    updt['annotations.$.text'] = req.body.text;
  }

  updt['annotations.$.dateModified'] = new Date();
  db.video.findAndModify({
    query: {
      '_id' : db.ObjectId(video._id),
      annotations: {
        $elemMatch : {
          id: db.ObjectId(ann.id)
        }
      }
    },
    update:{
      $set : updt
    },
    new: true
    }, function(err, data){

      if(err){
        res.json("Not inserted");
      }
      else {
        res.json("Sucessfully inserted");
      }
    });
});

module.exports = router;
