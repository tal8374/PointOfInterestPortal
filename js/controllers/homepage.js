myApp.controller('HomepageController', ['$scope', 'pointOfInterestService', '$location',
    function ($scope, pointOfInterestService, $location) {

        $scope.getPOI = function () {
            pointOfInterestService.getPOIList().then(function (pointOfInterests) {
                $scope.pointsOfInterest = pointOfInterests.data;
            })
        };

        $scope.goToPOI = function (pointOfInterest) {
            console.log('/point-of-interest/' + pointOfInterest.pointOfInterestId);

            $location.path('/point-of-interest/' + pointOfInterest.pointOfInterestId);
        };

        $scope.getPOI();

    }]);