myApp.service('loginService', ['$http', function ($http) {

    var serverUrl = 'http://localhost:1235/';

    var factory = {};

    factory.login = function (userData) {
        return $http.post(serverUrl + "login/", userData);
    };

    factory.getUserCategories = function () {
        return $http.get(serverUrl + "login/user/" + 17, {});
    };

    return factory;
}]);