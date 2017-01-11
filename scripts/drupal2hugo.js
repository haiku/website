/*
 * Drupal 6 CSV dump->Hugo
 * (C) 2016 Augustin Cavalier <waddlesplash>
 *
 * NOTE: This script requires about 3GB of RAM. nodejs limits you to 1.5GB by default.
 * Override it by running this script with "node --max_old_space_size=4096 drupal2hugo.js".
 *
 * NOTE: CSV dumps generated using:
 *    sudo mkdir /tmp/mysql_dump_dir/
 *    sudo chmod u=rwx,g=rwx,o=rwx /tmp/mysql_dump_dir/
 *    sudo mysqldump --fields-enclosed-by='"' --fields-terminated-by=',' --tab /tmp/mysql_dump_dir/ website_livesite
 *
 * NOTE: The only CSV files you need from the dump are:
 *    node.txt, node_revisions.txt, url_alias.txt, term_data.txt, term_node.txt
 */

// Set this to `true` if you want to skip export of files that already exist.
// If false, it will abort with an error if a file already exists.
// BE VERY CAREFUL WHEN SETTING THIS TO TRUE, STRANGE THINGS MAY HAPPEN.
// DO NOT SET TO "true" ON FIRST RUN.
const SKIP_EXISTING_FILES = true;

var fs = require('fs');

function ParseCSV(csv) {
	var rows = [];
	for (var i = 0; i < csv.length; i++) {
		var row = [];
		for (; i < csv.length; i++) {
			if (csv[i] == '"') {
				i++;
				var itm = '', done = false;
				while (!done) {
					switch (csv[i]) {
					case '"':
						done = true;
						break;

					case '\\':
						i++;
						switch (csv[i]) {
						case "r":
							itm += "\r";
							break;
						case "n":
							itm += "\n";
							break;
						case "t":
							itm += "\t";
							break;
						case '"':
							itm += '"';
							break;
						case "\r":
							itm += "\r";
							break;
						case "\n":
							itm += "\n";
							break;
						case "\\":
							itm += "\\";
							break;
						default:
							console.log("WARN: unknown escape sequence: \\" + csv[i] + ", row[0] = ", row[0]);
							itm += csv[i];
							break;
						}
						break;

					default:
						itm += csv[i];
						break;
					}
					i++;
				}
				i--;
				row.push(itm);
			} else if (csv[i] == "\n") {
				break;
			}
		}
		rows.push(row);
	}
	return rows;
}

var nodes = ParseCSV(fs.readFileSync('export/node.txt', {encoding: "UTF-8"})),
	node_revisions = ParseCSV(fs.readFileSync('export/node_revisions.txt', {encoding: "UTF-8"})),
	url_alias = ParseCSV(fs.readFileSync('export/url_alias.txt', {encoding: "UTF-8"}));

var term_data = ParseCSV(fs.readFileSync('export/term_data.txt', {encoding: "UTF-8"})),
	term_node = ParseCSV(fs.readFileSync('export/term_node.txt', {encoding: "UTF-8"})),
	TagMap = {};
// Create TagMap
for (var i in term_data)
	TagMap[term_data[i][0]] = term_data[i][2];
term_data = [];

var header_template =
`+++
type = "TYPE"
title = "TITLE"
date = "DATE"
tags = [TAGS]
+++`;
// author = "AUTHOR"

