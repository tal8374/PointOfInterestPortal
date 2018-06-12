myApp.controller('RegistrationController', ['$scope', 'registrationService', 'categoryService', 'countryService',
    'questionService', '$location',
    function ($scope, registrationService, categoryService, countryService, questionService, $location) {

        $scope.register = function () {
            var user =
                {
                    "userName": $scope.user.userName,
                    "password": $scope.user.password,
                    "firstName": $scope.user.firstName,
                    "lastName": $scope.user.lastName,
                    "city": $scope.user.city,
                    "country": $scope.user.country,
                    "categories": "[" + [$scope.user.category1, $scope.user.category2].toString() + "]",
                    "mail": $scope.user.email,
                    "question1": $scope.user.question1,
                    "question2": $scope.user.question2,
                    "answer1": $scope.user.answer1,
                    "answer2": $scope.user.answer2
                };

                if($scope.user.question1 == $scope.user.question2) {
                    $scope.errorRegisterMessage = "Please choose different questions";
                    return;
                }

            if($scope.user.category1 == $scope.user.category2) {
                $scope.errorRegisterMessage = "Please choose different categories";
                return;
            }

            registrationService.register(user)
                .then(function (response) {
                    $scope.errorRegisterMessage = null;

                    $location.path('/homepage');

                    console.log(response);
                }, function (response) {
                    $scope.errorRegisterMessage = response.data;
                    console.log(response);
                });
        };

        $scope.getCategories = function () {
            categoryService.getCategories()
                .then(function (response) {
                    $scope.categories = response.data;
                }, function (response) {
                    console.log(response);
                });
        };

        $scope.getCountries = function () {
            countryService.getCountries()
                .then(function (response) {
                    $scope.countries = response.data;
                    console.log(response.data);
                }, function (response) {
                    console.log(response);
                });
        };

        $scope.getQuestions = function () {
            questionService.getQuestions()
                .then(function (response) {
                    $scope.questions = response.data;
                    console.log(response.data);
                }, function (response) {
                    console.log(response);
                });
        };

        $scope.init = function () {

            setTimeout(function () {
                $scope.getQuestions();
            }, 2000);


            setTimeout(function () {
                $scope.getCategories();
            }, 0);


            $scope.getCountries();

        };

        $scope.init();


    }]);