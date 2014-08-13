/**
 * @fileoverview Account service definitions.
 */

goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');



/**
 * Account service.
 * @param {!bom.apiProxy.ApiProxy} apiProxy The apiProxy service.
 * @constructor
 * @ngInject
 */
bom.account.Account = function(apiProxy) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    apiProxy: apiProxy
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
bom.account.Account.prototype.callApiMethod_ = function(method, opt_message) {
  return this.ij_.apiProxy.callApiMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.get = function(message) {
  return this.callApiMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.insert = function(message) {
  return this.callApiMethod_('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.list = function() {
  return this.callApiMethod_('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.patch = function(message) {
  return this.callApiMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.remove = function(message) {
  return this.callApiMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.update = function(message) {
  return this.callApiMethod_('update', message);
};



/**
 * Transaction service.
 * @param {!bom.apiProxy.ApiProxy} apiProxy The apiProxy service.
 * @constructor
 * @ngInject
 */
bom.account.Transaction = function(apiProxy) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    apiProxy: apiProxy
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
bom.account.Transaction.prototype.callApiMethod_ = function(method,
                                                            opt_message) {
  return this.ij_.apiProxy.callApiMethod(this.collection_, method, opt_message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.get = function(message) {
  return this.callApiMethod_('get', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.insert = function(message) {
  return this.callApiMethod_('insert', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.list = function(message) {
  return this.callApiMethod_('list', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.patch = function(message) {
  return this.callApiMethod_('patch', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.remove = function(message) {
  return this.callApiMethod_('remove', message);
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.update = function(message) {
  return this.callApiMethod_('update', message);
};
