myApp.service('loginService', ['$http', '$rootScope', function ($http, $rootScope) {

    var serverUrl = 'http://localhost:1235/';

    var factory = {};

    factory.login = function (userData) {
        return $http.post(serverUrl + "login/", userData);
    };

    factory.getUserCategories = function () {
        if(!$rootScope.currentUser || !$rootScope.currentUser.userId) return;

        return $http.get(serverUrl + "login/user/" + $rootScope.currentUser.userId, {});
    };

    return factory;
}]);