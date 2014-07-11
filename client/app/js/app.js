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
      .when('/auth', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($location, $q, $rootScope) {
      return {
        'request': function(request) {
          var path = $location.path();
          if (!$rootScope.authorized && path != '/auth') {
            $location.path('/auth').search('next', path);
          }
          return request;
        },
        'responseError': function(rejection) {
          return $q.reject(rejection);
        }
      };
    });
  });
