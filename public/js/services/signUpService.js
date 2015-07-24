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
	
	this.registerNewUser = function(user){ //MILAN za stnimanje nove
      var pom;
	  var postBody = {"email":user.email,"password":user.pass}
    console.log(postBody);
    return $http.post('/register', postBody).
		success(function(data) {
			return data;	
		}).
		error(function(data) {
			return data;
			});
    };
	
}]);