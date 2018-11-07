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
    this.options = Object.assign({}, ButterSlideToggle.defaults, options);
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

    let createdWrapper = document.createElement('div');

    this.wrapElement(baseEl, createdWrapper);
    createdWrapper.classList.add('butter-slide-wrap', options.transitionClass);
    createdWrapper.style.overflow = 'hidden';

    this.createEvents();

    if (this.isCollapsed()) {
      createdWrapper.setAttribute('aria-hidden', true);
      createdWrapper.setAttribute('aria-expanded', false);
      createdWrapper.style.maxHeight = '0px';
      createdWrapper.style.visibility = 'hidden';
    } else {
      this._collapsed = false;
      createdWrapper.setAttribute('aria-expanded', true);
      createdWrapper.setAttribute('aria-hidden', false);
      createdWrapper.style.visibility = 'visible';
    }

    this.inner = baseEl.innerHTML;
    this._bindAnimationEndListener();
  }

  /**
   * Attaches the animation listener for the toggle.
   * @function
   * @private
   */
  _bindAnimationEndListener() {
    let element = this.element,
      wrap = element.parentNode,
      thisClass = this;

    ['transitionend'].forEach((eventName) => {
      wrap.addEventListener(eventName, (e) => {
        if (e.propertyName === 'max-height') {
          if (!thisClass._collapsed) {
            wrap.style.maxHeight = '9999px';
            // @TODO: this is getting triggered twice, but it's unclear
            this.triggerEvent(element, 'opened');
          } else {
            this.triggerEvent(element, 'closed');
          }
        }
      }, false);
    });
  }

  /**
   * Toggles the target class on the target element. An event is fired from the
   * original trigger depending on if the resultant state was "on" or "off".
   * @function
   */
  toggle() {
    let element = this.element,
      wrap = element.parentNode,
      height = this.getAbsoluteHeight(wrap),
      innerHeight = this.getAbsoluteHeight(element),
      thisClass = this;

    // console.log('is collapsed: ' + thisClass._collapsed);
    // console.log('visible height: ' + height);
    // console.log('inner height: ' + innerHeight);

    if (thisClass._collapsed) {
      // If closed, add inner height to content height
      // TODO: determine if this is the right thing to do,
      // adding both heights together, could this cause lag in accordion? for instance
      this.triggerEvent(element, 'openStart');
      // wrap.setAttribute('style', `max-height: ${innerHeight + height}; visibility: visible`);
      wrap.style.maxHeight = innerHeight + height + 'px';
      wrap.style.visibility = 'visible';
      thisClass._collapsed = false;
      wrap.setAttribute('aria-expanded', true);
      wrap.setAttribute('aria-hidden', false);
    } else {
      this.triggerEvent(element, 'closeStart');
      // Disable transitions & set max-height to content height
      wrap.classList.remove('butter-slide-toggle-transition');
      // wrap.setAttribute('style', `max-height: ${height}`);
      wrap.style.maxHeight = height + 'px';

      // Skip an animation frame to ensure that max-height is applied in all browsers.
      this.skipFrame(() => {
        thisClass._collapsed = true;
        wrap.setAttribute('aria-hidden', true);
        wrap.setAttribute('aria-expanded', false);
        wrap.classList.add('butter-slide-toggle-transition');
        // wrap.setAttribute('style', 'max-height: 0; visibility: hidden;');
        wrap.style.maxHeight = '0px';
        wrap.style.visibility = 'hidden';
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

  wrapElement(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    return wrapper;
  }

  wrapContents(el, wrapper) {
    el.prepend(wrapper);
    while (wrapper.nextSibling) {
      wrapper.append(wrapper.nextSibling);
    }

    return wrapper;
  }
}

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
