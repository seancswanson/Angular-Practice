// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', []);


// Controller for view inside of myApp
myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function ($scope, $filter, $timeout, $http) {

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

    $http.get('https://pokeapi.co/api/v2/pokemon/ditto/').then(function (result) {
        $scope.dittoInfo = result.data;
        $scope.dittoSpriteURL = result.data.sprites.front_default;
        console.log(result.data.sprites);
        console.log($scope.dittoSpriteURL);
    }).catch(function (err) {

        console.error(err); // Try mispelling the API URL to see this response.

    });


    console.log($scope.rules);

    //    $scope.alertClick = () => {
    //        $scope.name = 'Sean Swanson';
    //        alert('Clicked!');
    //    }



            }]);
