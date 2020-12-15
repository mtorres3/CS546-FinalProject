(function ($) {
  var loginForm = $('#loginForm');
  var divLogin = $('#loginFormDiv');
  var mainContent = $('#mainContent')

    $(document).ready(function(){
      $("#login").on("click", function(e) {
        e.preventDefault();
        console.log("button clicked");
        if (divLogin.is(":hidden")) {
          divLogin.show();
          mainContent.hide();
        } else {
          divLogin.hide();
          mainContent.show();
        }

      });
    });

    loginForm.submit(function (event) {
      event.preventDefault();
      var user = $('#username'),
      pw = $('#password');
      console.log(user.val())
      console.log(pw.val())
      $.ajax({
        url: "/profile/login",
        type:"POST",
        data: JSON.stringify({
          username: user.val(),
          password: pw.val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function(data) {
          console.log("login success")
          divLogin.hide();
          mainContent.show();
        },
        error: function() {
          console.log('process error');
        },
      })

    })

})(window.jQuery);
