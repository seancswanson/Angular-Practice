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

    this.cityName = null || 'Seattle';

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

    $scope.setCity = function () {
        stateService.cityName = $scope.cityName;
        console.log(stateService)
    }

}]);

weatherApp.controller('forecastController', ['$scope', '$log', 'stateService', function ($scope, $log, stateService) {
    $log.log('scope from Forecast', $scope);

    $scope.cityName = stateService.cityName;

}]);
