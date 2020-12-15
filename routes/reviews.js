const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const reviewData = data.reviews;


// router.get("/", async(request, response) => {
//   try{
//     response.render('extras/reviewAll');
//   }
//   catch(e){
//     response.status(404).render('extras/error')
//   }
// });

router.get("/create", async(request, response) => {
  try{
    response.render('extras/reviewForm');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/:id", async(request, response) => {
  try{
    //console.log(request.params.id);
    let reviewSingle = await reviewData.get(request.params.id);
    //console.log(reviewSingle);
    response.render('extras/reviewSingle', {review: reviewSingle});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post("/review", async(request, response) => {
  try{
    //console.log(request.body)
    let newReview = await reviewData.create(request.body.reviewFormTitle, request.body.gameReviewed, 'stanley', request.body.reviewFormReview)
    console.log(newReview);
    response.redirect('/reviews');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post("/comment", async(request, response) => {

  //TO-DO

});

module.exports = router;
