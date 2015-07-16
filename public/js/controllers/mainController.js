spa.controller("mainController", function($scope, $location, $http, $routeParams, videoServis){
    $scope.vidList = [];
	$http.get('/videos').success(function(data){
		videoServis.setVidList(data);
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
    
    $scope.getVideo = function(pin){
	   var request="/videos/" + videoServis.vidList[pin]._id;
	   
	   $http.get(request).success(function(data){
			videoServis.setCurrentVideo(data);
		}).
		error(function(data){
			console.log("Connection with server interrupted!!!");
		});
    };
	
	$scope.getId = function(){
		return videoServis.getId();
	};
	
    $scope.goToView2 = function(pin){
        return vidList[pin]._id;
        console.log(pin);
        //$location.path("/view2.html");
    };
    
    $scope.getVidList = function(){
		
		$scope.vidList = videoServis.getVidList();
        return $scope.vidList;
    };
    
    $scope.setCurrentVideo = function(pin){
        videoServis.currentVideo=$scope.getVideo(pin);
    };
    
    /*$scope.getCurrentVideo = function(){
        return videoServis.getCurrentVideo();
    };
    
    $scope.nextVideo = function(){
        videoServis.goToNextVideo();
    };
    
    $scope.prevVideo = function(){
        videoServis.goToPrevVideo();
    };
    */
    $scope.pom = function(pom){
        console.log(pom);
    };
});