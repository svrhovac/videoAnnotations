spa.controller("mainController", function($scope, $location, $routeParams, videoService){
	
	//$scope.vidList = videoService.getVideos();

	videoService.setCurrAnno({"startTime":0});

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
    
});