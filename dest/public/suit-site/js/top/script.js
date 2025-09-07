// swiper
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

// serviceセクションの画像の切り替え
$(function () {
  $('.js-service-title-tab').on('click', function () {
    const target = $(this).data('target');

    $('.js-service-title-tab').removeClass('is-active');
    $(this).addClass('is-active');
    $('.js-service__cards').each(function () {
      $(this).toggleClass('is-active', $(this).data('list') === target);
    });
    return false;
  });
});

// drawer、headerのリンクをクリックしたときの各セクションへの遷移
$(function() {

  let isOpen = false;

  $('.js-drawer__item a, .js-header__link, .js-drawer, .js-hamberger').on('click', function(e) {

    e.stopPropagation();

    // drawerの開閉
    $('.js-hamberger').toggleClass('is-active')
    $('.js-drawer').fadeToggle()

    // drawer開閉時のbodyの固定化
     isOpen = !isOpen;

     $('body').toggleClass('is-open', isOpen);
     $('body').css({
      height:  isOpen ? '100%' : '',
      overflow: isOpen ? 'hidden' : ''
    });

    // 各sectionへの遷移
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
    return false;
  });
});

// 他ページからアクセスされたときの各セクションへの遷移
window.onload = function() {
  var id = window.location.hash
  var idName = id.replace('#', '');
  if (idName) {
    var className = $('.' + idName);
    if (className.length) {
      var headerHeight = $('.js-header').outerHeight() || 0;
      var scrollPosition = className.offset().top - headerHeight;
      $('html, body').animate({ scrollTop: scrollPosition }, 600);
    }
  }
};

// scroll時のheader背景色の変化
$(function() {
  $(window).on('scroll', function() {
    var aboutTop = $('.js-scroll-top').offset().top;
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

// topへ戻るボタンがクリックされた時
$(function() {
  $('.js-top-btn').on('click', function(e) {
    $('html, body').animate({ scrollTop: 0 }, 600); 
    return false;
  });
});