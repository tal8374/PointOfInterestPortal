myApp.service('pointOfInterestService', ['$http', '$rootScope',
    function ($http, $rootScope) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        var userId = null;

        if($rootScope.currentUser && $rootScope.currentUser.userId) {
            userId = $rootScope.currentUser.userId
        }

        factory.getPOIList = function () {
            return $http.get(serverUrl + "point-of-interest/list", {});
        };

        factory.getPOICategoryList = function () {
            return $http.get(serverUrl + "point-of-interest/category/list", {});
        };

        factory.getPOIRankList = function () {
            return $http.get(serverUrl + "point-of-interest/rank/list", {});
        };

        factory.getPOI = function (pointOfInterestId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId, {});
        };

        factory.getPOIVisits = function (pointOfInterestId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId + "/visit/list", {});
        };

        factory.createPOIVisit = function (pointOfInterestId, userId) {
            return $http.post(serverUrl + "point-of-interest/" + pointOfInterestId + "/visit/user/" + userId, {});
        };

        factory.getPOIUserVisit = function (pointOfInterestId, userId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId + "/visit/user/" + userId + "/list", {});
        };

        factory.getPOIReviews = function (pointOfInterestId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId + "/review/list", {});
        };

        factory.getPOIUserReview = function (pointOfInterestId, userId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId + "/review/user/" + userId + "/list", {});
        };

        factory.createPOIReview = function (pointOfInterestId, userId, content) {
            return $http.post(serverUrl + "point-of-interest/" + pointOfInterestId + "/review/user/" + userId, {content});
        };

        factory.getPOIRanks = function (pointOfInterestId) {
            return $http.get(serverUrl + "point-of-interest/" + pointOfInterestId + "/rank/list", {});
        };

        factory.createPOIRank = function (pointOfInterestId, userId, rank) {
            return $http.post(serverUrl + "point-of-interest/" + pointOfInterestId + "/user/" + userId + "/rank", {rank});
        };

        factory.getUserPOI = function () {
            return $http.get(serverUrl + "point-of-interest/" + "/user/" + userId + "/list", {});
        };

        factory.createUserPOI = function (favorites) {
            console.log(userId);
            return $http.post(serverUrl + "point-of-interest/user/" + userId, {favorites});
        };

        factory.deleteUserPOI = function (pointOfInterestId) {
            return $http.delete(serverUrl + "point-of-interest/" + pointOfInterestId + "/user/" + userId, {});
        };

        return factory;
    }]);