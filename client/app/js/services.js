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
  .factory('Redirect', function($q, $location, settings) {
    var paths = {
      auth: function() {
        var path = $location.path();
        $location.path(settings.AUTH_PATH).search('next', path);
      },
      next: function() {
        var path = $location.search().next || settings.HOME_PATH;
        $location.path(path).search('next', null);
      }
    };
    return {
      to: function(path) {
        var func = paths[path];
        if (!func) {
          if (path.charAt(0) != '/') {
            path = '/' + path;
          }
          func = function() {
            $location.path(path);
          }
        }
        return func;
      }
    }
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
      };
    }
  })
  .factory('Api', function($q, settings, Auth, Redirect) {
    var load = function() {
      var deferred = $q.defer();
      var callback = deferred.resolve;
      gapi.client.load(settings.API_NAME, settings.API_VERSION,
                       callback, settings.API_PATH);
      return deferred.promise;
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
          }

          return Auth.check(true)
            .then(angular.noop, Redirect.to('auth'))
            .then(load)
            .then(call);
        }
      }
    }
  })
  .factory('Account', function(Api) {
    var collection = 'accounts';
    return {
      get: Api.method(collection, 'get'),
      insert: Api.method(collection, 'insert'),
      list: Api.method(collection, 'list'),
      patch: Api.method(collection, 'patch'),
      remove: Api.method(collection, 'remove'),
      update: Api.method(collection, 'update')
    }
  })
  .factory('Transaction', function(Api) {
    var collection = 'transactions';
    return {
      get: Api.method(collection, 'get'),
      insert: Api.method(collection, 'insert'),
      list: Api.method(collection, 'list'),
      patch: Api.method(collection, 'patch'),
      remove: Api.method(collection, 'remove'),
      update: Api.method(collection, 'update')
    }
  });
