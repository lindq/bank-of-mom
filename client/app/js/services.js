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
    }
    return {
      load: load
    }
  })
  .factory('utils', function($q) {
    var apiMethod = function(method) {
      return function(message) {
        var deferred = $q.defer();
        method(message).execute(function(response) {
          if (response.error) {
            deferred.reject(response.message);
          } else {
            deferred.resolve(response);
          }
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
