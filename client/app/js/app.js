'use strict';


angular.module('bom', [
  'ngRoute',
  'bom.filters',
  'bom.services',
  'bom.directives',
  'bom.controllers'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/accounts', {
        templateUrl: 'partials/accounts/list.html',
        controller: 'AccountsController'
      })
      .when('/accounts/new', {
        templateUrl: 'partials/accounts/add.html',
        controller: 'AccountCreateController'
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  }]);
