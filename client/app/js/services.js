'use strict';

angular.module('bomServices', [])
  .factory('utils', function($q, $rootScope) {

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
  .factory('AccountService', function(utils) {
    var bom = gapi.client.bom;
    return {
      insert: utils.apiMethod(bom.accounts.insert),
      list: utils.apiMethod(bom.accounts.list),
      get: utils.apiMethod(bom.accounts.get),
      remove: utils.apiMethod(bom.accounts.remove)
    }
  })
  .factory('TransactionService', function(utils) {
    var bom = gapi.client.bom;
    return {
      insert: utils.apiMethod(bom.transactions.insert),
      list: utils.apiMethod(bom.transactions.list),
      get: utils.apiMethod(bom.transactions.get),
      remove: utils.apiMethod(bom.transactions.remove)
    }
  });
