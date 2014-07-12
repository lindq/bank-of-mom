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
    AccountService.list()
      .then(function(response) {
        $scope.accounts = response.items || [];
        angular.element('.modal').on('shown.bs.modal', function(e) {
          e.target.querySelector('input').focus();
        });
      });

    $scope.addAccount = function(name) {
      var message = {name: name};
      AccountService.insert(message)
        .then(function(response) {
          $scope.accounts.push(response);
        });
      angular.element('.modal').modal('hide');
    };
  })
  .controller('AccountDetailController', function($scope, $routeParams, AccountService, TransactionService) {
    AccountService.get({id: $routeParams.id})
      .then(function(response) {
        $scope.account = response;
      });

    var loadTransactions = function() {
      var message = {
        accountId: $routeParams.id,
        nextPageToken: $scope.nextPageToken
      };
      TransactionService.list(message)
        .then(function(response) {
          $scope.transactions = $scope.transactions.concat(response.items);
          $scope.nextPageToken = response.nextPageToken;
        });
    };

    $scope.transactions = [];
    $scope.loadTransactions = loadTransactions;

    loadTransactions();
  });
