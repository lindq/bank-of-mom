function __init__() {
  var CLIENT_ID = '728318921372-tr2h1kb9ccif270kkbh0cl9ta3u5de88' +
    '.apps.googleusercontent.com';

  var SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

  function handleClientLoad() {
    checkAuth();
  }

  function checkAuth() {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPE,
      immediate: true
    }, handleAuthResult);
  }

  function handleAuthResult(result) {
    var button = document.querySelector('button');
    if (result && !result.error) {
      button.style.display = 'none';
      load();
    } else {
      button.style.display = 'block';
      button.onclick = handleAuthClick;
    }
  }

  function handleAuthClick(event) {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPE,
      immediate: false
    }, handleAuthResult);
  }

  function load() {
    gapi.client.load('bom', 'v1', function() {
      angular.bootstrap(document, ['bom']);
    }, '/_ah/api');
  }

  handleClientLoad();
}
