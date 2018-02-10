// ==========================================================================
// Generic module
// ==========================================================================
import AbstractModule from './AbstractModule';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		this.initSlick();
	}

	// Init slick
	// ==========================================================================
	initSlick() {
		this.$el.slick({
			arrows: true,
			dots: false,
			speed: 600,
			cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
			prevArrow: '<button class="c-carousel_arrow -prev o-button -square -left" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Previous"><use xlink:href="assets/pomerleau/images/sprite.svg#arrow-prev"></use></svg></span></button>',
			nextArrow: '<button class="c-carousel_arrow -next o-button -square -right" type="button"><span class="o-button_label"><svg class="o-button_icon" role="img" title="Next"><use xlink:href="assets/pomerleau/images/sprite.svg#arrow-next"></use></svg></span></button>',
			mobileFirst: true,
			responsive: [
				{
	    			breakpoint: 700,
	    			settings: {
	    				variableWidth: true,
	    			}
	    		}
	    	]
		});
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off();
	}
}
