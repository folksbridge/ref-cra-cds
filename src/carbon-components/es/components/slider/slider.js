var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

var Slider = function (_mixin) {
  _inherits(Slider, _mixin);

  /**
   * Slider.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an slider.
   */
  function Slider(element, options) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, element, options));

    _this._changeState = function (state, detail, callback) {
      callback();
    };

    _this.sliderActive = false;
    _this.dragging = false;

    _this.track = _this.element.querySelector(_this.options.selectorTrack);
    _this.filledTrack = _this.element.querySelector(_this.options.selectorFilledTrack);
    _this.thumb = _this.element.querySelector(_this.options.selectorThumb);
    _this.input = _this.element.querySelector(_this.options.selectorInput);

    if (_this.element.dataset.sliderInputBox) {
      _this.boundInput = _this.element.ownerDocument.querySelector(_this.element.dataset.sliderInputBox);
      _this._updateInput();
      _this.manage(on(_this.boundInput, 'change', function (evt) {
        _this.setValue(evt.target.value);
      }));
      _this.manage(on(_this.boundInput, 'focus', function (evt) {
        evt.target.select();
      }));
      // workaround for safari
      _this.manage(on(_this.boundInput, 'mouseup', function (evt) {
        evt.preventDefault();
      }));
    }

    _this._updatePosition();

    _this.manage(on(_this.thumb, 'mousedown', function () {
      _this.sliderActive = true;
    }));
    _this.manage(on(_this.element.ownerDocument, 'mouseup', function () {
      _this.sliderActive = false;
    }));
    _this.manage(on(_this.element.ownerDocument, 'mousemove', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (_this.sliderActive === true && !disabled) {
        _this._updatePosition(evt);
      }
    }));
    _this.manage(on(_this.thumb, 'keydown', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (!disabled) {
        _this._updatePosition(evt);
      }
    }));
    _this.manage(on(_this.track, 'click', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (!disabled) {
        _this._updatePosition(evt);
      }
    }));
    return _this;
  }

  _createClass(Slider, [{
    key: '_updatePosition',
    value: function _updatePosition(evt) {
      var _this2 = this;

      var _calcValue2 = this._calcValue(evt),
          left = _calcValue2.left,
          newValue = _calcValue2.newValue;

      if (this.dragging) {
        return;
      }

      this.dragging = true;

      requestAnimationFrame(function () {
        _this2.dragging = false;
        _this2.thumb.style.left = left + '%';
        _this2.filledTrack.style.transform = 'translate(0%, -50%) scaleX(' + left / 100 + ')';
        _this2.input.value = newValue;
        _this2._updateInput();
        _this2.changeState('slider-value-change', { value: newValue });
      });
    }
  }, {
    key: '_calcValue',
    value: function _calcValue(evt) {
      var _getInputProps = this.getInputProps(),
          value = _getInputProps.value,
          min = _getInputProps.min,
          max = _getInputProps.max,
          step = _getInputProps.step;

      var range = max - min;
      var valuePercentage = (value - min) / range * 100;

      var left = void 0;
      var newValue = void 0;
      left = valuePercentage;
      newValue = value;

      if (evt) {
        var type = evt.type;


        if (type === 'keydown') {
          var direction = {
            40: -1, // decreasing
            37: -1, // decreasing
            38: 1, // increasing
            39: 1 // increasing
          }[evt.which];

          if (direction !== undefined) {
            var multiplier = evt.shiftKey === true ? range / step / this.options.stepMultiplier : 1;
            var stepMultiplied = step * multiplier;
            var stepSize = stepMultiplied / range * 100;
            left = valuePercentage + stepSize * direction;
            newValue = Number(value) + stepMultiplied * direction;
          }
        }
        if (type === 'mousemove' || type === 'click') {
          if (type === 'click') {
            this.element.querySelector(this.options.selectorThumb).classList.add(this.options.classThumbClicked);
          } else {
            this.element.querySelector(this.options.selectorThumb).classList.remove(this.options.classThumbClicked);
          }

          var track = this.track.getBoundingClientRect();
          var unrounded = (evt.clientX - track.left) / track.width;
          var rounded = Math.round(range * unrounded / step) * step;
          left = rounded / range * 100;
          newValue = rounded + min;
        }
      }

      if (newValue <= Number(min)) {
        left = 0;
        newValue = min;
      }
      if (newValue >= Number(max)) {
        left = 100;
        newValue = max;
      }

      return { left: left, newValue: newValue };
    }
  }, {
    key: '_updateInput',
    value: function _updateInput() {
      if (this.boundInput) {
        this.boundInput.value = this.input.value;
      }
    }
  }, {
    key: 'getInputProps',
    value: function getInputProps() {
      var values = {
        value: Number(this.input.value),
        min: Number(this.input.min),
        max: Number(this.input.max),
        step: this.input.step ? Number(this.input.step) : 1
      };
      return values;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.input.value = value;
      this._updatePosition();
    }
  }, {
    key: 'stepUp',
    value: function stepUp() {
      this.input.stepUp();
      this._updatePosition();
    }
  }, {
    key: 'stepDown',
    value: function stepDown() {
      this.input.stepDown();
      this._updatePosition();
    }

    /**
     * The map associating DOM element and Slider UI instance.
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * properties in this object are overriden for the instance being created.
     * @property {string} selectorInit The CSS selector to find slider instances.
     */
    get: function get() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-slider]',
        selectorTrack: '.' + prefix + '--slider__track',
        selectorFilledTrack: '.' + prefix + '--slider__filled-track',
        selectorThumb: '.' + prefix + '--slider__thumb',
        selectorInput: '.' + prefix + '--slider__input',
        classDisabled: prefix + '--slider--disabled',
        classThumbClicked: prefix + '--slider__thumb--clicked',
        eventBeforeSliderValueChange: 'slider-before-value-change',
        eventAfterSliderValueChange: 'slider-after-value-change',
        stepMultiplier: 4
      };
    }
  }]);

  return Slider;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

Slider.components = new WeakMap();


export default Slider;