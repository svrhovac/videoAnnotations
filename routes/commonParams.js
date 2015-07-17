var db = require(mainConfig.paths.db.mongodb);


var videoIdParam = function(req, res, next, id){

  db.video.findOne({_id : db.ObjectId(id)}, function(err, video){
    if(err) return next(err);
    if(!video) return next(new Error('Can not find video'));
    req.video = video;
    return next();

  });
};

var params = {};
params.videoIdParam = videoIdParam;

module.exports = params;
