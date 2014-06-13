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

    TransactionService.list({accountId: $routeParams.id})
      .then(function(response) {
        $scope.transactions = response.items;
        $scope.nextPageToken = response.nextPageToken;
      });

  });
