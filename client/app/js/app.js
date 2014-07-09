'use strict';

var app = angular.module('bom', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/accounts', {
      templateUrl: 'partials/account-list.html',
      controller: 'AccountListController'
    })
    .when('/accounts/new', {
      templateUrl: 'partials/account-add.html',
      controller: 'AccountAddController'
    })
    .when('/accounts/:id', {
      templateUrl: 'partials/account-detail.html',
      controller: 'AccountDetailController'
    })
    .otherwise({
      redirectTo: '/accounts'
    });
});

app.factory('utils', function($q, $rootScope) {

  var apiMethod = function(method) {
    return function(message) {
      $rootScope.loading = true;

      var deferred = $q.defer();

      method(message).execute(function(response) {
        if (response.error) {
          deferred.reject(response.message);
        } else {
          deferred.resolve(response);
        }
        $rootScope.loading = false;
      });

      return deferred.promise;
    }
  };

  return {
    apiMethod: apiMethod
  };
})

app.factory('AccountService', function(utils) {
  var bom = gapi.client.bom;
  return {
    insert: utils.apiMethod(bom.accounts.insert),
    list: utils.apiMethod(bom.accounts.list),
    get: utils.apiMethod(bom.accounts.get),
    remove: utils.apiMethod(bom.accounts.remove)
  }
})

app.factory('TransactionService', function(utils) {
  var bom = gapi.client.bom;
  return {
    insert: utils.apiMethod(bom.transactions.insert),
    list: utils.apiMethod(bom.transactions.list),
    get: utils.apiMethod(bom.transactions.get),
    remove: utils.apiMethod(bom.transactions.remove)
  }
});

app.controller('AccountListController', function($scope, AccountService) {

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

app.controller('AccountAddController', function($scope, AccountService) {

})


app.controller('AccountDetailController', function($scope, $routeParams, AccountService, TransactionService) {

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
