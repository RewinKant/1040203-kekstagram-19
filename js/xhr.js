'use strict';

(function () {
  var SERVER_STATUS_OK = 200;
  var SERVER_TIMEOUT = 0;

  function loadData(URL, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open(method, URL);
    xhr.send(data);
  }

  window.xhr = {
    load: loadData
  };
})();
