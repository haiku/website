/*
 * Copyright 2016, Haiku Inc. All rights reserved.
 * Distributed under the terms of the MIT License.
 *
 * Authors:
 *		Augustin Cavalier <waddlesplash>
 */

var toggler = document.getElementById("navbar-toggler"),
	navbar = document.getElementById("navbar-collapseme");
toggler.onclick = function () {
	navbar.classList.toggle('collapse');
};
