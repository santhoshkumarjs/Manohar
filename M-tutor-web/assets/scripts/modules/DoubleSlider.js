/* jshint esnext: true */
import AbstractModule from './AbstractModule'

export default class extends AbstractModule {
	constructor(options) {
		super(options);

		this.$sliderOne = options.sliders.one.$el;
		this.$sliderTwo = options.sliders.two.$el;

		this.$sliderOne.slick(
			options.sliders.one.options
		).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
			if (currentSlide !== nextSlide) {
				let action;
				if (Math.abs(nextSlide - currentSlide) === 1) {
					action = (nextSlide - currentSlide > 0) ? 'slickNext' : 'slickPrev';
				} else {
					action = (nextSlide - currentSlide > 0) ? 'slickPrev' : 'slickNext';
				}
				this.$sliderTwo.slick(action);
				this.activeSlideChanged(nextSlide);
			}
		});

		this.$sliderTwo.slick(options.sliders.two.options);

		this.$el.on('click.DoubleSlider', '.js-slider-button', (event) => {
			this.changeSlide(event);
		})
	}

	/**
	 * Change active slide for both sliders
	 * @var  {Event}  event
	 */
	changeSlide(event) {
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
	}

	activeSlideChanged(index) {}

	destroy() {
		this.$sliderOne.slick('unslick');
		this.$sliderTwo.slick('unslick');
		this.$el.off('.DoubleSlider');
	}
}
