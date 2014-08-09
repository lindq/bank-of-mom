/**
 * @fileoverview Main application.
 */

goog.provide('bom.module');

goog.require('bom.account.module');
goog.require('bom.apiProxy.module');
goog.require('bom.auth.module');
goog.require('bom.filters.module');
goog.require('bom.routes.module');


/**
 * The main module.
 * @type {!angular.Module}
 */
bom.module = angular.module('bom', [
  bom.account.module.name,
  bom.apiProxy.module.name,
  bom.auth.module.name,
  bom.filters.module.name,
  bom.routes.module.name
]);
