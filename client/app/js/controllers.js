'use strict';

angular.module('bomControllers', [])
  .controller('AuthController', function($scope, $location, AuthService) {

    var redirect = function() {
      var next = $location.search().next || '/accounts';
      $location.path(next).search('next', null);
    };

    $scope.auth = function() {
      AuthService.check(false)
        .then(redirect);
    };

  })
  .controller('AccountListController', function($scope, $location, AccountService) {
    var defaultAccount = { name: '' };

    $scope.loaded = false;
    $scope.accounts = [];
    $scope.account = angular.copy(defaultAccount);

    var listAccounts = function() {
      return AccountService.list()
        .then(function(response) {
          if (response.items) {
            $scope.accounts = response.items;
          }
        });
    };

    var insertAccount = function() {
      var message = { name: $scope.account.name };
      return AccountService.insert(message)
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

    $scope.addAccount = function() {
      insertAccount();
    };
  })
  .controller('AccountDetailController', function($scope, $location,
                                                  $routeParams, AccountService,
                                                  TransactionService) {
    var defaultTransaction = { type: '+', amount: '', memo: '' };

    $scope.loaded = false;
    $scope.transactions = [];
    $scope.transaction = angular.copy(defaultTransaction);

    var getAccount = function() {
      var message = {id: $routeParams.id};
      return AccountService.get(message)
        .then(function(response) {
          $scope.account = response;
        });
    };

    var listTransactions = function() {
      var message = {
        accountId: $routeParams.id,
        nextPageToken: $scope.nextPageToken
      };
      return TransactionService.list(message)
        .then(function(response) {
          if (response.items) {
            $scope.transactions = $scope.transactions.concat(response.items);
            $scope.nextPageToken = response.nextPageToken;
          }
        });
    };

    var addTransaction = function() {
      var message = {
        accountId: $routeParams.id,
        amount: $scope.transaction.type + $scope.transaction.amount,
        memo: $scope.transaction.memo
      };
      return TransactionService.insert(message)
        .then(function(response) {
          $scope.transactions.push(response);
          $scope.account.balance = (parseFloat($scope.account.balance) +
                                    parseFloat(response.amount)).toFixed(2);
          $scope.transaction = angular.copy(defaultTransaction);
        });
    };

    var deleteAccount = function() {
      var message = { id: $routeParams.id };
      return AccountService.remove(message)
        .then(function(response) {
          $location.path('/accounts');
        });
    };

    var doneLoading = function() {
      $scope.loaded = true;
    };

    getAccount()
      .then(listTransactions)
      .then(doneLoading);

    $scope.listTransactions = listTransactions;
    $scope.addTransaction = addTransaction;
    $scope.deleteAccount = deleteAccount;
  });
