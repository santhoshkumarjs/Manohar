// ==========================================================================
// Generic module
// ==========================================================================
import AbstractModule from './AbstractModule';
import Scrollbar from 'smooth-scrollbar';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		$('.js-nav-toggle').click((event) => this.toggleNav());

		this.$el.find('.js-nav-search').click((event) => {});
		this.$el.on('click', '.js-search-button', (event) => this.openSearch(event));

		if (window.matchMedia("(min-width: 1200px)").matches) {
			this.scrollbar = Scrollbar.init(this.$el.find('[data-scrollbar]')[0]);
		}
	}

	// Open search
	// ==========================================================================
	openSearch(event) {
		event.preventDefault();

		this.$body.toggleClass('has-search-open');

		setTimeout(() => {
			this.$el.find('.js-search-input').focus();
		}, 300);
	}

	// Toggle nav
	// ==========================================================================
	toggleNav() {
		if (this.$body.hasClass('has-nav-open')) {
			this.$body.removeClass('has-nav-open');
		} else {
			this.$el.find('.js-search-input').val('');
			this.$el.find('.js-search-results').html('');
			this.$body.removeClass('has-search-open').addClass('has-nav-open');
		}
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off();
	}
}
