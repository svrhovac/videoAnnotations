var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var mongojs = require("mongojs");




router.get('/owners/:videoId', function(req, res){

      //  res.json(req.video);
        var id = req.params.videoId;
        db.video.findOne({_id : mongojs.ObjectId(id)},{_id : 0, title : 0, author : 0, duration : 0, description : 0, path : 0}, function(err, video){
          if(err) return next(err);
          if(!video) return next(new Error('Can not find video'));
          var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
          };
          var jsonObject = {"numberOfAnnotation":video.annotations.length,"countView":video.countView,"lastViewDate":video.lastViewDate};

          res.json(jsonObject);


        });
     });




module.exports = router;
