'use strict';

angular.module('bom', [
  'ngRoute',
  'bom.controllers',
  'bom.services'
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
      .otherwise({
        redirectTo: '/accounts'
      });
  });
