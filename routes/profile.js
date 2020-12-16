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
    response.render('extras/profileEdit', {status: true});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post("/favorite", async(request, response) => {

  try{
      
      //let newFav = await userData.favoritedGame(request.body.gameId, request.session.user._id)
      console.log(request.body);
      //console.log(newFav);
      //response.redirect('/reviews');
    }
    catch(e){
      console.log(e)
      response.status(404).render('extras/error')
    }

});


module.exports = router;
