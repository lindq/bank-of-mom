/**
 * @fileoverview Auth controller definitions.
 */

goog.provide('bom.auth.AuthController');



/**
 * Auth controller.
 * @param {!angular.$location} $location The Angular location service.
 * @param {!bom.auth.Auth} auth The auth service.
 * @constructor
 * @ngInject
 * @export
 */
bom.auth.AuthController = function($location, auth) {
  /**
   * Injected Angular services.
   * @private {!Object}
   */
  this.ij_ = {
    location: $location,
    auth: auth
  };
};


/**
 * Redirects user to next requested route or the default route.
 * @private
 */
bom.auth.AuthController.prototype.redirectToNext_ = function() {
  var path = this.ij_.location.search().next || '/';
  this.ij_.location.path(path).search('next', null);
};


/**
 * Initiates the OAuth 2.0 authorization process.
 * @return {!angular.$q.Promise} A promise.
 * @export
 */
bom.auth.AuthController.prototype.initiateAuth = function() {
  return this.ij_.auth.check(false)
    .then(goog.bind(this.redirectToNext_, this));
};
