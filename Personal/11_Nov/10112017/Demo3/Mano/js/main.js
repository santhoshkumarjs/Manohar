function getCurrentSection() {
    var a = null;
    return $("section").each(function(b, c) {
        var d = $(this),
            e = d.offset().top - $win.height() / 2,
            f = e + d.outerHeight();
        return e < $win.scrollTop() && $win.scrollTop() < f ? (a = c, !1) : void 0
    }), a
}

function openPortfolioModal() {
    setTimeout(function() {
        $portfolioModal.addClass("opened"), $portfolioOverlay.addClass("loaded")
    }, 300)
}

function onScrollHandler() {
    var a = $win.scrollTop();
    $procesLines.css("stroke-dashoffset", a / 5), a - previousWinScrollTop > 0 && $(".animation-chain").each(function(b, c) {
        var d = $(c);
        if (a > d.offset().top - winHeight / 4 * 3) {
            var e = d.data("animation");
            (void 0 === e || "" === e) && (e = "fadeInUp"), d.animateCssChain(e)
        }
    }), previousWinScrollTop = a, window.requestAnimationFrame(onScrollHandler)
}
$(".img-as-bg").each(function(a, b) {
    var c = $(b);
    c.parent().css("background-image", 'url("' + c.attr("src") + '")'), c.remove()
});
var $nav = $("nav"),
    $menu = $("nav ul.menu"),
    $menuItems = $menu.find("li"),
    $openMenu = $(".open-menu"),
    openMenuLock = !1;
$menu.find("li").each(function(a, b) {
    $(this).css("transition-delay", .05 * a + "s")
}), $menuItems.find("a").on("click", function(a) {
    var b = $(this).attr("href");
    if (0 === b.indexOf("#")) {
        a.preventDefault();
        var c = $(b);
        $("html, body").animate({
            scrollTop: c.offset().top
        }, 300)
    }
}), $openMenu.on("click", function() {
    if (!openMenuLock)
        if (openMenuLock = !0, $nav.hasClass("opened")) $menu.removeClass("show-menu-items"), setTimeout(function() {
            $nav.removeClass("opened"), openMenuLock = !1, $menuItems.find("a").removeClass("current")
        }, 300);
        else {
            var a = $(getCurrentSection()).attr("id");
            $menuItems.each(function(b, c) {
                var d = $(this),
                    e = d.find("a"),
                    f = e.attr("href");
                f === "#" + a && e.addClass("current")
            }), $nav.addClass("opened"), setTimeout(function() {
                $menu.addClass("show-menu-items"), openMenuLock = !1
            }, 300)
        }
}), $menu.find("a").on("click", function(a) {
    $openMenu.click()
}), $nav.on("click", function(a) {
    var b = $(a.target).parent().get(0).tagName;
    "LI" !== b && "NAV" !== b && $openMenu.click()
});
var $titles = $(".titles"),
    $heroSlides = $(".hero-slides");
$titles.textillate({
    selector: ".texts",
    loop: $(".titles li").length > 1,
    minDisplayTime: 5e3,
    initialDelay: 1e3,
    autoStart: !0,
    inEffects: [],
    outEffects: [],
    "in": {
        effect: "fadeInUp",
        delayScale: 1.5,
        delay: 50,
        sync: !0,
        reverse: !1,
        callback: function() {}
    },
    out: {
        effect: "fadeOutUp",
        delayScale: 1.5,
        delay: 50,
        sync: !0,
        shuffle: !1,
        reverse: !1,
        callback: function() {}
    },
    callback: function() {},
    type: "word"
}), $titles.on("outAnimationBegin.tlt", function(a) {
    $heroSlides.trigger("next.owl.carousel")
}), $heroSlides.owlCarousel({
    loop: !0,
    margin: 0,
    nav: !1,
    items: 1,
    dots: !1,
    smartSpeed: 1800,
    mouseDrag: !1,
    touchDrag: !1
}), $titles.on("start.tlt", function() {
    $(".down-arrow").addClass("play")
}), $(".scroll-down-indicator").on("click", function(a) {
    $("html, body").animate({
        scrollTop: $win.height()
    }, 800)
});
var $grid = $(".grid");
$grid.imagesLoaded(function() {
    $grid.isotope({
        itemSelector: ".grid-item",
        layoutMode: "masonry"
    })
});
var $portfolioCats = $(".portfolio-cats a");
$portfolioCats.on("click", function(a) {
    a.preventDefault();
    var b = $(this).data("cat");
    "*" !== b && (b = "." + b), $grid.isotope({
        filter: b
    })
});
var $portfolioItems = $("#portfolio .grid-item"),
    $portfolioModal = $(".portfolio-modal"),
    $portfolioModalNavPrev = $(".portfolio-modal .modal-nav-prev"),
    $portfolioModalNavNext = $(".portfolio-modal .modal-nav-next"),
    $portfolioModalNavClose = $(".portfolio-modal .modal-nav-close"),
    $portfolioOverlay = $(".portfolio-overlay"),
    $portfolioOpenModal = $(".portfolio-open-modal");
