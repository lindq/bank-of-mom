/**
 * @fileoverview Main application.
 */

goog.provide('bom.module');

goog.require('bom.filters.module');
goog.require('bom.routes.module');


/**
 * The main module.
 * @type {!angular.Module}
 */
bom.module = angular.module('bom', [
  bom.filters.module.name,
  bom.routes.module.name
]);
