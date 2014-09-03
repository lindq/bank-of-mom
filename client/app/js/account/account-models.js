/**
 * @fileoverview Account model definitions.
 */

goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');



/**
 * Transaction model.
 * @param {string=} opt_id
 * @param {string=} opt_type
 * @param {string=} opt_amount
 * @param {string=} opt_memo
 * @param {string=} opt_timestamp
 * @constructor
 */
bom.account.Transaction = function(
  opt_id, opt_type, opt_amount, opt_memo, opt_timestamp) {

  /**
   * @type {string}
   */
  this.id = opt_id || '';

  /**
   * @type {string}
   */
  this.type = opt_type || bom.account.Transaction.DEPOSIT;

  /**
   * @type {string}
   */
  this.amount = opt_amount || '';

  /**
   * @type {string}
   */
  this.memo = opt_memo || '';

  /**
   * @type {string}
   */
  this.timestamp = opt_timestamp || '';
};


/**
 * @type {string}
 * @const
 */
bom.account.Transaction.DEPOSIT = '\u002b';


/**
 * @type {string}
 * @const
 */
bom.account.Transaction.WITHDRAWAL = '\u002d';


/**
 * @param {!json.Transaction} message
 * @return {!bom.account.Transaction}
 */
bom.account.Transaction.fromMessage = function(message) {
  var type, amount;
  if (message.amount) {
    amount = parseFloat(message.amount);
    if (amount < 0) {
      type = bom.account.Transaction.WITHDRAWAL;
      amount = Math.abs(amount);
    }
    amount = amount.toFixed(2);
  }
  return new bom.account.Transaction(
    message.id, type, amount, message.memo, message.timestamp);
};


/**
 * @param {string} accountId
 * @return {Object}
 */
bom.account.Transaction.prototype.toMessage = function(accountId) {
  return {
    accountId: accountId,
    id: this.id,
    amount: this.type + this.amount,
    memo: this.memo,
    timestamp: this.timestamp
  };
};
