// import express from 'express';
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 5000;
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gt_ft_nov_session_11');

mongoose.Promise = Promise;

var playerSchema = mongoose.Schema({
  name: String,
  ranking: String
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;

// Player.create({
// 	name: 'Randy Johnson',
// 	ranking: '1100'
// });

// Player.find({}, function(err, players) {
// 	if ( err ) return console.log(err);

// 	console.log(players);
// });


var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var html_routes = require('./routes/html_routes');
var api_routes = require('./routes/api_routes');

app.use('/', html_routes);
app.use('/api', api_routes);

app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});