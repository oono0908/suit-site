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