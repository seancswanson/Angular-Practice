// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/second/', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

        // Route parameters get passed to scope with $routeParams.[:value]
        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        });

});

// Creating named services. These are singletons. Good use case for app state storage?
myApp.service('nameService', function () {

    var self = this;
    this.name = 'Sean Swanson';

    this.nameLength = function () {

        return self.name.length;

    };

});

// Controller for view inside of myApp
// $scope is a child scope that inherits from the root scope. New child scope
// in each controller it is injected into.
myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', '$log', 'nameService', function ($scope, $filter, $timeout, $http, $log, nameService) {

    $scope.person = {
        name: 'Sean',
        address: '1337 Leet Street Kirkland, WA, 98033'
    }

}]);

myApp.controller('secondController', ['$scope', '$http', '$routeParams', '$log', 'nameService', function ($scope, $http, $routeParams, $log, nameService) {


}]);

// For injecting templates/custom directives into page
// Returns an object
// Replaces the HTML directive component with the template if replace === true.
myApp.directive('searchResult', function () {

    return {
        restrict: 'AEM', // A === Attribute*, E === Element*, C === Class, M === Comment
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {}
    }

})
