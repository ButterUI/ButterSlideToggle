
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
      this._collapsed = this.options.beginCollapsed;

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

      if (this.isCollapsed()) {
        $wrap.attr('aria-hidden', true);
        $wrap.attr('aria-expanded', false);
        $wrap.css({
          maxHeight: 0,
          visibility: 'hidden'
        });
      } else {
        this._collapsed = false;
        $wrap.attr('aria-expanded', true);
        $wrap.attr('aria-hidden', false);
        $wrap.css({visibility: 'visible'});
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
    toggle() {
      let $wrap = this.$wrap,
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
        $wrap.css({
          maxHeight: innerHeight + height,
          visibility: 'visible'
        });
      } else {
        $element.trigger('butterToggle.closeStart');
        // Disable transitions & set max-height to content height
        $wrap.removeClass('butter-slide-toggle-transition').css('max-height', height);

        // Skip an animation frame to ensure that max-height is applied in all browsers.
        this.skipFrame(() => {
          thisClass._collapsed = true;
          $wrap.attr('aria-hidden', true);
          $wrap.attr('aria-expanded', false);
          $wrap.addClass('butter-slide-toggle-transition').css({
            maxHeight: 0,
            visibility: 'hidden'
          });
        });
      }
    }

    /**
     * Get the animation frame after the next animation frame.
     * @param callback
     */
    skipFrame(callback) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(callback);
      });
    }

    /**
     * Public method to access state of the toggle
     */
    isCollapsed() {
      return this._collapsed;
    }
  }

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

