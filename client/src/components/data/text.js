
const maintext = {
  title: "What is Emerald Kaizo?",
  text: ["Emerald Kaizo is a difficulty ROM hack of Pokémon Emerald by SinisterHoodedFigure (SHF). It makes all 386 Gen 3 Pokémon available to the player, but only after beating the Elite 4. No Items can be used during battles, except for held Items and Pokéballs, EVs are completely removed from the game, and setup and stat reducing moves are almost completely removed. The majority of Pokémon have altered stats and learnsets and the game's movepool has been updated. Emerald Kaizo features new overworld puzzles and extremely hard boss fights, while limiting player resources to increase difficulty even further.",
    "More information on Emerald Kaizo can be found in this <a href='https://www.pokecommunity.com/showthread.php?t=395830'>PokéCommunity thread</a>.",
    "Emerald Kaizo information compiled and curated by the PokemonChallenges community can be found in this <a href='https://drive.google.com/drive/folders/1_isyb2s0e8GStgzBplm9ivwYOm9sU9fA'>Google Drive</a>.",
  ]
}

const sitetext = {
  title: "Kaizo Tracking",
  text: "Kaizo Tracking enhances the user's experience in Nuzlocking. It will track your progression as you play through Emerald Kaizo. You are able to submit which encounter you caught and when you complete the route."
}

const nuzlocke_rules = {
  text: "A Nuzlocke is a Pokémon challenge run, intended to create a unique and more challenging gameplay experience through a set of self-imposed rules. While there are many optional rules and restrictions you could include, a Nuzlocke challenge consists of three basic rules:",
  main: [
    "Any Pokémon that faints must be released or boxed permanently. It is considered “dead” for the rest of the challenge.",
    "Only the first wild Pokémon encountered in a route or area can be caught. If the player fails to catch it (ie. it flees or faints), their opportunity to catch a Pokémon in that area is lost.",
    "The player must nickname all Pokémon they catch or obtain. (This is not technically necessary for the challenge run, but is universally accepted as part of a Nuzlocke.)"
  ],
  optional: [
    "Duplicate clause: If the first Pokémon in an area is one the player already owns, they may continue battling until they encounter one they do not own, and then attempt to catch it. This rule prevents a player from having multiples of the same Pokémon, especially early in the game when the selection of different Pokémon on the first few routes is limited.",
    "Shiny Clause: If the player encounters a shiny wild Pokémon, they may catch it, even if a wild Pokémon has already been encountered in that area. This does not count as the encounter for that area.",
    "Using “set” battle mode.",
    "Banning “over-leveling”: Player's Pokémon may only be trained up to the level of the next Gym leader's strongest Pokémon.",
    "Banning held items.",
    "Banning exp. share.",
    "Banning the day-care.",
    "Banning legendary Pokémon.",
    "Limiting the number of times each Pokémon Center may be used (eg. once per run).",
    "Banning online references and doing the run “blind” (no Serebii, Bulbapedia, etc.).",
    "Randomizing the starter Pokémon according to the trainer's ID number (if the last digit is 1-3 the player chooses the grass type, if 4-6, water, and if 7-9, fire. If the last digit is 0, the player may choose.)",
    "“First man out” - allowing the player to revive the first Pokémon that faints during a run.",
    "Releasing the starter Pokémon after the first wild Pokémon is caught and raised to level 5."
  ],
  source: "https://nuzlockeuniversity.ca/"
}

