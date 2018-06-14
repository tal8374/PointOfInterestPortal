myApp.controller('pointOfInterestController', ['$scope', 'pointOfInterestService', '$routeParams', '$rootScope',
    function ($scope, pointOfInterestService, $routeParams, $rootScope) {

        $scope.pointOfInterestId = $routeParams.id;

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

        $scope.rate = function (rank) {
            // var userId = $rootScope.currentUser.userId;

            // pointOfInterestService.getPOIReviews($scope.pointOfInterestId, userId, rank).then(function (POIReviews) {
            //
            // });
        };

        $scope.addReview = function () {
            // $mdDialog.show({
            //     controller: DialogController,
            //     templateUrl: '../views/recover-password.html',
            //     // parent: angular.element(document.body),
            //     targetEvent: ev,
            //     clickOutsideToClose: true,
            //     // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            // })
            //     .then(function (answer) {
            //         $scope.status = 'You said the information was "' + answer + '".';
            //     }, function () {
            //         $scope.status = 'You cancelled the dialog.';
            //     });
        };


        // function DialogController($scope, $mdDialog) {
        //     $scope.hide = function () {
        //         $mdDialog.hide();
        //     };
        //
        //     $scope.cancel = function () {
        //         $mdDialog.cancel();
        //     };
        //
        //     $scope.answer = function (answer) {
        //         $mdDialog.hide(answer);
        //     };
        // }

        $scope.getPOI();

    }]);