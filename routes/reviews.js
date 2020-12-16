const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const commentData = data.comments;
const userData= data.users;



router.get("/", async(request, response) => {
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


router.get("/create", async(request, response) => {
  try{
    if (!request.session.user) {
      console.log("you cannot post")
    } else {
      response.render('extras/reviewForm', {status: true});
    }
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post("/review", async(request, response) => {
  try{
    console.log(request.body)
    console.log(request.session.user.gamingUser)
    let newReview = await reviewData.create(request.body.reviewFormTitle, request.body.gameReviewed, request.session.user.gamingUser, request.body.reviewFormReview)
    console.log(newReview);
    console.log(request.session.user._id);
    console.log(newReview._id)
    let insertReview = await userData.postCreated(request.session.user._id, newReview);
    let user = await userData.get(request.session.user._id);
    console.log(user.userPosts);
    request.session.user.reviews = user.userPosts
    response.redirect('/reviews');
  }
  catch(e){
    console.log(e);
    response.status(404).render('extras/error')
  }
});

router.post("/comment", async(request, response) => {

    try{
        //console.log(request.body)
        let newComment = await commentData.create(request.body.commentData, request.body.userId)
        console.log(newComment);
        //response.redirect('/reviews');
      }
      catch(e){
        response.status(404).render('extras/error')
      }

});

router.get("/:id", async(request, response) => {
  try{
    if (!request.session.user) {
      //console.log(request.params.id);
      let reviewSingle = await reviewData.get(request.params.id);
      //console.log(reviewSingle);
      response.render('extras/reviewSingle', {review: reviewSingle, status: false});
    } else {
      //console.log(request.params.id);
      let reviewSingle = await reviewData.get(request.params.id);
      //console.log(reviewSingle);
      response.render('extras/reviewSingle', {review: reviewSingle, status: true});
    }
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});
/*
router.get('/sort', async(request, response) => {
  try{
    console.log(request.body);

    if(request.body.dateFilter === true && request.body.userFilter === false){
      let reviews = await reviewData.sortDate();
    }
    else if(request.body.dateFilter === false && request.body.userFilter === true){
      let reviews = await reviewData.sortUser();
    }
    else{
      let reviews = await reviewData.getAll();
    }

    //response.render('extras/reviewAll', {review: reviews});
  }
  catch(e){
    response.status(404).render('extras/error')
  }
})
*/


module.exports = router;
