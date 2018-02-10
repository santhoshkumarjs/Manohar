(function($) {

    $.mobilemenu = function(options) {

        var settings = $.extend({
            menu: '#mobilemenu',
            trigger: '#mobilemenu button.trigger'
        }, options);

        $(settings.menu).remove();

        $(settings.trigger).click(function() {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(settings.menu).addClass('active');
                return $('body').css('overflow', 'hidden');
            } else {
                $(this).removeClass('active');
                $(settings.menu).removeClass('active');
                return $('body').css('overflow', 'auto');
            }
        });

    };
	/* search */
	var width = $('body').width();
	var height = $('body').height();
	var animationDelay = 500;
	//var offset = 50;

	$(document).on("click", '.search', function(){
		$(this).css({
			'display' : 'none'
		});
		$(this).html('<span class="close"><i class="ti-close"></i></span>');		
		$('.overlay').css({
			"width" : '100%',
			'margin-left' : 0,
			'opacity' : 1,
			'left': 0,
			'right' : 0
		});//end of css
		setTimeout(function(){
			$('.overlay').css({
				'height' : '100%',
				'top' : 60,
				'z-index' : '1111'
			});
			$('.close').show();
			$('#mobilemenu').removeClass('active');
			$('#mobilemenu .trigger').removeClass('active');
			/*$('body').css({
				"overflow" : 'auto',
			});*/
		}, 500);
	});//end of click
	
	$(document).on("click", '.close', function(){
		$(this).css({
			'display' : 'none'
		});
		$('.overlay').css({
			'height': '2px',
			'top' : '50%'
		});
		setTimeout(function(){
			$('.overlay').css({
				'width': '225px',
				'left' : '50%',
				'margin-left' : '-112.5px',
				'opacity' :0
			});
			$('.search').html('<p id="search"><i class="ti-search"></i></p>');
			$('.search').show();
		},500);
	});
	
	$(document).on('click', '.trigger', function() {
		//$('.overlay').hide();
		if($('#mobilemenu').hasClass('active') === true) {
			$('#mobilemenu').addClass('active');
			$('#mobilemenu .trigger').addClass('active');
			
			$('.overlay').css({
				'height': '2px',
				'top' : '50%'
			});
			setTimeout(function(){
				$('.overlay').css({
					'width': '225px',
					'left' : '50%',
					'margin-left' : '-112.5px',
					'opacity' :0
				});
				$('.search').html('<p id="search"><i class="ti-search"></i></p>');
				$('.search').show();
			},500);			
			
		} else {
	
			$('#mobilemenu').removeClass('active');
			$('#mobilemenu .trigger').removeClass('active');
		}

	});
	/* search */

}(jQuery));


$(document).ready(function() {
	/* Carousel */
	$("#news-slider").owlCarousel({
		items : 4,
		itemsDesktop:[1199,3],
		itemsDesktopSmall:[980,2],
		itemsMobile : [600,2],
		navigation:true,
		navigationText:["",""],
		pagination:true,
		autoPlay:true
	});
	/* Carousel */
});
