const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');

router.get("/", async(request, response) => {
  try{
    response.render('extras/profile');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/edit", async(request, response) => {
  try{
    response.render('extras/profileEdit');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});


router.post('/login', async(request,response) => {

  const { username, password } = request.body
  console.log(request.body)
  let user = await userData.getByUser(username);
  if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        request.session.user = {username: user.userName, _id: user._id}
        var msg = "login succesful!"
        console.log(msg)
      } else {
        var error2 = "Incorrect password!";
        console.log(error2)
        //res.render('user/login', {error: error2});
      }
  } else {
    var error1 = "Username does not exist!";
    console.log(error3)
    //res.render('user/login', {error: error1});
  }
});

router.post('/logout', async(request,response) => {
  request.session.destroy();
  var msg1 = "logged out"
  console.log(msg1);

});

module.exports = router;
