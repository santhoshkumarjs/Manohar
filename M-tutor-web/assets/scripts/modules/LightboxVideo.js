// ==========================================================================
// Generic module
// ==========================================================================
import AbstractModule from './AbstractModule';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		this.$el.on('click', '.js-lightbox-video-open', (event) => this.openLightbox(event));
		this.$el.on('click', '.js-lightbox-video-close', () => this.closeLightbox());
	}

	// Open
	// ==========================================================================
	openLightbox(event) {
		let dataVideo = $(event.currentTarget).data('video');
		this.$body.addClass('has-lightbox-video-open');
		$('.js-lightbox-video-content').html(dataVideo);
	}

	// Close
	// ==========================================================================
	closeLightbox() {
		this.$body.removeClass('has-lightbox-video-open');

		setTimeout(() => {
			$('.js-lightbox-video-content').html("");
		}, 600);
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.$el.off();
	}
}
