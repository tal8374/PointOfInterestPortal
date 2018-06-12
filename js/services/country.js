myApp.service('countryService', ['$http',
    function ($http) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        factory.getCountries = function () {
            return $http.get(serverUrl + "country/list", {});
        };

        return factory;
    }]);