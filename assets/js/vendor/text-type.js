jQuery(document).ready(function (d) {
	var l = 2500,
		n = 3800,
		t = n - 3e3,
		r = 50,
		o = 150,
		c = 500,
		h = c + 800,
		p = 600,
		e = 1500,
		s =
			(d(".cd-headline.letters")
				.find("b")
				.each(function () {
					var s = d(this),
						e = s.text().split(""),
						a = s.hasClass("is-visible");
					for (i in e)
						0 < s.parents(".rotate-2").length &&
							(e[i] = "<em>" + e[i] + "</em>"),
							(e[i] = a
								? '<i class="in">' + e[i] + "</i>"
								: "<i>" + e[i] + "</i>");
					var n = e.join("");
					s.html(n).css("opacity", 1);
				}),
			d(".cd-headline")),
		u = l;
	function f(s) {
		var i,
			e,
			a = w(s);
		s.parents(".cd-headline").hasClass("type")
			? ((i = s.parent(".cd-words-wrapper"))
					.addClass("selected")
					.removeClass("waiting"),
			  setTimeout(function () {
					i.removeClass("selected"),
						s
							.removeClass("is-visible")
							.addClass("is-hidden")
							.children("i")
							.removeClass("in")
							.addClass("out");
			  }, c),
			  setTimeout(function () {
					C(a, o);
			  }, h))
			: s.parents(".cd-headline").hasClass("letters")
			? ((e = s.children("i").length >= a.children("i").length),
			  (function s(i, e, a, n) {
					i.removeClass("in").addClass("out");
					i.is(":last-child")
						? a &&
						  setTimeout(function () {
								f(w(e));
						  }, l)
						: setTimeout(function () {
								s(i.next(), e, a, n);
						  }, n);
					{
						var t;
						i.is(":last-child") &&
							d("html").hasClass("no-csstransitions") &&
							((t = w(e)), v(e, t));
					}
			  })(s.find("i").eq(0), s, e, r),
			  m(a.find("i").eq(0), a, e, r))
			: s.parents(".cd-headline").hasClass("clip")
			? s
					.parents(".cd-words-wrapper")
					.animate({ width: "2px" }, p, function () {
						v(s, a), C(a);
					})
			: s.parents(".cd-headline").hasClass("loading-bar")
			? (s.parents(".cd-words-wrapper").removeClass("is-loading"),
			  v(s, a),
			  setTimeout(function () {
					f(a);
			  }, n),
			  setTimeout(function () {
					s.parents(".cd-words-wrapper").addClass("is-loading");
			  }, t))
			: (v(s, a),
			  setTimeout(function () {
					f(a);
			  }, l));
	}
	function C(s, i) {
		s.parents(".cd-headline").hasClass("type")
			? (m(s.find("i").eq(0), s, !1, i),
			  s.addClass("is-visible").removeClass("is-hidden"))
			: s.parents(".cd-headline").hasClass("clip") &&
			  s
					.parents(".cd-words-wrapper")
					.animate({ width: s.width() + 10 }, p, function () {
						setTimeout(function () {
							f(s);
						}, e);
					});
	}
	function m(s, i, e, a) {
		s.addClass("in").removeClass("out"),
			s.is(":last-child")
				? (i.parents(".cd-headline").hasClass("type") &&
						setTimeout(function () {
							i.parents(".cd-words-wrapper").addClass("waiting");
						}, 200),
				  e ||
						setTimeout(function () {
							f(i);
						}, l))
				: setTimeout(function () {
						m(s.next(), i, e, a);
				  }, a);
	}
	function w(s) {
		return s.is(":last-child") ? s.parent().children().eq(0) : s.next();
	}
	function v(s, i) {
		s.removeClass("is-visible").addClass("is-hidden"),
			i.removeClass("is-hidden").addClass("is-visible");
	}
	s.each(function () {
		var s,
			i,
			e,
			a = d(this);
		a.hasClass("loading-bar")
			? ((u = n),
			  setTimeout(function () {
					a.find(".cd-words-wrapper").addClass("is-loading");
			  }, t))
			: a.hasClass("clip")
			? ((s = (i = a.find(".cd-words-wrapper")).width() + 10),
			  i.css("width", s))
			: a.hasClass("type") ||
			  ((i = a.find(".cd-words-wrapper b")),
			  (e = 0),
			  i.each(function () {
					var s = d(this).width();
					e < s && (e = s);
			  }),
			  a.find(".cd-words-wrapper").css("width", e)),
			setTimeout(function () {
				f(a.find(".is-visible").eq(0));
			}, u);
	});
});
