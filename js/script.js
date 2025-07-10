$(document).ready(function() {
  // add scroll on menu item click
  $('a[href^="#"]').on('click', function(event) {
    var hrefId = this.getAttribute('href');
    var target = $(hrefId);
    if(target.length) {
      event.preventDefault();

      if (hrefId === '#booking_service') {
        $('.page-content__scrolled').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }

      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  var galleryKeyServicesThumbs = new Swiper(".gallery-key_services__thumbs", {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    on: {
      slideChange: function () {
        var index_currentSlide = this.realIndex;
        galleryKeyServices.slideTo(index_currentSlide);
      }
    }
  });

  var galleryKeyServices = new Swiper(".gallery-key_services", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: galleryKeyServicesThumbs,
    },
  });


  var galleryAwards = new Swiper(".gallery-awards", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var galleryClients = new Swiper(".gallery-clients", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });

  var galleryCases = new Swiper(".gallery-cases", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      "@0.75": {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      "@1.00": {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 2.5,
        centeredSlides: true,
        spaceBetween: 50,
      },
    },
  });

  var galleryReviews = new Swiper(".gallery-reviews", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var galleryPartners = new Swiper(".gallery-partners", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });

  // mobile version
  $('#mobileMenuBtn').on('click', function() {
    $(this).toggleClass('-active');
    $('#mobileMenu').toggleClass('-active');
    $('#mobileMenuOverlay').toggleClass('-active');
    $('#pageContent').toggleClass('-active');

    showTeamVideo();
    showCalendar();
  });

  $('#mobileMenuOverlay').on('click', function() {
    $(this).removeClass('-active');
    $('#mobileMenu').removeClass('-active');
    $('#pageContent').removeClass('-active');
    $('#mobileMenuBtn').removeClass('-active');
  });

  $('#mobileBooking').on('click', function() {
    $('#mobileMenuOverlay').removeClass('-active');
    $('#mobileMenu').removeClass('-active');
    $('#pageContent').removeClass('-active');
    $('#mobileMenuBtn').removeClass('-active');
  });

  // team btn
  $('#teamBtn').on('click', function() {
    if($(this).hasClass('-active')) {
      $(this).text('Show all');
    } else {
      $(this).text('Hide');
    }
    $(this).toggleClass('-active');
    $('.team-container__members .row.-toggled').toggleClass('-visible');
  });

  // loading posts onClick
  var actualPage = 1;
  $(document).on("click", "#loadPosts", function(e) {
    $(".page-blog__actions").addClass('-loading');

    var pages = $(this).attr('pages');
    var terms = $(this).attr('terms');

    var data =  {
        page_no: actualPage + 1,
        posts_per_page: 4,
        terms,
        action: 'load_more_blog_posts'
      };

    $.ajax({
      url: "/wp-admin/admin-ajax.php",
      type:'POST',
      data,
      success: function(html){
        actualPage++;

        $(".page-blog__actions").removeClass('-loading');
        $("#blogContent").append(html);

        if (pages == actualPage) {
          $(".page-blog__actions").hide();
        }
      }
    });
    return false;
  });

  if (YT.Player) {
    new YT.Player(document.querySelector("#team-video"), {
      height: 'auto',
      width: 'auto',
      host: 'https://www.youtube-nocookie.com',
      videoId: '2Ymyy6i4nWc'
    });
  };

});
