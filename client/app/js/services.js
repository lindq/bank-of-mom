'use strict';

angular.module('bomServices', [])
  .value('settings', {
    OAUTH_CLIENT_ID: '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
      '.apps.googleusercontent.com',
    OAUTH_SCOPE: 'https://www.googleapis.com/auth/userinfo.email',
    API_NAME: 'bom',
    API_VERSION: 'v1',
    API_PATH: '/_ah/api',
    AUTH_PATH: '/auth'
  })
  .factory('AuthService', function($q, $location, settings) {
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
    var redirect = function() {
      var path = $location.path();
      $location.path(settings.AUTH_PATH).search('next', path);
    };
    return {
      check: check,
      redirect: redirect
    }
  })
  .factory('ApiService', function($q, settings, AuthService) {
    var load = function() {
      var deferred = $q.defer();
      var callback = deferred.resolve;
      gapi.client.load(settings.API_NAME, settings.API_VERSION,
                       callback, settings.API_PATH);
      return deferred.promise;
    };
    var wrap = function(collection, method) {
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
        }

        return AuthService.check(true)
          .then(angular.noop, AuthService.redirect)
          .then(load)
          .then(call);
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
      get: ApiService.wrap(collection, 'get'),
      insert: ApiService.wrap(collection, 'insert'),
      list: ApiService.wrap(collection, 'list'),
      patch: ApiService.wrap(collection, 'patch'),
      remove: ApiService.wrap(collection, 'remove'),
      update: ApiService.wrap(collection, 'update')
    }
  })
  .factory('TransactionService', function(ApiService) {
    var collection = 'transactions'
    return {
      get: ApiService.wrap(collection, 'get'),
      insert: ApiService.wrap(collection, 'insert'),
      list: ApiService.wrap(collection, 'list'),
      patch: ApiService.wrap(collection, 'patch'),
      remove: ApiService.wrap(collection, 'remove'),
      update: ApiService.wrap(collection, 'update')
    }
  });
