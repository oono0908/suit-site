// モーダルの開閉
$(function(){

  // google mapの文字をクリックした時
  $('.js-info__map').on('click', function(){
    $('.js-modal').addClass('is-open');
    return false;
  });

  // 地図画像以外の場所とcloseボタンをクリックした時
  $('.js-map__close-btn, .js-modal').on('click', function(e){
     if (!$(e.target).closest('.js-map__body').length || $(e.target).is('.map__close-btn, .map__close-btn span')) {
      $('.js-modal').removeClass('is-open');
    }
    return false;
  });

});

$(function(){
  // モーダル開閉時のbody固定のための判定要素変数
  let isOpen = false;

  // 開閉時のbodyの固定と解除
  $('.js-info__map, .js-map__close-btn, .js-modal').on('click',function(e){
    e.stopPropagation();
    isOpen = !isOpen;
     $('body').toggleClass('is-open', isOpen);
     $('body').css({
      height:  isOpen ? '100%' : '',
      overflow: isOpen ? 'hidden' : ''
    });
  })
});

