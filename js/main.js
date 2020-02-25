'use strict';

(function () {
  var sectionPictures = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture').content.querySelector('a');
  var uploadForm = document.querySelector('#upload-select-image');
  // var inputUploadFile = uploadForm.querySelector('#upload-file');
  var buttonShowChangeImg = uploadForm.querySelector('.img-upload__control');

  var effectBar = uploadForm.querySelector('.img-upload__effect-level');
  var effectValue = effectBar.querySelector('.effect-level__value');
  // var effectLevelPin = effectBar.querySelector('.effect-level__pin');

  var pictureFragment = document.createDocumentFragment();

  for (var i = 0; i < window.variable.massivePhotos.length; i++) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').src = window.variable.massivePhotos[i].url;
    element.querySelector('.picture__likes').textContent = window.variable.massivePhotos[i].likes;
    element.querySelector('.picture__comments').textContent = window.variable.massivePhotos[i].comments.length;
    pictureFragment.appendChild(element);
  }
  sectionPictures.appendChild(pictureFragment);

  // inputUploadFile.addEventListener('change', function () {
  //   var picture = inputUploadFile.value;
  //   concole.log(picture);
  // });
  sectionPictures.addEventListener('click', window.on.open.bigPicture);
  buttonShowChangeImg.addEventListener('click', window.on.open.imgChangeForm);


  // Показ инпута, для теста эффектов (временно)
  effectValue.style.display = 'inline-block';
  effectValue.style.color = 'black';
})();
