spa.controller("searchCtrl", function($scope, $routeParams, videoService, searchService){
	
	//console.log($scope.$parent.searchText);
	$scope.$parent.search = function(){
		console.log($scope.$parent.searchText);
	}
	/*//$scope.videosStat = [];
	$scope.tableData = [];
	$scope.totalViews = 0;
	//$scope.i = 0;
	
	videoService.getVideos().success(function(videoData){
		//$scope.sVideos = videoData;
		for (var i = 0; i< videoData.length; i++){
			
			statisticService.getStat(videoData[i],function(anoData, video){
				$scope.totalViews += anoData.countView;
				var obj = {
					"title":video.title,
					"author":video.author,
					"duration":video.duration,
					"countView":anoData.countView,
					"lastViewDate":anoData.lastViewDate, 
					"numberOfAnnotation":anoData.numberOfAnnotation
				}
				$scope.tableData.push(obj);
				
			});
		}
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});

	//TODO ne prikazuje odgovarajuci
	$scope.getStatistics = function(statId){
		$scope.stat = statId;
	};
	*/	
});