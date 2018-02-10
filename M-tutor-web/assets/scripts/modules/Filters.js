// ==========================================================================
// Filters
// ==========================================================================
/* jshint esnext: true */
import AbstractModule from './AbstractModule';
import animateTo from '../utils/animateTo';
import { isArray } from '../utils/is';
import { addDependency, resolveDependency } from '../global/dependencies';
import Scrollbar from 'smooth-scrollbar';
import tap from '../ractive/ractive-events-tap';
import fade from '../ractive/ractive-transitions-fade';

export default class extends AbstractModule {
	constructor (options) {
		super(options);

		this.searchIsOpen = false;

		this.elements = {
			$total: $('.js-project-total'),
			$filters: $('.js-filters'),
			$projects: $('.js-projects')
		};

		window.Ractive.DEBUG = false;

		this.filtersController = this.initFiltersController();
		this.projectsController = this.initProjectsController();

		this.smoothScrollingDependency = addDependency('Filters', 'SmoothScrolling');

		this.filtersController.dispatchFilters({
			firstBlood: true
		});

		if (window.matchMedia("(min-width: 1200px)").matches) {
			this.scrollbarTags = Scrollbar.init(this.$el.find('.js-filters-tags')[0]);
			this.scrollbarFilters = Scrollbar.init(this.$el.find('.js-filters-list')[0]);
		}

		this.$el.on('click.Filters', '.js-filters-open', (event) => this.toggleFilters(event));
		this.$el.on('click.Filters', '.js-filters-search-open', (event) => this.toggleFiltersSearch(event));
		this.$el.on('click.Filters', '.js-filters-button', (event) => this.filter(event));
		this.$el.on('click.Filters', '.js-filters-search-button', (event) => this.search(event));
	}

	//	Toggle filters
	// ==========================================================================
	toggleFilters(event) {
		this.$body.toggleClass('has-filters-open').removeClass('has-filters-search-open');
		$(event.currentTarget).toggleClass('is-active');
		this.$el.find('.js-filters-search-open.is-active').removeClass('is-active');

		if (this.$body.hasClass('has-filters-open')) {
			this.$el.find('.js-filters-list').scrollTop(0);
		}
	}

	//	Close filters
	// ==========================================================================
	closeFilters() {
		this.$body.removeClass('has-filters-open');
		this.$el.find('.js-filters-open').removeClass('is-active');
	}

	//	Toggle filters search
	// ==========================================================================
	toggleFiltersSearch(event) {
		var $searchInput = this.$el.find('.js-filters-search-input');

		this.$body.toggleClass('has-filters-search-open').removeClass('has-filters-open');
		$(event.currentTarget).toggleClass('is-active');
		this.$el.find('.js-filters-open.is-active').removeClass('is-active');

		if (!this.searchIsOpen) {
			$searchInput.focus();
			this.searchIsOpen = true;
		} else {
			$searchInput.blur();
			this.searchIsOpen = false;
		}
	}

	//	Close filters search
	// ==========================================================================
	closeFiltersSearch(event) {
		this.$body.removeClass('has-filters-search-open');
		this.$el.find('.js-filters-search-open').removeClass('is-active');
	}

	// Filter
	// ==========================================================================
	filter(event) {
		animateTo(this.elements.$projects);
		this.closeFilters();
	}

	// Search
	// ==========================================================================
	search(event) {
		this.closeFiltersSearch();
	}

	/**
	 * This controller is used for managing filters being added and removed
	 * It tells the project controller which filters are active or not through event dispatching
	 *
	 * @return  {Ractive Object}  Ractive instance
	 */
	initFiltersController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$filters,
			template: this.unescapeHTML(this.elements.$filters.html()),
			data: {
				items: [],
				activeCategories: window.templateData.activeCategories,
				activeServices: window.templateData.activeServices,
				activeCharacteristics: window.templateData.activeCharacteristics,
				activeTags: window.templateData.activeTags,
				activeType: window.templateData.activeType,
				filterBoxes: window.templateData.filterBoxes,
				projectTypes: window.templateData.projectTypes,
				projectCategories: window.templateData.projectCategories,
				projectTags: window.templateData.projectTags
			},
			delimiters: ['[[', ']]'],
			tripleDelimiters: ['[[[', ']]]'],
			events: { tap },
			/**
			 * Adds an item to filters
			 *
			 * @param {object}  model  Item model
			 */
			addItem: function (model) {
				this.push('items', model);
			},

