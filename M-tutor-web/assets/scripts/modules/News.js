/* jshint esnext: true */
import AbstractModule from './AbstractModule'
import tap from 'ractive-events-tap';
import fade from 'ractive-transitions-fade';
import Scrollbar from 'smooth-scrollbar';

export default class extends AbstractModule {
	constructor(options) {
		super(options);

		this.elements = {
			$newsList: this.$el.find('.js-news-list')
		};

		this.newsListController = this.initNewsListController();

		this.$el.on('click.News', '.js-news-toggle', (event) => {
			this.toggleNavNews();
		});

		if (window.matchMedia("(min-width: 1200px)").matches) {
			this.scrollbar = Scrollbar.init(this.$el[0]);
		}
		window.Ractive.DEBUG = false;
	}

	toggleNavNews() {
		this.$body.toggleClass('has-nav-news-open');
	}

	/**
	 * This controller is used for loading more news
	 *
	 * @return  {Ractive Object}  Ractive instance
	 */
	initNewsListController() {
		var _this = this;
		var ractive = new Ractive({
			el: this.elements.$newsList,
			template: this.unescapeHTML(this.elements.$newsList.html()),
			data: {
				news: window.newsOptions.news,
				page: window.newsOptions.page,
				nextPage: window.newsOptions.nextPage,
				state: window.newsOptions.state
			},
			events: { tap },
			transitions: { fade },

			/**
			 * Allows us to set proxy events and run other tasks when controller is initialized
			 *
			 * @param  {array}  options  Array of options
			 */
			oninit : function ( options ) {
				var _ractive = this;
				this.on({

					/**
					 * When load more is clicked, we fetch more news
					 * If nextPage is false, the button will disapear
					 *
					 * @param  {object}  event  Ractive event object
					 */
					 loadMore: function ( event ) {
						var parameters = {
							page: this.get('page')
						};

						this.set('state','loading');

						_this.invokeLoadNews(parameters, function(response) {
							// Give an impression of loading, lel
							window.setTimeout(function(){
								_ractive.set({
									'page': response.page,
									'nextPage': response.nextPage
								});
								_ractive.push.apply(_ractive, [ 'news' ].concat(response.news)).then(function() {
									_ractive.set('state', 'inert');
								});
							}, 500);
						});
					}
				});
			}
		});

		return ractive;
	}

	/**
	 * Query server for news and send them to the callback function
	 * @param  {array}     data      Object formed by a page number
	 * @param  {function}  callback  Function to execute after the AJAX request is done
	 */
	invokeLoadNews (data, callback) {
		// Default response
		var _response = {
			news: [],
			page: data.page,
			nextPage: false
		};
		var jqxhr = $.ajax({
			method: 'GET',
			url: 'news/list',
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

	destroy() {
		this.newsListController.teardown();
		this.$el.off('.News');
	}
}
