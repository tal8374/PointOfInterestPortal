myApp.controller('RecoverPasswordController', ['$scope', 'recoverPasswordService', 'questionService', 'filterFilter',
    '$location',
    function ($scope, recoverPasswordService, questionService, filterFilter, $location) {

        $scope.isUserQuestionExists = false;

        $scope.getUserQuestions = function () {
            recoverPasswordService.getUserQuestions($scope.user.userName).then(function (questions) {
                $scope.user.question1 = questions.data[0].question1;
                $scope.user.question2 = questions.data[0].question2;

                questionService.getQuestions().then(function (questions) {
                    console.log(questions);

                    $scope.user.question1 = filterFilter(questions.data, {questionId: $scope.question1})[0];
                    $scope.user.question2 = filterFilter(questions.data, {questionId: $scope.question2})[0];

                    $scope.isUserQuestionExists = true;

                });

            }).catch(function (err) {
                console.log(err);
            })

        };

        $scope.deleteUserQuestions = function () {
            $scope.user = {};
            $scope.isUserQuestionExists = false;
        };

        $scope.recoverPassword = function () {
            $scope.user.question1 = "" + $scope.user.question1.questionId;
            $scope.user.question2 = "" + $scope.user.question2.questionId;

            console.log($scope.user);

            recoverPasswordService.recoverUserPassword($scope.user).then(function (result) {
                $location.path('/homepage');
            })
        };

    }]);