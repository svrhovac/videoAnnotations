

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
    otherwise({
        redirectTo: '/'
    });
}]);