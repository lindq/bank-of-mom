/**
 * @fileoverview Extern definitions for the Google JS Client Library (abridged).
 * @externs
 */


/**
 * Google API namespace.
 * @type {Object}
 * @const
 */
var gapi = {};


/**
 * Auth API namespace.
 * @type {Object}
 * @const
 */
gapi.auth = {};


/**
 * Initiates the OAuth 2.0 authorization process.
 * @param {!Object} params A key/value map of parameters for the request.
 * @param {function(!Object)} callback The function to call once the login
 *     process is complete.
 */
gapi.auth.authorize = function(params, callback) {};


/**
 * Client API namespace.
 * @type {Object}
 * @const
 */
gapi.client = {};


/**
 * Loads client library interface for the given API.
 * @param {string} name The name of the API to load.
 * @param {string} version The version of the API to load
 * @param {function()=} opt_callback Optional function to call once the API
 *     interface is loaded.
 * @param {string=} opt_path Optional path to the API root.
 */
gapi.client.load = function(name, version, opt_callback, opt_path) {};
