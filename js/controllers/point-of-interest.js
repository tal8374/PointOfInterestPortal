myApp.controller('pointOfInterestController', ['$scope', 'pointOfInterestService', '$routeParams', '$rootScope',
    '$mdDialog',
    function ($scope, pointOfInterestService, $routeParams, $rootScope, $mdDialog) {

        $scope.pointOfInterestId = $routeParams.id;

        $scope.close = function () {
            $rootScope.isModalOpen = false;

            $mdDialog.hide();
        };

        $scope.createReview = function () {
            console.log("created");
        };

        $scope.rate = function (rank) {
            console.log(rank);
        };

        $scope.getPOI = function () {
            pointOfInterestService.getPOI($scope.pointOfInterestId).then(function (POI) {
                $scope.currentPOI = POI.data[0];

                setTimeout(function () {
                    $scope.getPOIVisits($scope.pointOfInterestId)
                }, 0);

                setTimeout(function () {
                    $scope.getPOIReviews($scope.pointOfInterestId)
                }, 1000);

            });
        };

        $scope.getPOIReviews = function () {
            pointOfInterestService.getPOIReviews($scope.pointOfInterestId).then(function (POIReviews) {
                console.log("reviews");

                console.log(POIReviews);
            });
        };

        $scope.getPOIVisits = function () {
            pointOfInterestService.getPOIVisits($scope.pointOfInterestId).then(function (POIVisits) {
                console.log("visits");

                console.log(POIVisits);
            });
        };


        $scope.addReview = function () {
            console.log("clicked");

            $rootScope.isModalOpen = true;

            var createReview = $rootScope.$new();

            $mdDialog.show({
                templateUrl: 'views/create-review.html',
                controller: 'createReviewController as createReviewController',
                scope: createReview
            }).then(function (result) {
            }).catch(function (err) {
                $log.info(err);
            });
        };

        $scope.getPOI();

    }]);