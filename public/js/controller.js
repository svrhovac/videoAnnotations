var spa=angular.module('myApp',['ngRoute']);
		
            spa.config(['$routeProvider',
            function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'mainPage.html',
                    controller: 'mainController'
                }).
                when('/video.html', {
                    templateUrl: 'video.html',
                    controller: 'mainController'
                }).
                otherwise({
                    redirectTo: '/'
                });
            }]);
		
            spa.controller('mainController',function($scope, $location, $http){
                
                $scope.currentVideo=0;
                
                $http.get('js/data.json')
                    .success(function (data) {
                    $scope.vidList = data;                
                });
                
                $scope.setVideo = function(pos){
                    currentVideo=pos;
                    //console.log(currentVideo);
                };
                
                $scope.pom=function(){
                    //console.log($scope.vidList[$scope.currentVideo]);
                    //console.log($scope.currentVideo);
                    //console.log($scope.vidList[$scope.currentVideo].path);
                };
                
                $scope.openVideoGallery = function(pos){
                    $scope.setVideo(pos);
                    //console.log($scope.currentVideo);
                    $location.path("/video.html");
                };
            });