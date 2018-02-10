jQuery(function($){
	'use strict';

	$('[data-portfolio-popup]').each(function(){
		var gallery = $('#' + $(this).attr('data-portfolio-popup'));
		var slider = gallery.find('.slider');
		var images = gallery.find('.slider img');

		images.each(function(){
			var div = $(document.createElement('div')).css('background-image', 'url(' + $(this).attr('src') + ')');
			slider.append(div);
			$(this).remove();
		});

		slider.owlCarousel({
			items: 1,
			nav: (images.length == 1) ? false : true,
			navRewind: true,
			navText: [ '<span class="ion-ios-arrow-left"></span>', '<span class="ion-ios-arrow-right"></span>' ],
			navSpeed: 350,
			dotsSpeed: 500,
			dots: (images.length == 1) ? false : true,
			loop: false,
			autoHeight: false,
			mouseDrag: (images.length == 1) ? false : true
		});

		var close = function(){
			gallery.removeClass('open');
		};

		gallery.find('.gallery-close').on('click', close);
		$(window).on('keydown', function(e){
			var key = e.which || e.keyChar || e.keyCode;
			if( key == 27 ){
				close();
			}
		});
	});

	$('body').on('click', '[data-portfolio-popup]', function(e){
		e.preventDefault();
		$('#' + $(this).attr('data-portfolio-popup')).addClass('open');
		return false;
	});
});