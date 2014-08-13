/**
 * @fileoverview Account service definitions.
 */

goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');



/**
 * Account service.
 * @param {!bom.rpc.Rpc} rpc The rpc service.
 * @constructor
 * @ngInject
 */
bom.account.Account = function(rpc) {
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
bom.account.Account.prototype.callMethod_ = function(method, opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.list = function() {
  return this.callMethod_('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.update = function(message) {
  return this.callMethod_('update', message);
};



/**
 * Transaction service.
 * @param {!bom.rpc.Rpc} rpc The rpc service.
 * @constructor
 * @ngInject
 */
bom.account.Transaction = function(rpc) {
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
bom.account.Transaction.prototype.callMethod_ = function(method,
                                                            opt_message) {
  return this.ij_.rpc.callMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.get = function(message) {
  return this.callMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.insert = function(message) {
  return this.callMethod_('insert', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.list = function(message) {
  return this.callMethod_('list', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.patch = function(message) {
  return this.callMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.remove = function(message) {
  return this.callMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.update = function(message) {
  return this.callMethod_('update', message);
};
