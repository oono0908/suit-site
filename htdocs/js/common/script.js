$(function () {
  $(".js-hamberger,.js-drawer,.js-drawer__link a").click(function() {
     $(".js-hamberger").toggleClass("is-active")
     $(".js-drawer").fadeToggle()
    })
});

$(function() {
  $(window).on('scroll', function() {
    var aboutTop = $('.js-about').offset().top;
    var scroll = $(window).scrollTop();
    if (scroll >= aboutTop) {
      $('.js-header').css('background-color', "#222222");
      $('.js-top-btn').css('display','block');
    } else {
      $('.js-header').css('background-color', 'transparent');
       $('.js-top-btn').css('display','none');
    }
  });
});

