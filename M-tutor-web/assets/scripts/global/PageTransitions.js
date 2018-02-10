import { $document, $html, $body, $window } from '../utils/environment';

/**
 * List of Transitions
 */
const transitions = {
	mainTransition: {
		start: function() {
			$body.removeClass('is-loaded is-animated has-nav-news-open');

			setTimeout(() => {
				this.newContainerLoading.then(this.finish.bind(this));
			}, 600)
		},
		finish: function() {
			this.done();

			let $el = $(this.newContainer);
            let templateName = $el.data('template');
            $body.attr('data-template', templateName);

            //reinit modules
			let app = window.App;
			app.deleteModules();
			app.initModules();

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				$body.addClass('is-loaded');

				setTimeout(function() {
					$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
	            $document.on('SmoothScroll.isReady', (event) => {
					$body.addClass('is-loaded');

					setTimeout(function() {
						$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	},
	navTransition: {
		start: function() {
			$body.removeClass('is-loaded is-animated').addClass('is-loading');

			setTimeout(()=>{
				$body.removeClass('has-nav-open');
			},60);

			setTimeout(() => {

				this.newContainerLoading.then(this.finish.bind(this));
			}, 800);
		},
		finish: function() {
			this.done();

			let $el = $(this.newContainer);
            let templateName = $el.data('template');
            $body.attr('data-template', templateName);

            //reinit modules
			let app = window.App;
			app.deleteModules();
			app.initModules();

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				$body.removeClass('is-loading');
				$body.addClass('is-loaded');

				setTimeout(function() {
					$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
	            $document.on('SmoothScroll.isReady', (event) => {
	            	$body.removeClass('is-loading');
					$body.addClass('is-loaded');

					setTimeout(function() {
						$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	},
	sectionTransition: {
		start: function() {

			// Scroll to top
			$document.trigger({
				type: 'SmoothScroll.goToTop'
			});

			this.oldHeader = $('.js-header-home');

			this.option = $body.attr('data-route-option');

			if(this.option === 'next-section'){
				this.oldHeader.addClass('is-prev');
			}else{
				this.oldHeader.addClass('is-next');
			}

			$body.addClass('is-loading');
			$body.removeClass('is-loaded');

			setTimeout(() => {
				this.newContainerLoading.then(this.finish.bind(this));
			}, 1200);

		},
		finish: function() {

			this.done();

			let $el = $(this.newContainer);
			this.newHeader = $('.js-header-home',$el);

			if(this.option === 'next-section'){
				this.newHeader.addClass('is-next-section');
			}else{
				this.newHeader.addClass('is-prev-section');
			}

            let templateName = $el.data('template');
            $body.attr('data-template', templateName);

            //reinit modules
			let app = window.App;
			app.deleteModules();
			app.initModules();

			setTimeout(()=>{
				this.newHeader.removeClass('is-prev-section is-next-section');
			},300);

			if (window.matchMedia("(max-width: 1199px)").matches) {
				document.body.scrollTop = 0;
				$body.removeClass('is-loading');
				$body.addClass('is-loaded');

				setTimeout(function() {
					$body.addClass('is-animated');
				}, 600);
			} else if (window.matchMedia("(min-width: 1200px)").matches) {
	            $document.on('SmoothScroll.isReady', (event) => {
	            	$body.removeClass('is-loading');
					$body.addClass('is-loaded');

					setTimeout(function() {
						$body.addClass('is-animated');
					}, 600);
				});
			}
		}
	}
}

export { transitions };