			/**
			 * Fire an event, so we can query the server for projects according to active filters
			 */
			dispatchFilters: function (options) {
				options = $.extend(options, {});

				var data = {
					filters: this.get('items'),
					keyword: this.get('keyword')
				};
				_this.projectsController.fire('refreshProjects', data, options);
			},

			/**
			 * Find an item in items array using its ID
			 *
			 * @param  {string}       id  Quasi-unique identifier composed of {{filterIdent}}_{{ident}}
			 * @return {int|boolean}      Index of the item in the array or false if can't be found
			 */
			findIndex: function ( id ) {
				var items = this.get('items');
				var i = items.length;

				while (i--) {
					if (items[i].id === id) {
						return i;
					}
				}
				return false;
			},

			/**
			 * Search item set for items with a specific taxonomy
			 * @param   {string}  taxonomy  Taxonomy identifier
			 * @return  {array}             Array of item indexes
			 */
			findTaxonomyIndexes: function ( taxonomy ) {
				var items = this.get('items');
				var i = items.length;
				var indexes = [];

				while (i--) {
					if (items[i].taxonomy === taxonomy) {
						indexes.push(i);
					}
				}
				return indexes;
			},

			/**
			 * Item model
			 * @param  {object}  params  Initial values for the model
			 * @return {object}          Item model
			 *
			 * Model properties
			 *
			 * @param {string}  id        Quasi-unique identifier composed of {{filterIdent}}_{{ident}}
			 * @param {string}  taxonomy  Filter taxonomy
			 * @param {string}  label     Front end view
			 * @param {string}  value     Input value used for filtering projects in our action
			 */
			getItemModel: function ( params ) {
				var defaults = {
					id: null,
					taxonomy: '',
					label: '',
					value: ''
				};
				return $.extend(defaults, params);
			},

			/**
			 * Extract an item model from a node
			 * @param  {object}  event  Ractive event object
			 * @return {object}         Item model
			 */
			getItemModelFromNode: function ( event ) {
				return this.getItemModel({
					id: event.node.id,
					taxonomy: event.node.getAttribute('data-taxonomy'),
					label: event.node.getAttribute('data-label'),
					value: event.node.value
				});
			},

			/**
			 * Remove an item in the items array according to its index
			 * Also uncheck its associated input
			 * Couldn't find a way to data-bind in this situation
			 *
			 * @param  {int}     index  Index of the item within the array
			 */
			removeItem: function ( index ) {
				// False would indicate that the item could not be found in items array
				if (index !== false) {
					// Get item by keypath. Allows us to find its HTML input element
					var item = this.get('items.' + index);
					var $item = $('#' + item.id);

					// Removing the item from the items array
					this.splice( 'items', index, 1 );

					// Not so graceful, since we couldn't really data-bind the input
					$item.prop('checked', false);
				}
			},

			/**
			 * Receives a list of indexes to remove from `items`
			 *
			 * @param  {array}  indexes  Array of indexes to remove
			 */
			removeItems: function ( indexes ) {
				for (var i = 0, len = indexes.length; i < len; i++) {
					this.removeItem( indexes[i] );
				}
			},

			/**
			 * Add a filter to items according to defined filters
			 *
			 * @param  {string}      taxonomy  Filter taxonomy
			 * @param  {string}      dataSet   Ractive dataset to parse
			 * @param  {int|string}  value     Value found in URL
			 */
			setActiveFilter: function ( taxonomy, dataSet, value ) {
				var dataSet = this.get(dataSet);
				var dataSetFilters = [];

				if (isArray(dataSet)) {
					dataSetFilters = dataSet.slice().map((currentValue) => {
						return currentValue.filters;
					});
					dataSetFilters = [].concat.apply([], dataSetFilters);
				} else {
					dataSetFilters = dataSet.filters;
				}

				// Find filter object in datasets by filtering the values by their ID
				var object = dataSetFilters.filter(function(object){
					if (object.id == value) {
						return object;
					}
				})[0];

				this.addItem(this.getItemModel({
					id: taxonomy + '_' + object.id,
					taxonomy: taxonomy,
					label: object.name,
					value: object.id
				}));
			},

