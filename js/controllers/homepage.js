myApp.controller('HomepageController', ['$scope', 'pointOfInterestService', '$location', 'myLocalStorageService',
    'loginService', '$q', '$rootScope', '$location',
    function ($scope, pointOfInterestService, $location, myLocalStorageService, loginService, $q,
              $rootScope, $location) {

        $scope.getPOI = function () {

            if (!$rootScope.currentUser || !$rootScope.currentUser.userId) {
                return [];
            }

            pointOfInterestService.getPOICategoryList().then(function (pointOfInterests) {
                $scope.pointsOfInterest = [];

                $scope.getUserPOI().then(function () {

                    loginService.getUserCategories().then(function (userCategories) {
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
                    });
                });
            })
        };

        $scope.getUserPOI = function () {

            return $q(function (resolve, reject) {
                pointOfInterestService.getUserPOI().then(function (pointOfInterests) {
                    $scope.userPointsOfInterest = [];

                    if (pointOfInterests.data.length > 1) $scope.userPointsOfInterest.push(pointOfInterests.data[pointOfInterests.data.length - 1]);

                    if (pointOfInterests.data.length > 2) $scope.userPointsOfInterest.push(pointOfInterests.data[pointOfInterests.data.length - 2]);

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

        $scope.getPOI();

    }]);