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
        
            spa.factory("myFactory", ["$http", function($http){
                
                var vidList=[];
                /*fact.vidList=[
                    {name:'prvi video', author: 'marko', duration: '3:45', path:'video1.mp4'},
                    {name:'drugi video', author: 'zarko', duration: '2:25', path:'video2.mp4'},
                    {name:'treci video', author: 'tarko', duration: '2:25', path:'video3.mp4'},
                    {name:'cetvr video', author: 'neko', duration: '2:25', path:'video4.mp4'},
                    {name:'pet video', author: 'zeko', duration: '2:25', path:'video5.mp4'},
                    {name:'ses video', author: 'deko', duration: '2:25', path:'video6.mp4'},
                    {name:'sem video', author: 'leko', duration: '2:25', path:'video7.mp4'},
                    {name:'osam video', author: 'beko', duration: '2:25', path:'video8.mp4'}];*/
                
                
                fact.getVidList = function(){
                    return vidList;
                };
                fact.setVidList = function(data){
                    vidList = data;
                };
                /*fact.setPosition = function(p){
                    fact.currentVideo=p;
                };
                fact.getPosition = function(){
                    return fact.currentVideo;
                };*/
                
                return vidList;
            }]);
            /*spa.controller("mainContoller", ["$scope", "myFactory", function($scope, $location, myFactory){
                $scope.vidList=myFactory;

                $scope.setVideo = function(pos){
                console.log(localStorage.getItem('currentVideo'));
                    
                };
                
                $scope.pom=function(str){
                    //console.log($scope.vidList[$scope.currentVideo]);
                    //console.log(str + $scope.currentVideo);
                    //console.log($scope.vidList[$scope.currentVideo].path);
                };
                
                $scope.openVideoGallery = function(pos){
                    $scope.setVideo(pos);
                    //console.log($scope.currentVideo);
                    $location.path("/video.html");
                };
            }]);*/
            spa.controller('secondaryController',function($scope,$location, myFactory){
                $scope=myFactory.getVidList();
            });
    
            spa.controller('mainController',function($scope, $location, myFactory){
                
                
                var currentVideo=0;
                
                $scope.vidList=[
                    {name:'prvi video', author: 'marko', duration: '3:45', path:'video1.mp4'},
                    {name:'drugi video', author: 'zarko', duration: '2:25', path:'video2.mp4'},
                    {name:'treci video', author: 'tarko', duration: '2:25', path:'video3.mp4'},
                    {name:'cetvr video', author: 'neko', duration: '2:25', path:'video4.mp4'},
                    {name:'pet video', author: 'zeko', duration: '2:25', path:'video5.mp4'},
                    {name:'ses video', author: 'deko', duration: '2:25', path:'video6.mp4'},
                    {name:'sem video', author: 'leko', duration: '2:25', path:'video7.mp4'},
                    {name:'osam video', author: 'beko', duration: '2:25', path:'video8.mp4'}];
                
                $scope.setVideo = function(pos){
                    localStorage.setItem('currentVideo',pos);
                    
                    
                    console.log(localStorage.getItem('currentVideo'));
                    console.log(myFactory.getPosition());
                    
                };
                
                $scope.pom=function(str){
                    //console.log($scope.vidList[$scope.currentVideo]);
                    //console.log(str + $scope.currentVideo);
                    //console.log($scope.vidList[$scope.currentVideo].path);
                };
                
                $scope.openVideoGallery = function(pos){
                    $scope.setVideo(pos);
                    //console.log($scope.currentVideo);
                    $location.path("/video.html");
                };
            });