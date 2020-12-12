const express = require('express');
const router = express.Router();
const data = require('../data');
const gameData = data.games;

const gameOne = {
  name: "Disco Elysium",
  genre: ["Adventure", "Role-playing(RPG)"],
  platforms: ["Xbox One", "Playstation 4", "Mac","PC (Microsoft Windows)","Nintendo Switch"],
  artwork: "/images/disco_asylum.jpg",
  description: "A CRPG in which, waking up in a hotel room a total amnesiac with highly opinionated voices in his head, a middle-aged detective on a murder case inadvertently ends up playing a part in the political dispute between a local labour union and a larger international body, all while struggling to piece together his past, diagnose the nature of the reality around him and come to terms with said reality."
}

router.get("/", async(request, response) => {
  try{
    response.render('extras/test', gameOne);
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

module.exports = router;
