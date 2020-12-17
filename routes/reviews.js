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

router.post("/like", async(request, response) => {
  try{
    let review = await reviewData.get(request.body.review);
    console.log(request.body);

    if(request.body.status == '0')  {
      let unlike = await reviewData.clickedUnlike(review._id)
      let userUnlike = await userData.postUnliked(request.session.user._id, review._id)
      let user = await userData.get(request.session.user._id);
      console.log(user.likedPost);
      request.session.user.likedPost = user.likedPost
      console.log(request.session.user.likedPost)
      console.log("unliked")
    } else {
      let like = await reviewData.clickedLike(review._id)
      let userLike = await userData.postLiked(request.session.user._id, review._id)
      let user = await userData.get(request.session.user._id);
      console.log(user.likedPost);
      request.session.user.likedPost = user.likedPost
      console.log(request.session.user.likedPost)
      console.log("liked")
    }
  }
  catch (e) {
    console.log(e);
  }
});



router.post("/comment", async(request, response) => {
    try{
        //console.log(request.body)
        let newComment = await commentData.create(request.session.user._id, request.body.newComment, request.body.reviewId)
        console.log(newComment);
        let review = await reviewData.get(request.body.reviewId);
        response.render('extras/reviewSingle', {review: review});
      }
      catch(e){
        console.log(e);
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
      let user = await userData.get(request.session.user._id);
      console.log(user.likedPost);
      request.session.user.likedPost = user.likedPost
      console.log(request.session.user.likedPost)
      let likes = request.session.user.likedPost;
      console.log(likes[0]);
      //console.log(likes[0].toString() === request.params.id.toString())
      for(i=0; i < likes.length; i++) {
        if (likes[i].toString() == request.params.id.toString()) {
          let reviewSingle = await reviewData.get(request.params.id);
          console.log(true);
          response.render('extras/reviewSingle', {review: reviewSingle, status: true, likeStatus: true});
          return true
       }
      }

      //console.log(request.params.id);
      console.log(false);
      let reviewSingle = await reviewData.get(request.params.id);
      let comments = await commentData.get
      //console.log(reviewSingle);
      response.render('extras/reviewSingle', {review: reviewSingle, status: true, likeStatus: false});
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
