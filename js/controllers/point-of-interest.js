myApp.controller('pointOfInterestController', ['$scope', 'pointOfInterestService', '$routeParams', '$rootScope',
    '$mdDialog', '$q', 'myLocalStorageService',
    function ($scope, pointOfInterestService, $routeParams, $rootScope, $mdDialog, $q, myLocalStorageService) {

        $scope.pointOfInterestId = $routeParams.id;
        $scope.reviewRank = 0;
        $scope.reviewContent = "";
        $scope.isReviewAdded = false;

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.createReview = function () {

            $scope.isReviewAdded = true;

            pointOfInterestService.createPOIReview($scope.pointOfInterestId, $rootScope.currentUser.userId, $scope.reviewContent).then(function () {


                pointOfInterestService.createPOIRank($scope.pointOfInterestId, $rootScope.currentUser.userId, $scope.reviewRank).then(function () {
                    $scope.getPOI();

                });

            });

        };

        $scope.doRank = function (rank) {
            $scope.reviewRank = rank;
        };

        $scope.getPOI = function () {

            pointOfInterestService.getPOI($scope.pointOfInterestId).then(function (POI) {
                $scope.currentPOI = POI.data[0];

                $scope.getPOIVisits($scope.pointOfInterestId).then(function () {

                    $scope.getPOIReviews().then(function () {

                        $scope.getPOIRanks().then(function () {


                            if (!$scope.isReviewAdded) {
                                $scope.addVisit();
                            }


                        });
                    });
                });
            });
        };

        $scope.getPOIReviews = function () {
            return $q(function (resolve, reject) {
                pointOfInterestService.getPOIReviews($scope.pointOfInterestId).then(function (POIReviews) {
                    $scope.reviews = POIReviews.data;
                    console.log(POIReviews);
                    return resolve();

                });
            })
        };

        $scope.getPOIVisits = function () {
            return $q(function (resolve, reject) {
                return pointOfInterestService.getPOIVisits($scope.pointOfInterestId).then(function (POIVisits) {
                    $scope.visits = POIVisits.data;

                    return resolve();
                });
            })
        };

        $scope.getPOIRanks = function () {
            return $q(function (resolve, reject) {
                return pointOfInterestService.getPOIRanks($scope.pointOfInterestId).then(function (POIRanks) {
                    $scope.rank = 0;

                    $scope.ranks = POIRanks.data;

                    POIRanks.data.forEach(function (rankData) {
                        $scope.rank += rankData.rank;
                    });

                    if (POIRanks.data.length > 0) {
                        $scope.rank = $scope.rank / POIRanks.data.length;
                    }

                    $scope.rank = parseInt($scope.rank * 20);

                    return resolve();
                });
            })
        };

        $scope.addToUserFavorite = function () {
            myLocalStorageService.addFavorite($scope.pointOfInterestId);
        };

        $scope.removeFromUserFavorite = function () {
            myLocalStorageService.removeFavorite($scope.pointOfInterestId);
        };

        $scope.addVisit = function () {
            return $q(function (resolve, reject) {

                if (!$rootScope.currentUser || !$rootScope.currentUser.userId) return;

                return pointOfInterestService.createPOIVisit($scope.pointOfInterestId, $rootScope.currentUser.userId).then(function () {
                    return resolve();
                });
            })
        };

        $scope.getPOI();

    }]);