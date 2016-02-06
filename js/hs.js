$(function () {
  var $window = $(window);
  var $body = $('body');
  var $cart = $('.cart');
  var prevScrollTop = 0;

  // Placeholder
  $('input, textarea').placeholder();

  // Disable page scrolling
  function disableScrolling () {
    $body.css('overflow', 'hidden');
  }

  // Enable page scrolling
  function enableScrolling () {
    $body.css('overflow', 'visible');
    $window.scrollTop(prevScrollTop);
  }

  /*
  * Header scroll
  */

  var $headerScroll = $('.header-scroll');

  $window.on('scroll', function (event) {
    var scrollTop = $window.scrollTop();
    if (!$cart.hasClass('active')) {
      // Down
      if (scrollTop > prevScrollTop) {
        $headerScroll.removeClass('active');
      // Up
      } else {
        if (scrollTop > 0) {
          $headerScroll.addClass('active');
        } else {
          $headerScroll.removeClass('active');
        }
      }
    }
    prevScrollTop = scrollTop;
  });

  /*
  * Scroll to Target
  */

  $('[data-scrollto]').on('click', function (event) {
    event.preventDefault();
    var scrollTo = $(this).data('scrollto') || 0;
    $window.scrollTo(scrollTo, 500);
  });

  $('.home .header-scroll a').on('click', function (event) {
    event.preventDefault();
    var $this = $(this);
    $this.closest('.nav').find('a').removeClass('active');
    $this.addClass('active');

    if ($body.hasClass('mobile-nav-open')) {
      enableScrolling();
      $body.removeClass('mobile-nav-open');
    }
  });

  /*
  * Mobile nav
  */

  $('.mobile-nav-btn').on('click', function (event) {
    event.preventDefault();
    if ($body.hasClass('mobile-nav-open')) {
      enableScrolling();
      $body.removeClass('mobile-nav-open');
    } else {
      disableScrolling();
      $body.addClass('mobile-nav-open');
    }
  });

  /*
  * Cart Toggle
  */

  $cart.find('> .button').on('click', function (event) {
    event.preventDefault();
    $cart.toggleClass('active');
  });

  $cart.find('> .overlay').on('click', function (event) {
    event.preventDefault();
    $cart.removeClass('active');
  });

  /*
  * Product Details
  */

  var $products = $('.product');

  $products.on('click', '.image a, .more-info', function (event) {
    event.preventDefault();
    // var $product = $(this).closest('.product');

    // if ($product.hasClass('active')) {
    //   enableScrolling();
    //   $product.removeClass('active');
    // } else {
    //   disableScrolling();
    //   $product.addClass('active');
    // }
  });

  /*
  * Video play/overlay
  */

  var player = $f(document.getElementById('video-iframe'));

  $('[data-overlay]').on('click', function (event) {
    event.preventDefault();
    var overlayId = $(this).data('overlay');
    if (!overlayId) return false;
    var $overlay = $('#' + overlayId);
    $overlay.css('left', 0).addClass('active');
    player.api('play');
    disableScrolling();
  });

  // Close overlay on click outside
  $('.video-overlay').on('click', function (event) {
    event.preventDefault();
    player.api('pause');
    var $overlay = $(this);
    $overlay.removeClass('active');
    setTimeout(function () {
      $overlay.css('left', '-100%');
    }, 250);
    enableScrolling();
  });
});
