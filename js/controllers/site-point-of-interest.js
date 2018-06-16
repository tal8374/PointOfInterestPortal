myApp.controller('sitePointOfInterestController', ['$scope', 'pointOfInterestService', '$location',
    function ($scope, pointOfInterestService, $location) {

        $scope.getPOI = function () {
            pointOfInterestService.getPOIList().then(function (pointOfInterests) {
                $scope.pointsOfInterest = pointOfInterests.data;

                setTimeout(function () {
                    $scope.getUserPOI();
                }, 0);
            })
        };

        $scope.getUserPOI = function () {
            pointOfInterestService.getUserPOI().then(function (pointOfInterests) {
                $scope.userPointsOfInterest = pointOfInterests.data;
            })
        };

        $scope.goToPOI = function (pointOfInterest) {
            console.log('/point-of-interest/' + pointOfInterest.pointOfInterestId);

            $location.path('/point-of-interest/' + pointOfInterest.pointOfInterestId);
        };

        $scope.removeFromFavorites = function (poi) {
            pointOfInterestService.deleteUserPOI(poi.pointOfInterestId).then(function () {})
        };

        $scope.addFromFavorites = function (poi) {
            pointOfInterestService.createUserPOI(poi.pointOfInterestId).then(function () {})
        };

        $scope.getPOI();

    }]);