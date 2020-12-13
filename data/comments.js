const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const comments = collections.comments;

async function create(dateCreated, user, commentContent) {
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

  	const newComment = {
   // _id: _id,
    dateCreated: dateCreated,
    user: user,
    commentContent: commentContent
    };

  	const commentCollection = await comments();
    const insertInfo = await commentCollection.insertOne(newComment);

    const x = insertInfo.insertedId.toString();
    //console.log("the type of x is: " + typeof x);

    return await get(x);
}

async function getAll(){

  const commentCollection = await comments();

  const allComments = await commentCollection.find({}).toArray();

  return allComments;
}

async function get(id){

  const commentCollection = await comments();

  if(!id || typeof id != 'string' || id.trim() === "") throw 'ID cannot be empty and must be a string'
  if(!commentCollection) throw 'No movies in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const commentId = await commentCollection.findOne({ _id: ObjectId(id)});
  if (commentId === null) throw 'No movie with that id';

  return commentId;
}

async function remove(id){

  const commentCollection = await comments();

  if(!id || typeof id != 'string' || id.trim() === "") throw 'ID cannot be empty and must be a string'
  if(!commentCollection) throw 'No movies in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await commentCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Movie id could not be found'

  return `${deleted} has been deleted`;
}

module.exports = {remove, get, getAll, create};