function scrape() {
	$.get('/api/scrape')
		.then(function(res) {
			console.log(res);
		});
}

function init() {
	$('#scrape').on('click', scrape);
}

init(); // Start the app