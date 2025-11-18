// swiper
const mySwiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// serviceセクションの画像の切り替え
$(function () {
  $(".js-service-title-tab").on("click", function () {
    const target = $(this).data("target");

    $(".js-service-title-tab").removeClass("is-active");
    $(this).addClass("is-active");
    $(".js-service__cards").each(function () {
      $(this).toggleClass("is-active", $(this).data("list") === target);
    });
    return false;
  });
});

// drawer、headerのリンクをクリックしたときの各セクションへの遷移
$(function () {
  let isOpen = false;
  let scrollPosition = 0;

  $(".js-drawer__item a,.js-drawer, .js-hamberger").on("click", function (e) {
    e.stopPropagation();

    // drawerの開閉
    $(".js-hamberger").toggleClass("is-active");
    $(".js-drawer").fadeToggle();

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

    // 各sectionへの遷移（drawer内のリンクがクリックされた場合）
    var targetId = $(this).attr("href");
    if (targetId && targetId.indexOf("#") !== -1) {
      var idName = targetId.replace("#", "");
      var target = $("." + idName);
      if (target.length) {
        // drawerを閉じてからスクロールするため、少し遅延させる
        setTimeout(function () {
          var headerHeight = $(".js-header").outerHeight();
          var targetScrollPosition = target.offset().top - headerHeight;
          $("html, body").animate(
            {
              scrollTop: targetScrollPosition,
            },
            600
          );
        }, 100);
      }
    }
    return false;
  });
});

// .js-header__linkがクリックされたとき
$(function () {
  $(".js-header__link").on("click", function (e) {
    e.stopPropagation();

    // 各sectionへの遷移
    var targetId = $(this).attr("href");
    var idName = targetId.replace("#", "");
    var target = $("." + idName);
    if (target.length) {
      var headerHeight = $(".js-header").outerHeight();
      var scrollPosition = target.offset().top - headerHeight;
      $("html, body").animate(
        {
          scrollTop: scrollPosition,
        },
        600
      );
    }
    return false;
  });
});

// 他ページからアクセスされたときの各セクションへの遷移
window.onload = function () {
  var id = window.location.hash;
  var idName = id.replace("#", "");
  if (idName) {
    var className = $("." + idName);
    if (className.length) {
      var headerHeight = $(".js-header").outerHeight() || 0;
      var scrollPosition = className.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: scrollPosition }, 600);
    }
  }
};

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
