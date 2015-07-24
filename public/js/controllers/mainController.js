spa.controller("mainController", function($scope, $location, $routeParams, $http, videoService){
	
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
	
	$scope.formatTime = function(t){
	    //var t = parseInt(t, 10); // don't forget the second param
	    console.log(t);
	    var hours   = Math.floor(t / 3600);
	    var minutes = Math.floor((t - (hours * 3600)) / 60);
	    var seconds = t - (hours * 3600) - (minutes * 60);
	    //console.log(hours + " "+ minutes + " " + seconds);
	    if (hours   < 10) {hours = "0"+hours}
	    if (minutes < 10) {minutes = "0"+minutes}
	    if (seconds < 10) {seconds = "0"+seconds}
	    var time    = hours+":"+minutes+":"+seconds;
	    return time;
	};
	
	//$scope.vidList = videoService.getVideos();
	//$scope.user = loginService.getUser();
	//$scope.login = loginService.getLoginStatus();

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
	}).
	error(function(data){
		console.log("Connection with server interrupted!!!");
	});
	$scope.ser = function (){//MILAN SEARCH
		$location.path('/search');
		//console.log("enter radi");
	}
	$scope.signIn = function(email, pass){
		/*loginService.checkUser(email, pass).success(function(data){
			if(!data.email){
				document.getElementById("email-input").value = "";
				document.getElementById("email-input").placeholder = "invalid e-mail";
			}
			if(!data.password){
				document.getElementById("pass-input").value = "";
				document.getElementById("pass-input").placeholder = "invalid password";
			}
			else if(data.email && data.password){
				$location.path("/");
			}
		});*/
		console.log(email+"  "+pass);
		$scope.user = email;
		$scope.login = true;
		loginService.setUser(email);
		loginService.setLoginStatus(true);
	};

	$scope.geoTest = function(){
		$http.post("freegeoip.net/json/github.com").success(function(data){
			console.log(data);
		});
	};
});