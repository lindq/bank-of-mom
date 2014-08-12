/**
 * @fileoverview Routes configuration.
 */

goog.provide('bom.routes.module');

goog.require('bom.auth.module');


/**
 * @param {!angular.$routeProvider} $routeProvider The Angular route provider.
 * @ngInject
 */
bom.routes.routesConfig = function($routeProvider) {
  $routeProvider
    .when('/accounts', {
      templateUrl: 'partials/account-list.html',
      controller: 'AccountListController',
      controllerAs: 'ctrl'
    })
    .when('/accounts/:id', {
      templateUrl: 'partials/account-detail.html',
      controller: 'AccountDetailController',
      controllerAs: 'ctrl'
    })
    .when('/auth', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthController',
      controllerAs: 'ctrl'
    })
    .otherwise({
      redirectTo: '/accounts'
    });
};


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.routes.module = angular.module('bom.routes', [
  bom.auth.module.name, 'ngRoute'
]).config([
  '$routeProvider',
  bom.routes.routesConfig
]);
