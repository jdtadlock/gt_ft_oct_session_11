var router = require('express').Router();
var cheerio = require('cheerio');
var request = require('request');
var Player = require('../server');

// Player.find({}, function(err, players) {
// 	console.log(players);
// })

// Player.find({}).then(function(players) { console.log(players); });

// localhost:5000/api/scrape
router.get('/scrape', function(req, res) {
	request('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(err, response, body) {
		var $ = cheerio.load(body);
		var rows = $('table#rank-data .player-row');
		
		Player.remove({}).then(function(result) {
			rows.each(function(index, row) {
				var rank = $(row).find('td:first-child').text().trim();
				var name = $(row).find('.player-label').find('a').text().trim();			
				// console.log(rank);
				var player = new Player({
					name: name,
					ranking: rank
				});

				player.save();
			});
		});
		
		// setTimeout(function() {
		// 	console.log($('aside table').html());
		// }, 2000);
	});
	// res.send({
	// 	message: 'All good'
	// });
});

module.exports = router;