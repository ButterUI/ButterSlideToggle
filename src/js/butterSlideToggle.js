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
      this._collapsed = false;

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
        this._collapsed = true;
        $wrap.attr('aria-expanded', false);
      } else {
        this._collapsed = false;
        $wrap.attr('aria-expanded', true);
      }

      this._bindAnimationEndListener();
    }

    _bindAnimationEndListener() {
      let $wrap = this.$wrap,
          $element = this.$element,
          thisClass = this;
      $wrap.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function(e) {
        if (!thisClass._collapsed) {
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
          settings = this.options,
          thisClass = this;

      if (thisClass._collapsed) {
        // If closed, add inner height to content height
        thisClass._collapsed = false;
        $wrap.attr('aria-expanded', true);
        // TODO: determine if this is the right thing to do, adding both heights together, could this cause lag in accordion? for instance
        $wrap.css('max-height', innerHeight + height);
      } else {
        // Disable transitions & set max-height to content height
        $wrap.removeClass('butter-slide-toggle-transition').css('max-height', height);

        setTimeout(function() {
          // Enable & start transitions
          // 10ms timeout is necessary to make this work across browsers
          thisClass._collapsed = true;
          $wrap.attr('aria-expanded', false);
          $wrap.addClass('butter-slide-toggle-transition').css('max-height', 0);
        }, 10);
      }
    }

    /**
     * Public method to access state of the toggle
     * TODO: this doesn't seem to properly return the state of the _collapsed property, but the above code works to toggle
     */
    isCollapsed() {
      return this._collapsed;
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