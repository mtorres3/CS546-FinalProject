const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const comments = collections.comments;
const reviews = collections.reviews;
const userData = require('./users');

async function create(userId, commentContent, reviewId) {
  

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
    //console.log(reviewName);

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
