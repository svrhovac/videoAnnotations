var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);
var mongojs = require("mongojs");

router.get('/tags', function(req, res){
  
  db.tag.find({}, function(err, tags){
    res.json(tags);
  });



});

module.exports = router;
