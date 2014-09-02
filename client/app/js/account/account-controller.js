/**
 * @fileoverview Account controller definitions.
 */

goog.provide('bom.account.AccountDetailController');
goog.provide('bom.account.AccountListController');

goog.require('goog.object');


/**
 * Transaction type values.
 * @type {!Object.<string, string>}
 * @const
 */
bom.account.TransactionTypes = {
  DEPOSIT: '+',
  WITHDRAWAL: '-'
};



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

  /** @private */
  this.nullAccount_ = goog.object.createImmutableView({
    name: ''
  });

  /**
   * True if page loading is complete, false otherwise.
   * @type {boolean}
   * @export
   */
  this.loaded = false;

  /**
   * List of accounts from an API call.
   * @type {!Array.<!json.Account>}
   * @export
   */
  this.accounts = [];

  /**
   * The current account to display.
   * @type {!json.Account}
   * @export
   */
  this.account = /** @type {!json.Account} */ (
    goog.object.clone(this.nullAccount_));

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
        self.accounts = response.items;
      }
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountListController.prototype.saveAccount = function() {
  var self = this;
  var message = {
    name: this.account.name
  };
  return this.ij_.accountRpc.insert(message)
    .then(function(response) {
      self.accounts.push(response);
      self.account = /** @type {!json.Account} */ (
        goog.object.clone(self.nullAccount_));
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

  /** @private */
  this.nullTransaction_ = goog.object.createImmutableView({
    type: bom.account.TransactionTypes.DEPOSIT,
    amount: '',
    memo: ''
  });

  /**
   * The current account to display.
   * @type {?json.Account}
   * @export
   */
  this.account = null;

  /**
   * True if page loading is complete, false otherwise.
   * @type {boolean}
   * @export
   */
  this.loaded = false;

  /**
   * List of transactions from an API call.
   * @type {!Array.<!json.Transaction>}
   * @export
   */
  this.transactions = [];

  /**
   * The current transaction to display.
   * @type {!json.Transaction}
   * @export
   */
  this.transaction = /** @type {!json.Transaction} */ (
    goog.object.clone(this.nullTransaction_));

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
  var message = {
    id: this.ij_.routeParams.id
  };
  return this.ij_.accountRpc.get(message)
    .then(function(response) {
      self.account = response;
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
        self.transactions = self.transactions.concat(response.items);
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
  var message = {
    accountId: this.ij_.routeParams.id,
    amount: this.transaction.type + this.transaction.amount,
    memo: this.transaction.memo
  };
  return this.ij_.transactionRpc.insert(message)
    .then(function(response) {
      self.transactions.push(response);
      self.account.balance = (parseFloat(self.account.balance) +
                              parseFloat(response.amount)).toFixed(2);
      self.transaction = /** @type {!json.Transaction} */ (
        goog.object.clone(self.nullTransaction_));
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
  var self = this;
  var message = {
    id: this.ij_.routeParams.id,
    name: this.account.name
  };
  return self.ij_.accountRpc.patch(message)
    .then(function() {

    });
};


/**
 * @param {!json.Transaction} transaction The transaction to edit.
 * @export
 */
bom.account.AccountDetailController.prototype.editTransaction = function(
  transaction) {
  transaction.type = (parseFloat(transaction.amount) < 0) ?
    bom.account.TransactionTypes.WITHDRAWAL :
    bom.account.TransactionTypes.DEPOSIT;
  transaction.amount = transaction.amount.replace(/^[-\+]/, '');
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
  var message = {
    accountId: this.ij_.routeParams.id,
    id: this.transaction.id,
    amount: this.transaction.type + this.transaction.amount,
    memo: this.transaction.memo
  };
  return this.ij_.transactionRpc.update(message)
    .then(goog.bind(this.init_, this));  // TODO: fix this (does not update transactions properly).
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.deleteTransaction = function() {
  var message = {
    accountId: this.ij_.routeParams.id,
    id: this.transaction.id
  };
  return this.ij_.transactionRpc.remove(message)
    .then(goog.bind(this.init_, this));  // TODO: fix this (does not update transactions properly).
};


/** @private */
bom.account.AccountDetailController.prototype.doneLoading_ = function() {
  this.loaded = true;
};
