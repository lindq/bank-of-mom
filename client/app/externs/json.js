/**
 * @fileoverview Extern definitions for JSON objects.
 * @externs
 */


/**
 * @type {Object}
 * @const
 */
var json = {};


/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   balance: string
 * }}
 */
json.Account;


/**
 * @typedef {{
 *   accounts: (!Array.<!json.Account>|undefined)
 * }}
 */
json.AccountListResponse;


/**
 * @typedef {{
 *   accountId: string,
 *   id: string,
 *   amount: string,
 *   memo: string,
 *   timestamp: string
 * }}
 */
json.Transaction;


/**
 * @typedef {{
 *   transactions: (!Array.<!json.Transaction>|undefined),
 *   nextPageToken: (string|undefined),
 *   totalItems: (string|undefined),
 *   itemsPerPage: (string|undefined)
 * }}
 */
json.TransactionListResponse;
