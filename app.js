// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/ditto/', {
            templateUrl: 'pages/ditto.html',
            controller: 'dittoController'
        })

        // Route parameters get passed to scope with $routeParams.[:value]
        .when('/ditto/:num', {
            templateUrl: 'pages/ditto.html',
            controller: 'dittoController'
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

    $scope.name = nameService.name;

    $scope.$watch('name', function () {
        nameService.name = $scope.name;
    });

    $log.log(nameService.name);
    $log.log(nameService.nameLength());


    $scope.pageName = 'main';

    $scope.handle = '';

    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };

    $scope.characters = 5;

    $scope.rules = [

        {
            ruleName: "Must be 5 characters"
            },
        {
            ruleName: "Must not be used elsewhere"
            },
        {
            ruleName: "Must be cool"
            },

        ];

    $scope.newRule = '';

    $scope.addRule = () => {

        let newRuleItem = {
            ruleName: $scope.newRule
        };

        $scope.rules.push(newRuleItem);

        $scope.newRule = '';

        console.log($scope.rules);

    };

    $scope.handleAddRuleClick = () => {

        console.log('Rule add:' + $scope.newRule);

        $scope.addRule();

    }

    //    // $log is a singleton, this saves on memory.
    //    $log.main = 'Property from main';
    //    $log.log($log);

}]);

myApp.controller('dittoController', ['$scope', '$http', '$routeParams', '$log', 'nameService', function ($scope, $http, $routeParams, $log, nameService) {
    //    console.log($scope);

    $scope.name = nameService.name;

    $scope.$watch('name', function () {
        nameService.name = $scope.name;
    });

    $scope.pageName = 'ditto';

    $scope.num = $routeParams.num || 1;

    $scope.getDitto = () => {
        $scope.name = 'Sean Swanson';
        //        alert('Clicked!');
        $http.get('https://pokeapi.co/api/v2/pokemon/ditto/').then(function (result) {

            $scope.dittoInfo = result.data;

            $scope.dittoSpriteURL = result.data.sprites.front_default;

        }).catch(function (err) {

            console.error(err); // Try mispelling the API URL to see this response.

        });
    };

    //    $log.second = 'Property from second';
    //    $log.log($log);

}]);
