/**
 * @fileoverview Account module.
 */

goog.provide('bom.account.module');

goog.require('bom.account.Account');
goog.require('bom.account.AccountDetailController');
goog.require('bom.account.AccountListController');
goog.require('bom.account.Transaction');



/**
 * Angular module
 * @type {!angular.Module}
 */
bom.account.module = angular.module('bom.account', [])
  .controller('AccountDetailController', bom.account.AccountDetailController)
  .controller('AccountListController', bom.account.AccountListController)
  .service('account', bom.account.Account)
  .service('transaction', bom.account.Transaction);