const faq = [
  {
    title: "Why is PokemonChallenge's version of Emerald Kaizo so different from mine?",
    text: ["The version of Emerald Kaizo PokemonChallenge is playing is patched to include a variety of quality of life improvements, e.g.: Fishing is made easier, friendship evolutions are changed to level-up evolutions, Berries are more readily available, and the player gets access to Rare Candies to reduce the time spent grinding. The full list of patch notes can be found <a href='https://pastebin.com/VFJ870wA'>here</a>.", "The patch was made by our mod toxicenduser (username @Tennis#4004 on Discord)."]
  },
  {
    title: "Where can I find the patch PokemonChallenge is playing on?",
    text: ["The patch can be found in the <a href='http://www.discord.gg/pchal'>Discord</a>.", "Make sure to read the rules and agree to them. Afterwards go into the #emerald-kaizo channel and check the pinned messages. The patch is linked there."]
  },
  {
    title: "Does Emerald Kaizo have the Physical/Special Split?",
    text: ["No, Emerald Kaizo does not have the Physical/Special split. Mechanically Emerald Kaizo is identical to vanilla Emerald."]
  },
  {
    title: "Is [insert Pokémon here] in Emerald Kaizo?",
    text: ["All 386 Pokémon that existed when Pokémon Emerald was released are in the game. No Gen IV+ Pokémon were added."]
  },
  {
    title: "Why are there patches of grass in [insert city here]?",
    text: ["Emerald Kaizo was designed with greater encounter distribution and variety in mind. SinisterHoodedFigure (SHF), the hack creator, added patches of grass to all the cities in the game so that more Pokémon can be encountered."]
  },
  {
    title: "What was the furthest attempt?",
    text: ["As of July 17th 2021 PokemonChallenge has beaten Emerald Kaizo on <a href='https://youtu.be/vsCL4JondeU'>Attempt 151</a>. "]
  }, {
    title: "Is Emerald Kaizo easier than [insert fangame/ROM hack here]?",
    text: ["Probably not. PokemonChallenge has attempted to beat Emerald Kaizo 150 times without success, and has only beaten it on his 151st run. This is more than three times the number of attempts he has ever taken to beat any other game (Blue Kaizo, 49 attempts). This is probably one of the hardest Pokémon games in existence."]
  },
  {
    title: "Where can I find the documentation PokemonChallenge is using?",
    text: ["All Emerald Kaizo resources that were compiled and are curated by the community can be found in this <a href='https://drive.google.com/drive/folders/1_isyb2s0e8GStgzBplm9ivwYOm9sU9fA?usp=sharing'>Google Drive</a>. The EK specific damage calculator by our mod Toxic (toxicenduser on Twitch/Tennis in Discord) can be found <a href='http://ekalc.byethost18.com/?gen=3'>here</a>. The experimental spreadsheet to predict the Trainer switch-in AI created by Xavion can be found <a href='https://docs.google.com/spreadsheets/d/1-xSxcGzBTExNIAE_77jNfJosd-4D5852hq_IKkJpeWs/edit#gid=0'>here</a> (make a copy of the spreadsheet to change the enemy Trainer and enter your own Pokémon)."]
  },
  {
    title: "Why use Treecko as Starter? Why not Torchic or Mudkip?",
    text: ["With the Level Caps that PC uses (Roxanne at level 16, Brawly at level 20) all three starters are viable. However, there are a lot of Water/Ground Types, like Barboach, or later on Wooper, that are readily available and fulfill the same role as Mudkip/Marshtomp. Torchic/Combusken performs exceedingly well both as a Fire and as a Fighting Type, but both Types are quite common in the midgame and the need for specifically a Fire/Fighting Type never really arises. In the latter half of the game PC often finds himself in need of a fast Grass Type like Sceptile. He therefore chooses Treecko as his Starter. ", "If you are playing with original Level Caps (Roxanne at level 15, Brawly at level 19), it is mandatory to pick Treecko as your Starter. Otherwise, it is impossible to get past the first few Gyms consistently."]
  },
  {
    title: "Why does PC increase the Level Cap?",
    text: ["While it is possible to beat Roxanne at level 15, it also requires either a lot of luck or resetting for specific encounters (Luvdisc, Sunkern) or Starter natures (+Special Attack or +Speed Treecko). As it makes for boring content to either watch PC play through the same handful of Trainers over and over until he gets lucky enough to beat Roxanne, or watch the same teams over and over, PC has decided to raise the Roxanne Level Cap to level 16 to make beating her more consistent while also keeping his team variance high. ", "Brawly is similarly beatable at level 19, but requires even more luck. His team of almost all fully evolved Pokémon is very hard to deal with, especially as they are fast and a lot of them know Rockslide or Triple Kick (moves that have the potential to flinch slower opponents). Raising the Level Cap to level 20 gives PC the edge to make it past Brawly more often and make more entertaining content to watch."]
  },
  {
    title: "Why does PC not evolve [insert Pokémon here]?",
    text: ["There are several reasons why PC might choose not to evolve a Pokémon right away, even though he has reached the requirement for the evolution. ", "The most common reason might be that he is delaying the evolution for a specific move. The evolved form of the Pokémon might not learn this move or it might learn the move at such a late level that it is advantageous to delay the evolution and teach the move to the unevolved form. ", "Another reason could be that the Pokémon's typing changes upon evolution and he wants to keep the typing of the unevolved form for a specific type matchup in a battle. ", "Thirdly, PC may have just made a mistake and accidentally cancelled the evolution. This is not without precedent and can happen."]
  },
  {
    title: "Why delay the Littleroot Town encounter?",
    text: ["The only Littleroot Town encounters the player can obtain before Roxanne are Luvdisc and Goldeen (fishing with the Old Rod). Goldeen has limited uses and while Luvdisc is a good encounter early on due to being a fast Charm user, it falls off a lot after Brawly. ", "By delaying the Littleroot Town encounter until the player has access to the Good Rod, the potential Pokémon pool greatly increases. One of the possible encounters here is Corphish; with its Dark Typing and its Shell Armor ability Crawdaunt is one of the best Pokémon in Emerald Kaizo."]
  },
  {
    title: "Why delay the Rustboro City encounter?",
    text: ["The only Pokémon you can encounter in the Rustboro City grass are Grass Types. Since Treecko/Grovyle is an already good Grass Type, getting another one would be redundant and is not necessary to progress in most cases. ", "After beating Flannery, the player unlocks the Desert area on Route 111 north of Mauville City, and subsequently Mirage Tower. Mirage Tower is home to the Root and Claw Fossils which can be revived in Rustboro City. Reviving a fossil in Rustboro City counts as the encounter there. ", "If a Grass Type has already been encountered in Rustboro City, the player is unable to revive a fossil. Delaying the encounter, however, makes it possible to get either Anorith (Claw Fossil) or Lileep (Root Fossil). Especially the latter has great lategame potential because of its Type combination (Grass/Rock), learnset (HP recovering moves), and ability (Suction Cups to prevent getting Roared by Encounters), so it is rarely advantageous to get an early Grass Type encounter. Instead it is almost always more sensible to skip the Rustboro City encounter until the fossils can be revived."]
  },
  {
    title: "What does 'fossilless' mean?",
    text: ["On Route 115, north of Rustboro City, you can use the Old Rod to fish for an encounter before challenging the Rustboro Gym and Roxanne. The only two possible encounters you can fish up with the Old Rod are Omanyte and Kabuto, two fossil Pokémon. ", "However, after receiving HM03 Surf it is possible to reach a patch of grass on Route 115. The encounters here are potentially helpful for the mid- and lategame. The best encounter you can get here is, without question, Beldum. ", "In order to potentially catch this Beldum, it is necessary to delay the Route 115 encounter until beating Norman and receiving Surf.This means one will have to play the game 'fossilless' and not use Omanyte or Kabuto(potentially very useful encounters)."]
  },
  {
    title: "Why/How does PC have so many berries?",
    text: ["The version of Emerald Kaizo PC is playing is patched to give 255 Berries upon picking a Berry Tree. Similarly, NPCs who hand out a specific Berry will instead give 255 Berries. NPCs who will give a random Berry from a selection once per day have been turned into Berry vendors. These changes were implemented solely to get rid of the absolute tediousness of grinding for Berries. ", "Berry Farming is possible in Emerald Kaizo, it just takes a long time to grow Berries; therefore, it is possible to grind a large number of Berries by changing your system time over and over. To circumvent this, PC initially hacked in the Berries using PKHeX. The current patch merely speeds this process up. ", "This patch also has several other features (see the full list of patch notes <a href='https://pastebin.com/VFJ870wA'>here</a>). It was made by our mod toxicenduser (username @Tennis#4004 on Discord). You can download the patch yourself from the pinned messages in the #emerald-kaizo channel in the <a href='http://www.discord.gg/pchal'>Discord</a>."]
  },
  {
    title: "Why/How does PC have so many Rare Candies?",
    text: ["PC used to use the Pokémon Day Care next to Mauville City to level up his Pokémon to reduce the risk of losing Pokémon to grinding. To improve the quality of the stream, our mod Toxic (toxicenduser on Twitch/Tennis in Discord) made a patch that added Rare Candies to the Mauville PokéMart for 100 Pokédollars each. This removed the necessity of running back and forth in front of the Day Care (quite boring content to watch). ", "After attempt 77 PC decided to add Rare Candies to the game before reaching Mauville City because nobody was interested in watching him grind mindlessly for hours on end. He uses PKHeX to add Rare Candies to his game file before even receiving his starting Pokémon. There will likely be a future patch that will sell them for 1 Pokédollar each in the Oldale PokéMart. ", "This patch also has several other features (see the full list of patch notes <a href='https://pastebin.com/VFJ870wA'>here</a>). It was made by our mod toxicenduser (username @Tennis#4004 on Discord). You can download the patch yourself from the pinned messages in the #emerald-kaizo channel in the <a href='http://www.discord.gg/pchal'>Discord</a>."]
  },
  {
    title: "Are friendship evolutions changed in Emerald Kaizo?",
    text: ["Friendship evolutions, as well as base friendship values, are identical between Emerald Kaizo and vanilla Emerald. However, the version of Emerald Kaizo PC is playing is patched to turn friendship evolutions into level-up evolutions. ", "In all Pokémon games with friendship mechanics a Pokémon's friendship can be raised by spending a lot of time with it. Mechanically, this translates to taking a lot of steps in the overworld with the Pokémon in your party. It is therefore possible to maximize your friendship with a Pokémon by repeatedly running back and forth for a long time. As this is both boring and risk-free, friendship evolutions are indistinguishable from level-up evolutions with an added half hour of boredom. ", "The patch PC is playing on removes this tediousness by turning friendship evolutions into evolutions occurring at level 1. This patch also has several other features (see the full list of patch notes <a href='https://pastebin.com/VFJ870wA'>here</a>). ", "It was made by our mod toxicenduser (username @Tennis#4004 on Discord). You can download the patch yourself from the pinned messages in the #emerald-kaizo channel in the <a href='http://www.discord.gg/pchal'>Discord</a>."]
  },
  {
    title: "Why/How does PC have so many TMs?",
    text: ["After unlocking the Mauville Game Corner (upon reaching Lilycove City) money is basically free in Emerald Kaizo, since the player can simply spend hours grinding Coins at the Game Corner, trade them for the prize TMs and sell those TMs to get more money than their initial investment to buy Coins at the Game Corner. ", "Nobody wants to watch PC grind the slot machines for hours, therefore the price of Coins has been patched to 1 Pokédollar. When trading Coins for prize TMs, the player will receive 99 of each TM. Similarly, the Department Store in Lilycove City will hand out 99 TMs whenever the player buys a TM. This simulates the superfluousness of money in the Emerald Kaizo lategame. ", "This patch also has several other features (see the full list of patch notes <a href='https://pastebin.com/VFJ870wA'>here</a>). It was made by our mod toxicenduser (username @Tennis#4004 on Discord). You can download the patch yourself from the pinned messages in the #emerald-kaizo channel in the <a href='http://www.discord.gg/pchal'>Discord</a>."]
  }
]

export { maintext, sitetext, nuzlocke_rules, faq };