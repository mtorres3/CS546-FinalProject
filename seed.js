const games = require("./data/games");
const connection = require("./config/mongoConnection");

async function main() {
    try {
        var discoElysium = await games.create("Disco Elysium",["Adventure","Role-playing(RPG)"],["Xbox One", "Playstation 4", "Mac","PC (Microsoft Windows)","Nintendo Switch"], "/public/images/disco_asylum.jpg","A CRPG in which, waking up in a hotel room a total amnesiac with highly opinionated voices in his head, a middle-aged detective on a murder case inadvertently ends up playing a part in the political dispute between a local labour union and a larger international body, all while struggling to piece together his past, diagnose the nature of the reality around him and come to terms with said reality.");
        console.log(discoElysium);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var godOfWar = await games.create("God of War",["Adventure", "Hack and Slash"],["Playstation 4"], "/public/images/god_of_war.jpg","It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created...");
        console.log(godOfWar);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var lastOfUs = await games.create("The Last of Us",["Adventure", "Shooter"],["Playstation 3"], "/public/images/the_last_of_us.jpg","A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors.");
        console.log(lastOfUs);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var witcherWildHunt = await games.create("The Witcher 3: Wild Hunt",["Adventure", "Role-playing(RPG)"],["Xbox One", "Playstation 4", "PC (Microsoft Windows)"], "/public/images/the_witcher_3.jpg","RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing.");
        console.log(witcherWildHunt);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var persona = await games.create("Persona 5",["Adventure", "Platform", "Role-playing(RPG)"],["Playstation 3", "Playstation 4"], "/public/images/persona_5.jpg","Persona 5, a turn-based JRPG with visual novel elements, follows a high school student with a criminal record for a crime he didn't commit. Soon he meets several characters who share similar fates to him, and discovers a metaphysical realm which allows him and his friends to channel their pent-up frustrations into becoming a group of vigilantes reveling in aesthetics and rebellion while fighting corruption.");
        console.log(persona);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var paperMario = await games.create("Paper Mario: The Thousand-Year Door",["Adventure", "Role-playing(RPG)"],["Nintendo GameCube"], "/public/images/paper_mario.jpg","What Sleeps Behind the Door? Time passes, the pages turn…and a new chapter unfolds in an unfamiliar land! Get ready for a two-dimensional role-playing adventure for the ages as Mario returns to paper form to discover a mystery that sleeps behind an ancient, legendary portal called the Thousand-Year Door. The quest is long, the dangers many, and this time, Mario will have to make full use of his papery qualities just to survive. Take to the stage! Impressing the crowd builds power for super attacks, but don’t disappoint the audience, or you’ll pay! No need to go it alone! You’ll need to rely on sidekicks to survive, and even enemies have roles to play… Don’t fold under pressure! Fold into a paper airplane, turn sideways to slip through cracks, and much more. Stay on your toes! Stamp foes, swing your hammer, and use timely button presses to do damage!");
        console.log(paperMario);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var chrono = await games.create("Chrono Trigger",["Role-playing(RPG)"],["Android", "Nintendo DS", "iOS", "Super Famicom", "Super Nintendo Entertainment System (SNES)", "Wii", "PlayStation", "PC"], "/public/images/chrono_trigger.jpg","In this turn-based Japanese RPG, young Crono must travel through time through a misfunctioning teleporter to rescue his misfortunate companion and take part in an intricate web of past and present perils. The adventure that ensues soon unveils an evil force set to destroy the world, triggering Crono's race against time to change the course of history and bring about a brighter future.");
        console.log(chrono);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var metalGear= await games.create("Metal Gear Solid 3: Snake Eater",["Adventure","Shooter", "Tactical"],["PlayStation 2"], "/public/images/metal_gear_solid_3.jpg.jpg","A stealth action/survival game and prequel to Metal Gear Solid 1 (1998) and 2 (2001), MGS3 follows Naked Snake as he trudges through rain forests and swamps in order to clear the name of the American government of suspicion at detonating a nuclear missile within Soviet soil by dispatching the organization behind the act, in a story of shifting allegiances, deception, warfare, mentorship and sexuality.");
        console.log(metalGear);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var lastOfUs= await games.create("The Last of US Part II",["Adventure","Shooter"],["PlayStation 4"], "/public/images/the_last_of_us_2.jpg", "Set 5 years after the events of The Last of Us, we see the return of Joel and Ellie. Driven by hatred, Ellie sets out for Seattle to serve justice. However, she begins to wonder what justice really means.");
        console.log(lastOfUs);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var superMario= await games.create("Super Mario World",["Platform"],["Wii U", "New Nintendo 3DS", "Super Nintendo Entertainment System (SNES)", "Wii", "Nintendo Switch"], "/public/images/super_mario_world.jpg", "A 2D platformer and first entry on the SNES in the Super Mario franchise, Super Mario World follows Mario as he attempts to defeat Bowser's underlings and rescue Princess Peach from his clutches. The game features a save system, a less linear world map, an expanded movement arsenal and numerous new items for Mario, alongside new approaches to level design and art direction.");
        console.log(superMario);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var zeldaPast= await games.create("The Legend of Zelda: A Link To the Past",["Adventure", "Role-playing (RPG)"],["Wii U", "Virtual Console (Nintendo)", "New Nintendo 3DS", "Game Boy Advance", "Super Famicom", "Super Nintendo Entertainment System (SNES)", "Satellaview", "Wii", "Nintendo Switch"], "/public/images/zelda_a_link_to_the_past.jpg", "A top-down action/adventure title in which Link, a blacksmith's nephew living in the fantastical land of Hyrule, must free the land from the evildoings of Ganon by taking up the mythical Master Sword and collecting the three Triforces in order to free the Seven Maidens, including the princess of Hyrule, Zelda, from the dungeons and castles of the Dark World.");
        console.log(zeldaPast);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var uncharted= await games.create("Uncharted 4: A Thief’s End",["Adventure", "Shooter"],["Playstation 4"], "/public/images/uncharted_4.jpg", "Several years after his last adventure, retired fortune hunter, Nathan Drake, is forced back into the world of thieves. With the stakes much more personal, Drake embarks on a globe-trotting journey in pursuit of a historical conspiracy behind a fabled pirate treasure. His greatest adventure will test his physical limits, his resolve, and ultimately what he's willing to sacrifice to save the ones he loves.");
        console.log(uncharted);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var zeldaOcarina = await games.create("The Legend of Zelda: Ocarina of Time",["Adventure", "Platform", "Puzzle", "Role-playing (RPG)"],["Wii U", "Virtual Console (Nintendo)", "Nintendo GameCube", "Wii", "Nintendo 64"], "/public/images/zelda_ocarina_of_time.jpg", "A 3D reimagining of the core premise of The Legend of Zelda: A Link to the Past (1991), Ocarina of Time follows Link, the protagonist, as he picks up a sword and leaves behind his humble origins in order to trek across the land of Hyrule, venture into its treacherous dungeons and travel through time itself to fulfill his destiny as the Hero of Time by defeating his enemy Ganondorf and ridding Hyrule of evil.");
        console.log(zeldaOcarina);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var silentHill = await games.create("Silent Hill 2",["Adventure", "Puzzle"],["PlayStation 2", "Xbox", "PC"], "/public/images/silent_hill_2.jpg", "The second entry in the Silent Hill franchise, Silent Hill 2 is a narrative-focused third-person psychological horror game with exploration and puzzle-solving elements which follows James Sunderland, a man who receives a letter, seemingly sent by his three-years-deceased wife Mary, in which he is beckoned to the fog-ridden town of Silent Hill at the same time as numerous other people troubled by their past.");
        console.log(silentHill);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var metroid = await games.create("Metroid Prime",["Adventure", "Platform", "Shooter"],["Nintendo GameCube"], "/public/images/metroid_prime.jpg", "Everyone's favorite heroine, Samus Aran, is back! Packed to the gills with exploration, creative power-ups, and wicked enemies, Metroid Prime is a first-person adventure worthy of the Metroid stamp. An action-packed adventure set in the first-person perspective, Metroid Prime takes place just after the events in the original Metroid (NES). It has lead character Samus Aran, a bounty hunter by trade, chasing down the evil Space Pirates. Their intention is to use a genetic mutagen called Phazon to create a super army and take over the universe. While the installments in the series before have never been home to deeply involving storylines, Metroid Prime breaks the shell to offer up one of the most intriguing and read-worthy sagas yet. Developed by Texas-based Retro Studios. Metroid Prime brings all of the elements of the acclaimed franchise into a massive 3D arena.");
        console.log(metroid);
    }
    catch(e) {
        console.log(e);
    }



}
