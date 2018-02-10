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
		    customPaging : function(slider, i) {
		    	i++;
		    	if(i === 1){
		    		return '<button class="c-carousel_dot js-carousel-dot is-first" type="button"><span class="c-carousel_dot_label">0'+i+'</span><span class="c-carousel_dot_line"></span></button>';
		    	} else {
		    		return '<button class="c-carousel_dot js-carousel-dot" type="button"><span class="c-carousel_dot_label">0'+i+'</span><span class="c-carousel_dot_line"></span></button>';
		    	}
		    }
		});

		this.$el.slick('slickPause');

		setTimeout(() => {
			this.$el.find('.js-carousel-dot.is-first').removeClass('is-first');
			this.$el.slick('slickPlay');
		}, 4000);
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off();
	}
}
