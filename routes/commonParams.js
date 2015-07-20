var db = require(mainConfig.paths.db.mongodb);

var videoIdParam = function(req, res, next, id){

  db.video.findOne({_id : db.ObjectId(id)}, {countView: 0, lastViewDate: 0}, function(err, video){
    if(err) return next(err);
    if(!video) return next(new Error('Can not find video'));
    req.video = video;
    return next();

  });
};

var annotationIdParam = function(req, res, next, id){
    var aId = db.ObjectId(id);
    db.video.findOne({_id: db.ObjectId(req.params.videoId), annotations: {$elemMatch: {id : aId} }}, function(err, va){
      if(err) return next(err);
      if(!va) return next(new Error('Can not find annotation'));
      req.annotation = va.annotations[0];
      return next();
  });
};

var params = {};
params.videoIdParam = videoIdParam;
params.annotationIdParam = annotationIdParam;
module.exports = params;
