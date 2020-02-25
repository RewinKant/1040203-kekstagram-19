'use strict';

(function () {
  var sectionPictures = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var uploadForm = document.querySelector('#upload-select-image');
  var pictureFragment = document.createDocumentFragment();
  for (var i = 0; i < window.variable.massivePhotos.length; i++) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').src = window.variable.massivePhotos[i].url;
    element.querySelector('.picture__likes').textContent = window.variable.massivePhotos[i].likes;
    element.querySelector('.picture__comments').textContent = window.variable.massivePhotos[i].comments.length;
    pictureFragment.appendChild(element);
  }
  sectionPictures.appendChild(pictureFragment);

  sectionPictures.addEventListener('click', window.on.open.bigPicture);

  // ВРЕМЕННО Функционал загрузки изображения от пользователя ОТКЛЮЧЕН
  // В связи с тестированием данной формы
  // При проверке ВЫПОЛНИТЬ ОБРАТНОЕ КОММЕНТИРОВАНИЕ
  // А так же window.on.open.imgChangeForm
  var buttonShowChangeImg = uploadForm.querySelector('.img-upload__control');
  buttonShowChangeImg.addEventListener('click', window.on.open.imgChangeForm);
  // var uploadFile = uploadForm.querySelector('#upload-file');
  // uploadFile.addEventListener('focus', function () {
  //   uploadFile.value = '';
  //   uploadFile.addEventListener('change', window.on.open.imgChangeForm);
  // });
})();
