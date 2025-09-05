const mySwiper = new Swiper ('.swiper', {
  loop: true,
  autoplay: { 
  delay: 3000,
  },
   pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
});


$(function () {
  $('.js-service-title-tab').on('click', function () {
    const target = $(this).data('target');

    $('.js-service-title-tab').removeClass('is-active');
    $(this).addClass('is-active');
    $('.service__cards').each(function () {
      $(this).toggleClass('is-active', $(this).data('list') === target);
    });
  });
});

$(function() {
  $('.js-drawer__item a, .js-header__link').on('click', function() {
    var targetId = $(this).attr('href');
    var idName = targetId.replace("#", "");
    var target = $("." + idName);
    if(target.length) {
      var headerHeight = $('.js-header').outerHeight();
      var scrollPosition = target.offset().top - headerHeight;
      $('html, body').animate({
        scrollTop: scrollPosition
      }, 600);
    }
  });
});

// 他ページからアクセスされたときの挙動
window.onload = function() {
  var id = window.location.hash
  var idName = id.replace("#", "");
  if (idName) {
    var className = $("." + idName);
    if (className.length) {
      var headerHeight = $('.js-header').outerHeight() || 0;
      var scrollPosition = className.offset().top - headerHeight;
      $('html, body').animate({ scrollTop: scrollPosition }, 600);
    }
  }
};