myApp.controller('userPointOfInterestController', ['$scope', 'pointOfInterestService', '$location', '$q',
    'categoryService', 'myLocalStorageService', '$rootScope',
    function ($scope, pointOfInterestService, $location, $q, categoryService, myLocalStorageService,
              $rootScope) {

        $scope.filteredRank = 0;
        $scope.chosenFilteredCategory = "Don't filter by category";

        $scope.getUserPOI = function () {

            pointOfInterestService.getPOIList().then(function (pointOfInterests) {
                $scope.userPointsOfInterest = [];

                let favorites = myLocalStorageService.getFavorites();

                pointOfInterests.data.forEach(function (poi) {
                    const index = favorites.indexOf(poi.pointOfInterestId);


                    if (index !== -1) $scope.userPointsOfInterest.push(poi);
                });


                pointOfInterestService.getPOICategoryList().then(function (pointOfInterestCategories) {
                    $scope.PointsOfInterestCategories = pointOfInterestCategories.data;

                    $scope.updatePOICategory();


                    pointOfInterestService.getPOIRankList().then(function (pointOfInterestRanks) {

                        $scope.getCategories();

                        $scope.PointsOfInterestRanks = pointOfInterestRanks.data;

                        $scope.updatePOIRank();


                    });
                });


            })
        };

        $scope.updatePOICategory = function () {
            $scope.PointsOfInterestCategories.forEach(function (poi) {
                for (let i = 0; i < $scope.userPointsOfInterest.length; i++) {
                    if ($scope.userPointsOfInterest[i].pointOfInterestId === poi.pointOfInterestId) {
                        $scope.userPointsOfInterest[i]["category"] = poi.name;
                    }
                }

            })
        };

        $scope.updatePOIRank = function () {

            for (let i = 0; i < $scope.userPointsOfInterest.length; i++) {
                let num = 0;
                let total = 0;

                $scope.PointsOfInterestRanks.forEach(function (poi) {
                    if ($scope.userPointsOfInterest[i].pointOfInterestId === poi.pointOfInterestId) {
                        total += poi.rank;

                        num += 1;
                    }
                });

                $scope.userPointsOfInterest[i]["rank"] = num === 0 ? 0 : total / num;
            }
        };

        $scope.getCategories = function () {
            categoryService.getCategories()
                .then(function (response) {
                    $scope.categories = response.data;

                }, function (response) {
                    console.log(response);
                });
        };

        $scope.goToPOI = function (pointOfInterest) {
            $location.path('/point-of-interest/' + pointOfInterest.pointOfInterestId);
        };

        $scope.removeFromFavorites = function (poi) {
            myLocalStorageService.removeFavorite(poi.pointOfInterestId)
            $scope.getUserPOI();
        };

        $scope.greaterThan = function (prop, val) {
            return function (item) {
                if ($scope.filteredRank > 5 || $scope.filteredRank < 0) {
                    $scope.errorMessage = "Filter by number should be between 0 to 5";
                    return true;
                }

                $scope.errorMessage = null;

                return item[prop] >= $scope.filteredRank;
            }
        };

        $scope.greaterThan = function (prop, val) {
            return function (item) {
                if ($scope.filteredRank > 5 || $scope.filteredRank < 0) {
                    $scope.errorMessage = "Filter by number should be between 0 to 5";
                    return true;
                }

                $scope.errorMessage = null;

                return item[prop] >= $scope.filteredRank;
            }
        };

        $scope.equalToCategory = function (prop, val) {
            return function (item) {
                if ($scope.chosenFilteredCategory === "Don't filter by category") {
                    return true;
                }

                return item[prop] === $scope.chosenFilteredCategory;
            }
        };

        $scope.saveFavorites = function () {
            let favorites = myLocalStorageService.getFavorites();

            pointOfInterestService.createUserPOI(favorites).then(function () {
                $scope.errorMessageCreate = null;

            }).catch(function (err) {
                console.log(err);
                $scope.errorMessageCreate = err.data;
            })

        };

        $scope.getUserPOI();

    }]);