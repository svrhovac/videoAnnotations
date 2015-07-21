var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var commonParams = require("./commonParams");


router.param("videoId", commonParams.videoIdParam);
router.param("annotationId", commonParams.annotationIdParam);

router.post('/annotation/:videoId/add', function(req, res, next){
  var video = req.video;
  req.checkBody('text','Annotation text is mandatory').notEmpty();
  req.checkBody('startTime','Start time must be greater or equals to 0').notEmpty().isInt({min: 0, max: video.duration});
  var error = req.validationErrors();
  if (error) {
    return next(error);
  }
  var startTime = parseInt(req.body.startTime);
  req.checkBody('endTime','Start time must be less than end time').notEmpty().isInt({min: startTime+1, max: video.duration});

  var tagsArrayHolder = {};
  req.checkBody('tags', 'Tags must be ObjectId array').isParsableObjectIdArray(tagsArrayHolder);
  var error = req.validationErrors();

  if (error) {
    return next(error);
  }

  var tagsArray = tagsArrayHolder.result;

  var text = req.body.text;
  var endTime = parseInt(req.body.endTime);

  var d = new Date();
  var value = {
                "id": db.ObjectId(),
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
  }, function(err, data){
    if(err){
      res.sendStatus(500);
    } else {
      if(data != null && data.nModified > 0) {
        res.send(value);
      } else {
        res.sendStatus(422); // Unprocessable Entity
      }
    }
  });
});

router.put('/annotation/:videoId/edit/:annotationId', function(req, res, next){
  console.log(JSON.stringify(req.body));
  var video = req.video;
  var ann = req.annotation;
  var updt = {};

 /* validate startTime if exists */
  if(req.body.startTime !== void 0){
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
  if(req.body.endTime !== void 0){
    req.checkBody('endTime','Start time must be less than end time').notEmpty().isInt({min: startTime+1, max: video.duration});
    var error = req.validationErrors();
    if (error) {
      return next(error);
    }
    updt['annotations.$.endTime'] = parseInt(req.body.endTime);
  }

  /* validate tags if exists */
  if (req.body.tags !== void 0) {
    var tagsArrayHolder = {};
    req.checkBody('tags', 'Tags must be ObjectId array').isParsableObjectIdArray(tagsArrayHolder);
    var error = req.validationErrors();

    if (error) {
      return next(error);
    }

    var tagsArray = tagsArrayHolder.result;

    updt['annotations.$.tags'] = tagsArray;
  }

  if (req.body.text !== void 0) {
    updt['annotations.$.text'] = req.body.text;
  }

  updt['annotations.$.dateModified'] = new Date();

  console.log(JSON.stringify(updt));


  db.video.findAndModify({
    query: {
      _id : video._id,
      annotations: {
        $elemMatch : {
          id: ann.id
        }
      }
    },
    update:{
      $set : updt
    },
    new: true
    }, function(err, data){
      if(err){
        res.sendStatus(500);
      } else {
        if(data){
          res.json(data);
        } else {
          res.sendStatus(422); // Unprocessable Entity
        }
      }

    });
});

router.delete('/annotation/:videoIdNoLoad/remove/:annotationIdNoLoad', function(req, res, next){
  var annoId = db.ObjectId(req.params.annotationIdNoLoad);
  db.video.update({
    _id : db.ObjectId(req.params.videoIdNoLoad),
  },
  {
    $pull : { annotations : { id : annoId } }
  }, function(err, data){
    return res.json(data);
    if(err){
      res.sendStatus(500);
    } else {
      if(data != null && data.nModified > 0) {
        res.send(true);
      } else {
        res.sendStatus(422); // Unprocessable Entity
      }
    }
  });

});


module.exports = router;
