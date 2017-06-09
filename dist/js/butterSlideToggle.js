
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function (jQuery) {
      return (root.ButterSlideToggle = factory(jQuery));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    root.ButterSlideToggle = factory(root.jQuery);
  }
}(this, function ($) {
  //use jQuery in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, ButterSlideToggle.defaults, options);
    this._collapsed = this.options.beginCollapsed;

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
          $baseEl = $(this.element),
          options = this.options;

      $baseEl.wrap('<div class="butter-slide-wrap ' + options.transitionClass + '" />');
      $wrap = $baseEl.parent();
      this.$wrap = $wrap;

      $wrap.css({
        'overflow': 'hidden'
      });

      if (this.isCollapsed()) {
        $wrap.attr('aria-hidden', true);
        $wrap.attr('aria-expanded', false);
        $wrap.css('max-height', 0);
      } else {
        this._collapsed = false;
        $wrap.attr('aria-expanded', true);
        $wrap.attr('aria-hidden', false);
      }

      this._bindAnimationEndListener();
    }
  }, {
    key: '_bindAnimationEndListener',
    value: function _bindAnimationEndListener() {
      var $wrap = this.$wrap,
          $element = this.$element,
          thisClass = this;
      $wrap.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function (e) {
        if (!thisClass._collapsed) {
          $wrap.css('max-height', 9999);
          // @TODO: this is getting triggered twice, but it's unclear
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
          $element = this.$element,
          height = $wrap.outerHeight(),
          innerHeight = $(this.element).outerHeight(),
          thisClass = this;

      if (thisClass._collapsed) {
        // If closed, add inner height to content height
        // TODO: determine if this is the right thing to do, adding both heights together, could this cause lag in accordion? for instance
        $element.trigger('butterToggle.openStart');
        $wrap.css('max-height', innerHeight + height);
        thisClass._collapsed = false;
        $wrap.attr('aria-expanded', true);
        $wrap.attr('aria-hidden', false);
      } else {
        $element.trigger('butterToggle.closeStart');
        // Disable transitions & set max-height to content height
        $wrap.removeClass('butter-slide-toggle-transition').css('max-height', height);

        // @TODO: think about implmentation, this will return true ONLY when closed, not turing transition,
        // if the following are pulled out of the timeout we need to cancel the timeout
        setTimeout(function () {
          // Enable & start transitions
          // 10ms timeout is necessary to make this work across browsers
          thisClass._collapsed = true;
          $wrap.attr('aria-hidden', true);
          $wrap.attr('aria-expanded', false);
          $wrap.addClass('butter-slide-toggle-transition').css('max-height', 0);
        }, 10);
      }
    }

    /**
     * Public method to access state of the toggle
     */

  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this._collapsed;
    }
  }]);

  return ButterSlideToggle;
}();

// Bind to window
// window.ButterSlideToggle = ButterSlideToggle;

ButterSlideToggle.defaults = {
  /**
   * Tells the plugin the length of the animation.
   * @option
   * @type {string}
   * @default butter-slide-toggle-transition
   */
  transitionClass: 'butter-slide-toggle-transition',

  /**
   * Determines if the toggle content should begin expanded or collapsed.
   * @option
   * @type {bool}
   * @default false
   */
  beginCollapsed: false
};
return ButterSlideToggle;}));