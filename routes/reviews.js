const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const commentData = data.comments;
const userData= data.users;
const xss = require('xss');


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
    console.log(e);
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
    console.log(e);
    response.status(404).render('extras/error')
  }
});

router.post("/review", async(request, response) => {
  try{

    let newReview = await reviewData.create(xss(request.body.reviewFormTitle), xss(request.body.gameReviewed), xss(request.session.user.gamingUser), xss(request.body.reviewFormReview))
    //console.log(newReview);
    //console.log(request.session.user._id);
    //console.log(newReview._id)
    let insertReview = await userData.postCreated(xss(request.session.user._id), newReview);
    let user = await userData.get(request.session.user._id);
    //console.log(user.userPosts);
    request.session.user.reviews = user.userPosts
    response.redirect('/reviews');
  }
  catch(e){
    //console.log(e);

        console.log(e);
        var msg1 = "Please fill all of the fields in order to post a review."
        console.log(msg1);
        response.render('extras/reviewForm', { status: true, msg: msg1});
  }
});

router.post("/like", async(request, response) => {
  try{
    let review = await reviewData.get(request.body.review);

    if(request.body.status == '0')  {
      let unlike = await reviewData.clickedUnlike(review._id)
      let userUnlike = await userData.postUnliked(request.session.user._id, review._id)
      let user = await userData.get(request.session.user._id);
      request.session.user.likedPost = user.likedPost
    } else {
      let like = await reviewData.clickedLike(review._id)
      let userLike = await userData.postLiked(request.session.user._id, review._id)
      let user = await userData.get(request.session.user._id);
      request.session.user.likedPost = user.likedPost

    }
  }
  catch (e) {
    console.log(e);
    response.status(404).render('extras/error')
  }
});



router.post("/comment", async(request, response) => {
    try{
        let newComment = await commentData.create(xss(request.session.user._id), xss(request.body.newComment), xss(request.body.reviewId))
        let review = await reviewData.get(request.body.reviewId);
        response.render('extras/reviewSingle', {review: review, status: true});
      }
      catch(e){
        console.log(e);
        var msg1 = "Please write a comment in order to post."
        console.log(msg1);
        let review = await reviewData.get(request.body.reviewId);
        response.render('extras/reviewSingle', {review: review, status: true, msg: msg1});
      }

});

router.get("/:id", async(request, response) => {
  try{
    if (!request.session.user) {
      let reviewSingle = await reviewData.get(request.params.id);
      response.render('extras/reviewSingle', {review: reviewSingle, status: false});
    } else {
      let user = await userData.get(request.session.user._id);
      request.session.user.likedPost = user.likedPost
      let likes = request.session.user.likedPost;
      for(i=0; i < likes.length; i++) {
        if (likes[i].toString() == request.params.id.toString()) {
          let reviewSingle = await reviewData.get(request.params.id);
          response.render('extras/reviewSingle', {review: reviewSingle, status: true, likeStatus: true});
          return true
       }
      }

      let reviewSingle = await reviewData.get(request.params.id);
      response.render('extras/reviewSingle', {review: reviewSingle, status: true, likeStatus: false});
    }
  }
  catch(e){
    console.log(e)
    response.status(404).render('extras/error')
  }
});


module.exports = router;
