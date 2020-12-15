const express = require('express');
const router = express.Router();
const data = require('../data');
const gameData = data.games;
const reviewData = data.reviews;
const userData = data.users;


router.get("/", async(request, response) => {
  try{
    let games = await gameData.getAll()
    response.render('extras/dashboardMain', {game: games});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/profile", async(request, response) => {
  try{
    response.render('extras/profile');
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});

router.get("/reviews", async(request, response) => {
  try{
    let reviews = await reviewData.getAll();
    response.render('extras/reviewAll', {review: reviews});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/trending", async(request, response) => {
  try{
    let topThree = await reviewData.sortLikes();
    //console.log(topThree);
    response.render('extras/trending', {top: topThree});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post('/search', async(request, response) => {
  try{
    //console.log(request.body.search)
    let searchResultsGames = await gameData.search(request.body.search);
    //console.log(searchResultsGames);
    let searchResultsUsers = await userData.search(request.body.search);
    response.render('extras/search', {
      resultsGames: searchResultsGames,
      resultsUsers: searchResultsUsers
    })
  }
  catch(e){
    response.status(404).render('extras/error')
  }
})

router.get("/:id", async(request, response) => {
  try{
    let game = await gameData.get(request.params.id)
    //response.render('extras/reviewForm');
    //response.render('extras/game', game);
    response.render('extras/game', {game: game})
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});


module.exports = router;
