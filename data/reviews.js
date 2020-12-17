const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const reviews = collections.reviews;

async function create(title, gameName, user, postContent) {

  //var likeCount = 0;
  //var dislikeCount = 0;
  let commentsArray= [];

  if (!title) throw 'A title has not been provided';
  if (!user) throw 'A user has not been provided';
  if (!gameName) throw 'A game name has not been provided';
  if (!postContent) throw 'Post content has not been provided';

  if (typeof title !== 'string') throw 'title must be a string';
  if (typeof user !== 'string') throw 'user must be a string';
  if (typeof gameName !== 'string') throw 'game name must be a string';
  if (typeof postContent !== 'string') throw 'postContent must be a string';

  if (!title.trim()) throw 'title is an empty string';
  if (!gameName.trim()) throw 'game name is an empty string';
  if (!user.trim()) throw 'user is an empty string';
  if (!postContent.trim()) throw 'postContent is an empty string';

    title.trim();
    user.trim();
    gameName.trim();
    postContent.trim();
    let numLikes = 0;
    let datePublished = new Date();

  	const newReview = {
   // _id: _id,
    title: title,
    gameName: gameName,
    user: user,
    postContent: postContent,
    datePublished: datePublished,
    likes: numLikes,
    comments: commentsArray
    };

  	const reviewCollection = await reviews();
    const insertInfo = await reviewCollection.insertOne(newReview);

    const x = insertInfo.insertedId.toString();
    //console.log("the type of x is: " + typeof x);

    return await get(x);
}

async function getAll(){

  const reviewCollection = await reviews();

  const allReviews = await reviewCollection.find({}).toArray();

  return allReviews;
}

async function get(id){
  /*
  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'i must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();
  */
  const reviewCollection = await reviews();

  const reviewId = await reviewCollection.findOne({ _id: ObjectId(id)});
  if (reviewId === null) throw 'No game with that id';

  return reviewId;
}

async function remove(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const reviewCollection = await reviews();

  if(!reviewCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await reviewCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Game id could not be found'

  return true;
}

async function clickedLike(postId){
    const reviewCollection = await reviews();
    let likedPost = await get(postId);
    //console.log(likedPost);
    let newLikes = likedPost.likes + 1;
    //console.log(newLikes);
    let newProfile = {
      likes: newLikes,
    };
    const update = await reviewCollection.updateOne({ _id: postId},{$set: newProfile});
    if (!update.matchedCount && !update.modifiedCount)
        throw 'Update failed';
}
async function clickedUnlike(postId){
    const reviewCollection = await reviews();
    let likedPost = await get(postId);
    let newLikes = likedPost.likes- 1;
    //console.log(newLikes);
    let newProfile = {
      likes: newLikes,
    };
    const update = await reviewCollection.updateOne({ _id: postId},{$set: newProfile});
    if (!update.matchedCount && !update.modifiedCount)
        throw 'Update failed';
}

async function commentCreated(postId, set){

  const reviewCollection = await reviews();
  let review = await get(postId);
  let comments = review.commentsArray;
  posts.push(set);
  //console.log(comments);
  let newReview = {
    comments: comments,
  };
  const update = await reviewCollection.updateOne({ _id: review._id},{$set: newReview});
  if (!update.matchedCount && !update.modifiedCount)
      throw 'Update failed';
}

async function sortLikes(){
  let reviewCollection = await reviews();
  //console.log(reviewCollection);
  let postsArray = await getAll();
  //console.log(postsArray);
  let sortedArray = postsArray.sort((a,b)=> b.likes-a.likes);
  //console.log(sortedArray);
  let topThree = await reviewCollection.find({}).sort((a,b)=> a.likes-b.likes).limit(3).toArray();
  //console.log(topThree);
  return sortedArray;
}

async function sortDate(){
  let reviewCollection = await reviews();
  let postsArray = await getAll();
  //console.log(postsArray);
  let sortedArray = postsArray.sort((a,b)=> a.likes-b.likes);
  //console.log(sortedArray);
  let topThree = await reviewCollection.find({}).sort((a,b)=> a.datePublished-b.datePublished).toArray();
  //console.log(topThree);
  return topThree;
}

async function sortUser(){
  let reviewCollection = await reviews();
  let postsArray = await getAll();
  //console.log(postsArray);
  let sortedArray = postsArray.sort((a,b)=> a.likes-b.likes);
  //console.log(sortedArray);
  let topThree = await reviewCollection.find({}).sort((a) => a.user).toArray();
  //console.log(topThree);
  return topThree;
}

module.exports = {remove, get, getAll, create, clickedLike, clickedUnlike, commentCreated, sortLikes, sortDate, sortUser};
