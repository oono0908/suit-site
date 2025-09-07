// モーダルの開閉
$(function(){
  
  // bodyにis-openがついているかの判定
  let isOpen = false;

  // google mapの文字をクリックした時
  $('.js-info__map').on('click', function(){

    isOpen = !isOpen;

    $('body').toggleClass('is-open', isOpen);
    $('body').css({
    height:  isOpen ? '100%' : '',
    overflow: isOpen ? 'hidden' : ''
  });

    $('.js-modal').addClass('is-open');
    return false;
  });

  // 地図画像以外の場所とcloseボタンをクリックした時
  $('.js-map__close-btn, .js-modal').on('click', function(e){
      if (!$(e.target).closest('.js-map__body').length || $(e.target).is('.map__close-btn, .map__close-btn span')) {
        $('.js-modal').removeClass('is-open');

        isOpen = !isOpen;

        $('body').toggleClass('is-open', isOpen);
        $('body').css({
          height:  isOpen ? '100%' : '',
          overflow: isOpen ? 'hidden' : ''
      });
    }
    return false;
  });
});

