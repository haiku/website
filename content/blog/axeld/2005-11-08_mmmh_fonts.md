+++
type = "blog"
author = "axeld"
title = "Mmmh Fonts."
date = "2005-11-08T09:46:00.000Z"
tags = ["fonts", "app_server"]
+++

In the last couple of days, I worked mainly on the font sub-system in the app_server. I didn't think I would spend that much time on it, and I haven't even touched the FreeType backend other than temporarily fixing threaded access to it, as explained earlier.

On BeOS, when starting up, the app_server will scan the well-known font directories, and makes all fonts it finds and supports available to end-user applications. When you install a new font, you have to launch the Fonts preferences application, and press its "Rescan" button. And while you're at it, you can also specify the amount of memory the app_server uses for font caching.

On Haiku, this will work a little bit differently: on startup, the app_server will only make some fonts available - those that we're used the most during the last session. The app_server just stores a short list of those fonts and where they can be found on disk. It doesn't know about other fonts before you ask for one; if you ask for a font the app_server doesn't know yet, or ask for a list of all fonts, the app_server will scan the well-known directories for fonts for the first time. This makes the system boot time completely independent from the number of installed fonts. As a graphics designer, or just a collector, you can now serve your font needs without penalty.

This method does also work in a multi-user scenario: the user font directories are only added to the app_server when you log in - and they, too, are scanned the first time it's necessary, and not just always. Each user will only see the fonts he can really access, the font manager is able to present different font lists for each user.

And when you install a new font, it will be picked up immediately, using node monitoring; it's really surprising how few system components make use of this nice and handy feature in BeOS. That situation is greatly different in Haiku: we are keen to get rid of all those "restart" and "rescan" buttons the BeOS UI present you in one place or another, and node monitoring plays a big role in achieving this.

But let's come back to the Fonts preferences application for a moment: have you ever changed the cache settings there? Have you felt good about it? Did you know what you were doing? Did you notice any change? If you're like me, you can answer with a honest "no" to most of these questions. I think it's a bad option to put into a user accessible preferences application. The app_server should be able to figure out a good value by itself, and maybe even make the cache size dynamic, adapting it to the current work load. For this reason, you won't find that setting anymore in the Haiku Fonts preferences - I took the liberty and removed it.

The app_server font cache is still under construction, and I'll write something about how it will work in one of the next posts.