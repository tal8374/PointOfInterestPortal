myApp.controller('LoginController', ['$scope', '$location', 'loginService', 'myLocalStorageService', '$rootScope',
    function ($scope, $location, loginService, myLocalStorageService, $rootScope) {

        $scope.login = function () {


            loginService.login($scope.user)
                .then(function (response) {
                    myLocalStorageService.set('token', response.data.token)

                    var token =response.data.token;

                    var playload = JSON.parse(atob(token.split('.')[1]));
                    $rootScope.currentUser = playload;

                    $location.path('/homepage');
                }, function (response) {
                    $scope.errorMessage = "User name or password is not correct";
                });
        };

        $scope.logout =function () {
            $rootScope.currentUser = null;

            myLocalStorageService.set('token', "")

        };

        $scope.moveToRecoverPage = function () {
            console.log("clicked");
            $location.path('/recover-password');

        };

        $scope.changeToRecoverPage = function () {
            $location.path('/recover-password');
        }

    }]);