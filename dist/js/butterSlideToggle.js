'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {
  /**
   * ButterSlideToggle module.
   */
  var ButterSlideToggle = function () {
    /**
     * Creates a new instance of ButterSlideToggle.
     * @class
     * @fires ButterSlideToggle#init
     * @param {Object} element - DOM element to initialize as a toggleable element.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function ButterSlideToggle(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ButterSlideToggle);

      console.log('constructor');
      this.element = element;
      this.$element = $(element);
      this.options = $.extend({}, ButterSlideToggle.defaults, options);

      this._init();
    }

    /**
     * Initializes the ButterSlideToggle plugin.
     * @function
     * @private
     */


    _createClass(ButterSlideToggle, [{
      key: '_init',
      value: function _init() {
        var $wrap = void 0,
            baseEl = this.element,
            $baseEl = $(this.element);

        $baseEl.wrap('<div class="better-slide-wrap" />');
        $wrap = $baseEl.parent();
        this.$wrap = $wrap;

        $wrap.css({
          'overflow': 'hidden'
        });

        if ($baseEl.css('max-height') === '0') {
          // If max-height is 0, we assume start collapsed, may refactor to something else
          $.data($wrap[0], 'collapsed', true);
        } else {
          $.data($wrap[0], 'collapsed', false);
        }

        this._bindAnimationEndListener();
      }
    }, {
      key: '_bindAnimationEndListener',
      value: function _bindAnimationEndListener() {
        var $wrap = this.$wrap,
            $element = this.$element;
        $wrap.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function () {
          if (!$.data($wrap[0], 'collapsed')) {
            $wrap.css('max-height', 9999);
            $element.trigger('butterToggle.opened');
          } else {
            $element.trigger('butterToggle.closed');
          }
        });
      }

      /**
       * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
       * @function
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        var $wrap = this.$wrap,
            wrap = $wrap[0],
            height = $wrap.outerHeight(),
            innerHeight = $(this.element).outerHeight(),
            settings = this.options;

        if ($.data(wrap, 'collapsed')) {
          // If closed, add inner height to content height
          $.data(wrap, 'collapsed', false);
          $wrap.css('max-height', innerHeight + height);
        } else {
          // Disable transitions (!important required to inline this) & set max-height to content height
          $wrap.css('transition', 'none !important').css('max-height', height);

          setTimeout(function () {
            // Enable & start transitions
            // 10ms timeout is necessary to make this work across browsers
            $.data(wrap, 'collapsed', true);
            $wrap.css('transition', settings.slideSpeed + 'ms max-height').css('max-height', 0);
          }, 10);
        }
      }
    }]);

    return ButterSlideToggle;
  }();

  // Bind to window


  window.ButterSlideToggle = ButterSlideToggle;

  ButterSlideToggle.defaults = {
    /**
     * Tells the plugin the length of the animation.
     * @option
     * @type {number}
     * @default 500
     */
    slideSpeed: 4000
  };
}(jQuery);