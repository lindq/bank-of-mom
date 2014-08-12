/**
 * @fileoverview API proxy module definition.
 */

goog.provide('bom.apiProxy.module');

goog.require('bom.apiProxy.ApiProxy');
goog.require('bom.auth.module');


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.apiProxy.module = angular.module('bom.apiProxy', [
  bom.auth.module.name
])
  .service('apiProxy', bom.apiProxy.ApiProxy);
