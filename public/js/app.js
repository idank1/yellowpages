var yellowPages = angular.module('yellowpages', ['ngRoute']);

yellowPages.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            controller: 'PersonsCotroller',
            templateUrl: '../../partials/showPersons.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);