			/**
			 * Allows us to set proxy events and run other tasks when controller is initialized
			 *
			 * @param  {array}  options  Array of options
			 */
			oninit: function ( options ) {

				// Check for existing filters on module init
				var activeType = this.get('activeType');
				var activeCategories = this.get('activeCategories').slice();
				var activeServices = this.get('activeServices').slice();
				var activeCharacteristics = this.get('activeCharacteristics').slice();
				var activeTags = this.get('activeTags');

				if (activeType !== '') {
					this.setActiveFilter('type', 'projectTypes', activeType);
				}

				if (activeCategories.length !== 0) {
					activeCategories.forEach((element) => {
						this.setActiveFilter('categories', 'projectCategories', element);
					});

					// Needs a little timeout
					window.setTimeout(function() {
						activeCategories.forEach((element) => {
							$('#categories_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeServices.length !== 0) {
					activeServices.forEach((element) => {
						this.setActiveFilter('services', 'filterBoxes', element);
					});

					// Needs a little timeout
					window.setTimeout(function() {
						activeServices.forEach((element) => {
							$('#services_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeCharacteristics.length !== 0) {
					activeCharacteristics.forEach((element) => {
						this.setActiveFilter('characteristics', 'filterBoxes', element);
					});

					// Needs a little timeout
					window.setTimeout(function() {
						activeCharacteristics.forEach((element) => {
							$('#characteristics_' + element).prop('checked', true);
						});
					}, 500);
				}

				if (activeTags.length !== 0) {
					this.setActiveFilter('tags', 'projectTags', activeTags[0]);

					// Needs a little timeout
					window.setTimeout(function() {
						$('#tags_' + activeTags.id).prop('checked', true);
					}, 500);
				}

				this.on({
					/**
					 * Determine the amount of projects per projectType
					 *
					 * @param  {array} projects Array of project.
					 * @return void
					 */
					refreshProjectTypeCount: function(projects) {
						var countsByType = [];
						var i = projects.length;

						while (i--) {
							let type = projects[i].type;
							countsByType[type] = (typeof countsByType[type] !== 'undefined' ? countsByType[type] + 1 : 1);
							projects.splice(i);
						}

						var projectTypes = this.get('projectTypes').filters.slice();
						var j = projectTypes.length;

						while (j--) {
							let count = countsByType[projectTypes[j].id];
							this.set('projectTypes.filters.' + j + '.count', (typeof count === 'undefined') ? 0 : count);
							projectTypes.splice(j)
						}
					},

					/**
					 * Event triggered by filter items when clicking close button
					 * We find the item's index using the keypath and remove it from array
					 *
					 * @param  {object}  event  Ractive event object
					 */
					remove: function ( event ) {

						// Check if its a project type.
						// We need to manually unset the activeType variable and removes its related categories
						if (event.context.taxonomy === 'type') {
							this.set('activeType', '');
							this.set('activeCategories', []);
							this.removeItems(this.findTaxonomyIndexes('categories'));
						}
						var i = event.keypath.replace('items.', '');
						this.removeItem(i);

						this.dispatchFilters();
					},

					removeAll() {
						var i = this.get('items').length;

						while (i--) {
							this.removeItem(i);
						}

						this.dispatchFilters();
					},

					/**
					 * Event triggered by a change on filter inputs
					 * Determine if input is being checked or not
					 * Add or remove filter item depending on checked state
					 *
					 * @param  {object}  event  Ractive event object
					 */
					toggleItem: function ( event ) {
						var isChecked = event.node.checked;
						var model = this.getItemModelFromNode( event );

						if (isChecked) {
							this.addItem(model);
						} else {
							this.removeItem( this.findIndex( model.id ) );
						}

						this.dispatchFilters();
					},

					/**
					 * Event triggered when type is changed
					 * Determine which type of categories to show and toggle them all off
					 *
					 * @param  {object}  event  Ractive event object
					 */
					toggleType: function ( event ) {
						var model = this.getItemModelFromNode( event );

						// Remove active type(s) from filters
						this.removeItems( this.findTaxonomyIndexes( model.taxonomy ) );

						// Remove all the related categories too
						this.removeItems( this.findTaxonomyIndexes( 'categories' ) );

						// Now add the toggled one
						this.addItem(model);

						this.dispatchFilters();
					},

					/**
					 * Event triggered when search form is submitted
					 * Extract the keyword and filter the project list
					 *
					 * @param  {object}  event  Ractive event object
					 */
					search: function ( event ) {
						event.original.preventDefault();
						this.dispatchFilters();
					}
				});
			}
		});

		return ractive;
	}

	initProjectsController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$projects,
			template: this.unescapeHTML(this.elements.$projects.html()),
			data: {
				viewType: 'grid',
				displayProjectList: false,
				projects: [],
				pageArray: [],
				page: 1,
				projectsPerPage: 24,
				state: 'inert'
			},
			computed: {
				hasMoreProjects: function () {
					return this.get('page') < this.maxPages();
				},
				projectCount: function () {
					return this.get('projects').length;
				}
			},
			partials: {
				image: '<span class="o-background -parallax-small js-parallax" data-speed="-0.6" style="background-image: url([[ image ]]);"></span>'
			},
			delimiters: ['[[', ']]'],
			tripleDelimiters: ['[[[', ']]]'],
			transitions: { fade },


			maxPages: function() {
				var projectCount = this.get('projectCount');
				var projectsPerPage = this.get('projectsPerPage');
				var remainder = (projectCount % projectsPerPage);
				return (projectCount - remainder) / projectsPerPage + (remainder !== 0 ? 1 : 0);
			},

			updatePageArray: function() {

				// pageArray: function () {
					var projects = this.get('projects');
					var projectsPerPage = this.get('projectsPerPage');
					var pageArray = [];
					var i = 0;
					var len = this.get('page');
					for (; i < len; i++) {
						let min = projectsPerPage * i;
						let max = (projectsPerPage * i) + projectsPerPage;
						let page = projects.slice(min, max);
						pageArray[i] = {
							projects: page,
							projectsLoading: (i === len - 1)
						};
					}
					this.set('pageArray', pageArray)
					// return pageArray;
				// },
			},

			/**
			 * Allows us to set proxy events and run other tasks when controller is initialized
			 */
			oninit : function () {
				// _this.$document.trigger('parallax.update');

				// Proxy event handlers
				this.on({
					loadNextPage: function() {
						this.add('page').then(() => {

							this.updatePageArray();

							$(document).trigger('SmoothScrolling.rebuild');

							var pages = this.get('pageArray').slice();
							this.set('pageArray.' + (pages.length - 1) + '.projectsLoading', false);
						});
					},
					refreshProjects: function (data, options) {
						this.set('state','loading');
						_this.invokeFilteredItems(data, (projects) => {
							this.set('displayProjectList', false).then(() => {
								this.set('page', 1);
								this.set('projects', projects).then(() => {
									this.updatePageArray();

									_this.filtersController.fire('refreshProjectTypeCount', projects.slice());

									if (typeof options.firstBlood === 'undefined') {
										animateTo($('.js-projects')); // @shame
									} else {
										resolveDependency(_this.smoothScrollingDependency);
									}

									_this.elements.$total.text(projects.length)

									this.set('state', 'inert').then(() => {
										this.set('displayProjectList', true).then(() => {

											var pages = this.get('pageArray').slice();

											this.set('pageArray.' + (pages.length - 1) + '.projectsLoading', false).then(() => {
												if (!options.firstBlood) {
													$(document).trigger('SmoothScrolling.rebuild');
												} else {
													setTimeout(function() {
														$(document).trigger('SmoothScrolling.rebuild');
													}, 301);
												}
											});

										});

									});
								});
							});
						});
					}
				});
			}
		});

		return ractive;
	}

	/**
	 * Query server for items and send them to the callback function
	 * @param  {array}     data      Object formed by a keyword and a list of filters to query DB with
	 * @param  {function}  callback  Function to execute after the AJAX request is done
	 */
	invokeFilteredItems (data, callback) {
		var results = [];
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'project/list',
			data: data
		})
		.done(function(response) {
			if (response.success === true) {
				results = response.results;
			}
		})
		.fail(function(){})
		.always(function() {
			callback(results);
		});
	}

	destroy () {
		if (typeof this.scrollbarTags !== 'undefined') {
			this.scrollbarTags.destroy();
			this.scrollbarFilters.destroy();
		}
		this.filtersController.teardown();
		this.projectsController.teardown();
		this.$el.off('.Filters');
	}
}
