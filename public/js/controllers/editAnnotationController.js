spa.editAnnotationController("mainController", function($scope, $routeParams, videoService){

	$scope.showListStatus = true;
	$scope.idVideo = $routeParams.id;

	$scope.vidList = videoService.getVideos();
	$scope.video = videoService.getVideoProperty($scope.idVideo);

	console.log($scope.video.path);

	$scope.showList = function(x){
		$scope.showListStatus = x;
	};
	
})