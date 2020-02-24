'use strict';

var FILTER_SETTINGS = {
  default: {
    css: '',
    value: 100
  },
  chrome: {
    css: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  },
  sepia: {
    css: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  },
  marvin: {
    css: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  },
  phobos: {
    css: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  },
  heat: {
    css: 'brightness',
    min: 1,
    max: 3,
    unit: ''
  }
};

var body = document.querySelector('body');
var sectionPictures = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('a');
var massivePhotos = window.dom.create.photo();

var bigPicture = document.querySelector('.big-picture');
var closeButton = bigPicture.querySelector('#picture-cancel');
var commentsListPicture = bigPicture.querySelector('.social__comments');

var uploadForm = document.querySelector('#upload-select-image');
// var inputUploadFile = uploadForm.querySelector('#upload-file');
var buttonShowChangeImg = uploadForm.querySelector('.img-upload__control');
var imgChangeForm = uploadForm.querySelector('.img-upload__overlay');
var buttonCloseChangeImg = uploadForm.querySelector('#upload-cancel');
var mainPic = uploadForm.querySelector('.img-upload__preview').querySelector('img');

var effectBar = uploadForm.querySelector('.img-upload__effect-level');
var effectValue = effectBar.querySelector('.effect-level__value');
// var effectLevelPin = effectBar.querySelector('.effect-level__pin');
var typeEffect;

var hashtags = uploadForm.querySelector('.text__hashtags');


var pictureFragment = document.createDocumentFragment();

function onOpenBigPicture(evt) {
  if (evt.target && evt.target.closest('.picture__img')) {
    evt.preventDefault();
    for (var i = 0; i < massivePhotos.length; i++) {
      if (massivePhotos[i].url === evt.target.attributes.src.value) {
        while (commentsListPicture.firstChild) {
          commentsListPicture.removeChild(commentsListPicture.firstChild);
        }
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = massivePhotos[i].url;
        bigPicture.querySelector('.likes-count').textContent = massivePhotos[i].likes;
        bigPicture.querySelector('.comments-count').textContent = massivePhotos[i].comments.length;
        bigPicture.querySelector('.social__caption').textContent = massivePhotos[i].description;
        commentsListPicture.appendChild(window.dom.include.comments(massivePhotos[i].comments));
      }
    }
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.addEventListener('click', onCloseBigPicture);
    evt.stopPropagation();
  }
}

function onCloseBigPicture() {
  bigPicture.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseBigPicture);
}

function onInputHashtagsChange(evt) {
  window.validation.hashtagInput(evt);
}

function onOpenImgChangeForm(evt) {
  evt.preventDefault(); // ВРЕМЕННО Функционал загрузки изображения от пользователя
  body.classList.add('modal-open');
  imgChangeForm.classList.remove('hidden');
  effectBar.classList.add('hidden');

  uploadForm.addEventListener('change', onChangeEffects);
  buttonCloseChangeImg.addEventListener('click', onCloseImgChangeForm);
  document.addEventListener('keydown', onKeydownCloseImgChangeForm);
  hashtags.addEventListener('focusout', onInputHashtagsChange);

  // effectLevelPin.addEventListener('mouseup', );
}

function onCloseImgChangeForm() {
  imgChangeForm.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.removeEventListener('change', onChangeEffects);
  buttonCloseChangeImg.removeEventListener('click', onCloseImgChangeForm);
  buttonCloseChangeImg.removeEventListener('keydown', onKeydownCloseImgChangeForm);
  hashtags.removeEventListener('focusout', onInputHashtagsChange);
}

function onKeydownCloseImgChangeForm(evt) {
  if (evt.keyCode === 27) {
    imgChangeForm.classList.add('hidden');
    buttonCloseChangeImg.removeEventListener('click', onCloseImgChangeForm);
    buttonCloseChangeImg.removeEventListener('click', onKeydownCloseImgChangeForm);
  }
}

function setFilterValue(value, type) {
  var strEffect = '';
  for (var i in FILTER_SETTINGS) {
    if (type === i) {
      strEffect = FILTER_SETTINGS[i].css + '(' + (((value * (FILTER_SETTINGS[i].max - FILTER_SETTINGS[i].min)) / 100) + FILTER_SETTINGS[i].min) + FILTER_SETTINGS[i].unit + ')';
    }
  }
  return strEffect;
}

function setRadioEffectValue(evt) {
  if (evt.target.value === 'none' && mainPic.classList.length > 0) {
    typeEffect = evt.target.value;
    mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    mainPic.style.filter = '';
    effectBar.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    typeEffect = evt.target.value;
    mainPic.classList.add('effects__preview--chrome');
    mainPic.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectValue.value = FILTER_SETTINGS.default.value;
    mainPic.style.filter = setFilterValue(FILTER_SETTINGS.default.value, typeEffect);
    if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }
  } else if (evt.target.value === 'sepia') {
    typeEffect = evt.target.value;
    mainPic.classList.add('effects__preview--sepia');
    mainPic.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectValue.value = FILTER_SETTINGS.default.value;
    mainPic.style.filter = setFilterValue(FILTER_SETTINGS.default.value, typeEffect);
    if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }
  } else if (evt.target.value === 'marvin') {
    typeEffect = evt.target.value;
    mainPic.classList.add('effects__preview--marvin');
    mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
    effectValue.value = FILTER_SETTINGS.default.value;
    mainPic.style.filter = setFilterValue(FILTER_SETTINGS.default.value, typeEffect);
    if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }
  } else if (evt.target.value === 'phobos') {
    typeEffect = evt.target.value;
    mainPic.classList.add('effects__preview--phobos');
    mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
    effectValue.value = FILTER_SETTINGS.default.value;
    mainPic.style.filter = setFilterValue(FILTER_SETTINGS.default.value, typeEffect);
    if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }
  } else if (evt.target.value === 'heat') {
    typeEffect = evt.target.value;
    mainPic.classList.add('effects__preview--heat');
    mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
    effectValue.value = FILTER_SETTINGS.default.value;
    mainPic.style.filter = setFilterValue(FILTER_SETTINGS.default.value, typeEffect);
    if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }
  }
}

function onChangeEffects(evt) {
  if (evt.target.matches('.effects__radio')) {
    setRadioEffectValue(evt);
  }
  if (evt.target.matches('.effect-level__value')) {
    mainPic.style.filter = setFilterValue(evt.target.value, typeEffect);
  }
}

for (var i = 0; i < massivePhotos.length; i++) {
  var element = templatePicture.cloneNode(true);
  element.querySelector('.picture__img').src = massivePhotos[i].url;
  element.querySelector('.picture__likes').textContent = massivePhotos[i].likes;
  element.querySelector('.picture__comments').textContent = massivePhotos[i].comments.length;
  pictureFragment.appendChild(element);
}
sectionPictures.appendChild(pictureFragment);

// inputUploadFile.addEventListener('change', function () {
//   var picture = inputUploadFile.value;
//   concole.log(picture);
// });
sectionPictures.addEventListener('click', onOpenBigPicture);
buttonShowChangeImg.addEventListener('click', onOpenImgChangeForm);


// Показ инпута, для теста эффектов (временно)
effectValue.style.display = 'inline-block';
effectValue.style.color = 'black';
