var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require("./commonParams");


router.param("videoId", commonParams.videoIdParam);

router.post('/annotation/:videoId/add', function(req, res, next){

  var video = req.video;
  var text = req.body.text;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var tagsArray = [];

  var startTimeInt = parseInt(startTime);
  req.checkBody('startTime','Start time must be greater or equals to 0').notEmpty().isInt({min: 0, max: video.duration});
  req.checkBody('endTime','Start time must be less than end time').notEmpty().isInt({min: startTimeInt+1, max: video.duration});
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

  for( var i = 0; i < tags.length; i++ ){
    var id = db.ObjectId(tags[i]);
    tagsArray.push(id);
  }

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



module.exports = router;
