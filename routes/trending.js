const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const gameData = data.games;
const reviewData = data.reviews;

router.get("/", async(request, response) => {
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
    console.log(e)
    response.status(404).render('extras/error')
  }
});
module.exports = router;
