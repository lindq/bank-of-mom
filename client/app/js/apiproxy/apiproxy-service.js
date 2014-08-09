goog.provide('bom.apiProxy.module');

goog.require('bom.constants');


/**
 * ApiProxy service.
 * @param {!angular.$q} $q the Angular promise service.
 * @param {!angular.$location} $location the Angular $location service.
 * @param {!bom.auth.Auth} $q the Auth service.
 * @constructor
 * @ngInject
 */
bom.apiProxy.ApiProxy = function($q, $location, auth) {

  this.ij_ = {
    q: $q,
    location: $location,
    auth: auth
  };
};


/**
 * Loads the remote API.
 * @private
 * @return {!angular.$q.Promise} A promise.
 */
bom.apiProxy.ApiProxy.prototype.load_ = function() {
  var deferred = this.ij_q.defer();
  var callback = deferred.resolve;
  gapi.client.load(bom.constants.API_NAME, bom.constants.API_VERSION, callback,
                   bom.constants.API_PATH);
  return deferred.promise;
};


/**
 * Redirects user to the auth page.
 * @private
 */
bom.apiProxy.ApiProxy.prototype.redirectToAuth_ = function() {
  var path = this.ij_.location.path();
  this.ij_.location.path(bom.constants.AUTH_PATH).search('next', path);
};


/**
 * @param {string} collection
 * @param {string} method
 * @return {!angular.$q.Promise} A promise.
 */
bom.apiProxy.ApiProxy.prototype.callApiMethod = function(collection, method,
                                                         opt_message) {
  var self = this;

  var call = function() {
    var func = gapi.client[bom.constants.API_NAME][collection][method];
    var deferred = self.ij_.q.defer();
    func(opt_message).execute(function(response) {
      if (response.error) {
        deferred.reject(response);
      } else {
        deferred.resolve(response);
      }
    });
    return deferred.promise;
  };

  return this.auth_.check(true)
    .then(angular.noop, this.redirectToAuth_)
    .then(this.load_)
    .then(call);
};
