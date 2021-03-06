(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './components'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./components'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.components);
    global.watch = mod.exports;
  }
})(this, function (exports, _components) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new TypeError('DOM document or DOM element should be given to watch for DOM node to create/release components.');
    }

    var componentClasses = Object.keys(components).map(function (key) {
      return components[key];
    }).filter(function (component) {
      return typeof component.init === 'function';
    });

    var handles = componentClasses.map(function (Clz) {
      return Clz.init(target, options);
    }).filter(Boolean);

    var componentClassesForWatchInit = componentClasses.filter(function (Clz) {
      return !Clz.forLazyInit;
    });

    var observer = new MutationObserver(function (records) {
      createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options);
    });
    observer.observe(target, {
      childList: true,
      subtree: true
    });
    return {
      release: function release() {
        for (var handle = handles.pop(); handle; handle = handles.pop()) {
          handle.release();
        }
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }
    };
  };

  var components = _interopRequireWildcard(_components);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var forEach = Array.prototype.forEach;

  var createAndReleaseComponentsUponDOMMutation = function createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options) {
    records.forEach(function (record) {
      forEach.call(record.addedNodes, function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          componentClassesForWatchInit.forEach(function (Clz) {
            Clz.init(node, options);
          });
        }
      });
      forEach.call(record.removedNodes, function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          componentClasses.forEach(function (Clz) {
            if (node.matches(Clz.options.selectorInit)) {
              var instance = Clz.components.get(node);
              if (instance) {
                instance.release();
              }
            } else {
              forEach.call(node.querySelectorAll(Clz.options.selectorInit), function (element) {
                var instance = Clz.components.get(element);
                if (instance) {
                  instance.release();
                }
              });
            }
          });
        }
      });
    });
  };

  /**
   * Automatically instantiates/destroys components in the given element, by watching for DOM additions/removals.
   * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @returns {Handle} The handle to stop watching.
   */
});