// drawerの開閉
$(function () {

  let isOpen = false;

  $('.js-hamberger,.js-drawer,.js-drawer__link a').click(function(e) {
    e.stopPropagation();
    // drawer開閉時のbodyの固定化
     isOpen = !isOpen;

     $('body').toggleClass('is-open', isOpen);
     $('body').css({
      height:  isOpen ? '100%' : '',
      overflow: isOpen ? 'hidden' : ''
    });

    // drawer開閉時のhambergerとdrawerへのis-activeのクラスの付与
     $('.js-hamberger').toggleClass('is-active')
     $('.js-drawer').fadeToggle()

    })
    return false;
});

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


