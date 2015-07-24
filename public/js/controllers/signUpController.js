spa.controller("signUpController", function($scope,signUpService){
	
	$scope.isFromEU = false;
	//$scope.respons.message = "";
	
	
		signUpService.fromEU().success(function(data){
		$scope.isFromEU = data;
		});
	
	
	$scope.error = false;

	//TODO postaviti automacku validaciju od angulara - kao za email
	$scope.signUp = function(){
		console.log("signUp");
		$scope.error = false;
		$scope.errText = "";
		if($scope.user.pass != $scope.user.passConfirm ){
			$scope.error = true;
			document.getElementById("password").style.borderColor="red";
			document.getElementById("rePassword").style.borderColor="red";
			$scope.errText = "Passwords mismatch."
			return;
		} 
	if(!$scope.myForm.$valid || !!$scope.myForm.$error.required || !!$scope.myForm.$error.minlength ){
		$scope.errText = "Password is too short";
		$scope.error = true;
		console.log("Nevalidno");
		console.log(!$scope.myForm.$valid);
		console.log(!!$scope.myForm.$error.required);
		console.log( !!$scope.myForm.$error.minlength);
		return;
	}
		//gotova validacija
		
		signUpService.registerNewUser($scope.user).success(function(data){
			$scope.respons = data;
			signUpService.loginStatus(true);
		}).
		error(function(data) {
			$scope.respons = data;
		});
		

	};	
}); 
