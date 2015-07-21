

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
	when('/video/:id/annotation',{
		templateUrl: 'views/annotationView.html',
        controller: 'addAnnotationController'
	}).
	when('/video/:id/editAnnotation/:id_anno',{
		templateUrl: 'views/editAnnotationView.html',
        controller: 'editAnnotationController'
	}).
	when('/statistic/:id')
    otherwise({
        redirectTo: '/views/statisticView.html'
    });
}]);