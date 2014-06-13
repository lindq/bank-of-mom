'use strict';


angular.module('bom.controllers', [])

  .controller('AccountListController', function($scope, AccountService) {
    AccountService.list().then(function(response) {
      $scope.accounts = response.items;
    }, function(err) {
      console.log(err);
    });
  })

  .controller('AccountDetailController', function($scope, $routeParams, AccountService) {
    var message = {id: $routeParams.id};
    console.log(message);
    AccountService.get(message).then(function(response) {
      $scope.account = response;
    }, function(err) {
      console.log(err);
    });
  });
