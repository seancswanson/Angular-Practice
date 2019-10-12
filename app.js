// Creates the connection between Angular and the DOM tree
// Extends the HTML to become an Angular module
var myApp = angular.module('myApp', []);


// Controller for view inside of myApp
myApp.controller('mainController', ['$scope', '$filter', '$timeout', function ($scope, $filter, $timeout) {

    $scope.handle = '';

    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };

//    $scope.$watch('handle', function (newValue, oldValue) {
//
//        console.warn('Changed!');
//        console.log('Old: ' + oldValue);
//        console.log('New: ' + newValue);
//
//    });

    $timeout(function () {

        //        $scope.$apply(function () {
        $scope.handle = 'newTwitterHandle';
        console.log('Scope changed!');
        //        });

    }, 3000);


}]);
