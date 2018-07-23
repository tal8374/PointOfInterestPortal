myApp.controller('HomepageController', ['$scope', 'pointOfInterestService', '$location', 'myLocalStorageService',
    'loginService', '$q', '$rootScope',
    function ($scope, pointOfInterestService, $location, myLocalStorageService, loginService, $q,
              $rootScope) {

        $scope.init = function () {
            if (!$rootScope.currentUser || !$rootScope.currentUser.userId) {
                $scope.showRandomPOI();
            } else {
                $scope.showPOIByUserCategory();
            }
        };

        $scope.showPOIByUserCategory = function () {
            pointOfInterestService.getPOICategoryList().then(function (pointOfInterests) {

                $scope.getUserPOI().then(function () {

                    loginService.getUserCategories().then(function (userCategories) {

                       $scope.filterPOIByUserCategory(pointOfInterests, userCategories);

                    });
                });
            })
        };

        $scope.filterPOIByUserCategory = function (pointOfInterests, userCategories) {
            $scope.firstCategoryPOI = [];
            $scope.secondCategoryPOI = [];

            pointOfInterests.data.forEach(function (poi) {
                if (poi.categoryId === userCategories.data[0].categoryId) {
                    $scope.firstCategoryPOI.push(poi);
                }

                if (poi.categoryId === userCategories.data[1].categoryId) {
                    $scope.secondCategoryPOI.push(poi);
                }

            });

            $scope.firstCategoryPOI = $scope.firstCategoryPOI.slice(0, 2);
            $scope.secondCategoryPOI = $scope.secondCategoryPOI.slice(0, 2);
        };

        $scope.showRandomPOI = function () {
            pointOfInterestService.getPOIList().then(function (pointOfInterests) {
                $scope.pointsOfInterest = pointOfInterests.data;

                $scope.chooseRandomPOI();
            });
        };

        $scope.chooseRandomPOI = function () {
            var size = $scope.pointsOfInterest.length;
            var random = parseInt(Math.random() * size);

            $scope.randomPOI = [$scope.pointsOfInterest[random % size], $scope.pointsOfInterest[(random + 1) % size],
                $scope.pointsOfInterest[(random + 2) % size]];
        };

        $scope.getUserPOI = function () {

            return $q(function (resolve, reject) {
                pointOfInterestService.getUserPOI().then(function (pointOfInterests) {
                    console.log(pointOfInterests);
                    $scope.userPointsOfInterest = [];

                    if (pointOfInterests.data.length >= 1) $scope.userPointsOfInterest
                        .push(pointOfInterests.data[pointOfInterests.data.length - 1]);

                    if (pointOfInterests.data.length >= 2) $scope.userPointsOfInterest
                        .push(pointOfInterests.data[pointOfInterests.data.length - 2]);

                    return resolve();
                })
            })

        };

        $scope.goToPOI = function (pointOfInterest) {
            $location.path('/point-of-interest/' + pointOfInterest.pointOfInterestId);
        };

        $scope.moveToLoginPage = function () {
            $location.path('/login');
        };

        $scope.moveToRegisterPage = function () {
            $location.path('/register');
        };

        $scope.init();

    }]);