spa.service("loginService", ['$http', function($http){

	this.user;
	this.login = false;

	this.checkUser = function(email, pass){
		var response = {"email":true, "password":true};
		var postBody = {"email":email};
		$http.post("", postBody).success(function(data){
			if(data)
				response.email = true;
			else
				response.email = false;
		}).
		error(function(data){
			console.log("error: couldn't get email!!!");
		});
		postBody = {"password":pass};
		return $http.post("", postBody).success(function(data){
			if(data)
				response.password = true;
			else
				response.password = false;
			return response;
		}).
		error(function(data){
			console.log("error: couldn't get password!!!");
		});
	};

	this.getStat = function(video,callback){
	     $http.get("/owners/"+video._id).success(function(data){
					callback(data, video);
				}).
				error(function(data){
					console.log("greska!!!");
				});
	};

	this.setUser = function(u){
		this.user = u;
	};

	this.setLoginStatus = function(l){
		this.login = l;
	}

	this.getUser = function(u){
		return this.user;
	};

	this.getLoginStatus = function(f){
		return this.login;
	}
}]);