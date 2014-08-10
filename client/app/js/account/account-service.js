goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');


/**
 * @param {!bom.apiProxy.ApiProxy} apiProxy
 * @constructor
 * @ngInject
 */
bom.account.Account = function(apiProxy) {

  this.ij_ = {
    apiProxy: apiProxy
  };

  /**
   * @private {string}
   */
  this.collection_ = 'accounts';
};


/**
 * @param {string} name
 * @param {!Object=} opt_message
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.account.Account.prototype.callApiMethod_ = function(name, opt_message) {
  return this.ij_.apiProxy.callApiMethod(this.collection_, name, opt_message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.get = function() {
  return this.callApiMethod_('get');
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
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.remove = function() {
  return this.callApiMethod_('remove');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.update = function(message) {
  return this.callApiMethod_('update', message);
};


/**
 * @param {!bom.apiProxy.ApiProxy} apiProxy
 * @constructor
 * @ngInject
 */
bom.account.Transaction = function(apiProxy) {

  this.ij_ = {
    apiProxy: apiProxy
  };

  /**
   * @private {string}
   */
  this.collection_ = 'transactions';
};


/**
 * @param {string} name
 * @param {!Object=} opt_message
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.account.Transaction.prototype.callApiMethod_ = function(name, opt_message) {
  return this.ij_.apiProxy.callApiMethod(this.collection_, name, opt_message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.get = function() {
  return this.callApiMethod_('get');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.insert = function(message) {
  return this.callApiMethod_('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.list = function() {
  return this.callApiMethod_('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.patch = function(message) {
  return this.callApiMethod_('patch', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.remove = function() {
  return this.callApiMethod_('remove');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.update = function(message) {
  return this.callApiMethod_('update', message);
};
