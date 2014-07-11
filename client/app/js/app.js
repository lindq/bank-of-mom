'use strict';

angular.module('bom', [
  'ngRoute',
  'bomControllers',
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
      .otherwise({
        redirectTo: '/accounts'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $window) {
      return {
        'request': function(request) {
          $window.console.log('interceptor request');
          return request;
        },
        'responseError': function(rejection) {
          $window.console.log('interceptor responseError');
          return $q.reject(rejection);
        }
      };
    });
  });
