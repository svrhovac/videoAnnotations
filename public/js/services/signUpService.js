spa.service("signUpService", ['$http', function($http){
	this.fromEU = function(){
	    var request="/userconsentrequired";
	    return $http.get(request).success(function(data){
			return data;
		}).
		error(function(data){
			console.log("greska!!!");
		});
    };
	
}]);