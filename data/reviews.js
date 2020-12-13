const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const reviews = collections.reviews;

async function create(title, user, postContent, datePublished) {
  //If params are not provided at all, the method should throw.
	/*if (!title || !plot || !rating || !runtime || !genre || !cast || !info) {
        throw "You must provide all of the parameters (title, plot, rating, runtime, genre, cast, info) for your movie";
  }
  //If title, plot, rating, runtime and genre are not strings, the method should throw.
	if (typeof title !== 'string' || typeof plot !== 'string' || typeof rating !== 'string' || typeof runtime !== 'string' || typeof genre !== 'string') {
        throw "The parameters (title, plot, rating, runtime and genre) must be strings";
  }
  //If cast is not an array and if it does not have at least one element in it that is a valid string, or are empty strings the method should throw
  if (!Array.isArray(cast)) {
    throw "The cast parameter is not a valid array";
  }
  //If info is not an object, the method should throw.
  if (typeof info !== "object") {
    throw "The info parameter is not of type object"
  }
  //If director is not a valid string, throw.
  if (typeof info.director !== 'string' || info.director === undefined) {
    throw "The director parameter is not a valid string"
  }
  //If yearReleased in not a 4 digit number or if it is not provided, throw.
  if (typeof info.yearReleased !== 'number' || info.yearReleased.toString().length !== 4 || info.yearReleased === undefined) {
    throw "The year released parameter is not a valid number"
  }
  const today = new Date()
  //If yearReleased is < 1930 or > current year + 5 years, the method should throw.
  if (info.yearReleased < 1930 || info.yearReleased > today.getFullYear()+5) {
    throw "The year released parameter is not a number between 1930 and curr year + 5"
  }*/

  //var likeCount = 0;
  //var dislikeCount = 0;
  let commentsArray= [];

  	const newReview = {
   // _id: _id,
    title: title,
    user: user,
    postContent: postContent,
    datePublished: datePublished,
    likes: 0,
    dislikes: 0,
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

  const reviewCollection = await reviews();

  if(!id) throw 'ID cannot be empty'
  if(!reviewCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const reviewId = await reviewCollection.findOne({ _id: ObjectId(id)});
  if (reviewId === null) throw 'No game with that id';

  return reviewId;
}

async function remove(id){

  const reviewCollection = await reviews();

  if(!id) throw 'ID cannot be empty'
  if(!reviewCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await reviewCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Game id could not be found'

  return `${deleted} has been deleted`;
}

async function clickedLike(postId){
    let likedPost = get(postId);
    likedPost.likes++;
    return true;
}

async function clickedDislike(postId){
    let dislikedPost = get(postId);
    dislikedPost.dislikes++;
    return true;
}

module.exports = {remove, get, getAll, create, clickedLike, clickedDislike};
