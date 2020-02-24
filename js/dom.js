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

  function includeComments(comments) {
    var massComments = document.createDocumentFragment();
    for (var c = 0; c < comments.length; c++) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = comments[c].avatar;
      avatar.alt = comments[c].name;
      avatar.width = 35;
      avatar.height = 35;
      comment.appendChild(avatar);

      var p = document.createElement('p');
      p.classList.add('social__text');
      p.textContent = comments[c].message;
      comment.appendChild(p);

      massComments.appendChild(comment);
    }
    return massComments;
  }

  window.dom = {
    create: {
      comments: createComments,
      photo: createPhoto
    },
    include: {
      comments: includeComments
    }
  };
})();
