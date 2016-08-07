+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #15"
date = "2014-01-17T08:46:35.000Z"
tags = ["webpositive", "contract", "Services Kit", "contract work"]
+++

Hello again!

No big new changes this week, but a lot of small fixes and improvements.

I reviewed the growing issues list for Web+ on the bug tracker, and fixed several of them. Most of these were small and rather easy to fix bugs (I kept all the harder ones for later). Here is a list with comments, not that the issues were hard to track, but this is also a way to learn a bit more about the WebKit codebase.

Web+ crashed when trying to upload a file to GMail. This was a bug in our BFormDataIO code we use for serializing the form data into the HTTP stream. It missed the case where the first element in the form was a file, and tried to read from it without initializing it first. The FormDataIO class is used so we don't have to put the whole form data in memory in order to send it. It handles each form element one at a time, with special case for files, which are streamed from disk in small chunks, rather than loaded into memory.

Web+ also crashed when trying to decode a huge image. The test case for this is a 93MB JPEG file that expands to 700+MB of pixel data. ShowImage manages to display that, however Web+ tries to do incremental decoding, showing an incomplete view of the image as it is loaded. Our implementation of this is not optimal, as there are at least two copies of the data, one in a BBitmap and one as a raw byte array. For now I fixed the crash, but we abort the decoding and just show a blank page instead. We may want to review the image code to lower the memory use.

I implemented listing local directories in the Services Kit. WebKit has support for rendering directories as part of their FTP handling. Returning files list in one of the formats FTP listings use (there is no standard for this, but a few common formats in use) makes WebKit parse it and generate an HTML page for listing. There are still some problems with encoding (WebKit doesn't seem to expect UTF-8 filenames in those listings), but things should be working now. I also fixed some problems with symlinks in the file:// protocol handler.

Some drawing glitches were fixed (again). We're now in a state where all improvements will require adding support to BView.

There was also a problem with opening links in a new tab from inside a frame. I also added shift+middle click as a way to open a link in a new tab and immediately switch to it (middle click alone opens the tab in the background).

I did several fixes to Cookie management. The most important one is there was a bug in the code for getting cookies for a specific website. A misuse of our StringHash class (this is a simple class that allows using a string as a hash for a hash map) led to memory corruption. We were trying to set the key for the map to a substring of the previous key to implement domain exploration (so a site at www.example.com can access cookies set at example.com - but not for just 'com'). Basically, the HashString freed the old key, then tried to copy characters from it to the new key, using memcpy. This is a classic use-after-free problem, that didn't always create problems in normal run, but was very obvious when running the browser with libroot_debug. Another fix was the proper implementation of CookiesForDOM. This is one of the two methods for accessing cookies. We used the same code as for the access from Javascript, but CookiesForDOM must also include "HttpOnly" cookies. Finally, a third bug was wrongly parsing the expiration date for cookies using the local time zone, whereas they need GMT dates. Depending on your timezone, this lead to cookies expiring too late (you probably didn't notice) or too early, sometimes right in the past. For example, some banking website use short-lived cookies (1 hour or less) as a timeout system. In my GMT+1 timezone, the cookie was expired immediately and I couldn't even access the login screen.

Some fixes went into the SSL support. One case of crashing was fixed, we were deleting the OpenSSL connection context before the network thread had a chance to exit, leading to a crash when leaving an https page before it finished loading. I also started work towards proper support for certificate checking. SSL connections didn't do any checking for certificates, and actually didn't even load the certificate store, making the SSL host authentication useless (you still get the encryption, but you can't make sure you're sending things to the right server). I implemented the Network Kit side of things, but now I must get this exposed in the Services Kit, then in WebKit, and finally add a nice dialog in Web+ asking what to do. Then, I must get the answer back to the network kit and continue or stop the connection with the unsafe host.


On WebKit side, I did a lot of small - but useful! - usability enhancements.

We got the error reporting for non-http connections working again. When trying to open a non-existing file:// URL, you now get a "file not found" message instead of a blank page.

The URL bar now always has an icon (the default is a little globe), to avoid the URL jumping to the right when the favicon gets shown. I also fixed some glitch pixels below the text in that bar, when using small font sizes.

I reworked some of the bookmark loading code. Now, bookmarks load in the current window, instead of the first window they can find in the workspace. If you open several of them at the same time, it works as expected. There was a race condition leading Web+ to try opening several bookmarks in the same tab, with of course only the last one showing up. Another problem was it was not possible to use symlinks in the bookmarks folder, as the BNavMenu we use for bookmarks wasn't traversing them. This now works as expected.

The search page in Web+ is now configurable. This means you can switch to goodsearch.com and help raise some money for Haiku while searching! Or, you can use the local version of Google or whatever search engine you prefer. The bug that made us unable to search for UTF-8 strings was also fixed, so you don't have to search in english anymore. And, there was also some progress with IDN domains, but the complete fix for this will have to wait for the next update to the WebKit package.


So, what's next? I will continue working on better SSL support, as this is currently set as an alpha blocker. I also plan to have a look at doing a bookmark bar. I tried doing this as a BMenuBar + BNavMenu, but these classes aren't designed for multiple inheritance, so I have some refactoring to do there. Or maybe I should go with another approach.

The "network lock-up" bug and missing BView features are also still fairly high on the TODO list, but these will need more time as I'm not as familiar with the code in these areas.


I didn't do this for some time, but let's also talk about non-working-hours time I also spent on Haiku. I did some Haikuporter recipes for XRick, OpenTTD, and a few other games. I also finally made a recipe for libusb, and others have used this to compile libftdi and avrdude. This isn't quite working yet, but I hope someone gets it going so I can finally do some hardware hacking on Haiku (did I hear blinkenlights?).

See you next week!