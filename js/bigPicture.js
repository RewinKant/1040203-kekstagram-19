'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 27;
  var SHOW_COUNTS = 5;
  var AVATAR_SIZE = 35;
  var comments;

  var body = document.querySelector('body');
  var sectionPictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var commentsListPicture = bigPicture.querySelector('.social__comments');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLike = bigPicture.querySelector('.likes-count');
  var bigPictureComent = bigPicture.querySelector('.comments-count');
  var bigPictureCaption = bigPicture.querySelector('.social__caption');
  var listComments = document.querySelector('.social__comments');
  var closeButton = bigPicture.querySelector('#picture-cancel');
  var comentsLoader = bigPicture.querySelector('.comments-loader');

  sectionPictures.addEventListener('click', onOpenBigPicture);
  document.addEventListener('keydown', onOpenBigPicture);

  function includeComments(arrayComments) {
    var massComments = document.createDocumentFragment();

    arrayComments.forEach(function (item) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = item.avatar;
      avatar.alt = item.name;
      avatar.width = AVATAR_SIZE;
      avatar.height = AVATAR_SIZE;
      comment.appendChild(avatar);

      var message = document.createElement('p');
      message.classList.add('social__text');
      message.textContent = item.message;
      comment.appendChild(message);

      massComments.appendChild(comment);
    });
    return massComments;
  }

  function changeBigPicture(img) {
    var massivePhotos = window.data.massivePhotos.slice();

    while (commentsListPicture.firstChild) {
      commentsListPicture.removeChild(commentsListPicture.firstChild);
    }
    massivePhotos.filter(function (item) {
      return item.url === img.attributes.src.value;
    }).forEach(function (item) {
      comments = item.comments;
      bigPictureImg.src = item.url;
      bigPictureLike.textContent = item.likes;
      bigPictureComent.textContent = item.comments.length;
      bigPictureCaption.textContent = item.description;
      nextViewComments();
    });

    bigPicture.classList.remove('hidden');
  }

  function nextViewComments() {
    var viewComments = listComments.querySelectorAll('.social__comment');

    if (viewComments.length < comments.length) {
      var count = viewComments.length;
      var items = comments.slice(count, count + SHOW_COUNTS);

      commentsListPicture.appendChild(includeComments(items, SHOW_COUNTS));
      bigPicture.querySelector('.comments-show').textContent = count + items.length;
      if (comments.length === count + items.length) {
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
      }
    }
    return comments;
  }

  function onOpenBigPicture(evt) {
    var image = evt.target.classList.contains('picture__img') ? evt.target : evt.target.querySelector('.picture__img');

    if (evt.target && evt.target.closest('.picture__img') || evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      changeBigPicture(image);
      closeButton.addEventListener('click', onCloseBigPicture);
      document.addEventListener('keydown', onKeydownCloseBigPicture);
      comentsLoader.addEventListener('click', nextViewComments);

      evt.stopPropagation();
      body.classList.add('modal-open');
    }
  }

  function onCloseBigPicture() {
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
