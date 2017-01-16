/*
 * Drupal 6 Generated HTML -> Hugo
 * (C) 2017 Augustin Cavalier <waddlesplash>
 */

var fs = require('fs');
var request = require('request');

if (!fs.existsSync("content")) {
	console.log("This script must be run from the root of the repository.");
	process.exit(1);
}

const ACTUAL_CONTENT_BEGIN = '<div class="content">';
const CONTENT_PRE = '<div id="content-content">';

var fetch = fs.readFileSync('needs_fetching.txt', {encoding: "UTF-8"}).split("\n");
for (var i in fetch) {
	var vars = {
		page: fetch[i],
		url: "https://www.haiku-os.org/" + fetch[i].substr(0, fetch[i].indexOf("."))
	};
	if (vars.page.indexOf("news/") == 0 && vars.page[9] == '-') {
		vars.url = vars.url.substr(0, 40) + '/' + vars.url.substr(41);
	}
	setTimeout((function() {
		console.log("starting request for '" + this.url + "'");
		var thisThis = this;
		request(encodeURI(this.url), function (error, response, body) {
			if (error || response.statusCode != 200) {
				if (response)
					console.log("Fetching '" + this.url + "' failed with " + response.statusCode + "!");
				if (error)
					console.log(error);
				return;
			}

			var loc_begin = 0;
			if (body.indexOf(CONTENT_PRE) != -1)
				loc_begin = body.indexOf(CONTENT_PRE) + CONTENT_PRE.length;
			var page_content = body.substr(body.indexOf(ACTUAL_CONTENT_BEGIN, loc_begin) + ACTUAL_CONTENT_BEGIN.length);
			// Pseudo-parse the divs.
			var loc_last = 0;
			var div_count = 1;
			while (div_count > 0 || loc_last == 0) {
				if (page_content.indexOf("<div", loc_last) != -1 &&
						page_content.indexOf("<div", loc_last) < page_content.indexOf("</div", loc_last)) {
					div_count++;
					loc_last = page_content.indexOf("<div", loc_last) + 1;
				} else if (page_content.indexOf("<div", loc_last) == -1 ||
						page_content.indexOf("</div", loc_last) < page_content.indexOf("<div", loc_last)) {
					div_count--;
					loc_last = page_content.indexOf("</div", loc_last) + 1;
				} else {
					console.error("Both if tests failed -- should not be able to get here!");
					process.exit(1);
				}
			}
			page_content = page_content.substr(0, loc_last - 1);

			var file = fs.readFileSync("content/" + thisThis.page, {encoding: "UTF-8"});
			file += page_content;
			fs.writeFileSync("content/" + thisThis.page, file);
			console.log("wrote file '" + thisThis.page + "'");
		});
	}).bind(vars), i * 4000);
}
