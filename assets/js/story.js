/* =====================================================================
   story.js — per-entry stacking SHARD cards on a fixed spotlit stage
   ---------------------------------------------------------------------
   • Lenis            → smooth momentum scrolling
   • ScrollTrigger    → PINS the stage; a scrubbed timeline travels each
     card up through the fixed spotlight while the previous recedes/tilts
     back.  Shards tilt as they move (parallax → the 3D is felt).
   • Background (spotlight + glows) is inside the pinned stack, so it
     stays put — only the cards move.
   • Flat fallback (mobile <768 / reduced-motion / no-GSAP): story.js adds
     .story-flat → plain stacked glass panels, no pin, no transforms.
   ===================================================================== */
(function () {
  "use strict";

  var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = window.matchMedia("(min-width: 768px)").matches;
  var stack = document.querySelector(".story-stack");

  /* ---- smooth momentum scrolling ---- */
  function initLenis() {
    if (typeof Lenis === "undefined") return null;
    var lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    return lenis;
  }

  /* ---- left timeline rail: a real chronology — per-node year (the scale),
         a traveled-line fill, and an active label (section + org + date range).
         Nodes GENERATED from the cards so it can't drift. Sticky inside .scene. ---- */
  function buildRail(cards) {
    var scene = document.querySelector(".scene");
    if (!scene) return null;

    function compactYear(s) {            // "Aug 2021 — Sep 2023" → "2021–2023"; same year twice → "2021"; ongoing → start year
      var ys = (s.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number)
                 .filter(function (v, i, a) { return a.indexOf(v) === i; });   // dedupe matched years up front
      if (!ys.length) return "";
      if (/present|now|current|ongoing/i.test(s)) return String(Math.min.apply(null, ys));
      if (ys.length === 1) return String(ys[0]);
      return Math.min.apply(null, ys) + "–" + Math.max.apply(null, ys);
    }

    var rail = document.createElement("div");
    rail.className = "story-rail";
    rail.setAttribute("aria-hidden", "true");
    var track = document.createElement("div");
    track.className = "rail-track";
    var line = document.createElement("div"); line.className = "rail-line"; track.appendChild(line);
    var fill = document.createElement("div"); fill.className = "rail-fill"; track.appendChild(fill);

    var nodes = cards.map(function (card) {
      var era = (card.querySelector(".kicker") || {}).textContent || "";
      var title = (card.querySelector(".card-title") || {}).textContent || "";
      var date = ((card.querySelector(".card-dates") || {}).textContent || "").trim();
      var node = document.createElement("div");
      node.className = "rail-node";
      var dot = document.createElement("span"); dot.className = "rail-dot";
      var year = document.createElement("span"); year.className = "rail-year"; year.textContent = compactYear(date);
      var label = document.createElement("span"); label.className = "rail-label";
      var e = document.createElement("span"); e.className = "rail-era"; e.textContent = era;
      var t = document.createElement("span"); t.className = "rail-name"; t.textContent = title;
      var r = document.createElement("span"); r.className = "rail-range"; r.textContent = date;
      label.appendChild(e); label.appendChild(t); label.appendChild(r);
      node.appendChild(dot); node.appendChild(year); node.appendChild(label);
      track.appendChild(node);
      return node;
    });
    rail.appendChild(track);
    var stage = scene.querySelector(".scene-stage");      // sit beside the shared beam
    scene.insertBefore(rail, stage ? stage.nextSibling : scene.firstChild);

    var n = nodes.length, last = -1;
    function apply(active) {
      if (active === last) return;
      last = active;
      for (var i = 0; i < n; i++) {
        nodes[i].classList.toggle("is-active", i === active);   // gold, enlarged, full label
        nodes[i].classList.toggle("is-passed", i < active);     // traveled: gold-tint dot, brighter year
        nodes[i].classList.toggle("is-adjacent", i === active - 1 || i === active + 1); // clear years by the label
      }                                                         // i > active = upcoming (dim)
      // traveled-line fill: top (NOW) → active node. Nodes are evenly spaced.
      fill.style.transform = "scaleY(" + (n > 1 ? active / (n - 1) : 0).toFixed(4) + ")";
    }
    apply(0);   // NOW active during the hero

    return {
      // active = the most-centred card (opacity-independent, so the cross-fade gap
      // where both cards are momentarily dim can't confuse it)
      sync: function () {
        var active = 0, best = Infinity;
        for (var i = 0; i < cards.length; i++) {
          var d = Math.abs(gsap.getProperty(cards[i], "yPercent"));
          if (d < best) { best = d; active = i; }
        }
        apply(active);
      },
      setLive: function (on) { rail.classList.toggle("rail-live", !!on); },

      // click → jump to that chapter via the SAME pin ScrollTrigger + Lenis;
      // hover (non-active) → preview that chapter's label. Desktop / story-mode
      // only (CSS gates pointer-events). Reuses the existing timeline — no new trigger.
      enableInteraction: function (tl, lenis) {
        if (!tl || !tl.scrollTrigger) return;
        var st = tl.scrollTrigger, dur = tl.duration();
        nodes.forEach(function (node, i) {
          node.addEventListener("click", function () {
            if (n < 2 || st.end === st.start) return;
            // timeline time where card i sits CENTRED (its rise ends at i+0.7 and it
            // holds to i+1 → mid-hold ≈ i+0.85); map that to a scroll offset on the pin
            var ct = i === 0 ? 0 : i + 0.85;
            var target = st.start + Math.min(ct / dur, 1) * (st.end - st.start);
            if (lenis) lenis.scrollTo(target, { duration: 1.2 });
            else window.scrollTo({ top: target, behavior: "smooth" });
          });
          node.addEventListener("mouseenter", function () {
            if (i === last) return;                                       // active node keeps its own label
            node.classList.add("is-preview");
            if (nodes[i - 1]) nodes[i - 1].classList.add("is-preview-adj");
            if (nodes[i + 1]) nodes[i + 1].classList.add("is-preview-adj");
            if (Math.abs(i - last) === 1) rail.classList.add("preview-near-active");
          });
          node.addEventListener("mouseleave", function () {
            node.classList.remove("is-preview");
            if (nodes[i - 1]) nodes[i - 1].classList.remove("is-preview-adj");
            if (nodes[i + 1]) nodes[i + 1].classList.remove("is-preview-adj");
            rail.classList.remove("preview-near-active");
          });
        });
      }
    };
  }

  /* ---- hero-only dust motes drifting in the spotlight beam ----
         Built once; animated purely by CSS keyframes (no rAF / canvas). ---- */
  function buildMotes(hero) {
    if (!hero || hero.querySelector(".hero-motes")) return;
    var layer = document.createElement("div");
    layer.className = "hero-motes";
    layer.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 14; i++) {
      var top = Math.random() * 100;
      var spread = 6 + (top / 100) * 28;                 // cone: narrow at top, wide at base
      var left = 50 + (Math.random() * 2 - 1) * spread;
      var size = (2 + Math.random() * 2).toFixed(1);
      var dur = (9 + Math.random() * 9).toFixed(1);
      var m = document.createElement("span");
      m.className = "mote";
      m.style.cssText =
        "left:" + left.toFixed(2) + "%;top:" + top.toFixed(2) + "%;" +
        "width:" + size + "px;height:" + size + "px;" +
        "animation-duration:" + dur + "s;animation-delay:-" + (Math.random() * dur).toFixed(1) + "s;" +
        "--mote-op:" + (0.28 + Math.random() * 0.32).toFixed(2) + ";";
      layer.appendChild(m);
    }
    var inner = hero.querySelector(".hero-inner");
    hero.insertBefore(layer, inner || hero.firstChild);   // behind the text/portrait
  }

  /* ---- pinned stacking timeline; returns the ScrollTrigger (or null) ---- */
  function initStory(lenis) {
    if (!stack || !window.gsap || !window.ScrollTrigger) return null;
    gsap.registerPlugin(ScrollTrigger);

    var cards = gsap.utils.toArray(".story-card");
    if (cards.length < 2) return null;
    var n = cards.length;

    // initial state: card 0 centred & visible; the rest waiting below AND invisible
    cards.forEach(function (card, i) {
      card.style.zIndex = String(i + 1);                 // each incoming card sits ABOVE the last
      gsap.set(card, { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
    });

    var rail = buildRail(cards);   // left chronology rail, generated from the cards

    var tl = gsap.timeline({
      defaults: { ease: "none" },
      // sync the rail from the TIMELINE too: the ScrollTrigger's onUpdate stops
      // firing when scrolling stops, but the scrub keeps animating ~0.6s longer —
      // without this the rail highlights a stale chapter after fast jumps.
      onUpdate: function () { if (rail) rail.sync(); },
      scrollTrigger: {
        trigger: stack,
        start: "top top",
        end: function () { return "+=" + Math.round((n - 1) * window.innerHeight * 0.75); },   /* 0.75vh per chapter — same drama, less thumb */
        pin: true,
        pinSpacing: true,
        scrub: 0.6,                 // no anticipatePin — it causes the reverse-scroll jump
        invalidateOnRefresh: true,
        // drive the rail off the SAME ScrollTrigger — no second timeline, no re-pin
        onUpdate: function () { if (rail) rail.sync(); },
        onToggle: function (self) { if (rail) rail.setLive(self.isActive); }
      }
    });

    // Cross: the incoming card rises and fades IN only as it nears centre, while the
    // outgoing card drifts up and fades OUT fast — so two card BODIES are never
    // legibly visible at once (reads as a clean replace). Fully reversible.
    for (var i = 1; i < n; i++) {
      var prev = cards[i - 1];
      var cur = cards[i];
      var at = i;

      tl.to(cur, { yPercent: 0, ease: "power2.out", duration: 0.7 }, at);             // rise to centre
      tl.fromTo(cur, { opacity: 0 }, { opacity: 1, duration: 0.4 }, at + 0.3);        // fade in (second half only)
      tl.to(prev, { yPercent: -32, ease: "power1.in", duration: 0.7 }, at);          // drift up
      tl.to(prev, { opacity: 0, ease: "power1.in", duration: 0.34 }, at);            // fade out fast
    }

    // tail: hold the last card before the pin releases
    tl.to(cards[n - 1], { yPercent: 0, duration: 0.4 });

    // Dissolve the seam: the hero's billing / cue / pool fade + lift away as you
    // scroll the hero out into the story (transform + opacity only).
    var hero = document.querySelector(".hero-theatre");
    if (hero) {
      buildMotes(hero);   // dust motes in the beam — fade out with the rest of the hero
      var fade = hero.querySelectorAll(".hero-billing, .hero-cue, .hero-pool, .hero-motes");
      if (fade.length) {
        gsap.to(fade, {
          opacity: 0, y: -28, ease: "none",
          scrollTrigger: { trigger: hero, start: "center top", end: "bottom top", scrub: true }
        });
      }
    }

    if (rail) rail.enableInteraction(tl, lenis);   // make the rail clickable

    return tl.scrollTrigger;
  }

  /* ---- shared chapter target (the rail's math): card i centres at timeline
         time ≈ i+0.85, mapped onto the pin track. Returns a scroll offset. ---- */
  function chapterScrollTarget(st, idx, n) {
    if (!st || n < 2 || st.end === st.start) return null;
    var dur = (st.animation && st.animation.duration) ? st.animation.duration() : (n - 1 + 0.1);
    var ct = idx === 0 ? 0 : idx + 0.85;
    return st.start + Math.min(ct / dur, 1) * (st.end - st.start);
  }

  /* ---- in-page nav (route through Lenis; map era anchors to pin offsets) ---- */
  function initNav(lenis, st) {
    var cards = stack ? Array.prototype.slice.call(stack.querySelectorAll(".story-card")) : [];

    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      e.stopImmediatePropagation();           // pre-empt onePageNav + jQuery smooth-scroll

      var menu = document.querySelector(".popup-mobile-menu");
      if (menu) menu.classList.remove("menu-open");
      document.documentElement.style.overflow = "";

      var top;
      var idx = cards.indexOf(target);
      if (st && idx > -1 && cards.length > 1) {
        // card lives inside the pinned stage → map to its CENTRED point on the pin track
        top = chapterScrollTarget(st, idx, cards.length);
      } else {
        top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      }
      if (lenis) lenis.scrollTo(top, { duration: 1.1 });
      else window.scrollTo({ top: top, behavior: prefersReduce ? "auto" : "smooth" });
    }, true);
  }

  /* ---- cross-page entry: arriving at index.html#<chapter> from another page.
         The native hash jump lands in the pinned spacer (empty/black), so once the
         pin + Lenis are live we snap to that chapter via the SAME rail math. ---- */
  function scrollToEntryHash(lenis, st) {
    if (!st || !stack) return;                         // mobile/flat → native handles it
    var hash = location.hash;
    if (!hash || hash.length < 2) return;
    var target;
    try { target = document.querySelector(hash); } catch (e) { return; }
    if (!target) return;
    var cards = Array.prototype.slice.call(stack.querySelectorAll(".story-card"));
    var idx = cards.indexOf(target);
    if (idx < 0) return;                               // not a story chapter (#contact/#blog) → native
    var top = chapterScrollTarget(st, idx, cards.length);
    if (top == null) return;
    // after ScrollTrigger.refresh() + lenis.resize() settle, snap to the chapter
    requestAnimationFrame(function () {
      if (lenis) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo({ top: top });
      if (window.ScrollTrigger) ScrollTrigger.update();
    });
  }

  function start() {
    var canStack = !prefersReduce && isDesktop && window.gsap && window.ScrollTrigger;
    var lenis = prefersReduce ? null : initLenis();
    var st = null;

    if (canStack) {
      st = initStory(lenis);
    } else if (stack) {
      stack.classList.add("story-flat");      // mobile / reduced-motion / no-GSAP
    }

    initNav(lenis, st);

    if (window.ScrollTrigger) {
      // Lenis caches the scroll limit and does NOT account for ScrollTrigger's
      // pin-spacer. Without this, scrolling clamps short, the timeline can't
      // advance, and cards after the first never reach the stage.
      if (lenis && lenis.resize) {
        ScrollTrigger.addEventListener("refresh", function () { lenis.resize(); });
      }
      ScrollTrigger.refresh();
      if (lenis && lenis.resize) lenis.resize();
    }

    scrollToEntryHash(lenis, st);   // honor index.html#<chapter> arrived at from another page
  }

  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
