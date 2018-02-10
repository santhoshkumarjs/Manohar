// ==========================================================================
// Smooth scrolling module
// ==========================================================================
import AbstractModule from './AbstractModule';
import Scrollbar from 'smooth-scrollbar';
import { $document } from '../utils/environment';
import Resize from 'throttled-resize';

import { hasDependencies } from '../global/dependencies';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		this.scrollbar;
		this.isSmooth = false;
		this.isMobile = true;

		this.selector = '.js-parallax, .s-wysiwyg ul, .s-wysiwyg blockquote';

		// if (hasDependencies('SmoothScrolling')) {
		// 	this.$document.on('resolveDependencies.SmoothScrolling', () => this.buildSmoothScrolling());
		// } else {

		// SmoothScrolling only on this matchMedia matche
		if (window.matchMedia("(min-width: 1200px)").matches) {
			this.buildSmoothScrolling();
			this.isSmooth = true;
			this.isMobile = false;

			$document.on('SmoothScrolling.rebuild', () => {
				this.updateElements();
			});
		}
		// }

		var resize = new Resize();
        resize.on('resize:end', () => this.checkResize());
	}

	buildSmoothScrolling() {
		setTimeout(() => {
			this.scrollbar = Scrollbar.init(this.$el[0]);
			this.windowHeight = this.$window.height();
			this.windowMiddle = this.windowHeight / 2;
			this.scrollbarLimit = this.scrollbar.limit.y + this.windowHeight;
			this.elements = {};
			// Create elements object
			this.addElements();
			// First load
			this.checkElements(true);
			// On scroll
			this.scrollbar.addListener(() => this.checkElements());

			// Scrollto buttons event
			$('.js-scrollto').on('click.SmoothScrolling', (event) => this.scrollTo(event));

			// Setup done.
			this.$document.trigger({
				type: 'SmoothScroll.isReady'
			});

		}, 300);
	}

	// Add elements
	// ==========================================================================
	addElements() {
		$(this.selector).each((i, el) => {
			let $element = $(el);
			let elementSpeed = $element.data('speed') / 10;
			let elementPosition = $element.data('position');
			let elementTarget = $element.data('target');
			let elementHorizontal = $element.data('horizontal');
			let $target = (elementTarget) ? $(elementTarget) : $element;
			let elementOffset = $target.offset().top + this.scrollbar.scrollTop;

			let elementPersist = $element.data('persist');

			if (!elementTarget && $element.data('transform')) {
				let transform = $element.data('transform');
				elementOffset -= parseFloat(transform.y);
			}

			let elementLimit = elementOffset + $target.outerHeight();
			let elementMiddle = ((elementLimit - elementOffset) / 2) + elementOffset;

			this.elements[i] = {
				$element: $element,
				offset: elementOffset,
				limit: elementLimit,
				middle: elementMiddle,
				speed: elementSpeed,
				position: elementPosition,
				horizontal: elementHorizontal,
				persist: elementPersist
			}
		});
	}

	/**
	 * Update elements, recalculate all position as if the template
	 * just loaded.
	 */
	updateElements() {
		this.scrollbar.update();
		// Reset container and scrollbar data.
		this.windowHeight = this.$window.height();
		this.windowMiddle = this.windowHeight / 2;
		this.scrollbarLimit = this.scrollbar.limit.y + this.windowHeight;
		this.addElements();
		this.checkElements(true);
		// this.checkElements(true);
		$document.trigger('SmoothScroll.update');
	}

	// Check resize
	// ==========================================================================
	checkResize() {
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
	}

	// Check elements
	// ==========================================================================
	checkElements(first) {
		let scrollbarTop = this.scrollbar.scrollTop;
		let scrollbarLimit = this.scrollbarLimit;
		let scrollbarBottom = scrollbarTop + this.windowHeight;
		let scrollbarMiddle = scrollbarTop + this.windowMiddle;

		for(let i in this.elements) {
			let transformDistance;
			let scrollBottom = scrollbarBottom;
			let $element = this.elements[i].$element;
			let elementOffset = this.elements[i].offset;
			// elementOffset = $element.offset().top;
			let elementLimit = this.elements[i].limit;
			let elementMiddle = this.elements[i].middle;
			let elementSpeed = this.elements[i].speed;
			let elementPosition = this.elements[i].position;
			let elementHorizontal = this.elements[i].horizontal;
			let elementPersist = this.elements[i].persist;

			if (elementPosition === 'top') {
				scrollBottom = scrollbarTop;
			}


			// Define if the element is inview
			let inview = (scrollBottom >= elementOffset && scrollbarTop <= elementLimit);

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
					transformDistance = ((elementOffset - this.windowMiddle)  - elementMiddle) * -elementSpeed;
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
				(elementHorizontal) ? this.transform($element, transformDistance+'px') : this.transform($element, 0, transformDistance+'px');
			}
		}
	}


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
    transform($element, x, y, z) {
    	// Defaults
    	x = x || 0;
    	y = y || 0;
    	z = z || 0;

    	// Translate
        $element.css({
            '-webkit-transform': 'translate3d('+ x +', '+ y +', '+ z +')',
            '-ms-transform': 'translate3d('+ x +', '+ y +', '+ z +')',
            'transform': 'translate3d('+ x +', '+ y +', '+ z +')'
        }).data('transform',{
        	x : x,
        	y : y,
        	z : z
        }); // Remember

        $element.find(this.selector).each((i, e) => {
        	let $this = $(e);
        	if (!$this.data('transform')) {
        		$this.data('transform', {
		        	x : x,
		        	y : y,
		        	z : z
		        })
        	}
        })
    }


	// Scroll to
	// ==========================================================================
	scrollTo(event) {

		if(!$.isNumeric(event)) {
			event.preventDefault();

			let $target = $(event.currentTarget);
			let targetData;

			if ($target.data('target')) {
				targetData = $target.data('target');
			} else {
				targetData = $target.attr('href');
			}

			var targetOffset = $(targetData).offset().top + this.scrollbar.scrollTop;
		}
		else {
			var targetOffset = event;
		}

		this.scrollbar.scrollTo(0, targetOffset, 900);
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off('.SmoothScrolling');
		this.parallaxElements = undefined;
		this.elements = {};

		if (!this.isMobile) {
			this.scrollbar.destroy();
		}
	}
}
