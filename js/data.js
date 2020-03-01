'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  window.variable = {
    massivePhotos: [],
    typeEffect: '',
  };
  var templateError = document.querySelector('#error').content;
  var messageError = templateError.querySelector('.error');

  window.xhr.load(URL_GET, 'GET', function onComplete(response) {
    window.variable.massivePhotos = response;
    var sectionPictures = document.querySelector('.pictures');
    var templatePicture = document.querySelector('#picture').content.querySelector('a');
    var pictureFragment = document.createDocumentFragment();

    for (var i = 0; i < window.variable.massivePhotos.length; i++) {
      var element = templatePicture.cloneNode(true);
      element.querySelector('.picture__img').src = window.variable.massivePhotos[i].url;
      element.querySelector('.picture__likes').textContent = window.variable.massivePhotos[i].likes;
      element.querySelector('.picture__comments').textContent = window.variable.massivePhotos[i].comments.length;
      pictureFragment.appendChild(element);
    }
    sectionPictures.appendChild(pictureFragment);
  }, function onErrorM() {
    var main = document.querySelector('main');

    main.appendChild(templateError);

    messageError.addEventListener('click', onCloseErrorMessage);
    document.addEventListener('keydown', onCloseErrorMessage);
  }, {});

  function onCloseErrorMessage(evt) {
    if (evt.target.matches('.error') ||
        evt.target.matches('.error__button') ||
        evt.keyCode === ESC_KEYCODE) {

      templateError.appendChild(messageError);
      messageError.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
    }
  }

  // function onComplete(response) {
  //   window.variable.massivePhotos = response;
  //   var sectionPictures = document.querySelector('.pictures');
  //   var templatePicture = document.querySelector('#picture').content.querySelector('a');
  //   var pictureFragment = document.createDocumentFragment();
  //
  //   for (var i = 0; i < window.variable.massivePhotos.length; i++) {
  //     var element = templatePicture.cloneNode(true);
  //     element.querySelector('.picture__img').src = window.variable.massivePhotos[i].url;
  //     element.querySelector('.picture__likes').textContent = window.variable.massivePhotos[i].likes;
  //     element.querySelector('.picture__comments').textContent = window.variable.massivePhotos[i].comments.length;
  //     pictureFragment.appendChild(element);
  //   }
  //   sectionPictures.appendChild(pictureFragment);
  // }
  //
  // function onErrorM() {
  //   var main = document.querySelector('main');
  //
  //   main.appendChild(templateError);
  //
  //   messageError.addEventListener('click', onCloseErrorMessage);
  //   document.addEventListener('keydown', onCloseErrorMessage);
  // }
})();
