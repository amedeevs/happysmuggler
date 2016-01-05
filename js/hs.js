$(function () {
  var $window = $(window);

  /*
  * Header scroll
  */

  var $headerScroll = $('.header-scroll');
  var prevScrollTop = 0;

  $window.on('scroll', function (event) {
    var scrollTop = $window.scrollTop();
    if (scrollTop > prevScrollTop) {
      $headerScroll.removeClass('active'); // Down
    } else {
      $headerScroll.addClass('active'); // Up
    }
    prevScrollTop = scrollTop;
  });
});
