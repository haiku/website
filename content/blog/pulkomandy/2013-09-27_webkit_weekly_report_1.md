+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #1"
date = "2013-09-27T08:56:01.000Z"
tags = ["webpositive", "WebKit", "contract", "distcc", "cmake", "contract work"]
+++

Hey, it's Friday already !

So, now that I'm (mostly) done moving and I have set up my workplace (including internet access, electricity, and everything required), I can finally start doing some actual work on WebKit. So, what's hapenned this week ? Well, actually, not that much.

A quick reminder, you can follow the commits on the <a href="https://github.com/haiku/haiku-webkit/tree/bnetapi" title="bnetapi branch of haiku-webkit repo">bnetapi branch of haiku-webkit repo at github</a>.

I've also set up a <a href="https://gist.github.com/pulkomandy/6685664#file-bnetapi-webkit-bugs-md">Gist</a> TODO list so you can see things I want to work on. Please send me comments about websites that don't work well, I'll add them to the list and see what can be done.
<!--break-->
Now on to the actual coding work. I added support for relative URLs in 302 redirections in WebKit network code. While not part of the HTTP protocol standard, this is widely used by many web servers (such as Apache) and was required to get the Roundcube webmail working with the Service Kit based WebKit port. That was the only bugfix this week.

The next item I want to cross from the TODO list is a crash that happens when going to http://play.google.com (and some other websites, but this is an easy way to reproduce it). The issue is on the WebKit side and was already fixed there, so all that's needed is to merge some commits from their repository, recompile, and enjoy. Sounds easy ? Well, not so much.

I was able to merge said commits and update our port by about 3000 commits at once. This went smoothly and without too much conflicts. However, I was not able to get the result to build yet. The problem is the Haiku port of WebKit is built using Jamfiles. This is our buildsystem of choice and is used for Haiku itself as well as various other projects in the Haiku community, with the Jamfile engine making it very easy to use for Haiku apps.

The build system for WebKit is far from unified. Each port comes with its own buildfiles, with for example the Qt port using QMake, the GTK version using autotools, the Apple versiosn (iOS and OSX) using XCode projects, the windows version using Visual Studio project files, and the EFL, BlackBerry and Windows CE ports using CMake. There are some more.

In an attempt to bring some uniformity, the WebKit team has provided a set of scripts (mostly perl) that will pick the right build system and run it with approrpiate command line for you. This way, you can run a build for any of these platforms using the same command line.

Our Jamfiles are not included inside this script system, and they are not kept up to date when there are changes to WebKit. Files are added and removed, new options are introduced, older ones are deprecated and removed, and our Jamfiles get very out of sync.

Rather than updating hte Jamfiles, I'm now having a try at using the CMake build system for Haiku as well. I picked CMake because it is the most widely used one in WebKit (for 3 platforms) and the scripts are quite readable and well designed. Since EFL and BlackBerry are two UNIX-Based platforms (EFL is supported by Samsung, and is the version used for their Tizen mobile operating system), the files I had to write for the Haiku port weren't very different from the existing ones, and the availability of the WinCE port makes sure nothing is hardwired to the "UNIX way" in places where we don't follow it.

Unfortunately, messing with the build system means I often have to clear the whole generated directory and start over to test some changes. It takes a lot of time to run the full build on my aging laptop, so I've set up a distcc compiling farm using all 3 capable machines I have at hand. This allows me to run the build a bit faster and keep some spare CPU for running Web+ and writing this blogpost.


When my worktime is over, I'm also still improving fRiSS, the Service-Kit based RSS and ATOM feed reader. I've been fixing some issues with XHTML ATOM feeds and cleaned up some parts of the code. I still have some bugs to solve and testing to do, but I'll doon release a 0.8 version with a cleaner user interface and some new features.

I'll try to keep posting to this blog every week, even if I ma not have much to say. So, see you next week!