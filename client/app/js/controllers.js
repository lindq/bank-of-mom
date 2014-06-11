'use strict';


angular.module('bom.controllers', [])
  .controller('MainController', ['$scope', function($scope) {

  }])
  .controller('AccountsController', ['$scope', function($scope) {
    $scope.accounts = [
      {'name': 'Ethan', 'balance': 10.00},
      {'name': 'Micah', 'balance': 20.00},
      {'name': 'Soren', 'balance': 30.00}
    ];
  }])
  .controller('AccountCreateController', ['$scope', function($scope) {

  }]);
