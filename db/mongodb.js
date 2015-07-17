var databaseUrl = 'mongodb://192.168.137.10:27017/video_annotations'; // mongodb://[username:password@[host[:port][/dbname]
var collections = ['video', 'tag'];

var db = require("mongojs")(databaseUrl, collections);

module.exports = db;
