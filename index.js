// tmi = twitch chat api
const tmi = require("tmi.js"),
  { channel, username, password } = require("./settings.json");

// Options for the bot client
const option = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username,
    password
  },
  channels: [channel]
};

// Var for HTML requests
var XMLHttpRequest = require('xhr2');

var compteur = 0;

const client = new tmi.client(option);
client.connect().catch(console.error);

client.on("connected", () => {
  client.say(channel, "MatelgatoBOT est maintenant connecté !");
  // setInterval(() => {
  //     messageInterval();
  // }, 1200000);
});

// function messageInterval() {
//     client.say(channel, "Si jamais tu vois du texte à la place d'une emote ici -> peepoPogo . Sois normal et va télécharger 7TV sur ton navigateur https://7tv.app !");
// }

client.on('message', (channel, user, message, self) => {
  if (self) return;

  if (message.toUpperCase() === '!HELLO') {
    client.say(channel, `@${user.username}, Salut !`);
  }

  if (message.toUpperCase().startsWith("!RANK")) {
    var correct_comm = true;
    if (message.length >= 6) {
      if (message[5] !== " ") correct_comm = false;

      let pseudo = message.substring(6);
      console.log(pseudo);
      var username = pseudo.split("#")[0];
      var tag = pseudo.split("#")[1];
    }

    if (!correct_comm) {
      console.log("oui");
      return;
    }


    getValorantRank(username, tag, (rank) => {
      client.say(channel, `billieEZ ${rank} billieEZ`);
    });
  }
  if (message.toUpperCase() === "!7TV") {
    client.say(channel, "Si jamais tu vois du texte à la place d'une emote ici -> peepoPogo . Sois normal et va télécharger 7TV sur ton navigateur https://7tv.app !");
  }

  if (message) {
    compteur++;
    if (compteur == 20) {
      client.say(channel, "Si jamais tu vois du texte à la place d'une emote ici -> peepoPogo . Sois normal et va télécharger 7TV sur ton navigateur https://7tv.app !");
      compteur = 0;
    }
  }
});


function getValorantRank(username = 'M a t', tag = '0307', callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `https://api.kyroskoh.xyz/valorant/v1/mmr/EU/${username}/${tag}`);
  xmlHttp.send(null);
  xmlHttp.onload = () => {
    if (xmlHttp.status == 200) {
      console.log(xmlHttp.responseText);
      callback(xmlHttp.responseText);
    } else {
      console.log("Error code: " + xmlHttp.status);
      callback("Ce joueur n'existe pas !");
    }
  };
}
