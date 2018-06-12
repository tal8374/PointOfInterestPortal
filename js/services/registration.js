myApp.service('registrationService', ['$http',
    function ($http) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        factory.register = function (user) {
            return $http.post(serverUrl + "register/", user);
        };

        return factory;
    }]);