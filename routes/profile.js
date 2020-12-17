const express = require('express');
const router = express.Router();
const data = require('../data');
const gameData = data.games;
const userData = data.users;
const bcrypt = require('bcryptjs');
const xss = require('xss');

router.get("/", async(request, response) => {
   try{
     //console.log(request.session.user.reviews)
     //console.log(request.session.user.favoritedGames)
     response.render('extras/profile',  {gamingUser: request.session.user.gamingUser, bio: request.session.user.bio, favoritedGames: request.session.user.favoritedGames, reviews: request.session.user.reviews, status: true});
   }
  catch(e){
   console.log(e);
   response.status(404).render('extras/error')
  }
    });

router.get("/edit", async(request, response) => {
  try{
    response.render('extras/profileEdit', {status: true});
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
    //response.render('extras/profile', {gamingUser: request.session.user.gamingUser, bio: request.session.user.bio, favoritedGames: request.session.user.favoritedGames, reviews: request.session.user.reviews, status: true});
  }
});

router.post("/favorite", async(request, response) => {

  try{
    //console.log(request.body);
    let game = await gameData.get(request.body.gameId)
    //console.log(request.body.favStatus.toString() === 'false')
    if (request.body.favStatus.toString() === 'false') {
      //console.log("here")
      let newFav = await userData.favoritedGame(game, request.session.user._id)
      //console.log(newFav)
      request.session.user.favoritedGames = newFav;
      response.render('extras/game', {game: game, status: true, favoriteStatus: true})
    } else {
      let newFav = await userData.unfavoritedGame(game, request.session.user._id)
      //console.log(newFav)
      request.session.user.favoritedGames = newFav;
      response.render('extras/game', {game: game, status: true, favoriteStatus: false})
    }

    }
    catch(e){
      console.log(e)
      response.status(404).render('extras/error')
    }

});
router.post('/editForm', async(request, response) => {
  try{
    //console.log(request.body);
    let rename = await userData.rename(xss(request.session.user._id), xss(request.body.displayName), xss(request.body.profileBio))
    //console.log(rename);
    request.session.user.gamingUser = rename.gamingUser;
    request.session.user.bio = rename.userBio;
    //console.log(rename.userPosts)
    //response.redirect('/profile');
    response.render('extras/profile', {gamingUser: xss(request.session.user.gamingUser), bio: xss(request.session.user.bio), favoritedGames: xss(request.session.user.favoritedGames), reviews: xss(rename.userPosts), status: true})
  }
  catch(e){
    console.log(e);
    //response.status(404).render('extras/error')
    response.render('extras/profile', {gamingUser: request.session.user.gamingUser, bio: request.session.user.bio, favoritedGames: request.session.user.favoritedGames, reviews: request.session.user.reviews, status: true});
  }
})




module.exports = router;
