'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var sectionPictures = document.querySelector('.pictures');

  sectionPictures.addEventListener('click', onOpenBigPicture);
  document.addEventListener('keydown', onOpenBigPicture);

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

  function changeBigPicture(cickImg) {
    var massivePhotos = window.data.massivePhotos;
    var bigPicture = document.querySelector('.big-picture');
    var commentsListPicture = bigPicture.querySelector('.social__comments');

    for (var i = 0; i < massivePhotos.length; i++) {
      if (massivePhotos[i].url === cickImg.attributes.src.value) {
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
  }

  function onOpenBigPicture(evt) {
    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var closeButton = bigPicture.querySelector('#picture-cancel');
    var cickImg = evt.target.classList.contains('picture__img') ? evt.target : evt.target.querySelector('.picture__img');

    if (evt.target && evt.target.closest('.picture__img') || evt.keyCode === 13) {
      evt.preventDefault();
      changeBigPicture(cickImg);
      closeButton.addEventListener('click', onCloseBigPicture);
      document.addEventListener('keydown', onKeydownCloseBigPicture);

      evt.stopPropagation();
      body.classList.add('modal-open');
    }
  }

  function onCloseBigPicture() {
    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var closeButton = bigPicture.querySelector('#picture-cancel');

    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onKeydownCloseBigPicture);
  }

  function onKeydownCloseBigPicture(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseBigPicture();
    }
  }
})();
