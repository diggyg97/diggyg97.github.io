(function ($) {
	"use strict";

	var imJs = {
		m: function (e) {
			imJs.d();
			imJs.methods();
		},
		d: function (e) {
			(this._window = $(window)),
				(this._document = $(document)),
				(this._body = $("body")),
				(this._html = $("html"));
		},

		methods: function (e) {
			imJs.featherAtcivation();
			imJs.backToTopInit();
			imJs.mobileMenuActive();
			imJs.vedioActivation();
			imJs.stickyHeader();
			imJs.smothScroll();
			imJs.smothScroll_Two();
			imJs.stickyAdjust();
			imJs.testimonialActivation();
			imJs.contactForm();
			imJs.wowActive();
			imJs.awsActivation();
			imJs.demoActive();
			imJs.activePopupDemo();
			imJs.onePageNav();
		},

		activePopupDemo: function (e) {
			$(".popuptab-area li a.demo-dark").on("click", function (e) {
				$(".demo-modal-area").addClass("dark-version");
				$(".demo-modal-area").removeClass("white-version");
			});

			$(".popuptab-area li a.demo-light").on("click", function (e) {
				$(".demo-modal-area").removeClass("dark-version");
				$(".demo-modal-area").addClass("white-version");
			});
		},

		demoActive: function (e) {
			$(".rn-right-demo").on("click", function (e) {
				$(".demo-modal-area").addClass("open");
			});
			$(".demo-close-btn").on("click", function (e) {
				$(".demo-modal-area").removeClass("open");
			});
		},

		contactForm: function () {
			$(".rwt-dynamic-form").on("submit", function (e) {
				e.preventDefault();
				var _self = $(this);
				var __selector = _self.closest("input,textarea");
				_self.closest("div").find("input,textarea").removeAttr("style");
				_self.find(".error-msg").remove();
				_self.closest("div").find('button[type="submit"]').attr("disabled", "disabled");
				var data = _self.serialize();
				$.ajax({
					url: "https://usebasin.com/f/fc790dca648d",
					type: "POST",
					dataType: "json",
					data: data,
					success: function (data) {
						_self.closest("div").find('button[type="submit"]').removeAttr("disabled");
						if (data.code == false) {
							_self.closest("div").find('[name="' + data.field + '"]');
							_self.find(".rn-btn").after('<div class="error-msg">Error: ' + data.err + "</div>");
						} else {
							_self.hide(); // Hide the form upon successful submission
							$(".error-msg").hide(); // Hide any existing error messages
							$(".success-msg").show(); // Show the success message
							_self.closest("div").find("input,textarea").val("");
						}
					},
					error: function() {
						_self.find(".rn-btn").after('<div class="error-msg">Error: Message submission failed. Please try again later.</div>');
						_self.closest("div").find('button[type="submit"]').removeAttr("disabled");
					}
				});
			});
		},
								

		wowActive: function () {
			new WOW().init();
		},

		smothScroll: function () {
			$(document).on("click", ".smoth-animation", function (event) {
				event.preventDefault();
				$("html, body").animate(
					{
						scrollTop: $($.attr(this, "href")).offset().top - 50,
					},
					300
				);
			});
		},
		// two scroll spy
		smothScroll_Two: function () {
			$(document).on("click", ".smoth-animation-two", function (event) {
				event.preventDefault();
				$("html, body").animate(
					{
						scrollTop: $($.attr(this, "href")).offset().top - 0,
					},
					300
				);
			});
		},

		stickyAdjust: function (e) {
			// Sticky Top Adjust..,
			$(".rbt-sticky-top-adjust").css({
				top: 120,
			});

			$(".rbt-sticky-top-adjust-two").css({
				top: 200,
			});
			$(".rbt-sticky-top-adjust-three").css({
				top: 25,
			});
		},

		testimonialActivation: function () {
			$(".testimonial-activation").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: true,
				adaptiveHeight: true,
				cssEase: "linear",
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
			});

			$(".testimonial-item-one").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: true,
				adaptiveHeight: true,
				cssEase: "linear",
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							arrows: false,
						},
					},
				],
			});

			$(".portfolio-slick-activation").slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				cssEase: "linear",
				adaptiveHeight: true,
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
				responsive: [
					{
						breakpoint: 1124,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 868,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: false,
						},
					},
				],
			});

			$(".blog-slick-activation").slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				cssEase: "linear",
				adaptiveHeight: true,
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
				responsive: [
					{
						breakpoint: 1124,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 868,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: false,
						},
					},
				],
			});

			$(".testimonial-activation-item-3").slick({
				arrows: true,
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 1,
				adaptiveHeight: true,
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
				responsive: [
					{
						breakpoint: 1124,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							arrows: false,
						},
					},
					{
						breakpoint: 577,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: false,
						},
					},
				],
			});

			$(".brand-activation-item-5").slick({
				arrows: true,
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 4,
				slidesToScroll: 1,
				adaptiveHeight: true,
				prevArrow:
					'<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
				nextArrow:
					'<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
				responsive: [
					{
						breakpoint: 1124,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 868,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				],
			});
		},

		featherAtcivation: function () {
			feather.replace();
		},

		backToTopInit: function () {
			// declare variable
			var scrollTop = $(".backto-top");
			$(window).scroll(function () {
				// declare variable
				var topPos = $(this).scrollTop();
				// if user scrolls down - show scroll to top button
				if (topPos > 100) {
					$(scrollTop).css("opacity", "1");
				} else {
					$(scrollTop).css("opacity", "0");
				}
			});

			//Click event to scroll to top
			$(scrollTop).on("click", function () {
				$("html, body").animate(
					{
						scrollTop: 0,
						easingType: "linear",
					},
					500
				);
				return false;
			});
		},

		stickyHeader: function (e) {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 250) {
					$(".header--sticky").addClass("sticky");
				} else {
					$(".header--sticky").removeClass("sticky");
				}
			});
		},

		vedioActivation: function (e) {
			$("#play-video, .play-video").on("click", function (e) {
				e.preventDefault();
				$("#video-overlay, .video-overlay").addClass("open");
				$("#video-overlay, .video-overlay").append(
					'<iframe width="80%" height="80%" src="https://www.youtube.com/embed/7e90gBu4pas" frameborder="0" allowfullscreen></iframe>'
				);
			});

			$(".video-overlay, .video-overlay-close").on("click", function (e) {
				e.preventDefault();
				close_video();
			});

			$(document).keyup(function (e) {
				if (e.keyCode === 27) {
					close_video();
				}
			});

			function close_video() {
				$(".video-overlay.open")
					.removeClass("open")
					.find("iframe")
					.remove();
			}
		},

		mobileMenuActive: function (e) {
			$(".humberger-menu").on("click", function (e) {
				e.preventDefault();
				$(".popup-mobile-menu").addClass("menu-open");
				imJs._html.css({
					overflow: "hidden",
				});
			});

			$(
				".close-menu-activation, .popup-mobile-menu .primary-menu .nav-item a"
			).on("click", function (e) {
				e.preventDefault();
				$(".popup-mobile-menu").removeClass("menu-open");
				$(".popup-mobile-menu .has-droupdown > a")
					.removeClass("open")
					.siblings(".submenu")
					.removeClass("active")
					.slideUp("400");
				imJs._html.css({
					overflow: "",
				});
			});

			$(".popup-mobile-menu").on("click", function (e) {
				e.target === this &&
					$(".popup-mobile-menu").removeClass("menu-open");
				imJs._html.css({
					overflow: "",
				});
			});

			$(".popup-mobile-menu .has-droupdown > a").on(
				"click",
				function (e) {
					e.preventDefault();
					$(this)
						.siblings(".submenu")
						.toggleClass("active")
						.slideToggle("400");
					$(this).toggleClass("open");
					imJs._html.css({
						overflow: "",
					});
				}
			);

			$(".nav-pills .nav-link").on("click", function (e) {
				$(".rn-popup-mobile-menu").removeClass("menu-open");
				imJs._html.css({
					overflow: "",
				});
			});
		},

		awsActivation: function (e) {
			AOS.init();
		},

		onePageNav: function () {
			$(".onepagenav").onePageNav({
				currentClass: "current",
				changeHash: true,
				scrollSpeed: 500,
				scrollThreshold: 0.2,
				filter: ":not(.external)",
				easing: "swing",
				scrollChange: function ($currentListItem) {
					console.log(this);
				},
			});
		},
	};
	imJs.m();

	// Define a function to calculate the number of years from a specified date until the current date
	function calculateYearsSince(startDate) {
		var currentDate = new Date();
		var yearsDiff = currentDate.getFullYear() - startDate.getFullYear();

		// Adjust for cases where the current date has not yet reached the start date
		if (
			currentDate.getMonth() < startDate.getMonth() ||
			(currentDate.getMonth() === startDate.getMonth() &&
				currentDate.getDate() < startDate.getDate())
		) {
			yearsDiff--;
		}

		return yearsDiff;
	}

	// Execute when the DOM content is fully loaded
	$(document).ready(function () {
		// Find the years-calculated-since-bday element
		var yearsSinceBdayElement = $(".years-calculated-since-bday");
		var yearsSinceExpElement = $(".years-calculated-since-exp");

		// Calculate the number of years since October 14, 1997
		var startDate = new Date("1997-10-14");
		var startDate_exp = new Date("2019-11-04");
		var yearsSince = calculateYearsSince(startDate);
		var yearsSince_exp = calculateYearsSince(startDate_exp);

		// Update the HTML content with the calculated number of years
		yearsSinceBdayElement.text(
			"Reflecting on my journey spanning the past " +
				yearsSince +
				" years"
		);

		yearsSinceExpElement.text(
			yearsSince_exp + "+ years of hands-on experience"
		);
	});

	// Get reference to the body element
	const bodyElement = document.body;

	// Get reference to the toggle button
	const toggleButton = document.getElementById("toggleButton");

	// Add event listener to the button
	toggleButton.addEventListener("click", function () {
		// Check if the body element has the class "white-version"
		const hasWhiteVersionClass =
			bodyElement.classList.contains("white-version");

		// Toggle the presence of the "white-version" class
		if (hasWhiteVersionClass) {
			// If body has "white-version" class, remove it
			bodyElement.classList.remove("white-version");
			// Change button text to "Light Mode"
			toggleButton.querySelector("mode").innerText = "Dark Mode";
		} else {
			// If body does not have "white-version" class, add it
			bodyElement.classList.add("white-version");
			// Change button text to "Dark Mode"
			toggleButton.querySelector("mode").innerText = "Light Mode";
		}
	});
	
})(jQuery, window);
