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
  response.json('You threw a ' + request.params.weapon);
});

app.listen(3001, function() {
  console.log('Rock, Paper, Scissoring on port 3001');
});
