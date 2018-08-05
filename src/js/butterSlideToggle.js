
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
    this.options = $.extend({}, ButterSlideToggle.defaults, options);
    this._collapsed = this.options.beginCollapsed;
    this._events = {};
    this.events = [
      'openStart',
      'opened',
      'closed'
    ];

    this._init();
  }

  /**
   * Initializes the ButterSlideToggle plugin.
   * @function
   * @private
   */
  _init() {
    let baseEl = this.element,
      options = this.options;

    // wrap = this.wrapElement(baseEl, 'div');
    let toggleChildren = baseEl.innerHTML;
    baseEl.innerHTML = `<div class="butter-slide-inner">${toggleChildren}</div>`;
    baseEl.classList.add('butter-slide-wrap');
    baseEl.classList.add(options.transitionClass);
    baseEl.setAttribute('style', 'overflow: hidden;');

    this.createEvents();

    if (this.isCollapsed()) {
      baseEl.setAttribute('aria-hidden', true);
      baseEl.setAttribute('aria-expanded', false);
      baseEl.setAttribute('style', 'max-height: 0; visibility: hidden');
    } else {
      this._collapsed = false;
      baseEl.setAttribute('aria-expanded', true);
      baseEl.setAttribute('aria-hidden', false);
      baseEl.setAttribute('style','visibility: visible');
    }

    this.inner = baseEl.children;
    this._bindAnimationEndListener();
  }

  _bindAnimationEndListener() {
    let wrap = this.element,
      element = this.inner,
      thisClass = this;

    [
      'transitionEnd',
      'webkitTransitionEnd',
      'transitionend',
      'oTransitionEnd',
      'msTransitionEnd'
    ].forEach((eventName) => {
      wrap.addEventListener(eventName, (e) => {
        if (!thisClass._collapsed) {
          element.setAttribute('style', 'max-height: 9999px;');
          // @TODO: this is getting triggered twice, but it's unclear
          this.triggerEvent(wrap, 'opened');
        } else {
          this.triggerEvent(wrap, 'closed');
        }
      }, false);
    });
  }

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   */
  toggle() {
    let wrap = this.element,
      element = this.inner,
      height = this.getAbsoluteHeight(wrap),
      innerHeight = this.getAbsoluteHeight(element),
      thisClass = this;


    if (thisClass._collapsed) {
      // If closed, add inner height to content height
      // TODO: determine if this is the right thing to do, adding both heights together, could this cause lag in accordion? for instance
      this.triggerEvent(wrap, 'openStart');
      element.setAttribute('style', `max-height: ${innerHeight + height}; visibility: visible`);
      thisClass._collapsed = false;
      element.setAttribute('aria-expanded', true);
      element.setAttribute('aria-hidden', false);
    } else {
      this.triggerEvent(wrap, 'closeStart');
      // Disable transitions & set max-height to content height
      element.classList.remove('butter-slide-toggle-transition');
      element.setAttribute('style', `max-height: ${height}`);

      // Skip an animation frame to ensure that max-height is applied in all browsers.
      this.skipFrame(() => {
        thisClass._collapsed = true;
        element.setAttribute('aria-hidden', true);
        element.setAttribute('aria-expanded', false);
        element.classList.add('butter-slide-toggle-transition');
        element.setAttribute('style', `max-height: 0; visibility: hidden`);
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

  createEvents() {
    this.events.forEach((event) => {
      this._events[event] = new Event(`butterToggle.${event}`);
    });
  }

  triggerEvent(el, eventName) {
    let events = this._events;
    if (events[eventName]) {
      el.dispatchEvent(events[eventName]);
    }
  }

  /**
   * Get the absolute height of an element. Similar to jQuery .outerHeight().
   * Source: https://stackoverflow.com/a/23749355/4091860
   * @param el
   * @returns {number}
   */
  getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    if (el.nodeType === Node.ELEMENT_NODE) {
      let styles = window.getComputedStyle(el);
      let margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);

      return Math.ceil(el.offsetHeight + margin);
    }
    return null;
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

export default ButterSlideToggle;
