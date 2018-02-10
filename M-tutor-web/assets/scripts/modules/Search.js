/* jshint esnext: true */
import AbstractModule from './AbstractModule'
import Scrollbar from 'smooth-scrollbar';
// import tap from '../ractive/ractive-events-tap';
// import fade from '../ractive/ractive-transitions-fade';

export default class extends AbstractModule {
	constructor(options) {
		super(options);
		this.searchResultsController = this.initSearchResultsController();

		if (window.matchMedia("(min-width: 1200px)").matches) {
			this.scrollbar = Scrollbar.init(this.$el.find('[data-scrollbar]')[0]);
		}
		window.Ractive.DEBUG = false;
	}

	/**
	 * This controller is used for loading search results and various visual effects
	 *
	 * @return  {Ractive Object}  Ractive instance
	 */
	initSearchResultsController() {
		var _this = this;
		var timeout = 0;
		var minLength = 3;
		var searchDelay = 500;
		var ractive = new Ractive({
			el: this.$el,
			template: this.unescapeHTML(this.$el.html()),
			data: {
				keyword: '',
				news: [],
				projects: [],
				state: 'inert'
			},
			computed: {
				displaySearchResults: function() {
					return this.get('keyword').length >= minLength;
				},
				encodedKeyword: function() {
					return this.get('keyword').replace(/\s/g, '&nbsp;');
				},
				hasNews: function() {
					return this.objectCount('news') !== 0;
				},
				hasProjects: function() {
					return this.objectCount('projects') !== 0;
				},
				hasSections: function() {
					return this.objectCount('sections') !== 0;
				},
				isLoading: function() {
					return this.get('state') === 'loading';
				},
				totalResults: function() {
					return this.get('projects').length + this.get('news').length + this.get('sections').length;
				}
			},
			// events: { tap },
			// transitions: { fade },

			/**
			 * News model
			 * @param  {object}  params  Initial values for the model
			 * @return {object}          News model
			 *
			 * Model properties
			 *
			 * @param {string}  url
			 * @param {string}  title
			 * @param {string}  date
			 * @param {string}  description
			 */
			getNewsModel: function ( params ) {
				var defaults = {
					url: '',
					title: '',
					date: '',
					description: ''
				};
				return $.extend(defaults, params);
			},

			/**
			 * Project model
			 * @param  {object}  params  Initial values for the model
			 * @return {object}          Project model
			 *
			 * Model properties
			 *
			 * @param {string}  url
			 * @param {string}  image
			 * @param {string}  title
			 * @param {array}   tags
			 * @param {string}  description
			 */
			getProjectModel: function ( params ) {
				var defaults = {
					url: '',
					image: '',
					title: '',
					tags: [],
					description: ''
				};
				return $.extend(defaults, params);
			},
			getSectionModel: function ( params ) {
				var defaults = {
					url: '',
					title: '',
					description: ''
				};
				return $.extend(defaults, params);
			},

			/**
			 * Count objects according to keypath
			 * @param  {string}  keypath
			 * @return {int}
			 */
			objectCount: function(keypath) {
				return this.get(keypath).length;
			},

			/**
			 * Allows us to set proxy events and run other tasks when controller is initialized
			 *
			 * @param  {array}  options  Array of options
			 */
			oninit : function ( options ) {
				this.on({
					/**
					 * Empty all search results
					 *
					 * @param  {object}  event  Ractive event object
					 */
					emptyResults: function( event ) {
						ractive.set('projects', []);
						ractive.set('news', []);
						ractive.set('sections', []);
					},

					/**
					 * When load more is clicked, we fetch more news
					 * If nextPage is false, the button will disapear
					 *
					 * @param  {object}  event  Ractive event object
					 */
					loadSearchResults: function ( event ) {
						var parameters = {
							keyword: this.get('keyword')
						};

						this.set('state','loading');

						_this.invokeLoadResults(parameters, function(response) {
							ractive.set('projects', response.projects);
							ractive.set('sections', response.sections);
							ractive.set('news', response.news).then(function() {
								ractive.set('state', 'inert');
							});
						});
					},

					/**
					 * Gobble up the submit event
					 *
					 * @param  {object}  event  Ractive event object
					 */
					submitForm: function (event) {
						event.original.preventDefault();
					}
				});
			}
		});

		// Watching for changes on the typed in data
		ractive.observe('keyword', function(newValue) {

			// Timeout clearing!
			if (timeout !== 0) {
				clearTimeout(timeout);
				timeout = 0;
			}

			// If less than minLength characters, clear out the search results
			if (newValue.length < minLength) {
				ractive.fire('emptyResults');
			} else {
				// Dont search if loading
				if (ractive.get('state') === 'inert') {
					timeout = setTimeout(function() {
						ractive.fire('loadSearchResults');
					}, searchDelay)
				}
			}
		});

		return ractive;
	}

	/**
	 * Query server for search results and send them to the callback function
	 * @param  {array}     data      Object formed by a keyword
	 * @param  {function}  callback  Function to execute after the AJAX request is done
	 */
	invokeLoadResults (data, callback) {
		// Default response
		var _response = {
			news: [],
			projects: []
		};
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'search',
			data: data
		})
		.done((response) => {
			if (response.success === true) {
				_response = response;
			}
		})
		.fail(() => {
			console.log('error');
		})
		.always(() => {
			callback(_response);
		});
	}

	// Destroy
	// ==========================================================================
	destroy() {
		this.searchResultsController.teardown();
		this.$el.off('.Search');
	}
}
