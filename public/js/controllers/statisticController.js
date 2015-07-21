spa.controller("statisticController", function($scope, $routeParams, videoService, statisticService){
	//$scope.sVideos = videoService.getVidList();
	videoService.getVideos().success(function(data){
		$scope.sVideos = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
	
    $scope.getStatistics = function(sVid){
		//$scope.stat = statisticService.getStat(sVid._id);
		//console.log(sVid);
		statisticService.getStat(sVid._id).success(function(data){
		$scope.stat = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
		
	};
});