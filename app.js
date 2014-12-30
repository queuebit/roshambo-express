var express = require('express');
var app = express();

app.use('/roshambo', express.static(__dirname + '/public'));

var roshambo = require('./routes/roshambo');
app.use('/roshambo', roshambo);

app.route('/')
  .get(function(request,response) {
    response.send('Hello world, game found at /roshambo.');
  });


module.exports = app;
