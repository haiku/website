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

// Functions for updating the donation meter
function addCommas(number) {
	return (number + "").replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}
var monthToName = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
// Transform 1 into 1st, 2 into 2nd, etc. Input should only be 1-31
function formatDay(day) {
	switch (day) {
		case 1:
		case 21:
		case 31:
			return day + "st";
		case 2:
		case 22:
			return day + "nd";
		case 3:
		case 23:
			return day + "rd";
		default:
			return day + "th";
	}
}

var yearlyGoal = 10000;
var donationBarHeight = 128;

function updateDonationMeter() {
	getURL("https://cdn.haiku-os.org/haiku-inc/donations.json", function(data) {
		try {
			var json = JSON.parse(data);
			if (json) {
				// We need to update four pieces of information:
				// 1. Current donation totals

				var goalSpan = document.getElementById("fundraising-goal-text");
				goalSpan.innerText = "$" + addCommas(yearlyGoal);

				var current = json.total_donations;
				var currentSpan = document.getElementById("fundraising-current-text");
				currentSpan.innerText = "$" + addCommas(Math.round(current));

				// 2. The right pixels for the "percentage" donated.
				//    This is (current_donations/10000) * 128, where 10000 is the
				//    yearly goal and 128 is the full height of the "progress bar".
				//    Use min so we don't ever go over 128.
				var percentagePixels = Math.min(
					Math.round((current / yearlyGoal) * donationBarHeight),
					donationBarHeight);
				var progressBar = document.getElementById("fundraising-progress-bar-filler");
				progressBar.style.height = percentagePixels + "px";

				// 3. The date updated
				var updatedAt = new Date(json.updated_at);
				var month = monthToName[updatedAt.getMonth()];
				var updated = document.getElementById("fundraising-updated");
				updated.innerText = month + " " + formatDay(updatedAt.getDate());
				document.getElementById("fundraising-year").innerText =
					updatedAt.getFullYear();

				// 4. The EUR to USD rate
				var eurToUsd = document.getElementById("fundraising-eur-to-usd");
				eurToUsd.innerText = "$" + json.eur_to_usd_rate;
			}
		} catch (e) {
			console.error(e);
		}
	});
}
updateDonationMeter();
