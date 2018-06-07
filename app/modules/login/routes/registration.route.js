'use strict';

angular.module('registration')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: './modules/registration/partials/registration.partial.html',
            controller: 'registrationController'
        });
    }]);

