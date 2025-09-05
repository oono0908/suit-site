$(function(){
  $('.info__map').on('click', function(){
    $('.modal').addClass('is-open');
    $('body').addClass('is-fixed');
    return false;
  });

  $('.map__close-btn, .modal').on('click', function(e){
     if (!$(e.target).closest('.map__body').length || $(e.target).is('.map__close-btn, .map__close-btn span')) {
      $('.modal').removeClass('is-open');
      $('body').removeClass('is-fixed');
    }
    return false;
  });
});