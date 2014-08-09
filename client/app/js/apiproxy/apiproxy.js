/**
 * @fileoverview API Proxy module.
 */

goog.provide('bom.apiProxy.module');

goog.require('bom.auth.module');


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.apiProxy.module = angular.module('bom.apiProxy', [
  bom.auth.module.name
])
  .service('apiProxy', bom.apiProxy.ApiProxy);