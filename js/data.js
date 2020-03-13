'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  window.data = {
    massivePhotos: [],
    typeEffect: '',
    showPic: showDataPic
  };
  window.onPressEsc = function (key) {
    return key === ESC_KEYCODE;
  };

  var templateError = document.querySelector('#error').content;
  var messageError = templateError.querySelector('.error');
  var main = document.querySelector('main');
  var filterDashboard = document.querySelector('.img-filters');
  var sectionPictures = document.querySelector('.pictures');
  var pictureFragment = document.createDocumentFragment();

  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var templatePictureImg = templatePicture.querySelector('.picture__img');
  var templatePictureLike = templatePicture.querySelector('.picture__likes');
  var templatePictureComment = templatePicture.querySelector('.picture__comments');

  function onComplete(response) {
    window.data.massivePhotos = response;
    showDataPic(response);
    filterDashboard.classList.remove('img-filters--inactive');
  }

  function onCloseErrorMessage(evt) {
    if (evt.target.matches('.error') ||
        evt.target.matches('.error__button') ||
        window.onPressEsc(evt.keyCode)) {

      templateError.appendChild(messageError);
      messageError.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
    }
  }

  function showDataPic(data) {
    data.forEach(function (count) {
      templatePictureImg.src = count.url;
      templatePictureLike.textContent = count.likes;
      templatePictureComment.textContent = count.comments.length;
      var element = templatePicture.cloneNode(true);
      pictureFragment.appendChild(element);
    });
    sectionPictures.appendChild(pictureFragment);
  }

  function onErrorMassage() {
    main.appendChild(templateError);
    messageError.addEventListener('click', onCloseErrorMessage);
    document.addEventListener('keydown', onCloseErrorMessage);
  }

  window.xhr.load(URL_GET, 'GET', onComplete, onErrorMassage, {});
})();
