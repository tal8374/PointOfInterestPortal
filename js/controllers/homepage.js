myApp.controller('HomepageController', ['$scope', 'pointOfInterestService', '$location', 'myLocalStorageService',
    'loginService', '$q',
    function ($scope, pointOfInterestService, $location, myLocalStorageService, loginService, $q) {

        $scope.getPOI = function () {
            pointOfInterestService.getPOICategoryList().then(function (pointOfInterests) {
                $scope.pointsOfInterest = [];
                // $scope.pointsOfInterest = pointOfInterests.data;

                console.log(pointOfInterests.data);

                setTimeout(function () {
                    $scope.getUserPOI().then(function () {

                        setTimeout(function () {

                            loginService.getUserCategories().then(function (userCategories) {
                                $scope.firstCategoryPOI = [];
                                $scope.secondCategoryPOI = [];

                                pointOfInterests.data.forEach(function (poi) {


                                    if(poi.categoryId === userCategories.data[0].categoryId) {
                                        $scope.firstCategoryPOI.push(poi);
                                    }

                                    if(poi.categoryId === userCategories.data[1].categoryId) {
                                        $scope.secondCategoryPOI.push(poi);
                                    }
                                    //
                                    // $scope.pointsOfInterest.push($scope.firstCategoryPOI[$scope.firstCategoryPOI.length-1]);
                                    // $scope.pointsOfInterest.push(firstCategoryPOI[firstCategoryPOI.length-2]);
                                    // $scope.pointsOfInterest.push(firstCategoryPOI[secondCategoryPOI.length-1]);
                                    // $scope.pointsOfInterest.push(firstCategoryPOI[secondCategoryPOI.length-2]);
                                })

                                $scope.firstCategoryPOI = $scope.firstCategoryPOI.slice(0, 2);
                                $scope.secondCategoryPOI = $scope.secondCategoryPOI.slice(0, 2);

                            });
                        }, 0);
                    });
                }, 0);
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

        $scope.getPOI();

    }]);