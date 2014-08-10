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
 * @export
 */
bom.account.AccountListController = function($scope, account) {

  this.ij_ = {
    scope: $scope,
    account: account
  };

  this.defaultAccount_ = goog.object.createImmutableView({
    name: ''
  });

  this['loaded'] = false;

  this['accounts'] = [];

  this['account'] = goog.object.clone(this.defaultAccount_);

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
  return this.ij_.account.list()
    .then(function(response) {
      if (response.items) {
        self['accounts'] = response.items;
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
    name: this['account'].name
  };
  return this.ij_.account.insert(message)
    .then(function(response) {
      self['accounts'].push(response);
      self['account'] = goog.object.clone(this.defaultAccount_);
    });
};


/**
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @param {!angular.$q} $q the Angular promise service.
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
    transaction: transaction
  };

  this.defaultTransaction_ = goog.object.createImmutableView({
    type: bom.account.TransactionTypes.DEPOSIT,
    amount: '',
    memo: ''
  });

  this['account'] = null;

  this['loaded'] = false;

  this['transactions'] = [];

  this['transaction'] = goog.object.clone(this.defaultTransaction_);

  this['nextPageToken'] = null;

  this.init_();
};


/** @private */
bom.account.AccountDetailController.prototype.init_ = function() {
  this.ij_.q.all([
    this.getAccount(),
    this.listTransactions()
  ])
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
  return this.ij_.account.get(message)
    .then(function(response) {
      self['account'] = response;
    });
};


/**
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.account.AccountDetailController.prototype.listTransactions = function() {
  var self = this;
  var message = {  // TODO: make an extern for this (and other messages)
    'accountId': this.ij_.routeParams.id,
    'nextPageToken': this['nextPageToken']
  };
  return this.ij_.transaction.list(message)
    .then(function(response) {
      if (response.items) {
        self['transactions'] = self['transactions'].concat(response.items);
        self['nextPageToken'] = response.nextPageToken;
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
    amount: this['transaction'].type + this['transaction'].amount,
    memo: this['transaction'].memo
  };
  return this.ij_.transaction.insert(message)
    .then(function(response) {
      self['transactions'].push(response);
      self['account'].balance = (parseFloat(self['account'].balance) +
                                 parseFloat(response.amount)).toFixed(2);
      self['transaction'] = goog.object.clone(self.defaultTransaction_);
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
  return this.ij_.account.remove(message)
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
  return self.ij_.account.patch(message)
    .then(function() {

    });
};


/** @private */
bom.account.AccountDetailController.prototype.doneLoading_ = function() {
  this.loaded = true;
};
