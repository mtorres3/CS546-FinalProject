const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const comments = collections.comments;
const reviews = collections.reviews;
const userData = require('./users');

async function create(userId, commentContent, reviewId) {
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

  if (!userId) throw 'A user has not been provided';
  if (!commentContent) throw 'Content has not been provided';

  if (typeof userId !== 'string') throw 'userId must be a string';
  if (typeof commentContent !== 'string') throw 'commentContent must be a string';

  if (!userId.trim()) throw 'userId is an empty string';
  if (!commentContent.trim()) throw 'commentContent is an empty string'

    userId.trim();
    commentContent.trim();

    let dateCreated = new Date();

    let username = await userData.get(userId);

  	const newComment = {
   // _id: _id,
    dateCreated: dateCreated,
    commentUser: userId,
    commentUsername: username,
    commentContent: commentContent,
    review: reviewId
    };

    const reviewsCollection = await reviews();
    const reviewName = await reviewsCollection.findOne({ _id: ObjectId(reviewId)});
    //console.log(reviewName);
    reviewName.comments.push(newComment);
    const update = await reviewsCollection.updateOne({ _id: ObjectId(reviewId)},{$set: reviewName});
    //reviewName.comments.push(newComment);
    //console.log(reviewName);

  	const commentCollection = await comments();
    const insertInfo = await commentCollection.insertOne(newComment);

    const x = insertInfo.insertedId.toString();
    //console.log("the type of x is: " + typeof x);
    //reviewsData.commentCreated(commentId, postId)
    return await get(x);
}

async function getAll(){

  const commentCollection = await comments();

  const allComments = await commentCollection.find({}).toArray();

  return allComments;
}

async function get(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const commentCollection = await comments();

  if(!commentCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const commentId = await commentCollection.findOne({ _id: ObjectId(id)});
  if (commentId === null) throw 'No game with that id';

  return commentId;
}

async function remove(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const commentCollection = await comments();

  if(!commentCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await commentCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Game id could not be found'

  return true;
}

module.exports = {remove, get, getAll, create};
