+++
type = "blog"
title = "Launching apps on Haiku"
author = "Nephele"
date = "2023-07-12 16:00:13+02:00"
tags = ["haiku", "software"]
+++

Argument handling on Haiku

Hi, I'm Nephele. I've not made a blog post before, but this seemed like a good opportunity.

There are two main ways to start an application from Haiku's UI, directly and indirectly.
Directly by opening it, and indirectly by opening a file that the application you want supports (and is configured to handle).

The indirect way involves opening a file that the application supports and having the mimetype plus the registrar figure out where to forward this to. This can be done by launching a new application or by forwarding it to a running application via a BMessage.
(This is also how "open" in the Terminal works, it will open each argument as a document to open. Unlike xdg-open this supports opening multiple files at once.)

Another way is directly by double-clicking the application icon itself, or by running it in Terminal.

On Haiku, an application normally receives the launch flags via a BMessage, delivered as a B_REFS_RECEIVED type message. 
This is the native and *only* way Haiku provides launch arguments to applications via the indirect path.

Now, there are some flags that alter the behaviour of an application when it's launched.
These are set in the resources of the application, which is embedded in their ELF file directly, not their attributes.

These are:
* B_SINGLE_LAUNCH
--- This will make the registrar ensure only one app with this app signature is running at any given time.
* B_EXCLUSIVE_LAUNCH
--- The same as B_SINGLE_LAUNCH, with the exception that it is per signature AND file location,
--- moving the file to a second location therefore allows the application to be started a secoind time.
*  B_MULTIPLE_LAUNCH
--- There are no restrictions on how many times this app can be opened.
* B_BACKGROUND_APP
--- This is intended for "service" like executables, they are hidden from the Deskbar and among other things
--- receive less lenience when it is time to shut down compare to GUI applications.
* B_ARGV_ONLY
--- Marks the application as unable to handle BMessages.

A note to B_ARGV_ONLY: This does *NOT* put arguments into argv!

This flag is only meant to show that the application does not respond to messages and has to be started with an argv.
This is basically never the intended case for GUI applications, and is intened only for "utilites" like ls on the shell interface.
GUI applications always have a BApplication object, or at least a connection to the app_server.
They have to respond to messages in order for the Screenshot application to work.
With this flag set, however, they won't receive the message.
They will also be killed on shutdown directly without any "nice" message to quit, which would have been delievered as a BMessage.

Unless you have a very good reason, never use B_ARGV_ONLY for GUI applications!

Now, that is for native applications. How do ported applications get their arguments, if they only support argv?

Usually this is done directly by their respective toolkit, QT for example has native support for file reference messages via the [QFileOpenEvent](https://doc.qt.io/qt-6/qfileopenevent.html).
If an application does not support this however there is a QT specific flag called [Q_REF_TO_ARGV](https://github.com/threedeyes/qthaikuplugins/blob/98be82eb11349358e35bfa653edddd915237de7f/platforms/qhaikuplatform/haiku/qhaikuintegration.cpp#L197) and [Q_REF_TO_FORK](https://github.com/threedeyes/qthaikuplugins/blob/98be82eb11349358e35bfa653edddd915237de7f/platforms/qhaikuplatform/haiku/qhaikuapplication.cpp#L125), which overide the argv after launch, and start the application again with /bin/sh with the argument list respectively.
This however is only a workaround, and specific to the Toolkit.

This caused some confusion (including a humorous misunderstanding that Haiku did not support utf-8 :)).

SDL2 has a [native file drop API](https://wiki.libsdl.org/SDL2/SDL_DropEvent) that applications can support.

Fortunately, many toolkits already support our way with an API. Why? Because MacOS does it in a similar way.
