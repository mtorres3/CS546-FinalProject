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

  const gameCollection = await games();

  if(!id || typeof id != 'string' || id.trim() === "") throw 'ID cannot be empty and must be a string'
  if(!gameCollection) throw 'No movies in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const gameId = await gameCollection.findOne({ _id: ObjectId(id)});
  if (gameId === null) throw 'No movie with that id';

  return gameId;
}

async function remove(id){

  const gameCollection = await games();

  if(!id || typeof id != 'string' || id.trim() === "") throw 'ID cannot be empty and must be a string'
  if(!gameCollection) throw 'No movies in database'
  if(!ObjectId.isValid(id)) throw 'Invalid ObjectId'

  const deleted = await gameCollection.deleteOne({ _id: ObjectId(id) });

  if (deleted.deletedCount === 0) throw 'Movie id could not be found'

  return `${deleted} has been deleted`;
}

module.exports = {remove, get, getAll, create};
