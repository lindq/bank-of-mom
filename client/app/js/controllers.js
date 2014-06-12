'use strict';


angular.module('bom.controllers', [])

  .controller('AccountsController', function($scope) {
    $scope.accounts = [
      {'name': 'Ethan', 'balance': 10.00},
      {'name': 'Micah', 'balance': 20.00},
      {'name': 'Soren', 'balance': 30.00}
    ];
  })

  .controller('AccountCreateController', function($scope) {

  });
