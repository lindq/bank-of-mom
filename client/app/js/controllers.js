'use strict';

angular.module('bomControllers', [])
  .controller('AuthController', function($scope, Auth, Redirect) {

    $scope.auth = function() {
      Auth.check(false)
        .then(Redirect.to('next'));
    };

  })
  .controller('AccountListController', function($scope, Account) {
    var defaultAccount = { name: '' };

    $scope.loaded = false;
    $scope.accounts = [];
    $scope.account = angular.copy(defaultAccount);

    var listAccounts = function() {
      return Account.list()
        .then(function(response) {
          if (response.items) {
            $scope.accounts = response.items;
          }
        });
    };

    var insertAccount = function() {
      var message = { name: $scope.account.name };
      return Account.insert(message)
        .then(function(response) {
          $scope.accounts.push(response);
          $scope.account = angular.copy(defaultAccount);
        });
    };

    var doneLoading = function() {
      $scope.loaded = true;
    };

    listAccounts()
      .then(doneLoading);

    $scope.insertAccount = insertAccount;
  })
  .controller('AccountDetailController', function($scope, $routeParams,
                                                  Account, Redirect,
                                                  Transaction) {
    var defaultTransaction = { type: '+', amount: '', memo: '' };

    $scope.loaded = false;
    $scope.transactions = [];
    $scope.transaction = angular.copy(defaultTransaction);

    var getAccount = function() {
      var message = {id: $routeParams.id};
      return Account.get(message)
        .then(function(response) {
          $scope.account = response;
        });
    };

    var listTransactions = function() {
      var message = {
        accountId: $routeParams.id,
        nextPageToken: $scope.nextPageToken
      };
      return Transaction.list(message)
        .then(function(response) {
          if (response.items) {
            $scope.transactions = $scope.transactions.concat(response.items);
            $scope.nextPageToken = response.nextPageToken;
          }
        });
    };

    var insertTransaction = function() {
      var message = {
        accountId: $routeParams.id,
        amount: $scope.transaction.type + $scope.transaction.amount,
        memo: $scope.transaction.memo
      };
      return Transaction.insert(message)
        .then(function(response) {
          $scope.transactions.push(response);
          $scope.account.balance = (parseFloat($scope.account.balance) +
                                    parseFloat(response.amount)).toFixed(2);
          $scope.transaction = angular.copy(defaultTransaction);
        });
    };

    var deleteAccount = function() {
      var message = { id: $routeParams.id };
      return Account.remove(message)
        .then(Redirect.to('accounts'));
    };

    var doneLoading = function() {
      $scope.loaded = true;
    };

    getAccount()  // TODO: parallelize these two requests
      .then(listTransactions)
      .then(doneLoading);

    $scope.listTransactions = listTransactions;
    $scope.insertTransaction = insertTransaction;
    $scope.deleteAccount = deleteAccount;
  });
