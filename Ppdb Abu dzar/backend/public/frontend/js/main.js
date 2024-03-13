
/*====================================
	* Template Name		: Cryptotum - Bitcoin & Cryptocurrency ICO Bootsrap Template
	* Author						: themetum
	* Version					: 1.0.0
	* Created					: 10 Dec, 2021
	* File Description		: JS Files
=====================================*/

(function ($) {
	"use strict";
	
	// preloader
	function preloader() {
		$('#preloader').delay(0).fadeOut();
	};

	$(window).on('load', function () {
		preloader();
	});

	// scroll effect

	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$(".sticky-top").removeClass("fixed-top", 1500 );
		} else {
			$(".sticky-top").addClass("fixed-top", 1500 );
		}
	});


	// Navbar
	  
	  $(document).on("click", ".navbar-collapse.show", function(e) {
		$(e.target).is("a") && $(this).collapse("hide")
	}) 
	  
	  $("#navbarCollapse").scrollspy({
		offset: 20
	})

	// Sections Scroll
	
	$('.smooth-scroll').on('click', function() {
		event.preventDefault();
		var sectionTo = $(this).attr('href');
		$('html, body').stop().animate({
		  scrollTop: $(sectionTo).offset().top}, 1500);
	});
		
	//counter
		$('.counter_text').appear(function() {
			$('.counter-to').countTo();
		}, {
			accY: -100
		});

	 /* ==================================================
		# Youtube Video Init
	 ===============================================*/
       
		$('.player').mb_YTPlayer();	
		
	/* ==================================================
		# Magnific popup init
	 ===============================================*/

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });		
	
	/* ==================================================
		Contact Form Validations
	================================================== */

		$(function() {

			// Get the form.
			var form = $('#contact-form');

			// Get the messages div.
			var formMessages = $('.form-message');

			// Set up an event listener for the contact form.
			$(form).submit(function(e) {
				// Stop the browser from submitting the form.
				e.preventDefault();

				// Serialize the form data.
				var formData = $(form).serialize();

				// Submit the form using AJAX.
				$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					data: formData
				})
				.done(function(response) {
					// Make sure that the formMessages div has the 'success' class.
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');

					// Set the message text.
					$(formMessages).text(response);

					// Clear the form.
					$('#contact-form input,#contact-form textarea').val('');
				})
				.fail(function(data) {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');

					// Set the message text.
					if (data.responseText !== '') {
						$(formMessages).text(data.responseText);
					} else {
						$(formMessages).text('Oops! An error occured and your message could not be sent.');
					}
				});
			});

		});		
	
// -----------------------------------------------------
	// ------------------   CURSOR    ----------------------
	// -----------------------------------------------------

	function mim_tm_cursor(){

		var myCursor	= jQuery('.mouse-cursor');

		if(myCursor.length){
			if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
		}
	};
	mim_tm_cursor()

	/*------------------------
	   Scroll to top
	-------------------------- */
	$(function () {
			$(window).on('scroll', function(){
				if ($(this).scrollTop() > 400) {
					$('#back-to-top').fadeIn();
				} else {
					$('#back-to-top').fadeOut();
				}
			});
			});
			
	$('#back-to-top').on("click", function() {
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
	

})(jQuery)	

	
	
	
	
	
	
	
	
	