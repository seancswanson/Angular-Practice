// 4bdd42e99d3c216e6c5b942b88dbfd15
// http://api.openweathermap.org/data/2.5/forecast/daily?APPID=

// MODULE
// Declare what dependencies/services will be used.

const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'leaflet-directive']);

weatherApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'web/pages/home.html',
            controller: 'homeController',
        })

        .when('/forecast', {
            templateUrl: 'web/pages/forecast.html',
            controller: 'forecastController',
        });
});

// Services for App "State"?
weatherApp.service('stateService', [
    'geolocationSvc',
    function(geolocationSvc) {
        const app = this;
        this.user = {
            username: 'Sean',
        };

        this.cityName = 'Seattle';

        // this.currentLocation = geolocationSvc.getCurrentPosition();
    },
]);

weatherApp.service('geolocationSvc', [
    '$q',
    '$window',
    '$log',
    function($q, $window, $log) {
        // this.mymap = L.map('map').setView([51.505, -0.09], 13);

        // this.getCurrentPosition = function() {
        //     function success(position) {
        //         const { latitude } = position.coords;
        //         const { longitude } = position.coords;

        //         const coords = { latitude, longitude };
        //         return coords;
        //     }

        //     function error() {
        //         $log.error('Unable to retrieve your location');
        //     }

        //     if (!navigator.geolocation) {
        //         $log.error('Geolocation is not supported by your browser');
        //     } else {
        //         $log.log('Locating…');
        //         navigator.geolocation.getCurrentPosition(success, error);
        //     }
        // };
    },
]);

// Custom Directives

weatherApp.directive('navbar', function() {
    return {
        replace: 'E',
        templateUrl: 'web/directives/navbar.html',
        replace: true,
    };
});

weatherApp.directive('footer', function() {
    return {
        replace: 'E',
        templateUrl: 'web/directives/footer.html',
        replace: true,
    };
});

// CONTROLLERS

weatherApp.controller('homeController', [
    '$scope',
    '$log',
    'stateService',
    'geolocationSvc',
    function($scope, $log, stateService, geolocationSvc) {
        $log.log('scope from Home', $scope);

        $scope.cityName = stateService.cityName;
        $scope.currentCity = stateService.currentCity;

        $scope.$watch('cityName', function() {
            stateService.cityName = $scope.cityName;
            console.log(stateService);
        });

        //       $scope.getCurrentLocation = function() {
        //          console.log('Trying to get it from weatherApp controller');
        //          console.log($scope);
        //          $scope.currentLocation = stateService.currentLocation;
        //       };
    },
]);

weatherApp.controller('forecastController', [
    '$scope',
    '$log',
    '$resource',
    'stateService',
    function($scope, $log, $resource, stateService) {
        const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/forecast';

        $log.log('scope from Forecast', $scope);

        $scope.cityName = stateService.cityName;

        $scope.weatherAPI = $resource(
            weatherEndpoint,
            {
                callback: 'JSON_CALLBACK',
            },
            {
                get: {
                    method: 'JSONP',
                },
            }
        );

        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.cityName,
            cnt: 7,
            appid: '4bdd42e99d3c216e6c5b942b88dbfd15',
        });

        $scope.convertToFahrenheit = function(degK) {
            return Math.round(1.8 * (degK - 273) + 32);
        };

        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000);
        };
    },
]);

weatherApp.controller('mapController', [
    '$scope',
    function($scope) {
        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false,
            },
        });
    },
]);
