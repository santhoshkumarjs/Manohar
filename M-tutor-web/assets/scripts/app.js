(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _environment = require('assets/scripts/utils/environment');

var _html = require('assets/scripts/utils/html');

var _globals = require('assets/scripts/utils/globals');

var _globals2 = _interopRequireDefault(_globals);

var _modules = require('assets/scripts/modules');

var modules = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


// Global functions and tools


// Basic modules


var App = function () {
	function App() {
		var _this = this;

		_classCallCheck(this, App);

		this.modules = modules;
		this.currentModules = [];

		_environment.$document.on('initModules.App', function (event) {
			_this.initGlobals(event.firstBlood).deleteModules().initModules();
		});
	}

	/**
  * Destroy all existing modules
  * @return  {Object}  this  Allows chaining
  */


	App.prototype.deleteModules = function deleteModules() {
		// oop modules
		var i = this.currentModules.length;

		// Destroy all modules
		while (i--) {
			this.currentModules[i].destroy();
			this.currentModules.splice(i);
		}

		return this;
	};

	/**
  * Execute global functions and settings
  * Allows you to initialize global modules only once if you need
  * (ex.: when using Barba.js or SmoothState.js)
  * @return  {Object}  this  Allows chaining
  */


	App.prototype.initGlobals = function initGlobals(firstBlood) {
		(0, _globals2.default)(firstBlood);
		return this;
	};

	/**
  * Find modules and initialize them
  * @return  {Object}  this  Allows chaining
  */


	App.prototype.initModules = function initModules(scope) {
		if (!scope) {
			scope = document;
		}
		// Elements with module
		var moduleEls = scope.querySelectorAll('[data-module]');

		// Loop through elements
		var i = 0;
		var elsLen = moduleEls.length;

		for (; i < elsLen; i++) {

			// Current element
			var el = moduleEls[i];

			// All data- attributes considered as options
			var options = (0, _html.getNodeData)(el);

			// Add current DOM element and jQuery element
			options.el = el;
			options.$el = $(el);

			// Module does exist at this point
			var attr = options.module;

			// Splitting modules found in the data-attribute
			var moduleIdents = attr.replace(/\s/g, '').split(',');

			// Loop modules
			var j = 0;
			var modulesLen = moduleIdents.length;

			for (; j < modulesLen; j++) {
				var moduleAttr = moduleIdents[j];

				if (typeof this.modules[moduleAttr] === 'function') {
					var module = new this.modules[moduleAttr](options);
					this.currentModules.push(module);
				}
			}
		}

		return this;
	};

	return App;
}();

// IIFE for loading the application
// ==========================================================================


(function () {
	var loaded = false;
	var maxLoad = 3000;

	// On load
	// ==========================================================================
	_environment.$window.on('load', function () {
		if (!loaded) {
			loaded = true;
			load();
		}
	});

	// Maximum load
	// ==========================================================================
	setTimeout(function () {
		if (!loaded) {
			loaded = true;
			load();
		}
	}, maxLoad);

	// Load
	// ==========================================================================
	function load() {
		window.App = new App();
		_environment.$document.trigger({
			type: 'initModules.App',
			firstBlood: true
		});

		if (window.navigator.userAgent.match(/Edge/) || window.navigator.userAgent.match(/Trident/)) {
			_environment.$body.addClass('is-ie');
		}
	}

	if (window.matchMedia("(max-width: 1199px)").matches) {
		addLoadClass();
	} else if (window.matchMedia("(min-width: 1200px)").matches) {
		_environment.$document.on('SmoothScroll.isReady', function (event) {
			addLoadClass();
		});
	}

	function addLoadClass() {
		_environment.$body.addClass('is-loaded');

		setTimeout(function () {
			_environment.$body.addClass('is-animated');
		}, 600);
	}
})();

},{"assets/scripts/modules":5,"assets/scripts/utils/environment":35,"assets/scripts/utils/globals":36,"assets/scripts/utils/html":37}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.transitions = undefined;

var _environment = require('assets/scripts/utils/environment');

/**
 * List of Transitions
 */
var transitions = {
	mainTransition: {
		start: function start() {
			var _this = this;

			_environment.$body.removeClass('is-loaded is-animated has-nav-news-open');

			setTimeout(function () {
				_this.newContainerLoading.then(_this.finish.bind(_this));
			}, 600);
		},
		finish: function finish() {
			this.done();

			var $el = $(this.newContainer);
			var templateName = $el.data('template');
			_environment.$body.attr('data-template', templateName);

			//reinit modules
			var app = window.App;
			app.deleteModules();
			app.initModules();

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				_environment.$body.addClass('is-loaded');

				setTimeout(function () {
					_environment.$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
				_environment.$document.on('SmoothScroll.isReady', function (event) {
					_environment.$body.addClass('is-loaded');

					setTimeout(function () {
						_environment.$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	},
	navTransition: {
		start: function start() {
			var _this2 = this;

			_environment.$body.removeClass('is-loaded is-animated').addClass('is-loading');

			setTimeout(function () {
				_environment.$body.removeClass('has-nav-open');
			}, 60);

			setTimeout(function () {

				_this2.newContainerLoading.then(_this2.finish.bind(_this2));
			}, 800);
		},
		finish: function finish() {
			this.done();

			var $el = $(this.newContainer);
			var templateName = $el.data('template');
			_environment.$body.attr('data-template', templateName);

			//reinit modules
			var app = window.App;
			app.deleteModules();
			app.initModules();

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				_environment.$body.removeClass('is-loading');
				_environment.$body.addClass('is-loaded');

				setTimeout(function () {
					_environment.$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
				_environment.$document.on('SmoothScroll.isReady', function (event) {
					_environment.$body.removeClass('is-loading');
					_environment.$body.addClass('is-loaded');

					setTimeout(function () {
						_environment.$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	},
	sectionTransition: {
		start: function start() {
			var _this3 = this;

			// Scroll to top
			_environment.$document.trigger({
				type: 'SmoothScroll.goToTop'
			});

			this.oldHeader = $('.js-header-home');

			this.option = _environment.$body.attr('data-route-option');

			if (this.option === 'next-section') {
				this.oldHeader.addClass('is-prev');
			} else {
				this.oldHeader.addClass('is-next');
			}

			_environment.$body.addClass('is-loading');
			_environment.$body.removeClass('is-loaded');

			setTimeout(function () {
				_this3.newContainerLoading.then(_this3.finish.bind(_this3));
			}, 1200);
		},
		finish: function finish() {
			var _this4 = this;

			this.done();

			var $el = $(this.newContainer);
			this.newHeader = $('.js-header-home', $el);

			if (this.option === 'next-section') {
				this.newHeader.addClass('is-next-section');
			} else {
				this.newHeader.addClass('is-prev-section');
			}

			var templateName = $el.data('template');
			_environment.$body.attr('data-template', templateName);

			//reinit modules
			var app = window.App;
			app.deleteModules();
			app.initModules();

			setTimeout(function () {
				_this4.newHeader.removeClass('is-prev-section is-next-section');
			}, 300);

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				_environment.$body.removeClass('is-loading');
				_environment.$body.addClass('is-loaded');

				setTimeout(function () {
					_environment.$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
				_environment.$document.on('SmoothScroll.isReady', function (event) {
					_environment.$body.removeClass('is-loading');
					_environment.$body.addClass('is-loaded');

					setTimeout(function () {
						_environment.$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	}
};

exports.transitions = transitions;

},{"assets/scripts/utils/environment":35}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addDependency = addDependency;
exports.hasDependencies = hasDependencies;
exports.resolveDependency = resolveDependency;

var _is = require('assets/scripts/utils/is');

var _array = require('assets/scripts/utils/array');

var _environment = require('assets/scripts/utils/environment');

var DEPENDENCIES = []; /* jshint esnext: true */


var PREFIX = 'dependency-';

var UUID = 0;

function addDependency(source, target) {
	var ident = PREFIX + UUID++;

	DEPENDENCIES.push({
		ident: ident,
		target: target,
		source: source
	});

	return ident;
}

function hasDependencies(ident) {
	var deps = DEPENDENCIES.slice().filter(function (object) {
		if (object.target === ident) {
			return object;
		}
	});
	return deps.length > 0;
}

function resolveDependency(ident) {
	if (typeof ident === 'undefined' || ident === '') {
		console.warn('Need ident to resolve dependency.');
		return false;
	}

	var dependency = (0, _array.findByKeyValue)(DEPENDENCIES, 'ident', ident)[0];

	if (typeof dependency !== 'undefined') {
		var target = dependency.target;

		(0, _array.removeFromArray)(DEPENDENCIES, dependency);

		if (!hasDependencies(target)) {
			_environment.$document.trigger('resolveDependencies.' + target);
		}

		return true;
	} else {
		console.warn('Dependency could not be found');
		return false;
	}
}

},{"assets/scripts/utils/array":34,"assets/scripts/utils/environment":35,"assets/scripts/utils/is":38}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollTo = scrollTo;
/* jshint esnext: true */
var isAnimating = false;

var defaults = {
    easing: 'swing',
    headerOffset: 60,
    speed: 300
};

/**
 * scrollTo is a function that scrolls a container to an element's position within that controller
 * Uses jQuery's $.Deferred to allow using a callback on animation completion
 * @param   {object}  $element  A jQuery node
 * @param   {object}  options
 */
function scrollTo($element, options) {
    var deferred = $.Deferred();

    // Drop everything if this ain't a jQuery object
    if ($element instanceof jQuery && $element.length > 0) {

        // Merging options
        options = $.extend({}, defaults, typeof options !== 'undefined' ? options : {});

        // Prevents accumulation of animations
        if (isAnimating === false) {
            isAnimating = true;

            // Default container that we'll be scrolling
            var $container = $('html, body');
            var elementOffset = 0;

            // Testing container in options for jQuery-ness
            // If we're not using a custom container, we take the top document offset
            // If we are, we use the elements position relative to the container
            if (typeof options.$container !== 'undefined' && options.$container instanceof jQuery && options.$container.length > 0) {
                $container = options.$container;
                elementOffset = $element.position().top;
            } else {
                elementOffset = $element.offset().top;
            }

            $container.animate({
                scrollTop: elementOffset - options.headerOffset
            }, options.speed, options.easing, function () {
                isAnimating = false;
                deferred.resolve();
            });
        }
    }

    return deferred.promise();
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Nav = require('assets/scripts/modules/Nav');

Object.defineProperty(exports, 'Nav', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Nav).default;
  }
});

var _Dropdown = require('assets/scripts/modules/Dropdown');

Object.defineProperty(exports, 'Dropdown', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Dropdown).default;
  }
});

var _SliderHome = require('assets/scripts/modules/SliderHome');

Object.defineProperty(exports, 'SliderHome', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SliderHome).default;
  }
});

var _SliderPage = require('assets/scripts/modules/SliderPage');

Object.defineProperty(exports, 'SliderPage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SliderPage).default;
  }
});

var _SliderProject = require('assets/scripts/modules/SliderProject');

Object.defineProperty(exports, 'SliderProject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SliderProject).default;
  }
});

var _LightboxVideo = require('assets/scripts/modules/LightboxVideo');

Object.defineProperty(exports, 'LightboxVideo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LightboxVideo).default;
  }
});

var _HeaderPage = require('assets/scripts/modules/HeaderPage');

Object.defineProperty(exports, 'HeaderPage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HeaderPage).default;
  }
});

var _Carousel = require('assets/scripts/modules/Carousel');

Object.defineProperty(exports, 'Carousel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Carousel).default;
  }
});

var _CarouselTimer = require('assets/scripts/modules/CarouselTimer');

Object.defineProperty(exports, 'CarouselTimer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CarouselTimer).default;
  }
});

var _CarouselNews = require('assets/scripts/modules/CarouselNews');

Object.defineProperty(exports, 'CarouselNews', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CarouselNews).default;
  }
});

var _SmoothScrolling = require('assets/scripts/modules/SmoothScrolling');

Object.defineProperty(exports, 'SmoothScrolling', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SmoothScrolling).default;
  }
});

var _NavNews = require('assets/scripts/modules/NavNews');

Object.defineProperty(exports, 'NavNews', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NavNews).default;
  }
});

var _News = require('assets/scripts/modules/News');

Object.defineProperty(exports, 'News', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_News).default;
  }
});

var _LocationSwitcher = require('assets/scripts/modules/LocationSwitcher');

Object.defineProperty(exports, 'LocationSwitcher', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LocationSwitcher).default;
  }
});

var _Filters = require('assets/scripts/modules/Filters');

Object.defineProperty(exports, 'Filters', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Filters).default;
  }
});

var _ContactForm = require('assets/scripts/modules/ContactForm');

Object.defineProperty(exports, 'ContactForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ContactForm).default;
  }
});

var _PageTransitionsManager = require('assets/scripts/modules/PageTransitionsManager');

Object.defineProperty(exports, 'PageTransitionsManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageTransitionsManager).default;
  }
});

var _Search = require('assets/scripts/modules/Search');

Object.defineProperty(exports, 'Search', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Search).default;
  }
});

var _SimilarSwitcher = require('assets/scripts/modules/SimilarSwitcher');

Object.defineProperty(exports, 'SimilarSwitcher', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SimilarSwitcher).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"assets/scripts/modules/Carousel":8,"assets/scripts/modules/CarouselNews":9,"assets/scripts/modules/CarouselTimer":10,"assets/scripts/modules/ContactForm":11,"assets/scripts/modules/Dropdown":13,"assets/scripts/modules/Filters":14,"assets/scripts/modules/HeaderPage":16,"assets/scripts/modules/LightboxVideo":17,"assets/scripts/modules/LocationSwitcher":18,"assets/scripts/modules/Nav":20,"assets/scripts/modules/NavNews":21,"assets/scripts/modules/News":22,"assets/scripts/modules/PageTransitionsManager":23,"assets/scripts/modules/Search":24,"assets/scripts/modules/SimilarSwitcher":25,"assets/scripts/modules/SliderHome":26,"assets/scripts/modules/SliderPage":27,"assets/scripts/modules/SliderProject":28,"assets/scripts/modules/SmoothScrolling":29}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _environment = require('assets/scripts/utils/environment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


/**
 * Abstract module
 * Gives access to generic jQuery nodes
 */
var _class = function () {
	function _class(options) {
		_classCallCheck(this, _class);

		this.$document = _environment.$document;
		this.$window = _environment.$window;
		this.$html = _environment.$html;
		this.$body = _environment.$body;
		this.$el = options.$el;
		this.el = options.el;
	}

	_class.prototype.unescapeHTML = function unescapeHTML(string) {
		return string.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
	};

	return _class;
}();

exports.default = _class;

},{"assets/scripts/utils/environment":35}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$el.on('click.Button', function (event) {
			_this.$document.trigger('Title.changeLabel', [$(event.currentTarget).val()]);
		});
		return _this;
	}

	_class.prototype.destroy = function destroy() {
		this.$el.off('.Button');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.initSlick();
		return _this;
	}

	// Init slick
	// ==========================================================================


	_class.prototype.initSlick = function initSlick() {
		this.$el.slick({
			arrows: true,
			dots: false,
			speed: 600,
			cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
			prevArrow: '<button class="c-carousel_arrow -prev o-button -square -left" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Previous"><use xlink:href="assets/images/sprite.svg#arrow-prev"></use></svg></span></button>',
			nextArrow: '<button class="c-carousel_arrow -next o-button -square -right" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Next"><use xlink:href="assets/images/sprite.svg#arrow-next"></use></svg></span></button>'
		});
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.initSlick();
		return _this;
	}

	// Init slick
	// ==========================================================================


	_class.prototype.initSlick = function initSlick() {
		this.$el.slick({
			arrows: true,
			dots: false,
			speed: 600,
			cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
			prevArrow: '<button class="c-carousel_arrow -prev o-button -square -left" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Previous"><use xlink:href="assets/images/sprite.svg#arrow-prev"></use></svg></span></button>',
			nextArrow: '<button class="c-carousel_arrow -next o-button -square -right" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Next"><use xlink:href="assets/images/sprite.svg#arrow-next"></use></svg></span></button>',
			mobileFirst: true,
			responsive: [{
				breakpoint: 700,
				settings: {
					variableWidth: true
				}
			}]
		});
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.initSlick();
		return _this;
	}

	// Init slick
	// ==========================================================================


	_class.prototype.initSlick = function initSlick() {
		var _this2 = this;

		this.$el.slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 4000,
			dots: true,
			speed: 600,
			pauseOnHover: false,
			pauseOnFocus: false,
			infinite: true,
			fade: true,
			cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
			customPaging: function customPaging(slider, i) {
				i++;
				if (i === 1) {
					return '<button class="c-carousel_dot js-carousel-dot is-first" type="button"><span class="c-carousel_dot_label">0' + i + '</span><span class="c-carousel_dot_line"></span></button>';
				} else {
					return '<button class="c-carousel_dot js-carousel-dot" type="button"><span class="c-carousel_dot_label">0' + i + '</span><span class="c-carousel_dot_line"></span></button>';
				}
			}
		});

		this.$el.slick('slickPause');

		setTimeout(function () {
			_this2.$el.find('.js-carousel-dot.is-first').removeClass('is-first');
			_this2.$el.slick('slickPlay');
		}, 4000);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this2 = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this2.$inputs = _this2.$el.find(':input');
		_this2.inputSelectors = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		_this2.$panes = _this2.$el.find('.js-form-pane');
		_this2.$consent = _this2.$el.find('.js-form-consent');
		_this2.$consentLabel = _this2.$el.find('.js-form-consent-label');
		_this2.$consentError = _this2.$el.find('.js-form-consent-error');
		_this2.$consentError = _this2.$el.find('.js-form-consent-error');
		_this2.$formWrap = _this2.$el.find('.js-form-wrap');
		_this2.$formFeedback = _this2.$el.find('.js-form-feedback');
		_this2.currentPane = 0;

		_this2.updateTextFields();

		var _this = _this2;

		// Switch form panes
		// Simple switch between index 0 and 1 for now
		_this2.$el.on('click.ContactForm', '.js-switch-pane', function () {
			_this2.goToNextPane();
		});

		_this2.$el.on('click.ContactForm', '.js-submit', function () {
			_this2.$el.submit();
		});

		_this2.$el.on('submit.ContactForm', function (event) {
			event.preventDefault();

			if (_this.currentPane === 0) {
				_this.goToNextPane();
			} else {
				var data = $(this).serializeArray();
				_this.submitForm(event, data);
			}
		});

		// Add active if form auto complete
		_this2.$el.on('change.ContactForm', _this2.inputSelectors, function () {
			var $inputElement = $(this);

			if ($inputElement.val().length !== 0 || $inputElement.attr('placeholder') !== undefined) {
				$inputElement.siblings('label').addClass('is-active');
			}
			var error = _this.fieldHasError($inputElement);
		});

		// Add active when element has focus
		_this2.$el.on('focus.ContactForm', _this2.inputSelectors, function () {
			$(this).siblings('label, i').addClass('is-active');
		});

		_this2.$el.on('blur.ContactForm', _this2.inputSelectors, function () {
			var $inputElement = $(this);

			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
				$inputElement.siblings('label, i').removeClass('is-active');
			}

			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
				$inputElement.siblings('i').removeClass('is-active');
			}

			var error = _this.fieldHasError($inputElement);
		});
		return _this2;
	}

	/**
  * Upon form submit, many things happen
  * - Validation of inputs
  * - Validation of consent
  * - Delivery of form data to the server
  * - Managing server response states
  *
  * @param  {Event}         event  jQuery Event object
  * @param  {array|string}  data  Form data
  */


	_class.prototype.submitForm = function submitForm(event, data) {
		var _this3 = this;

		var hasErrors = this.fieldsHaveErrors(this.$inputs);

		if (!this.$consent.is(':checked')) {
			this.$consentLabel.addClass('has-error');
			this.$consentError.removeClass('is-hidden');
			hasErrors = true;
		}

		if (!hasErrors) {
			this.$consentLabel.removeClass('has-error');
			this.$consentError.addClass('is-hidden');

			var jqxhr = $.ajax({
				method: 'POST',
				url: this.$el.attr('action'),
				data: data
			}).done(function (response) {
				if (response.success === true) {
					_this3.$panes.eq(_this3.currentPane).fadeOut(function () {
						_this3.$formFeedback.fadeIn();
					});
				} else {
					_this3.manageErrors(response.errors);
				}
			}).fail(function () {
				console.log('error');
			});
		}
	};

	/**
  * Simple function to determine if form is valid enough to switch panes
  * Used by 'Next' button and form submit
  */


	_class.prototype.goToNextPane = function goToNextPane() {
		var _this4 = this;

		if (!this.fieldsHaveErrors(this.$panes.eq(this.currentPane).find(':input'))) {
			this.$panes.eq(this.currentPane).fadeOut(function () {
				_this4.currentPane = 1;
				_this4.$panes.eq(_this4.currentPane).fadeIn();
			});
		}
	};

	/**
  * Loop through errors sent back by the servers and attempt to identify the faulty elements
  * @param  {array}  errors  An array of element names that are in error
  */


	_class.prototype.manageErrors = function manageErrors(errors) {
		var i = 0,
		    len = errors.length;
		for (; i < len; i++) {
			$('#' + errors[i]).addClass('has-error');
		}
	};

	/**
  * Function to update labels of text fields
  * @see  MaterializeCSS
  */


	_class.prototype.updateTextFields = function updateTextFields() {
		$(this.inputSelectors).each(function (index, element) {
			if ($(element).val().length > 0 || element.autofocus || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
				$(this).siblings('label, i').addClass('is-active');
			} else {
				$(this).siblings('label, i').removeClass('is-active');
			}
		});
	};

	/**
  * Function to validate single inputs
  * @see  MaterializeCSS
  */


	_class.prototype.fieldHasError = function fieldHasError($object) {
		var hasLength = $object.attr('length') !== undefined;
		var lenAttr = parseInt($object.attr('length'));
		var len = $object.val().length;
		var fieldHasError = false;

		if ($object.hasClass('js-validate')) {
			if ($object.val().length !== 0) {
				if ($object[0].validity.badInput !== false) {
					// Check for character counter attributes
					if ($object.is(':valid') && hasLength && len <= lenAttr || $object.is(':valid') && !hasLength) {} else {
						fieldHasError = true;
					}
				}
				if ($object.attr('type') == 'email') {
					var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!EMAIL_REGEX.test($object.val())) {
						fieldHasError = true;
					}
				}
			} else {
				fieldHasError = true;
			}

			if (fieldHasError) {
				$object.addClass('has-error');
			} else {
				$object.removeClass('has-error');
			}
		}

		return fieldHasError;
	};

	/**
  * Validate multiple inputs
  * @return {boolean}
  */


	_class.prototype.fieldsHaveErrors = function fieldsHaveErrors($inputs) {
		var i = 0;
		var len = $inputs.length;
		var hasErrors = false;

		for (; i < len; i++) {
			if (this.fieldHasError($inputs.eq(i))) {
				hasErrors = true;
			}
		}

		return hasErrors;
	};

	_class.prototype.destroy = function destroy() {
		this.$el.off('.ContactForm');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$sliderOne = options.sliders.one.$el;
		_this.$sliderTwo = options.sliders.two.$el;

		_this.$sliderOne.slick(options.sliders.one.options).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			if (currentSlide !== nextSlide) {
				var action = void 0;
				if (Math.abs(nextSlide - currentSlide) === 1) {
					action = nextSlide - currentSlide > 0 ? 'slickNext' : 'slickPrev';
				} else {
					action = nextSlide - currentSlide > 0 ? 'slickPrev' : 'slickNext';
				}
				_this.$sliderTwo.slick(action);
				_this.activeSlideChanged(nextSlide);
			}
		});

		_this.$sliderTwo.slick(options.sliders.two.options);

		_this.$el.on('click.DoubleSlider', '.js-slider-button', function (event) {
			_this.changeSlide(event);
		});
		return _this;
	}

	/**
  * Change active slide for both sliders
  * @var  {Event}  event
  */


	_class.prototype.changeSlide = function changeSlide(event) {
		var $target = $(event.currentTarget);
		var action = $target.data('action');

		switch (action) {
			case 'prev':
				this.$sliderOne.slick('slickPrev');
				break;
			case 'next':
				this.$sliderOne.slick('slickNext');
				break;
		}
	};

	_class.prototype.activeSlideChanged = function activeSlideChanged(index) {};

	_class.prototype.destroy = function destroy() {
		this.$sliderOne.slick('unslick');
		this.$sliderTwo.slick('unslick');
		this.$el.off('.DoubleSlider');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.mode = typeof options['dropdown-mode'] !== 'undefined' ? options['dropdown-mode'] : 'accordeon';

		_this.$el.on('click.Dropdown', '.js-dropdown-toggle', function (event) {
			return _this.manageDropdownClick(event);
		});
		return _this;
	}

	// Toggle dropdown
	// ==========================================================================


	_class.prototype.manageDropdownClick = function manageDropdownClick(event) {
		if (window.matchMedia("(max-width: 1199px)").matches) {
			var $target = $(event.currentTarget);
			var $parent = $target.parents('.js-dropdown');

			event.preventDefault();

			if ($target.hasClass('is-disabled')) {
				return false;
			}

			if (this.mode === 'accordeon') {
				$parent.siblings('.js-dropdown').removeClass('has-dropdown').find('.js-dropdown-list').stop().slideUp();
			}

			$target.siblings('.js-dropdown-list').stop().slideToggle();

			if ($parent.hasClass('has-dropdown')) {
				$parent.removeClass('has-dropdown');
				this.$el.removeClass('has-dropdown');
			} else {
				$parent.addClass('has-dropdown');
				this.$el.addClass('has-dropdown');
			}
		}
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off('.Dropdown');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _animateTo = require('assets/scripts/utils/animateTo');

var _animateTo2 = _interopRequireDefault(_animateTo);

var _is = require('assets/scripts/utils/is');

var _dependencies = require('assets/scripts/global/dependencies');

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

var _ractiveEventsTap = require('assets/scripts/ractive/ractive-events-tap');

var _ractiveEventsTap2 = _interopRequireDefault(_ractiveEventsTap);

var _ractiveTransitionsFade = require('assets/scripts/ractive/ractive-transitions-fade');

var _ractiveTransitionsFade2 = _interopRequireDefault(_ractiveTransitionsFade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Filters
// ==========================================================================
/* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this2 = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this2.searchIsOpen = false;

		_this2.elements = {
			$total: $('.js-project-total'),
			$filters: $('.js-filters'),
			$projects: $('.js-projects')
		};

		window.Ractive.DEBUG = false;

		_this2.filtersController = _this2.initFiltersController();
		_this2.projectsController = _this2.initProjectsController();

		_this2.smoothScrollingDependency = (0, _dependencies.addDependency)('Filters', 'SmoothScrolling');

		_this2.filtersController.dispatchFilters({
			firstBlood: true
		});

		if (window.matchMedia("(min-width: 1200px)").matches) {
			_this2.scrollbarTags = _smoothScrollbar2.default.init(_this2.$el.find('.js-filters-tags')[0]);
			_this2.scrollbarFilters = _smoothScrollbar2.default.init(_this2.$el.find('.js-filters-list')[0]);
		}

		_this2.$el.on('click.Filters', '.js-filters-open', function (event) {
			return _this2.toggleFilters(event);
		});
		_this2.$el.on('click.Filters', '.js-filters-search-open', function (event) {
			return _this2.toggleFiltersSearch(event);
		});
		_this2.$el.on('click.Filters', '.js-filters-button', function (event) {
			return _this2.filter(event);
		});
		_this2.$el.on('click.Filters', '.js-filters-search-button', function (event) {
			return _this2.search(event);
		});
		return _this2;
	}

	//	Toggle filters
	// ==========================================================================


	_class.prototype.toggleFilters = function toggleFilters(event) {
		this.$body.toggleClass('has-filters-open').removeClass('has-filters-search-open');
		$(event.currentTarget).toggleClass('is-active');
		this.$el.find('.js-filters-search-open.is-active').removeClass('is-active');

		if (this.$body.hasClass('has-filters-open')) {
			this.$el.find('.js-filters-list').scrollTop(0);
		}
	};

	//	Close filters
	// ==========================================================================


	_class.prototype.closeFilters = function closeFilters() {
		this.$body.removeClass('has-filters-open');
		this.$el.find('.js-filters-open').removeClass('is-active');
	};

	//	Toggle filters search
	// ==========================================================================


	_class.prototype.toggleFiltersSearch = function toggleFiltersSearch(event) {
		var $searchInput = this.$el.find('.js-filters-search-input');

		this.$body.toggleClass('has-filters-search-open').removeClass('has-filters-open');
		$(event.currentTarget).toggleClass('is-active');
		this.$el.find('.js-filters-open.is-active').removeClass('is-active');

		if (!this.searchIsOpen) {
			$searchInput.focus();
			this.searchIsOpen = true;
		} else {
			$searchInput.blur();
			this.searchIsOpen = false;
		}
	};

	//	Close filters search
	// ==========================================================================


	_class.prototype.closeFiltersSearch = function closeFiltersSearch(event) {
		this.$body.removeClass('has-filters-search-open');
		this.$el.find('.js-filters-search-open').removeClass('is-active');
	};

	// Filter
	// ==========================================================================


	_class.prototype.filter = function filter(event) {
		(0, _animateTo2.default)(this.elements.$projects);
		this.closeFilters();
	};

	// Search
	// ==========================================================================


	_class.prototype.search = function search(event) {
		this.closeFiltersSearch();
	};

	/**
  * This controller is used for managing filters being added and removed
  * It tells the project controller which filters are active or not through event dispatching
  *
  * @return  {Ractive Object}  Ractive instance
  */


	_class.prototype.initFiltersController = function initFiltersController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$filters,
			template: this.unescapeHTML(this.elements.$filters.html()),
			data: {
				items: [],
				activeCategories: window.templateData.activeCategories,
				activeServices: window.templateData.activeServices,
				activeCharacteristics: window.templateData.activeCharacteristics,
				activeTags: window.templateData.activeTags,
				activeType: window.templateData.activeType,
				filterBoxes: window.templateData.filterBoxes,
				projectTypes: window.templateData.projectTypes,
				projectCategories: window.templateData.projectCategories,
				projectTags: window.templateData.projectTags
			},
			delimiters: ['[[', ']]'],
			tripleDelimiters: ['[[[', ']]]'],
			events: { tap: _ractiveEventsTap2.default },
			/**
    * Adds an item to filters
    *
    * @param {object}  model  Item model
    */
			addItem: function addItem(model) {
				this.push('items', model);
			},

			/**
    * Fire an event, so we can query the server for projects according to active filters
    */
			dispatchFilters: function dispatchFilters(options) {
				options = $.extend(options, {});

				var data = {
					filters: this.get('items'),
					keyword: this.get('keyword')
				};
				_this.projectsController.fire('refreshProjects', data, options);
			},

			/**
    * Find an item in items array using its ID
    *
    * @param  {string}       id  Quasi-unique identifier composed of {{filterIdent}}_{{ident}}
    * @return {int|boolean}      Index of the item in the array or false if can't be found
    */
			findIndex: function findIndex(id) {
				var items = this.get('items');
				var i = items.length;

				while (i--) {
					if (items[i].id === id) {
						return i;
					}
				}
				return false;
			},

			/**
    * Search item set for items with a specific taxonomy
    * @param   {string}  taxonomy  Taxonomy identifier
    * @return  {array}             Array of item indexes
    */
			findTaxonomyIndexes: function findTaxonomyIndexes(taxonomy) {
				var items = this.get('items');
				var i = items.length;
				var indexes = [];

				while (i--) {
					if (items[i].taxonomy === taxonomy) {
						indexes.push(i);
					}
				}
				return indexes;
			},

			/**
    * Item model
    * @param  {object}  params  Initial values for the model
    * @return {object}          Item model
    *
    * Model properties
    *
    * @param {string}  id        Quasi-unique identifier composed of {{filterIdent}}_{{ident}}
    * @param {string}  taxonomy  Filter taxonomy
    * @param {string}  label     Front end view
    * @param {string}  value     Input value used for filtering projects in our action
    */
			getItemModel: function getItemModel(params) {
				var defaults = {
					id: null,
					taxonomy: '',
					label: '',
					value: ''
				};
				return $.extend(defaults, params);
			},

			/**
    * Extract an item model from a node
    * @param  {object}  event  Ractive event object
    * @return {object}         Item model
    */
			getItemModelFromNode: function getItemModelFromNode(event) {
				return this.getItemModel({
					id: event.node.id,
					taxonomy: event.node.getAttribute('data-taxonomy'),
					label: event.node.getAttribute('data-label'),
					value: event.node.value
				});
			},

			/**
    * Remove an item in the items array according to its index
    * Also uncheck its associated input
    * Couldn't find a way to data-bind in this situation
    *
    * @param  {int}     index  Index of the item within the array
    */
			removeItem: function removeItem(index) {
				// False would indicate that the item could not be found in items array
				if (index !== false) {
					// Get item by keypath. Allows us to find its HTML input element
					var item = this.get('items.' + index);
					var $item = $('#' + item.id);

					// Removing the item from the items array
					this.splice('items', index, 1);

					// Not so graceful, since we couldn't really data-bind the input
					$item.prop('checked', false);
				}
			},

			/**
    * Receives a list of indexes to remove from `items`
    *
    * @param  {array}  indexes  Array of indexes to remove
    */
			removeItems: function removeItems(indexes) {
				for (var i = 0, len = indexes.length; i < len; i++) {
					this.removeItem(indexes[i]);
				}
			},

			/**
    * Add a filter to items according to defined filters
    *
    * @param  {string}      taxonomy  Filter taxonomy
    * @param  {string}      dataSet   Ractive dataset to parse
    * @param  {int|string}  value     Value found in URL
    */
			setActiveFilter: function setActiveFilter(taxonomy, dataSet, value) {
				var dataSet = this.get(dataSet);
				var dataSetFilters = [];

				if ((0, _is.isArray)(dataSet)) {
					dataSetFilters = dataSet.slice().map(function (currentValue) {
						return currentValue.filters;
					});
					dataSetFilters = [].concat.apply([], dataSetFilters);
				} else {
					dataSetFilters = dataSet.filters;
				}

				// Find filter object in datasets by filtering the values by their ID
				var object = dataSetFilters.filter(function (object) {
					if (object.id == value) {
						return object;
					}
				})[0];

				this.addItem(this.getItemModel({
					id: taxonomy + '_' + object.id,
					taxonomy: taxonomy,
					label: object.name,
					value: object.id
				}));
			},

			/**
    * Allows us to set proxy events and run other tasks when controller is initialized
    *
    * @param  {array}  options  Array of options
    */
			oninit: function oninit(options) {
				var _this3 = this;

				// Check for existing filters on module init
				var activeType = this.get('activeType');
				var activeCategories = this.get('activeCategories').slice();
				var activeServices = this.get('activeServices').slice();
				var activeCharacteristics = this.get('activeCharacteristics').slice();
				var activeTags = this.get('activeTags');

				if (activeType !== '') {
					this.setActiveFilter('type', 'projectTypes', activeType);
				}

				if (activeCategories.length !== 0) {
					activeCategories.forEach(function (element) {
						_this3.setActiveFilter('categories', 'projectCategories', element);
					});

					// Needs a little timeout
					window.setTimeout(function () {
						activeCategories.forEach(function (element) {
							$('#categories_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeServices.length !== 0) {
					activeServices.forEach(function (element) {
						_this3.setActiveFilter('services', 'filterBoxes', element);
					});

					// Needs a little timeout
					window.setTimeout(function () {
						activeServices.forEach(function (element) {
							$('#services_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeCharacteristics.length !== 0) {
					activeCharacteristics.forEach(function (element) {
						_this3.setActiveFilter('characteristics', 'filterBoxes', element);
					});

					// Needs a little timeout
					window.setTimeout(function () {
						activeCharacteristics.forEach(function (element) {
							$('#characteristics_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeTags.length !== 0) {
					this.setActiveFilter('tags', 'projectTags', activeTags[0]);

					// Needs a little timeout
					window.setTimeout(function () {
						$('#tags_' + activeTags.id).prop('checked', true);
					}, 500);
				}

				this.on({
					/**
      * Determine the amount of projects per projectType
      *
      * @param  {array} projects Array of project.
      * @return void
      */
					refreshProjectTypeCount: function refreshProjectTypeCount(projects) {
						var countsByType = [];
						var i = projects.length;

						while (i--) {
							var type = projects[i].type;
							countsByType[type] = typeof countsByType[type] !== 'undefined' ? countsByType[type] + 1 : 1;
							projects.splice(i);
						}

						var projectTypes = this.get('projectTypes').filters.slice();
						var j = projectTypes.length;

						while (j--) {
							var count = countsByType[projectTypes[j].id];
							this.set('projectTypes.filters.' + j + '.count', typeof count === 'undefined' ? 0 : count);
							projectTypes.splice(j);
						}
					},

					/**
      * Event triggered by filter items when clicking close button
      * We find the item's index using the keypath and remove it from array
      *
      * @param  {object}  event  Ractive event object
      */
					remove: function remove(event) {

						// Check if its a project type.
						// We need to manually unset the activeType variable and removes its related categories
						if (event.context.taxonomy === 'type') {
							this.set('activeType', '');
							this.set('activeCategories', []);
							this.removeItems(this.findTaxonomyIndexes('categories'));
						}
						var i = event.keypath.replace('items.', '');
						this.removeItem(i);

						this.dispatchFilters();
					},

					removeAll: function removeAll() {
						var i = this.get('items').length;

						while (i--) {
							this.removeItem(i);
						}

						this.dispatchFilters();
					},


					/**
      * Event triggered by a change on filter inputs
      * Determine if input is being checked or not
      * Add or remove filter item depending on checked state
      *
      * @param  {object}  event  Ractive event object
      */
					toggleItem: function toggleItem(event) {
						var isChecked = event.node.checked;
						var model = this.getItemModelFromNode(event);

						if (isChecked) {
							this.addItem(model);
						} else {
							this.removeItem(this.findIndex(model.id));
						}

						this.dispatchFilters();
					},

					/**
      * Event triggered when type is changed
      * Determine which type of categories to show and toggle them all off
      *
      * @param  {object}  event  Ractive event object
      */
					toggleType: function toggleType(event) {
						var model = this.getItemModelFromNode(event);

						// Remove active type(s) from filters
						this.removeItems(this.findTaxonomyIndexes(model.taxonomy));

						// Remove all the related categories too
						this.removeItems(this.findTaxonomyIndexes('categories'));

						// Now add the toggled one
						this.addItem(model);

						this.dispatchFilters();
					},

					/**
      * Event triggered when search form is submitted
      * Extract the keyword and filter the project list
      *
      * @param  {object}  event  Ractive event object
      */
					search: function search(event) {
						event.original.preventDefault();
						this.dispatchFilters();
					}
				});
			}
		});

		return ractive;
	};

	_class.prototype.initProjectsController = function initProjectsController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$projects,
			template: this.unescapeHTML(this.elements.$projects.html()),
			data: {
				viewType: 'grid',
				displayProjectList: false,
				projects: [],
				pageArray: [],
				page: 1,
				projectsPerPage: 24,
				state: 'inert'
			},
			computed: {
				hasMoreProjects: function hasMoreProjects() {
					return this.get('page') < this.maxPages();
				},
				projectCount: function projectCount() {
					return this.get('projects').length;
				}
			},
			partials: {
				image: '<span class="o-background -parallax-small js-parallax" data-speed="-0.6" style="background-image: url([[ image ]]);"></span>'
			},
			delimiters: ['[[', ']]'],
			tripleDelimiters: ['[[[', ']]]'],
			transitions: { fade: _ractiveTransitionsFade2.default },

			maxPages: function maxPages() {
				var projectCount = this.get('projectCount');
				var projectsPerPage = this.get('projectsPerPage');
				var remainder = projectCount % projectsPerPage;
				return (projectCount - remainder) / projectsPerPage + (remainder !== 0 ? 1 : 0);
			},

			updatePageArray: function updatePageArray() {

				// pageArray: function () {
				var projects = this.get('projects');
				var projectsPerPage = this.get('projectsPerPage');
				var pageArray = [];
				var i = 0;
				var len = this.get('page');
				for (; i < len; i++) {
					var min = projectsPerPage * i;
					var max = projectsPerPage * i + projectsPerPage;
					var page = projects.slice(min, max);
					pageArray[i] = {
						projects: page,
						projectsLoading: i === len - 1
					};
				}
				this.set('pageArray', pageArray);
				// return pageArray;
				// },
			},

			/**
    * Allows us to set proxy events and run other tasks when controller is initialized
    */
			oninit: function oninit() {
				// _this.$document.trigger('parallax.update');

				// Proxy event handlers
				this.on({
					loadNextPage: function loadNextPage() {
						var _this4 = this;

						this.add('page').then(function () {

							_this4.updatePageArray();

							$(document).trigger('SmoothScrolling.rebuild');

							var pages = _this4.get('pageArray').slice();
							_this4.set('pageArray.' + (pages.length - 1) + '.projectsLoading', false);
						});
					},
					refreshProjects: function refreshProjects(data, options) {
						var _this5 = this;

						this.set('state', 'loading');
						_this.invokeFilteredItems(data, function (projects) {
							_this5.set('displayProjectList', false).then(function () {
								_this5.set('page', 1);
								_this5.set('projects', projects).then(function () {
									_this5.updatePageArray();

									_this.filtersController.fire('refreshProjectTypeCount', projects.slice());

									if (typeof options.firstBlood === 'undefined') {
										(0, _animateTo2.default)($('.js-projects')); // @shame
									} else {
										(0, _dependencies.resolveDependency)(_this.smoothScrollingDependency);
									}

									_this.elements.$total.text(projects.length);

									_this5.set('state', 'inert').then(function () {
										_this5.set('displayProjectList', true).then(function () {

											var pages = _this5.get('pageArray').slice();

											_this5.set('pageArray.' + (pages.length - 1) + '.projectsLoading', false).then(function () {
												if (!options.firstBlood) {
													$(document).trigger('SmoothScrolling.rebuild');
												} else {
													setTimeout(function () {
														$(document).trigger('SmoothScrolling.rebuild');
													}, 301);
												}
											});
										});
									});
								});
							});
						});
					}
				});
			}
		});

		return ractive;
	};

	/**
  * Query server for items and send them to the callback function
  * @param  {array}     data      Object formed by a keyword and a list of filters to query DB with
  * @param  {function}  callback  Function to execute after the AJAX request is done
  */


	_class.prototype.invokeFilteredItems = function invokeFilteredItems(data, callback) {
		var results = [];
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'project/list',
			data: data
		}).done(function (response) {
			if (response.success === true) {
				results = response.results;
			}
		}).fail(function () {}).always(function () {
			callback(results);
		});
	};

	_class.prototype.destroy = function destroy() {
		if (typeof this.scrollbarTags !== 'undefined') {
			this.scrollbarTags.destroy();
			this.scrollbarFilters.destroy();
		}
		this.filtersController.teardown();
		this.projectsController.teardown();
		this.$el.off('.Filters');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"assets/scripts/global/dependencies":3,"assets/scripts/ractive/ractive-events-tap":31,"assets/scripts/ractive/ractive-transitions-fade":32,"assets/scripts/utils/animateTo":33,"assets/scripts/utils/is":38,"./AbstractModule":6,"smooth-scrollbar":43}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
    _inherits(_class, _AbstractModule);

    function _class(options) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _AbstractModule.call(this, options));
    }

    // Destroy
    // ==========================================================================


    _class.prototype.destroy = function destroy() {
        this.$el.off();
    };

    return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Slider page
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.currentSlide = 1;
		_this.isAnimating = false;
		_this.animationDuration = 1200;
		_this.maxSlide = _this.$el.find($('.js-slider-home-slide')).length;
		_this.$controls = _this.$el.find('.js-slider-home-button');

		_this.$el.on('click', '.js-slider-home-next', function (event) {
			return _this.nextSlide();
		});
		_this.$el.on('click', '.js-slider-home-prev', function (event) {
			return _this.prevSlide();
		});
		return _this;
	}

	// Next slide
	// ==========================================================================


	_class.prototype.nextSlide = function nextSlide() {
		this.preventClick();

		if (this.currentSlide === this.maxSlide) {
			this.currentSlide = 0;
		}

		this.currentSlide++;
		this.$el.find('.js-slider-home-slide.is-prev').removeClass('is-prev').addClass('is-next');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-prev');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-next').addClass('is-current');
	};

	// Prev slide
	// ==========================================================================


	_class.prototype.prevSlide = function prevSlide() {
		this.preventClick();

		if (this.currentSlide === 1) {
			this.currentSlide = this.maxSlide + 1;
		}

		this.currentSlide--;
		this.$el.find('.js-slider-home-slide.is-next').removeClass('is-next').addClass('is-prev');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-next');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-prev').addClass('is-current');
	};

	// Prevent click
	// ==========================================================================


	_class.prototype.preventClick = function preventClick() {
		var _this2 = this;

		this.isAnimating = true;
		this.$controls.prop('disabled', true);

		setTimeout(function () {
			_this2.isAnimating = false;
			_this2.$controls.prop('disabled', false);
		}, this.animationDuration);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$el.on('click', '.js-lightbox-video-open', function (event) {
			return _this.openLightbox(event);
		});
		_this.$el.on('click', '.js-lightbox-video-close', function () {
			return _this.closeLightbox();
		});
		return _this;
	}

	// Open
	// ==========================================================================


	_class.prototype.openLightbox = function openLightbox(event) {
		var dataVideo = $(event.currentTarget).data('video');
		this.$body.addClass('has-lightbox-video-open');
		$('.js-lightbox-video-content').html(dataVideo);
	};

	// Close
	// ==========================================================================


	_class.prototype.closeLightbox = function closeLightbox() {
		this.$body.removeClass('has-lightbox-video-open');

		setTimeout(function () {
			$('.js-lightbox-video-content').html("");
		}, 600);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _ractiveEventsTap = require('ractive-events-tap');

var _ractiveEventsTap2 = _interopRequireDefault(_ractiveEventsTap);

var _ractiveTransitionsFade = require('ractive-transitions-fade');

var _ractiveTransitionsFade2 = _interopRequireDefault(_ractiveTransitionsFade);

var _dependencies = require('assets/scripts/global/dependencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this2 = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this2.smoothScrollingDependency = (0, _dependencies.addDependency)('LocationSwitcher', 'SmoothScrolling');

		_this2.$mapContainer = _this2.$el.find('.js-map-container');
		_this2.$switcherContainer = _this2.$el.find('.js-switcher-container');
		_this2.idPrefix = 'location_';
		_this2.icon = _this2.$mapContainer.data('icon');
		_this2.places = _this2.prepareLocations(window.locationsOptions.locations);

		_this2.locationController = _this2.initLocationController();
		window.Ractive.DEBUG = false;
		return _this2;
	}

	/**
  * This controller is used for switching between active locations
  * @return  {Ractive Object}  Ractive instance
  */


	_class.prototype.initLocationController = function initLocationController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.$switcherContainer,
			template: this.unescapeHTML(this.$switcherContainer.html()),
			data: {
				locations: window.locationsOptions.locations,
				activeLocation: {},
				displayActiveLocation: true,
				isActive: function isActive(item) {
					return item.id === this.get('activeLocation').id;
				}
			},
			events: { tap: _ractiveEventsTap2.default },
			transitions: { fade: _ractiveTransitionsFade2.default },
			/**
    * Allows us to set proxy events and run other tasks when controller is initialized
    * @param  {array}  options  Array of options
    */
			oninit: function oninit(options) {
				// Set active location as first of locations set
				this.set('activeLocation', this.get('locations.0'));

				// Init map and set first location as "active"
				_this.map = new _Map2.default({
					$container: _this.$mapContainer,
					mapOptions: {
						places: _this.places
					},
					controllerReadyCallback: function controllerReadyCallback(map) {
						(0, _dependencies.resolveDependency)(_this.smoothScrollingDependency);
						ractive.displayActiveLocation();
					}
				});

				this.on({
					/**
      * When we toggle a location, we set the active event
      * and change the map
      * @param  {object}  event  Ractive event object
      */
					toggleLocation: function toggleLocation(event) {
						this.set('displayActiveLocation', false).then(function () {
							ractive.set('activeLocation', ractive.get(event.keypath)).then(function () {
								ractive.set('displayActiveLocation', true);
								ractive.displayActiveLocation();
							});
						});
					}
				});
			},
			/**
    * Updates the Google Map by showing only the active location
    */
			displayActiveLocation: function displayActiveLocation() {
				var ident = _this.idPrefix + this.get('activeLocation').id;
				var place = _this.map.controller.get_place(ident);

				_this.map.controller.filter(ident);
				_this.map.controller.set_zoom(10);
				_this.map.controller.map().setCenter(place.object().getPosition());
			}
		});

		return ractive;
	};

	/**
  * Convert our Location models to BB Map objects
  * @return {array}
  */


	_class.prototype.prepareLocations = function prepareLocations(locations) {
		var i = 0;
		var len = locations.length;
		var preppedLocations = {};

		for (; i < len; i++) {
			var id = this.idPrefix + locations[i].id;
			preppedLocations[id] = {
				type: 'marker',
				categories: [id],
				icon: {
					src: this.icon,
					height: 40,
					width: 33
				},
				coords: [locations[i].lat, locations[i].lon]
			};
		}

		return preppedLocations;
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.locationController.teardown();
		this.$el.off('.LocationSwitcher');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"assets/scripts/global/dependencies":3,"./AbstractModule":6,"./Map":19,"ractive-events-tap":41,"ractive-transitions-fade":42}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint esnext: true */
var Map = function () {
	function Map(options) {
		var _this = this;

		_classCallCheck(this, Map);

		setTimeout(function () {
			_this.controller = undefined;
			_this.$container = options.$container;

			var mapOptions = typeof options.mapOptions !== 'undefined' ? options.mapOptions : {};
			var controllerReadyCallback = typeof options.controllerReadyCallback !== 'undefined' ? options.controllerReadyCallback : function () {};

			_this.$container.on('controllerReady.Map', function () {
				controllerReadyCallback(_this);
			});

			// If google is undefined
			if (!window.google || !window.google.maps) {
				window._tmp_google_onload = function () {
					_this.displayMap(mapOptions);
				};

				$.getScript('https://maps.googleapis.com/maps/api/js?sensor=true&v=3' + '&language=fr&callback=_tmp_google_onload&key=AIzaSyCRL-lhPXm5SM6cC7Y0jdkjCfApU8Xur3Y', function () {});

				return false;
			} else {
				_this.displayMap(mapOptions);
			}
		}, 1700);
	}

	Map.prototype.displayMap = function displayMap(mapOptions) {
		var _this2 = this;

		if (!this.$container.length) {
			return false;
		}

		var icon = this.$container.data('icon');
		var address = this.$container.data('address');
		var scrollwheel = typeof this.$container.data('scrollwheel') !== 'undefined' ? true : false;
		var places = typeof mapOptions.places !== 'undefined' ? mapOptions.places : {};

		// Default options.
		// Map center changes after the marker is added
		var controllerOptions = {
			map: {
				center: {
					x: 45.3712923,
					y: -73.9820994
				},
				zoom: 3,
				scrollwheel: scrollwheel,
				mapType: 'roadmap',
				coordsType: 'inpage', // array, json? (vs ul li)
				map_mode: 'default'
			},
			places: places,
			max_fitbounds_zoom: 14
		};

		this.controller = new BB.gmap.controller(this.$container.get(0), controllerOptions);

		this.controller.init();

		this.controller.set_styles([{ "featureType": "all", "elementType": "geometry", "stylers": [{ "lightness": "-5" }] }, { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "lightness": "-10" }, { "saturation": "-100" }] }, { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "hue": "#d700ff" }, { "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "hue": "#ff0000" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }, { "saturation": "0" }, { "lightness": "0" }, { "visibility": "on" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "lightness": "50" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "lightness": "25" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "weight": "1" }, { "lightness": "0" }] }, { "featureType": "administrative.province", "elementType": "labels.text", "stylers": [{ "lightness": "25" }] }, { "featureType": "administrative.locality", "elementType": "labels.text", "stylers": [{ "lightness": "30" }, { "gamma": "1.00" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text", "stylers": [{ "lightness": "53" }, { "gamma": "1.00" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-20" }, { "gamma": "1.00" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "lightness": "30" }, { "gamma": "1" }, { "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "lightness": "-10" }] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-40" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": "18" }, { "saturation": "-100" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "lightness": "-30" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }, { "lightness": "50" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "lightness": "0" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "weight": "1" }, { "saturation": "0" }, { "lightness": "83" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "0" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "lightness": "80" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "0" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "lightness": "80" }, { "gamma": "1" }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "saturation": "0" }, { "lightness": "-15" }, { "weight": ".25" }, { "gamma": "1" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "lightness": "0" }, { "gamma": "1.00" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#ffc1d9" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "saturation": "-100" }, { "lightness": "-5" }, { "gamma": "0.5" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "weight": ".75" }, { "visibility": "off" }] }]);

		if (address !== '') {
			this.controller.add_place_by_address('place', address, {
				type: 'marker',
				icon: {
					src: icon,
					height: 84,
					width: 60
				},
				loaded_callback: function loaded_callback(o) {
					_this2.controller.fit_bounds();
				}
			});
		}

		this.controller.ready(function () {
			_this2.$container.trigger('controllerReady.Map');
		});
	};

	// Destroy
	// ==========================================================================


	Map.prototype.destroy = function destroy() {
		this.$container.off('.Map');
	};

	return Map;
}();

exports.default = Map;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Generic module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		$('.js-nav-toggle').click(function (event) {
			return _this.toggleNav();
		});

		_this.$el.find('.js-nav-search').click(function (event) {});
		_this.$el.on('click', '.js-search-button', function (event) {
			return _this.openSearch(event);
		});

		if (window.matchMedia("(min-width: 1200px)").matches) {
			_this.scrollbar = _smoothScrollbar2.default.init(_this.$el.find('[data-scrollbar]')[0]);
		}
		return _this;
	}

	// Open search
	// ==========================================================================


	_class.prototype.openSearch = function openSearch(event) {
		var _this2 = this;

		event.preventDefault();

		this.$body.toggleClass('has-search-open');

		setTimeout(function () {
			_this2.$el.find('.js-search-input').focus();
		}, 300);
	};

	// Toggle nav
	// ==========================================================================


	_class.prototype.toggleNav = function toggleNav() {
		if (this.$body.hasClass('has-nav-open')) {
			this.$body.removeClass('has-nav-open');
		} else {
			this.$el.find('.js-search-input').val('');
			this.$el.find('.js-search-results').html('');
			this.$body.removeClass('has-search-open').addClass('has-nav-open');
		}
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6,"smooth-scrollbar":43}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$el.on('click', '.js-nav-news-toggle', function (event) {
			return _this.toggleNavNews();
		});
		return _this;
	}

	_class.prototype.toggleNavNews = function toggleNavNews() {
		this.$body.toggleClass('has-nav-news-open');

		if (this.$body.hasClass('has-nav-news-open')) {
			$('.js-news-nav').scrollTop(0);
		}
	};

	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _ractiveEventsTap = require('ractive-events-tap');

var _ractiveEventsTap2 = _interopRequireDefault(_ractiveEventsTap);

var _ractiveTransitionsFade = require('ractive-transitions-fade');

var _ractiveTransitionsFade2 = _interopRequireDefault(_ractiveTransitionsFade);

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this2 = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this2.elements = {
			$newsList: _this2.$el.find('.js-news-list')
		};

		_this2.newsListController = _this2.initNewsListController();

		_this2.$el.on('click.News', '.js-news-toggle', function (event) {
			_this2.toggleNavNews();
		});

		if (window.matchMedia("(min-width: 1200px)").matches) {
			_this2.scrollbar = _smoothScrollbar2.default.init(_this2.$el[0]);
		}
		window.Ractive.DEBUG = false;
		return _this2;
	}

	_class.prototype.toggleNavNews = function toggleNavNews() {
		this.$body.toggleClass('has-nav-news-open');
	};

	/**
  * This controller is used for loading more news
  *
  * @return  {Ractive Object}  Ractive instance
  */


	_class.prototype.initNewsListController = function initNewsListController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$newsList,
			template: this.unescapeHTML(this.elements.$newsList.html()),
			data: {
				news: window.newsOptions.news,
				page: window.newsOptions.page,
				nextPage: window.newsOptions.nextPage,
				state: window.newsOptions.state
			},
			events: { tap: _ractiveEventsTap2.default },
			transitions: { fade: _ractiveTransitionsFade2.default },

			/**
    * Allows us to set proxy events and run other tasks when controller is initialized
    *
    * @param  {array}  options  Array of options
    */
			oninit: function oninit(options) {
				var _ractive = this;
				this.on({

					/**
      * When load more is clicked, we fetch more news
      * If nextPage is false, the button will disapear
      *
      * @param  {object}  event  Ractive event object
      */
					loadMore: function loadMore(event) {
						var parameters = {
							page: this.get('page')
						};

						this.set('state', 'loading');

						_this.invokeLoadNews(parameters, function (response) {
							// Give an impression of loading, lel
							window.setTimeout(function () {
								_ractive.set({
									'page': response.page,
									'nextPage': response.nextPage
								});
								_ractive.push.apply(_ractive, ['news'].concat(response.news)).then(function () {
									_ractive.set('state', 'inert');
								});
							}, 500);
						});
					}
				});
			}
		});

		return ractive;
	};

	/**
  * Query server for news and send them to the callback function
  * @param  {array}     data      Object formed by a page number
  * @param  {function}  callback  Function to execute after the AJAX request is done
  */


	_class.prototype.invokeLoadNews = function invokeLoadNews(data, callback) {
		// Default response
		var _response = {
			news: [],
			page: data.page,
			nextPage: false
		};
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'news/list',
			data: data
		}).done(function (response) {
			if (response.success === true) {
				_response = response;
			}
		}).fail(function () {
			console.log('error');
		}).always(function () {
			callback(_response);
		});
	};

	_class.prototype.destroy = function destroy() {
		this.newsListController.teardown();
		this.$el.off('.News');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6,"ractive-events-tap":41,"ractive-transitions-fade":42,"smooth-scrollbar":43}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _barba = require('barba.js');

var _barba2 = _interopRequireDefault(_barba);

var _environment = require('assets/scripts/utils/environment');

var _PageTransitions = require('assets/scripts/global/PageTransitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* jshint esnext: true */


var _class = function () {
	function _class(options) {
		_classCallCheck(this, _class);

		this.load();
	}

	_class.prototype.load = function load() {

		var self = this;

		//Init Barba JS
		_barba2.default.Pjax.Dom.containerClass = 'js-barba-container';
		_barba2.default.Pjax.Dom.wrapperId = 'js-barba-wrapper';

		_barba2.default.Pjax.start();

		var mainTransition = _barba2.default.BaseTransition.extend(_PageTransitions.transitions.mainTransition);
		var navTransition = _barba2.default.BaseTransition.extend(_PageTransitions.transitions.navTransition);
		var sectionTransition = _barba2.default.BaseTransition.extend(_PageTransitions.transitions.sectionTransition);

		_barba2.default.Pjax.getTransition = function () {
			if (self.route === 'nav') {
				return navTransition;
			} else if (self.route == 'same-section') {
				return sectionTransition;
			} else {
				return mainTransition;
			}
		};

		_barba2.default.Dispatcher.on('linkClicked', function (currentStatus, oldStatus, container) {
			self.route = currentStatus.getAttribute('data-route');
			self.routeOption = currentStatus.getAttribute('data-route-option');

			if (self.routeOption != undefined) {
				_environment.$body.attr('data-route-option', self.routeOption);
			} else {
				_environment.$body.attr('data-route-option', '');
			}
		});

		/**
   * Execute any third party features.
   */
		_barba2.default.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {

			if (window.ga && !_environment.$html.data('debug')) {
				ga('send', {
					hitType: 'pageview',
					page: location.pathname,
					location: currentStatus.url,
					title: document.title
				});
			}

			var js = container.querySelector("script");
			if (js != null) {
				eval(js.innerHTML);
			}
		});
	};

	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}();

exports.default = _class;

},{"assets/scripts/global/PageTransitions":2,"assets/scripts/utils/environment":35,"barba.js":40}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


// import tap from 'assets/scripts/ractive/ractive-events-tap';
// import fade from 'assets/scripts/ractive/ractive-transitions-fade';

var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this2 = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this2.searchResultsController = _this2.initSearchResultsController();

		if (window.matchMedia("(min-width: 1200px)").matches) {
			_this2.scrollbar = _smoothScrollbar2.default.init(_this2.$el.find('[data-scrollbar]')[0]);
		}
		window.Ractive.DEBUG = false;
		return _this2;
	}

	/**
  * This controller is used for loading search results and various visual effects
  *
  * @return  {Ractive Object}  Ractive instance
  */


	_class.prototype.initSearchResultsController = function initSearchResultsController() {
		var _this = this;
		var timeout = 0;
		var minLength = 3;
		var searchDelay = 500;
		var ractive = new Ractive({
			el: this.$el,
			template: this.unescapeHTML(this.$el.html()),
			data: {
				keyword: '',
				news: [],
				projects: [],
				state: 'inert'
			},
			computed: {
				displaySearchResults: function displaySearchResults() {
					return this.get('keyword').length >= minLength;
				},
				encodedKeyword: function encodedKeyword() {
					return this.get('keyword').replace(/\s/g, '&nbsp;');
				},
				hasNews: function hasNews() {
					return this.objectCount('news') !== 0;
				},
				hasProjects: function hasProjects() {
					return this.objectCount('projects') !== 0;
				},
				hasSections: function hasSections() {
					return this.objectCount('sections') !== 0;
				},
				isLoading: function isLoading() {
					return this.get('state') === 'loading';
				},
				totalResults: function totalResults() {
					return this.get('projects').length + this.get('news').length + this.get('sections').length;
				}
			},
			// events: { tap },
			// transitions: { fade },

			/**
    * News model
    * @param  {object}  params  Initial values for the model
    * @return {object}          News model
    *
    * Model properties
    *
    * @param {string}  url
    * @param {string}  title
    * @param {string}  date
    * @param {string}  description
    */
			getNewsModel: function getNewsModel(params) {
				var defaults = {
					url: '',
					title: '',
					date: '',
					description: ''
				};
				return $.extend(defaults, params);
			},

			/**
    * Project model
    * @param  {object}  params  Initial values for the model
    * @return {object}          Project model
    *
    * Model properties
    *
    * @param {string}  url
    * @param {string}  image
    * @param {string}  title
    * @param {array}   tags
    * @param {string}  description
    */
			getProjectModel: function getProjectModel(params) {
				var defaults = {
					url: '',
					image: '',
					title: '',
					tags: [],
					description: ''
				};
				return $.extend(defaults, params);
			},
			getSectionModel: function getSectionModel(params) {
				var defaults = {
					url: '',
					title: '',
					description: ''
				};
				return $.extend(defaults, params);
			},

			/**
    * Count objects according to keypath
    * @param  {string}  keypath
    * @return {int}
    */
			objectCount: function objectCount(keypath) {
				return this.get(keypath).length;
			},

			/**
    * Allows us to set proxy events and run other tasks when controller is initialized
    *
    * @param  {array}  options  Array of options
    */
			oninit: function oninit(options) {
				this.on({
					/**
      * Empty all search results
      *
      * @param  {object}  event  Ractive event object
      */
					emptyResults: function emptyResults(event) {
						ractive.set('projects', []);
						ractive.set('news', []);
						ractive.set('sections', []);
					},

					/**
      * When load more is clicked, we fetch more news
      * If nextPage is false, the button will disapear
      *
      * @param  {object}  event  Ractive event object
      */
					loadSearchResults: function loadSearchResults(event) {
						var parameters = {
							keyword: this.get('keyword')
						};

						this.set('state', 'loading');

						_this.invokeLoadResults(parameters, function (response) {
							ractive.set('projects', response.projects);
							ractive.set('sections', response.sections);
							ractive.set('news', response.news).then(function () {
								ractive.set('state', 'inert');
							});
						});
					},

					/**
      * Gobble up the submit event
      *
      * @param  {object}  event  Ractive event object
      */
					submitForm: function submitForm(event) {
						event.original.preventDefault();
					}
				});
			}
		});

		// Watching for changes on the typed in data
		ractive.observe('keyword', function (newValue) {

			// Timeout clearing!
			if (timeout !== 0) {
				clearTimeout(timeout);
				timeout = 0;
			}

			// If less than minLength characters, clear out the search results
			if (newValue.length < minLength) {
				ractive.fire('emptyResults');
			} else {
				// Dont search if loading
				if (ractive.get('state') === 'inert') {
					timeout = setTimeout(function () {
						ractive.fire('loadSearchResults');
					}, searchDelay);
				}
			}
		});

		return ractive;
	};

	/**
  * Query server for search results and send them to the callback function
  * @param  {array}     data      Object formed by a keyword
  * @param  {function}  callback  Function to execute after the AJAX request is done
  */


	_class.prototype.invokeLoadResults = function invokeLoadResults(data, callback) {
		// Default response
		var _response = {
			news: [],
			projects: []
		};
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'search',
			data: data
		}).done(function (response) {
			if (response.success === true) {
				_response = response;
			}
		}).fail(function () {
			console.log('error');
		}).always(function () {
			callback(_response);
		});
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.searchResultsController.teardown();
		this.$el.off('.Search');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6,"smooth-scrollbar":43}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$toggles = _this.$el.find('.js-switch-toggle');
		_this.$imageElem = _this.$el.find('.js-image');

		_this.$el.on('mouseenter.SimilarSwitcher', '.js-switch-toggle', function (event) {
			_this.switchProject(event);
		});
		return _this;
	}

	// Hover project
	// ==========================================================================


	_class.prototype.switchProject = function switchProject(event) {
		var src = event.currentTarget.getAttribute('data-image');

		if (src !== null) {
			this.$toggles.removeClass('is-active');
			$(event.currentTarget).addClass('is-active');
			this.$imageElem.css('background-image', 'url(' + src + ')');
		}
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off('.SimilarSwitcher');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Slider home
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.currentSlide = 1;
		_this.isAnimating = false;
		_this.animationDuration = 1200;
		_this.autoplaySpeed = 10000;
		_this.interval;
		_this.maxSlide = _this.$el.find($('.js-slider-home-slide')).length;
		_this.$controls = _this.$el.find('.js-slider-home-button');

		_this.$el.on('click', '.js-slider-home-next', function (event) {
			return _this.nextSlide();
		});
		_this.$el.on('click', '.js-slider-home-prev', function (event) {
			return _this.prevSlide();
		});

		_this.startAutoplay();
		return _this;
	}

	// Next slide
	// ==========================================================================


	_class.prototype.nextSlide = function nextSlide() {
		this.preventClick();

		if (this.currentSlide === this.maxSlide) {
			this.currentSlide = 0;
		}

		this.currentSlide++;
		this.$el.find('.js-slider-home-slide.is-prev').removeClass('is-prev').addClass('is-next');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-prev');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-next').addClass('is-current');
	};

	// Prev slide
	// ==========================================================================


	_class.prototype.prevSlide = function prevSlide() {
		this.preventClick();

		if (this.currentSlide === 1) {
			this.currentSlide = this.maxSlide + 1;
		}

		this.currentSlide--;
		this.$el.find('.js-slider-home-slide.is-next').removeClass('is-next').addClass('is-prev');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-next');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-prev').addClass('is-current');
	};

	// Prevent click
	// ==========================================================================


	_class.prototype.preventClick = function preventClick() {
		var _this2 = this;

		this.isAnimating = true;
		this.$controls.prop('disabled', true);
		clearInterval(this.interval);

		setTimeout(function () {
			_this2.isAnimating = false;
			_this2.$controls.prop('disabled', false);
			_this2.startAutoplay();
		}, this.animationDuration);
	};

	// Start autoplay
	// ==========================================================================


	_class.prototype.startAutoplay = function startAutoplay() {
		var _this3 = this;

		this.interval = setInterval(function () {
			if (!_this3.isAnimating) {
				_this3.nextSlide();
			}
		}, this.autoplaySpeed);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Slider home
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.currentSlide = 1;
		_this.isAnimating = false;
		_this.animationDuration = 1200;
		_this.autoplaySpeed = 10000;
		_this.maxSlide = _this.$el.find($('.js-slider-home-slide')).length;
		_this.$controls = _this.$el.find('.js-slider-home-button');

		_this.$el.on('click', '.js-slider-home-next', function (event) {
			return _this.nextSlide();
		});
		_this.$el.on('click', '.js-slider-home-prev', function (event) {
			return _this.prevSlide();
		});
		return _this;
	}

	// Next slide
	// ==========================================================================


	_class.prototype.nextSlide = function nextSlide() {
		this.preventClick();

		if (this.currentSlide === this.maxSlide) {
			this.currentSlide = 0;
		}

		this.currentSlide++;
		this.$el.find('.js-slider-home-slide.is-prev').removeClass('is-prev').addClass('is-next');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-prev');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-next').addClass('is-current');
	};

	// Prev slide
	// ==========================================================================


	_class.prototype.prevSlide = function prevSlide() {
		this.preventClick();

		if (this.currentSlide === 1) {
			this.currentSlide = this.maxSlide + 1;
		}

		this.currentSlide--;
		this.$el.find('.js-slider-home-slide.is-next').removeClass('is-next').addClass('is-prev');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-next');
		this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]').removeClass('is-prev').addClass('is-current');
	};

	// Prevent click
	// ==========================================================================


	_class.prototype.preventClick = function preventClick() {
		var _this2 = this;

		this.isAnimating = true;
		this.$controls.prop('disabled', true);

		setTimeout(function () {
			_this2.isAnimating = false;
			_this2.$controls.prop('disabled', false);
		}, this.animationDuration);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off();
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"./AbstractModule":6}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DoubleSlider2 = require('./DoubleSlider');

var _DoubleSlider3 = _interopRequireDefault(_DoubleSlider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_DoubleSlider) {
	_inherits(_class, _DoubleSlider);

	function _class(options) {
		_classCallCheck(this, _class);

		options.sliders = {
			one: {
				$el: options.$el.find('.js-slider-project-main'),
				options: {
					arrows: false,
					cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
					speed: 500
				}
			},
			two: {
				$el: options.$el.find('.js-slider-project-secondary'),
				options: {
					arrows: false,
					cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
					draggable: false,
					speed: 500,

					initialSlide: 1,
					swipe: false
				}
			}
		};
		return _possibleConstructorReturn(this, _DoubleSlider.call(this, options));
	}

	return _class;
}(_DoubleSlider3.default);

exports.default = _class;

},{"./DoubleSlider":12}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

var _smoothScrollbar = require('smooth-scrollbar');

var _smoothScrollbar2 = _interopRequireDefault(_smoothScrollbar);

var _environment = require('assets/scripts/utils/environment');

var _throttledResize = require('throttled-resize');

var _throttledResize2 = _interopRequireDefault(_throttledResize);

var _dependencies = require('assets/scripts/global/dependencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ==========================================================================
// Smooth scrolling module
// ==========================================================================


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.scrollbar;
		_this.isSmooth = false;
		_this.isMobile = true;

		_this.selector = '.js-parallax, .s-wysiwyg ul, .s-wysiwyg blockquote';

		// if (hasDependencies('SmoothScrolling')) {
		// 	this.$document.on('resolveDependencies.SmoothScrolling', () => this.buildSmoothScrolling());
		// } else {

		// SmoothScrolling only on this matchMedia matche
		if (window.matchMedia("(min-width: 1200px)").matches) {
			_this.buildSmoothScrolling();
			_this.isSmooth = true;
			_this.isMobile = false;

			_environment.$document.on('SmoothScrolling.rebuild', function () {
				_this.updateElements();
			});
		}
		// }

		var resize = new _throttledResize2.default();
		resize.on('resize:end', function () {
			return _this.checkResize();
		});
		return _this;
	}

	_class.prototype.buildSmoothScrolling = function buildSmoothScrolling() {
		var _this2 = this;

		setTimeout(function () {
			_this2.scrollbar = _smoothScrollbar2.default.init(_this2.$el[0]);
			_this2.windowHeight = _this2.$window.height();
			_this2.windowMiddle = _this2.windowHeight / 2;
			_this2.scrollbarLimit = _this2.scrollbar.limit.y + _this2.windowHeight;
			_this2.elements = {};
			// Create elements object
			_this2.addElements();
			// First load
			_this2.checkElements(true);
			// On scroll
			_this2.scrollbar.addListener(function () {
				return _this2.checkElements();
			});

			// Scrollto buttons event
			$('.js-scrollto').on('click.SmoothScrolling', function (event) {
				return _this2.scrollTo(event);
			});

			// Setup done.
			_this2.$document.trigger({
				type: 'SmoothScroll.isReady'
			});
		}, 300);
	};

	// Add elements
	// ==========================================================================


	_class.prototype.addElements = function addElements() {
		var _this3 = this;

		$(this.selector).each(function (i, el) {
			var $element = $(el);
			var elementSpeed = $element.data('speed') / 10;
			var elementPosition = $element.data('position');
			var elementTarget = $element.data('target');
			var elementHorizontal = $element.data('horizontal');
			var $target = elementTarget ? $(elementTarget) : $element;
			var elementOffset = $target.offset().top + _this3.scrollbar.scrollTop;

			var elementPersist = $element.data('persist');

			if (!elementTarget && $element.data('transform')) {
				var transform = $element.data('transform');
				elementOffset -= parseFloat(transform.y);
			}

			var elementLimit = elementOffset + $target.outerHeight();
			var elementMiddle = (elementLimit - elementOffset) / 2 + elementOffset;

			_this3.elements[i] = {
				$element: $element,
				offset: elementOffset,
				limit: elementLimit,
				middle: elementMiddle,
				speed: elementSpeed,
				position: elementPosition,
				horizontal: elementHorizontal,
				persist: elementPersist
			};
		});
	};

	/**
  * Update elements, recalculate all position as if the template
  * just loaded.
  */


	_class.prototype.updateElements = function updateElements() {
		this.scrollbar.update();
		// Reset container and scrollbar data.
		this.windowHeight = this.$window.height();
		this.windowMiddle = this.windowHeight / 2;
		this.scrollbarLimit = this.scrollbar.limit.y + this.windowHeight;
		this.addElements();
		this.checkElements(true);
		// this.checkElements(true);
		_environment.$document.trigger('SmoothScroll.update');
	};

	// Check resize
	// ==========================================================================


	_class.prototype.checkResize = function checkResize() {
		if (window.matchMedia("(min-width: 1200px)").matches) {
			if (!this.isSmooth) {
				this.isSmooth = true;
				this.buildSmoothScrolling();
			} else {
				this.updateElements();
			}
		} else {
			if (this.isSmooth) {
				this.isSmooth = false;
				this.destroy();
			}
		}
	};

	// Check elements
	// ==========================================================================


	_class.prototype.checkElements = function checkElements(first) {
		var scrollbarTop = this.scrollbar.scrollTop;
		var scrollbarLimit = this.scrollbarLimit;
		var scrollbarBottom = scrollbarTop + this.windowHeight;
		var scrollbarMiddle = scrollbarTop + this.windowMiddle;

		for (var i in this.elements) {
			var transformDistance = void 0;
			var scrollBottom = scrollbarBottom;
			var $element = this.elements[i].$element;
			var elementOffset = this.elements[i].offset;
			// elementOffset = $element.offset().top;
			var elementLimit = this.elements[i].limit;
			var elementMiddle = this.elements[i].middle;
			var elementSpeed = this.elements[i].speed;
			var elementPosition = this.elements[i].position;
			var elementHorizontal = this.elements[i].horizontal;
			var elementPersist = this.elements[i].persist;

			if (elementPosition === 'top') {
				scrollBottom = scrollbarTop;
			}

			// Define if the element is inview
			var inview = scrollBottom >= elementOffset && scrollbarTop <= elementLimit;

			// Add class if inview, remove if not
			if (inview) {
				$element.addClass('is-inview');

				if (elementPersist != undefined) {
					$element.addClass('is-visible');
				}
			} else {
				$element.removeClass('is-inview');
			}

			if (first && !inview && elementSpeed) {
				// Different calculations if it is the first call and the
				// item is not in the view
				if (elementPosition !== 'top') {
					transformDistance = (elementOffset - this.windowMiddle - elementMiddle) * -elementSpeed;
				}
			}

			// If element is in view
			if (inview && elementSpeed) {
				switch (elementPosition) {
					case 'top':
						transformDistance = (scrollbarTop - elementOffset) * -elementSpeed;
						break;

					case 'bottom':
						transformDistance = (scrollbarLimit - scrollBottom) * elementSpeed;
						break;

					default:
						transformDistance = (scrollbarMiddle - elementMiddle) * -elementSpeed;
						break;
				}
			}

			if (transformDistance) {
				// Transform horizontal OR vertical.
				// Default to vertical.
				elementHorizontal ? this.transform($element, transformDistance + 'px') : this.transform($element, 0, transformDistance + 'px');
			}
		}
	};

	// Transform element horizontal
	// ==========================================================================
	//

	/**
  * [transform description]
  * @param  {[type]} $element Jquery element.
  * @param  {mixed} 	x        Translate value
  * @param  {mixed} 	y        Translate value
  * @param  {mixed} 	z        Translate value
  * @return {void}
  */


	_class.prototype.transform = function transform($element, x, y, z) {
		// Defaults
		x = x || 0;
		y = y || 0;
		z = z || 0;

		// Translate
		$element.css({
			'-webkit-transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')',
			'-ms-transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')',
			'transform': 'translate3d(' + x + ', ' + y + ', ' + z + ')'
		}).data('transform', {
			x: x,
			y: y,
			z: z
		}); // Remember

		$element.find(this.selector).each(function (i, e) {
			var $this = $(e);
			if (!$this.data('transform')) {
				$this.data('transform', {
					x: x,
					y: y,
					z: z
				});
			}
		});
	};

	// Scroll to
	// ==========================================================================


	_class.prototype.scrollTo = function scrollTo(event) {

		if (!$.isNumeric(event)) {
			event.preventDefault();

			var $target = $(event.currentTarget);
			var targetData = void 0;

			if ($target.data('target')) {
				targetData = $target.data('target');
			} else {
				targetData = $target.attr('href');
			}

			var targetOffset = $(targetData).offset().top + this.scrollbar.scrollTop;
		} else {
			var targetOffset = event;
		}

		this.scrollbar.scrollTo(0, targetOffset, 900);
	};

	// Destroy
	// ==========================================================================


	_class.prototype.destroy = function destroy() {
		this.$el.off('.SmoothScrolling');
		this.parallaxElements = undefined;
		this.elements = {};

		if (!this.isMobile) {
			this.scrollbar.destroy();
		}
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"assets/scripts/global/dependencies":3,"assets/scripts/utils/environment":35,"./AbstractModule":6,"smooth-scrollbar":43,"throttled-resize":44}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _visibility = require('assets/scripts/utils/visibility');

var _AbstractModule2 = require('./AbstractModule');

var _AbstractModule3 = _interopRequireDefault(_AbstractModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* jshint esnext: true */


var _class = function (_AbstractModule) {
	_inherits(_class, _AbstractModule);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _AbstractModule.call(this, options));

		_this.$label = _this.$el.find('.js-label');

		_this.$document.on('Title.changeLabel', function (event, value) {
			_this.changeLabel(value);
			_this.destroy();
		});

		_this.hiddenCallbackIdent = (0, _visibility.visibilityApi)({
			action: 'addCallback',
			state: 'hidden',
			callback: _this.logHidden
		});

		_this.visibleCallbackIdent = (0, _visibility.visibilityApi)({
			action: 'addCallback',
			state: 'visible',
			callback: _this.logVisible
		});
		return _this;
	}

	_class.prototype.logHidden = function logHidden() {
		console.log('Title is hidden');
	};

	_class.prototype.logVisible = function logVisible() {
		console.log('Title is visible');
	};

	_class.prototype.changeLabel = function changeLabel(value) {
		this.$label.text(value);
	};

	_class.prototype.destroy = function destroy() {
		this.$document.off('Title.changeLabel');

		(0, _visibility.visibilityApi)({
			action: 'removeCallback',
			state: 'hidden',
			ident: this.hiddenCallbackIdent
		});

		(0, _visibility.visibilityApi)({
			action: 'removeCallback',
			state: 'visible',
			ident: this.visibleCallbackIdent
		});

		this.$el.off('.Title');
	};

	return _class;
}(_AbstractModule3.default);

exports.default = _class;

},{"assets/scripts/utils/visibility":39,"./AbstractModule":6}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = tap;
var DISTANCE_THRESHOLD = 5; // maximum pixels pointer can move before cancel
var TIME_THRESHOLD = 400; // maximum milliseconds between down and up before cancel

function tap(node, callback) {
	return new TapHandler(node, callback);
}

function TapHandler(node, callback) {
	this.node = node;
	this.callback = callback;

	this.preventMousedownEvents = false;

	this.bind(node);
}

TapHandler.prototype = {
	bind: function bind(node) {
		// listen for mouse/pointer events...
		if (window.navigator.pointerEnabled) {
			node.addEventListener('pointerdown', handleMousedown, false);
		} else if (window.navigator.msPointerEnabled) {
			node.addEventListener('MSPointerDown', handleMousedown, false);
		} else {
			node.addEventListener('mousedown', handleMousedown, false);

			// ...and touch events
			node.addEventListener('touchstart', handleTouchstart, false);
		}

		// native buttons, and <input type='button'> elements, should fire a tap event
		// when the space key is pressed
		if (node.tagName === 'BUTTON' || node.type === 'button') {
			node.addEventListener('focus', handleFocus, false);
		}

		node.__tap_handler__ = this;
	},
	fire: function fire(event, x, y) {
		this.callback({
			node: this.node,
			original: event,
			x: x,
			y: y
		});
	},
	mousedown: function mousedown(event) {
		var _this = this;

		if (this.preventMousedownEvents) {
			return;
		}

		if (event.which !== undefined && event.which !== 1) {
			return;
		}

		var x = event.clientX;
		var y = event.clientY;

		// This will be null for mouse events.
		var pointerId = event.pointerId;

		var handleMouseup = function handleMouseup(event) {
			if (event.pointerId != pointerId) {
				return;
			}

			_this.fire(event, x, y);
			cancel();
		};

		var handleMousemove = function handleMousemove(event) {
			if (event.pointerId != pointerId) {
				return;
			}

			if (Math.abs(event.clientX - x) >= DISTANCE_THRESHOLD || Math.abs(event.clientY - y) >= DISTANCE_THRESHOLD) {
				cancel();
			}
		};

		var cancel = function cancel() {
			_this.node.removeEventListener('MSPointerUp', handleMouseup, false);
			document.removeEventListener('MSPointerMove', handleMousemove, false);
			document.removeEventListener('MSPointerCancel', cancel, false);
			_this.node.removeEventListener('pointerup', handleMouseup, false);
			document.removeEventListener('pointermove', handleMousemove, false);
			document.removeEventListener('pointercancel', cancel, false);
			_this.node.removeEventListener('click', handleMouseup, false);
			document.removeEventListener('mousemove', handleMousemove, false);
		};

		if (window.navigator.pointerEnabled) {
			this.node.addEventListener('pointerup', handleMouseup, false);
			document.addEventListener('pointermove', handleMousemove, false);
			document.addEventListener('pointercancel', cancel, false);
		} else if (window.navigator.msPointerEnabled) {
			this.node.addEventListener('MSPointerUp', handleMouseup, false);
			document.addEventListener('MSPointerMove', handleMousemove, false);
			document.addEventListener('MSPointerCancel', cancel, false);
		} else {
			this.node.addEventListener('click', handleMouseup, false);
			document.addEventListener('mousemove', handleMousemove, false);
		}

		setTimeout(cancel, TIME_THRESHOLD);
	},
	touchdown: function touchdown(event) {
		var _this2 = this;

		var touch = event.touches[0];

		var x = touch.clientX;
		var y = touch.clientY;

		var finger = touch.identifier;

		var handleTouchup = function handleTouchup(event) {
			var touch = event.changedTouches[0];

			if (touch.identifier !== finger) {
				cancel();
				return;
			}

			event.preventDefault(); // prevent compatibility mouse event

			// for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
			_this2.preventMousedownEvents = true;
			clearTimeout(_this2.preventMousedownTimeout);

			_this2.preventMousedownTimeout = setTimeout(function () {
				_this2.preventMousedownEvents = false;
			}, 400);

			_this2.fire(event, x, y);
			cancel();
		};

		var handleTouchmove = function handleTouchmove(event) {
			if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
				cancel();
			}

			var touch = event.touches[0];
			if (Math.abs(touch.clientX - x) >= DISTANCE_THRESHOLD || Math.abs(touch.clientY - y) >= DISTANCE_THRESHOLD) {
				cancel();
			}
		};

		var cancel = function cancel() {
			_this2.node.removeEventListener('touchend', handleTouchup, false);
			window.removeEventListener('touchmove', handleTouchmove, false);
			window.removeEventListener('touchcancel', cancel, false);
		};

		this.node.addEventListener('touchend', handleTouchup, false);
		window.addEventListener('touchmove', handleTouchmove, false);
		window.addEventListener('touchcancel', cancel, false);

		setTimeout(cancel, TIME_THRESHOLD);
	},
	teardown: function teardown() {
		var node = this.node;

		node.removeEventListener('pointerdown', handleMousedown, false);
		node.removeEventListener('MSPointerDown', handleMousedown, false);
		node.removeEventListener('mousedown', handleMousedown, false);
		node.removeEventListener('touchstart', handleTouchstart, false);
		node.removeEventListener('focus', handleFocus, false);
	}
};

function handleMousedown(event) {
	this.__tap_handler__.mousedown(event);
}

function handleTouchstart(event) {
	this.__tap_handler__.touchdown(event);
}

function handleFocus() {
	this.addEventListener('keydown', handleKeydown, false);
	this.addEventListener('blur', handleBlur, false);
}

function handleBlur() {
	this.removeEventListener('keydown', handleKeydown, false);
	this.removeEventListener('blur', handleBlur, false);
}

function handleKeydown(event) {
	if (event.which === 32) {
		// space key
		this.__tap_handler__.fire();
	}
}

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var DEFAULTS = {
	delay: 0,
	duration: 300,
	easing: 'linear'
};

function fade(t, params) {
	var targetOpacity;

	params = t.processParams(params, DEFAULTS);

	if (t.isIntro) {
		targetOpacity = t.getStyle('opacity');
		t.setStyle('opacity', 0);
	} else {
		targetOpacity = 0;
	}
	t.animateStyle('opacity', targetOpacity, params).then(t.complete);
}

exports.default = fade;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($element) {
	if ($element instanceof jQuery && $element.length > 0) {
		if (isAnimating === false) {

			if (window.matchMedia('(min-width: ' + _environment.minWidth + 'px)').matches) {
				headerOffset = 70;
			} else {
				headerOffset = 90;
			}

			isAnimating = true;

			$('html, body').animate({
				scrollTop: $element.offset().top - headerOffset
			}, speed, 'swing', function () {
				isAnimating = false;
			});
		}
	}
};

var _environment = require('assets/scripts/utils/environment');

var isAnimating = false;
var headerOffset;
var speed = 300;

},{"assets/scripts/utils/environment":35}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addToArray = addToArray;
exports.arrayContains = arrayContains;
exports.arrayContentsMatch = arrayContentsMatch;
exports.ensureArray = ensureArray;
exports.lastItem = lastItem;
exports.removeFromArray = removeFromArray;
exports.toArray = toArray;
exports.findByKeyValue = findByKeyValue;

var _is = require('./is');

function addToArray(array, value) {
	var index = array.indexOf(value);

	if (index === -1) {
		array.push(value);
	}
}

function arrayContains(array, value) {
	for (var i = 0, c = array.length; i < c; i++) {
		if (array[i] == value) {
			return true;
		}
	}

	return false;
}

function arrayContentsMatch(a, b) {
	var i;

	if (!(0, _is.isArray)(a) || !(0, _is.isArray)(b)) {
		return false;
	}

	if (a.length !== b.length) {
		return false;
	}

	i = a.length;
	while (i--) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
}

function ensureArray(x) {
	if (typeof x === 'string') {
		return [x];
	}

	if (x === undefined) {
		return [];
	}

	return x;
}

function lastItem(array) {
	return array[array.length - 1];
}

function removeFromArray(array, member) {
	if (!array) {
		return;
	}

	var index = array.indexOf(member);

	if (index !== -1) {
		array.splice(index, 1);
	}
}

function toArray(arrayLike) {
	var array = [],
	    i = arrayLike.length;
	while (i--) {
		array[i] = arrayLike[i];
	}

	return array;
}

function findByKeyValue(array, key, value) {
	return array.filter(function (obj) {
		return obj[key] === value;
	});
}

},{"./is":38}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $document = $(document);
var $window = $(window);
var $html = $(document.documentElement);
var $body = $(document.body);

var minWidth = 1024;

exports.$document = $document;
exports.$window = $window;
exports.$html = $html;
exports.$body = $body;

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	window.Ractive.DEBUG = false;
	svg4everybody();

	var pagetransitionsManager = new _PageTransitionsManager2.default();
};

var _PageTransitionsManager = require('assets/scripts/modules/PageTransitionsManager');

var _PageTransitionsManager2 = _interopRequireDefault(_PageTransitionsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"assets/scripts/modules/PageTransitionsManager":23}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.escapeHtml = escapeHtml;
exports.unescapeHtml = unescapeHtml;
exports.getNodeData = getNodeData;
/**
 * @see  https://github.com/ractivejs/ractive/blob/dev/src/utils/html.js
 */
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Prepare HTML content that contains mustache characters for use with Ractive
 * @param  {string} str
 * @return {string}
 */
function unescapeHtml(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/**
 * Get element data attributes
 * @param   {DOMElement}  node
 * @return  {Array}       data
 */
function getNodeData(node) {
    // All attributes
    var attributes = node.attributes;

    // Regex Pattern
    var pattern = /^data\-(.+)$/;

    // Output
    var data = {};

    for (var i in attributes) {
        if (!attributes[i]) {
            continue;
        }

        // Attributes name (ex: data-module)
        var name = attributes[i].name;

        // This happens.
        if (!name) {
            continue;
        }

        var match = name.match(pattern);
        if (!match) {
            continue;
        }

        // If this throws an error, you have some
        // serious problems in your HTML.
        data[match[1]] = node.getAttribute(name);
    }

    return data;
}

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isEqual = isEqual;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isFunction = isFunction;
var toString = Object.prototype.toString,
    arrayLikePattern = /^\[object (?:Array|FileList)\]$/;

// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
function isArray(thing) {
	return toString.call(thing) === '[object Array]';
}

function isArrayLike(obj) {
	return arrayLikePattern.test(toString.call(obj));
}

function isEqual(a, b) {
	if (a === null && b === null) {
		return true;
	}

	if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
		return false;
	}

	return a === b;
}

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumeric(thing) {
	return !isNaN(parseFloat(thing)) && isFinite(thing);
}

function isObject(thing) {
	return thing && toString.call(thing) === '[object Object]';
}

function isFunction(thing) {
	var getType = {};
	return thing && getType.toString.call(thing) === '[object Function]';
}

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.visibilityApi = undefined;

var _is = require('./is');

var _array = require('./array');

var _environment = require('./environment');

var CALLBACKS = {
	hidden: [],
	visible: []
}; /* jshint esnext: true */


var ACTIONS = ['addCallback', 'removeCallback'];

var STATES = ['visible', 'hidden'];

var PREFIX = 'v-';

var UUID = 0;

// Main event
_environment.$document.on('visibilitychange', function (event) {
	if (document.hidden) {
		onDocumentChange('hidden');
	} else {
		onDocumentChange('visible');
	}
});

/**
 * Add a callback
 * @param {string}   state
 * @param {function} callback
 * @return {string}  ident
 */
function addCallback(state, options) {
	var callback = options.callback || '';

	if (!(0, _is.isFunction)(callback)) {
		console.warn('Callback is not a function');
		return false;
	}

	var ident = PREFIX + UUID++;

	CALLBACKS[state].push({
		ident: ident,
		callback: callback
	});

	return ident;
}

/**
 * Remove a callback
 * @param  {string}   state  Visible or hidden
 * @param  {string}   ident  Unique identifier
 * @return {boolean}         If operation was a success
 */
function removeCallback(state, options) {
	var ident = options.ident || '';

	if (typeof ident === 'undefined' || ident === '') {
		console.warn('Need ident to remove callback');
		return false;
	}

	var index = (0, _array.findByKeyValue)(CALLBACKS[state], 'ident', ident)[0];

	// console.log(ident)
	// console.log(CALLBACKS[state])

	if (typeof index !== 'undefined') {
		(0, _array.removeFromArray)(CALLBACKS[state], index);
		return true;
	} else {
		console.warn('Callback could not be found');
		return false;
	}
}

/**
 * When document state changes, trigger callbacks
 * @param  {string}  state  Visible or hidden
 */
function onDocumentChange(state) {
	var callbackArray = CALLBACKS[state];
	var i = 0;
	var len = callbackArray.length;

	for (; i < len; i++) {
		callbackArray[i].callback();
	}
}

/**
 * Public facing API for adding and removing callbacks
 * @param   {object}           options  Options
 * @return  {boolean|integer}           Unique identifier for the callback or boolean indicating success or failure
 */
function visibilityApi(options) {
	var action = options.action || '';
	var state = options.state || '';
	var ret = void 0;

	// Type and value checking
	if (!(0, _array.arrayContains)(ACTIONS, action)) {
		console.warn('Action does not exist');
		return false;
	}
	if (!(0, _array.arrayContains)(STATES, state)) {
		console.warn('State does not exist');
		return false;
	}

	// @todo Magic call function pls
	if (action === 'addCallback') {
		ret = addCallback(state, options);
	} else if (action === 'removeCallback') {
		ret = removeCallback(state, options);
	}

	return ret;
}

exports.visibilityApi = visibilityApi;

},{"./array":34,"./environment":35,"./is":38}],40:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barba", [], factory);
	else if(typeof exports === 'object')
		exports["Barba"] = factory();
	else
		root["Barba"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//Promise polyfill https://github.com/taylorhakes/promise-polyfill
	
	if (typeof Promise !== 'function') {
	 window.Promise = __webpack_require__(1);
	}
	
	var Barba = {
	  version: '1.0.0',
	  BaseTransition: __webpack_require__(4),
	  BaseView: __webpack_require__(6),
	  BaseCache: __webpack_require__(8),
	  Dispatcher: __webpack_require__(7),
	  HistoryManager: __webpack_require__(9),
	  Pjax: __webpack_require__(10),
	  Prefetch: __webpack_require__(13),
	  Utils: __webpack_require__(5)
	};
	
	module.exports = Barba;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {
	
	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;
	
	  function noop() {
	  }
	
	  // Use polyfill for setImmediate for performance gains
	  var asap = (typeof setImmediate === 'function' && setImmediate) ||
	    function (fn) {
	      setTimeoutFunc(fn, 0);
	    };
	
	  var onUnhandledRejection = function onUnhandledRejection(err) {
	    if (typeof console !== 'undefined' && console) {
	      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	    }
	  };
	
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
	    return function () {
	      fn.apply(thisArg, arguments);
	    };
	  }
	
	  function Promise(fn) {
	    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	    if (typeof fn !== 'function') throw new TypeError('not a function');
	    this._state = 0;
	    this._handled = false;
	    this._value = undefined;
	    this._deferreds = [];
	
	    doResolve(fn, this);
	  }
	
	  function handle(self, deferred) {
	    while (self._state === 3) {
	      self = self._value;
	    }
	    if (self._state === 0) {
	      self._deferreds.push(deferred);
	      return;
	    }
	    self._handled = true;
	    asap(function () {
	      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	      if (cb === null) {
	        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	        return;
	      }
	      var ret;
	      try {
	        ret = cb(self._value);
	      } catch (e) {
	        reject(deferred.promise, e);
	        return;
	      }
	      resolve(deferred.promise, ret);
	    });
	  }
	
	  function resolve(self, newValue) {
	    try {
	      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then;
	        if (newValue instanceof Promise) {
	          self._state = 3;
	          self._value = newValue;
	          finale(self);
	          return;
	        } else if (typeof then === 'function') {
	          doResolve(bind(then, newValue), self);
	          return;
	        }
	      }
	      self._state = 1;
	      self._value = newValue;
	      finale(self);
	    } catch (e) {
	      reject(self, e);
	    }
	  }
	
	  function reject(self, newValue) {
	    self._state = 2;
	    self._value = newValue;
	    finale(self);
	  }
	
	  function finale(self) {
	    if (self._state === 2 && self._deferreds.length === 0) {
	      asap(function() {
	        if (!self._handled) {
	          onUnhandledRejection(self._value);
	        }
	      });
	    }
	
	    for (var i = 0, len = self._deferreds.length; i < len; i++) {
	      handle(self, self._deferreds[i]);
	    }
	    self._deferreds = null;
	  }
	
	  function Handler(onFulfilled, onRejected, promise) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.promise = promise;
	  }
	
	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
	    var done = false;
	    try {
	      fn(function (value) {
	        if (done) return;
	        done = true;
	        resolve(self, value);
	      }, function (reason) {
	        if (done) return;
	        done = true;
	        reject(self, reason);
	      });
	    } catch (ex) {
	      if (done) return;
	      done = true;
	      reject(self, ex);
	    }
	  }
	
	  Promise.prototype['catch'] = function (onRejected) {
	    return this.then(null, onRejected);
	  };
	
	  Promise.prototype.then = function (onFulfilled, onRejected) {
	    var prom = new (this.constructor)(noop);
	
	    handle(this, new Handler(onFulfilled, onRejected, prom));
	    return prom;
	  };
	
	  Promise.all = function (arr) {
	    var args = Array.prototype.slice.call(arr);
	
	    return new Promise(function (resolve, reject) {
	      if (args.length === 0) return resolve([]);
	      var remaining = args.length;
	
	      function res(i, val) {
	        try {
	          if (val && (typeof val === 'object' || typeof val === 'function')) {
	            var then = val.then;
	            if (typeof then === 'function') {
	              then.call(val, function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	          args[i] = val;
	          if (--remaining === 0) {
	            resolve(args);
	          }
	        } catch (ex) {
	          reject(ex);
	        }
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        res(i, args[i]);
	      }
	    });
	  };
	
	  Promise.resolve = function (value) {
	    if (value && typeof value === 'object' && value.constructor === Promise) {
	      return value;
	    }
	
	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  };
	
	  Promise.reject = function (value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  };
	
	  Promise.race = function (values) {
	    return new Promise(function (resolve, reject) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        values[i].then(resolve, reject);
	      }
	    });
	  };
	
	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @private
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
	    asap = fn;
	  };
	
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	    onUnhandledRejection = fn;
	  };
	
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Promise;
	  } else if (!root.Promise) {
	    root.Promise = Promise;
	  }
	
	})(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseTransition to extend
	 *
	 * @namespace Barba.BaseTransition
	 * @type {Object}
	 */
	var BaseTransition = {
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  oldContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  newContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {Promise}
	   */
	  newContainerLoading: undefined,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseTransition
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * This function is called from Pjax module to initialize
	   * the transition.
	   *
	   * @memberOf Barba.BaseTransition
	   * @private
	   * @param  {HTMLElement} oldContainer
	   * @param  {Promise} newContainer
	   * @return {Promise}
	   */
	  init: function(oldContainer, newContainer) {
	    var _this = this;
	
	    this.oldContainer = oldContainer;
	    this._newContainerPromise = newContainer;
	
	    this.deferred = Utils.deferred();
	    this.newContainerReady = Utils.deferred();
	    this.newContainerLoading = this.newContainerReady.promise;
	
	    this.start();
	
	    this._newContainerPromise.then(function(newContainer) {
	      _this.newContainer = newContainer;
	      _this.newContainerReady.resolve();
	    });
	
	    return this.deferred.promise;
	  },
	
	  /**
	   * This function needs to be called as soon the Transition is finished
	   *
	   * @memberOf Barba.BaseTransition
	   */
	  done: function() {
	    this.oldContainer.parentNode.removeChild(this.oldContainer);
	    this.newContainer.style.visibility = 'visible';
	    this.deferred.resolve();
	  },
	
	  /**
	   * Constructor for your Transition
	   *
	   * @memberOf Barba.BaseTransition
	   * @abstract
	   */
	  start: function() {},
	};
	
	module.exports = BaseTransition;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Just an object with some helpful functions
	 *
	 * @type {Object}
	 * @namespace Barba.Utils
	 */
	var Utils = {
	  /**
	   * Return the current url
	   *
	   * @memberOf Barba.Utils
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return window.location.protocol + '//' +
	           window.location.host +
	           window.location.pathname +
	           window.location.search;
	  },
	
	  /**
	   * Given an url, return it without the hash
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} url
	   * @return {String} newCleanUrl
	   */
	  cleanLink: function(url) {
	    return url.replace(/#.*/, '');
	  },
	
	  /**
	   * Time in millisecond after the xhr request goes in timeout
	   *
	   * @memberOf Barba.Utils
	   * @type {Number}
	   * @default
	   */
	  xhrTimeout: 5000,
	
	  /**
	   * Start an XMLHttpRequest() and return a Promise
	   *
	   * @memberOf Barba.Utils
	   * @param  {String} url
	   * @return {Promise}
	   */
	  xhr: function(url) {
	    var deferred = this.deferred();
	    var req = new XMLHttpRequest();
	
	    req.onreadystatechange = function() {
	      if (req.readyState === 4) {
	        if (req.status === 200) {
	          return deferred.resolve(req.responseText);
	        } else {
	          return deferred.reject(new Error('xhr: HTTP code is not 200'));
	        }
	      }
	    };
	
	    req.ontimeout = function() {
	      return deferred.reject(new Error('xhr: Timeout exceeded'));
	    };
	
	    req.open('GET', url);
	    req.timeout = this.xhrTimeout;
	    req.setRequestHeader('x-barba', 'yes');
	    req.send();
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get obj and props and return a new object with the property merged
	   *
	   * @memberOf Barba.Utils
	   * @param  {object} obj
	   * @param  {object} props
	   * @return {object}
	   */
	  extend: function(obj, props) {
	    var newObj = Object.create(obj);
	
	    for(var prop in props) {
	      if(props.hasOwnProperty(prop)) {
	        newObj[prop] = props[prop];
	      }
	    }
	
	    return newObj;
	  },
	
	  /**
	   * Return a new "Deferred" object
	   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
	   *
	   * @memberOf Barba.Utils
	   * @return {Deferred}
	   */
	  deferred: function() {
	    return new function() {
	      this.resolve = null;
	      this.reject = null;
	
	      this.promise = new Promise(function(resolve, reject) {
	        this.resolve = resolve;
	        this.reject = reject;
	      }.bind(this));
	    };
	  },
	
	  /**
	   * Return the port number normalized, eventually you can pass a string to be normalized.
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} p
	   * @return {Int} port
	   */
	  getPort: function(p) {
	    var port = typeof p !== 'undefined' ? p : window.location.port;
	    var protocol = window.location.protocol;
	
	    if (port != '')
	      return parseInt(port);
	
	    if (protocol === 'http:')
	      return 80;
	
	    if (protocol === 'https:')
	      return 443;
	  }
	};
	
	module.exports = Utils;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(7);
	var Utils = __webpack_require__(5);
	
	/**
	 * BaseView to be extended
	 *
	 * @namespace Barba.BaseView
	 * @type {Object}
	 */
	var BaseView  = {
	  /**
	   * Namespace of the view.
	   * (need to be associated with the data-namespace of the container)
	   *
	   * @memberOf Barba.BaseView
	   * @type {String}
	   */
	  namespace: null,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseView
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Init the view.
	   * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
	   * in this way .onEnter() and .onEnterCompleted() will be fired for the current
	   * container when the page is loaded.
	   *
	   * @memberOf Barba.BaseView
	   */
	  init: function() {
	    var _this = this;
	
	    Dispatcher.on('initStateChange',
	      function(newStatus, oldStatus) {
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeave();
	      }
	    );
	
	    Dispatcher.on('newPageReady',
	      function(newStatus, oldStatus, container) {
	        _this.container = container;
	
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnter();
	      }
	    );
	
	    Dispatcher.on('transitionCompleted',
	      function(newStatus, oldStatus) {
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnterCompleted();
	
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeaveCompleted();
	      }
	    );
	  },
	
	 /**
	  * This function will be fired when the container
	  * is ready and attached to the DOM.
	  *
	  * @memberOf Barba.BaseView
	  * @abstract
	  */
	  onEnter: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to this container has just finished.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onEnterCompleted: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to a new container has just started.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeave: function() {},
	
	  /**
	   * This function will be fired when the container
	   * has just been removed from the DOM.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeaveCompleted: function() {}
	}
	
	module.exports = BaseView;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Little Dispatcher inspired by MicroEvent.js
	 *
	 * @namespace Barba.Dispatcher
	 * @type {Object}
	 */
	var Dispatcher = {
	  /**
	   * Object that keeps all the events
	   *
	   * @memberOf Barba.Dispatcher
	   * @readOnly
	   * @type {Object}
	   */
	  events: {},
	
	  /**
	   * Bind a callback to an event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  on: function(e, f) {
	    this.events[e] = this.events[e] || [];
	    this.events[e].push(f);
	  },
	
	  /**
	   * Unbind event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  off: function(e, f) {
	    if(e in this.events === false)
	      return;
	
	    this.events[e].splice(this.events[e].indexOf(f), 1);
	  },
	
	  /**
	   * Fire the event running all the event associated to it
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {...*} args
	   */
	  trigger: function(e) {//e, ...args
	    if (e in this.events === false)
	      return;
	
	    for(var i = 0; i < this.events[e].length; i++){
	      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
	  }
	};
	
	module.exports = Dispatcher;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseCache it's a simple static cache
	 *
	 * @namespace Barba.BaseCache
	 * @type {Object}
	 */
	var BaseCache = {
	  /**
	   * The Object that keeps all the key value information
	   *
	   * @memberOf Barba.BaseCache
	   * @type {Object}
	   */
	  data: {},
	
	  /**
	   * Helper to extend this object
	   *
	   * @memberOf Barba.BaseCache
	   * @private
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj) {
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Set a key and value data, mainly Barba is going to save promises
	   *
	   * @memberOf Barba.BaseCache
	   * @param {String} key
	   * @param {*} value
	   */
	  set: function(key, val) {
	    this.data[key] = val;
	  },
	
	  /**
	   * Retrieve the data using the key
	   *
	   * @memberOf Barba.BaseCache
	   * @param  {String} key
	   * @return {*}
	   */
	  get: function(key) {
	    return this.data[key];
	  },
	
	  /**
	   * Flush the cache
	   *
	   * @memberOf Barba.BaseCache
	   */
	  reset: function() {
	    this.data = {};
	  }
	};
	
	module.exports = BaseCache;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * HistoryManager helps to keep track of the navigation
	 *
	 * @namespace Barba.HistoryManager
	 * @type {Object}
	 */
	var HistoryManager = {
	  /**
	   * Keep track of the status in historic order
	   *
	   * @memberOf Barba.HistoryManager
	   * @readOnly
	   * @type {Array}
	   */
	  history: [],
	
	  /**
	   * Add a new set of url and namespace
	   *
	   * @memberOf Barba.HistoryManager
	   * @param {String} url
	   * @param {String} namespace
	   * @private
	   */
	  add: function(url, namespace) {
	    if (!namespace)
	      namespace = undefined;
	
	    this.history.push({
	      url: url,
	      namespace: namespace
	    });
	  },
	
	  /**
	   * Return information about the current status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  currentStatus: function() {
	    return this.history[this.history.length - 1];
	  },
	
	  /**
	   * Return information about the previous status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  prevStatus: function() {
	    var history = this.history;
	
	    if (history.length < 2)
	      return null;
	
	    return history[history.length - 2];
	  }
	};
	
	module.exports = HistoryManager;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Dispatcher = __webpack_require__(7);
	var HideShowTransition = __webpack_require__(11);
	var BaseCache = __webpack_require__(8);
	
	var HistoryManager = __webpack_require__(9);
	var Dom = __webpack_require__(12);
	
	/**
	 * Pjax is a static object with main function
	 *
	 * @namespace Barba.Pjax
	 * @borrows Dom as Dom
	 * @type {Object}
	 */
	var Pjax = {
	  Dom: Dom,
	  History: HistoryManager,
	  Cache: BaseCache,
	
	  /**
	   * Indicate wether or not use the cache
	   *
	   * @memberOf Barba.Pjax
	   * @type {Boolean}
	   * @default
	   */
	  cacheEnabled: true,
	
	  /**
	   * Indicate if there is an animation in progress
	   *
	   * @memberOf Barba.Pjax
	   * @readOnly
	   * @type {Boolean}
	   */
	  transitionProgress: false,
	
	  /**
	   * Class name used to ignore links
	   *
	   * @memberOf Barba.Pjax
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba',
	
	  /**
	   * Function to be called to start Pjax
	   *
	   * @memberOf Barba.Pjax
	   */
	  start: function() {
	    this.init();
	  },
	
	  /**
	   * Init the events
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  init: function() {
	    var container = this.Dom.getContainer();
	    var wrapper = this.Dom.getWrapper();
	
	    wrapper.setAttribute('aria-live', 'polite');
	
	    this.History.add(
	      this.getCurrentUrl(),
	      this.Dom.getNamespace(container)
	    );
	
	    //Fire for the current view.
	    Dispatcher.trigger('initStateChange', this.History.currentStatus());
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      {},
	      container,
	      this.Dom.currentHTML
	    );
	    Dispatcher.trigger('transitionCompleted', this.History.currentStatus());
	
	    this.bindEvents();
	  },
	
	  /**
	   * Attach the eventlisteners
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  bindEvents: function() {
	    document.addEventListener('click',
	      this.onLinkClick.bind(this)
	    );
	
	    window.addEventListener('popstate',
	      this.onStateChange.bind(this)
	    );
	  },
	
	  /**
	   * Return the currentURL cleaned
	   *
	   * @memberOf Barba.Pjax
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return Utils.cleanLink(
	      Utils.getCurrentUrl()
	    );
	  },
	
	  /**
	   * Change the URL with pushstate and trigger the state change
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} newUrl
	   */
	  goTo: function(url) {
	   // window.history.pushState(null, null, url);
	   window.location.url;
	    this.onStateChange();
	  },
	
	  /**
	   * Force the browser to go to a certain url
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} url
	   * @private
	   */
	  forceGoTo: function(url) {
	    window.location = url;
	  },
	
	  /**
	   * Load an url, will start an xhr request or load from the cache
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param  {String} url
	   * @return {Promise}
	   */
	  load: function(url) {
	    var deferred = Utils.deferred();
	    var _this = this;
	    var xhr;
	
	    xhr = this.Cache.get(url);
	
	    if (!xhr) {
	      xhr = Utils.xhr(url);
	      this.Cache.set(url, xhr);
	    }
	
	    xhr.then(
	      function(data) {
	        var container = _this.Dom.parseResponse(data);
	
	        _this.Dom.putContainer(container);
	
	        if (!_this.cacheEnabled)
	          _this.Cache.reset();
	
	        deferred.resolve(container);
	      },
	      function() {
	        //Something went wrong (timeout, 404, 505...)
	        _this.forceGoTo(url);
	
	        deferred.reject();
	      }
	    );
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get the .href parameter out of an element
	   * and handle special cases (like xlink:href)
	   *
	   * @private
	   * @memberOf Barba.Pjax
	   * @param  {HTMLElement} el
	   * @return {String} href
	   */
	  getHref: function(el) {
	    if (!el) {
	      return undefined;
	    }
	
	    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
	      return el.getAttribute('xlink:href');
	    }
	
	    if (typeof el.href === 'string') {
	      return el.href;
	    }
	
	    return undefined;
	  },
	
	  /**
	   * Callback called from click event
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {MouseEvent} evt
	   */
	  onLinkClick: function(evt) {
	    var el = evt.target;
	
	    //Go up in the nodelist until we
	    //find something with an href
	    while (el && !this.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (this.preventCheck(evt, el)) {
	      evt.stopPropagation();
	      evt.preventDefault();
	
	      Dispatcher.trigger('linkClicked', el, evt);
	
	      var href = this.getHref(el);
	      this.goTo(href);
	    }
	  },
	
	  /**
	   * Determine if the link should be followed
	   *
	   * @memberOf Barba.Pjax
	   * @param  {MouseEvent} evt
	   * @param  {HTMLElement} element
	   * @return {Boolean}
	   */
	  preventCheck: function(evt, element) {
	    if (!window.history.pushState)
	      return false;
	
	    var href = this.getHref(element);
	
	    //User
	    if (!element || !href)
	      return false;
	
	    //Middle click, cmd click, and ctrl click
	    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)
	      return false;
	
	    //Ignore target with _blank target
	    if (element.target && element.target === '_blank')
	      return false;
	
	    //Check if it's the same domain
	    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname)
	      return false;
	
	    //Check if the port is the same
	    if (Utils.getPort() !== Utils.getPort(element.port))
	      return false;
	
	    //Ignore case when a hash is being tacked on the current URL
	    if (href.indexOf('#') > -1)
	      return false;
	
	    //Ignore case where there is download attribute
	    if (element.getAttribute && typeof element.getAttribute('download') === 'string')
	      return false;
	
	    //In case you're trying to load the same page
	    if (Utils.cleanLink(href) == Utils.cleanLink(location.href))
	      return false;
	
	    if (element.classList.contains(this.ignoreClassLink))
	      return false;
	
	    return true;
	  },
	
	  /**
	   * Return a transition object
	   *
	   * @memberOf Barba.Pjax
	   * @return {Barba.Transition} Transition object
	   */
	  getTransition: function() {
	    //User customizable
	    return HideShowTransition;
	  },
	
	  /**
	   * Method called after a 'popstate' or from .goTo()
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onStateChange: function() {
	    var newUrl = this.getCurrentUrl();
	
	    if (this.transitionProgress)
	      this.forceGoTo(newUrl);
	
	    if (this.History.currentStatus().url === newUrl)
	      return false;
	
	    this.History.add(newUrl);
	
	    var newContainer = this.load(newUrl);
	    var transition = Object.create(this.getTransition());
	
	    this.transitionProgress = true;
	
	    Dispatcher.trigger('initStateChange',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	
	    var transitionInstance = transition.init(
	      this.Dom.getContainer(),
	      newContainer
	    );
	
	    newContainer.then(
	      this.onNewContainerLoaded.bind(this)
	    );
	
	    transitionInstance.then(
	      this.onTransitionEnd.bind(this)
	    );
	  },
	
	  /**
	   * Function called as soon the new container is ready
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {HTMLElement} container
	   */
	  onNewContainerLoaded: function(container) {
	    var currentStatus = this.History.currentStatus();
	    currentStatus.namespace = this.Dom.getNamespace(container);
	
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      this.History.prevStatus(),
	      container,
	      this.Dom.currentHTML
	    );
	  },
	
	  /**
	   * Function called as soon the transition is finished
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onTransitionEnd: function() {
	    this.transitionProgress = false;
	
	    Dispatcher.trigger('transitionCompleted',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	  }
	};
	
	module.exports = Pjax;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var BaseTransition = __webpack_require__(4);
	
	/**
	 * Basic Transition object, wait for the new Container to be ready,
	 * scroll top, and finish the transition (removing the old container and displaying the new one)
	 *
	 * @private
	 * @namespace Barba.HideShowTransition
	 * @augments Barba.BaseTransition
	 */
	var HideShowTransition = BaseTransition.extend({
	  start: function() {
	    this.newContainerLoading.then(this.finish.bind(this));
	  },
	
	  finish: function() {
	    document.body.scrollTop = 0;
	    this.done();
	  }
	});
	
	module.exports = HideShowTransition;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Object that is going to deal with DOM parsing/manipulation
	 *
	 * @namespace Barba.Pjax.Dom
	 * @type {Object}
	 */
	var Dom = {
	  /**
	   * The name of the data attribute on the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  dataNamespace: 'namespace',
	
	  /**
	   * Id of the main wrapper
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  wrapperId: 'barba-wrapper',
	
	  /**
	   * Class name used to identify the containers
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  containerClass: 'barba-container',
	
	  /**
	   * Full HTML String of the current page.
	   * By default is the innerHTML of the initial loaded page.
	   *
	   * Each time a new page is loaded, the value is the response of the xhr call.
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   */
	  currentHTML: document.documentElement.innerHTML,
	
	  /**
	   * Parse the responseText obtained from the xhr call
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {String} responseText
	   * @return {HTMLElement}
	   */
	  parseResponse: function(responseText) {
	    this.currentHTML = responseText;
	
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = responseText;
	
	    var titleEl = wrapper.querySelector('title');
	
	    if (titleEl)
	      document.title = titleEl.textContent;
	
	    return this.getContainer(wrapper);
	  },
	
	  /**
	   * Get the main barba wrapper by the ID `wrapperId`
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @return {HTMLElement} element
	   */
	  getWrapper: function() {
	    var wrapper = document.getElementById(this.wrapperId);
	
	    if (!wrapper)
	      throw new Error('Barba.js: wrapper not found!');
	
	    return wrapper;
	  },
	
	  /**
	   * Get the container on the current DOM,
	   * or from an HTMLElement passed via argument
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement}
	   */
	  getContainer: function(element) {
	    if (!element)
	      element = document.body;
	
	    if (!element)
	      throw new Error('Barba.js: DOM not ready!');
	
	    var container = this.parseContainer(element);
	
	    if (container && container.jquery)
	      container = container[0];
	
	    if (!container)
	      throw new Error('Barba.js: no container found');
	
	    return container;
	  },
	
	  /**
	   * Get the namespace of the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {String}
	   */
	  getNamespace: function(element) {
	    if (element && element.dataset) {
	      return element.dataset[this.dataNamespace];
	    } else if (element) {
	      return element.getAttribute('data-' + this.dataNamespace);
	    }
	
	    return null;
	  },
	
	  /**
	   * Put the container on the page
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   */
	  putContainer: function(element) {
	    element.style.visibility = 'hidden';
	
	    var wrapper = this.getWrapper();
	    wrapper.appendChild(element);
	  },
	
	  /**
	   * Get container selector
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement} element
	   */
	  parseContainer: function(element) {
	    return element.querySelector('.' + this.containerClass);
	  }
	};
	
	module.exports = Dom;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Pjax = __webpack_require__(10);
	
	/**
	 * Prefetch
	 *
	 * @namespace Barba.Prefetch
	 * @type {Object}
	 */
	var Prefetch = {
	  /**
	   * Class name used to ignore prefetch on links
	   *
	   * @memberOf Barba.Prefetch
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba-prefetch',
	
	  /**
	   * Init the event listener on mouseover and touchstart
	   * for the prefetch
	   *
	   * @memberOf Barba.Prefetch
	   */
	  init: function() {
	    if (!window.history.pushState) {
	      return false;
	    }
	
	    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
	    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
	  },
	
	  /**
	   * Callback for the mousehover/touchstart
	   *
	   * @memberOf Barba.Prefetch
	   * @private
	   * @param  {Object} evt
	   */
	  onLinkEnter: function(evt) {
	    var el = evt.target;
	
	    while (el && !Pjax.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (!el || el.classList.contains(this.ignoreClassLink)) {
	      return;
	    }
	
	    var url = Pjax.getHref(el);
	
	    //Check if the link is elegible for Pjax
	    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
	      var xhr = Utils.xhr(url);
	      Pjax.Cache.set(url, xhr);
	    }
	  }
	};
	
	module.exports = Prefetch;


/***/ }
/******/ ])
});
;

},{}],41:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Ractive = global.Ractive || {}, global.Ractive.events = global.Ractive.events || {}, global.Ractive.events.tap = factory());
}(this, function () { 'use strict';

	var DISTANCE_THRESHOLD = 5; // maximum pixels pointer can move before cancel
	var TIME_THRESHOLD = 400;   // maximum milliseconds between down and up before cancel

	function tap ( node, callback ) {
		return new TapHandler( node, callback );
	}

	function TapHandler ( node, callback ) {
		this.node = node;
		this.callback = callback;

		this.preventMousedownEvents = false;

		this.bind( node );
	}

	TapHandler.prototype = {
		bind: function bind ( node ) {
			// listen for mouse/pointer events...
			if (window.navigator.pointerEnabled) {
				node.addEventListener( 'pointerdown', handleMousedown, false );
			} else if (window.navigator.msPointerEnabled) {
				node.addEventListener( 'MSPointerDown', handleMousedown, false );
			} else {
				node.addEventListener( 'mousedown', handleMousedown, false );

				// ...and touch events
				node.addEventListener( 'touchstart', handleTouchstart, false );
			}

			// native buttons, and <input type='button'> elements, should fire a tap event
			// when the space key is pressed
			if ( node.tagName === 'BUTTON' || node.type === 'button' ) {
				node.addEventListener( 'focus', handleFocus, false );
			}

			node.__tap_handler__ = this;
		},

		fire: function fire ( event, x, y ) {
			this.callback({
				node: this.node,
				original: event,
				x: x,
				y: y
			});
		},

		mousedown: function mousedown ( event ) {
			var this$1 = this;

			if ( this.preventMousedownEvents ) {
				return;
			}

			if ( event.which !== undefined && event.which !== 1 ) {
				return;
			}

			var x = event.clientX;
			var y = event.clientY;

			// This will be null for mouse events.
			var pointerId = event.pointerId;

			var handleMouseup = function (event) {
				if ( event.pointerId != pointerId ) {
					return;
				}

				this$1.fire( event, x, y );
				cancel();
			};

			var handleMousemove = function (event) {
				if ( event.pointerId != pointerId ) {
					return;
				}

				if ( ( Math.abs( event.clientX - x ) >= DISTANCE_THRESHOLD ) || ( Math.abs( event.clientY - y ) >= DISTANCE_THRESHOLD ) ) {
					cancel();
				}
			};

			var cancel = function () {
				this$1.node.removeEventListener( 'MSPointerUp', handleMouseup, false );
				document.removeEventListener( 'MSPointerMove', handleMousemove, false );
				document.removeEventListener( 'MSPointerCancel', cancel, false );
				this$1.node.removeEventListener( 'pointerup', handleMouseup, false );
				document.removeEventListener( 'pointermove', handleMousemove, false );
				document.removeEventListener( 'pointercancel', cancel, false );
				this$1.node.removeEventListener( 'click', handleMouseup, false );
				document.removeEventListener( 'mousemove', handleMousemove, false );
			};

			if ( window.navigator.pointerEnabled ) {
				this.node.addEventListener( 'pointerup', handleMouseup, false );
				document.addEventListener( 'pointermove', handleMousemove, false );
				document.addEventListener( 'pointercancel', cancel, false );
			} else if ( window.navigator.msPointerEnabled ) {
				this.node.addEventListener( 'MSPointerUp', handleMouseup, false );
				document.addEventListener( 'MSPointerMove', handleMousemove, false );
				document.addEventListener( 'MSPointerCancel', cancel, false );
			} else {
				this.node.addEventListener( 'click', handleMouseup, false );
				document.addEventListener( 'mousemove', handleMousemove, false );
			}

			setTimeout( cancel, TIME_THRESHOLD );
		},

		touchdown: function touchdown ( event ) {
			var this$1 = this;

			var touch = event.touches[0];

			var x = touch.clientX;
			var y = touch.clientY;

			var finger = touch.identifier;

			var handleTouchup = function (event) {
				var touch = event.changedTouches[0];

				if ( touch.identifier !== finger ) {
					cancel();
					return;
				}

				event.preventDefault(); // prevent compatibility mouse event

				// for the benefit of mobile Firefox and old Android browsers, we need this absurd hack.
				this$1.preventMousedownEvents = true;
				clearTimeout( this$1.preventMousedownTimeout );

				this$1.preventMousedownTimeout = setTimeout( function () {
					this$1.preventMousedownEvents = false;
				}, 400 );

				this$1.fire( event, x, y );
				cancel();
			};

			var handleTouchmove = function (event) {
				if ( event.touches.length !== 1 || event.touches[0].identifier !== finger ) {
					cancel();
				}

				var touch = event.touches[0];
				if ( ( Math.abs( touch.clientX - x ) >= DISTANCE_THRESHOLD ) || ( Math.abs( touch.clientY - y ) >= DISTANCE_THRESHOLD ) ) {
					cancel();
				}
			};

			var cancel = function () {
				this$1.node.removeEventListener( 'touchend', handleTouchup, false );
				window.removeEventListener( 'touchmove', handleTouchmove, false );
				window.removeEventListener( 'touchcancel', cancel, false );
			};

			this.node.addEventListener( 'touchend', handleTouchup, false );
			window.addEventListener( 'touchmove', handleTouchmove, false );
			window.addEventListener( 'touchcancel', cancel, false );

			setTimeout( cancel, TIME_THRESHOLD );
		},

		teardown: function teardown () {
			var node = this.node;

			node.removeEventListener( 'pointerdown',   handleMousedown, false );
			node.removeEventListener( 'MSPointerDown', handleMousedown, false );
			node.removeEventListener( 'mousedown',     handleMousedown, false );
			node.removeEventListener( 'touchstart',    handleTouchstart, false );
			node.removeEventListener( 'focus',         handleFocus, false );
		}
	};

	function handleMousedown ( event ) {
		this.__tap_handler__.mousedown( event );
	}

	function handleTouchstart ( event ) {
		this.__tap_handler__.touchdown( event );
	}

	function handleFocus () {
		this.addEventListener( 'keydown', handleKeydown, false );
		this.addEventListener( 'blur', handleBlur, false );
	}

	function handleBlur () {
		this.removeEventListener( 'keydown', handleKeydown, false );
		this.removeEventListener( 'blur', handleBlur, false );
	}

	function handleKeydown ( event ) {
		if ( event.which === 32 ) { // space key
			this.__tap_handler__.fire();
		}
	}

	return tap;

}));
},{}],42:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	global.Ractive.transitions.fade = factory();
}(this, function () { 'use strict';

	var DEFAULTS = {
		delay: 0,
		duration: 300,
		easing: 'linear'
	};

	function fade(t, params) {
		var targetOpacity;

		params = t.processParams(params, DEFAULTS);

		if (t.isIntro) {
			targetOpacity = t.getStyle('opacity');
			t.setStyle('opacity', 0);
		} else {
			targetOpacity = 0;
		}

		t.animateStyle('opacity', targetOpacity, params).then(t.complete);
	}

	return fade;

}));
},{}],43:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Scrollbar=e():t.Scrollbar=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,u.default)(t)}var i=n(2),u=r(i),a=n(55),c=r(a),l=n(62),f=r(l);Object.defineProperty(e,"__esModule",{value:!0});var s="function"==typeof f.default&&"symbol"==typeof c.default?function(t){return typeof t}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":typeof t},d=n(78),h=n(89);n(129),n(145),n(158),n(173),n(187),e.default=d.SmoothScrollbar,d.SmoothScrollbar.version="7.2.9",d.SmoothScrollbar.init=function(t,e){if(!t||1!==t.nodeType)throw new TypeError("expect element to be DOM Element, but got "+("undefined"==typeof t?"undefined":s(t)));if(h.sbList.has(t))return h.sbList.get(t);t.setAttribute("data-scrollbar","");var n=[].concat(o(t.childNodes)),r=document.createElement("div");r.innerHTML='\n        <article class="scroll-content"></article>\n        <aside class="scrollbar-track scrollbar-track-x">\n            <div class="scrollbar-thumb scrollbar-thumb-x"></div>\n        </aside>\n        <aside class="scrollbar-track scrollbar-track-y">\n            <div class="scrollbar-thumb scrollbar-thumb-y"></div>\n        </aside>\n        <canvas class="overscroll-glow"></canvas>\n    ';var i=r.querySelector(".scroll-content");return[].concat(o(r.childNodes)).forEach(function(e){return t.appendChild(e)}),n.forEach(function(t){return i.appendChild(t)}),new d.SmoothScrollbar(t,e)},d.SmoothScrollbar.initAll=function(t){return[].concat(o(document.querySelectorAll(h.selectors))).map(function(e){return d.SmoothScrollbar.init(e,t)})},d.SmoothScrollbar.has=function(t){return h.sbList.has(t)},d.SmoothScrollbar.get=function(t){return h.sbList.get(t)},d.SmoothScrollbar.getAll=function(){return[].concat(o(h.sbList.values()))},d.SmoothScrollbar.destroy=function(t,e){return d.SmoothScrollbar.has(t)&&d.SmoothScrollbar.get(t).destroy(e)},d.SmoothScrollbar.destroyAll=function(t){h.sbList.forEach(function(e){e.destroy(t)})},t.exports=e.default},function(t,e,n){t.exports={default:n(3),__esModule:!0}},function(t,e,n){n(4),n(48),t.exports=n(12).Array.from},function(t,e,n){"use strict";var r=n(5)(!0);n(8)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(6),o=n(7);t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),c=r(n),l=a.length;return c<0||c>=l?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===l||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(9),o=n(10),i=n(25),u=n(15),a=n(26),c=n(27),l=n(28),f=n(44),s=n(46),d=n(45)("iterator"),h=!([].keys&&"next"in[].keys()),v="@@iterator",_="keys",p="values",y=function(){return this};t.exports=function(t,e,n,b,g,m,x){l(n,e,b);var S,E,M,O=function(t){if(!h&&t in j)return j[t];switch(t){case _:return function(){return new n(this,t)};case p:return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",P=g==p,k=!1,j=t.prototype,T=j[d]||j[v]||g&&j[g],A=T||O(g),R=g?P?O("entries"):A:void 0,L="Array"==e?j.entries||T:T;if(L&&(M=s(L.call(new t)),M!==Object.prototype&&(f(M,w,!0),r||a(M,d)||u(M,d,y))),P&&T&&T.name!==p&&(k=!0,A=function(){return T.call(this)}),r&&!x||!h&&!k&&j[d]||u(j,d,A),c[e]=A,c[w]=y,g)if(S={values:P?A:O(p),keys:m?A:O(_),entries:R},x)for(E in S)E in j||i(j,E,S[E]);else o(o.P+o.F*(h||k),e,S);return S}},function(t,e){t.exports=!0},function(t,e,n){var r=n(11),o=n(12),i=n(13),u=n(15),a="prototype",c=function(t,e,n){var l,f,s,d=t&c.F,h=t&c.G,v=t&c.S,_=t&c.P,p=t&c.B,y=t&c.W,b=h?o:o[e]||(o[e]={}),g=b[a],m=h?r:v?r[e]:(r[e]||{})[a];h&&(n=e);for(l in n)f=!d&&m&&void 0!==m[l],f&&l in b||(s=f?m[l]:n[l],b[l]=h&&"function"!=typeof m[l]?n[l]:p&&f?i(s,r):y&&m[l]==s?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[a]=t[a],e}(s):_&&"function"==typeof s?i(Function.call,s):s,_&&((b.virtual||(b.virtual={}))[l]=s,t&c.R&&g&&!g[l]&&u(g,l,s)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(14);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(16),o=n(24);t.exports=n(20)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(17),o=n(19),i=n(23),u=Object.defineProperty;e.f=n(20)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(18);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(20)&&!n(21)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(21)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(18),o=n(11).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(18);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){t.exports=n(15)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(29),o=n(24),i=n(44),u={};n(15)(u,n(45)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(17),o=n(30),i=n(42),u=n(39)("IE_PROTO"),a=function(){},c="prototype",l=function(){var t,e=n(22)("iframe"),r=i.length,o="<",u=">";for(e.style.display="none",n(43).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+u+"document.F=Object"+o+"/script"+u),t.close(),l=t.F;r--;)delete l[c][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[c]=r(t),n=new a,a[c]=null,n[u]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(16),o=n(17),i=n(31);t.exports=n(20)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,c=0;a>c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(32),o=n(42);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(26),o=n(33),i=n(36)(!1),u=n(39)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,l=[];for(n in a)n!=u&&r(a,n)&&l.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){var r=n(34),o=n(7);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(35);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(33),o=n(37),i=n(38);t.exports=function(t){return function(e,n,u){var a,c=r(e),l=o(c.length),f=i(u,l);if(t&&n!=n){for(;l>f;)if(a=c[f++],a!=a)return!0}else for(;l>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(6),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(6),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(40)("keys"),o=n(41);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(11),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){t.exports=n(11).document&&document.documentElement},function(t,e,n){var r=n(16).f,o=n(26),i=n(45)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(40)("wks"),o=n(41),i=n(11).Symbol,u="function"==typeof i,a=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};a.store=r},function(t,e,n){var r=n(26),o=n(47),i=n(39)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(7);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(13),o=n(10),i=n(47),u=n(49),a=n(50),c=n(37),l=n(51),f=n(52);o(o.S+o.F*!n(54)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,s,d=i(t),h="function"==typeof this?this:Array,v=arguments.length,_=v>1?arguments[1]:void 0,p=void 0!==_,y=0,b=f(d);if(p&&(_=r(_,v>2?arguments[2]:void 0,2)),void 0==b||h==Array&&a(b))for(e=c(d.length),n=new h(e);e>y;y++)l(n,y,p?_(d[y],y):d[y]);else for(s=b.call(d),n=new h;!(o=s.next()).done;y++)l(n,y,p?u(s,_,[o.value,y],!0):o.value);return n.length=y,n}})},function(t,e,n){var r=n(17);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(27),o=n(45)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){"use strict";var r=n(16),o=n(24);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(53),o=n(45)("iterator"),i=n(27);t.exports=n(12).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r=n(35),o=n(45)("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){var r=n(45)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(t){}return n}},function(t,e,n){t.exports={default:n(56),__esModule:!0}},function(t,e,n){n(4),n(57),t.exports=n(61).f("iterator")},function(t,e,n){n(58);for(var r=n(11),o=n(15),i=n(27),u=n(45)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var l=a[c],f=r[l],s=f&&f.prototype;s&&!s[u]&&o(s,u,l),i[l]=i.Array}},function(t,e,n){"use strict";var r=n(59),o=n(60),i=n(27),u=n(33);t.exports=n(8)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){e.f=n(45)},function(t,e,n){t.exports={default:n(63),__esModule:!0}},function(t,e,n){n(64),n(75),n(76),n(77),t.exports=n(12).Symbol},function(t,e,n){"use strict";var r=n(11),o=n(26),i=n(20),u=n(10),a=n(25),c=n(65).KEY,l=n(21),f=n(40),s=n(44),d=n(41),h=n(45),v=n(61),_=n(66),p=n(67),y=n(68),b=n(71),g=n(17),m=n(33),x=n(23),S=n(24),E=n(29),M=n(72),O=n(74),w=n(16),P=n(31),k=O.f,j=w.f,T=M.f,A=r.Symbol,R=r.JSON,L=R&&R.stringify,I="prototype",D=h("_hidden"),C=h("toPrimitive"),N={}.propertyIsEnumerable,F=f("symbol-registry"),H=f("symbols"),z=f("op-symbols"),B=Object[I],G="function"==typeof A,W=r.QObject,V=!W||!W[I]||!W[I].findChild,U=i&&l(function(){return 7!=E(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(B,e);r&&delete B[e],j(t,e,n),r&&t!==B&&j(B,e,r)}:j,X=function(t){var e=H[t]=E(A[I]);return e._k=t,e},q=G&&"symbol"==typeof A.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof A},K=function(t,e,n){return t===B&&K(z,e,n),g(t),e=x(e,!0),g(n),o(H,e)?(n.enumerable?(o(t,D)&&t[D][e]&&(t[D][e]=!1),n=E(n,{enumerable:S(0,!1)})):(o(t,D)||j(t,D,S(1,{})),t[D][e]=!0),U(t,e,n)):j(t,e,n)},J=function(t,e){g(t);for(var n,r=y(e=m(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?E(t):J(E(t),e)},Q=function(t){var e=N.call(this,t=x(t,!0));return!(this===B&&o(H,t)&&!o(z,t))&&(!(e||!o(this,t)||!o(H,t)||o(this,D)&&this[D][t])||e)},Z=function(t,e){if(t=m(t),e=x(e,!0),t!==B||!o(H,e)||o(z,e)){var n=k(t,e);return!n||!o(H,e)||o(t,D)&&t[D][e]||(n.enumerable=!0),n}},$=function(t){for(var e,n=T(m(t)),r=[],i=0;n.length>i;)o(H,e=n[i++])||e==D||e==c||r.push(e);return r},tt=function(t){for(var e,n=t===B,r=T(n?z:m(t)),i=[],u=0;r.length>u;)!o(H,e=r[u++])||n&&!o(B,e)||i.push(H[e]);return i};G||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===B&&e.call(z,n),o(this,D)&&o(this[D],t)&&(this[D][t]=!1),U(this,t,S(1,n))};return i&&V&&U(B,t,{configurable:!0,set:e}),X(t)},a(A[I],"toString",function(){return this._k}),O.f=Z,w.f=K,n(73).f=M.f=$,n(70).f=Q,n(69).f=tt,i&&!n(9)&&a(B,"propertyIsEnumerable",Q,!0),v.f=function(t){return X(h(t))}),u(u.G+u.W+u.F*!G,{Symbol:A});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)h(et[nt++]);for(var et=P(h.store),nt=0;et.length>nt;)_(et[nt++]);u(u.S+u.F*!G,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=A(t)},keyFor:function(t){if(q(t))return p(F,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),u(u.S+u.F*!G,"Object",{create:Y,defineProperty:K,defineProperties:J,getOwnPropertyDescriptor:Z,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),R&&u(u.S+u.F*(!G||l(function(){var t=A();return"[null]"!=L([t])||"{}"!=L({a:t})||"{}"!=L(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!q(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!q(e))return e}),r[1]=e,L.apply(R,r)}}}),A[I][C]||n(15)(A[I],C,A[I].valueOf),s(A,"Symbol"),s(Math,"Math",!0),s(r.JSON,"JSON",!0)},function(t,e,n){var r=n(41)("meta"),o=n(18),i=n(26),u=n(16).f,a=0,c=Object.isExtensible||function(){return!0},l=!n(21)(function(){return c(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},s=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!c(t))return"F";if(!e)return"E";f(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!c(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return l&&v.NEED&&c(t)&&!i(t,r)&&f(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:s,getWeak:d,onFreeze:h}},function(t,e,n){var r=n(11),o=n(12),i=n(9),u=n(61),a=n(16).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(31),o=n(33);t.exports=function(t,e){for(var n,i=o(t),u=r(i),a=u.length,c=0;a>c;)if(i[n=u[c++]]===e)return n}},function(t,e,n){var r=n(31),o=n(69),i=n(70);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,a=n(t),c=i.f,l=0;a.length>l;)c.call(t,u=a[l++])&&e.push(u);return e}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(35);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(33),o=n(73).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?a(t):o(r(t))}},function(t,e,n){var r=n(32),o=n(42).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(70),o=n(24),i=n(33),u=n(23),a=n(26),c=n(19),l=Object.getOwnPropertyDescriptor;e.f=n(20)?l:function(t,e){if(t=i(t),e=u(e,!0),c)try{return l(t,e)}catch(t){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e){},function(t,e,n){n(66)("asyncIterator")},function(t,e,n){n(66)("observable")},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(79),u=r(i),a=n(82),c=r(a),l=n(86),f=r(l);Object.defineProperty(e,"__esModule",{value:!0}),e.SmoothScrollbar=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,f.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),d=n(89),h=n(112);e.SmoothScrollbar=function(){function t(e){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,t),e.setAttribute("tabindex","1"),e.scrollTop=e.scrollLeft=0;var i=(0,h.findChild)(e,"scroll-content"),a=(0,h.findChild)(e,"overscroll-glow"),l=(0,h.findChild)(e,"scrollbar-track-x"),f=(0,h.findChild)(e,"scrollbar-track-y");if((0,h.setStyle)(e,{overflow:"hidden",outline:"none"}),(0,h.setStyle)(a,{display:"none","pointer-events":"none"}),this.__readonly("targets",(0,c.default)({container:e,content:i,canvas:{elem:a,context:a.getContext("2d")},xAxis:(0,c.default)({track:l,thumb:(0,h.findChild)(l,"scrollbar-thumb-x")}),yAxis:(0,c.default)({track:f,thumb:(0,h.findChild)(f,"scrollbar-thumb-y")})})).__readonly("offset",{x:0,y:0}).__readonly("thumbOffset",{x:0,y:0}).__readonly("limit",{x:1/0,y:1/0}).__readonly("movement",{x:0,y:0}).__readonly("movementLocked",{x:!1,y:!1}).__readonly("overscrollRendered",{x:0,y:0}).__readonly("overscrollBack",!1).__readonly("thumbSize",{x:0,y:0,realX:0,realY:0}).__readonly("bounding",{top:0,right:0,bottom:0,left:0}).__readonly("children",[]).__readonly("parents",[]).__readonly("size",this.getSize()).__readonly("isNestedScrollbar",!1),(0,u.default)(this,{__hideTrackThrottle:{value:(0,h.debounce)(this.hideTrack.bind(this),1e3,!1)},__updateThrottle:{value:(0,h.debounce)(this.update.bind(this))},__touchRecord:{value:new h.TouchRecord},__listeners:{value:[]},__handlers:{value:[]},__children:{value:[]},__timerID:{value:{}}}),this.__initOptions(r),this.__initScrollbar(),d.sbList.set(e,this),"function"==typeof d.GLOBAL_ENV.MutationObserver){var s=new d.GLOBAL_ENV.MutationObserver(function(){n.update(!0)});s.observe(i,{childList:!0}),Object.defineProperty(this,"__observer",{value:s})}}return s(t,[{key:"MAX_OVERSCROLL",get:function(){var t=this.options,e=this.size;switch(t.overscrollEffect){case"bounce":var n=Math.floor(Math.sqrt(Math.pow(e.container.width,2)+Math.pow(e.container.height,2))),r=this.__isMovementLocked()?2:10;return d.GLOBAL_ENV.TOUCH_SUPPORTED?(0,h.pickInRange)(n/r,100,1e3):(0,h.pickInRange)(n/10,25,50);case"glow":return 150;default:return 0}}},{key:"scrollTop",get:function(){return this.offset.y}},{key:"scrollLeft",get:function(){return this.offset.x}}]),t}()},function(t,e,n){t.exports={default:n(80),__esModule:!0}},function(t,e,n){n(81);var r=n(12).Object;t.exports=function(t,e){return r.defineProperties(t,e)}},function(t,e,n){var r=n(10);r(r.S+r.F*!n(20),"Object",{defineProperties:n(30)})},function(t,e,n){t.exports={default:n(83),__esModule:!0}},function(t,e,n){n(84),t.exports=n(12).Object.freeze},function(t,e,n){var r=n(18),o=n(65).onFreeze;n(85)("freeze",function(t){return function(e){return t&&r(e)?t(o(e)):e}})},function(t,e,n){var r=n(10),o=n(12),i=n(21);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){t.exports={default:n(87),__esModule:!0}},function(t,e,n){n(88);var r=n(12).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(10);r(r.S+r.F*!n(20),"Object",{defineProperty:n(16).f})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(93);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){t.exports={default:n(91),__esModule:!0}},function(t,e,n){n(92),t.exports=n(12).Object.keys},function(t,e,n){var r=n(47),o=n(31);n(85)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(94);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(95);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(111);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=function(t){var e={},n={};return(0,a.default)(t).forEach(function(r){(0,i.default)(e,r,{get:function(){if(!n.hasOwnProperty(r)){var e=t[r];n[r]=e()}return n[r]}})}),e},l={MutationObserver:function(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver},TOUCH_SUPPORTED:function(){return"ontouchstart"in document},EASING_MULTIPLIER:function(){return navigator.userAgent.match(/Android/)?.5:.25},WHEEL_EVENT:function(){return"onwheel"in window?"wheel":"mousewheel"}};e.GLOBAL_ENV=c(l)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(96),i=r(o);Object.defineProperty(e,"__esModule",{value:!0});var u=new i.default,a=u.set.bind(u),c=u.delete.bind(u);u.update=function(){u.forEach(function(t){t.__updateTree()})},u.delete=function(){var t=c.apply(void 0,arguments);return u.update(),t},u.set=function(){var t=a.apply(void 0,arguments);return u.update(),t},e.sbList=u},function(t,e,n){t.exports={default:n(97),__esModule:!0}},function(t,e,n){n(75),n(4),n(57),n(98),n(108),t.exports=n(12).Map},function(t,e,n){"use strict";var r=n(99);t.exports=n(104)("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},function(t,e,n){"use strict";var r=n(16).f,o=n(29),i=n(100),u=n(13),a=n(101),c=n(7),l=n(102),f=n(8),s=n(60),d=n(103),h=n(20),v=n(65).fastKey,_=h?"_s":"size",p=function(t,e){var n,r=v(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var s=t(function(t,r){a(t,s,e,"_i"),t._i=o(null),t._f=void 0,t._l=void 0,t[_]=0,void 0!=r&&l(r,n,t[f],t)});return i(s.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[_]=0},delete:function(t){var e=this,n=p(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[_]--}return!!n},forEach:function(t){a(this,s,"forEach");for(var e,n=u(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!p(this,t)}}),h&&r(s.prototype,"size",{get:function(){return c(this[_])}}),s},def:function(t,e,n){var r,o,i=p(t,e);return i?i.v=n:(t._l=i={i:o=v(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[_]++,"F"!==o&&(t._i[o]=i)),t},getEntry:p,setStrong:function(t,e,n){f(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?s(0,n.k):"values"==e?s(0,n.v):s(0,[n.k,n.v]):(t._t=void 0,s(1))},n?"entries":"values",!n,!0),d(e)}}},function(t,e,n){var r=n(15);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(13),o=n(49),i=n(50),u=n(17),a=n(37),c=n(52),l={},f={},e=t.exports=function(t,e,n,s,d){var h,v,_,p,y=d?function(){return t}:c(t),b=r(n,s,e?2:1),g=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(i(y)){for(h=a(t.length);h>g;g++)if(p=e?b(u(v=t[g])[0],v[1]):b(t[g]),p===l||p===f)return p}else for(_=y.call(t);!(v=_.next()).done;)if(p=o(_,b,v.value,e),p===l||p===f)return p};e.BREAK=l,e.RETURN=f},function(t,e,n){"use strict";var r=n(11),o=n(12),i=n(16),u=n(20),a=n(45)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];u&&e&&!e[a]&&i.f(e,a,{configurable:!0,get:function(){return this}})}},function(t,e,n){"use strict";var r=n(11),o=n(10),i=n(65),u=n(21),a=n(15),c=n(100),l=n(102),f=n(101),s=n(18),d=n(44),h=n(16).f,v=n(105)(0),_=n(20);t.exports=function(t,e,n,p,y,b){var g=r[t],m=g,x=y?"set":"add",S=m&&m.prototype,E={};return _&&"function"==typeof m&&(b||S.forEach&&!u(function(){(new m).entries().next()}))?(m=e(function(e,n){f(e,m,t,"_c"),e._c=new g,void 0!=n&&l(n,y,e[x],e)}),v("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var e="add"==t||"set"==t;t in S&&(!b||"clear"!=t)&&a(m.prototype,t,function(n,r){if(f(this,m,t),!e&&b&&!s(n))return"get"==t&&void 0;var o=this._c[t](0===n?0:n,r);return e?this:o})}),"size"in S&&h(m.prototype,"size",{get:function(){return this._c.size}})):(m=p.getConstructor(e,t,y,x),c(m.prototype,n),i.NEED=!0),d(m,t),E[t]=m,o(o.G+o.W+o.F,E),b||p.setStrong(m,t,y),m}},function(t,e,n){var r=n(13),o=n(34),i=n(47),u=n(37),a=n(106);t.exports=function(t,e){var n=1==t,c=2==t,l=3==t,f=4==t,s=6==t,d=5==t||s,h=e||a;return function(e,a,v){for(var _,p,y=i(e),b=o(y),g=r(a,v,3),m=u(b.length),x=0,S=n?h(e,m):c?h(e,0):void 0;m>x;x++)if((d||x in b)&&(_=b[x],p=g(_,x,y),t))if(n)S[x]=p;else if(p)switch(t){case 3:return!0;case 5:return _;case 6:return x;case 2:S.push(_)}else if(f)return!1;return s?-1:l||f?f:S}}},function(t,e,n){var r=n(107);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){var r=n(18),o=n(71),i=n(45)("species");t.exports=function(t){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&(e=e[i],null===e&&(e=void 0))),void 0===e?Array:e}},function(t,e,n){var r=n(10);r(r.P+r.R,"Map",{toJSON:n(109)("Map")})},function(t,e,n){var r=n(53),o=n(110);t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+"#toJSON isn't generic");return o(this)}}},function(t,e,n){var r=n(102);t.exports=function(t,e){var n=[];return r(t,!1,n.push,n,e),n}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.selectors="scrollbar, [scrollbar], [data-scrollbar]"},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(113);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(114);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(115);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(116);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(117);(0,a.default)(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(118);(0,a.default)(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(119);(0,a.default)(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(120);(0,a.default)(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(121);(0,a.default)(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(122);(0,a.default)(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(123);(0,a.default)(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return y[t]}})});var b=n(124);(0,a.default)(b).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return b[t]}})})},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.buildCurve=function(t,e){var n=[];if(e<=0)return n;for(var r=Math.round(e/1e3*60),o=-t/Math.pow(r,2),i=-2*o*r,u=0;u<r;u++)n.push(o*Math.pow(u,2)+i*u);return n}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=100;e.debounce=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if("function"==typeof t){var o=void 0;return function(){for(var n=arguments.length,i=Array(n),u=0;u<n;u++)i[u]=arguments[u];!o&&r&&setTimeout(function(){return t.apply(void 0,i)}),clearTimeout(o),o=setTimeout(function(){o=void 0,t.apply(void 0,i)},e)}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,u.default)(t)}var i=n(2),u=r(i);Object.defineProperty(e,"__esModule",{value:!0});e.findChild=function(t,e){var n=t.children,r=null;return n&&[].concat(o(n)).some(function(t){
if(t.className.match(e))return r=t,!0}),r}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={STANDARD:1,OTHERS:-3},r=[1,28,500],o=function(t){return r[t]||r[0]};e.getDelta=function(t){if("deltaX"in t){var e=o(t.deltaMode);return{x:t.deltaX/n.STANDARD*e,y:t.deltaY/n.STANDARD*e}}return"wheelDeltaX"in t?{x:t.wheelDeltaX/n.OTHERS,y:t.wheelDeltaY/n.OTHERS}:{x:0,y:t.wheelDelta/n.OTHERS}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.getPointerData=function(t){return t.touches?t.touches[t.touches.length-1]:t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getPosition=void 0;var r=n(118);e.getPosition=function(t){var e=(0,r.getPointerData)(t);return{x:e.clientX,y:e.clientY}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTouchID=void 0;var r=n(118);e.getTouchID=function(t){var e=(0,r.getPointerData)(t);return e.identifier}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.isOneOf=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.some(function(e){return t===e})}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.pickInRange=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-(1/0),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;return Math.max(e,Math.min(t,n))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(90),i=r(o);Object.defineProperty(e,"__esModule",{value:!0});var u=["webkit","moz","ms","o"],a=new RegExp("^-(?!(?:"+u.join("|")+")-)"),c=function(t){var e={};return(0,i.default)(t).forEach(function(n){if(!a.test(n))return void(e[n]=t[n]);var r=t[n];n=n.replace(/^-/,""),e[n]=r,u.forEach(function(t){e["-"+t+"-"+n]=r})}),e};e.setStyle=function(t,e){e=c(e),(0,i.default)(e).forEach(function(n){var r=n.replace(/^-/,"").replace(/-([a-z])/g,function(t,e){return e.toUpperCase()});t.style[r]=e[n]})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a.default)(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=n(2),a=r(u),c=n(86),l=r(c),f=n(125),s=r(f);Object.defineProperty(e,"__esModule",{value:!0}),e.TouchRecord=void 0;var d=s.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,l.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),v=n(119),_=function(){function t(e){i(this,t),this.updateTime=Date.now(),this.delta={x:0,y:0},this.velocity={x:0,y:0},this.lastPosition=(0,v.getPosition)(e)}return h(t,[{key:"update",value:function(t){var e=this.velocity,n=this.updateTime,r=this.lastPosition,o=Date.now(),i=(0,v.getPosition)(t),u={x:-(i.x-r.x),y:-(i.y-r.y)},a=o-n||16,c=u.x/a*1e3,l=u.y/a*1e3;e.x=.8*c+.2*e.x,e.y=.8*l+.2*e.y,this.delta=u,this.updateTime=o,this.lastPosition=i}}]),t}();e.TouchRecord=function(){function t(){i(this,t),this.touchList={},this.lastTouch=null,this.activeTouchID=void 0}return h(t,[{key:"__add",value:function(t){if(this.__has(t))return null;var e=new _(t);return this.touchList[t.identifier]=e,e}},{key:"__renew",value:function(t){if(!this.__has(t))return null;var e=this.touchList[t.identifier];return e.update(t),e}},{key:"__delete",value:function(t){return delete this.touchList[t.identifier]}},{key:"__has",value:function(t){return this.touchList.hasOwnProperty(t.identifier)}},{key:"__setActiveID",value:function(t){this.activeTouchID=t[t.length-1].identifier,this.lastTouch=this.touchList[this.activeTouchID]}},{key:"__getActiveTracker",value:function(){var t=this.touchList,e=this.activeTouchID;return t[e]}},{key:"isActive",value:function(){return void 0!==this.activeTouchID}},{key:"getDelta",value:function(){var t=this.__getActiveTracker();return t?d({},t.delta):this.__primitiveValue}},{key:"getVelocity",value:function(){var t=this.__getActiveTracker();return t?d({},t.velocity):this.__primitiveValue}},{key:"getLastPosition",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=this.__getActiveTracker()||this.lastTouch,n=e?e.lastPosition:this.__primitiveValue;return t?n.hasOwnProperty(t)?n[t]:0:d({},n)}},{key:"updatedRecently",value:function(){var t=this.__getActiveTracker();return t&&Date.now()-t.updateTime<30}},{key:"track",value:function(t){var e=this,n=t.targetTouches;return[].concat(o(n)).forEach(function(t){e.__add(t)}),this.touchList}},{key:"update",value:function(t){var e=this,n=t.touches,r=t.changedTouches;return[].concat(o(n)).forEach(function(t){e.__renew(t)}),this.__setActiveID(r),this.touchList}},{key:"release",value:function(t){var e=this;return this.activeTouchID=void 0,[].concat(o(t.changedTouches)).forEach(function(t){e.__delete(t)}),this.touchList}},{key:"__primitiveValue",get:function(){return{x:0,y:0}}}]),t}()},function(t,e,n){t.exports={default:n(126),__esModule:!0}},function(t,e,n){n(127),t.exports=n(12).Object.assign},function(t,e,n){var r=n(10);r(r.S+r.F,"Object",{assign:n(128)})},function(t,e,n){"use strict";var r=n(31),o=n(69),i=n(70),u=n(47),a=n(34),c=Object.assign;t.exports=!c||n(21)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=r})?function(t,e){for(var n=u(t),c=arguments.length,l=1,f=o.f,s=i.f;c>l;)for(var d,h=a(arguments[l++]),v=f?r(h).concat(f(h)):r(h),_=v.length,p=0;_>p;)s.call(h,d=v[p++])&&(n[d]=h[d]);return n}:c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(130);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(131);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(132);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(133);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(134);(0,a.default)(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(135);(0,a.default)(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(136);(0,a.default)(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(137);(0,a.default)(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(138);(0,a.default)(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(139);(0,a.default)(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(140);(0,a.default)(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return y[t]}})});var b=n(141);(0,a.default)(b).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return b[t]}})});var g=n(142);(0,a.default)(g).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return g[t]}})});var m=n(143);(0,a.default)(m).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return m[t]}})});var x=n(144);(0,a.default)(x).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return x[t]}})})},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.clearMovement=r.SmoothScrollbar.prototype.stop=function(){this.movement.x=this.movement.y=0,cancelAnimationFrame(this.__timerID.scrollTo)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,u.default)(t)}var i=n(2),u=r(i),a=n(78),c=n(112),l=n(89);a.SmoothScrollbar.prototype.destroy=function(t){var e=this.__listeners,n=this.__handlers,r=this.__observer,i=this.targets,u=i.container,a=i.content;n.forEach(function(t){var e=t.evt,n=t.elem,r=t.fn;n.removeEventListener(e,r)}),n.length=e.length=0,this.stop(),cancelAnimationFrame(this.__timerID.render),r&&r.disconnect(),l.sbList.delete(u),t||this.scrollTo(0,0,300,function(){if(u.parentNode){(0,c.setStyle)(u,{overflow:""}),u.scrollTop=u.scrollLeft=0;var t=[].concat(o(a.childNodes));u.innerHTML="",t.forEach(function(t){return u.appendChild(t)})}})}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.getContentElem=function(){return this.targets.content}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.getSize=function(){var t=this.targets.container,e=this.targets.content;return{container:{width:t.clientWidth,height:t.clientHeight},content:{width:e.offsetWidth-e.clientWidth+e.scrollWidth,height:e.offsetHeight-e.clientHeight+e.scrollHeight}}}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.infiniteScroll=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;if("function"==typeof t){var n={x:0,y:0},r=!1;this.addListener(function(o){var i=o.offset,u=o.limit;u.y-i.y<=e&&i.y>n.y&&!r&&(r=!0,setTimeout(function(){return t(o)})),u.y-i.y>e&&(r=!1),n=i})}}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.isVisible=function(t){var e=this.bounding,n=t.getBoundingClientRect(),r=Math.max(e.top,n.top),o=Math.max(e.left,n.left),i=Math.min(e.right,n.right),u=Math.min(e.bottom,n.bottom);return r<u&&o<i}},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.addListener=function(t){"function"==typeof t&&this.__listeners.push(t)},r.SmoothScrollbar.prototype.removeListener=function(t){"function"==typeof t&&this.__listeners.some(function(e,n,r){return e===t&&r.splice(n,1)})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){return e in t?(0,l.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){return!!e.length&&e.some(function(e){return t.match(e)})}function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.REGIESTER,e=d[t];return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];this.__handlers.forEach(function(n){var o=n.elem,u=n.evt,a=n.fn,c=n.hasRegistered;c&&t===s.REGIESTER||!c&&t===s.UNREGIESTER||i(u,r)&&(o[e](u,a),n.hasRegistered=!c)})}}var a,c=n(86),l=r(c),f=n(78),s={REGIESTER:0,UNREGIESTER:1},d=(a={},o(a,s.REGIESTER,"addEventListener"),o(a,s.UNREGIESTER,"removeEventListener"),a);f.SmoothScrollbar.prototype.registerEvents=u(s.REGIESTER),f.SmoothScrollbar.prototype.unregisterEvents=u(s.UNREGIESTER)},function(t,e,n){"use strict";var r=n(78);r.SmoothScrollbar.prototype.scrollIntoView=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.onlyScrollIfNeeded,r=void 0!==n&&n,o=e.offsetTop,i=void 0===o?0:o,u=e.offsetLeft,a=void 0===u?0:u,c=this.targets,l=this.bounding;if(t&&c.container.contains(t)){var f=t.getBoundingClientRect();r&&this.isVisible(t)||this.__setMovement(f.left-l.left-a,f.top-l.top-i)}}},function(t,e,n){"use strict";var r=n(112),o=n(78);o.SmoothScrollbar.prototype.scrollTo=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.offset.x,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.offset.y,n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u=this.options,a=this.offset,c=this.limit,l=this.__timerID;cancelAnimationFrame(l.scrollTo),i="function"==typeof i?i:function(){},u.renderByPixels&&(t=Math.round(t),e=Math.round(e));var f=a.x,s=a.y,d=(0,r.pickInRange)(t,0,c.x)-f,h=(0,r.pickInRange)(e,0,c.y)-s,v=(0,r.buildCurve)(d,o),_=(0,r.buildCurve)(h,o),p=v.length,y=0,b=function r(){return y===p?(n.setPosition(t,e),requestAnimationFrame(function(){i(n)})):(n.setPosition(f+v[y],s+_[y]),y++,void(l.scrollTo=requestAnimationFrame(r)))};b()}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(90),i=r(o),u=n(78);u.SmoothScrollbar.prototype.setOptions=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,i.default)(e).forEach(function(n){t.options.hasOwnProperty(n)&&void 0!==e[n]&&(t.options[n]=e[n])})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(125),i=r(o),u=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=n(112),c=n(78);c.SmoothScrollbar.prototype.setPosition=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.offset.x,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.offset.y,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.__hideTrackThrottle();var r={},o=this.options,i=this.offset,c=this.limit,l=this.targets,f=this.__listeners;o.renderByPixels&&(t=Math.round(t),e=Math.round(e)),Math.abs(t-i.x)>1&&this.showTrack("x"),Math.abs(e-i.y)>1&&this.showTrack("y"),t=(0,a.pickInRange)(t,0,c.x),e=(0,a.pickInRange)(e,0,c.y),t===i.x&&e===i.y||(r.direction={x:t===i.x?"none":t>i.x?"right":"left",y:e===i.y?"none":e>i.y?"down":"up"},this.__readonly("offset",{x:t,y:e}),r.limit=u({},c),r.offset=u({},this.offset),this.__setThumbPosition(),(0,a.setStyle)(l.content,{"-transform":"translate3d("+-t+"px, "+-e+"px, 0)"}),n||f.forEach(function(t){o.syncCallbacks?t(r):requestAnimationFrame(function(){t(r)})}))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){return e in t?(0,c.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f.SHOW,e=d[t];return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"both",r=this.options,o=this.movement,i=this.targets,u=i.container,a=i.xAxis,c=i.yAxis;o.x||o.y?u.classList.add(s.CONTAINER):u.classList.remove(s.CONTAINER),r.alwaysShowTracks&&t===f.HIDE||(n=n.toLowerCase(),"both"===n&&(a.track.classList[e](s.TRACK),c.track.classList[e](s.TRACK)),"x"===n&&a.track.classList[e](s.TRACK),"y"===n&&c.track.classList[e](s.TRACK))}}var u,a=n(86),c=r(a),l=n(78),f={SHOW:0,HIDE:1},s={TRACK:"show",CONTAINER:"scrolling"},d=(u={},o(u,f.SHOW,"add"),o(u,f.HIDE,"remove"),u);l.SmoothScrollbar.prototype.showTrack=i(f.SHOW),l.SmoothScrollbar.prototype.hideTrack=i(f.HIDE)},function(t,e,n){"use strict";function r(){if("glow"===this.options.overscrollEffect){var t=this.targets,e=this.size,n=t.canvas,r=n.elem,o=n.context,i=window.devicePixelRatio||1,u=e.container.width*i,a=e.container.height*i;u===r.width&&a===r.height||(r.width=u,r.height=a,o.scale(i,i))}}function o(){var t=this.size,e=this.thumbSize,n=this.targets,r=n.xAxis,o=n.yAxis;(0,u.setStyle)(r.track,{display:t.content.width<=t.container.width?"none":"block"}),(0,u.setStyle)(o.track,{display:t.content.height<=t.container.height?"none":"block"}),(0,u.setStyle)(r.thumb,{width:e.x+"px"}),(0,u.setStyle)(o.thumb,{height:e.y+"px"})}function i(){var t=this.options;this.__updateBounding();var e=this.getSize(),n={x:Math.max(e.content.width-e.container.width,0),y:Math.max(e.content.height-e.container.height,0)},i={realX:e.container.width/e.content.width*e.container.width,realY:e.container.height/e.content.height*e.container.height};i.x=Math.max(i.realX,t.thumbMinSize),i.y=Math.max(i.realY,t.thumbMinSize),this.__readonly("size",e).__readonly("limit",n).__readonly("thumbSize",i),o.call(this),r.call(this),this.setPosition(),this.__setThumbPosition()}var u=n(112),a=n(78);a.SmoothScrollbar.prototype.update=function(t){t?requestAnimationFrame(i.bind(this)):i.call(this)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(146);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(147);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(148);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(149);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(154);(0,a.default)(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(155);(0,a.default)(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(156);(0,a.default)(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(157);(0,a.default)(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return v[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a.default)(t)}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.limit,i=this.options,u=this.movement;this.__updateThrottle(),i.renderByPixels&&(t=Math.round(t),e=Math.round(e));var a=u.x+t,l=u.y+e;0===r.x&&(a=0),0===r.y&&(l=0);var f=this.__getDeltaLimit(n);u.x=c.pickInRange.apply(void 0,[a].concat(o(f.x))),u.y=c.pickInRange.apply(void 0,[l].concat(o(f.y)))}var u=n(2),a=r(u),c=n(112),l=n(78);Object.defineProperty(l.SmoothScrollbar.prototype,"__addMovement",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=this.movement,n=this.movementLocked;a.forEach(function(r){n[r]=e[r]&&t.__willOverscroll(r,e[r])})}function o(){var t=this.movementLocked;a.forEach(function(e){t[e]=!1})}function i(){var t=this.movementLocked;return t.x||t.y}var u=n(78),a=["x","y"];Object.defineProperty(u.SmoothScrollbar.prototype,"__autoLockMovement",{value:r,writable:!0,configurable:!0}),Object.defineProperty(u.SmoothScrollbar.prototype,"__unlockMovement",{value:o,writable:!0,configurable:!0}),Object.defineProperty(u.SmoothScrollbar.prototype,"__isMovementLocked",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(t){var e=this.options,n=this.movement,r=this.overscrollRendered,o=this.MAX_OVERSCROLL,i=n[t]=(0,h.pickInRange)(n[t],-o,o),u=e.overscrollDamping,a=r[t]+(i-r[t])*u;e.renderByPixels&&(a|=0),!this.__isMovementLocked()&&Math.abs(a-r[t])<.1&&(a-=i/Math.abs(i||1)),Math.abs(a)<Math.abs(r[t])&&this.__readonly("overscrollBack",!0),(a*r[t]<0||Math.abs(a)<=1)&&(a=0,this.__readonly("overscrollBack",!1)),r[t]=a}}function i(t){var e=this.__touchRecord,n=this.overscrollRendered;return n.x!==t.x||n.y!==t.y||!(!d.GLOBAL_ENV.TOUCH_SUPPORTED||!e.updatedRecently())}function u(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(e.length&&this.options.overscrollEffect){var n=this.options,r=this.overscrollRendered,u=l({},r);if(e.forEach(function(e){return o.call(t,e)}),i.call(this,u))switch(n.overscrollEffect){case"bounce":return s.overscrollBounce.call(this,r.x,r.y);case"glow":return s.overscrollGlow.call(this,r.x,r.y);default:return}}}var a=n(125),c=r(a),l=c.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},f=n(78),s=n(150),d=n(89),h=n(112);Object.defineProperty(f.SmoothScrollbar.prototype,"__renderOverscroll",{value:u,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(151);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(152);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(153);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})})},function(t,e,n){"use strict";function r(t,e){var n=this.size,r=this.offset,i=this.targets,u=this.thumbOffset,a=i.xAxis,c=i.yAxis,l=i.content;if((0,o.setStyle)(l,{"-transform":"translate3d("+-(r.x+t)+"px, "+-(r.y+e)+"px, 0)"}),t){var f=n.container.width/(n.container.width+Math.abs(t));(0,o.setStyle)(a.thumb,{"-transform":"translate3d("+u.x+"px, 0, 0) scale3d("+f+", 1, 1)","-transform-origin":t<0?"left":"right"})}if(e){var s=n.container.height/(n.container.height+Math.abs(e));(0,o.setStyle)(c.thumb,{"-transform":"translate3d(0, "+u.y+"px, 0) scale3d(1, "+s+", 1)","-transform-origin":e<0?"top":"bottom"})}}Object.defineProperty(e,"__esModule",{value:!0}),e.overscrollBounce=r;var o=n(112)},function(t,e,n){"use strict";function r(t,e){var n=this.size,r=this.targets,a=this.options,c=r.canvas,l=c.elem,f=c.context;return t||e?((0,u.setStyle)(l,{display:"block"}),f.clearRect(0,0,n.content.width,n.container.height),f.fillStyle=a.overscrollEffectColor,o.call(this,t),void i.call(this,e)):(0,u.setStyle)(l,{display:"none"})}function o(t){var e=this.size,n=this.targets,r=this.__touchRecord,o=this.MAX_OVERSCROLL,i=e.container,l=i.width,f=i.height,s=n.canvas.context;s.save(),t>0&&s.transform(-1,0,0,1,l,0);var d=(0,u.pickInRange)(Math.abs(t)/o,0,a),h=(0,u.pickInRange)(d,0,c)*l,v=Math.abs(t),_=r.getLastPosition("y")||f/2;s.globalAlpha=d,s.beginPath(),s.moveTo(0,-h),s.quadraticCurveTo(v,_,0,f+h),s.fill(),s.closePath(),s.restore()}function i(t){var e=this.size,n=this.targets,r=this.__touchRecord,o=this.MAX_OVERSCROLL,i=e.container,l=i.width,f=i.height,s=n.canvas.context;s.save(),t>0&&s.transform(1,0,0,-1,0,f);var d=(0,u.pickInRange)(Math.abs(t)/o,0,a),h=(0,u.pickInRange)(d,0,c)*l,v=r.getLastPosition("x")||l/2,_=Math.abs(t);s.globalAlpha=d,s.beginPath(),s.moveTo(-h,0),s.quadraticCurveTo(v,_,l+h,0),s.fill(),s.closePath(),s.restore()}Object.defineProperty(e,"__esModule",{value:!0}),e.overscrollGlow=r;var u=n(112),a=.75,c=.25},function(t,e,n){"use strict";function r(t){var e=this.options,n=this.offset,r=this.movement,o=this.__touchRecord,i=e.damping,u=e.renderByPixels,a=e.overscrollDamping,c=n[t],l=r[t],f=i;if(this.__willOverscroll(t,l)?f=a:o.isActive()&&(f=.5),Math.abs(l)<1){var s=c+l;return{movement:0,position:l>0?Math.ceil(s):Math.floor(s)}}var d=l*(1-f);return u&&(d|=0),{movement:d,position:c+l-d}}function o(){var t=this.options,e=this.offset,n=this.limit,i=this.movement,a=this.overscrollRendered,c=this.__timerID;if(i.x||i.y||a.x||a.y){var l=r.call(this,"x"),f=r.call(this,"y"),s=[];if(t.overscrollEffect){var d=(0,u.pickInRange)(l.position,0,n.x),h=(0,u.pickInRange)(f.position,0,n.y);(a.x||d===e.x&&i.x)&&s.push("x"),(a.y||h===e.y&&i.y)&&s.push("y")}this.movementLocked.x||(i.x=l.movement),this.movementLocked.y||(i.y=f.movement),this.setPosition(l.position,f.position),this.__renderOverscroll(s)}c.render=requestAnimationFrame(o.bind(this))}var i=n(78),u=n(112);Object.defineProperty(i.SmoothScrollbar.prototype,"__render",{value:o,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a.default)(t)}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.options,i=this.movement;this.__updateThrottle();var u=this.__getDeltaLimit(n);r.renderByPixels&&(t=Math.round(t),e=Math.round(e)),i.x=c.pickInRange.apply(void 0,[t].concat(o(u.x))),i.y=c.pickInRange.apply(void 0,[e].concat(o(u.y)))}var u=n(2),a=r(u),c=n(112),l=n(78);Object.defineProperty(l.SmoothScrollbar.prototype,"__setMovement",{value:i,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=this.options,r=this.offset,o=this.limit;if(!n.continuousScrolling)return!1;var u=(0,i.pickInRange)(t+r.x,0,o.x),a=(0,i.pickInRange)(e+r.y,0,o.y),c=!0;return c&=u===r.x,c&=a===r.y,c&=u===o.x||0===u||a===o.y||0===a}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__shouldPropagateMovement",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!t)return!1;var n=this.offset,r=this.limit,o=n[t];return(0,i.pickInRange)(e+o,0,r[t])===o&&(0===o||o===r[t])}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__willOverscroll",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(159);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(160);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(161);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(168);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(169);(0,a.default)(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(170);(0,a.default)(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(171);(0,a.default)(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(172);(0,a.default)(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return v[t]}})})},function(t,e,n){"use strict";function r(){var t=this,e=this.targets,n=e.container,r=e.content,o=!1,u=void 0,a=void 0;Object.defineProperty(this,"__isDrag",{get:function(){return o},enumerable:!1});var c=function e(n){var r=n.x,o=n.y;if(r||o){var i=t.options.speed;t.__setMovement(r*i,o*i),u=requestAnimationFrame(function(){e({x:r,y:o})})}};this.__addEvent(n,"dragstart",function(e){t.__eventFromChildScrollbar(e)||(o=!0,a=e.target.clientHeight,(0,i.setStyle)(r,{"pointer-events":"auto"}),cancelAnimationFrame(u),t.__updateBounding())}),this.__addEvent(document,"dragover mousemove touchmove",function(e){if(o&&!t.__eventFromChildScrollbar(e)){cancelAnimationFrame(u),e.preventDefault();var n=t.__getPointerTrend(e,a);c(n)}}),this.__addEvent(document,"dragend mouseup touchend blur",function(){cancelAnimationFrame(u),o=!1})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__dragHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){var t=this,e=this.targets,n=function(e){var n=t.size,r=t.offset,o=t.limit,i=t.movement;switch(e){case s.SPACE:return[0,200];case s.PAGE_UP:return[0,-n.container.height+40];case s.PAGE_DOWN:return[0,n.container.height-40];case s.END:return[0,Math.abs(i.y)+o.y-r.y];case s.HOME:return[0,-Math.abs(i.y)-r.y];case s.LEFT:return[-40,0];case s.UP:return[0,-40];case s.RIGHT:return[40,0];case s.DOWN:return[0,40];default:return null}},r=e.container,o=!1;this.__addEvent(r,"focus",function(){o=!0}),this.__addEvent(r,"blur",function(){o=!1}),this.__addEvent(r,"keydown",function(e){if(o){var i=t.options,u=t.parents,a=t.movementLocked,c=n(e.keyCode||e.which);if(c){var f=l(c,2),s=f[0],d=f[1];if(t.__shouldPropagateMovement(s,d))return r.blur(),u.length&&u[0].focus(),t.__updateThrottle();e.preventDefault(),t.__unlockMovement(),s&&t.__willOverscroll("x",s)&&(a.x=!0),d&&t.__willOverscroll("y",d)&&(a.y=!0);var h=i.speed;t.__addMovement(s*h,d*h)}}}),this.__addEvent(r,"keyup",function(){t.__unlockMovement()})}var i=n(162),u=r(i),a=n(165),c=r(a),l=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=(0,c.default)(t);!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,u.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=n(78),s={SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40};Object.defineProperty(f.SmoothScrollbar.prototype,"__keyboardHandler",{value:o,writable:!0,configurable:!0})},function(t,e,n){t.exports={default:n(163),__esModule:!0}},function(t,e,n){n(57),n(4),t.exports=n(164)},function(t,e,n){var r=n(53),o=n(45)("iterator"),i=n(27);t.exports=n(12).isIterable=function(t){var e=Object(t);return void 0!==e[o]||"@@iterator"in e||i.hasOwnProperty(r(e))}},function(t,e,n){t.exports={default:n(166),__esModule:!0}},function(t,e,n){n(57),n(4),t.exports=n(167)},function(t,e,n){var r=n(17),o=n(52);t.exports=n(12).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){"use strict";function r(){var t=this,e=this.targets,n=e.container,r=e.xAxis,o=e.yAxis,u=function(e,n){var r=t.size,o=t.thumbSize;if("x"===e){var i=r.container.width-(o.x-o.realX);return n/i*r.content.width}if("y"===e){var u=r.container.height-(o.y-o.realY);return n/u*r.content.height}return 0},a=function(t){return(0,i.isOneOf)(t,[r.track,r.thumb])?"x":(0,i.isOneOf)(t,[o.track,o.thumb])?"y":void 0},c=void 0,l=void 0,f=void 0,s=void 0,d=void 0;this.__addEvent(n,"click",function(e){if(!l&&(0,i.isOneOf)(e.target,[r.track,o.track])){var n=e.target,c=a(n),f=n.getBoundingClientRect(),s=(0,i.getPosition)(e),d=t.offset,h=t.thumbSize;if("x"===c){
var v=s.x-f.left-h.x/2;t.__setMovement(u(c,v)-d.x,0)}else{var _=s.y-f.top-h.y/2;t.__setMovement(0,u(c,_)-d.y)}}}),this.__addEvent(n,"mousedown",function(e){if((0,i.isOneOf)(e.target,[r.thumb,o.thumb])){c=!0;var n=(0,i.getPosition)(e),u=e.target.getBoundingClientRect();s=a(e.target),f={x:n.x-u.left,y:n.y-u.top},d=t.targets.container.getBoundingClientRect()}}),this.__addEvent(window,"mousemove",function(e){if(c){e.preventDefault(),l=!0;var n=t.offset,r=(0,i.getPosition)(e);if("x"===s){var o=r.x-f.x-d.left;t.setPosition(u(s,o),n.y)}if("y"===s){var a=r.y-f.y-d.top;t.setPosition(n.x,u(s,a))}}}),this.__addEvent(window,"mouseup blur",function(){c=l=!1})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__mouseHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){this.__addEvent(window,"resize",this.__updateThrottle)}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__resizeHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=!1,n=void 0,r=this.targets,o=r.container,u=r.content,a=function e(r){var o=r.x,i=r.y;if(o||i){var u=t.options.speed;t.__setMovement(o*u,i*u),n=requestAnimationFrame(function(){e({x:o,y:i})})}},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,i.setStyle)(o,{"-user-select":t})};this.__addEvent(window,"mousemove",function(r){if(e){cancelAnimationFrame(n);var o=t.__getPointerTrend(r);a(o)}}),this.__addEvent(u,"selectstart",function(r){return t.__eventFromChildScrollbar(r)?c("none"):(cancelAnimationFrame(n),t.__updateBounding(),void(e=!0))}),this.__addEvent(window,"mouseup blur",function(){cancelAnimationFrame(n),c(),e=!1}),this.__addEvent(o,"scroll",function(t){t.preventDefault(),o.scrollTop=o.scrollLeft=0})}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__selectHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){var t=this,e=this.targets,n=this.__touchRecord,r=e.container;this.__addEvent(r,"touchstart",function(e){if(!t.__isDrag){var r=t.__timerID,o=t.movement;cancelAnimationFrame(r.scrollTo),t.__willOverscroll("x")||(o.x=0),t.__willOverscroll("y")||(o.y=0),n.track(e),t.__autoLockMovement()}}),this.__addEvent(r,"touchmove",function(e){if(!(t.__isDrag||s&&s!==t)){n.update(e);var r=n.getDelta(),o=r.x,i=r.y;if(t.__shouldPropagateMovement(o,i))return t.__updateThrottle();var u=t.movement,a=t.MAX_OVERSCROLL,c=t.options;if(u.x&&t.__willOverscroll("x",o)){var l=2;"bounce"===c.overscrollEffect&&(l+=Math.abs(10*u.x/a)),Math.abs(u.x)>=a?o=0:o/=l}if(u.y&&t.__willOverscroll("y",i)){var f=2;"bounce"===c.overscrollEffect&&(f+=Math.abs(10*u.y/a)),Math.abs(u.y)>=a?i=0:i/=f}t.__autoLockMovement(),e.preventDefault(),t.__addMovement(o,i,!0),s=t}}),this.__addEvent(r,"touchcancel touchend",function(e){if(!t.__isDrag){var r=t.options.speed,o=n.getVelocity(),i={};(0,u.default)(o).forEach(function(t){var e=(0,l.pickInRange)(o[t]*c.GLOBAL_ENV.EASING_MULTIPLIER,-1e3,1e3);i[t]=Math.abs(e)>f?e*r:0}),t.__addMovement(i.x,i.y,!0),t.__unlockMovement(),n.release(e),s=null}})}var i=n(90),u=r(i),a=n(78),c=n(89),l=n(112),f=100,s=null;Object.defineProperty(a.SmoothScrollbar.prototype,"__touchHandler",{value:o,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this,e=this.targets.container,n=!1,r=(0,i.debounce)(function(){n=!1},30,!1);this.__addEvent(e,u.GLOBAL_ENV.WHEEL_EVENT,function(e){var o=t.options,u=(0,i.getDelta)(e),a=u.x,c=u.y;return a*=o.speed,c*=o.speed,t.__shouldPropagateMovement(a,c)?t.__updateThrottle():(e.preventDefault(),r(),t.overscrollBack&&(n=!0),n&&(t.__willOverscroll("x",a)&&(a=0),t.__willOverscroll("y",c)&&(c=0)),void t.__addMovement(a,c,!0))})}var o=n(78),i=n(112),u=n(89);Object.defineProperty(o.SmoothScrollbar.prototype,"__wheelHandler",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(174);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(86),i=r(o),u=n(90),a=r(u);Object.defineProperty(e,"__esModule",{value:!0});var c=n(175);(0,a.default)(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return c[t]}})});var l=n(176);(0,a.default)(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=n(177);(0,a.default)(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return f[t]}})});var s=n(178);(0,a.default)(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return s[t]}})});var d=n(179);(0,a.default)(d).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return d[t]}})});var h=n(182);(0,a.default)(h).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return h[t]}})});var v=n(183);(0,a.default)(v).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return v[t]}})});var _=n(184);(0,a.default)(_).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=n(185);(0,a.default)(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return p[t]}})});var y=n(186);(0,a.default)(y).forEach(function(t){"default"!==t&&"__esModule"!==t&&(0,i.default)(e,t,{enumerable:!0,get:function(){return y[t]}})})},function(t,e,n){"use strict";function r(t,e,n){var r=this;if(!t||"function"!=typeof t.addEventListener)throw new TypeError("expect elem to be a DOM element, but got "+t);var o=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];!t.type.match(/drag/)&&t.defaultPrevented||n.apply(void 0,[t].concat(r))};e.split(/\s+/g).forEach(function(e){r.__handlers.push({evt:e,elem:t,fn:o,hasRegistered:!0}),t.addEventListener(e,o)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__addEvent",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.target;return this.children.some(function(t){return t.contains(e)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__eventFromChildScrollbar",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.options,n=this.offset,r=this.limit;return t&&(e.continuousScrolling||e.overscrollEffect)?{x:[-(1/0),1/0],y:[-(1/0),1/0]}:{x:[-n.x,r.x-n.x],y:[-n.y,r.y-n.y]}}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__getDeltaLimit",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=this.bounding,r=n.top,o=n.right,u=n.bottom,a=n.left,c=(0,i.getPosition)(t),l=c.x,f=c.y,s={x:0,y:0};return 0===l&&0===f?s:(l>o-e?s.x=l-o+e:l<a+e&&(s.x=l-a-e),f>u-e?s.y=f-u+e:f<r+e&&(s.y=f-r-e),s)}var o=n(78),i=n(112);Object.defineProperty(o.SmoothScrollbar.prototype,"__getPointerTrend",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,h.default)(t)}function i(t){var e=this,n={speed:1,damping:.1,thumbMinSize:20,syncCallbacks:!1,renderByPixels:!0,alwaysShowTracks:!1,continuousScrolling:"auto",overscrollEffect:!1,overscrollEffectColor:"#87ceeb",overscrollDamping:.2},r={damping:[0,1],speed:[0,1/0],thumbMinSize:[0,1/0],overscrollEffect:[!1,"bounce","glow"],overscrollDamping:[0,1]},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"auto";if(n.overscrollEffect!==!1)return!1;switch(t){case"auto":return e.isNestedScrollbar;default:return!!t}},u={set ignoreEvents(t){console.warn("`options.ignoreEvents` parameter is deprecated, use `instance#unregisterEvents()` method instead. https://github.com/idiotWu/smooth-scrollbar/wiki/Instance-Methods#instanceunregisterevents-regex--regex-regex--")},set friction(t){console.warn("`options.friction="+t+"` is deprecated, use `options.damping="+t/100+"` instead."),this.damping=t/100},get syncCallbacks(){return n.syncCallbacks},set syncCallbacks(t){n.syncCallbacks=!!t},get renderByPixels(){return n.renderByPixels},set renderByPixels(t){n.renderByPixels=!!t},get alwaysShowTracks(){return n.alwaysShowTracks},set alwaysShowTracks(t){t=!!t,n.alwaysShowTracks=t;var r=e.targets.container;t?(e.showTrack(),r.classList.add("sticky")):(e.hideTrack(),r.classList.remove("sticky"))},get continuousScrolling(){return i(n.continuousScrolling)},set continuousScrolling(t){"auto"===t?n.continuousScrolling=t:n.continuousScrolling=!!t},get overscrollEffect(){return n.overscrollEffect},set overscrollEffect(t){t&&!~r.overscrollEffect.indexOf(t)&&(console.warn("`overscrollEffect` should be one of "+(0,s.default)(r.overscrollEffect)+", but got "+(0,s.default)(t)+". It will be set to `false` now."),t=!1),n.overscrollEffect=t},get overscrollEffectColor(){return n.overscrollEffectColor},set overscrollEffectColor(t){n.overscrollEffectColor=t}};(0,l.default)(n).filter(function(t){return!u.hasOwnProperty(t)}).forEach(function(t){(0,a.default)(u,t,{enumerable:!0,get:function(){return n[t]},set:function(e){if(isNaN(parseFloat(e)))throw new TypeError("expect `options."+t+"` to be a number, but got "+("undefined"==typeof e?"undefined":b(e)));n[t]=g.pickInRange.apply(void 0,[e].concat(o(r[t])))}})}),this.__readonly("options",u),this.setOptions(t)}var u=n(86),a=r(u),c=n(90),l=r(c),f=n(180),s=r(f),d=n(2),h=r(d),v=n(55),_=r(v),p=n(62),y=r(p),b="function"==typeof y.default&&"symbol"==typeof _.default?function(t){return typeof t}:function(t){return t&&"function"==typeof y.default&&t.constructor===y.default&&t!==y.default.prototype?"symbol":typeof t},g=n(112),m=n(78);Object.defineProperty(m.SmoothScrollbar.prototype,"__initOptions",{value:i,writable:!0,configurable:!0})},function(t,e,n){t.exports={default:n(181),__esModule:!0}},function(t,e,n){var r=n(12),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){"use strict";function r(){this.update(),this.__keyboardHandler(),this.__resizeHandler(),this.__selectHandler(),this.__mouseHandler(),this.__touchHandler(),this.__wheelHandler(),this.__dragHandler(),this.__render()}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__initScrollbar",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){return(0,u.default)(this,t,{value:e,enumerable:!0,configurable:!0})}var i=n(86),u=r(i),a=n(78);Object.defineProperty(a.SmoothScrollbar.prototype,"__readonly",{value:o,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this.targets,e=this.size,n=this.offset,r=this.thumbOffset,i=this.thumbSize;r.x=n.x/e.content.width*(e.container.width-(i.x-i.realX)),r.y=n.y/e.content.height*(e.container.height-(i.y-i.realY)),(0,o.setStyle)(t.xAxis.thumb,{"-transform":"translate3d("+r.x+"px, 0, 0)"}),(0,o.setStyle)(t.yAxis.thumb,{"-transform":"translate3d(0, "+r.y+"px, 0)"})}var o=n(112),i=n(78);Object.defineProperty(i.SmoothScrollbar.prototype,"__setThumbPosition",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(){var t=this.targets.container,e=t.getBoundingClientRect(),n=e.top,r=e.right,o=e.bottom,i=e.left,u=window,a=u.innerHeight,c=u.innerWidth;this.__readonly("bounding",{top:Math.max(n,0),right:Math.min(r,c),bottom:Math.min(o,a),left:Math.max(i,0)})}var o=n(78);Object.defineProperty(o.SmoothScrollbar.prototype,"__updateBounding",{value:r,writable:!0,configurable:!0})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,a.default)(t)}function i(){var t=this.targets,e=t.container,n=t.content;this.__readonly("children",[].concat(o(n.querySelectorAll(l.selectors)))),this.__readonly("isNestedScrollbar",!1);for(var r=[],i=e;i=i.parentElement;)l.sbList.has(i)&&(this.__readonly("isNestedScrollbar",!0),r.push(i));this.__readonly("parents",r)}var u=n(2),a=r(u),c=n(78),l=n(89);Object.defineProperty(c.SmoothScrollbar.prototype,"__updateTree",{value:i,writable:!0,configurable:!0})},function(t,e){}])});
},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wolfy87Eventemitter = require('wolfy87-eventemitter');

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resize = function (_eventEmitter) {
  _inherits(Resize, _eventEmitter);

  function Resize() {
    _classCallCheck(this, Resize);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resize).call(this));

    _this.onResizeHandle = _this.onResize.bind(_this);

    window.addEventListener('resize', _this.onResizeHandle);
    window.addEventListener('orientationchange', _this.onResizeHandle);
    return _this;
  }

  _createClass(Resize, [{
    key: 'onResize',
    value: function onResize() {
      if (!this.started) {
        this.started = true;
        this.times = 0;

        this.emitEvent('resize:start');
      }

      if (this.handle != null) {
        this.times = 0;

        window.cancelAnimationFrame(this.handle);
      }

      this.handle = window.requestAnimationFrame(function tick() {
        if (++this.times === 10) {
          this.handle = null;
          this.started = false;
          this.times = 0;

          this.emitEvent('resize:end');
        } else {
          this.handle = window.requestAnimationFrame(tick.bind(this));
        }
      }.bind(this));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('resize', this.onResizeHandle);
      window.removeEventListener('orientationchange', this.onResizeHandle);

      this.removeAllListeners();
    }
  }]);

  return Resize;
}(_wolfy87Eventemitter2.default);

exports.default = Resize;

},{"wolfy87-eventemitter":45}],45:[function(require,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}]},{},[1,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvQXBwLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL2dsb2JhbC9QYWdlVHJhbnNpdGlvbnMuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvZ2xvYmFsL2RlcGVuZGVuY2llcy5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9nbG9iYWwvc2Nyb2xsVG8uanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9tb2R1bGVzL0Fic3RyYWN0TW9kdWxlLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvQnV0dG9uLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvQ2Fyb3VzZWwuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9DYXJvdXNlbE5ld3MuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9DYXJvdXNlbFRpbWVyLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvQ29udGFjdEZvcm0uanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9Eb3VibGVTbGlkZXIuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9Ecm9wZG93bi5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9tb2R1bGVzL0ZpbHRlcnMuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9HZW5lcmljLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvSGVhZGVyUGFnZS5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9tb2R1bGVzL0xpZ2h0Ym94VmlkZW8uanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9Mb2NhdGlvblN3aXRjaGVyLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvTWFwLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvTmF2LmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvTmF2TmV3cy5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9tb2R1bGVzL05ld3MuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9QYWdlVHJhbnNpdGlvbnNNYW5hZ2VyLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvU2VhcmNoLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvU2ltaWxhclN3aXRjaGVyLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvU2xpZGVySG9tZS5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy9tb2R1bGVzL1NsaWRlclBhZ2UuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvbW9kdWxlcy9TbGlkZXJQcm9qZWN0LmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvU21vb3RoU2Nyb2xsaW5nLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL21vZHVsZXMvVGl0bGUuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvcmFjdGl2ZS9yYWN0aXZlLWV2ZW50cy10YXAuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvcmFjdGl2ZS9yYWN0aXZlLXRyYW5zaXRpb25zLWZhZGUuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvdXRpbHMvYW5pbWF0ZVRvLmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL3V0aWxzL2FycmF5LmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL3V0aWxzL2Vudmlyb25tZW50LmpzIiwiYXNzZXRzL3BvbWVybGVhdS9zY3JpcHRzL3V0aWxzL2dsb2JhbHMuanMiLCJhc3NldHMvcG9tZXJsZWF1L3NjcmlwdHMvdXRpbHMvaHRtbC5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy91dGlscy9pcy5qcyIsImFzc2V0cy9wb21lcmxlYXUvc2NyaXB0cy91dGlscy92aXNpYmlsaXR5LmpzIiwibm9kZV9tb2R1bGVzL2JhcmJhLmpzL2Rpc3QvYmFyYmEuanMiLCJub2RlX21vZHVsZXMvcmFjdGl2ZS1ldmVudHMtdGFwL2Rpc3QvcmFjdGl2ZS1ldmVudHMtdGFwLnVtZC5qcyIsIm5vZGVfbW9kdWxlcy9yYWN0aXZlLXRyYW5zaXRpb25zLWZhZGUvZGlzdC9yYWN0aXZlLXRyYW5zaXRpb25zLWZhZGUudW1kLmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aC1zY3JvbGxiYXIvZGlzdC9zbW9vdGgtc2Nyb2xsYmFyLmpzIiwibm9kZV9tb2R1bGVzL3Rocm90dGxlZC1yZXNpemUvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOztBQUNBOztBQUdBOzs7O0FBR0E7O0lBQVksTzs7Ozs7OzBKQVJaOzs7QUFJQTs7O0FBR0E7OztJQUdNLEc7QUFDTCxnQkFBYztBQUFBOztBQUFBOztBQUNiLE9BQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxPQUFLLGNBQUwsR0FBc0IsRUFBdEI7O0FBRUEseUJBQVUsRUFBVixDQUFhLGlCQUFiLEVBQWdDLFVBQUMsS0FBRCxFQUFXO0FBQzFDLFNBQUssV0FBTCxDQUFpQixNQUFNLFVBQXZCLEVBQ0UsYUFERixHQUVFLFdBRkY7QUFHQSxHQUpEO0FBS0E7O0FBRUQ7Ozs7OztlQUlBLGEsNEJBQWdCO0FBQ2Y7QUFDQSxNQUFJLElBQUksS0FBSyxjQUFMLENBQW9CLE1BQTVCOztBQUVBO0FBQ0EsU0FBTyxHQUFQLEVBQVk7QUFDWCxRQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsT0FBdkI7QUFDQSxR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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3cURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH0gZnJvbSAnLi91dGlscy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBnZXROb2RlRGF0YSB9IGZyb20gJy4vdXRpbHMvaHRtbCc7XG5cbi8vIEdsb2JhbCBmdW5jdGlvbnMgYW5kIHRvb2xzXG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL3V0aWxzL2dsb2JhbHMnO1xuXG4vLyBCYXNpYyBtb2R1bGVzXG5pbXBvcnQgKiBhcyBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XG5cbmNsYXNzIEFwcCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG5cdFx0dGhpcy5jdXJyZW50TW9kdWxlcyA9IFtdO1xuXG5cdFx0JGRvY3VtZW50Lm9uKCdpbml0TW9kdWxlcy5BcHAnLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMuaW5pdEdsb2JhbHMoZXZlbnQuZmlyc3RCbG9vZClcblx0XHRcdFx0LmRlbGV0ZU1vZHVsZXMoKVxuXHRcdFx0XHQuaW5pdE1vZHVsZXMoKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cm95IGFsbCBleGlzdGluZyBtb2R1bGVzXG5cdCAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcblx0ICovXG5cdGRlbGV0ZU1vZHVsZXMoKSB7XG5cdFx0Ly8gb29wIG1vZHVsZXNcblx0XHR2YXIgaSA9IHRoaXMuY3VycmVudE1vZHVsZXMubGVuZ3RoO1xuXG5cdFx0Ly8gRGVzdHJveSBhbGwgbW9kdWxlc1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdHRoaXMuY3VycmVudE1vZHVsZXNbaV0uZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5jdXJyZW50TW9kdWxlcy5zcGxpY2UoaSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRXhlY3V0ZSBnbG9iYWwgZnVuY3Rpb25zIGFuZCBzZXR0aW5nc1xuXHQgKiBBbGxvd3MgeW91IHRvIGluaXRpYWxpemUgZ2xvYmFsIG1vZHVsZXMgb25seSBvbmNlIGlmIHlvdSBuZWVkXG5cdCAqIChleC46IHdoZW4gdXNpbmcgQmFyYmEuanMgb3IgU21vb3RoU3RhdGUuanMpXG5cdCAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcblx0ICovXG5cdGluaXRHbG9iYWxzKGZpcnN0Qmxvb2QpIHtcblx0XHRnbG9iYWxzKGZpcnN0Qmxvb2QpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmQgbW9kdWxlcyBhbmQgaW5pdGlhbGl6ZSB0aGVtXG5cdCAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcblx0ICovXG5cdGluaXRNb2R1bGVzKHNjb3BlKSB7XG5cdFx0aWYgKCFzY29wZSkge1xuXHRcdFx0c2NvcGUgPSBkb2N1bWVudDtcblx0XHR9XG5cdFx0Ly8gRWxlbWVudHMgd2l0aCBtb2R1bGVcblx0XHR2YXIgbW9kdWxlRWxzID0gc2NvcGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kdWxlXScpO1xuXG5cdFx0Ly8gTG9vcCB0aHJvdWdoIGVsZW1lbnRzXG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciBlbHNMZW4gPSBtb2R1bGVFbHMubGVuZ3RoO1xuXG5cdFx0Zm9yICg7IGkgPCBlbHNMZW47IGkrKykge1xuXG5cdFx0XHQvLyBDdXJyZW50IGVsZW1lbnRcblx0XHRcdGxldCBlbCA9IG1vZHVsZUVsc1tpXTtcblxuXHRcdFx0Ly8gQWxsIGRhdGEtIGF0dHJpYnV0ZXMgY29uc2lkZXJlZCBhcyBvcHRpb25zXG5cdFx0XHRsZXQgb3B0aW9ucyA9IGdldE5vZGVEYXRhKGVsKTtcblxuXHRcdFx0Ly8gQWRkIGN1cnJlbnQgRE9NIGVsZW1lbnQgYW5kIGpRdWVyeSBlbGVtZW50XG5cdFx0XHRvcHRpb25zLmVsID0gZWw7XG5cdFx0XHRvcHRpb25zLiRlbCA9ICQoZWwpO1xuXG5cdFx0XHQvLyBNb2R1bGUgZG9lcyBleGlzdCBhdCB0aGlzIHBvaW50XG5cdFx0XHRsZXQgYXR0ciA9IG9wdGlvbnMubW9kdWxlO1xuXG5cdFx0XHQvLyBTcGxpdHRpbmcgbW9kdWxlcyBmb3VuZCBpbiB0aGUgZGF0YS1hdHRyaWJ1dGVcblx0XHRcdGxldCBtb2R1bGVJZGVudHMgPSBhdHRyLnJlcGxhY2UoL1xccy9nLCAnJykuc3BsaXQoJywnKTtcblxuXHRcdFx0Ly8gTG9vcCBtb2R1bGVzXG5cdFx0XHRsZXQgaiA9IDA7XG5cdFx0XHRsZXQgbW9kdWxlc0xlbiA9IG1vZHVsZUlkZW50cy5sZW5ndGg7XG5cblx0XHRcdGZvciAoOyBqIDwgbW9kdWxlc0xlbjsgaisrKSB7XG5cdFx0XHRcdGxldCBtb2R1bGVBdHRyID0gbW9kdWxlSWRlbnRzW2pdO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5tb2R1bGVzW21vZHVsZUF0dHJdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0bGV0IG1vZHVsZSA9IG5ldyB0aGlzLm1vZHVsZXNbbW9kdWxlQXR0cl0ob3B0aW9ucyk7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50TW9kdWxlcy5wdXNoKG1vZHVsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG4vLyBJSUZFIGZvciBsb2FkaW5nIHRoZSBhcHBsaWNhdGlvblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbihmdW5jdGlvbigpIHtcblx0bGV0IGxvYWRlZCA9IGZhbHNlO1xuXHRsZXQgbWF4TG9hZCA9IDMwMDA7XG5cblx0Ly8gT24gbG9hZFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQkd2luZG93Lm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0aWYoIWxvYWRlZCkge1xuXHRcdFx0bG9hZGVkID0gdHJ1ZTtcblx0XHRcdGxvYWQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIE1heGltdW0gbG9hZFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFsb2FkZWQpIHtcblx0XHRcdGxvYWRlZCA9IHRydWU7XG5cdFx0XHRsb2FkKCk7XG5cdFx0fVxuXHR9LCBtYXhMb2FkKTtcblxuXHQvLyBMb2FkXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGZ1bmN0aW9uIGxvYWQoKSB7XG5cdFx0d2luZG93LkFwcCA9IG5ldyBBcHAoKTtcblx0XHQkZG9jdW1lbnQudHJpZ2dlcih7XG5cdFx0XHR0eXBlOiAnaW5pdE1vZHVsZXMuQXBwJyxcblx0XHRcdGZpcnN0Qmxvb2Q6IHRydWVcblx0XHR9KTtcblxuXHRcdGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZS8pIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LykpIHtcblx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1pZScpO1xuXHRcdH1cblx0fVxuXG5cdGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDExOTlweClcIikubWF0Y2hlcykge1xuXHRcdGFkZExvYWRDbGFzcygpO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG5cdFx0JGRvY3VtZW50Lm9uKCdTbW9vdGhTY3JvbGwuaXNSZWFkeScsIChldmVudCkgPT4ge1xuXHRcdFx0YWRkTG9hZENsYXNzKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRMb2FkQ2xhc3MoKSB7XG5cdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xuXHRcdH0sIDYwMCk7XG5cdH1cbn0pKCk7XG4iLCJpbXBvcnQgeyAkZG9jdW1lbnQsICRodG1sLCAkYm9keSwgJHdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuLyoqXG4gKiBMaXN0IG9mIFRyYW5zaXRpb25zXG4gKi9cbmNvbnN0IHRyYW5zaXRpb25zID0ge1xuXHRtYWluVHJhbnNpdGlvbjoge1xuXHRcdHN0YXJ0OiBmdW5jdGlvbigpIHtcblx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1sb2FkZWQgaXMtYW5pbWF0ZWQgaGFzLW5hdi1uZXdzLW9wZW4nKTtcblxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMubmV3Q29udGFpbmVyTG9hZGluZy50aGVuKHRoaXMuZmluaXNoLmJpbmQodGhpcykpO1xuXHRcdFx0fSwgNjAwKVxuXHRcdH0sXG5cdFx0ZmluaXNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuZG9uZSgpO1xuXG5cdFx0XHRsZXQgJGVsID0gJCh0aGlzLm5ld0NvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVOYW1lID0gJGVsLmRhdGEoJ3RlbXBsYXRlJyk7XG4gICAgICAgICAgICAkYm9keS5hdHRyKCdkYXRhLXRlbXBsYXRlJywgdGVtcGxhdGVOYW1lKTtcblxuICAgICAgICAgICAgLy9yZWluaXQgbW9kdWxlc1xuXHRcdFx0bGV0IGFwcCA9IHdpbmRvdy5BcHA7XG5cdFx0XHRhcHAuZGVsZXRlTW9kdWxlcygpO1xuXHRcdFx0YXBwLmluaXRNb2R1bGVzKCk7XG5cblx0XHRcdGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDExOTlweClcIikubWF0Y2hlcykge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG5cdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xuXHRcdFx0XHR9LCA2MDApO1xuXHRcdFx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuXHQgICAgICAgICAgICAkZG9jdW1lbnQub24oJ1Ntb290aFNjcm9sbC5pc1JlYWR5JywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xuXHRcdFx0XHRcdH0sIDYwMCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0bmF2VHJhbnNpdGlvbjoge1xuXHRcdHN0YXJ0OiBmdW5jdGlvbigpIHtcblx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1sb2FkZWQgaXMtYW5pbWF0ZWQnKS5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xuXG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdoYXMtbmF2LW9wZW4nKTtcblx0XHRcdH0sNjApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLm5ld0NvbnRhaW5lckxvYWRpbmcudGhlbih0aGlzLmZpbmlzaC5iaW5kKHRoaXMpKTtcblx0XHRcdH0sIDgwMCk7XG5cdFx0fSxcblx0XHRmaW5pc2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5kb25lKCk7XG5cblx0XHRcdGxldCAkZWwgPSAkKHRoaXMubmV3Q29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZU5hbWUgPSAkZWwuZGF0YSgndGVtcGxhdGUnKTtcbiAgICAgICAgICAgICRib2R5LmF0dHIoJ2RhdGEtdGVtcGxhdGUnLCB0ZW1wbGF0ZU5hbWUpO1xuXG4gICAgICAgICAgICAvL3JlaW5pdCBtb2R1bGVzXG5cdFx0XHRsZXQgYXBwID0gd2luZG93LkFwcDtcblx0XHRcdGFwcC5kZWxldGVNb2R1bGVzKCk7XG5cdFx0XHRhcHAuaW5pdE1vZHVsZXMoKTtcblxuXHRcdFx0aWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTE5OXB4KVwiKS5tYXRjaGVzKSB7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcblx0XHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcblx0XHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWFuaW1hdGVkJyk7XG5cdFx0XHRcdH0sIDYwMCk7XG5cdFx0XHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG5cdCAgICAgICAgICAgICRkb2N1bWVudC5vbignU21vb3RoU2Nyb2xsLmlzUmVhZHknLCAoZXZlbnQpID0+IHtcblx0ICAgICAgICAgICAgXHQkYm9keS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xuXHRcdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkYm9keS5hZGRDbGFzcygnaXMtYW5pbWF0ZWQnKTtcblx0XHRcdFx0XHR9LCA2MDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHNlY3Rpb25UcmFuc2l0aW9uOiB7XG5cdFx0c3RhcnQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBTY3JvbGwgdG8gdG9wXG5cdFx0XHQkZG9jdW1lbnQudHJpZ2dlcih7XG5cdFx0XHRcdHR5cGU6ICdTbW9vdGhTY3JvbGwuZ29Ub1RvcCdcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLm9sZEhlYWRlciA9ICQoJy5qcy1oZWFkZXItaG9tZScpO1xuXG5cdFx0XHR0aGlzLm9wdGlvbiA9ICRib2R5LmF0dHIoJ2RhdGEtcm91dGUtb3B0aW9uJyk7XG5cblx0XHRcdGlmKHRoaXMub3B0aW9uID09PSAnbmV4dC1zZWN0aW9uJyl7XG5cdFx0XHRcdHRoaXMub2xkSGVhZGVyLmFkZENsYXNzKCdpcy1wcmV2Jyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5vbGRIZWFkZXIuYWRkQ2xhc3MoJ2lzLW5leHQnKTtcblx0XHRcdH1cblxuXHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcblx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1sb2FkZWQnKTtcblxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMubmV3Q29udGFpbmVyTG9hZGluZy50aGVuKHRoaXMuZmluaXNoLmJpbmQodGhpcykpO1xuXHRcdFx0fSwgMTIwMCk7XG5cblx0XHR9LFxuXHRcdGZpbmlzaDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdHRoaXMuZG9uZSgpO1xuXG5cdFx0XHRsZXQgJGVsID0gJCh0aGlzLm5ld0NvbnRhaW5lcik7XG5cdFx0XHR0aGlzLm5ld0hlYWRlciA9ICQoJy5qcy1oZWFkZXItaG9tZScsJGVsKTtcblxuXHRcdFx0aWYodGhpcy5vcHRpb24gPT09ICduZXh0LXNlY3Rpb24nKXtcblx0XHRcdFx0dGhpcy5uZXdIZWFkZXIuYWRkQ2xhc3MoJ2lzLW5leHQtc2VjdGlvbicpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMubmV3SGVhZGVyLmFkZENsYXNzKCdpcy1wcmV2LXNlY3Rpb24nKTtcblx0XHRcdH1cblxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlTmFtZSA9ICRlbC5kYXRhKCd0ZW1wbGF0ZScpO1xuICAgICAgICAgICAgJGJvZHkuYXR0cignZGF0YS10ZW1wbGF0ZScsIHRlbXBsYXRlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vcmVpbml0IG1vZHVsZXNcblx0XHRcdGxldCBhcHAgPSB3aW5kb3cuQXBwO1xuXHRcdFx0YXBwLmRlbGV0ZU1vZHVsZXMoKTtcblx0XHRcdGFwcC5pbml0TW9kdWxlcygpO1xuXG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdHRoaXMubmV3SGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1wcmV2LXNlY3Rpb24gaXMtbmV4dC1zZWN0aW9uJyk7XG5cdFx0XHR9LDMwMCk7XG5cblx0XHRcdGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDExOTlweClcIikubWF0Y2hlcykge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG5cdFx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XG5cdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCRib2R5LmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xuXHRcdFx0XHR9LCA2MDApO1xuXHRcdFx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuXHQgICAgICAgICAgICAkZG9jdW1lbnQub24oJ1Ntb290aFNjcm9sbC5pc1JlYWR5JywgKGV2ZW50KSA9PiB7XG5cdCAgICAgICAgICAgIFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcblx0XHRcdFx0XHQkYm9keS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLWFuaW1hdGVkJyk7XG5cdFx0XHRcdFx0fSwgNjAwKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCB7IHRyYW5zaXRpb25zIH07XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvaXMnO1xuaW1wb3J0IHsgYXJyYXlDb250YWlucywgZmluZEJ5S2V5VmFsdWUsIHJlbW92ZUZyb21BcnJheSB9IGZyb20gJy4uL3V0aWxzL2FycmF5JztcbmltcG9ydCB7ICRkb2N1bWVudCB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuY29uc3QgREVQRU5ERU5DSUVTID0gW107XG5cbmNvbnN0IFBSRUZJWCA9ICdkZXBlbmRlbmN5LSc7XG5cbnZhciBVVUlEID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERlcGVuZGVuY3koc291cmNlLCB0YXJnZXQpIHtcblx0dmFyIGlkZW50ID0gUFJFRklYICsgVVVJRCsrO1xuXG5cdERFUEVOREVOQ0lFUy5wdXNoKHtcblx0XHRpZGVudDogaWRlbnQsXG5cdFx0dGFyZ2V0OiB0YXJnZXQsXG5cdFx0c291cmNlOiBzb3VyY2Vcblx0fSk7XG5cblx0cmV0dXJuIGlkZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzRGVwZW5kZW5jaWVzKGlkZW50KSB7XG5cdHZhciBkZXBzID0gREVQRU5ERU5DSUVTLnNsaWNlKCkuZmlsdGVyKGZ1bmN0aW9uKG9iamVjdCkge1xuXHRcdGlmIChvYmplY3QudGFyZ2V0ID09PSBpZGVudCkge1xuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVwcy5sZW5ndGggPiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZURlcGVuZGVuY3koaWRlbnQpIHtcblx0aWYgKHR5cGVvZiBpZGVudCAgPT09ICd1bmRlZmluZWQnIHx8IGlkZW50ID09PSAnJykge1xuXHRcdGNvbnNvbGUud2FybignTmVlZCBpZGVudCB0byByZXNvbHZlIGRlcGVuZGVuY3kuJyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGRlcGVuZGVuY3kgPSBmaW5kQnlLZXlWYWx1ZShERVBFTkRFTkNJRVMsICdpZGVudCcsIGlkZW50KVswXTtcblxuXHRpZiAodHlwZW9mIGRlcGVuZGVuY3kgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0bGV0IHRhcmdldCA9IGRlcGVuZGVuY3kudGFyZ2V0O1xuXG5cdFx0cmVtb3ZlRnJvbUFycmF5KERFUEVOREVOQ0lFUywgZGVwZW5kZW5jeSk7XG5cblx0XHRpZiAoIWhhc0RlcGVuZGVuY2llcyh0YXJnZXQpKSB7XG5cdFx0XHQkZG9jdW1lbnQudHJpZ2dlcigncmVzb2x2ZURlcGVuZGVuY2llcy4nICsgdGFyZ2V0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oJ0RlcGVuZGVuY3kgY291bGQgbm90IGJlIGZvdW5kJyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG52YXIgaXNBbmltYXRpbmcgPSBmYWxzZTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGVhc2luZzogJ3N3aW5nJyxcbiAgICBoZWFkZXJPZmZzZXQ6IDYwLFxuICAgIHNwZWVkOiAzMDBcbn07XG5cbi8qKlxuICogc2Nyb2xsVG8gaXMgYSBmdW5jdGlvbiB0aGF0IHNjcm9sbHMgYSBjb250YWluZXIgdG8gYW4gZWxlbWVudCdzIHBvc2l0aW9uIHdpdGhpbiB0aGF0IGNvbnRyb2xsZXJcbiAqIFVzZXMgalF1ZXJ5J3MgJC5EZWZlcnJlZCB0byBhbGxvdyB1c2luZyBhIGNhbGxiYWNrIG9uIGFuaW1hdGlvbiBjb21wbGV0aW9uXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgJGVsZW1lbnQgIEEgalF1ZXJ5IG5vZGVcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUbygkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIC8vIERyb3AgZXZlcnl0aGluZyBpZiB0aGlzIGFpbid0IGEgalF1ZXJ5IG9iamVjdFxuICAgIGlmICgkZWxlbWVudCBpbnN0YW5jZW9mIGpRdWVyeSAmJiAkZWxlbWVudC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgLy8gTWVyZ2luZyBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zIDoge30pKTtcblxuICAgICAgICAvLyBQcmV2ZW50cyBhY2N1bXVsYXRpb24gb2YgYW5pbWF0aW9uc1xuICAgICAgICBpZiAoaXNBbmltYXRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIERlZmF1bHQgY29udGFpbmVyIHRoYXQgd2UnbGwgYmUgc2Nyb2xsaW5nXG4gICAgICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgLy8gVGVzdGluZyBjb250YWluZXIgaW4gb3B0aW9ucyBmb3IgalF1ZXJ5LW5lc3NcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB1c2luZyBhIGN1c3RvbSBjb250YWluZXIsIHdlIHRha2UgdGhlIHRvcCBkb2N1bWVudCBvZmZzZXRcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSwgd2UgdXNlIHRoZSBlbGVtZW50cyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgY29udGFpbmVyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuJGNvbnRhaW5lciAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucy4kY29udGFpbmVyIGluc3RhbmNlb2YgalF1ZXJ5ICYmIG9wdGlvbnMuJGNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lciA9IG9wdGlvbnMuJGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2Zmc2V0ID0gJGVsZW1lbnQucG9zaXRpb24oKS50b3BcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9mZnNldCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkY29udGFpbmVyLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZWxlbWVudE9mZnNldCAtIG9wdGlvbnMuaGVhZGVyT2Zmc2V0XG4gICAgICAgICAgICB9LCBvcHRpb25zLnNwZWVkLCBvcHRpb25zLmVhc2luZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG59XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5leHBvcnQge2RlZmF1bHQgYXMgTmF2fSBmcm9tICcuL21vZHVsZXMvTmF2JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBEcm9wZG93bn0gZnJvbSAnLi9tb2R1bGVzL0Ryb3Bkb3duJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTbGlkZXJIb21lfSBmcm9tICcuL21vZHVsZXMvU2xpZGVySG9tZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgU2xpZGVyUGFnZX0gZnJvbSAnLi9tb2R1bGVzL1NsaWRlclBhZ2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNsaWRlclByb2plY3R9IGZyb20gJy4vbW9kdWxlcy9TbGlkZXJQcm9qZWN0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBMaWdodGJveFZpZGVvfSBmcm9tICcuL21vZHVsZXMvTGlnaHRib3hWaWRlbyc7XG5leHBvcnQge2RlZmF1bHQgYXMgSGVhZGVyUGFnZX0gZnJvbSAnLi9tb2R1bGVzL0hlYWRlclBhZ2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIENhcm91c2VsfSBmcm9tICcuL21vZHVsZXMvQ2Fyb3VzZWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIENhcm91c2VsVGltZXJ9IGZyb20gJy4vbW9kdWxlcy9DYXJvdXNlbFRpbWVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDYXJvdXNlbE5ld3N9IGZyb20gJy4vbW9kdWxlcy9DYXJvdXNlbE5ld3MnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNtb290aFNjcm9sbGluZ30gZnJvbSAnLi9tb2R1bGVzL1Ntb290aFNjcm9sbGluZyc7XG5leHBvcnQge2RlZmF1bHQgYXMgTmF2TmV3c30gZnJvbSAnLi9tb2R1bGVzL05hdk5ld3MnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE5ld3N9IGZyb20gJy4vbW9kdWxlcy9OZXdzJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBMb2NhdGlvblN3aXRjaGVyfSBmcm9tICcuL21vZHVsZXMvTG9jYXRpb25Td2l0Y2hlcic7XG5leHBvcnQge2RlZmF1bHQgYXMgRmlsdGVyc30gZnJvbSAnLi9tb2R1bGVzL0ZpbHRlcnMnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIENvbnRhY3RGb3JtfSBmcm9tICcuL21vZHVsZXMvQ29udGFjdEZvcm0nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFBhZ2VUcmFuc2l0aW9uc01hbmFnZXJ9IGZyb20gJy4vbW9kdWxlcy9QYWdlVHJhbnNpdGlvbnNNYW5hZ2VyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTZWFyY2h9IGZyb20gJy4vbW9kdWxlcy9TZWFyY2gnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNpbWlsYXJTd2l0Y2hlcn0gZnJvbSAnLi9tb2R1bGVzL1NpbWlsYXJTd2l0Y2hlcic7XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgeyAkZG9jdW1lbnQsICR3aW5kb3csICRodG1sLCAkYm9keSB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuLyoqXG4gKiBBYnN0cmFjdCBtb2R1bGVcbiAqIEdpdmVzIGFjY2VzcyB0byBnZW5lcmljIGpRdWVyeSBub2Rlc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcblx0XHR0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuXHRcdHRoaXMuJGh0bWwgPSAkaHRtbDtcblx0XHR0aGlzLiRib2R5ID0gJGJvZHk7XG5cdFx0dGhpcy4kZWwgPSBvcHRpb25zLiRlbDtcblx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcblx0fVxuXG5cdHVuZXNjYXBlSFRNTChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyZsdDsvZywnPCcpLnJlcGxhY2UoLyZndDsvZywnPicpLnJlcGxhY2UoLyZhbXA7L2csJyYnKTtcblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrLkJ1dHRvbicsIChldmVudCkgPT4ge1xuXHRcdFx0dGhpcy4kZG9jdW1lbnQudHJpZ2dlcignVGl0bGUuY2hhbmdlTGFiZWwnLCBbJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKV0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoJy5CdXR0b24nKTtcblx0fVxufVxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEdlbmVyaWMgbW9kdWxlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuaW5pdFNsaWNrKCk7XG5cdH1cblxuXHQvLyBJbml0IHNsaWNrXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGluaXRTbGljaygpIHtcblx0XHR0aGlzLiRlbC5zbGljayh7XG5cdFx0XHRhcnJvd3M6IHRydWUsXG5cdFx0XHRkb3RzOiBmYWxzZSxcblx0XHRcdHNwZWVkOiA2MDAsXG5cdFx0XHRjc3NFYXNlOiAnY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKScsXG5cdFx0XHRwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYy1jYXJvdXNlbF9hcnJvdyAtcHJldiBvLWJ1dHRvbiAtc3F1YXJlIC1sZWZ0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwiby1idXR0b25fbGFiZWxcIj48c3ZnIGNsYXNzPVwiby1idXR0b25faWNvblwiIHJvbGU9XCJpbWdcIiB0aXRsZT1cIlByZXZpb3VzXCI+PHVzZSB4bGluazpocmVmPVwiYXNzZXRzL3BvbWVybGVhdS9pbWFnZXMvc3ByaXRlLnN2ZyNhcnJvdy1wcmV2XCI+PC91c2U+PC9zdmc+PC9zcGFuPjwvYnV0dG9uPicsXG5cdFx0XHRuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYy1jYXJvdXNlbF9hcnJvdyAtbmV4dCBvLWJ1dHRvbiAtc3F1YXJlIC1yaWdodFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cIm8tYnV0dG9uX2xhYmVsXCI+PHN2ZyBjbGFzcz1cIm8tYnV0dG9uX2ljb25cIiByb2xlPVwiaW1nXCIgdGl0bGU9XCJOZXh0XCI+PHVzZSB4bGluazpocmVmPVwiYXNzZXRzL3BvbWVybGVhdS9pbWFnZXMvc3ByaXRlLnN2ZyNhcnJvdy1uZXh0XCI+PC91c2U+PC9zdmc+PC9zcGFuPjwvYnV0dG9uPicsXG5cdFx0XHQvLyBtb2JpbGVGaXJzdDogdHJ1ZSxcblx0XHRcdC8vIHJlc3BvbnNpdmU6IFtcblx0XHRcdC8vIFx0e1xuXHQgIC8vICAgXHRcdFx0YnJlYWtwb2ludDogNzAwLFxuXHQgIC8vICAgXHRcdFx0c2V0dGluZ3M6IHtcblx0ICAvLyAgIFx0XHRcdFx0Y2VudGVyTW9kZTogdHJ1ZSxcblx0ICAvLyAgIFx0XHRcdFx0Y2VudGVyUGFkZGluZzogJzI0MHB4J1xuXHQgIC8vICAgXHRcdFx0fVxuXHQgIC8vICAgXHRcdH1cblx0ICAvLyAgIFx0XVxuXHQgICAgfSk7XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCk7XG5cdH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBHZW5lcmljIG1vZHVsZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLmluaXRTbGljaygpO1xuXHR9XG5cblx0Ly8gSW5pdCBzbGlja1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRpbml0U2xpY2soKSB7XG5cdFx0dGhpcy4kZWwuc2xpY2soe1xuXHRcdFx0YXJyb3dzOiB0cnVlLFxuXHRcdFx0ZG90czogZmFsc2UsXG5cdFx0XHRzcGVlZDogNjAwLFxuXHRcdFx0Y3NzRWFzZTogJ2N1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSknLFxuXHRcdFx0cHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImMtY2Fyb3VzZWxfYXJyb3cgLXByZXYgby1idXR0b24gLXNxdWFyZSAtbGVmdFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cIm8tYnV0dG9uX2xhYmVsXCI+PHN2ZyBjbGFzcz1cIm8tYnV0dG9uX2ljb25cIiByb2xlPVwiaW1nXCIgdGl0bGU9XCJQcmV2aW91c1wiPjx1c2UgeGxpbms6aHJlZj1cImFzc2V0cy9wb21lcmxlYXUvaW1hZ2VzL3Nwcml0ZS5zdmcjYXJyb3ctcHJldlwiPjwvdXNlPjwvc3ZnPjwvc3Bhbj48L2J1dHRvbj4nLFxuXHRcdFx0bmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImMtY2Fyb3VzZWxfYXJyb3cgLW5leHQgby1idXR0b24gLXNxdWFyZSAtcmlnaHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJvLWJ1dHRvbl9sYWJlbFwiPjxzdmcgY2xhc3M9XCJvLWJ1dHRvbl9pY29uXCIgcm9sZT1cImltZ1wiIHRpdGxlPVwiTmV4dFwiPjx1c2UgeGxpbms6aHJlZj1cImFzc2V0cy9wb21lcmxlYXUvaW1hZ2VzL3Nwcml0ZS5zdmcjYXJyb3ctbmV4dFwiPjwvdXNlPjwvc3ZnPjwvc3Bhbj48L2J1dHRvbj4nLFxuXHRcdFx0bW9iaWxlRmlyc3Q6IHRydWUsXG5cdFx0XHRyZXNwb25zaXZlOiBbXG5cdFx0XHRcdHtcblx0ICAgIFx0XHRcdGJyZWFrcG9pbnQ6IDcwMCxcblx0ICAgIFx0XHRcdHNldHRpbmdzOiB7XG5cdCAgICBcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cdCAgICBcdFx0XHR9XG5cdCAgICBcdFx0fVxuXHQgICAgXHRdXG5cdFx0fSk7XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCk7XG5cdH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBHZW5lcmljIG1vZHVsZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLmluaXRTbGljaygpO1xuXHR9XG5cblx0Ly8gSW5pdCBzbGlja1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRpbml0U2xpY2soKSB7XG5cdFx0dGhpcy4kZWwuc2xpY2soe1xuXHRcdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0YXV0b3BsYXlTcGVlZDogNDAwMCxcblx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRzcGVlZDogNjAwLFxuXHRcdFx0cGF1c2VPbkhvdmVyOiBmYWxzZSxcblx0XHRcdHBhdXNlT25Gb2N1czogZmFsc2UsXG5cdFx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRcdGZhZGU6IHRydWUsXG5cdFx0XHRjc3NFYXNlOiAnY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKScsXG5cdFx0ICAgIGN1c3RvbVBhZ2luZyA6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuXHRcdCAgICBcdGkrKztcblx0XHQgICAgXHRpZihpID09PSAxKXtcblx0XHQgICAgXHRcdHJldHVybiAnPGJ1dHRvbiBjbGFzcz1cImMtY2Fyb3VzZWxfZG90IGpzLWNhcm91c2VsLWRvdCBpcy1maXJzdFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cImMtY2Fyb3VzZWxfZG90X2xhYmVsXCI+MCcraSsnPC9zcGFuPjxzcGFuIGNsYXNzPVwiYy1jYXJvdXNlbF9kb3RfbGluZVwiPjwvc3Bhbj48L2J1dHRvbj4nO1xuXHRcdCAgICBcdH0gZWxzZSB7XG5cdFx0ICAgIFx0XHRyZXR1cm4gJzxidXR0b24gY2xhc3M9XCJjLWNhcm91c2VsX2RvdCBqcy1jYXJvdXNlbC1kb3RcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJjLWNhcm91c2VsX2RvdF9sYWJlbFwiPjAnK2krJzwvc3Bhbj48c3BhbiBjbGFzcz1cImMtY2Fyb3VzZWxfZG90X2xpbmVcIj48L3NwYW4+PC9idXR0b24+Jztcblx0XHQgICAgXHR9XG5cdFx0ICAgIH1cblx0XHR9KTtcblxuXHRcdHRoaXMuJGVsLnNsaWNrKCdzbGlja1BhdXNlJyk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1jYXJvdXNlbC1kb3QuaXMtZmlyc3QnKS5yZW1vdmVDbGFzcygnaXMtZmlyc3QnKTtcblx0XHRcdHRoaXMuJGVsLnNsaWNrKCdzbGlja1BsYXknKTtcblx0XHR9LCA0MDAwKTtcblx0fVxuXG5cdC8vIERlc3Ryb3lcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoKTtcblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWJzdHJhY3RNb2R1bGUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy4kaW5wdXRzID0gdGhpcy4kZWwuZmluZCgnOmlucHV0Jyk7XG5cdFx0dGhpcy5pbnB1dFNlbGVjdG9ycyA9ICdpbnB1dFt0eXBlPXRleHRdLCBpbnB1dFt0eXBlPXBhc3N3b3JkXSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9dXJsXSwgaW5wdXRbdHlwZT10ZWxdLCBpbnB1dFt0eXBlPW51bWJlcl0sIGlucHV0W3R5cGU9c2VhcmNoXSwgdGV4dGFyZWEnO1xuXHRcdHRoaXMuJHBhbmVzID0gdGhpcy4kZWwuZmluZCgnLmpzLWZvcm0tcGFuZScpO1xuXHRcdHRoaXMuJGNvbnNlbnQgPSB0aGlzLiRlbC5maW5kKCcuanMtZm9ybS1jb25zZW50Jyk7XG5cdFx0dGhpcy4kY29uc2VudExhYmVsID0gdGhpcy4kZWwuZmluZCgnLmpzLWZvcm0tY29uc2VudC1sYWJlbCcpO1xuXHRcdHRoaXMuJGNvbnNlbnRFcnJvciA9IHRoaXMuJGVsLmZpbmQoJy5qcy1mb3JtLWNvbnNlbnQtZXJyb3InKTtcblx0XHR0aGlzLiRjb25zZW50RXJyb3IgPSB0aGlzLiRlbC5maW5kKCcuanMtZm9ybS1jb25zZW50LWVycm9yJyk7XG5cdFx0dGhpcy4kZm9ybVdyYXAgPSB0aGlzLiRlbC5maW5kKCcuanMtZm9ybS13cmFwJyk7XG5cdFx0dGhpcy4kZm9ybUZlZWRiYWNrID0gdGhpcy4kZWwuZmluZCgnLmpzLWZvcm0tZmVlZGJhY2snKTtcblx0XHR0aGlzLmN1cnJlbnRQYW5lID0gMDtcblxuXHRcdHRoaXMudXBkYXRlVGV4dEZpZWxkcygpO1xuXG5cblxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHQvLyBTd2l0Y2ggZm9ybSBwYW5lc1xuXHRcdC8vIFNpbXBsZSBzd2l0Y2ggYmV0d2VlbiBpbmRleCAwIGFuZCAxIGZvciBub3dcblx0XHR0aGlzLiRlbC5vbignY2xpY2suQ29udGFjdEZvcm0nLCAnLmpzLXN3aXRjaC1wYW5lJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5nb1RvTmV4dFBhbmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuJGVsLm9uKCdjbGljay5Db250YWN0Rm9ybScsICcuanMtc3VibWl0JywgKCkgPT4ge1xuXHRcdFx0dGhpcy4kZWwuc3VibWl0KCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLiRlbC5vbignc3VibWl0LkNvbnRhY3RGb3JtJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmIChfdGhpcy5jdXJyZW50UGFuZSA9PT0gMCkge1xuXHRcdFx0XHRfdGhpcy5nb1RvTmV4dFBhbmUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBkYXRhID0gJCh0aGlzKS5zZXJpYWxpemVBcnJheSgpO1xuXHRcdFx0XHRfdGhpcy5zdWJtaXRGb3JtKGV2ZW50LCBkYXRhKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEFkZCBhY3RpdmUgaWYgZm9ybSBhdXRvIGNvbXBsZXRlXG5cdFx0dGhpcy4kZWwub24oJ2NoYW5nZS5Db250YWN0Rm9ybScsIHRoaXMuaW5wdXRTZWxlY3RvcnMsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciAkaW5wdXRFbGVtZW50ID0gJCh0aGlzKTtcblxuXHRcdFx0aWYoJGlucHV0RWxlbWVudC52YWwoKS5sZW5ndGggIT09IDAgfHwgJGlucHV0RWxlbWVudC5hdHRyKCdwbGFjZWhvbGRlcicpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0JGlucHV0RWxlbWVudC5zaWJsaW5ncygnbGFiZWwnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZXJyb3IgPSBfdGhpcy5maWVsZEhhc0Vycm9yKCRpbnB1dEVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGFjdGl2ZSB3aGVuIGVsZW1lbnQgaGFzIGZvY3VzXG5cdFx0dGhpcy4kZWwub24oJ2ZvY3VzLkNvbnRhY3RGb3JtJywgdGhpcy5pbnB1dFNlbGVjdG9ycywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5zaWJsaW5ncygnbGFiZWwsIGknKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLiRlbC5vbignYmx1ci5Db250YWN0Rm9ybScsIHRoaXMuaW5wdXRTZWxlY3RvcnMsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciAkaW5wdXRFbGVtZW50ID0gJCh0aGlzKTtcblxuXHRcdFx0aWYgKCRpbnB1dEVsZW1lbnQudmFsKCkubGVuZ3RoID09PSAwICYmICRpbnB1dEVsZW1lbnRbMF0udmFsaWRpdHkuYmFkSW5wdXQgIT09IHRydWUgJiYgJGlucHV0RWxlbWVudC5hdHRyKCdwbGFjZWhvbGRlcicpID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0JGlucHV0RWxlbWVudC5zaWJsaW5ncygnbGFiZWwsIGknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkaW5wdXRFbGVtZW50LnZhbCgpLmxlbmd0aCA9PT0gMCAmJiAkaW5wdXRFbGVtZW50WzBdLnZhbGlkaXR5LmJhZElucHV0ICE9PSB0cnVlICYmICRpbnB1dEVsZW1lbnQuYXR0cigncGxhY2Vob2xkZXInKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdCRpbnB1dEVsZW1lbnQuc2libGluZ3MoJ2knKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBlcnJvciA9IF90aGlzLmZpZWxkSGFzRXJyb3IoJGlucHV0RWxlbWVudCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBvbiBmb3JtIHN1Ym1pdCwgbWFueSB0aGluZ3MgaGFwcGVuXG5cdCAqIC0gVmFsaWRhdGlvbiBvZiBpbnB1dHNcblx0ICogLSBWYWxpZGF0aW9uIG9mIGNvbnNlbnRcblx0ICogLSBEZWxpdmVyeSBvZiBmb3JtIGRhdGEgdG8gdGhlIHNlcnZlclxuXHQgKiAtIE1hbmFnaW5nIHNlcnZlciByZXNwb25zZSBzdGF0ZXNcblx0ICpcblx0ICogQHBhcmFtICB7RXZlbnR9ICAgICAgICAgZXZlbnQgIGpRdWVyeSBFdmVudCBvYmplY3Rcblx0ICogQHBhcmFtICB7YXJyYXl8c3RyaW5nfSAgZGF0YSAgRm9ybSBkYXRhXG5cdCAqL1xuXHRzdWJtaXRGb3JtKGV2ZW50LCBkYXRhKSB7XG5cdFx0dmFyIGhhc0Vycm9ycyA9IHRoaXMuZmllbGRzSGF2ZUVycm9ycyh0aGlzLiRpbnB1dHMpO1xuXG5cdFx0aWYgKCF0aGlzLiRjb25zZW50LmlzKCc6Y2hlY2tlZCcpKSB7XG5cdFx0XHR0aGlzLiRjb25zZW50TGFiZWwuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xuXHRcdFx0dGhpcy4kY29uc2VudEVycm9yLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcblx0XHRcdGhhc0Vycm9ycyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCFoYXNFcnJvcnMpIHtcblx0XHRcdHRoaXMuJGNvbnNlbnRMYWJlbC5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XG5cdFx0XHR0aGlzLiRjb25zZW50RXJyb3IuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuXG5cdFx0XHR2YXIganF4aHIgPSAkLmFqYXgoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiB0aGlzLiRlbC5hdHRyKCdhY3Rpb24nKSxcblx0XHRcdFx0ZGF0YTogZGF0YVxuXHRcdFx0fSlcblx0XHRcdC5kb25lKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRoaXMuJHBhbmVzLmVxKHRoaXMuY3VycmVudFBhbmUpLmZhZGVPdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy4kZm9ybUZlZWRiYWNrLmZhZGVJbigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubWFuYWdlRXJyb3JzKHJlc3BvbnNlLmVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuZmFpbCgoKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlcnJvcicpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNpbXBsZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgZm9ybSBpcyB2YWxpZCBlbm91Z2ggdG8gc3dpdGNoIHBhbmVzXG5cdCAqIFVzZWQgYnkgJ05leHQnIGJ1dHRvbiBhbmQgZm9ybSBzdWJtaXRcblx0ICovXG5cdGdvVG9OZXh0UGFuZSgpIHtcblx0XHRpZiAoIXRoaXMuZmllbGRzSGF2ZUVycm9ycyh0aGlzLiRwYW5lcy5lcSh0aGlzLmN1cnJlbnRQYW5lKS5maW5kKCc6aW5wdXQnKSkpIHtcblx0XHRcdHRoaXMuJHBhbmVzLmVxKHRoaXMuY3VycmVudFBhbmUpLmZhZGVPdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRQYW5lID0gMTtcblx0XHRcdFx0dGhpcy4kcGFuZXMuZXEodGhpcy5jdXJyZW50UGFuZSkuZmFkZUluKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTG9vcCB0aHJvdWdoIGVycm9ycyBzZW50IGJhY2sgYnkgdGhlIHNlcnZlcnMgYW5kIGF0dGVtcHQgdG8gaWRlbnRpZnkgdGhlIGZhdWx0eSBlbGVtZW50c1xuXHQgKiBAcGFyYW0gIHthcnJheX0gIGVycm9ycyAgQW4gYXJyYXkgb2YgZWxlbWVudCBuYW1lcyB0aGF0IGFyZSBpbiBlcnJvclxuXHQgKi9cblx0bWFuYWdlRXJyb3JzKGVycm9ycykge1xuXHRcdHZhciBpID0gMCwgbGVuID0gZXJyb3JzLmxlbmd0aDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHQkKCcjJyArIGVycm9yc1tpXSkuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0byB1cGRhdGUgbGFiZWxzIG9mIHRleHQgZmllbGRzXG5cdCAqIEBzZWUgIE1hdGVyaWFsaXplQ1NTXG5cdCAqL1xuXHR1cGRhdGVUZXh0RmllbGRzKCkge1xuXHRcdCQodGhpcy5pbnB1dFNlbGVjdG9ycykuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuXHRcdFx0aWYgKCQoZWxlbWVudCkudmFsKCkubGVuZ3RoID4gMCB8fCBlbGVtZW50LmF1dG9mb2N1cyB8fCAkKHRoaXMpLmF0dHIoJ3BsYWNlaG9sZGVyJykgIT09IHVuZGVmaW5lZCB8fCAkKGVsZW1lbnQpWzBdLnZhbGlkaXR5LmJhZElucHV0ID09PSB0cnVlKSB7XG5cdFx0XHRcdCQodGhpcykuc2libGluZ3MoJ2xhYmVsLCBpJykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCh0aGlzKS5zaWJsaW5ncygnbGFiZWwsIGknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogRnVuY3Rpb24gdG8gdmFsaWRhdGUgc2luZ2xlIGlucHV0c1xuXHQgKiBAc2VlICBNYXRlcmlhbGl6ZUNTU1xuXHQgKi9cblx0ZmllbGRIYXNFcnJvcigkb2JqZWN0KSB7XG5cdFx0dmFyIGhhc0xlbmd0aCA9ICRvYmplY3QuYXR0cignbGVuZ3RoJykgIT09IHVuZGVmaW5lZDtcblx0XHR2YXIgbGVuQXR0ciA9IHBhcnNlSW50KCRvYmplY3QuYXR0cignbGVuZ3RoJykpO1xuXHRcdHZhciBsZW4gPSAkb2JqZWN0LnZhbCgpLmxlbmd0aDtcblx0XHR2YXIgZmllbGRIYXNFcnJvciA9IGZhbHNlO1xuXG5cdFx0aWYgKCRvYmplY3QuaGFzQ2xhc3MoJ2pzLXZhbGlkYXRlJykpIHtcblx0XHRcdGlmICgkb2JqZWN0LnZhbCgpLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0XHRpZiAoJG9iamVjdFswXS52YWxpZGl0eS5iYWRJbnB1dCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBmb3IgY2hhcmFjdGVyIGNvdW50ZXIgYXR0cmlidXRlc1xuXHRcdFx0XHRcdGlmICgoJG9iamVjdC5pcygnOnZhbGlkJykgJiYgaGFzTGVuZ3RoICYmIChsZW4gPD0gbGVuQXR0cikpIHx8ICgkb2JqZWN0LmlzKCc6dmFsaWQnKSAmJiAhaGFzTGVuZ3RoKSkge1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRmaWVsZEhhc0Vycm9yID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCRvYmplY3QuYXR0cigndHlwZScpID09ICdlbWFpbCcpIHtcblx0XHRcdFx0XHR2YXIgRU1BSUxfUkVHRVggPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcblx0XHRcdFx0XHRpZiAoIUVNQUlMX1JFR0VYLnRlc3QoJG9iamVjdC52YWwoKSkpIHtcblx0XHRcdFx0XHRcdGZpZWxkSGFzRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmaWVsZEhhc0Vycm9yID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkSGFzRXJyb3IpIHtcblx0XHRcdFx0JG9iamVjdC5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkb2JqZWN0LnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmllbGRIYXNFcnJvcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBWYWxpZGF0ZSBtdWx0aXBsZSBpbnB1dHNcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICovXG5cdGZpZWxkc0hhdmVFcnJvcnMoJGlucHV0cykge1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgbGVuID0gJGlucHV0cy5sZW5ndGg7XG5cdFx0dmFyIGhhc0Vycm9ycyA9IGZhbHNlO1xuXG5cdFx0Zm9yICg7aSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZih0aGlzLmZpZWxkSGFzRXJyb3IoJGlucHV0cy5lcShpKSkpIHtcblx0XHRcdFx0aGFzRXJyb3JzID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFzRXJyb3JzO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoJy5Db250YWN0Rm9ybScpO1xuXHR9XG59XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuJHNsaWRlck9uZSA9IG9wdGlvbnMuc2xpZGVycy5vbmUuJGVsO1xuXHRcdHRoaXMuJHNsaWRlclR3byA9IG9wdGlvbnMuc2xpZGVycy50d28uJGVsO1xuXG5cdFx0dGhpcy4kc2xpZGVyT25lLnNsaWNrKFxuXHRcdFx0b3B0aW9ucy5zbGlkZXJzLm9uZS5vcHRpb25zXG5cdFx0KS5vbignYmVmb3JlQ2hhbmdlJywgKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpID0+IHtcblx0XHRcdGlmIChjdXJyZW50U2xpZGUgIT09IG5leHRTbGlkZSkge1xuXHRcdFx0XHRsZXQgYWN0aW9uO1xuXHRcdFx0XHRpZiAoTWF0aC5hYnMobmV4dFNsaWRlIC0gY3VycmVudFNsaWRlKSA9PT0gMSkge1xuXHRcdFx0XHRcdGFjdGlvbiA9IChuZXh0U2xpZGUgLSBjdXJyZW50U2xpZGUgPiAwKSA/ICdzbGlja05leHQnIDogJ3NsaWNrUHJldic7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWN0aW9uID0gKG5leHRTbGlkZSAtIGN1cnJlbnRTbGlkZSA+IDApID8gJ3NsaWNrUHJldicgOiAnc2xpY2tOZXh0Jztcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLiRzbGlkZXJUd28uc2xpY2soYWN0aW9uKTtcblx0XHRcdFx0dGhpcy5hY3RpdmVTbGlkZUNoYW5nZWQobmV4dFNsaWRlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuJHNsaWRlclR3by5zbGljayhvcHRpb25zLnNsaWRlcnMudHdvLm9wdGlvbnMpO1xuXG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrLkRvdWJsZVNsaWRlcicsICcuanMtc2xpZGVyLWJ1dHRvbicsIChldmVudCkgPT4ge1xuXHRcdFx0dGhpcy5jaGFuZ2VTbGlkZShldmVudCk7XG5cdFx0fSlcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGFuZ2UgYWN0aXZlIHNsaWRlIGZvciBib3RoIHNsaWRlcnNcblx0ICogQHZhciAge0V2ZW50fSAgZXZlbnRcblx0ICovXG5cdGNoYW5nZVNsaWRlKGV2ZW50KSB7XG5cdFx0dmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXHRcdHZhciBhY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG5cdFx0c3dpdGNoIChhY3Rpb24pIHtcblx0XHRcdGNhc2UgJ3ByZXYnOlxuXHRcdFx0XHR0aGlzLiRzbGlkZXJPbmUuc2xpY2soJ3NsaWNrUHJldicpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ25leHQnOlxuXHRcdFx0XHR0aGlzLiRzbGlkZXJPbmUuc2xpY2soJ3NsaWNrTmV4dCcpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRhY3RpdmVTbGlkZUNoYW5nZWQoaW5kZXgpIHt9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRzbGlkZXJPbmUuc2xpY2soJ3Vuc2xpY2snKTtcblx0XHR0aGlzLiRzbGlkZXJUd28uc2xpY2soJ3Vuc2xpY2snKTtcblx0XHR0aGlzLiRlbC5vZmYoJy5Eb3VibGVTbGlkZXInKTtcblx0fVxufVxuIiwiaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWJzdHJhY3RNb2R1bGUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubW9kZSA9IHR5cGVvZihvcHRpb25zWydkcm9wZG93bi1tb2RlJ10pICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnNbJ2Ryb3Bkb3duLW1vZGUnXSA6ICdhY2NvcmRlb24nO1xuXG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrLkRyb3Bkb3duJywgJy5qcy1kcm9wZG93bi10b2dnbGUnLCAoZXZlbnQpID0+IHRoaXMubWFuYWdlRHJvcGRvd25DbGljayhldmVudCkpO1xuXHR9XG5cblx0Ly8gVG9nZ2xlIGRyb3Bkb3duXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdG1hbmFnZURyb3Bkb3duQ2xpY2soZXZlbnQpIHtcblx0XHRpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMTk5cHgpXCIpLm1hdGNoZXMpIHtcblx0XHRcdHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdHZhciAkcGFyZW50ID0gJHRhcmdldC5wYXJlbnRzKCcuanMtZHJvcGRvd24nKTtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0aWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLWRpc2FibGVkJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5tb2RlID09PSAnYWNjb3JkZW9uJykge1xuXHRcdFx0XHQkcGFyZW50LnNpYmxpbmdzKCcuanMtZHJvcGRvd24nKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGFzLWRyb3Bkb3duJylcblx0XHRcdFx0XHQuZmluZCgnLmpzLWRyb3Bkb3duLWxpc3QnKVxuXHRcdFx0XHRcdC5zdG9wKClcblx0XHRcdFx0XHQuc2xpZGVVcCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQkdGFyZ2V0LnNpYmxpbmdzKCcuanMtZHJvcGRvd24tbGlzdCcpXG5cdFx0XHRcdC5zdG9wKClcblx0XHRcdFx0LnNsaWRlVG9nZ2xlKCk7XG5cblx0XHRcdGlmICgkcGFyZW50Lmhhc0NsYXNzKCdoYXMtZHJvcGRvd24nKSkge1xuXHRcdFx0XHQkcGFyZW50LnJlbW92ZUNsYXNzKCdoYXMtZHJvcGRvd24nKTtcblx0XHRcdFx0dGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2hhcy1kcm9wZG93bicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHBhcmVudC5hZGRDbGFzcygnaGFzLWRyb3Bkb3duJyk7XG5cdFx0XHRcdHRoaXMuJGVsLmFkZENsYXNzKCdoYXMtZHJvcGRvd24nKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCcuRHJvcGRvd24nKTtcblx0fVxufVxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEZpbHRlcnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSc7XG5pbXBvcnQgYW5pbWF0ZVRvIGZyb20gJy4uL3V0aWxzL2FuaW1hdGVUbyc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvaXMnO1xuaW1wb3J0IHsgYWRkRGVwZW5kZW5jeSwgcmVzb2x2ZURlcGVuZGVuY3kgfSBmcm9tICcuLi9nbG9iYWwvZGVwZW5kZW5jaWVzJztcbmltcG9ydCBTY3JvbGxiYXIgZnJvbSAnc21vb3RoLXNjcm9sbGJhcic7XG5pbXBvcnQgdGFwIGZyb20gJy4uL3JhY3RpdmUvcmFjdGl2ZS1ldmVudHMtdGFwJztcbmltcG9ydCBmYWRlIGZyb20gJy4uL3JhY3RpdmUvcmFjdGl2ZS10cmFuc2l0aW9ucy1mYWRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLnNlYXJjaElzT3BlbiA9IGZhbHNlO1xuXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtcblx0XHRcdCR0b3RhbDogJCgnLmpzLXByb2plY3QtdG90YWwnKSxcblx0XHRcdCRmaWx0ZXJzOiAkKCcuanMtZmlsdGVycycpLFxuXHRcdFx0JHByb2plY3RzOiAkKCcuanMtcHJvamVjdHMnKVxuXHRcdH07XG5cblx0XHR3aW5kb3cuUmFjdGl2ZS5ERUJVRyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5maWx0ZXJzQ29udHJvbGxlciA9IHRoaXMuaW5pdEZpbHRlcnNDb250cm9sbGVyKCk7XG5cdFx0dGhpcy5wcm9qZWN0c0NvbnRyb2xsZXIgPSB0aGlzLmluaXRQcm9qZWN0c0NvbnRyb2xsZXIoKTtcblxuXHRcdHRoaXMuc21vb3RoU2Nyb2xsaW5nRGVwZW5kZW5jeSA9IGFkZERlcGVuZGVuY3koJ0ZpbHRlcnMnLCAnU21vb3RoU2Nyb2xsaW5nJyk7XG5cblx0XHR0aGlzLmZpbHRlcnNDb250cm9sbGVyLmRpc3BhdGNoRmlsdGVycyh7XG5cdFx0XHRmaXJzdEJsb29kOiB0cnVlXG5cdFx0fSk7XG5cblx0XHRpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcblx0XHRcdHRoaXMuc2Nyb2xsYmFyVGFncyA9IFNjcm9sbGJhci5pbml0KHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLXRhZ3MnKVswXSk7XG5cdFx0XHR0aGlzLnNjcm9sbGJhckZpbHRlcnMgPSBTY3JvbGxiYXIuaW5pdCh0aGlzLiRlbC5maW5kKCcuanMtZmlsdGVycy1saXN0JylbMF0pO1xuXHRcdH1cblxuXHRcdHRoaXMuJGVsLm9uKCdjbGljay5GaWx0ZXJzJywgJy5qcy1maWx0ZXJzLW9wZW4nLCAoZXZlbnQpID0+IHRoaXMudG9nZ2xlRmlsdGVycyhldmVudCkpO1xuXHRcdHRoaXMuJGVsLm9uKCdjbGljay5GaWx0ZXJzJywgJy5qcy1maWx0ZXJzLXNlYXJjaC1vcGVuJywgKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZUZpbHRlcnNTZWFyY2goZXZlbnQpKTtcblx0XHR0aGlzLiRlbC5vbignY2xpY2suRmlsdGVycycsICcuanMtZmlsdGVycy1idXR0b24nLCAoZXZlbnQpID0+IHRoaXMuZmlsdGVyKGV2ZW50KSk7XG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrLkZpbHRlcnMnLCAnLmpzLWZpbHRlcnMtc2VhcmNoLWJ1dHRvbicsIChldmVudCkgPT4gdGhpcy5zZWFyY2goZXZlbnQpKTtcblx0fVxuXG5cdC8vXHRUb2dnbGUgZmlsdGVyc1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHR0b2dnbGVGaWx0ZXJzKGV2ZW50KSB7XG5cdFx0dGhpcy4kYm9keS50b2dnbGVDbGFzcygnaGFzLWZpbHRlcnMtb3BlbicpLnJlbW92ZUNsYXNzKCdoYXMtZmlsdGVycy1zZWFyY2gtb3BlbicpO1xuXHRcdCQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLXNlYXJjaC1vcGVuLmlzLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuXHRcdGlmICh0aGlzLiRib2R5Lmhhc0NsYXNzKCdoYXMtZmlsdGVycy1vcGVuJykpIHtcblx0XHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLWxpc3QnKS5zY3JvbGxUb3AoMCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9cdENsb3NlIGZpbHRlcnNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Y2xvc2VGaWx0ZXJzKCkge1xuXHRcdHRoaXMuJGJvZHkucmVtb3ZlQ2xhc3MoJ2hhcy1maWx0ZXJzLW9wZW4nKTtcblx0XHR0aGlzLiRlbC5maW5kKCcuanMtZmlsdGVycy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHR9XG5cblx0Ly9cdFRvZ2dsZSBmaWx0ZXJzIHNlYXJjaFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHR0b2dnbGVGaWx0ZXJzU2VhcmNoKGV2ZW50KSB7XG5cdFx0dmFyICRzZWFyY2hJbnB1dCA9IHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLXNlYXJjaC1pbnB1dCcpO1xuXG5cdFx0dGhpcy4kYm9keS50b2dnbGVDbGFzcygnaGFzLWZpbHRlcnMtc2VhcmNoLW9wZW4nKS5yZW1vdmVDbGFzcygnaGFzLWZpbHRlcnMtb3BlbicpO1xuXHRcdCQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLW9wZW4uaXMtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0aWYgKCF0aGlzLnNlYXJjaElzT3Blbikge1xuXHRcdFx0JHNlYXJjaElucHV0LmZvY3VzKCk7XG5cdFx0XHR0aGlzLnNlYXJjaElzT3BlbiA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRzZWFyY2hJbnB1dC5ibHVyKCk7XG5cdFx0XHR0aGlzLnNlYXJjaElzT3BlbiA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8vXHRDbG9zZSBmaWx0ZXJzIHNlYXJjaFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRjbG9zZUZpbHRlcnNTZWFyY2goZXZlbnQpIHtcblx0XHR0aGlzLiRib2R5LnJlbW92ZUNsYXNzKCdoYXMtZmlsdGVycy1zZWFyY2gtb3BlbicpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1maWx0ZXJzLXNlYXJjaC1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHR9XG5cblx0Ly8gRmlsdGVyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGZpbHRlcihldmVudCkge1xuXHRcdGFuaW1hdGVUbyh0aGlzLmVsZW1lbnRzLiRwcm9qZWN0cyk7XG5cdFx0dGhpcy5jbG9zZUZpbHRlcnMoKTtcblx0fVxuXG5cdC8vIFNlYXJjaFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRzZWFyY2goZXZlbnQpIHtcblx0XHR0aGlzLmNsb3NlRmlsdGVyc1NlYXJjaCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgY29udHJvbGxlciBpcyB1c2VkIGZvciBtYW5hZ2luZyBmaWx0ZXJzIGJlaW5nIGFkZGVkIGFuZCByZW1vdmVkXG5cdCAqIEl0IHRlbGxzIHRoZSBwcm9qZWN0IGNvbnRyb2xsZXIgd2hpY2ggZmlsdGVycyBhcmUgYWN0aXZlIG9yIG5vdCB0aHJvdWdoIGV2ZW50IGRpc3BhdGNoaW5nXG5cdCAqXG5cdCAqIEByZXR1cm4gIHtSYWN0aXZlIE9iamVjdH0gIFJhY3RpdmUgaW5zdGFuY2Vcblx0ICovXG5cdGluaXRGaWx0ZXJzQ29udHJvbGxlcigpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuXHRcdFx0ZWw6IHRoaXMuZWxlbWVudHMuJGZpbHRlcnMsXG5cdFx0XHR0ZW1wbGF0ZTogdGhpcy51bmVzY2FwZUhUTUwodGhpcy5lbGVtZW50cy4kZmlsdGVycy5odG1sKCkpLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRpdGVtczogW10sXG5cdFx0XHRcdGFjdGl2ZUNhdGVnb3JpZXM6IHdpbmRvdy50ZW1wbGF0ZURhdGEuYWN0aXZlQ2F0ZWdvcmllcyxcblx0XHRcdFx0YWN0aXZlU2VydmljZXM6IHdpbmRvdy50ZW1wbGF0ZURhdGEuYWN0aXZlU2VydmljZXMsXG5cdFx0XHRcdGFjdGl2ZUNoYXJhY3RlcmlzdGljczogd2luZG93LnRlbXBsYXRlRGF0YS5hY3RpdmVDaGFyYWN0ZXJpc3RpY3MsXG5cdFx0XHRcdGFjdGl2ZVRhZ3M6IHdpbmRvdy50ZW1wbGF0ZURhdGEuYWN0aXZlVGFncyxcblx0XHRcdFx0YWN0aXZlVHlwZTogd2luZG93LnRlbXBsYXRlRGF0YS5hY3RpdmVUeXBlLFxuXHRcdFx0XHRmaWx0ZXJCb3hlczogd2luZG93LnRlbXBsYXRlRGF0YS5maWx0ZXJCb3hlcyxcblx0XHRcdFx0cHJvamVjdFR5cGVzOiB3aW5kb3cudGVtcGxhdGVEYXRhLnByb2plY3RUeXBlcyxcblx0XHRcdFx0cHJvamVjdENhdGVnb3JpZXM6IHdpbmRvdy50ZW1wbGF0ZURhdGEucHJvamVjdENhdGVnb3JpZXMsXG5cdFx0XHRcdHByb2plY3RUYWdzOiB3aW5kb3cudGVtcGxhdGVEYXRhLnByb2plY3RUYWdzXG5cdFx0XHR9LFxuXHRcdFx0ZGVsaW1pdGVyczogWydbWycsICddXSddLFxuXHRcdFx0dHJpcGxlRGVsaW1pdGVyczogWydbW1snLCAnXV1dJ10sXG5cdFx0XHRldmVudHM6IHsgdGFwIH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIEFkZHMgYW4gaXRlbSB0byBmaWx0ZXJzXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtvYmplY3R9ICBtb2RlbCAgSXRlbSBtb2RlbFxuXHRcdFx0ICovXG5cdFx0XHRhZGRJdGVtOiBmdW5jdGlvbiAobW9kZWwpIHtcblx0XHRcdFx0dGhpcy5wdXNoKCdpdGVtcycsIG1vZGVsKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogRmlyZSBhbiBldmVudCwgc28gd2UgY2FuIHF1ZXJ5IHRoZSBzZXJ2ZXIgZm9yIHByb2plY3RzIGFjY29yZGluZyB0byBhY3RpdmUgZmlsdGVyc1xuXHRcdFx0ICovXG5cdFx0XHRkaXNwYXRjaEZpbHRlcnM6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCB7fSk7XG5cblx0XHRcdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRcdFx0ZmlsdGVyczogdGhpcy5nZXQoJ2l0ZW1zJyksXG5cdFx0XHRcdFx0a2V5d29yZDogdGhpcy5nZXQoJ2tleXdvcmQnKVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRfdGhpcy5wcm9qZWN0c0NvbnRyb2xsZXIuZmlyZSgncmVmcmVzaFByb2plY3RzJywgZGF0YSwgb3B0aW9ucyk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEZpbmQgYW4gaXRlbSBpbiBpdGVtcyBhcnJheSB1c2luZyBpdHMgSURcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgIGlkICBRdWFzaS11bmlxdWUgaWRlbnRpZmllciBjb21wb3NlZCBvZiB7e2ZpbHRlcklkZW50fX1fe3tpZGVudH19XG5cdFx0XHQgKiBAcmV0dXJuIHtpbnR8Ym9vbGVhbn0gICAgICBJbmRleCBvZiB0aGUgaXRlbSBpbiB0aGUgYXJyYXkgb3IgZmFsc2UgaWYgY2FuJ3QgYmUgZm91bmRcblx0XHRcdCAqL1xuXHRcdFx0ZmluZEluZGV4OiBmdW5jdGlvbiAoIGlkICkge1xuXHRcdFx0XHR2YXIgaXRlbXMgPSB0aGlzLmdldCgnaXRlbXMnKTtcblx0XHRcdFx0dmFyIGkgPSBpdGVtcy5sZW5ndGg7XG5cblx0XHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRcdGlmIChpdGVtc1tpXS5pZCA9PT0gaWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNlYXJjaCBpdGVtIHNldCBmb3IgaXRlbXMgd2l0aCBhIHNwZWNpZmljIHRheG9ub215XG5cdFx0XHQgKiBAcGFyYW0gICB7c3RyaW5nfSAgdGF4b25vbXkgIFRheG9ub215IGlkZW50aWZpZXJcblx0XHRcdCAqIEByZXR1cm4gIHthcnJheX0gICAgICAgICAgICAgQXJyYXkgb2YgaXRlbSBpbmRleGVzXG5cdFx0XHQgKi9cblx0XHRcdGZpbmRUYXhvbm9teUluZGV4ZXM6IGZ1bmN0aW9uICggdGF4b25vbXkgKSB7XG5cdFx0XHRcdHZhciBpdGVtcyA9IHRoaXMuZ2V0KCdpdGVtcycpO1xuXHRcdFx0XHR2YXIgaSA9IGl0ZW1zLmxlbmd0aDtcblx0XHRcdFx0dmFyIGluZGV4ZXMgPSBbXTtcblxuXHRcdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1zW2ldLnRheG9ub215ID09PSB0YXhvbm9teSkge1xuXHRcdFx0XHRcdFx0aW5kZXhlcy5wdXNoKGkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaW5kZXhlcztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSXRlbSBtb2RlbFxuXHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgcGFyYW1zICBJbml0aWFsIHZhbHVlcyBmb3IgdGhlIG1vZGVsXG5cdFx0XHQgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIEl0ZW0gbW9kZWxcblx0XHRcdCAqXG5cdFx0XHQgKiBNb2RlbCBwcm9wZXJ0aWVzXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICBpZCAgICAgICAgUXVhc2ktdW5pcXVlIGlkZW50aWZpZXIgY29tcG9zZWQgb2Yge3tmaWx0ZXJJZGVudH19X3t7aWRlbnR9fVxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICB0YXhvbm9teSAgRmlsdGVyIHRheG9ub215XG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIGxhYmVsICAgICBGcm9udCBlbmQgdmlld1xuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICB2YWx1ZSAgICAgSW5wdXQgdmFsdWUgdXNlZCBmb3IgZmlsdGVyaW5nIHByb2plY3RzIGluIG91ciBhY3Rpb25cblx0XHRcdCAqL1xuXHRcdFx0Z2V0SXRlbU1vZGVsOiBmdW5jdGlvbiAoIHBhcmFtcyApIHtcblx0XHRcdFx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdFx0XHRcdGlkOiBudWxsLFxuXHRcdFx0XHRcdHRheG9ub215OiAnJyxcblx0XHRcdFx0XHRsYWJlbDogJycsXG5cdFx0XHRcdFx0dmFsdWU6ICcnXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiAkLmV4dGVuZChkZWZhdWx0cywgcGFyYW1zKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogRXh0cmFjdCBhbiBpdGVtIG1vZGVsIGZyb20gYSBub2RlXG5cdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBldmVudCAgUmFjdGl2ZSBldmVudCBvYmplY3Rcblx0XHRcdCAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICBJdGVtIG1vZGVsXG5cdFx0XHQgKi9cblx0XHRcdGdldEl0ZW1Nb2RlbEZyb21Ob2RlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRJdGVtTW9kZWwoe1xuXHRcdFx0XHRcdGlkOiBldmVudC5ub2RlLmlkLFxuXHRcdFx0XHRcdHRheG9ub215OiBldmVudC5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXhvbm9teScpLFxuXHRcdFx0XHRcdGxhYmVsOiBldmVudC5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpLFxuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5ub2RlLnZhbHVlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZW1vdmUgYW4gaXRlbSBpbiB0aGUgaXRlbXMgYXJyYXkgYWNjb3JkaW5nIHRvIGl0cyBpbmRleFxuXHRcdFx0ICogQWxzbyB1bmNoZWNrIGl0cyBhc3NvY2lhdGVkIGlucHV0XG5cdFx0XHQgKiBDb3VsZG4ndCBmaW5kIGEgd2F5IHRvIGRhdGEtYmluZCBpbiB0aGlzIHNpdHVhdGlvblxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAge2ludH0gICAgIGluZGV4ICBJbmRleCBvZiB0aGUgaXRlbSB3aXRoaW4gdGhlIGFycmF5XG5cdFx0XHQgKi9cblx0XHRcdHJlbW92ZUl0ZW06IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cdFx0XHRcdC8vIEZhbHNlIHdvdWxkIGluZGljYXRlIHRoYXQgdGhlIGl0ZW0gY291bGQgbm90IGJlIGZvdW5kIGluIGl0ZW1zIGFycmF5XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHQvLyBHZXQgaXRlbSBieSBrZXlwYXRoLiBBbGxvd3MgdXMgdG8gZmluZCBpdHMgSFRNTCBpbnB1dCBlbGVtZW50XG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSB0aGlzLmdldCgnaXRlbXMuJyArIGluZGV4KTtcblx0XHRcdFx0XHR2YXIgJGl0ZW0gPSAkKCcjJyArIGl0ZW0uaWQpO1xuXG5cdFx0XHRcdFx0Ly8gUmVtb3ZpbmcgdGhlIGl0ZW0gZnJvbSB0aGUgaXRlbXMgYXJyYXlcblx0XHRcdFx0XHR0aGlzLnNwbGljZSggJ2l0ZW1zJywgaW5kZXgsIDEgKTtcblxuXHRcdFx0XHRcdC8vIE5vdCBzbyBncmFjZWZ1bCwgc2luY2Ugd2UgY291bGRuJ3QgcmVhbGx5IGRhdGEtYmluZCB0aGUgaW5wdXRcblx0XHRcdFx0XHQkaXRlbS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJlY2VpdmVzIGEgbGlzdCBvZiBpbmRleGVzIHRvIHJlbW92ZSBmcm9tIGBpdGVtc2Bcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIHthcnJheX0gIGluZGV4ZXMgIEFycmF5IG9mIGluZGV4ZXMgdG8gcmVtb3ZlXG5cdFx0XHQgKi9cblx0XHRcdHJlbW92ZUl0ZW1zOiBmdW5jdGlvbiAoIGluZGV4ZXMgKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBpbmRleGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVJdGVtKCBpbmRleGVzW2ldICk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkIGEgZmlsdGVyIHRvIGl0ZW1zIGFjY29yZGluZyB0byBkZWZpbmVkIGZpbHRlcnNcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgdGF4b25vbXkgIEZpbHRlciB0YXhvbm9teVxuXHRcdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgIGRhdGFTZXQgICBSYWN0aXZlIGRhdGFzZXQgdG8gcGFyc2Vcblx0XHRcdCAqIEBwYXJhbSAge2ludHxzdHJpbmd9ICB2YWx1ZSAgICAgVmFsdWUgZm91bmQgaW4gVVJMXG5cdFx0XHQgKi9cblx0XHRcdHNldEFjdGl2ZUZpbHRlcjogZnVuY3Rpb24gKCB0YXhvbm9teSwgZGF0YVNldCwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBkYXRhU2V0ID0gdGhpcy5nZXQoZGF0YVNldCk7XG5cdFx0XHRcdHZhciBkYXRhU2V0RmlsdGVycyA9IFtdO1xuXG5cdFx0XHRcdGlmIChpc0FycmF5KGRhdGFTZXQpKSB7XG5cdFx0XHRcdFx0ZGF0YVNldEZpbHRlcnMgPSBkYXRhU2V0LnNsaWNlKCkubWFwKChjdXJyZW50VmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBjdXJyZW50VmFsdWUuZmlsdGVycztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRkYXRhU2V0RmlsdGVycyA9IFtdLmNvbmNhdC5hcHBseShbXSwgZGF0YVNldEZpbHRlcnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFTZXRGaWx0ZXJzID0gZGF0YVNldC5maWx0ZXJzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRmluZCBmaWx0ZXIgb2JqZWN0IGluIGRhdGFzZXRzIGJ5IGZpbHRlcmluZyB0aGUgdmFsdWVzIGJ5IHRoZWlyIElEXG5cdFx0XHRcdHZhciBvYmplY3QgPSBkYXRhU2V0RmlsdGVycy5maWx0ZXIoZnVuY3Rpb24ob2JqZWN0KXtcblx0XHRcdFx0XHRpZiAob2JqZWN0LmlkID09IHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlbMF07XG5cblx0XHRcdFx0dGhpcy5hZGRJdGVtKHRoaXMuZ2V0SXRlbU1vZGVsKHtcblx0XHRcdFx0XHRpZDogdGF4b25vbXkgKyAnXycgKyBvYmplY3QuaWQsXG5cdFx0XHRcdFx0dGF4b25vbXk6IHRheG9ub215LFxuXHRcdFx0XHRcdGxhYmVsOiBvYmplY3QubmFtZSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0LmlkXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWxsb3dzIHVzIHRvIHNldCBwcm94eSBldmVudHMgYW5kIHJ1biBvdGhlciB0YXNrcyB3aGVuIGNvbnRyb2xsZXIgaXMgaW5pdGlhbGl6ZWRcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIHthcnJheX0gIG9wdGlvbnMgIEFycmF5IG9mIG9wdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0b25pbml0OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG5cblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGV4aXN0aW5nIGZpbHRlcnMgb24gbW9kdWxlIGluaXRcblx0XHRcdFx0dmFyIGFjdGl2ZVR5cGUgPSB0aGlzLmdldCgnYWN0aXZlVHlwZScpO1xuXHRcdFx0XHR2YXIgYWN0aXZlQ2F0ZWdvcmllcyA9IHRoaXMuZ2V0KCdhY3RpdmVDYXRlZ29yaWVzJykuc2xpY2UoKTtcblx0XHRcdFx0dmFyIGFjdGl2ZVNlcnZpY2VzID0gdGhpcy5nZXQoJ2FjdGl2ZVNlcnZpY2VzJykuc2xpY2UoKTtcblx0XHRcdFx0dmFyIGFjdGl2ZUNoYXJhY3RlcmlzdGljcyA9IHRoaXMuZ2V0KCdhY3RpdmVDaGFyYWN0ZXJpc3RpY3MnKS5zbGljZSgpO1xuXHRcdFx0XHR2YXIgYWN0aXZlVGFncyA9IHRoaXMuZ2V0KCdhY3RpdmVUYWdzJyk7XG5cblx0XHRcdFx0aWYgKGFjdGl2ZVR5cGUgIT09ICcnKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRBY3RpdmVGaWx0ZXIoJ3R5cGUnLCAncHJvamVjdFR5cGVzJywgYWN0aXZlVHlwZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWN0aXZlQ2F0ZWdvcmllcy5sZW5ndGggIT09IDApIHtcblx0XHRcdFx0XHRhY3RpdmVDYXRlZ29yaWVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWN0aXZlRmlsdGVyKCdjYXRlZ29yaWVzJywgJ3Byb2plY3RDYXRlZ29yaWVzJywgZWxlbWVudCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBOZWVkcyBhIGxpdHRsZSB0aW1lb3V0XG5cdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRhY3RpdmVDYXRlZ29yaWVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHRcdFx0JCgnI2NhdGVnb3JpZXNfJyArIGVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWN0aXZlU2VydmljZXMubGVuZ3RoICE9PSAwKSB7XG5cdFx0XHRcdFx0YWN0aXZlU2VydmljZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRBY3RpdmVGaWx0ZXIoJ3NlcnZpY2VzJywgJ2ZpbHRlckJveGVzJywgZWxlbWVudCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBOZWVkcyBhIGxpdHRsZSB0aW1lb3V0XG5cdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRhY3RpdmVTZXJ2aWNlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdCQoJyNzZXJ2aWNlc18nICsgZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY3RpdmVDaGFyYWN0ZXJpc3RpY3MubGVuZ3RoICE9PSAwKSB7XG5cdFx0XHRcdFx0YWN0aXZlQ2hhcmFjdGVyaXN0aWNzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWN0aXZlRmlsdGVyKCdjaGFyYWN0ZXJpc3RpY3MnLCAnZmlsdGVyQm94ZXMnLCBlbGVtZW50KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIE5lZWRzIGEgbGl0dGxlIHRpbWVvdXRcblx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFjdGl2ZUNoYXJhY3RlcmlzdGljcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdCQoJyNjaGFyYWN0ZXJpc3RpY3NfJyArIGVsZW1lbnQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWN0aXZlVGFncy5sZW5ndGggIT09IDApIHtcblx0XHRcdFx0XHR0aGlzLnNldEFjdGl2ZUZpbHRlcigndGFncycsICdwcm9qZWN0VGFncycsIGFjdGl2ZVRhZ3NbMF0pO1xuXG5cdFx0XHRcdFx0Ly8gTmVlZHMgYSBsaXR0bGUgdGltZW91dFxuXHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JCgnI3RhZ3NfJyArIGFjdGl2ZVRhZ3MuaWQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5vbih7XG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogRGV0ZXJtaW5lIHRoZSBhbW91bnQgb2YgcHJvamVjdHMgcGVyIHByb2plY3RUeXBlXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBAcGFyYW0gIHthcnJheX0gcHJvamVjdHMgQXJyYXkgb2YgcHJvamVjdC5cblx0XHRcdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRyZWZyZXNoUHJvamVjdFR5cGVDb3VudDogZnVuY3Rpb24ocHJvamVjdHMpIHtcblx0XHRcdFx0XHRcdHZhciBjb3VudHNCeVR5cGUgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBpID0gcHJvamVjdHMubGVuZ3RoO1xuXG5cdFx0XHRcdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB0eXBlID0gcHJvamVjdHNbaV0udHlwZTtcblx0XHRcdFx0XHRcdFx0Y291bnRzQnlUeXBlW3R5cGVdID0gKHR5cGVvZiBjb3VudHNCeVR5cGVbdHlwZV0gIT09ICd1bmRlZmluZWQnID8gY291bnRzQnlUeXBlW3R5cGVdICsgMSA6IDEpO1xuXHRcdFx0XHRcdFx0XHRwcm9qZWN0cy5zcGxpY2UoaSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBwcm9qZWN0VHlwZXMgPSB0aGlzLmdldCgncHJvamVjdFR5cGVzJykuZmlsdGVycy5zbGljZSgpO1xuXHRcdFx0XHRcdFx0dmFyIGogPSBwcm9qZWN0VHlwZXMubGVuZ3RoO1xuXG5cdFx0XHRcdFx0XHR3aGlsZSAoai0tKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBjb3VudCA9IGNvdW50c0J5VHlwZVtwcm9qZWN0VHlwZXNbal0uaWRdO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldCgncHJvamVjdFR5cGVzLmZpbHRlcnMuJyArIGogKyAnLmNvdW50JywgKHR5cGVvZiBjb3VudCA9PT0gJ3VuZGVmaW5lZCcpID8gMCA6IGNvdW50KTtcblx0XHRcdFx0XHRcdFx0cHJvamVjdFR5cGVzLnNwbGljZShqKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBFdmVudCB0cmlnZ2VyZWQgYnkgZmlsdGVyIGl0ZW1zIHdoZW4gY2xpY2tpbmcgY2xvc2UgYnV0dG9uXG5cdFx0XHRcdFx0ICogV2UgZmluZCB0aGUgaXRlbSdzIGluZGV4IHVzaW5nIHRoZSBrZXlwYXRoIGFuZCByZW1vdmUgaXQgZnJvbSBhcnJheVxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgZXZlbnQgIFJhY3RpdmUgZXZlbnQgb2JqZWN0XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVtb3ZlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyBDaGVjayBpZiBpdHMgYSBwcm9qZWN0IHR5cGUuXG5cdFx0XHRcdFx0XHQvLyBXZSBuZWVkIHRvIG1hbnVhbGx5IHVuc2V0IHRoZSBhY3RpdmVUeXBlIHZhcmlhYmxlIGFuZCByZW1vdmVzIGl0cyByZWxhdGVkIGNhdGVnb3JpZXNcblx0XHRcdFx0XHRcdGlmIChldmVudC5jb250ZXh0LnRheG9ub215ID09PSAndHlwZScpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXQoJ2FjdGl2ZVR5cGUnLCAnJyk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0KCdhY3RpdmVDYXRlZ29yaWVzJywgW10pO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUl0ZW1zKHRoaXMuZmluZFRheG9ub215SW5kZXhlcygnY2F0ZWdvcmllcycpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBpID0gZXZlbnQua2V5cGF0aC5yZXBsYWNlKCdpdGVtcy4nLCAnJyk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUl0ZW0oaSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hGaWx0ZXJzKCk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdHJlbW92ZUFsbCgpIHtcblx0XHRcdFx0XHRcdHZhciBpID0gdGhpcy5nZXQoJ2l0ZW1zJykubGVuZ3RoO1xuXG5cdFx0XHRcdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlSXRlbShpKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEZpbHRlcnMoKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogRXZlbnQgdHJpZ2dlcmVkIGJ5IGEgY2hhbmdlIG9uIGZpbHRlciBpbnB1dHNcblx0XHRcdFx0XHQgKiBEZXRlcm1pbmUgaWYgaW5wdXQgaXMgYmVpbmcgY2hlY2tlZCBvciBub3Rcblx0XHRcdFx0XHQgKiBBZGQgb3IgcmVtb3ZlIGZpbHRlciBpdGVtIGRlcGVuZGluZyBvbiBjaGVja2VkIHN0YXRlXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBldmVudCAgUmFjdGl2ZSBldmVudCBvYmplY3Rcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0b2dnbGVJdGVtOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRcdFx0dmFyIGlzQ2hlY2tlZCA9IGV2ZW50Lm5vZGUuY2hlY2tlZDtcblx0XHRcdFx0XHRcdHZhciBtb2RlbCA9IHRoaXMuZ2V0SXRlbU1vZGVsRnJvbU5vZGUoIGV2ZW50ICk7XG5cblx0XHRcdFx0XHRcdGlmIChpc0NoZWNrZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hZGRJdGVtKG1vZGVsKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlSXRlbSggdGhpcy5maW5kSW5kZXgoIG1vZGVsLmlkICkgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEZpbHRlcnMoKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogRXZlbnQgdHJpZ2dlcmVkIHdoZW4gdHlwZSBpcyBjaGFuZ2VkXG5cdFx0XHRcdFx0ICogRGV0ZXJtaW5lIHdoaWNoIHR5cGUgb2YgY2F0ZWdvcmllcyB0byBzaG93IGFuZCB0b2dnbGUgdGhlbSBhbGwgb2ZmXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBldmVudCAgUmFjdGl2ZSBldmVudCBvYmplY3Rcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0b2dnbGVUeXBlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRcdFx0dmFyIG1vZGVsID0gdGhpcy5nZXRJdGVtTW9kZWxGcm9tTm9kZSggZXZlbnQgKTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGFjdGl2ZSB0eXBlKHMpIGZyb20gZmlsdGVyc1xuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVJdGVtcyggdGhpcy5maW5kVGF4b25vbXlJbmRleGVzKCBtb2RlbC50YXhvbm9teSApICk7XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBhbGwgdGhlIHJlbGF0ZWQgY2F0ZWdvcmllcyB0b29cblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlSXRlbXMoIHRoaXMuZmluZFRheG9ub215SW5kZXhlcyggJ2NhdGVnb3JpZXMnICkgKTtcblxuXHRcdFx0XHRcdFx0Ly8gTm93IGFkZCB0aGUgdG9nZ2xlZCBvbmVcblx0XHRcdFx0XHRcdHRoaXMuYWRkSXRlbShtb2RlbCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hGaWx0ZXJzKCk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHNlYXJjaCBmb3JtIGlzIHN1Ym1pdHRlZFxuXHRcdFx0XHRcdCAqIEV4dHJhY3QgdGhlIGtleXdvcmQgYW5kIGZpbHRlciB0aGUgcHJvamVjdCBsaXN0XG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBldmVudCAgUmFjdGl2ZSBldmVudCBvYmplY3Rcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRzZWFyY2g6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEZpbHRlcnMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJhY3RpdmU7XG5cdH1cblxuXHRpbml0UHJvamVjdHNDb250cm9sbGVyKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG5cdFx0XHRlbDogdGhpcy5lbGVtZW50cy4kcHJvamVjdHMsXG5cdFx0XHR0ZW1wbGF0ZTogdGhpcy51bmVzY2FwZUhUTUwodGhpcy5lbGVtZW50cy4kcHJvamVjdHMuaHRtbCgpKSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0dmlld1R5cGU6ICdncmlkJyxcblx0XHRcdFx0ZGlzcGxheVByb2plY3RMaXN0OiBmYWxzZSxcblx0XHRcdFx0cHJvamVjdHM6IFtdLFxuXHRcdFx0XHRwYWdlQXJyYXk6IFtdLFxuXHRcdFx0XHRwYWdlOiAxLFxuXHRcdFx0XHRwcm9qZWN0c1BlclBhZ2U6IDI0LFxuXHRcdFx0XHRzdGF0ZTogJ2luZXJ0J1xuXHRcdFx0fSxcblx0XHRcdGNvbXB1dGVkOiB7XG5cdFx0XHRcdGhhc01vcmVQcm9qZWN0czogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldCgncGFnZScpIDwgdGhpcy5tYXhQYWdlcygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwcm9qZWN0Q291bnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb2plY3RzJykubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cGFydGlhbHM6IHtcblx0XHRcdFx0aW1hZ2U6ICc8c3BhbiBjbGFzcz1cIm8tYmFja2dyb3VuZCAtcGFyYWxsYXgtc21hbGwganMtcGFyYWxsYXhcIiBkYXRhLXNwZWVkPVwiLTAuNlwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFtbIGltYWdlIF1dKTtcIj48L3NwYW4+J1xuXHRcdFx0fSxcblx0XHRcdGRlbGltaXRlcnM6IFsnW1snLCAnXV0nXSxcblx0XHRcdHRyaXBsZURlbGltaXRlcnM6IFsnW1tbJywgJ11dXSddLFxuXHRcdFx0dHJhbnNpdGlvbnM6IHsgZmFkZSB9LFxuXG5cblx0XHRcdG1heFBhZ2VzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHByb2plY3RDb3VudCA9IHRoaXMuZ2V0KCdwcm9qZWN0Q291bnQnKTtcblx0XHRcdFx0dmFyIHByb2plY3RzUGVyUGFnZSA9IHRoaXMuZ2V0KCdwcm9qZWN0c1BlclBhZ2UnKTtcblx0XHRcdFx0dmFyIHJlbWFpbmRlciA9IChwcm9qZWN0Q291bnQgJSBwcm9qZWN0c1BlclBhZ2UpO1xuXHRcdFx0XHRyZXR1cm4gKHByb2plY3RDb3VudCAtIHJlbWFpbmRlcikgLyBwcm9qZWN0c1BlclBhZ2UgKyAocmVtYWluZGVyICE9PSAwID8gMSA6IDApO1xuXHRcdFx0fSxcblxuXHRcdFx0dXBkYXRlUGFnZUFycmF5OiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBwYWdlQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgcHJvamVjdHMgPSB0aGlzLmdldCgncHJvamVjdHMnKTtcblx0XHRcdFx0XHR2YXIgcHJvamVjdHNQZXJQYWdlID0gdGhpcy5nZXQoJ3Byb2plY3RzUGVyUGFnZScpO1xuXHRcdFx0XHRcdHZhciBwYWdlQXJyYXkgPSBbXTtcblx0XHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdFx0dmFyIGxlbiA9IHRoaXMuZ2V0KCdwYWdlJyk7XG5cdFx0XHRcdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdFx0bGV0IG1pbiA9IHByb2plY3RzUGVyUGFnZSAqIGk7XG5cdFx0XHRcdFx0XHRsZXQgbWF4ID0gKHByb2plY3RzUGVyUGFnZSAqIGkpICsgcHJvamVjdHNQZXJQYWdlO1xuXHRcdFx0XHRcdFx0bGV0IHBhZ2UgPSBwcm9qZWN0cy5zbGljZShtaW4sIG1heCk7XG5cdFx0XHRcdFx0XHRwYWdlQXJyYXlbaV0gPSB7XG5cdFx0XHRcdFx0XHRcdHByb2plY3RzOiBwYWdlLFxuXHRcdFx0XHRcdFx0XHRwcm9qZWN0c0xvYWRpbmc6IChpID09PSBsZW4gLSAxKVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5zZXQoJ3BhZ2VBcnJheScsIHBhZ2VBcnJheSlcblx0XHRcdFx0XHQvLyByZXR1cm4gcGFnZUFycmF5O1xuXHRcdFx0XHQvLyB9LFxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBbGxvd3MgdXMgdG8gc2V0IHByb3h5IGV2ZW50cyBhbmQgcnVuIG90aGVyIHRhc2tzIHdoZW4gY29udHJvbGxlciBpcyBpbml0aWFsaXplZFxuXHRcdFx0ICovXG5cdFx0XHRvbmluaXQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIF90aGlzLiRkb2N1bWVudC50cmlnZ2VyKCdwYXJhbGxheC51cGRhdGUnKTtcblxuXHRcdFx0XHQvLyBQcm94eSBldmVudCBoYW5kbGVyc1xuXHRcdFx0XHR0aGlzLm9uKHtcblx0XHRcdFx0XHRsb2FkTmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dGhpcy5hZGQoJ3BhZ2UnKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVBhZ2VBcnJheSgpO1xuXG5cdFx0XHRcdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbGluZy5yZWJ1aWxkJyk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHBhZ2VzID0gdGhpcy5nZXQoJ3BhZ2VBcnJheScpLnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0KCdwYWdlQXJyYXkuJyArIChwYWdlcy5sZW5ndGggLSAxKSArICcucHJvamVjdHNMb2FkaW5nJywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZWZyZXNoUHJvamVjdHM6IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldCgnc3RhdGUnLCdsb2FkaW5nJyk7XG5cdFx0XHRcdFx0XHRfdGhpcy5pbnZva2VGaWx0ZXJlZEl0ZW1zKGRhdGEsIChwcm9qZWN0cykgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldCgnZGlzcGxheVByb2plY3RMaXN0JywgZmFsc2UpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0KCdwYWdlJywgMSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXQoJ3Byb2plY3RzJywgcHJvamVjdHMpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGVQYWdlQXJyYXkoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMuZmlsdGVyc0NvbnRyb2xsZXIuZmlyZSgncmVmcmVzaFByb2plY3RUeXBlQ291bnQnLCBwcm9qZWN0cy5zbGljZSgpKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmZpcnN0Qmxvb2QgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFuaW1hdGVUbygkKCcuanMtcHJvamVjdHMnKSk7IC8vIEBzaGFtZVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZURlcGVuZGVuY3koX3RoaXMuc21vb3RoU2Nyb2xsaW5nRGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzLmVsZW1lbnRzLiR0b3RhbC50ZXh0KHByb2plY3RzLmxlbmd0aClcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXQoJ3N0YXRlJywgJ2luZXJ0JykudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0KCdkaXNwbGF5UHJvamVjdExpc3QnLCB0cnVlKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBwYWdlcyA9IHRoaXMuZ2V0KCdwYWdlQXJyYXknKS5zbGljZSgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXQoJ3BhZ2VBcnJheS4nICsgKHBhZ2VzLmxlbmd0aCAtIDEpICsgJy5wcm9qZWN0c0xvYWRpbmcnLCBmYWxzZSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuZmlyc3RCbG9vZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdTbW9vdGhTY3JvbGxpbmcucmVidWlsZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdTbW9vdGhTY3JvbGxpbmcucmVidWlsZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCAzMDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJhY3RpdmU7XG5cdH1cblxuXHQvKipcblx0ICogUXVlcnkgc2VydmVyIGZvciBpdGVtcyBhbmQgc2VuZCB0aGVtIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcGFyYW0gIHthcnJheX0gICAgIGRhdGEgICAgICBPYmplY3QgZm9ybWVkIGJ5IGEga2V5d29yZCBhbmQgYSBsaXN0IG9mIGZpbHRlcnMgdG8gcXVlcnkgREIgd2l0aFxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIGNhbGxiYWNrICBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIHRoZSBBSkFYIHJlcXVlc3QgaXMgZG9uZVxuXHQgKi9cblx0aW52b2tlRmlsdGVyZWRJdGVtcyAoZGF0YSwgY2FsbGJhY2spIHtcblx0XHR2YXIgcmVzdWx0cyA9IFtdO1xuXHRcdHZhciBqcXhociA9ICQuYWpheCh7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0dXJsOiAncHJvamVjdC9saXN0Jyxcblx0XHRcdGRhdGE6IGRhdGFcblx0XHR9KVxuXHRcdC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRyZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cztcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5mYWlsKGZ1bmN0aW9uKCl7fSlcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2socmVzdWx0cyk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZXN0cm95ICgpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMuc2Nyb2xsYmFyVGFncyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuc2Nyb2xsYmFyVGFncy5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLnNjcm9sbGJhckZpbHRlcnMuZGVzdHJveSgpO1xuXHRcdH1cblx0XHR0aGlzLmZpbHRlcnNDb250cm9sbGVyLnRlYXJkb3duKCk7XG5cdFx0dGhpcy5wcm9qZWN0c0NvbnRyb2xsZXIudGVhcmRvd24oKTtcblx0XHR0aGlzLiRlbC5vZmYoJy5GaWx0ZXJzJyk7XG5cdH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBHZW5lcmljIG1vZHVsZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gRGVzdHJveVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy4kZWwub2ZmKCk7XG4gICAgfVxufVxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFNsaWRlciBwYWdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuY3VycmVudFNsaWRlID0gMTtcblx0XHR0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cdFx0dGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IDEyMDA7XG5cdFx0dGhpcy5tYXhTbGlkZSA9IHRoaXMuJGVsLmZpbmQoJCgnLmpzLXNsaWRlci1ob21lLXNsaWRlJykpLmxlbmd0aDtcblx0XHR0aGlzLiRjb250cm9scyA9IHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1idXR0b24nKTtcblxuXHRcdHRoaXMuJGVsLm9uKCdjbGljaycsICcuanMtc2xpZGVyLWhvbWUtbmV4dCcsIChldmVudCkgPT4gdGhpcy5uZXh0U2xpZGUoKSk7XG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrJywgJy5qcy1zbGlkZXItaG9tZS1wcmV2JywgKGV2ZW50KSA9PiB0aGlzLnByZXZTbGlkZSgpKTtcblx0fVxuXG5cdC8vIE5leHQgc2xpZGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0bmV4dFNsaWRlKCkge1xuXHRcdHRoaXMucHJldmVudENsaWNrKCk7XG5cblx0XHRpZiAodGhpcy5jdXJyZW50U2xpZGUgPT09IHRoaXMubWF4U2xpZGUpIHtcblx0XHRcdHRoaXMuY3VycmVudFNsaWRlID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnRTbGlkZSsrO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZS5pcy1wcmV2JykucmVtb3ZlQ2xhc3MoJ2lzLXByZXYnKS5hZGRDbGFzcygnaXMtbmV4dCcpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZS5pcy1jdXJyZW50JykucmVtb3ZlQ2xhc3MoJ2lzLWN1cnJlbnQnKS5hZGRDbGFzcygnaXMtcHJldicpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZVtkYXRhLXNsaWRlPVwiJyt0aGlzLmN1cnJlbnRTbGlkZSsnXCJdJykucmVtb3ZlQ2xhc3MoJ2lzLW5leHQnKS5hZGRDbGFzcygnaXMtY3VycmVudCcpO1xuXHR9XG5cblx0Ly8gUHJldiBzbGlkZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRwcmV2U2xpZGUoKSB7XG5cdFx0dGhpcy5wcmV2ZW50Q2xpY2soKTtcblxuXHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSA9PT0gMSkge1xuXHRcdFx0dGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLm1heFNsaWRlICsgMTtcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnRTbGlkZS0tO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZS5pcy1uZXh0JykucmVtb3ZlQ2xhc3MoJ2lzLW5leHQnKS5hZGRDbGFzcygnaXMtcHJldicpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZS5pcy1jdXJyZW50JykucmVtb3ZlQ2xhc3MoJ2lzLWN1cnJlbnQnKS5hZGRDbGFzcygnaXMtbmV4dCcpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1zbGlkZVtkYXRhLXNsaWRlPVwiJyt0aGlzLmN1cnJlbnRTbGlkZSsnXCJdJykucmVtb3ZlQ2xhc3MoJ2lzLXByZXYnKS5hZGRDbGFzcygnaXMtY3VycmVudCcpO1xuXHR9XG5cblx0Ly8gUHJldmVudCBjbGlja1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRwcmV2ZW50Q2xpY2soKSB7XG5cdFx0dGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cdFx0dGhpcy4kY29udHJvbHMucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXHRcdFx0dGhpcy4kY29udHJvbHMucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbik7XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCk7XG5cdH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBHZW5lcmljIG1vZHVsZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLiRlbC5vbignY2xpY2snLCAnLmpzLWxpZ2h0Ym94LXZpZGVvLW9wZW4nLCAoZXZlbnQpID0+IHRoaXMub3BlbkxpZ2h0Ym94KGV2ZW50KSk7XG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrJywgJy5qcy1saWdodGJveC12aWRlby1jbG9zZScsICgpID0+IHRoaXMuY2xvc2VMaWdodGJveCgpKTtcblx0fVxuXG5cdC8vIE9wZW5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0b3BlbkxpZ2h0Ym94KGV2ZW50KSB7XG5cdFx0bGV0IGRhdGFWaWRlbyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgndmlkZW8nKTtcblx0XHR0aGlzLiRib2R5LmFkZENsYXNzKCdoYXMtbGlnaHRib3gtdmlkZW8tb3BlbicpO1xuXHRcdCQoJy5qcy1saWdodGJveC12aWRlby1jb250ZW50JykuaHRtbChkYXRhVmlkZW8pO1xuXHR9XG5cblx0Ly8gQ2xvc2Vcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Y2xvc2VMaWdodGJveCgpIHtcblx0XHR0aGlzLiRib2R5LnJlbW92ZUNsYXNzKCdoYXMtbGlnaHRib3gtdmlkZW8tb3BlbicpO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHQkKCcuanMtbGlnaHRib3gtdmlkZW8tY29udGVudCcpLmh0bWwoXCJcIik7XG5cdFx0fSwgNjAwKTtcblx0fVxuXG5cdC8vIERlc3Ryb3lcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoKTtcblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnXG5pbXBvcnQgTWFwIGZyb20gJy4vTWFwJ1xuaW1wb3J0IHRhcCBmcm9tICdyYWN0aXZlLWV2ZW50cy10YXAnO1xuaW1wb3J0IGZhZGUgZnJvbSAncmFjdGl2ZS10cmFuc2l0aW9ucy1mYWRlJztcbmltcG9ydCB7IGFkZERlcGVuZGVuY3ksIHJlc29sdmVEZXBlbmRlbmN5IH0gZnJvbSAnLi4vZ2xvYmFsL2RlcGVuZGVuY2llcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWJzdHJhY3RNb2R1bGUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5zbW9vdGhTY3JvbGxpbmdEZXBlbmRlbmN5ID0gYWRkRGVwZW5kZW5jeSgnTG9jYXRpb25Td2l0Y2hlcicsICdTbW9vdGhTY3JvbGxpbmcnKTtcblxuXHRcdHRoaXMuJG1hcENvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5qcy1tYXAtY29udGFpbmVyJyk7XG5cdFx0dGhpcy4kc3dpdGNoZXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuanMtc3dpdGNoZXItY29udGFpbmVyJyk7XG5cdFx0dGhpcy5pZFByZWZpeCA9ICdsb2NhdGlvbl8nO1xuXHRcdHRoaXMuaWNvbiA9IHRoaXMuJG1hcENvbnRhaW5lci5kYXRhKCdpY29uJyk7XG5cdFx0dGhpcy5wbGFjZXMgPSB0aGlzLnByZXBhcmVMb2NhdGlvbnMod2luZG93LmxvY2F0aW9uc09wdGlvbnMubG9jYXRpb25zKTtcblxuXHRcdHRoaXMubG9jYXRpb25Db250cm9sbGVyID0gdGhpcy5pbml0TG9jYXRpb25Db250cm9sbGVyKCk7XG5cdFx0d2luZG93LlJhY3RpdmUuREVCVUcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIGNvbnRyb2xsZXIgaXMgdXNlZCBmb3Igc3dpdGNoaW5nIGJldHdlZW4gYWN0aXZlIGxvY2F0aW9uc1xuXHQgKiBAcmV0dXJuICB7UmFjdGl2ZSBPYmplY3R9ICBSYWN0aXZlIGluc3RhbmNlXG5cdCAqL1xuXHRpbml0TG9jYXRpb25Db250cm9sbGVyKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG5cdFx0XHRlbDogdGhpcy4kc3dpdGNoZXJDb250YWluZXIsXG5cdFx0XHR0ZW1wbGF0ZTogdGhpcy51bmVzY2FwZUhUTUwodGhpcy4kc3dpdGNoZXJDb250YWluZXIuaHRtbCgpKSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0bG9jYXRpb25zOiB3aW5kb3cubG9jYXRpb25zT3B0aW9ucy5sb2NhdGlvbnMsXG5cdFx0XHRcdGFjdGl2ZUxvY2F0aW9uOiB7fSxcblx0XHRcdFx0ZGlzcGxheUFjdGl2ZUxvY2F0aW9uOiB0cnVlLFxuXHRcdFx0XHRpc0FjdGl2ZTogZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbS5pZCA9PT0gdGhpcy5nZXQoJ2FjdGl2ZUxvY2F0aW9uJykuaWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRldmVudHM6IHsgdGFwIH0sXG5cdFx0XHR0cmFuc2l0aW9uczogeyBmYWRlIH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIEFsbG93cyB1cyB0byBzZXQgcHJveHkgZXZlbnRzIGFuZCBydW4gb3RoZXIgdGFza3Mgd2hlbiBjb250cm9sbGVyIGlzIGluaXRpYWxpemVkXG5cdFx0XHQgKiBAcGFyYW0gIHthcnJheX0gIG9wdGlvbnMgIEFycmF5IG9mIG9wdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0b25pbml0IDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXHRcdFx0XHQvLyBTZXQgYWN0aXZlIGxvY2F0aW9uIGFzIGZpcnN0IG9mIGxvY2F0aW9ucyBzZXRcblx0XHRcdFx0dGhpcy5zZXQoJ2FjdGl2ZUxvY2F0aW9uJywgdGhpcy5nZXQoJ2xvY2F0aW9ucy4wJykpO1xuXG5cdFx0XHRcdC8vIEluaXQgbWFwIGFuZCBzZXQgZmlyc3QgbG9jYXRpb24gYXMgXCJhY3RpdmVcIlxuXHRcdFx0XHRfdGhpcy5tYXAgPSBuZXcgTWFwKHtcblx0XHRcdFx0XHQkY29udGFpbmVyOiBfdGhpcy4kbWFwQ29udGFpbmVyLFxuXHRcdFx0XHRcdG1hcE9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHBsYWNlczogX3RoaXMucGxhY2VzXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjb250cm9sbGVyUmVhZHlDYWxsYmFjazogZnVuY3Rpb24obWFwKSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlRGVwZW5kZW5jeShfdGhpcy5zbW9vdGhTY3JvbGxpbmdEZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdHJhY3RpdmUuZGlzcGxheUFjdGl2ZUxvY2F0aW9uKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLm9uKHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBXaGVuIHdlIHRvZ2dsZSBhIGxvY2F0aW9uLCB3ZSBzZXQgdGhlIGFjdGl2ZSBldmVudFxuXHRcdFx0XHRcdCAqIGFuZCBjaGFuZ2UgdGhlIG1hcFxuXHRcdFx0XHRcdCAqIEBwYXJhbSAge29iamVjdH0gIGV2ZW50ICBSYWN0aXZlIGV2ZW50IG9iamVjdFxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRvZ2dsZUxvY2F0aW9uOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXQoJ2Rpc3BsYXlBY3RpdmVMb2NhdGlvbicsIGZhbHNlKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyYWN0aXZlLnNldCgnYWN0aXZlTG9jYXRpb24nLCByYWN0aXZlLmdldChldmVudC5rZXlwYXRoKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRyYWN0aXZlLnNldCgnZGlzcGxheUFjdGl2ZUxvY2F0aW9uJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cmFjdGl2ZS5kaXNwbGF5QWN0aXZlTG9jYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogVXBkYXRlcyB0aGUgR29vZ2xlIE1hcCBieSBzaG93aW5nIG9ubHkgdGhlIGFjdGl2ZSBsb2NhdGlvblxuXHRcdFx0ICovXG5cdFx0XHRkaXNwbGF5QWN0aXZlTG9jYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaWRlbnQgPSBfdGhpcy5pZFByZWZpeCArIHRoaXMuZ2V0KCdhY3RpdmVMb2NhdGlvbicpLmlkO1xuXHRcdFx0XHR2YXIgcGxhY2UgPSBfdGhpcy5tYXAuY29udHJvbGxlci5nZXRfcGxhY2UoaWRlbnQpO1xuXG5cdFx0XHRcdF90aGlzLm1hcC5jb250cm9sbGVyLmZpbHRlcihpZGVudCk7XG5cdFx0XHRcdF90aGlzLm1hcC5jb250cm9sbGVyLnNldF96b29tKDEwKTtcblx0XHRcdFx0X3RoaXMubWFwLmNvbnRyb2xsZXIubWFwKCkuc2V0Q2VudGVyKHBsYWNlLm9iamVjdCgpLmdldFBvc2l0aW9uKCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJhY3RpdmU7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBvdXIgTG9jYXRpb24gbW9kZWxzIHRvIEJCIE1hcCBvYmplY3RzXG5cdCAqIEByZXR1cm4ge2FycmF5fVxuXHQgKi9cblx0cHJlcGFyZUxvY2F0aW9ucyhsb2NhdGlvbnMpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIGxlbiA9IGxvY2F0aW9ucy5sZW5ndGg7XG5cdFx0dmFyIHByZXBwZWRMb2NhdGlvbnMgPSB7fTtcblxuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGxldCBpZCA9IHRoaXMuaWRQcmVmaXggKyBsb2NhdGlvbnNbaV0uaWQ7XG5cdFx0XHRwcmVwcGVkTG9jYXRpb25zW2lkXSA9IHtcblx0XHRcdFx0dHlwZSA6ICdtYXJrZXInLFxuXHRcdFx0XHRjYXRlZ29yaWVzOiBbaWRdLFxuXHRcdFx0XHRpY29uOiB7XG5cdFx0XHRcdFx0c3JjOiB0aGlzLmljb24sXG5cdFx0XHRcdFx0aGVpZ2h0OiA0MCxcblx0XHRcdFx0XHR3aWR0aDogMzNcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29vcmRzIDogW1xuXHRcdFx0XHRcdGxvY2F0aW9uc1tpXS5sYXQsXG5cdFx0XHRcdFx0bG9jYXRpb25zW2ldLmxvblxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiBwcmVwcGVkTG9jYXRpb25zO1xuXHR9XG5cblx0Ly8gRGVzdHJveVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMubG9jYXRpb25Db250cm9sbGVyLnRlYXJkb3duKCk7XG5cdFx0dGhpcy4kZWwub2ZmKCcuTG9jYXRpb25Td2l0Y2hlcicpO1xuXHR9XG59XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5jbGFzcyBNYXAge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRyb2xsZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLiRjb250YWluZXIgPSBvcHRpb25zLiRjb250YWluZXI7XG5cblx0XHRcdHZhciBtYXBPcHRpb25zID0gICh0eXBlb2Yob3B0aW9ucy5tYXBPcHRpb25zKSAhPT0gJ3VuZGVmaW5lZCcpID8gb3B0aW9ucy5tYXBPcHRpb25zIDoge307XG5cdFx0XHR2YXIgY29udHJvbGxlclJlYWR5Q2FsbGJhY2sgPSAodHlwZW9mKG9wdGlvbnMuY29udHJvbGxlclJlYWR5Q2FsbGJhY2spICE9PSAndW5kZWZpbmVkJykgPyBvcHRpb25zLmNvbnRyb2xsZXJSZWFkeUNhbGxiYWNrIDogZnVuY3Rpb24oKXt9O1xuXG5cdFx0XHR0aGlzLiRjb250YWluZXIub24oJ2NvbnRyb2xsZXJSZWFkeS5NYXAnLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnRyb2xsZXJSZWFkeUNhbGxiYWNrKHRoaXMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIElmIGdvb2dsZSBpcyB1bmRlZmluZWRcblx0XHRcdGlmICghd2luZG93Lmdvb2dsZSB8fCAhd2luZG93Lmdvb2dsZS5tYXBzKSB7XG5cdFx0XHRcdHdpbmRvdy5fdG1wX2dvb2dsZV9vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5TWFwKG1hcE9wdGlvbnMpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCQuZ2V0U2NyaXB0KFxuXHRcdFx0XHRcdCdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/c2Vuc29yPXRydWUmdj0zJyArXG5cdFx0XHRcdFx0JyZsYW5ndWFnZT1mciZjYWxsYmFjaz1fdG1wX2dvb2dsZV9vbmxvYWQma2V5PUFJemFTeUNSTC1saFBYbTVTTTZjQzdZMGpka2pDZkFwVThYdXIzWScsXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge31cblx0XHRcdFx0KTtcblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlNYXAobWFwT3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSwgMTcwMCk7XG5cdH1cblxuXHRkaXNwbGF5TWFwKG1hcE9wdGlvbnMpIHtcblx0XHRpZiAoIXRoaXMuJGNvbnRhaW5lci5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR2YXIgaWNvbiA9IHRoaXMuJGNvbnRhaW5lci5kYXRhKCdpY29uJyk7XG5cdFx0dmFyIGFkZHJlc3MgPSB0aGlzLiRjb250YWluZXIuZGF0YSgnYWRkcmVzcycpO1xuXHRcdHZhciBzY3JvbGx3aGVlbCA9ICh0eXBlb2YodGhpcy4kY29udGFpbmVyLmRhdGEoJ3Njcm9sbHdoZWVsJykpICE9PSAndW5kZWZpbmVkJykgPyB0cnVlIDogZmFsc2U7XG5cdFx0dmFyIHBsYWNlcyA9ICh0eXBlb2YobWFwT3B0aW9ucy5wbGFjZXMpICE9PSAndW5kZWZpbmVkJykgPyBtYXBPcHRpb25zLnBsYWNlcyA6IHt9O1xuXG5cdFx0Ly8gRGVmYXVsdCBvcHRpb25zLlxuXHRcdC8vIE1hcCBjZW50ZXIgY2hhbmdlcyBhZnRlciB0aGUgbWFya2VyIGlzIGFkZGVkXG5cdFx0dmFyIGNvbnRyb2xsZXJPcHRpb25zID0ge1xuXHRcdFx0bWFwOiB7XG5cdFx0XHRcdGNlbnRlcjoge1xuXHRcdFx0XHRcdHg6IDQ1LjM3MTI5MjMsXG5cdFx0XHRcdFx0eTogLTczLjk4MjA5OTRcblx0XHRcdFx0fSxcblx0XHRcdFx0em9vbTogMyxcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IHNjcm9sbHdoZWVsLFxuXHRcdFx0XHRtYXBUeXBlOiAncm9hZG1hcCcsXG5cdFx0XHRcdGNvb3Jkc1R5cGU6ICdpbnBhZ2UnLCAvLyBhcnJheSwganNvbj8gKHZzIHVsIGxpKVxuXHRcdFx0XHRtYXBfbW9kZTogJ2RlZmF1bHQnLFxuXHRcdFx0XHQvL2Rpc2FibGVEZWZhdWx0VUk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRwbGFjZXM6IHBsYWNlcyxcblx0XHRcdG1heF9maXRib3VuZHNfem9vbTogMTRcblx0XHR9O1xuXG5cdFx0dGhpcy5jb250cm9sbGVyID0gbmV3IEJCLmdtYXAuY29udHJvbGxlcih0aGlzLiRjb250YWluZXIuZ2V0KDApLCBjb250cm9sbGVyT3B0aW9ucyk7XG5cblx0XHR0aGlzLmNvbnRyb2xsZXIuaW5pdCgpO1xuXG5cdFx0dGhpcy5jb250cm9sbGVyLnNldF9zdHlsZXMoW3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIi01XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCItMTBcIn0se1wic2F0dXJhdGlvblwiOlwiLTEwMFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHNcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9LHtcImxpZ2h0bmVzc1wiOlwiMFwifSx7XCJnYW1tYVwiOlwiMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImxpZ2h0bmVzc1wiOlwiMFwifSx7XCJnYW1tYVwiOlwiMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiaHVlXCI6XCIjZDcwMGZmXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJodWVcIjpcIiNmZjAwMDBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9LHtcInNhdHVyYXRpb25cIjpcIjBcIn0se1wibGlnaHRuZXNzXCI6XCIwXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCI1MFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIjI1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcIndlaWdodFwiOlwiMVwifSx7XCJsaWdodG5lc3NcIjpcIjBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIjI1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLmxvY2FsaXR5XCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHRcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCIzMFwifSx7XCJnYW1tYVwiOlwiMS4wMFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZS5uZWlnaGJvcmhvb2RcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIjUzXCJ9LHtcImdhbW1hXCI6XCIxLjAwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLm5laWdoYm9yaG9vZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCItMjBcIn0se1wiZ2FtbWFcIjpcIjEuMDBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOlwiMzBcIn0se1wiZ2FtbWFcIjpcIjFcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCItMTBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIi00MFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCIxOFwifSx7XCJzYXR1cmF0aW9uXCI6XCItMTAwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOlwiLTMwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn0se1wibGlnaHRuZXNzXCI6XCI1MFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifSx7XCJsaWdodG5lc3NcIjpcIjBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJ3ZWlnaHRcIjpcIjFcIn0se1wic2F0dXJhdGlvblwiOlwiMFwifSx7XCJsaWdodG5lc3NcIjpcIjgzXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCIwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOlwiODBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOlwiMFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjpcIjgwXCJ9LHtcImdhbW1hXCI6XCIxXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOlwiMFwifSx7XCJsaWdodG5lc3NcIjpcIi0xNVwifSx7XCJ3ZWlnaHRcIjpcIi4yNVwifSx7XCJnYW1tYVwiOlwiMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHRcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6XCIwXCJ9LHtcImdhbW1hXCI6XCIxLjAwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZjMWQ5XCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJzYXR1cmF0aW9uXCI6XCItMTAwXCJ9LHtcImxpZ2h0bmVzc1wiOlwiLTVcIn0se1wiZ2FtbWFcIjpcIjAuNVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcIndlaWdodFwiOlwiLjc1XCJ9LHtcInZpc2liaWxpdHlcIjpcIm9mZlwifV19XSk7XG5cblx0XHRpZiAoYWRkcmVzcyAhPT0gJycpIHtcblx0XHRcdHRoaXMuY29udHJvbGxlci5hZGRfcGxhY2VfYnlfYWRkcmVzcygncGxhY2UnLCBhZGRyZXNzLCB7XG5cdFx0XHRcdHR5cGU6ICdtYXJrZXInLFxuXHRcdFx0XHRpY29uOiB7XG5cdFx0XHRcdFx0c3JjOiBpY29uLFxuXHRcdFx0XHRcdGhlaWdodDogODQsXG5cdFx0XHRcdFx0d2lkdGg6IDYwXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxvYWRlZF9jYWxsYmFjazogKG8pID0+IHtcblx0XHRcdFx0XHR0aGlzLmNvbnRyb2xsZXIuZml0X2JvdW5kcygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRyb2xsZXIucmVhZHkoKCkgPT4ge1xuXHRcdFx0dGhpcy4kY29udGFpbmVyLnRyaWdnZXIoJ2NvbnRyb2xsZXJSZWFkeS5NYXAnKTtcblx0XHR9KTtcblx0fVxuXG5cblx0Ly8gRGVzdHJveVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuJGNvbnRhaW5lci5vZmYoJy5NYXAnKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gR2VuZXJpYyBtb2R1bGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSc7XG5pbXBvcnQgU2Nyb2xsYmFyIGZyb20gJ3Ntb290aC1zY3JvbGxiYXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdCQoJy5qcy1uYXYtdG9nZ2xlJykuY2xpY2soKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZU5hdigpKTtcblxuXHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1uYXYtc2VhcmNoJykuY2xpY2soKGV2ZW50KSA9PiB7fSk7XG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrJywgJy5qcy1zZWFyY2gtYnV0dG9uJywgKGV2ZW50KSA9PiB0aGlzLm9wZW5TZWFyY2goZXZlbnQpKTtcblxuXHRcdGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuXHRcdFx0dGhpcy5zY3JvbGxiYXIgPSBTY3JvbGxiYXIuaW5pdCh0aGlzLiRlbC5maW5kKCdbZGF0YS1zY3JvbGxiYXJdJylbMF0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIE9wZW4gc2VhcmNoXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdG9wZW5TZWFyY2goZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dGhpcy4kYm9keS50b2dnbGVDbGFzcygnaGFzLXNlYXJjaC1vcGVuJyk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS5mb2N1cygpO1xuXHRcdH0sIDMwMCk7XG5cdH1cblxuXHQvLyBUb2dnbGUgbmF2XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHRvZ2dsZU5hdigpIHtcblx0XHRpZiAodGhpcy4kYm9keS5oYXNDbGFzcygnaGFzLW5hdi1vcGVuJykpIHtcblx0XHRcdHRoaXMuJGJvZHkucmVtb3ZlQ2xhc3MoJ2hhcy1uYXYtb3BlbicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiRlbC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcblx0XHRcdHRoaXMuJGVsLmZpbmQoJy5qcy1zZWFyY2gtcmVzdWx0cycpLmh0bWwoJycpO1xuXHRcdFx0dGhpcy4kYm9keS5yZW1vdmVDbGFzcygnaGFzLXNlYXJjaC1vcGVuJykuYWRkQ2xhc3MoJ2hhcy1uYXYtb3BlbicpO1xuXHRcdH1cblx0fVxuXG5cdC8vIERlc3Ryb3lcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoKTtcblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWJzdHJhY3RNb2R1bGUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLiRlbC5vbignY2xpY2snLCAnLmpzLW5hdi1uZXdzLXRvZ2dsZScsIChldmVudCkgPT4gdGhpcy50b2dnbGVOYXZOZXdzKCkpO1xuXHR9XG5cblx0dG9nZ2xlTmF2TmV3cygpIHtcblx0XHR0aGlzLiRib2R5LnRvZ2dsZUNsYXNzKCdoYXMtbmF2LW5ld3Mtb3BlbicpO1xuXG5cdFx0aWYgKHRoaXMuJGJvZHkuaGFzQ2xhc3MoJ2hhcy1uYXYtbmV3cy1vcGVuJykpIHtcblx0XHRcdCQoJy5qcy1uZXdzLW5hdicpLnNjcm9sbFRvcCgwKTtcblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuJGVsLm9mZigpO1xuXHR9XG59XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSdcbmltcG9ydCB0YXAgZnJvbSAncmFjdGl2ZS1ldmVudHMtdGFwJztcbmltcG9ydCBmYWRlIGZyb20gJ3JhY3RpdmUtdHJhbnNpdGlvbnMtZmFkZSc7XG5pbXBvcnQgU2Nyb2xsYmFyIGZyb20gJ3Ntb290aC1zY3JvbGxiYXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtcblx0XHRcdCRuZXdzTGlzdDogdGhpcy4kZWwuZmluZCgnLmpzLW5ld3MtbGlzdCcpXG5cdFx0fTtcblxuXHRcdHRoaXMubmV3c0xpc3RDb250cm9sbGVyID0gdGhpcy5pbml0TmV3c0xpc3RDb250cm9sbGVyKCk7XG5cblx0XHR0aGlzLiRlbC5vbignY2xpY2suTmV3cycsICcuanMtbmV3cy10b2dnbGUnLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMudG9nZ2xlTmF2TmV3cygpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG5cdFx0XHR0aGlzLnNjcm9sbGJhciA9IFNjcm9sbGJhci5pbml0KHRoaXMuJGVsWzBdKTtcblx0XHR9XG5cdFx0d2luZG93LlJhY3RpdmUuREVCVUcgPSBmYWxzZTtcblx0fVxuXG5cdHRvZ2dsZU5hdk5ld3MoKSB7XG5cdFx0dGhpcy4kYm9keS50b2dnbGVDbGFzcygnaGFzLW5hdi1uZXdzLW9wZW4nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIGNvbnRyb2xsZXIgaXMgdXNlZCBmb3IgbG9hZGluZyBtb3JlIG5ld3Ncblx0ICpcblx0ICogQHJldHVybiAge1JhY3RpdmUgT2JqZWN0fSAgUmFjdGl2ZSBpbnN0YW5jZVxuXHQgKi9cblx0aW5pdE5ld3NMaXN0Q29udHJvbGxlcigpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuXHRcdFx0ZWw6IHRoaXMuZWxlbWVudHMuJG5ld3NMaXN0LFxuXHRcdFx0dGVtcGxhdGU6IHRoaXMudW5lc2NhcGVIVE1MKHRoaXMuZWxlbWVudHMuJG5ld3NMaXN0Lmh0bWwoKSksXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdG5ld3M6IHdpbmRvdy5uZXdzT3B0aW9ucy5uZXdzLFxuXHRcdFx0XHRwYWdlOiB3aW5kb3cubmV3c09wdGlvbnMucGFnZSxcblx0XHRcdFx0bmV4dFBhZ2U6IHdpbmRvdy5uZXdzT3B0aW9ucy5uZXh0UGFnZSxcblx0XHRcdFx0c3RhdGU6IHdpbmRvdy5uZXdzT3B0aW9ucy5zdGF0ZVxuXHRcdFx0fSxcblx0XHRcdGV2ZW50czogeyB0YXAgfSxcblx0XHRcdHRyYW5zaXRpb25zOiB7IGZhZGUgfSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBbGxvd3MgdXMgdG8gc2V0IHByb3h5IGV2ZW50cyBhbmQgcnVuIG90aGVyIHRhc2tzIHdoZW4gY29udHJvbGxlciBpcyBpbml0aWFsaXplZFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAge2FycmF5fSAgb3B0aW9ucyAgQXJyYXkgb2Ygb3B0aW9uc1xuXHRcdFx0ICovXG5cdFx0XHRvbmluaXQgOiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHZhciBfcmFjdGl2ZSA9IHRoaXM7XG5cdFx0XHRcdHRoaXMub24oe1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogV2hlbiBsb2FkIG1vcmUgaXMgY2xpY2tlZCwgd2UgZmV0Y2ggbW9yZSBuZXdzXG5cdFx0XHRcdFx0ICogSWYgbmV4dFBhZ2UgaXMgZmFsc2UsIHRoZSBidXR0b24gd2lsbCBkaXNhcGVhclxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgZXZlbnQgIFJhY3RpdmUgZXZlbnQgb2JqZWN0XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0IGxvYWRNb3JlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRcdFx0dmFyIHBhcmFtZXRlcnMgPSB7XG5cdFx0XHRcdFx0XHRcdHBhZ2U6IHRoaXMuZ2V0KCdwYWdlJylcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdHRoaXMuc2V0KCdzdGF0ZScsJ2xvYWRpbmcnKTtcblxuXHRcdFx0XHRcdFx0X3RoaXMuaW52b2tlTG9hZE5ld3MocGFyYW1ldGVycywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdFx0Ly8gR2l2ZSBhbiBpbXByZXNzaW9uIG9mIGxvYWRpbmcsIGxlbFxuXHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdF9yYWN0aXZlLnNldCh7XG5cdFx0XHRcdFx0XHRcdFx0XHQncGFnZSc6IHJlc3BvbnNlLnBhZ2UsXG5cdFx0XHRcdFx0XHRcdFx0XHQnbmV4dFBhZ2UnOiByZXNwb25zZS5uZXh0UGFnZVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdF9yYWN0aXZlLnB1c2guYXBwbHkoX3JhY3RpdmUsIFsgJ25ld3MnIF0uY29uY2F0KHJlc3BvbnNlLm5ld3MpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JhY3RpdmUuc2V0KCdzdGF0ZScsICdpbmVydCcpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByYWN0aXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFF1ZXJ5IHNlcnZlciBmb3IgbmV3cyBhbmQgc2VuZCB0aGVtIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcGFyYW0gIHthcnJheX0gICAgIGRhdGEgICAgICBPYmplY3QgZm9ybWVkIGJ5IGEgcGFnZSBudW1iZXJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFjayAgRnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgQUpBWCByZXF1ZXN0IGlzIGRvbmVcblx0ICovXG5cdGludm9rZUxvYWROZXdzIChkYXRhLCBjYWxsYmFjaykge1xuXHRcdC8vIERlZmF1bHQgcmVzcG9uc2Vcblx0XHR2YXIgX3Jlc3BvbnNlID0ge1xuXHRcdFx0bmV3czogW10sXG5cdFx0XHRwYWdlOiBkYXRhLnBhZ2UsXG5cdFx0XHRuZXh0UGFnZTogZmFsc2Vcblx0XHR9O1xuXHRcdHZhciBqcXhociA9ICQuYWpheCh7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0dXJsOiAnbmV3cy9saXN0Jyxcblx0XHRcdGRhdGE6IGRhdGFcblx0XHR9KVxuXHRcdC5kb25lKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUpIHtcblx0XHRcdFx0X3Jlc3BvbnNlID0gcmVzcG9uc2U7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuZmFpbCgoKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHR9KVxuXHRcdC5hbHdheXMoKCkgPT4ge1xuXHRcdFx0Y2FsbGJhY2soX3Jlc3BvbnNlKTtcblx0XHR9KTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5uZXdzTGlzdENvbnRyb2xsZXIudGVhcmRvd24oKTtcblx0XHR0aGlzLiRlbC5vZmYoJy5OZXdzJyk7XG5cdH1cbn1cbiIsIlxuLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IEJhcmJhIGZyb20gJ2JhcmJhLmpzJztcbmltcG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH0gZnJvbSAnLi4vdXRpbHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgdHJhbnNpdGlvbnMgfSBmcm9tICcuLi9nbG9iYWwvUGFnZVRyYW5zaXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5sb2FkKCk7XG5cdH1cblxuXHRsb2FkKCl7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvL0luaXQgQmFyYmEgSlNcblx0XHRCYXJiYS5QamF4LkRvbS5jb250YWluZXJDbGFzcyA9ICdqcy1iYXJiYS1jb250YWluZXInO1xuXHRcdEJhcmJhLlBqYXguRG9tLndyYXBwZXJJZCA9ICdqcy1iYXJiYS13cmFwcGVyJztcblxuXHRcdEJhcmJhLlBqYXguc3RhcnQoKTtcblxuXHRcdHZhciBtYWluVHJhbnNpdGlvbiA9IEJhcmJhLkJhc2VUcmFuc2l0aW9uLmV4dGVuZCh0cmFuc2l0aW9ucy5tYWluVHJhbnNpdGlvbik7XG5cdFx0dmFyIG5hdlRyYW5zaXRpb24gPSBCYXJiYS5CYXNlVHJhbnNpdGlvbi5leHRlbmQodHJhbnNpdGlvbnMubmF2VHJhbnNpdGlvbik7XG5cdFx0dmFyIHNlY3Rpb25UcmFuc2l0aW9uID0gQmFyYmEuQmFzZVRyYW5zaXRpb24uZXh0ZW5kKHRyYW5zaXRpb25zLnNlY3Rpb25UcmFuc2l0aW9uKTtcblxuXHRcdEJhcmJhLlBqYXguZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHNlbGYucm91dGUgPT09ICduYXYnKXtcblx0XHRcdFx0cmV0dXJuIG5hdlRyYW5zaXRpb247XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChzZWxmLnJvdXRlID09ICdzYW1lLXNlY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiBzZWN0aW9uVHJhbnNpdGlvbjtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gbWFpblRyYW5zaXRpb247XG5cdFx0XHR9XG5cdFx0fTtcblxuXG5cdFx0QmFyYmEuRGlzcGF0Y2hlci5vbignbGlua0NsaWNrZWQnLCBmdW5jdGlvbihjdXJyZW50U3RhdHVzLCBvbGRTdGF0dXMsIGNvbnRhaW5lcikge1xuXHRcdFx0c2VsZi5yb3V0ZT0gY3VycmVudFN0YXR1cy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm91dGUnKTtcblx0XHRcdHNlbGYucm91dGVPcHRpb249IGN1cnJlbnRTdGF0dXMuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdXRlLW9wdGlvbicpO1xuXG5cdFx0XHRpZihzZWxmLnJvdXRlT3B0aW9uICE9IHVuZGVmaW5lZCl7XG5cdFx0XHRcdCRib2R5LmF0dHIoJ2RhdGEtcm91dGUtb3B0aW9uJyxzZWxmLnJvdXRlT3B0aW9uKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkYm9keS5hdHRyKCdkYXRhLXJvdXRlLW9wdGlvbicsJycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogRXhlY3V0ZSBhbnkgdGhpcmQgcGFydHkgZmVhdHVyZXMuXG5cdFx0ICovXG5cdFx0QmFyYmEuRGlzcGF0Y2hlci5vbignbmV3UGFnZVJlYWR5JywgZnVuY3Rpb24oY3VycmVudFN0YXR1cywgb2xkU3RhdHVzLCBjb250YWluZXIpIHtcblxuXHRcdFx0aWYgKHdpbmRvdy5nYSAmJiAhJGh0bWwuZGF0YSgnZGVidWcnKSkge1xuXHRcdFx0XHRnYSgnc2VuZCcsIHtcblx0XHRcdFx0XHRoaXRUeXBlOiAncGFnZXZpZXcnLFxuXHRcdFx0XHRcdHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lLFxuXHRcdFx0XHRcdGxvY2F0aW9uOiBjdXJyZW50U3RhdHVzLnVybCxcblx0XHRcdFx0XHR0aXRsZTogZG9jdW1lbnQudGl0bGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBqcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwic2NyaXB0XCIpO1xuXHRcdFx0aWYoanMgIT0gbnVsbCl7XG5cdFx0XHRcdGV2YWwoanMuaW5uZXJIVE1MKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCk7XG5cdH1cbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJ1xuaW1wb3J0IFNjcm9sbGJhciBmcm9tICdzbW9vdGgtc2Nyb2xsYmFyJztcbi8vIGltcG9ydCB0YXAgZnJvbSAnLi4vcmFjdGl2ZS9yYWN0aXZlLWV2ZW50cy10YXAnO1xuLy8gaW1wb3J0IGZhZGUgZnJvbSAnLi4vcmFjdGl2ZS9yYWN0aXZlLXRyYW5zaXRpb25zLWZhZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuc2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIgPSB0aGlzLmluaXRTZWFyY2hSZXN1bHRzQ29udHJvbGxlcigpO1xuXG5cdFx0aWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG5cdFx0XHR0aGlzLnNjcm9sbGJhciA9IFNjcm9sbGJhci5pbml0KHRoaXMuJGVsLmZpbmQoJ1tkYXRhLXNjcm9sbGJhcl0nKVswXSk7XG5cdFx0fVxuXHRcdHdpbmRvdy5SYWN0aXZlLkRFQlVHID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBjb250cm9sbGVyIGlzIHVzZWQgZm9yIGxvYWRpbmcgc2VhcmNoIHJlc3VsdHMgYW5kIHZhcmlvdXMgdmlzdWFsIGVmZmVjdHNcblx0ICpcblx0ICogQHJldHVybiAge1JhY3RpdmUgT2JqZWN0fSAgUmFjdGl2ZSBpbnN0YW5jZVxuXHQgKi9cblx0aW5pdFNlYXJjaFJlc3VsdHNDb250cm9sbGVyKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIHRpbWVvdXQgPSAwO1xuXHRcdHZhciBtaW5MZW5ndGggPSAzO1xuXHRcdHZhciBzZWFyY2hEZWxheSA9IDUwMDtcblx0XHR2YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcblx0XHRcdGVsOiB0aGlzLiRlbCxcblx0XHRcdHRlbXBsYXRlOiB0aGlzLnVuZXNjYXBlSFRNTCh0aGlzLiRlbC5odG1sKCkpLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRrZXl3b3JkOiAnJyxcblx0XHRcdFx0bmV3czogW10sXG5cdFx0XHRcdHByb2plY3RzOiBbXSxcblx0XHRcdFx0c3RhdGU6ICdpbmVydCdcblx0XHRcdH0sXG5cdFx0XHRjb21wdXRlZDoge1xuXHRcdFx0XHRkaXNwbGF5U2VhcmNoUmVzdWx0czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KCdrZXl3b3JkJykubGVuZ3RoID49IG1pbkxlbmd0aDtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZW5jb2RlZEtleXdvcmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldCgna2V5d29yZCcpLnJlcGxhY2UoL1xccy9nLCAnJm5ic3A7Jyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGhhc05ld3M6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9iamVjdENvdW50KCduZXdzJykgIT09IDA7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGhhc1Byb2plY3RzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vYmplY3RDb3VudCgncHJvamVjdHMnKSAhPT0gMDtcblx0XHRcdFx0fSxcblx0XHRcdFx0aGFzU2VjdGlvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9iamVjdENvdW50KCdzZWN0aW9ucycpICE9PSAwO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpc0xvYWRpbmc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldCgnc3RhdGUnKSA9PT0gJ2xvYWRpbmcnO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0b3RhbFJlc3VsdHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldCgncHJvamVjdHMnKS5sZW5ndGggKyB0aGlzLmdldCgnbmV3cycpLmxlbmd0aCArIHRoaXMuZ2V0KCdzZWN0aW9ucycpLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vIGV2ZW50czogeyB0YXAgfSxcblx0XHRcdC8vIHRyYW5zaXRpb25zOiB7IGZhZGUgfSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBOZXdzIG1vZGVsXG5cdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBwYXJhbXMgIEluaXRpYWwgdmFsdWVzIGZvciB0aGUgbW9kZWxcblx0XHRcdCAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgTmV3cyBtb2RlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE1vZGVsIHByb3BlcnRpZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIHVybFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICB0aXRsZVxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICBkYXRlXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIGRlc2NyaXB0aW9uXG5cdFx0XHQgKi9cblx0XHRcdGdldE5ld3NNb2RlbDogZnVuY3Rpb24gKCBwYXJhbXMgKSB7XG5cdFx0XHRcdHZhciBkZWZhdWx0cyA9IHtcblx0XHRcdFx0XHR1cmw6ICcnLFxuXHRcdFx0XHRcdHRpdGxlOiAnJyxcblx0XHRcdFx0XHRkYXRlOiAnJyxcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJydcblx0XHRcdFx0fTtcblx0XHRcdFx0cmV0dXJuICQuZXh0ZW5kKGRlZmF1bHRzLCBwYXJhbXMpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBQcm9qZWN0IG1vZGVsXG5cdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBwYXJhbXMgIEluaXRpYWwgdmFsdWVzIGZvciB0aGUgbW9kZWxcblx0XHRcdCAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgUHJvamVjdCBtb2RlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE1vZGVsIHByb3BlcnRpZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIHVybFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICBpbWFnZVxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9ICB0aXRsZVxuXHRcdFx0ICogQHBhcmFtIHthcnJheX0gICB0YWdzXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIGRlc2NyaXB0aW9uXG5cdFx0XHQgKi9cblx0XHRcdGdldFByb2plY3RNb2RlbDogZnVuY3Rpb24gKCBwYXJhbXMgKSB7XG5cdFx0XHRcdHZhciBkZWZhdWx0cyA9IHtcblx0XHRcdFx0XHR1cmw6ICcnLFxuXHRcdFx0XHRcdGltYWdlOiAnJyxcblx0XHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdFx0dGFnczogW10sXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246ICcnXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiAkLmV4dGVuZChkZWZhdWx0cywgcGFyYW1zKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRTZWN0aW9uTW9kZWw6IGZ1bmN0aW9uICggcGFyYW1zICkge1xuXHRcdFx0XHR2YXIgZGVmYXVsdHMgPSB7XG5cdFx0XHRcdFx0dXJsOiAnJyxcblx0XHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246ICcnXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiAkLmV4dGVuZChkZWZhdWx0cywgcGFyYW1zKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ291bnQgb2JqZWN0cyBhY2NvcmRpbmcgdG8ga2V5cGF0aFxuXHRcdFx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5cGF0aFxuXHRcdFx0ICogQHJldHVybiB7aW50fVxuXHRcdFx0ICovXG5cdFx0XHRvYmplY3RDb3VudDogZnVuY3Rpb24oa2V5cGF0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXQoa2V5cGF0aCkubGVuZ3RoO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBbGxvd3MgdXMgdG8gc2V0IHByb3h5IGV2ZW50cyBhbmQgcnVuIG90aGVyIHRhc2tzIHdoZW4gY29udHJvbGxlciBpcyBpbml0aWFsaXplZFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAge2FycmF5fSAgb3B0aW9ucyAgQXJyYXkgb2Ygb3B0aW9uc1xuXHRcdFx0ICovXG5cdFx0XHRvbmluaXQgOiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHRoaXMub24oe1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEVtcHR5IGFsbCBzZWFyY2ggcmVzdWx0c1xuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgZXZlbnQgIFJhY3RpdmUgZXZlbnQgb2JqZWN0XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZW1wdHlSZXN1bHRzOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRyYWN0aXZlLnNldCgncHJvamVjdHMnLCBbXSk7XG5cdFx0XHRcdFx0XHRyYWN0aXZlLnNldCgnbmV3cycsIFtdKTtcblx0XHRcdFx0XHRcdHJhY3RpdmUuc2V0KCdzZWN0aW9ucycsIFtdKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogV2hlbiBsb2FkIG1vcmUgaXMgY2xpY2tlZCwgd2UgZmV0Y2ggbW9yZSBuZXdzXG5cdFx0XHRcdFx0ICogSWYgbmV4dFBhZ2UgaXMgZmFsc2UsIHRoZSBidXR0b24gd2lsbCBkaXNhcGVhclxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgZXZlbnQgIFJhY3RpdmUgZXZlbnQgb2JqZWN0XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0bG9hZFNlYXJjaFJlc3VsdHM6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0XHRcdFx0XHR2YXIgcGFyYW1ldGVycyA9IHtcblx0XHRcdFx0XHRcdFx0a2V5d29yZDogdGhpcy5nZXQoJ2tleXdvcmQnKVxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0dGhpcy5zZXQoJ3N0YXRlJywnbG9hZGluZycpO1xuXG5cdFx0XHRcdFx0XHRfdGhpcy5pbnZva2VMb2FkUmVzdWx0cyhwYXJhbWV0ZXJzLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0XHRyYWN0aXZlLnNldCgncHJvamVjdHMnLCByZXNwb25zZS5wcm9qZWN0cyk7XG5cdFx0XHRcdFx0XHRcdHJhY3RpdmUuc2V0KCdzZWN0aW9ucycsIHJlc3BvbnNlLnNlY3Rpb25zKTtcblx0XHRcdFx0XHRcdFx0cmFjdGl2ZS5zZXQoJ25ld3MnLCByZXNwb25zZS5uZXdzKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJhY3RpdmUuc2V0KCdzdGF0ZScsICdpbmVydCcpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBHb2JibGUgdXAgdGhlIHN1Ym1pdCBldmVudFxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogQHBhcmFtICB7b2JqZWN0fSAgZXZlbnQgIFJhY3RpdmUgZXZlbnQgb2JqZWN0XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0c3VibWl0Rm9ybTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBXYXRjaGluZyBmb3IgY2hhbmdlcyBvbiB0aGUgdHlwZWQgaW4gZGF0YVxuXHRcdHJhY3RpdmUub2JzZXJ2ZSgna2V5d29yZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG5cblx0XHRcdC8vIFRpbWVvdXQgY2xlYXJpbmchXG5cdFx0XHRpZiAodGltZW91dCAhPT0gMCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBsZXNzIHRoYW4gbWluTGVuZ3RoIGNoYXJhY3RlcnMsIGNsZWFyIG91dCB0aGUgc2VhcmNoIHJlc3VsdHNcblx0XHRcdGlmIChuZXdWYWx1ZS5sZW5ndGggPCBtaW5MZW5ndGgpIHtcblx0XHRcdFx0cmFjdGl2ZS5maXJlKCdlbXB0eVJlc3VsdHMnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIERvbnQgc2VhcmNoIGlmIGxvYWRpbmdcblx0XHRcdFx0aWYgKHJhY3RpdmUuZ2V0KCdzdGF0ZScpID09PSAnaW5lcnQnKSB7XG5cdFx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyYWN0aXZlLmZpcmUoJ2xvYWRTZWFyY2hSZXN1bHRzJyk7XG5cdFx0XHRcdFx0fSwgc2VhcmNoRGVsYXkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByYWN0aXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFF1ZXJ5IHNlcnZlciBmb3Igc2VhcmNoIHJlc3VsdHMgYW5kIHNlbmQgdGhlbSB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICogQHBhcmFtICB7YXJyYXl9ICAgICBkYXRhICAgICAgT2JqZWN0IGZvcm1lZCBieSBhIGtleXdvcmRcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFjayAgRnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgQUpBWCByZXF1ZXN0IGlzIGRvbmVcblx0ICovXG5cdGludm9rZUxvYWRSZXN1bHRzIChkYXRhLCBjYWxsYmFjaykge1xuXHRcdC8vIERlZmF1bHQgcmVzcG9uc2Vcblx0XHR2YXIgX3Jlc3BvbnNlID0ge1xuXHRcdFx0bmV3czogW10sXG5cdFx0XHRwcm9qZWN0czogW11cblx0XHR9O1xuXHRcdHZhciBqcXhociA9ICQuYWpheCh7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0dXJsOiAnc2VhcmNoJyxcblx0XHRcdGRhdGE6IGRhdGFcblx0XHR9KVxuXHRcdC5kb25lKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUpIHtcblx0XHRcdFx0X3Jlc3BvbnNlID0gcmVzcG9uc2U7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuZmFpbCgoKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHR9KVxuXHRcdC5hbHdheXMoKCkgPT4ge1xuXHRcdFx0Y2FsbGJhY2soX3Jlc3BvbnNlKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIERlc3Ryb3lcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLnNlYXJjaFJlc3VsdHNDb250cm9sbGVyLnRlYXJkb3duKCk7XG5cdFx0dGhpcy4kZWwub2ZmKCcuU2VhcmNoJyk7XG5cdH1cbn1cbiIsImltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy4kdG9nZ2xlcyA9IHRoaXMuJGVsLmZpbmQoJy5qcy1zd2l0Y2gtdG9nZ2xlJyk7XG5cdFx0dGhpcy4kaW1hZ2VFbGVtID0gdGhpcy4kZWwuZmluZCgnLmpzLWltYWdlJyk7XG5cblx0XHR0aGlzLiRlbC5vbignbW91c2VlbnRlci5TaW1pbGFyU3dpdGNoZXInLCAnLmpzLXN3aXRjaC10b2dnbGUnLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMuc3dpdGNoUHJvamVjdChldmVudCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBIb3ZlciBwcm9qZWN0XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHN3aXRjaFByb2plY3QoZXZlbnQpIHtcblx0XHR2YXIgc3JjID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcblxuXHRcdGlmIChzcmMgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuJHRvZ2dsZXMucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0JChldmVudC5jdXJyZW50VGFyZ2V0KS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHR0aGlzLiRpbWFnZUVsZW0uY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnICsgc3JjICsgJyknKTtcblx0XHR9XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCcuU2ltaWxhclN3aXRjaGVyJyk7XG5cdH1cbn1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTbGlkZXIgaG9tZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCBBYnN0cmFjdE1vZHVsZSBmcm9tICcuL0Fic3RyYWN0TW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBYnN0cmFjdE1vZHVsZSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHR0aGlzLmN1cnJlbnRTbGlkZSA9IDE7XG5cdFx0dGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSAxMjAwO1xuXHRcdHRoaXMuYXV0b3BsYXlTcGVlZCA9IDEwMDAwO1xuXHRcdHRoaXMuaW50ZXJ2YWw7XG5cdFx0dGhpcy5tYXhTbGlkZSA9IHRoaXMuJGVsLmZpbmQoJCgnLmpzLXNsaWRlci1ob21lLXNsaWRlJykpLmxlbmd0aDtcblx0XHR0aGlzLiRjb250cm9scyA9IHRoaXMuJGVsLmZpbmQoJy5qcy1zbGlkZXItaG9tZS1idXR0b24nKTtcblxuXHRcdHRoaXMuJGVsLm9uKCdjbGljaycsICcuanMtc2xpZGVyLWhvbWUtbmV4dCcsIChldmVudCkgPT4gdGhpcy5uZXh0U2xpZGUoKSk7XG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrJywgJy5qcy1zbGlkZXItaG9tZS1wcmV2JywgKGV2ZW50KSA9PiB0aGlzLnByZXZTbGlkZSgpKTtcblxuXHRcdHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuXHR9XG5cblx0Ly8gTmV4dCBzbGlkZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRuZXh0U2xpZGUoKSB7XG5cdFx0dGhpcy5wcmV2ZW50Q2xpY2soKTtcblxuXHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSA9PT0gdGhpcy5tYXhTbGlkZSkge1xuXHRcdFx0dGhpcy5jdXJyZW50U2xpZGUgPSAwO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFNsaWRlKys7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLXByZXYnKS5yZW1vdmVDbGFzcygnaXMtcHJldicpLmFkZENsYXNzKCdpcy1uZXh0Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLWN1cnJlbnQnKS5yZW1vdmVDbGFzcygnaXMtY3VycmVudCcpLmFkZENsYXNzKCdpcy1wcmV2Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlW2RhdGEtc2xpZGU9XCInK3RoaXMuY3VycmVudFNsaWRlKydcIl0nKS5yZW1vdmVDbGFzcygnaXMtbmV4dCcpLmFkZENsYXNzKCdpcy1jdXJyZW50Jyk7XG5cdH1cblxuXHQvLyBQcmV2IHNsaWRlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHByZXZTbGlkZSgpIHtcblx0XHR0aGlzLnByZXZlbnRDbGljaygpO1xuXG5cdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlID09PSAxKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMubWF4U2xpZGUgKyAxO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFNsaWRlLS07XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLW5leHQnKS5yZW1vdmVDbGFzcygnaXMtbmV4dCcpLmFkZENsYXNzKCdpcy1wcmV2Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLWN1cnJlbnQnKS5yZW1vdmVDbGFzcygnaXMtY3VycmVudCcpLmFkZENsYXNzKCdpcy1uZXh0Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlW2RhdGEtc2xpZGU9XCInK3RoaXMuY3VycmVudFNsaWRlKydcIl0nKS5yZW1vdmVDbGFzcygnaXMtcHJldicpLmFkZENsYXNzKCdpcy1jdXJyZW50Jyk7XG5cdH1cblxuXHQvLyBQcmV2ZW50IGNsaWNrXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHByZXZlbnRDbGljaygpIHtcblx0XHR0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHR0aGlzLiRjb250cm9scy5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMuJGNvbnRyb2xzLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0dGhpcy5zdGFydEF1dG9wbGF5KCk7XG5cdFx0fSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbik7XG5cdH1cblxuXHQvLyBTdGFydCBhdXRvcGxheVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRzdGFydEF1dG9wbGF5KCkge1xuXHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMuaXNBbmltYXRpbmcpIHtcblx0XHRcdFx0dGhpcy5uZXh0U2xpZGUoKTtcblx0XHRcdH1cblx0XHR9LCB0aGlzLmF1dG9wbGF5U3BlZWQpO1xuXHR9XG5cblx0Ly8gRGVzdHJveVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuJGVsLm9mZigpO1xuXHR9XG59XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2xpZGVyIGhvbWVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgQWJzdHJhY3RNb2R1bGUgZnJvbSAnLi9BYnN0cmFjdE1vZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWJzdHJhY3RNb2R1bGUge1xuXHRjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5jdXJyZW50U2xpZGUgPSAxO1xuXHRcdHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMTIwMDtcblx0XHR0aGlzLmF1dG9wbGF5U3BlZWQgPSAxMDAwMDtcblx0XHR0aGlzLm1heFNsaWRlID0gdGhpcy4kZWwuZmluZCgkKCcuanMtc2xpZGVyLWhvbWUtc2xpZGUnKSkubGVuZ3RoO1xuXHRcdHRoaXMuJGNvbnRyb2xzID0gdGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLWJ1dHRvbicpO1xuXG5cdFx0dGhpcy4kZWwub24oJ2NsaWNrJywgJy5qcy1zbGlkZXItaG9tZS1uZXh0JywgKGV2ZW50KSA9PiB0aGlzLm5leHRTbGlkZSgpKTtcblx0XHR0aGlzLiRlbC5vbignY2xpY2snLCAnLmpzLXNsaWRlci1ob21lLXByZXYnLCAoZXZlbnQpID0+IHRoaXMucHJldlNsaWRlKCkpO1xuXHR9XG5cblx0Ly8gTmV4dCBzbGlkZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRuZXh0U2xpZGUoKSB7XG5cdFx0dGhpcy5wcmV2ZW50Q2xpY2soKTtcblxuXHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSA9PT0gdGhpcy5tYXhTbGlkZSkge1xuXHRcdFx0dGhpcy5jdXJyZW50U2xpZGUgPSAwO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFNsaWRlKys7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLXByZXYnKS5yZW1vdmVDbGFzcygnaXMtcHJldicpLmFkZENsYXNzKCdpcy1uZXh0Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLWN1cnJlbnQnKS5yZW1vdmVDbGFzcygnaXMtY3VycmVudCcpLmFkZENsYXNzKCdpcy1wcmV2Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlW2RhdGEtc2xpZGU9XCInK3RoaXMuY3VycmVudFNsaWRlKydcIl0nKS5yZW1vdmVDbGFzcygnaXMtbmV4dCcpLmFkZENsYXNzKCdpcy1jdXJyZW50Jyk7XG5cdH1cblxuXHQvLyBQcmV2IHNsaWRlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHByZXZTbGlkZSgpIHtcblx0XHR0aGlzLnByZXZlbnRDbGljaygpO1xuXG5cdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlID09PSAxKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMubWF4U2xpZGUgKyAxO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFNsaWRlLS07XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLW5leHQnKS5yZW1vdmVDbGFzcygnaXMtbmV4dCcpLmFkZENsYXNzKCdpcy1wcmV2Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlLmlzLWN1cnJlbnQnKS5yZW1vdmVDbGFzcygnaXMtY3VycmVudCcpLmFkZENsYXNzKCdpcy1uZXh0Jyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnLmpzLXNsaWRlci1ob21lLXNsaWRlW2RhdGEtc2xpZGU9XCInK3RoaXMuY3VycmVudFNsaWRlKydcIl0nKS5yZW1vdmVDbGFzcygnaXMtcHJldicpLmFkZENsYXNzKCdpcy1jdXJyZW50Jyk7XG5cdH1cblxuXHQvLyBQcmV2ZW50IGNsaWNrXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHByZXZlbnRDbGljaygpIHtcblx0XHR0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHR0aGlzLiRjb250cm9scy5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLiRjb250cm9scy5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHR9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uKTtcblx0fVxuXG5cdC8vIERlc3Ryb3lcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRlbC5vZmYoKTtcblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IERvdWJsZVNsaWRlciBmcm9tICcuL0RvdWJsZVNsaWRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBEb3VibGVTbGlkZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0b3B0aW9ucy5zbGlkZXJzID0ge1xuXHRcdFx0b25lOiB7XG5cdFx0XHRcdCRlbDogb3B0aW9ucy4kZWwuZmluZCgnLmpzLXNsaWRlci1wcm9qZWN0LW1haW4nKSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdFx0Y3NzRWFzZTogJ2N1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSknLFxuXHRcdFx0XHRcdHNwZWVkOiA1MDBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHR3bzp7XG5cdFx0XHRcdCRlbDogb3B0aW9ucy4kZWwuZmluZCgnLmpzLXNsaWRlci1wcm9qZWN0LXNlY29uZGFyeScpLFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRcdFx0XHRjc3NFYXNlOiAnY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKScsXG5cdFx0XHRcdFx0ZHJhZ2dhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRzcGVlZDogNTAwLFxuXG5cdFx0XHRcdFx0aW5pdGlhbFNsaWRlOiAxLFxuXHRcdFx0XHRcdHN3aXBlOiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0fVxufVxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFNtb290aCBzY3JvbGxpbmcgbW9kdWxlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuaW1wb3J0IFNjcm9sbGJhciBmcm9tICdzbW9vdGgtc2Nyb2xsYmFyJztcbmltcG9ydCB7ICRkb2N1bWVudCB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcbmltcG9ydCBSZXNpemUgZnJvbSAndGhyb3R0bGVkLXJlc2l6ZSc7XG5cbmltcG9ydCB7IGhhc0RlcGVuZGVuY2llcyB9IGZyb20gJy4uL2dsb2JhbC9kZXBlbmRlbmNpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuc2Nyb2xsYmFyO1xuXHRcdHRoaXMuaXNTbW9vdGggPSBmYWxzZTtcblx0XHR0aGlzLmlzTW9iaWxlID0gdHJ1ZTtcblxuXHRcdHRoaXMuc2VsZWN0b3IgPSAnLmpzLXBhcmFsbGF4LCAucy13eXNpd3lnIHVsLCAucy13eXNpd3lnIGJsb2NrcXVvdGUnO1xuXG5cdFx0Ly8gaWYgKGhhc0RlcGVuZGVuY2llcygnU21vb3RoU2Nyb2xsaW5nJykpIHtcblx0XHQvLyBcdHRoaXMuJGRvY3VtZW50Lm9uKCdyZXNvbHZlRGVwZW5kZW5jaWVzLlNtb290aFNjcm9sbGluZycsICgpID0+IHRoaXMuYnVpbGRTbW9vdGhTY3JvbGxpbmcoKSk7XG5cdFx0Ly8gfSBlbHNlIHtcblxuXHRcdC8vIFNtb290aFNjcm9sbGluZyBvbmx5IG9uIHRoaXMgbWF0Y2hNZWRpYSBtYXRjaGVcblx0XHRpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcblx0XHRcdHRoaXMuYnVpbGRTbW9vdGhTY3JvbGxpbmcoKTtcblx0XHRcdHRoaXMuaXNTbW9vdGggPSB0cnVlO1xuXHRcdFx0dGhpcy5pc01vYmlsZSA9IGZhbHNlO1xuXG5cdFx0XHQkZG9jdW1lbnQub24oJ1Ntb290aFNjcm9sbGluZy5yZWJ1aWxkJywgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZUVsZW1lbnRzKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Ly8gfVxuXG5cdFx0dmFyIHJlc2l6ZSA9IG5ldyBSZXNpemUoKTtcbiAgICAgICAgcmVzaXplLm9uKCdyZXNpemU6ZW5kJywgKCkgPT4gdGhpcy5jaGVja1Jlc2l6ZSgpKTtcblx0fVxuXG5cdGJ1aWxkU21vb3RoU2Nyb2xsaW5nKCkge1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5zY3JvbGxiYXIgPSBTY3JvbGxiYXIuaW5pdCh0aGlzLiRlbFswXSk7XG5cdFx0XHR0aGlzLndpbmRvd0hlaWdodCA9IHRoaXMuJHdpbmRvdy5oZWlnaHQoKTtcblx0XHRcdHRoaXMud2luZG93TWlkZGxlID0gdGhpcy53aW5kb3dIZWlnaHQgLyAyO1xuXHRcdFx0dGhpcy5zY3JvbGxiYXJMaW1pdCA9IHRoaXMuc2Nyb2xsYmFyLmxpbWl0LnkgKyB0aGlzLndpbmRvd0hlaWdodDtcblx0XHRcdHRoaXMuZWxlbWVudHMgPSB7fTtcblx0XHRcdC8vIENyZWF0ZSBlbGVtZW50cyBvYmplY3Rcblx0XHRcdHRoaXMuYWRkRWxlbWVudHMoKTtcblx0XHRcdC8vIEZpcnN0IGxvYWRcblx0XHRcdHRoaXMuY2hlY2tFbGVtZW50cyh0cnVlKTtcblx0XHRcdC8vIE9uIHNjcm9sbFxuXHRcdFx0dGhpcy5zY3JvbGxiYXIuYWRkTGlzdGVuZXIoKCkgPT4gdGhpcy5jaGVja0VsZW1lbnRzKCkpO1xuXG5cdFx0XHQvLyBTY3JvbGx0byBidXR0b25zIGV2ZW50XG5cdFx0XHQkKCcuanMtc2Nyb2xsdG8nKS5vbignY2xpY2suU21vb3RoU2Nyb2xsaW5nJywgKGV2ZW50KSA9PiB0aGlzLnNjcm9sbFRvKGV2ZW50KSk7XG5cblx0XHRcdC8vIFNldHVwIGRvbmUuXG5cdFx0XHR0aGlzLiRkb2N1bWVudC50cmlnZ2VyKHtcblx0XHRcdFx0dHlwZTogJ1Ntb290aFNjcm9sbC5pc1JlYWR5J1xuXHRcdFx0fSk7XG5cblx0XHR9LCAzMDApO1xuXHR9XG5cblx0Ly8gQWRkIGVsZW1lbnRzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGFkZEVsZW1lbnRzKCkge1xuXHRcdCQodGhpcy5zZWxlY3RvcikuZWFjaCgoaSwgZWwpID0+IHtcblx0XHRcdGxldCAkZWxlbWVudCA9ICQoZWwpO1xuXHRcdFx0bGV0IGVsZW1lbnRTcGVlZCA9ICRlbGVtZW50LmRhdGEoJ3NwZWVkJykgLyAxMDtcblx0XHRcdGxldCBlbGVtZW50UG9zaXRpb24gPSAkZWxlbWVudC5kYXRhKCdwb3NpdGlvbicpO1xuXHRcdFx0bGV0IGVsZW1lbnRUYXJnZXQgPSAkZWxlbWVudC5kYXRhKCd0YXJnZXQnKTtcblx0XHRcdGxldCBlbGVtZW50SG9yaXpvbnRhbCA9ICRlbGVtZW50LmRhdGEoJ2hvcml6b250YWwnKTtcblx0XHRcdGxldCAkdGFyZ2V0ID0gKGVsZW1lbnRUYXJnZXQpID8gJChlbGVtZW50VGFyZ2V0KSA6ICRlbGVtZW50O1xuXHRcdFx0bGV0IGVsZW1lbnRPZmZzZXQgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCArIHRoaXMuc2Nyb2xsYmFyLnNjcm9sbFRvcDtcblxuXHRcdFx0bGV0IGVsZW1lbnRQZXJzaXN0ID0gJGVsZW1lbnQuZGF0YSgncGVyc2lzdCcpO1xuXG5cdFx0XHRpZiAoIWVsZW1lbnRUYXJnZXQgJiYgJGVsZW1lbnQuZGF0YSgndHJhbnNmb3JtJykpIHtcblx0XHRcdFx0bGV0IHRyYW5zZm9ybSA9ICRlbGVtZW50LmRhdGEoJ3RyYW5zZm9ybScpO1xuXHRcdFx0XHRlbGVtZW50T2Zmc2V0IC09IHBhcnNlRmxvYXQodHJhbnNmb3JtLnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgZWxlbWVudExpbWl0ID0gZWxlbWVudE9mZnNldCArICR0YXJnZXQub3V0ZXJIZWlnaHQoKTtcblx0XHRcdGxldCBlbGVtZW50TWlkZGxlID0gKChlbGVtZW50TGltaXQgLSBlbGVtZW50T2Zmc2V0KSAvIDIpICsgZWxlbWVudE9mZnNldDtcblxuXHRcdFx0dGhpcy5lbGVtZW50c1tpXSA9IHtcblx0XHRcdFx0JGVsZW1lbnQ6ICRlbGVtZW50LFxuXHRcdFx0XHRvZmZzZXQ6IGVsZW1lbnRPZmZzZXQsXG5cdFx0XHRcdGxpbWl0OiBlbGVtZW50TGltaXQsXG5cdFx0XHRcdG1pZGRsZTogZWxlbWVudE1pZGRsZSxcblx0XHRcdFx0c3BlZWQ6IGVsZW1lbnRTcGVlZCxcblx0XHRcdFx0cG9zaXRpb246IGVsZW1lbnRQb3NpdGlvbixcblx0XHRcdFx0aG9yaXpvbnRhbDogZWxlbWVudEhvcml6b250YWwsXG5cdFx0XHRcdHBlcnNpc3Q6IGVsZW1lbnRQZXJzaXN0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIGVsZW1lbnRzLCByZWNhbGN1bGF0ZSBhbGwgcG9zaXRpb24gYXMgaWYgdGhlIHRlbXBsYXRlXG5cdCAqIGp1c3QgbG9hZGVkLlxuXHQgKi9cblx0dXBkYXRlRWxlbWVudHMoKSB7XG5cdFx0dGhpcy5zY3JvbGxiYXIudXBkYXRlKCk7XG5cdFx0Ly8gUmVzZXQgY29udGFpbmVyIGFuZCBzY3JvbGxiYXIgZGF0YS5cblx0XHR0aGlzLndpbmRvd0hlaWdodCA9IHRoaXMuJHdpbmRvdy5oZWlnaHQoKTtcblx0XHR0aGlzLndpbmRvd01pZGRsZSA9IHRoaXMud2luZG93SGVpZ2h0IC8gMjtcblx0XHR0aGlzLnNjcm9sbGJhckxpbWl0ID0gdGhpcy5zY3JvbGxiYXIubGltaXQueSArIHRoaXMud2luZG93SGVpZ2h0O1xuXHRcdHRoaXMuYWRkRWxlbWVudHMoKTtcblx0XHR0aGlzLmNoZWNrRWxlbWVudHModHJ1ZSk7XG5cdFx0Ly8gdGhpcy5jaGVja0VsZW1lbnRzKHRydWUpO1xuXHRcdCRkb2N1bWVudC50cmlnZ2VyKCdTbW9vdGhTY3JvbGwudXBkYXRlJyk7XG5cdH1cblxuXHQvLyBDaGVjayByZXNpemVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Y2hlY2tSZXNpemUoKSB7XG5cdFx0aWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNTbW9vdGgpIHtcblx0XHRcdFx0dGhpcy5pc1Ntb290aCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuYnVpbGRTbW9vdGhTY3JvbGxpbmcoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudXBkYXRlRWxlbWVudHMoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuaXNTbW9vdGgpIHtcblx0XHRcdFx0dGhpcy5pc1Ntb290aCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBlbGVtZW50c1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRjaGVja0VsZW1lbnRzKGZpcnN0KSB7XG5cdFx0bGV0IHNjcm9sbGJhclRvcCA9IHRoaXMuc2Nyb2xsYmFyLnNjcm9sbFRvcDtcblx0XHRsZXQgc2Nyb2xsYmFyTGltaXQgPSB0aGlzLnNjcm9sbGJhckxpbWl0O1xuXHRcdGxldCBzY3JvbGxiYXJCb3R0b20gPSBzY3JvbGxiYXJUb3AgKyB0aGlzLndpbmRvd0hlaWdodDtcblx0XHRsZXQgc2Nyb2xsYmFyTWlkZGxlID0gc2Nyb2xsYmFyVG9wICsgdGhpcy53aW5kb3dNaWRkbGU7XG5cblx0XHRmb3IobGV0IGkgaW4gdGhpcy5lbGVtZW50cykge1xuXHRcdFx0bGV0IHRyYW5zZm9ybURpc3RhbmNlO1xuXHRcdFx0bGV0IHNjcm9sbEJvdHRvbSA9IHNjcm9sbGJhckJvdHRvbTtcblx0XHRcdGxldCAkZWxlbWVudCA9IHRoaXMuZWxlbWVudHNbaV0uJGVsZW1lbnQ7XG5cdFx0XHRsZXQgZWxlbWVudE9mZnNldCA9IHRoaXMuZWxlbWVudHNbaV0ub2Zmc2V0O1xuXHRcdFx0Ly8gZWxlbWVudE9mZnNldCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHRcdGxldCBlbGVtZW50TGltaXQgPSB0aGlzLmVsZW1lbnRzW2ldLmxpbWl0O1xuXHRcdFx0bGV0IGVsZW1lbnRNaWRkbGUgPSB0aGlzLmVsZW1lbnRzW2ldLm1pZGRsZTtcblx0XHRcdGxldCBlbGVtZW50U3BlZWQgPSB0aGlzLmVsZW1lbnRzW2ldLnNwZWVkO1xuXHRcdFx0bGV0IGVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZWxlbWVudHNbaV0ucG9zaXRpb247XG5cdFx0XHRsZXQgZWxlbWVudEhvcml6b250YWwgPSB0aGlzLmVsZW1lbnRzW2ldLmhvcml6b250YWw7XG5cdFx0XHRsZXQgZWxlbWVudFBlcnNpc3QgPSB0aGlzLmVsZW1lbnRzW2ldLnBlcnNpc3Q7XG5cblx0XHRcdGlmIChlbGVtZW50UG9zaXRpb24gPT09ICd0b3AnKSB7XG5cdFx0XHRcdHNjcm9sbEJvdHRvbSA9IHNjcm9sbGJhclRvcDtcblx0XHRcdH1cblxuXG5cdFx0XHQvLyBEZWZpbmUgaWYgdGhlIGVsZW1lbnQgaXMgaW52aWV3XG5cdFx0XHRsZXQgaW52aWV3ID0gKHNjcm9sbEJvdHRvbSA+PSBlbGVtZW50T2Zmc2V0ICYmIHNjcm9sbGJhclRvcCA8PSBlbGVtZW50TGltaXQpO1xuXG5cdFx0XHQvLyBBZGQgY2xhc3MgaWYgaW52aWV3LCByZW1vdmUgaWYgbm90XG5cdFx0XHRpZiAoaW52aWV3KSB7XG5cdFx0XHRcdCRlbGVtZW50LmFkZENsYXNzKCdpcy1pbnZpZXcnKTtcblxuXHRcdFx0XHRpZiAoZWxlbWVudFBlcnNpc3QgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0JGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWludmlldycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmlyc3QgJiYgIWludmlldyAmJiBlbGVtZW50U3BlZWQpIHtcblx0XHRcdFx0Ly8gRGlmZmVyZW50IGNhbGN1bGF0aW9ucyBpZiBpdCBpcyB0aGUgZmlyc3QgY2FsbCBhbmQgdGhlXG5cdFx0XHRcdC8vIGl0ZW0gaXMgbm90IGluIHRoZSB2aWV3XG5cdFx0XHRcdGlmIChlbGVtZW50UG9zaXRpb24gIT09ICd0b3AnKSB7XG5cdFx0XHRcdFx0dHJhbnNmb3JtRGlzdGFuY2UgPSAoKGVsZW1lbnRPZmZzZXQgLSB0aGlzLndpbmRvd01pZGRsZSkgIC0gZWxlbWVudE1pZGRsZSkgKiAtZWxlbWVudFNwZWVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGVsZW1lbnQgaXMgaW4gdmlld1xuXHRcdFx0aWYgKGludmlldyAmJiBlbGVtZW50U3BlZWQpIHtcblx0XHRcdFx0c3dpdGNoIChlbGVtZW50UG9zaXRpb24pIHtcblx0XHRcdFx0XHRjYXNlICd0b3AnOlxuXHRcdFx0XHRcdFx0dHJhbnNmb3JtRGlzdGFuY2UgPSAoc2Nyb2xsYmFyVG9wIC0gZWxlbWVudE9mZnNldCkgKiAtZWxlbWVudFNwZWVkO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcblx0XHRcdFx0XHRcdHRyYW5zZm9ybURpc3RhbmNlID0gKHNjcm9sbGJhckxpbWl0IC0gc2Nyb2xsQm90dG9tKSAqIGVsZW1lbnRTcGVlZDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm1EaXN0YW5jZSA9IChzY3JvbGxiYXJNaWRkbGUgLSBlbGVtZW50TWlkZGxlKSAqIC1lbGVtZW50U3BlZWQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXG5cdFx0XHRpZiAodHJhbnNmb3JtRGlzdGFuY2UpIHtcblx0XHRcdFx0Ly8gVHJhbnNmb3JtIGhvcml6b250YWwgT1IgdmVydGljYWwuXG5cdFx0XHRcdC8vIERlZmF1bHQgdG8gdmVydGljYWwuXG5cdFx0XHRcdChlbGVtZW50SG9yaXpvbnRhbCkgPyB0aGlzLnRyYW5zZm9ybSgkZWxlbWVudCwgdHJhbnNmb3JtRGlzdGFuY2UrJ3B4JykgOiB0aGlzLnRyYW5zZm9ybSgkZWxlbWVudCwgMCwgdHJhbnNmb3JtRGlzdGFuY2UrJ3B4Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuICAgIC8vIFRyYW5zZm9ybSBlbGVtZW50IGhvcml6b250YWxcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vXG5cbiAgICAvKipcbiAgICAgKiBbdHJhbnNmb3JtIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gJGVsZW1lbnQgSnF1ZXJ5IGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7bWl4ZWR9IFx0eCAgICAgICAgVHJhbnNsYXRlIHZhbHVlXG4gICAgICogQHBhcmFtICB7bWl4ZWR9IFx0eSAgICAgICAgVHJhbnNsYXRlIHZhbHVlXG4gICAgICogQHBhcmFtICB7bWl4ZWR9IFx0eiAgICAgICAgVHJhbnNsYXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0oJGVsZW1lbnQsIHgsIHksIHopIHtcbiAgICBcdC8vIERlZmF1bHRzXG4gICAgXHR4ID0geCB8fCAwO1xuICAgIFx0eSA9IHkgfHwgMDtcbiAgICBcdHogPSB6IHx8IDA7XG5cbiAgICBcdC8vIFRyYW5zbGF0ZVxuICAgICAgICAkZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcrIHggKycsICcrIHkgKycsICcrIHogKycpJyxcbiAgICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcrIHggKycsICcrIHkgKycsICcrIHogKycpJyxcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJysgeCArJywgJysgeSArJywgJysgeiArJyknXG4gICAgICAgIH0pLmRhdGEoJ3RyYW5zZm9ybScse1xuICAgICAgICBcdHggOiB4LFxuICAgICAgICBcdHkgOiB5LFxuICAgICAgICBcdHogOiB6XG4gICAgICAgIH0pOyAvLyBSZW1lbWJlclxuXG4gICAgICAgICRlbGVtZW50LmZpbmQodGhpcy5zZWxlY3RvcikuZWFjaCgoaSwgZSkgPT4ge1xuICAgICAgICBcdGxldCAkdGhpcyA9ICQoZSk7XG4gICAgICAgIFx0aWYgKCEkdGhpcy5kYXRhKCd0cmFuc2Zvcm0nKSkge1xuICAgICAgICBcdFx0JHRoaXMuZGF0YSgndHJhbnNmb3JtJywge1xuXHRcdCAgICAgICAgXHR4IDogeCxcblx0XHQgICAgICAgIFx0eSA6IHksXG5cdFx0ICAgICAgICBcdHogOiB6XG5cdFx0ICAgICAgICB9KVxuICAgICAgICBcdH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuXHQvLyBTY3JvbGwgdG9cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0c2Nyb2xsVG8oZXZlbnQpIHtcblxuXHRcdGlmKCEkLmlzTnVtZXJpYyhldmVudCkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdGxldCB0YXJnZXREYXRhO1xuXG5cdFx0XHRpZiAoJHRhcmdldC5kYXRhKCd0YXJnZXQnKSkge1xuXHRcdFx0XHR0YXJnZXREYXRhID0gJHRhcmdldC5kYXRhKCd0YXJnZXQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldERhdGEgPSAkdGFyZ2V0LmF0dHIoJ2hyZWYnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHRhcmdldE9mZnNldCA9ICQodGFyZ2V0RGF0YSkub2Zmc2V0KCkudG9wICsgdGhpcy5zY3JvbGxiYXIuc2Nyb2xsVG9wO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciB0YXJnZXRPZmZzZXQgPSBldmVudDtcblx0XHR9XG5cblx0XHR0aGlzLnNjcm9sbGJhci5zY3JvbGxUbygwLCB0YXJnZXRPZmZzZXQsIDkwMCk7XG5cdH1cblxuXHQvLyBEZXN0cm95XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy4kZWwub2ZmKCcuU21vb3RoU2Nyb2xsaW5nJyk7XG5cdFx0dGhpcy5wYXJhbGxheEVsZW1lbnRzID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZWxlbWVudHMgPSB7fTtcblxuXHRcdGlmICghdGhpcy5pc01vYmlsZSkge1xuXHRcdFx0dGhpcy5zY3JvbGxiYXIuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuaW1wb3J0IHsgdmlzaWJpbGl0eUFwaSB9IGZyb20gJy4uL3V0aWxzL3Zpc2liaWxpdHknO1xuaW1wb3J0IEFic3RyYWN0TW9kdWxlIGZyb20gJy4vQWJzdHJhY3RNb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEFic3RyYWN0TW9kdWxlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy4kbGFiZWwgPSB0aGlzLiRlbC5maW5kKCcuanMtbGFiZWwnKTtcblxuXHRcdHRoaXMuJGRvY3VtZW50Lm9uKCdUaXRsZS5jaGFuZ2VMYWJlbCcsIChldmVudCwgdmFsdWUpID0+IHtcblx0XHRcdHRoaXMuY2hhbmdlTGFiZWwodmFsdWUpO1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmhpZGRlbkNhbGxiYWNrSWRlbnQgPSB2aXNpYmlsaXR5QXBpKHtcblx0XHRcdGFjdGlvbjogJ2FkZENhbGxiYWNrJyxcblx0XHRcdHN0YXRlOiAnaGlkZGVuJyxcblx0XHRcdGNhbGxiYWNrOiB0aGlzLmxvZ0hpZGRlblxuXHRcdH0pO1xuXG5cdFx0dGhpcy52aXNpYmxlQ2FsbGJhY2tJZGVudCA9IHZpc2liaWxpdHlBcGkoe1xuXHRcdFx0YWN0aW9uOiAnYWRkQ2FsbGJhY2snLFxuXHRcdFx0c3RhdGU6ICd2aXNpYmxlJyxcblx0XHRcdGNhbGxiYWNrOiB0aGlzLmxvZ1Zpc2libGVcblx0XHR9KTtcblx0fVxuXG5cdGxvZ0hpZGRlbigpIHtcblx0XHRjb25zb2xlLmxvZygnVGl0bGUgaXMgaGlkZGVuJyk7XG5cdH1cblxuXHRsb2dWaXNpYmxlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdUaXRsZSBpcyB2aXNpYmxlJyk7XG5cdH1cblxuXHRjaGFuZ2VMYWJlbCh2YWx1ZSkge1xuXHRcdHRoaXMuJGxhYmVsLnRleHQodmFsdWUpO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLiRkb2N1bWVudC5vZmYoJ1RpdGxlLmNoYW5nZUxhYmVsJyk7XG5cblx0XHR2aXNpYmlsaXR5QXBpKHtcblx0XHRcdGFjdGlvbjogJ3JlbW92ZUNhbGxiYWNrJyxcblx0XHRcdHN0YXRlOiAnaGlkZGVuJyxcblx0XHRcdGlkZW50OiB0aGlzLmhpZGRlbkNhbGxiYWNrSWRlbnRcblx0XHR9KTtcblxuXHRcdHZpc2liaWxpdHlBcGkoe1xuXHRcdFx0YWN0aW9uOiAncmVtb3ZlQ2FsbGJhY2snLFxuXHRcdFx0c3RhdGU6ICd2aXNpYmxlJyxcblx0XHRcdGlkZW50OiB0aGlzLnZpc2libGVDYWxsYmFja0lkZW50XG5cdFx0fSk7XG5cblx0XHR0aGlzLiRlbC5vZmYoJy5UaXRsZScpO1xuXHR9XG59XG4iLCJjb25zdCBESVNUQU5DRV9USFJFU0hPTEQgPSA1OyAvLyBtYXhpbXVtIHBpeGVscyBwb2ludGVyIGNhbiBtb3ZlIGJlZm9yZSBjYW5jZWxcbmNvbnN0IFRJTUVfVEhSRVNIT0xEID0gNDAwOyAgIC8vIG1heGltdW0gbWlsbGlzZWNvbmRzIGJldHdlZW4gZG93biBhbmQgdXAgYmVmb3JlIGNhbmNlbFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YXAgKCBub2RlLCBjYWxsYmFjayApIHtcblx0cmV0dXJuIG5ldyBUYXBIYW5kbGVyKCBub2RlLCBjYWxsYmFjayApO1xufVxuXG5mdW5jdGlvbiBUYXBIYW5kbGVyICggbm9kZSwgY2FsbGJhY2sgKSB7XG5cdHRoaXMubm9kZSA9IG5vZGU7XG5cdHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHR0aGlzLnByZXZlbnRNb3VzZWRvd25FdmVudHMgPSBmYWxzZTtcblxuXHR0aGlzLmJpbmQoIG5vZGUgKTtcbn1cblxuVGFwSGFuZGxlci5wcm90b3R5cGUgPSB7XG5cdGJpbmQgKCBub2RlICkge1xuXHRcdC8vIGxpc3RlbiBmb3IgbW91c2UvcG9pbnRlciBldmVudHMuLi5cblx0XHRpZiAod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkge1xuXHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcmRvd24nLCBoYW5kbGVNb3VzZWRvd24sIGZhbHNlICk7XG5cdFx0fSBlbHNlIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcblx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlckRvd24nLCBoYW5kbGVNb3VzZWRvd24sIGZhbHNlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlZG93biwgZmFsc2UgKTtcblxuXHRcdFx0Ly8gLi4uYW5kIHRvdWNoIGV2ZW50c1xuXHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoc3RhcnQsIGZhbHNlICk7XG5cdFx0fVxuXG5cdFx0Ly8gbmF0aXZlIGJ1dHRvbnMsIGFuZCA8aW5wdXQgdHlwZT0nYnV0dG9uJz4gZWxlbWVudHMsIHNob3VsZCBmaXJlIGEgdGFwIGV2ZW50XG5cdFx0Ly8gd2hlbiB0aGUgc3BhY2Uga2V5IGlzIHByZXNzZWRcblx0XHRpZiAoIG5vZGUudGFnTmFtZSA9PT0gJ0JVVFRPTicgfHwgbm9kZS50eXBlID09PSAnYnV0dG9uJyApIHtcblx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgaGFuZGxlRm9jdXMsIGZhbHNlICk7XG5cdFx0fVxuXG5cdFx0bm9kZS5fX3RhcF9oYW5kbGVyX18gPSB0aGlzO1xuXHR9LFxuXG5cdGZpcmUgKCBldmVudCwgeCwgeSApIHtcblx0XHR0aGlzLmNhbGxiYWNrKHtcblx0XHRcdG5vZGU6IHRoaXMubm9kZSxcblx0XHRcdG9yaWdpbmFsOiBldmVudCxcblx0XHRcdHgsXG5cdFx0XHR5XG5cdFx0fSk7XG5cdH0sXG5cblx0bW91c2Vkb3duICggZXZlbnQgKSB7XG5cdFx0aWYgKCB0aGlzLnByZXZlbnRNb3VzZWRvd25FdmVudHMgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBldmVudC53aGljaCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LndoaWNoICE9PSAxICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHggPSBldmVudC5jbGllbnRYO1xuXHRcdGNvbnN0IHkgPSBldmVudC5jbGllbnRZO1xuXG5cdFx0Ly8gVGhpcyB3aWxsIGJlIG51bGwgZm9yIG1vdXNlIGV2ZW50cy5cblx0XHRjb25zdCBwb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XG5cblx0XHRjb25zdCBoYW5kbGVNb3VzZXVwID0gZXZlbnQgPT4ge1xuXHRcdFx0aWYgKCBldmVudC5wb2ludGVySWQgIT0gcG9pbnRlcklkICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZmlyZSggZXZlbnQsIHgsIHkgKTtcblx0XHRcdGNhbmNlbCgpO1xuXHRcdH07XG5cblx0XHRjb25zdCBoYW5kbGVNb3VzZW1vdmUgPSBldmVudCA9PiB7XG5cdFx0XHRpZiAoIGV2ZW50LnBvaW50ZXJJZCAhPSBwb2ludGVySWQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAoIE1hdGguYWJzKCBldmVudC5jbGllbnRYIC0geCApID49IERJU1RBTkNFX1RIUkVTSE9MRCApIHx8ICggTWF0aC5hYnMoIGV2ZW50LmNsaWVudFkgLSB5ICkgPj0gRElTVEFOQ0VfVEhSRVNIT0xEICkgKSB7XG5cdFx0XHRcdGNhbmNlbCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb25zdCBjYW5jZWwgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlclVwJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJNb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlckNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblx0XHRcdHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIGhhbmRsZU1vdXNlbW92ZSwgZmFsc2UgKTtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVyY2FuY2VsJywgY2FuY2VsLCBmYWxzZSApO1xuXHRcdFx0dGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIGhhbmRsZU1vdXNldXAsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdH07XG5cblx0XHRpZiAoIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgKSB7XG5cdFx0XHR0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIGhhbmRsZU1vdXNldXAsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcm1vdmUnLCBoYW5kbGVNb3VzZW1vdmUsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcmNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblx0XHR9IGVsc2UgaWYgKCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgKSB7XG5cdFx0XHR0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlclVwJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJNb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlckNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGhhbmRsZU1vdXNldXAsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdH1cblxuXHRcdHNldFRpbWVvdXQoIGNhbmNlbCwgVElNRV9USFJFU0hPTEQgKTtcblx0fSxcblxuXHR0b3VjaGRvd24gKCBldmVudCApIHtcblx0XHRjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG5cblx0XHRjb25zdCB4ID0gdG91Y2guY2xpZW50WDtcblx0XHRjb25zdCB5ID0gdG91Y2guY2xpZW50WTtcblxuXHRcdGNvbnN0IGZpbmdlciA9IHRvdWNoLmlkZW50aWZpZXI7XG5cblx0XHRjb25zdCBoYW5kbGVUb3VjaHVwID0gZXZlbnQgPT4ge1xuXHRcdFx0Y29uc3QgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdFx0aWYgKCB0b3VjaC5pZGVudGlmaWVyICE9PSBmaW5nZXIgKSB7XG5cdFx0XHRcdGNhbmNlbCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgY29tcGF0aWJpbGl0eSBtb3VzZSBldmVudFxuXG5cdFx0XHQvLyBmb3IgdGhlIGJlbmVmaXQgb2YgbW9iaWxlIEZpcmVmb3ggYW5kIG9sZCBBbmRyb2lkIGJyb3dzZXJzLCB3ZSBuZWVkIHRoaXMgYWJzdXJkIGhhY2suXG5cdFx0XHR0aGlzLnByZXZlbnRNb3VzZWRvd25FdmVudHMgPSB0cnVlO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KCB0aGlzLnByZXZlbnRNb3VzZWRvd25UaW1lb3V0ICk7XG5cblx0XHRcdHRoaXMucHJldmVudE1vdXNlZG93blRpbWVvdXQgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucHJldmVudE1vdXNlZG93bkV2ZW50cyA9IGZhbHNlO1xuXHRcdFx0fSwgNDAwICk7XG5cblx0XHRcdHRoaXMuZmlyZSggZXZlbnQsIHgsIHkgKTtcblx0XHRcdGNhbmNlbCgpO1xuXHRcdH07XG5cblx0XHRjb25zdCBoYW5kbGVUb3VjaG1vdmUgPSBldmVudCA9PiB7XG5cdFx0XHRpZiAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoICE9PSAxIHx8IGV2ZW50LnRvdWNoZXNbMF0uaWRlbnRpZmllciAhPT0gZmluZ2VyICkge1xuXHRcdFx0XHRjYW5jZWwoKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuXHRcdFx0aWYgKCAoIE1hdGguYWJzKCB0b3VjaC5jbGllbnRYIC0geCApID49IERJU1RBTkNFX1RIUkVTSE9MRCApIHx8ICggTWF0aC5hYnMoIHRvdWNoLmNsaWVudFkgLSB5ICkgPj0gRElTVEFOQ0VfVEhSRVNIT0xEICkgKSB7XG5cdFx0XHRcdGNhbmNlbCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb25zdCBjYW5jZWwgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2h1cCwgZmFsc2UgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgaGFuZGxlVG91Y2htb3ZlLCBmYWxzZSApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblx0XHR9O1xuXG5cdFx0dGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIGhhbmRsZVRvdWNodXAsIGZhbHNlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaG1vdmUsIGZhbHNlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblxuXHRcdHNldFRpbWVvdXQoIGNhbmNlbCwgVElNRV9USFJFU0hPTEQgKTtcblx0fSxcblxuXHR0ZWFyZG93biAoKSB7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcblxuXHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgICBoYW5kbGVNb3VzZWRvd24sIGZhbHNlICk7XG5cdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnTVNQb2ludGVyRG93bicsIGhhbmRsZU1vdXNlZG93biwgZmFsc2UgKTtcblx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCAgICAgaGFuZGxlTW91c2Vkb3duLCBmYWxzZSApO1xuXHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCAgICBoYW5kbGVUb3VjaHN0YXJ0LCBmYWxzZSApO1xuXHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgICAgICAgICBoYW5kbGVGb2N1cywgZmFsc2UgKTtcblx0fVxufTtcblxuZnVuY3Rpb24gaGFuZGxlTW91c2Vkb3duICggZXZlbnQgKSB7XG5cdHRoaXMuX190YXBfaGFuZGxlcl9fLm1vdXNlZG93biggZXZlbnQgKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlVG91Y2hzdGFydCAoIGV2ZW50ICkge1xuXHR0aGlzLl9fdGFwX2hhbmRsZXJfXy50b3VjaGRvd24oIGV2ZW50ICk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvY3VzICgpIHtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleWRvd24sIGZhbHNlICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBoYW5kbGVCbHVyLCBmYWxzZSApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCbHVyICgpIHtcblx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleWRvd24sIGZhbHNlICk7XG5cdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBoYW5kbGVCbHVyLCBmYWxzZSApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVLZXlkb3duICggZXZlbnQgKSB7XG5cdGlmICggZXZlbnQud2hpY2ggPT09IDMyICkgeyAvLyBzcGFjZSBrZXlcblx0XHR0aGlzLl9fdGFwX2hhbmRsZXJfXy5maXJlKCk7XG5cdH1cbn1cbiIsInZhciBERUZBVUxUUyA9IHtcblx0ZGVsYXk6IDAsXG5cdGR1cmF0aW9uOiAzMDAsXG5cdGVhc2luZzogJ2xpbmVhcidcbn07XG5cbmZ1bmN0aW9uIGZhZGUodCwgcGFyYW1zKSB7XG5cdHZhciB0YXJnZXRPcGFjaXR5O1xuXG5cdHBhcmFtcyA9IHQucHJvY2Vzc1BhcmFtcyhwYXJhbXMsIERFRkFVTFRTKTtcblxuXHRpZiAodC5pc0ludHJvKSB7XG5cdFx0dGFyZ2V0T3BhY2l0eSA9IHQuZ2V0U3R5bGUoJ29wYWNpdHknKTtcblx0XHR0LnNldFN0eWxlKCdvcGFjaXR5JywgMCk7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0T3BhY2l0eSA9IDA7XG5cdH1cblx0dC5hbmltYXRlU3R5bGUoJ29wYWNpdHknLCB0YXJnZXRPcGFjaXR5LCBwYXJhbXMpLnRoZW4odC5jb21wbGV0ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZhZGU7XG4iLCJpbXBvcnQgeyBtaW5XaWR0aCB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxudmFyIGlzQW5pbWF0aW5nID0gZmFsc2U7XG52YXIgaGVhZGVyT2Zmc2V0O1xudmFyIHNwZWVkID0gMzAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcblx0aWYgKCRlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ICYmICRlbGVtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRpZiAoaXNBbmltYXRpbmcgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogJyArIG1pbldpZHRoICsgJ3B4KScpLm1hdGNoZXMpIHtcblx0XHRcdFx0aGVhZGVyT2Zmc2V0ID0gNzA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWFkZXJPZmZzZXQgPSA5MDtcblx0XHRcdH1cblxuXHRcdFx0aXNBbmltYXRpbmcgPSB0cnVlO1xuXG5cdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRcdHNjcm9sbFRvcDogJGVsZW1lbnQub2Zmc2V0KCkudG9wIC0gaGVhZGVyT2Zmc2V0XG5cdFx0XHR9LCBzcGVlZCwgJ3N3aW5nJywgKCkgPT4ge1xuXHRcdFx0XHRpc0FuaW1hdGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi9pcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0FycmF5ICggYXJyYXksIHZhbHVlICkge1xuXHR2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKCB2YWx1ZSApO1xuXG5cdGlmICggaW5kZXggPT09IC0xICkge1xuXHRcdGFycmF5LnB1c2goIHZhbHVlICk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5Q29udGFpbnMgKCBhcnJheSwgdmFsdWUgKSB7XG5cdGZvciAoIGxldCBpID0gMCwgYyA9IGFycmF5Lmxlbmd0aDsgaSA8IGM7IGkrKyApIHtcblx0XHRpZiAoIGFycmF5W2ldID09IHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlDb250ZW50c01hdGNoICggYSwgYiApIHtcblx0dmFyIGk7XG5cblx0aWYgKCAhaXNBcnJheSggYSApIHx8ICFpc0FycmF5KCBiICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKCBhLmxlbmd0aCAhPT0gYi5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aSA9IGEubGVuZ3RoO1xuXHR3aGlsZSAoIGktLSApIHtcblx0XHRpZiAoIGFbaV0gIT09IGJbaV0gKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSAoIHggKSB7XG5cdGlmICggdHlwZW9mIHggPT09ICdzdHJpbmcnICkge1xuXHRcdHJldHVybiBbIHggXTtcblx0fVxuXG5cdGlmICggeCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFzdEl0ZW0gKCBhcnJheSApIHtcblx0cmV0dXJuIGFycmF5WyBhcnJheS5sZW5ndGggLSAxIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tQXJyYXkgKCBhcnJheSwgbWVtYmVyICkge1xuXHRpZiAoICFhcnJheSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBpbmRleCA9IGFycmF5LmluZGV4T2YoIG1lbWJlciApO1xuXG5cdGlmICggaW5kZXggIT09IC0xICkge1xuXHRcdGFycmF5LnNwbGljZSggaW5kZXgsIDEgKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheSAoIGFycmF5TGlrZSApIHtcblx0dmFyIGFycmF5ID0gW10sIGkgPSBhcnJheUxpa2UubGVuZ3RoO1xuXHR3aGlsZSAoIGktLSApIHtcblx0XHRhcnJheVtpXSA9IGFycmF5TGlrZVtpXTtcblx0fVxuXG5cdHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUtleVZhbHVlKCBhcnJheSwga2V5LCB2YWx1ZSApIHtcblx0cmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmpba2V5XSA9PT0gdmFsdWU7XG5cdH0pO1xufVxuIiwiY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGh0bWwgPSAkKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5jb25zdCAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSk7XG5cbmNvbnN0IG1pbldpZHRoID0gMTAyNDtcblxuZXhwb3J0IHsgJGRvY3VtZW50LCAkd2luZG93LCAkaHRtbCwgJGJvZHkgfTtcbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCBQYWdlVHJhbnNpdGlvbnNNYW5hZ2VyIGZyb20gJy4uL21vZHVsZXMvUGFnZVRyYW5zaXRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHR3aW5kb3cuUmFjdGl2ZS5ERUJVRyA9IGZhbHNlO1xuXHRzdmc0ZXZlcnlib2R5KCk7XG5cblx0dmFyIHBhZ2V0cmFuc2l0aW9uc01hbmFnZXIgPSBuZXcgUGFnZVRyYW5zaXRpb25zTWFuYWdlcigpO1xufVxuIiwiLyoqXG4gKiBAc2VlICBodHRwczovL2dpdGh1Yi5jb20vcmFjdGl2ZWpzL3JhY3RpdmUvYmxvYi9kZXYvc3JjL3V0aWxzL2h0bWwuanNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbi8qKlxuICogUHJlcGFyZSBIVE1MIGNvbnRlbnQgdGhhdCBjb250YWlucyBtdXN0YWNoZSBjaGFyYWN0ZXJzIGZvciB1c2Ugd2l0aCBSYWN0aXZlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVIdG1sKHN0cikge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnJlcGxhY2UoLyZsdDsvZywgJzwnKVxuICAgICAgICAucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG4gICAgICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufVxuXG4vKipcbiAqIEdldCBlbGVtZW50IGRhdGEgYXR0cmlidXRlc1xuICogQHBhcmFtICAge0RPTUVsZW1lbnR9ICBub2RlXG4gKiBAcmV0dXJuICB7QXJyYXl9ICAgICAgIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVEYXRhKG5vZGUpIHtcbiAgICAvLyBBbGwgYXR0cmlidXRlc1xuICAgIHZhciBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgLy8gUmVnZXggUGF0dGVyblxuICAgIHZhciBwYXR0ZXJuID0gL15kYXRhXFwtKC4rKSQvO1xuXG4gICAgLy8gT3V0cHV0XG4gICAgdmFyIGRhdGEgPSB7fTtcblxuICAgIGZvciAobGV0IGkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbaV0pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXR0cmlidXRlcyBuYW1lIChleDogZGF0YS1tb2R1bGUpXG4gICAgICAgIGxldCBuYW1lID0gYXR0cmlidXRlc1tpXS5uYW1lO1xuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucy5cbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXRjaCA9IG5hbWUubWF0Y2gocGF0dGVybik7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyB0aHJvd3MgYW4gZXJyb3IsIHlvdSBoYXZlIHNvbWVcbiAgICAgICAgLy8gc2VyaW91cyBwcm9ibGVtcyBpbiB5b3VyIEhUTUwuXG4gICAgICAgIGRhdGFbbWF0Y2hbMV1dID0gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHRhcnJheUxpa2VQYXR0ZXJuID0gL15cXFtvYmplY3QgKD86QXJyYXl8RmlsZUxpc3QpXFxdJC87XG5cbi8vIHRoYW5rcywgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vaW5zdGFuY2VvZi1jb25zaWRlcmVkLWhhcm1mdWwtb3ItaG93LXRvLXdyaXRlLWEtcm9idXN0LWlzYXJyYXkvXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAoIHRoaW5nICkge1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbCggdGhpbmcgKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXlMaWtlICggb2JqICkge1xuXHRyZXR1cm4gYXJyYXlMaWtlUGF0dGVybi50ZXN0KCB0b1N0cmluZy5jYWxsKCBvYmogKSApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbCAoIGEsIGIgKSB7XG5cdGlmICggYSA9PT0gbnVsbCAmJiBiID09PSBudWxsICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCB0eXBlb2YgYSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgPT09ICdvYmplY3QnICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBhID09PSBiO1xufVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MDgyL3ZhbGlkYXRlLW51bWJlcnMtaW4tamF2YXNjcmlwdC1pc251bWVyaWNcbmV4cG9ydCBmdW5jdGlvbiBpc051bWVyaWMgKCB0aGluZyApIHtcblx0cmV0dXJuICFpc05hTiggcGFyc2VGbG9hdCggdGhpbmcgKSApICYmIGlzRmluaXRlKCB0aGluZyApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QgKCB0aGluZyApIHtcblx0cmV0dXJuICggdGhpbmcgJiYgdG9TdHJpbmcuY2FsbCggdGhpbmcgKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oIHRoaW5nICkge1xuXHR2YXIgZ2V0VHlwZSA9IHt9O1xuXHRyZXR1cm4gdGhpbmcgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzJztcbmltcG9ydCB7IGFycmF5Q29udGFpbnMsIGZpbmRCeUtleVZhbHVlLCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cbmNvbnN0IENBTExCQUNLUyA9IHtcblx0aGlkZGVuOiBbXSxcblx0dmlzaWJsZTogW11cbn07XG5cbmNvbnN0IEFDVElPTlMgPSBbXG5cdCdhZGRDYWxsYmFjaycsXG5cdCdyZW1vdmVDYWxsYmFjaydcbl07XG5cbmNvbnN0IFNUQVRFUyA9IFtcblx0J3Zpc2libGUnLFxuXHQnaGlkZGVuJ1xuXTtcblxuY29uc3QgUFJFRklYID0gJ3YtJztcblxubGV0IFVVSUQgPSAwO1xuXG4vLyBNYWluIGV2ZW50XG4kZG9jdW1lbnQub24oJ3Zpc2liaWxpdHljaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuXHRpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG5cdFx0b25Eb2N1bWVudENoYW5nZSgnaGlkZGVuJyk7XG5cdH0gZWxzZSB7XG5cdFx0b25Eb2N1bWVudENoYW5nZSgndmlzaWJsZScpO1xuXHR9XG59KTtcblxuLyoqXG4gKiBBZGQgYSBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9ICAgc3RhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBpZGVudFxuICovXG5mdW5jdGlvbiBhZGRDYWxsYmFjayAoc3RhdGUsIG9wdGlvbnMpIHtcblx0bGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayB8fCAnJztcblxuXHRpZiAoIWlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG5cdFx0Y29uc29sZS53YXJuKCdDYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBpZGVudCA9IFBSRUZJWCArIFVVSUQrKztcblxuXHRDQUxMQkFDS1Nbc3RhdGVdLnB1c2goe1xuXHRcdGlkZW50OiBpZGVudCxcblx0XHRjYWxsYmFjazogY2FsbGJhY2tcblx0fSk7XG5cblx0cmV0dXJuIGlkZW50O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNhbGxiYWNrXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgc3RhdGUgIFZpc2libGUgb3IgaGlkZGVuXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgaWRlbnQgIFVuaXF1ZSBpZGVudGlmaWVyXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgIElmIG9wZXJhdGlvbiB3YXMgYSBzdWNjZXNzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrIChzdGF0ZSwgb3B0aW9ucykge1xuXHRsZXQgaWRlbnQgPSBvcHRpb25zLmlkZW50IHx8ICcnO1xuXG5cdGlmICh0eXBlb2YoaWRlbnQpID09PSAndW5kZWZpbmVkJyB8fCBpZGVudCA9PT0gJycpIHtcblx0XHRjb25zb2xlLndhcm4oJ05lZWQgaWRlbnQgdG8gcmVtb3ZlIGNhbGxiYWNrJyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bGV0IGluZGV4ID0gZmluZEJ5S2V5VmFsdWUoQ0FMTEJBQ0tTW3N0YXRlXSwgJ2lkZW50JywgaWRlbnQpWzBdO1xuXG5cdC8vIGNvbnNvbGUubG9nKGlkZW50KVxuXHQvLyBjb25zb2xlLmxvZyhDQUxMQkFDS1Nbc3RhdGVdKVxuXG5cdGlmICh0eXBlb2YoaW5kZXgpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHJlbW92ZUZyb21BcnJheShDQUxMQkFDS1Nbc3RhdGVdLCBpbmRleCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKCdDYWxsYmFjayBjb3VsZCBub3QgYmUgZm91bmQnKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiBXaGVuIGRvY3VtZW50IHN0YXRlIGNoYW5nZXMsIHRyaWdnZXIgY2FsbGJhY2tzXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdGF0ZSAgVmlzaWJsZSBvciBoaWRkZW5cbiAqL1xuZnVuY3Rpb24gb25Eb2N1bWVudENoYW5nZSAoc3RhdGUpIHtcblx0bGV0IGNhbGxiYWNrQXJyYXkgPSBDQUxMQkFDS1Nbc3RhdGVdO1xuXHRsZXQgaSA9IDA7XG5cdGxldCBsZW4gPSBjYWxsYmFja0FycmF5Lmxlbmd0aDtcblxuXHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Y2FsbGJhY2tBcnJheVtpXS5jYWxsYmFjaygpO1xuXHR9XG59XG5cbi8qKlxuICogUHVibGljIGZhY2luZyBBUEkgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgY2FsbGJhY2tzXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICAgICAgICAgb3B0aW9ucyAgT3B0aW9uc1xuICogQHJldHVybiAge2Jvb2xlYW58aW50ZWdlcn0gICAgICAgICAgIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY2FsbGJhY2sgb3IgYm9vbGVhbiBpbmRpY2F0aW5nIHN1Y2Nlc3Mgb3IgZmFpbHVyZVxuICovXG5mdW5jdGlvbiB2aXNpYmlsaXR5QXBpIChvcHRpb25zKSB7XG5cdGxldCBhY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCAnJztcblx0bGV0IHN0YXRlID0gb3B0aW9ucy5zdGF0ZSB8fCAnJztcblx0bGV0IHJldDtcblxuXHQvLyBUeXBlIGFuZCB2YWx1ZSBjaGVja2luZ1xuXHRpZiAoIWFycmF5Q29udGFpbnMoQUNUSU9OUywgYWN0aW9uKSkge1xuXHRcdGNvbnNvbGUud2FybignQWN0aW9uIGRvZXMgbm90IGV4aXN0Jyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICghYXJyYXlDb250YWlucyhTVEFURVMsIHN0YXRlKSkge1xuXHRcdGNvbnNvbGUud2FybignU3RhdGUgZG9lcyBub3QgZXhpc3QnKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBAdG9kbyBNYWdpYyBjYWxsIGZ1bmN0aW9uIHBsc1xuXHRpZiAoYWN0aW9uID09PSAnYWRkQ2FsbGJhY2snKSB7XG5cdFx0cmV0ID0gYWRkQ2FsbGJhY2soc3RhdGUsIG9wdGlvbnMpO1xuXHR9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZUNhbGxiYWNrJykge1xuXHRcdHJldCA9IHJlbW92ZUNhbGxiYWNrKHN0YXRlLCBvcHRpb25zKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCB7IHZpc2liaWxpdHlBcGkgfTtcbiIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQmFyYmFcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQmFyYmFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQmFyYmFcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvZGlzdFwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly9Qcm9taXNlIHBvbHlmaWxsIGh0dHBzOi8vZ2l0aHViLmNvbS90YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsXG5cdFxuXHRpZiAodHlwZW9mIFByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcblx0IHdpbmRvdy5Qcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblx0fVxuXHRcblx0dmFyIEJhcmJhID0ge1xuXHQgIHZlcnNpb246ICcxLjAuMCcsXG5cdCAgQmFzZVRyYW5zaXRpb246IF9fd2VicGFja19yZXF1aXJlX18oNCksXG5cdCAgQmFzZVZpZXc6IF9fd2VicGFja19yZXF1aXJlX18oNiksXG5cdCAgQmFzZUNhY2hlOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLFxuXHQgIERpc3BhdGNoZXI6IF9fd2VicGFja19yZXF1aXJlX18oNyksXG5cdCAgSGlzdG9yeU1hbmFnZXI6IF9fd2VicGFja19yZXF1aXJlX18oOSksXG5cdCAgUGpheDogX193ZWJwYWNrX3JlcXVpcmVfXygxMCksXG5cdCAgUHJlZmV0Y2g6IF9fd2VicGFja19yZXF1aXJlX18oMTMpLFxuXHQgIFV0aWxzOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEJhcmJhO1xuXG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oc2V0SW1tZWRpYXRlKSB7KGZ1bmN0aW9uIChyb290KSB7XG5cdFxuXHQgIC8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG5cdCAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG5cdCAgdmFyIHNldFRpbWVvdXRGdW5jID0gc2V0VGltZW91dDtcblx0XG5cdCAgZnVuY3Rpb24gbm9vcCgpIHtcblx0ICB9XG5cdFxuXHQgIC8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuXHQgIHZhciBhc2FwID0gKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicgJiYgc2V0SW1tZWRpYXRlKSB8fFxuXHQgICAgZnVuY3Rpb24gKGZuKSB7XG5cdCAgICAgIHNldFRpbWVvdXRGdW5jKGZuLCAwKTtcblx0ICAgIH07XG5cdFxuXHQgIHZhciBvblVuaGFuZGxlZFJlamVjdGlvbiA9IGZ1bmN0aW9uIG9uVW5oYW5kbGVkUmVqZWN0aW9uKGVycikge1xuXHQgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG5cdCAgICAgIGNvbnNvbGUud2FybignUG9zc2libGUgVW5oYW5kbGVkIFByb21pc2UgUmVqZWN0aW9uOicsIGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHQgICAgfVxuXHQgIH07XG5cdFxuXHQgIC8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHQgIGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG5cdCAgICB9O1xuXHQgIH1cblx0XG5cdCAgZnVuY3Rpb24gUHJvbWlzZShmbikge1xuXHQgICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG5cdCAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuXHQgICAgdGhpcy5fc3RhdGUgPSAwO1xuXHQgICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuXHQgICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG5cdCAgICB0aGlzLl9kZWZlcnJlZHMgPSBbXTtcblx0XG5cdCAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xuXHQgIH1cblx0XG5cdCAgZnVuY3Rpb24gaGFuZGxlKHNlbGYsIGRlZmVycmVkKSB7XG5cdCAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcblx0ICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuXHQgICAgfVxuXHQgICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG5cdCAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG5cdCAgICBhc2FwKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG5cdCAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuXHQgICAgICAgIChzZWxmLl9zdGF0ZSA9PT0gMSA/IHJlc29sdmUgOiByZWplY3QpKGRlZmVycmVkLnByb21pc2UsIHNlbGYuX3ZhbHVlKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblx0ICAgICAgdmFyIHJldDtcblx0ICAgICAgdHJ5IHtcblx0ICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG5cdCAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cdCAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcblx0ICAgIH0pO1xuXHQgIH1cblx0XG5cdCAgZnVuY3Rpb24gcmVzb2x2ZShzZWxmLCBuZXdWYWx1ZSkge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcblx0ICAgICAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuXHQgICAgICBpZiAobmV3VmFsdWUgJiYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKSkge1xuXHQgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcblx0ICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdCAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XG5cdCAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHQgICAgICAgICAgZmluYWxlKHNlbGYpO1xuXHQgICAgICAgICAgcmV0dXJuO1xuXHQgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG5cdCAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHNlbGYuX3N0YXRlID0gMTtcblx0ICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcblx0ICAgICAgZmluYWxlKHNlbGYpO1xuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICByZWplY3Qoc2VsZiwgZSk7XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiByZWplY3Qoc2VsZiwgbmV3VmFsdWUpIHtcblx0ICAgIHNlbGYuX3N0YXRlID0gMjtcblx0ICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdCAgICBmaW5hbGUoc2VsZik7XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiBmaW5hbGUoc2VsZikge1xuXHQgICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcblx0ICAgICAgYXNhcChmdW5jdGlvbigpIHtcblx0ICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcblx0ICAgICAgICAgIG9uVW5oYW5kbGVkUmVqZWN0aW9uKHNlbGYuX3ZhbHVlKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0pO1xuXHQgICAgfVxuXHRcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG5cdCAgICB9XG5cdCAgICBzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xuXHQgIH1cblx0XG5cdCAgZnVuY3Rpb24gSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuXHQgICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcblx0ICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG5cdCAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuXHQgIH1cblx0XG5cdCAgLyoqXG5cdCAgICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcblx0ICAgKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cblx0ICAgKlxuXHQgICAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cblx0ICAgKi9cblx0ICBmdW5jdGlvbiBkb1Jlc29sdmUoZm4sIHNlbGYpIHtcblx0ICAgIHZhciBkb25lID0gZmFsc2U7XG5cdCAgICB0cnkge1xuXHQgICAgICBmbihmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuXHQgICAgICAgIGRvbmUgPSB0cnVlO1xuXHQgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuXHQgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG5cdCAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcblx0ICAgICAgICBkb25lID0gdHJ1ZTtcblx0ICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcblx0ICAgICAgfSk7XG5cdCAgICB9IGNhdGNoIChleCkge1xuXHQgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuXHQgICAgICBkb25lID0gdHJ1ZTtcblx0ICAgICAgcmVqZWN0KHNlbGYsIGV4KTtcblx0ICAgIH1cblx0ICB9XG5cdFxuXHQgIFByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcblx0ICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG5cdCAgfTtcblx0XG5cdCAgUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHQgICAgdmFyIHByb20gPSBuZXcgKHRoaXMuY29uc3RydWN0b3IpKG5vb3ApO1xuXHRcblx0ICAgIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbSkpO1xuXHQgICAgcmV0dXJuIHByb207XG5cdCAgfTtcblx0XG5cdCAgUHJvbWlzZS5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdCAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cdFxuXHQgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0ICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG5cdCAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblx0XG5cdCAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0ICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgdGhlbi5jYWxsKHZhbCwgZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG5cdCAgICAgICAgICAgICAgfSwgcmVqZWN0KTtcblx0ICAgICAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgIH1cblx0ICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG5cdCAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcblx0ICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9IGNhdGNoIChleCkge1xuXHQgICAgICAgICAgcmVqZWN0KGV4KTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cdCAgfTtcblx0XG5cdCAgUHJvbWlzZS5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuXHQgICAgICByZXR1cm4gdmFsdWU7XG5cdCAgICB9XG5cdFxuXHQgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdCAgICAgIHJlc29sdmUodmFsdWUpO1xuXHQgICAgfSk7XG5cdCAgfTtcblx0XG5cdCAgUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICAgIHJlamVjdCh2YWx1ZSk7XG5cdCAgICB9KTtcblx0ICB9O1xuXHRcblx0ICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cdCAgfTtcblx0XG5cdCAgLyoqXG5cdCAgICogU2V0IHRoZSBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBjYWxsYmFja3Ncblx0ICAgKiBAcGFyYW0gZm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0byBleGVjdXRlXG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBQcm9taXNlLl9zZXRJbW1lZGlhdGVGbiA9IGZ1bmN0aW9uIF9zZXRJbW1lZGlhdGVGbihmbikge1xuXHQgICAgYXNhcCA9IGZuO1xuXHQgIH07XG5cdFxuXHQgIFByb21pc2UuX3NldFVuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3NldFVuaGFuZGxlZFJlamVjdGlvbkZuKGZuKSB7XG5cdCAgICBvblVuaGFuZGxlZFJlamVjdGlvbiA9IGZuO1xuXHQgIH07XG5cdFxuXHQgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHQgICAgbW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXHQgIH0gZWxzZSBpZiAoIXJvb3QuUHJvbWlzZSkge1xuXHQgICAgcm9vdC5Qcm9taXNlID0gUHJvbWlzZTtcblx0ICB9XG5cdFxuXHR9KSh0aGlzKTtcblx0XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLnNldEltbWVkaWF0ZSkpXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oc2V0SW1tZWRpYXRlLCBjbGVhckltbWVkaWF0ZSkge3ZhciBuZXh0VGljayA9IF9fd2VicGFja19yZXF1aXJlX18oMykubmV4dFRpY2s7XG5cdHZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblx0dmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXHR2YXIgaW1tZWRpYXRlSWRzID0ge307XG5cdHZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXHRcblx0Ly8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3Ncblx0XG5cdGV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcblx0fTtcblx0ZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuXHQgIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xuXHR9O1xuXHRleHBvcnRzLmNsZWFyVGltZW91dCA9XG5cdGV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXHRcblx0ZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuXHQgIHRoaXMuX2lkID0gaWQ7XG5cdCAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG5cdH1cblx0VGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuXHRUaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuXHQgIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcblx0fTtcblx0XG5cdC8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuXHRleHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG5cdCAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXHQgIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG5cdH07XG5cdFxuXHRleHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuXHQgIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblx0ICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xuXHR9O1xuXHRcblx0ZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0ICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cdFxuXHQgIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuXHQgIGlmIChtc2VjcyA+PSAwKSB7XG5cdCAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG5cdCAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG5cdCAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG5cdCAgICB9LCBtc2Vjcyk7XG5cdCAgfVxuXHR9O1xuXHRcblx0Ly8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5cdGV4cG9ydHMuc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogZnVuY3Rpb24oZm4pIHtcblx0ICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcblx0ICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cdFxuXHQgIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXHRcblx0ICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xuXHQgICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcblx0ICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuXHQgICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxuXHQgICAgICBpZiAoYXJncykge1xuXHQgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZuLmNhbGwobnVsbCk7XG5cdCAgICAgIH1cblx0ICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXG5cdCAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuXHQgICAgfVxuXHQgIH0pO1xuXHRcblx0ICByZXR1cm4gaWQ7XG5cdH07XG5cdFxuXHRleHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG5cdCAgZGVsZXRlIGltbWVkaWF0ZUlkc1tpZF07XG5cdH07XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLnNldEltbWVkaWF0ZSwgX193ZWJwYWNrX3JlcXVpcmVfXygyKS5jbGVhckltbWVkaWF0ZSkpXG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblx0XG5cdHZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblx0XG5cdC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuXHQvLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcblx0Ly8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuXHQvLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXHRcblx0dmFyIGNhY2hlZFNldFRpbWVvdXQ7XG5cdHZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cdFxuXHQoZnVuY3Rpb24gKCkge1xuXHQgIHRyeSB7XG5cdCAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcblx0ICB9IGNhdGNoIChlKSB7XG5cdCAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcblx0ICAgIH1cblx0ICB9XG5cdCAgdHJ5IHtcblx0ICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcblx0ICB9IGNhdGNoIChlKSB7XG5cdCAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG5cdCAgICB9XG5cdCAgfVxuXHR9ICgpKVxuXHR2YXIgcXVldWUgPSBbXTtcblx0dmFyIGRyYWluaW5nID0gZmFsc2U7XG5cdHZhciBjdXJyZW50UXVldWU7XG5cdHZhciBxdWV1ZUluZGV4ID0gLTE7XG5cdFxuXHRmdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG5cdCAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICBkcmFpbmluZyA9IGZhbHNlO1xuXHQgICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcblx0ICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG5cdCAgICB9XG5cdCAgICBpZiAocXVldWUubGVuZ3RoKSB7XG5cdCAgICAgICAgZHJhaW5RdWV1ZSgpO1xuXHQgICAgfVxuXHR9XG5cdFxuXHRmdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuXHQgICAgaWYgKGRyYWluaW5nKSB7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgdmFyIHRpbWVvdXQgPSBjYWNoZWRTZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG5cdCAgICBkcmFpbmluZyA9IHRydWU7XG5cdFxuXHQgICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblx0ICAgIHdoaWxlKGxlbikge1xuXHQgICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuXHQgICAgICAgIHF1ZXVlID0gW107XG5cdCAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuXHQgICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG5cdCAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuXHQgICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblx0ICAgIH1cblx0ICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG5cdCAgICBkcmFpbmluZyA9IGZhbHNlO1xuXHQgICAgY2FjaGVkQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHR9XG5cdFxuXHRwcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuXHQgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuXHQgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcblx0ICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG5cdCAgICAgICAgY2FjaGVkU2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcblx0ICAgIH1cblx0fTtcblx0XG5cdC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblx0ZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG5cdCAgICB0aGlzLmZ1biA9IGZ1bjtcblx0ICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcblx0fVxuXHRJdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcblx0fTtcblx0cHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcblx0cHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcblx0cHJvY2Vzcy5lbnYgPSB7fTtcblx0cHJvY2Vzcy5hcmd2ID0gW107XG5cdHByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXHRwcm9jZXNzLnZlcnNpb25zID0ge307XG5cdFxuXHRmdW5jdGlvbiBub29wKCkge31cblx0XG5cdHByb2Nlc3Mub24gPSBub29wO1xuXHRwcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcblx0cHJvY2Vzcy5vbmNlID0gbm9vcDtcblx0cHJvY2Vzcy5vZmYgPSBub29wO1xuXHRwcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcblx0cHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xuXHRwcm9jZXNzLmVtaXQgPSBub29wO1xuXHRcblx0cHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblx0fTtcblx0XG5cdHByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5cdHByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHR9O1xuXHRwcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgVXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHRcblx0LyoqXG5cdCAqIEJhc2VUcmFuc2l0aW9uIHRvIGV4dGVuZFxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHR2YXIgQmFzZVRyYW5zaXRpb24gPSB7XG5cdCAgLyoqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuXHQgICAqL1xuXHQgIG9sZENvbnRhaW5lcjogdW5kZWZpbmVkLFxuXHRcblx0ICAvKipcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVRyYW5zaXRpb25cblx0ICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdCAgICovXG5cdCAgbmV3Q29udGFpbmVyOiB1bmRlZmluZWQsXG5cdFxuXHQgIC8qKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgICAqIEB0eXBlIHtQcm9taXNlfVxuXHQgICAqL1xuXHQgIG5ld0NvbnRhaW5lckxvYWRpbmc6IHVuZGVmaW5lZCxcblx0XG5cdCAgLyoqXG5cdCAgICogSGVscGVyIHRvIGV4dGVuZCB0aGUgb2JqZWN0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVRyYW5zaXRpb25cblx0ICAgKiBAcGFyYW0gIHtPYmplY3R9IG5ld09iamVjdFxuXHQgICAqIEByZXR1cm4ge09iamVjdH0gbmV3SW5oZXJpdE9iamVjdFxuXHQgICAqL1xuXHQgIGV4dGVuZDogZnVuY3Rpb24ob2JqKXtcblx0ICAgIHJldHVybiBVdGlscy5leHRlbmQodGhpcywgb2JqKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmcm9tIFBqYXggbW9kdWxlIHRvIGluaXRpYWxpemVcblx0ICAgKiB0aGUgdHJhbnNpdGlvbi5cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG9sZENvbnRhaW5lclxuXHQgICAqIEBwYXJhbSAge1Byb21pc2V9IG5ld0NvbnRhaW5lclxuXHQgICAqIEByZXR1cm4ge1Byb21pc2V9XG5cdCAgICovXG5cdCAgaW5pdDogZnVuY3Rpb24ob2xkQ29udGFpbmVyLCBuZXdDb250YWluZXIpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cdFxuXHQgICAgdGhpcy5vbGRDb250YWluZXIgPSBvbGRDb250YWluZXI7XG5cdCAgICB0aGlzLl9uZXdDb250YWluZXJQcm9taXNlID0gbmV3Q29udGFpbmVyO1xuXHRcblx0ICAgIHRoaXMuZGVmZXJyZWQgPSBVdGlscy5kZWZlcnJlZCgpO1xuXHQgICAgdGhpcy5uZXdDb250YWluZXJSZWFkeSA9IFV0aWxzLmRlZmVycmVkKCk7XG5cdCAgICB0aGlzLm5ld0NvbnRhaW5lckxvYWRpbmcgPSB0aGlzLm5ld0NvbnRhaW5lclJlYWR5LnByb21pc2U7XG5cdFxuXHQgICAgdGhpcy5zdGFydCgpO1xuXHRcblx0ICAgIHRoaXMuX25ld0NvbnRhaW5lclByb21pc2UudGhlbihmdW5jdGlvbihuZXdDb250YWluZXIpIHtcblx0ICAgICAgX3RoaXMubmV3Q29udGFpbmVyID0gbmV3Q29udGFpbmVyO1xuXHQgICAgICBfdGhpcy5uZXdDb250YWluZXJSZWFkeS5yZXNvbHZlKCk7XG5cdCAgICB9KTtcblx0XG5cdCAgICByZXR1cm4gdGhpcy5kZWZlcnJlZC5wcm9taXNlO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgY2FsbGVkIGFzIHNvb24gdGhlIFRyYW5zaXRpb24gaXMgZmluaXNoZWRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgICAqL1xuXHQgIGRvbmU6IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy5vbGRDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm9sZENvbnRhaW5lcik7XG5cdCAgICB0aGlzLm5ld0NvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXHQgICAgdGhpcy5kZWZlcnJlZC5yZXNvbHZlKCk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogQ29uc3RydWN0b3IgZm9yIHlvdXIgVHJhbnNpdGlvblxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAgICogQGFic3RyYWN0XG5cdCAgICovXG5cdCAgc3RhcnQ6IGZ1bmN0aW9uKCkge30sXG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEJhc2VUcmFuc2l0aW9uO1xuXG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogSnVzdCBhbiBvYmplY3Qgd2l0aCBzb21lIGhlbHBmdWwgZnVuY3Rpb25zXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuVXRpbHNcblx0ICovXG5cdHZhciBVdGlscyA9IHtcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgdXJsXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuVXRpbHNcblx0ICAgKiBAcmV0dXJuIHtTdHJpbmd9IGN1cnJlbnRVcmxcblx0ICAgKi9cblx0ICBnZXRDdXJyZW50VXJsOiBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICtcblx0ICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG5cdCAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcblx0ICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEdpdmVuIGFuIHVybCwgcmV0dXJuIGl0IHdpdGhvdXQgdGhlIGhhc2hcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5VdGlsc1xuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7U3RyaW5nfSB1cmxcblx0ICAgKiBAcmV0dXJuIHtTdHJpbmd9IG5ld0NsZWFuVXJsXG5cdCAgICovXG5cdCAgY2xlYW5MaW5rOiBmdW5jdGlvbih1cmwpIHtcblx0ICAgIHJldHVybiB1cmwucmVwbGFjZSgvIy4qLywgJycpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFRpbWUgaW4gbWlsbGlzZWNvbmQgYWZ0ZXIgdGhlIHhociByZXF1ZXN0IGdvZXMgaW4gdGltZW91dFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlV0aWxzXG5cdCAgICogQHR5cGUge051bWJlcn1cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIHhoclRpbWVvdXQ6IDUwMDAsXG5cdFxuXHQgIC8qKlxuXHQgICAqIFN0YXJ0IGFuIFhNTEh0dHBSZXF1ZXN0KCkgYW5kIHJldHVybiBhIFByb21pc2Vcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5VdGlsc1xuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsXG5cdCAgICogQHJldHVybiB7UHJvbWlzZX1cblx0ICAgKi9cblx0ICB4aHI6IGZ1bmN0aW9uKHVybCkge1xuXHQgICAgdmFyIGRlZmVycmVkID0gdGhpcy5kZWZlcnJlZCgpO1xuXHQgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcblx0ICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSA0KSB7XG5cdCAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXHQgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVxLnJlc3BvbnNlVGV4dCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKCd4aHI6IEhUVFAgY29kZSBpcyBub3QgMjAwJykpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICByZXEub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKCd4aHI6IFRpbWVvdXQgZXhjZWVkZWQnKSk7XG5cdCAgICB9O1xuXHRcblx0ICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwpO1xuXHQgICAgcmVxLnRpbWVvdXQgPSB0aGlzLnhoclRpbWVvdXQ7XG5cdCAgICByZXEuc2V0UmVxdWVzdEhlYWRlcigneC1iYXJiYScsICd5ZXMnKTtcblx0ICAgIHJlcS5zZW5kKCk7XG5cdFxuXHQgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogR2V0IG9iaiBhbmQgcHJvcHMgYW5kIHJldHVybiBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydHkgbWVyZ2VkXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuVXRpbHNcblx0ICAgKiBAcGFyYW0gIHtvYmplY3R9IG9ialxuXHQgICAqIEBwYXJhbSAge29iamVjdH0gcHJvcHNcblx0ICAgKiBAcmV0dXJuIHtvYmplY3R9XG5cdCAgICovXG5cdCAgZXh0ZW5kOiBmdW5jdGlvbihvYmosIHByb3BzKSB7XG5cdCAgICB2YXIgbmV3T2JqID0gT2JqZWN0LmNyZWF0ZShvYmopO1xuXHRcblx0ICAgIGZvcih2YXIgcHJvcCBpbiBwcm9wcykge1xuXHQgICAgICBpZihwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHQgICAgICAgIG5ld09ialtwcm9wXSA9IHByb3BzW3Byb3BdO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdFxuXHQgICAgcmV0dXJuIG5ld09iajtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gYSBuZXcgXCJEZWZlcnJlZFwiIG9iamVjdFxuXHQgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9KYXZhU2NyaXB0X2NvZGVfbW9kdWxlcy9Qcm9taXNlLmpzbS9EZWZlcnJlZFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlV0aWxzXG5cdCAgICogQHJldHVybiB7RGVmZXJyZWR9XG5cdCAgICovXG5cdCAgZGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIG5ldyBmdW5jdGlvbigpIHtcblx0ICAgICAgdGhpcy5yZXNvbHZlID0gbnVsbDtcblx0ICAgICAgdGhpcy5yZWplY3QgPSBudWxsO1xuXHRcblx0ICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcblx0ICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcblx0ICAgICAgfS5iaW5kKHRoaXMpKTtcblx0ICAgIH07XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUmV0dXJuIHRoZSBwb3J0IG51bWJlciBub3JtYWxpemVkLCBldmVudHVhbGx5IHlvdSBjYW4gcGFzcyBhIHN0cmluZyB0byBiZSBub3JtYWxpemVkLlxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlV0aWxzXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IHBcblx0ICAgKiBAcmV0dXJuIHtJbnR9IHBvcnRcblx0ICAgKi9cblx0ICBnZXRQb3J0OiBmdW5jdGlvbihwKSB7XG5cdCAgICB2YXIgcG9ydCA9IHR5cGVvZiBwICE9PSAndW5kZWZpbmVkJyA/IHAgOiB3aW5kb3cubG9jYXRpb24ucG9ydDtcblx0ICAgIHZhciBwcm90b2NvbCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcblx0XG5cdCAgICBpZiAocG9ydCAhPSAnJylcblx0ICAgICAgcmV0dXJuIHBhcnNlSW50KHBvcnQpO1xuXHRcblx0ICAgIGlmIChwcm90b2NvbCA9PT0gJ2h0dHA6Jylcblx0ICAgICAgcmV0dXJuIDgwO1xuXHRcblx0ICAgIGlmIChwcm90b2NvbCA9PT0gJ2h0dHBzOicpXG5cdCAgICAgIHJldHVybiA0NDM7XG5cdCAgfVxuXHR9O1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBVdGlscztcblxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIERpc3BhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXHR2YXIgVXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHRcblx0LyoqXG5cdCAqIEJhc2VWaWV3IHRvIGJlIGV4dGVuZGVkXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuQmFzZVZpZXdcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBCYXNlVmlldyAgPSB7XG5cdCAgLyoqXG5cdCAgICogTmFtZXNwYWNlIG9mIHRoZSB2aWV3LlxuXHQgICAqIChuZWVkIHRvIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0YS1uYW1lc3BhY2Ugb2YgdGhlIGNvbnRhaW5lcilcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgICovXG5cdCAgbmFtZXNwYWNlOiBudWxsLFxuXHRcblx0ICAvKipcblx0ICAgKiBIZWxwZXIgdG8gZXh0ZW5kIHRoZSBvYmplY3Rcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqIEBwYXJhbSAge09iamVjdH0gbmV3T2JqZWN0XG5cdCAgICogQHJldHVybiB7T2JqZWN0fSBuZXdJbmhlcml0T2JqZWN0XG5cdCAgICovXG5cdCAgZXh0ZW5kOiBmdW5jdGlvbihvYmope1xuXHQgICAgcmV0dXJuIFV0aWxzLmV4dGVuZCh0aGlzLCBvYmopO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEluaXQgdGhlIHZpZXcuXG5cdCAgICogUC5TLiBJcyBzdWdnZXN0ZWQgdG8gaW5pdCB0aGUgdmlldyBiZWZvcmUgc3RhcnRpbmcgQmFyYmEuUGpheC5zdGFydCgpLFxuXHQgICAqIGluIHRoaXMgd2F5IC5vbkVudGVyKCkgYW5kIC5vbkVudGVyQ29tcGxldGVkKCkgd2lsbCBiZSBmaXJlZCBmb3IgdGhlIGN1cnJlbnRcblx0ICAgKiBjb250YWluZXIgd2hlbiB0aGUgcGFnZSBpcyBsb2FkZWQuXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVZpZXdcblx0ICAgKi9cblx0ICBpbml0OiBmdW5jdGlvbigpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cdFxuXHQgICAgRGlzcGF0Y2hlci5vbignaW5pdFN0YXRlQ2hhbmdlJyxcblx0ICAgICAgZnVuY3Rpb24obmV3U3RhdHVzLCBvbGRTdGF0dXMpIHtcblx0ICAgICAgICBpZiAob2xkU3RhdHVzICYmIG9sZFN0YXR1cy5uYW1lc3BhY2UgPT09IF90aGlzLm5hbWVzcGFjZSlcblx0ICAgICAgICAgIF90aGlzLm9uTGVhdmUoKTtcblx0ICAgICAgfVxuXHQgICAgKTtcblx0XG5cdCAgICBEaXNwYXRjaGVyLm9uKCduZXdQYWdlUmVhZHknLFxuXHQgICAgICBmdW5jdGlvbihuZXdTdGF0dXMsIG9sZFN0YXR1cywgY29udGFpbmVyKSB7XG5cdCAgICAgICAgX3RoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXHRcblx0ICAgICAgICBpZiAobmV3U3RhdHVzLm5hbWVzcGFjZSA9PT0gX3RoaXMubmFtZXNwYWNlKVxuXHQgICAgICAgICAgX3RoaXMub25FbnRlcigpO1xuXHQgICAgICB9XG5cdCAgICApO1xuXHRcblx0ICAgIERpc3BhdGNoZXIub24oJ3RyYW5zaXRpb25Db21wbGV0ZWQnLFxuXHQgICAgICBmdW5jdGlvbihuZXdTdGF0dXMsIG9sZFN0YXR1cykge1xuXHQgICAgICAgIGlmIChuZXdTdGF0dXMubmFtZXNwYWNlID09PSBfdGhpcy5uYW1lc3BhY2UpXG5cdCAgICAgICAgICBfdGhpcy5vbkVudGVyQ29tcGxldGVkKCk7XG5cdFxuXHQgICAgICAgIGlmIChvbGRTdGF0dXMgJiYgb2xkU3RhdHVzLm5hbWVzcGFjZSA9PT0gX3RoaXMubmFtZXNwYWNlKVxuXHQgICAgICAgICAgX3RoaXMub25MZWF2ZUNvbXBsZXRlZCgpO1xuXHQgICAgICB9XG5cdCAgICApO1xuXHQgIH0sXG5cdFxuXHQgLyoqXG5cdCAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGUgY29udGFpbmVyXG5cdCAgKiBpcyByZWFkeSBhbmQgYXR0YWNoZWQgdG8gdGhlIERPTS5cblx0ICAqXG5cdCAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVZpZXdcblx0ICAqIEBhYnN0cmFjdFxuXHQgICovXG5cdCAgb25FbnRlcjogZnVuY3Rpb24oKSB7fSxcblx0XG5cdCAgLyoqXG5cdCAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGZpcmVkIHdoZW4gdGhlIHRyYW5zaXRpb25cblx0ICAgKiB0byB0aGlzIGNvbnRhaW5lciBoYXMganVzdCBmaW5pc2hlZC5cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqIEBhYnN0cmFjdFxuXHQgICAqL1xuXHQgIG9uRW50ZXJDb21wbGV0ZWQ6IGZ1bmN0aW9uKCkge30sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBmaXJlZCB3aGVuIHRoZSB0cmFuc2l0aW9uXG5cdCAgICogdG8gYSBuZXcgY29udGFpbmVyIGhhcyBqdXN0IHN0YXJ0ZWQuXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVZpZXdcblx0ICAgKiBAYWJzdHJhY3Rcblx0ICAgKi9cblx0ICBvbkxlYXZlOiBmdW5jdGlvbigpIHt9LFxuXHRcblx0ICAvKipcblx0ICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGUgY29udGFpbmVyXG5cdCAgICogaGFzIGp1c3QgYmVlbiByZW1vdmVkIGZyb20gdGhlIERPTS5cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqIEBhYnN0cmFjdFxuXHQgICAqL1xuXHQgIG9uTGVhdmVDb21wbGV0ZWQ6IGZ1bmN0aW9uKCkge31cblx0fVxuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldztcblxuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIExpdHRsZSBEaXNwYXRjaGVyIGluc3BpcmVkIGJ5IE1pY3JvRXZlbnQuanNcblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5EaXNwYXRjaGVyXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHR2YXIgRGlzcGF0Y2hlciA9IHtcblx0ICAvKipcblx0ICAgKiBPYmplY3QgdGhhdCBrZWVwcyBhbGwgdGhlIGV2ZW50c1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkRpc3BhdGNoZXJcblx0ICAgKiBAcmVhZE9ubHlcblx0ICAgKiBAdHlwZSB7T2JqZWN0fVxuXHQgICAqL1xuXHQgIGV2ZW50czoge30sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEJpbmQgYSBjYWxsYmFjayB0byBhbiBldmVudFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkRpc3BhdGNoZXJcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50TmFtZVxuXHQgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmdW5jdGlvblxuXHQgICAqL1xuXHQgIG9uOiBmdW5jdGlvbihlLCBmKSB7XG5cdCAgICB0aGlzLmV2ZW50c1tlXSA9IHRoaXMuZXZlbnRzW2VdIHx8IFtdO1xuXHQgICAgdGhpcy5ldmVudHNbZV0ucHVzaChmKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBVbmJpbmQgZXZlbnRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5EaXNwYXRjaGVyXG5cdCAgICogQHBhcmFtICB7U3RyaW5nfSBldmVudE5hbWVcblx0ICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZnVuY3Rpb25cblx0ICAgKi9cblx0ICBvZmY6IGZ1bmN0aW9uKGUsIGYpIHtcblx0ICAgIGlmKGUgaW4gdGhpcy5ldmVudHMgPT09IGZhbHNlKVxuXHQgICAgICByZXR1cm47XG5cdFxuXHQgICAgdGhpcy5ldmVudHNbZV0uc3BsaWNlKHRoaXMuZXZlbnRzW2VdLmluZGV4T2YoZiksIDEpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZpcmUgdGhlIGV2ZW50IHJ1bm5pbmcgYWxsIHRoZSBldmVudCBhc3NvY2lhdGVkIHRvIGl0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuRGlzcGF0Y2hlclxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gZXZlbnROYW1lXG5cdCAgICogQHBhcmFtICB7Li4uKn0gYXJnc1xuXHQgICAqL1xuXHQgIHRyaWdnZXI6IGZ1bmN0aW9uKGUpIHsvL2UsIC4uLmFyZ3Ncblx0ICAgIGlmIChlIGluIHRoaXMuZXZlbnRzID09PSBmYWxzZSlcblx0ICAgICAgcmV0dXJuO1xuXHRcblx0ICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50c1tlXS5sZW5ndGg7IGkrKyl7XG5cdCAgICAgIHRoaXMuZXZlbnRzW2VdW2ldLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHQgICAgfVxuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjtcblxuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0XG5cdC8qKlxuXHQgKiBCYXNlQ2FjaGUgaXQncyBhIHNpbXBsZSBzdGF0aWMgY2FjaGVcblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5CYXNlQ2FjaGVcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBCYXNlQ2FjaGUgPSB7XG5cdCAgLyoqXG5cdCAgICogVGhlIE9iamVjdCB0aGF0IGtlZXBzIGFsbCB0aGUga2V5IHZhbHVlIGluZm9ybWF0aW9uXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZUNhY2hlXG5cdCAgICogQHR5cGUge09iamVjdH1cblx0ICAgKi9cblx0ICBkYXRhOiB7fSxcblx0XG5cdCAgLyoqXG5cdCAgICogSGVscGVyIHRvIGV4dGVuZCB0aGlzIG9iamVjdFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VDYWNoZVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7T2JqZWN0fSBuZXdPYmplY3Rcblx0ICAgKiBAcmV0dXJuIHtPYmplY3R9IG5ld0luaGVyaXRPYmplY3Rcblx0ICAgKi9cblx0ICBleHRlbmQ6IGZ1bmN0aW9uKG9iaikge1xuXHQgICAgcmV0dXJuIFV0aWxzLmV4dGVuZCh0aGlzLCBvYmopO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFNldCBhIGtleSBhbmQgdmFsdWUgZGF0YSwgbWFpbmx5IEJhcmJhIGlzIGdvaW5nIHRvIHNhdmUgcHJvbWlzZXNcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlQ2FjaGVcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAgICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgICAqL1xuXHQgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0ICAgIHRoaXMuZGF0YVtrZXldID0gdmFsO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFJldHJpZXZlIHRoZSBkYXRhIHVzaW5nIHRoZSBrZXlcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlQ2FjaGVcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IGtleVxuXHQgICAqIEByZXR1cm4geyp9XG5cdCAgICovXG5cdCAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcblx0ICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBGbHVzaCB0aGUgY2FjaGVcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlQ2FjaGVcblx0ICAgKi9cblx0ICByZXNldDogZnVuY3Rpb24oKSB7XG5cdCAgICB0aGlzLmRhdGEgPSB7fTtcblx0ICB9XG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEJhc2VDYWNoZTtcblxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIEhpc3RvcnlNYW5hZ2VyIGhlbHBzIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG5hdmlnYXRpb25cblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5IaXN0b3J5TWFuYWdlclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIEhpc3RvcnlNYW5hZ2VyID0ge1xuXHQgIC8qKlxuXHQgICAqIEtlZXAgdHJhY2sgb2YgdGhlIHN0YXR1cyBpbiBoaXN0b3JpYyBvcmRlclxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkhpc3RvcnlNYW5hZ2VyXG5cdCAgICogQHJlYWRPbmx5XG5cdCAgICogQHR5cGUge0FycmF5fVxuXHQgICAqL1xuXHQgIGhpc3Rvcnk6IFtdLFxuXHRcblx0ICAvKipcblx0ICAgKiBBZGQgYSBuZXcgc2V0IG9mIHVybCBhbmQgbmFtZXNwYWNlXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuSGlzdG9yeU1hbmFnZXJcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICovXG5cdCAgYWRkOiBmdW5jdGlvbih1cmwsIG5hbWVzcGFjZSkge1xuXHQgICAgaWYgKCFuYW1lc3BhY2UpXG5cdCAgICAgIG5hbWVzcGFjZSA9IHVuZGVmaW5lZDtcblx0XG5cdCAgICB0aGlzLmhpc3RvcnkucHVzaCh7XG5cdCAgICAgIHVybDogdXJsLFxuXHQgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxuXHQgICAgfSk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUmV0dXJuIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IHN0YXR1c1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkhpc3RvcnlNYW5hZ2VyXG5cdCAgICogQHJldHVybiB7T2JqZWN0fVxuXHQgICAqL1xuXHQgIGN1cnJlbnRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMV07XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUmV0dXJuIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwcmV2aW91cyBzdGF0dXNcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5IaXN0b3J5TWFuYWdlclxuXHQgICAqIEByZXR1cm4ge09iamVjdH1cblx0ICAgKi9cblx0ICBwcmV2U3RhdHVzOiBmdW5jdGlvbigpIHtcblx0ICAgIHZhciBoaXN0b3J5ID0gdGhpcy5oaXN0b3J5O1xuXHRcblx0ICAgIGlmIChoaXN0b3J5Lmxlbmd0aCA8IDIpXG5cdCAgICAgIHJldHVybiBudWxsO1xuXHRcblx0ICAgIHJldHVybiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG5cdCAgfVxuXHR9O1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBIaXN0b3J5TWFuYWdlcjtcblxuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBVdGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdHZhciBEaXNwYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblx0dmFyIEhpZGVTaG93VHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXHR2YXIgQmFzZUNhY2hlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblx0XG5cdHZhciBIaXN0b3J5TWFuYWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cdHZhciBEb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblx0XG5cdC8qKlxuXHQgKiBQamF4IGlzIGEgc3RhdGljIG9iamVjdCB3aXRoIG1haW4gZnVuY3Rpb25cblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5QamF4XG5cdCAqIEBib3Jyb3dzIERvbSBhcyBEb21cblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBQamF4ID0ge1xuXHQgIERvbTogRG9tLFxuXHQgIEhpc3Rvcnk6IEhpc3RvcnlNYW5hZ2VyLFxuXHQgIENhY2hlOiBCYXNlQ2FjaGUsXG5cdFxuXHQgIC8qKlxuXHQgICAqIEluZGljYXRlIHdldGhlciBvciBub3QgdXNlIHRoZSBjYWNoZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIGNhY2hlRW5hYmxlZDogdHJ1ZSxcblx0XG5cdCAgLyoqXG5cdCAgICogSW5kaWNhdGUgaWYgdGhlcmUgaXMgYW4gYW5pbWF0aW9uIGluIHByb2dyZXNzXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEByZWFkT25seVxuXHQgICAqIEB0eXBlIHtCb29sZWFufVxuXHQgICAqL1xuXHQgIHRyYW5zaXRpb25Qcm9ncmVzczogZmFsc2UsXG5cdFxuXHQgIC8qKlxuXHQgICAqIENsYXNzIG5hbWUgdXNlZCB0byBpZ25vcmUgbGlua3Ncblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIGlnbm9yZUNsYXNzTGluazogJ25vLWJhcmJhJyxcblx0XG5cdCAgLyoqXG5cdCAgICogRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHRvIHN0YXJ0IFBqYXhcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICovXG5cdCAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy5pbml0KCk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogSW5pdCB0aGUgZXZlbnRzXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwcml2YXRlXG5cdCAgICovXG5cdCAgaW5pdDogZnVuY3Rpb24oKSB7XG5cdCAgICB2YXIgY29udGFpbmVyID0gdGhpcy5Eb20uZ2V0Q29udGFpbmVyKCk7XG5cdCAgICB2YXIgd3JhcHBlciA9IHRoaXMuRG9tLmdldFdyYXBwZXIoKTtcblx0XG5cdCAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuXHRcblx0ICAgIHRoaXMuSGlzdG9yeS5hZGQoXG5cdCAgICAgIHRoaXMuZ2V0Q3VycmVudFVybCgpLFxuXHQgICAgICB0aGlzLkRvbS5nZXROYW1lc3BhY2UoY29udGFpbmVyKVxuXHQgICAgKTtcblx0XG5cdCAgICAvL0ZpcmUgZm9yIHRoZSBjdXJyZW50IHZpZXcuXG5cdCAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ2luaXRTdGF0ZUNoYW5nZScsIHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCkpO1xuXHQgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCduZXdQYWdlUmVhZHknLFxuXHQgICAgICB0aGlzLkhpc3RvcnkuY3VycmVudFN0YXR1cygpLFxuXHQgICAgICB7fSxcblx0ICAgICAgY29udGFpbmVyLFxuXHQgICAgICB0aGlzLkRvbS5jdXJyZW50SFRNTFxuXHQgICAgKTtcblx0ICAgIERpc3BhdGNoZXIudHJpZ2dlcigndHJhbnNpdGlvbkNvbXBsZXRlZCcsIHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCkpO1xuXHRcblx0ICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEF0dGFjaCB0aGUgZXZlbnRsaXN0ZW5lcnNcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcblx0ICAgICAgdGhpcy5vbkxpbmtDbGljay5iaW5kKHRoaXMpXG5cdCAgICApO1xuXHRcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsXG5cdCAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpXG5cdCAgICApO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFJldHVybiB0aGUgY3VycmVudFVSTCBjbGVhbmVkXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEByZXR1cm4ge1N0cmluZ30gY3VycmVudFVybFxuXHQgICAqL1xuXHQgIGdldEN1cnJlbnRVcmw6IGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIFV0aWxzLmNsZWFuTGluayhcblx0ICAgICAgVXRpbHMuZ2V0Q3VycmVudFVybCgpXG5cdCAgICApO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIENoYW5nZSB0aGUgVVJMIHdpdGggcHVzaHN0YXRlIGFuZCB0cmlnZ2VyIHRoZSBzdGF0ZSBjaGFuZ2Vcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IG5ld1VybFxuXHQgICAqL1xuXHQgIGdvVG86IGZ1bmN0aW9uKHVybCkge1xuXHQgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHVybCk7XG5cdCAgICB0aGlzLm9uU3RhdGVDaGFuZ2UoKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBGb3JjZSB0aGUgYnJvd3NlciB0byBnbyB0byBhIGNlcnRhaW4gdXJsXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqL1xuXHQgIGZvcmNlR29UbzogZnVuY3Rpb24odXJsKSB7XG5cdCAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogTG9hZCBhbiB1cmwsIHdpbGwgc3RhcnQgYW4geGhyIHJlcXVlc3Qgb3IgbG9hZCBmcm9tIHRoZSBjYWNoZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsXG5cdCAgICogQHJldHVybiB7UHJvbWlzZX1cblx0ICAgKi9cblx0ICBsb2FkOiBmdW5jdGlvbih1cmwpIHtcblx0ICAgIHZhciBkZWZlcnJlZCA9IFV0aWxzLmRlZmVycmVkKCk7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXHQgICAgdmFyIHhocjtcblx0XG5cdCAgICB4aHIgPSB0aGlzLkNhY2hlLmdldCh1cmwpO1xuXHRcblx0ICAgIGlmICgheGhyKSB7XG5cdCAgICAgIHhociA9IFV0aWxzLnhocih1cmwpO1xuXHQgICAgICB0aGlzLkNhY2hlLnNldCh1cmwsIHhocik7XG5cdCAgICB9XG5cdFxuXHQgICAgeGhyLnRoZW4oXG5cdCAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcblx0ICAgICAgICB2YXIgY29udGFpbmVyID0gX3RoaXMuRG9tLnBhcnNlUmVzcG9uc2UoZGF0YSk7XG5cdFxuXHQgICAgICAgIF90aGlzLkRvbS5wdXRDb250YWluZXIoY29udGFpbmVyKTtcblx0XG5cdCAgICAgICAgaWYgKCFfdGhpcy5jYWNoZUVuYWJsZWQpXG5cdCAgICAgICAgICBfdGhpcy5DYWNoZS5yZXNldCgpO1xuXHRcblx0ICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRhaW5lcik7XG5cdCAgICAgIH0sXG5cdCAgICAgIGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIC8vU29tZXRoaW5nIHdlbnQgd3JvbmcgKHRpbWVvdXQsIDQwNCwgNTA1Li4uKVxuXHQgICAgICAgIF90aGlzLmZvcmNlR29Ubyh1cmwpO1xuXHRcblx0ICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcblx0ICAgICAgfVxuXHQgICAgKTtcblx0XG5cdCAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBHZXQgdGhlIC5ocmVmIHBhcmFtZXRlciBvdXQgb2YgYW4gZWxlbWVudFxuXHQgICAqIGFuZCBoYW5kbGUgc3BlY2lhbCBjYXNlcyAobGlrZSB4bGluazpocmVmKVxuXHQgICAqXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbFxuXHQgICAqIEByZXR1cm4ge1N0cmluZ30gaHJlZlxuXHQgICAqL1xuXHQgIGdldEhyZWY6IGZ1bmN0aW9uKGVsKSB7XG5cdCAgICBpZiAoIWVsKSB7XG5cdCAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cdCAgICB9XG5cdFxuXHQgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSAmJiB0eXBlb2YgZWwuZ2V0QXR0cmlidXRlKCd4bGluazpocmVmJykgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKTtcblx0ICAgIH1cblx0XG5cdCAgICBpZiAodHlwZW9mIGVsLmhyZWYgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgIHJldHVybiBlbC5ocmVmO1xuXHQgICAgfVxuXHRcblx0ICAgIHJldHVybiB1bmRlZmluZWQ7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogQ2FsbGJhY2sgY2FsbGVkIGZyb20gY2xpY2sgZXZlbnRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2dFxuXHQgICAqL1xuXHQgIG9uTGlua0NsaWNrOiBmdW5jdGlvbihldnQpIHtcblx0ICAgIHZhciBlbCA9IGV2dC50YXJnZXQ7XG5cdFxuXHQgICAgLy9HbyB1cCBpbiB0aGUgbm9kZWxpc3QgdW50aWwgd2Vcblx0ICAgIC8vZmluZCBzb21ldGhpbmcgd2l0aCBhbiBocmVmXG5cdCAgICB3aGlsZSAoZWwgJiYgIXRoaXMuZ2V0SHJlZihlbCkpIHtcblx0ICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuXHQgICAgfVxuXHRcblx0ICAgIGlmICh0aGlzLnByZXZlbnRDaGVjayhldnQsIGVsKSkge1xuXHQgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdCAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcblx0ICAgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCdsaW5rQ2xpY2tlZCcsIGVsLCBldnQpO1xuXHRcblx0ICAgICAgdmFyIGhyZWYgPSB0aGlzLmdldEhyZWYoZWwpO1xuXHQgICAgICB0aGlzLmdvVG8oaHJlZik7XG5cdCAgICB9XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogRGV0ZXJtaW5lIGlmIHRoZSBsaW5rIHNob3VsZCBiZSBmb2xsb3dlZFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcGFyYW0gIHtNb3VzZUV2ZW50fSBldnRcblx0ICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuXHQgICAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAgICovXG5cdCAgcHJldmVudENoZWNrOiBmdW5jdGlvbihldnQsIGVsZW1lbnQpIHtcblx0ICAgIGlmICghd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKVxuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdFxuXHQgICAgdmFyIGhyZWYgPSB0aGlzLmdldEhyZWYoZWxlbWVudCk7XG5cdFxuXHQgICAgLy9Vc2VyXG5cdCAgICBpZiAoIWVsZW1lbnQgfHwgIWhyZWYpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL01pZGRsZSBjbGljaywgY21kIGNsaWNrLCBhbmQgY3RybCBjbGlja1xuXHQgICAgaWYgKGV2dC53aGljaCA+IDEgfHwgZXZ0Lm1ldGFLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0LnNoaWZ0S2V5IHx8IGV2dC5hbHRLZXkpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0lnbm9yZSB0YXJnZXQgd2l0aCBfYmxhbmsgdGFyZ2V0XG5cdCAgICBpZiAoZWxlbWVudC50YXJnZXQgJiYgZWxlbWVudC50YXJnZXQgPT09ICdfYmxhbmsnKVxuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdFxuXHQgICAgLy9DaGVjayBpZiBpdCdzIHRoZSBzYW1lIGRvbWFpblxuXHQgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gZWxlbWVudC5wcm90b2NvbCB8fCB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgIT09IGVsZW1lbnQuaG9zdG5hbWUpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0NoZWNrIGlmIHRoZSBwb3J0IGlzIHRoZSBzYW1lXG5cdCAgICBpZiAoVXRpbHMuZ2V0UG9ydCgpICE9PSBVdGlscy5nZXRQb3J0KGVsZW1lbnQucG9ydCkpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0lnbm9yZSBjYXNlIHdoZW4gYSBoYXNoIGlzIGJlaW5nIHRhY2tlZCBvbiB0aGUgY3VycmVudCBVUkxcblx0ICAgIGlmIChocmVmLmluZGV4T2YoJyMnKSA+IC0xKVxuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdFxuXHQgICAgLy9JZ25vcmUgY2FzZSB3aGVyZSB0aGVyZSBpcyBkb3dubG9hZCBhdHRyaWJ1dGVcblx0ICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSAmJiB0eXBlb2YgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgPT09ICdzdHJpbmcnKVxuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdFxuXHQgICAgLy9JbiBjYXNlIHlvdSdyZSB0cnlpbmcgdG8gbG9hZCB0aGUgc2FtZSBwYWdlXG5cdCAgICBpZiAoVXRpbHMuY2xlYW5MaW5rKGhyZWYpID09IFV0aWxzLmNsZWFuTGluayhsb2NhdGlvbi5ocmVmKSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmlnbm9yZUNsYXNzTGluaykpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gYSB0cmFuc2l0aW9uIG9iamVjdFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcmV0dXJuIHtCYXJiYS5UcmFuc2l0aW9ufSBUcmFuc2l0aW9uIG9iamVjdFxuXHQgICAqL1xuXHQgIGdldFRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuXHQgICAgLy9Vc2VyIGN1c3RvbWl6YWJsZVxuXHQgICAgcmV0dXJuIEhpZGVTaG93VHJhbnNpdGlvbjtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIGEgJ3BvcHN0YXRlJyBvciBmcm9tIC5nb1RvKClcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbigpIHtcblx0ICAgIHZhciBuZXdVcmwgPSB0aGlzLmdldEN1cnJlbnRVcmwoKTtcblx0XG5cdCAgICBpZiAodGhpcy50cmFuc2l0aW9uUHJvZ3Jlc3MpXG5cdCAgICAgIHRoaXMuZm9yY2VHb1RvKG5ld1VybCk7XG5cdFxuXHQgICAgaWYgKHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCkudXJsID09PSBuZXdVcmwpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICB0aGlzLkhpc3RvcnkuYWRkKG5ld1VybCk7XG5cdFxuXHQgICAgdmFyIG5ld0NvbnRhaW5lciA9IHRoaXMubG9hZChuZXdVcmwpO1xuXHQgICAgdmFyIHRyYW5zaXRpb24gPSBPYmplY3QuY3JlYXRlKHRoaXMuZ2V0VHJhbnNpdGlvbigpKTtcblx0XG5cdCAgICB0aGlzLnRyYW5zaXRpb25Qcm9ncmVzcyA9IHRydWU7XG5cdFxuXHQgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCdpbml0U3RhdGVDaGFuZ2UnLFxuXHQgICAgICB0aGlzLkhpc3RvcnkuY3VycmVudFN0YXR1cygpLFxuXHQgICAgICB0aGlzLkhpc3RvcnkucHJldlN0YXR1cygpXG5cdCAgICApO1xuXHRcblx0ICAgIHZhciB0cmFuc2l0aW9uSW5zdGFuY2UgPSB0cmFuc2l0aW9uLmluaXQoXG5cdCAgICAgIHRoaXMuRG9tLmdldENvbnRhaW5lcigpLFxuXHQgICAgICBuZXdDb250YWluZXJcblx0ICAgICk7XG5cdFxuXHQgICAgbmV3Q29udGFpbmVyLnRoZW4oXG5cdCAgICAgIHRoaXMub25OZXdDb250YWluZXJMb2FkZWQuYmluZCh0aGlzKVxuXHQgICAgKTtcblx0XG5cdCAgICB0cmFuc2l0aW9uSW5zdGFuY2UudGhlbihcblx0ICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmQuYmluZCh0aGlzKVxuXHQgICAgKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBGdW5jdGlvbiBjYWxsZWQgYXMgc29vbiB0aGUgbmV3IGNvbnRhaW5lciBpcyByZWFkeVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lclxuXHQgICAqL1xuXHQgIG9uTmV3Q29udGFpbmVyTG9hZGVkOiBmdW5jdGlvbihjb250YWluZXIpIHtcblx0ICAgIHZhciBjdXJyZW50U3RhdHVzID0gdGhpcy5IaXN0b3J5LmN1cnJlbnRTdGF0dXMoKTtcblx0ICAgIGN1cnJlbnRTdGF0dXMubmFtZXNwYWNlID0gdGhpcy5Eb20uZ2V0TmFtZXNwYWNlKGNvbnRhaW5lcik7XG5cdFxuXHQgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCduZXdQYWdlUmVhZHknLFxuXHQgICAgICB0aGlzLkhpc3RvcnkuY3VycmVudFN0YXR1cygpLFxuXHQgICAgICB0aGlzLkhpc3RvcnkucHJldlN0YXR1cygpLFxuXHQgICAgICBjb250YWluZXIsXG5cdCAgICAgIHRoaXMuRG9tLmN1cnJlbnRIVE1MXG5cdCAgICApO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZ1bmN0aW9uIGNhbGxlZCBhcyBzb29uIHRoZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwcml2YXRlXG5cdCAgICovXG5cdCAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbigpIHtcblx0ICAgIHRoaXMudHJhbnNpdGlvblByb2dyZXNzID0gZmFsc2U7XG5cdFxuXHQgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCd0cmFuc2l0aW9uQ29tcGxldGVkJyxcblx0ICAgICAgdGhpcy5IaXN0b3J5LmN1cnJlbnRTdGF0dXMoKSxcblx0ICAgICAgdGhpcy5IaXN0b3J5LnByZXZTdGF0dXMoKVxuXHQgICAgKTtcblx0ICB9XG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IFBqYXg7XG5cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgQmFzZVRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHRcblx0LyoqXG5cdCAqIEJhc2ljIFRyYW5zaXRpb24gb2JqZWN0LCB3YWl0IGZvciB0aGUgbmV3IENvbnRhaW5lciB0byBiZSByZWFkeSxcblx0ICogc2Nyb2xsIHRvcCwgYW5kIGZpbmlzaCB0aGUgdHJhbnNpdGlvbiAocmVtb3ZpbmcgdGhlIG9sZCBjb250YWluZXIgYW5kIGRpc3BsYXlpbmcgdGhlIG5ldyBvbmUpXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuSGlkZVNob3dUcmFuc2l0aW9uXG5cdCAqIEBhdWdtZW50cyBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgKi9cblx0dmFyIEhpZGVTaG93VHJhbnNpdGlvbiA9IEJhc2VUcmFuc2l0aW9uLmV4dGVuZCh7XG5cdCAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy5uZXdDb250YWluZXJMb2FkaW5nLnRoZW4odGhpcy5maW5pc2guYmluZCh0aGlzKSk7XG5cdCAgfSxcblx0XG5cdCAgZmluaXNoOiBmdW5jdGlvbigpIHtcblx0ICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcblx0ICAgIHRoaXMuZG9uZSgpO1xuXHQgIH1cblx0fSk7XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEhpZGVTaG93VHJhbnNpdGlvbjtcblxuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiBPYmplY3QgdGhhdCBpcyBnb2luZyB0byBkZWFsIHdpdGggRE9NIHBhcnNpbmcvbWFuaXB1bGF0aW9uXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuUGpheC5Eb21cblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBEb20gPSB7XG5cdCAgLyoqXG5cdCAgICogVGhlIG5hbWUgb2YgdGhlIGRhdGEgYXR0cmlidXRlIG9uIHRoZSBjb250YWluZXJcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgICogQGRlZmF1bHRcblx0ICAgKi9cblx0ICBkYXRhTmFtZXNwYWNlOiAnbmFtZXNwYWNlJyxcblx0XG5cdCAgLyoqXG5cdCAgICogSWQgb2YgdGhlIG1haW4gd3JhcHBlclxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIHdyYXBwZXJJZDogJ2JhcmJhLXdyYXBwZXInLFxuXHRcblx0ICAvKipcblx0ICAgKiBDbGFzcyBuYW1lIHVzZWQgdG8gaWRlbnRpZnkgdGhlIGNvbnRhaW5lcnNcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgICogQGRlZmF1bHRcblx0ICAgKi9cblx0ICBjb250YWluZXJDbGFzczogJ2JhcmJhLWNvbnRhaW5lcicsXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZ1bGwgSFRNTCBTdHJpbmcgb2YgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAgKiBCeSBkZWZhdWx0IGlzIHRoZSBpbm5lckhUTUwgb2YgdGhlIGluaXRpYWwgbG9hZGVkIHBhZ2UuXG5cdCAgICpcblx0ICAgKiBFYWNoIHRpbWUgYSBuZXcgcGFnZSBpcyBsb2FkZWQsIHRoZSB2YWx1ZSBpcyB0aGUgcmVzcG9uc2Ugb2YgdGhlIHhociBjYWxsLlxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKi9cblx0ICBjdXJyZW50SFRNTDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTCxcblx0XG5cdCAgLyoqXG5cdCAgICogUGFyc2UgdGhlIHJlc3BvbnNlVGV4dCBvYnRhaW5lZCBmcm9tIHRoZSB4aHIgY2FsbFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IHJlc3BvbnNlVGV4dFxuXHQgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgICAqL1xuXHQgIHBhcnNlUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlVGV4dCkge1xuXHQgICAgdGhpcy5jdXJyZW50SFRNTCA9IHJlc3BvbnNlVGV4dDtcblx0XG5cdCAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQgICAgd3JhcHBlci5pbm5lckhUTUwgPSByZXNwb25zZVRleHQ7XG5cdFxuXHQgICAgdmFyIHRpdGxlRWwgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk7XG5cdFxuXHQgICAgaWYgKHRpdGxlRWwpXG5cdCAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGVFbC50ZXh0Q29udGVudDtcblx0XG5cdCAgICByZXR1cm4gdGhpcy5nZXRDb250YWluZXIod3JhcHBlcik7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogR2V0IHRoZSBtYWluIGJhcmJhIHdyYXBwZXIgYnkgdGhlIElEIGB3cmFwcGVySWRgXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuXHQgICAqL1xuXHQgIGdldFdyYXBwZXI6IGZ1bmN0aW9uKCkge1xuXHQgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLndyYXBwZXJJZCk7XG5cdFxuXHQgICAgaWYgKCF3cmFwcGVyKVxuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhcmJhLmpzOiB3cmFwcGVyIG5vdCBmb3VuZCEnKTtcblx0XG5cdCAgICByZXR1cm4gd3JhcHBlcjtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBHZXQgdGhlIGNvbnRhaW5lciBvbiB0aGUgY3VycmVudCBET00sXG5cdCAgICogb3IgZnJvbSBhbiBIVE1MRWxlbWVudCBwYXNzZWQgdmlhIGFyZ3VtZW50XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAgICovXG5cdCAgZ2V0Q29udGFpbmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdCAgICBpZiAoIWVsZW1lbnQpXG5cdCAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuXHRcblx0ICAgIGlmICghZWxlbWVudClcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXJiYS5qczogRE9NIG5vdCByZWFkeSEnKTtcblx0XG5cdCAgICB2YXIgY29udGFpbmVyID0gdGhpcy5wYXJzZUNvbnRhaW5lcihlbGVtZW50KTtcblx0XG5cdCAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5qcXVlcnkpXG5cdCAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lclswXTtcblx0XG5cdCAgICBpZiAoIWNvbnRhaW5lcilcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXJiYS5qczogbm8gY29udGFpbmVyIGZvdW5kJyk7XG5cdFxuXHQgICAgcmV0dXJuIGNvbnRhaW5lcjtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBHZXQgdGhlIG5hbWVzcGFjZSBvZiB0aGUgY29udGFpbmVyXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAgICogQHJldHVybiB7U3RyaW5nfVxuXHQgICAqL1xuXHQgIGdldE5hbWVzcGFjZTogZnVuY3Rpb24oZWxlbWVudCkge1xuXHQgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5kYXRhc2V0KSB7XG5cdCAgICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXRbdGhpcy5kYXRhTmFtZXNwYWNlXTtcblx0ICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuXHQgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIHRoaXMuZGF0YU5hbWVzcGFjZSk7XG5cdCAgICB9XG5cdFxuXHQgICAgcmV0dXJuIG51bGw7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUHV0IHRoZSBjb250YWluZXIgb24gdGhlIHBhZ2Vcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcblx0ICAgKi9cblx0ICBwdXRDb250YWluZXI6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0ICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHRcblx0ICAgIHZhciB3cmFwcGVyID0gdGhpcy5nZXRXcmFwcGVyKCk7XG5cdCAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEdldCBjb250YWluZXIgc2VsZWN0b3Jcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcblx0ICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuXHQgICAqL1xuXHQgIHBhcnNlQ29udGFpbmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdCAgICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuY29udGFpbmVyQ2xhc3MpO1xuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gRG9tO1xuXG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0dmFyIFBqYXggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblx0XG5cdC8qKlxuXHQgKiBQcmVmZXRjaFxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLlByZWZldGNoXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHR2YXIgUHJlZmV0Y2ggPSB7XG5cdCAgLyoqXG5cdCAgICogQ2xhc3MgbmFtZSB1c2VkIHRvIGlnbm9yZSBwcmVmZXRjaCBvbiBsaW5rc1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlByZWZldGNoXG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIGlnbm9yZUNsYXNzTGluazogJ25vLWJhcmJhLXByZWZldGNoJyxcblx0XG5cdCAgLyoqXG5cdCAgICogSW5pdCB0aGUgZXZlbnQgbGlzdGVuZXIgb24gbW91c2VvdmVyIGFuZCB0b3VjaHN0YXJ0XG5cdCAgICogZm9yIHRoZSBwcmVmZXRjaFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlByZWZldGNoXG5cdCAgICovXG5cdCAgaW5pdDogZnVuY3Rpb24oKSB7XG5cdCAgICBpZiAoIXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICB9XG5cdFxuXHQgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua0VudGVyLmJpbmQodGhpcykpO1xuXHQgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkxpbmtFbnRlci5iaW5kKHRoaXMpKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBDYWxsYmFjayBmb3IgdGhlIG1vdXNlaG92ZXIvdG91Y2hzdGFydFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlByZWZldGNoXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2dFxuXHQgICAqL1xuXHQgIG9uTGlua0VudGVyOiBmdW5jdGlvbihldnQpIHtcblx0ICAgIHZhciBlbCA9IGV2dC50YXJnZXQ7XG5cdFxuXHQgICAgd2hpbGUgKGVsICYmICFQamF4LmdldEhyZWYoZWwpKSB7XG5cdCAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcblx0ICAgIH1cblx0XG5cdCAgICBpZiAoIWVsIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmlnbm9yZUNsYXNzTGluaykpIHtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHRcblx0ICAgIHZhciB1cmwgPSBQamF4LmdldEhyZWYoZWwpO1xuXHRcblx0ICAgIC8vQ2hlY2sgaWYgdGhlIGxpbmsgaXMgZWxlZ2libGUgZm9yIFBqYXhcblx0ICAgIGlmIChQamF4LnByZXZlbnRDaGVjayhldnQsIGVsKSAmJiAhUGpheC5DYWNoZS5nZXQodXJsKSkge1xuXHQgICAgICB2YXIgeGhyID0gVXRpbHMueGhyKHVybCk7XG5cdCAgICAgIFBqYXguQ2FjaGUuc2V0KHVybCwgeGhyKTtcblx0ICAgIH1cblx0ICB9XG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IFByZWZldGNoO1xuXG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhcmJhLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5SYWN0aXZlID0gZ2xvYmFsLlJhY3RpdmUgfHwge30sIGdsb2JhbC5SYWN0aXZlLmV2ZW50cyA9IGdsb2JhbC5SYWN0aXZlLmV2ZW50cyB8fCB7fSwgZ2xvYmFsLlJhY3RpdmUuZXZlbnRzLnRhcCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5cdHZhciBESVNUQU5DRV9USFJFU0hPTEQgPSA1OyAvLyBtYXhpbXVtIHBpeGVscyBwb2ludGVyIGNhbiBtb3ZlIGJlZm9yZSBjYW5jZWxcblx0dmFyIFRJTUVfVEhSRVNIT0xEID0gNDAwOyAgIC8vIG1heGltdW0gbWlsbGlzZWNvbmRzIGJldHdlZW4gZG93biBhbmQgdXAgYmVmb3JlIGNhbmNlbFxuXG5cdGZ1bmN0aW9uIHRhcCAoIG5vZGUsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBuZXcgVGFwSGFuZGxlciggbm9kZSwgY2FsbGJhY2sgKTtcblx0fVxuXG5cdGZ1bmN0aW9uIFRhcEhhbmRsZXIgKCBub2RlLCBjYWxsYmFjayApIHtcblx0XHR0aGlzLm5vZGUgPSBub2RlO1xuXHRcdHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdHRoaXMucHJldmVudE1vdXNlZG93bkV2ZW50cyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5iaW5kKCBub2RlICk7XG5cdH1cblxuXHRUYXBIYW5kbGVyLnByb3RvdHlwZSA9IHtcblx0XHRiaW5kOiBmdW5jdGlvbiBiaW5kICggbm9kZSApIHtcblx0XHRcdC8vIGxpc3RlbiBmb3IgbW91c2UvcG9pbnRlciBldmVudHMuLi5cblx0XHRcdGlmICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSB7XG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgaGFuZGxlTW91c2Vkb3duLCBmYWxzZSApO1xuXHRcdFx0fSBlbHNlIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcblx0XHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKCAnTVNQb2ludGVyRG93bicsIGhhbmRsZU1vdXNlZG93biwgZmFsc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlZG93biwgZmFsc2UgKTtcblxuXHRcdFx0XHQvLyAuLi5hbmQgdG91Y2ggZXZlbnRzXG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaHN0YXJ0LCBmYWxzZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBuYXRpdmUgYnV0dG9ucywgYW5kIDxpbnB1dCB0eXBlPSdidXR0b24nPiBlbGVtZW50cywgc2hvdWxkIGZpcmUgYSB0YXAgZXZlbnRcblx0XHRcdC8vIHdoZW4gdGhlIHNwYWNlIGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiAoIG5vZGUudGFnTmFtZSA9PT0gJ0JVVFRPTicgfHwgbm9kZS50eXBlID09PSAnYnV0dG9uJyApIHtcblx0XHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCBoYW5kbGVGb2N1cywgZmFsc2UgKTtcblx0XHRcdH1cblxuXHRcdFx0bm9kZS5fX3RhcF9oYW5kbGVyX18gPSB0aGlzO1xuXHRcdH0sXG5cblx0XHRmaXJlOiBmdW5jdGlvbiBmaXJlICggZXZlbnQsIHgsIHkgKSB7XG5cdFx0XHR0aGlzLmNhbGxiYWNrKHtcblx0XHRcdFx0bm9kZTogdGhpcy5ub2RlLFxuXHRcdFx0XHRvcmlnaW5hbDogZXZlbnQsXG5cdFx0XHRcdHg6IHgsXG5cdFx0XHRcdHk6IHlcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRtb3VzZWRvd246IGZ1bmN0aW9uIG1vdXNlZG93biAoIGV2ZW50ICkge1xuXHRcdFx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0XHRcdGlmICggdGhpcy5wcmV2ZW50TW91c2Vkb3duRXZlbnRzICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZXZlbnQud2hpY2ggIT09IHVuZGVmaW5lZCAmJiBldmVudC53aGljaCAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0XHR2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG5cblx0XHRcdC8vIFRoaXMgd2lsbCBiZSBudWxsIGZvciBtb3VzZSBldmVudHMuXG5cdFx0XHR2YXIgcG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xuXG5cdFx0XHR2YXIgaGFuZGxlTW91c2V1cCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAoIGV2ZW50LnBvaW50ZXJJZCAhPSBwb2ludGVySWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcyQxLmZpcmUoIGV2ZW50LCB4LCB5ICk7XG5cdFx0XHRcdGNhbmNlbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0dmFyIGhhbmRsZU1vdXNlbW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAoIGV2ZW50LnBvaW50ZXJJZCAhPSBwb2ludGVySWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCAoIE1hdGguYWJzKCBldmVudC5jbGllbnRYIC0geCApID49IERJU1RBTkNFX1RIUkVTSE9MRCApIHx8ICggTWF0aC5hYnMoIGV2ZW50LmNsaWVudFkgLSB5ICkgPj0gRElTVEFOQ0VfVEhSRVNIT0xEICkgKSB7XG5cdFx0XHRcdFx0Y2FuY2VsKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHZhciBjYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMkMS5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJVcCcsIGhhbmRsZU1vdXNldXAsIGZhbHNlICk7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJNb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnTVNQb2ludGVyQ2FuY2VsJywgY2FuY2VsLCBmYWxzZSApO1xuXHRcdFx0XHR0aGlzJDEubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgaGFuZGxlTW91c2Vtb3ZlLCBmYWxzZSApO1xuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcmNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblx0XHRcdFx0dGhpcyQxLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlbW92ZSwgZmFsc2UgKTtcblx0XHRcdH07XG5cblx0XHRcdGlmICggd2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCApIHtcblx0XHRcdFx0dGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBoYW5kbGVNb3VzZXVwLCBmYWxzZSApO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcm1vdmUnLCBoYW5kbGVNb3VzZW1vdmUsIGZhbHNlICk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVyY2FuY2VsJywgY2FuY2VsLCBmYWxzZSApO1xuXHRcdFx0fSBlbHNlIGlmICggd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICkge1xuXHRcdFx0XHR0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlclVwJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ01TUG9pbnRlck1vdmUnLCBoYW5kbGVNb3VzZW1vdmUsIGZhbHNlICk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJDYW5jZWwnLCBjYW5jZWwsIGZhbHNlICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgaGFuZGxlTW91c2V1cCwgZmFsc2UgKTtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlbW92ZSwgZmFsc2UgKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0VGltZW91dCggY2FuY2VsLCBUSU1FX1RIUkVTSE9MRCApO1xuXHRcdH0sXG5cblx0XHR0b3VjaGRvd246IGZ1bmN0aW9uIHRvdWNoZG93biAoIGV2ZW50ICkge1xuXHRcdFx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0XHRcdHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG5cblx0XHRcdHZhciB4ID0gdG91Y2guY2xpZW50WDtcblx0XHRcdHZhciB5ID0gdG91Y2guY2xpZW50WTtcblxuXHRcdFx0dmFyIGZpbmdlciA9IHRvdWNoLmlkZW50aWZpZXI7XG5cblx0XHRcdHZhciBoYW5kbGVUb3VjaHVwID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHRcdGlmICggdG91Y2guaWRlbnRpZmllciAhPT0gZmluZ2VyICkge1xuXHRcdFx0XHRcdGNhbmNlbCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgY29tcGF0aWJpbGl0eSBtb3VzZSBldmVudFxuXG5cdFx0XHRcdC8vIGZvciB0aGUgYmVuZWZpdCBvZiBtb2JpbGUgRmlyZWZveCBhbmQgb2xkIEFuZHJvaWQgYnJvd3NlcnMsIHdlIG5lZWQgdGhpcyBhYnN1cmQgaGFjay5cblx0XHRcdFx0dGhpcyQxLnByZXZlbnRNb3VzZWRvd25FdmVudHMgPSB0cnVlO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoIHRoaXMkMS5wcmV2ZW50TW91c2Vkb3duVGltZW91dCApO1xuXG5cdFx0XHRcdHRoaXMkMS5wcmV2ZW50TW91c2Vkb3duVGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzJDEucHJldmVudE1vdXNlZG93bkV2ZW50cyA9IGZhbHNlO1xuXHRcdFx0XHR9LCA0MDAgKTtcblxuXHRcdFx0XHR0aGlzJDEuZmlyZSggZXZlbnQsIHgsIHkgKTtcblx0XHRcdFx0Y2FuY2VsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHR2YXIgaGFuZGxlVG91Y2htb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdGlmICggZXZlbnQudG91Y2hlcy5sZW5ndGggIT09IDEgfHwgZXZlbnQudG91Y2hlc1swXS5pZGVudGlmaWVyICE9PSBmaW5nZXIgKSB7XG5cdFx0XHRcdFx0Y2FuY2VsKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuXHRcdFx0XHRpZiAoICggTWF0aC5hYnMoIHRvdWNoLmNsaWVudFggLSB4ICkgPj0gRElTVEFOQ0VfVEhSRVNIT0xEICkgfHwgKCBNYXRoLmFicyggdG91Y2guY2xpZW50WSAtIHkgKSA+PSBESVNUQU5DRV9USFJFU0hPTEQgKSApIHtcblx0XHRcdFx0XHRjYW5jZWwoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dmFyIGNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcyQxLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2h1cCwgZmFsc2UgKTtcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaG1vdmUsIGZhbHNlICk7XG5cdFx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hjYW5jZWwnLCBjYW5jZWwsIGZhbHNlICk7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2h1cCwgZmFsc2UgKTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgaGFuZGxlVG91Y2htb3ZlLCBmYWxzZSApO1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGNhbmNlbCcsIGNhbmNlbCwgZmFsc2UgKTtcblxuXHRcdFx0c2V0VGltZW91dCggY2FuY2VsLCBUSU1FX1RIUkVTSE9MRCApO1xuXHRcdH0sXG5cblx0XHR0ZWFyZG93bjogZnVuY3Rpb24gdGVhcmRvd24gKCkge1xuXHRcdFx0dmFyIG5vZGUgPSB0aGlzLm5vZGU7XG5cblx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgICBoYW5kbGVNb3VzZWRvd24sIGZhbHNlICk7XG5cdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdNU1BvaW50ZXJEb3duJywgaGFuZGxlTW91c2Vkb3duLCBmYWxzZSApO1xuXHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgICAgIGhhbmRsZU1vdXNlZG93biwgZmFsc2UgKTtcblx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCAgICBoYW5kbGVUb3VjaHN0YXJ0LCBmYWxzZSApO1xuXHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnZm9jdXMnLCAgICAgICAgIGhhbmRsZUZvY3VzLCBmYWxzZSApO1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBoYW5kbGVNb3VzZWRvd24gKCBldmVudCApIHtcblx0XHR0aGlzLl9fdGFwX2hhbmRsZXJfXy5tb3VzZWRvd24oIGV2ZW50ICk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVUb3VjaHN0YXJ0ICggZXZlbnQgKSB7XG5cdFx0dGhpcy5fX3RhcF9oYW5kbGVyX18udG91Y2hkb3duKCBldmVudCApO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlRm9jdXMgKCkge1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duLCBmYWxzZSApO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBoYW5kbGVCbHVyLCBmYWxzZSApO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlQmx1ciAoKSB7XG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleWRvd24sIGZhbHNlICk7XG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnYmx1cicsIGhhbmRsZUJsdXIsIGZhbHNlICk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVLZXlkb3duICggZXZlbnQgKSB7XG5cdFx0aWYgKCBldmVudC53aGljaCA9PT0gMzIgKSB7IC8vIHNwYWNlIGtleVxuXHRcdFx0dGhpcy5fX3RhcF9oYW5kbGVyX18uZmlyZSgpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0YXA7XG5cbn0pKTsiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdGdsb2JhbC5SYWN0aXZlLnRyYW5zaXRpb25zLmZhZGUgPSBmYWN0b3J5KCk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5cdHZhciBERUZBVUxUUyA9IHtcblx0XHRkZWxheTogMCxcblx0XHRkdXJhdGlvbjogMzAwLFxuXHRcdGVhc2luZzogJ2xpbmVhcidcblx0fTtcblxuXHRmdW5jdGlvbiBmYWRlKHQsIHBhcmFtcykge1xuXHRcdHZhciB0YXJnZXRPcGFjaXR5O1xuXG5cdFx0cGFyYW1zID0gdC5wcm9jZXNzUGFyYW1zKHBhcmFtcywgREVGQVVMVFMpO1xuXG5cdFx0aWYgKHQuaXNJbnRybykge1xuXHRcdFx0dGFyZ2V0T3BhY2l0eSA9IHQuZ2V0U3R5bGUoJ29wYWNpdHknKTtcblx0XHRcdHQuc2V0U3R5bGUoJ29wYWNpdHknLCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0T3BhY2l0eSA9IDA7XG5cdFx0fVxuXG5cdFx0dC5hbmltYXRlU3R5bGUoJ29wYWNpdHknLCB0YXJnZXRPcGFjaXR5LCBwYXJhbXMpLnRoZW4odC5jb21wbGV0ZSk7XG5cdH1cblxuXHRyZXR1cm4gZmFkZTtcblxufSkpOyIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuU2Nyb2xsYmFyPWUoKTp0LlNjcm9sbGJhcj1lKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsZSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLnA9XCJcIixlKDApfShbZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDEpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbyh0KXtpZihBcnJheS5pc0FycmF5KHQpKXtmb3IodmFyIGU9MCxuPUFycmF5KHQubGVuZ3RoKTtlPHQubGVuZ3RoO2UrKyluW2VdPXRbZV07cmV0dXJuIG59cmV0dXJuKDAsdS5kZWZhdWx0KSh0KX12YXIgaT1uKDIpLHU9cihpKSxhPW4oNTUpLGM9cihhKSxsPW4oNjIpLGY9cihsKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBmLmRlZmF1bHQmJlwic3ltYm9sXCI9PXR5cGVvZiBjLmRlZmF1bHQ/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZi5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09Zi5kZWZhdWx0JiZ0IT09Zi5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSxkPW4oNzgpLGg9big4OSk7bigxMjkpLG4oMTQ1KSxuKDE1OCksbigxNzMpLG4oMTg3KSxlLmRlZmF1bHQ9ZC5TbW9vdGhTY3JvbGxiYXIsZC5TbW9vdGhTY3JvbGxiYXIudmVyc2lvbj1cIjcuMi45XCIsZC5TbW9vdGhTY3JvbGxiYXIuaW5pdD1mdW5jdGlvbih0LGUpe2lmKCF0fHwxIT09dC5ub2RlVHlwZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0IGVsZW1lbnQgdG8gYmUgRE9NIEVsZW1lbnQsIGJ1dCBnb3QgXCIrKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6cyh0KSkpO2lmKGguc2JMaXN0Lmhhcyh0KSlyZXR1cm4gaC5zYkxpc3QuZ2V0KHQpO3Quc2V0QXR0cmlidXRlKFwiZGF0YS1zY3JvbGxiYXJcIixcIlwiKTt2YXIgbj1bXS5jb25jYXQobyh0LmNoaWxkTm9kZXMpKSxyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ci5pbm5lckhUTUw9J1xcbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJzY3JvbGwtY29udGVudFwiPjwvYXJ0aWNsZT5cXG4gICAgICAgIDxhc2lkZSBjbGFzcz1cInNjcm9sbGJhci10cmFjayBzY3JvbGxiYXItdHJhY2steFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGxiYXItdGh1bWIgc2Nyb2xsYmFyLXRodW1iLXhcIj48L2Rpdj5cXG4gICAgICAgIDwvYXNpZGU+XFxuICAgICAgICA8YXNpZGUgY2xhc3M9XCJzY3JvbGxiYXItdHJhY2sgc2Nyb2xsYmFyLXRyYWNrLXlcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsYmFyLXRodW1iIHNjcm9sbGJhci10aHVtYi15XCI+PC9kaXY+XFxuICAgICAgICA8L2FzaWRlPlxcbiAgICAgICAgPGNhbnZhcyBjbGFzcz1cIm92ZXJzY3JvbGwtZ2xvd1wiPjwvY2FudmFzPlxcbiAgICAnO3ZhciBpPXIucXVlcnlTZWxlY3RvcihcIi5zY3JvbGwtY29udGVudFwiKTtyZXR1cm5bXS5jb25jYXQobyhyLmNoaWxkTm9kZXMpKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiB0LmFwcGVuZENoaWxkKGUpfSksbi5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBpLmFwcGVuZENoaWxkKHQpfSksbmV3IGQuU21vb3RoU2Nyb2xsYmFyKHQsZSl9LGQuU21vb3RoU2Nyb2xsYmFyLmluaXRBbGw9ZnVuY3Rpb24odCl7cmV0dXJuW10uY29uY2F0KG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChoLnNlbGVjdG9ycykpKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGQuU21vb3RoU2Nyb2xsYmFyLmluaXQoZSx0KX0pfSxkLlNtb290aFNjcm9sbGJhci5oYXM9ZnVuY3Rpb24odCl7cmV0dXJuIGguc2JMaXN0Lmhhcyh0KX0sZC5TbW9vdGhTY3JvbGxiYXIuZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiBoLnNiTGlzdC5nZXQodCl9LGQuU21vb3RoU2Nyb2xsYmFyLmdldEFsbD1mdW5jdGlvbigpe3JldHVybltdLmNvbmNhdChvKGguc2JMaXN0LnZhbHVlcygpKSl9LGQuU21vb3RoU2Nyb2xsYmFyLmRlc3Ryb3k9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZC5TbW9vdGhTY3JvbGxiYXIuaGFzKHQpJiZkLlNtb290aFNjcm9sbGJhci5nZXQodCkuZGVzdHJveShlKX0sZC5TbW9vdGhTY3JvbGxiYXIuZGVzdHJveUFsbD1mdW5jdGlvbih0KXtoLnNiTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuZGVzdHJveSh0KX0pfSx0LmV4cG9ydHM9ZS5kZWZhdWx0fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oMyksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDQpLG4oNDgpLHQuZXhwb3J0cz1uKDEyKS5BcnJheS5mcm9tfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1KSghMCk7big4KShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYpLG89big3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbil7dmFyIGksdSxhPVN0cmluZyhvKGUpKSxjPXIobiksbD1hLmxlbmd0aDtyZXR1cm4gYzwwfHxjPj1sP3Q/XCJcIjp2b2lkIDA6KGk9YS5jaGFyQ29kZUF0KGMpLGk8NTUyOTZ8fGk+NTYzMTl8fGMrMT09PWx8fCh1PWEuY2hhckNvZGVBdChjKzEpKTw1NjMyMHx8dT41NzM0Mz90P2EuY2hhckF0KGMpOmk6dD9hLnNsaWNlKGMsYysyKTooaS01NTI5Njw8MTApKyh1LTU2MzIwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLmNlaWwscj1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP3I6bikodCl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oOSksbz1uKDEwKSxpPW4oMjUpLHU9bigxNSksYT1uKDI2KSxjPW4oMjcpLGw9bigyOCksZj1uKDQ0KSxzPW4oNDYpLGQ9big0NSkoXCJpdGVyYXRvclwiKSxoPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksdj1cIkBAaXRlcmF0b3JcIixfPVwia2V5c1wiLHA9XCJ2YWx1ZXNcIix5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixiLGcsbSx4KXtsKG4sZSxiKTt2YXIgUyxFLE0sTz1mdW5jdGlvbih0KXtpZighaCYmdCBpbiBqKXJldHVybiBqW3RdO3N3aXRjaCh0KXtjYXNlIF86cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9O2Nhc2UgcDpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fSx3PWUrXCIgSXRlcmF0b3JcIixQPWc9PXAsaz0hMSxqPXQucHJvdG90eXBlLFQ9altkXXx8alt2XXx8ZyYmaltnXSxBPVR8fE8oZyksUj1nP1A/TyhcImVudHJpZXNcIik6QTp2b2lkIDAsTD1cIkFycmF5XCI9PWU/ai5lbnRyaWVzfHxUOlQ7aWYoTCYmKE09cyhMLmNhbGwobmV3IHQpKSxNIT09T2JqZWN0LnByb3RvdHlwZSYmKGYoTSx3LCEwKSxyfHxhKE0sZCl8fHUoTSxkLHkpKSksUCYmVCYmVC5uYW1lIT09cCYmKGs9ITAsQT1mdW5jdGlvbigpe3JldHVybiBULmNhbGwodGhpcyl9KSxyJiYheHx8IWgmJiFrJiZqW2RdfHx1KGosZCxBKSxjW2VdPUEsY1t3XT15LGcpaWYoUz17dmFsdWVzOlA/QTpPKHApLGtleXM6bT9BOk8oXyksZW50cmllczpSfSx4KWZvcihFIGluIFMpRSBpbiBqfHxpKGosRSxTW0VdKTtlbHNlIG8oby5QK28uRiooaHx8ayksZSxTKTtyZXR1cm4gU319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPSEwfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSksbz1uKDEyKSxpPW4oMTMpLHU9bigxNSksYT1cInByb3RvdHlwZVwiLGM9ZnVuY3Rpb24odCxlLG4pe3ZhciBsLGYscyxkPXQmYy5GLGg9dCZjLkcsdj10JmMuUyxfPXQmYy5QLHA9dCZjLkIseT10JmMuVyxiPWg/bzpvW2VdfHwob1tlXT17fSksZz1iW2FdLG09aD9yOnY/cltlXToocltlXXx8e30pW2FdO2gmJihuPWUpO2ZvcihsIGluIG4pZj0hZCYmbSYmdm9pZCAwIT09bVtsXSxmJiZsIGluIGJ8fChzPWY/bVtsXTpuW2xdLGJbbF09aCYmXCJmdW5jdGlvblwiIT10eXBlb2YgbVtsXT9uW2xdOnAmJmY/aShzLHIpOnkmJm1bbF09PXM/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGVbYV09dFthXSxlfShzKTpfJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBzP2koRnVuY3Rpb24uY2FsbCxzKTpzLF8mJigoYi52aXJ0dWFsfHwoYi52aXJ0dWFsPXt9KSlbbF09cyx0JmMuUiYmZyYmIWdbbF0mJnUoZyxsLHMpKSl9O2MuRj0xLGMuRz0yLGMuUz00LGMuUD04LGMuQj0xNixjLlc9MzIsYy5VPTY0LGMuUj0xMjgsdC5leHBvcnRzPWN9LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPXt2ZXJzaW9uOlwiMi40LjBcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1uKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTQpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixvKXtyZXR1cm4gdC5jYWxsKGUsbixyLG8pfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNiksbz1uKDI0KTt0LmV4cG9ydHM9bigyMCk/ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmYodCxlLG8oMSxuKSl9OmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdFtlXT1uLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDE5KSxpPW4oMjMpLHU9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIwKT9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksZT1pKGUsITApLHIobiksbyl0cnl7cmV0dXJuIHUodCxlLG4pfWNhdGNoKHQpe31pZihcImdldFwiaW4gbnx8XCJzZXRcImluIG4pdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO3JldHVyblwidmFsdWVcImluIG4mJih0W2VdPW4udmFsdWUpLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/bnVsbCE9PXQ6XCJmdW5jdGlvblwiPT10eXBlb2YgdH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMjApJiYhbigyMSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMjIpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMjEpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTgpLG89bigxMSkuZG9jdW1lbnQsaT1yKG8pJiZyKG8uY3JlYXRlRWxlbWVudCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpP28uY3JlYXRlRWxlbWVudCh0KTp7fX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE4KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixvO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue2VudW1lcmFibGU6ISgxJnQpLGNvbmZpZ3VyYWJsZTohKDImdCksd3JpdGFibGU6ISg0JnQpLHZhbHVlOmV9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDE1KX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjkpLG89bigyNCksaT1uKDQ0KSx1PXt9O24oMTUpKHUsbig0NSkoXCJpdGVyYXRvclwiKSxmdW5jdGlvbigpe3JldHVybiB0aGlzfSksdC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0LnByb3RvdHlwZT1yKHUse25leHQ6bygxLG4pfSksaSh0LGUrXCIgSXRlcmF0b3JcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDMwKSxpPW4oNDIpLHU9bigzOSkoXCJJRV9QUk9UT1wiKSxhPWZ1bmN0aW9uKCl7fSxjPVwicHJvdG90eXBlXCIsbD1mdW5jdGlvbigpe3ZhciB0LGU9bigyMikoXCJpZnJhbWVcIikscj1pLmxlbmd0aCxvPVwiPFwiLHU9XCI+XCI7Zm9yKGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixuKDQzKS5hcHBlbmRDaGlsZChlKSxlLnNyYz1cImphdmFzY3JpcHQ6XCIsdD1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQsdC5vcGVuKCksdC53cml0ZShvK1wic2NyaXB0XCIrdStcImRvY3VtZW50LkY9T2JqZWN0XCIrbytcIi9zY3JpcHRcIit1KSx0LmNsb3NlKCksbD10LkY7ci0tOylkZWxldGUgbFtjXVtpW3JdXTtyZXR1cm4gbCgpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KGFbY109cih0KSxuPW5ldyBhLGFbY109bnVsbCxuW3VdPXQpOm49bCgpLHZvaWQgMD09PWU/bjpvKG4sZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNiksbz1uKDE3KSxpPW4oMzEpO3QuZXhwb3J0cz1uKDIwKT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbih0LGUpe28odCk7Zm9yKHZhciBuLHU9aShlKSxhPXUubGVuZ3RoLGM9MDthPmM7KXIuZih0LG49dVtjKytdLGVbbl0pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzIpLG89big0Mik7dC5leHBvcnRzPU9iamVjdC5rZXlzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LG8pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjYpLG89bigzMyksaT1uKDM2KSghMSksdT1uKDM5KShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLGE9byh0KSxjPTAsbD1bXTtmb3IobiBpbiBhKW4hPXUmJnIoYSxuKSYmbC5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+YzspcihhLG49ZVtjKytdKSYmKH5pKGwsbil8fGwucHVzaChuKSk7cmV0dXJuIGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzNCksbz1uKDcpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihvKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM1KTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMyksbz1uKDM3KSxpPW4oMzgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLHUpe3ZhciBhLGM9cihlKSxsPW8oYy5sZW5ndGgpLGY9aSh1LGwpO2lmKHQmJm4hPW4pe2Zvcig7bD5mOylpZihhPWNbZisrXSxhIT1hKXJldHVybiEwfWVsc2UgZm9yKDtsPmY7ZisrKWlmKCh0fHxmIGluIGMpJiZjW2ZdPT09bilyZXR1cm4gdHx8Znx8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNiksbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9vKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYpLG89TWF0aC5tYXgsaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9vKHQrZSwwKTppKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0MCkoXCJrZXlzXCIpLG89big0MSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1vKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKSxvPVwiX19jb3JlLWpzX3NoYXJlZF9fXCIsaT1yW29dfHwocltvXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPVwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oMTEpLmRvY3VtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnR9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KS5mLG89bigyNiksaT1uKDQ1KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIW8odD1uP3Q6dC5wcm90b3R5cGUsaSkmJnIodCxpLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDApKFwid2tzXCIpLG89big0MSksaT1uKDExKS5TeW1ib2wsdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpLGE9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT11JiZpW3RdfHwodT9pOm8pKFwiU3ltYm9sLlwiK3QpKX07YS5zdG9yZT1yfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNiksbz1uKDQ3KSxpPW4oMzkpKFwiSUVfUFJPVE9cIiksdT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PW8odCkscih0LGkpP3RbaV06XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD91Om51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdChyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEzKSxvPW4oMTApLGk9big0NyksdT1uKDQ5KSxhPW4oNTApLGM9bigzNyksbD1uKDUxKSxmPW4oNTIpO28oby5TK28uRiohbig1NCkoZnVuY3Rpb24odCl7QXJyYXkuZnJvbSh0KX0pLFwiQXJyYXlcIix7ZnJvbTpmdW5jdGlvbih0KXt2YXIgZSxuLG8scyxkPWkodCksaD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzP3RoaXM6QXJyYXksdj1hcmd1bWVudHMubGVuZ3RoLF89dj4xP2FyZ3VtZW50c1sxXTp2b2lkIDAscD12b2lkIDAhPT1fLHk9MCxiPWYoZCk7aWYocCYmKF89cihfLHY+Mj9hcmd1bWVudHNbMl06dm9pZCAwLDIpKSx2b2lkIDA9PWJ8fGg9PUFycmF5JiZhKGIpKWZvcihlPWMoZC5sZW5ndGgpLG49bmV3IGgoZSk7ZT55O3krKylsKG4seSxwP18oZFt5XSx5KTpkW3ldKTtlbHNlIGZvcihzPWIuY2FsbChkKSxuPW5ldyBoOyEobz1zLm5leHQoKSkuZG9uZTt5KyspbChuLHkscD91KHMsXyxbby52YWx1ZSx5XSwhMCk6by52YWx1ZSk7cmV0dXJuIG4ubGVuZ3RoPXksbn19KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTcpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixvKXt0cnl7cmV0dXJuIG8/ZShyKG4pWzBdLG5bMV0pOmUobil9Y2F0Y2goZSl7dmFyIGk9dC5yZXR1cm47dGhyb3cgdm9pZCAwIT09aSYmcihpLmNhbGwodCkpLGV9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjcpLG89big0NSkoXCJpdGVyYXRvclwiKSxpPUFycmF5LnByb3RvdHlwZTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMCE9PXQmJihyLkFycmF5PT09dHx8aVtvXT09PXQpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMTYpLG89bigyNCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtlIGluIHQ/ci5mKHQsZSxvKDAsbikpOnRbZV09bn19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUzKSxvPW4oNDUpKFwiaXRlcmF0b3JcIiksaT1uKDI3KTt0LmV4cG9ydHM9bigxMikuZ2V0SXRlcmF0b3JNZXRob2Q9ZnVuY3Rpb24odCl7aWYodm9pZCAwIT10KXJldHVybiB0W29dfHx0W1wiQEBpdGVyYXRvclwiXXx8aVtyKHQpXX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM1KSxvPW4oNDUpKFwidG9TdHJpbmdUYWdcIiksaT1cIkFyZ3VtZW50c1wiPT1yKGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c30oKSksdT1mdW5jdGlvbih0LGUpe3RyeXtyZXR1cm4gdFtlXX1jYXRjaCh0KXt9fTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGUsbixhO3JldHVybiB2b2lkIDA9PT10P1wiVW5kZWZpbmVkXCI6bnVsbD09PXQ/XCJOdWxsXCI6XCJzdHJpbmdcIj09dHlwZW9mKG49dShlPU9iamVjdCh0KSxvKSk/bjppP3IoZSk6XCJPYmplY3RcIj09KGE9cihlKSkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUuY2FsbGVlP1wiQXJndW1lbnRzXCI6YX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ1KShcIml0ZXJhdG9yXCIpLG89ITE7dHJ5e3ZhciBpPVs3XVtyXSgpO2kucmV0dXJuPWZ1bmN0aW9uKCl7bz0hMH0sQXJyYXkuZnJvbShpLGZ1bmN0aW9uKCl7dGhyb3cgMn0pfWNhdGNoKHQpe310LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighZSYmIW8pcmV0dXJuITE7dmFyIG49ITE7dHJ5e3ZhciBpPVs3XSx1PWlbcl0oKTt1Lm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm57ZG9uZTpuPSEwfX0saVtyXT1mdW5jdGlvbigpe3JldHVybiB1fSx0KGkpfWNhdGNoKHQpe31yZXR1cm4gbn19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big1NiksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDQpLG4oNTcpLHQuZXhwb3J0cz1uKDYxKS5mKFwiaXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSxuKXtuKDU4KTtmb3IodmFyIHI9bigxMSksbz1uKDE1KSxpPW4oMjcpLHU9big0NSkoXCJ0b1N0cmluZ1RhZ1wiKSxhPVtcIk5vZGVMaXN0XCIsXCJET01Ub2tlbkxpc3RcIixcIk1lZGlhTGlzdFwiLFwiU3R5bGVTaGVldExpc3RcIixcIkNTU1J1bGVMaXN0XCJdLGM9MDtjPDU7YysrKXt2YXIgbD1hW2NdLGY9cltsXSxzPWYmJmYucHJvdG90eXBlO3MmJiFzW3VdJiZvKHMsdSxsKSxpW2xdPWkuQXJyYXl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1OSksbz1uKDYwKSxpPW4oMjcpLHU9bigzMyk7dC5leHBvcnRzPW4oOCkoQXJyYXksXCJBcnJheVwiLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD11KHQpLHRoaXMuX2k9MCx0aGlzLl9rPWV9LGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fdCxlPXRoaXMuX2ssbj10aGlzLl9pKys7cmV0dXJuIXR8fG4+PXQubGVuZ3RoPyh0aGlzLl90PXZvaWQgMCxvKDEpKTpcImtleXNcIj09ZT9vKDAsbik6XCJ2YWx1ZXNcIj09ZT9vKDAsdFtuXSk6bygwLFtuLHRbbl1dKX0sXCJ2YWx1ZXNcIiksaS5Bcmd1bWVudHM9aS5BcnJheSxyKFwia2V5c1wiKSxyKFwidmFsdWVzXCIpLHIoXCJlbnRyaWVzXCIpfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbigpe319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue3ZhbHVlOmUsZG9uZTohIXR9fX0sZnVuY3Rpb24odCxlLG4pe2UuZj1uKDQ1KX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDYzKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNjQpLG4oNzUpLG4oNzYpLG4oNzcpLHQuZXhwb3J0cz1uKDEyKS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDExKSxvPW4oMjYpLGk9bigyMCksdT1uKDEwKSxhPW4oMjUpLGM9big2NSkuS0VZLGw9bigyMSksZj1uKDQwKSxzPW4oNDQpLGQ9big0MSksaD1uKDQ1KSx2PW4oNjEpLF89big2NikscD1uKDY3KSx5PW4oNjgpLGI9big3MSksZz1uKDE3KSxtPW4oMzMpLHg9bigyMyksUz1uKDI0KSxFPW4oMjkpLE09big3MiksTz1uKDc0KSx3PW4oMTYpLFA9bigzMSksaz1PLmYsaj13LmYsVD1NLmYsQT1yLlN5bWJvbCxSPXIuSlNPTixMPVImJlIuc3RyaW5naWZ5LEk9XCJwcm90b3R5cGVcIixEPWgoXCJfaGlkZGVuXCIpLEM9aChcInRvUHJpbWl0aXZlXCIpLE49e30ucHJvcGVydHlJc0VudW1lcmFibGUsRj1mKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLEg9ZihcInN5bWJvbHNcIiksej1mKFwib3Atc3ltYm9sc1wiKSxCPU9iamVjdFtJXSxHPVwiZnVuY3Rpb25cIj09dHlwZW9mIEEsVz1yLlFPYmplY3QsVj0hV3x8IVdbSV18fCFXW0ldLmZpbmRDaGlsZCxVPWkmJmwoZnVuY3Rpb24oKXtyZXR1cm4gNyE9RShqKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaih0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1rKEIsZSk7ciYmZGVsZXRlIEJbZV0saih0LGUsbiksciYmdCE9PUImJmooQixlLHIpfTpqLFg9ZnVuY3Rpb24odCl7dmFyIGU9SFt0XT1FKEFbSV0pO3JldHVybiBlLl9rPXQsZX0scT1HJiZcInN5bWJvbFwiPT10eXBlb2YgQS5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBBfSxLPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PUImJksoeixlLG4pLGcodCksZT14KGUsITApLGcobiksbyhILGUpPyhuLmVudW1lcmFibGU/KG8odCxEKSYmdFtEXVtlXSYmKHRbRF1bZV09ITEpLG49RShuLHtlbnVtZXJhYmxlOlMoMCwhMSl9KSk6KG8odCxEKXx8aih0LEQsUygxLHt9KSksdFtEXVtlXT0hMCksVSh0LGUsbikpOmoodCxlLG4pfSxKPWZ1bmN0aW9uKHQsZSl7Zyh0KTtmb3IodmFyIG4scj15KGU9bShlKSksbz0wLGk9ci5sZW5ndGg7aT5vOylLKHQsbj1yW28rK10sZVtuXSk7cmV0dXJuIHR9LFk9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT9FKHQpOkooRSh0KSxlKX0sUT1mdW5jdGlvbih0KXt2YXIgZT1OLmNhbGwodGhpcyx0PXgodCwhMCkpO3JldHVybiEodGhpcz09PUImJm8oSCx0KSYmIW8oeix0KSkmJighKGV8fCFvKHRoaXMsdCl8fCFvKEgsdCl8fG8odGhpcyxEKSYmdGhpc1tEXVt0XSl8fGUpfSxaPWZ1bmN0aW9uKHQsZSl7aWYodD1tKHQpLGU9eChlLCEwKSx0IT09Qnx8IW8oSCxlKXx8byh6LGUpKXt2YXIgbj1rKHQsZSk7cmV0dXJuIW58fCFvKEgsZSl8fG8odCxEKSYmdFtEXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LCQ9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49VChtKHQpKSxyPVtdLGk9MDtuLmxlbmd0aD5pOylvKEgsZT1uW2krK10pfHxlPT1EfHxlPT1jfHxyLnB1c2goZSk7cmV0dXJuIHJ9LHR0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1CLHI9VChuP3o6bSh0KSksaT1bXSx1PTA7ci5sZW5ndGg+dTspIW8oSCxlPXJbdSsrXSl8fG4mJiFvKEIsZSl8fGkucHVzaChIW2VdKTtyZXR1cm4gaX07R3x8KEE9ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgQSl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PWQoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PUImJmUuY2FsbCh6LG4pLG8odGhpcyxEKSYmbyh0aGlzW0RdLHQpJiYodGhpc1tEXVt0XT0hMSksVSh0aGlzLHQsUygxLG4pKX07cmV0dXJuIGkmJlYmJlUoQix0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxYKHQpfSxhKEFbSV0sXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxPLmY9Wix3LmY9SyxuKDczKS5mPU0uZj0kLG4oNzApLmY9USxuKDY5KS5mPXR0LGkmJiFuKDkpJiZhKEIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFEsITApLHYuZj1mdW5jdGlvbih0KXtyZXR1cm4gWChoKHQpKX0pLHUodS5HK3UuVyt1LkYqIUcse1N5bWJvbDpBfSk7Zm9yKHZhciBldD1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLG50PTA7ZXQubGVuZ3RoPm50OyloKGV0W250KytdKTtmb3IodmFyIGV0PVAoaC5zdG9yZSksbnQ9MDtldC5sZW5ndGg+bnQ7KV8oZXRbbnQrK10pO3UodS5TK3UuRiohRyxcIlN5bWJvbFwiLHtmb3I6ZnVuY3Rpb24odCl7cmV0dXJuIG8oRix0Kz1cIlwiKT9GW3RdOkZbdF09QSh0KX0sa2V5Rm9yOmZ1bmN0aW9uKHQpe2lmKHEodCkpcmV0dXJuIHAoRix0KTt0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBzeW1ib2whXCIpfSx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtWPSEwfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtWPSExfX0pLHUodS5TK3UuRiohRyxcIk9iamVjdFwiLHtjcmVhdGU6WSxkZWZpbmVQcm9wZXJ0eTpLLGRlZmluZVByb3BlcnRpZXM6SixnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6WixnZXRPd25Qcm9wZXJ0eU5hbWVzOiQsZ2V0T3duUHJvcGVydHlTeW1ib2xzOnR0fSksUiYmdSh1LlMrdS5GKighR3x8bChmdW5jdGlvbigpe3ZhciB0PUEoKTtyZXR1cm5cIltudWxsXVwiIT1MKFt0XSl8fFwie31cIiE9TCh7YTp0fSl8fFwie31cIiE9TChPYmplY3QodCkpfSkpLFwiSlNPTlwiLHtzdHJpbmdpZnk6ZnVuY3Rpb24odCl7aWYodm9pZCAwIT09dCYmIXEodCkpe2Zvcih2YXIgZSxuLHI9W3RdLG89MTthcmd1bWVudHMubGVuZ3RoPm87KXIucHVzaChhcmd1bWVudHNbbysrXSk7cmV0dXJuIGU9clsxXSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lKSwhbiYmYihlKXx8KGU9ZnVuY3Rpb24odCxlKXtpZihuJiYoZT1uLmNhbGwodGhpcyx0LGUpKSwhcShlKSlyZXR1cm4gZX0pLHJbMV09ZSxMLmFwcGx5KFIscil9fX0pLEFbSV1bQ118fG4oMTUpKEFbSV0sQyxBW0ldLnZhbHVlT2YpLHMoQSxcIlN5bWJvbFwiKSxzKE1hdGgsXCJNYXRoXCIsITApLHMoci5KU09OLFwiSlNPTlwiLCEwKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDEpKFwibWV0YVwiKSxvPW4oMTgpLGk9bigyNiksdT1uKDE2KS5mLGE9MCxjPU9iamVjdC5pc0V4dGVuc2libGV8fGZ1bmN0aW9uKCl7cmV0dXJuITB9LGw9IW4oMjEpKGZ1bmN0aW9uKCl7cmV0dXJuIGMoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSl9KSxmPWZ1bmN0aW9uKHQpe3UodCxyLHt2YWx1ZTp7aTpcIk9cIisgKythLHc6e319fSl9LHM9ZnVuY3Rpb24odCxlKXtpZighbyh0KSlyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdD90OihcInN0cmluZ1wiPT10eXBlb2YgdD9cIlNcIjpcIlBcIikrdDtpZighaSh0LHIpKXtpZighYyh0KSlyZXR1cm5cIkZcIjtpZighZSlyZXR1cm5cIkVcIjtmKHQpfXJldHVybiB0W3JdLml9LGQ9ZnVuY3Rpb24odCxlKXtpZighaSh0LHIpKXtpZighYyh0KSlyZXR1cm4hMDtpZighZSlyZXR1cm4hMTtmKHQpfXJldHVybiB0W3JdLnd9LGg9ZnVuY3Rpb24odCl7cmV0dXJuIGwmJnYuTkVFRCYmYyh0KSYmIWkodCxyKSYmZih0KSx0fSx2PXQuZXhwb3J0cz17S0VZOnIsTkVFRDohMSxmYXN0S2V5OnMsZ2V0V2VhazpkLG9uRnJlZXplOmh9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSksbz1uKDEyKSxpPW4oOSksdT1uKDYxKSxhPW4oMTYpLmY7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPW8uU3ltYm9sfHwoby5TeW1ib2w9aT97fTpyLlN5bWJvbHx8e30pO1wiX1wiPT10LmNoYXJBdCgwKXx8dCBpbiBlfHxhKGUsdCx7dmFsdWU6dS5mKHQpfSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMSksbz1uKDMzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4saT1vKHQpLHU9cihpKSxhPXUubGVuZ3RoLGM9MDthPmM7KWlmKGlbbj11W2MrK11dPT09ZSlyZXR1cm4gbn19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMxKSxvPW4oNjkpLGk9big3MCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXIodCksbj1vLmY7aWYobilmb3IodmFyIHUsYT1uKHQpLGM9aS5mLGw9MDthLmxlbmd0aD5sOyljLmNhbGwodCx1PWFbbCsrXSkmJmUucHVzaCh1KTtyZXR1cm4gZX19LGZ1bmN0aW9uKHQsZSl7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHN9LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzNSk7dC5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVyblwiQXJyYXlcIj09cih0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMzKSxvPW4oNzMpLmYsaT17fS50b1N0cmluZyx1PVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdyYmT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM/T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KTpbXSxhPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gbyh0KX1jYXRjaCh0KXtyZXR1cm4gdS5zbGljZSgpfX07dC5leHBvcnRzLmY9ZnVuY3Rpb24odCl7cmV0dXJuIHUmJlwiW29iamVjdCBXaW5kb3ddXCI9PWkuY2FsbCh0KT9hKHQpOm8ocih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMiksbz1uKDQyKS5jb25jYXQoXCJsZW5ndGhcIixcInByb3RvdHlwZVwiKTtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsbyl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big3MCksbz1uKDI0KSxpPW4oMzMpLHU9bigyMyksYT1uKDI2KSxjPW4oMTkpLGw9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtlLmY9bigyMCk/bDpmdW5jdGlvbih0LGUpe2lmKHQ9aSh0KSxlPXUoZSwhMCksYyl0cnl7cmV0dXJuIGwodCxlKX1jYXRjaCh0KXt9aWYoYSh0LGUpKXJldHVybiBvKCFyLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSxuKXtuKDY2KShcImFzeW5jSXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSxuKXtuKDY2KShcIm9ic2VydmFibGVcIil9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBvKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX12YXIgaT1uKDc5KSx1PXIoaSksYT1uKDgyKSxjPXIoYSksbD1uKDg2KSxmPXIobCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5TbW9vdGhTY3JvbGxiYXI9dm9pZCAwO3ZhciBzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSwoMCxmLmRlZmF1bHQpKHQsci5rZXkscil9fXJldHVybiBmdW5jdGlvbihlLG4scil7cmV0dXJuIG4mJnQoZS5wcm90b3R5cGUsbiksciYmdChlLHIpLGV9fSgpLGQ9big4OSksaD1uKDExMik7ZS5TbW9vdGhTY3JvbGxiYXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUpe3ZhciBuPXRoaXMscj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e307byh0aGlzLHQpLGUuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIixcIjFcIiksZS5zY3JvbGxUb3A9ZS5zY3JvbGxMZWZ0PTA7dmFyIGk9KDAsaC5maW5kQ2hpbGQpKGUsXCJzY3JvbGwtY29udGVudFwiKSxhPSgwLGguZmluZENoaWxkKShlLFwib3ZlcnNjcm9sbC1nbG93XCIpLGw9KDAsaC5maW5kQ2hpbGQpKGUsXCJzY3JvbGxiYXItdHJhY2steFwiKSxmPSgwLGguZmluZENoaWxkKShlLFwic2Nyb2xsYmFyLXRyYWNrLXlcIik7aWYoKDAsaC5zZXRTdHlsZSkoZSx7b3ZlcmZsb3c6XCJoaWRkZW5cIixvdXRsaW5lOlwibm9uZVwifSksKDAsaC5zZXRTdHlsZSkoYSx7ZGlzcGxheTpcIm5vbmVcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCJ9KSx0aGlzLl9fcmVhZG9ubHkoXCJ0YXJnZXRzXCIsKDAsYy5kZWZhdWx0KSh7Y29udGFpbmVyOmUsY29udGVudDppLGNhbnZhczp7ZWxlbTphLGNvbnRleHQ6YS5nZXRDb250ZXh0KFwiMmRcIil9LHhBeGlzOigwLGMuZGVmYXVsdCkoe3RyYWNrOmwsdGh1bWI6KDAsaC5maW5kQ2hpbGQpKGwsXCJzY3JvbGxiYXItdGh1bWIteFwiKX0pLHlBeGlzOigwLGMuZGVmYXVsdCkoe3RyYWNrOmYsdGh1bWI6KDAsaC5maW5kQ2hpbGQpKGYsXCJzY3JvbGxiYXItdGh1bWIteVwiKX0pfSkpLl9fcmVhZG9ubHkoXCJvZmZzZXRcIix7eDowLHk6MH0pLl9fcmVhZG9ubHkoXCJ0aHVtYk9mZnNldFwiLHt4OjAseTowfSkuX19yZWFkb25seShcImxpbWl0XCIse3g6MS8wLHk6MS8wfSkuX19yZWFkb25seShcIm1vdmVtZW50XCIse3g6MCx5OjB9KS5fX3JlYWRvbmx5KFwibW92ZW1lbnRMb2NrZWRcIix7eDohMSx5OiExfSkuX19yZWFkb25seShcIm92ZXJzY3JvbGxSZW5kZXJlZFwiLHt4OjAseTowfSkuX19yZWFkb25seShcIm92ZXJzY3JvbGxCYWNrXCIsITEpLl9fcmVhZG9ubHkoXCJ0aHVtYlNpemVcIix7eDowLHk6MCxyZWFsWDowLHJlYWxZOjB9KS5fX3JlYWRvbmx5KFwiYm91bmRpbmdcIix7dG9wOjAscmlnaHQ6MCxib3R0b206MCxsZWZ0OjB9KS5fX3JlYWRvbmx5KFwiY2hpbGRyZW5cIixbXSkuX19yZWFkb25seShcInBhcmVudHNcIixbXSkuX19yZWFkb25seShcInNpemVcIix0aGlzLmdldFNpemUoKSkuX19yZWFkb25seShcImlzTmVzdGVkU2Nyb2xsYmFyXCIsITEpLCgwLHUuZGVmYXVsdCkodGhpcyx7X19oaWRlVHJhY2tUaHJvdHRsZTp7dmFsdWU6KDAsaC5kZWJvdW5jZSkodGhpcy5oaWRlVHJhY2suYmluZCh0aGlzKSwxZTMsITEpfSxfX3VwZGF0ZVRocm90dGxlOnt2YWx1ZTooMCxoLmRlYm91bmNlKSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKX0sX190b3VjaFJlY29yZDp7dmFsdWU6bmV3IGguVG91Y2hSZWNvcmR9LF9fbGlzdGVuZXJzOnt2YWx1ZTpbXX0sX19oYW5kbGVyczp7dmFsdWU6W119LF9fY2hpbGRyZW46e3ZhbHVlOltdfSxfX3RpbWVySUQ6e3ZhbHVlOnt9fX0pLHRoaXMuX19pbml0T3B0aW9ucyhyKSx0aGlzLl9faW5pdFNjcm9sbGJhcigpLGQuc2JMaXN0LnNldChlLHRoaXMpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGQuR0xPQkFMX0VOVi5NdXRhdGlvbk9ic2VydmVyKXt2YXIgcz1uZXcgZC5HTE9CQUxfRU5WLk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oKXtuLnVwZGF0ZSghMCl9KTtzLm9ic2VydmUoaSx7Y2hpbGRMaXN0OiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJfX29ic2VydmVyXCIse3ZhbHVlOnN9KX19cmV0dXJuIHModCxbe2tleTpcIk1BWF9PVkVSU0NST0xMXCIsZ2V0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRpb25zLGU9dGhpcy5zaXplO3N3aXRjaCh0Lm92ZXJzY3JvbGxFZmZlY3Qpe2Nhc2VcImJvdW5jZVwiOnZhciBuPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGgucG93KGUuY29udGFpbmVyLndpZHRoLDIpK01hdGgucG93KGUuY29udGFpbmVyLmhlaWdodCwyKSkpLHI9dGhpcy5fX2lzTW92ZW1lbnRMb2NrZWQoKT8yOjEwO3JldHVybiBkLkdMT0JBTF9FTlYuVE9VQ0hfU1VQUE9SVEVEPygwLGgucGlja0luUmFuZ2UpKG4vciwxMDAsMWUzKTooMCxoLnBpY2tJblJhbmdlKShuLzEwLDI1LDUwKTtjYXNlXCJnbG93XCI6cmV0dXJuIDE1MDtkZWZhdWx0OnJldHVybiAwfX19LHtrZXk6XCJzY3JvbGxUb3BcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vZmZzZXQueX19LHtrZXk6XCJzY3JvbGxMZWZ0XCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub2Zmc2V0Lnh9fV0pLHR9KCl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big4MCksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDgxKTt2YXIgcj1uKDEyKS5PYmplY3Q7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHIuZGVmaW5lUHJvcGVydGllcyh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApO3Ioci5TK3IuRiohbigyMCksXCJPYmplY3RcIix7ZGVmaW5lUHJvcGVydGllczpuKDMwKX0pfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oODMpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big4NCksdC5leHBvcnRzPW4oMTIpLk9iamVjdC5mcmVlemV9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE4KSxvPW4oNjUpLm9uRnJlZXplO24oODUpKFwiZnJlZXplXCIsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0JiZyKGUpP3QobyhlKSk6ZX19KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApLG89bigxMiksaT1uKDIxKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj0oby5PYmplY3R8fHt9KVt0XXx8T2JqZWN0W3RdLHU9e307dVt0XT1lKG4pLHIoci5TK3IuRippKGZ1bmN0aW9uKCl7bigxKX0pLFwiT2JqZWN0XCIsdSl9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oODcpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big4OCk7dmFyIHI9bigxMikuT2JqZWN0O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZGVmaW5lUHJvcGVydHkodCxlLG4pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApO3Ioci5TK3IuRiohbigyMCksXCJPYmplY3RcIix7ZGVmaW5lUHJvcGVydHk6bigxNikuZn0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oOTMpOygwLGEuZGVmYXVsdCkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDkxKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oOTIpLHQuZXhwb3J0cz1uKDEyKS5PYmplY3Qua2V5c30sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDcpLG89bigzMSk7big4NSkoXCJrZXlzXCIsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG8ocih0KSl9fSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9big5NCk7KDAsYS5kZWZhdWx0KShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pO3ZhciBsPW4oOTUpOygwLGEuZGVmYXVsdCkobCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGxbdF19fSl9KTt2YXIgZj1uKDExMSk7KDAsYS5kZWZhdWx0KShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZlt0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPWZ1bmN0aW9uKHQpe3ZhciBlPXt9LG49e307cmV0dXJuKDAsYS5kZWZhdWx0KSh0KS5mb3JFYWNoKGZ1bmN0aW9uKHIpeygwLGkuZGVmYXVsdCkoZSxyLHtnZXQ6ZnVuY3Rpb24oKXtpZighbi5oYXNPd25Qcm9wZXJ0eShyKSl7dmFyIGU9dFtyXTtuW3JdPWUoKX1yZXR1cm4gbltyXX19KX0pLGV9LGw9e011dGF0aW9uT2JzZXJ2ZXI6ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXJ8fHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyfHx3aW5kb3cuTW96TXV0YXRpb25PYnNlcnZlcn0sVE9VQ0hfU1VQUE9SVEVEOmZ1bmN0aW9uKCl7cmV0dXJuXCJvbnRvdWNoc3RhcnRcImluIGRvY3VtZW50fSxFQVNJTkdfTVVMVElQTElFUjpmdW5jdGlvbigpe3JldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkLyk/LjU6LjI1fSxXSEVFTF9FVkVOVDpmdW5jdGlvbigpe3JldHVyblwib253aGVlbFwiaW4gd2luZG93P1wid2hlZWxcIjpcIm1vdXNld2hlZWxcIn19O2UuR0xPQkFMX0VOVj1jKGwpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big5NiksaT1yKG8pO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciB1PW5ldyBpLmRlZmF1bHQsYT11LnNldC5iaW5kKHUpLGM9dS5kZWxldGUuYmluZCh1KTt1LnVwZGF0ZT1mdW5jdGlvbigpe3UuZm9yRWFjaChmdW5jdGlvbih0KXt0Ll9fdXBkYXRlVHJlZSgpfSl9LHUuZGVsZXRlPWZ1bmN0aW9uKCl7dmFyIHQ9Yy5hcHBseSh2b2lkIDAsYXJndW1lbnRzKTtyZXR1cm4gdS51cGRhdGUoKSx0fSx1LnNldD1mdW5jdGlvbigpe3ZhciB0PWEuYXBwbHkodm9pZCAwLGFyZ3VtZW50cyk7cmV0dXJuIHUudXBkYXRlKCksdH0sZS5zYkxpc3Q9dX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDk3KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNzUpLG4oNCksbig1Nyksbig5OCksbigxMDgpLHQuZXhwb3J0cz1uKDEyKS5NYXB9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDk5KTt0LmV4cG9ydHM9bigxMDQpKFwiTWFwXCIsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQodGhpcyxhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCl9fSx7Z2V0OmZ1bmN0aW9uKHQpe3ZhciBlPXIuZ2V0RW50cnkodGhpcyx0KTtyZXR1cm4gZSYmZS52fSxzZXQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gci5kZWYodGhpcywwPT09dD8wOnQsZSl9fSxyLCEwKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMTYpLmYsbz1uKDI5KSxpPW4oMTAwKSx1PW4oMTMpLGE9bigxMDEpLGM9big3KSxsPW4oMTAyKSxmPW4oOCkscz1uKDYwKSxkPW4oMTAzKSxoPW4oMjApLHY9big2NSkuZmFzdEtleSxfPWg/XCJfc1wiOlwic2l6ZVwiLHA9ZnVuY3Rpb24odCxlKXt2YXIgbixyPXYoZSk7aWYoXCJGXCIhPT1yKXJldHVybiB0Ll9pW3JdO2ZvcihuPXQuX2Y7bjtuPW4ubilpZihuLms9PWUpcmV0dXJuIG59O3QuZXhwb3J0cz17Z2V0Q29uc3RydWN0b3I6ZnVuY3Rpb24odCxlLG4sZil7dmFyIHM9dChmdW5jdGlvbih0LHIpe2EodCxzLGUsXCJfaVwiKSx0Ll9pPW8obnVsbCksdC5fZj12b2lkIDAsdC5fbD12b2lkIDAsdFtfXT0wLHZvaWQgMCE9ciYmbChyLG4sdFtmXSx0KX0pO3JldHVybiBpKHMucHJvdG90eXBlLHtjbGVhcjpmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLGU9dC5faSxuPXQuX2Y7bjtuPW4ubiluLnI9ITAsbi5wJiYobi5wPW4ucC5uPXZvaWQgMCksZGVsZXRlIGVbbi5pXTt0Ll9mPXQuX2w9dm9pZCAwLHRbX109MH0sZGVsZXRlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj1wKGUsdCk7aWYobil7dmFyIHI9bi5uLG89bi5wO2RlbGV0ZSBlLl9pW24uaV0sbi5yPSEwLG8mJihvLm49ciksciYmKHIucD1vKSxlLl9mPT1uJiYoZS5fZj1yKSxlLl9sPT1uJiYoZS5fbD1vKSxlW19dLS19cmV0dXJuISFufSxmb3JFYWNoOmZ1bmN0aW9uKHQpe2EodGhpcyxzLFwiZm9yRWFjaFwiKTtmb3IodmFyIGUsbj11KHQsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDAsMyk7ZT1lP2Uubjp0aGlzLl9mOylmb3IobihlLnYsZS5rLHRoaXMpO2UmJmUucjspZT1lLnB9LGhhczpmdW5jdGlvbih0KXtyZXR1cm4hIXAodGhpcyx0KX19KSxoJiZyKHMucHJvdG90eXBlLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYyh0aGlzW19dKX19KSxzfSxkZWY6ZnVuY3Rpb24odCxlLG4pe3ZhciByLG8saT1wKHQsZSk7cmV0dXJuIGk/aS52PW46KHQuX2w9aT17aTpvPXYoZSwhMCksazplLHY6bixwOnI9dC5fbCxuOnZvaWQgMCxyOiExfSx0Ll9mfHwodC5fZj1pKSxyJiYoci5uPWkpLHRbX10rKyxcIkZcIiE9PW8mJih0Ll9pW29dPWkpKSx0fSxnZXRFbnRyeTpwLHNldFN0cm9uZzpmdW5jdGlvbih0LGUsbil7Zih0LGUsZnVuY3Rpb24odCxlKXt0aGlzLl90PXQsdGhpcy5faz1lLHRoaXMuX2w9dm9pZCAwfSxmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLGU9dC5fayxuPXQuX2w7biYmbi5yOyluPW4ucDtyZXR1cm4gdC5fdCYmKHQuX2w9bj1uP24ubjp0Ll90Ll9mKT9cImtleXNcIj09ZT9zKDAsbi5rKTpcInZhbHVlc1wiPT1lP3MoMCxuLnYpOnMoMCxbbi5rLG4udl0pOih0Ll90PXZvaWQgMCxzKDEpKX0sbj9cImVudHJpZXNcIjpcInZhbHVlc1wiLCFuLCEwKSxkKGUpfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2Zvcih2YXIgbyBpbiBlKW4mJnRbb10/dFtvXT1lW29dOnIodCxvLGVbb10pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scil7aWYoISh0IGluc3RhbmNlb2YgZSl8fHZvaWQgMCE9PXImJnIgaW4gdCl0aHJvdyBUeXBlRXJyb3IobitcIjogaW5jb3JyZWN0IGludm9jYXRpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTMpLG89big0OSksaT1uKDUwKSx1PW4oMTcpLGE9bigzNyksYz1uKDUyKSxsPXt9LGY9e30sZT10LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scyxkKXt2YXIgaCx2LF8scCx5PWQ/ZnVuY3Rpb24oKXtyZXR1cm4gdH06Yyh0KSxiPXIobixzLGU/MjoxKSxnPTA7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgeSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgaXRlcmFibGUhXCIpO2lmKGkoeSkpe2ZvcihoPWEodC5sZW5ndGgpO2g+ZztnKyspaWYocD1lP2IodSh2PXRbZ10pWzBdLHZbMV0pOmIodFtnXSkscD09PWx8fHA9PT1mKXJldHVybiBwfWVsc2UgZm9yKF89eS5jYWxsKHQpOyEodj1fLm5leHQoKSkuZG9uZTspaWYocD1vKF8sYix2LnZhbHVlLGUpLHA9PT1sfHxwPT09ZilyZXR1cm4gcH07ZS5CUkVBSz1sLGUuUkVUVVJOPWZ9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDExKSxvPW4oMTIpLGk9bigxNiksdT1uKDIwKSxhPW4oNDUpKFwic3BlY2llc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9XCJmdW5jdGlvblwiPT10eXBlb2Ygb1t0XT9vW3RdOnJbdF07dSYmZSYmIWVbYV0mJmkuZihlLGEse2NvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc319KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDExKSxvPW4oMTApLGk9big2NSksdT1uKDIxKSxhPW4oMTUpLGM9bigxMDApLGw9bigxMDIpLGY9bigxMDEpLHM9bigxOCksZD1uKDQ0KSxoPW4oMTYpLmYsdj1uKDEwNSkoMCksXz1uKDIwKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scCx5LGIpe3ZhciBnPXJbdF0sbT1nLHg9eT9cInNldFwiOlwiYWRkXCIsUz1tJiZtLnByb3RvdHlwZSxFPXt9O3JldHVybiBfJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBtJiYoYnx8Uy5mb3JFYWNoJiYhdShmdW5jdGlvbigpeyhuZXcgbSkuZW50cmllcygpLm5leHQoKX0pKT8obT1lKGZ1bmN0aW9uKGUsbil7ZihlLG0sdCxcIl9jXCIpLGUuX2M9bmV3IGcsdm9pZCAwIT1uJiZsKG4seSxlW3hdLGUpfSksdihcImFkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTlwiLnNwbGl0KFwiLFwiKSxmdW5jdGlvbih0KXt2YXIgZT1cImFkZFwiPT10fHxcInNldFwiPT10O3QgaW4gUyYmKCFifHxcImNsZWFyXCIhPXQpJiZhKG0ucHJvdG90eXBlLHQsZnVuY3Rpb24obixyKXtpZihmKHRoaXMsbSx0KSwhZSYmYiYmIXMobikpcmV0dXJuXCJnZXRcIj09dCYmdm9pZCAwO3ZhciBvPXRoaXMuX2NbdF0oMD09PW4/MDpuLHIpO3JldHVybiBlP3RoaXM6b30pfSksXCJzaXplXCJpbiBTJiZoKG0ucHJvdG90eXBlLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYy5zaXplfX0pKToobT1wLmdldENvbnN0cnVjdG9yKGUsdCx5LHgpLGMobS5wcm90b3R5cGUsbiksaS5ORUVEPSEwKSxkKG0sdCksRVt0XT1tLG8oby5HK28uVytvLkYsRSksYnx8cC5zZXRTdHJvbmcobSx0LHkpLG19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyksbz1uKDM0KSxpPW4oNDcpLHU9bigzNyksYT1uKDEwNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG49MT09dCxjPTI9PXQsbD0zPT10LGY9ND09dCxzPTY9PXQsZD01PT10fHxzLGg9ZXx8YTtyZXR1cm4gZnVuY3Rpb24oZSxhLHYpe2Zvcih2YXIgXyxwLHk9aShlKSxiPW8oeSksZz1yKGEsdiwzKSxtPXUoYi5sZW5ndGgpLHg9MCxTPW4/aChlLG0pOmM/aChlLDApOnZvaWQgMDttPng7eCsrKWlmKChkfHx4IGluIGIpJiYoXz1iW3hdLHA9ZyhfLHgseSksdCkpaWYobilTW3hdPXA7ZWxzZSBpZihwKXN3aXRjaCh0KXtjYXNlIDM6cmV0dXJuITA7Y2FzZSA1OnJldHVybiBfO2Nhc2UgNjpyZXR1cm4geDtjYXNlIDI6Uy5wdXNoKF8pfWVsc2UgaWYoZilyZXR1cm4hMTtyZXR1cm4gcz8tMTpsfHxmP2Y6U319fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMDcpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuZXcocih0KSkoZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOCksbz1uKDcxKSxpPW4oNDUpKFwic3BlY2llc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIG8odCkmJihlPXQuY29uc3RydWN0b3IsXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8ZSE9PUFycmF5JiYhbyhlLnByb3RvdHlwZSl8fChlPXZvaWQgMCkscihlKSYmKGU9ZVtpXSxudWxsPT09ZSYmKGU9dm9pZCAwKSkpLHZvaWQgMD09PWU/QXJyYXk6ZX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwKTtyKHIuUCtyLlIsXCJNYXBcIix7dG9KU09OOm4oMTA5KShcIk1hcFwiKX0pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1Myksbz1uKDExMCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe2lmKHIodGhpcykhPXQpdGhyb3cgVHlwZUVycm9yKHQrXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7cmV0dXJuIG8odGhpcyl9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTAyKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj1bXTtyZXR1cm4gcih0LCExLG4ucHVzaCxuLGUpLG59fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2Uuc2VsZWN0b3JzPVwic2Nyb2xsYmFyLCBbc2Nyb2xsYmFyXSwgW2RhdGEtc2Nyb2xsYmFyXVwifSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTEzKTsoMCxhLmRlZmF1bHQpKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxMTQpOygwLGEuZGVmYXVsdCkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KTt2YXIgbD1uKDExNSk7KDAsYS5kZWZhdWx0KShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbFt0XX19KX0pO3ZhciBmPW4oMTE2KTsoMCxhLmRlZmF1bHQpKGYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBmW3RdfX0pfSk7dmFyIHM9bigxMTcpOygwLGEuZGVmYXVsdCkocykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHNbdF19fSl9KTt2YXIgZD1uKDExOCk7KDAsYS5kZWZhdWx0KShkKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZFt0XX19KX0pO3ZhciBoPW4oMTE5KTsoMCxhLmRlZmF1bHQpKGgpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBoW3RdfX0pfSk7dmFyIHY9bigxMjApOygwLGEuZGVmYXVsdCkodikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZbdF19fSl9KTt2YXIgXz1uKDEyMSk7KDAsYS5kZWZhdWx0KShfKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gX1t0XX19KX0pO3ZhciBwPW4oMTIyKTsoMCxhLmRlZmF1bHQpKHApLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBwW3RdfX0pfSk7dmFyIHk9bigxMjMpOygwLGEuZGVmYXVsdCkoeSkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHlbdF19fSl9KTt2YXIgYj1uKDEyNCk7KDAsYS5kZWZhdWx0KShiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYlt0XX19KX0pfSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2UuYnVpbGRDdXJ2ZT1mdW5jdGlvbih0LGUpe3ZhciBuPVtdO2lmKGU8PTApcmV0dXJuIG47Zm9yKHZhciByPU1hdGgucm91bmQoZS8xZTMqNjApLG89LXQvTWF0aC5wb3cociwyKSxpPS0yKm8qcix1PTA7dTxyO3UrKyluLnB1c2gobypNYXRoLnBvdyh1LDIpK2kqdSk7cmV0dXJuIG59fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBuPTEwMDtlLmRlYm91bmNlPWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpuLHI9IShhcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSl8fGFyZ3VtZW50c1syXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXt2YXIgbz12b2lkIDA7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWFyZ3VtZW50cy5sZW5ndGgsaT1BcnJheShuKSx1PTA7dTxuO3UrKylpW3VdPWFyZ3VtZW50c1t1XTshbyYmciYmc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHZvaWQgMCxpKX0pLGNsZWFyVGltZW91dChvKSxvPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvPXZvaWQgMCx0LmFwcGx5KHZvaWQgMCxpKX0sZSl9fX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBvKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49QXJyYXkodC5sZW5ndGgpO2U8dC5sZW5ndGg7ZSsrKW5bZV09dFtlXTtyZXR1cm4gbn1yZXR1cm4oMCx1LmRlZmF1bHQpKHQpfXZhciBpPW4oMiksdT1yKGkpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2UuZmluZENoaWxkPWZ1bmN0aW9uKHQsZSl7dmFyIG49dC5jaGlsZHJlbixyPW51bGw7cmV0dXJuIG4mJltdLmNvbmNhdChvKG4pKS5zb21lKGZ1bmN0aW9uKHQpe1xuaWYodC5jbGFzc05hbWUubWF0Y2goZSkpcmV0dXJuIHI9dCwhMH0pLHJ9fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBuPXtTVEFOREFSRDoxLE9USEVSUzotM30scj1bMSwyOCw1MDBdLG89ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fHJbMF19O2UuZ2V0RGVsdGE9ZnVuY3Rpb24odCl7aWYoXCJkZWx0YVhcImluIHQpe3ZhciBlPW8odC5kZWx0YU1vZGUpO3JldHVybnt4OnQuZGVsdGFYL24uU1RBTkRBUkQqZSx5OnQuZGVsdGFZL24uU1RBTkRBUkQqZX19cmV0dXJuXCJ3aGVlbERlbHRhWFwiaW4gdD97eDp0LndoZWVsRGVsdGFYL24uT1RIRVJTLHk6dC53aGVlbERlbHRhWS9uLk9USEVSU306e3g6MCx5OnQud2hlZWxEZWx0YS9uLk9USEVSU319fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2UuZ2V0UG9pbnRlckRhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHQudG91Y2hlcz90LnRvdWNoZXNbdC50b3VjaGVzLmxlbmd0aC0xXTp0fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUuZ2V0UG9zaXRpb249dm9pZCAwO3ZhciByPW4oMTE4KTtlLmdldFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3ZhciBlPSgwLHIuZ2V0UG9pbnRlckRhdGEpKHQpO3JldHVybnt4OmUuY2xpZW50WCx5OmUuY2xpZW50WX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5nZXRUb3VjaElEPXZvaWQgMDt2YXIgcj1uKDExOCk7ZS5nZXRUb3VjaElEPWZ1bmN0aW9uKHQpe3ZhciBlPSgwLHIuZ2V0UG9pbnRlckRhdGEpKHQpO3JldHVybiBlLmlkZW50aWZpZXJ9fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO2UuaXNPbmVPZj1mdW5jdGlvbih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06W107cmV0dXJuIGUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gdD09PWV9KX19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7ZS5waWNrSW5SYW5nZT1mdW5jdGlvbih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06LSgxLzApLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjEvMDtyZXR1cm4gTWF0aC5tYXgoZSxNYXRoLm1pbih0LG4pKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDkwKSxpPXIobyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHU9W1wid2Via2l0XCIsXCJtb3pcIixcIm1zXCIsXCJvXCJdLGE9bmV3IFJlZ0V4cChcIl4tKD8hKD86XCIrdS5qb2luKFwifFwiKStcIiktKVwiKSxjPWZ1bmN0aW9uKHQpe3ZhciBlPXt9O3JldHVybigwLGkuZGVmYXVsdCkodCkuZm9yRWFjaChmdW5jdGlvbihuKXtpZighYS50ZXN0KG4pKXJldHVybiB2b2lkKGVbbl09dFtuXSk7dmFyIHI9dFtuXTtuPW4ucmVwbGFjZSgvXi0vLFwiXCIpLGVbbl09cix1LmZvckVhY2goZnVuY3Rpb24odCl7ZVtcIi1cIit0K1wiLVwiK25dPXJ9KX0pLGV9O2Uuc2V0U3R5bGU9ZnVuY3Rpb24odCxlKXtlPWMoZSksKDAsaS5kZWZhdWx0KShlKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciByPW4ucmVwbGFjZSgvXi0vLFwiXCIpLnJlcGxhY2UoLy0oW2Etel0pL2csZnVuY3Rpb24odCxlKXtyZXR1cm4gZS50b1VwcGVyQ2FzZSgpfSk7dC5zdHlsZVtyXT1lW25dfSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbyh0KXtpZihBcnJheS5pc0FycmF5KHQpKXtmb3IodmFyIGU9MCxuPUFycmF5KHQubGVuZ3RoKTtlPHQubGVuZ3RoO2UrKyluW2VdPXRbZV07cmV0dXJuIG59cmV0dXJuKDAsYS5kZWZhdWx0KSh0KX1mdW5jdGlvbiBpKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX12YXIgdT1uKDIpLGE9cih1KSxjPW4oODYpLGw9cihjKSxmPW4oMTI1KSxzPXIoZik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5Ub3VjaFJlY29yZD12b2lkIDA7dmFyIGQ9cy5kZWZhdWx0fHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciByIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4scikmJih0W3JdPW5bcl0pfXJldHVybiB0fSxoPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSwoMCxsLmRlZmF1bHQpKHQsci5rZXkscil9fXJldHVybiBmdW5jdGlvbihlLG4scil7cmV0dXJuIG4mJnQoZS5wcm90b3R5cGUsbiksciYmdChlLHIpLGV9fSgpLHY9bigxMTkpLF89ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUpe2kodGhpcyx0KSx0aGlzLnVwZGF0ZVRpbWU9RGF0ZS5ub3coKSx0aGlzLmRlbHRhPXt4OjAseTowfSx0aGlzLnZlbG9jaXR5PXt4OjAseTowfSx0aGlzLmxhc3RQb3NpdGlvbj0oMCx2LmdldFBvc2l0aW9uKShlKX1yZXR1cm4gaCh0LFt7a2V5OlwidXBkYXRlXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy52ZWxvY2l0eSxuPXRoaXMudXBkYXRlVGltZSxyPXRoaXMubGFzdFBvc2l0aW9uLG89RGF0ZS5ub3coKSxpPSgwLHYuZ2V0UG9zaXRpb24pKHQpLHU9e3g6LShpLngtci54KSx5Oi0oaS55LXIueSl9LGE9by1ufHwxNixjPXUueC9hKjFlMyxsPXUueS9hKjFlMztlLng9LjgqYysuMiplLngsZS55PS44KmwrLjIqZS55LHRoaXMuZGVsdGE9dSx0aGlzLnVwZGF0ZVRpbWU9byx0aGlzLmxhc3RQb3NpdGlvbj1pfX1dKSx0fSgpO2UuVG91Y2hSZWNvcmQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7aSh0aGlzLHQpLHRoaXMudG91Y2hMaXN0PXt9LHRoaXMubGFzdFRvdWNoPW51bGwsdGhpcy5hY3RpdmVUb3VjaElEPXZvaWQgMH1yZXR1cm4gaCh0LFt7a2V5OlwiX19hZGRcIix2YWx1ZTpmdW5jdGlvbih0KXtpZih0aGlzLl9faGFzKHQpKXJldHVybiBudWxsO3ZhciBlPW5ldyBfKHQpO3JldHVybiB0aGlzLnRvdWNoTGlzdFt0LmlkZW50aWZpZXJdPWUsZX19LHtrZXk6XCJfX3JlbmV3XCIsdmFsdWU6ZnVuY3Rpb24odCl7aWYoIXRoaXMuX19oYXModCkpcmV0dXJuIG51bGw7dmFyIGU9dGhpcy50b3VjaExpc3RbdC5pZGVudGlmaWVyXTtyZXR1cm4gZS51cGRhdGUodCksZX19LHtrZXk6XCJfX2RlbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiBkZWxldGUgdGhpcy50b3VjaExpc3RbdC5pZGVudGlmaWVyXX19LHtrZXk6XCJfX2hhc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnRvdWNoTGlzdC5oYXNPd25Qcm9wZXJ0eSh0LmlkZW50aWZpZXIpfX0se2tleTpcIl9fc2V0QWN0aXZlSURcIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLmFjdGl2ZVRvdWNoSUQ9dFt0Lmxlbmd0aC0xXS5pZGVudGlmaWVyLHRoaXMubGFzdFRvdWNoPXRoaXMudG91Y2hMaXN0W3RoaXMuYWN0aXZlVG91Y2hJRF19fSx7a2V5OlwiX19nZXRBY3RpdmVUcmFja2VyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnRvdWNoTGlzdCxlPXRoaXMuYWN0aXZlVG91Y2hJRDtyZXR1cm4gdFtlXX19LHtrZXk6XCJpc0FjdGl2ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMCE9PXRoaXMuYWN0aXZlVG91Y2hJRH19LHtrZXk6XCJnZXREZWx0YVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKTtyZXR1cm4gdD9kKHt9LHQuZGVsdGEpOnRoaXMuX19wcmltaXRpdmVWYWx1ZX19LHtrZXk6XCJnZXRWZWxvY2l0eVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKTtyZXR1cm4gdD9kKHt9LHQudmVsb2NpdHkpOnRoaXMuX19wcmltaXRpdmVWYWx1ZX19LHtrZXk6XCJnZXRMYXN0UG9zaXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcIlwiLGU9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKXx8dGhpcy5sYXN0VG91Y2gsbj1lP2UubGFzdFBvc2l0aW9uOnRoaXMuX19wcmltaXRpdmVWYWx1ZTtyZXR1cm4gdD9uLmhhc093blByb3BlcnR5KHQpP25bdF06MDpkKHt9LG4pfX0se2tleTpcInVwZGF0ZWRSZWNlbnRseVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2dldEFjdGl2ZVRyYWNrZXIoKTtyZXR1cm4gdCYmRGF0ZS5ub3coKS10LnVwZGF0ZVRpbWU8MzB9fSx7a2V5OlwidHJhY2tcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dC50YXJnZXRUb3VjaGVzO3JldHVybltdLmNvbmNhdChvKG4pKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UuX19hZGQodCl9KSx0aGlzLnRvdWNoTGlzdH19LHtrZXk6XCJ1cGRhdGVcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dC50b3VjaGVzLHI9dC5jaGFuZ2VkVG91Y2hlcztyZXR1cm5bXS5jb25jYXQobyhuKSkuZm9yRWFjaChmdW5jdGlvbih0KXtlLl9fcmVuZXcodCl9KSx0aGlzLl9fc2V0QWN0aXZlSUQociksdGhpcy50b3VjaExpc3R9fSx7a2V5OlwicmVsZWFzZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7cmV0dXJuIHRoaXMuYWN0aXZlVG91Y2hJRD12b2lkIDAsW10uY29uY2F0KG8odC5jaGFuZ2VkVG91Y2hlcykpLmZvckVhY2goZnVuY3Rpb24odCl7ZS5fX2RlbGV0ZSh0KX0pLHRoaXMudG91Y2hMaXN0fX0se2tleTpcIl9fcHJpbWl0aXZlVmFsdWVcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm57eDowLHk6MH19fV0pLHR9KCl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6bigxMjYpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7bigxMjcpLHQuZXhwb3J0cz1uKDEyKS5PYmplY3QuYXNzaWdufSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMCk7cihyLlMrci5GLFwiT2JqZWN0XCIse2Fzc2lnbjpuKDEyOCl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMzEpLG89big2OSksaT1uKDcwKSx1PW4oNDcpLGE9bigzNCksYz1PYmplY3QuYXNzaWduO3QuZXhwb3J0cz0hY3x8bigyMSkoZnVuY3Rpb24oKXt2YXIgdD17fSxlPXt9LG49U3ltYm9sKCkscj1cImFiY2RlZmdoaWprbG1ub3BxcnN0XCI7cmV0dXJuIHRbbl09NyxyLnNwbGl0KFwiXCIpLmZvckVhY2goZnVuY3Rpb24odCl7ZVt0XT10fSksNyE9Yyh7fSx0KVtuXXx8T2JqZWN0LmtleXMoYyh7fSxlKSkuam9pbihcIlwiKSE9cn0pP2Z1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPXUodCksYz1hcmd1bWVudHMubGVuZ3RoLGw9MSxmPW8uZixzPWkuZjtjPmw7KWZvcih2YXIgZCxoPWEoYXJndW1lbnRzW2wrK10pLHY9Zj9yKGgpLmNvbmNhdChmKGgpKTpyKGgpLF89di5sZW5ndGgscD0wO18+cDspcy5jYWxsKGgsZD12W3ArK10pJiYobltkXT1oW2RdKTtyZXR1cm4gbn06Y30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDEzMCk7KDAsYS5kZWZhdWx0KShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTMxKTsoMCxhLmRlZmF1bHQpKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSk7dmFyIGw9bigxMzIpOygwLGEuZGVmYXVsdCkobCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGxbdF19fSl9KTt2YXIgZj1uKDEzMyk7KDAsYS5kZWZhdWx0KShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZlt0XX19KX0pO3ZhciBzPW4oMTM0KTsoMCxhLmRlZmF1bHQpKHMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzW3RdfX0pfSk7dmFyIGQ9bigxMzUpOygwLGEuZGVmYXVsdCkoZCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRbdF19fSl9KTt2YXIgaD1uKDEzNik7KDAsYS5kZWZhdWx0KShoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaFt0XX19KX0pO3ZhciB2PW4oMTM3KTsoMCxhLmRlZmF1bHQpKHYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB2W3RdfX0pfSk7dmFyIF89bigxMzgpOygwLGEuZGVmYXVsdCkoXykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF9bdF19fSl9KTt2YXIgcD1uKDEzOSk7KDAsYS5kZWZhdWx0KShwKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gcFt0XX19KX0pO3ZhciB5PW4oMTQwKTsoMCxhLmRlZmF1bHQpKHkpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB5W3RdfX0pfSk7dmFyIGI9bigxNDEpOygwLGEuZGVmYXVsdCkoYikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGJbdF19fSl9KTt2YXIgZz1uKDE0Mik7KDAsYS5kZWZhdWx0KShnKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZ1t0XX19KX0pO3ZhciBtPW4oMTQzKTsoMCxhLmRlZmF1bHQpKG0pLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBtW3RdfX0pfSk7dmFyIHg9bigxNDQpOygwLGEuZGVmYXVsdCkoeCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHhbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzgpO3IuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5jbGVhck1vdmVtZW50PXIuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5tb3ZlbWVudC54PXRoaXMubW92ZW1lbnQueT0wLGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX190aW1lcklELnNjcm9sbFRvKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBvKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49QXJyYXkodC5sZW5ndGgpO2U8dC5sZW5ndGg7ZSsrKW5bZV09dFtlXTtyZXR1cm4gbn1yZXR1cm4oMCx1LmRlZmF1bHQpKHQpfXZhciBpPW4oMiksdT1yKGkpLGE9big3OCksYz1uKDExMiksbD1uKDg5KTthLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9fbGlzdGVuZXJzLG49dGhpcy5fX2hhbmRsZXJzLHI9dGhpcy5fX29ic2VydmVyLGk9dGhpcy50YXJnZXRzLHU9aS5jb250YWluZXIsYT1pLmNvbnRlbnQ7bi5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlPXQuZXZ0LG49dC5lbGVtLHI9dC5mbjtuLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxyKX0pLG4ubGVuZ3RoPWUubGVuZ3RoPTAsdGhpcy5zdG9wKCksY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3RpbWVySUQucmVuZGVyKSxyJiZyLmRpc2Nvbm5lY3QoKSxsLnNiTGlzdC5kZWxldGUodSksdHx8dGhpcy5zY3JvbGxUbygwLDAsMzAwLGZ1bmN0aW9uKCl7aWYodS5wYXJlbnROb2RlKXsoMCxjLnNldFN0eWxlKSh1LHtvdmVyZmxvdzpcIlwifSksdS5zY3JvbGxUb3A9dS5zY3JvbGxMZWZ0PTA7dmFyIHQ9W10uY29uY2F0KG8oYS5jaGlsZE5vZGVzKSk7dS5pbm5lckhUTUw9XCJcIix0LmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIHUuYXBwZW5kQ2hpbGQodCl9KX19KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDc4KTtyLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUuZ2V0Q29udGVudEVsZW09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50YXJnZXRzLmNvbnRlbnR9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmdldFNpemU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnRhcmdldHMuY29udGFpbmVyLGU9dGhpcy50YXJnZXRzLmNvbnRlbnQ7cmV0dXJue2NvbnRhaW5lcjp7d2lkdGg6dC5jbGllbnRXaWR0aCxoZWlnaHQ6dC5jbGllbnRIZWlnaHR9LGNvbnRlbnQ6e3dpZHRoOmUub2Zmc2V0V2lkdGgtZS5jbGllbnRXaWR0aCtlLnNjcm9sbFdpZHRoLGhlaWdodDplLm9mZnNldEhlaWdodC1lLmNsaWVudEhlaWdodCtlLnNjcm9sbEhlaWdodH19fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzgpO3IuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5pbmZpbml0ZVNjcm9sbD1mdW5jdGlvbih0KXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06NTA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl7dmFyIG49e3g6MCx5OjB9LHI9ITE7dGhpcy5hZGRMaXN0ZW5lcihmdW5jdGlvbihvKXt2YXIgaT1vLm9mZnNldCx1PW8ubGltaXQ7dS55LWkueTw9ZSYmaS55Pm4ueSYmIXImJihyPSEwLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gdChvKX0pKSx1LnktaS55PmUmJihyPSExKSxuPWl9KX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmlzVmlzaWJsZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmJvdW5kaW5nLG49dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxyPU1hdGgubWF4KGUudG9wLG4udG9wKSxvPU1hdGgubWF4KGUubGVmdCxuLmxlZnQpLGk9TWF0aC5taW4oZS5yaWdodCxuLnJpZ2h0KSx1PU1hdGgubWluKGUuYm90dG9tLG4uYm90dG9tKTtyZXR1cm4gcjx1JiZvPGl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnRoaXMuX19saXN0ZW5lcnMucHVzaCh0KX0sci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnRoaXMuX19saXN0ZW5lcnMuc29tZShmdW5jdGlvbihlLG4scil7cmV0dXJuIGU9PT10JiZyLnNwbGljZShuLDEpfSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbyh0LGUsbil7cmV0dXJuIGUgaW4gdD8oMCxsLmRlZmF1bHQpKHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fWZ1bmN0aW9uIGkodCxlKXtyZXR1cm4hIWUubGVuZ3RoJiZlLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIHQubWF0Y2goZSl9KX1mdW5jdGlvbiB1KCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnMuUkVHSUVTVEVSLGU9ZFt0XTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49YXJndW1lbnRzLmxlbmd0aCxyPUFycmF5KG4pLG89MDtvPG47bysrKXJbb109YXJndW1lbnRzW29dO3RoaXMuX19oYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciBvPW4uZWxlbSx1PW4uZXZ0LGE9bi5mbixjPW4uaGFzUmVnaXN0ZXJlZDtjJiZ0PT09cy5SRUdJRVNURVJ8fCFjJiZ0PT09cy5VTlJFR0lFU1RFUnx8aSh1LHIpJiYob1tlXSh1LGEpLG4uaGFzUmVnaXN0ZXJlZD0hYyl9KX19dmFyIGEsYz1uKDg2KSxsPXIoYyksZj1uKDc4KSxzPXtSRUdJRVNURVI6MCxVTlJFR0lFU1RFUjoxfSxkPShhPXt9LG8oYSxzLlJFR0lFU1RFUixcImFkZEV2ZW50TGlzdGVuZXJcIiksbyhhLHMuVU5SRUdJRVNURVIsXCJyZW1vdmVFdmVudExpc3RlbmVyXCIpLGEpO2YuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5yZWdpc3RlckV2ZW50cz11KHMuUkVHSUVTVEVSKSxmLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUudW5yZWdpc3RlckV2ZW50cz11KHMuVU5SRUdJRVNURVIpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OCk7ci5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnNjcm9sbEludG9WaWV3PWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPWUub25seVNjcm9sbElmTmVlZGVkLHI9dm9pZCAwIT09biYmbixvPWUub2Zmc2V0VG9wLGk9dm9pZCAwPT09bz8wOm8sdT1lLm9mZnNldExlZnQsYT12b2lkIDA9PT11PzA6dSxjPXRoaXMudGFyZ2V0cyxsPXRoaXMuYm91bmRpbmc7aWYodCYmYy5jb250YWluZXIuY29udGFpbnModCkpe3ZhciBmPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7ciYmdGhpcy5pc1Zpc2libGUodCl8fHRoaXMuX19zZXRNb3ZlbWVudChmLmxlZnQtbC5sZWZ0LWEsZi50b3AtbC50b3AtaSl9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMTEyKSxvPW4oNzgpO28uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zY3JvbGxUbz1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLm9mZnNldC54LGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnRoaXMub2Zmc2V0Lnksbj10aGlzLG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjAsaT1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106bnVsbCx1PXRoaXMub3B0aW9ucyxhPXRoaXMub2Zmc2V0LGM9dGhpcy5saW1pdCxsPXRoaXMuX190aW1lcklEO2NhbmNlbEFuaW1hdGlvbkZyYW1lKGwuc2Nyb2xsVG8pLGk9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pOmZ1bmN0aW9uKCl7fSx1LnJlbmRlckJ5UGl4ZWxzJiYodD1NYXRoLnJvdW5kKHQpLGU9TWF0aC5yb3VuZChlKSk7dmFyIGY9YS54LHM9YS55LGQ9KDAsci5waWNrSW5SYW5nZSkodCwwLGMueCktZixoPSgwLHIucGlja0luUmFuZ2UpKGUsMCxjLnkpLXMsdj0oMCxyLmJ1aWxkQ3VydmUpKGQsbyksXz0oMCxyLmJ1aWxkQ3VydmUpKGgsbykscD12Lmxlbmd0aCx5PTAsYj1mdW5jdGlvbiByKCl7cmV0dXJuIHk9PT1wPyhuLnNldFBvc2l0aW9uKHQsZSkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aShuKX0pKToobi5zZXRQb3NpdGlvbihmK3ZbeV0scytfW3ldKSx5Kyssdm9pZChsLnNjcm9sbFRvPXJlcXVlc3RBbmltYXRpb25GcmFtZShyKSkpfTtiKCl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big5MCksaT1yKG8pLHU9big3OCk7dS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLnNldE9wdGlvbnM9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9OygwLGkuZGVmYXVsdCkoZSkuZm9yRWFjaChmdW5jdGlvbihuKXt0Lm9wdGlvbnMuaGFzT3duUHJvcGVydHkobikmJnZvaWQgMCE9PWVbbl0mJih0Lm9wdGlvbnNbbl09ZVtuXSl9KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDEyNSksaT1yKG8pLHU9aS5kZWZhdWx0fHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciByIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4scikmJih0W3JdPW5bcl0pfXJldHVybiB0fSxhPW4oMTEyKSxjPW4oNzgpO2MuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zZXRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLm9mZnNldC54LGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnRoaXMub2Zmc2V0Lnksbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3RoaXMuX19oaWRlVHJhY2tUaHJvdHRsZSgpO3ZhciByPXt9LG89dGhpcy5vcHRpb25zLGk9dGhpcy5vZmZzZXQsYz10aGlzLmxpbWl0LGw9dGhpcy50YXJnZXRzLGY9dGhpcy5fX2xpc3RlbmVycztvLnJlbmRlckJ5UGl4ZWxzJiYodD1NYXRoLnJvdW5kKHQpLGU9TWF0aC5yb3VuZChlKSksTWF0aC5hYnModC1pLngpPjEmJnRoaXMuc2hvd1RyYWNrKFwieFwiKSxNYXRoLmFicyhlLWkueSk+MSYmdGhpcy5zaG93VHJhY2soXCJ5XCIpLHQ9KDAsYS5waWNrSW5SYW5nZSkodCwwLGMueCksZT0oMCxhLnBpY2tJblJhbmdlKShlLDAsYy55KSx0PT09aS54JiZlPT09aS55fHwoci5kaXJlY3Rpb249e3g6dD09PWkueD9cIm5vbmVcIjp0PmkueD9cInJpZ2h0XCI6XCJsZWZ0XCIseTplPT09aS55P1wibm9uZVwiOmU+aS55P1wiZG93blwiOlwidXBcIn0sdGhpcy5fX3JlYWRvbmx5KFwib2Zmc2V0XCIse3g6dCx5OmV9KSxyLmxpbWl0PXUoe30sYyksci5vZmZzZXQ9dSh7fSx0aGlzLm9mZnNldCksdGhpcy5fX3NldFRodW1iUG9zaXRpb24oKSwoMCxhLnNldFN0eWxlKShsLmNvbnRlbnQse1wiLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlM2QoXCIrLXQrXCJweCwgXCIrLWUrXCJweCwgMClcIn0pLG58fGYuZm9yRWFjaChmdW5jdGlvbih0KXtvLnN5bmNDYWxsYmFja3M/dChyKTpyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXt0KHIpfSl9KSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbyh0LGUsbil7cmV0dXJuIGUgaW4gdD8oMCxjLmRlZmF1bHQpKHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fWZ1bmN0aW9uIGkoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06Zi5TSE9XLGU9ZFt0XTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJib3RoXCIscj10aGlzLm9wdGlvbnMsbz10aGlzLm1vdmVtZW50LGk9dGhpcy50YXJnZXRzLHU9aS5jb250YWluZXIsYT1pLnhBeGlzLGM9aS55QXhpcztvLnh8fG8ueT91LmNsYXNzTGlzdC5hZGQocy5DT05UQUlORVIpOnUuY2xhc3NMaXN0LnJlbW92ZShzLkNPTlRBSU5FUiksci5hbHdheXNTaG93VHJhY2tzJiZ0PT09Zi5ISURFfHwobj1uLnRvTG93ZXJDYXNlKCksXCJib3RoXCI9PT1uJiYoYS50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSyksYy50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSykpLFwieFwiPT09biYmYS50cmFjay5jbGFzc0xpc3RbZV0ocy5UUkFDSyksXCJ5XCI9PT1uJiZjLnRyYWNrLmNsYXNzTGlzdFtlXShzLlRSQUNLKSl9fXZhciB1LGE9big4NiksYz1yKGEpLGw9big3OCksZj17U0hPVzowLEhJREU6MX0scz17VFJBQ0s6XCJzaG93XCIsQ09OVEFJTkVSOlwic2Nyb2xsaW5nXCJ9LGQ9KHU9e30sbyh1LGYuU0hPVyxcImFkZFwiKSxvKHUsZi5ISURFLFwicmVtb3ZlXCIpLHUpO2wuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5zaG93VHJhY2s9aShmLlNIT1cpLGwuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS5oaWRlVHJhY2s9aShmLkhJREUpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe2lmKFwiZ2xvd1wiPT09dGhpcy5vcHRpb25zLm92ZXJzY3JvbGxFZmZlY3Qpe3ZhciB0PXRoaXMudGFyZ2V0cyxlPXRoaXMuc2l6ZSxuPXQuY2FudmFzLHI9bi5lbGVtLG89bi5jb250ZXh0LGk9d2luZG93LmRldmljZVBpeGVsUmF0aW98fDEsdT1lLmNvbnRhaW5lci53aWR0aCppLGE9ZS5jb250YWluZXIuaGVpZ2h0Kmk7dT09PXIud2lkdGgmJmE9PT1yLmhlaWdodHx8KHIud2lkdGg9dSxyLmhlaWdodD1hLG8uc2NhbGUoaSxpKSl9fWZ1bmN0aW9uIG8oKXt2YXIgdD10aGlzLnNpemUsZT10aGlzLnRodW1iU2l6ZSxuPXRoaXMudGFyZ2V0cyxyPW4ueEF4aXMsbz1uLnlBeGlzOygwLHUuc2V0U3R5bGUpKHIudHJhY2sse2Rpc3BsYXk6dC5jb250ZW50LndpZHRoPD10LmNvbnRhaW5lci53aWR0aD9cIm5vbmVcIjpcImJsb2NrXCJ9KSwoMCx1LnNldFN0eWxlKShvLnRyYWNrLHtkaXNwbGF5OnQuY29udGVudC5oZWlnaHQ8PXQuY29udGFpbmVyLmhlaWdodD9cIm5vbmVcIjpcImJsb2NrXCJ9KSwoMCx1LnNldFN0eWxlKShyLnRodW1iLHt3aWR0aDplLngrXCJweFwifSksKDAsdS5zZXRTdHlsZSkoby50aHVtYix7aGVpZ2h0OmUueStcInB4XCJ9KX1mdW5jdGlvbiBpKCl7dmFyIHQ9dGhpcy5vcHRpb25zO3RoaXMuX191cGRhdGVCb3VuZGluZygpO3ZhciBlPXRoaXMuZ2V0U2l6ZSgpLG49e3g6TWF0aC5tYXgoZS5jb250ZW50LndpZHRoLWUuY29udGFpbmVyLndpZHRoLDApLHk6TWF0aC5tYXgoZS5jb250ZW50LmhlaWdodC1lLmNvbnRhaW5lci5oZWlnaHQsMCl9LGk9e3JlYWxYOmUuY29udGFpbmVyLndpZHRoL2UuY29udGVudC53aWR0aCplLmNvbnRhaW5lci53aWR0aCxyZWFsWTplLmNvbnRhaW5lci5oZWlnaHQvZS5jb250ZW50LmhlaWdodCplLmNvbnRhaW5lci5oZWlnaHR9O2kueD1NYXRoLm1heChpLnJlYWxYLHQudGh1bWJNaW5TaXplKSxpLnk9TWF0aC5tYXgoaS5yZWFsWSx0LnRodW1iTWluU2l6ZSksdGhpcy5fX3JlYWRvbmx5KFwic2l6ZVwiLGUpLl9fcmVhZG9ubHkoXCJsaW1pdFwiLG4pLl9fcmVhZG9ubHkoXCJ0aHVtYlNpemVcIixpKSxvLmNhbGwodGhpcyksci5jYWxsKHRoaXMpLHRoaXMuc2V0UG9zaXRpb24oKSx0aGlzLl9fc2V0VGh1bWJQb3NpdGlvbigpfXZhciB1PW4oMTEyKSxhPW4oNzgpO2EuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24odCl7dD9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaS5iaW5kKHRoaXMpKTppLmNhbGwodGhpcyl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTQ2KTsoMCxhLmRlZmF1bHQpKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNDcpOygwLGEuZGVmYXVsdCkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KTt2YXIgbD1uKDE0OCk7KDAsYS5kZWZhdWx0KShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbFt0XX19KX0pO3ZhciBmPW4oMTQ5KTsoMCxhLmRlZmF1bHQpKGYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBmW3RdfX0pfSk7dmFyIHM9bigxNTQpOygwLGEuZGVmYXVsdCkocykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHNbdF19fSl9KTt2YXIgZD1uKDE1NSk7KDAsYS5kZWZhdWx0KShkKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZFt0XX19KX0pO3ZhciBoPW4oMTU2KTsoMCxhLmRlZmF1bHQpKGgpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBoW3RdfX0pfSk7dmFyIHY9bigxNTcpOygwLGEuZGVmYXVsdCkodikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGEuZGVmYXVsdCkodCl9ZnVuY3Rpb24gaSgpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdLHI9dGhpcy5saW1pdCxpPXRoaXMub3B0aW9ucyx1PXRoaXMubW92ZW1lbnQ7dGhpcy5fX3VwZGF0ZVRocm90dGxlKCksaS5yZW5kZXJCeVBpeGVscyYmKHQ9TWF0aC5yb3VuZCh0KSxlPU1hdGgucm91bmQoZSkpO3ZhciBhPXUueCt0LGw9dS55K2U7MD09PXIueCYmKGE9MCksMD09PXIueSYmKGw9MCk7dmFyIGY9dGhpcy5fX2dldERlbHRhTGltaXQobik7dS54PWMucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFthXS5jb25jYXQobyhmLngpKSksdS55PWMucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFtsXS5jb25jYXQobyhmLnkpKSl9dmFyIHU9bigyKSxhPXIodSksYz1uKDExMiksbD1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19hZGRNb3ZlbWVudFwiLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PXRoaXMsZT10aGlzLm1vdmVtZW50LG49dGhpcy5tb3ZlbWVudExvY2tlZDthLmZvckVhY2goZnVuY3Rpb24ocil7bltyXT1lW3JdJiZ0Ll9fd2lsbE92ZXJzY3JvbGwocixlW3JdKX0pfWZ1bmN0aW9uIG8oKXt2YXIgdD10aGlzLm1vdmVtZW50TG9ja2VkO2EuZm9yRWFjaChmdW5jdGlvbihlKXt0W2VdPSExfSl9ZnVuY3Rpb24gaSgpe3ZhciB0PXRoaXMubW92ZW1lbnRMb2NrZWQ7cmV0dXJuIHQueHx8dC55fXZhciB1PW4oNzgpLGE9W1wieFwiLFwieVwiXTtPYmplY3QuZGVmaW5lUHJvcGVydHkodS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19hdXRvTG9ja01vdmVtZW50XCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHUuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fdW5sb2NrTW92ZW1lbnRcIix7dmFsdWU6byx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19pc01vdmVtZW50TG9ja2VkXCIse3ZhbHVlOmksd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBvKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOlwiXCI7aWYodCl7dmFyIGU9dGhpcy5vcHRpb25zLG49dGhpcy5tb3ZlbWVudCxyPXRoaXMub3ZlcnNjcm9sbFJlbmRlcmVkLG89dGhpcy5NQVhfT1ZFUlNDUk9MTCxpPW5bdF09KDAsaC5waWNrSW5SYW5nZSkoblt0XSwtbyxvKSx1PWUub3ZlcnNjcm9sbERhbXBpbmcsYT1yW3RdKyhpLXJbdF0pKnU7ZS5yZW5kZXJCeVBpeGVscyYmKGF8PTApLCF0aGlzLl9faXNNb3ZlbWVudExvY2tlZCgpJiZNYXRoLmFicyhhLXJbdF0pPC4xJiYoYS09aS9NYXRoLmFicyhpfHwxKSksTWF0aC5hYnMoYSk8TWF0aC5hYnMoclt0XSkmJnRoaXMuX19yZWFkb25seShcIm92ZXJzY3JvbGxCYWNrXCIsITApLChhKnJbdF08MHx8TWF0aC5hYnMoYSk8PTEpJiYoYT0wLHRoaXMuX19yZWFkb25seShcIm92ZXJzY3JvbGxCYWNrXCIsITEpKSxyW3RdPWF9fWZ1bmN0aW9uIGkodCl7dmFyIGU9dGhpcy5fX3RvdWNoUmVjb3JkLG49dGhpcy5vdmVyc2Nyb2xsUmVuZGVyZWQ7cmV0dXJuIG4ueCE9PXQueHx8bi55IT09dC55fHwhKCFkLkdMT0JBTF9FTlYuVE9VQ0hfU1VQUE9SVEVEfHwhZS51cGRhdGVkUmVjZW50bHkoKSl9ZnVuY3Rpb24gdSgpe3ZhciB0PXRoaXMsZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06W107aWYoZS5sZW5ndGgmJnRoaXMub3B0aW9ucy5vdmVyc2Nyb2xsRWZmZWN0KXt2YXIgbj10aGlzLm9wdGlvbnMscj10aGlzLm92ZXJzY3JvbGxSZW5kZXJlZCx1PWwoe30scik7aWYoZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBvLmNhbGwodCxlKX0pLGkuY2FsbCh0aGlzLHUpKXN3aXRjaChuLm92ZXJzY3JvbGxFZmZlY3Qpe2Nhc2VcImJvdW5jZVwiOnJldHVybiBzLm92ZXJzY3JvbGxCb3VuY2UuY2FsbCh0aGlzLHIueCxyLnkpO2Nhc2VcImdsb3dcIjpyZXR1cm4gcy5vdmVyc2Nyb2xsR2xvdy5jYWxsKHRoaXMsci54LHIueSk7ZGVmYXVsdDpyZXR1cm59fX12YXIgYT1uKDEyNSksYz1yKGEpLGw9Yy5kZWZhdWx0fHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgbj1hcmd1bWVudHNbZV07Zm9yKHZhciByIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4scikmJih0W3JdPW5bcl0pfXJldHVybiB0fSxmPW4oNzgpLHM9bigxNTApLGQ9big4OSksaD1uKDExMik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGYuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fcmVuZGVyT3ZlcnNjcm9sbFwiLHt2YWx1ZTp1LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTUxKTsoMCxhLmRlZmF1bHQpKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNTIpOygwLGEuZGVmYXVsdCkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KTt2YXIgbD1uKDE1Myk7KDAsYS5kZWZhdWx0KShsKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbFt0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0LGUpe3ZhciBuPXRoaXMuc2l6ZSxyPXRoaXMub2Zmc2V0LGk9dGhpcy50YXJnZXRzLHU9dGhpcy50aHVtYk9mZnNldCxhPWkueEF4aXMsYz1pLnlBeGlzLGw9aS5jb250ZW50O2lmKCgwLG8uc2V0U3R5bGUpKGwse1wiLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlM2QoXCIrLShyLngrdCkrXCJweCwgXCIrLShyLnkrZSkrXCJweCwgMClcIn0pLHQpe3ZhciBmPW4uY29udGFpbmVyLndpZHRoLyhuLmNvbnRhaW5lci53aWR0aCtNYXRoLmFicyh0KSk7KDAsby5zZXRTdHlsZSkoYS50aHVtYix7XCItdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUzZChcIit1LngrXCJweCwgMCwgMCkgc2NhbGUzZChcIitmK1wiLCAxLCAxKVwiLFwiLXRyYW5zZm9ybS1vcmlnaW5cIjp0PDA/XCJsZWZ0XCI6XCJyaWdodFwifSl9aWYoZSl7dmFyIHM9bi5jb250YWluZXIuaGVpZ2h0LyhuLmNvbnRhaW5lci5oZWlnaHQrTWF0aC5hYnMoZSkpOygwLG8uc2V0U3R5bGUpKGMudGh1bWIse1wiLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlM2QoMCwgXCIrdS55K1wicHgsIDApIHNjYWxlM2QoMSwgXCIrcytcIiwgMSlcIixcIi10cmFuc2Zvcm0tb3JpZ2luXCI6ZTwwP1widG9wXCI6XCJib3R0b21cIn0pfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLm92ZXJzY3JvbGxCb3VuY2U9cjt2YXIgbz1uKDExMil9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSl7dmFyIG49dGhpcy5zaXplLHI9dGhpcy50YXJnZXRzLGE9dGhpcy5vcHRpb25zLGM9ci5jYW52YXMsbD1jLmVsZW0sZj1jLmNvbnRleHQ7cmV0dXJuIHR8fGU/KCgwLHUuc2V0U3R5bGUpKGwse2Rpc3BsYXk6XCJibG9ja1wifSksZi5jbGVhclJlY3QoMCwwLG4uY29udGVudC53aWR0aCxuLmNvbnRhaW5lci5oZWlnaHQpLGYuZmlsbFN0eWxlPWEub3ZlcnNjcm9sbEVmZmVjdENvbG9yLG8uY2FsbCh0aGlzLHQpLHZvaWQgaS5jYWxsKHRoaXMsZSkpOigwLHUuc2V0U3R5bGUpKGwse2Rpc3BsYXk6XCJub25lXCJ9KX1mdW5jdGlvbiBvKHQpe3ZhciBlPXRoaXMuc2l6ZSxuPXRoaXMudGFyZ2V0cyxyPXRoaXMuX190b3VjaFJlY29yZCxvPXRoaXMuTUFYX09WRVJTQ1JPTEwsaT1lLmNvbnRhaW5lcixsPWkud2lkdGgsZj1pLmhlaWdodCxzPW4uY2FudmFzLmNvbnRleHQ7cy5zYXZlKCksdD4wJiZzLnRyYW5zZm9ybSgtMSwwLDAsMSxsLDApO3ZhciBkPSgwLHUucGlja0luUmFuZ2UpKE1hdGguYWJzKHQpL28sMCxhKSxoPSgwLHUucGlja0luUmFuZ2UpKGQsMCxjKSpsLHY9TWF0aC5hYnModCksXz1yLmdldExhc3RQb3NpdGlvbihcInlcIil8fGYvMjtzLmdsb2JhbEFscGhhPWQscy5iZWdpblBhdGgoKSxzLm1vdmVUbygwLC1oKSxzLnF1YWRyYXRpY0N1cnZlVG8odixfLDAsZitoKSxzLmZpbGwoKSxzLmNsb3NlUGF0aCgpLHMucmVzdG9yZSgpfWZ1bmN0aW9uIGkodCl7dmFyIGU9dGhpcy5zaXplLG49dGhpcy50YXJnZXRzLHI9dGhpcy5fX3RvdWNoUmVjb3JkLG89dGhpcy5NQVhfT1ZFUlNDUk9MTCxpPWUuY29udGFpbmVyLGw9aS53aWR0aCxmPWkuaGVpZ2h0LHM9bi5jYW52YXMuY29udGV4dDtzLnNhdmUoKSx0PjAmJnMudHJhbnNmb3JtKDEsMCwwLC0xLDAsZik7dmFyIGQ9KDAsdS5waWNrSW5SYW5nZSkoTWF0aC5hYnModCkvbywwLGEpLGg9KDAsdS5waWNrSW5SYW5nZSkoZCwwLGMpKmwsdj1yLmdldExhc3RQb3NpdGlvbihcInhcIil8fGwvMixfPU1hdGguYWJzKHQpO3MuZ2xvYmFsQWxwaGE9ZCxzLmJlZ2luUGF0aCgpLHMubW92ZVRvKC1oLDApLHMucXVhZHJhdGljQ3VydmVUbyh2LF8sbCtoLDApLHMuZmlsbCgpLHMuY2xvc2VQYXRoKCkscy5yZXN0b3JlKCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5vdmVyc2Nyb2xsR2xvdz1yO3ZhciB1PW4oMTEyKSxhPS43NSxjPS4yNX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7dmFyIGU9dGhpcy5vcHRpb25zLG49dGhpcy5vZmZzZXQscj10aGlzLm1vdmVtZW50LG89dGhpcy5fX3RvdWNoUmVjb3JkLGk9ZS5kYW1waW5nLHU9ZS5yZW5kZXJCeVBpeGVscyxhPWUub3ZlcnNjcm9sbERhbXBpbmcsYz1uW3RdLGw9clt0XSxmPWk7aWYodGhpcy5fX3dpbGxPdmVyc2Nyb2xsKHQsbCk/Zj1hOm8uaXNBY3RpdmUoKSYmKGY9LjUpLE1hdGguYWJzKGwpPDEpe3ZhciBzPWMrbDtyZXR1cm57bW92ZW1lbnQ6MCxwb3NpdGlvbjpsPjA/TWF0aC5jZWlsKHMpOk1hdGguZmxvb3Iocyl9fXZhciBkPWwqKDEtZik7cmV0dXJuIHUmJihkfD0wKSx7bW92ZW1lbnQ6ZCxwb3NpdGlvbjpjK2wtZH19ZnVuY3Rpb24gbygpe3ZhciB0PXRoaXMub3B0aW9ucyxlPXRoaXMub2Zmc2V0LG49dGhpcy5saW1pdCxpPXRoaXMubW92ZW1lbnQsYT10aGlzLm92ZXJzY3JvbGxSZW5kZXJlZCxjPXRoaXMuX190aW1lcklEO2lmKGkueHx8aS55fHxhLnh8fGEueSl7dmFyIGw9ci5jYWxsKHRoaXMsXCJ4XCIpLGY9ci5jYWxsKHRoaXMsXCJ5XCIpLHM9W107aWYodC5vdmVyc2Nyb2xsRWZmZWN0KXt2YXIgZD0oMCx1LnBpY2tJblJhbmdlKShsLnBvc2l0aW9uLDAsbi54KSxoPSgwLHUucGlja0luUmFuZ2UpKGYucG9zaXRpb24sMCxuLnkpOyhhLnh8fGQ9PT1lLngmJmkueCkmJnMucHVzaChcInhcIiksKGEueXx8aD09PWUueSYmaS55KSYmcy5wdXNoKFwieVwiKX10aGlzLm1vdmVtZW50TG9ja2VkLnh8fChpLng9bC5tb3ZlbWVudCksdGhpcy5tb3ZlbWVudExvY2tlZC55fHwoaS55PWYubW92ZW1lbnQpLHRoaXMuc2V0UG9zaXRpb24obC5wb3NpdGlvbixmLnBvc2l0aW9uKSx0aGlzLl9fcmVuZGVyT3ZlcnNjcm9sbChzKX1jLnJlbmRlcj1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoby5iaW5kKHRoaXMpKX12YXIgaT1uKDc4KSx1PW4oMTEyKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoaS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19yZW5kZXJcIix7dmFsdWU6byx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGEuZGVmYXVsdCkodCl9ZnVuY3Rpb24gaSgpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdLHI9dGhpcy5vcHRpb25zLGk9dGhpcy5tb3ZlbWVudDt0aGlzLl9fdXBkYXRlVGhyb3R0bGUoKTt2YXIgdT10aGlzLl9fZ2V0RGVsdGFMaW1pdChuKTtyLnJlbmRlckJ5UGl4ZWxzJiYodD1NYXRoLnJvdW5kKHQpLGU9TWF0aC5yb3VuZChlKSksaS54PWMucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFt0XS5jb25jYXQobyh1LngpKSksaS55PWMucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFtlXS5jb25jYXQobyh1LnkpKSl9dmFyIHU9bigyKSxhPXIodSksYz1uKDExMiksbD1uKDc4KTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19zZXRNb3ZlbWVudFwiLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj10aGlzLm9wdGlvbnMscj10aGlzLm9mZnNldCxvPXRoaXMubGltaXQ7aWYoIW4uY29udGludW91c1Njcm9sbGluZylyZXR1cm4hMTt2YXIgdT0oMCxpLnBpY2tJblJhbmdlKSh0K3IueCwwLG8ueCksYT0oMCxpLnBpY2tJblJhbmdlKShlK3IueSwwLG8ueSksYz0hMDtyZXR1cm4gYyY9dT09PXIueCxjJj1hPT09ci55LGMmPXU9PT1vLnh8fDA9PT11fHxhPT09by55fHwwPT09YX12YXIgbz1uKDc4KSxpPW4oMTEyKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19zaG91bGRQcm9wYWdhdGVNb3ZlbWVudFwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcIlwiLGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjA7aWYoIXQpcmV0dXJuITE7dmFyIG49dGhpcy5vZmZzZXQscj10aGlzLmxpbWl0LG89blt0XTtyZXR1cm4oMCxpLnBpY2tJblJhbmdlKShlK28sMCxyW3RdKT09PW8mJigwPT09b3x8bz09PXJbdF0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3dpbGxPdmVyc2Nyb2xsXCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbz1uKDg2KSxpPXIobyksdT1uKDkwKSxhPXIodSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGM9bigxNTkpOygwLGEuZGVmYXVsdCkoYykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGNbdF19fSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE2MCk7KDAsYS5kZWZhdWx0KShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pO3ZhciBsPW4oMTYxKTsoMCxhLmRlZmF1bHQpKGwpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBsW3RdfX0pfSk7dmFyIGY9bigxNjgpOygwLGEuZGVmYXVsdCkoZikuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGZbdF19fSl9KTt2YXIgcz1uKDE2OSk7KDAsYS5kZWZhdWx0KShzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gc1t0XX19KX0pO3ZhciBkPW4oMTcwKTsoMCxhLmRlZmF1bHQpKGQpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBkW3RdfX0pfSk7dmFyIGg9bigxNzEpOygwLGEuZGVmYXVsdCkoaCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGhbdF19fSl9KTt2YXIgdj1uKDE3Mik7KDAsYS5kZWZhdWx0KSh2KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdlt0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PXRoaXMsZT10aGlzLnRhcmdldHMsbj1lLmNvbnRhaW5lcixyPWUuY29udGVudCxvPSExLHU9dm9pZCAwLGE9dm9pZCAwO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiX19pc0RyYWdcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG99LGVudW1lcmFibGU6ITF9KTt2YXIgYz1mdW5jdGlvbiBlKG4pe3ZhciByPW4ueCxvPW4ueTtpZihyfHxvKXt2YXIgaT10Lm9wdGlvbnMuc3BlZWQ7dC5fX3NldE1vdmVtZW50KHIqaSxvKmkpLHU9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7ZSh7eDpyLHk6b30pfSl9fTt0aGlzLl9fYWRkRXZlbnQobixcImRyYWdzdGFydFwiLGZ1bmN0aW9uKGUpe3QuX19ldmVudEZyb21DaGlsZFNjcm9sbGJhcihlKXx8KG89ITAsYT1lLnRhcmdldC5jbGllbnRIZWlnaHQsKDAsaS5zZXRTdHlsZSkocix7XCJwb2ludGVyLWV2ZW50c1wiOlwiYXV0b1wifSksY2FuY2VsQW5pbWF0aW9uRnJhbWUodSksdC5fX3VwZGF0ZUJvdW5kaW5nKCkpfSksdGhpcy5fX2FkZEV2ZW50KGRvY3VtZW50LFwiZHJhZ292ZXIgbW91c2Vtb3ZlIHRvdWNobW92ZVwiLGZ1bmN0aW9uKGUpe2lmKG8mJiF0Ll9fZXZlbnRGcm9tQ2hpbGRTY3JvbGxiYXIoZSkpe2NhbmNlbEFuaW1hdGlvbkZyYW1lKHUpLGUucHJldmVudERlZmF1bHQoKTt2YXIgbj10Ll9fZ2V0UG9pbnRlclRyZW5kKGUsYSk7YyhuKX19KSx0aGlzLl9fYWRkRXZlbnQoZG9jdW1lbnQsXCJkcmFnZW5kIG1vdXNldXAgdG91Y2hlbmQgYmx1clwiLGZ1bmN0aW9uKCl7Y2FuY2VsQW5pbWF0aW9uRnJhbWUodSksbz0hMX0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2RyYWdIYW5kbGVyXCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBvKCl7dmFyIHQ9dGhpcyxlPXRoaXMudGFyZ2V0cyxuPWZ1bmN0aW9uKGUpe3ZhciBuPXQuc2l6ZSxyPXQub2Zmc2V0LG89dC5saW1pdCxpPXQubW92ZW1lbnQ7c3dpdGNoKGUpe2Nhc2Ugcy5TUEFDRTpyZXR1cm5bMCwyMDBdO2Nhc2Ugcy5QQUdFX1VQOnJldHVyblswLC1uLmNvbnRhaW5lci5oZWlnaHQrNDBdO2Nhc2Ugcy5QQUdFX0RPV046cmV0dXJuWzAsbi5jb250YWluZXIuaGVpZ2h0LTQwXTtjYXNlIHMuRU5EOnJldHVyblswLE1hdGguYWJzKGkueSkrby55LXIueV07Y2FzZSBzLkhPTUU6cmV0dXJuWzAsLU1hdGguYWJzKGkueSktci55XTtjYXNlIHMuTEVGVDpyZXR1cm5bLTQwLDBdO2Nhc2Ugcy5VUDpyZXR1cm5bMCwtNDBdO2Nhc2Ugcy5SSUdIVDpyZXR1cm5bNDAsMF07Y2FzZSBzLkRPV046cmV0dXJuWzAsNDBdO2RlZmF1bHQ6cmV0dXJuIG51bGx9fSxyPWUuY29udGFpbmVyLG89ITE7dGhpcy5fX2FkZEV2ZW50KHIsXCJmb2N1c1wiLGZ1bmN0aW9uKCl7bz0hMH0pLHRoaXMuX19hZGRFdmVudChyLFwiYmx1clwiLGZ1bmN0aW9uKCl7bz0hMX0pLHRoaXMuX19hZGRFdmVudChyLFwia2V5ZG93blwiLGZ1bmN0aW9uKGUpe2lmKG8pe3ZhciBpPXQub3B0aW9ucyx1PXQucGFyZW50cyxhPXQubW92ZW1lbnRMb2NrZWQsYz1uKGUua2V5Q29kZXx8ZS53aGljaCk7aWYoYyl7dmFyIGY9bChjLDIpLHM9ZlswXSxkPWZbMV07aWYodC5fX3Nob3VsZFByb3BhZ2F0ZU1vdmVtZW50KHMsZCkpcmV0dXJuIHIuYmx1cigpLHUubGVuZ3RoJiZ1WzBdLmZvY3VzKCksdC5fX3VwZGF0ZVRocm90dGxlKCk7ZS5wcmV2ZW50RGVmYXVsdCgpLHQuX191bmxvY2tNb3ZlbWVudCgpLHMmJnQuX193aWxsT3ZlcnNjcm9sbChcInhcIixzKSYmKGEueD0hMCksZCYmdC5fX3dpbGxPdmVyc2Nyb2xsKFwieVwiLGQpJiYoYS55PSEwKTt2YXIgaD1pLnNwZWVkO3QuX19hZGRNb3ZlbWVudChzKmgsZCpoKX19fSksdGhpcy5fX2FkZEV2ZW50KHIsXCJrZXl1cFwiLGZ1bmN0aW9uKCl7dC5fX3VubG9ja01vdmVtZW50KCl9KX12YXIgaT1uKDE2MiksdT1yKGkpLGE9bigxNjUpLGM9cihhKSxsPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe3ZhciBuPVtdLHI9ITAsbz0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciB1LGE9KDAsYy5kZWZhdWx0KSh0KTshKHI9KHU9YS5uZXh0KCkpLmRvbmUpJiYobi5wdXNoKHUudmFsdWUpLCFlfHxuLmxlbmd0aCE9PWUpO3I9ITApO31jYXRjaCh0KXtvPSEwLGk9dH1maW5hbGx5e3RyeXshciYmYS5yZXR1cm4mJmEucmV0dXJuKCl9ZmluYWxseXtpZihvKXRocm93IGl9fXJldHVybiBufXJldHVybiBmdW5jdGlvbihlLG4pe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGU7aWYoKDAsdS5kZWZhdWx0KShPYmplY3QoZSkpKXJldHVybiB0KGUsbik7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIil9fSgpLGY9big3OCkscz17U1BBQ0U6MzIsUEFHRV9VUDozMyxQQUdFX0RPV046MzQsRU5EOjM1LEhPTUU6MzYsTEVGVDozNyxVUDozOCxSSUdIVDozOSxET1dOOjQwfTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZi5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19rZXlib2FyZEhhbmRsZXJcIix7dmFsdWU6byx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDE2MyksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDU3KSxuKDQpLHQuZXhwb3J0cz1uKDE2NCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUzKSxvPW4oNDUpKFwiaXRlcmF0b3JcIiksaT1uKDI3KTt0LmV4cG9ydHM9bigxMikuaXNJdGVyYWJsZT1mdW5jdGlvbih0KXt2YXIgZT1PYmplY3QodCk7cmV0dXJuIHZvaWQgMCE9PWVbb118fFwiQEBpdGVyYXRvclwiaW4gZXx8aS5oYXNPd25Qcm9wZXJ0eShyKGUpKX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6bigxNjYpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big1Nyksbig0KSx0LmV4cG9ydHM9bigxNjcpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyksbz1uKDUyKTt0LmV4cG9ydHM9bigxMikuZ2V0SXRlcmF0b3I9ZnVuY3Rpb24odCl7dmFyIGU9byh0KTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBpdGVyYWJsZSFcIik7cmV0dXJuIHIoZS5jYWxsKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9dGhpcyxlPXRoaXMudGFyZ2V0cyxuPWUuY29udGFpbmVyLHI9ZS54QXhpcyxvPWUueUF4aXMsdT1mdW5jdGlvbihlLG4pe3ZhciByPXQuc2l6ZSxvPXQudGh1bWJTaXplO2lmKFwieFwiPT09ZSl7dmFyIGk9ci5jb250YWluZXIud2lkdGgtKG8ueC1vLnJlYWxYKTtyZXR1cm4gbi9pKnIuY29udGVudC53aWR0aH1pZihcInlcIj09PWUpe3ZhciB1PXIuY29udGFpbmVyLmhlaWdodC0oby55LW8ucmVhbFkpO3JldHVybiBuL3Uqci5jb250ZW50LmhlaWdodH1yZXR1cm4gMH0sYT1mdW5jdGlvbih0KXtyZXR1cm4oMCxpLmlzT25lT2YpKHQsW3IudHJhY2ssci50aHVtYl0pP1wieFwiOigwLGkuaXNPbmVPZikodCxbby50cmFjayxvLnRodW1iXSk/XCJ5XCI6dm9pZCAwfSxjPXZvaWQgMCxsPXZvaWQgMCxmPXZvaWQgMCxzPXZvaWQgMCxkPXZvaWQgMDt0aGlzLl9fYWRkRXZlbnQobixcImNsaWNrXCIsZnVuY3Rpb24oZSl7aWYoIWwmJigwLGkuaXNPbmVPZikoZS50YXJnZXQsW3IudHJhY2ssby50cmFja10pKXt2YXIgbj1lLnRhcmdldCxjPWEobiksZj1uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9KDAsaS5nZXRQb3NpdGlvbikoZSksZD10Lm9mZnNldCxoPXQudGh1bWJTaXplO2lmKFwieFwiPT09Yyl7XG52YXIgdj1zLngtZi5sZWZ0LWgueC8yO3QuX19zZXRNb3ZlbWVudCh1KGMsdiktZC54LDApfWVsc2V7dmFyIF89cy55LWYudG9wLWgueS8yO3QuX19zZXRNb3ZlbWVudCgwLHUoYyxfKS1kLnkpfX19KSx0aGlzLl9fYWRkRXZlbnQobixcIm1vdXNlZG93blwiLGZ1bmN0aW9uKGUpe2lmKCgwLGkuaXNPbmVPZikoZS50YXJnZXQsW3IudGh1bWIsby50aHVtYl0pKXtjPSEwO3ZhciBuPSgwLGkuZ2V0UG9zaXRpb24pKGUpLHU9ZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cz1hKGUudGFyZ2V0KSxmPXt4Om4ueC11LmxlZnQseTpuLnktdS50b3B9LGQ9dC50YXJnZXRzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKX19KSx0aGlzLl9fYWRkRXZlbnQod2luZG93LFwibW91c2Vtb3ZlXCIsZnVuY3Rpb24oZSl7aWYoYyl7ZS5wcmV2ZW50RGVmYXVsdCgpLGw9ITA7dmFyIG49dC5vZmZzZXQscj0oMCxpLmdldFBvc2l0aW9uKShlKTtpZihcInhcIj09PXMpe3ZhciBvPXIueC1mLngtZC5sZWZ0O3Quc2V0UG9zaXRpb24odShzLG8pLG4ueSl9aWYoXCJ5XCI9PT1zKXt2YXIgYT1yLnktZi55LWQudG9wO3Quc2V0UG9zaXRpb24obi54LHUocyxhKSl9fX0pLHRoaXMuX19hZGRFdmVudCh3aW5kb3csXCJtb3VzZXVwIGJsdXJcIixmdW5jdGlvbigpe2M9bD0hMX0pfXZhciBvPW4oNzgpLGk9bigxMTIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX21vdXNlSGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3RoaXMuX19hZGRFdmVudCh3aW5kb3csXCJyZXNpemVcIix0aGlzLl9fdXBkYXRlVGhyb3R0bGUpfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3Jlc2l6ZUhhbmRsZXJcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9ITEsbj12b2lkIDAscj10aGlzLnRhcmdldHMsbz1yLmNvbnRhaW5lcix1PXIuY29udGVudCxhPWZ1bmN0aW9uIGUocil7dmFyIG89ci54LGk9ci55O2lmKG98fGkpe3ZhciB1PXQub3B0aW9ucy5zcGVlZDt0Ll9fc2V0TW92ZW1lbnQobyp1LGkqdSksbj1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtlKHt4Om8seTppfSl9KX19LGM9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIjsoMCxpLnNldFN0eWxlKShvLHtcIi11c2VyLXNlbGVjdFwiOnR9KX07dGhpcy5fX2FkZEV2ZW50KHdpbmRvdyxcIm1vdXNlbW92ZVwiLGZ1bmN0aW9uKHIpe2lmKGUpe2NhbmNlbEFuaW1hdGlvbkZyYW1lKG4pO3ZhciBvPXQuX19nZXRQb2ludGVyVHJlbmQocik7YShvKX19KSx0aGlzLl9fYWRkRXZlbnQodSxcInNlbGVjdHN0YXJ0XCIsZnVuY3Rpb24ocil7cmV0dXJuIHQuX19ldmVudEZyb21DaGlsZFNjcm9sbGJhcihyKT9jKFwibm9uZVwiKTooY2FuY2VsQW5pbWF0aW9uRnJhbWUobiksdC5fX3VwZGF0ZUJvdW5kaW5nKCksdm9pZChlPSEwKSl9KSx0aGlzLl9fYWRkRXZlbnQod2luZG93LFwibW91c2V1cCBibHVyXCIsZnVuY3Rpb24oKXtjYW5jZWxBbmltYXRpb25GcmFtZShuKSxjKCksZT0hMX0pLHRoaXMuX19hZGRFdmVudChvLFwic2Nyb2xsXCIsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLG8uc2Nyb2xsVG9wPW8uc2Nyb2xsTGVmdD0wfSl9dmFyIG89big3OCksaT1uKDExMik7T2JqZWN0LmRlZmluZVByb3BlcnR5KG8uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fc2VsZWN0SGFuZGxlclwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbygpe3ZhciB0PXRoaXMsZT10aGlzLnRhcmdldHMsbj10aGlzLl9fdG91Y2hSZWNvcmQscj1lLmNvbnRhaW5lcjt0aGlzLl9fYWRkRXZlbnQocixcInRvdWNoc3RhcnRcIixmdW5jdGlvbihlKXtpZighdC5fX2lzRHJhZyl7dmFyIHI9dC5fX3RpbWVySUQsbz10Lm1vdmVtZW50O2NhbmNlbEFuaW1hdGlvbkZyYW1lKHIuc2Nyb2xsVG8pLHQuX193aWxsT3ZlcnNjcm9sbChcInhcIil8fChvLng9MCksdC5fX3dpbGxPdmVyc2Nyb2xsKFwieVwiKXx8KG8ueT0wKSxuLnRyYWNrKGUpLHQuX19hdXRvTG9ja01vdmVtZW50KCl9fSksdGhpcy5fX2FkZEV2ZW50KHIsXCJ0b3VjaG1vdmVcIixmdW5jdGlvbihlKXtpZighKHQuX19pc0RyYWd8fHMmJnMhPT10KSl7bi51cGRhdGUoZSk7dmFyIHI9bi5nZXREZWx0YSgpLG89ci54LGk9ci55O2lmKHQuX19zaG91bGRQcm9wYWdhdGVNb3ZlbWVudChvLGkpKXJldHVybiB0Ll9fdXBkYXRlVGhyb3R0bGUoKTt2YXIgdT10Lm1vdmVtZW50LGE9dC5NQVhfT1ZFUlNDUk9MTCxjPXQub3B0aW9ucztpZih1LngmJnQuX193aWxsT3ZlcnNjcm9sbChcInhcIixvKSl7dmFyIGw9MjtcImJvdW5jZVwiPT09Yy5vdmVyc2Nyb2xsRWZmZWN0JiYobCs9TWF0aC5hYnMoMTAqdS54L2EpKSxNYXRoLmFicyh1LngpPj1hP289MDpvLz1sfWlmKHUueSYmdC5fX3dpbGxPdmVyc2Nyb2xsKFwieVwiLGkpKXt2YXIgZj0yO1wiYm91bmNlXCI9PT1jLm92ZXJzY3JvbGxFZmZlY3QmJihmKz1NYXRoLmFicygxMCp1LnkvYSkpLE1hdGguYWJzKHUueSk+PWE/aT0wOmkvPWZ9dC5fX2F1dG9Mb2NrTW92ZW1lbnQoKSxlLnByZXZlbnREZWZhdWx0KCksdC5fX2FkZE1vdmVtZW50KG8saSwhMCkscz10fX0pLHRoaXMuX19hZGRFdmVudChyLFwidG91Y2hjYW5jZWwgdG91Y2hlbmRcIixmdW5jdGlvbihlKXtpZighdC5fX2lzRHJhZyl7dmFyIHI9dC5vcHRpb25zLnNwZWVkLG89bi5nZXRWZWxvY2l0eSgpLGk9e307KDAsdS5kZWZhdWx0KShvKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlPSgwLGwucGlja0luUmFuZ2UpKG9bdF0qYy5HTE9CQUxfRU5WLkVBU0lOR19NVUxUSVBMSUVSLC0xZTMsMWUzKTtpW3RdPU1hdGguYWJzKGUpPmY/ZSpyOjB9KSx0Ll9fYWRkTW92ZW1lbnQoaS54LGkueSwhMCksdC5fX3VubG9ja01vdmVtZW50KCksbi5yZWxlYXNlKGUpLHM9bnVsbH19KX12YXIgaT1uKDkwKSx1PXIoaSksYT1uKDc4KSxjPW4oODkpLGw9bigxMTIpLGY9MTAwLHM9bnVsbDtPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX190b3VjaEhhbmRsZXJcIix7dmFsdWU6byx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt2YXIgdD10aGlzLGU9dGhpcy50YXJnZXRzLmNvbnRhaW5lcixuPSExLHI9KDAsaS5kZWJvdW5jZSkoZnVuY3Rpb24oKXtuPSExfSwzMCwhMSk7dGhpcy5fX2FkZEV2ZW50KGUsdS5HTE9CQUxfRU5WLldIRUVMX0VWRU5ULGZ1bmN0aW9uKGUpe3ZhciBvPXQub3B0aW9ucyx1PSgwLGkuZ2V0RGVsdGEpKGUpLGE9dS54LGM9dS55O3JldHVybiBhKj1vLnNwZWVkLGMqPW8uc3BlZWQsdC5fX3Nob3VsZFByb3BhZ2F0ZU1vdmVtZW50KGEsYyk/dC5fX3VwZGF0ZVRocm90dGxlKCk6KGUucHJldmVudERlZmF1bHQoKSxyKCksdC5vdmVyc2Nyb2xsQmFjayYmKG49ITApLG4mJih0Ll9fd2lsbE92ZXJzY3JvbGwoXCJ4XCIsYSkmJihhPTApLHQuX193aWxsT3ZlcnNjcm9sbChcInlcIixjKSYmKGM9MCkpLHZvaWQgdC5fX2FkZE1vdmVtZW50KGEsYywhMCkpfSl9dmFyIG89big3OCksaT1uKDExMiksdT1uKDg5KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX193aGVlbEhhbmRsZXJcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fXZhciBvPW4oODYpLGk9cihvKSx1PW4oOTApLGE9cih1KTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgYz1uKDE3NCk7KDAsYS5kZWZhdWx0KShjKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY1t0XX19KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIG89big4NiksaT1yKG8pLHU9big5MCksYT1yKHUpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBjPW4oMTc1KTsoMCxhLmRlZmF1bHQpKGMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBjW3RdfX0pfSk7dmFyIGw9bigxNzYpOygwLGEuZGVmYXVsdCkobCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGxbdF19fSl9KTt2YXIgZj1uKDE3Nyk7KDAsYS5kZWZhdWx0KShmKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZlt0XX19KX0pO3ZhciBzPW4oMTc4KTsoMCxhLmRlZmF1bHQpKHMpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzW3RdfX0pfSk7dmFyIGQ9bigxNzkpOygwLGEuZGVmYXVsdCkoZCkuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRbdF19fSl9KTt2YXIgaD1uKDE4Mik7KDAsYS5kZWZhdWx0KShoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaFt0XX19KX0pO3ZhciB2PW4oMTgzKTsoMCxhLmRlZmF1bHQpKHYpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB2W3RdfX0pfSk7dmFyIF89bigxODQpOygwLGEuZGVmYXVsdCkoXykuZm9yRWFjaChmdW5jdGlvbih0KXtcImRlZmF1bHRcIiE9PXQmJlwiX19lc01vZHVsZVwiIT09dCYmKDAsaS5kZWZhdWx0KShlLHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF9bdF19fSl9KTt2YXIgcD1uKDE4NSk7KDAsYS5kZWZhdWx0KShwKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZGVmYXVsdFwiIT09dCYmXCJfX2VzTW9kdWxlXCIhPT10JiYoMCxpLmRlZmF1bHQpKGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gcFt0XX19KX0pO3ZhciB5PW4oMTg2KTsoMCxhLmRlZmF1bHQpKHkpLmZvckVhY2goZnVuY3Rpb24odCl7XCJkZWZhdWx0XCIhPT10JiZcIl9fZXNNb2R1bGVcIiE9PXQmJigwLGkuZGVmYXVsdCkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB5W3RdfX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSxuKXt2YXIgcj10aGlzO2lmKCF0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LmFkZEV2ZW50TGlzdGVuZXIpdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdCBlbGVtIHRvIGJlIGEgRE9NIGVsZW1lbnQsIGJ1dCBnb3QgXCIrdCk7dmFyIG89ZnVuY3Rpb24odCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgscj1BcnJheShlPjE/ZS0xOjApLG89MTtvPGU7bysrKXJbby0xXT1hcmd1bWVudHNbb107IXQudHlwZS5tYXRjaCgvZHJhZy8pJiZ0LmRlZmF1bHRQcmV2ZW50ZWR8fG4uYXBwbHkodm9pZCAwLFt0XS5jb25jYXQocikpfTtlLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7ci5fX2hhbmRsZXJzLnB1c2goe2V2dDplLGVsZW06dCxmbjpvLGhhc1JlZ2lzdGVyZWQ6ITB9KSx0LmFkZEV2ZW50TGlzdGVuZXIoZSxvKX0pfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2FkZEV2ZW50XCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LGU9dC50YXJnZXQ7cmV0dXJuIHRoaXMuY2hpbGRyZW4uc29tZShmdW5jdGlvbih0KXtyZXR1cm4gdC5jb250YWlucyhlKX0pfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2V2ZW50RnJvbUNoaWxkU2Nyb2xsYmFyXCIse3ZhbHVlOnIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxlPXRoaXMub3B0aW9ucyxuPXRoaXMub2Zmc2V0LHI9dGhpcy5saW1pdDtyZXR1cm4gdCYmKGUuY29udGludW91c1Njcm9sbGluZ3x8ZS5vdmVyc2Nyb2xsRWZmZWN0KT97eDpbLSgxLzApLDEvMF0seTpbLSgxLzApLDEvMF19Ont4Olstbi54LHIueC1uLnhdLHk6Wy1uLnksci55LW4ueV19fXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2dldERlbHRhTGltaXRcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj10aGlzLmJvdW5kaW5nLHI9bi50b3Asbz1uLnJpZ2h0LHU9bi5ib3R0b20sYT1uLmxlZnQsYz0oMCxpLmdldFBvc2l0aW9uKSh0KSxsPWMueCxmPWMueSxzPXt4OjAseTowfTtyZXR1cm4gMD09PWwmJjA9PT1mP3M6KGw+by1lP3MueD1sLW8rZTpsPGErZSYmKHMueD1sLWEtZSksZj51LWU/cy55PWYtdStlOmY8citlJiYocy55PWYtci1lKSxzKX12YXIgbz1uKDc4KSxpPW4oMTEyKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoby5TbW9vdGhTY3JvbGxiYXIucHJvdG90eXBlLFwiX19nZXRQb2ludGVyVHJlbmRcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGguZGVmYXVsdCkodCl9ZnVuY3Rpb24gaSh0KXt2YXIgZT10aGlzLG49e3NwZWVkOjEsZGFtcGluZzouMSx0aHVtYk1pblNpemU6MjAsc3luY0NhbGxiYWNrczohMSxyZW5kZXJCeVBpeGVsczohMCxhbHdheXNTaG93VHJhY2tzOiExLGNvbnRpbnVvdXNTY3JvbGxpbmc6XCJhdXRvXCIsb3ZlcnNjcm9sbEVmZmVjdDohMSxvdmVyc2Nyb2xsRWZmZWN0Q29sb3I6XCIjODdjZWViXCIsb3ZlcnNjcm9sbERhbXBpbmc6LjJ9LHI9e2RhbXBpbmc6WzAsMV0sc3BlZWQ6WzAsMS8wXSx0aHVtYk1pblNpemU6WzAsMS8wXSxvdmVyc2Nyb2xsRWZmZWN0OlshMSxcImJvdW5jZVwiLFwiZ2xvd1wiXSxvdmVyc2Nyb2xsRGFtcGluZzpbMCwxXX0saT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcImF1dG9cIjtpZihuLm92ZXJzY3JvbGxFZmZlY3QhPT0hMSlyZXR1cm4hMTtzd2l0Y2godCl7Y2FzZVwiYXV0b1wiOnJldHVybiBlLmlzTmVzdGVkU2Nyb2xsYmFyO2RlZmF1bHQ6cmV0dXJuISF0fX0sdT17c2V0IGlnbm9yZUV2ZW50cyh0KXtjb25zb2xlLndhcm4oXCJgb3B0aW9ucy5pZ25vcmVFdmVudHNgIHBhcmFtZXRlciBpcyBkZXByZWNhdGVkLCB1c2UgYGluc3RhbmNlI3VucmVnaXN0ZXJFdmVudHMoKWAgbWV0aG9kIGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9pZGlvdFd1L3Ntb290aC1zY3JvbGxiYXIvd2lraS9JbnN0YW5jZS1NZXRob2RzI2luc3RhbmNldW5yZWdpc3RlcmV2ZW50cy1yZWdleC0tcmVnZXgtcmVnZXgtLVwiKX0sc2V0IGZyaWN0aW9uKHQpe2NvbnNvbGUud2FybihcImBvcHRpb25zLmZyaWN0aW9uPVwiK3QrXCJgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgb3B0aW9ucy5kYW1waW5nPVwiK3QvMTAwK1wiYCBpbnN0ZWFkLlwiKSx0aGlzLmRhbXBpbmc9dC8xMDB9LGdldCBzeW5jQ2FsbGJhY2tzKCl7cmV0dXJuIG4uc3luY0NhbGxiYWNrc30sc2V0IHN5bmNDYWxsYmFja3ModCl7bi5zeW5jQ2FsbGJhY2tzPSEhdH0sZ2V0IHJlbmRlckJ5UGl4ZWxzKCl7cmV0dXJuIG4ucmVuZGVyQnlQaXhlbHN9LHNldCByZW5kZXJCeVBpeGVscyh0KXtuLnJlbmRlckJ5UGl4ZWxzPSEhdH0sZ2V0IGFsd2F5c1Nob3dUcmFja3MoKXtyZXR1cm4gbi5hbHdheXNTaG93VHJhY2tzfSxzZXQgYWx3YXlzU2hvd1RyYWNrcyh0KXt0PSEhdCxuLmFsd2F5c1Nob3dUcmFja3M9dDt2YXIgcj1lLnRhcmdldHMuY29udGFpbmVyO3Q/KGUuc2hvd1RyYWNrKCksci5jbGFzc0xpc3QuYWRkKFwic3RpY2t5XCIpKTooZS5oaWRlVHJhY2soKSxyLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGlja3lcIikpfSxnZXQgY29udGludW91c1Njcm9sbGluZygpe3JldHVybiBpKG4uY29udGludW91c1Njcm9sbGluZyl9LHNldCBjb250aW51b3VzU2Nyb2xsaW5nKHQpe1wiYXV0b1wiPT09dD9uLmNvbnRpbnVvdXNTY3JvbGxpbmc9dDpuLmNvbnRpbnVvdXNTY3JvbGxpbmc9ISF0fSxnZXQgb3ZlcnNjcm9sbEVmZmVjdCgpe3JldHVybiBuLm92ZXJzY3JvbGxFZmZlY3R9LHNldCBvdmVyc2Nyb2xsRWZmZWN0KHQpe3QmJiF+ci5vdmVyc2Nyb2xsRWZmZWN0LmluZGV4T2YodCkmJihjb25zb2xlLndhcm4oXCJgb3ZlcnNjcm9sbEVmZmVjdGAgc2hvdWxkIGJlIG9uZSBvZiBcIisoMCxzLmRlZmF1bHQpKHIub3ZlcnNjcm9sbEVmZmVjdCkrXCIsIGJ1dCBnb3QgXCIrKDAscy5kZWZhdWx0KSh0KStcIi4gSXQgd2lsbCBiZSBzZXQgdG8gYGZhbHNlYCBub3cuXCIpLHQ9ITEpLG4ub3ZlcnNjcm9sbEVmZmVjdD10fSxnZXQgb3ZlcnNjcm9sbEVmZmVjdENvbG9yKCl7cmV0dXJuIG4ub3ZlcnNjcm9sbEVmZmVjdENvbG9yfSxzZXQgb3ZlcnNjcm9sbEVmZmVjdENvbG9yKHQpe24ub3ZlcnNjcm9sbEVmZmVjdENvbG9yPXR9fTsoMCxsLmRlZmF1bHQpKG4pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdS5oYXNPd25Qcm9wZXJ0eSh0KX0pLmZvckVhY2goZnVuY3Rpb24odCl7KDAsYS5kZWZhdWx0KSh1LHQse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG5bdF19LHNldDpmdW5jdGlvbihlKXtpZihpc05hTihwYXJzZUZsb2F0KGUpKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0IGBvcHRpb25zLlwiK3QrXCJgIHRvIGJlIGEgbnVtYmVyLCBidXQgZ290IFwiKyhcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOmIoZSkpKTtuW3RdPWcucGlja0luUmFuZ2UuYXBwbHkodm9pZCAwLFtlXS5jb25jYXQobyhyW3RdKSkpfX0pfSksdGhpcy5fX3JlYWRvbmx5KFwib3B0aW9uc1wiLHUpLHRoaXMuc2V0T3B0aW9ucyh0KX12YXIgdT1uKDg2KSxhPXIodSksYz1uKDkwKSxsPXIoYyksZj1uKDE4MCkscz1yKGYpLGQ9bigyKSxoPXIoZCksdj1uKDU1KSxfPXIodikscD1uKDYyKSx5PXIocCksYj1cImZ1bmN0aW9uXCI9PXR5cGVvZiB5LmRlZmF1bHQmJlwic3ltYm9sXCI9PXR5cGVvZiBfLmRlZmF1bHQ/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgeS5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09eS5kZWZhdWx0JiZ0IT09eS5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSxnPW4oMTEyKSxtPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShtLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2luaXRPcHRpb25zXCIse3ZhbHVlOmksd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6bigxODEpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMiksbz1yLkpTT058fChyLkpTT049e3N0cmluZ2lmeTpKU09OLnN0cmluZ2lmeX0pO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gby5zdHJpbmdpZnkuYXBwbHkobyxhcmd1bWVudHMpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt0aGlzLnVwZGF0ZSgpLHRoaXMuX19rZXlib2FyZEhhbmRsZXIoKSx0aGlzLl9fcmVzaXplSGFuZGxlcigpLHRoaXMuX19zZWxlY3RIYW5kbGVyKCksdGhpcy5fX21vdXNlSGFuZGxlcigpLHRoaXMuX190b3VjaEhhbmRsZXIoKSx0aGlzLl9fd2hlZWxIYW5kbGVyKCksdGhpcy5fX2RyYWdIYW5kbGVyKCksdGhpcy5fX3JlbmRlcigpfXZhciBvPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShvLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX2luaXRTY3JvbGxiYXJcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG8odCxlKXtyZXR1cm4oMCx1LmRlZmF1bHQpKHRoaXMsdCx7dmFsdWU6ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfXZhciBpPW4oODYpLHU9cihpKSxhPW4oNzgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLlNtb290aFNjcm9sbGJhci5wcm90b3R5cGUsXCJfX3JlYWRvbmx5XCIse3ZhbHVlOm8sd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dmFyIHQ9dGhpcy50YXJnZXRzLGU9dGhpcy5zaXplLG49dGhpcy5vZmZzZXQscj10aGlzLnRodW1iT2Zmc2V0LGk9dGhpcy50aHVtYlNpemU7ci54PW4ueC9lLmNvbnRlbnQud2lkdGgqKGUuY29udGFpbmVyLndpZHRoLShpLngtaS5yZWFsWCkpLHIueT1uLnkvZS5jb250ZW50LmhlaWdodCooZS5jb250YWluZXIuaGVpZ2h0LShpLnktaS5yZWFsWSkpLCgwLG8uc2V0U3R5bGUpKHQueEF4aXMudGh1bWIse1wiLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlM2QoXCIrci54K1wicHgsIDAsIDApXCJ9KSwoMCxvLnNldFN0eWxlKSh0LnlBeGlzLnRodW1iLHtcIi10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZTNkKDAsIFwiK3IueStcInB4LCAwKVwifSl9dmFyIG89bigxMTIpLGk9big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGkuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fc2V0VGh1bWJQb3NpdGlvblwiLHt2YWx1ZTpyLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3ZhciB0PXRoaXMudGFyZ2V0cy5jb250YWluZXIsZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49ZS50b3Ascj1lLnJpZ2h0LG89ZS5ib3R0b20saT1lLmxlZnQsdT13aW5kb3csYT11LmlubmVySGVpZ2h0LGM9dS5pbm5lcldpZHRoO3RoaXMuX19yZWFkb25seShcImJvdW5kaW5nXCIse3RvcDpNYXRoLm1heChuLDApLHJpZ2h0Ok1hdGgubWluKHIsYyksYm90dG9tOk1hdGgubWluKG8sYSksbGVmdDpNYXRoLm1heChpLDApfSl9dmFyIG89big3OCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KG8uU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fdXBkYXRlQm91bmRpbmdcIix7dmFsdWU6cix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG8odCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7Zm9yKHZhciBlPTAsbj1BcnJheSh0Lmxlbmd0aCk7ZTx0Lmxlbmd0aDtlKyspbltlXT10W2VdO3JldHVybiBufXJldHVybigwLGEuZGVmYXVsdCkodCl9ZnVuY3Rpb24gaSgpe3ZhciB0PXRoaXMudGFyZ2V0cyxlPXQuY29udGFpbmVyLG49dC5jb250ZW50O3RoaXMuX19yZWFkb25seShcImNoaWxkcmVuXCIsW10uY29uY2F0KG8obi5xdWVyeVNlbGVjdG9yQWxsKGwuc2VsZWN0b3JzKSkpKSx0aGlzLl9fcmVhZG9ubHkoXCJpc05lc3RlZFNjcm9sbGJhclwiLCExKTtmb3IodmFyIHI9W10saT1lO2k9aS5wYXJlbnRFbGVtZW50OylsLnNiTGlzdC5oYXMoaSkmJih0aGlzLl9fcmVhZG9ubHkoXCJpc05lc3RlZFNjcm9sbGJhclwiLCEwKSxyLnB1c2goaSkpO3RoaXMuX19yZWFkb25seShcInBhcmVudHNcIixyKX12YXIgdT1uKDIpLGE9cih1KSxjPW4oNzgpLGw9big4OSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGMuU21vb3RoU2Nyb2xsYmFyLnByb3RvdHlwZSxcIl9fdXBkYXRlVHJlZVwiLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pfSxmdW5jdGlvbih0LGUpe31dKX0pOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF93b2xmeTg3RXZlbnRlbWl0dGVyID0gcmVxdWlyZSgnd29sZnk4Ny1ldmVudGVtaXR0ZXInKTtcblxudmFyIF93b2xmeTg3RXZlbnRlbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dvbGZ5ODdFdmVudGVtaXR0ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBSZXNpemUgPSBmdW5jdGlvbiAoX2V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoUmVzaXplLCBfZXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBSZXNpemUoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc2l6ZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVzaXplKS5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLm9uUmVzaXplSGFuZGxlID0gX3RoaXMub25SZXNpemUuYmluZChfdGhpcyk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3RoaXMub25SZXNpemVIYW5kbGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIF90aGlzLm9uUmVzaXplSGFuZGxlKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUmVzaXplLCBbe1xuICAgIGtleTogJ29uUmVzaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRpbWVzID0gMDtcblxuICAgICAgICB0aGlzLmVtaXRFdmVudCgncmVzaXplOnN0YXJ0Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhhbmRsZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudGltZXMgPSAwO1xuXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGFuZGxlID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiB0aWNrKCkge1xuICAgICAgICBpZiAoKyt0aGlzLnRpbWVzID09PSAxMCkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnRpbWVzID0gMDtcblxuICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KCdyZXNpemU6ZW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZUhhbmRsZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLm9uUmVzaXplSGFuZGxlKTtcblxuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVzaXplO1xufShfd29sZnk4N0V2ZW50ZW1pdHRlcjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlc2l6ZTtcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyIHY0LjIuMTEgLSBnaXQuaW8vZWVcbiAqIFVubGljZW5zZSAtIGh0dHA6Ly91bmxpY2Vuc2Uub3JnL1xuICogT2xpdmVyIENhbGR3ZWxsIC0gaHR0cDovL29saS5tZS51ay9cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbjsoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIENsYXNzIGZvciBtYW5hZ2luZyBldmVudHMuXG4gICAgICogQ2FuIGJlIGV4dGVuZGVkIHRvIHByb3ZpZGUgZXZlbnQgZnVuY3Rpb25hbGl0eSBpbiBvdGhlciBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQGNsYXNzIEV2ZW50RW1pdHRlciBNYW5hZ2VzIGV2ZW50IHJlZ2lzdGVyaW5nIGFuZCBlbWl0dGluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7fVxuXG4gICAgLy8gU2hvcnRjdXRzIHRvIGltcHJvdmUgc3BlZWQgYW5kIHNpemVcbiAgICB2YXIgcHJvdG8gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlO1xuICAgIHZhciBleHBvcnRzID0gdGhpcztcbiAgICB2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50IGluIGl0cyBzdG9yYWdlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBsaXN0ZW5lcnMgQXJyYXkgb2YgbGlzdGVuZXJzIHRvIHNlYXJjaCB0aHJvdWdoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCBtZXRob2QuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFsaWFzQ2xvc3VyZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2lsbCBpbml0aWFsaXNlIHRoZSBldmVudCBvYmplY3QgYW5kIGxpc3RlbmVyIGFycmF5cyBpZiByZXF1aXJlZC5cbiAgICAgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG4gICAgICogRWFjaCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0IHJlc3BvbnNlIGlzIGFuIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXXxPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJldHVybiBhIGNvbmNhdGVuYXRlZCBhcnJheSBvZiBhbGwgbWF0Y2hpbmcgZXZlbnRzIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RvciBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGV2ZW50c1tldnRdIHx8IChldmVudHNbZXZ0XSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGxpc3RlbmVycyBSYXcgbGlzdGVuZXIgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgcHJvdG8uZmxhdHRlbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGZsYXR0ZW5MaXN0ZW5lcnMobGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBmbGF0TGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsYXRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVyc0FzT2JqZWN0ID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgcmVzcG9uc2VbZXZ0XSA9IGxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiB0byB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFRoZSBsaXN0ZW5lciB3aWxsIG5vdCBiZSBhZGRlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZS5cbiAgICAgKiBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGl0IGlzIGNhbGxlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSB0aGVuIHRoZSBsaXN0ZW5lciB3aWxsIGJlIGFkZGVkIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG8uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcklzV3JhcHBlZCA9IHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCc7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0ucHVzaChsaXN0ZW5lcklzV3JhcHBlZCA/IGxpc3RlbmVyIDoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vbiA9IGFsaWFzKCdhZGRMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogU2VtaS1hbGlhcyBvZiBhZGRMaXN0ZW5lci4gSXQgd2lsbCBhZGQgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmVcbiAgICAgKiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgYWZ0ZXIgaXRzIGZpcnN0IGV4ZWN1dGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG8uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkT25jZUxpc3RlbmVyID0gZnVuY3Rpb24gYWRkT25jZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIoZXZ0LCB7XG4gICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRPbmNlTGlzdGVuZXIuXG4gICAgICovXG4gICAgcHJvdG8ub25jZSA9IGFsaWFzKCdhZGRPbmNlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYW4gZXZlbnQgbmFtZS4gVGhpcyBpcyByZXF1aXJlZCBpZiB5b3Ugd2FudCB0byB1c2UgYSByZWdleCB0byBhZGQgYSBsaXN0ZW5lciB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gSWYgeW91IGRvbid0IGRvIHRoaXMgdGhlbiBob3cgZG8geW91IGV4cGVjdCBpdCB0byBrbm93IHdoYXQgZXZlbnQgdG8gYWRkIHRvPyBTaG91bGQgaXQganVzdCBhZGQgdG8gZXZlcnkgcG9zc2libGUgbWF0Y2ggZm9yIGEgcmVnZXg/IE5vLiBUaGF0IGlzIHNjYXJ5IGFuZCBiYWQuXG4gICAgICogWW91IG5lZWQgdG8gdGVsbCBpdCB3aGF0IGV2ZW50IG5hbWVzIHNob3VsZCBiZSBtYXRjaGVkIGJ5IGEgcmVnZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNyZWF0ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudCA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50KGV2dCkge1xuICAgICAgICB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXNlcyBkZWZpbmVFdmVudCB0byBkZWZpbmUgbXVsdGlwbGUgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZXZ0cyBBbiBhcnJheSBvZiBldmVudCBuYW1lcyB0byBkZWZpbmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnRzID0gZnVuY3Rpb24gZGVmaW5lRXZlbnRzKGV2dHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUV2ZW50KGV2dHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdoZW4gcGFzc2VkIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lLCBpdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vZmYgPSBhbGlhcygncmVtb3ZlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBhZGQgdGhlIGFycmF5IG9mIGxpc3RlbmVycyB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICogWWVhaCwgdGhpcyBmdW5jdGlvbiBkb2VzIHF1aXRlIGEgYml0LiBUaGF0J3MgcHJvYmFibHkgYSBiYWQgdGhpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyhmYWxzZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKHRydWUsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWRpdHMgbGlzdGVuZXJzIGluIGJ1bGsuIFRoZSBhZGRMaXN0ZW5lcnMgYW5kIHJlbW92ZUxpc3RlbmVycyBtZXRob2RzIGJvdGggdXNlIHRoaXMgdG8gZG8gdGhlaXIgam9iLiBZb3Ugc2hvdWxkIHJlYWxseSB1c2UgdGhvc2UgaW5zdGVhZCwgdGhpcyBpcyBhIGxpdHRsZSBsb3dlciBsZXZlbC5cbiAgICAgKiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCAodHJ1ZSkgb3IgYWRkZWQgKGZhbHNlKS5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC9yZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hbmlwdWxhdGUgdGhlIGxpc3RlbmVycyBvZiBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG4gICAgICAgIHZhciBtdWx0aXBsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXJzIDogdGhpcy5hZGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgLy8gSWYgZXZ0IGlzIGFuIG9iamVjdCB0aGVuIHBhc3MgZWFjaCBvZiBpdHMgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAodmFsdWUgPSBldnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU28gZXZ0IG11c3QgYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIC8vIEFuZCBsaXN0ZW5lcnMgbXVzdCBiZSBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBpdCBhbmQgcGFzcyBlYWNoIG9uZSB0byB0aGUgbXVsdGlwbGUgbWV0aG9kXG4gICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBbZXZ0XSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuIFdpbGwgcmVtb3ZlIGZyb20gZXZlcnkgZXZlbnQgaWYgbm90IHBhc3NlZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBldnQ7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZW1vdmUgZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIGV2dFxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2dF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBtYXRjaGluZyB0aGUgcmVnZXguXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVFdmVudC5cbiAgICAgKlxuICAgICAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlQWxsTGlzdGVuZXJzID0gYWxpYXMoJ3JlbW92ZUV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyc01hcCA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVyc01hcCkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzTWFwW2tleV0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufS5jYWxsKHRoaXMpKTtcbiJdfQ==