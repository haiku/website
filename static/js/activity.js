/*
 * Copyright 2017, Haiku Inc. All rights reserved.
 * Distributed under the terms of the MIT License.
 *
 * Contains portions of John Resig's Pretty Date.
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 *
 * Authors:
 *		Augustin Cavalier <waddlesplash>
 */

const DISPLAY_ITEMS_COUNT = 7;

var getURL = function (url, successHandler, errorHandler) {
	var xhr = typeof XMLHttpRequest != 'undefined' ?
		new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('get', url, true);
	xhr.onreadystatechange = function() {
		var status;
		var data;
		// https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
		if (xhr.readyState == 4) { // `DONE`
			status = xhr.status;
			if (status == 200) {
				data = xhr.responseText;
				successHandler && successHandler(data);
			} else {
				errorHandler && errorHandler(status);
			}
		}
	};
	xhr.send();
};
var escapethingy = document.createElement('textarea');
function escapeHTML(html) {
    escapethingy.textContent = html;
    return escapethingy.innerHTML;
}
function timeToNow(isodate) {
	var a = new Date();
	var b = new Date(isodate);
	var diff = parseInt((a - b) / 1000),
		day_diff = Math.floor(diff / 86400);
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
		day_diff == 1 && "yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}


var tabs = document.querySelectorAll("#activity-tabs li");
for (var item of tabs) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		var n;
		if (n = document.querySelector("#activity-tabs li.active")) n.classList.remove("active");
		e.target.parentNode.classList.add("active");
		if (n = document.querySelector("#activity-tabs .tab-content .active")) n.classList.remove("active");
		document.querySelector("#activity-tabs .tab-content " + e.target.hash).classList.add("active");
	});
}

var tabSrc = document.querySelector("#activity-tabs #source");
getURL("https://api.github.com/repos/haiku/haiku/commits", function(data) {
	var json = JSON.parse(data);
	var html = "<ul>";
	for (var i = 0; i < DISPLAY_ITEMS_COUNT; i++) {
		html += '<li><a target="_blank" href="https://cgit.haiku-os.org/haiku/commit/?id=' + json[i].sha +
			'">' + escapeHTML(json[i].commit.message.split("\n")[0]) + '</a><span style="float:right">' +
			timeToNow(json[i].commit.committer.date) + "</span></li>";
	}
	html += "</ul>";
	tabSrc.innerHTML = html + tabSrc.innerHTML;
});
