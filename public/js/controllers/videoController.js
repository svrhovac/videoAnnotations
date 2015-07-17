spa.controller("videoController", function($scope, $location, $http, $routeParams, videoService){
    $scope.showListStatus = false;
	$scope.idVideo = $routeParams.id;
	
	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	});
	
	videoService.getVideoProperty($scope.idVideo).success(function(data){
		$scope.video=data;
		console.log($scope.video);
	});
	
	$scope.showList = function(x){
		$scope.showListStatus = x;
		console.log("prikaz");
		console.log(x);
	};
	
	$scope.setCurrentVideo = function(){
		
	};
	
	 $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];
});