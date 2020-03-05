'use strict';

(function () {
  var SHOW_PIC = 12;
  var lastTimeout;

  var filterForm = document.querySelector('.img-filters__form');
  filterForm.addEventListener('click', onChangeFilter);

  function onChangeFilter(evt) {
    var selector = evt.target;
    var id = selector.id;
    var sectionPictures = document.querySelector('.pictures');
    var pictures = sectionPictures.querySelectorAll('.picture');
    var massivePhotos = window.data.massivePhotos;
    var curentMassivePhotos = massivePhotos.slice();
    var count = massivePhotos.length;

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
          window.data.showPic(massivePhotos);
        } else if (id === 'filter-random') {
          var showPhotos = [];
          for (var i = 0; i < SHOW_PIC; i++) {
            var random = includeRandomInt(0, count - 1);
            var item = curentMassivePhotos.splice(random, 1);
            showPhotos = showPhotos.concat(item);
            count = curentMassivePhotos.length;
          }

          window.data.showPic(showPhotos);
          curentMassivePhotos = massivePhotos.slice();
        } else if (id === 'filter-discussed') {
          curentMassivePhotos.sort(function (first, second) {
            return second.comments.length - first.comments.length;
          });

          window.data.showPic(curentMassivePhotos);
          curentMassivePhotos = massivePhotos.slice();
        }
      }
    }, 500);
  }

  function includeRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
