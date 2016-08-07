+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #3"
date = "2013-10-11T06:53:52.000Z"
tags = ["serviceskit", "Services Kit", "webpositive", "WebKit", "contract work", "contract"]
+++

Hello again, it's time for another report !

I made pretty good progress this week.

The issues I had last week with POST data are fixed. I had removed a non-working piece of code but replaced it with another that was broken in a different way. The problem was the way POST data was added to the http request. Fixing this properly required some changes to the Services Kit API. I removed some classes to make things simpler and introduced a stub for the central BUrlProtocolHandler class, which takes an Url as a parameter and builds a request for it using the appropriate protocol. The BUrlProtocolHttp class was renamed to BHttpRequest, and the API was tweaked to use multiple methods to configure it, instead of a single SetOption(option_name, value) method. This allows seting options with multiple parameters, and is more type-safe.

I started writing some documentation in the Haiku book, for both the Service Kit and the new Network Kit. BeOS already had a Network Kit, and the same API is available in Haiku, but we also have a newer, more flexible and more powerful API. Unfortunately it is undocumented (and unfinished), so there is not a lot of users for it. I hope the documentation will help change that. I'm far from done, however, with just 3 classes available in the Haiku Book (http://api.haiku-os.org).

I finally uploaded WebKit dependencies to the package manager. So, with a recent nightly build, it will be even easier to get started with building WebKit. As I had them around, I also added packages for vim and Caya.

With all this set, I can log in to gmail/google mail again. This means things are working rather well. I even got the web chat to show my online contacts, something that isn't working in the current versions of Web+. I'm also able to log into github, and I found another set of non-working things there (most of them were already broken in older Web+).

I'm now trying to run the tests from http://testsuites.opera.com/cookies. These will help me find and fix some more bugs with cookies management. I already found that cookies set to expire before 1970 would stay forever, because of a bug in the BDateTime class from Support Kit. There are some other issues detected by this test, and it does not make much requests, which makes it easier to debug than an actual production website.

No preview build this week yet, but I'll try to update the WebKit recipe at haikuports so I can cook a package for you to try.


Oh, I forgot to mention our patches to CMake were upstreamed. Version 2.8.13 will have all of them and should build out of the box on Haiku. Also, augiedoggie provided me with a most package, so I can cross that out the TODO list (which is here: https://gist.github.com/pulkomandy/6685664#file-bnetapi-webkit-bugs-md)