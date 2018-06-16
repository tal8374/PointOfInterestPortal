myApp.service('pointOfInterestService', ['$http',
    function ($http) {

        var serverUrl = 'http://localhost:1235/';

        var factory = {};

        factory.getPOIList = function () {
            return $http.get(serverUrl + "point-of-interest/list", {});
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
            console.log(serverUrl + "point-of-interest/" + pointOfInterestId + "/review/list");

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
            console.log();
            return $http.post(serverUrl + "point-of-interest/" + pointOfInterestId + "/user/" + userId + "/rank", {rank});
        };

        factory.getUserPOI = function (userId) {
            return $http.get(serverUrl + "point-of-interest/" + "/user/" + 14 + "/list", {});
        };

        factory.createUserPOI = function (pointOfInterestId, userId) {
            return $http.post(serverUrl + "point-of-interest/" + pointOfInterestId + "/user/" + 14, {});
        };

        factory.deleteUserPOI = function (pointOfInterestId, userId) {
            return $http.delete(serverUrl + "point-of-interest/" + pointOfInterestId + "/user/" + 14, {});
        };

        return factory;
    }]);