'use strict';

angular.module('bomControllers', [])
  .controller('AccountListController', function($scope, AccountService) {

    AccountService.list().then(function(response) {
      $scope.accounts = response.items || [];
    });

    $scope.addAccount = function(name) {
      var message = {name: name};
      AccountService.insert(message).then(function(response) {
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
      TransactionService.list({
        accountId: $routeParams.id,
        nextPageToken: $scope.nextPageToken
      })
        .then(function(response) {
          $scope.transactions = $scope.transactions.concat(response.items);
          $scope.nextPageToken = response.nextPageToken;
        });
    };

    $scope.transactions = [];
    $scope.loadTransactions = loadTransactions;

    loadTransactions();
  });
