jQuery(function($){
	'use strict';

	$('[data-gallery]').each(function(){
		var _this = $(this);
		var gallery = $('#' + $(this).attr('data-gallery'));
		var images = $(this).find('.gallery-image');
		var slider, currentItem = 0;
		var opened = false;

		_this.find('[data-gallery-item]').on('click', function(){
			var _this = $(this);
			var image = $(this).find('img.gimg').eq(0);

			slider = $(document.createElement('div')).addClass('slider');
			gallery.append(slider);
			currentItem = 0;

			// Open gallery

			var cloneImg = image.clone().css({
				'height': image.outerHeight()+'px',
				'top': image.offset().top - $(window).scrollTop(),
				'left': image.offset().left,
			}).addClass('gallery-tmpimage');

			$(document.body).append(cloneImg);
			opened = true;
			gallery.addClass('open');


			// Generated slider

			images.each(function(){
				var div = $(document.createElement('div'));
				div.append($(this).find('img.gimg').eq(0).clone());
				if($(this).find('.gallery-description').length){
					div.append($(this).find('.gallery-description').clone());
					div.addClass('with-description');
				}
				slider.append(div);
			});

			slider.owlCarousel({
				items: 		1,
				autoHeight: true,
				slideBy: 	1,
				nav: 		true,
				navText: 	[ '<span class="ion-ios-arrow-left"></span>', '<span class="ion-ios-arrow-right"></span>' ],
				dots: 		false,
				loop: 		false,
				autoplay: 	false,
				navSpeed: 	600,
			}).on('changed.owl.carousel', function(event) {
				currentItem = event.item.index;
				slider.find('.thumbs img').removeClass('active');
				slider.find('.thumbs img').eq(currentItem).addClass('active');
			});

			slider.trigger('to.owl.carousel', [parseInt($(this).attr('data-gallery-item')), 50, true]);

			// Generate thumbnails
			slider.find('.owl-prev').after('<div class="thumbs"></div>');
			var thumbnails = slider.find('.thumbs');

			images.each(function(index){
				thumbnails.append($(this).find('img.gimg').eq(0).clone().on('click', function(){
					$(this).parent().find('img').removeClass('active');
					$(this).addClass('active');
					slider.trigger('to.owl.carousel', [index, 300, true]);
				}));
			});

			slider.find('.thumbs img').eq(parseInt($(this).attr('data-gallery-item'))).addClass('active');

			setTimeout(function(){
				var sliderImg = slider.find('img.gimg').eq(parseInt(_this.attr('data-gallery-item')));
				cloneImg.css({
					'height': sliderImg.height() + 'px',
					'top': (sliderImg.offset().top - gallery.offset().top) + 'px',
					'left': '',
					'margin-left': '-' + (sliderImg.outerWidth() / 2) + 'px'
				}).addClass('active');

				setTimeout(function(){
					slider.css('visibility', 'visible');
					setTimeout(function(){
						cloneImg.remove();
					}, 50);
				}, 350);
			}, 50);
		});

		var close = function(){
			if(opened){
				opened = false;
				gallery.removeClass('open');

				var oldImage = gallery.find('img.gimg').eq(currentItem);
				var img = oldImage.clone().addClass('gallery-tmpimage active').css({
					'margin-left': '-' + oldImage.width()/2 + 'px',
					'height': oldImage.height() + 'px',
					'top': (oldImage.offset().top - gallery.offset().top) + 'px'
				});

				$(document.body).append(img);

				setTimeout(function(){
					var newImage = _this.find('img.gimg').eq(currentItem);
					img.css({
						'left': newImage.offset().left + 'px',
						'margin-left': '',
						'height': newImage.height() + 'px',
						'top': newImage.offset().top - $(window).scrollTop() + 'px',
					});
				}, 50);

				setTimeout(function(){
					slider.remove();
					img.remove();
				}, 350);
			}
		};

		gallery.find('.close').on('click', close);
		$(window).on('keydown', function(e){
			var key = e.which || e.keyCode || e.keyChar;
			if(key == 27){
				close();
			}
		});
	});
});