import decimal

from google.appengine.ext import ndb

from messages import AccountMessage
from messages import TransactionMessage


class CurrencyProperty(ndb.StringProperty):
    def _validate(self, value):
        try:
            decimal.Decimal(value)
        except (TypeError, decimal.InvalidOperation):
            raise TypeError('Invalid decimal value: %s' % value)

    def _to_base_type(self, value):
        D = decimal.Decimal
        return str(D(value).quantize(D('.01')))

    def _from_base_type(self, value):
        return decimal.Decimal(value)


class Account(ndb.Model):
    name = ndb.StringProperty()

    @property
    def transactions(self):
        return Transaction.query(ancestor=self.key).fetch()

    @property
    def balance(self):
        return sum(transaction.amount for transaction in self.transactions)

    def to_message(self):
        return AccountMessage(id=self.key.id(),
                              name=self.name,
                              balance=str(self.balance))

    @classmethod
    def put_from_message(cls, message):
        return cls.put_from_message_async(message).get_result()

    @classmethod
    @ndb.tasklet
    def put_from_message_async(cls, message):
        account = cls(id=message.id, name=message.name)
        yield account.put_async()
        raise ndb.Return(account)


class Transaction(ndb.Model):
    amount = CurrencyProperty()
    memo = ndb.StringProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

    def to_message(self):
        return TransactionMessage(id=self.key.id(),
                                  accountId=self.key.parent().id(),
                                  amount=str(self.amount),
                                  memo=self.memo,
                                  timestamp=self.timestamp)

    @classmethod
    def put_from_message(cls, message):
        return cls.put_from_message_async(message).get_result()

    @classmethod
    @ndb.tasklet
    def put_from_message_async(cls, message):
        transaction = cls(parent=ndb.Key(Account, message.accountId),
                          id=message.id,
                          amount=message.amount,
                          memo=message.memo,
                          timestamp=message.timestamp)
        yield transaction.put_async()
        raise ndb.Return(transaction)
