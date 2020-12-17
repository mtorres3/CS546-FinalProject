const {ObjectId} = require("mongodb");
const collections = require("../config/mongoCollections");
const games = collections.games;

async function create(name, genre, platforms, artwork, description) {
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

  if (!name) throw 'A name has not been provided';
  if (!genre) throw 'A genre has not been provided';
  if (!platforms) throw 'A platform has not been provided';
  if (!artwork) throw 'Artwork has not been provided';
  if (!description) throw 'A description has not been provided';

  if (typeof name !== 'string') throw 'name must be a string';
  if (typeof artwork !== 'string') throw 'artwork must be a string';
  if (typeof description !== 'string') throw 'description must be a string';

  if (!name.trim()) throw 'name is an empty string';
  if (!artwork.trim()) throw 'artwork is an empty string';
  if (!description.trim()) throw 'description is an empty string';

    name.trim();
    artwork.trim();
    description.trim();

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

  	const newGame = {
    // _id: _id,
    name: name,
    genre: genre,
    platforms: platforms,
    artwork: artwork,
    description: description
    };

  	const gameCollection = await games();
    const insertInfo = await gameCollection.insertOne(newGame);

    const x = insertInfo.insertedId.toString();
    //console.log("the type of x is: " + typeof x);

    return await get(x);
}

async function getAll(){

  const gameCollection = await games();

  const allGames = await gameCollection.find({}).toArray();

  return allGames;
}

async function get(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const gameCollection = await games();

  if(!gameCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const gameId = await gameCollection.findOne({ _id: ObjectId(id)});
  if (gameId === null) throw 'No games with that id';

  return gameId;
}

async function remove(id){

  if (!id) throw 'id has not been provided';
  if (typeof id !== 'string') throw 'id must be a string';
  if (!id.trim()) throw 'id is an empty string';
  id.trim();

  const gameCollection = await games();

  if(!gameCollection) throw 'No games in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await gameCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Game id could not be found'

  return true;
}

async function search(searchTerm){
  //get array of all games
  //check to see if any of the games include a certain word

  let result = [];
  let gamesArray = await getAll();
  //console.log(gamesArray);

  let genreArray = [];
  let currentGame = {};

  for (i=0; i<gamesArray.length; i++){
    currentGame = gamesArray[i];
    //console.log(currentGame);
    for(s=0; s<currentGame.genre.length;s++){
      //genreArray = currentGame.genre
      //console.log('====================================================');
      //console.log(searchTerm.toLowerCase());
      //console.log(currentGame.genre[s].toLowerCase());
      if(searchTerm.toLowerCase() == currentGame.genre[s].toLowerCase()){
        //console.log('====================================================');
        result.push(currentGame);
        //console.log(result);
        break;
      }
     else{
         continue;
      }
    }
  }
  ///console.log(result);
  return result;
}

async function searchPlatform(searchTerm){
  //get array of all games
  //check to see if any of the games include a certain word

  let resultArray = [];
  let gamesArray = await getAll();
  //console.log(gamesArray);

  //let genreArray = [];
  let currentGame = {};

  for (c=0; c<gamesArray.length; c++){
    currentGame = gamesArray[c];
    //console.log(currentGame);
    for(d=0; d<currentGame.platforms.length;d++){
      //genreArray = currentGame.genre
      //console.log('====================================================');
      //console.log(searchTerm.toLowerCase());
      //console.log(currentGame.genre[s].toLowerCase());
      if(searchTerm.toLowerCase() == currentGame.platforms[d].toLowerCase()){
        //console.log('====================================================');
        resultArray.push(currentGame);
        //console.log(result);
        break;
      }
     else{
         continue;
      }
    }
  }
  //console.log(resultArray);
  return resultArray;
}

module.exports = {remove, get, getAll, create,search, searchPlatform};
