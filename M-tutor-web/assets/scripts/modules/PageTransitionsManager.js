
/* jshint esnext: true */
import Barba from 'barba.js';
import { $document, $window, $html, $body } from '../utils/environment';
import { transitions } from '../global/PageTransitions';

export default class {
	constructor(options) {
		this.load();
	}

	load(){

		var self = this;

		//Init Barba JS
		Barba.Pjax.Dom.containerClass = 'js-barba-container';
		Barba.Pjax.Dom.wrapperId = 'js-barba-wrapper';

		Barba.Pjax.start();

		var mainTransition = Barba.BaseTransition.extend(transitions.mainTransition);
		var navTransition = Barba.BaseTransition.extend(transitions.navTransition);
		var sectionTransition = Barba.BaseTransition.extend(transitions.sectionTransition);

		Barba.Pjax.getTransition = function() {
			if (self.route === 'nav'){
				return navTransition;
			}
			else if (self.route == 'same-section') {
				return sectionTransition;
			}
			else {
				return mainTransition;
			}
		};


		Barba.Dispatcher.on('linkClicked', function(currentStatus, oldStatus, container) {
			self.route= currentStatus.getAttribute('data-route');
			self.routeOption= currentStatus.getAttribute('data-route-option');

			if(self.routeOption != undefined){
				$body.attr('data-route-option',self.routeOption);
			}else{
				$body.attr('data-route-option','');
			}
		});

		/**
		 * Execute any third party features.
		 */
		Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {

			if (window.ga && !$html.data('debug')) {
				ga('send', {
					hitType: 'pageview',
					page: location.pathname,
					location: currentStatus.url,
					title: document.title
				});
			}

			var js = container.querySelector("script");
			if(js != null){
				eval(js.innerHTML);
			}
		});
	}

	destroy() {
		this.$el.off();
	}
}
