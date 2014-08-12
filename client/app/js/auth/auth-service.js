/**
 * @fileoverview Auth service definitions.
 */

goog.provide('bom.auth.Auth');

goog.require('bom.constants');


/**
 * Auth service.
 * @param {!angular.$q} $q The Angular promise service.
 * @constructor
 * @ngInject
 */
bom.auth.Auth = function($q) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    q: $q
  };
};


/**
 * Initiates the OAuth authorization process.
 * @param {boolean} immediate If true, refreshes OAuth token behind the scenes,
 *     with no UI shown to the user.
 * @return {!angular.$q.Promise} A promise.
 */
bom.auth.Auth.prototype.check = function(immediate) {
  var deferred = this.ij_.q.defer();
  var params = {
    client_id: bom.constants.OAUTH_CLIENT_ID,
    scope: bom.constants.OAUTH_SCOPE,
    immediate: immediate
  };
  gapi.auth.authorize(params, function(response) {
    if (response.error) {
      deferred.reject(response);
    } else {
      deferred.resolve(response);
    }
  });
  return deferred.promise;
};
