'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var showCounts = 5;
  var comments;

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
    var massivePhotos = window.data.massivePhotos.slice();
    var bigPicture = document.querySelector('.big-picture');
    var commentsListPicture = bigPicture.querySelector('.social__comments');

    while (commentsListPicture.firstChild) {
      commentsListPicture.removeChild(commentsListPicture.firstChild);
    }
    massivePhotos.filter(function (item) {
      return item.url === cickImg.attributes.src.value;
    }).forEach(function (item) {
      comments = item.comments;
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = item.url;
      bigPicture.querySelector('.likes-count').textContent = item.likes;
      bigPicture.querySelector('.comments-count').textContent = item.comments.length;
      bigPicture.querySelector('.social__caption').textContent = item.description;
      viewComments();
    });

    bigPicture.classList.remove('hidden');
  }

  function viewComments() {
    var bigPicture = document.querySelector('.big-picture');
    var commentsListPicture = bigPicture.querySelector('.social__comments');

    var listComments = document.querySelector('.social__comments');
    var viewComment = listComments.querySelectorAll('.social__comment');
    if (viewComment.length < comments.length) {
      var count = viewComment.length;
      var items = comments.slice(count, count + showCounts);

      commentsListPicture.appendChild(includeComments(items, showCounts));
      bigPicture.querySelector('.comments-show').textContent = count + items.length;
      if (comments.length === count + items.length) {
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
      }
    }
    return comments;
  }

  function onOpenBigPicture(evt) {
    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var closeButton = bigPicture.querySelector('#picture-cancel');
    var cickImg = evt.target.classList.contains('picture__img') ? evt.target : evt.target.querySelector('.picture__img');
    var comentsLoader = bigPicture.querySelector('.comments-loader');
    if (evt.target && evt.target.closest('.picture__img') || evt.keyCode === 13) {
      evt.preventDefault();
      changeBigPicture(cickImg);
      closeButton.addEventListener('click', onCloseBigPicture);
      document.addEventListener('keydown', onKeydownCloseBigPicture);
      comentsLoader.addEventListener('click', viewComments);

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
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    closeButton.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onKeydownCloseBigPicture);
  }

  function onKeydownCloseBigPicture(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseBigPicture();
    }
  }
})();
