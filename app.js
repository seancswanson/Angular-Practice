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

})

// Controller for view inside of myApp
myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function ($scope, $filter, $timeout, $http) {

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

}]);

myApp.controller('dittoController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    //    console.log($scope);

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

}]);
