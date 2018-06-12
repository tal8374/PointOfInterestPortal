myApp.service('questionService', ['$http',
    function ($http) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        factory.getQuestions = function () {
            return $http.get(serverUrl + "question/list", {});
        };

        return factory;
    }]);