const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');

 //router.get("/", async(request, response) => {
//   try{
//     response.render('extras/profile');
//  }
//  catch(e){
//    console.log(e);
//   response.status(404).render('extras/error')
//  }
 //   });

router.get("/edit", async(request, response) => {
  try{
    response.render('extras/profileEdit');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});



router.post('/logout', async(request,response) => {
  request.session.destroy();
  var msg1 = "logged out"
  console.log(msg1);

});

module.exports = router;
