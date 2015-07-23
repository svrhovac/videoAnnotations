spa.controller("signUpController", function($scope,signUpService){
	
	$scope.isFromEU = false;
	
	
		signUpService.fromEU().success(function(data){
		$scope.isFromEU = data;
		});
	
	
	$scope.error = false;

	$scope.signUp = function(){
		if($scope.user.pass != $scope.user.passConfirm || $scope.user.pass.length < 8){
			$scope.error = true;
			document.getElementById("password").style.borderColor="red";
			document.getElementById("rePassword").style.borderColor="red";
			$scope.errText = "Password is too short or passwords mismatch."
			return;
		} 
	};	
});