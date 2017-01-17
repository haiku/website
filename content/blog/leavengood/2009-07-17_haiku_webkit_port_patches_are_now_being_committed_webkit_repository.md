+++
type = "blog"
author = "leavengood"
title = "Haiku WebKit Port Patches Are Now Being Committed Into the WebKit Repository!"
date = "2009-07-17T06:11:16.000Z"
tags = ["WebKit", "gsoc 2009", "native browser"]
+++

After much effort from my GSoC student Maxime Simon and plenty of gentle coaxing from WebKit reviewers, I'm proud to announce that the various patches to add support for Haiku as a platform in WebKit are now being committed!

Maxime took my code from the original Haiku port I made in 2007 and updated it for the latest WebKit, which changes a lot daily, so you can imagine the state of the port after a few years! Still it was good to see that my previous effort was not to be wasted and it did not take Maxime long to start posting bugs and patches at the WebKit Bugzilla site.
<!--more-->

Unfortunately my code was not as polished as it should have been, so the WebKit reviewers had quite a few suggestions for improvement. Maxime quickly updated the code after each suggestion and made a new patch.

As might be expected this process has taken some time for such a large amount of code, but today Adam Barth started committing our approved patches. My thanks go to Adam for this, as well as to WebKit reviewers Eric Seidel, Oliver Hunt and David Levin for taking the time to patiently review our code. Plus my student Maxime deserves thanks for all his work to make this happen.

Now before everyone gets too excited, this does not mean our port is "complete." Really this is just the first step (though a big step) in probably many to get our port into a usable state. We still also have a lot of work to do on the browser which will make use of this port. But once all our patches are committed to the WebKit repository it will be much, much easier for Maxime and I (and maybe others) to improve the port.

So I hope to see great progress in the next few weeks. Maxime get your Programmer's High Caffeine Cola stocked up!