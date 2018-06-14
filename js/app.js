var myApp = angular.module('myApp', ['ngRoute']);

myApp.run(['$rootScope', function ($rootScope) {

}]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).when('/recover-password', {
        templateUrl: 'views/recover-password.html',
        controller: 'RecoverPasswordController',
    }).when('/homepage', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageController',
    }).when('/point-of-interest/:id', {
        templateUrl: 'views/point-of-interest.html',
        controller: 'pointOfInterestController',
    }).otherwise({
        redirectTo: '/homepage'
    });
}]);