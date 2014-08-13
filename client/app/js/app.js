/**
 * @fileoverview Main application.
 */

goog.provide('bom.module');

goog.require('bom.account.module');
goog.require('bom.auth.module');
goog.require('bom.filters.module');
goog.require('bom.routes.module');
goog.require('bom.rpc.module');


/**
 * The main module.
 * @type {!angular.Module}
 */
bom.module = angular.module('bom', [
  bom.account.module.name,
  bom.auth.module.name,
  bom.filters.module.name,
  bom.routes.module.name,
  bom.rpc.module.name
]);
