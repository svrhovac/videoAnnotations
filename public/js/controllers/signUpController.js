spa.controller("signUpController", function($scope){
	
	
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
});