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
      $(".like-Unlike").on("click", function(e) {
        e.preventDefault();
        var review = $(this).data('review');
        if ($(this).html() == "Like") {
          $(this).html('Unlike');
          var review = $(this).data('review');
          console.log(review);

          $.ajax({
            type: 'POST',
            url: '/reviews/like',
            data: {
              'review': review,
              'status': 1
            }
          });
          console.log($('#result').text())
          var num1 = parseInt($('#result').text()) + 1
          $('#result').text(num1)
      }
      else {
          $(this).html('Like');
          $.ajax({
            type: 'POST',
            url: '/reviews/like',
            data: {
              'review': review,
              'status': 0
            }
          });
          console.log($('#result').text())
          var num1 = parseInt($('#result').text()) - 1
          $('#result').text(num1)
      }
      return false;
    });
  });


})(window.jQuery);
