+++
type = "blog"
author = "PulkoMandy"
title = "Locale Kit : status update n.2"
date = "2009-05-27T11:51:14.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

These two weeks I've been quite busy with other things, so the project didn't move as much as I wanted. However, I managed to get the catalog engine to internationalize an app for the first time. It's not a big application, just a very simple Hello World test program. And the lack of a tool for translating catalogs means I had to edit them by hand to get the translation done.
I will be working in a Catalog AddOn writing a catalog as full text for easier editing.

So, to test the program, you have to

1) run make
2) mkdir obj.x86/locale
3) mkdir obj.x86/locale/catalogs
4) mkdir obj.x86/locale/x-vnd.Be-HelloWorldSample
5) cpp HelloWindow.cpp > HelloWindow.precpp
6) collectcatkeys -s HELO HelloWindow.precpp -o obj.x86/locale/catalogs/x-vnd.Be-HelloWorldSample/english.catalog
7) run the application
8) you can edit the last occurence of "Hello World!" in the catalog file to change what the app displays.

It seems that attaching catalog as resource or attribute to the executable file doesn't work yet.
You can get the project here: http://dl.free.fr/vqHTlU63B

Feedback is welcome :)


