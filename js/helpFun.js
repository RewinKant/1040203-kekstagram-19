'use strict';
(function () {
  function includeRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.helpFun = {
    includeRandomInt: includeRandomInt,
  };
})();
