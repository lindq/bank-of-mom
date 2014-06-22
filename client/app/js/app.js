'use strict';


angular.module('bom', [
  'ngRoute',
  'bom.services',
  'bom.controllers'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/accounts', {
        templateUrl: 'partials/accounts/list.html',
        controller: 'AccountListController'
      })
      .when('/accounts/:id', {
        templateUrl: 'partials/accounts/detail.html',
        controller: 'AccountDetailController'
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  }]);
