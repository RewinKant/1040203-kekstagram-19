'use strict';
(function () {
  function validationHashtagInput(evt) {
    var userHashtags = evt.target.value.toLowerCase().replace(/ +/g, ' ').trim().split(' ');
    var regExpValid = /^#[a-zА-я0-9]{1,19}$/;
    var exit = [];
    var errorDef = '';
    if (userHashtags[0] !== '') {
      if (userHashtags.length > 5) {
        exit.push('Введите не более 5 хештегов');
      }
      for (var i = 0; i < userHashtags.length; i++) {
        for (var j = i + 1; j < userHashtags.length - 1; j++) {
          if (userHashtags[i] === userHashtags[j]) {
            exit.push((i + 1) + '-й и ' + (j + 1) + '-й хэштеги одинаковы');
          }
        }
        if (!regExpValid.test(userHashtags[i])) {
          if (userHashtags[i].length > 20) {
            exit.push((i + 1) + '-й хэштег длиннее 20 символов');
          } else if (userHashtags[i].length < 2) {
            exit.push((i + 1) + '-й хэштег слишком короткий');
          } else {
            exit.push('У ' + (i + 1) + '-го хэштега неверный формат');
          }
        }
      }
    }
    for (var u = 0; u < exit.length; u++) {
      errorDef += exit[u] + ', ';
    }

    evt.target.setCustomValidity(errorDef);
    evt.target.reportValidity();
  }

  window.validation = {
    hashtagInput: validationHashtagInput,
  };
})();
