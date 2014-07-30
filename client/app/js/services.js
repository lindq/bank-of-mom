'use strict';

angular.module('bomServices', [])
  .value('settings', {
    API_NAME: 'bom',
    API_PATH: '/_ah/api',
    API_VERSION: 'v1',
    AUTH_PATH: '/auth',
    HOME_PATH: '/accounts',
    OAUTH_CLIENT_ID: '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
      '.apps.googleusercontent.com',
    OAUTH_SCOPE: 'https://www.googleapis.com/auth/userinfo.email'
  })
  .factory('RedirectService', function($q, $location, settings) {
    var toAuth = function() {
      var path = $location.path();
      $location.path(settings.AUTH_PATH).search('next', path);
    };
    var toHome = function() {
      $location.path(settings.HOME_PATH);
    };
    var toNext = function() {
      var next = $location.search().next || settings.HOME_PATH;
      $location.path(next).search('next', null);
    };
    return {
      toAuth: toAuth,
      toHome: toHome,
      toNext: toNext
    }
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
  .factory('ApiService', function($q, settings, AuthService, RedirectService) {
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
          .then(angular.noop, RedirectService.toAuth)
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
    var collection = 'accounts';
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
    var collection = 'transactions';
    return {
      get: ApiService.wrap(collection, 'get'),
      insert: ApiService.wrap(collection, 'insert'),
      list: ApiService.wrap(collection, 'list'),
      patch: ApiService.wrap(collection, 'patch'),
      remove: ApiService.wrap(collection, 'remove'),
      update: ApiService.wrap(collection, 'update')
    }
  });
