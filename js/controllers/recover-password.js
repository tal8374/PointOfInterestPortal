myApp.controller('RecoverPasswordController', ['$scope',
    function ($scope) {

        $scope.isUserQuestionExists = false;

        $scope.getUserQuestions = function () {
            $scope.isUserQuestionExists = true;
        };

        $scope.deleteUserQuestions = function () {
            $scope.isUserQuestionExists = false;
        };

        $scope.recoverPassword = function () {
            console.log($scope.user);
        };

    }]);