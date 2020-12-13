const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const gameData = data.games;
const reviewData = data.reviews;

//need to sort games by most liked, then display limit 3 here
router.get("/", async(request, response) => {
  try{
    response.render('extras/trending');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

module.exports = router;