$portfolioModalNavPrev.on("click", function(a) {
    a.preventDefault(), $portfolioItems.filter(".current").prev().trigger("click")
}), $portfolioModalNavNext.on("click", function(a) {
    a.preventDefault(), $portfolioItems.filter(".current").next().trigger("click")
}), $portfolioModalNavClose.on("click", function(a) {
    a.preventDefault(), $portfolioOverlay.trigger("click")
}), $portfolioOpenModal.on("click", function(a) {
    a.preventDefault(), $(this).parents(".grid-item").trigger("click")
}), $portfolioItems.on("click", function(a) {
    if ("img" === a.target.tagName.toLowerCase() || $(a.target).hasClass("grid-item")) {
        var b = $(this),
            c = b.find(".portfolio-info"),
            d = $portfolioModal.find(".left"),
            e = $portfolioModal.find(".right"),
            f = b.find("ul.image-list"),
            g = b.find("ul.video");
        if (b.addClass("current").siblings().removeClass("current"), $portfolioModalNavPrev.parent().toggleClass("enabled", b.prev().length > 0), $portfolioModalNavNext.parent().toggleClass("enabled", b.next().length > 0), d.empty().append(c.clone()), e.empty(), f.length > 0) {
            var h = $("<div />").addClass("owl-carousel owl-theme");
            f.find("img").each(function(a, b) {
                var c = $(b).clone();
                c.attr("src", c.data("src")), c.hasClass("img-vertical") && c.css("max-height", $win.innerHeight() - 240), $("<div />").addClass("item").append(c).appendTo(h)
            }), e.append(h), h.imagesLoaded(function() {
                h.owlCarousel({
                    loop: !0,
                    margin: 0,
                    nav: !1,
                    items: 1,
                    autoHeight: !0,
                    dots: !0
                }), openPortfolioModal()
            })
        }
        if (g.length > 0) {
            var i = g.find("iframe"),
                j = i.data("src"),
                k = $("<div />").addClass("wide-screen");
            if (-1 !== j.indexOf("youtube")) {
                var l = j.split("?"),
                    m = null;
                if (l.length > 0) {
                    m = l[0], srcPure = m.split("/"), srcPure = srcPure.pop();
                    var n = $("<a />").attr({
                        href: "#"
                    }).append($("<img/>").attr({
                        src: "http://i.ytimg.com/vi/" + srcPure + "/maxresdefault.jpg"
                    }));
                    k.append(n), k.imagesLoaded(function() {
                        e.append(k), openPortfolioModal()
                    }), n.on("click", function(a) {
                        a.preventDefault(), j += "&autoplay=1", k.empty().append(i.clone().attr({
                            src: j
                        }))
                    })
                }
            } else k.append(i.clone().attr({
                src: j
            }).on("load", function() {
                openPortfolioModal()
            })), e.append(k)
        }
        $portfolioOverlay.css("display", "flex"), setTimeout(function() {
            $portfolioOverlay.addClass("opened")
        }, 100)
    }
}), $portfolioOverlay.on("click", function(a) {
    $(a.target).hasClass("portfolio-overlay") && ($portfolioModal.find(".right").empty(), $portfolioModal.removeClass("opened"), setTimeout(function() {
        $portfolioOverlay.removeClass("opened"), setTimeout(function() {
            $portfolioOverlay.hide(), $portfolioOverlay.removeClass("loaded")
        }, 300)
    }, 300))
}), $("#testimonials>.owl-carousel").owlCarousel({
    loop: !0,
    margin: 0,
    nav: !1,
    items: 1,
    autoHeight: !0,
    dots: !0,
    autoplay: !0,
    autoplayTimeout: 8e3,
    autoplayHoverPause: !0,
    smartSpeed: 600
});
var $procesLines = $("svg.process-line>path"),
    $win = $(window),
    winHeight = $win.height(),
    previousWinScrollTop = 0;
window.requestAnimationFrame(onScrollHandler), $.fn.extend({
    animateCss: function(a) {
        var b = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        $(this).addClass("animated " + a).one(b, function() {
            $(this).removeClass(a)
        })
    },
    animateCssChain: function(a, b) {
        (void 0 === b || null === b || "" === b) && (b = .1), $(this).children().each(function(c, d) {
            var e = $(d);
            return e.hasClass("animated") ? !0 : void e.css({
                "-webkit-animation-delay": b * c + "s",
                "animation-delay": b * c + "s"
            }).animateCss(a)
        })
    }
});


