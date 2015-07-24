spa.controller("searchCtrl", function($scope, $routeParams, videoService, searchService){
	
	searchService.getRez($scope.$parent.searchText).success(function(data){
		$scope.rez = data;
		console.log(data);
	});
	
	
	$scope.$parent.search = function(){
		searchService.getRez($scope.$parent.searchText).success(function(data){
		$scope.rez = data;
		});
	}
	
});