/* jshint esnext: true */
import AbstractModule from './AbstractModule'
import Map from './Map'
import tap from 'ractive-events-tap';
import fade from 'ractive-transitions-fade';
import { addDependency, resolveDependency } from '../global/dependencies';

export default class extends AbstractModule {
	constructor(options) {
		super(options);
		this.smoothScrollingDependency = addDependency('LocationSwitcher', 'SmoothScrolling');

		this.$mapContainer = this.$el.find('.js-map-container');
		this.$switcherContainer = this.$el.find('.js-switcher-container');
		this.idPrefix = 'location_';
		this.icon = this.$mapContainer.data('icon');
		this.places = this.prepareLocations(window.locationsOptions.locations);

		this.locationController = this.initLocationController();
		window.Ractive.DEBUG = false;
	}

	/**
	 * This controller is used for switching between active locations
	 * @return  {Ractive Object}  Ractive instance
	 */
	initLocationController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.$switcherContainer,
			template: this.unescapeHTML(this.$switcherContainer.html()),
			data: {
				locations: window.locationsOptions.locations,
				activeLocation: {},
				displayActiveLocation: true,
				isActive: function (item) {
					return item.id === this.get('activeLocation').id;
				}
			},
			events: { tap },
			transitions: { fade },
			/**
			 * Allows us to set proxy events and run other tasks when controller is initialized
			 * @param  {array}  options  Array of options
			 */
			oninit : function ( options ) {
				// Set active location as first of locations set
				this.set('activeLocation', this.get('locations.0'));

				// Init map and set first location as "active"
				_this.map = new Map({
					$container: _this.$mapContainer,
					mapOptions: {
						places: _this.places
					},
					controllerReadyCallback: function(map) {
						resolveDependency(_this.smoothScrollingDependency);
						ractive.displayActiveLocation();
					}
				});

				this.on({
					/**
					 * When we toggle a location, we set the active event
					 * and change the map
					 * @param  {object}  event  Ractive event object
					 */
					toggleLocation: function ( event ) {
						this.set('displayActiveLocation', false).then(function() {
							ractive.set('activeLocation', ractive.get(event.keypath)).then(function() {
								ractive.set('displayActiveLocation', true);
								ractive.displayActiveLocation();
							});
						});
					}
				});
			},
			/**
			 * Updates the Google Map by showing only the active location
			 */
			displayActiveLocation: function() {
				var ident = _this.idPrefix + this.get('activeLocation').id;
				var place = _this.map.controller.get_place(ident);

				_this.map.controller.filter(ident);
				_this.map.controller.set_zoom(10);
				_this.map.controller.map().setCenter(place.object().getPosition());
			}
		});

		return ractive;
	}

	/**
	 * Convert our Location models to BB Map objects
	 * @return {array}
	 */
	prepareLocations(locations) {
		var i = 0;
		var len = locations.length;
		var preppedLocations = {};

		for (; i < len; i++) {
			let id = this.idPrefix + locations[i].id;
			preppedLocations[id] = {
				type : 'marker',
				categories: [id],
				icon: {
					src: this.icon,
					height: 40,
					width: 33
				},
				coords : [
					locations[i].lat,
					locations[i].lon
				]
			};
		}

		return preppedLocations;
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.locationController.teardown();
		this.$el.off('.LocationSwitcher');
	}
}
