var express = require('express');
var app = express();

// Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
}
// End Redis connection

client.hset('games', 'bot', 0);
client.hset('games', 'human', 0);
client.hset('games', 'tie', 0);

var weapons = ['rock','paper','scissors'];

app.get('/', function(request,response) {
  response.send('Hello world'); // Returns Content-Type 'text/html' for string
});

app.use('/roshambo', express.static(__dirname + '/public'));

app.param('weapon', function(request,response,next) {
  var weapon = request.params.weapon.toLowerCase();
  if (weapons.indexOf(weapon) >= 0) {
    next();
  } else {
    response.status(400).json("We are playing Roshambo here, hipster!");
  }
});

app.get('/roshambo/stats', function(request, response, next) {
  client.hgetall('games', function(error, games) {
    response.render('stats.ejs',{ stats: games });
  });

});

app.get('/roshambo/:weapon', function(request,response,next) {
  var humanThrew = request.params.weapon;
  var botThrew = botThrows();
  var winner = whoWon(humanThrew,botThrew); 
  switch (winner) {
    case 'human':
      client.hincrby('games','human',1);
      break;
    case 'bot':
      client.hincrby('games','bot',1);
      break;
    case 'tie':
      client.hincrby('games','tie',1);
      break;
  }
  var game = {
    'human': humanThrew,
    'bot': botThrew,
    'winner': winner
  };
  response.json(game);
});

function botThrows() {
  return weapons[Math.floor(Math.random() * 3)];
}

function whoWon(human,bot) {
  if (human === 'rock') {
    if (bot === 'paper') {
      return 'bot';
    } else if (bot === 'scissors') {
      return 'human';
    } else if (bot === 'rock') {
      return 'tie'
    } else {
      return 'Uh Oh'
    }
  } else if (human === 'paper') {
    if (bot === 'paper') {
      return 'tie';
    } else if (bot === 'scissors') {
      return 'bot';
    } else if (bot === 'rock') {
      return 'human'
    } else {
      return 'Uh Oh'
    }
  } else if (human === 'scissors') {
    if (bot === 'paper') {
      return 'human';
    } else if (bot === 'scissors') {
      return 'tie';
    } else if (bot === 'rock') {
      return 'bot'
    } else {
      return 'Uh Oh'
    }
  }
}

module.exports = app;
