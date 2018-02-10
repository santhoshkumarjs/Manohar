import AbstractModule from './AbstractModule'

export default class extends AbstractModule {
	constructor(options) {
		super(options);

		this.$toggles = this.$el.find('.js-switch-toggle');
		this.$imageElem = this.$el.find('.js-image');

		this.$el.on('mouseenter.SimilarSwitcher', '.js-switch-toggle', (event) => {
			this.switchProject(event);
		});
	}

	// Hover project
	// ==========================================================================
	switchProject(event) {
		var src = event.currentTarget.getAttribute('data-image');

		if (src !== null) {
			this.$toggles.removeClass('is-active');
			$(event.currentTarget).addClass('is-active');
			this.$imageElem.css('background-image', 'url(' + src + ')');
		}
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off('.SimilarSwitcher');
	}
}
