spa.service("statisticService", ['$http', function($http){
 
	this.getStat = function(id){
	     return $http.get("/owners/"+id).success(function(data){
					return data;
				}).
				error(function(data){
					console.log("greska!!!");
				});
	};
}]);