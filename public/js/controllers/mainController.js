spa.controller("mainController", function($scope, $location, $http, $routeParams, videoService){
    
	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	});
    
    $scope.getVideo = function(pin){
	   var request="/videos/" + videoService.vidList[pin]._id;
	   
	   $http.get(request).success(function(data){
			videoService.setCurrentVideo(data);
		}).
		error(function(data){
			console.log("Connection with server interrupted!!!");
		});
    };
	
	$scope.getId = function(){
		return videoService.getId();
	};
});