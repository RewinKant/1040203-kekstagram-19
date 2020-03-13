'use strict';
(function () {
  // var ESC_KEYCODE = 27;
  var Default = {
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    STEP: 25,
    EFFECT_VALUE: 100,
    STYLE_FILTER: ''
  };
  var Hashtag = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20,
    REG_EXP: /^#[a-zА-я0-9]{1,19}$/
  };
  var FILTER_SETTINGS = {
    chrome: {css: 'grayscale', min: 0, max: 1, unit: ''},
    sepia: {css: 'sepia', min: 0, max: 1, unit: ''},
    marvin: {css: 'invert', min: 0, max: 100, unit: '%'},
    phobos: {css: 'blur', min: 0, max: 3, unit: 'px'},
    heat: {css: 'brightness', min: 1, max: 3, unit: ''}
  };
  var COMENT_MAX_LENGTH = 120;
  var URL = 'https://js.dump.academy/kekstagram';

  var body = document.querySelector('body');
  var uploadForm = document.querySelector('#upload-select-image');
  var imgUploadForm = uploadForm.querySelector('.img-upload__overlay');
  var buttonCloseUploadForm = uploadForm.querySelector('#upload-cancel');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var mainPic = uploadForm.querySelector('.img-upload__preview img');

  var effectBar = uploadForm.querySelector('.img-upload__effect-level');
  var effectValue = effectBar.querySelector('.effect-level__value');

  var buttonClickUpScale = uploadForm.querySelector('.scale__control--bigger');
  var buttonClickDownScale = uploadForm.querySelector('.scale__control--smaller');
  var previewImgEffect = uploadForm.querySelectorAll('.effects__preview');
  var scaleInput = uploadForm.querySelector('.scale__control--value');

  var effectLevelLine = uploadForm.querySelector('.effect-level__line');
  var effectLevelPin = uploadForm.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadForm.querySelector('.effect-level__depth');
  var templateSeccess = document.querySelector('#success').content;
  var messageSuccess = templateSeccess.querySelector('.success');
  var templateError = document.querySelector('#error').content;
  var messageError = templateError.querySelector('.error');
  var hashtags = uploadForm.querySelector('.text__hashtags');
  var coment = uploadForm.querySelector('.text__description');


  uploadFile.addEventListener('focus', function () {
    uploadFile.value = '';
    uploadFile.addEventListener('change', onOpenImgUploadForm);
  });

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
    if (evt.target.closest('.success') ||
        evt.target.closest('.success__button') ||
        window.onPressEsc(evt.keyCode)) {
      templateSeccess.appendChild(messageSuccess);
      messageSuccess.removeEventListener('click', onCloseCompleteMessage);
      document.removeEventListener('keydown', onCloseCompleteMessage);
    }
  }

  function onCloseErrorMessage(evt) {
    if (evt.target.closest('.error') ||
        evt.target.closest('.error__button') ||
        window.onPressEsc(evt.keyCode)) {
      imgUploadForm.classList.remove('hidden');
      templateError.appendChild(messageError);
      messageError.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
    }
  }

  function changeRadioEffectFilterValue(evt) {
    var value = evt.target.value;
    var currentFilter = mainPic.getAttribute('class');

    window.data.typeEffect = value;
    if (currentFilter) {
      mainPic.classList.remove(currentFilter);
    }
    if (value === 'none') {
      mainPic.style.filter = Default.STYLE_FILTER;
      effectBar.classList.add('hidden');
    } else {
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
      mainPic.classList.add('effects__preview--' + value);
      mainPic.style.filter = setFilterValue(Default.EFFECT_VALUE, value);
      effectValue.value = Default.EFFECT_VALUE;
    }
    effectLevelPin.style.left = Default.EFFECT_VALUE + '%';
    effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
  }

  function onClickToggleImgUploadForm(toggleEvt) {
    toggleEvt.preventDefault();

    var startX = toggleEvt.clientX;
    var pinMaxValue = effectLevelLine.offsetWidth;
    var pinMinValue = 0;

    function toggleMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;
      if ((effectLevelPin.offsetLeft - shiftX) < pinMaxValue && (effectLevelPin.offsetLeft - shiftX) > pinMinValue) {
        effectLevelPin.style.left = ((effectLevelPin.offsetLeft - shiftX) * 100) / pinMaxValue + '%';
        effectLevelDepth.style.width = effectLevelDepth.offsetWidth - shiftX + 'px';
        effectValue.value = Math.floor(((effectLevelPin.offsetLeft - shiftX) * 100) / pinMaxValue);
        mainPic.style.filter = setFilterValue(effectValue.value, window.data.typeEffect);
      }
    }
    function toggleUp() {
      document.removeEventListener('mousemove', toggleMove);
      document.removeEventListener('mouseup', toggleUp);
    }

    document.addEventListener('mousemove', toggleMove);
    document.addEventListener('mouseup', toggleUp);
  }

  function onInputHashtagsChange(evt) {
    var value = evt.target.value;
    var userHashtag = value.toLowerCase().split(/\s+/g);
    var defaultError = '';

    if (userHashtag[0] !== '') {
      if (userHashtag.length > Hashtag.MAX_COUNT) {
        defaultError += 'Введите не более 5 хештегов. ';
      }
      defaultError = userHashtag.reduce(function (acumulator, item, i, array) {
        for (var j = i + 1; j < array.length; j++) {
          if (item === array[j]) {
            acumulator += (i + 1) + '-й и ' + (j + 1) + '-й хэштеги одинаковы. ';
          }
        }
        if (!Hashtag.REG_EXP.test(item)) {
          if (item.length > Hashtag.MAX_LENGTH) {
            acumulator += (i + 1) + '-й хэштег длиннее 20 символов. ';
          } else if (userHashtag[i].length < 2) {
            acumulator += (i + 1) + '-й хэштег слишком короткий. ';
          } else {
            acumulator += 'У ' + (i + 1) + '-го хэштега неверный формат. ';
          }
        }
        return acumulator;
      }, defaultError);
    }
    evt.target.setCustomValidity(defaultError);
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
    var fileList = evt.target.files;

    evt.preventDefault();
    mainPic.file = fileList[0];
    mainPic.src = window.URL.createObjectURL(fileList[0]);
    previewImgEffect.forEach(function (item) {
      item.style.backgroundImage = 'url(' + window.URL.createObjectURL(fileList[0]) + ')';
    });
    mainPic.onload = function () {
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
    effectLevelPin.addEventListener('mousedown', onClickToggleImgUploadForm);
    buttonClickUpScale.addEventListener('click', onUpScale);
    buttonClickDownScale.addEventListener('click', onDownScale);
    uploadForm.addEventListener('submit', onSubmitUploadForm);
  }

  function onCloseImgUploadForm() {
    var currentFilter = mainPic.getAttribute('class');

    imgUploadForm.classList.add('hidden');
    body.classList.remove('modal-open');
    hashtags.setCustomValidity('');
    coment.setCustomValidity('');
    mainPic.style.filter = Default.STYLE_FILTER;
    if (currentFilter) {
      mainPic.classList.remove(currentFilter);
    }

    uploadForm.removeEventListener('change', onChangeEffects);
    buttonCloseUploadForm.removeEventListener('click', onCloseImgUploadForm);
    document.removeEventListener('keydown', onKeydownCloseImgUploadForm);
    hashtags.removeEventListener('focusout', onInputHashtagsChange);
    effectLevelPin.removeEventListener('mousedown', onClickToggleImgUploadForm);
    buttonClickUpScale.removeEventListener('click', onUpScale);
    buttonClickDownScale.removeEventListener('click', onDownScale);
    uploadForm.removeEventListener('submit', onSubmitUploadForm);
  }

  function onKeydownCloseImgUploadForm(evt) {
    if (window.onPressEsc(evt.keyCode) &&
      !(evt.target.closest('.text__hashtags') || evt.target.closest('.text__description'))) {
      onCloseImgUploadForm();
    }
  }

  function onChangeEffects(evt) {
    if (evt.target.closest('.effects__radio')) {
      changeRadioEffectFilterValue(evt);
    }
    if (evt.target.closest('.effect-level__value')) {
      mainPic.style.filter = setFilterValue(evt.target.value, window.data.typeEffect);
    }
  }

  function onUpScale() {
    var scaleValue = parseInt(scaleInput.value.match(/[0-9]+/)[0], 10);

    if (scaleValue !== Default.MAX_VALUE) {
      scaleValue += Default.STEP;
      scaleInput.value = scaleValue + '%';
      mainPic.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  }

  function onDownScale() {
    var scaleValue = parseInt(scaleInput.value.match(/[0-9]+/)[0], 10);

    if (scaleValue !== Default.MIN_VALUE) {
      scaleValue -= Default.STEP;
      scaleInput.value = scaleValue + '%';
      mainPic.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  }

  function setFilterValue(value, type) {
    var strEffect = '';
    var filterType = FILTER_SETTINGS[type];
    var defaultValue = (((value * (filterType.max - filterType.min)) / 100) + filterType.min);
    strEffect = filterType.css + '(' + defaultValue + filterType.unit + ')';

    return strEffect;
  }
})();
