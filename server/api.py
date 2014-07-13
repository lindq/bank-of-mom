"""Google Cloud Endpoints definition for Bank of Mom API."""

import functools

import endpoints
from google.appengine.api import namespace_manager
from protorpc import message_types, messages, remote

from google.appengine.datastore.datastore_query import Cursor
from google.appengine.ext import ndb

from messages import AccountMessage, AccountListMessage
from messages import TransactionMessage, TransactionListMessage
from models import Account, Transaction


CLIENT_IDS = [
    '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88.apps.googleusercontent.com',
    endpoints.API_EXPLORER_CLIENT_ID
    ]


def require_user(endpoints_method):
    """Method decorator enforcing authenticated user to enable multitenancy."""

    @functools.wraps(endpoints_method)
    def wrapped(*args, **kw):
        user = endpoints.get_current_user()
        if user is None:
            raise endpoints.UnauthorizedException('Invalid token.')
        namespace_manager.set_namespace(user.user_id())
        return endpoints_method(*args, **kw)

    return wrapped


bom_api = endpoints.api(allowed_client_ids=CLIENT_IDS,
                        description='Bank of Mom API',
                        name='bom',
                        version='v1')


@bom_api.api_class(resource_name='accounts')
class Accounts(remote.Service):

    @endpoints.method(
        request_message=AccountMessage,
        response_message=AccountMessage,
        path='accounts',
        http_method='POST')
    @require_user
    def insert(self, request):
        request.id = None
        account = Account.put_from_message(request)
        return account.to_message()

    @endpoints.method(
        request_message=message_types.VoidMessage,
        response_message=AccountListMessage,
        path='accounts',
        http_method='GET')
    @require_user
    def list(self, request):
        accounts = Account.query().order(Account.name)
        message = AccountListMessage(
            items=[account.to_message() for account in accounts])
        return message

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            message_types.VoidMessage,
            id=messages.IntegerField(1, variant=messages.Variant.INT64)),
        response_message=AccountMessage,
        path='accounts/{id}',
        http_method='GET')
    @require_user
    def get(self, request):
        account = Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException
        return account.to_message()

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            message_types.VoidMessage,
            id=messages.IntegerField(1, variant=messages.Variant.INT64)),
        response_message=message_types.VoidMessage,
        path='accounts/{id}',
        http_method='DELETE')
    @require_user
    def remove(self, request):
        account = Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException

        transactions_futures = ndb.delete_multi_async(
            [transaction.key for transaction in account.transactions])
        account_future = account.key.delete_async()

        for future in transactions_futures:
            future.get_result()
        account_future.get_result()

        return message_types.VoidMessage()


@bom_api.api_class(resource_name='transactions')
class Transactions(remote.Service):

    MAX_ITEMS = 3

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            TransactionMessage,
            accountId=messages.IntegerField(1, variant=messages.Variant.INT64)),
        response_message=TransactionMessage,
        path='accounts/{accountId}/transactions',
        http_method='POST')
    @require_user
    def insert(self, request):
        request.id = None
        transaction = Transaction.put_from_message(request)
        return transaction.to_message()

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            message_types.VoidMessage,
            accountId=messages.IntegerField(1, variant=messages.Variant.INT64),
            nextPageToken=messages.StringField(2)),
        response_message=TransactionListMessage,
        path='accounts/{accountId}/transactions',
        http_method='GET')
    @require_user
    def list(self, request):
        key = ndb.Key(Account, request.accountId)
        query = Transaction.query(ancestor=key).order(-Transaction.timestamp)
        fetch_page_future = query.fetch_page_async(
            self.MAX_ITEMS, start_cursor=Cursor(urlsafe=request.nextPageToken))
        count_future = query.count_async()
        transactions, cursor, more = fetch_page_future.get_result()
        total_items = count_future.get_result()
        message = TransactionListMessage(
            totalItems=total_items,
            itemsPerPage=self.MAX_ITEMS,
            items=[transaction.to_message() for transaction in transactions])
        if more:
            message.nextPageToken = cursor.urlsafe()
        return message

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            message_types.VoidMessage,
            accountId=messages.IntegerField(1, variant=messages.Variant.INT64),
            id=messages.IntegerField(2, variant=messages.Variant.INT64)),
        response_message=TransactionMessage,
        path='accounts/{accountId}/transactions/{id}',
        http_method='GET')
    @require_user
    def get(self, request):
        key = ndb.Key(Account, request.accountId, Transaction, request.id)
        transaction = key.get()
        if not transaction:
            raise endpoints.NotFoundException
        return transaction.to_message()

    @endpoints.method(
        request_message=endpoints.ResourceContainer(
            message_types.VoidMessage,
            accountId=messages.IntegerField(1, variant=messages.Variant.INT64),
            id=messages.IntegerField(2, variant=messages.Variant.INT64)),
        response_message=message_types.VoidMessage,
        path='accounts/{accountId}/transactions/{id}',
        http_method='DELETE')
    @require_user
    def remove(self, request):
        key = ndb.Key(Account, request.accountId, Transaction, request.id)
        transaction = key.get()
        if not transaction:
            raise endpoints.NotFoundException
        transaction.key.delete()
        return message_types.VoidMessage()


application = endpoints.api_server([bom_api])
