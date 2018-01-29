var router = require('express').Router();
var Player = require('../server');

router.get('/', function(req, res) {
	Player.find({}).then(function(players) {	
		res.render('index', {players: players});
	}).catch(function(err) { res.send({err: err}); });	
});

module.exports = router;