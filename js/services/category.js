myApp.service('categoryService', ['$http',
    function ($http) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        factory.getCategories = function () {
            return $http.get(serverUrl + "category/list", {});
        };

        return factory;
    }]);