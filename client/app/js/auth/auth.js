/**
 * @fileoverview Auth module.
 */

goog.provide('bom.auth.module');

goog.require('bom.auth.Auth');


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.auth.module = angular.module('bom.auth', [])
  .controller('AuthController', bom.auth.AuthController)
  .service('auth', bom.auth.Auth);
