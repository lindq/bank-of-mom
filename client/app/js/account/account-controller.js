goog.provide('bom.account.AccountDetailController');
goog.provide('bom.account.AccountListController');

goog.require('goog.object');


/**
 * @enum {string}
 */
bom.account.TransactionTypes = {
  DEPOSIT: '+',
  WITHDRAWAL: '-'
};


/**
 * @param {!angular.Scope} $scope
 * @param {!bom.account.Account} account
 * @constructor
 * @ngInject
 */
bom.account.AccountListController = function($scope, account) {

  this.ij_ = {
    scope: $scope,
    account: account
  };

  this.defaultAccount_ = goog.object.createImmutableView({
    name: ''
  });

  this.loaded = false;

  this.accounts = [];

  this.account = goog.object.clone(this.defaultAccount_);

  this.init_();
};


bom.account.AccountListController.prototype.init_ = function() {
  this.listAccounts()
    .then(this.doneLoading_);
};


bom.account.AccountListController.prototype.doneLoading_ = function() {
  this.loaded = true;
};


bom.account.AccountListController.prototype.listAccounts = function() {
  var self = this;
  return this.ij_.account.list()
    .then(function(response) {
      if (response.items) {
        self.accounts = response.items;
      }
    });
};


bom.account.AccountListController.prototype.saveAccount = function() {
  var self = this;
  var message = {
    name: this.account.name
  };
  return this.ij_.account.insert(message)
    .then(function(response) {
      self.accounts.push(response);
      self.account = goog.object.clone(this.defaultAccount_);
    });
};


/**
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @param {!angular.$routeParams} $routeParams
 * @param {!bom.account.Account} account
 * @param {!bom.account.Transaction} transaction
 * @constructor
 * @ngInject
 */
bom.account.AccountDetailController = function(
  $scope, $location, $q, $routeParams, account, transaction) {

  this.ij_ = {
    scope: $scope,
    location: $location,
    q: $q,
    routeParams: $routeParams,
    account: account,
    transaction, transaction
  };

  this.defaultTransaction_ = goog.object.createImmutableView({
    type: bom.account.TransactionTypes.DEPOSIT,
    amount: '',
    memo: ''
  });

  this.loaded = false;

  this.transactions = [];

  this.transaction = goog.object.clone(this.defaultTransaction_);

  this.init_();
};


bom.account.AccountDetailController.prototype.init_ = function() {
  this.ij_.q.all([
    this.getAccount(),
    this.listTransactions()
  ])
    .then(doneLoading);
};


bom.account.AccountDetailController.prototype.getAccount = function() {
  var self = this;
  var message = {
    id: this.ij_.routeParams.id
  };
  return this.ij_account.get(message)
    .then(function(response) {
      self.account = response;
    });
};


bom.account.AccountDetailController.prototype.listTransactions = function() {
  var self = this;
  var message = {
    accountId: this.ij_.routeParams.id,
    nextPageToken: this.nextPageToken
  };
  return this.ij_.transaction.list(message)
    .then(function(response) {
      if (response.items) {
        self.transactions = self.transactions.concat(response.items);
        self.nextPageToken = response.nextPageToken;
      }
    });
};


bom.account.AccountDetailController.prototype.insertTransaction = function() {
  var self = this;
  var message = {
    accountId: this.ij_.routeParams.id,
    amount: this.transaction.type + this.transaction.amount,
    memo: this.transaction.memo
  };
  return this.ij_.transaction.insert(message)
    .then(function(response) {
      self.transactions.push(response);
      self.account.balance = (parseFloat(self.account.balance) +
                              parseFloat(response.amount)).toFixed(2);
      self.transaction = goog.object.clone(self.defaultTransaction_);
    });
};


bom.account.AccountDetailController.prototype.deleteAccount = function() {
  var self = this;
  var message = {
    id: this.ij_.routeParams.id
  };
  return this.ij_.account.remove(message)
    .then(function() {
      self.ij_.location.path('/accounts');
    });
};


bom.account.AccountDetailController.prototype.saveAccount = function() {
  var self = this;
  var message = {
    id: this.ij_.routeParams.id,
    name: this.account.name
  }
  return self.ij_.account.patch(message)
    .then(function() {

    })
};


bom.account.AccountDetailController.prototype.doneLoading_ = function() {
  this.loaded = true;
};
