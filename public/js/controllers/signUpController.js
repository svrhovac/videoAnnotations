spa.controller("signUpController", function($scope){
	
	
	$scope.error = true;

	$scope.signUp = function(){
		if($scope.user.pass != $scope.user.passConfirm){
			console.log($('[ng-model="pass"]'));
			return;
		}
		//posalj serveru podatke
		
		
		//$timeout(function(){$location.path("/");}, 4000);
	};	
});