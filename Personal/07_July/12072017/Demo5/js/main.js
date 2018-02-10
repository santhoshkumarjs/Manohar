(function ($) {
    "use strict";
        
        
    // This COde is for body scroll bar
    $('body').css('overflow', 'hidden');
    
    
    // This COde is for main slider
    var main_content_slider_wrapper = $('.main_content_slider_wrapper');
    main_content_slider_wrapper.owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            autoplay: false,
            items: 1,
            nav: false,
            mouseDrag: false,
            autoplayHoverPause: true,
            dots: false
        });
    
    
    // This COde is testimonial slider
    var testimonial_slider_wrapper = $('');
    testimonial_slider_wrapper.owlCarousel({
        loop: true,
        margin: 50,
        mouseDrag: false,
        autoplay: false,
        autoplayTimeout: 3000,
        items: 1,
        nav: false,
        dotsSpeed:1000,
        autoplayHoverPause: true,
        dots: true,
        animateIn: "fadeInDown",
        animateOut: "fadeOutDown",
        responsive : {
            768 : {
                margin: 50
            }
        }
    });
    
    
    
    // This COde is for typed JS
    $(".typed_headings").typed({
        strings: ["A Creative and Professional UX/ UI Designer.", "A Creative and Professional Web Developer."],
        loop: true,
        typeSpeed: 80,
        backSpeed: 0,
        backDelay: 1000,
        startDelay: 20
    });
    
    
    
    // THis Code is for main-menu click function
    var menuClick = $('.menu_bar_icon'),
        menuDots = $('.mainmenu_area'),
        menuDot = $('.mainmenu_area nav.mainmenu ul li'),
        activeMenu = $('.mainmenu_area nav.mainmenu ul li a');
    
    menuClick.on('click',function(){
        menuDots.toggleClass('active');
    });
    menuDot.on('click',function(){
        menuDots.removeClass('active');
        $('svg.menu_cross').removeClass('mou');
        $('svg.menu_bar').removeClass('jak');
    });
    
    $('.menu_bar_icon').on('click',function(){
        $('svg.menu_cross').toggleClass('mou');
    });
    
    $('.menu_bar_icon').on('click',function(){
        $('svg.menu_bar').toggleClass('jak');
    });
    
    activeMenu.on('click', function(){
        menuDot.removeClass('active');
        $(this).parent('li').addClass('active');
    });

    

    // Convert All Image to SVG
    $('img.svg').each(function() {
        var $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');
         
        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
             
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass);
            }
             
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');

    });
    
    
    // This code is for google map
    var myCenter=new google.maps.LatLng(12.992012, 80.2107831);

    function initialize()
    {
    var mapProp = {
        center:myCenter,
        scrollwheel: false,
        zoom:15,
        styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#343434"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
            },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": " on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#edf0f5"
            },
                        {
                            "visibility": "on"
                        }
                    ]
                }],
      mapTypeId:google.maps.MapTypeId.ROADMAP
      };

    var map=new google.maps.Map(document.getElementById("my_location"),mapProp);

    var marker=new google.maps.Marker({
        position:myCenter,
        icon:'img/map_maker.png'
    });

    marker.setMap(map);
    }
    
    if($('#my_location').length){
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    
    
    // This Code is for Preloader
    $('.preloader').fadeOut('slow');
    $('.preloader-box').fadeOut('slow');
    
    
    // This COde is for content center
    function v_center (){
        var main_scroll_area_height = $('.scroll_area').height(),
            scroll_area = $('.scroll_area .common_scroll_content'),
            content_height = scroll_area.height();

        if(main_scroll_area_height > content_height ){
            scroll_area.parent('div').addClass('v_center');
        } else {
            scroll_area.parent('div').removeClass('v_center');
        }
    }
    v_center();

    
    // This Code is for progressbar
    var custom_progress_bar = $('.custom_progress_bar');
    
    function RXprogress_bar(selector){
        selector.each(function(){
            var $this = $(this),
                $thisValue = $this.attr('aria-valuenow');
            $this.css({
                'width': $thisValue + '%',
                'transition': 'all .6s linear'
            });
        });
    }
    
    function stopOwlPropagation(element) {
        $(element).on('translated.owl.carousel', function(e) { e.stopPropagation()});
        $(element).on('translate.owl.carousel', function(e) { e.stopPropagation()});
    }
    stopOwlPropagation(testimonial_slider_wrapper);
    
    main_content_slider_wrapper.on('translate.owl.carousel', function(){
        custom_progress_bar.css({
            'width': '0%',
            'transition': 'all 0s linear'
        });
    });
    main_content_slider_wrapper.on('translated.owl.carousel', function(){
        RXprogress_bar(custom_progress_bar);
    });
    
    
    
    // This Code is for color switcher
    var colorTrigger = $('.color_theme ul li'),
        colorBox = $('.color_palate_wrapper'), 
        body = $('body');
    colorTrigger.on('click', function(){
        var CCcolor = $(this).data('color'),
            colorList = colorTrigger.map(function() {
                return $(this).data('color');
            }).get();
        colorList = colorList.join(' ');
        body.removeClass( colorList ).addClass( CCcolor );
        colorTrigger.removeClass('active');
        $(this).addClass('active');
    });
    $('.color_palate_icon').on('click', function(){
        colorBox.toggleClass('open');
    });
    
    
    // This code is for button effect
    $('.button_one').on('click',function(){
        $('.button_click > a, .button_click > button').removeClass('btn_bounce btn_swip btn_shutter');
        $('.button_click > a, .button_click > button').addClass('btn_bounce');
    });
    $('.button_two').on('click',function(){
        $('.button_click > a, .button_click > button').removeClass('btn_bounce btn_swip btn_shutter');
        $('.button_click > a, .button_click > button').addClass('btn_swip');
    });
    $('.button_three').on('click',function(){
        $('.button_click > a, .button_click > button').removeClass('btn_bounce btn_swip btn_shutter');
        $('.button_click > a, .button_click > button').addClass('btn_shutter');
    });
    
    
    //For Centering isoTop Grid
    function isotop_grid_center(){
        var gallery_items = jQuery('.gallery_items'),
            gallery_items_W = gallery_items.width(),
            grid_item_W = jQuery('.gallery_items > .grid-item').outerWidth(),
            rest_W = gallery_items_W % grid_item_W;
        gallery_items.width(gallery_items_W - rest_W).css('display', 'inline-block');
    }
    
    $(window).on('resize', function(){
        v_center();
        isotop_grid_center();
    });
    
    $(window).on('load', function(){
        
    // This code is for scroll

    $('body').css('overflow', 'initial');
    var wWIdth = $(window).width();
    if(wWIdth > 767){
        $('.scroll_area').perfectScrollbar({
            suppressScrollX: true
        });
    };
        
        
    //this code is for Isotop mesonary

    var $portfolio = $('.gallery_items');
    $portfolio.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'packery',
        filter: '*'
    });
        
        $('.filter-menu li').on('click', function(){
            $('.filter-menu li').removeClass('current_menu_item');
            $(this).addClass('current_menu_item');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({
                filter: selector
            });
        }); // Isotop mesonary end
        
        isotop_grid_center();

    });
    
})(jQuery);