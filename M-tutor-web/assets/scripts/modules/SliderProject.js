/* jshint esnext: true */
import DoubleSlider from './DoubleSlider'

export default class extends DoubleSlider {
	constructor(options) {
		options.sliders = {
			one: {
				$el: options.$el.find('.js-slider-project-main'),
				options: {
					arrows: false,
					cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
					speed: 500
				}
			},
			two:{
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
		super(options);
	}
}
