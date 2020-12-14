const usersData = require('.../data/users')
const collections = require(".../config/mongoCollections");
const users = collections.users;
(function ($) {
  var loginForm = $('#loginForm');


    loginForm.submit(function (event) {
      event.preventDefault();
      var user = $('#user'),
      pw = $('#pw');
      $.ajax({
        url: "/profile/login",
        type:"POST",
        data: {
          username: user.val(),
          password:pw.val()
        },
        success: function(data) {
          console.log("login sucess")
        },
        error: function() {
          console.log('process error');
        },
      })

    })

})(window.jquery)
