import endpoints
from protorpc import message_types
from protorpc import messages


class AccountMessage(messages.Message):
    id = messages.IntegerField(2, variant=messages.Variant.INT32)
    name = messages.StringField(3, required=True)
    balance = messages.StringField(4)


class AccountListMessage(messages.Message):
    items = messages.MessageField(AccountMessage, 2, repeated=True)


class TransactionMessage(messages.Message):
    accountId = messages.IntegerField(1, variant=messages.Variant.INT32)
    id = messages.IntegerField(2, variant=messages.Variant.INT32)
    amount = messages.StringField(3)
    memo = messages.StringField(4)
    timestamp = message_types.DateTimeField(5)


class TransactionListMessage(messages.Message):
    totalItems = messages.IntegerField(1, variant=messages.Variant.INT32)
    itemsPerPage = messages.IntegerField(2, variant=messages.Variant.INT32)
    nextPageToken = messages.StringField(3)
    items = messages.MessageField(TransactionMessage, 4, repeated=True)
