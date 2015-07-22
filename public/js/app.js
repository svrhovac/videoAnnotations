

var spa=angular.module("app", ["ngRoute","ngAnimate"]);
            
spa.config(['$routeProvider',
function($routeProvider) {
$routeProvider.
    when('/', {
        templateUrl: 'views/mainView.html',
        controller: 'mainController'
    }).
    when('/video/:id', {
        templateUrl: 'views/videoView.html',
        controller: 'videoController'
    }).
<<<<<<< HEAD
    when('statistic', {
=======
	when('/statistic',{
>>>>>>> 71c0fcf9dfa6b077b49d2d726ac7204b7d130daa
        templateUrl: 'views/statisticView.html',
        controller: 'statisticController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);