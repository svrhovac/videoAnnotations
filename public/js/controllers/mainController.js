spa.controller("mainController", function($scope, $routeParams, videoService){
	
	//$scope.vidList = videoService.getVideos();

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
    
});