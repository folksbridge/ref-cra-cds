var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

var Lightbox = function (_mixin) {
  _inherits(Lightbox, _mixin);

  function Lightbox(element, options) {
    _classCallCheck(this, Lightbox);

    var _this = _possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call(this, element, options));

    _this.showLightbox = function (evt) {
      if (!evt.detail.launchingElement.dataset.carouselItemIndex) {
        throw new Error('launchingElement must have carouselItemIndex data attribute to indicated what item to display');
      }
      _this.activeIndex = evt.detail.launchingElement.dataset.carouselItemIndex;
      _this.updateSlide();
    };

    _this.handleClick = function (evt) {
      if (evt.target.matches(_this.options.selectorScrollRight)) {
        if (_this.activeIndex < _this.totalSlides) {
          _this.activeIndex++;
          _this.updateSlide();
        }
      }

      if (evt.target.matches(_this.options.selectorScrollLeft)) {
        if (_this.activeIndex > 0) {
          _this.activeIndex--;
          _this.updateSlide();
        }
      }
    };

    _this.updateSlide = function () {
      var items = [].concat(_toConsumableArray(_this.element.querySelectorAll(_this.options.selectorLightboxItem)));
      if (_this.activeIndex < 0 || _this.activeIndex >= items.length) {
        throw new RangeError('carouselItemIndex data attribute must be in range of lightbox items length');
      }
      items.forEach(function (item) {
        return item.classList.remove(_this.options.classActiveItem);
      });
      items[_this.activeIndex].classList.add(_this.options.classActiveItem);
    };

    _this.activeIndex = _this.element.dataset.lightboxIndex;
    _this.totalSlides = _this.element.querySelectorAll(_this.options.selectorLightboxItem).length - 1;

    _this.updateSlide();

    _this.element.addEventListener('click', function (evt) {
      return _this.handleClick(evt);
    });
    _this.element.parentNode.addEventListener('modal-beingshown', function (evt) {
      return _this.showLightbox(evt);
    });
    return _this;
  }

  _createClass(Lightbox, null, [{
    key: 'options',
    get: function get() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-lightbox]',
        selectorScrollRight: '[data-scroll-right]',
        selectorScrollLeft: '[data-scroll-left]',
        selectorLightboxItem: '.' + prefix + '--lightbox__item',
        classActiveItem: prefix + '--lightbox__item--shown'
      };
    }

    /**
     * The map associating DOM element and accordion UI instance.
     * @type {WeakMap}
     */

  }]);

  return Lightbox;
}(mixin(createComponent, initComponentBySearch));

Lightbox.components = new WeakMap();


export default Lightbox;