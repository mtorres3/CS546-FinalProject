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

  if (!userName) throw 'A username has not been provided';
  if (!password) throw 'A password has not been provided';
  if (!gamingUser) throw 'A gaming username name has not been provided';
  if (!userBio) throw 'A bio has not been provided';

  if (typeof userName !== 'string') throw 'userName must be a string';
  if (typeof password !== 'string') throw 'password must be a string';
  if (typeof gamingUser !== 'string') throw 'gamingUser name must be a string';
  if (typeof userBio !== 'string') throw 'userBio must be a string';

  if (!userName.trim()) throw 'userName is an empty string';
  if (!password.trim()) throw 'password is an empty string';
  if (!gamingUser.trim()) throw 'gamingUser is an empty string';
  if (!userBio.trim()) throw 'userBio is an empty string';

    userName.trim();
    password.trim();
    gamingUser.trim();
    userBio.trim();

  let favoritedGames = [];
  var hashPW = await bcrypt.hash(password, 10);
  console.log(hashPW);


  	const newUser = {
   // _id: _id,
    userName: userName,
    password: hashPW,
    gamingUser: gamingUser,
    userBio: userBio,
    favoritedGames: favoritedGames,
    userPosts: userPosts
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

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const userCollection = await users();

  if(!userCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const userId = await userCollection.findOne({ _id: ObjectId(id)});
  if (userId === null) throw 'No game with that id';

  return userId;
}

async function getByUser(uname) {

  if (!uname) throw 'A username has not been provided';
  if (typeof uname !== 'string') throw 'userName must be a string';
  if (!uname.trim()) throw 'userName is an empty string';
  uname.trim();

  const userCollection = await users();
  if(!uname) throw 'ID cannot be empty'
  const user = await userCollection.findOne({ userName: uname});
  if (user === null) throw 'No user with that id';

  return user;
}

async function remove(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const userCollection = await users();

  if(!userCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await userCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'game id could not be found'

  return true;
}

async function rename(id, newProfileName, newProfileBio){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  if (!newProfileName) throw 'A new profile name has not been provided';
  if (typeof newProfileName !== 'string') throw 'newProfileName must be a string';
  if (!newProfileName.trim()) throw 'newProfileName is an empty string';
  newProfileName.trim();

  if (!newProfileBio) throw 'A new profile bio has not been provided';
  if (typeof newProfileBio !== 'string') throw 'newProfileBio must be a string';
  if (!newProfileBio.trim()) throw 'newProfileBio is an empty string';
  newProfileBio.trim();

  const userCollection = await users();

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

  if (!gameId) throw 'gameId has not been provided';
  if (typeof gameId !== 'string') throw 'gameId must be a string';
  if (!gameId.trim()) throw 'gameId is an empty string';
  gameId.trim();

  if (!userId) throw 'userId has not been provided';
  if (typeof userId !== 'string') throw 'userId must be a string';
  if (!userId.trim()) throw 'userId is an empty string';
  userId.trim();

  //let favorite = games.get(gameId);
  let user = get(userId);
  user.favoritedGames.push(gameId);
  return true;
}

async function postCreated(userId, postId){

  const userCollection = await users();
  let user = await get(userId);
  let posts = user.userPosts;
  posts.push(postId);
  console.log(posts);
  let newProfile = {
    userPosts: posts,
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newProfile});
  if (!update.matchedCount && !update.modifiedCount)
      throw 'Update failed';
}



async function search(searchTerm){
  //get array of all users
  //check to see if any of the users match the search term

  var result = [];
  let userArray = await getAll();

  //let userArray = [];
  let currentUser = {};

  for (i=0; i<=userArray.length; i++){
    currentUser = userArray[i];
    if(searchTerm == currentUser.userName){
      result.push(currentUser.userName)
    }
  }
  return result;
}
/*
//Potentially works
async function getByKeyword(searchTerm){

  if(!searchTerm || typeof searchTerm != 'string' || searchTerm.trim() == "") throw 'Invalid search term';
  //const shows = await getSearch(searchTerm);

  searchResults = [];

  for(i = 0; i < shows.length; i++){
    let showInfo = {
      name: shows[i].show.name,
      id: shows[i].show.id
    }
    searchResults.push(showInfo);
  }
  return searchResults;
}
*/
module.exports = {remove, get, getByUser, getAll, create, favoritedGame, rename, postCreated, search};
