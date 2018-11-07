(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("butter-slide-toggle", [], factory);
	else if(typeof exports === 'object')
		exports["butter-slide-toggle"] = factory();
	else
		root["butter-slide-toggle"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ButterSlideToggle.js":
/*!*************************************!*\
  !*** ./src/js/ButterSlideToggle.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ButterSlideToggle =
/*#__PURE__*/
function () {
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
    this.options = Object.assign({}, ButterSlideToggle.defaults, options);
    this._collapsed = this.options.beginCollapsed;
    this._events = {};
    this.events = ['openStart', 'opened', 'closed'];

    this._init();
  }
  /**
   * Initializes the ButterSlideToggle plugin.
   * @function
   * @private
   */


  _createClass(ButterSlideToggle, [{
    key: "_init",
    value: function _init() {
      var baseEl = this.element,
          options = this.options;
      var createdWrapper = document.createElement('div');
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

  }, {
    key: "_bindAnimationEndListener",
    value: function _bindAnimationEndListener() {
      var _this = this;

      var element = this.element,
          wrap = element.parentNode,
          thisClass = this;
      ['transitionend'].forEach(function (eventName) {
        wrap.addEventListener(eventName, function (e) {
          if (e.propertyName === 'max-height') {
            if (!thisClass._collapsed) {
              wrap.style.maxHeight = '9999px'; // @TODO: this is getting triggered twice, but it's unclear

              _this.triggerEvent(element, 'opened');
            } else {
              _this.triggerEvent(element, 'closed');
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

  }, {
    key: "toggle",
    value: function toggle() {
      var element = this.element,
          wrap = element.parentNode,
          height = this.getAbsoluteHeight(wrap),
          innerHeight = this.getAbsoluteHeight(element),
          thisClass = this; // console.log('is collapsed: ' + thisClass._collapsed);
      // console.log('visible height: ' + height);
      // console.log('inner height: ' + innerHeight);

      if (thisClass._collapsed) {
        // If closed, add inner height to content height
        // TODO: determine if this is the right thing to do,
        // adding both heights together, could this cause lag in accordion? for instance
        this.triggerEvent(element, 'openStart'); // wrap.setAttribute('style', `max-height: ${innerHeight + height}; visibility: visible`);

        wrap.style.maxHeight = innerHeight + height + 'px';
        wrap.style.visibility = 'visible';
        thisClass._collapsed = false;
        wrap.setAttribute('aria-expanded', true);
        wrap.setAttribute('aria-hidden', false);
      } else {
        this.triggerEvent(element, 'closeStart'); // Disable transitions & set max-height to content height

        wrap.classList.remove('butter-slide-toggle-transition'); // wrap.setAttribute('style', `max-height: ${height}`);

        wrap.style.maxHeight = height + 'px'; // Skip an animation frame to ensure that max-height is applied in all browsers.

        this.skipFrame(function () {
          thisClass._collapsed = true;
          wrap.setAttribute('aria-hidden', true);
          wrap.setAttribute('aria-expanded', false);
          wrap.classList.add('butter-slide-toggle-transition'); // wrap.setAttribute('style', 'max-height: 0; visibility: hidden;');

          wrap.style.maxHeight = '0px';
          wrap.style.visibility = 'hidden';
        });
      }
    }
    /**
     * Get the animation frame after the next animation frame.
     * @param callback
     */

  }, {
    key: "skipFrame",
    value: function skipFrame(callback) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(callback);
      });
    }
    /**
     * Public method to access state of the toggle
     */

  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      return this._collapsed;
    }
  }, {
    key: "createEvents",
    value: function createEvents() {
      var _this2 = this;

      this.events.forEach(function (event) {
        _this2._events[event] = new Event("butterToggle.".concat(event));
      });
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(el, eventName) {
      var events = this._events;

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

  }, {
    key: "getAbsoluteHeight",
    value: function getAbsoluteHeight(el) {
      // Get the DOM Node if you pass in a string
      el = typeof el === 'string' ? document.querySelector(el) : el;

      if (el.nodeType === Node.ELEMENT_NODE) {
        var styles = window.getComputedStyle(el);
        var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        return Math.ceil(el.offsetHeight + margin);
      }

      return null;
    }
  }, {
    key: "wrapElement",
    value: function wrapElement(el, wrapper) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      return wrapper;
    }
  }, {
    key: "wrapContents",
    value: function wrapContents(el, wrapper) {
      el.prepend(wrapper);

      while (wrapper.nextSibling) {
        wrapper.append(wrapper.nextSibling);
      }

      return wrapper;
    }
  }]);

  return ButterSlideToggle;
}();

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
/* harmony default export */ __webpack_exports__["default"] = (ButterSlideToggle);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ButterSlideToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButterSlideToggle */ "./src/js/ButterSlideToggle.js");

window.ButterSlideToggle = _ButterSlideToggle__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_ButterSlideToggle__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "../../dist/css/butter-slide-toggle.css";

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/index.js ./src/scss/style.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/anthonysimone/Sites/sandbox/butter-ui/ButterSlideToggle/src/js/index.js */"./src/js/index.js");
module.exports = __webpack_require__(/*! /Users/anthonysimone/Sites/sandbox/butter-ui/ButterSlideToggle/src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });
});
//# sourceMappingURL=butter-slide-toggle.js.map