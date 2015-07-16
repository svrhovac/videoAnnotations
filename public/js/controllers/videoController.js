spa.controller("videoController", function($scope, $location, $http, $routeParams, videoServis){
    
	$scope.idVideo = $routeParams.id;
	
	videoServis.getVideoProperty($scope.idVideo).success(function(data){
		$scope.video=data;
		console.log($scope.video);
	});
	
	$scope.vidList = videoServis.getVidList();
	console.log($scope.vidList);
	
	$scope.setCurrentVideo = function(){
		
	};
});