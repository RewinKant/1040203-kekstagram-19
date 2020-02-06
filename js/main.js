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

function includeRandomInt(min, max) {
  var r = min + Math.random() * (max + 1 - min);
  return Math.floor(r);
}

function includeComments(numCommets, comments) {
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
      comments: includeComments(includeRandomInt(1, 10), comments)
    };
    massivePhotos.push(photo);
  }
  return massivePhotos;
}

var sectionPictures = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('a');

var massivePhotos = createPhoto(COUNT_PHOTOS, COMMENTS);

var pictureFragment = document.createDocumentFragment();
for (var i = 0; i < massivePhotos.length; i++) {
  var element = templatePicture.cloneNode(true);
  element.querySelector('.picture__img').src = massivePhotos[i].url;
  element.querySelector('.picture__likes').textContent = massivePhotos[i].likes;
  element.querySelector('.picture__comments').textContent = massivePhotos[i].comments.length;
  pictureFragment.appendChild(element);
}

sectionPictures.appendChild(pictureFragment);
