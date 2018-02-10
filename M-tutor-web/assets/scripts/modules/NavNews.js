/* jshint esnext: true */
import AbstractModule from './AbstractModule'

export default class extends AbstractModule {
	constructor(options) {
		super(options);

		this.$el.on('click', '.js-nav-news-toggle', (event) => this.toggleNavNews());
	}

	toggleNavNews() {
		this.$body.toggleClass('has-nav-news-open');

		if (this.$body.hasClass('has-nav-news-open')) {
			$('.js-news-nav').scrollTop(0);
		}
	}

	destroy() {
		this.$el.off();
	}
}
