'use strict';

angular.module('login')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: './modules/login/partials/login.partial.html',
            controller: 'loginController'
        });
    }]);

