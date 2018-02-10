// ==========================================================================
// Slider home
// ==========================================================================
import AbstractModule from './AbstractModule';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		this.currentSlide = 1;
		this.isAnimating = false;
		this.animationDuration = 1200;
		this.autoplaySpeed = 10000;
		this.interval;
		this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
		this.$controls = this.$el.find('.js-slider-home-button');

		this.$el.on('click', '.js-slider-home-next', (event) => this.nextSlide());
		this.$el.on('click', '.js-slider-home-prev', (event) => this.prevSlide());

		this.startAutoplay();
	}

	// Next slide
	// ==========================================================================
	nextSlide() {
		this.preventClick();

		if (this.currentSlide === this.maxSlide) {
			this.currentSlide = 0;
		}

		this.currentSlide++;
		this.$el.find('.js-slider-home-slide.is-prev').removeClass('is-prev').addClass('is-next');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-prev');
		this.$el.find('.js-slider-home-slide[data-slide="'+this.currentSlide+'"]').removeClass('is-next').addClass('is-current');
	}

	// Prev slide
	// ==========================================================================
	prevSlide() {
		this.preventClick();

		if (this.currentSlide === 1) {
			this.currentSlide = this.maxSlide + 1;
		}

		this.currentSlide--;
		this.$el.find('.js-slider-home-slide.is-next').removeClass('is-next').addClass('is-prev');
		this.$el.find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-next');
		this.$el.find('.js-slider-home-slide[data-slide="'+this.currentSlide+'"]').removeClass('is-prev').addClass('is-current');
	}

	// Prevent click
	// ==========================================================================
	preventClick() {
		this.isAnimating = true;
		this.$controls.prop('disabled', true);
		clearInterval(this.interval);

		setTimeout(() => {
			this.isAnimating = false;
			this.$controls.prop('disabled', false);
			this.startAutoplay();
		}, this.animationDuration);
	}

	// Start autoplay
	// ==========================================================================
	startAutoplay() {
		this.interval = setInterval(() => {
			if (!this.isAnimating) {
				this.nextSlide();
			}
		}, this.autoplaySpeed);
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off();
	}
}
