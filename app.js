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

    $scope.people = [{
            name: 'Sean Swanson',
            address: '1337 Leet Street',
            city: 'Kirkland',
            state: 'WA',
            zipCode: '98033'
    },
        {
            name: 'Jane Swannyson',
            address: '4022 Brandywine Ave',
            city: 'Boston',
            state: 'MA',
            zipCode: '73772'
    },
        {
            name: 'John Swanarillo',
            address: '330 Tenpenny Blvd Apt. A',
            city: 'Louisville',
            state: 'KY',
            zipCode: '34899'
    }]

    $scope.formattedAddress = function (person) {
        return `${person.address}, ${person.city}, ${person.state} ${person.zipCode}`;
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
        scope: {

            personObject: "=", // = === object/Two-way binding. Two-way binding can get you in trouble.
            formattedAddressFunction: "&" // & === a function
        },
        compile: function (elem, attrs) { // Initializes the directive

            // You almost never write code in compile
            //            console.log('Compiling...');
            //            //            elem.removeAttr('class')
            //            console.log(elem);

            return {

                //                pre: function (scope, elements, attrs) {
                //
                //                    console.log('Pre-linking...')
                //                    console.log(elements);
                //
                //                }, 'Not safe' accoring to Angular documentation.

                post: function (scope, elements, attrs) { // on bind

                    console.log('Post-linking...')
                    console.log(scope.personObject.name);

                    if (scope.personObject.name === 'Jane Swannyson') {
                        elements.removeAttr('class')
                    }

                    console.log(elements);

                }
            }
        }
    }

})
