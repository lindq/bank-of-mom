goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');


/**
 * @param {!bom.apiProxy.ApiProxy} apiProxy
 * @constructor
 * @private
 */
bom.account.Model_ = function(apiProxy) {

  this.ij_ = {
    apiProxy: apiProxy
  };

  /**
   * @private {string}
   */
  this.collection_ = null;
};


/**
 * @param {string} name
 * @param {!Object=} opt_message
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.account.Model_.prototype.callApiMethod_ = function(name, opt_message) {
  return this.ij_.apiProxy.callApiMethod(this.collection_, name, opt_message);
};


/**
 * @param {!bom.apiProxy.ApiProxy} apiProxy
 * @constructor
 * @extends {bom.account.Model_}
 * @ngInject
 */
bom.account.Account = function(apiProxy) {
  bom.account.Model_.call(this, apiProxy);
  // goog.base(this, apiProxy);

  /** @type {string} */
  this.collection = 'account';
};
goog.inherits(bom.account.Account, bom.account.Model_);


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.get = function() {
  return this.callApiMethod('get');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.insert = function(message) {
  return this.callApiMethod('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.list = function() {
  return this.callApiMethod('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.patch = function(message) {
  return this.callApiMethod('patch', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.remove = function() {
  return this.callApiMethod('remove');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Account.prototype.update = function(message) {
  return this.callApiMethod('update', message);
};


/**
 * @param {!bom.apiProxy.ApiProxy} apiProxy
 * @constructor
 * @extends {bom.account.Model_}
 * @ngInject
 */
bom.account.Transaction = function(apiProxy) {
  bom.account.Model_.call(this, apiProxy);
  // goog.base(this, apiProxy);

  /** @type {string} */
  this.collection = 'transaction';
};
goog.inherits(bom.account.Transaction, bom.account.Model_);


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.get = function() {
  return this.callApiMethod('get');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.insert = function(message) {
  return this.callApiMethod('insert', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.list = function() {
  return this.callApiMethod('list');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.patch = function(message) {
  return this.callApiMethod('patch', message);
};


/**
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.remove = function() {
  return this.callApiMethod('remove');
};


/**
 * @param {!Object} message
 * @return {!angular.$q.Promise}
 */
bom.account.Transaction.prototype.update = function(message) {
  return this.callApiMethod('update', message);
};
