// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', []);


// Controller for view inside of myApp
myApp.controller('mainController', ['$scope', '$filter', function ($scope, $filter) {

    $scope.handle = '';

    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };
}]);
