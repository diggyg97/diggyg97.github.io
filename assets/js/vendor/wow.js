!function () {
	function e(t, e) {
		return function () {
			return t.apply(e, arguments);
		};
	}
	var i,
		t,
		n,
		a,
		o,
		r =
			[].indexOf ||
			function (t) {
				for (var e = 0, n = this.length; e < n; e++)
					if (e in this && this[e] === t) return e;
				return -1;
			};
	function s(t) {
		null == t && (t = {}),
			(this.scrollCallback = e(this.scrollCallback, this)),
			(this.scrollHandler = e(this.scrollHandler, this)),
			(this.resetAnimation = e(this.resetAnimation, this)),
			(this.start = e(this.start, this)),
			(this.scrolled = !0),
			(this.config = this.util().extend(t, this.defaults)),
			null != t.scrollContainer &&
				(this.config.scrollContainer = document.querySelector(
					t.scrollContainer
				)),
			(this.animationNameCache = new n()),
			(this.wowEvent = this.util().createEvent(this.config.boxClass));
	}
	function l() {
		"undefined" != typeof console &&
			null !== console &&
			console.warn("MutationObserver is not supported by your browser."),
			"undefined" != typeof console &&
				null !== console &&
				console.warn(
					"WOW.js cannot detect dom mutations, please call .sync() after loading new content."
				);
	}
	function u() {
		(this.keys = []), (this.values = []);
	}
	function h() {}
	(h.prototype.extend = function (t, e) {
		var n, i;
		for (n in e) (i = e[n]), null == t[n] && (t[n] = i);
		return t;
	}),
		(h.prototype.isMobile = function (t) {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				t
			);
		}),
		(h.prototype.createEvent = function (t, e, n, i) {
			var o;
			return (
				null == e && (e = !1),
				null == n && (n = !1),
				null == i && (i = null),
				null != document.createEvent
					? (o = document.createEvent("CustomEvent")).initCustomEvent(
							t,
							e,
							n,
							i
					  )
					: null != document.createEventObject
					? ((o = document.createEventObject()).eventType = t)
					: (o.eventName = t),
				o
			);
		}),
		(h.prototype.emitEvent = function (t, e) {
			return null != t.dispatchEvent
				? t.dispatchEvent(e)
				: e in (null != t)
				? t[e]()
				: "on" + e in (null != t)
				? t["on" + e]()
				: void 0;
		}),
		(h.prototype.addEvent = function (t, e, n) {
			return null != t.addEventListener
				? t.addEventListener(e, n, !1)
				: null != t.attachEvent
				? t.attachEvent("on" + e, n)
				: (t[e] = n);
		}),
		(h.prototype.removeEvent = function (t, e, n) {
			return null != t.removeEventListener
				? t.removeEventListener(e, n, !1)
				: null != t.detachEvent
				? t.detachEvent("on" + e, n)
				: delete t[e];
		}),
		(h.prototype.innerHeight = function () {
			return "innerHeight" in window
				? window.innerHeight
				: document.documentElement.clientHeight;
		}),
		(t = h),
		(n =
			this.WeakMap ||
			this.MozWeakMap ||
			((u.prototype.get = function (t) {
				for (
					var e, n = this.keys, i = (e = 0), o = n.length;
					e < o;
					i = ++e
				)
					if (n[i] === t) return this.values[i];
			}),
			(u.prototype.set = function (t, e) {
				for (
					var n, i = this.keys, o = (n = 0), s = i.length;
					n < s;
					o = ++n
				)
					if (i[o] === t) return void (this.values[o] = e);
				return this.keys.push(t), this.values.push(e);
			}),
			u)),
		(i =
			this.MutationObserver ||
			this.WebkitMutationObserver ||
			this.MozMutationObserver ||
			((l.notSupported = !0), (l.prototype.observe = function () {}), l)),
		(a =
			this.getComputedStyle ||
			function (n, t) {
				return (
					(this.getPropertyValue = function (t) {
						var e;
						return (
							o.test((t = "float" === t ? "styleFloat" : t)) &&
								t.replace(o, function (t, e) {
									return e.toUpperCase();
								}),
							(null != (e = n.currentStyle) ? e[t] : void 0) ||
								null
						);
					}),
					this
				);
			}),
		(o = /(\-([a-z]){1})/g),
		(this.WOW =
			((s.prototype.defaults = {
				boxClass: "wow",
				animateClass: "animated",
				offset: 0,
				mobile: !0,
				live: !0,
				callback: null,
				scrollContainer: null,
			}),
			(s.prototype.init = function () {
				var t;
				return (
					(this.element = window.document.documentElement),
					"interactive" === (t = document.readyState) ||
					"complete" === t
						? this.start()
						: this.util().addEvent(
								document,
								"DOMContentLoaded",
								this.start
						  ),
					(this.finished = [])
				);
			}),
			(s.prototype.start = function () {
				var o, t, e, n, r;
				if (
					((this.stopped = !1),
					(this.boxes = function () {
						for (
							var t = this.element.querySelectorAll(
									"." + this.config.boxClass
								),
								e = [],
								n = 0,
								i = t.length;
							n < i;
							n++
						)
							(o = t[n]), e.push(o);
						return e;
					}.call(this)),
					(this.all = function () {
						for (
							var t = this.boxes, e = [], n = 0, i = t.length;
							n < i;
							n++
						)
							(o = t[n]), e.push(o);
						return e;
					}.call(this)),
					this.boxes.length)
				)
					if (this.disabled()) this.resetStyle();
					else
						for (t = 0, e = (n = this.boxes).length; t < e; t++)
							(o = n[t]), this.applyStyle(o, !0);
				return (
					this.disabled() ||
						(this.util().addEvent(
							this.config.scrollContainer || window,
							"scroll",
							this.scrollHandler
						),
						this.util().addEvent(
							window,
							"resize",
							this.scrollHandler
						),
						(this.interval = setInterval(this.scrollCallback, 50))),
					this.config.live
						? new i(
								((r = this),
								function (t) {
									for (
										var o, s, e = [], n = 0, i = t.length;
										n < i;
										n++
									)
										(s = t[n]),
											e.push(
												function () {
													for (
														var t =
																s.addedNodes ||
																[],
															e = [],
															n = 0,
															i = t.length;
														n < i;
														n++
													)
														(o = t[n]),
															e.push(
																this.doSync(o)
															);
													return e;
												}.call(r)
											);
									return e;
								})
						  ).observe(document.body, {
								childList: !0,
								subtree: !0,
						  })
						: void 0
				);
			}),
			(s.prototype.stop = function () {
				return (
					(this.stopped = !0),
					this.util().removeEvent(
						this.config.scrollContainer || window,
						"scroll",
						this.scrollHandler
					),
					this.util().removeEvent(
						window,
						"resize",
						this.scrollHandler
					),
					null != this.interval
						? clearInterval(this.interval)
						: void 0
				);
			}),
			(s.prototype.sync = function (t) {
				return i.notSupported ? this.doSync(this.element) : void 0;
			}),
			(s.prototype.doSync = function (t) {
				var e, n, i, o, s;
				if (1 === (t = null == t ? this.element : t).nodeType) {
					for (
						s = [],
							n = 0,
							i = (o = (t = t.parentNode || t).querySelectorAll(
								"." + this.config.boxClass
							)).length;
						n < i;
						n++
					)
						(e = o[n]),
							r.call(this.all, e) < 0
								? (this.boxes.push(e),
								  this.all.push(e),
								  this.stopped || this.disabled()
										? this.resetStyle()
										: this.applyStyle(e, !0),
								  s.push((this.scrolled = !0)))
								: s.push(void 0);
					return s;
				}
			}),
			(s.prototype.show = function (t) {
				return (
					this.applyStyle(t),
					(t.className =
						t.className + " " + this.config.animateClass),
					null != this.config.callback && this.config.callback(t),
					this.util().emitEvent(t, this.wowEvent),
					this.util().addEvent(
						t,
						"animationend",
						this.resetAnimation
					),
					this.util().addEvent(
						t,
						"oanimationend",
						this.resetAnimation
					),
					this.util().addEvent(
						t,
						"webkitAnimationEnd",
						this.resetAnimation
					),
					this.util().addEvent(
						t,
						"MSAnimationEnd",
						this.resetAnimation
					),
					t
				);
			}),
			(s.prototype.applyStyle = function (t, e) {
				var n,
					i = t.getAttribute("data-wow-duration"),
					o = t.getAttribute("data-wow-delay"),
					s = t.getAttribute("data-wow-iteration");
				return this.animate(
					((n = this),
					function () {
						return n.customStyle(t, e, i, o, s);
					})
				);
			}),
			(s.prototype.animate =
				"requestAnimationFrame" in window
					? function (t) {
							return window.requestAnimationFrame(t);
					  }
					: function (t) {
							return t();
					  }),
			(s.prototype.resetStyle = function () {
				for (
					var t, e = this.boxes, n = [], i = 0, o = e.length;
					i < o;
					i++
				)
					(t = e[i]), n.push((t.style.visibility = "visible"));
				return n;
			}),
			(s.prototype.resetAnimation = function (t) {
				return 0 <= t.type.toLowerCase().indexOf("animationend")
					? ((t = t.target || t.srcElement).className = t.className
							.replace(this.config.animateClass, "")
							.trim())
					: void 0;
			}),
			(s.prototype.customStyle = function (t, e, n, i, o) {
				return (
					e && this.cacheAnimationName(t),
					(t.style.visibility = e ? "hidden" : "visible"),
					n && this.vendorSet(t.style, { animationDuration: n }),
					i && this.vendorSet(t.style, { animationDelay: i }),
					o &&
						this.vendorSet(t.style, { animationIterationCount: o }),
					this.vendorSet(t.style, {
						animationName: e ? "none" : this.cachedAnimationName(t),
					}),
					t
				);
			}),
			(s.prototype.vendors = ["moz", "webkit"]),
			(s.prototype.vendorSet = function (o, t) {
				var s,
					r,
					l,
					e = [];
				for (s in t)
					(r = t[s]),
						(o["" + s] = r),
						e.push(
							function () {
								for (
									var t = this.vendors,
										e = [],
										n = 0,
										i = t.length;
									n < i;
									n++
								)
									(l = t[n]),
										e.push(
											(o[
												"" +
													l +
													s.charAt(0).toUpperCase() +
													s.substr(1)
											] = r)
										);
								return e;
							}.call(this)
						);
				return e;
			}),
			(s.prototype.vendorCSS = function (t, e) {
				for (
					var n,
						i = a(t),
						o = i.getPropertyCSSValue(e),
						s = this.vendors,
						r = 0,
						l = s.length;
					r < l;
					r++
				)
					(n = s[r]),
						(o = o || i.getPropertyCSSValue("-" + n + "-" + e));
				return o;
			}),
			(s.prototype.animationName = function (e) {
				var n;
				try {
					n = this.vendorCSS(e, "animation-name").cssText;
				} catch (t) {
					n = a(e).getPropertyValue("animation-name");
				}
				return "none" === n ? "" : n;
			}),
			(s.prototype.cacheAnimationName = function (t) {
				return this.animationNameCache.set(t, this.animationName(t));
			}),
			(s.prototype.cachedAnimationName = function (t) {
				return this.animationNameCache.get(t);
			}),
			(s.prototype.scrollHandler = function () {
				return (this.scrolled = !0);
			}),
			(s.prototype.scrollCallback = function () {
				var o;
				return !this.scrolled ||
					((this.scrolled = !1),
					(this.boxes = function () {
						for (
							var t = this.boxes, e = [], n = 0, i = t.length;
							n < i;
							n++
						)
							(o = t[n]) &&
								(this.isVisible(o) ? this.show(o) : e.push(o));
						return e;
					}.call(this)),
					this.boxes.length || this.config.live)
					? void 0
					: this.stop();
			}),
			(s.prototype.offsetTop = function (t) {
				for (var e; void 0 === t.offsetTop; ) t = t.parentNode;
				for (e = t.offsetTop; (t = t.offsetParent); ) e += t.offsetTop;
				return e;
			}),
			(s.prototype.isVisible = function (t) {
				var e = t.getAttribute("data-wow-offset") || this.config.offset,
					n =
						(this.config.scrollContainer &&
							this.config.scrollContainer.scrollTop) ||
						window.pageYOffset,
					e =
						n +
						Math.min(
							this.element.clientHeight,
							this.util().innerHeight()
						) -
						e,
					i = this.offsetTop(t),
					t = i + t.clientHeight;
				return i <= e && n <= t;
			}),
			(s.prototype.util = function () {
				return null != this._util ? this._util : (this._util = new t());
			}),
			(s.prototype.disabled = function () {
				return (
					!this.config.mobile &&
					this.util().isMobile(navigator.userAgent)
				);
			}),
			s));
}.call(this);