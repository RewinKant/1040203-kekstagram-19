'use strict';

(function () {

  var filterForm = document.querySelector('.img-filters__form');
  var sectionPictures = document.querySelector('.pictures');
  var lastTimeout;

  filterForm.addEventListener('click', onChangeFilter);

  function onChangeFilter(evt) {
    var selector = evt.target;
    var id = selector.id;
    var pictures = sectionPictures.querySelectorAll('.picture');
    var curentMassivePhotos = window.data.massivePhotos.slice();
    var count = window.data.massivePhotos.length;
    var delCount = window.data.massivePhotos.length - 10;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      if (selector.type === 'button') {
        filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        selector.classList.add('img-filters__button--active');

        pictures.forEach(function (element) {
          element.remove();
        });

        if (id === 'filter-default') {
          window.data.onComplete(window.data.massivePhotos);
        } else if (id === 'filter-random') {
          for (var i = 0; i < delCount; i++) {
            window.data.massivePhotos.splice(includeRandomInt(0, count - 1), 1);
            count = window.data.massivePhotos.length;
          }
          window.data.onComplete(window.data.massivePhotos);
          window.data.massivePhotos = curentMassivePhotos;
        } else if (id === 'filter-discussed') {
          window.data.massivePhotos.sort(function (first, second) {
            return second.comments.length - first.comments.length;
          });
          window.data.onComplete(window.data.massivePhotos);
          window.data.massivePhotos = curentMassivePhotos;
        }
      }
    }, 300);
  }

  function includeRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
