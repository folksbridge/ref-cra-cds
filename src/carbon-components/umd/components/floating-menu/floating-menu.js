(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../globals/js/misc/mixin', '../../globals/js/mixins/create-component', '../../globals/js/mixins/evented-show-hide-state', '../../globals/js/mixins/track-blur', '../../globals/js/misc/get-launching-details', '../../globals/js/misc/resize'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../globals/js/misc/mixin'), require('../../globals/js/mixins/create-component'), require('../../globals/js/mixins/evented-show-hide-state'), require('../../globals/js/mixins/track-blur'), require('../../globals/js/misc/get-launching-details'), require('../../globals/js/misc/resize'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixin, global.createComponent, global.eventedShowHideState, global.trackBlur, global.getLaunchingDetails, global.resize);
    global.floatingMenu = mod.exports;
  }
})(this, function (exports, _mixin2, _createComponent, _eventedShowHideState, _trackBlur, _getLaunchingDetails, _resize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getFloatingPosition = exports.DIRECTION_BOTTOM = exports.DIRECTION_RIGHT = exports.DIRECTION_TOP = exports.DIRECTION_LEFT = undefined;

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _eventedShowHideState2 = _interopRequireDefault(_eventedShowHideState);

  var _trackBlur2 = _interopRequireDefault(_trackBlur);

  var _getLaunchingDetails2 = _interopRequireDefault(_getLaunchingDetails);

  var _resize2 = _interopRequireDefault(_resize);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * The structure for the position of floating menu.
   * @typedef {Object} FloatingMenu~position
   * @property {number} left The left position.
   * @property {number} top The top position.
   * @property {number} right The right position.
   * @property {number} bottom The bottom position.
   */

  /**
   * The structure for the size of floating menu.
   * @typedef {Object} FloatingMenu~size
   * @property {number} width The width.
   * @property {number} height The height.
   */

  /**
   * The structure for the position offset of floating menu.
   * @typedef {Object} FloatingMenu~offset
   * @property {number} top The top position.
   * @property {number} left The left position.
   */

  var DIRECTION_LEFT = exports.DIRECTION_LEFT = 'left';
  var DIRECTION_TOP = exports.DIRECTION_TOP = 'top';
  var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = 'right';
  var DIRECTION_BOTTOM = exports.DIRECTION_BOTTOM = 'bottom';

  /**
   * @param {Object} params The parameters.
   * @param {FloatingMenu~size} params.menuSize The size of the menu.
   * @param {FloatingMenu~position} params.refPosition The position of the triggering element.
   * @param {FloatingMenu~offset} [params.offset={ left: 0, top: 0 }] The position offset of the menu.
   * @param {string} [params.direction=bottom] The menu direction.
   * @param {number} [params.scrollX=0] The scroll position of the viewport.
   * @param {number} [params.scrollY=0] The scroll position of the viewport.
   * @returns {FloatingMenu~offset} The position of the menu, relative to the top-left corner of the viewport.
   * @private
   */
  var getFloatingPosition = exports.getFloatingPosition = function getFloatingPosition(_ref) {
    var _DIRECTION_LEFT$DIREC;

    var menuSize = _ref.menuSize,
        refPosition = _ref.refPosition,
        _ref$offset = _ref.offset,
        offset = _ref$offset === undefined ? {} : _ref$offset,
        _ref$direction = _ref.direction,
        direction = _ref$direction === undefined ? DIRECTION_BOTTOM : _ref$direction,
        _ref$scrollX = _ref.scrollX,
        scrollX = _ref$scrollX === undefined ? 0 : _ref$scrollX,
        _ref$scrollY = _ref.scrollY,
        scrollY = _ref$scrollY === undefined ? 0 : _ref$scrollY;
    var _refPosition$left = refPosition.left,
        refLeft = _refPosition$left === undefined ? 0 : _refPosition$left,
        _refPosition$top = refPosition.top,
        refTop = _refPosition$top === undefined ? 0 : _refPosition$top,
        _refPosition$right = refPosition.right,
        refRight = _refPosition$right === undefined ? 0 : _refPosition$right,
        _refPosition$bottom = refPosition.bottom,
        refBottom = _refPosition$bottom === undefined ? 0 : _refPosition$bottom;
    var width = menuSize.width,
        height = menuSize.height;
    var _offset$top = offset.top,
        top = _offset$top === undefined ? 0 : _offset$top,
        _offset$left = offset.left,
        left = _offset$left === undefined ? 0 : _offset$left;

    var refCenterHorizontal = (refLeft + refRight) / 2;
    var refCenterVertical = (refTop + refBottom) / 2;

    return (_DIRECTION_LEFT$DIREC = {}, _defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_LEFT, {
      left: refLeft - width + scrollX - left,
      top: refCenterVertical - height / 2 + scrollY + top
    }), _defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_TOP, {
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refTop - height + scrollY - top
    }), _defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_RIGHT, {
      left: refRight + scrollX + left,
      top: refCenterVertical - height / 2 + scrollY + top
    }), _defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_BOTTOM, {
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refBottom + scrollY + top
    }), _DIRECTION_LEFT$DIREC)[direction];
  };

  var FloatingMenu = function (_mixin) {
    _inherits(FloatingMenu, _mixin);

    /**
     * Floating menu.
     * @extends CreateComponent
     * @extends EventedShowHideState
     * @param {HTMLElement} element The element working as a modal dialog.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorContainer] The CSS selector to find the container to put this menu in.
     * @param {string} [options.attribDirection] The attribute name to specify menu placement direction (top/right/bottom/left).
     * @param {string} [options.classShown] The CSS class for shown state, for the menu.
     * @param {string} [options.classRefShown] The CSS class for shown state, for the trigger button.
     * @param {string} [options.eventBeforeShown]
     *   The name of the custom event fired before this menu is shown.
     *   Cancellation of this event stops hiding the menu.
     * @param {string} [options.eventAfterShown]
     *   The name of the custom event telling that menu is sure shown
     *   without being canceled by the event handler named by `eventBeforeShown` option (`floating-menu-beingshown`).
     * @param {string} [options.eventBeforeHidden]
     *   The name of the custom event fired before this menu is hidden.
     *   Cancellation of this event stops hiding the menu.
     * @param {string} [options.eventAfterHidden]
     *   The name of the custom event telling that menu is sure hidden
     *   without being canceled by the event handler named by `eventBeforeHidden` option (`floating-menu-beinghidden`).
     * @param {Element} [options.refNode] The launching element of the menu. Used for calculating the geometry of the menu.
     * @param {Object} [options.offset] The offset to adjust the geometry of the menu. Should have `top`/`left` properties.
     */
    function FloatingMenu(element, options) {
      _classCallCheck(this, FloatingMenu);

      var _this = _possibleConstructorReturn(this, (FloatingMenu.__proto__ || Object.getPrototypeOf(FloatingMenu)).call(this, element, options));

      var attribDirectionValue = _this.element.getAttribute(_this.options.attribDirection);
      if (!_this.options.direction) {
        _this.options.direction = attribDirectionValue || 'bottom';
      }
      if (!attribDirectionValue) {
        // Update attribute for styling
        _this.element.setAttribute(_this.options.attribDirection, _this.options.direction);
      }
      return _this;
    }

    /**
     * Focuses back on the trigger button if this component loses focus.
     */


    _createClass(FloatingMenu, [{
      key: 'handleBlur',
      value: function handleBlur(event) {
        if (this.element.classList.contains(this.options.classShown)) {
          this.changeState('hidden', (0, _getLaunchingDetails2.default)(event));
          var refNode = this.options.refNode;

          if (this.element.contains(event.relatedTarget) && refNode && event.target !== refNode) {
            HTMLElement.prototype.focus.call(refNode); // SVGElement in IE11 does not have `.focus()` method
          }
        }
      }
    }, {
      key: '_getContainer',
      value: function _getContainer() {
        return this.element.closest(this.options.selectorContainer) || this.element.ownerDocument.body;
      }
    }, {
      key: '_getPos',
      value: function _getPos() {
        var element = this.element;
        var _options = this.options,
            refNode = _options.refNode,
            offset = _options.offset,
            direction = _options.direction;


        if (!refNode) {
          throw new Error('Cannot find the refernce node for positioning floating menu.');
        }

        return getFloatingPosition({
          menuSize: element.getBoundingClientRect(),
          refPosition: refNode.getBoundingClientRect(),
          offset: typeof offset !== 'function' ? offset : offset(element, direction),
          direction: direction,
          scrollX: refNode.ownerDocument.defaultView.pageXOffset,
          scrollY: refNode.ownerDocument.defaultView.pageYOffset
        });
      }
    }, {
      key: '_testStyles',
      value: function _testStyles() {
        if (!this.options.debugStyle) {
          return;
        }
        var element = this.element;
        var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
        var styles = {
          position: 'absolute',
          right: 'auto',
          margin: 0
        };
        Object.keys(styles).forEach(function (key) {
          var expected = typeof styles[key] === 'number' ? parseFloat(styles[key]) : styles[key];
          var actual = computedStyle.getPropertyValue(key);
          if (expected !== actual) {
            // eslint-disable-next-line no-console
            console.warn('Floating menu component expects ' + key + ': ' + styles[key] + ' style.');
          }
        });
      }
    }, {
      key: '_place',
      value: function _place() {
        var element = this.element;

        var _getPos2 = this._getPos(),
            left = _getPos2.left,
            top = _getPos2.top;

        element.style.left = left + 'px';
        element.style.top = top + 'px';
        this._testStyles();
      }
    }, {
      key: 'shouldStateBeChanged',
      value: function shouldStateBeChanged(state) {
        return (state === 'shown' || state === 'hidden') && state !== (this.element.classList.contains(this.options.classShown) ? 'shown' : 'hidden');
      }
    }, {
      key: '_changeState',
      value: function _changeState(state, detail, callback) {
        var _this2 = this;

        var shown = state === 'shown';
        var _options2 = this.options,
            refNode = _options2.refNode,
            classShown = _options2.classShown,
            classRefShown = _options2.classRefShown;

        if (!refNode) {
          throw new TypeError('Cannot find the refernce node for changing the style.');
        }
        this.element.classList.toggle(classShown, shown);
        if (classRefShown) {
          refNode.classList.toggle(classRefShown, shown);
        }
        if (state === 'shown') {
          if (!this.hResize) {
            this.hResize = _resize2.default.add(function () {
              _this2._place();
            });
          }
          this._getContainer().appendChild(this.element);
          this._place();
          // IE11 puts focus on elements with `.focus()`, even ones without `tabindex` attribute
          if (!this.element.hasAttribute(this.options.attribAvoidFocusOnOpen)) {
            (this.element.querySelector(this.options.selectorPrimaryFocus) || this.element).focus();
          }
        }
        if (state === 'hidden' && this.hResize) {
          this.hResize.release();
          this.hResize = null;
        }
        callback();
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.hResize) {
          this.hResize.release();
          this.hResize = null;
        }
        _get(FloatingMenu.prototype.__proto__ || Object.getPrototypeOf(FloatingMenu.prototype), 'release', this).call(this);
      }
    }]);

    return FloatingMenu;
  }((0, _mixin3.default)(_createComponent2.default, _eventedShowHideState2.default, _trackBlur2.default));

  FloatingMenu.options = {
    selectorContainer: '[data-floating-menu-container]',
    selectorPrimaryFocus: '[data-floating-menu-primary-focus]',
    attribDirection: 'data-floating-menu-direction',
    attribAvoidFocusOnOpen: 'data-avoid-focus-on-open',
    classShown: '', // Should be provided from options arg in constructor
    classRefShown: '', // Should be provided from options arg in constructor
    eventBeforeShown: 'floating-menu-beingshown',
    eventAfterShown: 'floating-menu-shown',
    eventBeforeHidden: 'floating-menu-beinghidden',
    eventAfterHidden: 'floating-menu-hidden',
    refNode: null, // Should be provided from options arg in constructor
    offset: {
      left: 0,
      top: 0
    }
  };
  FloatingMenu.components = new WeakMap();
  exports.default = FloatingMenu;
});