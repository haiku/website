/*
 * Copyright 2017-2018, Haiku Inc. All rights reserved.
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

var tabs = document.querySelectorAll("#activity-tabs li");
for (var i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function (e) {
		e.preventDefault();
		var n;
		if (n = document.querySelector("#activity-tabs li.active"))
			n.classList.remove("active");
		e.target.parentNode.classList.add("active");
		if (n = document.querySelector("#activity-tabs .tab-content .active"))
			n.classList.remove("active");
		var tab = document.querySelector("#activity-tabs .tab-content " + e.target.hash);
		tab.classList.add("active");
		if (tab.children[0].classList.contains("loader")) {
			// Tab hasn't yet been loaded
			if (tab.id == "tickets")
				LoadTicketsTab(tab);
			else if (tab.id == "ml")
				LoadMailingListTab(tab);
			else if (tab.id == "pkgs")
				LoadPackagesTab(tab);
		}
	});
}

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
function timeToNow(b) {
	var a = new Date();
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
function MakeListItem(href, txt, date) {
	return ('<li><a target="_blank" href="' + href + '">' + escapeHTML(txt) +
		'</a><span style="float:right">' + (date ? timeToNow(date) : '') + "</span></li>");
}
function InnerXML(xml) {
	var xmls = new XMLSerializer();
	var ret = '';
	for (var i = 0; i < xml.childNodes.length; i++)
		ret += xmls.serializeToString(xml.childNodes[i]);
	return ret;
}

var tabSrc = document.querySelector("#activity-tabs #source");
getURL("https://api.github.com/repos/haiku/haiku/commits", function(data) {
	var json = JSON.parse(data);
	var html = "<ul>";
	for (var i = 0; i < DISPLAY_ITEMS_COUNT; i++) {
		html += MakeListItem('https://cgit.haiku-os.org/haiku/commit/?id=' + json[i].sha,
			json[i].commit.message.split("\n")[0], new Date(json[i].commit.committer.date));
	}
	html += "</ul>";
	tabSrc.innerHTML = html + tabSrc.innerHTML;
});
function LoadTicketsTab(tab) {
	getURL("/exapi/tickets?ticket=on&format=rss&max=10", function (res) {
		var doc = new DOMParser().parseFromString(res, "text/xml");
		var html = "<ul>";
		var items = doc.querySelectorAll("item");
		for (var i = 0; i < DISPLAY_ITEMS_COUNT && i < items.length; i++) {
			var itm = items[i];
			html += MakeListItem(InnerXML(itm.querySelector("link")),
				InnerXML(itm.querySelector("title")),
				new Date(InnerXML(itm.querySelector("pubDate"))));
		}
		html += "</ul>";
		tab.children[0].remove();
		tab.innerHTML = html + tab.innerHTML;
	});
}
function LoadMailingListTab(tab) {
	getURL("/exapi/freelists/haiku-development", function (res) {
		var doc = new DOMParser().parseFromString(res, "text/xml");
		var html = "<ul>";
		var items = doc.querySelectorAll("item");
		for (var i = 0; i < DISPLAY_ITEMS_COUNT && i < items.length; i++) {
			var itm = items[i];
			html += MakeListItem(InnerXML(itm.querySelector("link")).replace("http:", "https:"),
				InnerXML(itm.querySelector("title")), undefined);
		}
		html += "</ul>";
		tab.children[0].remove();
		tab.innerHTML = html + tab.innerHTML;
	});
}
function LoadPackagesTab(tab) {
	getURL("/exapi/packages?natlangcode=en&limit=10&types=CREATEDPKGVERSION", function (res) {
		var doc = new DOMParser().parseFromString(res, "text/xml");
		var html = "<ul>";
		var items = doc.querySelectorAll("entry");
		for (var i = 0; i < DISPLAY_ITEMS_COUNT && i < items.length; i++) {
			var itm = items[i];
			html += MakeListItem(itm.querySelector("link").getAttribute("href").replace("http:", "https:"),
				InnerXML(itm.querySelector("title")).replace(/(.*) - PkgVersion\[versionCoordinates=(.*)\] - (.*) : new version/, "$1 $2 ($3) "), new Date(InnerXML(itm.querySelector("updated"))));
		}
		html += "</ul>";
		tab.children[0].remove();
		tab.innerHTML = html + tab.innerHTML;
	});
}
