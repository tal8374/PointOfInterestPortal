myApp.controller('navbarController', ['$scope', 'myLocalStorageService', '$rootScope',
    function ($scope, myLocalStorageService, $rootScope) {

        $scope.numOfFavorites = 0;

        setInterval(function () {

            let favorites = myLocalStorageService.getFavorites();

            $scope.numOfFavorites = favorites.length;

        }, 100);

        if($rootScope.currentUser) return;


        let token = myLocalStorageService.get("token", null);

        if(!token) return;

        var playload = JSON.parse(atob(token.split('.')[1]));

        $rootScope.currentUser = playload;

        // setInterval(function () {
        //
        //     if($rootScope.currentUser) return;
        //
        //
        //     let token = myLocalStorageService.get("token", null);
        //
        //     if(!token) return;
        //
        //     var playload = JSON.parse(atob(token.split('.')[1]));
        //
        //     $rootScope.currentUser = playload;
        //
        // }, 100);


    }]);