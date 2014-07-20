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
    var check = function(immediate) {
      var deferred = $q.defer();
      var params = {
        client_id: settings.OAUTH_CLIENT_ID,
        scope: settings.OAUTH_SCOPE,
        immediate: immediate
      }
      gapi.auth.authorize(params, function(response) {
        if (response.error) {
          deferred.reject(response);
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    };
    return {
      check: check
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
    var wrap = function(collection, method) {
      return function(message) {
        var api = settings.API_NAME;
        var func = gapi.client[api][collection][method];
        var deferred = $q.defer();
        func(message).execute(function(response) {
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
    var collection = 'accounts'
    return {
      insert: ApiService.wrap(collection, 'insert'),
      list: ApiService.wrap(collection, 'list'),
      get: ApiService.wrap(collection, 'get'),
      remove: ApiService.wrap(collection, 'remove')
    }
  })
  .factory('TransactionService', function(ApiService) {
    var collection = 'transactions'
    return {
      insert: ApiService.wrap(collection, 'insert'),
      list: ApiService.wrap(collection, 'list'),
      get: ApiService.wrap(collection, 'get'),
      remove: ApiService.wrap(collection, 'remove')
    }
  });
