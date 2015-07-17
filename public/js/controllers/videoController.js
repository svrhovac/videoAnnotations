spa.controller("videoController", function($scope, $location, $http, $routeParams, videoService){
    
	$scope.idVideo = $routeParams.id;
	
	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	});
	
	videoService.getVideoProperty($scope.idVideo).success(function(data){
		$scope.video=data;
		console.log($scope.video);
	});
	
	$scope.setCurrentVideo = function(){
		
	};
});