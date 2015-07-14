var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);

router.get('/videos', function(req, res){
  db.video.find({}, function(err, videos){
      res.json(videos);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('../html/index.html');
});

module.exports = router;
