+++
type = "blog"
author = "axeld"
title = "Introducing The Desktop"
date = "2005-10-31T23:38:00.000Z"
tags = ["desktop", "app_server"]
+++

<p>Since it would probably be boring if I just wrote which bugs I fixed in the app_server today, or which function I renamed to make it easier on the eyes, I think I can better use this forum to introduce some app_server concepts, in varying detail, and in small steps.</p>

<p>The first concept I will introduce you to is the Desktop. Not the Desktop you see as part of your daily (?) computer experience, but the Desktop as the app_server manages it. Every user logged into your system will get a different Desktop object. Every user? Well, for now, this is just you - but the app_server can manage as many desktops as needed. If you notice this for R1 remains yet to be seen, but the chances for this are not too bad.</p>

<p>Anyway, every desktop has certain input devices, and output devices assigned. It will also manage all applications of its user, and the workspaces configurations the user has defined. The desktop also knows all screens visible on screen and their order. If a desktop object is deleted, it will also quit all applications the user had running, and that will also close all windows those applications had opened before.<br/>
Your physical screen(s) as well as all the mice and keyboards connected to your computer will typically be owned by the desktop object. Of course, if you happen to have two of everything, these resources could also be shared between concurrently logged in users. The input or output devices may also be connected via the network, even though it's not very likely that this will be supported in R1.</p>

<p>Right now, when a BApplication is created, the application will first ask the app_server for a desktop object, and when the application got this object, it will then have the desktop create the server part of the BApplication, which is currently called ServerApp. That's usually about all an application will talk to the desktop - even if it's the main actor, it will also stay in the background, and delegate most features to other classes.</p>

<p>A desktop object is only created, if an application asks for it - and that will be the moment when you'll need to authorize yourself to be able to open anything on screen. Right now, the app_server doesn't care about passwords, though. The desktop object is the app_server's key to multi-user support - even if it is currently not really used that way, it lays the foundation for R2 and beyond.</p>
