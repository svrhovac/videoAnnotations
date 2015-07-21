

var spa=angular.module("app", ["ngRoute"]);
            
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
	when('/statistic',{
        templateUrl: 'views/statisticView.html',
        controller: 'statisticController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);