myApp.controller('RegistrationController', ['$scope', 'registrationService',
    function ($scope, registrationService) {

        let user = {
            userName: "Shir",
            password: "abcd",
            isAdmin: true
        }

        $scope.register = function () {

            registrationService.register($scope.user);
        };

    }]);