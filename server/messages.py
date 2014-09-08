import endpoints
from protorpc import message_types
from protorpc import messages


INT64 = messages.Variant.INT64


class Account(messages.Message):
    id = messages.IntegerField(1, variant=INT64)
    name = messages.StringField(2)
    balance = messages.StringField(3)


class AccountList(messages.Message):
    items = messages.MessageField(Account, 1, repeated=True)


GET_ACCOUNT_REQUEST = endpoints.ResourceContainer(
    message_types.VoidMessage,
    id=messages.IntegerField(1, variant=INT64))


UPDATE_ACCOUNT_REQUEST = endpoints.ResourceContainer(
    Account,
    id=messages.IntegerField(1, variant=INT64))


class Transaction(messages.Message):
    accountId = messages.IntegerField(1, variant=INT64)
    id = messages.IntegerField(2, variant=INT64)
    amount = messages.StringField(3)
    memo = messages.StringField(4)
    timestamp = message_types.DateTimeField(5)


class TransactionList(messages.Message):
    totalItems = messages.IntegerField(1, variant=INT64)
    itemsPerPage = messages.IntegerField(2, variant=INT64)
    nextPageToken = messages.StringField(3)
    items = messages.MessageField(Transaction, 4, repeated=True)


INSERT_TRANSACTION_REQUEST = endpoints.ResourceContainer(
    Transaction,
    accountId=messages.IntegerField(1, variant=INT64))


LIST_TRANSACTION_REQUEST = endpoints.ResourceContainer(
    message_types.VoidMessage,
    accountId=messages.IntegerField(1, variant=INT64),
    nextPageToken=messages.StringField(2))


GET_TRANSACTION_REQUEST = endpoints.ResourceContainer(
    message_types.VoidMessage,
    accountId=messages.IntegerField(1, variant=INT64),
    id=messages.IntegerField(2, variant=INT64))


UPDATE_TRANSACTION_REQUEST = endpoints.ResourceContainer(
    Transaction,
    accountId=messages.IntegerField(1, variant=INT64),
    id=messages.IntegerField(2, variant=INT64))
