myApp.service('recoverPasswordService',['$http', function ($http) {

    var serverUrl = 'http://localhost:1235/';

    var factory = {};

    factory.getUserQuestions = function (userName) {
        return $http.post(serverUrl + "login/questions", {userName});
    };

    factory.recoverUserPassword = function (user) {
        return $http.put(serverUrl + "login/recoverPassword/", user);
    };

    return factory;

}]);