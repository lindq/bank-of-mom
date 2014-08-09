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
 * @param {string} name
 * @param {string} version
 * @param {function} callback
 */
gapi.client.load = function(name, version, callback) {};
