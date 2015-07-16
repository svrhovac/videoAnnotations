

var spa=angular.module("app", ["ngRoute"]);
            
spa.config(['$routeProvider',
function($routeProvider) {
$routeProvider.
    when('/', {
        templateUrl: '/view/mainView.html',
        controller: 'mainController'
    }).
    when('/video/:id', {
        templateUrl: '/view/videoView.html',
        controller: 'videoController'
    }).
	when('/video/:id/addAnnotation',{
		templateUrl: '/view/addAnnotationView.html',
        controller: 'addAnnotationController'
	}).
	when('//video/:id/editAnnotation/:id_anno',{
		templateUrl: '/view/editAnnotationView.html',
        controller: 'editAnnotationController'
	}).
    otherwise({
        redirectTo: '/'
    });
}]);