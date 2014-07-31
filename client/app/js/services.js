'use strict';

angular.module('bomServices', [])
  .value('settings', {
    API_NAME: 'bom',
    API_PATH: '/_ah/api',
    API_VERSION: 'v1',
    AUTH_PATH: '/auth',
    OAUTH_CLIENT_ID: '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
      '.apps.googleusercontent.com',
    OAUTH_SCOPE: 'https://www.googleapis.com/auth/userinfo.email'
  })
  .factory('Auth', function($q, settings) {
    return {
      check: function(immediate) {
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
      }
    };
  })
  .factory('Rpc', function($q, $location, settings, Auth) {
    var load = function() {
      var deferred = $q.defer();
      var callback = deferred.resolve;
      gapi.client.load(settings.API_NAME, settings.API_VERSION,
                       callback, settings.API_PATH);
      return deferred.promise;
    };
    var redirect = function() {
      var path = $location.path();
      $location.path(settings.AUTH_PATH).search('next', path);
    };
    return {
      method: function(collection, method) {
        return function(message) {

          var call = function() {
            var func = gapi.client[settings.API_NAME][collection][method];
            var deferred = $q.defer();
            func(message).execute(function(response) {
              if (response.error) {
                deferred.reject(response);
              } else {
                deferred.resolve(response);
              }
            });
            return deferred.promise;
          };

          return Auth.check(true)
            .then(angular.noop, redirect)
            .then(load)
            .then(call);
        }
      }
    };
  })
  .factory('Account', function(Rpc) {
    var collection = 'accounts';
    return {
      get: Rpc.method(collection, 'get'),
      insert: Rpc.method(collection, 'insert'),
      list: Rpc.method(collection, 'list'),
      patch: Rpc.method(collection, 'patch'),
      remove: Rpc.method(collection, 'remove'),
      update: Rpc.method(collection, 'update')
    }
  })
  .factory('Transaction', function(Rpc) {
    var collection = 'transactions';
    return {
      get: Rpc.method(collection, 'get'),
      insert: Rpc.method(collection, 'insert'),
      list: Rpc.method(collection, 'list'),
      patch: Rpc.method(collection, 'patch'),
      remove: Rpc.method(collection, 'remove'),
      update: Rpc.method(collection, 'update')
    }
  });
