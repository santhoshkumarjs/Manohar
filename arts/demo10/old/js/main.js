(function ($) {
	// image replace start
	$("#thums li a").click(function () {
		var actual_img = $(this).attr('actual-img');
        $('#switcher').attr('src', actual_img);
    });	
	// image replace end

	//caption hover start
	$(function () {
        $('.mm_tooltip').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        })
    });
	
	// Prepare the preview for profile picture
			$("#wizard-picture").change(function(){
					readURL(this);
			});
			function readURL(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
					}
					reader.readAsDataURL(input.files[0]);
				}
			}
	
	/* Add to favourite */
		$(function(){
			$(".add_fav, .ci-edit, .like_add a").tooltip();
			var n_place = $('.like-tooltip');
			$('.add_fav, .ci-edit, .like_add').on('click', '.fa-heart', function() {
			    var wishlist = $(this).attr('wishlist');
				if(typeof(wishlist) === 'undefined'){
					$(this).css('color','red');
					$(this).attr('wishlist','added');
					var n = parseInt(n_place.text(), 10);
					n_place.empty().append(n + 1);
				}else{
				  
				}
			});
		});
		/* Add to favourite End*/
			// FOR TRASH 
			$('.trash').on('click', function(c){
				$(this).closest(".trash-header").fadeOut('slow', function(c){
					$(this).closest(".trash-header").remove();
				});
			});	  
			
			// FOR CLOSE
			$('.remove').on('click', function(c){
				$(this).closest(".cart-header").fadeOut('slow', function(c){
					$(this).closest('.cart-header').remove();
				});
			});
			
			$('.thumbnail').hover(
				function(){
					$(this).find('.caption').slideDown(300); //.fadeIn(250)
					$(this).find('.buynow').css("display","block"); //.fadeIn(250)
				},
				function(){
					$(this).find('.caption').slideUp(200); //.fadeOut(205)
					$(this).find('.buynow').css("display","none"); //.fadeIn(250)
				}
			); 
	//caption hover End
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
	
	// local scroll
	jQuery('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});
	
	// portfolio
    if($('.isotopeWrapper').length){

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }


            
        });

        $('#filter a').click(function(){
            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        $(window).smartresize(function(){
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
        

}  


	// fancybox
	jQuery(".fancybox").fancybox();


	if (Modernizr.mq("screen and (max-width:1024px)")) {
			jQuery("body").toggleClass("body");
			
	} else {
		var s = skrollr.init({
			mobileDeceleration: 1,
			edgeStrategy: 'set',
			forceHeight: true,
			smoothScrolling: true,
			smoothScrollingDuration: 300,
				easing: {
					WTF: Math.random,
					inverted: function(p) {
						return 1-p;
					}
				}
			});	
	}
	//scroll menu
	jQuery('.appear').appear();
	jQuery(".appear").on("appear", function(data) {
			var id = $(this).attr("id");
			jQuery('.nav li').removeClass('active');
			jQuery(".nav a[href='#" + id + "']").parent().addClass("active");					
		});


		//parallax
        var isMobile = false;

        if(Modernizr.mq('only all and (max-width: 1024px)') ) {
            isMobile = true;
        }

        
        if (isMobile == false && ($('#parallax1').length  ||isMobile == false &&  $('#parallax2').length ||isMobile == false &&  $('#testimonials').length))
        {


            $(window).stellar({
                responsive:true,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalScrolling: false,
                horizontalOffset: 0,
                verticalOffset: 0
            });

        }
	
	//nicescroll
	$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#191919",cursoropacitymin:.5});
	function initNice() {
		if($(window).innerWidth() <= 960) {
			$('html').niceScroll().remove();
		} else {
			$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#191919",cursoropacitymin:.5});
		}
	}
	$(window).load(initNice);
	$(window).resize(initNice);

})(jQuery);