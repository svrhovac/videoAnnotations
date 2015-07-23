
<<<<<<< HEAD

var spa=angular.module("app", ["ngRoute", "ui.bootstrap"]);
            
spa.config(['$routeProvider',function($routeProvider) {$routeProvider.
=======
var spa=angular.module("app", ["ngRoute"]);

spa.config(['$routeProvider',
function($routeProvider) {
$routeProvider.
>>>>>>> d84d5530e89364ad44fbc165d58dcede32f2b137
    when('/', {
        templateUrl: 'views/mainView.html',
        controller: 'mainController'
    }).
    when('/video/:id', {
        templateUrl: 'views/videoView.html',
        controller: 'videoController'
    }).
	when('/statistic', {
        templateUrl: 'views/statisticView.html',
        controller: 'statisticController'
    }).
	when('/search', {
        templateUrl: 'views/searchView.html',
        controller: 'searchCtrl'
    }).
	when('/signup', {
        templateUrl: 'views/signUpView.html',
        controller: 'signUpController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
