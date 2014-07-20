'use strict';

angular.module('bomControllers', [])
  .controller('AuthController', function($scope, $location, AuthService) {

    var checkAuth = function() {
      return AuthService.check(false);
    };

    var redirect = function() {
      var next = $location.search().next || '/accounts';
      $location.path(next).search('next', null);
    };

    $scope.auth = function() {
      checkAuth()
        .then(redirect)
    };
  })
  .controller('AccountListController', function($scope, $location, AccountService, AuthService, ApiService) {
    var defaultAccount = { name: '' };

    $scope.accounts = [];
    $scope.account = angular.copy(defaultAccount);

    var redirect = function() {
      var path = $location.path();
      $location.path('/auth').search('next', path);
    };

    var checkAuth = function() {
      return AuthService.check(true)
        .then(angular.noop, redirect);
    };

    var loadApi = function() {
      return ApiService.load();
    };

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

    checkAuth()
      .then(loadApi)
      .then(listAccounts);

    $scope.addAccount = function() {
      checkAuth()
        .then(loadApi)
        .then(insertAccount);
    };
  })
  .controller('AccountDetailController', function($scope, $location, $routeParams, AccountService, TransactionService, AuthService, ApiService) {
    var defaultTransaction = { type: '+', amount: '', memo: '' };

    $scope.transactions = [];
    $scope.transaction = angular.copy(defaultTransaction);

    var redirect = function() {
      var path = $location.path();
      $location.path('/auth').search('next', path);
    };

    var checkAuth = function() {
      return AuthService.check(true)
        .then(angular.noop, redirect);
    };

    var loadApi = function() {
      return ApiService.load();
    };

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

    checkAuth()
      .then(loadApi)
      .then(getAccount)
      .then(listTransactions);

    $scope.listTransactions = function() {
      checkAuth()
        .then(loadApi)
        .then(listTransactions);
    };

    $scope.addTransaction = function() {
      checkAuth()
        .then(loadApi)
        .then(addTransaction);
    };

    $scope.deleteAccount = function() {
      checkAuth()
        .then(loadApi)
        .then(deleteAccount);
    };
  });
