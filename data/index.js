const movies = require("./data/games");
const connection = require("./data/mongoConnection");

async function main() {
    try {
        var discoElysium = await games.create("Disco Elysium",["Adventure","Role-playing(RPG)"],["Xbox One", "Playstation 4", "Mac","PC (Microsoft Windows)","Nintendo Switch"], "","A CRPG in which, waking up in a hotel room a total amnesiac with highly opinionated voices in his head, a middle-aged detective on a murder case inadvertently ends up playing a part in the political dispute between a local labour union and a larger international body, all while struggling to piece together his past, diagnose the nature of the reality around him and come to terms with said reality.");
        console.log(discoElysium);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var godOfWar = await games.create("God of War",["Adventure", "Hack and Slash"],["Playstation 4"], "","It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created...");
        console.log(godOfWar);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var lastOfUs = await games.create("The Last of Us",["Adventure", "Shooter"],["Playstation 3"], "","A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors.");
        console.log(lastOfUs);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var witcherWildHunt = await games.create("The Witcher 3: Wild Hunt",["Adventure", "Role-playing(RPG)"],["Xbox One", "Playstation 4", "PC (Microsoft Windows)"], "","RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing.");
        console.log(witcherWildHunt);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var persona = await games.create("Persona 5",["Adventure", "Platform", "Role-playing(RPG)"],["Playstation 3", "Playstation 4"], "","Persona 5, a turn-based JRPG with visual novel elements, follows a high school student with a criminal record for a crime he didn't commit. Soon he meets several characters who share similar fates to him, and discovers a metaphysical realm which allows him and his friends to channel their pent-up frustrations into becoming a group of vigilantes reveling in aesthetics and rebellion while fighting corruption.");
        console.log(persona);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var paperMario = await games.create("Paper Mario: The Thousand-Year Door",["Adventure", "Role-playing(RPG)"],["Nintendo GameCube"], "","What Sleeps Behind the Door? Time passes, the pages turn…and a new chapter unfolds in an unfamiliar land! Get ready for a two-dimensional role-playing adventure for the ages as Mario returns to paper form to discover a mystery that sleeps behind an ancient, legendary portal called the Thousand-Year Door. The quest is long, the dangers many, and this time, Mario will have to make full use of his papery qualities just to survive. Take to the stage! Impressing the crowd builds power for super attacks, but don’t disappoint the audience, or you’ll pay! No need to go it alone! You’ll need to rely on sidekicks to survive, and even enemies have roles to play… Don’t fold under pressure! Fold into a paper airplane, turn sideways to slip through cracks, and much more. Stay on your toes! Stamp foes, swing your hammer, and use timely button presses to do damage!");
        console.log(paperMario);
    }
    catch(e) {
        console.log(e);
    }

    try {
        var chrono = await games.create("Chrono Trigger",["Role-playing(RPG)"],["Android", "Nintendo DS", "iOS", "Super Famicom", "Super Nintendo Entertainment System (SNES)", "Wii", "PlayStation", "PC"], "","In this turn-based Japanese RPG, young Crono must travel through time through a misfunctioning teleporter to rescue his misfortunate companion and take part in an intricate web of past and present perils. The adventure that ensues soon unveils an evil force set to destroy the world, triggering Crono's race against time to change the course of history and bring about a brighter future.");
        console.log(chrono);
    }
    catch(e) {
        console.log(e);
    }




}