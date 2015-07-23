
spa.service("searchService", ['$http', function($http){
 
	this.getStat = function(video,callback){
	     $http.get("/owners/"+video._id).success(function(data){
					callback(data, video);
				}).
				error(function(data){
					console.log("greska!!!");
				});
	};
}]);