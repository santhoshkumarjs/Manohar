function init_infoBox() {
    BB.gmap.infobox.prototype = new google.maps.OverlayView, BB.gmap.infobox.prototype.remove = function() {
        if (this._div) {
            try {
                this._div.parentNode.removeChild(this._div)
            } catch (a) {}
            this._div = null
        }
    }, BB.gmap.infobox.prototype.set_map = function(a) {
        this.__MAP = a, this.setMap(this.__MAP)
    }, BB.gmap.infobox.prototype.map = function() {
        return this.__MAP
    }, BB.gmap.infobox.prototype.draw = function() {
        this.createElement();
        var a = this.getProjection().fromLatLngToDivPixel(this.opts.position);
        a && (this._div.style.width = this._width + "px", this._div.style.left = a.x + this._offsetX + "px", this._div.style.height = this._height + "px", this._div.style.top = a.y + this._offsetY + "px", this._div.style.display = "block", this._div.style.zIndex = 1)
    }, BB.gmap.infobox.prototype.createElement = function() {
        var a = this.getPanes(),
            b = this._div;
        if (b) {
            if (b.parentNode != a.floatPane) {
                try {
                    b.parentNode.removeChild(b)
                } catch (a) {}
                a.floatPane.appendChild(b)
            }
        } else {
            b = this._div = document.createElement("div"), b.style.border = "0", b.style.position = "absolute", b.style.width = this._width + "px", b.style.height = this._height + "px";
            var c = "gmap_infobox";
            b.setAttribute("class", c), contentDiv = document.createElement("div"), $(contentDiv).html(this.__ELEM.innerHTML), b.appendChild(contentDiv), contentDiv.style.display = "block", b.style.display = "none", a.floatPane.appendChild(b), this.panMap()
        }
    }, BB.gmap.infobox.prototype.panMap = function() {
        var a = this.map,
            b = a.getBounds();
        if (b) {
            var c = this.opts.position,
                d = this._width,
                e = this._height,
                f = this._offsetX,
                g = this._offsetY,
                h = 0,
                i = 0,
                j = a.getDiv(),
                k = j.offsetWidth,
                l = j.offsetHeight,
                m = b.toSpan(),
                n = m.lng(),
                o = m.lat(),
                p = n / k,
                q = o / l,
                r = b.getSouthWest().lng(),
                s = b.getNorthEast().lng(),
                t = b.getNorthEast().lat(),
                u = b.getSouthWest().lat(),
                v = c.lng() + (f - h) * p,
                w = c.lng() + (f + d + h) * p,
                x = c.lat() - (g - i) * q,
                y = c.lat() - (g + e + i) * q,
                z = (v < r ? r - v : 0) + (w > s ? s - w : 0),
                A = (x > t ? t - x : 0) + (y < u ? u - y : 0),
                B = a.getCenter();
            if (!B || "undefined" == typeof B) return !1;
            B.lng() - z, B.lat() - A;
            null !== this._bounds_changed_listener && google.maps.event.removeListener(this._bounds_changed_listener), this._bounds_changed_listener = null
        }
    }
}! function(a) {
    var b = !!a.navigator.msPointerEnabled,
        c = !!a.navigator.pointerEnabled;
    if (b || c && !("ontouchstart" in a)) {
        var d, e = a.document,
            f = c ? "pointerdown" : "MSPointerDown",
            g = c ? "pointerup" : "MSPointerUp",
            h = c ? "pointermove" : "MSPointerMove",
            i = c ? "touch" : MSPointerEvent.MSPOINTER_TYPE_TOUCH,
            j = c ? "mouse" : MSPointerEvent.MSPOINTER_TYPE_MOUSE,
            k = (c ? "pen" : MSPointerEvent.MSPOINTER_TYPE_PEN, "MSGestureStart"),
            l = "MSGestureChange",
            m = "MSGestureEnd",
            n = c ? "touchAction" : "msTouchAction",
            o = 180 / Math.PI,
            p = a.Touchr_ALLOWED_POINTER_TYPE || 1,
            q = function(a, b, c) {
                var d, f = e.createEvent("Event");
                f.initEvent(a, !0, !0);
                for (d in c) f[d] = c[d];
                b.dispatchEvent(f)
            },
            r = function() {
                function a(a) {
                    return a >>> 0
                }

                function b(b) {
                    var e, f, g = -1;
                    for (f in b) e = String(a(f)) === f && a(f) !== c && d.call(b, f), e && f > g && (g = f);
                    return g
                }
                var c = Math.pow(2, 32) - 1,
                    d = Object.prototype.hasOwnProperty;
                return function(c) {
                    var d = 0;
                    return c = c || {}, c.length = {
                        get: function() {
                            var a = +b(this);
                            return Math.max(d, a + 1)
                        },
                        set: function(b) {
                            var c = a(b);
                            if (c !== +b) throw new RangeError;
                            for (var e = c, f = this.length; e < f; e++) delete this[e];
                            d = c
                        }
                    }, c.toString = {
                        value: Array.prototype.join
                    }, Object.create(Array.prototype, c)
                }
            }(),
            s = {
                identifiedTouch: {
                    value: function(a) {
                        for (var b = this.length; b--;)
                            if (this[b].identifier === a) return this[b]
                    }
                },
                item: {
                    value: function(a) {
                        return this[a]
                    }
                },
                _touchIndex: {
                    value: function(a) {
                        for (var b = this.length; b--;)
                            if (this[b].pointerId == a.pointerId) return b;
                        return -1
                    }
                },
                _addAll: {
                    value: function(a) {
                        for (var b = 0, c = a.length; b < c; b++) this._add(a[b])
                    }
                },
                _add: {
                    value: function(a) {
                        var b = this._touchIndex(a);
                        b = b < 0 ? this.length : b, a.type = h, a.identifier = a.pointerId, a.force = a.pressure, a.radiusX = a.radiusY = 1, a.rotationAngle = 0, this[b] = a
                    }
                },
                _remove: {
                    value: function(a) {
                        var b = this._touchIndex(a);
                        b >= 0 && this.splice(b, 1)
                    }
                }
            },
            t = function(a) {
                return function() {
                    var b = r(a);
                    return 1 === arguments.length ? b.length = arguments[0] : b.push.apply(b, arguments), b
                }
            }(s),
            u = {},
            v = a.MSGesture ? new MSGesture : null,
            w = 1,
            x = 0,
            y = [],
            z = function(a, b) {
                return !!b && (a === b || z(a, b.parentNode))
            },
            A = function(a) {
                return a == i ? 1 : a == j ? 2 : 4
            },
            B = function(a) {
                var b, c, j, k, l, m = a.target;
                if (A(a.pointerType) & p) {
                    if (a.type === f && (d._add(a), u[a.pointerId] = a.target, b = "touchstart", d.length > 1))
                        for (v.target = a.target, c = 0; c < d.length; c++) d[c].pointerType === i && v.addPointer(d[c].pointerId);
                    for (a.type === h && d.identifiedTouch(a.pointerId) && (d._add(a), b = "touchmove"), k = e.createTouchList(a), l = e.createTouchList(), c = 0; c < d.length; c++) z(m, u[d[c].identifier]) && l._add(d[c]);
                    j = u[a.pointerId], a.type === g && (d._remove(a), u[a.pointerId] = null, delete u[a.pointerId], b = "touchend", d.length <= 1 && v.stop()), b && j && q(b, j, {
                        touches: d,
                        changedTouches: k,
                        targetTouches: l
                    })
                }
            },
            C = function(a) {
                var b, c, d;
                a.type === k ? b = "gesturestart" : a.type === l ? b = "gesturechange" : a.type === m && (b = "gestureend"), a.type === k ? (c = w = 1, d = x = 0) : (c = w += a.scale - 1, d = x += a.rotation * o), q(b, a.target, {
                    scale: c,
                    rotation: d,
                    screenX: a.screenX,
                    screenY: a.screenY
                })
            },
            D = function(a) {
                var b = E,
                    c = F,
                    d = a.prototype.addEventListener,
                    e = a.prototype.removeEventListener;
                a.prototype.addEventListener = function(a, c, e) {
                    0 !== a.indexOf("gesture") && 0 !== a.indexOf("touch") || b.call(this, a, c, e), d.call(this, a, c, e)
                }, a.prototype.removeEventListener = function(a, b, d) {
                    0 !== a.indexOf("gesture") && 0 !== a.indexOf("touch") || c.call(this, a, b, d), e.call(this, a, b, d)
                }
            },
            E = function(a, b, c) {
                var d = 9 == this.nodeType ? this : this.ownerDocument;
                y.indexOf(d) < 0 && (y.push(d), d.addEventListener(f, B, c), d.addEventListener(h, B, c), d.addEventListener(g, B, c), d.addEventListener(k, C, c), d.addEventListener(l, C, c), d.addEventListener(m, C, c)), !this.style || "undefined" != typeof this.style[n] && this.style[n] || (this.style[n] = "none")
            },
            F = function(a, b, c) {};
        e.createTouchList = function(a) {
            var b = new t;
            return a && (a.length ? b._addAll(a) : b._add(a)), b
        }, e.createTouch = function(a, b, c, d, e, f, g) {
            return {
                identifier: c,
                screenX: f,
                screenY: g,
                pageX: d,
                pageY: e,
                target: b
            }
        }, a.ontouchstart || (a.ontouchstart = 1), d = e.createTouchList(), D(HTMLElement), D(Document)
    }
}(window), ! function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return a.svg4everybody = b()
    }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b()
}(this, function() {
    function a(a, b) {
        if (b) {
            var c = document.createDocumentFragment(),
                d = !a.getAttribute("viewBox") && b.getAttribute("viewBox");
            d && a.setAttribute("viewBox", d);
            for (var e = b.cloneNode(!0); e.childNodes.length;) c.appendChild(e.firstChild);
            a.appendChild(c)
        }
    }

    function b(b) {
        b.onreadystatechange = function() {
            if (4 === b.readyState) {
                var c = b._cachedDocument;
                c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function(d) {
                    var e = b._cachedTarget[d.id];
                    e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.svg, e)
                })
            }
        }, b.onreadystatechange()
    }

    function c(c) {
        function d() {
            for (var c = 0; c < l.length;) {
                var g = l[c],
                    h = g.parentNode;
                if (h && /svg/i.test(h.nodeName)) {
                    var i = g.getAttribute("xlink:href");
                    if (e && (!f.validate || f.validate(i, h, g))) {
                        h.removeChild(g);
                        var m = i.split("#"),
                            n = m.shift(),
                            o = m.join("#");
                        if (n.length) {
                            var p = j[n];
                            p || (p = j[n] = new XMLHttpRequest, p.open("GET", n), p.send(), p._embeds = []), p._embeds.push({
                                svg: h,
                                id: o
                            }), b(p)
                        } else a(h, document.getElementById(o))
                    }
                } else ++c
            }
            k(d, 67)
        }
        var e, f = Object(c),
            g = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
            h = /\bAppleWebKit\/(\d+)\b/,
            i = /\bEdge\/12\.(\d+)\b/;
        e = "polyfill" in f ? f.polyfill : g.test(navigator.userAgent) || (navigator.userAgent.match(i) || [])[1] < 10547 || (navigator.userAgent.match(h) || [])[1] < 537;
        var j = {},
            k = window.requestAnimationFrame || setTimeout,
            l = document.getElementsByTagName("use");
        e && d()
    }
    return c
}),
function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : function() {
        var c = a.Ractive,
            d = b();
        return d.noConflict = function() {
            return a.Ractive = c, d
        }, a.Ractive = d
    }()
}(this, function() {
    "use strict";

    function a() {
        return Uf.createDocumentFragment()
    }

    function b(a) {
        var b;
        if (a && "boolean" != typeof a) return Tf && Uf && a ? a.nodeType ? a : "string" == typeof a && (b = Uf.getElementById(a), !b && Uf.querySelector && (b = Uf.querySelector(a)), b && b.nodeType) ? b : a[0] && a[0].nodeType ? a[0] : null : null
    }

    function c(a) {
        return a && "unknown" != typeof a.parentNode && a.parentNode && a.parentNode.removeChild(a), a
    }

    function d(a) {
        return null != a && a.toString ? "" + a : ""
    }

    function e(a) {
        return d(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function f(a) {
        return a.replace(qg, function(a) {
            return a.charAt(1).toUpperCase()
        })
    }

    function g(a) {
        return a.replace(rg, function(a) {
            return "-" + a.toLowerCase()
        })
    }

    function h(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        var d;
        return b.forEach(function(b) {
            for (d in b) vg.call(b, d) && (a[d] = b[d])
        }), a
    }

    function i(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return b.forEach(function(b) {
            for (var c in b) !vg.call(b, c) || c in a || (a[c] = b[c])
        }), a
    }

    function j(a) {
        return "[object Array]" === wg.call(a)
    }

    function k(a, b) {
        return null === a && null === b || "object" != typeof a && "object" != typeof b && a === b
    }

    function l(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function m(a) {
        return a && "[object Object]" === wg.call(a)
    }

    function n(a, b) {
        return a.replace(/%s/g, function() {
            return b.shift()
        })
    }

    function o(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        throw a = n(a, b), new Error(a)
    }

    function p() {
        Of.DEBUG && sg.apply(null, arguments)
    }

    function q(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        a = n(a, b), tg(a, b)
    }

    function r(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        a = n(a, b), yg[a] || (yg[a] = !0, tg(a, b))
    }

    function s() {
        Of.DEBUG && q.apply(null, arguments)
    }

    function t() {
        Of.DEBUG && r.apply(null, arguments)
    }

    function u(a, b, c) {
        var d = v(a, b, c);
        return d ? d[a][c] : null
    }

    function v(a, b, c) {
        for (; b;) {
            if (c in b[a]) return b;
            if (b.isolated) return null;
            b = b.parent
        }
    }

    function w(a, b, c, d) {
        if (a === b) return null;
        if (d) {
            var e = u("interpolators", c, d);
            if (e) return e(a, b) || null;
            o(Dg(d, "interpolator"))
        }
        return Eg.number(a, b) || Eg.array(a, b) || Eg.object(a, b) || null
    }

    function x(a) {
        return function() {
            return a
        }
    }

    function y(a, b) {
        var c = a.indexOf(b);
        c === -1 && a.push(b)
    }

    function z(a, b) {
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] == b) return !0;
        return !1
    }

    function A(a, b) {
        var c;
        if (!j(a) || !j(b)) return !1;
        if (a.length !== b.length) return !1;
        for (c = a.length; c--;)
            if (a[c] !== b[c]) return !1;
        return !0
    }

    function B(a) {
        return "string" == typeof a ? [a] : void 0 === a ? [] : a
    }

    function C(a) {
        return a[a.length - 1]
    }

    function D(a, b) {
        if (a) {
            var c = a.indexOf(b);
            c !== -1 && a.splice(c, 1)
        }
    }

    function E(a) {
        for (var b = [], c = a.length; c--;) b[c] = a[c];
        return b
    }

    function F(a) {
        setTimeout(a, 0)
    }

    function G(a, b) {
        return function() {
            for (var c; c = a.shift();) c(b)
        }
    }

    function H(a, b, c, d) {
        var e;
        if (b === a) throw new TypeError("A promise's fulfillment handler cannot return the same promise");
        if (b instanceof Hg) b.then(c, d);
        else if (!b || "object" != typeof b && "function" != typeof b) c(b);
        else {
            try {
                e = b.then
            } catch (a) {
                return void d(a)
            }
            if ("function" == typeof e) {
                var f, g, h;
                g = function(b) {
                    f || (f = !0, H(a, b, c, d))
                }, h = function(a) {
                    f || (f = !0, d(a))
                };
                try {
                    e.call(b, g, h)
                } catch (a) {
                    if (!f) return d(a), void(f = !0)
                }
            } else c(b)
        }
    }

    function I(a) {
        a.detach()
    }

    function J(a) {
        a.detachNodes()
    }

    function K(a) {
        !a.ready || a.outros.length || a.outroChildren || (a.outrosComplete || (a.outrosComplete = !0, a.parent && !a.parent.outrosComplete ? a.parent.decrementOutros(a) : a.detachNodes()), a.intros.length || a.totalChildren || ("function" == typeof a.callback && a.callback(), a.parent && !a.notifiedTotal && (a.notifiedTotal = !0, a.parent.decrementTotal())))
    }

    function L(a) {
        var b, c, d = a.detachQueue,
            e = M(a),
            f = d.length,
            g = 0;
        a: for (; f--;) {
            for (b = d[f].node, g = e.length; g--;)
                if (c = e[g].element.node, c === b || c.contains(b) || b.contains(c)) continue a;
            d[f].detach(), d.splice(f, 1)
        }
    }

    function M(a, b) {
        if (b) {
            for (var c = a.children.length; c--;) b = M(a.children[c], b);
            return b = b.concat(a.outros)
        }
        b = [];
        for (var d = a; d.parent;) d = d.parent;
        return M(d, b)
    }

    function N(a) {
        a.dispatch()
    }

    function O() {
        var a = Ng.immediateObservers;
        Ng.immediateObservers = [], a.forEach(N);
        var b, c = Ng.fragments.length;
        a = Ng.fragments, Ng.fragments = [];
        var d = Ng.ractives;
        for (Ng.ractives = []; c--;) {
            b = a[c];
            var e = b.ractive;
            Og.fire(e, e.viewmodel.changes), e.viewmodel.changes = {}, D(d, e), b.update()
        }
        for (c = d.length; c--;) {
            var f = d[c];
            Og.fire(f, f.viewmodel.changes), f.viewmodel.changes = {}
        }
        Ng.transitionManager.ready(), a = Ng.deferredObservers, Ng.deferredObservers = [], a.forEach(N);
        var g = Ng.tasks;
        for (Ng.tasks = [], c = 0; c < g.length; c += 1) g[c]();
        if (Ng.fragments.length || Ng.immediateObservers.length || Ng.deferredObservers.length || Ng.ractives.length) return O()
    }

    function P(a) {
        return "string" == typeof a ? a.replace(Sg, "\\$&") : a
    }

    function Q(a) {
        return a ? a.replace(Qg, ".$1") : ""
    }

    function R(a) {
        var b, c = [];
        for (a = Q(a); b = Rg.exec(a);) {
            var d = b.index + b[1].length;
            c.push(a.substr(0, d)), a = a.substr(d + 1)
        }
        return c.push(a), c
    }

    function S(a) {
        return "string" == typeof a ? a.replace(Tg, "$1$2") : a
    }

    function T(a, b) {
        if (!/this/.test(a.toString())) return a;
        var c = a.bind(b);
        for (var d in a) c[d] = a[d];
        return c
    }

    function U(a, b) {
        for (var c = Pg.start(a, !0), d = b.length; d--;) {
            var e = b[d],
                f = e[0],
                g = e[1];
            "function" == typeof g && (g = T(g, a)), f.set(g)
        }
        return Pg.end(), c
    }

    function V(a, b, c) {
        return void 0 === c && (c = a.viewmodel), Ug.test(b) ? c.findMatches(R(b)) : [c.joinAll(R(b))]
    }

    function W(a, b, c) {
        var d = [];
        if (m(b)) {
            var e = function(c) {
                b.hasOwnProperty(c) && d.push.apply(d, V(a, c).map(function(a) {
                    return [a, b[c]]
                }))
            };
            for (var f in b) e(f)
        } else d.push.apply(d, V(a, b).map(function(a) {
            return [a, c]
        }));
        return d
    }

    function X(a, b, c) {
        if ("string" != typeof b || !l(c)) throw new Error("Bad arguments");
        var d = W(a, b, c);
        return U(a, d.map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!l(c) || !l(d)) throw new Error(Vg);
            return [b, d + c]
        }))
    }

    function Y(a, b) {
        return X(this, a, void 0 === b ? 1 : +b)
    }

    function Z(a, b) {
        a = a || {};
        var c;
        return a.easing && (c = "function" == typeof a.easing ? a.easing : b.easing[a.easing]), {
            easing: c || Xg,
            duration: "duration" in a ? a.duration : 400,
            complete: a.complete || xg,
            step: a.step || xg
        }
    }

    function $(a, b, c, d) {
        d = Z(d, a);
        var e = b.get();
        if (k(e, c)) return d.complete(d.to), Wg;
        var f = w(e, c, a, d.interpolator);
        return f ? b.animate(e, c, d, f) : (Pg.start(), b.set(c), Pg.end(), Wg)
    }

    function _(a, b, c) {
        if ("object" == typeof a) {
            var d = Object.keys(a);
            throw new Error("ractive.animate(...) no longer supports objects. Instead of ractive.animate({\n  " + d.map(function(b) {
                return "'" + b + "': " + a[b]
            }).join("\n  ") + "\n}, {...}), do\n\n" + d.map(function(b) {
                return "ractive.animate('" + b + "', " + a[b] + ", {...});"
            }).join("\n") + "\n")
        }
        return $(this, this.viewmodel.joinAll(R(a)), b, c)
    }

    function aa() {
        return this.isDetached ? this.el : (this.el && D(this.el.__ractive_instances__, this), this.el = this.fragment.detach(), this.isDetached = !0, Yg.fire(this), this.el)
    }

    function ba(a) {
        if (!this.el) throw new Error("Cannot call ractive.find('" + a + "') unless instance is rendered to the DOM");
        return this.fragment.find(a)
    }

    function ca(a, b) {
        if (a.compareDocumentPosition) {
            var c = a.compareDocumentPosition(b);
            return 2 & c ? 1 : -1
        }
        return da(a, b)
    }

    function da(a, b) {
        for (var c, d = fa(a.component || a._ractive.proxy), e = fa(b.component || b._ractive.proxy), f = C(d), g = C(e); f && f === g;) d.pop(), e.pop(), c = f, f = C(d), g = C(e);
        f = f.component || f, g = g.component || g;
        var h = f.parentFragment,
            i = g.parentFragment;
        if (h === i) {
            var j = h.items.indexOf(f),
                k = i.items.indexOf(g);
            return j - k || d.length - e.length
        }
        var l = c.iterations;
        if (l) {
            var m = l.indexOf(h),
                n = l.indexOf(i);
            return m - n || d.length - e.length
        }
        throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/ractivejs/ractive/issues - thanks!")
    }

    function ea(a) {
        var b = a.parentFragment;
        return b ? b.owner : a.component && (b = a.component.parentFragment) ? b.owner : void 0
    }

    function fa(a) {
        for (var b = [a], c = ea(a); c;) b.push(c), c = ea(c);
        return b
    }

    function ga(a, b) {
        if (!this.el) throw new Error("Cannot call ractive.findAll('" + a + "', ...) unless instance is rendered to the DOM");
        b = b || {};
        var c = this._liveQueries,
            d = c[a];
        return d ? b && b.live ? d : d.slice() : (d = new Zg(this, a, !!b.live, !1), d.live && (c.push(a), c["_" + a] = d), this.fragment.findAll(a, d), d.init(), d.result)
    }

    function ha(a, b) {
        b = b || {};
        var c = this._liveComponentQueries,
            d = c[a];
        return d ? b && b.live ? d : d.slice() : (d = new Zg(this, a, !!b.live, !0), d.live && (c.push(a), c["_" + a] = d), this.fragment.findAllComponents(a, d), d.init(), d.result)
    }

    function ia(a) {
        return this.fragment.findComponent(a)
    }

    function ja(a) {
        return this.container ? this.container.component && this.container.component.name === a ? this.container : this.container.findContainer(a) : null
    }

    function ka(a) {
        return this.parent ? this.parent.component && this.parent.component.name === a ? this.parent : this.parent.findParent(a) : null
    }

    function la(a, b) {
        a.event && a._eventQueue.push(a.event), a.event = b
    }

    function ma(a) {
        a._eventQueue.length ? a.event = a._eventQueue.pop() : a.event = null
    }

    function na(a) {
        var b, c, d, e, f, g;
        for (b = R(a), (c = _g[b.length]) || (c = oa(b.length)), f = [], d = function(a, c) {
                return a ? "*" : b[c]
            }, e = c.length; e--;) g = c[e].map(d).join("."), f.hasOwnProperty(g) || (f.push(g), f[g] = !0);
        return f
    }

    function oa(a) {
        var b, c, d, e, f, g, h, i, j = "";
        if (!_g[a]) {
            for (d = []; j.length < a;) j += 1;
            for (b = parseInt(j, 2), e = function(a) {
                    return "1" === a
                }, f = 0; f <= b; f += 1) {
                for (c = f.toString(2); c.length < a;) c = "0" + c;
                for (i = [], h = c.length, g = 0; g < h; g++) i.push(e(c[g]));
                d[f] = i
            }
            _g[a] = d
        }
        return _g[a]
    }

    function pa(a, b, c) {
        if (void 0 === c && (c = {}), b) {
            c.event ? c.event.name = b : c.event = {
                name: b,
                _noArg: !0
            };
            var d = qa(b);
            return ra(a, d, c.event, c.args, !0)
        }
    }

    function qa(a) {
        return ah.hasOwnProperty(a) ? ah[a] : ah[a] = na(a)
    }

    function ra(a, b, c, d, e) {
        void 0 === e && (e = !1);
        var f, g, h = !0;
        for (la(a, c), g = b.length; g >= 0; g--) f = a._subs[b[g]], f && (h = sa(a, f, c, d) && h);
        if (ma(a), a.parent && h) {
            if (e && a.component) {
                var i = a.component.name + "." + b[b.length - 1];
                b = qa(i), c && !c.component && (c.component = a)
            }
            ra(a.parent, b, c, d)
        }
        return h
    }

    function sa(a, b, c, d) {
        var e = null,
            f = !1;
        c && !c._noArg && (d = [c].concat(d)), b = b.slice();
        for (var g = 0, h = b.length; g < h; g += 1) b[g].apply(a, d) === !1 && (f = !0);
        return c && !c._noArg && f && (e = c.original) && (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()), !f
    }

    function ta(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return pa(this, a, {
            args: b
        })
    }

    function ua(a) {
        throw new Error("An index or key reference (" + a + ") cannot have child properties")
    }

    function va(a, b) {
        for (var c, d, e, f = a.findContext().root, g = R(b), h = g[0]; a;) {
            if (a.isIteration) {
                if (h === a.parent.keyRef) return g.length > 1 && ua(h), a.context.getKeyModel(a.key);
                if (h === a.parent.indexRef) return g.length > 1 && ua(h), a.context.getKeyModel(a.index)
            }
            if (((e = a.owner.aliases) || (e = a.aliases)) && e.hasOwnProperty(h)) {
                var i = e[h];
                if (1 === g.length) return i;
                if ("function" == typeof i.joinAll) return i.joinAll(g.slice(1))
            }
            if (a.context && (a.isRoot && !a.ractive.component || (c = !0), a.context.has(h))) return d ? f.createLink(h, a.context.joinKey(g.shift()), h).joinAll(g) : a.context.joinAll(g);
            a.componentParent && !a.ractive.isolated ? (a = a.componentParent, d = !0) : a = a.parent
        }
        if (!c) return f.joinAll(g)
    }

    function wa() {
        bh.push($g = [])
    }

    function xa() {
        var a = bh.pop();
        return $g = bh[bh.length - 1], a
    }

    function ya(a) {
        $g && $g.push(a)
    }

    function za(a) {
        a.bind()
    }

    function Aa(a) {
        a.cancel()
    }

    function Ba(a) {
        a.handleChange()
    }

    function Ca(a) {
        a.mark()
    }

    function Da(a) {
        a.marked()
    }

    function Ea(a) {
        a.notifiedUpstream()
    }

    function Fa(a) {
        a.render()
    }

    function Ga(a) {
        a.teardown()
    }

    function Ha(a) {
        a.unbind()
    }

    function Ia(a) {
        a.unrender()
    }

    function Ja(a) {
        a.unrender(!0)
    }

    function Ka(a) {
        a.update()
    }

    function La(a) {
        return a.toString()
    }

    function Ma(a) {
        return a.toString(!0)
    }

    function Na(a) {
        a.updateFromBindings(!0)
    }

    function Oa(a) {
        for (var b = a.length; b--;)
            if (a[b].bound) {
                var c = a[b].owner;
                if (c) {
                    var d = "checked" === c.name ? c.node.checked : c.node.value;
                    return {
                        value: d
                    }
                }
            }
    }

    function Pa(a) {
        if (a) {
            var b = fh[a];
            fh[a] = [];
            for (var c = b.length; c--;) b[c]();
            var d = gh[a];
            for (gh[a] = [], c = d.length; c--;) d[c].model.register(d[c].item)
        } else Pa("early"), Pa("mark")
    }

    function Qa(a, b, c) {
        var d = a.r || a;
        if (!d || "string" != typeof d) return b;
        if ("." === d || "@" === d[0] || (b || c).isKey || (b || c).isKeypath) return b;
        for (var e = d.split("/"), f = R(e[e.length - 1]), g = b || c, h = f.length, i = !0, j = !1; g && h--;) g.shuffling && (j = !0), f[h] != g.key && (i = !1), g = g.parent;
        return !b && i && j ? c : b && !i && j ? c : b
    }

    function Ra() {
        Pg.start();
        var a, b, c = lh();
        for (a = 0; a < mh.length; a += 1) b = mh[a], b.tick(c) || mh.splice(a--, 1);
        Pg.end(), mh.length ? kh(Ra) : nh = !1
    }

    function Sa(a, b) {
        var c, d = {};
        if (!b) return a;
        b += ".";
        for (c in a) a.hasOwnProperty(c) && (d[b + c] = a[c]);
        return d
    }

    function Ta(a) {
        var b;
        return ph[a] || (b = a ? a + "." : "", ph[a] = function(c, d) {
            var e;
            return "string" == typeof c ? (e = {}, e[b + c] = d, e) : "object" == typeof c ? b ? Sa(c, a) : c : void 0
        }), ph[a]
    }

    function Ua(a) {
        for (var b = [], c = 0; c < a.length; c++) b[c] = (a.childByKey[c] || {}).value;
        return b
    }

    function Va(a, b) {
        var c = a.findContext();
        if ("." === b || "this" === b) return c;
        if (0 === b.indexOf("@keypath")) {
            var d = th.exec(b);
            if (d && d[1]) {
                var e = Va(a, d[1]);
                if (e) return e.getKeypathModel()
            }
            return c.getKeypathModel()
        }
        if (0 === b.indexOf("@rootpath")) {
            for (; c.isRoot && c.ractive.component;) c = c.ractive.component.parentFragment.findContext();
            var f = th.exec(b);
            if (f && f[1]) {
                var g = Va(a, f[1]);
                if (g) return g.getKeypathModel(a.ractive.root)
            }
            return c.getKeypathModel(a.ractive.root)
        }
        if ("@index" === b || "@key" === b) {
            var h = a.findRepeatingFragment();
            if (!h.isIteration) return;
            return h.context.getKeyModel(h["i" === b[1] ? "index" : "key"])
        }
        if ("@this" === b) return a.ractive.viewmodel.getRactiveModel();
        if ("@global" === b) return sh;
        if ("~" === b[0]) return a.ractive.viewmodel.joinAll(R(b.slice(2)));
        if ("." === b[0]) {
            for (var i = b.split("/");
                "." === i[0] || ".." === i[0];) {
                var j = i.shift();
                ".." === j && (c = c.parent)
            }
            return b = i.join("/"), "." === b[0] && (b = b.slice(1)), c.joinAll(R(b))
        }
        return va(a, b)
    }

    function Wa(a, b) {
        if ("string" != typeof a) return this.viewmodel.get(!0, a);
        var c, d = R(a),
            e = d[0];
        return this.viewmodel.has(e) || this.component && !this.isolated && (c = Va(this.component.parentFragment, e), c && this.viewmodel.map(e, c)), c = this.viewmodel.joinAll(d), c.get(!0, b)
    }

    function Xa(a) {
        for (var b = {}, c = {}; a;) {
            if (a.parent && (a.parent.indexRef || a.parent.keyRef)) {
                var d = a.parent.indexRef;
                !d || d in c || (c[d] = a.index), d = a.parent.keyRef, !d || d in b || (b[d] = a.key)
            }
            a = a.componentParent && !a.ractive.isolated ? a.componentParent : a.parent
        }
        return {
            key: b,
            index: c
        }
    }

    function Ya(a, b, c) {
        var d, e, f, g, h, i = [];
        if (d = Za(a, b, c), !d) return null;
        for (g = d.length - 2 - d[1], e = Math.min(a, d[0]), f = e + d[1], i.startIndex = e, h = 0; h < e; h += 1) i.push(h);
        for (; h < f; h += 1) i.push(-1);
        for (; h < a; h += 1) i.push(h + g);
        return 0 !== g ? i.touchedFrom = d[0] : i.touchedFrom = a, i
    }

    function Za(a, b, c) {
        switch (b) {
            case "splice":
                for (void 0 !== c[0] && c[0] < 0 && (c[0] = a + Math.max(c[0], -a)), void 0 === c[0] && (c[0] = 0); c.length < 2;) c.push(a - c[0]);
                return "number" != typeof c[1] && (c[1] = a - c[0]), c[1] = Math.min(c[1], a - c[0]), c;
            case "sort":
            case "reverse":
                return null;
            case "pop":
                return a ? [a - 1, 1] : [0, 0];
            case "push":
                return [a, 0].concat(c);
            case "shift":
                return [0, a ? 1 : 0];
            case "unshift":
                return [0, 0].concat(c)
        }
    }

    function $a(a) {
        if (!a) return null;
        if (a === !0) return JSON.stringify;
        if ("function" == typeof a) return a;
        if ("string" == typeof a) return wh[a] || (wh[a] = function(b) {
            return b[a]
        });
        throw new Error("If supplied, options.compare must be a string, function, or `true`")
    }

    function _a(a, b, c, d) {
        var e = Pg.start(a, !0),
            f = b.get();
        if (!j(f) || !j(c)) throw new Error("You cannot merge an array with a non-array");
        var g = $a(d && d.compare);
        return b.merge(c, g), Pg.end(), e
    }

    function ab(a, b, c) {
        return _a(this, this.viewmodel.joinAll(R(a)), b, c)
    }

    function bb(a, b) {
        if (b.parent && b.parent.wrapper) return bb(a, b.parent);
        var c = Pg.start(a, !0);
        if (b.mark(), b.registerChange(b.getKeypath(), b.get()), !b.isRoot)
            for (var d = b.parent, e = b.key; d && !d.isRoot;) d.clearUnresolveds && d.clearUnresolveds(e), e = d.key, d = d.parent;
        return b.notifyUpstream(), Pg.end(), xh.fire(a, b), c
    }

    function cb(a) {
        return a && (a = R(a)), bb(this, a ? this.viewmodel.joinAll(a) : this.viewmodel)
    }

    function db(a, b, c) {
        var d = [];
        if (m(b))
            for (var e in b) b.hasOwnProperty(e) && d.push([gb(a, e).model, b[e]]);
        else d.push([gb(a, b).model, c]);
        return d
    }

    function eb(a) {
        if (!a) return this._element.parentFragment.findContext().get(!0);
        var b = Va(this._element.parentFragment, a);
        return b ? b.get(!0) : void 0
    }

    function fb(a, b) {
        var c = gb(this, a),
            d = c.model,
            e = c.instance;
        return d ? d.getKeypath(b || e) : a
    }

    function gb(a, b) {
        var c = a._element.parentFragment;
        return "string" != typeof b ? {
            model: c.findContext(),
            instance: b
        } : {
            model: Va(c, b),
            instance: c.ractive
        }
    }

    function hb(a, b) {
        if (void 0 === b && (b = 1), !l(b)) throw new Error("Bad arguments");
        return U(this.ractive, db(this, a, b).map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!l(c) || !l(d)) throw new Error("Cannot add non-numeric value");
            return [b, d + c]
        }))
    }

    function ib(a, b, c) {
        var d = gb(this, a).model;
        return $(this.ractive, d, b, c)
    }

    function jb(a, b) {
        var c = gb(this, a).model,
            d = gb(this, b).model,
            e = Pg.start(this.ractive, !0);
        return d.link(c, a), Pg.end(), e
    }

    function kb(a, b, c) {
        return _a(this.ractive, gb(this, a).model, b, c)
    }

    function lb(a) {
        return zh(gb(this, a).model, [])
    }

    function mb(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return yh(gb(this, a).model, b)
    }

    function nb(a) {
        return Eh(gb(this, a).model, [])
    }

    function ob(a, b) {
        return U(this.ractive, db(this, a, b))
    }

    function pb(a) {
        return Ah(gb(this, a).model, [])
    }

    function qb(a, b, c) {
        for (var d = [], e = arguments.length - 3; e-- > 0;) d[e] = arguments[e + 3];
        return d.unshift(b, c), Dh(gb(this, a).model, d)
    }

    function rb(a) {
        return Ch(gb(this, a).model, [])
    }

    function sb(a, b) {
        if (void 0 === b && (b = 1), !l(b)) throw new Error("Bad arguments");
        return U(this.ractive, db(this, a, b).map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!l(c) || !l(d)) throw new Error("Cannot add non-numeric value");
            return [b, d - c]
        }))
    }

    function tb(a) {
        var b = gb(this, a),
            c = b.model;
        return U(this.ractive, [
            [c, !c.get()]
        ])
    }

    function ub(a) {
        var b = gb(this, a).model,
            c = Pg.start(this.ractive, !0);
        return b.owner && b.owner._link && b.owner.unlink(), Pg.end(), c
    }

    function vb(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return Bh(gb(this, a).model, b)
    }

    function wb(a) {
        return bb(this.ractive, gb(this, a).model)
    }

    function xb(a, b) {
        var c = gb(this, a),
            d = c.model,
            e = Pg.start(this.ractive, !0);
        return d.updateFromBindings(b), Pg.end(), e
    }

    function yb() {
        var a = Bb(this),
            b = a.model;
        return !!b
    }

    function zb(a) {
        var b = Bb(this),
            c = b.model,
            d = b.instance;
        if (c) return c.getKeypath(a || d)
    }

    function Ab() {
        var a = Bb(this),
            b = a.model;
        if (b) return b.get(!0)
    }

    function Bb(a) {
        var b = a._element;
        return {
            model: b.binding && b.binding.model,
            instance: b.parentFragment.ractive
        }
    }

    function Cb(a) {
        var b = Bb(this),
            c = b.model;
        return U(this.ractive, [
            [c, a]
        ])
    }

    function Db() {
        return t("Object property keypath is deprecated, please use resolve() instead."), this.resolve()
    }

    function Eb() {
        return t("Object property rootpath is deprecated, please use resolve( ractive.root ) instead."), this.resolve(this.ractive.root)
    }

    function Fb() {
        return t("Object property context is deprecated, please use get() instead."), this.get()
    }

    function Gb() {
        return t('Object property index is deprecated, you can use get( "indexName" ) instead.'), Xa(this._element.parentFragment).index
    }

    function Hb() {
        return t('Object property key is deprecated, you can use get( "keyName" ) instead.'), Xa(this._element.parentFragment).key
    }

    function Ib(a, b) {
        return pg(a, {
            _element: {
                value: b
            },
            ractive: {
                value: b.parentFragment.ractive
            },
            resolve: {
                value: fb
            },
            get: {
                value: eb
            },
            add: {
                value: hb
            },
            animate: {
                value: ib
            },
            link: {
                value: jb
            },
            merge: {
                value: kb
            },
            pop: {
                value: lb
            },
            push: {
                value: mb
            },
            reverse: {
                value: nb
            },
            set: {
                value: ob
            },
            shift: {
                value: pb
            },
            sort: {
                value: rb
            },
            splice: {
                value: qb
            },
            subtract: {
                value: sb
            },
            toggle: {
                value: tb
            },
            unlink: {
                value: ub
            },
            unshift: {
                value: vb
            },
            update: {
                value: wb
            },
            updateModel: {
                value: xb
            },
            isBound: {
                value: yb
            },
            getBindingPath: {
                value: zb
            },
            getBinding: {
                value: Ab
            },
            setBinding: {
                value: Cb
            },
            keypath: {
                get: Db
            },
            rootpath: {
                get: Eb
            },
            context: {
                get: Fb
            },
            index: {
                get: Gb
            },
            key: {
                get: Hb
            }
        }), a
    }

    function Jb(a) {
        return "string" == typeof a && (a = this.find(a)), Gh(a)
    }

    function Kb(a, c) {
        if (!this.fragment.rendered) throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.");
        if (a = b(a), c = b(c) || null, !a) throw new Error("You must specify a valid target to insert into");
        a.insertBefore(this.detach(), c), this.el = a, (a.__ractive_instances__ || (a.__ractive_instances__ = [])).push(this), this.isDetached = !1, Lb(this)
    }

    function Lb(a) {
        Hh.fire(a), a.findAllComponents("*").forEach(function(a) {
            Lb(a.instance)
        })
    }

    function Mb(a, b) {
        if (b === a || 0 === (a + ".").indexOf(b + ".") || 0 === (b + ".").indexOf(a + ".")) throw new Error("A keypath cannot be linked to itself.");
        var c, d = Pg.start(),
            e = R(a);
        return !this.viewmodel.has(e[0]) && this.component && (c = Va(this.component.parentFragment, e[0]), c = c.joinAll(e.slice(1))), this.viewmodel.joinAll(R(b)).link(c || this.viewmodel.joinAll(e), a), Pg.end(), d
    }

    function Nb(a, b, c) {
        var d, e = this,
            f = [];
        if (m(a)) d = a, c = b || {}, Object.keys(d).forEach(function(a) {
            var b = d[a];
            a.split(" ").forEach(function(a) {
                f.push(Ob(e, a, b, c))
            })
        });
        else {
            var g;
            "function" == typeof a ? (c = b, b = a, g = [""]) : g = a.split(" "), g.forEach(function(a) {
                f.push(Ob(e, a, b, c || {}))
            })
        }
        return this._observers.push.apply(this._observers, f), {
            cancel: function() {
                f.forEach(function(a) {
                    D(e._observers, a), a.cancel()
                })
            }
        }
    }

    function Ob(a, b, c, d) {
        var e = a.viewmodel,
            f = R(b),
            g = f.indexOf("*");
        if (d.keypath = b, !~g) {
            var h, i = f[0];
            return "" === i || e.has(i) ? h = e.joinAll(f) : a.component && !a.isolated && (h = Va(a.component.parentFragment, i), h && (e.map(i, h), h = e.joinAll(f))), new Jh(a, h, c, d)
        }
        var j = 0 === g ? e : e.joinAll(f.slice(0, g));
        return new Kh(a, j, f.splice(g), c, d)
    }

    function Pb(a, b, c) {
        if ("string" != typeof a) throw new Error("ractive.observeList() must be passed a string as its first argument");
        var d = this.viewmodel.joinAll(R(a)),
            e = new Lh(this, d, b, c || {});
        return this._observers.push(e), {
            cancel: function() {
                e.cancel()
            }
        }
    }

    function Qb() {
        return -1
    }

    function Rb(a, b, c) {
        return m(a) || "function" == typeof a ? (c = h(b || {}, Mh), this.observe(a, c)) : (c = h(c || {}, Mh), this.observe(a, b, c))
    }

    function Sb(a, b) {
        var c = this;
        if (a) {
            var d = a.split(" ").map(Nh).filter(Oh);
            d.forEach(function(a) {
                var d = c._subs[a];
                if (d)
                    if (b) {
                        var e = d.indexOf(b);
                        e !== -1 && d.splice(e, 1)
                    } else c._subs[a] = []
            })
        } else
            for (a in this._subs) delete this._subs[a];
        return this
    }

    function Tb(a, b) {
        var c = this;
        if ("object" == typeof a) {
            var d, e = [];
            for (d in a) a.hasOwnProperty(d) && e.push(this.on(d, a[d]));
            return {
                cancel: function() {
                    for (var a; a = e.pop();) a.cancel()
                }
            }
        }
        var f = a.split(" ").map(Nh).filter(Oh);
        return f.forEach(function(a) {
            (c._subs[a] || (c._subs[a] = [])).push(b)
        }), {
            cancel: function() {
                return c.off(a, b)
            }
        }
    }

    function Ub(a, b) {
        var c = this.on(a, function() {
            b.apply(this, arguments), c.cancel()
        });
        return c
    }

    function Vb(a) {
        Sh.push(a), Th = !0
    }

    function Wb() {
        Uf && Th && (Vh ? Uh.styleSheet.cssText = Xb(null) : Uh.innerHTML = Xb(null), Th = !1)
    }

    function Xb(a) {
        var b = a ? Sh.filter(function(b) {
            return ~a.indexOf(b.id)
        }) : Sh;
        return b.reduce(function(a, b) {
            return "" + a + "\n\n/* {" + b.id + "} */\n" + b.styles
        }, Rh)
    }

    function Yb(a, c, d, e) {
        var f = a.transitionsEnabled;
        a.noIntro && (a.transitionsEnabled = !1);
        var g = Pg.start(a, !0);
        if (Pg.scheduleTask(function() {
                return Yh.fire(a)
            }, !0), a.fragment.rendered) throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first");
        if (d = b(d) || a.anchor, a.el = c, a.anchor = d, a.cssId && Wb(), c)
            if ((c.__ractive_instances__ || (c.__ractive_instances__ = [])).push(a), d) {
                var h = Uf.createDocumentFragment();
                a.fragment.render(h), c.insertBefore(h, d)
            } else a.fragment.render(c, e);
        return Pg.end(), a.transitionsEnabled = f, g.then(function() {
            return Zh.fire(a)
        })
    }

    function Zb(a, c) {
        if (this.torndown) return s("ractive.render() was called on a Ractive instance that was already torn down"), Promise.resolve();
        if (a = b(a) || this.el, !this.append && a) {
            var d = a.__ractive_instances__;
            d && d.forEach(Ga), this.enhance || (a.innerHTML = "")
        }
        var e = this.enhance ? E(a.childNodes) : null,
            f = Yb(this, a, c, e);
        if (e)
            for (; e.length;) a.removeChild(e.pop());
        return f
    }

    function $b(a, b) {
        for (var c = a.slice(), d = b.length; d--;) ~c.indexOf(b[d]) || c.push(b[d]);
        return c
    }

    function _b(a) {
        return a.trim()
    }

    function ac(a) {
        return a.str
    }

    function bc(a, b) {
        for (var c, d = []; c = bi.exec(a);) d.push({
            str: c[0],
            base: c[1],
            modifiers: c[2]
        });
        for (var e = d.map(ac), f = [], g = d.length; g--;) {
            var h = e.slice(),
                i = d[g];
            h[g] = i.base + b + i.modifiers || "";
            var j = e.slice();
            j[g] = b + " " + j[g], f.push(h.join(" "), j.join(" "))
        }
        return f.join(", ")
    }

    function cc(a, b) {
        var c, d = '[data-ractive-css~="{' + b + '}"]';
        return c = di.test(a) ? a.replace(di, d) : a.replace(ai, "").replace(_h, function(a, b) {
            if (ci.test(b)) return a;
            var c = b.split(",").map(_b),
                e = c.map(function(a) {
                    return bc(a, d)
                }).join(", ") + " ";
            return a.replace(b, e)
        })
    }

    function dc() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function ec() {
        return dc() + dc() + "-" + dc() + "-" + dc() + "-" + dc() + "-" + dc() + dc() + dc()
    }

    function fc(a) {
        a && a.constructor !== Object && ("function" == typeof a || ("object" != typeof a ? o("data option must be an object or a function, `" + a + "` is not valid") : s("If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged")))
    }

    function gc(a, b) {
        fc(b);
        var c = "function" == typeof a,
            d = "function" == typeof b;
        return b || c || (b = {}), c || d ? function() {
            var e = d ? hc(b, this) : b,
                f = c ? hc(a, this) : a;
            return ic(e, f)
        } : ic(b, a)
    }

    function hc(a, b) {
        var c = a.call(b);
        if (c) return "object" != typeof c && o("Data function must return an object"), c.constructor !== Object && t("Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged"), c
    }

    function ic(a, b) {
        if (a && b) {
            for (var c in b) c in a || (a[c] = b[c]);
            return a
        }
        return a || b
    }

    function jc(a, b) {
        void 0 === b && (b = 0);
        for (var c = new Array(b); b--;) c[b] = "_" + b;
        return new Function([], "return function (" + c.join(",") + "){return(" + a + ");};")()
    }

    function kc(a, b) {
        var c, d = "return (" + a.replace(hi, function(a, b) {
            return c = !0, '__ractive.get("' + b + '")'
        }) + ");";
        c && (d = "var __ractive = this; " + d);
        var e = new Function(d);
        return c ? e.bind(b) : e
    }

    function lc(a, b) {
        return ii[a] ? ii[a] : ii[a] = xd(a, b)
    }

    function mc(a) {
        if (a) {
            var b = a.e;
            b && Object.keys(b).forEach(function(a) {
                ii[a] || (ii[a] = b[a])
            })
        }
    }

    function nc(a) {
        var b, c, d;
        return a.matchString("=") ? (b = a.pos, a.allowWhitespace(), (c = a.matchPattern(ej)) ? a.matchPattern(fj) ? (d = a.matchPattern(ej)) ? (a.allowWhitespace(), a.matchString("=") ? [c, d] : (a.pos = b, null)) : (a.pos = b, null) : null : (a.pos = b, null)) : null
    }

    function oc(a) {
        var b;
        return (b = a.matchPattern(gj)) ? {
            t: Ki,
            v: b
        } : null
    }

    function pc(a) {
        return a.replace(hj, "\\$&")
    }

    function qc(a) {
        return a.replace(oj, function(a, b) {
            var c;
            return c = "#" !== b[0] ? mj[b] : "x" === b[1] ? parseInt(b.substring(2), 16) : parseInt(b.substring(1), 10), c ? qj(sc(c)) : a
        })
    }

    function rc(a) {
        return a.replace(tj, "&amp;").replace(rj, "&lt;").replace(sj, "&gt;")
    }

    function sc(a) {
        return a ? 10 === a ? 32 : a < 128 ? a : a <= 159 ? nj[a - 128] : a < 55296 ? a : a <= 57343 ? uj : a <= 65535 ? a : pj ? a >= 65536 && a <= 131071 ? a : a >= 131072 && a <= 196607 ? a : uj : uj : uj
    }

    function tc(a) {
        var b;
        return (b = a.matchPattern(xj)) ? {
            t: Fi,
            v: b
        } : null
    }

    function uc(a) {
        var b = a.remaining();
        return "true" === b.substr(0, 4) ? (a.pos += 4, {
            t: Ji,
            v: "true"
        }) : "false" === b.substr(0, 5) ? (a.pos += 5, {
            t: Ji,
            v: "false"
        }) : null
    }

    function vc(a) {
        var b;
        return (b = Dj(a)) ? Fj.test(b.v) ? b.v : '"' + b.v.replace(/"/g, '\\"') + '"' : (b = tc(a)) ? b.v : (b = a.matchPattern(Ej)) ? b : null
    }

    function wc(a) {
        var b, c, d;
        b = a.pos, a.allowWhitespace();
        var e = "'" !== a.nextChar() && '"' !== a.nextChar();
        return c = vc(a), null === c ? (a.pos = b, null) : (a.allowWhitespace(), !e || "," !== a.nextChar() && "}" !== a.nextChar() ? a.matchString(":") ? (a.allowWhitespace(), d = Ec(a), null === d ? (a.pos = b, null) : {
            t: Mi,
            k: c,
            v: d
        }) : (a.pos = b, null) : (Ej.test(c) || a.error("Expected a valid reference, but found '" + c + "' instead."), {
            t: Mi,
            k: c,
            v: {
                t: Ni,
                n: c
            }
        }))
    }

    function xc(a) {
        var b, c, d, e;
        return b = a.pos, d = wc(a), null === d ? null : (c = [d], a.matchString(",") ? (e = xc(a), e ? c.concat(e) : (a.pos = b, null)) : c)
    }

    function yc(a) {
        a.allowWhitespace();
        var b = Ec(a);
        if (null === b) return null;
        var c = [b];
        if (a.allowWhitespace(), a.matchString(",")) {
            var d = yc(a);
            null === d && a.error(vj), c.push.apply(c, d)
        }
        return c
    }

    function zc(a) {
        return tc(a) || uc(a) || Dj(a) || Gj(a) || Hj(a) || oc(a)
    }

    function Ac(a) {
        var b, c, d, e, f, g, h, i;
        if (b = a.pos, d = a.matchPattern(Nj), ("@keypath" === d || "@rootpath" === d) && a.matchPattern(Oj)) {
            var j = Ac(a);
            j || a.error("Expected a valid reference for a keypath expression"), a.allowWhitespace(), a.matchString(")") || a.error("Unclosed keypath expression"), d += "(" + j.n + ")"
        }
        if (i = !d && a.spreadArgs && a.matchPattern(Pj), d || (c = a.matchPattern(Ij) || "", d = !c && a.relaxedNames && a.matchPattern(Mj) || a.matchPattern(Lj), d || "." !== c ? !d && c && (d = c, c = "") : (c = "", d = ".")), !d) return null;
        if (!c && !a.relaxedNames && zj.test(d)) return a.pos = b, null;
        if (!c && yj.test(d)) return e = yj.exec(d)[0], a.pos = b + e.length, {
            t: Li,
            v: (i ? "..." : "") + e
        };
        if (g = (i ? 3 : 0) + (c || "").length + d.length, f = (c || "") + Q(d), a.matchString("("))
            if (h = f.lastIndexOf("."), h !== -1 && "]" !== d[d.length - 1]) {
                var k = f.length;
                f = f.substr(0, h), a.pos = b + (g - (k - h))
            } else a.pos -= 1;
        return {
            t: Ni,
            n: (i ? "..." : "") + f.replace(/^this\./, "./").replace(/^this$/, ".")
        }
    }

    function Bc(a) {
        if (!a.matchString("(")) return null;
        a.allowWhitespace();
        var b = Ec(a);
        return b || a.error(vj), a.allowWhitespace(), a.matchString(")") || a.error(wj), {
            t: Ri,
            x: b
        }
    }

    function Cc(a) {
        if (a.strictRefinement || a.allowWhitespace(), a.matchString(".")) {
            a.allowWhitespace();
            var b = a.matchPattern(Ej);
            if (b) return {
                t: Oi,
                n: b
            };
            a.error("Expected a property name")
        }
        if (a.matchString("[")) {
            a.allowWhitespace();
            var c = Ec(a);
            return c || a.error(vj), a.allowWhitespace(), a.matchString("]") || a.error("Expected ']'"), {
                t: Oi,
                x: c
            }
        }
        return null
    }

    function Dc(a) {
        var b, c, d, e;
        return (c = Wj(a)) ? (b = a.pos, a.allowWhitespace(), a.matchString("?") ? (a.allowWhitespace(), d = Ec(a), d || a.error(vj), a.allowWhitespace(), a.matchString(":") || a.error('Expected ":"'), a.allowWhitespace(), e = Ec(a), e || a.error(vj), {
            t: Si,
            o: [c, d, e]
        }) : (a.pos = b, c)) : null
    }

    function Ec(a) {
        return Dc(a)
    }

    function Fc(a) {
        function b(a) {
            for (var b = [], c = f - 1; c >= 0; c--) b.push("spread$" + c);
            return b.length ? "(function(){var " + b.join(",") + ";return(" + a + ");})()" : a
        }

        function c(a) {
            switch (a.t) {
                case Ji:
                case Li:
                case Fi:
                case Ki:
                    return a.v;
                case Gi:
                    return JSON.stringify(String(a.v));
                case Hi:
                    return "[" + (a.m ? a.m.map(c).join(",") : "") + "]";
                case Ii:
                    return "{" + (a.m ? a.m.map(c).join(",") : "") + "}";
                case Mi:
                    return a.k + ":" + c(a.v);
                case Qi:
                    return ("typeof" === a.s ? "typeof " : a.s) + c(a.o);
                case Ti:
                    return c(a.o[0]) + ("in" === a.s.substr(0, 2) ? " " + a.s + " " : a.s) + c(a.o[1]);
                case Ui:
                    if (a.spread) {
                        var b = f++;
                        return "(spread$" + b + " = " + c(a.x) + ").apply(spread$" + b + ", [].concat(" + (a.o ? a.o.map(function(a) {
                            return a.n && 0 === a.n.indexOf("...") ? c(a) : "[" + c(a) + "]"
                        }).join(",") : "") + ") )"
                    }
                    return c(a.x) + "(" + (a.o ? a.o.map(c).join(",") : "") + ")";
                case Ri:
                    return "(" + c(a.x) + ")";
                case Pi:
                    return c(a.x) + c(a.r);
                case Oi:
                    return a.n ? "." + a.n : "[" + c(a.x) + "]";
                case Si:
                    return c(a.o[0]) + "?" + c(a.o[1]) + ":" + c(a.o[2]);
                case Ni:
                    return "_" + d.indexOf(a.n);
                default:
                    throw new Error("Expected legal JavaScript")
            }
        }
        var d, e, f = 0;
        return Gc(a, d = []), e = c(a), d = d.map(function(a) {
            return 0 === a.indexOf("...") ? a.substr(3) : a
        }), {
            r: d,
            s: b(e)
        }
    }

    function Gc(a, b) {
        var c, d;
        if (a.t === Ni && b.indexOf(a.n) === -1 && b.unshift(a.n), d = a.o || a.m)
            if (m(d)) Gc(d, b);
            else
                for (c = d.length; c--;) d[c].n && 0 === d[c].n.indexOf("...") && (a.spread = !0), Gc(d[c], b);
        a.x && Gc(a.x, b), a.r && Gc(a.r, b), a.v && Gc(a.v, b)
    }

    function Hc(a) {
        a.allowWhitespace();
        var b = vc(a);
        if (!b) return null;
        var c = {
            key: b
        };
        if (a.allowWhitespace(), !a.matchString(":")) return null;
        a.allowWhitespace();
        var d = a.read();
        return d ? (c.value = d.v, c) : null
    }

    function Ic(a, b, c) {
        var d, e, f, g, h, i, j;
        if ("string" == typeof a) {
            if (c === bj || c === cj) {
                var k = new Vj("[" + a + "]");
                return {
                    a: Fc(k.result[0])
                }
            }
            if (c === aj && (e = dk.exec(a)) && (t("Unqualified method events are deprecated. Prefix methods with '@this.' to call methods on the current Ractive instance."), a = "@this." + e[1] + a.substr(e[1].length)), c === aj && ~a.indexOf("(")) {
                var l = new Vj("[" + a + "]");
                if (l.result && l.result[0]) return l.remaining().length && b.error("Invalid input after event expression '" + l.remaining() + "'"), {
                    x: Fc(l.result[0])
                };
                (a.indexOf(":") > a.indexOf("(") || !~a.indexOf(":")) && b.error("Invalid input in event expression '" + a + "'")
            }
            if (a.indexOf(":") === -1) return a.trim();
            a = [a]
        }
        if (d = {}, h = [], i = [], a) {
            for (; a.length;)
                if (f = a.shift(), "string" == typeof f) {
                    if (g = f.indexOf(":"), g !== -1) {
                        g && h.push(f.substr(0, g)), f.length > g + 1 && (i[0] = f.substring(g + 1));
                        break
                    }
                    h.push(f)
                } else h.push(f);
            i = i.concat(a)
        }
        return h.length ? i.length || "string" != typeof h ? (d = {
            n: 1 === h.length && "string" == typeof h[0] ? h[0] : h
        }, 1 === i.length && "string" == typeof i[0] ? (j = ck("[" + i[0] + "]"), d.a = j ? j.value : [i[0].trim()]) : d.d = i) : d = h : d = "", i.length && t("Proxy events with arguments are deprecated. You can fire events with arguments using \"@this.fire('eventName', arg1, arg2, ...)\"."), d
    }

    function Jc(a) {
        var b, c, d, e, f, g;
        if (a.allowWhitespace(), c = a.matchPattern(fk), !c) return null;
        for (f = c.length, e = 0; e < a.tags.length; e++) ~(g = c.indexOf(a.tags[e].open)) && g < f && (f = g);
        return f < c.length ? (a.pos -= c.length - f, c = c.substr(0, f), {
            n: c
        }) : (b = {
            n: c
        }, d = Kc(a), null != d && (b.f = d), b)
    }

    function Kc(a) {
        var b, c, d, e;
        return b = a.pos, /[=\/>\s]/.test(a.nextChar()) || a.error("Expected `=`, `/`, `>` or whitespace"), a.allowWhitespace(), a.matchString("=") ? (a.allowWhitespace(), c = a.pos, d = a.sectionDepth, e = Nc(a, "'") || Nc(a, '"') || Mc(a), null === e && a.error("Expected valid attribute value"), a.sectionDepth !== d && (a.pos = c, a.error("An attribute value must contain as many opening section tags as closing section tags")), e.length ? 1 === e.length && "string" == typeof e[0] ? qc(e[0]) : e : "") : (a.pos = b, null)
    }

    function Lc(a) {
        var b, c, d, e, f;
        return b = a.pos, (c = a.matchPattern(mk)) ? (d = c, e = a.tags.map(function(a) {
            return a.open
        }), (f = jj(d, e)) !== -1 && (c = c.substr(0, f), a.pos = b + c.length), c) : null
    }

    function Mc(a) {
        var b, c;
        for (a.inAttribute = !0, b = [], c = Qc(a) || Lc(a); c;) b.push(c), c = Qc(a) || Lc(a);
        return b.length ? (a.inAttribute = !1, b) : null
    }

    function Nc(a, b) {
        var c, d, e;
        if (c = a.pos, !a.matchString(b)) return null;
        for (a.inAttribute = b, d = [], e = Qc(a) || Oc(a, b); null !== e;) d.push(e), e = Qc(a) || Oc(a, b);
        return a.matchString(b) ? (a.inAttribute = !1, d) : (a.pos = c, null)
    }

    function Oc(a, b) {
        var c = a.remaining(),
            d = a.tags.map(function(a) {
                return a.open
            });
        d.push(b);
        var e = jj(c, d);
        return e === -1 && a.error("Quoted attribute value must have a closing quote"), e ? (a.pos += e, c.substr(0, e)) : null
    }

    function Pc(a) {
        var b, c, d;
        if (c = Jc(a), !c) return null;
        if (d = lk[c.n]) c.t = d.t, d.v && (c.v = d.v), delete c.n, d.t !== cj && d.t !== bj || (c.f = Ic(c.f, a)), d.t === cj ? t("" + ("t0" === d.v ? "intro-outro" : "t1" === d.v ? "intro" : "outro") + " is deprecated. To specify tranisitions, use the transition name suffixed with '-in', '-out', or '-in-out' as an attribute. Arguments can be specified in the attribute value as a simple list of expressions without mustaches.") : d.t === bj && t("decorator is deprecated. To specify decorators, use the decorator name prefixed with 'as-' as an attribute. Arguments can be specified in the attribute value as a simple list of expressions without mustaches.");
        else if (b = jk.exec(c.n)) delete c.n, c.t = bj, c.f = Ic(c.f, a, bj), "object" == typeof c.f ? c.f.n = b[1] : c.f = b[1];
        else if (b = kk.exec(c.n)) delete c.n, c.t = cj, c.f = Ic(c.f, a, cj), "object" == typeof c.f ? c.f.n = b[1] : c.f = b[1], c.v = "in-out" === b[2] ? "t0" : "in" === b[2] ? "t1" : "t2";
        else if (b = hk.exec(c.n)) c.n = b[1], c.t = aj, c.f = Ic(c.f, a, aj), ik.test(c.f.n || c.f) && (a.pos -= (c.f.n || c.f).length, a.error("Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)"));
        else {
            if (a.sanitizeEventAttributes && gk.test(c.n)) return {
                exclude: !0
            };
            c.f = c.f || ("" === c.f ? "" : 0), c.t = yi
        }
        return c
    }

    function Qc(a) {
        var b, c;
        if (a.interpolate[a.inside] === !1) return null;
        for (c = 0; c < a.tags.length; c += 1)
            if (b = Rc(a, a.tags[c])) return b;
        return a.inTag && !a.inAttribute && (b = Pc(a)) ? (a.allowWhitespace(), b) : void 0
    }

    function Rc(a, b) {
        var c, d, e, f;
        if (c = a.pos, a.matchString("\\" + b.open)) {
            if (0 === c || "\\" !== a.str[c - 1]) return b.open
        } else if (!a.matchString(b.open)) return null;
        if (d = nc(a)) return a.matchString(b.close) ? (b.open = d[0], b.close = d[1], a.sortMustacheTags(), nk) : null;
        if (a.allowWhitespace(), a.matchString("/")) {
            a.pos -= 1;
            var g = a.pos;
            if (oc(a)) a.pos = g;
            else {
                if (a.pos = g - b.close.length, a.inAttribute) return a.pos = c, null;
                a.error("Attempted to close a section that wasn't open")
            }
        }
        for (f = 0; f < b.readers.length; f += 1)
            if (e = b.readers[f], d = e(a, b)) return b.isStatic && (d.s = !0), a.includeLinePositions && (d.p = a.getLinePos(c)), d;
        return a.pos = c, null
    }

    function Sc(a, b) {
        var c;
        if (a) {
            for (; a.t === Ri && a.x;) a = a.x;
            return a.t === Ni ? b.r = a.n : (c = Tc(a)) ? b.rx = c : b.x = Fc(a), b
        }
    }

    function Tc(a) {
        for (var b, c = []; a.t === Pi && a.r.t === Oi;) b = a.r, b.x ? b.x.t === Ni ? c.unshift(b.x) : c.unshift(Fc(b.x)) : c.unshift(b.n), a = a.x;
        return a.t !== Ni ? null : {
            r: a.n,
            m: c
        }
    }

    function Uc(a, b) {
        var c, d = Ec(a);
        return d ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), c = {
            t: qi
        }, Sc(d, c), c) : null
    }

    function Vc(a, b) {
        var c, d;
        return a.matchString("&") ? (a.allowWhitespace(), (c = Ec(a)) ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), d = {
            t: qi
        }, Sc(c, d), d) : null) : null
    }

    function Wc(a) {
        var b, c = [],
            d = a.pos;
        if (a.allowWhitespace(), b = Xc(a)) {
            for (b.x = Sc(b.x, {}), c.push(b), a.allowWhitespace(); a.matchString(",");) b = Xc(a), b || a.error("Expected another alias."), b.x = Sc(b.x, {}), c.push(b), a.allowWhitespace();
            return c
        }
        return a.pos = d, null
    }

    function Xc(a) {
        var b, c, d = a.pos;
        return a.allowWhitespace(), (b = Ec(a, [])) ? (a.allowWhitespace(), a.matchPattern(pk) ? (a.allowWhitespace(), c = a.matchPattern(ok), c || a.error("Expected a legal alias name."), {
            n: c,
            x: b
        }) : (a.pos = d, null)) : (a.pos = d, null)
    }

    function Yc(a, b) {
        if (!a.matchString(">")) return null;
        a.allowWhitespace(), a.relaxedNames = a.strictRefinement = !0;
        var c = Ec(a);
        if (a.relaxedNames = a.strictRefinement = !1, !c) return null;
        var d = {
            t: vi
        };
        Sc(c, d), a.allowWhitespace();
        var e = Wc(a);
        if (e) d = {
            t: Ei,
            z: e,
            f: [d]
        };
        else {
            var f = Ec(a);
            f && (d = {
                t: ri,
                n: Yi,
                f: [d]
            }, Sc(f, d))
        }
        return a.allowWhitespace(), a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), d
    }

    function Zc(a, b) {
        var c;
        return a.matchString("!") ? (c = a.remaining().indexOf(b.close), c !== -1 ? (a.pos += c + b.close.length, {
            t: wi
        }) : void 0) : null
    }

    function $c(a, b) {
        var c, d, e;
        if (c = a.pos, d = Ec(a), !d) {
            var f = a.matchPattern(/^(\w+)/);
            return f ? {
                t: Ni,
                n: f
            } : null
        }
        for (e = 0; e < b.length; e += 1)
            if (a.remaining().substr(0, b[e].length) === b[e]) return d;
        return a.pos = c, Ac(a)
    }

    function _c(a, b) {
        var c, d, e, f;
        c = a.pos;
        try {
            d = $c(a, [b.close])
        } catch (a) {
            f = a
        }
        if (!d) {
            if ("!" === a.str.charAt(c)) return a.pos = c, null;
            if (f) throw f
        }
        if (!a.matchString(b.close) && (a.error("Expected closing delimiter '" + b.close + "' after reference"), !d)) {
            if ("!" === a.nextChar()) return null;
            a.error("Expected expression or legal reference")
        }
        return e = {
            t: pi
        }, Sc(d, e), e
    }

    function ad(a, b) {
        if (!a.matchPattern(qk)) return null;
        var c = a.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/);
        a.allowWhitespace(), a.matchString(b.close) || a.error("expected legal partial name");
        var d = {
            t: Bi
        };
        return c && (d.n = c), d
    }

    function bd(a, b) {
        var c, d, e, f;
        return c = a.pos, a.matchString(b.open) ? (a.allowWhitespace(), a.matchString("/") ? (a.allowWhitespace(), d = a.remaining(), e = d.indexOf(b.close), e !== -1 ? (f = {
            t: ti,
            r: d.substr(0, e).split(" ")[0]
        }, a.pos += e, a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), f) : (a.pos = c, null)) : (a.pos = c, null)) : null
    }

    function cd(a, b) {
        var c = a.pos;
        return a.matchString(b.open) ? a.matchPattern(rk) ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), {
            t: $i
        }) : (a.pos = c, null) : null
    }

    function dd(a, b) {
        var c = a.pos;
        if (!a.matchString(b.open)) return null;
        if (!a.matchPattern(sk)) return a.pos = c, null;
        var d = Ec(a);
        return a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), {
            t: _i,
            x: d
        }
    }

    function ed(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o = !1;
        if (c = a.pos, a.matchString("^")) e = {
            t: ri,
            f: [],
            n: Wi
        };
        else {
            if (!a.matchString("#")) return null;
            e = {
                t: ri,
                f: []
            }, a.matchString("partial") && (a.pos = c - a.standardDelimiters[0].length, a.error("Partial definitions can only be at the top level of the template, or immediately inside components")), (i = a.matchPattern(wk)) && (n = i, e.n = tk[i])
        }
        if (a.allowWhitespace(), "with" === i) {
            var p = Wc(a);
            p && (o = !0, e.z = p, e.t = Ei)
        } else if ("each" === i) {
            var q = Xc(a);
            q && (e.z = [{
                n: q.n,
                x: {
                    r: "."
                }
            }], d = q.x)
        }
        if (!o && (d || (d = Ec(a)), d || a.error("Expected expression"), m = a.matchPattern(uk))) {
            var r;
            (r = a.matchPattern(vk)) ? e.i = m + "," + r: e.i = m
        }
        a.allowWhitespace(), a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), a.sectionDepth += 1, g = e.f, k = [];
        do
            if (f = bd(a, b)) n && f.r !== n && a.error("Expected " + b.open + "/" + n + b.close), a.sectionDepth -= 1, l = !0;
            else if (!o && (f = dd(a, b))) {
            e.n === Wi && a.error("{{else}} not allowed in {{#unless}}"), h && a.error("illegal {{elseif...}} after {{else}}"), j || (j = []);
            var s = {
                t: ri,
                n: Vi,
                f: g = []
            };
            Sc(f.x, s), j.push(s)
        } else if (!o && (f = cd(a, b))) e.n === Wi && a.error("{{else}} not allowed in {{#unless}}"), h && a.error("there can only be one {{else}} block, at the end of a section"), h = !0, j || (j = []), j.push({
            t: ri,
            n: Wi,
            f: g = []
        });
        else {
            if (f = a.read(Vk), !f) break;
            g.push(f)
        }
        while (!l);
        return j && (e.l = j), o || Sc(d, e), e.f.length || delete e.f, e
    }

    function fd(a) {
        var b, c, d, e, f;
        return b = a.pos, a.matchString(xk) ? (d = a.remaining(), e = d.indexOf(yk), e === -1 && a.error("Illegal HTML - expected closing comment sequence ('-->')"), c = d.substr(0, e), a.pos += e + 3, f = {
            t: wi,
            c: c
        }, a.includeLinePositions && (f.p = a.getLinePos(b)), f) : null
    }

    function gd(a) {
        return "string" == typeof a
    }

    function hd(a) {
        return a.t === wi || a.t === xi
    }

    function id(a) {
        return (a.t === ri || a.t === si) && a.f
    }

    function jd(a, b, c, d, e) {
        if ("string" != typeof a) {
            var f, g, h, i, k, l, m, n;
            for (Bk(a), f = a.length; f--;) g = a[f], g.exclude ? a.splice(f, 1) : b && g.t === wi && a.splice(f, 1);
            for (Ck(a, d ? Fk : null, e ? Gk : null), f = a.length; f--;) {
                if (g = a[f], g.f) {
                    var o = g.t === ui && Ek.test(g.e);
                    k = c || o, !c && o && Ck(g.f, Hk, Ik), k || (h = a[f - 1], i = a[f + 1], (!h || "string" == typeof h && Gk.test(h)) && (l = !0), (!i || "string" == typeof i && Fk.test(i)) && (m = !0)), jd(g.f, b, k, l, m), j(g.f.n) && jd(g.f.n, b, c, l, e), j(g.f.d) && jd(g.f.d, b, c, l, e)
                }
                if (g.l && (jd(g.l, b, c, l, m), g.l.forEach(function(a) {
                        return a.l = 1
                    }), g.l.unshift(f + 1, 0), a.splice.apply(a, g.l), delete g.l), g.a)
                    for (n in g.a) g.a.hasOwnProperty(n) && "string" != typeof g.a[n] && jd(g.a[n], b, c, l, m);
                g.m && (jd(g.m, b, c, l, m), g.m.length < 1 && delete g.m)
            }
            for (f = a.length; f--;) "string" == typeof a[f] && ("string" == typeof a[f + 1] && (a[f] = a[f] + a[f + 1], a.splice(f + 1, 1)), c || (a[f] = a[f].replace(Dk, " ")), "" === a[f] && a.splice(f, 1))
        }
    }

    function kd(a) {
        var b, c;
        return b = a.pos, a.matchString("</") ? (c = a.matchPattern(Jk)) ? a.inside && c !== a.inside ? (a.pos = b, null) : {
            t: zi,
            e: c
        } : (a.pos -= 2, void a.error("Illegal closing tag")) : null
    }

    function ld(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m;
        if (b = a.pos, a.inside || a.inAttribute) return null;
        if (!a.matchString("<")) return null;
        if ("/" === a.nextChar()) return null;
        if (c = {}, a.includeLinePositions && (c.p = a.getLinePos(b)), a.matchString("!")) return c.t = Di, a.matchPattern(/^doctype/i) || a.error("Expected DOCTYPE declaration"), c.a = a.matchPattern(/^(.+?)>/), c;
        if (c.t = ui, c.e = a.matchPattern(Kk), !c.e) return null;
        for (Lk.test(a.nextChar()) || a.error("Illegal tag name"), a.allowWhitespace(), a.inTag = !0; d = Qc(a);) d !== !1 && (c.m || (c.m = []), c.m.push(d)), a.allowWhitespace();
        if (a.inTag = !1, a.allowWhitespace(), a.matchString("/") && (e = !0), !a.matchString(">")) return null;
        var n = c.e.toLowerCase(),
            o = a.preserveWhitespace;
        if (!e && !lj.test(c.e)) {
            a.elementStack.push(n), "script" !== n && "style" !== n && "textarea" !== n || (a.inside = n), f = [], g = ng(null);
            do
                if (k = a.pos, l = a.remaining(), l || a.error("Missing end " + (a.elementStack.length > 1 ? "tags" : "tag") + " (" + a.elementStack.reverse().map(function(a) {
                        return "</" + a + ">"
                    }).join("") + ")"), md(n, l))
                    if (m = kd(a)) {
                        j = !0;
                        var p = m.e.toLowerCase();
                        if (p !== n && (a.pos = k, !~a.elementStack.indexOf(p))) {
                            var q = "Unexpected closing tag";
                            lj.test(p) && (q += " (<" + p + "> is a void element - it cannot contain children)"), a.error(q)
                        }
                    } else(i = bd(a, {
                        open: a.standardDelimiters[0],
                        close: a.standardDelimiters[1]
                    })) ? (j = !0, a.pos = k) : (i = a.read(Wk)) ? (g[i.n] && (a.pos = k, a.error("Duplicate partial definition")), jd(i.f, a.stripComments, o, !o, !o), g[i.n] = i.f, h = !0) : (i = a.read(Vk)) ? f.push(i) : j = !0;
            else j = !0; while (!j);
            f.length && (c.f = f), h && (c.p = g), a.elementStack.pop()
        }
        return a.inside = null, a.sanitizeElements && a.sanitizeElements.indexOf(n) !== -1 ? Mk : c
    }

    function md(a, b) {
        var c, d;
        return c = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(b), d = ek[a], !c || !d || !~d.indexOf(c[1].toLowerCase())
    }

    function nd(a) {
        var b, c, d, e;
        return c = a.remaining(), a.textOnlyMode ? (d = a.tags.map(function(a) {
            return a.open
        }), d = d.concat(a.tags.map(function(a) {
            return "\\" + a.open
        })), b = jj(c, d)) : (e = a.inside ? "</" + a.inside : "<", a.inside && !a.interpolate[a.inside] ? b = c.indexOf(e) : (d = a.tags.map(function(a) {
            return a.open
        }), d = d.concat(a.tags.map(function(a) {
            return "\\" + a.open
        })), a.inAttribute === !0 ? d.push('"', "'", "=", "<", ">", "`") : a.inAttribute ? d.push(a.inAttribute) : d.push(e), b = jj(c, d))), b ? (b === -1 && (b = c.length), a.pos += b, a.inside && "textarea" !== a.inside || a.textOnlyMode ? c.substr(0, b) : qc(c.substr(0, b))) : null
    }

    function od(a) {
        var b = a.pos,
            c = a.standardDelimiters[0],
            d = a.standardDelimiters[1];
        if (!a.matchPattern(Ok) || !a.matchString(c)) return a.pos = b, null;
        var e = a.matchPattern(Pk);
        if (t("Inline partial comments are deprecated.\nUse this...\n  {{#partial " + e + "}} ... {{/partial}}\n\n...instead of this:\n  <!-- {{>" + e + "}} --> ... <!-- {{/" + e + "}} -->'"), !a.matchString(d) || !a.matchPattern(Qk)) return a.pos = b, null;
        var f, g = [],
            h = new RegExp("^<!--\\s*" + pc(c) + "\\s*\\/\\s*" + e + "\\s*" + pc(d) + "\\s*-->");
        do
            if (a.matchPattern(h)) f = !0;
            else {
                var i = a.read(Vk);
                i || a.error("expected closing comment ('<!-- " + c + "/" + e + d + " -->')"), g.push(i)
            }
        while (!f);
        return {
            t: Ci,
            f: g,
            n: e
        }
    }

    function pd(a) {
        var b, c, d, e, f;
        b = a.pos;
        var g = a.standardDelimiters;
        if (!a.matchString(g[0])) return null;
        if (!a.matchPattern(Rk)) return a.pos = b, null;
        c = a.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-\/]*/), c || a.error("expected legal partial name"), a.allowWhitespace(), a.matchString(g[1]) || a.error("Expected closing delimiter '" + g[1] + "'"), d = [];
        do(e = bd(a, {
            open: a.standardDelimiters[0],
            close: a.standardDelimiters[1]
        })) ? ("partial" === !e.r && a.error("Expected " + g[0] + "/partial" + g[1]), f = !0) : (e = a.read(Vk), e || a.error("Expected " + g[0] + "/partial" + g[1]), d.push(e)); while (!f);
        return {
            t: Ci,
            n: c,
            f: d
        }
    }

    function qd(a) {
        for (var b = [], c = ng(null), d = !1, e = a.preserveWhitespace; a.pos < a.str.length;) {
            var f, g, h = a.pos;
            (g = a.read(Wk)) ? (c[g.n] && (a.pos = h, a.error("Duplicated partial definition")), jd(g.f, a.stripComments, e, !e, !e), c[g.n] = g.f, d = !0) : (f = a.read(Vk)) ? b.push(f): a.error("Unexpected template content")
        }
        var i = {
            v: gi,
            t: b
        };
        return d && (i.p = c), i
    }

    function rd(a, b) {
        Object.keys(a).forEach(function(c) {
            if (sd(c, a)) return td(a, b);
            var d = a[c];
            ud(d) && rd(d, b)
        })
    }

    function sd(a, b) {
        return "s" === a && j(b.r)
    }

    function td(a, b) {
        var c = a.s,
            d = a.r;
        b[c] || (b[c] = jc(c, d.length))
    }

    function ud(a) {
        return j(a) || m(a)
    }

    function vd(a, b) {
        return new Nk(a, b || {}).result
    }

    function wd(a, b, c) {
        a || o("Missing Ractive.parse - cannot parse " + b + ". " + c)
    }

    function xd(a, b) {
        return wd(jc, "new expression function", Yk), jc(a, b)
    }

    function yd(a, b) {
        return wd(kc, 'compution string "${str}"', Zk), kc(a, b)
    }

    function zd(a) {
        var b = a._config.template;
        if (b && b.fn) {
            var c = Ad(a, b.fn);
            return c !== b.result ? (b.result = c, c) : void 0
        }
    }

    function Ad(a, b) {
        return b.call(a, {
            fromId: $k.fromId,
            isParsed: $k.isParsed,
            parse: function(b, c) {
                return void 0 === c && (c = $k.getParseOptions(a)), $k.parse(b, c)
            }
        })
    }

    function Bd(a, b) {
        return "string" == typeof a ? a = Cd(a, b) : (Dd(a), mc(a)), a
    }

    function Cd(a, b) {
        return "#" === a[0] && (a = $k.fromId(a)), $k.parseFor(a, b)
    }

    function Dd(a) {
        if (void 0 == a) throw new Error("The template cannot be " + a + ".");
        if ("number" != typeof a.v) throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");
        if (a.v !== gi) throw new Error("Mismatched template version (expected " + gi + ", got " + a.v + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app")
    }

    function Ed(a, b, c) {
        if (b)
            for (var d in b) !c && a.hasOwnProperty(d) || (a[d] = b[d])
    }

    function Fd(a, b, c) {
        function d() {
            var a = Gd(d._parent, b),
                e = "_super" in this,
                f = this._super;
            this._super = a;
            var g = c.apply(this, arguments);
            return e ? this._super = f : delete this._super, g
        }
        return /_super/.test(c) ? (d._parent = a, d._method = c, d) : c
    }

    function Gd(a, b) {
        if (b in a) {
            var c = a[b];
            return "function" == typeof c ? c : function() {
                return c
            }
        }
        return xg
    }

    function Hd(a, b, c) {
        return "options." + a + " has been deprecated in favour of options." + b + "." + (c ? " You cannot specify both options, please use options." + b + "." : "")
    }

    function Id(a, b, c) {
        if (b in a) {
            if (c in a) throw new Error(Hd(b, c, !0));
            s(Hd(b, c)), a[c] = a[b]
        }
    }

    function Jd(a) {
        Id(a, "beforeInit", "onconstruct"), Id(a, "init", "onrender"), Id(a, "complete", "oncomplete"), Id(a, "eventDefinitions", "events"), j(a.adaptors) && Id(a, "adaptors", "adapt")
    }

    function Kd(a, b, c, d) {
        Jd(d);
        for (var e in d)
            if (fl.hasOwnProperty(e)) {
                var f = d[e];
                "el" !== e && "function" == typeof f ? s("" + e + " is a Ractive option that does not expect a function and will be ignored", "init" === a ? c : null) : c[e] = f
            }
        if (d.append && d.enhance) throw new Error("Cannot use append and enhance at the same time");
        cl.forEach(function(e) {
            e[a](b, c, d)
        }), $h[a](b, c, d), _k[a](b, c, d), ei[a](b, c, d), Ld(b.prototype, c, d)
    }

    function Ld(a, b, c) {
        for (var d in c)
            if (!gl[d] && c.hasOwnProperty(d)) {
                var e = c[d];
                "function" == typeof e && (e = Fd(a, d, e)), b[d] = e
            }
    }

    function Md(a) {
        var b = {};
        return a.forEach(function(a) {
            return b[a] = !0
        }), b
    }

    function Nd(a) {
        if (a = a || {}, "object" != typeof a) throw new Error("The reset method takes either no arguments, or an object containing new data");
        a = fi.init(this.constructor, this, {
            data: a
        });
        var b = Pg.start(this, !0),
            c = this.viewmodel.wrapper;
        c && c.reset ? c.reset(a) === !1 && this.viewmodel.set(a) : this.viewmodel.set(a);
        for (var d, e = il.reset(this), f = e.length; f--;)
            if (jl.indexOf(e[f]) > -1) {
                d = !0;
                break
            }
        return d && (nl.fire(this), this.fragment.resetTemplate(this.template), ml.fire(this), kl.fire(this)), Pg.end(), ll.fire(this, a), b
    }

    function Od(a, b, c, d) {
        a.forEach(function(a) {
            if (a.type === vi && (a.refName === b || a.name === b)) return a.inAttribute = c, void d.push(a);
            if (a.fragment) Od(a.fragment.iterations || a.fragment.items, b, c, d);
            else if (j(a.items)) Od(a.items, b, c, d);
            else if (a.type === Ai && a.instance) {
                if (a.instance.partials[b]) return;
                Od(a.instance.fragment.items, b, c, d)
            }
            a.type === ui && j(a.attributes) && Od(a.attributes, b, !0, d)
        })
    }

    function Pd(a) {
        a.forceResetTemplate()
    }

    function Qd(a, b, c) {
        var d = a.fragment.resolve(b, function(b) {
            D(a.resolvers, d), a.models[c] = b, a.bubble()
        });
        a.resolvers.push(d)
    }

    function Rd(a, b) {
        return b.r ? Va(a, b.r) : b.x ? new rl(a, b.x) : b.rx ? new tl(a, b.rx) : void 0
    }

    function Sd(a) {
        if (a.template.z) {
            a.aliases = {};
            for (var b = a.template.z, c = 0; c < b.length; c++) a.aliases[b[c].n] = Rd(a.parentFragment, b[c].x)
        }
    }

    function Td(a, b) {
        for (void 0 === b && (b = !0); a && a.type !== ui && (!b || a.type !== Ai);) a = a.owner ? a.owner : a.component ? a.component.parentFragment : a.parent ? a.parent : a.parentFragment ? a.parentFragment : void 0;
        return a
    }

    function Ud(a) {
        var b = [];
        return "string" != typeof a ? {} : a.replace(zl, function(a) {
            return "\0" + (b.push(a) - 1)
        }).replace(yl, "").split(";").filter(function(a) {
            return !!a.trim()
        }).map(function(a) {
            return a.replace(Al, function(a, c) {
                return b[c]
            })
        }).reduce(function(a, b) {
            var c = b.indexOf(":"),
                d = vl(b.substr(0, c).trim());
            return a[xl[d] || d] = b.substr(c + 1).trim(), a
        }, {})
    }

    function Vd(a) {
        for (var b = a.split(wl), c = b.length; c--;) b[c] || b.splice(c, 1);
        return b
    }

    function Wd(a) {
        var b = a.element,
            c = a.name;
        if ("id" === c) return Xd;
        if ("value" === c) {
            if (a.interpolator && (a.interpolator.bound = !0), "select" === b.name && "value" === c) return b.getAttribute("multiple") ? Yd : Zd;
            if ("textarea" === b.name) return be;
            if (null != b.getAttribute("contenteditable")) return $d;
            if ("input" === b.name) {
                var d = b.getAttribute("type");
                if ("file" === d) return xg;
                if ("radio" === d && b.binding && "name" === b.binding.attribute.name) return _d;
                if (~Bl.indexOf(d)) return be
            }
            return ae
        }
        var e = b.node;
        if (a.isTwoway && "name" === c) {
            if ("radio" === e.type) return ce;
            if ("checkbox" === e.type) return de
        }
        if ("style" === c) return ee;
        if (0 === c.indexOf("style-")) return fe;
        if ("class" === c && (!e.namespaceURI || e.namespaceURI === gg)) return ge;
        if (0 === c.indexOf("class-")) return he;
        if (a.isBoolean) {
            var f = b.getAttribute("type");
            return !a.interpolator || "checked" !== c || "checkbox" !== f && "radio" !== f || (a.interpolator.bound = !0), ie
        }
        return a.namespace && a.namespace !== a.node.namespaceURI ? ke : je
    }

    function Xd(a) {
        var b = this,
            c = b.node,
            d = this.getValue();
        return this.ractive.nodes[c.id] === c && delete this.ractive.nodes[c.id], a ? c.removeAttribute("id") : (this.ractive.nodes[d] = c, void(c.id = d))
    }

    function Yd(a) {
        var b = this.getValue();
        j(b) || (b = [b]);
        var c = this.node.options,
            d = c.length;
        if (a)
            for (; d--;) c[d].selected = !1;
        else
            for (; d--;) {
                var e = c[d],
                    f = e._ractive ? e._ractive.value : e.value;
                e.selected = z(b, f)
            }
    }

    function Zd(a) {
        var b = this.getValue();
        if (!this.locked) {
            this.node._ractive.value = b;
            var c = this.node.options,
                d = c.length,
                e = !1;
            if (a)
                for (; d--;) c[d].selected = !1;
            else
                for (; d--;) {
                    var f = c[d],
                        g = f._ractive ? f._ractive.value : f.value;
                    if (f.disabled && f.selected && (e = !0), g == b) return void(f.selected = !0)
                }
            e || (this.node.selectedIndex = -1)
        }
    }

    function $d(a) {
        var b = this.getValue();
        this.locked || (a ? this.node.innerHTML = "" : this.node.innerHTML = void 0 === b ? "" : b)
    }

    function _d(a) {
        var b = this.node,
            c = b.checked,
            d = this.getValue();
        return a ? b.checked = !1 : (b.value = this.node._ractive.value = d, b.checked = d === this.element.getAttribute("name"), void(c && !b.checked && this.element.binding && this.element.binding.rendered && this.element.binding.group.model.set(this.element.binding.group.getValue())))
    }

    function ae(a) {
        if (!this.locked) {
            if (a) return this.node.removeAttribute("value"), void(this.node.value = this.node._ractive.value = null);
            var b = this.getValue();
            this.node.value = this.node._ractive.value = b, this.node.setAttribute("value", b)
        }
    }

    function be(a) {
        if (!this.locked) {
            if (a) return this.node._ractive.value = "", void this.node.removeAttribute("value");
            var b = this.getValue();
            this.node._ractive.value = b, this.node.value = d(b), this.node.setAttribute("value", d(b))
        }
    }

    function ce(a) {
        a ? this.node.checked = !1 : this.node.checked = this.getValue() == this.node._ractive.value
    }

    function de(a) {
        var b = this,
            c = b.element,
            d = b.node,
            e = c.binding,
            f = this.getValue(),
            g = c.getAttribute("value");
        if (j(f)) {
            for (var h = f.length; h--;)
                if (g == f[h]) return void(e.isChecked = d.checked = !0);
            e.isChecked = d.checked = !1
        } else e.isChecked = d.checked = f == g
    }

    function ee(a) {
        for (var b = a ? {} : Ud(this.getValue() || ""), c = this.node.style, d = Object.keys(b), e = this.previous || [], f = 0; f < d.length;) d[f] in c && (c[d[f]] = b[d[f]]), f++;
        for (f = e.length; f--;) !~d.indexOf(e[f]) && e[f] in c && (c[e[f]] = "");
        this.previous = d
    }

    function fe(a) {
        this.styleName || (this.styleName = f(this.name.substr(6))), this.node.style[this.styleName] = a ? "" : this.getValue()
    }

    function ge(a) {
        for (var b = a ? [] : Vd(d(this.getValue())), c = Vd(this.node.className), e = this.previous || c.slice(0), f = 0; f < b.length;) ~c.indexOf(b[f]) || c.push(b[f]), f++;
        for (f = e.length; f--;)
            if (!~b.indexOf(e[f])) {
                var g = c.indexOf(e[f]);
                ~g && c.splice(g, 1)
            }
        var h = c.join(" ");
        h !== this.node.className && (this.node.className = h), this.previous = b
    }

    function he(a) {
        var b = this.name.substr(6),
            c = Vd(this.node.className),
            d = !a && this.getValue();
        this.inlineClass || (this.inlineClass = b), d && !~c.indexOf(b) ? c.push(b) : !d && ~c.indexOf(b) && c.splice(c.indexOf(b), 1), this.node.className = c.join(" ")
    }

    function ie(a) {
        if (!this.locked) {
            if (a) return this.useProperty && (this.node[this.propertyName] = !1), void this.node.removeAttribute(this.propertyName);
            this.useProperty ? this.node[this.propertyName] = this.getValue() : this.getValue() ? this.node.setAttribute(this.propertyName, "") : this.node.removeAttribute(this.propertyName)
        }
    }

    function je(a) {
        a ? this.node.removeAttribute(this.name) : this.node.setAttribute(this.name, d(this.getString()))
    }

    function ke(a) {
        a ? this.node.removeAttributeNS(this.namespace, this.name.slice(this.name.indexOf(":") + 1)) : this.node.setAttributeNS(this.namespace, this.name.slice(this.name.indexOf(":") + 1), d(this.getString()))
    }

    function le(a, b) {
        for (var c = "xmlns:" + b; a;) {
            if (a.hasAttribute && a.hasAttribute(c)) return a.getAttribute(c);
            a = a.parentNode
        }
        return mg[b]
    }

    function me(a, b, c) {
        0 === b ? a.value = !0 : "true" === b ? a.value = !0 : "false" === b || "0" === b ? a.value = !1 : a.value = b;
        var d = a.element[a.flag];
        return a.element[a.flag] = a.value, c && !a.element.attributes.binding && d !== a.value && a.element.recreateTwowayBinding(), a.value
    }

    function ne() {
        return Gl
    }

    function oe(a) {
        Gl = !0, a(), Gl = !1
    }

    function pe(a, b) {
        var c = b ? "svg" : "div";
        return a ? (Fl.innerHTML = "<" + c + " " + a + "></" + c + ">") && E(Fl.childNodes[0].attributes) : []
    }

    function qe(a, b) {
        for (var c = a.length; c--;)
            if (a[c].name === b.name) return !1;
        return !0
    }

    function re(a, b, c, d) {
        if (a.set && a.set.__magic) return a.set.__magic.dependants.push({
            ractive: b,
            keypath: c
        }), a;
        var e, f = [{
                ractive: b,
                keypath: c
            }],
            g = {
                get: function() {
                    return "value" in a ? a.value : a.get.call(this)
                },
                set: function(b) {
                    e || ("value" in a ? a.value = b : a.set.call(this, b), d.locked || (e = !0, f.forEach(function(a) {
                        var c = a.ractive,
                            d = a.keypath;
                        c.set(d, b)
                    }), e = !1))
                },
                enumerable: !0
            };
        return g.set.__magic = {
            dependants: f,
            originalDescriptor: a
        }, g
    }

    function se(a, b, c) {
        if (!a.set || !a.set.__magic) return !0;
        for (var d = a.set.__magic, e = d.length; e--;) {
            var f = d[e];
            if (f.ractive === b && f.keypath === c) return d.splice(e, 1), !1
        }
    }

    function te(a) {
        var b = a.replace(/^\t+/gm, function(a) {
                return a.split("\t").join("  ")
            }).split("\n"),
            c = b.length < 2 ? 0 : b.slice(1).reduce(function(a, b) {
                return Math.min(a, /^\s*/.exec(b)[0].length)
            }, 1 / 0);
        return b.map(function(a, b) {
            return "    " + (b ? a.substring(c) : a)
        }).join("\n")
    }

    function ue(a) {
        if (!a) return "";
        for (var b = a.split("\n"), c = Wl.name + ".getValue", d = [], e = b.length, f = 1; f < e; f += 1) {
            var g = b[f];
            if (~g.indexOf(c)) return d.join("\n");
            d.push(g)
        }
    }

    function ve(a, b, c) {
        var d, e, f, g, h;
        return "function" == typeof c && (d = T(c, a), f = c.toString(), g = !0), "string" == typeof c && (d = yd(c, a), f = c), "object" == typeof c && ("string" == typeof c.get ? (d = yd(c.get, a), f = c.get) : "function" == typeof c.get ? (d = T(c.get, a), f = c.get.toString(), g = !0) : o("`%s` computation must have a `get()` method", b), "function" == typeof c.set && (e = T(c.set, a), h = c.set.toString())), {
            getter: d,
            setter: e,
            getterString: f,
            setterString: h,
            getterUseStack: g
        }
    }

    function we(a, b) {
        Of.DEBUG && ug(), ze(a), og(a, "data", {
            get: Ae
        }), $l.fire(a, b), _l.forEach(function(c) {
            a[c] = h(ng(a.constructor[c] || null), b[c])
        });
        var c = new Zl({
            adapt: ye(a, a.adapt, b),
            data: fi.init(a.constructor, a, b),
            ractive: a
        });
        a.viewmodel = c;
        var d = h(ng(a.constructor.prototype.computed), b.computed);
        for (var e in d) {
            var f = ve(a, e, d[e]);
            c.compute(e, f);
        }
    }

    function xe(a, b) {
        for (var c = a.slice(), d = b.length; d--;) ~c.indexOf(b[d]) || c.push(b[d]);
        return c
    }

    function ye(a, b, c) {
        function d(b) {
            return "string" == typeof b && (b = u("adaptors", a, b), b || o(Dg(b, "adaptor"))), b
        }
        b = b.map(d);
        var e = B(c.adapt).map(d);
        e = xe(b, e);
        var f = "magic" in c ? c.magic : a.magic,
            g = "modifyArrays" in c ? c.modifyArrays : a.modifyArrays;
        if (f) {
            if (!Pf) throw new Error("Getters and setters (magic mode) are not supported in this browser");
            g && e.push(Vl), e.push(Sl)
        }
        return g && e.push(Pl), e
    }

    function ze(a) {
        a._guid = "r-" + am++, a._subs = ng(null), a._config = {}, a.nodes = {}, a.event = null, a._eventQueue = [], a._liveQueries = [], a._liveComponentQueries = [], a._observers = [], a.component || (a.root = a, a.parent = a.container = null)
    }

    function Ae() {
        throw new Error("Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead")
    }

    function Be(a, b) {
        return a[b._guid] || (a[b._guid] = [])
    }

    function Ce(a, b) {
        var c = Be(a.queue, b);
        for (a.hook.fire(b); c.length;) Ce(a, c.shift());
        delete a.queue[b._guid]
    }

    function De(a, c, d) {
        Object.keys(a.viewmodel.computations).forEach(function(b) {
            var c = a.viewmodel.computations[b];
            a.viewmodel.value.hasOwnProperty(b) && c.set(a.viewmodel.value[b])
        }), il.init(a.constructor, a, c), cm.fire(a), dm.begin(a);
        var e;
        if (a.template) {
            var f;
            (d.cssIds || a.cssId) && (f = d.cssIds ? d.cssIds.slice() : [], a.cssId && f.push(a.cssId)), a.fragment = e = new An({
                owner: a,
                template: a.template,
                cssIds: f
            }).bind(a.viewmodel)
        }
        if (dm.end(a), e) {
            var g = b(a.el);
            if (g) {
                var h = a.render(g, a.append);
                Of.DEBUG_PROMISES && h.catch(function(b) {
                    throw t("Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;"), s("An error happened during rendering", {
                        ractive: a
                    }), p(b), b
                })
            }
        }
    }

    function Ee(a) {
        var b = a.ractive;
        do
            for (var c = b._liveComponentQueries, d = c.length; d--;) {
                var e = c[d],
                    f = c["_" + e];
                f.test(a) && (f.add(a.instance), a.liveQueries.push(f))
            }
        while (b = b.parent)
    }

    function Fe(a) {
        for (var b = a.ractive; b;) {
            var c = b._liveComponentQueries["_" + a.name];
            c && c.remove(a), b = b.parent
        }
    }

    function Ge(a) {
        a.makeDirty()
    }

    function He(a) {
        var b = a.node,
            c = a.ractive;
        do
            for (var d = c._liveQueries, e = d.length; e--;) {
                var f = d[e],
                    g = d["_" + f];
                g.test(b) && (g.add(b), a.liveQueries.push(g))
            }
        while (c = c.parent)
    }

    function Ie(a) {
        for (; a = a.parent;)
            if ("form" === a.name) return a
    }

    function Je(a, b) {
        t("The " + a + " being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", {
            ractive: b
        })
    }

    function Ke() {
        this._ractive.binding.handleChange()
    }

    function Le(a, b, c) {
        var d = "" + a + "-bindingGroup";
        return b[d] || (b[d] = new rm(d, b, c))
    }

    function Me() {
        var a = this.bindings.filter(function(a) {
                return a.node && a.node.checked
            }).map(function(a) {
                return a.element.getAttribute("value")
            }),
            b = [];
        return a.forEach(function(a) {
            z(b, a) || b.push(a)
        }), b
    }

    function Ne() {
        Ke.call(this);
        var a = this._ractive.binding.model.get();
        this.value = void 0 == a ? "" : a
    }

    function Oe(a) {
        var b;
        return function() {
            var c = this;
            b && clearTimeout(b), b = setTimeout(function() {
                var a = c._ractive.binding;
                a.rendered && Ke.call(c), b = null
            }, a)
        }
    }

    function Pe(a) {
        return a.selectedOptions ? E(a.selectedOptions) : a.options ? E(a.options).filter(function(a) {
            return a.selected
        }) : []
    }

    function Qe(a) {
        return ym[a] || (ym[a] = [])
    }

    function Re() {
        var a = this.bindings.filter(function(a) {
            return a.node.checked
        });
        if (a.length > 0) return a[0].element.getAttribute("value")
    }

    function Se(a) {
        return a && a.template.f && 1 === a.template.f.length && a.template.f[0].t === pi && !a.template.f[0].s
    }

    function Te(a) {
        var b = a.attributeByName;
        if (a.getAttribute("contenteditable") || Se(b.contenteditable)) return Se(b.value) ? um : null;
        if ("input" === a.name) {
            var c = a.getAttribute("type");
            if ("radio" === c || "checkbox" === c) {
                var d = Se(b.name),
                    e = Se(b.checked);
                if (d && e) {
                    if ("radio" !== c) return qm;
                    s("A radio input can have two-way binding on its name attribute, or its checked attribute - not both", {
                        ractive: a.root
                    })
                }
                if (d) return "radio" === c ? Am : tm;
                if (e) return "radio" === c ? zm : qm
            }
            return "file" === c && Se(b.value) ? pm : Se(b.value) ? "number" === c || "range" === c ? xm : vm : null
        }
        return "select" === a.name && Se(b.value) ? a.getAttribute("multiple") ? wm : Bm : "textarea" === a.name && Se(b.value) ? vm : void 0
    }

    function Ue(a) {
        a.makeDirty()
    }

    function Ve(a) {
        var b = a.attributeByName,
            c = b.type,
            d = b.value,
            e = b.name;
        if (c && "radio" === c.value && d && e.interpolator) return d.getValue() === e.interpolator.model.get() || void 0
    }

    function We(a) {
        var b = a.toString();
        return b ? " " + b : ""
    }

    function Xe(a) {
        for (var b = a.liveQueries.length; b--;) {
            var c = a.liveQueries[b];
            c.remove(a.node)
        }
    }

    function Ye(a) {
        var b = a.getAttribute("xmlns");
        if (b) return b;
        if ("svg" === a.name) return ig;
        var c = a.parent;
        return c ? "foreignobject" === c.name ? gg : c.node.namespaceURI : a.ractive.el.namespaceURI
    }

    function Ze() {
        var a = this._ractive.proxy;
        Pg.start(), a.formBindings.forEach($e), Pg.end()
    }

    function $e(a) {
        a.model.set(a.resetValue)
    }

    function _e(a) {
        var b = a.template.f,
            c = a.element.instance.viewmodel,
            d = c.value;
        1 === b.length && b[0].t === pi ? (a.model = Rd(a.parentFragment, b[0]), a.model || (t("The " + a.name + "='{{" + b[0].r + "}}' mapping is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", {
            ractive: a.element.instance
        }), a.parentFragment.ractive.get(a.name), a.model = a.parentFragment.findContext().joinKey(a.name)), a.link = c.createLink(a.name, a.model, b[0].r), void 0 === a.model.get() && a.name in d && a.model.set(d[a.name])) : (a.boundFragment = new An({
            owner: a,
            template: b
        }).bind(), a.model = c.joinKey(a.name), a.model.set(a.boundFragment.valueOf()), a.boundFragment.bubble = function() {
            An.prototype.bubble.call(a.boundFragment), Pg.scheduleTask(function() {
                a.boundFragment.update(), a.model.set(a.boundFragment.valueOf())
            })
        })
    }

    function af(a) {
        for (; a;) {
            if ("select" === a.name) return a;
            a = a.parent
        }
    }

    function bf(a, b, c) {
        var d = cf(a, b, c || {});
        if (d) return d;
        if (d = $k.fromId(b, {
                noThrow: !0
            })) {
            var e = $k.parseFor(d, a);
            return e.p && i(a.partials, e.p), a.partials[b] = e.t
        }
    }

    function cf(a, b, c) {
        var d = ff(b, c.owner);
        if (d) return d;
        var e = v("partials", a, b);
        if (e) {
            d = e.partials[b];
            var f;
            if ("function" == typeof d && (f = d.bind(e), f.isOwner = e.partials.hasOwnProperty(b), d = f.call(a, $k)), !d && "" !== d) return void s(Cg, b, "partial", "partial", {
                ractive: a
            });
            if (!$k.isParsed(d)) {
                var g = $k.parseFor(d, e);
                g.p && s("Partials ({{>%s}}) cannot contain nested inline partials", b, {
                    ractive: a
                });
                var h = f ? e : df(e, b);
                h.partials[b] = d = g.t
            }
            return f && (d._fn = f), d.v ? d.t : d
        }
    }

    function df(a, b) {
        return a.partials.hasOwnProperty(b) ? a : ef(a.constructor, b)
    }

    function ef(a, b) {
        if (a) return a.partials.hasOwnProperty(b) ? a : ef(a._Parent, b)
    }

    function ff(a, b) {
        if (b) {
            if (b.template && b.template.p && b.template.p[a]) return b.template.p[a];
            if (b.parentFragment && b.parentFragment.owner) return ff(a, b.parentFragment.owner)
        }
    }

    function gf(a, b, c) {
        var d;
        try {
            d = $k.parse(b, $k.getParseOptions(c))
        } catch (b) {
            s("Could not parse partial from expression '" + a + "'\n" + b.message)
        }
        return d || {
            t: []
        }
    }

    function hf(a) {
        return !a || j(a) && 0 === a.length || m(a) && 0 === Object.keys(a).length
    }

    function jf(a, b) {
        return b || j(a) ? Xi : m(a) || "function" == typeof a ? Zi : void 0 === a ? null : Vi
    }

    function kf(a, b) {
        for (var c = a.length; c--;)
            if (a[c] == b) return !0
    }

    function lf() {
        Tm = !Uf[Vm]
    }

    function mf() {
        Tm = !1
    }

    function nf() {
        Tm = !0
    }

    function of(a, b) {
        b ? a.setAttribute("style", b) : (a.getAttribute("style"), a.removeAttribute("style"))
    }

    function pf(a) {
        return un[a] || (un[a] = Xf(a))
    }

    function qf(a, b) {
        var c, d = v("components", a, b);
        if (d && (c = d.components[b], !c._Parent)) {
            var e = c.bind(d);
            if (e.isOwner = d.components.hasOwnProperty(b), c = e(), !c) return void s(Cg, b, "component", "component", {
                ractive: a
            });
            "string" == typeof c && (c = qf(a, c)), c._fn = e, d.components[b] = c
        }
        return c
    }

    function rf(a) {
        if ("string" == typeof a.template) return new Qm(a);
        if (a.template.t === ui) {
            var b = qf(a.parentFragment.ractive, a.template.e);
            if (b) return new lm(a, b);
            var c = a.template.e.toLowerCase(),
                d = zn[c] || Dm;
            return new d(a)
        }
        var e;
        if (a.template.t === yi) {
            var f = a.owner;
            (!f || f.type !== Ai && f.type !== ui) && (f = Td(a.parentFragment)), a.element = f, e = f.type === Ai ? Im : Dl
        } else e = yn[a.template.t];
        if (!e) throw new Error("Unrecognised item type " + a.template.t);
        return new e(a)
    }

    function sf(a, b, c, d) {
        return void 0 === d && (d = 0), a.map(function(a) {
            if (a.type === oi) return a.template;
            if (a.fragment) return a.fragment.iterations ? a.fragment.iterations.map(function(a) {
                return sf(a.items, b, c, d)
            }).join("") : sf(a.fragment.items, b, c, d);
            var e = "" + c + "-" + d++,
                f = a.model || a.newModel;
            return b[e] = f ? f.wrapper ? f.wrapper.value : f.get() : void 0, "${" + e + "}"
        }).join("")
    }

    function tf(a) {
        a.unrender(!0)
    }

    function uf(b) {
        _k.init(null, this, {
            template: b
        });
        var c = this.transitionsEnabled;
        this.transitionsEnabled = !1;
        var d = this.component;
        d && (d.shouldDestroy = !0), this.unrender(), d && (d.shouldDestroy = !1), this.fragment.unbind().unrender(!0), this.fragment = new An({
            template: this.template,
            root: this,
            owner: this
        });
        var e = a();
        this.fragment.bind(this.viewmodel).render(e), d ? this.fragment.findParentNode().insertBefore(e, d.findNextNode()) : this.el.insertBefore(e, this.anchor), this.transitionsEnabled = c
    }

    function vf(a, b) {
        var c = this;
        return U(c, W(c, a, b))
    }

    function wf(a, b) {
        return X(this, a, void 0 === b ? -1 : -b)
    }

    function xf() {
        if (this.torndown) return s("ractive.teardown() was called on a Ractive instance that was already torn down"), Lg.resolve();
        this.torndown = !0, this.fragment.unbind(), this.viewmodel.teardown(), this._observers.forEach(Aa), this.fragment.rendered && this.el.__ractive_instances__ && D(this.el.__ractive_instances__, this), this.shouldDestroy = !0;
        var a = this.fragment.rendered ? this.unrender() : Lg.resolve();
        return Fn.fire(this), a
    }

    function yf(a) {
        if ("string" != typeof a) throw new TypeError(Bg);
        return U(this, V(this, a).map(function(a) {
            return [a, !a.get()]
        }))
    }

    function zf() {
        var a = [this.cssId].concat(this.findAllComponents().map(function(a) {
                return a.cssId
            })),
            b = Object.keys(a.reduce(function(a, b) {
                return a[b] = !0, a
            }, {}));
        return Xb(b)
    }

    function Af() {
        return this.fragment.toString(!0)
    }

    function Bf(a, b, c) {
        b instanceof HTMLElement || m(b) && (c = b), b = b || this.event.node, b && b._ractive || o("No node was supplied for transition " + a), c = c || {};
        var d = b._ractive.proxy,
            e = new rn({
                owner: d,
                parentFragment: d.parentFragment,
                name: a,
                params: c
            });
        e.bind();
        var f = Pg.start(this, !0);
        return Pg.registerTransition(e), Pg.end(), f.then(function() {
            return e.unbind()
        }), f
    }

    function Cf(a) {
        var b = Pg.start();
        return this.viewmodel.joinAll(R(a), {
            lastLink: !1
        }).unlink(), Pg.end(), b
    }

    function Df() {
        if (!this.fragment.rendered) return s("ractive.unrender() was called on a Ractive instance that was not rendered"), Lg.resolve();
        var a = Pg.start(this, !0),
            b = !this.component || this.component.shouldDestroy || this.shouldDestroy;
        return this.fragment.unrender(b), D(this.el.__ractive_instances__, this), Gn.fire(this), Pg.end(), a
    }

    function Ef(a, b) {
        var c = Pg.start(this, !0);
        return a ? this.viewmodel.joinAll(R(a)).updateFromBindings(b !== !1) : this.viewmodel.updateFromBindings(!0), Pg.end(), c
    }

    function Ff(a, b) {
        return "function" == typeof b && /_super/.test(a)
    }

    function Gf(a) {
        for (var b = {}; a;) Hf(a, b), Jf(a, b), a = a._Parent !== Of && a._Parent;
        return b
    }

    function Hf(a, b) {
        cl.forEach(function(c) {
            If(c.useDefaults ? a.prototype : a, b, c.name)
        })
    }

    function If(a, b, c) {
        var d, e = Object.keys(a[c]);
        e.length && ((d = b[c]) || (d = b[c] = {}), e.filter(function(a) {
            return !(a in d)
        }).forEach(function(b) {
            return d[b] = a[c][b]
        }))
    }

    function Jf(a, b) {
        Object.keys(a.prototype).forEach(function(c) {
            if ("computed" !== c) {
                var d = a.prototype[c];
                if (c in b) {
                    if ("function" == typeof b[c] && "function" == typeof d && b[c]._method) {
                        var e, f = d._method;
                        f && (d = d._method), e = Jn(b[c]._method, d), f && (e._method = e), b[c] = e
                    }
                } else b[c] = d._method ? d._method : d
            }
        })
    }

    function Kf() {
        for (var a = [], b = arguments.length; b--;) a[b] = arguments[b];
        return a.length ? a.reduce(Lf, this) : Lf(this)
    }

    function Lf(a, b) {
        void 0 === b && (b = {});
        var c, d;
        return b.prototype instanceof Of && (b = Gf(b)), c = function(a) {
            return this instanceof c ? (we(this, a || {}), void De(this, a || {}, {})) : new c(a)
        }, d = ng(a.prototype), d.constructor = c, pg(c, {
            defaults: {
                value: d
            },
            extend: {
                value: Kf,
                writable: !0,
                configurable: !0
            },
            _Parent: {
                value: a
            }
        }), il.extend(a, d, b), fi.extend(a, d, b), b.computed && (d.computed = h(ng(a.prototype.computed), b.computed)), c.prototype = d, c
    }

    function Mf() {
        for (var a = [], b = arguments.length; b--;) a[b] = arguments[b];
        return a.map(P).join(".")
    }

    function Nf(a) {
        return R(a).map(S)
    }

    function Of(a) {
        return this instanceof Of ? (we(this, a || {}), void De(this, a || {}, {})) : new Of(a)
    }
    var Pf, Qf = {
            el: void 0,
            append: !1,
            template: null,
            delimiters: ["{{", "}}"],
            tripleDelimiters: ["{{{", "}}}"],
            staticDelimiters: ["[[", "]]"],
            staticTripleDelimiters: ["[[[", "]]]"],
            csp: !0,
            interpolate: !1,
            preserveWhitespace: !1,
            sanitize: !1,
            stripComments: !0,
            data: {},
            computed: {},
            magic: !1,
            modifyArrays: !1,
            adapt: [],
            isolated: !1,
            twoway: !0,
            lazy: !1,
            noIntro: !1,
            transitionsEnabled: !0,
            complete: void 0,
            css: null,
            noCssTransform: !1
        },
        Rf = {
            linear: function(a) {
                return a
            },
            easeIn: function(a) {
                return Math.pow(a, 3)
            },
            easeOut: function(a) {
                return Math.pow(a - 1, 3) + 1
            },
            easeInOut: function(a) {
                return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2)
            }
        },
        Sf = null,
        Tf = "undefined" != typeof window ? window : null,
        Uf = Tf ? document : null,
        Vf = !!Uf,
        Wf = ("undefined" != typeof navigator && /jsDom/.test(navigator.appName), "undefined" != typeof console && "function" == typeof console.warn && "function" == typeof console.warn.apply);
    try {
        Object.defineProperty({}, "test", {
            value: 0
        }), Pf = !0
    } catch (a) {
        Pf = !1
    }
    var Xf, Yf, Zf, $f, _f, ag, bg, cg, dg, eg = !!Uf && Uf.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
        fg = ["o", "ms", "moz", "webkit"],
        gg = "http://www.w3.org/1999/xhtml",
        hg = "http://www.w3.org/1998/Math/MathML",
        ig = "http://www.w3.org/2000/svg",
        jg = "http://www.w3.org/1999/xlink",
        kg = "http://www.w3.org/XML/1998/namespace",
        lg = "http://www.w3.org/2000/xmlns",
        mg = {
            html: gg,
            mathml: hg,
            svg: ig,
            xlink: jg,
            xml: kg,
            xmlns: lg
        };
    if (Xf = eg ? function(a, b, c) {
            return b && b !== gg ? c ? Uf.createElementNS(b, a, c) : Uf.createElementNS(b, a) : c ? Uf.createElement(a, c) : Uf.createElement(a)
        } : function(a, b, c) {
            if (b && b !== gg) throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";
            return c ? Uf.createElement(a, c) : Uf.createElement(a)
        }, Vf) {
        for (Zf = Xf("div"), $f = ["matches", "matchesSelector"], dg = function(a) {
                return function(b, c) {
                    return b[a](c)
                }
            }, bg = $f.length; bg-- && !Yf;)
            if (_f = $f[bg], Zf[_f]) Yf = dg(_f);
            else
                for (cg = fg.length; cg--;)
                    if (ag = fg[bg] + _f.substr(0, 1).toUpperCase() + _f.substring(1), Zf[ag]) {
                        Yf = dg(ag);
                        break
                    }
        Yf || (Yf = function(a, b) {
            var c, d, e;
            for (d = a.parentNode, d || (Zf.innerHTML = "", d = Zf, a = a.cloneNode(), Zf.appendChild(a)), c = d.querySelectorAll(b), e = c.length; e--;)
                if (c[e] === a) return !0;
            return !1
        })
    } else Yf = null;
    var ng, og, pg, qg = /(-.)/g,
        rg = /[A-Z]/g;
    try {
        Object.defineProperty({}, "test", {
            get: function() {},
            set: function() {}
        }), Uf && Object.defineProperty(Xf("div"), "test", {
            value: 0
        }), og = Object.defineProperty
    } catch (a) {
        og = function(a, b, c) {
            c.get ? a[b] = c.get() : a[b] = c.value
        }
    }
    try {
        try {
            Object.defineProperties({}, {
                test: {
                    value: 0
                }
            })
        } catch (a) {
            throw a
        }
        Uf && Object.defineProperties(Xf("div"), {
            test: {
                value: 0
            }
        }), pg = Object.defineProperties
    } catch (a) {
        pg = function(a, b) {
            var c;
            for (c in b) b.hasOwnProperty(c) && og(a, c, b[c])
        }
    }
    try {
        Object.create(null), ng = Object.create
    } catch (a) {
        ng = function() {
            var a = function() {};
            return function(b, c) {
                var d;
                return null === b ? {} : (a.prototype = b, d = new a, c && Object.defineProperties(d, c), d)
            }
        }()
    }
    var sg, tg, ug, vg = Object.prototype.hasOwnProperty,
        wg = Object.prototype.toString,
        xg = function() {},
        yg = {};
    if (Wf) {
        var zg = ["%cRactive.js %c0.8.0 %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"],
            Ag = "You're running Ractive 0.8.0 in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";
        ug = function() {
            var a = !!console.groupCollapsed;
            console[a ? "groupCollapsed" : "log"].apply(console, zg), console.log(Ag), a && console.groupEnd(zg), ug = xg
        }, tg = function(a, b) {
            if (ug(), "object" == typeof b[b.length - 1]) {
                var c = b.pop(),
                    d = c ? c.ractive : null;
                if (d) {
                    var e;
                    d.component && (e = d.component.name) && (a = "<" + e + "> " + a);
                    var f;
                    (f = c.node || d.fragment && d.fragment.rendered && d.find("*")) && b.push(f)
                }
            }
            console.warn.apply(console, ["%cRactive.js: %c" + a, "color: rgb(114, 157, 52);", "color: rgb(85, 85, 85);"].concat(b))
        }, sg = function() {
            console.log.apply(console, arguments)
        }
    } else tg = sg = ug = xg;
    var Bg = "Bad arguments",
        Cg = 'A function was specified for "%s" %s, but no %s was returned',
        Dg = function(a, b) {
            return 'Missing "' + a + '" ' + b + " plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#" + b + "s"
        },
        Eg = {
            number: function(a, b) {
                var c;
                return l(a) && l(b) ? (a = +a, b = +b, c = b - a, c ? function(b) {
                    return a + b * c
                } : function() {
                    return a
                }) : null
            },
            array: function(a, b) {
                var c, d, e, f;
                if (!j(a) || !j(b)) return null;
                for (c = [], d = [], f = e = Math.min(a.length, b.length); f--;) d[f] = w(a[f], b[f]);
                for (f = e; f < a.length; f += 1) c[f] = a[f];
                for (f = e; f < b.length; f += 1) c[f] = b[f];
                return function(a) {
                    for (var b = e; b--;) c[b] = d[b](a);
                    return c
                }
            },
            object: function(a, b) {
                var c, d, e, f, g;
                if (!m(a) || !m(b)) return null;
                c = [], f = {}, e = {};
                for (g in a) vg.call(a, g) && (vg.call(b, g) ? (c.push(g), e[g] = w(a[g], b[g]) || x(b[g])) : f[g] = a[g]);
                for (g in b) vg.call(b, g) && !vg.call(a, g) && (f[g] = b[g]);
                return d = c.length,
                    function(a) {
                        for (var b, g = d; g--;) b = c[g], f[b] = e[b](a);
                        return f
                    }
            }
        },
        Fg = {
            construct: {
                deprecated: "beforeInit",
                replacement: "onconstruct"
            },
            render: {
                deprecated: "init",
                message: 'The "init" method has been deprecated and will likely be removed in a future release. You can either use the "oninit" method which will fire only once prior to, and regardless of, any eventual ractive instance being rendered, or if you need to access the rendered DOM, use "onrender" instead. See http://docs.ractivejs.org/latest/migrating for more information.'
            },
            complete: {
                deprecated: "complete",
                replacement: "oncomplete"
            }
        },
        Gg = function(a) {
            this.event = a, this.method = "on" + a, this.deprecate = Fg[a]
        };
    Gg.prototype.call = function(a, b, c) {
        if (b[a]) return c ? b[a](c) : b[a](), !0
    }, Gg.prototype.fire = function(a, b) {
        this.call(this.method, a, b), !a[this.method] && this.deprecate && this.call(this.deprecate.deprecated, a, b) && (this.deprecate.message ? s(this.deprecate.message) : s('The method "%s" has been deprecated in favor of "%s" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.', this.deprecate.deprecated, this.deprecate.replacement)), b ? a.fire(this.event, b) : a.fire(this.event)
    };
    var Hg, Ig = {},
        Jg = {},
        Kg = {};
    "function" == typeof Promise ? Hg = Promise : (Hg = function(a) {
        var b, c, d, e, f, g, h = [],
            i = [],
            j = Ig;
        d = function(a) {
            return function(d) {
                j === Ig && (b = d, j = a, c = G(j === Jg ? h : i, b), F(c))
            }
        }, e = d(Jg), f = d(Kg);
        try {
            a(e, f)
        } catch (a) {
            f(a)
        }
        return g = {
            then: function(a, b) {
                var d = new Hg(function(e, f) {
                    var g = function(a, b, c) {
                        "function" == typeof a ? b.push(function(b) {
                            var c;
                            try {
                                c = a(b), H(d, c, e, f)
                            } catch (a) {
                                f(a)
                            }
                        }) : b.push(c)
                    };
                    g(a, h, e), g(b, i, f), j !== Ig && F(c)
                });
                return d
            }
        }, g.catch = function(a) {
            return this.then(null, a)
        }, g
    }, Hg.all = function(a) {
        return new Hg(function(b, c) {
            var d, e, f, g = [];
            if (!a.length) return void b(g);
            for (f = function(a, e) {
                    a && "function" == typeof a.then ? a.then(function(a) {
                        g[e] = a, --d || b(g)
                    }, c) : (g[e] = a, --d || b(g))
                }, d = e = a.length; e--;) f(a[e], e)
        })
    }, Hg.resolve = function(a) {
        return new Hg(function(b) {
            b(a)
        })
    }, Hg.reject = function(a) {
        return new Hg(function(b, c) {
            c(a)
        })
    });
    var Lg = Hg,
        Mg = function(a, b) {
            this.callback = a, this.parent = b, this.intros = [], this.outros = [], this.children = [], this.totalChildren = this.outroChildren = 0, this.detachQueue = [], this.outrosComplete = !1, b && b.addChild(this)
        };
    Mg.prototype.add = function(a) {
        var b = a.isIntro ? this.intros : this.outros;
        b.push(a)
    }, Mg.prototype.addChild = function(a) {
        this.children.push(a), this.totalChildren += 1, this.outroChildren += 1
    }, Mg.prototype.decrementOutros = function() {
        this.outroChildren -= 1, K(this)
    }, Mg.prototype.decrementTotal = function() {
        this.totalChildren -= 1, K(this)
    }, Mg.prototype.detachNodes = function() {
        this.detachQueue.forEach(I), this.children.forEach(J)
    }, Mg.prototype.ready = function() {
        L(this)
    }, Mg.prototype.remove = function(a) {
        var b = a.isIntro ? this.intros : this.outros;
        D(b, a), K(this)
    }, Mg.prototype.start = function() {
        this.children.forEach(function(a) {
            return a.start()
        }), this.intros.concat(this.outros).forEach(function(a) {
            return a.start()
        }), this.ready = !0, K(this)
    };
    var Ng, Og = new Gg("change"),
        Pg = {
            start: function(a, b) {
                var c, d;
                return b && (c = new Lg(function(a) {
                    return d = a
                })), Ng = {
                    previousBatch: Ng,
                    transitionManager: new Mg(d, Ng && Ng.transitionManager),
                    fragments: [],
                    tasks: [],
                    immediateObservers: [],
                    deferredObservers: [],
                    ractives: [],
                    instance: a
                }, c
            },
            end: function() {
                O(), Ng.previousBatch || Ng.transitionManager.start(), Ng = Ng.previousBatch
            },
            addFragment: function(a) {
                y(Ng.fragments, a)
            },
            addFragmentToRoot: function(a) {
                if (Ng) {
                    for (var b = Ng; b.previousBatch;) b = b.previousBatch;
                    y(b.fragments, a)
                }
            },
            addInstance: function(a) {
                Ng && y(Ng.ractives, a)
            },
            addObserver: function(a, b) {
                y(b ? Ng.deferredObservers : Ng.immediateObservers, a)
            },
            registerTransition: function(a) {
                a._manager = Ng.transitionManager, Ng.transitionManager.add(a)
            },
            detachWhenReady: function(a) {
                Ng.transitionManager.detachQueue.push(a)
            },
            scheduleTask: function(a, b) {
                var c;
                if (Ng) {
                    for (c = Ng; b && c.previousBatch;) c = c.previousBatch;
                    c.tasks.push(a)
                } else a()
            }
        },
        Qg = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g,
        Rg = /([^\\](?:\\\\)*)\./,
        Sg = /\\|\./g,
        Tg = /((?:\\)+)\1|\\(\.)/g,
        Ug = /\*/,
        Vg = "Cannot add to a non-numeric value",
        Wg = Lg.resolve();
    og(Wg, "stop", {
        value: xg
    });
    var Xg = Rf.linear,
        Yg = new Gg("detach"),
        Zg = function(a, b, c, d) {
            this.ractive = a, this.selector = b, this.live = c, this.isComponentQuery = d, this.result = [], this.dirty = !0
        };
    Zg.prototype.add = function(a) {
        this.result.push(a), this.makeDirty()
    }, Zg.prototype.cancel = function() {
        var a = this._root[this.isComponentQuery ? "liveComponentQueries" : "liveQueries"],
            b = this.selector,
            c = a.indexOf(b);
        c !== -1 && (a.splice(c, 1), a[b] = null)
    }, Zg.prototype.init = function() {
        this.dirty = !1
    }, Zg.prototype.makeDirty = function() {
        var a = this;
        this.dirty || (this.dirty = !0, Pg.scheduleTask(function() {
            return a.update()
        }))
    }, Zg.prototype.remove = function(a) {
        var b = this.result.indexOf(this.isComponentQuery ? a.instance : a);
        b !== -1 && this.result.splice(b, 1)
    }, Zg.prototype.update = function() {
        this.result.sort(this.isComponentQuery ? da : ca), this.dirty = !1
    }, Zg.prototype.test = function(a) {
        return this.isComponentQuery ? !this.selector || a.name === this.selector : a ? Yf(a, this.selector) : null
    };
    var $g, _g = {},
        ah = {},
        bh = [],
        ch = function(a, b) {
            this.value = a, this.isReadonly = this.isKey = !0, this.deps = [], this.links = [], this.parent = b
        };
    ch.prototype.get = function(a) {
        return a && ya(this), S(this.value)
    }, ch.prototype.getKeypath = function() {
        return S(this.value)
    }, ch.prototype.rebinding = function(a, b) {
        for (var c = this, d = this.deps.length; d--;) c.deps[d].rebinding(a, b, !1);
        for (d = this.links.length; d--;) c.links[d].rebinding(a, b, !1)
    }, ch.prototype.register = function(a) {
        this.deps.push(a)
    }, ch.prototype.registerLink = function(a) {
        y(this.links, a)
    }, ch.prototype.unregister = function(a) {
        D(this.deps, a)
    }, ch.prototype.unregisterLink = function(a) {
        D(this.links, a)
    };
    var dh = function(a, b) {
        this.parent = a, this.ractive = b, this.value = b ? a.getKeypath(b) : a.getKeypath(), this.deps = [], this.children = {}, this.isReadonly = this.isKeypath = !0
    };
    dh.prototype.get = function(a) {
        return a && ya(this), this.value
    }, dh.prototype.getChild = function(a) {
        if (!(a._guid in this.children)) {
            var b = new dh(this.parent, a);
            this.children[a._guid] = b, b.owner = this
        }
        return this.children[a._guid]
    }, dh.prototype.getKeypath = function() {
        return this.value
    }, dh.prototype.handleChange = function() {
        for (var a = this, b = Object.keys(this.children), c = b.length; c--;) a.children[b[c]].handleChange();
        this.deps.forEach(Ba)
    }, dh.prototype.rebindChildren = function(a) {
        for (var b = this, c = Object.keys(this.children), d = c.length; d--;) {
            var e = b.children[c[d]];
            e.value = a.getKeypath(e.ractive), e.handleChange()
        }
    }, dh.prototype.rebinding = function(a, b) {
        for (var c = this, d = a ? a.getKeypathModel(this.ractive) : void 0, e = Object.keys(this.children), f = e.length; f--;) c.children[e[f]].rebinding(a, b, !1);
        for (f = this.deps.length; f--;) c.deps[f].rebinding(d, c, !1)
    }, dh.prototype.register = function(a) {
        this.deps.push(a)
    }, dh.prototype.removeChild = function(a) {
        a.ractive && delete this.children[a.ractive._guid]
    }, dh.prototype.teardown = function() {
        var a = this;
        this.owner && this.owner.removeChild(this);
        for (var b = Object.keys(this.children), c = b.length; c--;) a.children[b[c]].teardown()
    }, dh.prototype.unregister = function(a) {
        D(this.deps, a), this.deps.length || this.teardown()
    };
    var eh = Object.prototype.hasOwnProperty,
        fh = {
            early: [],
            mark: []
        },
        gh = {
            early: [],
            mark: []
        },
        hh = function(a) {
            this.deps = [], this.children = [], this.childByKey = {}, this.links = [], this.keyModels = {}, this.unresolved = [], this.unresolvedByKey = {}, this.bindings = [], this.patternObservers = [], a && (this.parent = a, this.root = a.root)
        };
    hh.prototype.addUnresolved = function(a, b) {
        this.unresolvedByKey[a] || (this.unresolved.push(a), this.unresolvedByKey[a] = []), this.unresolvedByKey[a].push(b)
    }, hh.prototype.addShuffleTask = function(a, b) {
        void 0 === b && (b = "early"), fh[b].push(a)
    }, hh.prototype.addShuffleRegister = function(a, b) {
        void 0 === b && (b = "early"), gh[b].push({
            model: this,
            item: a
        })
    }, hh.prototype.clearUnresolveds = function(a) {
        for (var b = this, c = this.unresolved.length; c--;) {
            var d = b.unresolved[c];
            if (!a || d === a) {
                for (var e = b.unresolvedByKey[d], f = b.has(d), g = e.length; g--;) f && e[g].attemptResolution(), e[g].resolved && e.splice(g, 1);
                e.length || (b.unresolved.splice(c, 1), b.unresolvedByKey[d] = null)
            }
        }
    }, hh.prototype.findMatches = function(a) {
        var b, c, d = a.length,
            e = [this],
            f = function() {
                var d = a[c];
                "*" === d ? (b = [], e.forEach(function(a) {
                    b.push.apply(b, a.getValueChildren(a.get()))
                })) : b = e.map(function(a) {
                    return a.joinKey(d)
                }), e = b
            };
        for (c = 0; c < d; c += 1) f();
        return b
    }, hh.prototype.getKeyModel = function(a, b) {
        return void 0 === a || b ? (a in this.keyModels || (this.keyModels[a] = new ch(P(a), this)), this.keyModels[a]) : this.parent.getKeyModel(a, !0)
    }, hh.prototype.getKeypath = function(a) {
        return a !== this.ractive && this._link ? this._link.target.getKeypath(a) : (this.keypath || (this.keypath = this.parent.isRoot ? this.key : "" + this.parent.getKeypath(a) + "." + P(this.key)), this.keypath)
    }, hh.prototype.getValueChildren = function(a) {
        var b, c = this;
        if (j(a)) b = [], "length" in this && this.length !== a.length && b.push(this.joinKey("length")), a.forEach(function(a, d) {
            b.push(c.joinKey(d))
        });
        else if (m(a) || "function" == typeof a) b = Object.keys(a).map(function(a) {
            return c.joinKey(a)
        });
        else if (null != a) return [];
        return b
    }, hh.prototype.getVirtual = function(a) {
        var b = this,
            c = this.get(a, {
                virtual: !1
            });
        if (m(c)) {
            for (var d = j(c) ? [] : {}, e = Object.keys(c), f = e.length; f--;) {
                var g = b.childByKey[e[f]];
                g ? g._link ? d[e[f]] = g._link.getVirtual() : d[e[f]] = g.getVirtual() : d[e[f]] = c[e[f]]
            }
            for (f = this.children.length; f--;) {
                var h = b.children[f];
                h.key in d || !h._link || (d[h.key] = h._link.getVirtual())
            }
            return d
        }
        return c
    }, hh.prototype.has = function(a) {
        if (this._link) return this._link.has(a);
        var b = this.get();
        if (!b) return !1;
        if (a = S(a), eh.call(b, a)) return !0;
        for (var c = b.constructor; c !== Function && c !== Array && c !== Object;) {
            if (eh.call(c.prototype, a)) return !0;
            c = c.constructor
        }
        return !1
    }, hh.prototype.joinAll = function(a, b) {
        for (var c = this, d = 0; d < a.length; d += 1) {
            if (b && b.lastLink === !1 && d + 1 === a.length && c.childByKey[a[d]] && c.childByKey[a[d]]._link) return c.childByKey[a[d]];
            c = c.joinKey(a[d], b)
        }
        return c
    }, hh.prototype.notifyUpstream = function() {
        for (var a = this.parent, b = this; a;) a.patternObservers.length && a.patternObservers.forEach(function(a) {
            return a.notify(b.key)
        }), a.links.forEach(Ea), a.deps.forEach(Ba), b = a, a = a.parent
    }, hh.prototype.rebinding = function(a, b, c) {
        for (var d = this, e = this.deps.length; e--;) d.deps[e].rebinding && d.deps[e].rebinding(a, b, c);
        for (e = this.links.length; e--;) {
            var f = d.links[e];
            f.owner._link && f.relinking(a, !0, c)
        }
        for (e = this.children.length; e--;) {
            var g = d.children[e];
            g.rebinding(a ? a.joinKey(g.key) : void 0, g, c)
        }
        for (e = this.unresolved.length; e--;)
            for (var h = d.unresolvedByKey[d.unresolved[e]], i = h.length; i--;) h[i].rebinding(a, b);
        for (this.keypathModel && this.keypathModel.rebinding(a, b, !1), e = this.bindings.length; e--;) d.bindings[e].rebinding(a, b, c)
    }, hh.prototype.register = function(a) {
        this.deps.push(a)
    }, hh.prototype.registerChange = function(a, b) {
        this.isRoot ? (this.changes[a] = b, Pg.addInstance(this.root.ractive)) : this.root.registerChange(a, b)
    }, hh.prototype.registerLink = function(a) {
        y(this.links, a)
    }, hh.prototype.registerPatternObserver = function(a) {
        this.patternObservers.push(a), this.register(a)
    }, hh.prototype.registerTwowayBinding = function(a) {
        this.bindings.push(a)
    }, hh.prototype.removeUnresolved = function(a, b) {
        var c = this.unresolvedByKey[a];
        c && D(c, b)
    }, hh.prototype.shuffled = function() {
        for (var a = this, b = this.children.length; b--;) a.children[b].shuffled();
        this.wrapper && (this.wrapper.teardown(), this.wrapper = null, this.rewrap = !0)
    }, hh.prototype.unregister = function(a) {
        D(this.deps, a)
    }, hh.prototype.unregisterLink = function(a) {
        D(this.links, a)
    }, hh.prototype.unregisterPatternObserver = function(a) {
        D(this.patternObservers, a), this.unregister(a)
    }, hh.prototype.unregisterTwowayBinding = function(a) {
        D(this.bindings, a)
    }, hh.prototype.updateFromBindings = function(a) {
        for (var b = this, c = this.bindings.length; c--;) {
            var d = b.bindings[c].getValue();
            d !== b.value && b.set(d)
        }
        if (!this.bindings.length) {
            var e = Oa(this.deps);
            e && e.value !== this.value && this.set(e.value)
        }
        a && (this.children.forEach(Na), this.links.forEach(Na), this._link && this._link.updateFromBindings(a))
    }, ch.prototype.addShuffleTask = hh.prototype.addShuffleTask, ch.prototype.addShuffleRegister = hh.prototype.addShuffleRegister, dh.prototype.addShuffleTask = hh.prototype.addShuffleTask, dh.prototype.addShuffleRegister = hh.prototype.addShuffleRegister;
    var ih = function(a) {
        function b(b, c, d, e) {
            a.call(this, b), this.owner = c, this.target = d, this.key = void 0 === e ? c.key : e, c.isLink && (this.sourcePath = "" + c.sourcePath + "." + this.key), d.registerLink(this), this.isReadonly = b.isReadonly, this.isLink = !0
        }
        return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.animate = function(a, b, c, d) {
            this.target.animate(a, b, c, d)
        }, b.prototype.applyValue = function(a) {
            this.target.applyValue(a)
        }, b.prototype.get = function(a, b) {
            return a && (ya(this), b = b || {}, b.unwrap = !0), this.target.get(!1, b)
        }, b.prototype.getKeypath = function(b) {
            return b && b !== this.root.ractive ? this.target.getKeypath(b) : a.prototype.getKeypath.call(this, b)
        }, b.prototype.getKeypathModel = function(a) {
            return this.keypathModel || (this.keypathModel = new dh(this)), a && a !== this.root.ractive ? this.keypathModel.getChild(a) : this.keypathModel
        }, b.prototype.handleChange = function() {
            this.deps.forEach(Ba), this.links.forEach(Ba), this.notifyUpstream()
        }, b.prototype.joinKey = function(a) {
            if (void 0 === a || "" === a) return this;
            if (!this.childByKey.hasOwnProperty(a)) {
                var c = new b(this, this, this.target.joinKey(a), a);
                this.children.push(c), this.childByKey[a] = c
            }
            return this.childByKey[a]
        }, b.prototype.mark = function() {
            this.target.mark()
        }, b.prototype.marked = function() {
            this.links.forEach(Da), this.deps.forEach(Ba), this.clearUnresolveds()
        }, b.prototype.notifiedUpstream = function() {
            this.links.forEach(Ea), this.deps.forEach(Ba)
        }, b.prototype.relinked = function() {
            this.target.registerLink(this), this.children.forEach(function(a) {
                return a.relinked()
            })
        }, b.prototype.relinking = function(a, b, c) {
            var d = this;
            b && this.sourcePath && (a = Qa(this.sourcePath, a, this.target)), a && this.target !== a && (this.target.unregisterLink(this), this.keypathModel && this.keypathModel.rebindChildren(a), this.target = a, this.children.forEach(function(b) {
                b.relinking(a.joinKey(b.key), !1, c)
            }), b && this.addShuffleTask(function() {
                d.relinked(), c || d.notifyUpstream()
            }))
        }, b.prototype.set = function(a) {
            this.target.set(a)
        }, b.prototype.shuffle = function(a) {
            var b = this;
            if (this.target.shuffling) {
                for (var c = a.length; c--;) {
                    var d = a[c];
                    c !== d && (c in b.childByKey && b.childByKey[c].rebinding(~d ? b.joinKey(d) : void 0, b.childByKey[c], !0), !~d && b.keyModels[c] ? b.keyModels[c].rebinding(void 0, b.keyModels[c], !1) : ~d && b.keyModels[c] && (b.keyModels[d] || b.childByKey[d].getKeyModel(d), b.keyModels[c].rebinding(b.keyModels[d], b.keyModels[c], !1)))
                }
                var e = this.source().length !== this.source().value.length;
                for (this.links.forEach(function(b) {
                        return b.shuffle(a)
                    }), c = this.deps.length; c--;) b.deps[c].shuffle && b.deps[c].shuffle(a);
                this.marked(), e && this.notifyUpstream()
            } else this.target.shuffle(a)
        }, b.prototype.source = function() {
            return this.target.source ? this.target.source() : this.target;
        }, b.prototype.teardown = function() {
            this._link && this._link.teardown(), this.children.forEach(Ga)
        }, b
    }(hh);
    hh.prototype.link = function(a, b) {
        var c = this._link || new ih(this.parent, this, a, this.key);
        c.sourcePath = b, this._link && this._link.relinking(a, !0, !1), this.rebinding(c, this, !1), Pa();
        var d = !this._link;
        return this._link = c, d && this.parent.clearUnresolveds(), c.marked(), c
    }, hh.prototype.unlink = function() {
        if (this._link) {
            var a = this._link;
            this._link = void 0, a.rebinding(this, this._link), Pa(), a.teardown()
        }
    };
    var jh;
    Tf ? (! function(a, b, c) {
        var d, e;
        if (!c.requestAnimationFrame) {
            for (d = 0; d < a.length && !c.requestAnimationFrame; ++d) c.requestAnimationFrame = c[a[d] + "RequestAnimationFrame"];
            c.requestAnimationFrame || (e = c.setTimeout, c.requestAnimationFrame = function(a) {
                var c, d, f;
                return c = Date.now(), d = Math.max(0, 16 - (c - b)), f = e(function() {
                    a(c + d)
                }, d), b = c + d, f
            })
        }
    }(fg, 0, Tf), jh = Tf.requestAnimationFrame) : jh = null;
    var kh = jh,
        lh = Tf && Tf.performance && "function" == typeof Tf.performance.now ? function() {
            return Tf.performance.now()
        } : function() {
            return Date.now()
        },
        mh = [],
        nh = !1,
        oh = function(a) {
            this.duration = a.duration, this.step = a.step, this.complete = a.complete, this.easing = a.easing, this.start = lh(), this.end = this.start + this.duration, this.running = !0, mh.push(this), nh || kh(Ra)
        };
    oh.prototype.tick = function(a) {
        if (!this.running) return !1;
        if (a > this.end) return this.step && this.step(1), this.complete && this.complete(1), !1;
        var b = a - this.start,
            c = this.easing(b / this.duration);
        return this.step && this.step(c), !0
    }, oh.prototype.stop = function() {
        this.abort && this.abort(), this.running = !1
    };
    var ph = {},
        qh = function(a) {
            function b(b, c) {
                a.call(this, b), this.value = void 0, this.ticker = null, b && (this.key = S(c), this.isReadonly = b.isReadonly, b.value && (this.value = b.value[this.key], j(this.value) && (this.length = this.value.length), this.adapt()))
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.adapt = function() {
                var a = this,
                    b = this.root.adaptors,
                    c = b.length;
                if (this.rewrap = !1, 0 !== c) {
                    var d = this.value,
                        e = this.root.ractive,
                        f = this.getKeypath();
                    if (this.wrapper) {
                        var g = !this.wrapper.reset || this.wrapper.reset(d) === !1;
                        if (!g) return void(this.value = this.wrapper.get());
                        if (this.wrapper.teardown(), this.wrapper = null, void 0 !== this.value) {
                            var h = this.parent.value || this.parent.createBranch(this.key);
                            h[this.key] !== this.value && (h[this.key] = d)
                        }
                    }
                    var i;
                    for (i = 0; i < c; i += 1) {
                        var j = b[i];
                        if (j.filter(d, f, e)) {
                            a.wrapper = j.wrap(e, d, f, Ta(f)), a.wrapper.value = a.value, a.wrapper.__model = a, a.value = a.wrapper.get();
                            break
                        }
                    }
                }
            }, b.prototype.animate = function(a, b, c, d) {
                var e = this;
                this.ticker && this.ticker.stop();
                var f, g = new Lg(function(a) {
                    return f = a
                });
                return this.ticker = new oh({
                    duration: c.duration,
                    easing: c.easing,
                    step: function(a) {
                        var b = d(a);
                        e.applyValue(b), c.step && c.step(a, b)
                    },
                    complete: function() {
                        e.applyValue(b), c.complete && c.complete(b), e.ticker = null, f()
                    }
                }), g.stop = this.ticker.stop, g
            }, b.prototype.applyValue = function(a) {
                if (!k(a, this.value)) {
                    if (this.registerChange(this.getKeypath(), a), this.parent.wrapper && this.parent.wrapper.set) this.parent.wrapper.set(this.key, a), this.parent.value = this.parent.wrapper.get(), this.value = this.parent.value[this.key], this.adapt();
                    else if (this.wrapper) this.value = a, this.adapt();
                    else {
                        var b = this.parent.value || this.parent.createBranch(this.key);
                        b[this.key] = a, this.value = a, this.adapt()
                    }
                    this.parent.clearUnresolveds(), this.clearUnresolveds(), j(a) && (this.length = a.length), this.links.forEach(Ba), this.children.forEach(Ca), this.deps.forEach(Ba), this.notifyUpstream(), "length" === this.key && j(this.parent.value) && (this.parent.length = this.parent.value.length)
                }
            }, b.prototype.createBranch = function(a) {
                var b = l(a) ? [] : {};
                return this.set(b), b
            }, b.prototype.get = function(a, b) {
                return this._link ? this._link.get(a, b) : (a && ya(this), b && b.virtual ? this.getVirtual(!1) : (a || b && b.unwrap) && this.wrapper ? this.wrapper.value : this.value)
            }, b.prototype.getKeypathModel = function(a) {
                return this.keypathModel || (this.keypathModel = new dh(this)), this.keypathModel
            }, b.prototype.joinKey = function(a, c) {
                if (this._link) return !c || !c.lastLink != !1 || void 0 !== a && "" !== a ? this._link.joinKey(a) : this;
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var d = new b(this, a);
                    this.children.push(d), this.childByKey[a] = d
                }
                return this.childByKey[a]._link ? this.childByKey[a]._link : this.childByKey[a]
            }, b.prototype.mark = function() {
                if (this._link) return this._link.mark();
                var a = this.retrieve();
                if (!k(a, this.value)) {
                    var b = this.value;
                    this.value = a, (b !== a || this.rewrap) && this.adapt(), j(a) && (this.length = a.length), this.children.forEach(Ca), this.links.forEach(Da), this.deps.forEach(Ba), this.clearUnresolveds()
                }
            }, b.prototype.merge = function(a, b) {
                var c = this.value,
                    d = a;
                c === d && (c = Ua(this)), b && (c = c.map(b), d = d.map(b));
                var e = c.length,
                    f = {},
                    g = 0,
                    h = c.map(function(a) {
                        var b, c = g;
                        do {
                            if (b = d.indexOf(a, c), b === -1) return -1;
                            c = b + 1
                        } while (f[b] === !0 && c < e);
                        return b === g && (g += 1), f[b] = !0, b
                    });
                this.parent.value[this.key] = a, this.shuffle(h)
            }, b.prototype.retrieve = function() {
                return this.parent.value ? this.parent.value[this.key] : void 0
            }, b.prototype.set = function(a) {
                this.ticker && this.ticker.stop(), this.applyValue(a)
            }, b.prototype.shuffle = function(a) {
                var b = this;
                this.shuffling = !0;
                for (var c = a.length; c--;) {
                    var d = a[c];
                    c !== d && (c in b.childByKey && b.childByKey[c].rebinding(~d ? b.joinKey(d) : void 0, b.childByKey[c], !0), !~d && b.keyModels[c] ? b.keyModels[c].rebinding(void 0, b.keyModels[c], !1) : ~d && b.keyModels[c] && (b.keyModels[d] || b.childByKey[d].getKeyModel(d), b.keyModels[c].rebinding(b.keyModels[d], b.keyModels[c], !1)))
                }
                var e = this.length !== this.value.length;
                for (this.links.forEach(function(b) {
                        return b.shuffle(a)
                    }), Pa("early"), c = this.deps.length; c--;) b.deps[c].shuffle && b.deps[c].shuffle(a);
                this.mark(), Pa("mark"), e && this.notifyUpstream(), this.shuffling = !1
            }, b.prototype.teardown = function() {
                this._link && this._link.teardown(), this.children.forEach(Ga), this.wrapper && this.wrapper.teardown(), this.keypathModel && this.keypathModel.teardown()
            }, b
        }(hh),
        rh = function(a) {
            function b() {
                a.call(this, null, "@global"), this.value = "undefined" != typeof global ? global : window, this.isRoot = !0, this.root = this, this.adaptors = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getKeypath = function() {
                return "@global"
            }, b.prototype.registerChange = function() {}, b
        }(qh),
        sh = new rh,
        th = /^@[^\(]+\(([^\)]+)\)/,
        uh = Array.prototype,
        vh = function(a) {
            function b(a) {
                for (var b = [], d = arguments.length - 1; d-- > 0;) b[d] = arguments[d + 1];
                return c(this.viewmodel.joinAll(R(a)), b)
            }

            function c(b, c) {
                var d = b.get();
                if (!j(d)) {
                    if (void 0 === d) {
                        d = [];
                        var e = uh[a].apply(d, c),
                            f = Pg.start(this, !0).then(function() {
                                return e
                            });
                        return b.set(d), Pg.end(), f
                    }
                    throw new Error("shuffle array method " + a + " called on non-array at " + b.getKeypath())
                }
                var g = Ya(d.length, a, c),
                    h = uh[a].apply(d, c),
                    i = Pg.start(this, !0).then(function() {
                        return h
                    });
                return i.result = h, g ? b.shuffle(g) : b.set(h), Pg.end(), i
            }
            return {
                path: b,
                model: c
            }
        },
        wh = {},
        xh = new Gg("update"),
        yh = vh("push").model,
        zh = vh("pop").model,
        Ah = vh("shift").model,
        Bh = vh("unshift").model,
        Ch = vh("sort").model,
        Dh = vh("splice").model,
        Eh = vh("reverse").model,
        Fh = Uf && Uf.querySelector,
        Gh = function(a) {
            if ("string" == typeof a && Fh && (a = Fh.call(document, a)), !a || !a._ractive) return {};
            var b = a._ractive;
            return Ib({}, b.proxy)
        },
        Hh = new Gg("insert"),
        Ih = function(a, b, c) {
            var d = this;
            for (this.fragment = a, this.reference = Q(b), this.callback = c, this.keys = R(b), this.resolved = !1, this.contexts = []; a;) a.context && (a.context.addUnresolved(d.keys[0], d), d.contexts.push(a.context)), a = a.componentParent || a.parent
        };
    Ih.prototype.attemptResolution = function() {
        if (!this.resolved) {
            var a = va(this.fragment, this.reference);
            a && (this.resolved = !0, this.callback(a))
        }
    }, Ih.prototype.forceResolution = function() {
        if (!this.resolved) {
            var a = this.fragment.findContext().joinAll(this.keys);
            this.callback(a), this.resolved = !0
        }
    }, Ih.prototype.rebinding = function(a, b) {
        var c = this;
        b && b.removeUnresolved(this.keys[0], this), a && Pg.scheduleTask(function() {
            return a.addUnresolved(c.keys[0], c)
        })
    }, Ih.prototype.unbind = function() {
        var a = this;
        this.fragment && D(this.fragment.unresolved, this), this.resolved || this.contexts.forEach(function(b) {
            return b.removeUnresolved(a.keys[0], a)
        })
    };
    var Jh = function(a, b, c, d) {
        var e = this;
        this.context = d.context || a, this.callback = c, this.ractive = a, b ? this.resolved(b) : (this.keypath = d.keypath, this.resolver = new Ih(a.fragment, d.keypath, function(a) {
            e.resolved(a)
        })), d.init !== !1 ? (this.dirty = !0, this.dispatch()) : this.oldValue = this.newValue, this.defer = d.defer, this.once = d.once, this.strict = d.strict, this.dirty = !1
    };
    Jh.prototype.cancel = function() {
        this.cancelled = !0, this.model ? this.model.unregister(this) : this.resolver.unbind()
    }, Jh.prototype.dispatch = function() {
        this.cancelled || (this.callback.call(this.context, this.newValue, this.oldValue, this.keypath), this.oldValue = this.model ? this.model.get() : this.newValue, this.dirty = !1)
    }, Jh.prototype.handleChange = function() {
        var a = this;
        if (!this.dirty) {
            var b = this.model.get();
            if (k(b, this.oldValue)) return;
            if (this.newValue = b, this.strict && this.newValue === this.oldValue) return;
            Pg.addObserver(this, this.defer), this.dirty = !0, this.once && Pg.scheduleTask(function() {
                return a.cancel()
            })
        }
    }, Jh.prototype.rebinding = function(a, b) {
        var c = this;
        return a = Qa(this.keypath, a, b), a !== this.model && (this.model && this.model.unregister(this), void(a && a.addShuffleTask(function() {
            return c.resolved(a)
        })))
    }, Jh.prototype.resolved = function(a) {
        this.model = a, this.keypath = a.getKeypath(this.ractive), this.oldValue = void 0, this.newValue = a.get(), a.register(this)
    };
    var Kh = function(a, b, c, d, e) {
        var f = this;
        this.context = e.context || a, this.ractive = a, this.baseModel = b, this.keys = c, this.callback = d;
        var g = c.join("\\.").replace(/\*/g, "(.+)"),
            h = b.getKeypath(a);
        this.pattern = new RegExp("^" + (h ? h + "\\." : "") + g + "$"), this.oldValues = {}, this.newValues = {}, this.defer = e.defer, this.once = e.once, this.strict = e.strict, this.dirty = !1, this.changed = [], this.partial = !1;
        var i = b.findMatches(this.keys);
        i.forEach(function(a) {
            f.newValues[a.getKeypath(f.ractive)] = a.get()
        }), e.init !== !1 ? this.dispatch() : this.oldValues = this.newValues, b.registerPatternObserver(this)
    };
    Kh.prototype.cancel = function() {
        this.baseModel.unregisterPatternObserver(this)
    }, Kh.prototype.dispatch = function() {
        var a = this;
        if (Object.keys(this.newValues).forEach(function(b) {
                if (!a.newKeys || a.newKeys[b]) {
                    var c = a.newValues[b],
                        d = a.oldValues[b];
                    if (!(a.strict && c === d || k(c, d))) {
                        var e = [c, d, b];
                        if (b) {
                            var f = a.pattern.exec(b);
                            f && (e = e.concat(f.slice(1)))
                        }
                        a.callback.apply(a.context, e)
                    }
                }
            }), this.partial)
            for (var b in this.newValues) this.oldValues[b] = this.newValues[b];
        else this.oldValues = this.newValues;
        this.newKeys = null, this.dirty = !1
    }, Kh.prototype.notify = function(a) {
        this.changed.push(a)
    }, Kh.prototype.shuffle = function(a) {
        var b = this;
        if (j(this.baseModel.value)) {
            var c = this.baseModel.getKeypath(this.ractive),
                d = this.baseModel.value.length,
                e = this.keys.length > 1 ? "." + this.keys.slice(1).join(".") : "";
            this.newKeys = {};
            for (var f = 0; f < a.length; f++) a[f] !== -1 && a[f] !== f && (b.newKeys["" + c + "." + f + e] = !0);
            for (var g = a.touchedFrom; g < d; g++) b.newKeys["" + c + "." + g + e] = !0
        }
    }, Kh.prototype.handleChange = function() {
        var a = this;
        if (!this.dirty || this.changed.length) {
            if (this.dirty || (this.newValues = {}), this.changed.length) {
                var b = this.baseModel.isRoot ? this.changed : this.changed.map(function(b) {
                    return a.baseModel.getKeypath(a.ractive) + "." + P(b)
                });
                this.baseModel.findMatches(this.keys).forEach(function(c) {
                    var d = c.getKeypath(a.ractive);
                    b.filter(function(a) {
                        return 0 === d.indexOf(a) && (d.length === a.length || "." === d[a.length])
                    }).length && (a.newValues[d] = c.get())
                }), this.partial = !0
            } else this.baseModel.findMatches(this.keys).forEach(function(b) {
                var c = b.getKeypath(a.ractive);
                a.newValues[c] = b.get()
            }), this.partial = !1;
            Pg.addObserver(this, this.defer), this.dirty = !0, this.changed.length = 0, this.once && this.cancel()
        }
    };
    var Lh = function(a, b, c, d) {
        this.context = a, this.model = b, this.keypath = b.getKeypath(), this.callback = c, this.pending = null, b.register(this), d.init !== !1 ? (this.sliced = [], this.shuffle([]), this.handleChange()) : this.sliced = this.slice()
    };
    Lh.prototype.handleChange = function() {
        this.pending ? (this.callback(this.pending), this.pending = null) : (this.shuffle(this.sliced.map(Qb)), this.handleChange())
    }, Lh.prototype.shuffle = function(a) {
        var b, c = this,
            d = this.slice(),
            e = [],
            f = [],
            g = {};
        a.forEach(function(a, d) {
            g[a] = !0, a !== d && void 0 === b && (b = d), a === -1 && f.push(c.sliced[d])
        }), void 0 === b && (b = a.length);
        for (var h = d.length, i = 0; i < h; i += 1) g[i] || e.push(d[i]);
        this.pending = {
            inserted: e,
            deleted: f,
            start: b
        }, this.sliced = d
    }, Lh.prototype.slice = function() {
        var a = this.model.get();
        return j(a) ? a.slice() : []
    };
    var Mh = {
            init: !1,
            once: !0
        },
        Nh = function(a) {
            return a.trim()
        },
        Oh = function(a) {
            return "" !== a
        },
        Ph = vh("pop").path,
        Qh = vh("push").path,
        Rh = "/* Ractive.js component styles */",
        Sh = [],
        Th = !1,
        Uh = null,
        Vh = null;
    !Uf || Uh && Uh.parentNode || (Uh = Uf.createElement("style"), Uh.type = "text/css", Uf.getElementsByTagName("head")[0].appendChild(Uh), Vh = !!Uh.styleSheet);
    var Wh, Xh, Yh = new Gg("render"),
        Zh = new Gg("complete"),
        $h = {
            extend: function(a, b, c) {
                b.adapt = $b(b.adapt, B(c.adapt))
            },
            init: function() {}
        },
        _h = /(?:^|\})?\s*([^\{\}]+)\s*\{/g,
        ai = /\/\*.*?\*\//g,
        bi = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>~:]))+)((?:::?[^\s\+\>\~\(:]+(?:\([^\)]+\))?)*\s*[\s\+\>\~]?)\s*/g,
        ci = /^(?:@|\d+%)/,
        di = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g,
        ei = {
            name: "css",
            extend: function(a, b, c) {
                if (c.css) {
                    var d = ec(),
                        e = c.noCssTransform ? c.css : cc(c.css, d);
                    b.cssId = d, Vb({
                        id: d,
                        styles: e
                    })
                }
            },
            init: function(a, b, c) {
                c.css && s("\nThe css option is currently not supported on a per-instance basis and will be discarded. Instead, we recommend instantiating from a component definition with a css option.\n\nconst Component = Ractive.extend({\n\t...\n\tcss: '/* your css */',\n\t...\n});\n\nconst componentInstance = new Component({ ... })\n\t\t")
            }
        },
        fi = {
            name: "data",
            extend: function(a, b, c) {
                var d, e;
                if (c.data && m(c.data))
                    for (d in c.data) e = c.data[d], e && "object" == typeof e && (m(e) || j(e)) && s("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");
                b.data = gc(b.data, c.data)
            },
            init: function(a, b, c) {
                var d = gc(a.prototype.data, c.data);
                if ("function" == typeof d && (d = d.call(b)), d && d.constructor === Object)
                    for (var e in d) "function" == typeof d[e] && (d[e] = T(d[e], b));
                return d || {}
            },
            reset: function(a) {
                var b = this.init(a.constructor, a, a.viewmodel);
                return a.viewmodel.root.set(b), !0
            }
        },
        gi = 4,
        hi = /\$\{([^\}]+)\}/g,
        ii = ng(null),
        ji = /^\s+/;
    Xh = function(a) {
        this.name = "ParseError", this.message = a;
        try {
            throw new Error(a)
        } catch (a) {
            this.stack = a.stack
        }
    }, Xh.prototype = Error.prototype, Wh = function(a, b) {
        var c, d, e = this,
            f = 0;
        for (this.str = a, this.options = b || {}, this.pos = 0, this.lines = this.str.split("\n"), this.lineEnds = this.lines.map(function(a) {
                var b = f + a.length + 1;
                return f = b, b
            }, 0), this.init && this.init(a, b), c = []; e.pos < e.str.length && (d = e.read());) c.push(d);
        this.leftover = this.remaining(), this.result = this.postProcess ? this.postProcess(c, b) : c
    }, Wh.prototype = {
        read: function(a) {
            var b, c, d, e, f = this;
            for (a || (a = this.converters), b = this.pos, d = a.length, c = 0; c < d; c += 1)
                if (f.pos = b, e = a[c](f)) return e;
            return null
        },
        getLinePos: function(a) {
            for (var b, c = this, d = 0, e = 0; a >= c.lineEnds[d];) e = c.lineEnds[d], d += 1;
            return b = a - e, [d + 1, b + 1, a]
        },
        error: function(a) {
            var b = this.getLinePos(this.pos),
                c = b[0],
                d = b[1],
                e = this.lines[b[0] - 1],
                f = 0,
                g = e.replace(/\t/g, function(a, c) {
                    return c < b[1] && (f += 1), "  "
                }) + "\n" + new Array(b[1] + f).join(" ") + "^----",
                h = new Xh("" + a + " at line " + c + " character " + d + ":\n" + g);
            throw h.line = b[0], h.character = b[1], h.shortMessage = a, h
        },
        matchString: function(a) {
            if (this.str.substr(this.pos, a.length) === a) return this.pos += a.length, a
        },
        matchPattern: function(a) {
            var b;
            if (b = a.exec(this.remaining())) return this.pos += b[0].length, b[1] || b[0]
        },
        allowWhitespace: function() {
            this.matchPattern(ji)
        },
        remaining: function() {
            return this.str.substring(this.pos)
        },
        nextChar: function() {
            return this.str.charAt(this.pos)
        }
    }, Wh.extend = function(a) {
        var b, c, d = this;
        b = function(a, b) {
            Wh.call(this, a, b)
        }, b.prototype = ng(d.prototype);
        for (c in a) vg.call(a, c) && (b.prototype[c] = a[c]);
        return b.extend = Wh.extend, b
    };
    var ki, li, mi, ni = Wh,
        oi = 1,
        pi = 2,
        qi = 3,
        ri = 4,
        si = 5,
        ti = 6,
        ui = 7,
        vi = 8,
        wi = 9,
        xi = 10,
        yi = 13,
        zi = 14,
        Ai = 15,
        Bi = 16,
        Ci = 17,
        Di = 18,
        Ei = 19,
        Fi = 20,
        Gi = 21,
        Hi = 22,
        Ii = 23,
        Ji = 24,
        Ki = 25,
        Li = 26,
        Mi = 27,
        Ni = 30,
        Oi = 31,
        Pi = 32,
        Qi = 33,
        Ri = 34,
        Si = 35,
        Ti = 36,
        Ui = 40,
        Vi = 50,
        Wi = 51,
        Xi = 52,
        Yi = 53,
        Zi = 54,
        $i = 60,
        _i = 61,
        aj = 70,
        bj = 71,
        cj = 72,
        dj = 73,
        ej = /^[^\s=]+/,
        fj = /^\s+/,
        gj = /^(\/(?:[^\n\r\u2028\u2029\/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/,
        hj = /[-\/\\^$*+?.()|[\]{}]/g,
        ij = {},
        jj = function(a, b) {
            return a.search(ij[b.join()] || (ij[b.join()] = new RegExp(b.map(pc).join("|"))))
        },
        kj = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i,
        lj = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i,
        mj = {
            quot: 34,
            amp: 38,
            apos: 39,
            lt: 60,
            gt: 62,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            copy: 169,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            reg: 174,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            sup1: 185,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            Agrave: 192,
            Aacute: 193,
            Acirc: 194,
            Atilde: 195,
            Auml: 196,
            Aring: 197,
            AElig: 198,
            Ccedil: 199,
            Egrave: 200,
            Eacute: 201,
            Ecirc: 202,
            Euml: 203,
            Igrave: 204,
            Iacute: 205,
            Icirc: 206,
            Iuml: 207,
            ETH: 208,
            Ntilde: 209,
            Ograve: 210,
            Oacute: 211,
            Ocirc: 212,
            Otilde: 213,
            Ouml: 214,
            times: 215,
            Oslash: 216,
            Ugrave: 217,
            Uacute: 218,
            Ucirc: 219,
            Uuml: 220,
            Yacute: 221,
            THORN: 222,
            szlig: 223,
            agrave: 224,
            aacute: 225,
            acirc: 226,
            atilde: 227,
            auml: 228,
            aring: 229,
            aelig: 230,
            ccedil: 231,
            egrave: 232,
            eacute: 233,
            ecirc: 234,
            euml: 235,
            igrave: 236,
            iacute: 237,
            icirc: 238,
            iuml: 239,
            eth: 240,
            ntilde: 241,
            ograve: 242,
            oacute: 243,
            ocirc: 244,
            otilde: 245,
            ouml: 246,
            divide: 247,
            oslash: 248,
            ugrave: 249,
            uacute: 250,
            ucirc: 251,
            uuml: 252,
            yacute: 253,
            thorn: 254,
            yuml: 255,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            int: 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
        },
        nj = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376],
        oj = new RegExp("&(#?(?:x[\\w\\d]+|\\d+|" + Object.keys(mj).join("|") + "));?", "g"),
        pj = "function" == typeof String.fromCodePoint,
        qj = pj ? String.fromCodePoint : String.fromCharCode,
        rj = /</g,
        sj = />/g,
        tj = /&/g,
        uj = 65533,
        vj = "Expected a JavaScript expression",
        wj = "Expected closing paren",
        xj = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
    ki = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/, li = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/, mi = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;
    var yj, zj, Aj = function(a) {
            return function(b) {
                for (var c, d = '"', e = !1; !e;) c = b.matchPattern(ki) || b.matchPattern(li) || b.matchString(a), c ? d += '"' === c ? '\\"' : "\\'" === c ? "'" : c : (c = b.matchPattern(mi), c ? d += "\\u" + ("000" + c.charCodeAt(1).toString(16)).slice(-4) : e = !0);
                return d += '"', JSON.parse(d)
            }
        },
        Bj = Aj('"'),
        Cj = Aj("'"),
        Dj = function(a) {
            var b, c;
            return b = a.pos, a.matchString('"') ? (c = Cj(a), a.matchString('"') ? {
                t: Gi,
                v: c
            } : (a.pos = b, null)) : a.matchString("'") ? (c = Bj(a), a.matchString("'") ? {
                t: Gi,
                v: c
            } : (a.pos = b, null)) : null
        },
        Ej = /^[a-zA-Z_$][a-zA-Z_$0-9]*/,
        Fj = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
        Gj = function(a) {
            var b, c;
            return b = a.pos, a.allowWhitespace(), a.matchString("{") ? (c = xc(a), a.allowWhitespace(), a.matchString("}") ? {
                t: Ii,
                m: c
            } : (a.pos = b, null)) : (a.pos = b, null)
        },
        Hj = function(a) {
            var b, c;
            return b = a.pos, a.allowWhitespace(), a.matchString("[") ? (c = yc(a), a.matchString("]") ? {
                t: Hi,
                m: c
            } : (a.pos = b, null)) : (a.pos = b, null)
        },
        Ij = /^(?:~\/|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;
    yj = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null|Object|Number|String|Boolean)\b/, zj = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
    var Jj, Kj, Lj = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:\.(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/,
        Mj = /^[a-zA-Z_$][-\/a-zA-Z_$0-9]*/,
        Nj = /^@(?:keypath|rootpath|index|key|this|global)/,
        Oj = /^\s*\(/,
        Pj = /^\s*\.{3}/,
        Qj = function(a) {
            return zc(a) || Ac(a) || Bc(a)
        },
        Rj = function(a) {
            var b = Qj(a);
            if (!b) return null;
            for (; b;) {
                var c = Cc(a);
                if (c) b = {
                    t: Pi,
                    x: b,
                    r: c
                };
                else {
                    if (!a.matchString("(")) break;
                    a.allowWhitespace();
                    var d = a.spreadArgs;
                    a.spreadArgs = !0;
                    var e = yc(a);
                    a.spreadArgs = d, a.allowWhitespace(), a.matchString(")") || a.error(wj), b = {
                        t: Ui,
                        x: b
                    }, e && (b.o = e)
                }
            }
            return b
        };
    Kj = function(a, b) {
            return function(c) {
                var d;
                return (d = b(c)) ? d : c.matchString(a) ? (c.allowWhitespace(), d = Ec(c), d || c.error(vj), {
                    s: a,
                    o: d,
                    t: Qi
                }) : null
            }
        },
        function() {
            var a, b, c, d, e;
            for (d = "! ~ + - typeof".split(" "), e = Rj, a = 0, b = d.length; a < b; a += 1) c = Kj(d[a], e), e = c;
            Jj = e
        }();
    var Sj, Tj, Uj = Jj;
    Tj = function(a, b) {
            return function(c) {
                var d, e, f;
                if (e = b(c), !e) return null;
                for (;;) {
                    if (d = c.pos, c.allowWhitespace(), !c.matchString(a)) return c.pos = d, e;
                    if ("in" === a && /[a-zA-Z_$0-9]/.test(c.remaining().charAt(0))) return c.pos = d, e;
                    if (c.allowWhitespace(), f = b(c), !f) return c.pos = d, e;
                    e = {
                        t: Ti,
                        s: a,
                        o: [e, f]
                    }
                }
            }
        },
        function() {
            var a, b, c, d, e;
            for (d = "* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "), e = Uj, a = 0, b = d.length; a < b; a += 1) c = Tj(d[a], e), e = c;
            Sj = e
        }();
    var Vj, Wj = Sj,
        Xj = {
            true: !0,
            false: !1,
            null: null,
            undefined: void 0
        },
        Yj = new RegExp("^(?:" + Object.keys(Xj).join("|") + ")"),
        Zj = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,
        $j = /\$\{([^\}]+)\}/g,
        _j = /^\$\{([^\}]+)\}/,
        ak = /^\s*$/,
        bk = ni.extend({
            init: function(a, b) {
                this.values = b.values, this.allowWhitespace()
            },
            postProcess: function(a) {
                return 1 === a.length && ak.test(this.leftover) ? {
                    value: a[0].v
                } : null
            },
            converters: [function(a) {
                if (!a.values) return null;
                var b = a.matchPattern(_j);
                return b && a.values.hasOwnProperty(b) ? {
                    v: a.values[b]
                } : void 0
            }, function(a) {
                var b = a.matchPattern(Yj);
                if (b) return {
                    v: Xj[b]
                }
            }, function(a) {
                var b = a.matchPattern(Zj);
                if (b) return {
                    v: +b
                }
            }, function(a) {
                var b = Dj(a),
                    c = a.values;
                return b && c ? {
                    v: b.v.replace($j, function(a, b) {
                        return b in c ? c[b] : b
                    })
                } : b
            }, function(a) {
                if (!a.matchString("{")) return null;
                var b = {};
                if (a.allowWhitespace(), a.matchString("}")) return {
                    v: b
                };
                for (var c; c = Hc(a);) {
                    if (b[c.key] = c.value, a.allowWhitespace(), a.matchString("}")) return {
                        v: b
                    };
                    if (!a.matchString(",")) return null
                }
                return null
            }, function(a) {
                if (!a.matchString("[")) return null;
                var b = [];
                if (a.allowWhitespace(), a.matchString("]")) return {
                    v: b
                };
                for (var c; c = a.read();) {
                    if (b.push(c.v), a.allowWhitespace(), a.matchString("]")) return {
                        v: b
                    };
                    if (!a.matchString(",")) return null;
                    a.allowWhitespace()
                }
                return null
            }]
        }),
        ck = function(a, b) {
            var c = new bk(a, {
                values: b
            });
            return c.result
        },
        dk = /^([a-zA-Z_$][a-zA-Z_$0-9]*)\(.*\)\s*$/;
    Vj = ni.extend({
        converters: [Ec],
        spreadArgs: !0
    });
    var ek, fk = /^[^\s"'>\/=]+/,
        gk = /^on/,
        hk = /^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,
        ik = /^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,
        jk = /^as-([a-z-A-Z][-a-zA-Z_0-9]*)$/,
        kk = /^([a-zA-Z](?:(?!-in-out)[-a-zA-Z_0-9])*)-(in|out|in-out)$/,
        lk = {
            "intro-outro": {
                t: cj,
                v: "t0"
            },
            intro: {
                t: cj,
                v: "t1"
            },
            outro: {
                t: cj,
                v: "t2"
            },
            lazy: {
                t: dj,
                v: "l"
            },
            twoway: {
                t: dj,
                v: "t"
            },
            decorator: {
                t: bj
            }
        },
        mk = /^[^\s"'=<>`]+/,
        nk = {
            t: xi,
            exclude: !0
        },
        ok = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/,
        pk = /^as/i,
        qk = /^yield\s*/,
        rk = /^\s*else\s*/,
        sk = /^\s*elseif\s+/,
        tk = {
            each: Xi,
            if: Vi,
            with: Zi,
            unless: Wi
        },
        uk = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        vk = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        wk = new RegExp("^(" + Object.keys(tk).join("|") + ")\\b"),
        xk = "<!--",
        yk = "-->",
        zk = /^[ \t\f\r\n]*\r?\n/,
        Ak = /\r?\n[ \t\f\r\n]*$/,
        Bk = function(a) {
            var b, c, d, e, f;
            for (b = 1; b < a.length; b += 1) c = a[b], d = a[b - 1], e = a[b - 2], gd(c) && hd(d) && gd(e) && Ak.test(e) && zk.test(c) && (a[b - 2] = e.replace(Ak, "\n"), a[b] = c.replace(zk, "")), id(c) && gd(d) && Ak.test(d) && gd(c.f[0]) && zk.test(c.f[0]) && (a[b - 1] = d.replace(Ak, "\n"), c.f[0] = c.f[0].replace(zk, "")), gd(c) && id(d) && (f = C(d.f), gd(f) && Ak.test(f) && zk.test(c) && (d.f[d.f.length - 1] = f.replace(Ak, "\n"), a[b] = c.replace(zk, "")));
            return a
        },
        Ck = function(a, b, c) {
            var d;
            b && (d = a[0], "string" == typeof d && (d = d.replace(b, ""), d ? a[0] = d : a.shift())), c && (d = C(a), "string" == typeof d && (d = d.replace(c, ""), d ? a[a.length - 1] = d : a.pop()))
        },
        Dk = /[ \t\f\r\n]+/g,
        Ek = /^(?:pre|script|style|textarea)$/i,
        Fk = /^[ \t\f\r\n]+/,
        Gk = /[ \t\f\r\n]+$/,
        Hk = /^(?:\r\n|\r|\n)/,
        Ik = /(?:\r\n|\r|\n)$/,
        Jk = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/,
        Kk = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,
        Lk = /^[\s\n\/>]/,
        Mk = {
            exclude: !0
        };
    ek = {
        li: ["li"],
        dt: ["dt", "dd"],
        dd: ["dt", "dd"],
        p: "address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),
        rt: ["rt", "rp"],
        rp: ["rt", "rp"],
        optgroup: ["optgroup"],
        option: ["option", "optgroup"],
        thead: ["tbody", "tfoot"],
        tbody: ["tbody", "tfoot"],
        tfoot: ["tbody"],
        tr: ["tr", "tbody"],
        td: ["td", "th", "tr"],
        th: ["td", "th", "tr"]
    };
    var Nk, Ok = /^<!--\s*/,
        Pk = /s*>\s*([a-zA-Z_$][-a-zA-Z_$0-9]*)\s*/,
        Qk = /\s*-->/,
        Rk = /^\s*#\s*partial\s+/,
        Sk = [Yc, Vc, ed, ad, _c, Zc],
        Tk = [Uc],
        Uk = [Vc, ed, _c];
    vd.computedStrings = function(a) {
        return a ? void Object.keys(a).forEach(function(b) {
            var c = a[b];
            "string" == typeof c && (a[b] = kc(c))
        }) : []
    };
    var Vk = [Qc, fd, ld, nd],
        Wk = [od, pd];
    Nk = ni.extend({
        init: function(a, b) {
            var c = b.tripleDelimiters || ["{{{", "}}}"],
                d = b.staticDelimiters || ["[[", "]]"],
                e = b.staticTripleDelimiters || ["[[[", "]]]"];
            this.standardDelimiters = b.delimiters || ["{{", "}}"], this.tags = [{
                isStatic: !1,
                isTriple: !1,
                open: this.standardDelimiters[0],
                close: this.standardDelimiters[1],
                readers: Sk
            }, {
                isStatic: !1,
                isTriple: !0,
                open: c[0],
                close: c[1],
                readers: Tk
            }, {
                isStatic: !0,
                isTriple: !1,
                open: d[0],
                close: d[1],
                readers: Uk
            }, {
                isStatic: !0,
                isTriple: !0,
                open: e[0],
                close: e[1],
                readers: Tk
            }], this.sortMustacheTags(), this.sectionDepth = 0, this.elementStack = [], this.interpolate = {
                script: !b.interpolate || b.interpolate.script !== !1,
                style: !b.interpolate || b.interpolate.style !== !1,
                textarea: !0
            }, b.sanitize === !0 && (b.sanitize = {
                elements: "applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),
                eventAttributes: !0
            }), this.stripComments = b.stripComments !== !1, this.preserveWhitespace = b.preserveWhitespace, this.sanitizeElements = b.sanitize && b.sanitize.elements, this.sanitizeEventAttributes = b.sanitize && b.sanitize.eventAttributes, this.includeLinePositions = b.includeLinePositions, this.textOnlyMode = b.textOnlyMode, this.csp = b.csp
        },
        postProcess: function(a) {
            if (!a.length) return {
                t: [],
                v: gi
            };
            if (this.sectionDepth > 0 && this.error("A section was left open"), jd(a[0].t, this.stripComments, this.preserveWhitespace, !this.preserveWhitespace, !this.preserveWhitespace), this.csp !== !1) {
                var b = {};
                rd(a[0].t, b), Object.keys(b).length && (a[0].e = b)
            }
            return a[0]
        },
        converters: [qd],
        sortMustacheTags: function() {
            this.tags.sort(function(a, b) {
                return b.open.length - a.open.length
            })
        }
    });
    var Xk = ["delimiters", "tripleDelimiters", "staticDelimiters", "staticTripleDelimiters", "csp", "interpolate", "preserveWhitespace", "sanitize", "stripComments"],
        Yk = "Either preparse or use a ractive runtime source that includes the parser. ",
        Zk = "Either use:\n\n\tRactive.parse.computedStrings( component.computed )\n\nat build time to pre-convert the strings to functions, or use functions instead of strings in computed properties.",
        $k = {
            fromId: function(a, b) {
                if (!Uf) {
                    if (b && b.noThrow) return;
                    throw new Error("Cannot retrieve template #" + a + " as Ractive is not running in a browser.")
                }
                a && (a = a.replace(/^#/, ""));
                var c;
                if (!(c = Uf.getElementById(a))) {
                    if (b && b.noThrow) return;
                    throw new Error("Could not find template element with id #" + a)
                }
                if ("SCRIPT" !== c.tagName.toUpperCase()) {
                    if (b && b.noThrow) return;
                    throw new Error("Template element with id #" + a + ", must be a <script> element")
                }
                return "textContent" in c ? c.textContent : c.innerHTML
            },
            isParsed: function(a) {
                return !("string" == typeof a)
            },
            getParseOptions: function(a) {
                return a.defaults && (a = a.defaults), Xk.reduce(function(b, c) {
                    return b[c] = a[c], b
                }, {})
            },
            parse: function(a, b) {
                wd(vd, "template", Yk);
                var c = vd(a, b);
                return mc(c), c
            },
            parseFor: function(a, b) {
                return this.parse(a, this.getParseOptions(b))
            }
        },
        _k = {
            name: "template",
            extend: function(a, b, c) {
                if ("template" in c) {
                    var d = c.template;
                    "function" == typeof d ? b.template = d : b.template = Bd(d, b)
                }
            },
            init: function(a, b, c) {
                var d = "template" in c ? c.template : a.prototype.template;
                if (d = d || {
                        v: gi,
                        t: []
                    }, "function" == typeof d) {
                    var e = d;
                    d = Ad(b, e), b._config.template = {
                        fn: e,
                        result: d
                    }
                }
                d = Bd(d, b), b.template = d.t, d.p && Ed(b.partials, d.p)
            },
            reset: function(a) {
                var b = zd(a);
                if (b) {
                    var c = Bd(b, a);
                    return a.template = c.t, Ed(a.partials, c.p, !0), !0
                }
            }
        },
        al = ["adaptors", "components", "computed", "decorators", "easing", "events", "interpolators", "partials", "transitions"],
        bl = function(a, b) {
            this.name = a, this.useDefaults = b
        };
    bl.prototype.extend = function(a, b, c) {
        this.configure(this.useDefaults ? a.defaults : a, this.useDefaults ? b : b.constructor, c)
    }, bl.prototype.init = function() {}, bl.prototype.configure = function(a, b, c) {
        var d = this.name,
            e = c[d],
            f = ng(a[d]);
        for (var g in e) f[g] = e[g];
        b[d] = f
    }, bl.prototype.reset = function(a) {
        var b = a[this.name],
            c = !1;
        return Object.keys(b).forEach(function(a) {
            var d = b[a];
            d._fn && (d._fn.isOwner ? b[a] = d._fn : delete b[a], c = !0)
        }), c
    };
    var cl = al.map(function(a) {
            return new bl(a, "computed" === a)
        }),
        dl = {
            adapt: $h,
            css: ei,
            data: fi,
            template: _k
        },
        el = Object.keys(Qf),
        fl = Md(el.filter(function(a) {
            return !dl[a]
        })),
        gl = Md(el.concat(cl.map(function(a) {
            return a.name
        }))),
        hl = [].concat(el.filter(function(a) {
            return !cl[a] && !dl[a]
        }), cl, dl.template, dl.css),
        il = {
            extend: function(a, b, c) {
                return Kd("extend", a, b, c)
            },
            init: function(a, b, c) {
                return Kd("init", a, b, c)
            },
            reset: function(a) {
                return hl.filter(function(b) {
                    return b.reset && b.reset(a)
                }).map(function(a) {
                    return a.name
                })
            },
            order: hl
        },
        jl = ["template", "partials", "components", "decorators", "events"],
        kl = new Gg("complete"),
        ll = new Gg("reset"),
        ml = new Gg("render"),
        nl = new Gg("unrender"),
        ol = function(a, b) {
            var c = [];
            Od(this.fragment.items, a, !1, c);
            var d = Pg.start(this, !0);
            return this.partials[a] = b, c.forEach(Pd), Pg.end(), d
        },
        pl = function(a) {
            this.parentFragment = a.parentFragment, this.ractive = a.parentFragment.ractive, this.template = a.template, this.index = a.index, this.type = a.template.t, this.dirty = !1
        };
    pl.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.parentFragment.bubble())
    }, pl.prototype.destroyed = function() {}, pl.prototype.find = function() {
        return null
    }, pl.prototype.findAll = function() {}, pl.prototype.findComponent = function() {
        return null
    }, pl.prototype.findAllComponents = function() {}, pl.prototype.findNextNode = function() {
        return this.parentFragment.findNextNode(this)
    }, pl.prototype.shuffled = function() {
        this.fragment && this.fragment.shuffled()
    }, pl.prototype.valueOf = function() {
        return this.toString()
    };
    var ql = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.get = function(a) {
                a && ya(this);
                var b = this.parent.get();
                return b ? b[this.key] : void 0
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.deps.forEach(Ba), this.children.forEach(Ba),
                    this.clearUnresolveds()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var c = new b(this, a);
                    this.children.push(c), this.childByKey[a] = c
                }
                return this.childByKey[a]
            }, b
        }(qh),
        rl = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, b.ractive.viewmodel, null), this.fragment = b, this.template = c, this.isReadonly = !0, this.dirty = !0, this.fn = lc(c.s, c.r.length), this.resolvers = [], this.models = this.template.r.map(function(a, b) {
                    var c = Va(d.fragment, a);
                    return c || Qd(d, a, b), c
                }), this.shuffle = void 0, this.bubble()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function(a) {
                void 0 === a && (a = !0), this.registered && delete this.root.expressions[this.keypath], this.keypath = void 0, a && (this.dirty = !0, this.handleChange())
            }, b.prototype.get = function(a) {
                return a && ya(this), this.dirty && (this.dirty = !1, this.value = this.getValue(), this.adapt()), a && this.wrapper ? this.wrapper.value : this.value
            }, b.prototype.getKeypath = function() {
                var a = this;
                return this.template ? (this.keypath || (this.keypath = "@" + this.template.s.replace(/_(\d+)/g, function(b, c) {
                    if (c >= a.models.length) return b;
                    var d = a.models[c];
                    return d ? d.getKeypath() : "@undefined"
                }), this.root.expressions[this.keypath] = this, this.registered = !0), this.keypath) : "@undefined"
            }, b.prototype.getValue = function() {
                var a = this;
                wa();
                var b;
                try {
                    var c = this.models.map(function(a) {
                        return a ? a.get(!0) : void 0
                    });
                    b = this.fn.apply(this.fragment.ractive, c)
                } catch (a) {
                    s("Failed to compute " + this.getKeypath() + ": " + (a.message || a))
                }
                var d = xa();
                return this.dependencies && this.dependencies.forEach(function(b) {
                    return b.unregister(a)
                }), this.dependencies = d, this.dependencies.forEach(function(b) {
                    return b.register(a)
                }), b
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.links.forEach(Da), this.deps.forEach(Ba), this.children.forEach(Ba), this.clearUnresolveds()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var b = new ql(this, a);
                    this.children.push(b), this.childByKey[a] = b
                }
                return this.childByKey[a]
            }, b.prototype.mark = function() {
                this.handleChange()
            }, b.prototype.rebinding = function(a, b, c) {
                var d = this.models.indexOf(b);
                ~d && (a = Qa(this.template.r[d], a, b), a !== b && (b.unregister(this), this.models.splice(d, 1, a), a && a.addShuffleRegister(this, "mark"))), this.bubble(!c)
            }, b.prototype.retrieve = function() {
                return this.get()
            }, b.prototype.teardown = function() {
                var b = this;
                this.unbind(), this.fragment = void 0, this.dependencies && this.dependencies.forEach(function(a) {
                    return a.unregister(b)
                }), a.prototype.teardown.call(this)
            }, b.prototype.unregister = function(b) {
                a.prototype.unregister.call(this, b), this.deps.length || this.teardown()
            }, b.prototype.unbind = function() {
                this.resolvers.forEach(Ha)
            }, b
        }(qh),
        sl = function(a) {
            function b(b, c) {
                a.call(this, b, c)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.applyValue = function(a) {
                if (!k(a, this.value))
                    for (var b = this.parent, c = [this.key]; b;) {
                        if (b.base) {
                            var d = b.model.joinAll(c);
                            d.applyValue(a);
                            break
                        }
                        c.unshift(b.key), b = b.parent
                    }
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var c = new b(this, a);
                    this.children.push(c), this.childByKey[a] = c
                }
                return this.childByKey[a]
            }, b.prototype.retrieve = function() {
                var a = this.parent.get();
                return a && this.key in a ? a[this.key] : void 0
            }, b
        }(qh),
        tl = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, null, null), this.dirty = !0, this.root = b.ractive.viewmodel, this.template = c, this.resolvers = [], this.base = Rd(b, c);
                var e;
                this.base || (e = b.resolve(c.r, function(a) {
                    d.base = a, d.bubble(), D(d.resolvers, e)
                }), this.resolvers.push(e));
                var f = this.intermediary = {
                    handleChange: function() {
                        return d.handleChange()
                    },
                    rebinding: function(a, b) {
                        if (b === d.base) a = Qa(c, a, b), a !== d.base && (d.base.unregister(f), d.base = a);
                        else {
                            var e = d.members.indexOf(b);
                            ~e && (a = Qa(c.m[e].n, a, b), a !== d.members[e] && d.members.splice(e, 1, a))
                        }
                        a !== b && b.unregister(f), a && a.addShuffleTask(function() {
                            return a.register(f)
                        }), d.bubble()
                    }
                };
                this.members = c.m.map(function(a, c) {
                    if ("string" == typeof a) return {
                        get: function() {
                            return a
                        }
                    };
                    var e, g;
                    return a.t === Ni ? (e = Va(b, a.n), e ? e.register(f) : (g = b.resolve(a.n, function(a) {
                        d.members[c] = a, a.register(f), d.handleChange(), D(d.resolvers, g)
                    }), d.resolvers.push(g)), e) : (e = new rl(b, a), e.register(f), e)
                }), this.isUnresolved = !0, this.bubble()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                this.base && (this.dirty || this.handleChange())
            }, b.prototype.forceResolution = function() {
                this.resolvers.forEach(function(a) {
                    return a.forceResolution()
                }), this.dirty = !0, this.bubble()
            }, b.prototype.get = function(a) {
                var b = this;
                if (this.dirty) {
                    this.bubble();
                    for (var c = this.members.length, d = !0; d && c--;) b.members[c] || (d = !1);
                    if (this.base && d) {
                        var e = this.members.map(function(a) {
                                return P(String(a.get()))
                            }),
                            f = this.base.joinAll(e);
                        f !== this.model && (this.model && (this.model.unregister(this), this.model.unregisterTwowayBinding(this)), this.model = f, this.parent = f.parent, this.model.register(this), this.model.registerTwowayBinding(this), this.keypathModel && this.keypathModel.handleChange())
                    }
                    return this.value = this.model ? this.model.get(a) : void 0, this.dirty = !1, this.mark(), this.value
                }
                return this.model ? this.model.get(a) : void 0
            }, b.prototype.getValue = function() {
                var a = this;
                this.value = this.model ? this.model.get() : void 0;
                for (var b = this.bindings.length; b--;) {
                    var c = a.bindings[b].getValue();
                    if (c !== a.value) return c
                }
                var d = Oa(this.deps);
                return d ? d.value : this.value
            }, b.prototype.getKeypath = function() {
                return this.model ? this.model.getKeypath() : "@undefined"
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.mark()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var b = new sl(this, a);
                    this.children.push(b), this.childByKey[a] = b
                }
                return this.childByKey[a]
            }, b.prototype.mark = function() {
                this.dirty && this.deps.forEach(Ba), this.links.forEach(Da), this.children.forEach(Ca), this.clearUnresolveds()
            }, b.prototype.retrieve = function() {
                return this.value
            }, b.prototype.rebinding = function() {}, b.prototype.set = function(a) {
                if (!this.model) throw new Error("Unresolved reference expression. This should not happen!");
                this.model.set(a)
            }, b.prototype.unbind = function() {
                this.resolvers.forEach(Ha), this.model && (this.model.unregister(this), this.model.unregisterTwowayBinding(this))
            }, b
        }(qh),
        ul = function(b) {
            function c(a) {
                b.call(this, a), this.fragment = null
            }
            return c.prototype = Object.create(b && b.prototype), c.prototype.constructor = c, c.prototype.bind = function() {
                Sd(this), this.fragment = new An({
                    owner: this,
                    template: this.template.f
                }).bind()
            }, c.prototype.detach = function() {
                return this.fragment ? this.fragment.detach() : a()
            }, c.prototype.find = function(a) {
                if (this.fragment) return this.fragment.find(a)
            }, c.prototype.findAll = function(a, b) {
                this.fragment && this.fragment.findAll(a, b)
            }, c.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, c.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, c.prototype.firstNode = function(a) {
                return this.fragment && this.fragment.firstNode(a)
            }, c.prototype.rebinding = function() {
                var a = this;
                this.locked || (this.locked = !0, Pg.scheduleTask(function() {
                    a.locked = !1, Sd(a)
                }))
            }, c.prototype.render = function(a) {
                this.rendered = !0, this.fragment && this.fragment.render(a)
            }, c.prototype.toString = function(a) {
                return this.fragment ? this.fragment.toString(a) : ""
            }, c.prototype.unbind = function() {
                this.aliases = {}, this.fragment && this.fragment.unbind()
            }, c.prototype.unrender = function(a) {
                this.rendered && this.fragment && this.fragment.unrender(a), this.rendered = !1
            }, c.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment.update())
            }, c
        }(pl),
        vl = function(a) {
            return a.replace(/-([a-zA-Z])/g, function(a, b) {
                return b.toUpperCase()
            })
        },
        wl = /\s+/,
        xl = {
            float: "cssFloat"
        },
        yl = /\/\*(?:[\s\S]*?)\*\//g,
        zl = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\1).)*\2/gi,
        Al = /\0(\d+)/g,
        Bl = [void 0, "text", "search", "url", "email", "hidden", "password", "search", "reset", "submit"],
        Cl = {
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            bgcolor: "bgColor",
            class: "className",
            codebase: "codeBase",
            colspan: "colSpan",
            contenteditable: "contentEditable",
            datetime: "dateTime",
            dirname: "dirName",
            for: "htmlFor",
            "http-equiv": "httpEquiv",
            ismap: "isMap",
            maxlength: "maxLength",
            novalidate: "noValidate",
            pubdate: "pubDate",
            readonly: "readOnly",
            rowspan: "rowSpan",
            tabindex: "tabIndex",
            usemap: "useMap"
        },
        Dl = function(a) {
            function b(b) {
                a.call(this, b), this.name = b.template.n, this.namespace = null, this.owner = b.owner || b.parentFragment.owner || b.element || Td(b.parentFragment), this.element = b.element || (this.owner.attributeByName ? this.owner : Td(b.parentFragment)), this.parentFragment = b.parentFragment, this.ractive = this.parentFragment.ractive, this.rendered = !1, this.updateDelegate = null, this.fragment = null, this.element.attributeByName[this.name] = this, j(b.template.f) ? this.fragment = new An({
                    owner: this,
                    template: b.template.f
                }) : (this.value = b.template.f, 0 === this.value && (this.value = "")), this.interpolator = this.fragment && 1 === this.fragment.items.length && this.fragment.items[0].type === pi && this.fragment.items[0], this.interpolator && (this.interpolator.owner = this)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.parentFragment.bubble(), this.element.bubble(), this.dirty = !0)
            }, b.prototype.destroyed = function() {
                this.updateDelegate(!0)
            }, b.prototype.getString = function() {
                return this.fragment ? this.fragment.toString() : null != this.value ? "" + this.value : ""
            }, b.prototype.getValue = function() {
                return this.fragment ? this.fragment.valueOf() : !!kj.test(this.name) || this.value
            }, b.prototype.render = function() {
                var a = this.element.node;
                if (this.node = a, a.namespaceURI && a.namespaceURI !== mg.html || (this.propertyName = Cl[this.name] || this.name, void 0 !== a[this.propertyName] && (this.useProperty = !0), (kj.test(this.name) || this.isTwoway) && (this.isBoolean = !0), "value" === this.propertyName && (a._ractive.value = this.value)), a.namespaceURI) {
                    var b = this.name.indexOf(":");
                    b !== -1 ? this.namespace = le(a, this.name.slice(0, b)) : this.namespace = a.namespaceURI
                }
                this.rendered = !0, this.updateDelegate = Wd(this), this.updateDelegate()
            }, b.prototype.toString = function() {
                var a = this.getValue();
                if ("value" !== this.name || void 0 === this.element.getAttribute("contenteditable") && "select" !== this.element.name && "textarea" !== this.element.name) {
                    if ("name" === this.name && "input" === this.element.name && this.interpolator && "radio" === this.element.getAttribute("type")) return 'name="{{' + this.interpolator.model.getKeypath() + '}}"';
                    if (this.owner !== this.element || "style" !== this.name && "class" !== this.name && !this.styleName && !this.inlineClass) {
                        if (kj.test(this.name)) return a ? this.name : "";
                        if (null == a) return "";
                        var b = e(this.getString());
                        return b ? "" + this.name + '="' + b + '"' : this.name
                    }
                }
            }, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind()
            }, b.prototype.unrender = function() {
                this.updateDelegate(!0), this.rendered = !1
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment && this.fragment.update(), this.rendered && this.updateDelegate(), this.isTwoway && !this.locked && this.interpolator.twowayBinding.lastVal(!0, this.interpolator.model.get()))
            }, b
        }(pl),
        El = function(a) {
            function b(b) {
                a.call(this, b), this.owner = b.owner || b.parentFragment.owner || Td(b.parentFragment), this.element = this.owner.attributeByName ? this.owner : Td(b.parentFragment), this.flag = "l" === b.template.v ? "lazy" : "twoway", this.element.type === ui && (j(b.template.f) && (this.fragment = new An({
                    owner: this,
                    template: b.template.f
                })), this.interpolator = this.fragment && 1 === this.fragment.items.length && this.fragment.items[0].type === pi && this.fragment.items[0])
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind(), me(this, this.getValue(), !0)
            }, b.prototype.bubble = function() {
                this.dirty || (this.element.bubble(), this.dirty = !0)
            }, b.prototype.getValue = function() {
                return this.fragment ? this.fragment.valueOf() : "value" in this ? this.value : !("f" in this.template) || this.template.f
            }, b.prototype.render = function() {
                me(this, this.getValue(), !0)
            }, b.prototype.toString = function() {
                return ""
            }, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind(), delete this.element[this.flag]
            }, b.prototype.unrender = function() {
                this.element.rendered && this.element.recreateTwowayBinding()
            }, b.prototype.update = function() {
                this.dirty && (this.fragment && this.fragment.update(), me(this, this.getValue(), !0))
            }, b
        }(pl),
        Fl = Uf ? Xf("div") : null,
        Gl = !1,
        Hl = function(a) {
            function b(b) {
                a.call(this, b), this.attributes = [], this.owner = b.owner, this.fragment = new An({
                    ractive: this.ractive,
                    owner: this,
                    template: this.template
                }), this.fragment.findNextNode = xg, this.dirty = !1
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment.bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.dirty = !0, this.owner.bubble())
            }, b.prototype.render = function() {
                this.node = this.owner.node, this.node && (this.isSvg = this.node.namespaceURI === ig), Gl = !0, this.rendered || this.fragment.render(), Gl = !1, this.rendered = !0, this.dirty = !0, this.update()
            }, b.prototype.toString = function() {
                return this.fragment.toString()
            }, b.prototype.unbind = function() {
                this.fragment.unbind()
            }, b.prototype.unrender = function() {
                this.rendered = !1, this.fragment.unrender()
            }, b.prototype.update = function() {
                var a, b, c = this;
                this.dirty && (this.dirty = !1, Gl = !0, this.fragment.update(), Gl = !1, this.rendered && this.node && (a = this.fragment.toString(), b = pe(a, this.isSvg), this.attributes.filter(function(a) {
                    return qe(b, a)
                }).forEach(function(a) {
                    c.node.removeAttribute(a.name)
                }), b.forEach(function(a) {
                    c.node.setAttribute(a.name, a.value)
                }), this.attributes = b))
            }, b
        }(pl),
        Il = function(a, b, c, d) {
            var e = a.__model;
            d && e.shuffle(d)
        },
        Jl = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        Kl = [];
    Jl.forEach(function(a) {
        var b = function() {
            for (var b = this, c = [], d = arguments.length; d--;) c[d] = arguments[d];
            var e = Ya(this.length, a, c);
            this._ractive.wrappers.forEach(function(a) {
                a.magic && (a.magic.locked = !0)
            });
            var f = Array.prototype[a].apply(this, arguments);
            Pg.start(), this._ractive.setting = !0;
            for (var g = this._ractive.wrappers.length; g--;) Il(b._ractive.wrappers[g], b, a, e);
            return Pg.end(), this._ractive.setting = !1, this._ractive.wrappers.forEach(function(a) {
                a.magic && (a.magic.locked = !1)
            }), f
        };
        og(Kl, a, {
            value: b
        })
    });
    var Ll, Ml;
    ({}).__proto__ ? (Ll = function(a) {
        return a.__proto__ = Kl
    }, Ml = function(a) {
        return a.__proto__ = Array.prototype
    }) : (Ll = function(a) {
        for (var b = Jl.length; b--;) {
            var c = Jl[b];
            og(a, c, {
                value: Kl[c],
                configurable: !0
            })
        }
    }, Ml = function(a) {
        for (var b = Jl.length; b--;) delete a[Jl[b]]
    }), Ll.unpatch = Ml;
    var Nl = Ll,
        Ol = "Something went wrong in a rather interesting way",
        Pl = {
            filter: function(a) {
                return j(a) && (!a._ractive || !a._ractive.setting)
            },
            wrap: function(a, b, c) {
                return new Ql(a, b, c)
            }
        },
        Ql = function(a, b) {
            this.root = a, this.value = b, this.__model = null, b._ractive || (og(b, "_ractive", {
                value: {
                    wrappers: [],
                    instances: [],
                    setting: !1
                },
                configurable: !0
            }), Nl(b)), b._ractive.instances[a._guid] || (b._ractive.instances[a._guid] = 0, b._ractive.instances.push(a)), b._ractive.instances[a._guid] += 1, b._ractive.wrappers.push(this)
        };
    Ql.prototype.get = function() {
        return this.value
    }, Ql.prototype.reset = function(a) {
        return this.value === a
    }, Ql.prototype.teardown = function() {
        var a, b, c, d, e;
        if (a = this.value, b = a._ractive, c = b.wrappers, d = b.instances, b.setting) return !1;
        if (e = c.indexOf(this), e === -1) throw new Error(Ol);
        if (c.splice(e, 1), c.length) {
            if (d[this.root._guid] -= 1, !d[this.root._guid]) {
                if (e = d.indexOf(this.root), e === -1) throw new Error(Ol);
                d.splice(e, 1)
            }
        } else delete a._ractive, Nl.unpatch(this.value)
    };
    var Rl;
    try {
        Object.defineProperty({}, "test", {
            get: function() {},
            set: function() {}
        }), Rl = {
            filter: function(a) {
                return a && "object" == typeof a
            },
            wrap: function(a, b, c) {
                return new Tl(a, b, c)
            }
        }
    } catch (a) {
        Rl = !1
    }
    var Sl = Rl,
        Tl = function(a, b, c) {
            var d = this;
            this.ractive = a, this.value = b, this.keypath = c, this.originalDescriptors = {}, Object.keys(b).forEach(function(b) {
                var e = Object.getOwnPropertyDescriptor(d.value, b);
                d.originalDescriptors[b] = e;
                var f = c ? "" + c + "." + P(b) : P(b),
                    g = re(e, a, f, d);
                Object.defineProperty(d.value, b, g)
            })
        };
    Tl.prototype.get = function() {
        return this.value
    }, Tl.prototype.reset = function(a) {
        return this.value === a
    }, Tl.prototype.set = function(a, b) {
        this.value[a] = b
    }, Tl.prototype.teardown = function() {
        var a = this;
        Object.keys(this.value).forEach(function(b) {
            var c = Object.getOwnPropertyDescriptor(a.value, b);
            c.set && c.set.__magic && (se(c), 1 === c.set.__magic.dependants.length && Object.defineProperty(a.value, b, c.set.__magic.originalDescriptor))
        })
    };
    var Ul = function(a, b, c) {
        this.value = b, this.magic = !0, this.magicWrapper = Sl.wrap(a, b, c), this.arrayWrapper = Pl.wrap(a, b, c), this.arrayWrapper.magic = this.magicWrapper, Object.defineProperty(this, "__model", {
            get: function() {
                return this.arrayWrapper.__model
            },
            set: function(a) {
                this.arrayWrapper.__model = a
            }
        })
    };
    Ul.prototype.get = function() {
        return this.value
    }, Ul.prototype.teardown = function() {
        this.arrayWrapper.teardown(), this.magicWrapper.teardown()
    }, Ul.prototype.reset = function(a) {
        return this.arrayWrapper.reset(a) && this.magicWrapper.reset(a)
    };
    var Vl = {
            filter: function(a, b, c) {
                return Sl.filter(a, b, c) && Pl.filter(a)
            },
            wrap: function(a, b, c) {
                return new Ul(a, b, c)
            }
        },
        Wl = function(a) {
            function b(b, c, d) {
                a.call(this, null, null), this.root = this.parent = b, this.signature = c, this.key = d, this.isExpression = d && "@" === d[0], this.isReadonly = !this.signature.setter, this.context = b.computationContext, this.dependencies = [], this.children = [], this.childByKey = {}, this.deps = [], this.dirty = !0, this.shuffle = void 0
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.get = function(a) {
                return a && ya(this), this.dirty && (this.dirty = !1, this.value = this.getValue(), this.adapt()), a && this.wrapper ? this.wrapper.value : this.value
            }, b.prototype.getValue = function() {
                wa();
                var a;
                try {
                    a = this.signature.getter.call(this.context)
                } catch (a) {
                    if (s("Failed to compute " + this.getKeypath() + ": " + (a.message || a)), Wf) {
                        console.groupCollapsed && console.groupCollapsed("%cshow details", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;");
                        var b = te(this.signature.getterString),
                            c = this.signature.getterUseStack ? "\n\n" + ue(a.stack) : "";
                        console.error("" + a.name + ": " + a.message + "\n\n" + b + c), console.groupCollapsed && console.groupEnd()
                    }
                }
                var d = xa();
                return this.setDependencies(d), a
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.links.forEach(Da), this.deps.forEach(Ba), this.children.forEach(Ba), this.clearUnresolveds()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var b = new ql(this, a);
                    this.children.push(b), this.childByKey[a] = b
                }
                return this.childByKey[a]
            }, b.prototype.mark = function() {
                this.handleChange()
            }, b.prototype.rebinding = function(a, b) {
                a !== b && this.handleChange()
            }, b.prototype.set = function(a) {
                if (!this.signature.setter) throw new Error("Cannot set read-only computed value '" + this.key + "'");
                this.signature.setter(a)
            }, b.prototype.setDependencies = function(a) {
                for (var b = this, c = this.dependencies.length; c--;) {
                    var d = b.dependencies[c];
                    ~a.indexOf(d) || d.unregister(b)
                }
                for (c = a.length; c--;) {
                    var e = a[c];
                    ~b.dependencies.indexOf(e) || e.register(b)
                }
                this.dependencies = a
            }, b.prototype.teardown = function() {
                for (var b = this, c = this.dependencies.length; c--;) b.dependencies[c] && b.dependencies[c].unregister(b);
                this.root.computations[this.key] === this && delete this.root.computations[this.key], a.prototype.teardown.call(this)
            }, b.prototype.unregister = function(b) {
                a.prototype.unregister.call(this, b), this.isExpression && 0 === this.deps.length && this.teardown()
            }, b
        }(qh),
        Xl = function(a) {
            function b(b) {
                a.call(this, null, ""), this.value = b, this.isRoot = !0, this.root = this, this.adaptors = [], this.ractive = b, this.changes = {}
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getKeypath = function() {
                return "@this"
            }, b
        }(qh),
        Yl = Object.prototype.hasOwnProperty,
        Zl = function(a) {
            function b(b) {
                a.call(this, null, null), this.changes = {}, this.isRoot = !0, this.root = this, this.ractive = b.ractive, this.value = b.data, this.adaptors = b.adapt, this.adapt(), this.computationContext = b.ractive, this.computations = {}, this.expressions = {}
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.applyChanges = function() {
                return this._changeHash = {}, this.flush(), this._changeHash
            }, b.prototype.compute = function(a, b) {
                var c = new Wl(this, b, a);
                return this.computations[a] = c, c
            }, b.prototype.createLink = function(a, b, c) {
                for (var d = this, e = R(a), f = this; e.length;) {
                    var g = e.shift();
                    f = d.childByKey[g] || d.joinKey(g)
                }
                return f.link(b, c)
            }, b.prototype.get = function(a, b) {
                var c = this;
                if (a && ya(this), b && b.virtual === !1) return this.value;
                for (var d = this.getVirtual(), e = Object.keys(this.computations), f = e.length; f--;) {
                    var g = c.computations[e[f]];
                    g.isExpression || (d[e[f]] = g.get())
                }
                return d
            }, b.prototype.getKeypath = function() {
                return ""
            }, b.prototype.getRactiveModel = function() {
                return this.ractiveModel || (this.ractiveModel = new Xl(this.ractive))
            }, b.prototype.getValueChildren = function() {
                var b = a.prototype.getValueChildren.call(this, this.value);
                this.children.forEach(function(a) {
                    if (a._link) {
                        var c = b.indexOf(a);
                        ~c ? b.splice(c, 1, a._link) : b.push(a._link)
                    }
                });
                for (var c in this.computations) b.push(this.computations[c]);
                return b
            }, b.prototype.handleChange = function() {
                this.deps.forEach(Ba)
            }, b.prototype.has = function(a) {
                var b = this.value;
                if (a = S(a), Yl.call(b, a)) return !0;
                if (a in this.computations || this.childByKey[a] && this.childByKey[a]._link) return !0;
                if (a in this.expressions) return !0;
                for (var c = b.constructor; c !== Function && c !== Array && c !== Object;) {
                    if (Yl.call(c.prototype, a)) return !0;
                    c = c.constructor
                }
                return !1
            }, b.prototype.joinKey = function(b, c) {
                return "@global" === b ? sh : "@this" === b ? this.getRactiveModel() : this.expressions.hasOwnProperty(b) ? (s("Accessing expression keypaths (" + b.substr(1) + ") from the instance is deprecated. You can used a getNodeInfo or event object to access keypaths with expression context."), this.expressions[b]) : this.computations.hasOwnProperty(b) ? this.computations[b] : a.prototype.joinKey.call(this, b, c)
            }, b.prototype.map = function(a, b) {
                var c = this.joinKey(a);
                c.link(b)
            }, b.prototype.rebinding = function() {}, b.prototype.set = function(a) {
                var b = this.wrapper;
                if (b) {
                    var c = !b.reset || b.reset(a) === !1;
                    c && (b.teardown(), this.wrapper = null, this.value = a, this.adapt())
                } else this.value = a, this.adapt();
                this.deps.forEach(Ba), this.children.forEach(Ca), this.clearUnresolveds()
            }, b.prototype.retrieve = function() {
                return this.value
            }, b.prototype.update = function() {}, b
        }(qh),
        $l = new Gg("construct"),
        _l = ["adaptors", "components", "decorators", "easing", "events", "interpolators", "partials", "transitions"],
        am = 0,
        bm = function(a) {
            this.hook = new Gg(a), this.inProcess = {}, this.queue = {}
        };
    bm.prototype.begin = function(a) {
        this.inProcess[a._guid] = !0
    }, bm.prototype.end = function(a) {
        var b = a.parent;
        b && this.inProcess[b._guid] ? Be(this.queue, b).push(a) : Ce(this, a), delete this.inProcess[a._guid]
    };
    var cm = new Gg("config"),
        dm = new bm("init"),
        em = function(a, b) {
            a.indexOf("*") !== -1 && o('Only component proxy-events may contain "*" wildcards, <' + b.name + " on-" + a + '="..."/> is not valid'), this.name = a, this.owner = b, this.node = null, this.handler = null
        };
    em.prototype.listen = function(a) {
        var b = this.node = this.owner.node,
            c = this.name;
        "on" + c in b || r(Dg(c, "events")), b.addEventListener(c, this.handler = function(c) {
            a.fire({
                node: b,
                original: c
            })
        }, !1)
    }, em.prototype.unlisten = function() {
        this.node.removeEventListener(this.name, this.handler, !1)
    };
    var fm = function(a, b) {
        this.eventPlugin = a, this.owner = b, this.handler = null
    };
    fm.prototype.listen = function(a) {
        var b = this.owner.node;
        this.handler = this.eventPlugin(b, function(c) {
            void 0 === c && (c = {}), c.node = c.node || b, a.fire(c)
        })
    }, fm.prototype.unlisten = function() {
        this.handler.teardown()
    };
    var gm = function(a, b) {
        this.ractive = a, this.name = b, this.handler = null
    };
    gm.prototype.listen = function(a) {
        var b = this.ractive;
        this.handler = b.on(this.name, function() {
            var c;
            arguments.length && arguments[0] && arguments[0].node && (c = Array.prototype.shift.call(arguments), c.component = b);
            var d = Array.prototype.slice.call(arguments);
            return a.fire(c, d), !1
        })
    }, gm.prototype.unlisten = function() {
        this.handler.cancel()
    };
    var hm = /^(event|arguments)(\..+)?$/,
        im = /^\$(\d+)(\..+)?$/,
        jm = function(a) {
            var b = this;
            this.owner = a.owner || a.parentFragment.owner || Td(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : Td(a.parentFragment), this.template = a.template, this.parentFragment = a.parentFragment, this.ractive = a.parentFragment.ractive, this.events = [], this.element.type === Ai ? this.template.n.split("-").forEach(function(a) {
                b.events.push(new gm(b.element.instance, a))
            }) : this.template.n.split("-").forEach(function(a) {
                var c = u("events", b.ractive, a);
                b.events.push(c ? new fm(c, b.element) : new em(a, b.element))
            }), this.context = null, this.resolvers = null, this.models = null, this.action = null, this.args = null
        };
    jm.prototype.bind = function() {
        var a = this;
        this.context = this.parentFragment.findContext();
        var b = this.template.f;
        b.x ? (this.fn = lc(b.x.s, b.x.r.length), this.resolvers = [], this.models = b.x.r.map(function(b, c) {
            var d = hm.exec(b);
            if (d) return {
                special: d[1],
                keys: d[2] ? R(d[2].substr(1)) : []
            };
            var e = im.exec(b);
            if (e) return {
                special: "arguments",
                keys: [e[1] - 1].concat(e[2] ? R(e[2].substr(1)) : [])
            };
            var f, g = Va(a.parentFragment, b);
            return g ? g.register(a) : (f = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, f), b.register(a)
            }), a.resolvers.push(f)), g
        })) : (this.action = "string" == typeof b ? b : "string" == typeof b.n ? b.n : new An({
            owner: this,
            template: b.n
        }), this.args = b.a ? "string" == typeof b.a ? [b.a] : b.a : b.d ? new An({
            owner: this,
            template: b.d
        }) : []), this.action && "string" != typeof this.action && this.action.bind(), this.args && b.d && this.args.bind()
    }, jm.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.owner.bubble())
    }, jm.prototype.destroyed = function() {
        this.events.forEach(function(a) {
            return a.unlisten()
        })
    }, jm.prototype.fire = function(a, b) {
        if (void 0 === b && (b = []), a && !a.hasOwnProperty("_element") && Ib(a, this.owner), this.fn) {
            var c = [];
            a && b.unshift(a), this.models && this.models.forEach(function(d) {
                if (!d) return c.push(void 0);
                if (d.special) {
                    for (var e = "event" === d.special ? a : b, f = d.keys.slice(); f.length;) e = e[f.shift()];
                    return c.push(e)
                }
                return d.wrapper ? c.push(d.wrapper.value) : void c.push(d.get())
            });
            var d = this.ractive,
                e = d.event;
            d.event = a;
            var f, g = this.fn.apply(d, c).pop();
            g === !1 && (f = a.original) && (f.preventDefault && f.preventDefault(), f.stopPropagation && f.stopPropagation()), d.event = e
        } else {
            var h = this.action.toString(),
                i = this.template.f.d ? this.args.getArgsList() : this.args;
            b.length && (i = i.concat(b)), a && (a.name = h), pa(this.ractive, h, {
                event: a,
                args: i
            })
        }
    }, jm.prototype.handleChange = function() {}, jm.prototype.rebinding = function(a, b) {
        var c = this;
        if (this.models) {
            var d = this.models.indexOf(b);
            ~d && (this.models.splice(d, 1, a), b.unregister(this), a && a.addShuffleTask(function() {
                return a.register(c)
            }))
        }
    }, jm.prototype.render = function() {
        var a = this;
        Pg.scheduleTask(function() {
            return a.events.forEach(function(b) {
                return b.listen(a)
            }, !0)
        })
    }, jm.prototype.toString = function() {
        return ""
    }, jm.prototype.unbind = function() {
        var a = this,
            b = this.template.f;
        b.m ? (this.resolvers && this.resolvers.forEach(Ha), this.resolvers = [], this.models && this.models.forEach(function(b) {
            b.unregister && b.unregister(a)
        }), this.models = null) : (this.action && this.action.unbind && this.action.unbind(), this.args && this.args.unbind && this.args.unbind())
    }, jm.prototype.unrender = function() {
        this.events.forEach(function(a) {
            return a.unlisten()
        })
    }, jm.prototype.update = function() {
        !this.method && this.dirty && (this.dirty = !1, this.action && this.action.update && this.action.update(), this.args && this.args.update && this.args.update())
    };
    var km = new Gg("teardown"),
        lm = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, b), this.type = Ai;
                var e = ng(c.prototype);
                this.instance = e, this.name = b.template.e, this.parentFragment = b.parentFragment, this.liveQueries = [], e.el && s("The <" + this.name + "> component has a default 'el' property; it has been disregarded");
                var f = b.template.p || {};
                "content" in f || (f.content = b.template.f || []), this._partials = f, this.yielders = {};
                for (var g, h = b.parentFragment; h;) {
                    if (h.owner.type === Bi) {
                        g = h.owner.container;
                        break
                    }
                    h = h.parent
                }
                e.parent = this.parentFragment.ractive, e.container = g || null, e.root = e.parent.root, e.component = this, we(this.instance, {
                    partials: f
                }), e._inlinePartials = f, this.attributeByName = {}, this.attributes = [];
                var i = [];
                (this.template.m || []).forEach(function(a) {
                    switch (a.t) {
                        case yi:
                        case aj:
                        case cj:
                            d.attributes.push(rf({
                                owner: d,
                                parentFragment: d.parentFragment,
                                template: a
                            }));
                            break;
                        case dj:
                        case bj:
                            break;
                        default:
                            i.push(a)
                    }
                }), this.attributes.push(new Hl({
                    owner: this,
                    parentFragment: this.parentFragment,
                    template: i
                })), this.eventHandlers = [], this.template.v && this.setupEvents()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.attributes.forEach(za), De(this.instance, {
                    partials: this._partials
                }, {
                    cssIds: this.parentFragment.cssIds
                }), this.eventHandlers.forEach(za), this.bound = !0
            }, b.prototype.bubble = function() {
                this.dirty || (this.dirty = !0, this.parentFragment.bubble())
            }, b.prototype.checkYielders = function() {
                var a = this;
                Object.keys(this.yielders).forEach(function(b) {
                    if (a.yielders[b].length > 1) throw Pg.end(), new Error("A component template can only have one {{yield" + (b ? " " + b : "") + "}} declaration at a time")
                })
            }, b.prototype.destroyed = function() {
                this.instance.fragment && this.instance.fragment.destroyed()
            }, b.prototype.detach = function() {
                return this.instance.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.instance.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.instance.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                return a && this.name !== a ? this.instance.fragment ? this.instance.fragment.findComponent(a) : void 0 : this.instance
            }, b.prototype.findAllComponents = function(a, b) {
                b.test(this) && (b.add(this.instance), b.live && this.liveQueries.push(b)), this.instance.fragment.findAllComponents(a, b)
            }, b.prototype.firstNode = function(a) {
                return this.instance.fragment.firstNode(a)
            }, b.prototype.render = function(a, b) {
                Yb(this.instance, a, null, b), this.checkYielders(), this.attributes.forEach(Fa), this.eventHandlers.forEach(Fa), Ee(this), this.rendered = !0
            }, b.prototype.setupEvents = function() {
                var a = this,
                    b = this.eventHandlers;
                Object.keys(this.template.v).forEach(function(c) {
                    var d = c.split("-"),
                        e = a.template.v[c];
                    d.forEach(function(c) {
                        var d = new gm(a.instance, c);
                        b.push(new jm(a, d, e))
                    })
                })
            }, b.prototype.shuffled = function() {
                this.liveQueries.forEach(Ge), a.prototype.shuffled.call(this)
            }, b.prototype.toString = function() {
                return this.instance.toHTML()
            }, b.prototype.unbind = function() {
                this.bound = !1, this.attributes.forEach(Ha);
                var a = this.instance;
                a.viewmodel.teardown(), a.fragment.unbind(), a._observers.forEach(Aa), Fe(this), a.fragment.rendered && a.el.__ractive_instances__ && D(a.el.__ractive_instances__, a), km.fire(a)
            }, b.prototype.unrender = function(a) {
                var b = this;
                this.rendered = !1, this.shouldDestroy = a, this.instance.unrender(), this.attributes.forEach(Ia), this.eventHandlers.forEach(Ia), this.liveQueries.forEach(function(a) {
                    return a.remove(b.instance)
                })
            }, b.prototype.update = function() {
                this.dirty = !1, this.instance.fragment.update(), this.checkYielders(), this.attributes.forEach(Ka), this.eventHandlers.forEach(Ka)
            }, b
        }(pl),
        mm = {
            update: xg,
            teardown: xg
        },
        nm = function(a) {
            this.owner = a.owner || a.parentFragment.owner || Td(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : Td(a.parentFragment), this.parentFragment = this.owner.parentFragment, this.ractive = this.owner.ractive;
            var b = this.template = a.template;
            this.dynamicName = "object" == typeof b.f.n, this.dynamicArgs = !!b.f.d, this.dynamicName ? this.nameFragment = new An({
                owner: this,
                template: b.f.n
            }) : this.name = b.f.n || b.f, this.dynamicArgs ? this.argsFragment = new An({
                owner: this,
                template: b.f.d
            }) : b.f.a && b.f.a.s ? this.args = [] : this.args = b.f.a || [], this.node = null, this.intermediary = null, this.element.decorators.push(this)
        };
    nm.prototype.bind = function() {
        var a = this;
        this.dynamicName && (this.nameFragment.bind(), this.name = this.nameFragment.toString()), this.dynamicArgs && this.argsFragment.bind(), this.template.f.a && this.template.f.a.s && (this.resolvers = [], this.models = this.template.f.a.r.map(function(b, c) {
            var d, e = Va(a.parentFragment, b);
            return e ? e.register(a) : (d = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, d), b.register(a)
            }), a.resolvers.push(d)), e
        }), this.argsFn = lc(this.template.f.a.s, this.template.f.a.r.length))
    }, nm.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.owner.bubble())
    }, nm.prototype.destroyed = function() {
        this.intermediary && this.intermediary.teardown();
    }, nm.prototype.handleChange = function() {
        this.bubble()
    }, nm.prototype.rebinding = function(a, b, c) {
        var d = this.models.indexOf(b);
        ~d && (a = Qa(this.template.f.a.r[d], a, b), a !== b && (b.unregister(this), this.models.splice(d, 1, a), a && a.addShuffleRegister(this, "mark"), c || this.bubble()))
    }, nm.prototype.render = function() {
        var a = this;
        Pg.scheduleTask(function() {
            var b = u("decorators", a.ractive, a.name);
            if (!b) return r(Dg(a.name, "decorator")), void(a.intermediary = mm);
            a.node = a.element.node;
            var c;
            if (a.argsFn ? (c = a.models.map(function(a) {
                    if (a) return a.get()
                }), c = a.argsFn.apply(a.ractive, c)) : c = a.dynamicArgs ? a.argsFragment.getArgsList() : a.args, a.intermediary = b.apply(a.ractive, [a.node].concat(c)), !a.intermediary || !a.intermediary.teardown) throw new Error("The '" + a.name + "' decorator must return an object with a teardown method")
        }, !0), this.rendered = !0
    }, nm.prototype.toString = function() {
        return ""
    }, nm.prototype.unbind = function() {
        var a = this;
        this.dynamicName && this.nameFragment.unbind(), this.dynamicArgs && this.argsFragment.unbind(), this.resolvers && this.resolvers.forEach(Ha), this.models && this.models.forEach(function(b) {
            b && b.unregister(a)
        })
    }, nm.prototype.unrender = function(a) {
        a && !this.element.rendered || !this.intermediary || this.intermediary.teardown(), this.rendered = !1
    }, nm.prototype.update = function() {
        if (this.dirty) {
            this.dirty = !1;
            var a = !1;
            if (this.dynamicName && this.nameFragment.dirty) {
                var b = this.nameFragment.toString();
                a = b !== this.name, this.name = b
            }
            if (this.intermediary)
                if (a || !this.intermediary.update) this.unrender(), this.render();
                else if (this.dynamicArgs) {
                if (this.argsFragment.dirty) {
                    var c = this.argsFragment.getArgsList();
                    this.intermediary.update.apply(this.ractive, c)
                }
            } else if (this.argsFn) {
                var d = this.models.map(function(a) {
                    if (a) return a.get()
                });
                this.intermediary.update.apply(this.ractive, this.argsFn.apply(this.ractive, d))
            } else this.intermediary.update.apply(this.ractive, this.args);
            this.dynamicName && this.nameFragment.dirty && this.nameFragment.update(), this.dynamicArgs && this.argsFragment.dirty && this.argsFragment.update()
        }
    };
    var om = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {}, b.prototype.render = function() {}, b.prototype.teardown = function() {}, b.prototype.toString = function() {
                return "<!DOCTYPE" + this.template.a + ">"
            }, b.prototype.unbind = function() {}, b.prototype.unrender = function() {}, b
        }(pl),
        pm = function(a, b) {
            void 0 === b && (b = "value"), this.element = a, this.ractive = a.ractive, this.attribute = a.attributeByName[b];
            var c = this.attribute.interpolator;
            c.twowayBinding = this;
            var d = c.model;
            if (d) {
                if (d.isUnresolved) d.forceResolution(), Je("expression", this.ractive);
                else if (d.isReadonly) {
                    var e = d.getKeypath().replace(/^@/, "");
                    return t("Cannot use two-way binding on <" + a.name + "> element: " + e + " is read-only. To suppress this warning use <" + a.name + " twoway='false'...>", {
                        ractive: this.ractive
                    }), !1
                }
            } else c.resolver.forceResolution(), d = c.model, Je("'" + c.template.r + "' reference", this.ractive);
            this.attribute.isTwoway = !0, this.model = d;
            var f = d.get();
            this.wasUndefined = void 0 === f, void 0 === f && this.getInitialValue && (f = this.getInitialValue(), d.set(f));
            var g = Ie(a);
            g && (this.resetValue = f, g.formBindings.push(this))
        };
    pm.prototype.bind = function() {
        this.model.registerTwowayBinding(this)
    }, pm.prototype.handleChange = function() {
        var a = this,
            b = this.getValue();
        this.lastVal() !== b && (Pg.start(this.root), this.attribute.locked = !0, this.model.set(b), this.lastVal(!0, b), this.model.get() !== b ? this.attribute.locked = !1 : Pg.scheduleTask(function() {
            return a.attribute.locked = !1
        }), Pg.end())
    }, pm.prototype.lastVal = function(a, b) {
        return a ? void(this.lastValue = b) : this.lastValue
    }, pm.prototype.rebinding = function(a, b) {
        var c = this;
        this.model && this.model === b && b.unregisterTwowayBinding(this), a && (this.model = a, Pg.scheduleTask(function() {
            return a.registerTwowayBinding(c)
        }))
    }, pm.prototype.render = function() {
        this.node = this.element.node, this.node._ractive.binding = this, this.rendered = !0
    }, pm.prototype.setFromNode = function(a) {
        this.model.set(a.value)
    }, pm.prototype.unbind = function() {
        this.model.unregisterTwowayBinding(this)
    }, pm.prototype.unrender = function() {};
    var qm = function(a) {
            function b(b) {
                a.call(this, b, "checked")
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ke, !1), this.node.attachEvent && this.node.addEventListener("click", Ke, !1)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ke, !1), this.node.removeEventListener("click", Ke, !1)
            }, b.prototype.getInitialValue = function() {
                return !!this.element.getAttribute("checked")
            }, b.prototype.getValue = function() {
                return this.node.checked
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.checked)
            }, b
        }(pm),
        rm = function(a, b, c) {
            var d = this;
            this.model = b, this.hash = a, this.getValue = function() {
                return d.value = c.call(d), d.value
            }, this.bindings = []
        };
    rm.prototype.add = function(a) {
        this.bindings.push(a)
    }, rm.prototype.bind = function() {
        this.value = this.model.get(), this.model.registerTwowayBinding(this), this.bound = !0
    }, rm.prototype.remove = function(a) {
        D(this.bindings, a), this.bindings.length || this.unbind()
    }, rm.prototype.unbind = function() {
        this.model.unregisterTwowayBinding(this), this.bound = !1, delete this.model[this.hash]
    };
    var sm = [].push,
        tm = function(a) {
            function b(b) {
                if (a.call(this, b, "name"), this.checkboxName = !0, this.group = Le("checkboxes", this.model, Me), this.group.add(this), this.noInitialValue && (this.group.noInitialValue = !0), this.group.noInitialValue && this.element.getAttribute("checked")) {
                    var c = this.model.get(),
                        d = this.element.getAttribute("value");
                    z(c, d) || sm.call(c, d)
                }
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.group.bound || this.group.bind()
            }, b.prototype.changed = function() {
                var a = !!this.isChecked;
                return this.isChecked = this.node.checked, this.isChecked === a
            }, b.prototype.getInitialValue = function() {
                return this.noInitialValue = !0, []
            }, b.prototype.getValue = function() {
                return this.group.value
            }, b.prototype.handleChange = function() {
                this.isChecked = this.element.node.checked, this.group.value = this.model.get();
                var b = this.element.getAttribute("value");
                this.isChecked && !z(this.group.value, b) ? this.group.value.push(b) : !this.isChecked && z(this.group.value, b) && D(this.group.value, b), this.lastValue = null, a.prototype.handleChange.call(this)
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node,
                    c = this.model.get(),
                    d = this.element.getAttribute("value");
                j(c) ? this.isChecked = z(c, d) : this.isChecked = c == d, b.name = "{{" + this.model.getKeypath() + "}}", b.checked = this.isChecked, b.addEventListener("change", Ke, !1), b.attachEvent && b.addEventListener("click", Ke, !1)
            }, b.prototype.setFromNode = function(a) {
                if (this.group.bindings.forEach(function(a) {
                        return a.wasUndefined = !0
                    }), a.checked) {
                    var b = this.group.getValue();
                    b.push(this.element.getAttribute("value")), this.group.model.set(b)
                }
            }, b.prototype.unbind = function() {
                this.group.remove(this)
            }, b.prototype.unrender = function() {
                var a = this.element.node;
                a.removeEventListener("change", Ke, !1), a.removeEventListener("click", Ke, !1)
            }, b
        }(pm),
        um = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {
                return this.element.fragment ? this.element.fragment.toString() : ""
            }, b.prototype.getValue = function() {
                return this.element.node.innerHTML
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node;
                b.addEventListener("change", Ke, !1), b.addEventListener("blur", Ke, !1), this.ractive.lazy || (b.addEventListener("input", Ke, !1), b.attachEvent && b.addEventListener("keyup", Ke, !1))
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.innerHTML)
            }, b.prototype.unrender = function() {
                var a = this.node;
                a.removeEventListener("blur", Ke, !1), a.removeEventListener("change", Ke, !1), a.removeEventListener("input", Ke, !1), a.removeEventListener("keyup", Ke, !1)
            }, b
        }(pm),
        vm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {
                return ""
            }, b.prototype.getValue = function() {
                return this.node.value
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.ractive.lazy,
                    c = !1;
                "lazy" in this.element && (b = this.element.lazy), l(b) && (c = +b, b = !1), this.handler = c ? Oe(c) : Ke;
                var d = this.node;
                d.addEventListener("change", Ke, !1), b || (d.addEventListener("input", this.handler, !1), d.attachEvent && d.addEventListener("keyup", this.handler, !1)), d.addEventListener("blur", Ne, !1)
            }, b.prototype.unrender = function() {
                var a = this.element.node;
                this.rendered = !1, a.removeEventListener("change", Ke, !1), a.removeEventListener("input", this.handler, !1), a.removeEventListener("keyup", this.handler, !1), a.removeEventListener("blur", Ne, !1)
            }, b
        }(pm),
        wm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.forceUpdate = function() {
                var a = this,
                    b = this.getValue();
                void 0 !== b && (this.attribute.locked = !0, Pg.scheduleTask(function() {
                    return a.attribute.locked = !1
                }), this.model.set(b))
            }, b.prototype.getInitialValue = function() {
                return this.element.options.filter(function(a) {
                    return a.getAttribute("selected")
                }).map(function(a) {
                    return a.getAttribute("value")
                })
            }, b.prototype.getValue = function() {
                for (var a = this.element.node.options, b = a.length, c = [], d = 0; d < b; d += 1) {
                    var e = a[d];
                    if (e.selected) {
                        var f = e._ractive ? e._ractive.value : e.value;
                        c.push(f)
                    }
                }
                return c
            }, b.prototype.handleChange = function() {
                var b = this.attribute,
                    c = b.getValue(),
                    d = this.getValue();
                return void 0 !== c && A(d, c) || a.prototype.handleChange.call(this), this
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ke, !1), void 0 === this.model.get() && this.handleChange()
            }, b.prototype.setFromNode = function(a) {
                for (var b = Pe(a), c = b.length, d = new Array(c); c--;) {
                    var e = b[c];
                    d[c] = e._ractive ? e._ractive.value : e.value
                }
                this.model.set(d)
            }, b.prototype.setValue = function() {
                throw new Error("TODO not implemented yet")
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ke, !1)
            }, b.prototype.updateModel = function() {
                void 0 !== this.attribute.value && this.attribute.value.length || this.keypath.set(this.initialValue)
            }, b
        }(pm),
        xm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {}, b.prototype.getValue = function() {
                var a = parseFloat(this.node.value);
                return isNaN(a) ? void 0 : a
            }, b.prototype.setFromNode = function(a) {
                var b = parseFloat(a.value);
                isNaN(b) || this.model.set(b)
            }, b
        }(vm),
        ym = {},
        zm = function(a) {
            function b(b) {
                a.call(this, b, "checked"), this.siblings = Qe(this.ractive._guid + this.element.getAttribute("name")), this.siblings.push(this)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getValue = function() {
                return this.node.checked
            }, b.prototype.handleChange = function() {
                Pg.start(this.root), this.siblings.forEach(function(a) {
                    a.model.set(a.getValue())
                }), Pg.end()
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ke, !1), this.node.attachEvent && this.node.addEventListener("click", Ke, !1)
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.checked)
            }, b.prototype.unbind = function() {
                D(this.siblings, this)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ke, !1), this.node.removeEventListener("click", Ke, !1)
            }, b
        }(pm),
        Am = function(a) {
            function b(b) {
                a.call(this, b, "name"), this.group = Le("radioname", this.model, Re), this.group.add(this), b.checked && (this.group.value = this.getValue())
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this;
                this.group.bound || this.group.bind(), this.nameAttributeBinding = {
                    handleChange: function() {
                        return a.node.name = "{{" + a.model.getKeypath() + "}}"
                    }
                }, this.model.getKeypathModel().register(this.nameAttributeBinding)
            }, b.prototype.getInitialValue = function() {
                if (this.element.getAttribute("checked")) return this.element.getAttribute("value")
            }, b.prototype.getValue = function() {
                return this.element.getAttribute("value")
            }, b.prototype.handleChange = function() {
                this.node.checked && (this.group.value = this.getValue(), a.prototype.handleChange.call(this))
            }, b.prototype.lastVal = function(a, b) {
                return a ? void(this.group.lastValue = b) : this.group.lastValue
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node;
                b.name = "{{" + this.model.getKeypath() + "}}", b.checked = this.model.get() == this.element.getAttribute("value"), b.addEventListener("change", Ke, !1), b.attachEvent && b.addEventListener("click", Ke, !1)
            }, b.prototype.setFromNode = function(a) {
                a.checked && this.group.model.set(this.element.getAttribute("value"))
            }, b.prototype.unbind = function() {
                this.group.remove(this), this.model.getKeypathModel().unregister(this.nameAttributeBinding)
            }, b.prototype.unrender = function() {
                var a = this.node;
                a.removeEventListener("change", Ke, !1), a.removeEventListener("click", Ke, !1)
            }, b
        }(pm),
        Bm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.forceUpdate = function() {
                var a = this,
                    b = this.getValue();
                void 0 !== b && (this.attribute.locked = !0, Pg.scheduleTask(function() {
                    return a.attribute.locked = !1
                }), this.model.set(b))
            }, b.prototype.getInitialValue = function() {
                if (void 0 === this.element.getAttribute("value")) {
                    var a = this.element.options,
                        b = a.length;
                    if (b) {
                        for (var c, d, e = b; e--;) {
                            var f = a[e];
                            if (f.getAttribute("selected")) {
                                f.getAttribute("disabled") || (c = f.getAttribute("value")), d = !0;
                                break
                            }
                        }
                        if (!d)
                            for (; ++e < b;)
                                if (!a[e].getAttribute("disabled")) {
                                    c = a[e].getAttribute("value");
                                    break
                                }
                        return void 0 !== c && (this.element.attributeByName.value.value = c), c
                    }
                }
            }, b.prototype.getValue = function() {
                var a, b = this.node.options,
                    c = b.length;
                for (a = 0; a < c; a += 1) {
                    var d = b[a];
                    if (b[a].selected && !b[a].disabled) return d._ractive ? d._ractive.value : d.value
                }
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ke, !1)
            }, b.prototype.setFromNode = function(a) {
                var b = Pe(a)[0];
                this.model.set(b._ractive ? b._ractive.value : b.value)
            }, b.prototype.setValue = function(a) {
                this.model.set(a)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ke, !1)
            }, b
        }(pm),
        Cm = /;\s*$/,
        Dm = function(a) {
            function b(b) {
                var c = this;
                if (a.call(this, b), this.liveQueries = [], this.name = b.template.e.toLowerCase(), this.isVoid = lj.test(this.name), this.parent = Td(this.parentFragment, !1), this.parent && "option" === this.parent.name) throw new Error("An <option> element cannot contain other elements (encountered <" + this.name + ">)");
                this.decorators = [], this.attributeByName = {}, this.attributes = [];
                var d = [];
                (this.template.m || []).forEach(function(a) {
                    switch (a.t) {
                        case yi:
                        case dj:
                        case bj:
                        case aj:
                        case cj:
                            c.attributes.push(rf({
                                owner: c,
                                parentFragment: c.parentFragment,
                                template: a
                            }));
                            break;
                        default:
                            d.push(a)
                    }
                }), this.attributes.push(new Hl({
                    owner: this,
                    parentFragment: this.parentFragment,
                    template: d
                }));
                for (var e = this.attributes.length; e--;) {
                    var f = c.attributes[e];
                    "type" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "max" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "min" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "class" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "value" === f.name && c.attributes.push(c.attributes.splice(e, 1)[0])
                }
                b.template.f && !b.deferContent && (this.fragment = new An({
                    template: b.template.f,
                    owner: this,
                    cssIds: null
                })), this.binding = null
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.attributes.binding = !0, this.attributes.forEach(za), this.attributes.binding = !1, this.fragment && this.fragment.bind(), this.binding || this.recreateTwowayBinding()
            }, b.prototype.createTwowayBinding = function() {
                var a = "twoway" in this ? this.twoway : this.ractive.twoway;
                if (!a) return null;
                var b = Te(this);
                if (!b) return null;
                var c = new b(this);
                return c && c.model ? c : null
            }, b.prototype.destroyed = function() {
                this.attributes.forEach(function(a) {
                    return a.destroyed()
                }), this.fragment && this.fragment.destroyed()
            }, b.prototype.detach = function() {
                return this.rendered || this.destroyed(), c(this.node)
            }, b.prototype.find = function(a) {
                return Yf(this.node, a) ? this.node : this.fragment ? this.fragment.find(a) : void 0
            }, b.prototype.findAll = function(a, b) {
                var c = b.test(this.node);
                c && (b.add(this.node), b.live && this.liveQueries.push(b)), this.fragment && this.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, b.prototype.findNextNode = function() {
                return null
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.getAttribute = function(a) {
                var b = this.attributeByName[a];
                return b ? b.getValue() : void 0
            }, b.prototype.recreateTwowayBinding = function() {
                this.binding && (this.binding.unbind(), this.binding.unrender()), (this.binding = this.createTwowayBinding()) && (this.binding.bind(), this.rendered && this.binding.render())
            }, b.prototype.render = function(a, b) {
                var d = this;
                this.namespace = Ye(this);
                var e, f = !1;
                if (b)
                    for (var g; g = b.shift();) {
                        if (g.nodeName.toUpperCase() === d.template.e.toUpperCase() && g.namespaceURI === d.namespace) {
                            d.node = e = g, f = !0;
                            break
                        }
                        c(g)
                    }
                if (e || (e = Xf(this.template.e, this.namespace, this.getAttribute("is")), this.node = e), og(e, "_ractive", {
                        value: {
                            proxy: this
                        }
                    }), this.parentFragment.cssIds && e.setAttribute("data-ractive-css", this.parentFragment.cssIds.map(function(a) {
                        return "{" + a + "}"
                    }).join(" ")), f && this.foundNode && this.foundNode(e), this.fragment) {
                    var h = f ? E(e.childNodes) : void 0;
                    this.fragment.render(e, h), h && h.forEach(c)
                }
                if (f) {
                    this.binding && this.binding.wasUndefined && this.binding.setFromNode(e);
                    for (var i = e.attributes.length; i--;) {
                        var j = e.attributes[i].name;
                        j in d.attributeByName || e.removeAttribute(j)
                    }
                }
                this.attributes.forEach(Fa), this.binding && this.binding.render(), He(this), this._introTransition && this.ractive.transitionsEnabled && (this._introTransition.isIntro = !0, Pg.registerTransition(this._introTransition)), f || a.appendChild(e), this.rendered = !0
            }, b.prototype.shuffled = function() {
                this.liveQueries.forEach(Ue), a.prototype.shuffled.call(this)
            }, b.prototype.toString = function() {
                var a = this.template.e,
                    b = this.attributes.map(We).join("");
                "option" === this.name && this.isSelected() && (b += " selected"), "input" === this.name && Ve(this) && (b += " checked");
                var c, d;
                this.attributes.forEach(function(a) {
                    "class" === a.name ? d = (d || "") + (d ? " " : "") + e(a.getString()) : "style" === a.name ? (c = (c || "") + (c ? " " : "") + e(a.getString()), c && !Cm.test(c) && (c += ";")) : a.styleName ? c = (c || "") + (c ? " " : "") + g(a.styleName) + ": " + e(a.getString()) + ";" : a.inlineClass && a.getValue() && (d = (d || "") + (d ? " " : "") + a.inlineClass)
                }), void 0 !== c && (b = " style" + (c ? '="' + c + '"' : "") + b), void 0 !== d && (b = " class" + (d ? '="' + d + '"' : "") + b);
                var f = "<" + a + b + ">";
                return this.isVoid ? f : ("textarea" === this.name && void 0 !== this.getAttribute("value") ? f += rc(this.getAttribute("value")) : void 0 !== this.getAttribute("contenteditable") && (f += this.getAttribute("value") || ""), this.fragment && (f += this.fragment.toString(!/^(?:script|style)$/i.test(this.template.e))), f += "</" + a + ">")
            }, b.prototype.unbind = function() {
                this.attributes.forEach(Ha), this.binding && this.binding.unbind(), this.fragment && this.fragment.unbind()
            }, b.prototype.unrender = function(a) {
                if (this.rendered) {
                    this.rendered = !1;
                    var b = this._introTransition;
                    b && b.complete && b.complete(), "option" === this.name ? this.detach() : a && Pg.detachWhenReady(this), this.fragment && this.fragment.unrender(), this.binding && this.binding.unrender(), this._outroTransition && this.ractive.transitionsEnabled && (this._outroTransition.isIntro = !1, Pg.registerTransition(this._outroTransition)), Xe(this)
                }
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.attributes.forEach(Ka), this.fragment && this.fragment.update())
            }, b
        }(pl),
        Em = function(a) {
            function b(b) {
                a.call(this, b), this.formBindings = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.node.addEventListener("reset", Ze, !1)
            }, b.prototype.unrender = function(b) {
                this.node.removeEventListener("reset", Ze, !1), a.prototype.unrender.call(this, b)
            }, b
        }(Dm),
        Fm = function(a) {
            function b(b) {
                a.call(this, b), this.parentFragment = b.parentFragment, this.template = b.template, this.index = b.index, b.owner && (this.parent = b.owner), this.isStatic = !!b.template.s, this.model = null, this.dirty = !1
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this,
                    b = Rd(this.parentFragment, this.template),
                    c = b ? b.get() : void 0;
                return this.isStatic ? void(this.model = {
                    get: function() {
                        return c
                    }
                }) : void(b ? (b.register(this), this.model = b) : this.resolver = this.parentFragment.resolve(this.template.r, function(b) {
                    a.model = b, b.register(a), a.handleChange(), a.resolver = null
                }))
            }, b.prototype.handleChange = function() {
                this.bubble()
            }, b.prototype.rebinding = function(a, b, c) {
                return a = Qa(this.template, a, b), !this.static && (a !== this.model && (this.model && this.model.unregister(this), a && a.addShuffleRegister(this, "mark"), this.model = a, c || this.handleChange(), !0))
            }, b.prototype.unbind = function() {
                this.isStatic || (this.model && this.model.unregister(this), this.model = void 0, this.resolver && this.resolver.unbind())
            }, b
        }(pl),
        Gm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                this.owner && this.owner.bubble(), a.prototype.bubble.call(this)
            }, b.prototype.detach = function() {
                return c(this.node)
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.getString = function() {
                return this.model ? d(this.model.get()) : ""
            }, b.prototype.render = function(a, b) {
                if (!ne()) {
                    var c = this.getString();
                    if (this.rendered = !0, b) {
                        var d = b[0];
                        d && 3 === d.nodeType ? (b.shift(), d.nodeValue !== c && (d.nodeValue = c)) : (d = this.node = Uf.createTextNode(c), b[0] ? a.insertBefore(d, b[0]) : a.appendChild(d)), this.node = d
                    } else this.node = Uf.createTextNode(c), a.appendChild(this.node)
                }
            }, b.prototype.toString = function(a) {
                var b = this.getString();
                return a ? rc(b) : b
            }, b.prototype.unrender = function(a) {
                a && this.detach(), this.rendered = !1
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.rendered && (this.node.data = this.getString()))
            }, b.prototype.valueOf = function() {
                return this.model ? this.model.get() : void 0
            }, b
        }(Fm),
        Hm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.node.defaultValue = this.node.value
            }, b
        }(Dm),
        Im = function(a) {
            function b(b) {
                a.call(this, b), this.name = b.template.n, this.owner = b.owner || b.parentFragment.owner || b.element || Td(b.parentFragment), this.element = b.element || (this.owner.attributeByName ? this.owner : Td(b.parentFragment)), this.parentFragment = this.element.parentFragment, this.ractive = this.parentFragment.ractive, this.fragment = null, this.element.attributeByName[this.name] = this, this.value = b.template.f
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind();
                var a = this.template.f,
                    b = this.element.instance.viewmodel;
                if (0 === a) b.joinKey(this.name).set(!0);
                else if ("string" == typeof a) {
                    var c = ck(a);
                    b.joinKey(this.name).set(c ? c.value : a)
                } else j(a) && _e(this, !0)
            }, b.prototype.render = function() {}, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind(), this.boundFragment && this.boundFragment.unbind(), this.element.bound && this.link.target === this.model && this.link.owner.unlink()
            }, b.prototype.unrender = function() {}, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment && this.fragment.update(), this.boundFragment && this.boundFragment.update(), this.rendered && this.updateDelegate())
            }, b
        }(pl),
        Jm = function(a) {
            function b(b) {
                var c = b.template;
                c.a || (c.a = {}), void 0 !== c.a.value || "disabled" in c.a || (c.a.value = c.f || ""), a.call(this, b), this.select = af(this.parent)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                if (!this.select) return void a.prototype.bind.call(this);
                var b = this.attributeByName.selected;
                if (b && void 0 !== this.select.getAttribute("value")) {
                    var c = this.attributes.indexOf(b);
                    this.attributes.splice(c, 1), delete this.attributeByName.selected
                }
                a.prototype.bind.call(this), this.select.options.push(this)
            }, b.prototype.bubble = function() {
                var b = this.getAttribute("value");
                this.node.value !== b && (this.node._ractive.value = b), a.prototype.bubble.call(this)
            }, b.prototype.getAttribute = function(a) {
                var b = this.attributeByName[a];
                return b ? b.getValue() : "value" === a && this.fragment ? this.fragment.valueOf() : void 0
            }, b.prototype.isSelected = function() {
                var a = this.getAttribute("value");
                if (void 0 === a || !this.select) return !1;
                var b = this.select.getAttribute("value");
                if (b == a) return !0;
                if (this.select.getAttribute("multiple") && j(b))
                    for (var c = b.length; c--;)
                        if (b[c] == a) return !0
            }, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.attributeByName.value || (this.node._ractive.value = this.getAttribute("value"))
            }, b.prototype.unbind = function() {
                a.prototype.unbind.call(this), this.select && D(this.select.options, this)
            }, b
        }(Dm),
        Km = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.refName = this.template.r;
                var b, c = this.refName ? bf(this.ractive, this.refName, this.parentFragment) || null : null;
                c && (this.named = !0, this.setTemplate(this.template.r, c)), c || (a.prototype.bind.call(this), this.model && (b = this.model.get()) && "object" == typeof b && ("string" == typeof b.template || j(b.t)) ? (b.template ? (this.source = b.template, b = gf(this.template.r, b.template, this.ractive)) : this.source = b.t, this.setTemplate(this.template.r, b.t)) : this.model && "string" == typeof this.model.get() || !this.refName ? this.setTemplate(this.model.get()) : this.setTemplate(this.refName, c)), this.fragment = new An({
                    owner: this,
                    template: this.partialTemplate
                }).bind()
            }, b.prototype.destroyed = function() {
                this.fragment.destroyed()
            }, b.prototype.detach = function() {
                return this.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment.findAllComponents(a, b)
            }, b.prototype.firstNode = function(a) {
                return this.fragment.firstNode(a)
            }, b.prototype.forceResetTemplate = function() {
                var a = this;
                this.partialTemplate = void 0, this.refName && (this.partialTemplate = bf(this.ractive, this.refName, this.parentFragment)), this.partialTemplate || (this.partialTemplate = bf(this.ractive, this.name, this.parentFragment)), this.partialTemplate || (t("Could not find template for partial '" + this.name + "'"), this.partialTemplate = []), this.inAttribute ? oe(function() {
                    return a.fragment.resetTemplate(a.partialTemplate)
                }) : this.fragment.resetTemplate(this.partialTemplate), this.bubble()
            }, b.prototype.render = function(a, b) {
                this.fragment.render(a, b)
            }, b.prototype.setTemplate = function(a, b) {
                this.name = a, b || null === b || (b = bf(this.ractive, a, this.parentFragment)), b || t("Could not find template for partial '" + a + "'"), this.partialTemplate = b || []
            }, b.prototype.toString = function(a) {
                return this.fragment.toString(a)
            }, b.prototype.unbind = function() {
                a.prototype.unbind.call(this), this.fragment.unbind()
            }, b.prototype.unrender = function(a) {
                this.fragment.unrender(a)
            }, b.prototype.update = function() {
                var a;
                this.dirty && (this.dirty = !1, this.named || (this.model && (a = this.model.get()), a && "string" == typeof a && a !== this.name ? (this.setTemplate(a), this.fragment.resetTemplate(this.partialTemplate)) : a && "object" == typeof a && ("string" == typeof a.template || j(a.t)) && a.t !== this.source && a.template !== this.source && (a.template ? (this.source = a.template, a = gf(this.name, a.template, this.ractive)) : this.source = a.t, this.setTemplate(this.name, a.t), this.fragment.resetTemplate(this.partialTemplate))), this.fragment.update())
            }, b
        }(Fm),
        Lm = function(a) {
            this.parent = a.owner.parentFragment, this.parentFragment = this, this.owner = a.owner, this.ractive = this.parent.ractive, this.cssIds = "cssIds" in a ? a.cssIds : this.parent ? this.parent.cssIds : null, this.context = null, this.rendered = !1, this.iterations = [], this.template = a.template, this.indexRef = a.indexRef, this.keyRef = a.keyRef, this.pendingNewIndices = null, this.previousIterations = null, this.isArray = !1
        };
    Lm.prototype.bind = function(a) {
        var b = this;
        this.context = a;
        var c = a.get();
        if (this.isArray = j(c)) {
            this.iterations = [];
            for (var d = c.length, e = 0; e < d; e += 1) b.iterations[e] = b.createIteration(e, e)
        } else if (m(c)) {
            if (this.isArray = !1, this.indexRef) {
                var f = this.indexRef.split(",");
                this.keyRef = f[0], this.indexRef = f[1]
            }
            this.iterations = Object.keys(c).map(function(a, c) {
                return b.createIteration(a, c)
            })
        }
        return this
    }, Lm.prototype.bubble = function() {
        this.owner.bubble()
    }, Lm.prototype.createIteration = function(a, b) {
        var c = new An({
            owner: this,
            template: this.template
        });
        c.key = a, c.index = b, c.isIteration = !0;
        var d = this.context.joinKey(a);
        return this.owner.template.z && (c.aliases = {}, c.aliases[this.owner.template.z[0].n] = d), c.bind(d)
    }, Lm.prototype.destroyed = function() {
        this.iterations.forEach(function(a) {
            return a.destroyed()
        })
    }, Lm.prototype.detach = function() {
        var b = a();
        return this.iterations.forEach(function(a) {
            return b.appendChild(a.detach())
        }), b
    }, Lm.prototype.find = function(a) {
        var b, c = this,
            d = this.iterations.length;
        for (b = 0; b < d; b += 1) {
            var e = c.iterations[b].find(a);
            if (e) return e
        }
    }, Lm.prototype.findAll = function(a, b) {
        var c, d = this,
            e = this.iterations.length;
        for (c = 0; c < e; c += 1) d.iterations[c].findAll(a, b)
    }, Lm.prototype.findComponent = function(a) {
        var b, c = this,
            d = this.iterations.length;
        for (b = 0; b < d; b += 1) {
            var e = c.iterations[b].findComponent(a);
            if (e) return e
        }
    }, Lm.prototype.findAllComponents = function(a, b) {
        var c, d = this,
            e = this.iterations.length;
        for (c = 0; c < e; c += 1) d.iterations[c].findAllComponents(a, b)
    }, Lm.prototype.findNextNode = function(a) {
        var b = this;
        if (a.index < this.iterations.length - 1)
            for (var c = a.index + 1; c < b.iterations.length; c++) {
                var d = b.iterations[c].firstNode(!0);
                if (d) return d
            }
        return this.owner.findNextNode()
    }, Lm.prototype.firstNode = function(a) {
        return this.iterations[0] ? this.iterations[0].firstNode(a) : null
    }, Lm.prototype.rebinding = function(a) {
        var b = this;
        this.context = a, this.iterations.forEach(function(c) {
            var d = a ? a.joinKey(c.key || c.index) : void 0;
            c.context = d, b.owner.template.z && (c.aliases = {}, c.aliases[b.owner.template.z[0].n] = d)
        })
    }, Lm.prototype.render = function(a, b) {
        this.iterations && this.iterations.forEach(function(c) {
            return c.render(a, b)
        }), this.rendered = !0
    }, Lm.prototype.shuffle = function(a) {
        var b = this;
        this.pendingNewIndices || (this.previousIterations = this.iterations.slice()), this.pendingNewIndices || (this.pendingNewIndices = []), this.pendingNewIndices.push(a);
        var c = [];
        a.forEach(function(a, d) {
            if (a !== -1) {
                var e = b.iterations[d];
                c[a] = e, a !== d && e && (e.dirty = !0)
            }
        }), this.iterations = c, this.bubble()
    }, Lm.prototype.shuffled = function() {
        this.iterations.forEach(function(a) {
            return a.shuffled()
        })
    }, Lm.prototype.toString = function(a) {
        return this.iterations ? this.iterations.map(a ? Ma : La).join("") : ""
    }, Lm.prototype.unbind = function() {
        return this.iterations.forEach(Ha), this
    }, Lm.prototype.unrender = function(a) {
        this.iterations.forEach(a ? Ja : Ia), this.pendingNewIndices && this.previousIterations && this.previousIterations.forEach(function(b) {
            b.rendered && (a ? Ja(b) : Ia(b))
        }), this.rendered = !1
    }, Lm.prototype.update = function() {
        var b = this;
        if (this.pendingNewIndices) return void this.updatePostShuffle();
        if (!this.updating) {
            this.updating = !0;
            var c, d, e, f = this.context.get(),
                g = this.isArray,
                h = !0;
            if (this.isArray = j(f)) g && (h = !1, this.iterations.length > f.length && (c = this.iterations.splice(f.length)));
            else if (m(f) && !g)
                for (h = !1, c = [], d = {}, e = this.iterations.length; e--;) {
                    var i = b.iterations[e];
                    i.key in f ? d[i.key] = !0 : (b.iterations.splice(e, 1), c.push(i))
                }
            h && (c = this.iterations, this.iterations = []), c && c.forEach(function(a) {
                a.unbind(), a.unrender(!0)
            }), this.iterations.forEach(Ka);
            var k, l, n = j(f) ? f.length : m(f) ? Object.keys(f).length : 0;
            if (n > this.iterations.length) {
                if (k = this.rendered ? a() : null, e = this.iterations.length, j(f))
                    for (; e < f.length;) l = b.createIteration(e, e), b.iterations.push(l), b.rendered && l.render(k), e += 1;
                else if (m(f)) {
                    if (this.indexRef && !this.keyRef) {
                        var o = this.indexRef.split(",");
                        this.keyRef = o[0], this.indexRef = o[1]
                    }
                    Object.keys(f).forEach(function(a) {
                        d && a in d || (l = b.createIteration(a, e), b.iterations.push(l), b.rendered && l.render(k), e += 1)
                    })
                }
                if (this.rendered) {
                    var p = this.parent.findParentNode(),
                        q = this.parent.findNextNode(this.owner);
                    p.insertBefore(k, q)
                }
            }
            this.updating = !1
        }
    }, Lm.prototype.updatePostShuffle = function() {
        var b = this,
            c = this.pendingNewIndices[0];
        this.pendingNewIndices.slice(1).forEach(function(a) {
            c.forEach(function(b, d) {
                c[d] = a[b]
            })
        });
        var d, e = this.context.get().length,
            f = this.previousIterations.length,
            g = {};
        c.forEach(function(a, c) {
            var d = b.previousIterations[c];
            if (b.previousIterations[c] = null, a === -1) g[c] = d;
            else if (d.index !== a) {
                var e = b.context.joinKey(a);
                d.index = a, d.context = e, b.owner.template.z && (d.aliases = {}, d.aliases[b.owner.template.z[0].n] = e)
            }
        }), this.previousIterations.forEach(function(a, b) {
            a && (g[b] = a)
        });
        var h = this.rendered ? a() : null,
            i = this.rendered ? this.parent.findParentNode() : null,
            j = "startIndex" in c;
        for (d = j ? c.startIndex : 0; d < e; d++) {
            var k = b.iterations[d];
            k && j ? b.rendered && (g[d] && h.appendChild(g[d].detach()), h.childNodes.length && i.insertBefore(h, k.firstNode())) : (k || (b.iterations[d] = b.createIteration(d, d)), b.rendered && (g[d] && h.appendChild(g[d].detach()), k ? h.appendChild(k.detach()) : b.iterations[d].render(h)))
        }
        if (this.rendered) {
            for (d = e; d < f; d++) g[d] && h.appendChild(g[d].detach());
            h.childNodes.length && i.insertBefore(h, this.owner.findNextNode())
        }
        Object.keys(g).forEach(function(a) {
            return g[a].unbind().unrender(!0)
        }), this.iterations.forEach(Ka), this.pendingNewIndices = null, this.shuffled()
    };
    var Mm, Nm = function(b) {
            function c(a) {
                b.call(this, a), this.sectionType = a.template.n || null, this.templateSectionType = this.sectionType, this.subordinate = 1 === a.template.l, this.fragment = null
            }
            return c.prototype = Object.create(b && b.prototype), c.prototype.constructor = c, c.prototype.bind = function() {
                b.prototype.bind.call(this), this.subordinate && (this.sibling = this.parentFragment.items[this.parentFragment.items.indexOf(this) - 1], this.sibling.nextSibling = this), this.model ? (this.dirty = !0, this.update()) : !this.sectionType || this.sectionType !== Wi || this.sibling && this.sibling.isTruthy() || (this.fragment = new An({
                    owner: this,
                    template: this.template.f
                }).bind())
            }, c.prototype.destroyed = function() {
                this.fragment && this.fragment.destroyed()
            }, c.prototype.detach = function() {
                return this.fragment ? this.fragment.detach() : a()
            }, c.prototype.find = function(a) {
                if (this.fragment) return this.fragment.find(a)
            }, c.prototype.findAll = function(a, b) {
                this.fragment && this.fragment.findAll(a, b)
            }, c.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, c.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, c.prototype.firstNode = function(a) {
                return this.fragment && this.fragment.firstNode(a)
            }, c.prototype.isTruthy = function() {
                if (this.subordinate && this.sibling.isTruthy()) return !0;
                var a = this.model ? this.model.isRoot ? this.model.value : this.model.get() : void 0;
                return !!a && !hf(a)
            }, c.prototype.rebinding = function(a, c, d) {
                b.prototype.rebinding.call(this, a, c, d) && this.fragment && this.sectionType !== Vi && this.sectionType !== Wi && this.fragment.rebinding(a, c)
            }, c.prototype.render = function(a, b) {
                this.rendered = !0, this.fragment && this.fragment.render(a, b)
            }, c.prototype.shuffle = function(a) {
                this.fragment && this.sectionType === Xi && this.fragment.shuffle(a)
            }, c.prototype.toString = function(a) {
                return this.fragment ? this.fragment.toString(a) : ""
            }, c.prototype.unbind = function() {
                b.prototype.unbind.call(this), this.fragment && this.fragment.unbind()
            }, c.prototype.unrender = function(a) {
                this.rendered && this.fragment && this.fragment.unrender(a), this.rendered = !1
            }, c.prototype.update = function() {
                if (this.dirty && (this.fragment && this.sectionType !== Vi && this.sectionType !== Wi && (this.fragment.context = this.model), this.model || this.sectionType === Wi)) {
                    this.dirty = !1;
                    var b = this.model ? this.model.isRoot ? this.model.value : this.model.get() : void 0,
                        c = !this.subordinate || !this.sibling.isTruthy(),
                        d = this.sectionType;
                    null !== this.sectionType && null !== this.templateSectionType || (this.sectionType = jf(b, this.template.i)), d && d !== this.sectionType && this.fragment && (this.rendered && this.fragment.unbind().unrender(!0), this.fragment = null);
                    var e;
                    if (this.sectionType === Xi) this.fragment ? this.fragment.update() : e = new Lm({
                        owner: this,
                        template: this.template.f,
                        indexRef: this.template.i
                    }).bind(this.model);
                    else if (this.sectionType === Yi) this.fragment ? this.fragment.update() : e = new An({
                        owner: this,
                        template: this.template.f
                    }).bind(this.model);
                    else if (this.sectionType === Zi) this.fragment ? hf(b) ? (this.rendered && this.fragment.unbind().unrender(!0), this.fragment = null) : this.fragment.update() : hf(b) || (e = new An({
                        owner: this,
                        template: this.template.f
                    }).bind(this.model));
                    else {
                        var f = c && (this.sectionType === Wi ? hf(b) : !!b && !hf(b));
                        this.fragment ? f ? this.fragment.update() : (this.rendered && this.fragment.unbind().unrender(!0), this.fragment = null) : f && (e = new An({
                            owner: this,
                            template: this.template.f
                        }).bind(null))
                    }
                    if (e) {
                        if (this.rendered) {
                            var g = this.parentFragment.findParentNode(),
                                h = this.parentFragment.findNextNode(this);
                            if (h) {
                                var i = a();
                                e.render(i), h.parentNode.insertBefore(i, h)
                            } else e.render(g)
                        }
                        this.fragment = e
                    }
                    this.nextSibling && (this.nextSibling.dirty = !0, this.nextSibling.update())
                }
            }, c
        }(Fm),
        Om = function(a) {
            function b(b) {
                a.call(this, b), this.options = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.foundNode = function(a) {
                if (this.binding) {
                    var b = Pe(a);
                    b.length > 0 && (this.selectedOptions = b)
                }
            }, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.sync();
                for (var d = this.node, e = d.options.length; e--;) d.options[e].defaultSelected = d.options[e].selected;
                this.rendered = !0
            }, b.prototype.sync = function() {
                var a = this,
                    b = this.node;
                if (b) {
                    var c = E(b.options);
                    if (this.selectedOptions) return c.forEach(function(b) {
                        a.selectedOptions.indexOf(b) >= 0 ? b.selected = !0 : b.selected = !1
                    }), this.binding.setFromNode(b), void delete this.selectedOptions;
                    var d = this.getAttribute("value"),
                        e = this.getAttribute("multiple");
                    if (void 0 !== d) {
                        var f;
                        c.forEach(function(a) {
                            var b = a._ractive ? a._ractive.value : a.value,
                                c = e ? kf(d, b) : d == b;
                            c && (f = !0), a.selected = c
                        }), f || e || this.binding && this.binding.forceUpdate()
                    } else this.binding && this.binding.forceUpdate()
                }
            }, b.prototype.update = function() {
                a.prototype.update.call(this), this.sync()
            }, b
        }(Dm),
        Pm = function(a) {
            function b(b) {
                var c = b.template;
                b.deferContent = !0, a.call(this, b), this.attributeByName.value || (c.f && Se({
                    template: c
                }) ? this.attributes.push(rf({
                    owner: this,
                    template: {
                        t: yi,
                        f: c.f,
                        n: "value"
                    },
                    parentFragment: this.parentFragment
                })) : this.fragment = new An({
                    owner: this,
                    cssIds: null,
                    template: c.f
                }))
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                var a = this;
                this.dirty || (this.dirty = !0, this.rendered && !this.binding && this.fragment && Pg.scheduleTask(function() {
                    a.dirty = !1, a.node.value = a.fragment.toString()
                }), this.parentFragment.bubble())
            }, b
        }(Hm),
        Qm = function(a) {
            function b(b) {
                a.call(this, b), this.type = oi
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {}, b.prototype.detach = function() {
                return c(this.node)
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.render = function(a, b) {
                if (!ne())
                    if (this.rendered = !0, b) {
                        var c = b[0];
                        c && 3 === c.nodeType ? (b.shift(), c.nodeValue !== this.template && (c.nodeValue = this.template)) : (c = this.node = Uf.createTextNode(this.template), b[0] ? a.insertBefore(c, b[0]) : a.appendChild(c)), this.node = c
                    } else this.node = Uf.createTextNode(this.template), a.appendChild(this.node)
            }, b.prototype.toString = function(a) {
                return a ? rc(this.template) : this.template
            }, b.prototype.unbind = function() {}, b.prototype.unrender = function(a) {
                this.rendered && a && this.detach(), this.rendered = !1
            }, b.prototype.update = function() {}, b.prototype.valueOf = function() {
                return this.template
            }, b
        }(pl);
    if (Vf) {
        var Rm = {},
            Sm = Xf("div").style;
        Mm = function(a) {
            if (a = vl(a), !Rm[a])
                if (void 0 !== Sm[a]) Rm[a] = a;
                else
                    for (var b = a.charAt(0).toUpperCase() + a.substring(1), c = fg.length; c--;) {
                        var d = fg[c];
                        if (void 0 !== Sm[d + b]) {
                            Rm[a] = d + b;
                            break
                        }
                    }
                return Rm[a]
        }
    } else Mm = null;
    var Tm, Um = Mm,
        Vm = "hidden";
    if (Uf) {
        var Wm;
        if (Vm in Uf) Wm = "";
        else
            for (var Xm = fg.length; Xm--;) {
                var Ym = fg[Xm];
                if (Vm = Ym + "Hidden", Vm in Uf) {
                    Wm = Ym;
                    break
                }
            }
        void 0 !== Wm ? (Uf.addEventListener(Wm + "visibilitychange", lf), lf()) : ("onfocusout" in Uf ? (Uf.addEventListener("focusout", mf), Uf.addEventListener("focusin", nf)) : (Tf.addEventListener("pagehide", mf), Tf.addEventListener("blur", mf), Tf.addEventListener("pageshow", nf), Tf.addEventListener("focus", nf)), Tm = !0)
    }
    var Zm, $m = new RegExp("^-(?:" + fg.join("|") + ")-"),
        _m = function(a) {
            return a.replace($m, "")
        },
        an = new RegExp("^(?:" + fg.join("|") + ")([A-Z])"),
        bn = function(a) {
            return a ? (an.test(a) && (a = "-" + a), a.replace(/[A-Z]/g, function(a) {
                return "-" + a.toLowerCase()
            })) : ""
        };
    if (Vf) {
        var cn, dn, en, fn, gn, hn, jn = Xf("div").style,
            kn = function(a) {
                return a
            },
            ln = {},
            mn = {};
        void 0 !== jn.transition ? (cn = "transition", dn = "transitionend", en = !0) : void 0 !== jn.webkitTransition ? (cn = "webkitTransition", dn = "webkitTransitionEnd", en = !0) : en = !1, cn && (fn = cn + "Duration", gn = cn + "Property", hn = cn + "TimingFunction"), Zm = function(a, b, c, d, e) {
            setTimeout(function() {
                function f() {
                    clearTimeout(l)
                }

                function g() {
                    j && k && (a.unregisterCompleteHandler(f), a.ractive.fire(a.name + ":end", a.node, a.isIntro), e())
                }

                function h(a) {
                    var b = d.indexOf(vl(_m(a.propertyName)));
                    b !== -1 && d.splice(b, 1), d.length || (clearTimeout(l), i())
                }

                function i() {
                    n[gn] = o.property, n[hn] = o.duration, n[fn] = o.timing, a.node.removeEventListener(dn, h, !1), k = !0, g()
                }
                var j, k, l, m = (a.node.namespaceURI || "") + a.node.tagName,
                    n = a.node.style,
                    o = {
                        property: n[gn],
                        timing: n[hn],
                        duration: n[fn]
                    };
                n[gn] = d.map(Um).map(bn).join(","), n[hn] = bn(c.easing || "linear"), n[fn] = c.duration / 1e3 + "s", a.node.addEventListener(dn, h, !1), l = setTimeout(function() {
                    d = [], i()
                }, c.duration + (c.delay || 0) + 50), a.registerCompleteHandler(f), setTimeout(function() {
                    for (var e, f, i, l, o, p, q = d.length, r = []; q--;) l = d[q], e = m + l, en && !mn[e] && (n[Um(l)] = b[l], ln[e] || (f = a.getStyle(l), ln[e] = a.getStyle(l) != b[l], mn[e] = !ln[e], mn[e] && (n[Um(l)] = f))), en && !mn[e] || (void 0 === f && (f = a.getStyle(l)), i = d.indexOf(l), i === -1 ? s("Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!", {
                        node: a.node
                    }) : d.splice(i, 1), o = /[^\d]*$/.exec(b[l])[0], p = w(parseFloat(f), parseFloat(b[l])) || function() {
                        return b[l]
                    }, r.push({
                        name: Um(l),
                        interpolator: p,
                        suffix: o
                    }));
                    if (r.length) {
                        var u;
                        "string" == typeof c.easing ? (u = a.ractive.easing[c.easing], u || (t(Dg(c.easing, "easing")), u = kn)) : u = "function" == typeof c.easing ? c.easing : kn, new oh({
                            duration: c.duration,
                            easing: u,
                            step: function(b) {
                                for (var c = r.length; c--;) {
                                    var d = r[c];
                                    a.node.style[d.name] = d.interpolator(b) + d.suffix
                                }
                            },
                            complete: function() {
                                j = !0, g()
                            }
                        })
                    } else j = !0;
                    d.length || (a.node.removeEventListener(dn, h, !1), k = !0, g())
                }, 0)
            }, c.delay || 0)
        }
    } else Zm = null;
    var nn = Zm,
        on = Tf && (Tf.getComputedStyle || Sf.getComputedStyle),
        pn = Lg.resolve(),
        qn = {
            t0: "intro-outro",
            t1: "intro",
            t2: "outro"
        },
        rn = function(a) {
            this.owner = a.owner || a.parentFragment.owner || Td(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : Td(a.parentFragment), this.ractive = this.owner.ractive, this.template = a.template, this.parentFragment = a.parentFragment, this.options = a, this.onComplete = []
        };
    rn.prototype.animateStyle = function(a, b, c) {
        var d = this;
        if (4 === arguments.length) throw new Error("t.animateStyle() returns a promise - use .then() instead of passing a callback");
        if (!Tm) return this.setStyle(a, b), pn;
        var e;
        return "string" == typeof a ? (e = {}, e[a] = b) : (e = a, c = b), c || (t('The "%s" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340', this.name), c = this), new Lg(function(a) {
            if (!c.duration) return d.setStyle(e), void a();
            for (var b = Object.keys(e), f = [], g = on(d.owner.node), h = b.length; h--;) {
                var i = b[h],
                    j = g[Um(i)];
                "0px" === j && (j = 0), j != e[i] && (f.push(i), d.owner.node.style[Um(i)] = j)
            }
            return f.length ? void nn(d, e, c, f, a) : void a()
        })
    }, rn.prototype.bind = function() {
        var a = this,
            b = this.options;
        b.template && ("t0" !== b.template.v && "t1" != b.template.v || (this.element._introTransition = this), "t0" !== b.template.v && "t2" != b.template.v || (this.element._outroTransition = this), this.eventName = qn[b.template.v]);
        var c = this.owner.ractive;
        if (b.name) this.name = b.name;
        else {
            var d = b.template.f;
            if ("string" == typeof d.n && (d = d.n), "string" != typeof d) {
                var e = new An({
                    owner: this.owner,
                    template: d.n
                }).bind();
                if (d = e.toString(), e.unbind(), "" === d) return
            }
            this.name = d
        }
        if (b.params) this.params = b.params;
        else if (b.template.f.a && !b.template.f.a.s) this.params = b.template.f.a;
        else if (b.template.f.d) {
            var f = new An({
                owner: this.owner,
                template: b.template.f.d
            }).bind();
            this.params = f.getArgsList(), f.unbind()
        }
        "function" == typeof this.name ? (this._fn = this.name, this.name = this._fn.name) : this._fn = u("transitions", c, this.name), this._fn || t(Dg(this.name, "transition"), {
            ractive: c
        }), b.template && this.template.f.a && this.template.f.a.s && (this.resolvers = [], this.models = this.template.f.a.r.map(function(b, c) {
            var d, e = Va(a.parentFragment, b);
            return e ? e.register(a) : (d = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, d), b.register(a)
            }), a.resolvers.push(d)), e
        }), this.argsFn = lc(this.template.f.a.s, this.template.f.a.r.length))
    }, rn.prototype.destroyed = function() {}, rn.prototype.getStyle = function(a) {
        var b = on(this.owner.node);
        if ("string" == typeof a) {
            var c = b[Um(a)];
            return "0px" === c ? 0 : c
        }
        if (!j(a)) throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties");
        for (var d = {}, e = a.length; e--;) {
            var f = a[e],
                g = b[Um(f)];
            "0px" === g && (g = 0), d[f] = g
        }
        return d
    }, rn.prototype.processParams = function(a, b) {
        return "number" == typeof a ? a = {
            duration: a
        } : "string" == typeof a ? a = "slow" === a ? {
            duration: 600
        } : "fast" === a ? {
            duration: 200
        } : {
            duration: 400
        } : a || (a = {}), h({}, b, a)
    }, rn.prototype.rebinding = function(a, b) {
        var c = this.models.indexOf(b);
        ~c && (a = Qa(this.template.f.a.r[c], a, b), a !== b && (b.unregister(this), this.models.splice(c, 1, a), a && a.addShuffleRegister(this, "mark")))
    }, rn.prototype.registerCompleteHandler = function(a) {
        y(this.onComplete, a)
    }, rn.prototype.render = function() {}, rn.prototype.setStyle = function(a, b) {
        if ("string" == typeof a) this.owner.node.style[Um(a)] = b;
        else {
            var c;
            for (c in a) a.hasOwnProperty(c) && (this.owner.node.style[Um(c)] = a[c])
        }
        return this
    }, rn.prototype.start = function() {
        var a, b = this,
            c = this.node = this.element.node,
            d = c.getAttribute("style"),
            e = this.params;
        if (this.complete = function(e) {
                a || (b.onComplete.forEach(function(a) {
                    return a()
                }), !e && b.isIntro && of(c, d), b._manager.remove(b), a = !0)
            }, !this._fn) return void this.complete();
        if (this.argsFn) {
            var f = this.models.map(function(a) {
                if (a) return a.get()
            });
            e = this.argsFn.apply(this.ractive, f)
        }
        var g = this._fn.apply(this.ractive, [this].concat(e));
        g && g.then(this.complete)
    }, rn.prototype.toString = function() {
        return ""
    }, rn.prototype.unbind = function() {
        this.resolvers && this.resolvers.forEach(Ha)
    }, rn.prototype.unregisterCompleteHandler = function(a) {
        D(this.onComplete, a)
    }, rn.prototype.unrender = function() {}, rn.prototype.update = function() {};
    var sn, tn, un = {};
    try {
        Xf("table").innerHTML = "foo"
    } catch (a) {
        sn = !0, tn = {
            TABLE: ['<table class="x">', "</table>"],
            THEAD: ['<table><thead class="x">', "</thead></table>"],
            TBODY: ['<table><tbody class="x">', "</tbody></table>"],
            TR: ['<table><tr class="x">', "</tr></table>"],
            SELECT: ['<select class="x">', "</select>"]
        }
    }
    var vn = function(a, b, c) {
            var d = [];
            if (null == a || "" === a) return d;
            var e, f, g;
            sn && (f = tn[b.tagName]) ? (e = pf("DIV"), e.innerHTML = f[0] + a + f[1], e = e.querySelector(".x"), "SELECT" === e.tagName && (g = e.options[e.selectedIndex])) : b.namespaceURI === ig ? (e = pf("DIV"), e.innerHTML = '<svg class="x">' + a + "</svg>", e = e.querySelector(".x")) : "TEXTAREA" === b.tagName ? (e = Xf("div"), "undefined" != typeof e.textContent ? e.textContent = a : e.innerHTML = a) : (e = pf(b.tagName), e.innerHTML = a, "SELECT" === e.tagName && (g = e.options[e.selectedIndex]));
            for (var h; h = e.firstChild;) d.push(h), c.appendChild(h);
            var i;
            if ("SELECT" === b.tagName)
                for (i = d.length; i--;) d[i] !== g && (d[i].selected = !1);
            return d
        },
        wn = function(b) {
            function d(a) {
                b.call(this, a)
            }
            return d.prototype = Object.create(b && b.prototype), d.prototype.constructor = d, d.prototype.detach = function() {
                var b = a();
                return this.nodes.forEach(function(a) {
                    return b.appendChild(a)
                }), b
            }, d.prototype.find = function(a) {
                var b, c = this,
                    d = this.nodes.length;
                for (b = 0; b < d; b += 1) {
                    var e = c.nodes[b];
                    if (1 === e.nodeType) {
                        if (Yf(e, a)) return e;
                        var f = e.querySelector(a);
                        if (f) return f
                    }
                }
                return null
            }, d.prototype.findAll = function(a, b) {
                var c, d = this,
                    e = this.nodes.length;
                for (c = 0; c < e; c += 1) {
                    var f = d.nodes[c];
                    if (1 === f.nodeType) {
                        b.test(f) && b.add(f);
                        var g = f.querySelectorAll(a);
                        if (g) {
                            var h, i = g.length;
                            for (h = 0; h < i; h += 1) b.add(g[h])
                        }
                    }
                }
            }, d.prototype.findComponent = function() {
                return null
            }, d.prototype.firstNode = function() {
                return this.nodes[0]
            }, d.prototype.render = function(a) {
                var b = this.model ? this.model.get() : "";
                this.nodes = vn(b, this.parentFragment.findParentNode(), a), this.rendered = !0
            }, d.prototype.toString = function() {
                return this.model && null != this.model.get() ? qc("" + this.model.get()) : ""
            }, d.prototype.unrender = function() {
                this.nodes && this.nodes.forEach(function(a) {
                    return c(a)
                }), this.rendered = !1
            }, d.prototype.update = function() {
                if (this.rendered && this.dirty) {
                    this.dirty = !1, this.unrender();
                    var b = a();
                    this.render(b);
                    var c = this.parentFragment.findParentNode(),
                        d = this.parentFragment.findNextNode(this);
                    c.insertBefore(b, d)
                }
            }, d
        }(Fm),
        xn = function(a) {
            function b(b) {
                a.call(this, b), this.container = b.parentFragment.ractive, this.component = this.container.component, this.containerFragment = b.parentFragment, this.parentFragment = this.component.parentFragment, this.name = b.template.n || ""
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this.name;
                (this.component.yielders[a] || (this.component.yielders[a] = [])).push(this);
                var b = this.container._inlinePartials[a || "content"];
                "string" == typeof b && (b = vd(b).t), b || (s('Could not find template for partial "' + a + '"', {
                    ractive: this.ractive
                }), b = []), this.fragment = new An({
                    owner: this,
                    ractive: this.container.parent,
                    template: b
                }).bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.containerFragment.bubble(), this.dirty = !0)
            }, b.prototype.detach = function() {
                return this.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.fragment.find(a, b)
            }, b.prototype.findComponent = function(a) {
                return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment.findAllComponents(a, b)
            }, b.prototype.findNextNode = function() {
                return this.containerFragment.findNextNode(this)
            }, b.prototype.firstNode = function(a) {
                return this.fragment.firstNode(a)
            }, b.prototype.render = function(a, b) {
                return this.fragment.render(a, b)
            }, b.prototype.setTemplate = function(a) {
                var b = this.parentFragment.ractive.partials[a];
                "string" == typeof b && (b = vd(b).t), this.partialTemplate = b || []
            }, b.prototype.toString = function(a) {
                return this.fragment.toString(a)
            }, b.prototype.unbind = function() {
                this.fragment.unbind(), D(this.component.yielders[this.name], this)
            }, b.prototype.unrender = function(a) {
                this.fragment.unrender(a)
            }, b.prototype.update = function() {
                this.dirty = !1, this.fragment.update()
            }, b
        }(pl),
        yn = {};
    yn[Ei] = ul, yn[Di] = om, yn[pi] = Gm, yn[vi] = Km, yn[ri] = Nm, yn[qi] = wn, yn[Bi] = xn, yn[yi] = Dl, yn[dj] = El, yn[bj] = nm, yn[aj] = jm, yn[cj] = rn;
    var zn = {
            doctype: om,
            form: Em,
            input: Hm,
            option: Jm,
            select: Om,
            textarea: Pm
        },
        An = function(a) {
            this.owner = a.owner, this.isRoot = !a.owner.parentFragment, this.parent = this.isRoot ? null : this.owner.parentFragment, this.ractive = a.ractive || (this.isRoot ? a.owner : this.parent.ractive), this.componentParent = this.isRoot && this.ractive.component ? this.ractive.component.parentFragment : null, this.context = null, this.rendered = !1, this.cssIds = "cssIds" in a ? a.cssIds : this.parent ? this.parent.cssIds : null, this.resolvers = [], this.dirty = !1, this.dirtyArgs = this.dirtyValue = !0, this.template = a.template || [], this.createItems()
        };
    An.prototype.bind = function(a) {
        return this.context = a, this.items.forEach(za), this.bound = !0, this.dirty && this.update(), this
    }, An.prototype.bubble = function() {
        this.dirtyArgs = this.dirtyValue = !0, this.dirty || (this.dirty = !0, this.isRoot ? this.ractive.component ? this.ractive.component.bubble() : this.bound && Pg.addFragment(this) : this.owner.bubble())
    }, An.prototype.createItems = function() {
        var a = this,
            b = this.template.length;
        this.items = [];
        for (var c = 0; c < b; c++) a.items[c] = rf({
            parentFragment: a,
            template: a.template[c],
            index: c
        })
    }, An.prototype.destroyed = function() {
        this.items.forEach(function(a) {
            return a.destroyed()
        })
    }, An.prototype.detach = function() {
        var b = a();
        return this.items.forEach(function(a) {
            return b.appendChild(a.detach())
        }), b
    }, An.prototype.find = function(a) {
        var b, c = this,
            d = this.items.length;
        for (b = 0; b < d; b += 1) {
            var e = c.items[b].find(a);
            if (e) return e
        }
    }, An.prototype.findAll = function(a, b) {
        var c = this;
        if (this.items) {
            var d, e = this.items.length;
            for (d = 0; d < e; d += 1) {
                var f = c.items[d];
                f.findAll && f.findAll(a, b)
            }
        }
        return b
    }, An.prototype.findComponent = function(a) {
        var b, c = this,
            d = this.items.length;
        for (b = 0; b < d; b += 1) {
            var e = c.items[b].findComponent(a);
            if (e) return e
        }
    }, An.prototype.findAllComponents = function(a, b) {
        var c = this;
        if (this.items) {
            var d, e = this.items.length;
            for (d = 0; d < e; d += 1) {
                var f = c.items[d];
                f.findAllComponents && f.findAllComponents(a, b)
            }
        }
        return b
    }, An.prototype.findContext = function() {
        for (var a = this; a && !a.context;) a = a.parent;
        return a ? a.context : this.ractive.viewmodel
    }, An.prototype.findNextNode = function(a) {
        for (var b = this, c = a.index + 1; c < b.items.length; c++)
            if (b.items[c]) {
                var d = b.items[c].firstNode(!0);
                if (d) return d
            }
        return this.isRoot ? this.ractive.component ? this.ractive.component.parentFragment.findNextNode(this.ractive.component) : null : this.owner.findNextNode(this)
    }, An.prototype.findParentNode = function() {
        var a = this;
        do {
            if (a.owner.type === ui) return a.owner.node;
            if (a.isRoot && !a.ractive.component) return a.ractive.el;
            a = a.owner.type === Bi ? a.owner.containerFragment : a.componentParent || a.parent
        } while (a);
        throw new Error("Could not find parent node")
    }, An.prototype.findRepeatingFragment = function() {
        for (var a = this;
            (a.parent || a.componentParent) && !a.isIteration;) a = a.parent || a.componentParent;
        return a
    }, An.prototype.firstNode = function(a) {
        for (var b, c = this, d = 0; d < c.items.length; d++)
            if (b = c.items[d].firstNode(!0)) return b;
        return a ? null : this.parent.findNextNode(this.owner)
    }, An.prototype.getArgsList = function() {
        if (this.dirtyArgs) {
            var a = {},
                b = sf(this.items, a, this.ractive._guid),
                c = ck("[" + b + "]", a);
            this.argsList = c ? c.value : [this.toString()], this.dirtyArgs = !1
        }
        return this.argsList
    }, An.prototype.rebinding = function(a) {
        this.context = a
    }, An.prototype.render = function(a, b) {
        if (this.rendered) throw new Error("Fragment is already rendered!");
        this.rendered = !0, this.items.forEach(function(c) {
            return c.render(a, b)
        })
    }, An.prototype.resetTemplate = function(b) {
        var c = this.bound,
            d = this.rendered;
        if (c && (d && this.unrender(!0), this.unbind()), this.template = b, this.createItems(), c && (this.bind(this.context), d)) {
            var e = this.findParentNode(),
                f = this.parent ? this.parent.findNextNode(this.owner) : null;
            if (f) {
                var g = a();
                this.render(g), e.insertBefore(g, f)
            } else this.render(e)
        }
    }, An.prototype.resolve = function(a, b) {
        if (!this.context && this.parent.resolve) return this.parent.resolve(a, b);
        var c = new Ih(this, a, b);
        return this.resolvers.push(c), c
    }, An.prototype.shuffled = function() {
        this.items.forEach(function(a) {
            return a.shuffled()
        })
    }, An.prototype.toHtml = function() {
        return this.toString()
    }, An.prototype.toString = function(a) {
        return this.items.map(a ? Ma : La).join("")
    }, An.prototype.unbind = function() {
        return this.items.forEach(Ha), this.bound = !1, this
    }, An.prototype.unrender = function(a) {
        this.items.forEach(a ? tf : Ia), this.rendered = !1
    }, An.prototype.update = function() {
        this.dirty && (this.updating ? this.isRoot && Pg.addFragmentToRoot(this) : (this.dirty = !1, this.updating = !0, this.items.forEach(Ka), this.updating = !1))
    }, An.prototype.valueOf = function() {
        if (1 === this.items.length) return this.items[0].valueOf();
        if (this.dirtyValue) {
            var a = {},
                b = sf(this.items, a, this.ractive._guid),
                c = ck(b, a);
            this.value = c ? c.value : this.toString(), this.dirtyValue = !1
        }
        return this.value
    };
    var Bn = vh("reverse").path,
        Cn = vh("shift").path,
        Dn = vh("sort").path,
        En = vh("splice").path,
        Fn = new Gg("teardown"),
        Gn = new Gg("unrender"),
        Hn = vh("unshift").path,
        In = {
            add: Y,
            animate: _,
            detach: aa,
            find: ba,
            findAll: ga,
            findAllComponents: ha,
            findComponent: ia,
            findContainer: ja,
            findParent: ka,
            fire: ta,
            get: Wa,
            getNodeInfo: Jb,
            insert: Kb,
            link: Mb,
            merge: ab,
            observe: Nb,
            observeList: Pb,
            observeOnce: Rb,
            off: Sb,
            on: Tb,
            once: Ub,
            pop: Ph,
            push: Qh,
            render: Zb,
            reset: Nd,
            resetPartial: ol,
            resetTemplate: uf,
            reverse: Bn,
            set: vf,
            shift: Cn,
            sort: Dn,
            splice: En,
            subtract: wf,
            teardown: xf,
            toggle: yf,
            toCSS: zf,
            toCss: zf,
            toHTML: Af,
            toHtml: Af,
            transition: Bf,
            unlink: Cf,
            unrender: Df,
            unshift: Hn,
            update: cb,
            updateModel: Ef
        },
        Jn = function(a, b, c) {
            return c || Ff(a, b) ? function() {
                var c, d = "_super" in this,
                    e = this._super;
                return this._super = b, c = a.apply(this, arguments), d && (this._super = e), c
            } : a
        },
        Kn = "function";
    if (typeof Date.now !== Kn || typeof String.prototype.trim !== Kn || typeof Object.keys !== Kn || typeof Array.prototype.indexOf !== Kn || typeof Array.prototype.forEach !== Kn || typeof Array.prototype.map !== Kn || typeof Array.prototype.filter !== Kn || Tf && typeof Tf.addEventListener !== Kn) throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");
    return h(Of.prototype, In, Qf), Of.prototype.constructor = Of, Of.defaults = Of.prototype, pg(Of, {
        DEBUG: {
            writable: !0,
            value: !0
        },
        DEBUG_PROMISES: {
            writable: !0,
            value: !0
        },
        extend: {
            value: Kf
        },
        escapeKey: {
            value: P
        },
        getNodeInfo: {
            value: Gh
        },
        joinKeys: {
            value: Mf
        },
        parse: {
            value: vd
        },
        splitKeypath: {
            value: Nf
        },
        unescapeKey: {
            value: S
        },
        getCSS: {
            value: Xb
        },
        Promise: {
            value: Lg
        },
        enhance: {
            writable: !0,
            value: !1
        },
        svg: {
            value: eg
        },
        magic: {
            value: Pf
        },
        VERSION: {
            value: "0.8.0"
        },
        adaptors: {
            writable: !0,
            value: {}
        },
        components: {
            writable: !0,
            value: {}
        },
        decorators: {
            writable: !0,
            value: {}
        },
        easing: {
            writable: !0,
            value: Rf
        },
        events: {
            writable: !0,
            value: {}
        },
        interpolators: {
            writable: !0,
            value: Eg
        },
        partials: {
            writable: !0,
            value: {}
        },
        transitions: {
            writable: !0,
            value: {}
        }
    }), Of
}), ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function b(b, d) {
            var e, f = this;
            f.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(b),
                appendDots: a(b),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, f.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(f, f.initials), f.activeBreakpoint = null, f.animType = null, f.animProp = null, f.breakpoints = [], f.breakpointSettings = [], f.cssTransitions = !1, f.focussed = !1, f.interrupted = !1, f.hidden = "hidden", f.paused = !0, f.positionProp = null, f.respondTo = null, f.rowCount = 1, f.shouldClick = !0, f.$slider = a(b), f.$slidesCache = null, f.transformType = null, f.transitionType = null, f.visibilityChange = "visibilitychange", f.windowWidth = 0, f.windowTimer = null, e = a(b).data("slick") || {}, f.options = a.extend({}, f.defaults, d, e), f.currentSlide = f.options.initialSlide, f.originalSettings = f.options, "undefined" != typeof document.mozHidden ? (f.hidden = "mozHidden", f.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (f.hidden = "webkitHidden", f.visibilityChange = "webkitvisibilitychange"), f.autoPlay = a.proxy(f.autoPlay, f), f.autoPlayClear = a.proxy(f.autoPlayClear, f), f.autoPlayIterator = a.proxy(f.autoPlayIterator, f), f.changeSlide = a.proxy(f.changeSlide, f), f.clickHandler = a.proxy(f.clickHandler, f), f.selectHandler = a.proxy(f.selectHandler, f), f.setPosition = a.proxy(f.setPosition, f), f.swipeHandler = a.proxy(f.swipeHandler, f), f.dragHandler = a.proxy(f.dragHandler, f), f.keyHandler = a.proxy(f.keyHandler, f), f.instanceUid = c++, f.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, f.registerBreakpoints(), f.init(!0)
        }
        var c = 0;
        return b
    }(), b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function() {
        var b, c, d = this;
        if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
            for (d.$slider.addClass("slick-dotted"), c = a("<ul />").addClass(d.options.dotsClass), b = 0; b <= d.getDotCount(); b += 1) c.append(a("<li />").append(d.options.customPaging.call(this, d, b)));
            d.$dots = c.appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
        var a, b, c, d, e, f, g, h = this;
        if (d = document.createDocumentFragment(), f = h.$slider.children(), h.options.rows > 1) {
            for (g = h.options.slidesPerRow * h.options.rows, e = Math.ceil(f.length / g), a = 0; e > a; a++) {
                var i = document.createElement("div");
                for (b = 0; b < h.options.rows; b++) {
                    var j = document.createElement("div");
                    for (c = 0; c < h.options.slidesPerRow; c++) {
                        var k = a * g + (b * h.options.slidesPerRow + c);
                        f.get(k) && j.appendChild(f.get(k))
                    }
                    i.appendChild(j)
                }
                d.appendChild(i)
            }
            h.$slider.empty().append(d), h.$slider.children().children().children().css({
                width: 100 / h.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function(b, c) {
        var d, e, f, g = this,
            h = !1,
            i = g.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === g.respondTo ? f = j : "slider" === g.respondTo ? f = i : "min" === g.respondTo && (f = Math.min(j, i)), g.options.responsive && g.options.responsive.length && null !== g.options.responsive) {
            e = null;
            for (d in g.breakpoints) g.breakpoints.hasOwnProperty(d) && (g.originalSettings.mobileFirst === !1 ? f < g.breakpoints[d] && (e = g.breakpoints[d]) : f > g.breakpoints[d] && (e = g.breakpoints[d]));
            null !== e ? null !== g.activeBreakpoint ? (e !== g.activeBreakpoint || c) && (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), b === !0 && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), b === !0 && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : null !== g.activeBreakpoint && (g.activeBreakpoint = null, g.options = g.originalSettings, b === !0 && (g.currentSlide = g.options.initialSlide), g.refresh(b), h = e), b || h === !1 || g.$slider.trigger("breakpoint", [g, h])
        }
    }, b.prototype.changeSlide = function(b, c) {
        var d, e, f, g = this,
            h = a(b.currentTarget);
        switch (h.is("a") && b.preventDefault(), h.is("li") || (h = h.closest("li")), f = g.slideCount % g.options.slidesToScroll !== 0, d = f ? 0 : (g.slideCount - g.currentSlide) % g.options.slidesToScroll, b.data.message) {
            case "previous":
                e = 0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide - e, !1, c);
                break;
            case "next":
                e = 0 === d ? g.options.slidesToScroll : d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide + e, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || h.index() * g.options.slidesToScroll;
                g.slideHandler(g.checkNavigable(i), !1, c), h.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function(a) {
        var b, c, d = this;
        if (b = d.getNavigableIndexes(), c = 0, a > b[b.length - 1]) a = b[b.length - 1];
        else
            for (var e in b) {
                if (a < b[e]) {
                    a = c;
                    break
                }
                c = b[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
        var a, b = this;
        b.options.rows > 1 && (a = b.$slides.children().children(), a.removeAttr("style"), b.$slider.empty().append(a))
    }, b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function() {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function() {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function(a) {
        var b, c, d, e = this,
            f = 0;
        return e.slideOffset = 0, c = e.$slides.first().outerHeight(!0), e.options.infinite === !0 ? (e.slideCount > e.options.slidesToShow && (e.slideOffset = e.slideWidth * e.options.slidesToShow * -1, f = c * e.options.slidesToShow * -1), e.slideCount % e.options.slidesToScroll !== 0 && a + e.options.slidesToScroll > e.slideCount && e.slideCount > e.options.slidesToShow && (a > e.slideCount ? (e.slideOffset = (e.options.slidesToShow - (a - e.slideCount)) * e.slideWidth * -1, f = (e.options.slidesToShow - (a - e.slideCount)) * c * -1) : (e.slideOffset = e.slideCount % e.options.slidesToScroll * e.slideWidth * -1, f = e.slideCount % e.options.slidesToScroll * c * -1))) : a + e.options.slidesToShow > e.slideCount && (e.slideOffset = (a + e.options.slidesToShow - e.slideCount) * e.slideWidth, f = (a + e.options.slidesToShow - e.slideCount) * c), e.slideCount <= e.options.slidesToShow && (e.slideOffset = 0, f = 0), e.options.centerMode === !0 && e.options.infinite === !0 ? e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth : e.options.centerMode === !0 && (e.slideOffset = 0, e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2)), b = e.options.vertical === !1 ? a * e.slideWidth * -1 + e.slideOffset : a * c * -1 + f, e.options.variableWidth === !0 && (d = e.slideCount <= e.options.slidesToShow || e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow), b = e.options.rtl === !0 ? d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, e.options.centerMode === !0 && (d = e.slideCount <= e.options.slidesToShow || e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow + 1), b = e.options.rtl === !0 ? d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, b += (e.$list.width() - d.outerWidth()) / 2)), b
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function() {
        var a, b = this,
            c = 0,
            d = 0,
            e = [];
        for (b.options.infinite === !1 ? a = b.slideCount : (c = -1 * b.options.slidesToScroll, d = -1 * b.options.slidesToScroll, a = 2 * b.slideCount); a > c;) e.push(c), c = d + b.options.slidesToScroll, d += b.options.slidesToScroll <= b.options.slidesToShow ? b.options.slidesToScroll : b.options.slidesToShow;
        return e
    }, b.prototype.getSlick = function() {
        return this
    }, b.prototype.getSlideCount = function() {
        var b, c, d, e = this;
        return d = e.options.centerMode === !0 ? e.slideWidth * Math.floor(e.options.slidesToShow / 2) : 0, e.options.swipeToSlide === !0 ? (e.$slideTrack.find(".slick-slide").each(function(b, f) {
            return f.offsetLeft - d + a(f).outerWidth() / 2 > -1 * e.swipeLeft ? (c = f, !1) : void 0
        }), b = Math.abs(a(c).attr("data-slick-index") - e.currentSlide) || 1) : e.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, b.prototype.lazyLoad = function() {
        function b(b) {
            a("img[data-lazy]", b).each(function() {
                var b = a(this),
                    c = a(this).attr("data-lazy"),
                    d = document.createElement("img");
                d.onload = function() {
                    b.animate({
                        opacity: 0
                    }, 100, function() {
                        b.attr("src", c).animate({
                            opacity: 1
                        }, 200, function() {
                            b.removeAttr("data-lazy").removeClass("slick-loading")
                        }), g.$slider.trigger("lazyLoaded", [g, b, c])
                    })
                }, d.onerror = function() {
                    b.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), g.$slider.trigger("lazyLoadError", [g, b, c])
                }, d.src = c
            })
        }
        var c, d, e, f, g = this;
        g.options.centerMode === !0 ? g.options.infinite === !0 ? (e = g.currentSlide + (g.options.slidesToShow / 2 + 1), f = e + g.options.slidesToShow + 2) : (e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1)), f = 2 + (g.options.slidesToShow / 2 + 1) + g.currentSlide) : (e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide, f = Math.ceil(e + g.options.slidesToShow), g.options.fade === !0 && (e > 0 && e--, f <= g.slideCount && f++)), c = g.$slider.find(".slick-slide").slice(e, f), b(c), g.slideCount <= g.options.slidesToShow ? (d = g.$slider.find(".slick-slide"), b(d)) : g.currentSlide >= g.slideCount - g.options.slidesToShow ? (d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow), b(d)) : 0 === g.currentSlide && (d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow), b(d))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var c, d, e, f = this,
            g = a("img[data-lazy]", f.$slider);
        g.length ? (c = g.first(), d = c.attr("data-lazy"), e = document.createElement("img"), e.onload = function() {
            c.attr("src", d).removeAttr("data-lazy").removeClass("slick-loading"), f.options.adaptiveHeight === !0 && f.setPosition(), f.$slider.trigger("lazyLoaded", [f, c, d]), f.progressiveLazyLoad()
        }, e.onerror = function() {
            3 > b ? setTimeout(function() {
                f.progressiveLazyLoad(b + 1)
            }, 500) : (c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), f.$slider.trigger("lazyLoadError", [f, c, d]), f.progressiveLazyLoad())
        }, e.src = d) : f.$slider.trigger("allImagesLoaded", [f])
    }, b.prototype.refresh = function(b) {
        var c, d, e = this;
        d = e.slideCount - e.options.slidesToShow, !e.options.infinite && e.currentSlide > d && (e.currentSlide = d), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), c = e.currentSlide, e.destroy(!0), a.extend(e, e.initials, {
            currentSlide: c
        }), e.init(), b || e.changeSlide({
            data: {
                message: "index",
                index: c
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function() {
        var b, c, d, e = this,
            f = e.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            e.respondTo = e.options.respondTo || "window";
            for (b in f)
                if (d = e.breakpoints.length - 1, c = f[b].breakpoint, f.hasOwnProperty(b)) {
                    for (; d >= 0;) e.breakpoints[d] && e.breakpoints[d] === c && e.breakpoints.splice(d, 1), d--;
                    e.breakpoints.push(c), e.breakpointSettings[c] = f[b].settings
                }
            e.breakpoints.sort(function(a, b) {
                return e.options.mobileFirst ? a - b : b - a
            })
        }
    }, b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, !(d.slideCount < 1 || 0 > a || a > d.slideCount - 1) && (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function(a) {
        var b, c, d = this,
            e = {};
        d.options.rtl === !0 && (a = -a), b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px", c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px", e[d.positionProp] = a, d.transformsEnabled === !1 ? d.$slideTrack.css(e) : (e = {}, d.cssTransitions === !1 ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
        var b, c = this;
        c.$slides.each(function(d, e) {
            b = c.slideWidth * d * -1, c.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: b,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: b,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0
            })
        }), c.$slides.eq(c.currentSlide).css({
            zIndex: c.options.zIndex - 1,
            opacity: 1
        })
    }, b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
        var b, c, d, e, f, g = this,
            h = !1;
        if ("object" === a.type(arguments[0]) ? (d = arguments[0], h = arguments[1], f = "multiple") : "string" === a.type(arguments[0]) && (d = arguments[0], e = arguments[1], h = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? f = "responsive" : "undefined" != typeof arguments[1] && (f = "single")), "single" === f) g.options[d] = e;
        else if ("multiple" === f) a.each(d, function(a, b) {
            g.options[a] = b
        });
        else if ("responsive" === f)
            for (c in e)
                if ("array" !== a.type(g.options.responsive)) g.options.responsive = [e[c]];
                else {
                    for (b = g.options.responsive.length - 1; b >= 0;) g.options.responsive[b].breakpoint === e[c].breakpoint && g.options.responsive.splice(b, 1), b--;
                    g.options.responsive.push(e[c])
                }
        h && (g.unload(), g.reinit())
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
        var a = this,
            b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
        var b, c, d, e, f = this;
        c = f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), f.$slides.eq(a).addClass("slick-current"), f.options.centerMode === !0 ? (b = Math.floor(f.options.slidesToShow / 2), f.options.infinite === !0 && (a >= b && a <= f.slideCount - 1 - b ? f.$slides.slice(a - b, a + b + 1).addClass("slick-active").attr("aria-hidden", "false") : (d = f.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")), f.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(a, a + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : c.length <= f.options.slidesToShow ? c.addClass("slick-active").attr("aria-hidden", "false") : (e = f.slideCount % f.options.slidesToShow, d = f.options.infinite === !0 ? f.options.slidesToShow + a : a, f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow ? c.slice(d - (f.options.slidesToShow - e), d + e).addClass("slick-active").attr("aria-hidden", "false") : c.slice(d, d + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === f.options.lazyLoad && f.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var b, c, d, e = this;
        if (e.options.fade === !0 && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (c = null, e.slideCount > e.options.slidesToShow)) {
            for (d = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
            for (b = 0; d > b; b += 1) c = b, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
            e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, h, i = null,
            j = this;
        return b = b || !1, j.animating === !0 && j.options.waitForAnimate === !0 || j.options.fade === !0 && j.currentSlide === a || j.slideCount <= j.options.slidesToShow ? void 0 : (b === !1 && j.asNavFor(a), d = a, i = j.getLeft(d), g = j.getLeft(j.currentSlide), j.currentLeft = null === j.swipeLeft ? g : j.swipeLeft, j.options.infinite === !1 && j.options.centerMode === !1 && (0 > a || a > j.getDotCount() * j.options.slidesToScroll) ? void(j.options.fade === !1 && (d = j.currentSlide, c !== !0 ? j.animateSlide(g, function() {
            j.postSlide(d)
        }) : j.postSlide(d))) : j.options.infinite === !1 && j.options.centerMode === !0 && (0 > a || a > j.slideCount - j.options.slidesToScroll) ? void(j.options.fade === !1 && (d = j.currentSlide, c !== !0 ? j.animateSlide(g, function() {
            j.postSlide(d)
        }) : j.postSlide(d))) : (j.options.autoplay && clearInterval(j.autoPlayTimer), e = 0 > d ? j.slideCount % j.options.slidesToScroll !== 0 ? j.slideCount - j.slideCount % j.options.slidesToScroll : j.slideCount + d : d >= j.slideCount ? j.slideCount % j.options.slidesToScroll !== 0 ? 0 : d - j.slideCount : d, j.animating = !0, j.$slider.trigger("beforeChange", [j, j.currentSlide, e]), f = j.currentSlide, j.currentSlide = e, j.setSlideClasses(j.currentSlide), j.options.asNavFor && (h = j.getNavTarget(), h = h.slick("getSlick"), h.slideCount <= h.options.slidesToShow && h.setSlideClasses(j.currentSlide)), j.updateDots(), j.updateArrows(), j.options.fade === !0 ? (c !== !0 ? (j.fadeSlideOut(f), j.fadeSlide(e, function() {
            j.postSlide(e)
        })) : j.postSlide(e), void j.animateHeight()) : void(c !== !0 ? j.animateSlide(i, function() {
            j.postSlide(e)
        }) : j.postSlide(e))))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function(a) {
        var b, c, d = this;
        if (d.dragging = !1, d.interrupted = !1, d.shouldClick = !(d.touchObject.swipeLength > 10), void 0 === d.touchObject.curX) return !1;
        if (d.touchObject.edgeHit === !0 && d.$slider.trigger("edge", [d, d.swipeDirection()]), d.touchObject.swipeLength >= d.touchObject.minSwipe) {
            switch (c = d.swipeDirection()) {
                case "left":
                case "down":
                    b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide + d.getSlideCount()) : d.currentSlide + d.getSlideCount(), d.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide - d.getSlideCount()) : d.currentSlide - d.getSlideCount(), d.currentDirection = 1
            }
            "vertical" != c && (d.slideHandler(b), d.touchObject = {}, d.$slider.trigger("swipe", [d, c]))
        } else d.touchObject.startX !== d.touchObject.curX && (d.slideHandler(d.currentSlide), d.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) {
        var b, c, d, e, f, g = this;
        return f = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !(!g.dragging || f && 1 !== f.length) && (b = g.getLeft(g.currentSlide), g.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX, g.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY, g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curX - g.touchObject.startX, 2))), g.options.verticalSwiping === !0 && (g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curY - g.touchObject.startY, 2)))), c = g.swipeDirection(), "vertical" !== c ? (void 0 !== a.originalEvent && g.touchObject.swipeLength > 4 && a.preventDefault(), e = (g.options.rtl === !1 ? 1 : -1) * (g.touchObject.curX > g.touchObject.startX ? 1 : -1), g.options.verticalSwiping === !0 && (e = g.touchObject.curY > g.touchObject.startY ? 1 : -1), d = g.touchObject.swipeLength, g.touchObject.edgeHit = !1, g.options.infinite === !1 && (0 === g.currentSlide && "right" === c || g.currentSlide >= g.getDotCount() && "left" === c) && (d = g.touchObject.swipeLength * g.options.edgeFriction, g.touchObject.edgeHit = !0), g.options.vertical === !1 ? g.swipeLeft = b + d * e : g.swipeLeft = b + d * (g.$list.height() / g.listWidth) * e, g.options.verticalSwiping === !0 && (g.swipeLeft = b + d * e), g.options.fade !== !0 && g.options.touchMove !== !1 && (g.animating === !0 ? (g.swipeLeft = null, !1) : void g.setCSS(g.swipeLeft))) : void 0)
    }, b.prototype.swipeStart = function(a) {
        var b, c = this;
        return c.interrupted = !0, 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow ? (c.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, void(c.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
        var a, b = this;
        a = Math.floor(b.options.slidesToShow / 2), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && !b.options.infinite && (b.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), b.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === b.currentSlide ? (b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), b.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : b.currentSlide >= b.slideCount - b.options.slidesToShow && b.options.centerMode === !1 ? (b.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), b.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : b.currentSlide >= b.slideCount - 1 && b.options.centerMode === !0 && (b.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), b.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
        var a, c, d = this,
            e = arguments[0],
            f = Array.prototype.slice.call(arguments, 1),
            g = d.length;
        for (a = 0; g > a; a++)
            if ("object" == typeof e || "undefined" == typeof e ? d[a].slick = new b(d[a], e) : c = d[a].slick[e].apply(d[a].slick, f), "undefined" != typeof c) return c;
        return d
    }
});
var BB = BB || {};
BB.base = function() {
    this.__BB_DEBUG__ = !1, this.__PROTECTED__ = [], this._data = void 0
}, BB.base.prototype.set_data = function(a) {
    return "undefined" == typeof this._data && (this._data = new BB.data), "object" != typeof a ? this : (this._data.set_data(a), this)
}, BB.base.prototype.remove_data = function(a) {
    return this._data.remove_data(a), this
}, BB.base.prototype.get_data = function(a) {
    var b = this.data();
    return "undefined" != typeof b[a] && b[a]
}, BB.base.prototype.data = function(a) {
    return this._data.get_data(a)
}, BB.base.prototype.sanitize = function() {
    var a = this.data();
    return a = this._escape_data(a), this.set_data(a), this
}, BB.base.prototype._escape_data = function(a) {
    if ("undefined" == typeof a) return "";
    if ("object" == typeof a && a.length)
        for (var b = 0, c = a.length; b < c; b++) a[b] = this._escape_data(a[b]);
    if ("object" == typeof a)
        for (var d in a) a[d] = this._escape_data(a[d]);
    return "string" == typeof a ? escape(a) : a
}, BB.base.prototype._unescape_data = function(a) {
    if ("undefined" == typeof a) return "";
    if ("object" == typeof a)
        for (var b in a) a[b] = this._unescape_data(a[b]);
    return "string" == typeof a ? unescape(a) : a
}, BB.base.prototype.ident = function() {
    var a = this.data();
    return "string" != typeof a.ident ? (this.error("Ident is not a String which is odd. " + a.ident), "") : a.ident
}, BB.base.prototype.set_ident = function(a) {
    return "string" != typeof a && (a = "" + a, this.error("Ident must be a string. Automatically converted to : " + a)), this.set_data({
        ident: a
    }), this
}, BB.base.prototype.error = function(a) {
    if (this.__BB_DEBUG__) throw Error(a);
    return this
}, BB.base.prototype.is_empty_object = function(a) {
    if ("object" != typeof a) return this.error("Invalid argument, Object expected at BB.base.is_empty_object()"), !0;
    for (var b in a)
        if (a.hasOwnProperty(b)) return !1;
    return !0
}, BB.base.prototype.extend = function(a, b) {
    var c, d = {};
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && (d[c] = a[c]);
    for (c in b) Object.prototype.hasOwnProperty.call(b, c) && (d[c] = b[c]);
    return d
};
var BB = BB || {};
BB.data = function(a) {
    if (this.__PROTECTED__ = [], this.__HIDDEN_DATA__ = !0, this.__HIDDEN_DATA__) {
        var b = a || {};
        return {
            set_data: function(a) {
                for (var c in a) b[c] = a[c]
            },
            get_data: function(a) {
                return a ? "undefined" != typeof b[a] ? b[a] : "" : b
            },
            remove_data: function(a) {
                a || (b = {}), "undefined" != typeof b[a] && (b[a] = void 0, delete b[a])
            }
        }
    }
    return this.__DATA = a || {}, this.set_data = function(a) {
        if (!this.__DATA) return void(this.__DATA = a || {});
        if (a)
            for (var b in a) this.__DATA[b] = a[b]
    }, this.get_data = function(a) {
        return a ? "undefined" != typeof this.__DATA[a] ? this.__DATA[a] : void 0 : this.__DATA
    }, this.remove_data = function(a) {
        a || (this.__DATA = {}), "undefined" != typeof this.__DATA[a] && (this.__DATA[a] = void 0, delete this.__DATA[a])
    }, this
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.controller = function(a, b) {
    return this._MAP = void 0, this.__CONTAINER = a, this.__EDITABLE = !1, this.__PLACES = {
        markers: {},
        polygons: {},
        lines: {}
    }, this.__FOCUSED_ITEM = void 0, this.__CLUSTERER = void 0, this.set_data(b), this
}, BB.gmap.controller.prototype = new BB.base, BB.gmap.controller.prototype.map = function() {
    return this._MAP ? this._MAP : (this.error("No map associated to the current controller at BB.gmap.controller.map()"), !1)
}, BB.gmap.controller.prototype.loading_place = function(a) {
    var b = this.get_place(a);
    return b ? (b.set_data({
        loaded: !1
    }), this) : this
}, BB.gmap.controller.prototype.place_loaded = function(a) {
    return a ? !a.data("loaded") && (a.set_data({
        loaded: !0
    }), this.check_loaded_places() && this._ready(), this) : this
}, BB.gmap.controller.prototype.check_loaded_places = function() {
    var a = !0;
    return this._loop_all(function(b) {
        a = !(!a || !b.data("loaded"))
    }), a = a && this.data("tiles_loaded")
}, BB.gmap.controller.prototype.ready = function(a) {
    return "function" == typeof a && this.set_data({
        map_ready: a
    }), this
}, BB.gmap.controller.prototype._ready = function() {
    var a = this.data();
    return this.data("loaded") ? this : ("function" == typeof a.map_ready && a.map_ready(this), this.set_data({
        loaded: !0
    }), this)
}, BB.gmap.controller.prototype.set_zoom = function(a) {
    return this.map().setZoom(a), this
}, BB.gmap.controller.prototype.container = function() {
    return this.__CONTAINER
}, BB.gmap.controller.prototype.init = function() {
    var a = this.data();
    if (this.map()) return this;
    var b = this.data("map");
    return b.center = new google.maps.LatLng(parseFloat(b.center.x), parseFloat(b.center.y)), this._MAP = new google.maps.Map(this.container(), b), "object" != typeof a.places ? this.error("You haven't set any places yet") : this.add_places(a.places), this.listeners(), this
}, BB.gmap.controller.prototype.set_styles = function(a) {
    "object" != typeof a && this.error("Invalid type styles in BB.gmap.set_styles()" + a);
    var b = this.data("map");
    return b.styles = a, this.data("map", b), this.map() && this.map().setOptions({
        styles: a
    }), this
}, BB.gmap.controller.prototype.add_places = function(a) {
    if (!a) return this.error("Invalid places specified :" + a), this;
    for (var b in a) this.add_place(b, a[b]);
    return this
}, BB.gmap.controller.prototype.set_place = function(a, b, c) {
    return b && c ? "undefined" == typeof this.__PLACES[a] ? (this.error("Invalid data type at BB.gmap.controlle.set_place( " + a + ", " + b + ", " + c + ")"), this) : ("undefined" == typeof this.__PLACES[a][b] && (this.__PLACES[a][b] = {}), c.set_ident(b), this.__PLACES[a][b] = c, this) : (this.error("Missing parameters in BB.gmap.controller.set_place( " + a + ", " + b + ", " + c + ")"), this)
}, BB.gmap.controller.prototype.add_place = function(a, b) {
    if (!b) return this.error("Missing parameter BB.gmap.controller.prototype.add_place ( ident, data ) : ( " + a + ", " + b + " )"), this;
    if ("string" != typeof b.type) return this.error('Missing parameter "type" in BB.gmap.controller.prototype.add_place'), this;
    b.ident = a;
    var c = b.type;
    switch (c) {
        case "marker":
            var d = new BB.gmap.marker(b, this);
            this.set_place("markers", a, d);
            break;
        case "line":
            this.set_place("lines", a, new BB.gmap.line(b, this));
            break;
        case "polygon":
            this.set_place("polygons", a, new BB.gmap.polygon(b, this))
    }
    return this
}, BB.gmap.controller.prototype.get_places = function() {
    return this.__PLACES
}, BB.gmap.controller.prototype.get_places_by_type = function(a) {
    return this.__PLACES[a]
}, BB.gmap.controller.prototype.add_place_by_address = function(a, b, c) {
    var d = this;
    this.geocode_address(b, function(b) {
        c.coords = b, d.add_place(a, c)
    })
}, BB.gmap.controller.prototype.geocode_address = function(a, b) {
    var c = Array();
    if ("undefined" == typeof google) return error;
    var d = new google.maps.Geocoder;
    d.geocode({
        address: a
    }, function(a, d) {
        if (d == google.maps.GeocoderStatus.OK) {
            var e = a[0].geometry.location.lat(),
                f = a[0].geometry.location.lng();
            "function" == typeof b && b([e, f])
        }
        return c
    })
}, BB.gmap.controller.prototype.get_place = function(a) {
    var b = this.get_places(),
        c = !1;
    for (var d in b) {
        var e = this.get_places_by_type(d);
        this.is_empty_object(e) || (c = "object" == typeof e[a] ? e[a] : c)
    }
    return c ? c : (this.error("Invalid ident at BB.gmap.controller.get_place( ident ) : " + a), !1)
}, BB.gmap.controller.prototype.remove_focus = function() {
    var a = this.focused();
    if (a) {
        if ("function" == typeof this.data("onblur")) {
            var b = this.data("onblur");
            b(a, this)
        }
        a.blur(), this.__FOCUSED_ITEM = void 0
    }
    return this
}, BB.gmap.controller.prototype.set_focus = function(a) {
    if (this.remove_focus(), this.__FOCUSED_ITEM = a, "function" == typeof this.data("onfocus")) {
        var b = this.data("onfocus");
        b(a, this)
    }
    return this
}, BB.gmap.controller.prototype.focused = function() {
    return this.__FOCUSED_ITEM
}, BB.gmap.controller.prototype.translate_coords = function(a) {
    if ("object" == typeof a) {
        var b = a.length;
        if (2 == b) return new google.maps.LatLng(a[0], a[1])
    }
}, BB.gmap.controller.prototype.listeners = function() {
    var a = this;
    return google.maps.event.clearListeners(this.map(), "click"), google.maps.event.addListener(this.map(), "click", function(b) {
        a.map_click(b)
    }), google.maps.event.addListenerOnce(this.map(), "tilesloaded", function(b) {
        a.set_data({
            tiles_loaded: !0
        }), a._ready()
    }), google.maps.event.addDomListener(document, "keyup", function(b) {
        var c = b.keyCode ? b.keyCode : b.which;
        switch (c) {
            case 46:
                a.focused() && a.focused().data("editable") && (a.focused().delete(), a.remove_focus());
                break;
            case 27:
                a.focused() && a.remove_focus()
        }
    }), this
}, BB.gmap.controller.prototype.create_new = function(a, b) {
    var c = this;
    b || (b = "new_object");
    var d = this.data("default_styles");
    switch (d || (d = {
        strokeColor: "#000000",
        strokeOpacity: .8,
        strokeWeight: 2,
        fillColor: "#FFFFFF",
        fillOpacity: .35,
        hover: {
            strokeColor: "#000000",
            strokeOpacity: .8,
            strokeWeight: 2,
            fillColor: "#FFFFFF",
            fillOpacity: 1
        },
        focused: {
            fillOpacity: 1
        }
    }), a) {
        case "polygon":
            var e = {
                    type: "polygon",
                    editable: !0,
                    styles: d
                },
                f = new BB.gmap.polygon(e, c);
            c.set_place("polygons", b, f), c.set_focus(f);
            break;
        case "line":
            var e = {
                    type: "line",
                    editable: !0,
                    styles: d
                },
                g = new BB.gmap.line(e, c);
            c.set_place("lines", b, g), c.set_focus(g);
            break;
        default:
            this.set_data({
                marker_creation: b
            })
    }
}, BB.gmap.controller.prototype.on = function(a, b) {
    var c = "on" + a,
        d = {};
    d[c] = b, this.set_data(d)
}, BB.gmap.controller.prototype.map_click = function(a) {
    if (this.data("marker_creation")) {
        if (this.add_place(this.data("marker_creation"), {
                coords: [a.latLng.lat(), a.latLng.lng()],
                draggable: !0,
                editable: !0,
                type: "marker"
            }), this.set_focus(this.get_place(this.data("marker_creation"))), "function" == typeof this.data("marker_creation_callback")) {
            var b = this.data("marker_creation_callback");
            b(this.get_place(this.data("marker_creation")))
        }
        this.set_data({
            marker_creation: !1
        })
    }
    var c = this.focused();
    return c ? (c.data("editable") ? c.map_click(a) : this.remove_focus(), this) : this
}, BB.gmap.controller.prototype._loop_all = function(a) {
    if ("function" != typeof a) return this;
    var b = this.get_places();
    for (var c in b) {
        var d = this.get_places_by_type(c);
        if (!this.is_empty_object(d))
            for (var e in d) a(d[e])
    }
    return this
}, BB.gmap.controller.prototype.filter = function(a) {
    var b = this;
    b._loop_all(function(b) {
        if (!a) return b.show(), !1;
        var c = b.data("categories");
        if (!c) return b.hide(), !1;
        "string" == typeof c && (c = c.split(",")), c || b.hide();
        var d = !1;
        for (var e in c) a == c[e] && (d = !0);
        d ? b.show() : b.hide()
    })
}, BB.gmap.controller.prototype.fit_bounds = function() {
    var a = new google.maps.LatLngBounds,
        b = 0;
    if (this._loop_all(function(c) {
            var d = c.get_position();
            if (!d) return !1;
            for (var e, f = 0; f < d.getLength(); f++) {
                e = d.getAt(f);
                for (var g = 0; g < e.getLength(); g++) a.extend(e.getAt(g))
            }
            b++
        }), b > 0 && (this.map().fitBounds(a), this.data("max_fitbounds_zoom"))) {
        var c = this.data("max_fitbounds_zoom"),
            d = this.map().getZoom();
        d > c && this.map().setZoom(c)
    }
    return this
}, BB.gmap.controller.prototype.get_all_markers = function() {
    var a = this.get_places_by_type("markers"),
        b = [];
    for (var c in a) b.push(a[c].object());
    return b
}, BB.gmap.controller.prototype.activate_clusterer = function(a) {
    this.clusterer() && this.clusterer().clearMarkers();
    var b = this.get_all_markers();
    return this.set_clusterer(new MarkerClusterer(this.map(), b)), this
}, BB.gmap.controller.prototype.set_clusterer = function(a) {
    this.__CLUSTERER = a
}, BB.gmap.controller.prototype.clusterer = function() {
    return this.__CLUSTERER
}, BB.gmap.controller.prototype._delete = function(a, b) {
    switch (a) {
        case "marker":
            if ("undefined" == typeof this.__PLACES.markers[b]) return !1;
            delete this.__PLACES.markers[b];
            break;
        case "line":
            if ("undefined" == typeof this.__PLACES.lines[b]) return !1;
            delete this.__PLACES.lines[b];
            break;
        case "polygon":
            if ("undefined" == typeof this.__PLACES.polygons[b]) return !1;
            delete this.__PLACES.polygons[b]
    }
}, BB.gmap.controller.prototype.export = function() {
    var a = this.data();
    "undefined" != typeof a.places && delete a.places, "undefined" != typeof a.center && delete a.center;
    var b = this.map().getCenter();
    return a.map.center.x = b.lat(), a.map.center.y = b.lng(), a.map.zoom = this.map().getZoom(), a.places = {}, this._loop_all(function(b) {
        a.places[b.ident()] = b.export()
    }), a
}, BB.gmap.controller.prototype.get_map_image = function() {
    var a = this.data();
    "undefined" != typeof a.places && delete a.places, "undefined" != typeof a.center && delete a.center;
    var b = this.map().getCenter(),
        c = "https://maps.googleapis.com/maps/api/staticmap?",
        d = [];
    return d.push("center=" + b.lat() + "," + b.lng()), d.push("zoom=" + this.map().getZoom()), d.push("size=640x400"), this._loop_all(function(a) {
        if ("marker" == a.data("type")) {
            if (!a.data("icon").src) return !1;
            var b = new Image;
            b.src = a.data("icon").src;
            var c = a.data("icon").width + "x" + a.data("icon").height,
                e = a.data("coords"),
                f = "markers=size:" + c + "|icon:" + b.src + "|" + e[0] + "," + e[1];
            d.push(f)
        }
        if ("polygon" == a.data("type")) {
            var g = a.data("paths");
            if (!g) return !1;
            var h = [],
                i = a.data("styles"),
                j = (i.strokeColor, i.strokeWeight);
            i.fillColor;
            h.push("color:black"), h.push("weight:" + j), h.push("fillcolor:white");
            for (var k = 0, l = g.length; k < l; k++) h.push(g[k].join(","));
            h.push(g[0].join(",")), d.push("path=" + h.join("|"))
        }
    }), c += d.join("&")
}, BB.gmap.controller.prototype.reset = function() {
    return this._loop_all(function(a) {
        a.hide(), a.delete()
    }), this.set_data({
        places: void 0
    }), this.remove_focus(), this
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.statics = BB.gmap.statics || {}, BB.gmap.infobox = function(a, b) {
    BB.gmap.statics, this.__MAP = void 0, a instanceof jQuery && (a = a.get(0)), this.__ELEM = a, google.maps.OverlayView.call(this), this.opts = b, this._height = a.offsetHeight, this._width = a.offsetWidth, b.offsetY = b.offsetY || 0, b.offsetX = b.offsetX || 0, this._offsetY = -(parseInt(this._height) - parseFloat(b.offsetY)), this._offsetX = -(parseInt(this._width / 2) - parseFloat(b.offsetX)), this.__MAP = b.map;
    var c = this;
    this._bounds_changed_listener = google.maps.event.addListener(this.__MAP, "bounds_changed", function() {
        return c.panMap.apply(c)
    }), this.set_map(b.map)
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.object = function(a, b) {
    return this.__OBJECT = void 0, this.__CONTROLLER = b, this.__DELETED = !1, this.set_data(a), this.init(), this.controller().loading_place(this.ident()), this
}, BB.gmap.object.prototype = new BB.base, BB.gmap.object.prototype.set_object = function(a) {
    return this.__OBJECT = a, this
}, BB.gmap.object.prototype.object = function() {
    return this.__OBJECT
}, BB.gmap.object.prototype.controller = function() {
    return this.__CONTROLLER
}, BB.gmap.object.prototype.set_controller = function(a) {
    return this.__CONTROLLER = a, this
}, BB.gmap.object.prototype.set_map = function(a) {
    return this.object().setMap(a), this
}, BB.gmap.object.prototype.map_click = function(a) {
    return this
}, BB.gmap.object.prototype.show = function() {
    var a = this.object();
    return "undefined" == typeof a ? (this.error("No object defined at BB.gmap.object.show()"), this) : (a.setMap(this.controller().map()), this)
}, BB.gmap.object.prototype.hide = function() {
    var a = this.object();
    return "undefined" == typeof a ? (this.error("No object defined at BB.gmap.object.hide()"), this) : (a.setMap(null), this)
}, BB.gmap.object.prototype.delete = function() {
    this.__DELETED = !0;
    var a = this.object();
    if ("undefined" == typeof a) return this.error("No object defined at BB.gmap.object.delete()"), this;
    this.clear_listeners(), a.setMap(null);
    var b = this.data();
    return "function" == typeof b.ondelete && b.ondelete(this), this.controller()._delete(this.data("type"), this.ident()), delete a, this
}, BB.gmap.object.prototype.init = function() {
    return this
}, BB.gmap.object.prototype.display = function() {
    return this
}, BB.gmap.object.prototype.focus = function() {
    return this
}, BB.gmap.object.prototype.blur = function() {
    return this
}, BB.gmap.object.prototype.get_bounds = function() {
    return this
}, BB.gmap.object.prototype.get_position = function() {
    return this
}, BB.gmap.object.prototype.clear_listeners = function() {
    return this
}, BB.gmap.object.prototype.export = function() {
    return this.data()
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.statics = BB.gmap.statics || {}, BB.gmap.marker = function(a, b) {
    return BB.gmap.object.call(this, a, b), this.__MEDIA = void 0, this.__ICON = void 0, this._image_loaded = !1, this._marker_loaded = !1, this.__INFOBOX = void 0, this._listeners = !1, this
}, BB.gmap.marker.prototype = Object.create(BB.gmap.object.prototype), BB.gmap.marker.prototype.init = function() {
    var a = this.data();
    return "string" == typeof a.icon ? this.set_image(a.icon) : "object" == typeof a.icon ? this.set_icon(a.icon) : this.display(), this
}, BB.gmap.marker.prototype.icon = function() {
    return this.__ICON ? this.__ICON : new Image
}, BB.gmap.marker.prototype.set_icon = function(a) {
    if ("object" != typeof a) return this.error("Invalid icon at BB.gmap.marker.prototype.set_icon( " + a + " )"), this;
    if (!(a instanceof Image) && "undefined" == typeof a.path) {
        var b;
        return a.width && a.height && (b = {
            width: a.width,
            height: a.height
        }), this.set_image(a.src, b), this
    }
    return this.__ICON = a, this.display(), this
}, BB.gmap.marker.prototype.set_image = function(a, b) {
    var c = new Image;
    return c.data = this, c.onload = function() {
        this.data.set_icon(this), this.data.display()
    }, c.onerror = function() {
        this.data.set_data({
            icon: void 0
        }), this.data.display()
    }, c.src = a, b && (c.height = b.height, c.width = b.width), this
}, BB.gmap.marker.prototype.display = function() {
    var a = this.data();
    if ("object" != typeof a.coords) return this.error("Requires coordinates [lat, lng] at BB.gmap.marker.display()"), !1;
    var b = {
        map: this.controller().map(),
        position: new google.maps.LatLng(a.coords[0], a.coords[1]),
        optimized: !1
    };
    b = this.extend(b, a);
    var c = this.icon();
    if (!(c instanceof Image) && "string" == typeof c.path) {
        var d = 0,
            e = 0;
        "string" == typeof c.height && (d = parseInt(c.height)), "string" == typeof c.width && (e = parseInt(c.width)), c.anchor = new google.maps.Point(e / 2, d), b.icon = c
    }
    var f = "object" == typeof a.options ? a.options : {};
    for (var g in f) b[g] = f[g];
    if (this.icon().src) {
        var e = this.icon().width,
            d = this.icon().height;
        b.icon = new google.maps.MarkerImage(this.icon().src, new google.maps.Size(e, d), new google.maps.Point(0, 0), new google.maps.Point(e / 2, d), new google.maps.Size(e, d))
    }
    if ("undefined" != typeof this.object()) this.object().setOptions(b);
    else {
        var h = new google.maps.Marker(b);
        this.set_marker(h)
    }
    return this._listeners || (this.listeners(), this._listeners = !0, this.marker_loaded()), this.data("hidden") && this.hide(), this
}, BB.gmap.marker.prototype.marker_loaded = function() {
    var a = this.data();
    if ("function" == typeof a.loaded_callback && a.loaded_callback(this), this.controller().data("use_clusterer")) {
        this.controller().data("clusterer_options");
        this.controller().activate_clusterer({
            gridSize: 10,
            maxZoom: 15
        })
    }
    return this.controller().place_loaded(this), this
}, BB.gmap.marker.prototype.set_marker = function(a) {
    return this._marker_loaded ? (this.error("There is already a marker affected to this instanciation of a [BB.gmap.marker] ( " + this.ident() + " )"), this) : (this._marker_loaded = !0, this.set_object(a), this)
}, BB.gmap.marker.prototype.listeners = function() {
    var a = this,
        b = this.object();
    b.bbmarker = this, this.data("draggable") && google.maps.event.addListener(b, "dragend", a.dragend), google.maps.event.addListener(b, "click", a.onclick)
}, BB.gmap.marker.prototype.clear_listeners = function() {
    var a = this.object();
    return google.maps.event.clearListeners(a, "dragend"), google.maps.event.clearListeners(a, "click"), this
}, BB.gmap.marker.prototype.dragend = function(a) {
    var b = this.bbmarker,
        c = b.data();
    "function" == typeof c.ondragend && c.ondragend(b, a), b.set_data({
        coords: [a.latLng.lat(), a.latLng.lng()]
    }), b.focus()
}, BB.gmap.marker.prototype.onclick = function(a) {
    var b = this.bbmarker,
        c = b.data();
    if ("function" == typeof c.onclick ? c.onclick(a, b) : "string" == typeof c.onclick && "function" == typeof window[c.onclick] && window[c.onclick](b, a), c.infobox) {
        if (b.__INFOBOX) return b.__INFOBOX.map ? b.__INFOBOX.set_map(null) : b.__INFOBOX.set_map(b.controller().map()), b.focus(), this;
        BB.gmap.statics.infobox_loaded || (init_infoBox(), BB.gmap.statics.infobox_loaded = !0), "string" == typeof c.infobox && (c.infobox = document.getElementById(c.infobox));
        var d = {};
        c.infobox_options && (d = c.infobox_options), d.offsetY || (d.offsetY = -b.icon().height), d.offsetX || (d.offsetX = -(b.icon().width / 2)), d.map = b.controller().map(), d.position = b.get_position().getAt(0).getAt(0), b.__INFOBOX = new BB.gmap.infobox(c.infobox, d)
    }
    b.focus()
}, BB.gmap.marker.prototype.focus = function() {
    var a = this;
    a.controller().set_focus(a);
    var b = this.data();
    b.icon_selected && ("object" == typeof b.icon_selected ? this.set_icon(b.icon_selected) : this.set_image(b.icon_selected))
}, BB.gmap.marker.prototype.blur = function() {
    if (!this.controller().get_place(this.ident())) return !1;
    var a = this.data();
    a.icon_selected && ("object" == typeof a.icon ? this.set_icon(a.icon) : this.set_image(a.icon))
}, BB.gmap.marker.prototype.get_bounds = function() {
    var a = this,
        b = new google.maps.LatLngBounds;
    return b.extend(a.object().getPosition()), b
}, BB.gmap.marker.prototype.get_position = function() {
    var a = new google.maps.MVCArray,
        b = new google.maps.MVCArray;
    return !!this.object() && (a.push(this.object().getPosition()), b.push(a), b)
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.line = function(a, b) {
    return this.__STYLES = void 0, this.__PATHS = void 0, this.__MARKERS = [], BB.gmap.object.call(this, a, b), this
}, BB.gmap.line.prototype = Object.create(BB.gmap.object.prototype), BB.gmap.line.prototype.init = function() {
    var a = this.data();
    if ("object" != typeof a.styles && this.set_data({
            styles: this.controller().data("default_styles")
        }), this.add_styles(a.styles), this.set_paths([]), "object" == typeof a.paths)
        for (var b = 0, c = a.paths.length; b < c; b++) this.add_point(a.paths[b]);
    return this.get_paths() && this.get_styles() && this.display(), a.editable && this.set_editable(a.editable), this.listeners(), this.controller().place_loaded(this), this
}, BB.gmap.line.prototype.redraw = function() {
    for (var a = this.get_paths(), b = 0, c = a.length, d = []; b < c; b++) d.push([a.getAt(b).lat(), a.getAt(b).lng()]);
    this.set_data({
        paths: d
    })
}, BB.gmap.line.prototype.add_styles = function(a) {
    this.__STYLES = a
}, BB.gmap.line.prototype.set_styles = function(a) {
    return this.add_styles(a), this.display(), this
}, BB.gmap.line.prototype.get_styles = function() {
    return this.__STYLES
}, BB.gmap.line.prototype.set_paths = function(a) {
    if ("object" != typeof a) return void this.error("Invalid paths at BB.gmap.line.set_paths :" + a);
    if (!(a[0] instanceof google.maps.LatLng)) {
        for (var b = 0, c = a.length, d = new google.maps.MVCArray; b < c && "object" == typeof a[b]; b++) {
            var e = this.controller().translate_coords(a[b]);
            d.insertAt(d.length, e)
        }
        a = d
    }
    this.__PATHS = a
}, BB.gmap.line.prototype.get_paths = function() {
    return this.__PATHS
}, BB.gmap.line.prototype.display = function() {
    var a = (this.data(), this.get_styles());
    "undefined" == typeof a && this.error("Undefined styles at BB.gmap.line.display : " + a);
    var b = this.get_paths();
    if ("undefined" == typeof b && this.error("Undefined paths at BB.gmap.line.display : " + b), a.path = b, "undefined" != typeof this.object()) this.object().setOptions(a);
    else {
        var c = new google.maps.Polyline(a);
        this.set_object(c)
    }
    return this.set_map(this.controller().map()), this.update_coords(), this
}, BB.gmap.line.prototype.refresh = function() {
    var a = this.data("_opts"),
        b = this.object();
    b.setOptions(a)
}, BB.gmap.line.prototype.add_point = function(a, b) {
    if ("object" != typeof a) return !1;
    if (a instanceof google.maps.LatLng || (a = this.controller().translate_coords(a)), !(a instanceof google.maps.LatLng || "undefined" != typeof a[0] && "undefined" != typeof a[1])) return !1;
    var c = this,
        d = this.get_paths();
    "undefined" == typeof d && this.set_paths([
        [a.lat(), a.lng()]
    ]), d = this.get_paths(), "number" != typeof b && (b = d.length), d.insertAt(b, a);
    var e = new BB.gmap.marker({
        coords: [a.lat(), a.lng()],
        draggable: !0,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4
        },
        hidden: !this.data("editable"),
        editable: !0,
        ondragend: function(a, b) {
            c.move_point(a.object().index, [b.latLng.lat(), b.latLng.lng()])
        },
        ondelete: function(a) {
            c.remove_point(a.object().index), c.focus(), c.get_paths().length || c.delete()
        },
        index: b
    }, c.controller());
    return this.__MARKERS || (this.__MARKERS = []), this.__MARKERS[b] = e, this
}, BB.gmap.line.prototype.move_point = function(a, b) {
    var c = this.get_paths();
    if ("object" != typeof c) return this.error("You can not move a point when no path is given at BB.gmap.line.move_point( index, path )"), !1;
    if (!b) return this.error("Required arguments index:integer and path:object at BB.gmap.line.move_point( index, path )"), !1;
    if (b instanceof google.maps.LatLng || (b = this.controller().translate_coords(b)), !(b instanceof google.maps.LatLng || "undefined" != typeof b[0] && "undefined" != typeof b[1])) return !1;
    return c.setAt(a, b), this.update_coords(), this
}, BB.gmap.line.prototype.remove_point = function(a) {
    var b = this.get_paths();
    if ("object" != typeof b) return this.error("You can not move a point when no path is given at BB.gmap.line.remove_point( index, path )"), !1;
    b.removeAt(a), "undefined" != typeof this.__MARKERS[a] && (this.__MARKERS[a].hide(), this.__MARKERS.splice(a, 1));
    var c = this.__MARKERS;
    for (var d in c) c[d].object().index = parseInt(d);
    return this.redraw(), this.update_coords(), this
}, BB.gmap.line.prototype.set_editable = function(a) {
    return a ? (this.set_data({
        editable: !0
    }), this.show_markers(), this.focus(), this) : (this.set_data({
        editable: !1
    }), this.hide_markers(), this)
}, BB.gmap.line.prototype.show_markers = function() {
    for (var a = 0; a < this.__MARKERS.length; a++) this.__MARKERS[a].show();
    return this
}, BB.gmap.line.prototype.hide_markers = function() {
    for (var a = (this.controller().focused(), 0); a < this.__MARKERS.length; a++) this.__MARKERS[a].hide();
    return this
}, BB.gmap.line.prototype.map_click = function(a) {
    this.add_point(a.latLng)
}, BB.gmap.line.prototype.set_draggable = function(a) {
    var b = this.get_styles();
    return a ? b.draggable = !0 : b.draggable = !1, this.set_styles(b), this
}, BB.gmap.line.prototype.listeners = function() {
    var a = this;
    a.object().bbobject = a, this.clear_listeners(), google.maps.event.addListener(a.object(), "mouseover", a.mouse_over), google.maps.event.addListener(a.object(), "mouseout", a.mouse_out), google.maps.event.addListener(a.object(), "click", a.click)
}, BB.gmap.line.prototype.clear_listeners = function() {
    var a = this;
    return google.maps.event.clearListeners(a.object(), "mouseover"), google.maps.event.clearListeners(a.object(), "mouseout"), google.maps.event.clearListeners(a.object(), "click"), this
}, BB.gmap.line.prototype.mouse_over = function(a) {
    var b = this.bbobject,
        c = b.data();
    "function" == typeof c.onmouseover && c.onmouseover(b, a);
    var d = b.get_styles();
    "object" == typeof d.hover && b.set_styles(d.hover)
}, BB.gmap.line.prototype.mouse_out = function(a) {
    var b = this.bbobject,
        c = b.data();
    "function" == typeof c.onmouseout && c.onmouseout(b, a);
    var d = b.controller().focused();
    if (d == b) return !1;
    b.get_data("styles");
    b.set_styles(b.get_data("styles"))
}, BB.gmap.line.prototype.mouse_down = function(a) {
    this.bbobject
}, BB.gmap.line.prototype.mouse_up = function(a) {
    this.bbobject
}, BB.gmap.line.prototype.click = function(a) {
    var b = this.bbobject,
        c = b.data();
    "function" == typeof c.onclick ? c.onclick(b, a) : "string" == typeof c.onclick && "function" == typeof window[c.onclick] && window[c.onclick](b, a), b.focus()
}, BB.gmap.line.prototype.focus = function() {
    if (this.__DELETED) return !1;
    var a = this.get_data("styles");
    return "object" == typeof a.focused && this.set_styles(a.focused), this.controller().set_focus(this), this.data("editable") && this.show_markers(), this
}, BB.gmap.line.prototype.blur = function() {
    return !this.__DELETED && (this.set_styles(this.get_data("styles")), this)
}, BB.gmap.line.prototype.get_bounds = function() {
    for (var a, b = this, c = new google.maps.LatLngBounds, d = b.object().getPaths(), e = 0; e < d.getLength(); e++) {
        a = d.getAt(e);
        for (var f = 0; f < a.getLength(); f++) c.extend(a.getAt(f))
    }
    return c
}, BB.gmap.line.prototype.get_position = function() {
    var a = new google.maps.MVCArray;
    return a.push(this.object().getPath()), a
}, BB.gmap.line.prototype.update_coords = function() {
    var a = this.get_paths(),
        b = [];
    return a.forEach(function(a) {
        b.push([a.lat(), a.lng()])
    }), this.set_data({
        paths: b
    }), this
}, BB.gmap.line.prototype.export = function() {
    this.update_coords();
    var a = this.data();
    return "undefined" != typeof a.styles.path && delete a.styles.path, this.data()
}, BB.gmap.line.prototype.delete = function() {
    var a = 0,
        b = this.__MARKERS.length;
    if (b)
        for (; a < b; a++) this.remove_point(a);
    this.hide_markers(), BB.gmap.object.prototype.delete.call(this)
};
var BB = BB || {};
BB.gmap = BB.gmap || {}, BB.gmap.polygon = function(a, b) {
        return BB.gmap.line.call(this, a, b), this
    }, BB.gmap.polygon.prototype = Object.create(BB.gmap.line.prototype), BB.gmap.polygon.prototype.display = function() {
        var a = (this.data(), this.get_styles());
        "undefined" == typeof a && this.error("Undefined styles at BB.gmap.polygon.display : " + a);
        var b = this.get_paths();
        if ("undefined" == typeof b && this.error("Undefined paths at BB.gmap.polygon.display : " + b), "undefined" != typeof this.object()) this.object().setOptions(a);
        else {
            var c = new google.maps.Polygon(a);
            this.set_object(c)
        }
        return this.object().setPaths(new google.maps.MVCArray([b])), this.set_map(this.controller().map()), this.listeners(), this
    }, BB.gmap.polygon.prototype.get_position = function() {
        return this.object().getPaths()
    },
    function() {
        function a(a) {
            return function(b) {
                this[a] = b
            }
        }

        function b(a) {
            return function() {
                return this[a]
            }
        }

        function c(a, b, e) {
            this.extend(c, google.maps.OverlayView), this.c = a, this.a = [], this.f = [], this.ca = [53, 56, 66, 78, 90], this.j = [], this.A = !1, e = e || {}, this.g = e.gridSize || 60, this.l = e.minimumClusterSize || 2, this.J = e.maxZoom || o, this.j = e.styles || [], this.X = e.imagePath || this.Q, this.W = e.imageExtension || this.P, this.O = !0, void 0 != e.zoomOnClick && (this.O = e.zoomOnClick), this.r = !1, void 0 != e.averageCenter && (this.r = e.averageCenter), d(this), this.setMap(a), this.K = this.c.getZoom();
            var f = this;
            google.maps.event.addListener(this.c, "zoom_changed", function() {
                var a = f.c.getZoom();
                f.K != a && (f.K = a, f.m())
            }), google.maps.event.addListener(this.c, "idle", function() {
                f.i()
            }), b && b.length && this.C(b, !1)
        }

        function d(a) {
            if (!a.j.length)
                for (var b, c = 0; b = a.ca[c]; c++) a.j.push({
                    url: a.X + (c + 1) + "." + a.W,
                    height: b,
                    width: b
                })
        }

        function e(a, b) {
            b.s = !1, b.draggable && google.maps.event.addListener(b, "dragend", function() {
                b.s = !1, a.L()
            }), a.a.push(b)
        }

        function f(a, b) {
            var c = -1;
            if (a.a.indexOf) c = a.a.indexOf(b);
            else
                for (var d, e = 0; d = a.a[e]; e++)
                    if (d == b) {
                        c = e;
                        break
                    } return c != -1 && (b.setMap(o), a.a.splice(c, 1), !0)
        }

        function g(a) {
            if (a.A)
                for (var b, c = a.v(new google.maps.LatLngBounds(a.c.getBounds().getSouthWest(), a.c.getBounds().getNorthEast())), d = 0; b = a.a[d]; d++)
                    if (!b.s && c.contains(b.getPosition())) {
                        for (var e = a, f = 4e4, g = o, i = 0, j = void 0; j = e.f[i]; i++) {
                            var k = j.getCenter();
                            if (k) {
                                var l = b.getPosition();
                                if (k && l) var m = (l.lat() - k.lat()) * Math.PI / 180,
                                    n = (l.lng() - k.lng()) * Math.PI / 180,
                                    k = Math.sin(m / 2) * Math.sin(m / 2) + Math.cos(k.lat() * Math.PI / 180) * Math.cos(l.lat() * Math.PI / 180) * Math.sin(n / 2) * Math.sin(n / 2),
                                    k = 12742 * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k));
                                else k = 0;
                                k < f && (f = k, g = j)
                            }
                        }
                        g && g.F.contains(b.getPosition()) ? g.q(b) : (j = new h(e),
                            j.q(b), e.f.push(j))
                    }
        }

        function h(a) {
            this.k = a, this.c = a.getMap(), this.g = a.w(), this.l = a.l, this.r = a.r, this.d = o, this.a = [], this.F = o, this.n = new j(this, a.z(), a.w())
        }

        function i(a) {
            a.F = a.k.v(new google.maps.LatLngBounds(a.d, a.d))
        }

        function j(a, b, c) {
            a.k.extend(j, google.maps.OverlayView), this.j = b, this.fa = c || 0, this.u = a, this.d = o, this.c = a.getMap(), this.B = this.b = o, this.t = !1, this.setMap(this.c)
        }

        function k(a, b) {
            var c = a.getProjection().fromLatLngToDivPixel(b);
            return c.x -= parseInt(a.p / 2, 10), c.y -= parseInt(a.h / 2, 10), c
        }

        function l(a) {
            a.b && (a.b.style.display = "none"), a.t = !1
        }

        function m(a, b) {
            var c = [];
            return c.push("background-image:url(" + a.da + ");"), c.push("background-position:" + (a.D ? a.D : "0 0") + ";"), "object" == typeof a.e ? ("number" == typeof a.e[0] && a.e[0] > 0 && a.e[0] < a.h ? c.push("height:" + (a.h - a.e[0]) + "px; padding-top:" + a.e[0] + "px;") : c.push("height:" + a.h + "px; line-height:" + a.h + "px;"), "number" == typeof a.e[1] && a.e[1] > 0 && a.e[1] < a.p ? c.push("width:" + (a.p - a.e[1]) + "px; padding-left:" + a.e[1] + "px;") : c.push("width:" + a.p + "px; text-align:center;")) : c.push("height:" + a.h + "px; line-height:" + a.h + "px; width:" + a.p + "px; text-align:center;"), c.push("cursor:pointer; top:" + b.y + "px; left:" + b.x + "px; color:" + (a.M ? a.M : "black") + "; position:absolute; font-size:" + (a.N ? a.N : 11) + "px; font-family:Arial,sans-serif; font-weight:bold"), c.join("")
        }
        var n, o = null;
        n = c.prototype, n.Q = "https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m", n.P = "png", n.extend = function(a, b) {
            return function(a) {
                for (var b in a.prototype) this.prototype[b] = a.prototype[b];
                return this
            }.apply(a, [b])
        }, n.onAdd = function() {
            this.A || (this.A = !0, g(this))
        }, n.draw = function() {}, n.S = function() {
            for (var a, b = this.o(), c = new google.maps.LatLngBounds, d = 0; a = b[d]; d++) c.extend(a.getPosition());
            this.c.fitBounds(c)
        }, n.z = b("j"), n.o = b("a"), n.V = function() {
            return this.a.length
        }, n.ba = a("J"), n.I = b("J"), n.G = function(a, b) {
            for (var c = 0, d = a.length, e = d; 0 !== e;) e = parseInt(e / 10, 10), c++;
            return c = Math.min(c, b), {
                text: d,
                index: c
            }
        }, n.$ = a("G"), n.H = b("G"), n.C = function(a, b) {
            for (var c, d = 0; c = a[d]; d++) e(this, c);
            b || this.i()
        }, n.q = function(a, b) {
            e(this, a), b || this.i()
        }, n.Y = function(a, b) {
            var c = f(this, a);
            return !(b || !c) && (this.m(), this.i(), !0)
        }, n.Z = function(a, b) {
            for (var c, d = !1, e = 0; c = a[e]; e++) c = f(this, c), d = d || c;
            if (!b && d) return this.m(), this.i(), !0
        }, n.U = function() {
            return this.f.length
        }, n.getMap = b("c"), n.setMap = a("c"), n.w = b("g"), n.aa = a("g"), n.v = function(a) {
            var b = this.getProjection(),
                c = new google.maps.LatLng(a.getNorthEast().lat(), a.getNorthEast().lng()),
                d = new google.maps.LatLng(a.getSouthWest().lat(), a.getSouthWest().lng()),
                c = b.fromLatLngToDivPixel(c);
            return c.x += this.g, c.y -= this.g, d = b.fromLatLngToDivPixel(d), d.x -= this.g, d.y += this.g, c = b.fromDivPixelToLatLng(c), b = b.fromDivPixelToLatLng(d), a.extend(c), a.extend(b), a
        }, n.R = function() {
            this.m(!0), this.a = []
        }, n.m = function(a) {
            for (var b, c = 0; b = this.f[c]; c++) b.remove();
            for (c = 0; b = this.a[c]; c++) b.s = !1, a && b.setMap(o);
            this.f = []
        }, n.L = function() {
            var a = this.f.slice();
            this.f.length = 0, this.m(), this.i(), window.setTimeout(function() {
                for (var b, c = 0; b = a[c]; c++) b.remove()
            }, 0)
        }, n.i = function() {
            g(this)
        }, n = h.prototype, n.q = function(a) {
            var b;
            a: if (this.a.indexOf) b = this.a.indexOf(a) != -1;
                else {
                    b = 0;
                    for (var c; c = this.a[b]; b++)
                        if (c == a) {
                            b = !0;
                            break a
                        }
                    b = !1
                }
            if (b) return !1;
            if (this.d ? this.r && (c = this.a.length + 1, b = (this.d.lat() * (c - 1) + a.getPosition().lat()) / c, c = (this.d.lng() * (c - 1) + a.getPosition().lng()) / c, this.d = new google.maps.LatLng(b, c), i(this)) : (this.d = a.getPosition(), i(this)), a.s = !0, this.a.push(a), b = this.a.length, b < this.l && a.getMap() != this.c && a.setMap(this.c), b == this.l)
                for (c = 0; c < b; c++) this.a[c].setMap(o);
            if (b >= this.l && a.setMap(o), a = this.c.getZoom(), (b = this.k.I()) && a > b)
                for (a = 0; b = this.a[a]; a++) b.setMap(this.c);
            else this.a.length < this.l ? l(this.n) : (b = this.k.H()(this.a, this.k.z().length), this.n.setCenter(this.d), a = this.n, a.B = b, a.ga = b.text, a.ea = b.index, a.b && (a.b.innerHTML = b.text), b = Math.max(0, a.B.index - 1), b = Math.min(a.j.length - 1, b), b = a.j[b], a.da = b.url, a.h = b.height, a.p = b.width, a.M = b.textColor, a.e = b.anchor, a.N = b.textSize, a.D = b.backgroundPosition, this.n.show());
            return !0
        }, n.getBounds = function() {
            for (var a, b = new google.maps.LatLngBounds(this.d, this.d), c = this.o(), d = 0; a = c[d]; d++) b.extend(a.getPosition());
            return b
        }, n.remove = function() {
            this.n.remove(), this.a.length = 0, delete this.a
        }, n.T = function() {
            return this.a.length
        }, n.o = b("a"), n.getCenter = b("d"), n.getMap = b("c"), n = j.prototype, n.onAdd = function() {
            this.b = document.createElement("DIV"), this.t && (this.b.style.cssText = m(this, k(this, this.d)), this.b.innerHTML = this.B.text), this.getPanes().overlayMouseTarget.appendChild(this.b);
            var a = this;
            google.maps.event.addDomListener(this.b, "click", function() {
                var b = a.u.k;
                google.maps.event.trigger(b, "clusterclick", a.u), b.O && a.c.fitBounds(a.u.getBounds())
            })
        }, n.draw = function() {
            if (this.t) {
                var a = k(this, this.d);
                this.b.style.top = a.y + "px", this.b.style.left = a.x + "px"
            }
        }, n.show = function() {
            this.b && (this.b.style.cssText = m(this, k(this, this.d)), this.b.style.display = ""), this.t = !0
        }, n.remove = function() {
            this.setMap(o)
        }, n.onRemove = function() {
            this.b && this.b.parentNode && (l(this), this.b.parentNode.removeChild(this.b), this.b = o)
        }, n.setCenter = a("d"), window.MarkerClusterer = c, c.prototype.addMarker = c.prototype.q, c.prototype.addMarkers = c.prototype.C, c.prototype.clearMarkers = c.prototype.R, c.prototype.fitMapToMarkers = c.prototype.S, c.prototype.getCalculator = c.prototype.H, c.prototype.getGridSize = c.prototype.w, c.prototype.getExtendedBounds = c.prototype.v, c.prototype.getMap = c.prototype.getMap, c.prototype.getMarkers = c.prototype.o, c.prototype.getMaxZoom = c.prototype.I, c.prototype.getStyles = c.prototype.z, c.prototype.getTotalClusters = c.prototype.U, c.prototype.getTotalMarkers = c.prototype.V, c.prototype.redraw = c.prototype.i, c.prototype.removeMarker = c.prototype.Y, c.prototype.removeMarkers = c.prototype.Z, c.prototype.resetViewport = c.prototype.m, c.prototype.repaint = c.prototype.L, c.prototype.setCalculator = c.prototype.$, c.prototype.setGridSize = c.prototype.aa, c.prototype.setMaxZoom = c.prototype.ba, c.prototype.onAdd = c.prototype.onAdd, c.prototype.draw = c.prototype.draw, h.prototype.getCenter = h.prototype.getCenter, h.prototype.getSize = h.prototype.T, h.prototype.getMarkers = h.prototype.o, j.prototype.onAdd = j.prototype.onAdd, j.prototype.draw = j.prototype.draw, j.prototype.onRemove = j.prototype.onRemove
    }();