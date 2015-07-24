spa.service("signUpService", ['$http', function($http){
	this.login = false;

	this.fromEU = function(){
	    var request="/userconsentrequired";
	    return $http.get(request).success(function(data){
			return data;
		}).
		error(function(data){
			console.log("greska!!!");
		});
    };

    this.logOut = function(){
    	return $http.post("/logout").success(function(data){return data;});
    };

    this.signIn = function(e,p){
    	var postBody = {"email":e,"password":p};
    	return $http.post("/login",postBody).success(function(data){
			return data.message;
		}).error(function(data){
			if(data[0]=="Email is mandatory")
				return data[0];
			return data.message;
		});
    };

    this.loginStatus = function(f){
    	this.login = f;
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