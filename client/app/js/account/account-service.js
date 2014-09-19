/**
 * @fileoverview Account service definitions.
 */

goog.provide('bom.account.AccountRpc');
goog.provide('bom.account.TransactionRpc');



/**
 * AccountRpc service.
 * @param {!bom.rpc.Rpc} rpc The rpc service.
 * @constructor
 * @ngInject
 */
bom.account.AccountRpc = function(rpc) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    rpc: rpc
  };

  /**
   * The name of the API endpoints collection for this model.
   * @private {string}
   */
  this.collection_ = 'accounts';
};


goog.scope(function() {

var AccountRpc = bom.account.AccountRpc;


/**
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
AccountRpc.prototype.callMethod_ = function(method, opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.list = function() {
  return this.callMethod_('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
AccountRpc.prototype.update = function(message) {
  return this.callMethod_('update', message);
};

});  // goog.scope



/**
 * TransactionRpc service.
 * @param {!bom.rpc.Rpc} rpc The rpc service.
 * @constructor
 * @ngInject
 */
bom.account.TransactionRpc = function(rpc) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    rpc: rpc
  };

  /**
   * The name of the API endpoints collection for this model.
   * @private {string}
   */
  this.collection_ = 'transactions';
};


goog.scope(function() {

var TransactionRpc = bom.account.TransactionRpc;


/**
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
TransactionRpc.prototype.callMethod_ = function(method, opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.list = function(message) {
  return this.callMethod_('list', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
TransactionRpc.prototype.update = function(message) {
  return this.callMethod_('update', message);
};

});  // goog.scope
