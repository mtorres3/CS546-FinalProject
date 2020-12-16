const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const gameData = data.games;
const reviewData = data.reviews;
const bcrypt = require('bcryptjs');
/*
router.get("/", async(request, response) => {
  try{
    if (!request.session.user) {
      let games = await gameData.getAll()
      response.render('extras/dashboardMain', {game: games, status:false});
    } else {
      let games = await gameData.getAll()
      response.render('extras/dashboardMain', {game: games, status:true});
    }
  }
  catch(e){
    console.log(e)
    response.status(404).render('extras/error')
  }
});
*/
/*
router.get("/profile", async(request, response) => {
  try{
    console.log(request.session.user.reviews)
    response.render('extras/profile',  {gamingUser: request.session.user.gamingUser, bio: request.session.user.bio, favoritedGames: request.session.user.favoritedGames, reviews: request.session.user.reviews, status: true});
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});
*/
/*
router.get("/reviews", async(request, response) => {
  try{
    if (!request.session.user) {
      let reviews = await reviewData.getAll();
      response.render('extras/reviewAll', {review: reviews, status: false});
    } else {
      let reviews = await reviewData.getAll();
      response.render('extras/reviewAll', {review: reviews, status: true});
    }
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});
*/
/*
router.get("/trending", async(request, response) => {
  try{
    if (!request.session.user) {
      let topThree = await reviewData.sortLikes();
      //console.log(topThree);
      response.render('extras/trending', {top: topThree, status:false});
    } else {
      let topThree = await reviewData.sortLikes();
      //console.log(topThree);
      response.render('extras/trending', {top: topThree, status: true});
    }
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});
*/
router.post('/login', async(request,response) => {
  console.log(request.body)
  const { username, password } = request.body;
  let user = await userData.getByUser(username);
  if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        request.session.user = {username: user.userName, _id: user._id, gamingUser: user.gamingUser, bio: user.userBio, favoritedGames: user.favoritedGames, reviews: user.userPosts}
        var msg = "login succesful!"
        console.log(msg)
        console.log(request.session.user);
        response.redirect('/profile')
        console.log('redirected');
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
      //response.render('extras/reviewForm');
      //response.render('extras/game', game);
      response.render('extras/game', {game: game, status: false})
    } else {
      let game = await gameData.get(request.params.id)
      //response.render('extras/reviewForm');
      //response.render('extras/game', game);
      response.render('extras/game', {game: game, status: true})
    }
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
})

router.post('/search', async(request, response) => {
  try{
    console.log(request.body.search)
    let searchResultsGames = await gameData.search(request.body.search);
    console.log(searchResultsGames);
    //let searchResultsUsers = await userData.search(request.body.search);
    response.render('extras/search', {resultsGames: searchResultsGames, 
      //resultsUsers: searchResultsUsers
    })
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});




module.exports = router;
