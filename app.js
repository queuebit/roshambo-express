var express = require('express');
var app = express();

app.get('/', function(request,response) {
  response.send('Hello world');
});

app.get('/roshambo', function(request,response,next) {
  response.json('Rock, Paper, or Scissors please');
});

app.get('/roshambo/:weapon', function(request,response,next) {
  response.json('You threw a ' + request.params.weapon);
});

app.listen(3001, function() {
  console.log('Rock, Paper, Scissoring on port 3001');
});
