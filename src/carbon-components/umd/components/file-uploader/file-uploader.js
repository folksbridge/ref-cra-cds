(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../globals/js/settings', '../../globals/js/misc/mixin', '../../globals/js/mixins/create-component', '../../globals/js/mixins/init-component-by-search', '../../globals/js/mixins/evented-state', '../../globals/js/mixins/handles', '../../globals/js/misc/event-matches', '../../globals/js/misc/on'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../globals/js/settings'), require('../../globals/js/misc/mixin'), require('../../globals/js/mixins/create-component'), require('../../globals/js/mixins/init-component-by-search'), require('../../globals/js/mixins/evented-state'), require('../../globals/js/mixins/handles'), require('../../globals/js/misc/event-matches'), require('../../globals/js/misc/on'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.handles, global.eventMatches, global.on);
    global.fileUploader = mod.exports;
  }
})(this, function (exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _handles, _eventMatches, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _settings2 = _interopRequireDefault(_settings);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _eventedState2 = _interopRequireDefault(_eventedState);

  var _handles2 = _interopRequireDefault(_handles);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var FileUploader = function (_mixin) {
    _inherits(FileUploader, _mixin);

    /**
     * File uploader.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends eventedState
     * @extends Handles
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {Object} [options] The component options. See static options.
     */
    function FileUploader(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FileUploader);

      var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, element, options));

      _this._changeState = function (state, detail, callback) {
        if (state === 'delete-filename-fileuploader') {
          _this.container.removeChild(detail.filenameElement);
        }
        if (typeof callback === 'function') {
          callback();
        }
      };

      _this._handleDeleteButton = function (evt) {
        var target = (0, _eventMatches2.default)(evt, '[data-for=' + _this.inputId + ']');
        if (target) {
          _this._changeState('delete-filename-fileuploader', {
            initialEvt: evt,
            filenameElement: target.parentNode
          });
        }
      };

      _this.input = _this.element.querySelector(_this.options.selectorInput);
      _this.container = _this.element.querySelector(_this.options.selectorContainer);

      if (!_this.input) {
        throw new TypeError('Cannot find the file input box.');
      }

      if (!_this.container) {
        throw new TypeError('Cannot find the file names container.');
      }

      _this.inputId = _this.input.getAttribute('id');
      _this.manage((0, _on2.default)(_this.input, 'change', function () {
        return _this._displayFilenames();
      }));
      _this.manage((0, _on2.default)(_this.container, 'click', _this._handleDeleteButton));
      return _this;
    }

    _createClass(FileUploader, [{
      key: '_filenamesHTML',
      value: function _filenamesHTML(name, id) {
        return '<span class="' + this.options.classSelectedFile + '">\n      <p class="' + this.options.classFileName + '">' + name + '</p>\n      <span data-for="' + id + '" class="' + this.options.classStateContainer + '"></span>\n    </span>';
      }
    }, {
      key: '_uploadHTML',
      value: function _uploadHTML() {
        return '\n      <div data-loading class="' + this.options.classLoading + '">\n        <svg class="' + this.options.classLoadingSvg + '" viewBox="-42 -42 84 84">\n          <circle cx="0" cy="0" r="37.5" />\n        </svg>\n      </div>';
      }
    }, {
      key: '_closeButtonHTML',
      value: function _closeButtonHTML() {
        return '\n      <svg class="' + this.options.classFileClose + '" tabindex="0" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">\n        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8\n          9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />\n      </svg>';
      }
    }, {
      key: '_checkmarkHTML',
      value: function _checkmarkHTML() {
        return '\n      <svg class="' + this.options.classFileComplete + '" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">\n       <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"/>\n      </svg>';
      }
    }, {
      key: '_getStateContainers',
      value: function _getStateContainers() {
        var stateContainers = [].concat(_toConsumableArray(this.element.querySelectorAll('[data-for=' + this.inputId + ']')));

        if (stateContainers.length === 0) {
          throw new TypeError('State container elements not found; invoke _displayFilenames() first');
        }

        if (stateContainers[0].dataset.for !== this.inputId) {
          throw new TypeError('File input id must equal [data-for] attribute');
        }

        return stateContainers;
      }
    }, {
      key: '_displayFilenames',
      value: function _displayFilenames() {
        var _this2 = this;

        var container = this.element.querySelector(this.options.selectorContainer);
        var HTMLString = [].concat(_toConsumableArray(this.input.files)).map(function (file) {
          return _this2._filenamesHTML(file.name, _this2.inputId);
        }).join('');

        container.insertAdjacentHTML('afterbegin', HTMLString);
      }
    }, {
      key: '_removeState',
      value: function _removeState(element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          throw new TypeError('DOM element should be given to initialize this widget.');
        }
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }, {
      key: '_handleStateChange',
      value: function _handleStateChange(elements, selectIndex, html) {
        var _this3 = this;

        if (selectIndex === undefined) {
          elements.forEach(function (el) {
            _this3._removeState(el);
            el.insertAdjacentHTML('beforeend', html);
          });
        } else {
          elements.forEach(function (el, index) {
            if (index === selectIndex) {
              _this3._removeState(el);
              el.insertAdjacentHTML('beforeend', html);
            }
          });
        }
      }
    }, {
      key: 'setState',
      value: function setState(state, selectIndex) {
        var stateContainers = this._getStateContainers();

        if (state === 'edit') {
          this._handleStateChange(stateContainers, selectIndex, this._closeButtonHTML());
        }

        if (state === 'upload') {
          this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
        }

        if (state === 'complete') {
          this._handleStateChange(stateContainers, selectIndex, this._checkmarkHTML());
        }
      }
    }], [{
      key: 'options',
      get: function get() {
        var prefix = _settings2.default.prefix;

        return {
          selectorInit: '[data-file]',
          selectorInput: 'input[type="file"].' + prefix + '--file-input',
          selectorContainer: '[data-file-container]',
          selectorCloseButton: '.' + prefix + '--file-close',
          classLoading: prefix + '--loading',
          classLoadingSvg: prefix + '--loading__svg',
          classFileName: prefix + '--file-filename',
          classFileClose: prefix + '--file-close',
          classFileComplete: prefix + '--file-complete',
          classSelectedFile: prefix + '--file__selected-file',
          classStateContainer: prefix + '--file__state-container',
          eventBeforeDeleteFilenameFileuploader: 'fileuploader-before-delete-filename',
          eventAfterDeleteFilenameFileuploader: 'fileuploader-after-delete-filename'
        };
      }
    }]);

    return FileUploader;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default, _handles2.default));

  FileUploader.components = new WeakMap();
  exports.default = FileUploader;
});