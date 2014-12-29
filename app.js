var express = require('express');
var app = express();

var weapons = ['rock','paper','scissors'];

app.get('/', function(request,response) {
  response.send('Hello world');
});

app.get('/roshambo', function(request,response,next) {
  response.json('Rock, Paper, or Scissors please');
});

app.param('weapon', function(request,response,next) {
  var weapon = request.params.weapon.toLowerCase();
  if (weapons.indexOf(weapon) >= 0) {
    next();
  } else {
    response.status(400).json("We are playing Roshambo here, hipster!");
  }
});

app.get('/roshambo/:weapon', function(request,response,next) {
  var humanThrew = request.params.weapon;
  var botThrew = botThrows();
  var winner = whoWon(humanThrew,botThrew); 
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
