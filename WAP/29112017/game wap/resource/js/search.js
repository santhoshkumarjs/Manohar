
 
;(function ( $, window, document, undefined ){
 
    $.navigation = function(element, options){
 
        var defaults = {
            responsive: true,
            mobileBreakpoint: 768,
            showDuration: 300,
            hideDuration: 300,
            showDelayDuration: 0,
            hideDelayDuration: 0,
            submenuTrigger: "click",
            effect: "fade",
            submenuIndicator: true,
            hideSubWhenGoOut: true,
            visibleSubmenusOnMobile: false,
            fixed: false,
            overlay: true,
            overlayColor: "rgba(0, 0, 0, 0.5)",
            hidden: false,
            offCanvasSide: "right",
            onInit: function() {},
            onShowOffCanvas: function() {},
            onHideOffCanvas: function() {}
        };
 
        var plugin = this,
            bigScreenFlag = Number.MAX_VALUE,
            smallScreenFlag = 1,
            clickTouchEvents = "click.nav touchstart.nav",
            hoverShowEvents = "mouseenter.nav",
            hoverHideEvents = "mouseleave.nav";
        plugin.settings = {};
        var $element = $(element), element = element;
        
        if($(element).find(".nav-search").length > 0){
            $(element).find(".nav-search").find("form").prepend("<span class='nav-search-close-button'>GO</span>");
           // $(element).find(".nav-search").find("form").prepend("<span class='nav-search-close-button'><i class='ti-arrow-right'></i></span>");
        }
 
        plugin.init = function(){
            plugin.settings = $.extend({}, defaults, options);
            
            
            $(element).find(".nav-search-button").on("click touchstart", function(e){
                e.stopPropagation(); 
                e.preventDefault();
                plugin.toggleSearch();
            });
            
            $(element).find(".nav-search-close-button").on("click touchstart", function(){
                plugin.toggleSearch();
            }); 
            
        };
       
        
        // show a submenu
        plugin.showSubmenu = function(parentItem, submenuEffect){
            if(windowWidth() > plugin.settings.mobileBreakpoint){
                $(element).find(".nav-search").find("form").slideUp();
            }
        };
        
        
        // show the overlay panel
        var showOverlay = function(){
            $("body").addClass("no-scroll");
            if(plugin.settings.overlay){
                $(element).append("<div class='nav-overlay-panel'></div>");
                $(element).find(".nav-overlay-panel")
                    .css("background-color", plugin.settings.overlayColor)
                    .fadeIn(300)
                    .on("click touchstart", function(e){
                        plugin.hideOffcanvas();
                    });
            }
        };
        
        // hide the overlay panel
        var hideOverlay = function(){
            $("body").removeClass("no-scroll");
            if(plugin.settings.overlay){
                $(element).find(".nav-overlay-panel").fadeOut(400, function(){
                    $(this).remove();
                });
            }
        };
 
        // show/hide the search form
        plugin.toggleSearch = function(){
            if($(element).find(".nav-search").find("form").css("display") == "none"){
                $(element).find(".nav-search").find("form").slideDown();
                $(element).find(".nav-submenu").fadeOut(200);
            }
            else{
                $(element).find(".nav-search").find("form").slideUp();
            }
        };
        
        
        
        plugin.init();
 
    };
 
    $.fn.navigation = function(options){
        return this.each(function(){
            if (undefined === $(this).data('navigation')){
                var plugin = new $.navigation(this, options);
                $(this).data('navigation', plugin);
            }
        });
    };
 
})( jQuery, window, document );