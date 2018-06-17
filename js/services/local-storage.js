myApp.service('myLocalStorageService', ['$window',
    function ($window) {

        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getFavorites: function () {
                return JSON.parse(localStorage.getItem("favorites")) || [];
            },
            addFavorite: function (pointOfInterestId) {
                let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

                const index = favorites.indexOf(pointOfInterestId);

                if (index === -1) favorites.push(pointOfInterestId);
                console.log(favorites);

                localStorage.setItem("favorites", JSON.stringify(favorites));

            }, removeFavorite: function (pointOfInterestId) {
                let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

                const index = favorites.indexOf(pointOfInterestId);

                if (index !== -1) favorites.splice(index, 1);

                console.log(favorites);

                localStorage.setItem("favorites", JSON.stringify(favorites));
            }
        }
    }]);