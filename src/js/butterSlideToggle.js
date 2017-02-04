'use strict';

!function($) {
  /**
   * ButterSlideToggle module.
   */
  class ButterSlideToggle {
    /**
     * Creates a new instance of ButterSlideToggle.
     * @class
     * @fires ButterSlideToggle#init
     * @param {Object} element - DOM element to initialize as a toggleable element.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    constructor(element, options = {}) {
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
    _init() {
      let $wrap,
          baseEl = this.element,
          $baseEl = $(this.element),
          options = this.options;

      $baseEl.wrap(`<div class="butter-slide-wrap ${options.transitionClass}" />`);
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

    _bindAnimationEndListener() {
      let $wrap = this.$wrap,
          $element = this.$element;
      $wrap.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function(e) {
        if (!$.data($wrap[0], 'collapsed')) {
          console.log(e);
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
    toggle() {
      let $wrap = this.$wrap,
          wrap = $wrap[0],
          height = $wrap.outerHeight(),
          innerHeight = $(this.element).outerHeight(),
          settings = this.options;
      if ($.data(wrap, 'collapsed')) {
        // If closed, add inner height to content height
        $.data(wrap, 'collapsed', false);
        $wrap.css('max-height', innerHeight + height);
      } else {
        // Disable transitions & set max-height to content height
        $wrap.removeClass('butter-slide-toggle-transition').css('max-height', height);

        setTimeout(function() {
          // Enable & start transitions
          // 10ms timeout is necessary to make this work across browsers
          $.data(wrap, 'collapsed', true);
          $wrap.addClass('butter-slide-toggle-transition').css('max-height', 0);
        }, 10);
      }
    }
  }

  // Bind to window
  window.ButterSlideToggle = ButterSlideToggle;

  ButterSlideToggle.defaults = {
    /**
     * Tells the plugin the length of the animation.
     * @option
     * @type {string}
     * @default butter-slide-toggle-transition
     */
    transitionClass: 'butter-slide-toggle-transition'
  };

}(jQuery);