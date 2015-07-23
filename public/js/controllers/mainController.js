spa.controller("mainController", function($scope, $location, $routeParams, videoService){
	
	$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
	
	
	//$scope.vidList = videoService.getVideos();

	videoService.setCurrAnno({"startTime":0});

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
    
});