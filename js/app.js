var myApp = angular.module('myApp',
    ['ngRoute']);

myApp.run(['$rootScope', function($rootScope, $location) {

}]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).
    when('/recover-password', {
        templateUrl: 'views/recover-password.html',
        controller: 'RecoverPasswordController',
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);