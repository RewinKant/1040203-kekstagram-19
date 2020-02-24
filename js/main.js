'use strict';
var COUNT_PHOTOS = 25;
var COMMENTS = {
  countAvatars: 6,
  name: [
    'Артем',
    'Ирина',
    'Олег',
    'Иннокентий',
    'Юля',
    'Оля'
  ],
  message: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]
};

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


function includeRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createComments(numCommets, comments) {
  var massiveComments = [];
  var comment = {};
  for (var i = 0; i < numCommets - 1; i++) {
    comment = {
      avatar: 'img/avatar-' + includeRandomInt(1, comments.countAvatars) + '.svg',
      message: comments.message[includeRandomInt(0, comments.message.length - 1)],
      name: comments.name[includeRandomInt(0, comments.name.length - 1)]
    };
    massiveComments.push(comment);
  }
  return massiveComments;
}

function createPhoto(countPhotos, comments) {
  var massivePhotos = [];
  var photo = {};
  for (var i = 1; i <= countPhotos; i++) {
    photo = {
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: includeRandomInt(15, 200),
      comments: createComments(includeRandomInt(1, 10), comments)
    };
    massivePhotos.push(photo);
  }
  return massivePhotos;
}

function includeComments(comments) {
  var massComments = document.createDocumentFragment();
  for (var j = 0; j < comments.length; j++) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');

    var avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comments[j].avatar;
    avatar.alt = comments[j].name;
    avatar.width = 35;
    avatar.height = 35;
    comment.appendChild(avatar);

    var p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comments[j].message;
    comment.appendChild(p);

    massComments.appendChild(comment);
  }
  return massComments;
}

function validationHashtagInput(evt) {
  var userHashtags = evt.target.value.toLowerCase().replace(/ +/g, ' ').trim().split(' ');
  var regExpValid = /^#[a-zА-я0-9]{1,19}$/;
  var exit = [];
  if (userHashtags[0] !== '') {
    if (userHashtags.length > 5) {
      exit.push('Введите не более 5 хештегов');
    }
    for (var i = 0; i < userHashtags.length; i++) {
      for (var j = i + 1; j < userHashtags.length - 1; j++) {
        if (userHashtags[i] === userHashtags[j]) {
          exit.push((i + 1) + '-й и ' + (j + 1) + '-й хэштеги одинаковы');
        }
      }
      if (!regExpValid.test(userHashtags[i])) {
        if (userHashtags[i].length > 20) {
          exit.push((i + 1) + '-й хэштег длиннее 20 символов');
        } else if (userHashtags[i].length < 2) {
          exit.push((i + 1) + '-й хэштег слишком короткий');
        } else {
          exit.push('У ' + (i + 1) + '-го хэштега неверный формат');
        }
      }
    }
  }
  var errorDef = '';
  for (var u = 0; u < exit.length; u++) {
    errorDef += exit[u] + ', ';
  }
  return errorDef;
}

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
        commentsListPicture.appendChild(includeComments(massivePhotos[i].comments));
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
  var trig = validationHashtagInput(evt);
  evt.target.setCustomValidity(trig);
  evt.target.reportValidity();
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
  buttonCloseChangeImg.removeEventListener('click', onKeydownCloseImgChangeForm);
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

var body = document.querySelector('body');
var sectionPictures = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('a');
var massivePhotos = createPhoto(COUNT_PHOTOS, COMMENTS);

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
