spa.controller("sineUpCtrl", function($scope, $routeParams, videoService, sineUpService){
	

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
	/*	
	$scope.test = function(){
		var text = element(by.binding('email.text'));
		var valid = element(by.binding('myForm.input.$valid'));
		var input = element(by.model('email.text'));

		it('should initialize to model', function() {
		  expect(text.getText()).toContain('me@example.com');
		  expect(valid.getText()).toContain('true');
		});

		it('should be invalid if empty', function() {
		  input.clear();
		  input.sendKeys('');
		  expect(text.getText()).toEqual('text =');
		  expect(valid.getText()).toContain('false');
		});

		it('should be invalid if not email', function() {
		  input.clear();
		  input.sendKeys('xxx');

		  expect(valid.getText()).toContain('false');
		});
	}
	*/
});
