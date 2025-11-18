// drawerの開閉
$(function () {
  let isOpen = false;
  let scrollPosition = 0;

  $(".js-hamberger,.js-drawer,.js-drawer__link a").click(function (e) {
    e.stopPropagation();
    // drawer開閉時のbodyの固定化
    isOpen = !isOpen;

    if (isOpen) {
      // drawerを開く時：現在のスクロール位置を保存してbodyを固定
      scrollPosition = $(window).scrollTop();
      $("body").css({
        position: "fixed",
        top: -scrollPosition + "px",
        left: 0,
        width: "100%",
        overflow: "hidden",
        "touch-action": "none",
      });
      $("body").addClass("is-open");
    } else {
      // drawerを閉じる時：bodyの固定を解除してスクロール位置を復元
      $("body").css({
        position: "",
        top: "",
        left: "",
        width: "",
        overflow: "",
        "touch-action": "",
      });
      $("body").removeClass("is-open");
      $(window).scrollTop(scrollPosition);
    }

    // drawer開閉時のhambergerとdrawerへのis-activeのクラスの付与
    $(".js-hamberger").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });
  return false;
});

// scroll時のheader背景色の変化
$(function () {
  $(window).on("scroll", function () {
    var aboutTop = $(".js-scroll-top").offset().top;
    var scroll = $(window).scrollTop();
    if (scroll >= aboutTop) {
      $(".js-header").css("background-color", "#222222");
      $(".js-top-btn").css("display", "block");
    } else {
      $(".js-header").css("background-color", "transparent");
      $(".js-top-btn").css("display", "none");
    }
  });
});

// topへ戻るボタンがクリックされた時
$(function () {
  $(".js-top-btn").on("click", function (e) {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

// ローディング画面のフェードアウト
$(window).on("load", function () {
  // ページの全てのリソース読み込み完了でフェードアウト
  $("#loadingOverlay").fadeOut(300);
});
