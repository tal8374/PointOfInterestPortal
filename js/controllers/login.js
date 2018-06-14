myApp.controller('LoginController', ['$scope', '$location', 'loginService', 'myLocalStorageService', '$rootScope',
    function ($scope, $location, loginService, myLocalStorageService, $rootScope) {

        $scope.login = function () {
            loginService.login($scope.user)
                .then(function (response) {
                    console.log(response.data.token);
                    myLocalStorageService.set('token', response.data.token)

                    var token =response.data.token;

                    var playload = JSON.parse(atob(token.split('.')[1]));
                    $rootScope.currentUser = playload;

                    console.log($scope.currentUser);

                    $location.path('/homepage');
                }, function (response) {
                    console.log(response);
                });
        };

        $scope.logout =function () {
            $rootScope.currentUser = null;
        }

    }]);