'use strict';

angular.module('home')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: './modules/home/partials/home.partial.html',
            controller: 'homeController'
        });
    }]);

