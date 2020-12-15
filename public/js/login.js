(function ($) {
  var loginForm = $('#loginForm');
  var divLogin = $('#loginFormDiv');

    $(document).ready(function(){
      $("#login").on("click", function(e) {
        e.preventDefault();
        console.log("button clicked");
        if (divLogin.is(":hidden")) {
          divLogin.show();
        } else {
          divLogin.hide();
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
          console.log("login sucess")
        },
        error: function() {
          console.log('process error');
        },
      })

    })

})(window.jQuery);
