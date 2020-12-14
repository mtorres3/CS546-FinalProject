const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const users = collections.users;
const games = require("./games");
const bcrypt = require('bcryptjs');

async function create(userName, password, gamingUser, userBio) {
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

  let favoritedGames = [];
  let userPosts = [];
  var hashPW = await bcrypt.hash(password, 10);
  console.log(hashPW);


  	const newUser = {
   // _id: _id,
    userName: userName,
    password: hashPW,
    gamingUser: gamingUser,
    userBio: userBio,
    favoritedGames,
    userPosts
    };

  	const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);

    const x = insertInfo.insertedId.toString();
    //console.log("the type of x is: " + typeof x);

    return await get(x);
}

async function getAll(){

  const userCollection = await users();

  const allUsers = await userCollection.find({}).toArray();

  return allUsers;
}

async function get(id){

  const userCollection = await users();

  if(!id) throw 'ID cannot be empty'
  if(!userCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const userId = await userCollection.findOne({ _id: ObjectId(id)});
  if (userId === null) throw 'No game with that id';

  return userId;
}

async function getByUser(uname) {
  const userCollection = await users();
  if(!uname) throw 'ID cannot be empty'
  const user = await userCollection.findOne({ userName: uname});
  if (user === null) throw 'No user with that id';

  return user;
}

async function remove(id){

  const userCollection = await users();

  if(!id) throw 'ID cannot be empty'
  if(!userCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await userCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'game id could not be found'

  return true;
}

async function rename(id, newProfileName, newProfileBio){

  const userCollection = await users();

  if(!id) throw 'ID cannot be empty'
  if(!userCollection) throw 'No games in database'
  if(!ObjectId.isValid(id) || id.length === 12) throw 'Invalid ObjectId'

  const newProfile = {
    name: newProfileName,
    bio: newProfileBio
  };

  const update = await userCollection.updateOne({ _id: ObjectId(id)},{$set: newProfile});
  if(update.modifiedCount === 0) throw 'Could not update'

  return await this.get(id);
}

async function favoritedGame(gameId, userId){
  //let favorite = games.get(gameId);
  let user = get(userId);
  user.favoritedGames.push(gameId);
  return true;
}

async function postCreated(userId, postId){
  let user = get(userId);
  user.userPosts.push(postId);
  return true;
}

module.exports = {remove, get, getAll, create, favoritedGame, rename, postCreated};