var base = "newsite/content";
function GetSavePath(path, type, node, ext) {
	if (!ext) {
		console.log("No extension for node ", node);
		process.exit(1);
	}

	var countSlash = (path.match(/\//g) || []).length;
	if ((type == "blog" && countSlash == 3) ||
		(type == "content_news" && countSlash == 2)) {
		// Some old blog content had a "/" between the date and the post title
		// So we replace the last '/' with an '_'.
		path = path.substr(0, path.lastIndexOf("/")) + "_" + path.substr(path.lastIndexOf("/") + 1);
	}

	path = path.split("/");
	var ret = base;
	for (var i in path) {
		ret += "/" + path[i];
		if (fs.existsSync(ret)) {
			// Path exists. Are we at the end?
			if (i == (path.length - 1)) {
				// Check if there already is an index file.
				ret += "/index";
				if (fs.existsSync(ret + ".txt") || fs.existsSync(ret + ".md") || fs.existsSync(ret + ".html")) {
					if (SKIP_EXISTING_FILES) {
						// Assume the file was created in a previous run, skip export.
						return false;
					} else {
						console.error("FATAL: could not find unused path for", path.join('/'), node);
						process.exit(1);
					}
				} else { // Nope, doesn't exist, so let's use it.
					ret += ext;
					break;
				}
			} else // We aren't at the end, just continue.
				continue;
		} else {
			// Path does not exist. Are we at the end?
			if (i == (path.length - 1)) {
				// This is it.
				if (fs.existsSync(ret + ".txt") || fs.existsSync(ret + ".md") || fs.existsSync(ret + ".html")) {
					if (SKIP_EXISTING_FILES) {
						// Assume the file was created in a previous run, skip export.
						return false;
					} else {
						console.error("FATAL: file already exists for", path.join('/'), node);
						process.exit(1);
					}
				}
				ret += ext;
				break;
			} else {
				// We aren't at the end, and the path does not exist. Create a directory.
				fs.mkdirSync(ret);
				// Is there a file with the name of the folder we just made?
				// If so, make it the index.html of the subdirectory.
				if (fs.existsSync(ret + ".html"))
					fs.renameSync(ret + ".html", ret + "/index.html");
				else if (fs.existsSync(ret + ".md"))
					fs.renameSync(ret + ".md", ret + "/index.md");
				else if (fs.existsSync(ret + ".txt"))
					fs.renameSync(ret + ".txt", ret + "/index.txt");
			}
		}
	}
	return ret;
}

/* "format" types are apparently:
 *    2: PHP code
 *    3: Full HTML
 *    5: Text w/limited HTML
 *    8: Text w/very limited HTML
 *    10: Plain text
 */
var FormatMap = {
	"0": ".html",
	"2": ".html",
	"3": ".html",
	"5": ".md",
	"8": ".md",
	"10": ".txt"
};
var hasPhpCode = [];
for (var i in nodes) {
	if (nodes[i][2] == "forum")
		continue;
	var node = nodes[i];
	var nid = node[0],
		type = node[2],
		title = node[3],
		isPublished = (node[5] == "1"),
		created = node[6],
		changed = node[7],
		content = undefined,
		url_dst = undefined,
		format = undefined,
		tags = [];
	if (!isPublished) {
		console.log("INFO: skipping nid" + nid + ", unpublished");
		continue;
	}
	for (var i in node_revisions) {
		if (node_revisions[i][0] != nid)
			continue;
		if (node_revisions[i][7] != changed)
			continue;
		content = node_revisions[i][4];
		format = node_revisions[i][8];
	}
	if (!content) {
		console.log("WARN: could not find content for nid" + nid);
		continue;
	}
	var url_src = 'node/' + nid;
	for (var i in url_alias) {
		if (url_alias[i][1] != url_src)
			continue;
		url_dst = url_alias[i][2];
		break;
	}
	if (!url_dst) {
		// If it's a news article, try to invent a URL
		if (type == "news" || type == "content_news") {
			url_dst = "news/" + (new Date(parseInt(created) * 1000)).toISOString().substr(0, 10) + "_" +
				title.toLowerCase().replace(/\ /g, "_");
			console.log("WARN: No url_dst for nid" + nid + ", invented one");
		} else
			url_dst = url_src;
	}
	for (var i in term_node) {
		if (term_node[i][0] != nid)
			continue;
		var tag = TagMap[term_node[i][1]];
		if (tags.indexOf(tag) == -1)
			tags.push(tag);
	}

	var outfile = header_template + '\n\n', realtype = '';
	if (type == "blog")
		realtype = "blog";
	else if (type == "content_news" || url_dst.indexOf("news/") != -1)
		realtype = "news";
	else
		realtype = "article";
	outfile = outfile
		.replace("TYPE", realtype)
		.replace("TITLE", title.replace(/"/g, '\\"'))
		.replace("DATE", (new Date(parseInt(created) * 1000)).toISOString())
		.replace("TAGS", tags.length ? ('"' + tags.join('", "') + '"') : '');
	if (type == "blog") {
		var blogAuthor = url_dst.split('/')[1];
		if (blogAuthor == "pulkomandy")	blogAuthor = "PulkoMandy"; // HACK
		if (blogAuthor == "barrett")	blogAuthor = "Barrett"; // HACK
		outfile = outfile.replace("\ntitle", '\nauthor = "' + blogAuthor + '"\ntitle');
	}

	content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	// Try to clean up some of the CSS classes.
	content = content.replace(/\"box\-stop\"/g, '"alert alert-danger"');
	content = content.replace(/\"box\-info\"/g, '"alert alert-info"');
	content = content.replace(/\"box\-warning\"/g, '"alert alert-warning"');
	// Clean up <code> tags.
	for (var i = 0; i < content.length; i++) {
		i = content.indexOf("<code>", i);
		if (i == -1)
			break;
		// See if there is a linebreak before the </code>.
		var j = content.indexOf("</code>", i), hasBreak = false;
		for (var p = i; p < j; p++) {
			if (content[p] == "\n") {
				hasBreak = true;
				break;
			}
		}
		if (hasBreak) {
			content = content.substr(0, i) + "<pre>" + content.substr(i + 6);
			content = content.substr(0, j - 1) + "</pre>" + content.substr((j - 1) + 7);
		}
	}

	outfile += content;

	var file = GetSavePath(url_dst, type, node, FormatMap[format]);
	if (file !== false) {
		console.log("INFO: writing (nid" + nid + ")", file);
		if (format == "2")
			hasPhpCode.push(file);
		fs.writeFileSync(file, outfile);
	}
}

console.log("");
console.log("The following pages have PHP code in them and should be audited:", hasPhpCode);
