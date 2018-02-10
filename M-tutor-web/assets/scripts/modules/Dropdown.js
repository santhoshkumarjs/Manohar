import AbstractModule from './AbstractModule'

export default class extends AbstractModule {
	constructor(options) {
		super(options);
        this.mode = typeof(options['dropdown-mode']) !== 'undefined' ? options['dropdown-mode'] : 'accordeon';

		this.$el.on('click.Dropdown', '.js-dropdown-toggle', (event) => this.manageDropdownClick(event));
	}

	// Toggle dropdown
	// ==========================================================================
	manageDropdownClick(event) {
		if (window.matchMedia("(max-width: 1199px)").matches) {
			var $target = $(event.currentTarget);
			var $parent = $target.parents('.js-dropdown');

			event.preventDefault();

			if ($target.hasClass('is-disabled')) {
				return false;
			}

			if (this.mode === 'accordeon') {
				$parent.siblings('.js-dropdown')
					.removeClass('has-dropdown')
					.find('.js-dropdown-list')
					.stop()
					.slideUp();
			}

			$target.siblings('.js-dropdown-list')
				.stop()
				.slideToggle();

			if ($parent.hasClass('has-dropdown')) {
				$parent.removeClass('has-dropdown');
				this.$el.removeClass('has-dropdown');
			} else {
				$parent.addClass('has-dropdown');
				this.$el.addClass('has-dropdown');
			}
		}
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off('.Dropdown');
	}
}
