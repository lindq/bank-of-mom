/**
 * @fileoverview RPC module definition.
 */

goog.provide('bom.rpc.module');

goog.require('bom.auth.module');
goog.require('bom.rpc.Rpc');


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.rpc.module = angular.module('bom.rpc', [
  bom.auth.module.name
])
  .service('rpc', bom.rpc.Rpc);
