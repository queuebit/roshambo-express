var express = require('express');

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

var router = express.Router();

// client.hset('games', 'bot', 0);
// client.hset('games', 'human', 0);
// client.hset('games', 'tie', 0);

var weapons = ['rock','paper','scissors'];

router.route('/stats')
  .get(function(request, response, next) {
    client.hgetall('games', function(error, games) {
      response.render('stats.ejs',{ stats: games });
    });
  });

router.route('/:weapon')
  .all(function(request, response, next) {
    var weapon = request.params.weapon.toLowerCase();
    if (weapons.indexOf(weapon) >= 0) {
      next();
    } else {
      response.status(400).json("We are playing Roshambo here, hipster!");
    }
  })
  .get(function(request,response,next) {
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

// local functions

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

module.exports = router;
