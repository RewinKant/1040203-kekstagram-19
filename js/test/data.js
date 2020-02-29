'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  window.variable = {
    massivePhotos: [],
    typeEffect: '',
  };

  loadData(URL_GET, onComplete, onErrorM);

  function onComplete(response) {
    // window.variable.massivePhotos = response;
    var sectionPictures = document.querySelector('.pictures');
    var templatePicture = document.querySelector('#picture').content.querySelector('a');
    var pictureFragment = document.createDocumentFragment();

    for (var i = 0; i < response.length; i++) {
      var element = templatePicture.cloneNode(true);
      element.querySelector('.picture__img').src = response[i].url;
      element.querySelector('.picture__likes').textContent = response[i].likes;
      element.querySelector('.picture__comments').textContent = response[i].comments.length;
      pictureFragment.appendChild(element);
    }
    sectionPictures.appendChild(pictureFragment);
  }

  function onErrorM(message) {
    console.error(message);
  }


  function loadData(url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  }

  window.load = loadData;
})();
