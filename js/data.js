'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  window.data = {
    massivePhotos: [],
    typeEffect: '',
    onComplete: onComplete
  };

  var templateError = document.querySelector('#error').content;
  var messageError = templateError.querySelector('.error');

  window.xhr.load(URL_GET, 'GET', onComplete, onErrorM, {});

  function onCloseErrorMessage(evt) {
    if (evt.target.matches('.error') ||
        evt.target.matches('.error__button') ||
        evt.keyCode === ESC_KEYCODE) {

      templateError.appendChild(messageError);
      messageError.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
    }
  }

  function onComplete(response) {
    window.data.massivePhotos = response;
    var sectionPictures = document.querySelector('.pictures');
    var templatePicture = document.querySelector('#picture').content.querySelector('a');
    var pictureFragment = document.createDocumentFragment();
    var filterDashboard = document.querySelector('.img-filters');

    window.data.massivePhotos.forEach(function (count) {
      var element = templatePicture.cloneNode(true);
      element.querySelector('.picture__img').src = count.url;
      element.querySelector('.picture__likes').textContent = count.likes;
      element.querySelector('.picture__comments').textContent = count.comments.length;
      pictureFragment.appendChild(element);
    });
    sectionPictures.appendChild(pictureFragment);
    filterDashboard.classList.remove('img-filters--inactive');
  }

  function onErrorM() {
    var main = document.querySelector('main');

    main.appendChild(templateError);

    messageError.addEventListener('click', onCloseErrorMessage);
    document.addEventListener('keydown', onCloseErrorMessage);
  }
})();
