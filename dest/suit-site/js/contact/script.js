$(function () {
  const $form   = $('.contact__form');
  const $submit = $form.find('input[type="submit"]');

  // エラーメッセージ
  function showError($field, msg){
    const $wrap = $field.closest('.form__input, .form__textarea, .radio__input');
    let $err = $wrap.find('.form__error');
    if(!$err.length){ $err = $('<p class="form__error" role="alert"></p>').appendTo($wrap); }
    $wrap.addClass('is-error');
    $err.text(msg).show();
    $field.attr('aria-invalid', 'true');
  }
  function clearError($field){
    const $wrap = $field.closest('.form__input, .form__textarea, .radio__input');
    $wrap.removeClass('is-error').find('.form__error').hide();
    $field.removeAttr('aria-invalid');
  }

    // 入力値チェック
  function validate(){
    let ok = true;

    // 名前
    const $name = $form.find('input[name="名前"]');
    const nameVal = $name.val().trim();
    if(!nameVal){
      showError($name, '※お名前を入力してください。'); ok = false;
    } else {
      clearError($name);
    }

    // メール
    const $email = $form.find('input[name="メールアドレス"]');
    const emailVal = $email.val().trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailVal){
      showError($email, '※メールアドレスを入力してください。'); ok = false;
    } else if(!emailRe.test(emailVal)){
      showError($email, '※メールアドレスの形式が正しくありません。'); ok = false;
    } else {
      clearError($email);
    }

    // お問い合わせの種類（ラジオ）
    const $radios = $form.find('input[name="お問い合わせの種類"]');
    if(!$radios.filter(':checked').length){
      // グループ全体のラッパーを基準にメッセージ
      showError($radios.eq(0), '※お問い合わせの種類を選択してください。'); ok = false;
    } else {
      clearError($radios.eq(0));
    }

    // お問い合わせ内容（本文）
    const $msg = $form.find('textarea[name="お問い合わせ内容"]');
    const msgVal = $msg.val().trim();
    if(!msgVal){
      showError($msg, '※お問い合わせ内容を入力してください。'); ok = false;
    } else if(msgVal.length < 10){
      showError($msg, '※10文字以上で入力してください。'); ok = false;
    } else {
      clearError($msg);
    }

    return ok;
  }
  //  初期値としてerrorを表示
   validate()

  // ボタンの活性/非活性を決める
  function isFormValid(){
    const name   = $form.find('input[name="名前"]').val().trim();
    const email  = $form.find('input[name="メールアドレス"]').val().trim();
    const radios = $form.find('input[name="お問い合わせの種類"]');
    const msg    = $form.find('textarea[name="お問い合わせ内容"]').val().trim();
    const emailRe= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !!(name && emailRe.test(email) && radios.filter(':checked').length && msg.length >= 5);
  }

    // 入力中にエラーを消す
  $form.on('input blur', 'input[name="名前"], input[name="メールアドレス"], textarea[name="お問い合わせ内容"]', function(){
    validate(); //（必要なら単項目バリデーションにしてもOK）
  });
  $form.on('change', 'input[name="お問い合わせの種類"]', function(){
    validate();
  });

  function updateSubmitState(){
    const ok = isFormValid();
    $submit.prop('disabled', !ok).attr('aria-disabled', !ok);
  }

  // 初期状態：押せない
  updateSubmitState();

  // 入力のたびに判定
  $form.on('input change', 'input, textarea', updateSubmitState);

  // 送信時：厳密チェック。NGなら送信させない
  $form.on('submit', function(e){
    if(!validate()){
      e.preventDefault();
      updateSubmitState();
      // 最初のエラーへ
      const $first = $form.find('.is-error').first();
      const $fi = $first.find('input, textarea').first();
      if($first.length) $first[0].scrollIntoView({behavior:'smooth', block:'center'});
      if($fi.length) $fi.trigger('focus');
    }else{
      // 二重送信防止（任意）
      $submit.prop('disabled', true).val('送信中…');
    }
  });
});