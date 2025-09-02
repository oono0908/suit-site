$(function () {
  $(".js-hamberger,.js-drawer,.js-drawer__link a").click(function() {
     $(".js-hamberger").toggleClass("is-active")
     $(".js-drawer").fadeToggle()
    //  return false;
    })
});