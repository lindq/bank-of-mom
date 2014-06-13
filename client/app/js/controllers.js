'use strict';


angular.module('bom.controllers', [])

  .controller('AccountListController', function($scope, AccountService) {
    AccountService.list().then(function(response) {
      $scope.accounts = response.items;
    });
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
