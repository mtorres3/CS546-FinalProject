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
})(window.jQuery);
