spa.controller("loginController", function($scope, $location, $timeout, loginService){
	
	$scope.showSignUp = true;

	$scope.signUp = function(email, pass, passConfirm){
		if(pass != passConfirm){
			document.getElementById("pass-input-s").value = "";
			document.getElementById("pass-input-confirm-s").value = "";
			document.getElementById("pass-input-s").placeholder = "password did not match";
			document.getElementById("pass-input-confirm-s").placeholder = "password did not match";
			return;
		}
		//posalj serveru podatke
		$scope.showSignUp = false;
		loginService.setLoginStatus(false);
		$timeout(function(){$location.path("/");}, 4000);
	};

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