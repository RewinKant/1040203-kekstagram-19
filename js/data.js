'use strict';
(function () {
  var countPhotos = 25;
  var countLikes = {
    min: 15,
    max: 200
  };
  var comments = {
    min: 1,
    max: 10,
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
  // module5-task3
  window.variable = {
    massivePhotos: createPhoto(),
    typeEffect: '',
  };

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

  function includeRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createComments() {
    var massiveComments = [];
    var comment = {};
    var numCommets = includeRandomInt(comments.min, comments.max);

    for (var a = 0; a < numCommets; a++) {
      comment = {
        avatar: 'img/avatar-' + includeRandomInt(1, comments.countAvatars) + '.svg',
        message: comments.message[includeRandomInt(0, comments.message.length - 1)],
        name: comments.name[includeRandomInt(0, comments.name.length - 1)]
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
        likes: includeRandomInt(countLikes.min, countLikes.max),
        comments: createComments()
      };
      massivePhotos.push(photo);
    }
    return massivePhotos;
  }
})();
