(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.multiSelectConfig = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var items = [{
    id: 'downshift-1-item-0',
    label: 'Option 1',
    selected: true
  }, {
    id: 'downshift-1-item-1',
    label: 'Option 2'
  }, {
    id: 'downshift-1-item-2',
    label: 'Option 3'
  }, {
    id: 'downshift-1-item-3',
    label: 'Option 4'
  }];

  module.exports = {
    variants: [{
      name: 'default',
      label: 'Multi Select',
      context: {
        items: items
      }
    }, {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
        items: items
      }
    }]
  };
});