const express = require('express');
const router = express.Router();
const data = require('../data');
const gameData = data.games;
const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const reviews = collections.reviews;
const reviewData = data.reviews;

router.get("/", async(request, response) => {
  try{
    //response.render('extras/reviewForm');
    response.render('extras/dashboardMain');
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

router.get("/:id", async(request, response) => {
  try{
    const idInfo = String(parseInt(request.params.id, 10));
    const game = await gameData.get(idInfo);
    const info = {
        game: game
    };
    console.log(info);
    //response.render('extras/reviewForm');
    //response.render('extras/game', game);
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});


module.exports = router;
