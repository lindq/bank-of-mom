'use strict';


angular.module('bom.controllers', [])

  .controller('AccountsController', function($scope, AccountService) {
    AccountService.list().then(function(response) {
      $scope.accounts = response.items;
    }, function(err) {
      console.log(err);
    });
  })

  .controller('AccountCreateController', function($scope) {

  });
