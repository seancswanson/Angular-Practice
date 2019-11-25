// 4bdd42e99d3c216e6c5b942b88dbfd15
// http://api.openweathermap.org/data/2.5/forecast/daily?APPID=

// MODULE
// Declare what dependencies/services will be used.

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

});

// Services for App "State"?
weatherApp.service('stateService', function () {

    this.user = {
        username: 'Sean'
    }

    this.cityName = 'Seattle';



})

// Custom Directives

weatherApp.directive('navbar', function () {
    return {
        replace: 'E',
        templateUrl: 'directives/navbar.html',
        replace: true,
    }
})

// CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$log', 'stateService', function ($scope, $log, stateService) {

    $log.log('scope from Home', $scope);

    $scope.cityName = stateService.cityName;

    $scope.$watch('cityName', function () {
        stateService.cityName = $scope.cityName;
        console.log(stateService)
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', 'stateService', function ($scope, $log, $resource, stateService) {

    let weatherEndpoint = 'http://api.openweathermap.org/data/2.5/forecast';

    $log.log('scope from Forecast', $scope);

    $scope.cityName = stateService.cityName;

    $scope.weatherAPI = $resource(weatherEndpoint, {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: 'JSONP'
        }
    });

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.cityName,
        cnt: 7,
        appid: '4bdd42e99d3c216e6c5b942b88dbfd15'
    });

    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }

    $scope.convertToDate = function (dt) {

        return new Date(dt * 1000);

    }

}]);
