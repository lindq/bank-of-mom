'use strict';

angular.module('bomServices', [])
  .value('settings', {
    OAUTH_CLIENT_ID: '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
      '.apps.googleusercontent.com',
    OAUTH_SCOPE: 'https://www.googleapis.com/auth/userinfo.email',
    API_NAME: 'bom',
    API_VERSION: 'v1',
    API_PATH: '/_ah/api'
  })
  .factory('AuthService', function($q, settings) {
    var auth = function(immediate) {
      var deferred = $q.defer();
      var params = {
        client_id: settings.OAUTH_CLIENT_ID,
        scope: settings.OAUTH_SCOPE,
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
  .factory('ApiService', function($q, settings) {
    var load = function() {
      var deferred = $q.defer();
      gapi.client.load(settings.API_NAME,
                       settings.API_VERSION,
                       deferred.resolve,
                       settings.API_PATH);
      return deferred.promise;
    };
    var wrap = function(method) {
      return function(message) {
        var deferred = $q.defer();
        method(message).execute(function(response) {
          if (response.error) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
    };
    return {
      load: load,
      wrap: wrap
    }
  })
  .factory('AccountService', function(ApiService) {
    var accounts = gapi.client.bom.accounts;
    return {
      insert: ApiService.wrap(accounts.insert),
      list: ApiService.wrap(accounts.list),
      get: ApiService.wrap(accounts.get),
      remove: ApiService.wrap(accounts.remove)
    }
  })
  .factory('TransactionService', function(ApiService) {
    var transactions = gapi.client.bom.transactions;
    return {
      insert: ApiService.wrap(transactions.insert),
      list: ApiService.wrap(transactions.list),
      get: ApiService.wrap(transactions.get),
      remove: ApiService.wrap(transactions.remove)
    }
  });
