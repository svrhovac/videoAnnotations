

var spa=angular.module("app", ["ngRoute"]);
            
spa.config(['$routeProvider',
function($routeProvider) {
$routeProvider.
    when('/', {
        templateUrl: '/views/mainView.html',
        controller: 'mainController'
    }).
    when('/video/:id', {
        templateUrl: '/views/videoView.html',
        controller: 'videoController'
    }).
	when('/video/:id/addAnnotation',{
		templateUrl: '/views/addAnnotationView.html',
        controller: 'addAnnotationController'
	}).
	when('//video/:id/editAnnotation/:id_anno',{
		templateUrl: '/views/editAnnotationView.html',
        controller: 'editAnnotationController'
	}).
    otherwise({
        redirectTo: '/'
    });
}]);