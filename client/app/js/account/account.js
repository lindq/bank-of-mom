/**
 * @fileoverview Account module definition.
 */

goog.provide('bom.account.module');

goog.require('bom.account.AccountDetailController');
goog.require('bom.account.AccountListController');
goog.require('bom.account.AccountRpc');
goog.require('bom.account.TransactionRpc');


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.account.module = angular.module('bom.account', [])
  .controller('AccountDetailController', bom.account.AccountDetailController)
  .controller('AccountListController', bom.account.AccountListController)
  .service('accountRpc', bom.account.AccountRpc)
  .service('transactionRpc', bom.account.TransactionRpc);
