spa.service("searchService", ['$http', function($http){
 
	this.getRez = function(text){
	    var request="/searchvideos?text=" + text;
	   
	    return $http.get(request).success(function(data){
			return data;
		}).
		error(function(data){
			console.log("greska!!!");
		});
    };
	
	/*
	 this.getVideos = function(){
	     return $http.get("/videos").success(function(data){
          console.log("lista"+data);
			     return this.vidList = data;
		   }).
		    error(function(data){
			   console.log("greska!!!");
		      });
		//console.log(this.vidList)
		//return this.vidList;

    };
	////////////////////////////////////
	this.getRez = function(text){
	     $http.get("/searchvideos?text="+text).success(function(data){
					return data;
				}).
				error(function(data){
					console.log("greska!!!");
				});
	};
	*/
}]);