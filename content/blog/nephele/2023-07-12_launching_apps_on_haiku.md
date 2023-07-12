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
(This is also what "open" in Terminal does, unlike xdg-open on linux this does not open arg1 and forward the rest to the command but instead tries to open all arguments as documents)

Another way is directly by double-clicking the application icon itself, or by running it in Terminal.

On Haiku, an application normally receives the launch flags via a BMessage, delivered as a B_REFS_RECEIVED type message. 
This is the native and *only* way Haiku provides launch arguments to applications via the indirect path.

Now, there are some flags that alter the behaviour of an application when it's launched.
These are set in the resources of the application, which is embedded in their ELF file directly, not their attributes.

These are:
0x8		B_ARGV_ONLY
0x4		B_BACKGROUND_APP
0x2		B_EXCLUSIVE_LAUNCH
0x1		B_MULTIPLE_LAUNCH
0x0		B_SINGLE_LAUNCH

Single launch, multiple launch and exclusive launch do pretty much what is expected.
Single launch makes sure only one instance ever runs for this mimetype.
Multiple launch allows the app to run multiple times.
Exclusive launch allows the application, with the same mimetype to run multiple times, but only if the images is started from another location!
That means, if you copy it elsewhere you can start it again, but not from the same place.

Background app hides the team from deskbar. (Bit strange to have this here?)

However, B_ARGV_ONLY does *NOT* what most people expect, it will not put arguments into argv!
This flag is only meant to show that the application does not respond to messages and has to be started with an argv.
This is basically never the intended case for GUI applications. Those always have a BApplication, or at least a connection to the app_server.
They have to respond to messages in order for the Screenshot application to work. With this flag set, however, they won't receive the message.

Unless you have a very good reason, never use B_ARGV_ONLY for GUI applications!

Now, that is for native applications. How do ported applications get their arguments, if they only support argv?

Usually this is done directly by their respective toolkit, QT for example has native support for the "proper" way via the QFileDropEvent.
If an application does not support this however there are QT specific flags to make QT take the initial BMessage and stuff it into argv for the application.
This caused some confusion (including a humorous misunderstanding that Haiku did not support utf-8 :)).

SDL2 has a similar workaround, but also a native file drop API that applications can support.

Fortunately, many toolkits already support our way with an API. Why? Because MacOS does it in a similar way.

