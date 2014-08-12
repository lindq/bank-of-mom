/**
 * @fileoverview API proxy service definitions.
 */

goog.provide('bom.apiProxy.ApiProxy');

goog.require('bom.constants');



/**
 * ApiProxy service.
 * @param {!angular.$q} $q The Angular promise service.
 * @param {!angular.$location} $location The Angular $location service.
 * @param {!bom.auth.Auth} auth The auth service.
 * @constructor
 * @ngInject
 */
bom.apiProxy.ApiProxy = function($q, $location, auth) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    q: $q,
    location: $location,
    auth: auth
  };
};


/**
 * Loads the remote API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.apiProxy.ApiProxy.prototype.load_ = function() {
  var deferred = this.ij_.q.defer();
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
 * @param {string} collection The name of the API endpoints collection.
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 * @private
 */
bom.apiProxy.ApiProxy.prototype.call_ = function(collection, method,
                                                 opt_message) {
  var func = gapi.client[bom.constants.API_NAME][collection][method];
  var deferred = this.ij_.q.defer();
  func(opt_message)['execute'](function(response) {
    if (response.error) {
      deferred.reject(response);
    } else {
      deferred.resolve(response);
    }
  });
  return deferred.promise;
};


/**
 * Calls the API endpoints method for the given collection.
 * @param {string} collection The name of the API endpoints collection.
 * @param {string} method The name of the API endpoints method.
 * @param {!Object=} opt_message Optional message object to pass to the API.
 * @return {!angular.$q.Promise} A promise.
 */
bom.apiProxy.ApiProxy.prototype.callApiMethod = function(collection, method,
                                                         opt_message) {
  return this.ij_.auth.check(true)
    .then(angular.noop,
          goog.bind(this.redirectToAuth_, this))
    .then(goog.bind(this.load_, this))
    .then(goog.bind(this.call_, this, collection, method, opt_message));
};
