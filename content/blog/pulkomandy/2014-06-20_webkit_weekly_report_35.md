+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #35"
date = "2014-06-20T07:56:59.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello world, another update!

The most exciting news this week is that I enabled the CSS JIT on Haiku. This is a new feature in WebKit that applies the same optimization techniques used for JavaScript, to CSS. CSS is becoming a complex language, and matching elements in the page with CSS rules and selectors can take a lot of time with complex stylesheets. WebKit will now use a JIT to compile CSS rules, which allows faster matching, and thus faster layout and rendering of the page. Since this uses mostly the same code as JS, enabling it was just a matter of switching the flag on in the webkit compile-time configuration.
<!--break-->
I fixed an important memory leak, so WebKit will now use less memory. Not everything was properly freed when you closed a tab.

I disabled SSE2 instructions (this was already done, but didn't work because one of WebKit build scripts forced them back on). WebPositive can now run on Pentium 2, Pentium 3, and Athlon XP CPUs.

I did some fixes in the interfacing of the BUrl class with WebKit. This improves performance, as URLs can now be passed between BUrl and WebKit without converting them to a string and re-parsing them. It also fixes all the remaining known bugs with URLs.

I added word-wise navigation and selection shortcuts in WebKit. They work just like in BTextView now, and you can use command+left/right to navigate to the next/previous word.

I added the "Save Page" option to WebPositive. This save pages in MHTML, a single-file format that holds the HTML code as well as CSS, javascript, images, and all other resources used by the page. This makes it easy to save the page and share it with someone else (most browsers can open MHTML files). It can also be used as a distribution format for user documentation with your Haiku software. No need for an index.html and separate "images" folder anymore, you can have your documentation in a single file that will open with Web+.

Finally, and perhaps the most important change: Stippi reviewed the HTTP authentication, cookie and cookie jar code and pointed out several problems related to thread safety. I reworked these classes to avoid the issues, so using multiple HTTP connections at the same time, like WebKit does, is a bit more safe. I don't know if all the crashes are fixed, but at least some of them are.

Unfortunately, the next release is still held back because of the drawing optimization problems I mentioned in the previous report. We didn't find a convincing solution to this issue, so I reverted some of the changes to WebKit and I'm now trying to find a solution on that side. This, however, reintroduces some drawing bugs that the slow code had fixed. I will try to find an acceptable compromise here.

Before I close this report, I also wanted to give some news from WebKit. The GTK and EFL ports have stopped supporting the WebKit1 API we are currently using. This is the old single-process version of WebKit. Apple is still using it, because their public API is heavily relying on it, but they strongly suggested we move to WebKit2, the new multi-process API, which is also the one where all the new development is focused. The WebKit1 API isn't going away anytime soon, but it may be a good idea to have a look at WebKit2 and see if we can get it to run on Haiku. However, my main priority currently is getting a stable release of what we currently have, before I start working on new features like this.