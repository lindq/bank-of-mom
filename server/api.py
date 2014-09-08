"""Google Cloud Endpoints definition for Bank of Mom API."""

import functools

import endpoints
from google.appengine.api import namespace_manager
from protorpc import remote

from google.appengine.datastore import datastore_query
from google.appengine.ext import ndb

import messages
import models


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
        request_message=messages.Account,
        response_message=messages.Account,
        path='accounts',
        http_method='POST')
    @require_user
    def insert(self, request):
        request.id = None
        account = models.Account.put_from_message(request)
        return account.to_message()

    @endpoints.method(
        response_message=messages.AccountList,
        path='accounts',
        http_method='GET')
    @require_user
    def list(self, request):
        accounts = models.Account.query().order(models.Account.name)
        message = messages.AccountList(
            items=[account.to_message() for account in accounts])
        return message

    @endpoints.method(
        request_message=messages.GET_ACCOUNT_REQUEST,
        response_message=messages.Account,
        path='accounts/{id}',
        http_method='GET')
    @require_user
    def get(self, request):
        account = models.Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException
        return account.to_message()

    @endpoints.method(
        request_message=messages.UPDATE_ACCOUNT_REQUEST,
        response_message=messages.Account,
        path='accounts/{id}',
        http_method='PUT')
    @require_user
    def update(self, request):
        account = models.Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException
        account = models.Account.put_from_message(request)
        return account.to_message()

    @endpoints.method(
        request_message=messages.UPDATE_ACCOUNT_REQUEST,
        response_message=messages.Account,
        path='accounts/{id}',
        http_method='PATCH')
    @require_user
    def patch(self, request):
        account = models.Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException
        account = models.Account.put_from_message(request)
        return account.to_message()

    @endpoints.method(
        request_message=messages.GET_ACCOUNT_REQUEST,
        path='accounts/{id}',
        http_method='DELETE')
    @require_user
    def remove(self, request):
        account = models.Account.get_by_id(request.id)
        if not account:
            raise endpoints.NotFoundException

        transactions_futures = ndb.delete_multi_async(
            [transaction.key for transaction in account.transactions])
        account_future = account.key.delete_async()

        for future in transactions_futures:
            future.get_result()
        account_future.get_result()

        return messages.message_types.VoidMessage()


@bom_api.api_class(resource_name='transactions')
class Transactions(remote.Service):

    MAX_ITEMS = 3

    @endpoints.method(
        request_message=messages.INSERT_TRANSACTION_REQUEST,
        response_message=messages.Transaction,
        path='accounts/{accountId}/transactions',
        http_method='POST')
    @require_user
    def insert(self, request):
        request.id = None
        transaction = models.Transaction.put_from_message(request)
        return transaction.to_message()

    @endpoints.method(
        request_message=messages.LIST_TRANSACTION_REQUEST,
        response_message=messages.TransactionList,
        path='accounts/{accountId}/transactions',
        http_method='GET')
    @require_user
    def list(self, request):
        key = ndb.Key(models.Account, request.accountId)
        query = models.Transaction.query(ancestor=key).order(
            -models.Transaction.timestamp)
        fetch_page_future = query.fetch_page_async(
            self.MAX_ITEMS,
            start_cursor=datastore_query.Cursor(urlsafe=request.nextPageToken))
        count_future = query.count_async()
        transactions, cursor, more = fetch_page_future.get_result()
        total_items = count_future.get_result()
        message = messages.TransactionList(
            totalItems=total_items,
            itemsPerPage=self.MAX_ITEMS,
            items=[transaction.to_message() for transaction in transactions])
        if more:
            message.nextPageToken = cursor.urlsafe()
        return message

    @endpoints.method(
        request_message=messages.GET_TRANSACTION_REQUEST,
        response_message=messages.Transaction,
        path='accounts/{accountId}/transactions/{id}',
        http_method='GET')
    @require_user
    def get(self, request):
        key = ndb.Key(models.Account, request.accountId,
                      model.Transaction, request.id)
        transaction = key.get()
        if not transaction:
            raise endpoints.NotFoundException
        return transaction.to_message()

    @endpoints.method(
        request_message=messages.UPDATE_TRANSACTION_REQUEST,
        response_message=messages.Transaction,
        path='accounts/{accountId}/transactions/{id}',
        http_method='PUT')
    @require_user
    def update(self, request):
        key = ndb.Key(models.Account, request.accountId,
                      models.Transaction, request.id)
        transaction = key.get()
        if not transaction:
            raise endpoints.NotFoundException
        transaction = models.Transaction.put_from_message(request)
        return transaction.to_message()

    @endpoints.method(
        request_message=messages.GET_TRANSACTION_REQUEST,
        path='accounts/{accountId}/transactions/{id}',
        http_method='DELETE')
    @require_user
    def remove(self, request):
        key = ndb.Key(models.Account, request.accountId,
                      models.Transaction, request.id)
        transaction = key.get()
        if not transaction:
            raise endpoints.NotFoundException
        transaction.key.delete()
        return messages.message_types.VoidMessage()


application = endpoints.api_server([bom_api])
