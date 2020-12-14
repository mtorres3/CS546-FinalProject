const data = require("./data");
const games = data.games;
const users = data.users;
const comments = data.comments;
const reviews = data.reviews;
const connection = require("./config/mongoConnection");

async function main() {
  const db = await connection();
  /*
  try {
    allGames = await games.getAll();
    console.log(allGames)
  }
  catch(e) {
    console.log(e);
  }
  try {
    var melee = await games.create("Super Smash Bros Melee",["Fighting", "Competitive"],["PC"], "","best game ever made");
    console.log(melee._id);
    newMelee = await games.get(melee._id);
    console.log(newMelee);
    deleteMelee = await games.remove(melee._id);
    console.log(deleteMelee)
    newMelee = await games.get(melee._id);
    console.log(newMelee);
  }
  catch(e) {
    console.log(e);
  } */
  try {
    var user = await users.create("ali", "hello", "jandro", "testing");
    console.log(user)
  } catch(e) {
    console.log(e);
  }
  await db.serverConfig.close();
}
main();
