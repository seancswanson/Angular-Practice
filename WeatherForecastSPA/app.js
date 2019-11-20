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

weatherApp.controller('homeController', ['$scope', '$log', function ($scope, $log) {
    $log.log('scope from Home', $scope);

    $scope.pageName = 'Home!'

}]);

weatherApp.controller('forecastController', ['$scope', '$log', function ($scope, $log) {
    $log.log('scope from Forecast', $scope);

    $scope.pageName = 'Forecast!'

}]);
