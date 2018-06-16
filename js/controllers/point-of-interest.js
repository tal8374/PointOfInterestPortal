myApp.controller('pointOfInterestController', ['$scope', 'pointOfInterestService', '$routeParams', '$rootScope',
    '$mdDialog', '$q',
    function ($scope, pointOfInterestService, $routeParams, $rootScope, $mdDialog, $q) {

        $scope.pointOfInterestId = $routeParams.id;
        $scope.reviewRank = 0;
        $scope.reviewContent = "";
        $scope.isReviewAdded = false;

        var self = this;

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.createReview = function () {

            $scope.isReviewAdded = true;

            console.log($scope.reviewRank);
            console.log($scope.reviewContent);

            pointOfInterestService.createPOIReview($scope.pointOfInterestId, 14, $scope.reviewContent).then(function () {

                setTimeout(function () {

                    pointOfInterestService.createPOIRank($scope.pointOfInterestId, 14, $scope.reviewRank).then(function () {
                        $scope.getPOI();
                    });

                }, 2000);
            });

        };

        $scope.doRank = function (rank) {
            $scope.reviewRank = rank;
        };

        $scope.getPOI = function () {

            console.log($scope.isReviewAdded);
            console.log("here");

            pointOfInterestService.getPOI($scope.pointOfInterestId).then(function (POI) {
                $scope.currentPOI = POI.data[0];

                setTimeout(function () {
                    $scope.getPOIVisits($scope.pointOfInterestId).then(function () {

                        setTimeout(function () {

                            $scope.getPOIReviews().then(function () {
                                setTimeout(function () {

                                    $scope.getPOIRanks().then(function () {


                                        setTimeout(function () {

                                            if (!$scope.isReviewAdded) {
                                                $scope.addVisit();
                                            }

                                        }, 0);

                                    });
                                }, 0);
                            });
                        }, 0);
                    });
                }, 0);
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

                    console.log(POIRanks);

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
            pointOfInterestService.createUserPOI($scope.pointOfInterestId).then(function (POI, userId) {
            });
        };

        $scope.removeFromUserFavorite = function () {
            pointOfInterestService.deleteUserPOI($scope.pointOfInterestId).then(function (POI, userId) {
            });
        };

        $scope.addVisit = function () {
            return $q(function (resolve, reject) {
                return pointOfInterestService.createPOIVisit($scope.pointOfInterestId, 14).then(function () {
                    return resolve();
                });
            })
        };

        $scope.getPOI();

    }]);