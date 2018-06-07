var myApp = angular.module('myApp',
    ['ngRoute']);

myApp.run(['$rootScope', function($rootScope, $location) {

}]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).
    when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController',
    }).
    when('/homepage', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageController',
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);