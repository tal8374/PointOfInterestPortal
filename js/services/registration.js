myApp.service('registrationService', ['$http', function ($http) {

    var serverUrl = 'http://localhost:8080/'

    $scope.register = function (user) {
        $http.post(serverUrl + "Users/", user)
            .then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
    };

}]);