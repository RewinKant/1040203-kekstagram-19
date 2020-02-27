'use strict';
(function () {
  function includeRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setFilterValue(value, type) {
    var FILTER_SETTINGS = {
      chrome: {
        css: 'grayscale',
        min: 0,
        max: 1,
        unit: ''
      },
      sepia: {
        css: 'sepia',
        min: 0,
        max: 1,
        unit: ''
      },
      marvin: {
        css: 'invert',
        min: 0,
        max: 100,
        unit: '%'
      },
      phobos: {
        css: 'blur',
        min: 0,
        max: 3,
        unit: 'px'
      },
      heat: {
        css: 'brightness',
        min: 1,
        max: 3,
        unit: ''
      }
    };
    var strEffect = '';
    for (var i in FILTER_SETTINGS) {
      if (type === i) {
        strEffect =
        FILTER_SETTINGS[i].css +
        '(' +
        (((value * (FILTER_SETTINGS[i].max - FILTER_SETTINGS[i].min)) / 100) + FILTER_SETTINGS[i].min) + FILTER_SETTINGS[i].unit +
        ')';
      }
    }
    return strEffect;
  }

  window.helpFun = {
    includeRandomInt: includeRandomInt,
    setFilterValue: setFilterValue
  };
})();
