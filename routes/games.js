const express = require('express');
const router = express.Router();
const data = require('../data');
const gameData = data.games;

router.get("/", async(request, response) => {
  try{
    //response.render('extras/reviewForm');
    response.render('extras/dashboardMain');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

module.exports = router;

/*const discoElysium = {
  name: "Disco Elysium",
  genre: ["Adventure", "Role-playing(RPG)"],
  platforms: ["Xbox One", "Playstation 4", "Mac","PC (Microsoft Windows)","Nintendo Switch"],
  artwork: "/images/disco_asylum.jpg",
  description: "A CRPG in which, waking up in a hotel room a total amnesiac with highly opinionated voices in his head, a middle-aged detective on a murder case inadvertently ends up playing a part in the political dispute between a local labour union and a larger international body, all while struggling to piece together his past, diagnose the nature of the reality around him and come to terms with said reality."
}

const godOfWar = {
  name: "God of War",
  genre: ["Adventure", "Hack and Slash"],
  platforms: ["Playstation 4"],
  artwork: "/public/images/god_of_war.jpg",
  description: "It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created..."
}

const lastOfUs = {
  name: "The Last of Us",
  genre: ["Adventur”", "Shooter"],
  platforms: ["Playstation 3"],
  artwork: "/public/images/last_of_us.jpg",
  description: "A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors."
}

const witcherWildHunt = {
  name: "The Witcher 3: Wild Hunt",
  genre: ["Adventure", "Role-playing(RPG)"],
  platforms: ["Xbox One", "Playstation 4", "PC (Microsoft Windows)"],
  artworks: "/public/images/the_witcher_3.jpg",
  description: "RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing."
}


const persona = {
  name: "Persona 5",
  genre: ["Adventure", "Platform", "Role-playing(RPG)"],
  platforms: ["Playstation 3", "Playstation 4"],
  artworks: "/public/images/persona_5.jpg",
  description: "Persona 5, a turn-based JRPG with visual novel elements, follows a high school student with a criminal record for a crime he didn't commit. Soon he meets several characters who share similar fates to him, and discovers a metaphysical realm which allows him and his friends to channel their pent-up frustrations into becoming a group of vigilantes reveling in aesthetics and rebellion while fighting corruption."
}

const paperMario = {
  name: "Paper Mario: The Thousand-Year Door",
  genre: ["Adventure", "Role-playing(RPG)"],
  platforms: ["Nintendo GameCube"],
  artworks: "/public/images/paper_mario.jpg",
  description: "What Sleeps Behind the Door? Time passes, the pages turn…and a new chapter unfolds in an unfamiliar land! Get ready for a two-dimensional role-playing adventure for the ages as Mario returns to paper form to discover a mystery that sleeps behind an ancient, legendary portal called the Thousand-Year Door. The quest is long, the dangers many, and this time, Mario will have to make full use of his papery qualities just to survive. Take to the stage! Impressing the crowd builds power for super attacks, but don’t disappoint the audience, or you’ll pay! No need to go it alone! You’ll need to rely on sidekicks to survive, and even enemies have roles to play… Don’t fold under pressure! Fold into a paper airplane, turn sideways to slip through cracks, and much more. Stay on your toes! Stamp foes, swing your hammer, and use timely button presses to do damage!"
}

const chrono = {
  name: "Chrono Trigger",
  genre: ["Role-playing(RPG)"],
  platforms: ["Android", "Nintendo DS", "iOS", "Super Famicom", "Super Nintendo Entertainment System (SNES)", "Wii", "PlayStation", "PC"],
  artwork: "/public/images/chrono_trigger.jpg",
  description: "In this turn-based Japanese RPG, young Crono must travel through time through a misfunctioning teleporter to rescue his misfortunate companion and take part in an intricate web of past and present perils. The adventure that ensues soon unveils an evil force set to destroy the world, triggering Crono's race against time to change the course of history and bring about a brighter future."
}

const metalGear = {
  name: "Metal Gear Solid 3: Snake Eater",
  genre: ["Adventure","Shooter", "Tactical"],
  platforms: ["PlayStation 2"],
  artwork: "/public/images/metal_gear_solid_3.jpg.jpg",
  description: "A stealth action/survival game and prequel to Metal Gear Solid 1 (1998) and 2 (2001), MGS3 follows Naked Snake as he trudges through rain forests and swamps in order to clear the name of the American government of suspicion at detonating a nuclear missile within Soviet soil by dispatching the organization behind the act, in a story of shifting allegiances, deception, warfare, mentorship and sexuality."
}

const lastOfUs= {
  name: "The Last of US Part II",
  genre: ["Adventure","Shooter"],
  platforms: ["PlayStation 4"],
  artwork: "/public/images/the_last_of_us_2.jpg",
  description: "Set 5 years after the events of The Last of Us, we see the return of Joel and Ellie. Driven by hatred, Ellie sets out for Seattle to serve justice. However, she begins to wonder what justice really means."
}

const superMario= {
  name: "Super Mario World",
  genre: ["Platform"],
  platforms: ["Wii U", "New Nintendo 3DS", "Super Nintendo Entertainment System (SNES)", "Wii", "Nintendo Switch"],
  artwork: "/public/images/super_mario_world.jpg",
  description: "A 2D platformer and first entry on the SNES in the Super Mario franchise, Super Mario World follows Mario as he attempts to defeat Bowser's underlings and rescue Princess Peach from his clutches. The game features a save system, a less linear world map, an expanded movement arsenal and numerous new items for Mario, alongside new approaches to level design and art direction."
}

const zeldaPast= {
  name: "The Legend of Zelda: A Link To the Past",
  genre: ["Adventure", "Role-playing (RPG)"],
  platforms: ["Wii U", "Virtual Console (Nintendo)", "New Nintendo 3DS", "Game Boy Advance", "Super Famicom", "Super Nintendo Entertainment System (SNES)", "Satellaview", "Wii", "Nintendo Switch"],
  artwork: "/public/images/zelda_a_link_to_the_past.jpg",
  description: "A top-down action/adventure title in which Link, a blacksmith's nephew living in the fantastical land of Hyrule, must free the land from the evildoings of Ganon by taking up the mythical Master Sword and collecting the three Triforces in order to free the Seven Maidens, including the princess of Hyrule, Zelda, from the dungeons and castles of the Dark World."
}

const uncharted= {
  name: "Uncharted 4: A Thief’s End",
  genre: ["Adventure", "Shooter"],
  platforms: ["Playstation 4"],
  artwork: "/public/images/uncharted_4.jpg",
  description: "Several years after his last adventure, retired fortune hunter, Nathan Drake, is forced back into the world of thieves. With the stakes much more personal, Drake embarks on a globe-trotting journey in pursuit of a historical conspiracy behind a fabled pirate treasure. His greatest adventure will test his physical limits, his resolve, and ultimately what he's willing to sacrifice to save the ones he loves."
}

const zeldaOcarina = {
  name: "The Legend of Zelda: Ocarina of Time",
  genre: ["Adventure", "Platform", "Puzzle", "Role-playing (RPG)"],
  platforms: ["Wii U", "Virtual Console (Nintendo)", "Nintendo GameCube", "Wii", "Nintendo 64"],
  artwork: "/public/images/zelda_ocarina_of_time.jpg",
  description: "A 3D reimagining of the core premise of The Legend of Zelda: A Link to the Past (1991), Ocarina of Time follows Link, the protagonist, as he picks up a sword and leaves behind his humble origins in order to trek across the land of Hyrule, venture into its treacherous dungeons and travel through time itself to fulfill his destiny as the Hero of Time by defeating his enemy Ganondorf and ridding Hyrule of evil."
}

const silentHill = {
  name: "Silent Hill 2",
  genre: ["Adventure", "Puzzle"],
  platforms: ["PlayStation 2", "Xbox", "PC"],
  artwork: "/public/images/silent_hill_2.jpg",
  description: "The second entry in the Silent Hill franchise, Silent Hill 2 is a narrative-focused third-person psychological horror game with exploration and puzzle-solving elements which follows James Sunderland, a man who receives a letter, seemingly sent by his three-years-deceased wife Mary, in which he is beckoned to the fog-ridden town of Silent Hill at the same time as numerous other people troubled by their past."
}

const metroid = {
  name: "Metroid Prime",
  genre: ["Adventure", "Platform", "Shooter"],
  platforms: ["Nintendo GameCube"],
  artwork: "/public/images/metroid_prime.jpg",
  description: "Everyone's favorite heroine, Samus Aran, is back! Packed to the gills with exploration, creative power-ups, and wicked enemies, Metroid Prime is a first-person adventure worthy of the Metroid stamp. An action-packed adventure set in the first-person perspective, Metroid Prime takes place just after the events in the original Metroid (NES). It has lead character Samus Aran, a bounty hunter by trade, chasing down the evil Space Pirates. Their intention is to use a genetic mutagen called Phazon to create a super army and take over the universe. While the installments in the series before have never been home to deeply involving storylines, Metroid Prime breaks the shell to offer up one of the most intriguing and read-worthy sagas yet. Developed by Texas-based Retro Studios. Metroid Prime brings all of the elements of the acclaimed franchise into a massive 3D arena."
}*/
