// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', []);


// Controller for view inside of myApp
myApp.controller('mainController', ['$scope', '$timeout', function ($scope, $timeout) {

    console.log($scope);
    $scope.name = 'Sean';

    // Timeout is another Angular service,
    // Similar to setTimeout but kept within
    // the Angular architecture.
    $timeout(function () {

        $scope.name = 'Everybody';

    }, 3000)
}]);
