const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const gameData = data.games;
const reviewData = data.reviews;
const bcrypt = require('bcryptjs');
const xss = require('xss');

router.post('/login', async(request,response) => {
  try {
    console.log(request.body)
    const { username, password } = request.body;
    let user = await userData.getByUser(xss(username));
    if (user) {
        let match = await bcrypt.compare(xss(password), user.password);
        if (match) {
          request.session.user = {username: user.userName, _id: user._id, gamingUser: user.gamingUser, bio: user.userBio, favoritedGames: user.favoritedGames, reviews: user.userPosts, likedPost: user.likedPost}
          var msg = "login successful!"
          console.log(msg)
          console.log(request.session.user);
          response.redirect('/profile')
          console.log('redirected');
        } else {
          var error2 = "Incorrect password!";
          console.log(error2)
          let games = await gameData.getAll()
          response.render('extras/dashboardMain', {game: games, error: error2});
        }
    } else {
      var error1 = "Username does not exist!";
      //console.log(error3)
      let games = await gameData.getAll()
      response.render('extras/dashboardMain', {game: games, error: error1});
    }
  }
  catch(e) {
        var msg1 = "Incorrect username or password"
        console.log(msg1);
        let games = await gameData.getAll()
        response.render('extras/dashboardMain', {game: games, error: msg1});
  }
});

router.get('/logout', async(request,response) => {
  try {
    request.session.destroy();
    var msg1 = "logged out"
    console.log(msg1);
    let games = await gameData.getAll()
    response.render('extras/dashboardMain', {game: games, status: false, msg: msg1});
  } catch (e) {
    console.log(e);
    response.status(404).render('extras/error')
  }

});

router.get("/:id", async(request, response) => {
  try{
    if (!request.session.user) {
      let game = await gameData.get(request.params.id)

      response.render('extras/game', {game: game, status: false})
    } else {
      let user = await userData.get(request.session.user._id);
      let game = await gameData.get(request.params.id)
      request.session.user.favoritedGames = user.favoritedGames
      let favorites = request.session.user.favoritedGames;
      for(i=0; i < favorites.length; i++) {
        if (favorites[i]._id.toString() == request.params.id.toString()) {
          //console.log(true);
          response.render('extras/game', {game: game, status: true, favoriteStatus: true});
          return true
       }
      }

  
      response.render('extras/game', {game: game, status: true, favoriteStatus: false});
    }
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
})

router.post('/search', async(request, response) => {
  try{
    if (!request.session.user) {
      let searchResultsGames = await gameData.search(xss(request.body.search));
      let searchResultsUsers = await userData.searchUsers(xss(request.body.search));
      let searchResultsPlatforms = await gameData.searchPlatform(xss(request.body.search));
      if(searchResultsGames.length === 0 && searchResultsUsers.length === 0 && searchResultsPlatforms.length === 0){
        response.render('extras/search', {error: 'No search results', status: 0})
      }
      else{
        response.render('extras/search', {
          resultsGames: searchResultsGames,
          resultsUsers: searchResultsUsers,
          resultsPlatforms: searchResultsPlatforms,
          status: 0
        })
      }
    } else {
      let searchResultsGames = await gameData.search(xss(request.body.search));
      let searchResultsUsers = await userData.searchUsers(xss(request.body.search));
      let searchResultsPlatforms = await gameData.searchPlatform(xss(request.body.search));
      if(searchResultsGames.length === 0 && searchResultsUsers.length === 0 && searchResultsPlatforms.length === 0){
        response.render('extras/search', {error: 'No search results', status: 1})
      }
      else{
        response.render('extras/search', {
          resultsGames: searchResultsGames,
          resultsUsers: searchResultsUsers,
          resultsPlatforms: searchResultsPlatforms,
          status: 1
        })
      }
    }

   

  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});




module.exports = router;
