'use strict';

angular.module('bomServices', [])
  .factory('AuthService', function($q) {
    var CLIENT_ID = '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
      '.apps.googleusercontent.com';
    var SCOPE = 'https://www.googleapis.com/auth/userinfo.email';
    var auth = function(immediate) {
      var deferred = $q.defer();
      var params = {
        client_id: CLIENT_ID,
        scope: SCOPE,
        immediate: immediate
      }
      gapi.auth.authorize(params, function(response) {
        if (response.error) {
          deferred.reject(response.message);
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    };
    return {
      auth: auth
    }
  })
  .factory('ApiService', function($q) {
    var load = function() {
      var deferred = $q.defer();
      gapi.client.load('bom', 'v1', function() {
        deferred.resolve();
      }, '/_ah/api');
      return deferred.promise;
    }
    return {
      load: load
    }
  })
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
