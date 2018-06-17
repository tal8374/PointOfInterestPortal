myApp.controller('sitePointOfInterestController', ['$scope', 'pointOfInterestService', '$location',
    'myLocalStorageService', '$rootScope',
    function ($scope, pointOfInterestService, $location, myLocalStorageService, $rootScope) {

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
            $location.path('/point-of-interest/' + pointOfInterest.pointOfInterestId);
        };

        $scope.removeFromFavorites = function (poi) {
            myLocalStorageService.removeFavorite(poi.pointOfInterestId);

            $scope.getPOI();
        };

        $scope.addFromFavorites = function (poi) {
            myLocalStorageService.addFavorite(poi.pointOfInterestId);

            $scope.getPOI();
        };

        $scope.isInFavorites = function (poi) {
            let favorites = myLocalStorageService.getFavorites();

            return favorites.includes(poi.pointOfInterestId);
        };

        $scope.getPOI();

    }]);