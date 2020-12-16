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

router.post('/editForm', async(request, response) => {
  try{
    //console.log(request.body);
    let rename = await userData.rename(request.session.user._id, request.body.displayName, request.body.profileBio)
    console.log(rename);
    request.session.user.gamingUser = rename.gamingUser;
    request.session.user.bio = rename.userBio;
    //response.redirect('/profile');
    response.render('extras/profile', {gamingUser: request.session.user.gamingUser, bio: request.session.user.bio, favoritedGames: request.session.user.favoritedGames, reviews: request.session.user.userPosts, status: true})
  }
  catch(e){
    response.status(404).render('extras/error')
  }
})


module.exports = router;
