const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const gameData = data.games;
const reviewData = data.reviews;

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

module.exports = router;
