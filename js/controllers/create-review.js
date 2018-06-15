myApp.controller('createReviewController', ['$scope', 'pointOfInterestService', '$location', '$mdDialog', '$rootScope',
    function ($scope, pointOfInterestService, $location, $mdDialog, $rootScope) {

        $scope.currentRank = 0;

        $scope.close = function () {
            $rootScope.isModalOpen = false;

            $mdDialog.hide();
        };

        $scope.createReview = function () {
            console.log("created");
            $scope.close();
        };

        $scope.rate = function (rank) {
            $scope.currentRank = rank;

            console.log(rank);
        };

    }]);