/**
 * Google API namespace.
 */
var gapi = {};

/**
 * Auth API namespace.
 * @type {Object}
 */
gapi.auth = {};

/**
 * Initiates the OAuth 2.0 authorization process.
 * @param {!Object} params
 * @param {function} callback
 */
gapi.auth.authorize = function(params, callback) {};

/**
 * Client API namespace.
 * @type {Object}
 */
gapi.client = {};

/**
 * Loads client library interface for the given API.
 * @param {string} name
 * @param {string} version
 * @param {function} callback
 */
gapi.client.load = function(name, version, callback) {};
