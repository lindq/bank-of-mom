goog.provide('bom.auth.AuthController');


/**
 * Auth controller.
 * @param {!angular.$location} $location the Angular location service.
 * @param {!bom.auth.Auth} auth the Auth service.
 * @constructor
 * @ngInject
 */
bom.auth.AuthController = function($location, auth) {

  this.ij_ = {
    location: $location,
    auth: auth
  };
};


/**
 * Redirects user to next page.
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
  this.ij_.auth.check(false)
    .then(this.redirectToNext_);
};
