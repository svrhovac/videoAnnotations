spa.controller("signUpController", function($scope,signUpService){
	
	$scope.isFromEU = false;
	$scope.message = "";
	
	
		signUpService.fromEU().success(function(data){
		$scope.isFromEU = data;
		});
	
	
	$scope.error = false;

	//TODO postaviti automacku validaciju od angulara - kao za email
	$scope.signUp = function(){
		$scope.error = false;
		$scope.errText = "";
		if($scope.user.pass != $scope.user.passConfirm || $scope.user.pass.length < 8){
			$scope.error = true;
			document.getElementById("password").style.borderColor="red";
			document.getElementById("rePassword").style.borderColor="red";
			$scope.errText = "Password is too short or passwords mismatch."
			return;
		} 
		if($scope.myForm.input.$error.email || $scope.myForm.input.$error.password ) return;
		//gotova validacija
		
		signUpService.registerNewUser($scope.user).success(function(data){
				$scope.message = data;
				console.log(data);
		});
		

	};	
}); 
