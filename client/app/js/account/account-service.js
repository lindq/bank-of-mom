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


/**
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.account.AccountRpc.prototype.callMethod_ = function(method, opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.list = function() {
  return this.callMethod_('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.AccountRpc.prototype.update = function(message) {
  return this.callMethod_('update', message);
};



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


/**
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.account.TransactionRpc.prototype.callMethod_ = function(
  method, opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.list = function(message) {
  return this.callMethod_('list', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.TransactionRpc.prototype.update = function(message) {
  return this.callMethod_('update', message);
};
