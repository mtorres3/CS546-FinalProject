const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const users = collections.users;
const games = require("./games");
const bcrypt = require('bcryptjs');

async function create(userName, password, gamingUser, userBio) {

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

  let likes = [];
  let posts= [];
  let favorites = [];
  var hashPW = await bcrypt.hash(password, 10);
  console.log(hashPW);


  	const newUser = {
   // _id: _id,
    userName: userName,
    password: hashPW,
    gamingUser: gamingUser,
    userBio: userBio,
    favoritedGames: favorites,
    userPosts: posts,
    likedPost: likes
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
    gamingUser: newProfileName,
    userBio: newProfileBio
  };

  const update = await userCollection.updateOne({ _id: ObjectId(id)},{$set: newProfile});
  if(update.modifiedCount === 0) throw 'Could not update'

  return await this.get(id);
}


async function favoritedGame(game, userId){
  const userCollection = await users();
  let user = await get(userId);
  let favoritedGames = user.favoritedGames
  favoritedGames.push(game)
  //console.log(favoritedGames)
  const newFavorite = {
    favoritedGames: favoritedGames
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newFavorite});
  if(update.modifiedCount === 0) throw 'Could not update'

  /*let user = get(userId);
  user.favoritedGames.push(gameId);*/

  return favoritedGames;
}

async function unfavoritedGame(game, userId) {
  const userCollection = await users();
  let user = await get(userId);
  let favoritedGames = user.favoritedGames
  for(i=0; i < favoritedGames.length; i++) {
    if (favoritedGames[i]._id.toString() === game._id.toString()) {
      favoritedGames.splice(i, 1);
      //console.log(i)
      //console.log(favoritedGames);
    }
  }
  //console.log(favoritedGames)
  const newFavorite = {
    favoritedGames: favoritedGames
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newFavorite});
  if(update.modifiedCount === 0) throw 'Could not update'

  /*let user = get(userId);
  user.favoritedGames.push(gameId);*/

  return favoritedGames;
}

async function postCreated(userId, set){

  const userCollection = await users();
  let user = await get(userId);
  let posts = user.userPosts;
  //console.log(posts)
  posts.push(set);
  //console.log(posts);
  let newProfile = {
    userPosts: posts,
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newProfile});
  if (!update.matchedCount && !update.modifiedCount)
      throw 'Update failed';
}


async function searchUsers(searchTerm){
  var matchArray = [];
  let userArray = await getAll();
  let currentUser;

  for (r=0; r<userArray.length;r++){
    if(searchTerm.toLowerCase() == userArray[r].userName.toLowerCase()){
      matchArray.push(userArray[r]);
    }
  }

  //console.log(matchArray);
  return matchArray;
}


async function postLiked(userId, postId) {
  const userCollection = await users();
  let user = await get(userId);
  //console.log(user)
  let posts = user.likedPost;
  //console.log(posts)
  posts.push(postId);
  //console.log(posts);
  let newProfile = {
    likedPost: posts,
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newProfile});
  if (!update.matchedCount && !update.modifiedCount)
      throw 'Update failed';

}


async function postUnliked(userId, postId) {
  const userCollection = await users();
  let user = await get(userId);
  //console.log(user.likedPost[0].toString() === postId.toString())
  let posts = user.likedPost;
  //console.log(postId)
  for(i=0; i < posts.length; i++) {
    if (posts[i].toString() === postId.toString()) {
      posts.splice(i, 1);
      //console.log(i)
      //console.log(posts);
    }
  }
  let newProfile = {
    likedPost: posts,
  };
  const update = await userCollection.updateOne({ _id: user._id},{$set: newProfile});
  if (!update.matchedCount && !update.modifiedCount)
      throw 'Update failed';
}

async function search(searchTerm){
  //get array of all users
  //check to see if any of the users match the search term

  let result = [];
  let userArray = await getAll();
  //console.log(userArray);

  let currentUser = {};
  for (i=0; i<=userArray.length; i++){
    //console.log(result);
    currentUser = userArray[i];
    //console.log(currentUser);
    //console.log(searchTerm.toLowerCase());
    //console.log(currentUser.userName.toLowerCase());
    if(searchTerm.toLowerCase() == currentUser.userName.toLowerCase()){
      //console.log('==========================================')
      result.push(currentUser);
      //console.log(result);
      return result;
    }
  }
  //console.log(result);
  return resultArray;
}



module.exports = {remove, get, getByUser, getAll, create, favoritedGame, unfavoritedGame, rename, postCreated, search,searchUsers, postLiked, postUnliked};
