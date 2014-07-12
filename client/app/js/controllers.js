'use strict';

angular.module('bomControllers', [])
  .controller('AuthController', function($scope, $location, $rootScope, AuthService, ApiService) {
    var success = function() {
      $scope.needsAuth = false;
      $rootScope.authorized = true;
      ApiService.load()
        .then(function() {
          var next = $location.search().next || '/accounts';
          $location.path(next).search('next', null);
        });
    };
    var error = function() {
      $scope.needsAuth = true;
    };
    AuthService.auth(true).then(success, error);
    $scope.auth = function() {
      AuthService.auth(false).then(success, error);
    };
  })
  .controller('AccountListController', function($scope, AccountService) {
    var defaultAccount = { name: '' };

    $scope.accounts = [];
    $scope.account = angular.copy(defaultAccount);

    AccountService.list().then(function(response) {
      if (response.items) {
        $scope.accounts = response.items;
      }
    });

    $scope.addAccount = function() {
      var message = { name: $scope.account.name };
      AccountService.insert(message).then(function(response) {
        $scope.accounts.push(response);
        $scope.account = angular.copy(defaultAccount);
      });
    };
  })
  .controller('AccountDetailController', function($scope, $location, $routeParams, AccountService, TransactionService) {
    var defaultTransaction = { type: '+', amount: '', memo: '' };

    $scope.transactions = [];
    $scope.transaction = angular.copy(defaultTransaction);

    AccountService.get({id: $routeParams.id}).then(function(response) {
      $scope.account = response;
    });

    $scope.getTransactions = function() {
      var message = {
        accountId: $routeParams.id,
        nextPageToken: $scope.nextPageToken
      };
      TransactionService.list(message).then(function(response) {
        $scope.transactions = $scope.transactions.concat(response.items);
        $scope.nextPageToken = response.nextPageToken;
      });
    };

    $scope.addTransaction = function() {
      var message = {
        accountId: $routeParams.id,
        amount: $scope.transaction.type + $scope.transaction.amount,
        memo: $scope.transaction.memo
      };
      TransactionService.insert(message).then(function(response) {
        $scope.transactions.push(response);
        $scope.account.balance = (parseFloat($scope.account.balance) +
                                  parseFloat(response.amount)).toFixed(2);
        $scope.transaction = angular.copy(defaultTransaction);
      });
    };

    $scope.deleteAccount = function() {
      var message = { id: $routeParams.id };
      AccountService.remove(message).then(function(response) {
        $location.path('/accounts');
      });
    };

    $scope.getTransactions();
  });
