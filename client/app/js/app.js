'use strict';

angular.module('bom', [
  'ngRoute',
  'bomControllers',
  'bomFilters',
  'bomServices'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/accounts', {
        templateUrl: 'partials/account-list.html',
        controller: 'AccountListController'
      })
      .when('/accounts/:id', {
        templateUrl: 'partials/account-detail.html',
        controller: 'AccountDetailController'
      })
      .when('/auth', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  });
