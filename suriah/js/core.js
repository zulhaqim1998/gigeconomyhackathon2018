const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/student/signup', {
        templateUrl: '',
        controller: 'controllerTwo'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);