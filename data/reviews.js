const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const reviews = collections.reviews;

async function create(title, gameName, user, postContent) {
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

    let datePublished = new Date();
/*
  if (!Array.isArray(genre)) throw 'genre must be provided as an array';
  if (!genre.length>0) throw 'genre has no inputs in it'
    for (i=0; i<genre.length;i++){
      if (!genre[i].trim()) throw 'one of the elements in genre is an empty string';
      if (typeof genre[i] !== 'string') throw 'one of the elements in genre is not a string';
      genre[i].trim();
    }

  if (!Array.isArray(platforms)) throw 'platforms must be provided as an array';
  if (!platforms.length>0) throw 'platforms has no inputs in it'
    for (i=0; i<platforms.length;i++){
      if (!platforms[i].trim()) throw 'one of the elements in platforms is an empty string';
      if (typeof platforms[i] !== 'string') throw 'one of the elements in platforms is not a string';
      platforms[i].trim();
    }
*/
  	const newReview = {
   // _id: _id,
    title: title,
    gameName: gameName,
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

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

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

  if (!postId) throw 'id has not been provided';
  if (typeof postId !== 'string') throw 'id must be a string';
  if (!postId.trim()) throw 'id is an empty string';
  postId.trim();

    let likedPost = get(postId);
    likedPost.likes++;
    return true;
}

async function clickedDislike(postId){

  if (!postId) throw 'id has not been provided';
  if (typeof postId !== 'string') throw 'id must be a string';
  if (!postId.trim()) throw 'id is an empty string';
  postId.trim();

    let dislikedPost = get(postId);
    dislikedPost.dislikes++;
    return true;
}

async function commentCreated(commentId, postId){

  if (!postId) throw 'postId has not been provided';
  if (typeof postId !== 'string') throw 'postId must be a string';
  if (!postId.trim()) throw 'postId is an empty string';
  postId.trim();

  if (!commentId) throw 'commentId has not been provided';
  if (typeof commentId !== 'string') throw 'commentId must be a string';
  if (!commentId.trim()) throw 'commentId is an empty string';
  commentId.trim();

  let reviewCommentedOn = get(postId);
  reviewCommentedOn.comments.push(commentId);
  return true;
}

async function sortLikes(){
  let reviewCollection = await reviews();
  let postsArray = await getAll();
  //console.log(postsArray);
  let sortedArray = postsArray.sort((a,b)=> a.likes-b.likes);
  //console.log(sortedArray);
  let topThree = await reviewCollection.find({}).sort((a,b)=> a.likes-b.likes).limit(3).toArray();
  //console.log(topThree);
  return topThree;
}

module.exports = {remove, get, getAll, create, clickedLike, clickedDislike, commentCreated, sortLikes};
