'use strict';
(function () {
  var countPhotos = 25;
  var comments = {
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

  function createComments() {
    var massiveComments = [];
    var comment = {};
    var numCommets = window.helpFun.includeRandomInt(1, 10);

    for (var a = 0; a < numCommets - 1; a++) {
      comment = {
        avatar: 'img/avatar-' + window.helpFun.includeRandomInt(1, comments.countAvatars) + '.svg',
        message: comments.message[window.helpFun.includeRandomInt(0, comments.message.length - 1)],
        name: comments.name[window.helpFun.includeRandomInt(0, comments.name.length - 1)]
      };
      massiveComments.push(comment);
    }
    return massiveComments;
  }

  function createPhoto() {
    var massivePhotos = [];
    var photo = {};
    for (var b = 1; b <= countPhotos; b++) {
      photo = {
        url: 'photos/' + b + '.jpg',
        description: '',
        likes: window.helpFun.includeRandomInt(15, 200),
        comments: createComments()
      };
      massivePhotos.push(photo);
    }
    return massivePhotos;
  }

  function includeComments(com) {
    var massComments = document.createDocumentFragment();
    for (var c = 0; c < com.length; c++) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = com[c].avatar;
      avatar.alt = com[c].name;
      avatar.width = 35;
      avatar.height = 35;
      comment.appendChild(avatar);

      var p = document.createElement('p');
      p.classList.add('social__text');
      p.textContent = com[c].message;
      comment.appendChild(p);

      massComments.appendChild(comment);
    }
    return massComments;
  }

  function changeBigPicture(evt) {
    var massivePhotos = window.variable.massivePhotos;
    var bigPicture = document.querySelector('.big-picture');
    var commentsListPicture = bigPicture.querySelector('.social__comments');
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
    evt.stopPropagation();
  }

  function changeRadioEffectValue(evt) {
    var uploadForm = document.querySelector('#upload-select-image');
    var mainPic = uploadForm.querySelector('.img-upload__preview').querySelector('img');
    var effectBar = uploadForm.querySelector('.img-upload__effect-level');
    var effectValue = effectBar.querySelector('.effect-level__value');
    var defaultEffectValue = 100;
    var defaultStyleFilter = '';

    if (evt.target.value === 'none' && mainPic.classList.length > 0) {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
      mainPic.style.filter = defaultStyleFilter;
      effectBar.classList.add('hidden');
    } else if (evt.target.value === 'chrome') {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.add('effects__preview--chrome');
      mainPic.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
      effectValue.value = defaultEffectValue;
      mainPic.style.filter = window.helpFun.setFilterValue(defaultEffectValue, window.variable.typeEffect);
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
    } else if (evt.target.value === 'sepia') {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.add('effects__preview--sepia');
      mainPic.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
      effectValue.value = defaultEffectValue;
      mainPic.style.filter = window.helpFun.setFilterValue(defaultEffectValue, window.variable.typeEffect);
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
    } else if (evt.target.value === 'marvin') {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.add('effects__preview--marvin');
      mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
      effectValue.value = defaultEffectValue;
      mainPic.style.filter = window.helpFun.setFilterValue(defaultEffectValue, window.variable.typeEffect);
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
    } else if (evt.target.value === 'phobos') {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.add('effects__preview--phobos');
      mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
      effectValue.value = defaultEffectValue;
      mainPic.style.filter = window.helpFun.setFilterValue(defaultEffectValue, window.variable.typeEffect);
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
    } else if (evt.target.value === 'heat') {
      window.variable.typeEffect = evt.target.value;
      mainPic.classList.add('effects__preview--heat');
      mainPic.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
      effectValue.value = defaultEffectValue;
      mainPic.style.filter = window.helpFun.setFilterValue(defaultEffectValue, window.variable.typeEffect);
      if (effectBar.classList.contains('hidden')) {
        effectBar.classList.remove('hidden');
      }
    }
  }


  window.dom = {
    create: {
      comments: createComments,
      photo: createPhoto
    },
    include: {
      comments: includeComments
    },
    change: {
      bigPicture: changeBigPicture,
      radioEffectValue: changeRadioEffectValue
    }
  };
})();
