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

weatherApp.service('stateService', function () {

    this.user = {
        username: 'Sean'
    }

})

weatherApp.controller('homeController', ['$scope', '$log', 'stateService'], function ($scope, $log, stateService) {
    console.log(stateService);
});
