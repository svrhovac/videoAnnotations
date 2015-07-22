spa.controller("statisticController", function($scope, $routeParams, videoService, statisticService){
	$scope.videosStat = [];
	$scope.totalViews = 0;
	
	videoService.getVideos().success(function(data){
		$scope.sVideos = data;
		for (var i=0; i< $scope.sVideos.length; i++){
			
			statisticService.getStat($scope.sVideos[i]._id).success(function(data){
				$scope.videosStat.push(data);
				$scope.totalViews += data.countView;
				}).
				error(function(data){
					console.log("Connection with server interrupted!!!");
				});
		}
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});

	$scope.getStatistics = function(statId){
		$scope.stat = $scope.videosStat[statId];	
	};
});