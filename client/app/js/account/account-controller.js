/**
 * @fileoverview Account controller definitions.
 */

goog.provide('bom.account.AccountDetailController');
goog.provide('bom.account.AccountListController');

goog.require('bom.account.Account');
goog.require('bom.account.Transaction');
goog.require('goog.array');



/**
 * The account list controller.
 * @param {!angular.Scope} $scope The Angular scope service.
 * @param {!bom.account.AccountRpc} accountRpc The account rpc service.
 * @constructor
 * @ngInject
 * @export
 */
bom.account.AccountListController = function($scope, accountRpc) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    scope: $scope,
    accountRpc: accountRpc
  };

  /**
   * True if page loading is complete, false otherwise.
   * @type {boolean}
   * @export
   */
  this.loaded = false;

  /**
   * List of accounts from an API call.
   * @type {!Array.<!bom.account.Account>}
   * @export
   */
  this.accounts = [];

  /**
   * The current account to display.
   * @type {!bom.account.Account}
   * @export
   */
  this.account = new bom.account.Account();

  this.init_();
};


/** @private */
bom.account.AccountListController.prototype.init_ = function() {
  this.listAccounts()
    .then(goog.bind(this.doneLoading_, this));
};


/** @private */
bom.account.AccountListController.prototype.doneLoading_ = function() {
  this.loaded = true;
};


/**
 * @return {!angular.$q.Promise} A promise.
 */
bom.account.AccountListController.prototype.listAccounts = function() {
  var self = this;
  return this.ij_.accountRpc.list()
    .then(function(response) {
      if (response.items) {
        self.accounts = goog.array.map(
          response.items, bom.account.Account.fromMessage);
      }
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountListController.prototype.saveAccount = function() {
  var self = this;
  var message = this.account.toMessage();
  return this.ij_.accountRpc.insert(message)
    .then(function(response) {
      self.accounts.push(response);
      self.account = new bom.account.Account();
    });
};



/**
 * The account detail controller.
 * @param {!angular.Scope} $scope The Angular scope service.
 * @param {!angular.$location} $location The Angular location service.
 * @param {!angular.$q} $q the Angular promise service.
 * @param {!angular.$routeParams} $routeParams The Angular routeParams service.
 * @param {!bom.account.AccountRpc} accountRpc The account rpc service.
 * @param {!bom.account.TransactionRpc} transactionRpc The transaction rpc
 *     service.
 * @constructor
 * @ngInject
 * @export
 */
bom.account.AccountDetailController = function(
  $scope, $location, $q, $routeParams, accountRpc, transactionRpc) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    scope: $scope,
    location: $location,
    q: $q,
    routeParams: $routeParams,
    accountRpc: accountRpc,
    transactionRpc: transactionRpc
  };

  /**
   * The current account to display.
   * @type {!bom.account.Account}
   * @export
   */
  this.account = new bom.account.Account(this.ij_.routeParams.id);

  /**
   * True if page loading is complete, false otherwise.
   * @type {boolean}
   * @export
   */
  this.loaded = false;

  /**
   * List of transactions from an API call.
   * @type {!Array.<!bom.account.Transaction>}
   * @export
   */
  this.transactions = [];

  /**
   * The current transaction to display.
   * @type {!bom.account.Transaction}
   * @export
   */
  this.transaction = new bom.account.Transaction();

  /**
   * The cursor token for paging through the transaction list.
   * @type {?string}
   * @export
   */
  this.nextPageToken = null;

  this.init_();
};


/** @private */
bom.account.AccountDetailController.prototype.init_ = function() {
  this.ij_.q.all([this.getAccount(), this.listTransactions()])
    .then(goog.bind(this.doneLoading_, this));
};


/**
 * @return {!angular.$q.Promise} A promise.
 */
bom.account.AccountDetailController.prototype.getAccount = function() {
  var self = this;
  var message = this.account.toMessage();
  return this.ij_.accountRpc.get(message)
    .then(function(response) {
      self.account = bom.account.Account.fromMessage(response);
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.listTransactions = function() {
  var self = this;
  var message = {
    accountId: this.ij_.routeParams.id,
    nextPageToken: this.nextPageToken
  };
  return this.ij_.transactionRpc.list(message)
    .then(function(response) {
      if (response.items) {
        var transactions = goog.array.map(
          response.items, bom.account.Transaction.fromMessage);
        self.transactions = self.transactions.concat(transactions);
        self.nextPageToken = response.nextPageToken;
      }
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.insertTransaction = function() {
  var self = this;
  var message = this.transaction.toMessage(this.ij_.routeParams.id);
  return this.ij_.transactionRpc.insert(message)
    .then(function(response) {
      var transaction = bom.account.Transaction.fromMessage(response);
      self.transactions.push(transaction);
      self.account.balance = (parseFloat(self.account.balance) +
                              parseFloat(response.amount)).toFixed(2);
      self.transaction = new bom.account.Transaction();
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.deleteAccount = function() {
  var self = this;
  var message = {
    id: this.ij_.routeParams.id
  };
  return this.ij_.accountRpc.remove(message)
    .then(function() {
      self.ij_.location.path('/accounts');
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.saveAccount = function() {
  var message = this.account.toMessage();
  return this.ij_.accountRpc.patch(message);
};


/**
 * @export
 */
bom.account.AccountDetailController.prototype.addTransaction = function() {
  this.transaction = new bom.account.Transaction();
};


/**
 * @param {!bom.account.Transaction} transaction The transaction to edit.
 * @export
 */
bom.account.AccountDetailController.prototype.editTransaction = function(
  transaction) {
  this.transaction = transaction;
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.saveTransaction = function() {
  if (!this.transaction.id) {
    return this.insertTransaction();
  }
  var message = this.transaction.toMessage(this.ij_.routeParams.id);
  return this.ij_.transactionRpc.update(message)
    .then(goog.bind(this.init_, this));  // TODO: fix this (does not update transactions properly).
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.deleteTransaction = function() {
  var message = this.transaction.toMessage(this.ij_.routeParams.id);
  return this.ij_.transactionRpc.remove(message)
    .then(goog.bind(this.init_, this));  // TODO: fix this (does not update transactions properly).
};


/** @private */
bom.account.AccountDetailController.prototype.doneLoading_ = function() {
  this.loaded = true;
};
