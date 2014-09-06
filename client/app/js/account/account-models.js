/**
 * @fileoverview Account model definitions.
 */

goog.provide('bom.account.Account');
goog.provide('bom.account.Transaction');



/**
 * Account model.
 * @param {string=} opt_id
 * @param {string=} opt_name
 * @param {string=} opt_balance
 * @constructor
 * @export
 */
bom.account.Account = function(opt_id, opt_name, opt_balance) {

  /**
   * @type {string}
   * @export
   */
  this.id = opt_id || '';

  /**
   * @type {string}
   * @export
   */
  this.name = opt_name || '';

  /**
   * @type {string}
   * @export
   */
  this.balance = opt_balance || '';
};


/**
 * @param {!json.Account} message
 * @return {!bom.account.Account}
 */
bom.account.Account.fromMessage = function(message) {
  return new bom.account.Account(message.id, message.name, message.balance);
};


/**
 * @return {Object}
 */
bom.account.Account.prototype.toMessage = function() {
  return {
    id: parseInt(this.id, 10),
    name: this.name
  };
};


/**
 * @param {number|string} amount
 */
bom.account.Account.prototype.addBalance = function(amount) {
  this.balance = (parseFloat(this.balance) + parseFloat(amount)).toFixed(2);
};


/**
 * @param {number|string} amount
 */
bom.account.Account.prototype.subtractBalance = function(amount) {
  this.balance = (parseFloat(this.balance) - parseFloat(amount)).toFixed(2);
};



/**
 * Transaction model.
 * @param {string=} opt_accountId
 * @param {string=} opt_id
 * @param {string=} opt_type
 * @param {string=} opt_amount
 * @param {string=} opt_memo
 * @param {string=} opt_timestamp
 * @constructor
 * @export
 */
bom.account.Transaction = function(
  opt_accountId, opt_id, opt_type, opt_amount, opt_memo, opt_timestamp) {

  /**
   * @type {string}
   * @export
   */
  this.accountId = opt_accountId || '';

  /**
   * @type {string}
   * @export
   */
  this.id = opt_id || '';

  /**
   * @type {string}
   * @export
   */
  this.type = opt_type || bom.account.Transaction.DEPOSIT;

  /**
   * @type {string}
   * @export
   */
  this.amount = opt_amount || '';

  /**
   * @type {string}
   * @export
   */
  this.memo = opt_memo || '';

  /**
   * @type {string}
   * @export
   */
  this.timestamp = opt_timestamp || '';

  /**
   * @type {boolean}
   * @export
   */
  this.deleted = false;
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
    message.accountId,
    message.id,
    type,
    amount,
    message.memo,
    message.timestamp
  );
};


/**
 * @return {Object}
 */
bom.account.Transaction.prototype.toMessage = function() {
  return {
    accountId: parseInt(this.accountId, 10),
    id: parseInt(this.id, 10),
    amount: this.type + this.amount,
    memo: this.memo
  };
};
