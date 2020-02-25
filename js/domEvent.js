'use strict';

(function () {
  function onOpenBigPicture(evt) {
    var bigPicture = document.querySelector('.big-picture');
    var closeButton = bigPicture.querySelector('#picture-cancel');
    if (evt.target && evt.target.closest('.picture__img')) {
      window.dom.change.bigPicture(evt);
      closeButton.addEventListener('click', onCloseBigPicture);
      document.addEventListener('keydown', onKeydownCloseBigPicture);
    }
  }

  function onOpenImgChangeForm(evt) {
    var body = document.querySelector('body');
    var uploadForm = document.querySelector('#upload-select-image');
    var imgChangeForm = uploadForm.querySelector('.img-upload__overlay');
    var effectBar = uploadForm.querySelector('.img-upload__effect-level');
    var buttonCloseChangeImg = uploadForm.querySelector('#upload-cancel');
    var hashtags = uploadForm.querySelector('.text__hashtags');
    var effectLevelPin = uploadForm.querySelector('.effect-level__pin');
    // ВРЕМЕННО Функционал загрузки изображения от пользователя ОТКЛЮЧЕН
    // В связи с тестированием данной формы
    // При проверке ВЫПОЛНИТЬ ОБРАТНОЕ КОММЕНТИРОВАНИЕ
    // А так же /main.js - uploadFile.addEventListener('focus', function ())
    evt.preventDefault();
    // var imgUploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
    // var fileList = this.files
    // imgUploadPreview.file = fileList[0];
    // imgUploadPreview.src = window.URL.createObjectURL(fileList[0]);
    // imgUploadPreview.onload = function () {
    //   window.URL.revokeObjectURL(this.src);
    // };
    body.classList.add('modal-open');
    imgChangeForm.classList.remove('hidden');
    effectBar.classList.add('hidden');

    uploadForm.addEventListener('change', onChangeEffects);
    buttonCloseChangeImg.addEventListener('click', onCloseImgChangeForm);
    document.addEventListener('keydown', onKeydownCloseImgChangeForm);
    hashtags.addEventListener('focusout', onInputHashtagsChange);
    effectLevelPin.addEventListener('mousedown', onClickTagleImgChangeForm);
  }

  function onCloseBigPicture() {
    var bigPicture = document.querySelector('.big-picture');
    var closeButton = bigPicture.querySelector('#picture-cancel');

    bigPicture.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onKeydownCloseBigPicture);
  }

  function onCloseImgChangeForm() {
    var body = document.querySelector('body');
    var uploadForm = document.querySelector('#upload-select-image');
    var imgChangeForm = uploadForm.querySelector('.img-upload__overlay');
    var buttonCloseChangeImg = uploadForm.querySelector('#upload-cancel');
    var hashtags = uploadForm.querySelector('.text__hashtags');

    imgChangeForm.classList.add('hidden');
    body.classList.remove('modal-open');

    uploadForm.removeEventListener('change', onChangeEffects);
    buttonCloseChangeImg.removeEventListener('click', onCloseImgChangeForm);
    buttonCloseChangeImg.removeEventListener('keydown', onKeydownCloseImgChangeForm);
    hashtags.removeEventListener('focusout', onInputHashtagsChange);
  }

  function onKeydownCloseImgChangeForm(evt) {
    if (evt.keyCode === 27) {
      onCloseImgChangeForm();
    }
  }

  function onKeydownCloseBigPicture(evt) {
    if (evt.keyCode === 27) {
      onCloseBigPicture();
    }
  }

  function onInputHashtagsChange(evt) {
    window.validation.hashtagInput(evt);
  }

  function onChangeEffects(evt) {
    var uploadForm = document.querySelector('#upload-select-image');
    var mainPic = uploadForm.querySelector('.img-upload__preview').querySelector('img');

    if (evt.target.matches('.effects__radio')) {
      window.dom.change.radioEffectValue(evt);
    }
    if (evt.target.matches('.effect-level__value')) {
      mainPic.style.filter = window.helpFun.setFilterValue(evt.target.value, window.variable.typeEffect);
    }
  }

  function onClickTagleImgChangeForm(evt) {
    window.dom.change.imgEffectValue(evt);
  }

  window.on = {
    open: {
      bigPicture: onOpenBigPicture,
      imgChangeForm: onOpenImgChangeForm
    },
  };
})();
