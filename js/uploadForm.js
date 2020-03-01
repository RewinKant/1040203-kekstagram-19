'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEF_MAX_VALUE = 100;
  var DEF_MIN_VALUE = 25;
  var DEF_STEP = 25;
  var DEFAULT_EFFECT_VALUE = 100;
  var DEFAULT_STYLE_FILTER = '';
  var HACHTAGS_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var COMENT_MAX_LENGTH = 120;
  var URL = 'https://js.dump.academy/kekstagram';

  var uploadForm = document.querySelector('#upload-select-image');
  var imgUploadForm = uploadForm.querySelector('.img-upload__overlay');
  var buttonCloseUploadForm = uploadForm.querySelector('#upload-cancel');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var mainPic = uploadForm.querySelector('.img-upload__preview').querySelector('img');
  var effectLevelPin = uploadForm.querySelector('.effect-level__pin');
  var templateSeccess = document.querySelector('#success').content;
  var messageSuccess = templateSeccess.querySelector('.success');
  var templateError = document.querySelector('#error').content;
  var messageError = templateError.querySelector('.error');


  uploadFile.addEventListener('focus', function () {
    uploadFile.value = '';
    uploadFile.addEventListener('change', onOpenImgUploadForm);
  });

  // function onErrorM() {
  //   uploadForm.appendChild(templateError);
  //
  //   imgUploadForm.classList.add('hidden');
  //   messageError.addEventListener('click', onCloseErrorMessage);
  //   document.addEventListener('keydown', onCloseErrorMessage);
  // }

  // function onComplete() {
  //   uploadForm.appendChild(templateSeccess);
  //   onCloseImgUploadForm();
  //   uploadForm.reset();
  //
  //   messageSuccess.addEventListener('click', onCloseCompleteMessage);
  //   document.addEventListener('keydown', onCloseCompleteMessage);
  // }

  function onSubmitUploadForm(evt) {
    evt.preventDefault();
    window.xhr.load(URL, 'POST', function onComplete() {
      uploadForm.appendChild(templateSeccess);
      onCloseImgUploadForm();
      uploadForm.reset();

      messageSuccess.addEventListener('click', onCloseCompleteMessage);
      document.addEventListener('keydown', onCloseCompleteMessage);
    }, function onErrorM() {
      uploadForm.appendChild(templateError);

      imgUploadForm.classList.add('hidden');
      messageError.addEventListener('click', onCloseErrorMessage);
      document.addEventListener('keydown', onCloseErrorMessage);
    }, new FormData(uploadForm));
  }

  function onCloseCompleteMessage(evt) {
    if (evt.target.matches('.success') || //
        evt.target.matches('.success__button') || //
        evt.keyCode === ESC_KEYCODE) {
      templateSeccess.appendChild(messageSuccess);
      messageSuccess.removeEventListener('click', onCloseCompleteMessage);
      document.removeEventListener('keydown', onCloseCompleteMessage);
    }
  }

  function onCloseErrorMessage(evt) {
    if (evt.target.matches('.error') || //
        evt.target.matches('.error__button') || //
        evt.keyCode === ESC_KEYCODE) {
      imgUploadForm.classList.remove('hidden');
      templateError.appendChild(messageError);
      messageError.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
    }
  }

  function changeRadioEffectFilterValue(evt) {
    var effectBar = uploadForm.querySelector('.img-upload__effect-level');
    var effectValue = effectBar.querySelector('.effect-level__value');
    var currentFilter = mainPic.getAttribute('class');

    if (evt.target.value === 'none' && mainPic.classList.length > 0) {
      window.variable.typeEffect = evt.target.value;
      if (currentFilter) {
        mainPic.classList.remove(currentFilter);
      }
      mainPic.style.filter = DEFAULT_STYLE_FILTER;
      effectBar.classList.add('hidden');
    } else {
      window.variable.typeEffect = evt.target.value;
      if (currentFilter) {
        mainPic.classList.remove(currentFilter);
      }
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
      mainPic.classList.add('effects__preview--' + evt.target.value);
      mainPic.style.filter = setFilterValue(DEFAULT_EFFECT_VALUE, evt.target.value);
      effectValue.value = DEFAULT_EFFECT_VALUE;
    }
  }

  function onClickTagleImgUploadForm(tagleEvt) {
    tagleEvt.preventDefault();
    var effectLevelLine = uploadForm.querySelector('.effect-level__line');
    var effectLevelDepth = uploadForm.querySelector('.effect-level__depth');
    var effectValue = uploadForm.querySelector('.effect-level__value');

    var startX = tagleEvt.clientX;
    var pinMaxValue = effectLevelLine.offsetWidth;
    var pinMinValue = 0;

    function tagleMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;
      if ((effectLevelPin.offsetLeft - shiftX) < pinMaxValue && (effectLevelPin.offsetLeft - shiftX) > pinMinValue) {
        effectLevelPin.style.left = ((effectLevelPin.offsetLeft - shiftX) * 100) / pinMaxValue + '%';
        effectLevelDepth.style.width = effectLevelDepth.offsetWidth - shiftX + 'px';
        effectValue.value = Math.floor(((effectLevelPin.offsetLeft - shiftX) * 100) / pinMaxValue);
        mainPic.style.filter = setFilterValue(effectValue.value, window.variable.typeEffect);
      }
    }
    function tagleUp() {
      document.removeEventListener('mousemove', tagleMove);
      document.removeEventListener('mouseup', tagleUp);
    }

    document.addEventListener('mousemove', tagleMove);
    document.addEventListener('mouseup', tagleUp);
  }

  function onInputHashtagsChange(evt) {
    var value = evt.target.value;
    var userHashtags = value.split(/\s+/gi);
    var regExpValid = /^#[a-zА-я0-9]{1,19}$/;
    var exit = [];
    var errorDef = '';
    if (userHashtags[0] !== '') {
      if (userHashtags.length > HACHTAGS_MAX_COUNT) {
        exit.push('Введите не более 5 хештегов');
      }
      for (var i = 0; i < userHashtags.length; i++) {
        for (var j = i + 1; j < userHashtags.length - 1; j++) {
          if (userHashtags[i] === userHashtags[j]) {
            exit.push((i + 1) + '-й и ' + (j + 1) + '-й хэштеги одинаковы');
          }
        }
        if (!regExpValid.test(userHashtags[i])) {
          if (userHashtags[i].length > HASHTAG_MAX_LENGTH) {
            exit.push((i + 1) + '-й хэштег длиннее 20 символов');
          } else if (userHashtags[i].length < 2) {
            exit.push((i + 1) + '-й хэштег слишком короткий');
          } else {
            exit.push('У ' + (i + 1) + '-го хэштега неверный формат');
          }
        }
      }
    }
    for (var u = 0; u < exit.length; u++) {
      errorDef += exit[u] + ', ';
    }

    evt.target.setCustomValidity(errorDef);
    evt.target.reportValidity();
  }

  function onInputComentChange(evt) {
    var userCommit = evt.target;

    if (userCommit.value.length > COMENT_MAX_LENGTH) {
      userCommit.setCustomValidity('Комментарий должен быть короче 120 символов');
      userCommit.reportValidity();
    }
  }

  function onOpenImgUploadForm(evt) {
    var body = document.querySelector('body');

    var effectBar = uploadForm.querySelector('.img-upload__effect-level');
    var hashtags = uploadForm.querySelector('.text__hashtags');
    var coment = uploadForm.querySelector('.text__description');
    var buttonClickUpScale = uploadForm.querySelector('.scale__control--bigger');
    var buttonClickDownScale = uploadForm.querySelector('.scale__control--smaller');
    var imgUploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
    var fileList = evt.target.files;

    evt.preventDefault();
    imgUploadPreview.file = fileList[0];
    imgUploadPreview.src = window.URL.createObjectURL(fileList[0]);
    imgUploadPreview.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };
    body.classList.add('modal-open');
    imgUploadForm.classList.remove('hidden');
    effectBar.classList.add('hidden');

    uploadForm.addEventListener('change', onChangeEffects);
    buttonCloseUploadForm.addEventListener('click', onCloseImgUploadForm);
    document.addEventListener('keydown', onKeydownCloseImgUploadForm);
    hashtags.addEventListener('focusout', onInputHashtagsChange);
    coment.addEventListener('focusout', onInputComentChange);
    effectLevelPin.addEventListener('mousedown', onClickTagleImgUploadForm);
    buttonClickUpScale.addEventListener('click', onUpScale);
    buttonClickDownScale.addEventListener('click', onDownScale);
    uploadForm.addEventListener('submit', onSubmitUploadForm);
  }

  function onCloseImgUploadForm() {
    var body = document.querySelector('body');
    var hashtags = uploadForm.querySelector('.text__hashtags');
    var buttonClickUpScale = uploadForm.querySelector('.scale__control--bigger');
    var buttonClickDownScale = uploadForm.querySelector('.scale__control--smaller');

    imgUploadForm.classList.add('hidden');
    body.classList.remove('modal-open');

    uploadForm.removeEventListener('change', onChangeEffects);
    buttonCloseUploadForm.removeEventListener('click', onCloseImgUploadForm);
    document.removeEventListener('keydown', onKeydownCloseImgUploadForm);
    hashtags.removeEventListener('focusout', onInputHashtagsChange);
    effectLevelPin.removeEventListener('mousedown', onClickTagleImgUploadForm);
    buttonClickUpScale.removeEventListener('click', onUpScale);
    buttonClickDownScale.removeEventListener('click', onDownScale);
    uploadForm.removeEventListener('submit', onSubmitUploadForm);
  }

  function onKeydownCloseImgUploadForm(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseImgUploadForm();
    }
  }

  function onChangeEffects(evt) {
    if (evt.target.matches('.effects__radio')) {
      changeRadioEffectFilterValue(evt);
    }
    if (evt.target.matches('.effect-level__value')) {
      mainPic.style.filter = setFilterValue(evt.target.value, window.variable.typeEffect);
    }
  }

  function onUpScale() {
    var scaleInput = uploadForm.querySelector('.scale__control--value');
    var scaleValue = parseInt(scaleInput.value.match(/[0-9]+/)[0], 10);

    if (scaleValue !== DEF_MAX_VALUE) {
      scaleValue += DEF_STEP;
      scaleInput.value = scaleValue + '%';
      mainPic.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  }

  function onDownScale() {
    var scaleInput = uploadForm.querySelector('.scale__control--value');
    var scaleValue = parseInt(scaleInput.value.match(/[0-9]+/)[0], 10);

    if (scaleValue !== DEF_MIN_VALUE) {
      scaleValue -= DEF_STEP;
      scaleInput.value = scaleValue + '%';
      mainPic.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  }

  function setFilterValue(value, type) {
    var FILTER_SETTINGS = {
      chrome: {css: 'grayscale', min: 0, max: 1, unit: ''},
      sepia: {css: 'sepia', min: 0, max: 1, unit: ''},
      marvin: {css: 'invert', min: 0, max: 100, unit: '%'},
      phobos: {css: 'blur', min: 0, max: 3, unit: 'px'},
      heat: {css: 'brightness', min: 1, max: 3, unit: ''}
    };
    var strEffect = '';
    var defaultValue = (((value * (FILTER_SETTINGS[type].max - FILTER_SETTINGS[type].min)) / 100) + FILTER_SETTINGS[type].min);
    strEffect = FILTER_SETTINGS[type].css + '(' + defaultValue + FILTER_SETTINGS[type].unit + ')';

    return strEffect;
  }
})();
