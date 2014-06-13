'use strict';


angular.module('bom.services', [])

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

    return {
      insert: utils.apiMethod(gapi.client.bom.accounts.insert),
      list: utils.apiMethod(gapi.client.bom.accounts.list),
      get: utils.apiMethod(gapi.client.bom.accounts.get),
      remove: utils.apiMethod(gapi.client.bom.accounts.remove)
    }

  })

  .factory('TransactionService', function(utils) {

    return {
      insert: utils.apiMethod(gapi.client.bom.transactions.insert),
      list: utils.apiMethod(gapi.client.bom.transactions.list),
      get: utils.apiMethod(gapi.client.bom.transactions.get),
      remove: utils.apiMethod(gapi.client.bom.transactions.remove)
    }

  });
