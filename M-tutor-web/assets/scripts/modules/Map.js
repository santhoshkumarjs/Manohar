/* jshint esnext: true */
class Map {
	constructor(options) {
		setTimeout(() => {
			this.controller = undefined;
			this.$container = options.$container;

			var mapOptions =  (typeof(options.mapOptions) !== 'undefined') ? options.mapOptions : {};
			var controllerReadyCallback = (typeof(options.controllerReadyCallback) !== 'undefined') ? options.controllerReadyCallback : function(){};

			this.$container.on('controllerReady.Map', () => {
				controllerReadyCallback(this);
			});

			// If google is undefined
			if (!window.google || !window.google.maps) {
				window._tmp_google_onload = () => {
					this.displayMap(mapOptions);
				};

				$.getScript(
					'https://maps.googleapis.com/maps/api/js?sensor=true&v=3' +
					'&language=fr&callback=_tmp_google_onload&key=AIzaSyCRL-lhPXm5SM6cC7Y0jdkjCfApU8Xur3Y',
					function () {}
				);

				return false;
			} else {
				this.displayMap(mapOptions);
			}
		}, 1700);
	}

	displayMap(mapOptions) {
		if (!this.$container.length) {
			return false;
		}

		var icon = this.$container.data('icon');
		var address = this.$container.data('address');
		var scrollwheel = (typeof(this.$container.data('scrollwheel')) !== 'undefined') ? true : false;
		var places = (typeof(mapOptions.places) !== 'undefined') ? mapOptions.places : {};

		// Default options.
		// Map center changes after the marker is added
		var controllerOptions = {
			map: {
				center: {
					x: 45.3712923,
					y: -73.9820994
				},
				zoom: 3,
				scrollwheel: scrollwheel,
				mapType: 'roadmap',
				coordsType: 'inpage', // array, json? (vs ul li)
				map_mode: 'default',
				//disableDefaultUI: true
			},
			places: places,
			max_fitbounds_zoom: 14
		};

		this.controller = new BB.gmap.controller(this.$container.get(0), controllerOptions);

		this.controller.init();

		this.controller.set_styles([{"featureType":"all","elementType":"geometry","stylers":[{"lightness":"-5"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"lightness":"-10"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"hue":"#d700ff"},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"saturation":"0"},{"lightness":"0"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"lightness":"50"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"lightness":"25"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"weight":"1"},{"lightness":"0"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":"25"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"lightness":"30"},{"gamma":"1.00"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"lightness":"53"},{"gamma":"1.00"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"-20"},{"gamma":"1.00"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"lightness":"30"},{"gamma":"1"},{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"lightness":"-10"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"lightness":"-40"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":"18"},{"saturation":"-100"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"lightness":"-30"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"50"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"weight":"1"},{"saturation":"0"},{"lightness":"83"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"80"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"80"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"saturation":"0"},{"lightness":"-15"},{"weight":".25"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"lightness":"0"},{"gamma":"1.00"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffc1d9"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"saturation":"-100"},{"lightness":"-5"},{"gamma":"0.5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"weight":".75"},{"visibility":"off"}]}]);

		if (address !== '') {
			this.controller.add_place_by_address('place', address, {
				type: 'marker',
				icon: {
					src: icon,
					height: 84,
					width: 60
				},
				loaded_callback: (o) => {
					this.controller.fit_bounds();
				}
			});
		}

		this.controller.ready(() => {
			this.$container.trigger('controllerReady.Map');
		});
	}


	// Destroy
	// ==========================================================================
	destroy() {
		this.$container.off('.Map');
	}
}

export default Map;
