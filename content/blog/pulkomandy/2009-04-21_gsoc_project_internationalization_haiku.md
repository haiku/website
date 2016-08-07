+++
type = "blog"
author = "PulkoMandy"
title = "GSoC project : Internationalization for Haiku"
date = "2009-04-21T08:02:29.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

Hello world !
As you know, I am one of the selected students for this year summer of code. In this post I will introduce myself and give some details about my project.

My name is Adrien Destugues, some of you may know me as PulkoMandy as i've been lurking on the irc channel and mailing lists for some time. I already applied for the Summer of Code and Haiku Code Drive last year but unfortunately I was not selected. This year it went better :)
I'm studying electronics and computer science at the ENSSAT (École Nationale Supérieure de Sciences Appliquées et de Technologie), in Lannion, France. I used to run BeOS as my main operating system for some time, but I now switched to Linux. I have a running Haiku install on my hard disk, but as my network card is not supported, I don't use it much for everyday work. I hope this will change soon.

Now, some information on my project: the idea was born because we were talking about "which os is better" on the ENSSAT mailing list, between linux, mac os X and windows (the kind of endless discussion student have all the day long ;)). I sent a link to Haiku homepage to point the fact that there was other alternatives, and someone replied "hey, it doesn't even speaks french!". This fact is quite annoying for an operating system targeted to regular users, and not powerful computer geeks. Not everyone speaks english, and this is what an user will see first when running Haiku for the first time. So I decided to improve that and get Haiku internationalized. I did some research on the web and found informations about localization under BeOS. There was a locale kit in zeta, but the Haiku team had already started another project as part of Open Tracker. It was not integrated into Haiku because of some problems, the main one being the way the Be API is used to create windows. As the translated texts have a different length than the original ones, the window may look bad with overlapping texts and other problems similar to font sensivity.
The Layout system can now solve that, so it's about time to get the Locale Kit back to work.

The locale kit must do various things. It provides a way to translate strings, of course, but also offers services for formatting date, time, numbers and currencies. Each country have different rules for that, and any program can ask the locale kit to do the formatting properly. Another service is a natural order sorter, which sort a set of strings alphabetically but with special rules for accents, diacritics, and so on. Of course, all of this has to be done at runtime. This way the language is selected and configured with a simple preflet and all opened applications are instantly translated.
Some kind of compatibility with zeta locale kit and gnu gettext would be nice, it would allow to use translations from other systems, either directly or by using a conversion tool.

The basic layout for all that is already in place in OpenTracker's Locale Kit. However, most of the code is not written, for example there is no code for date formatting, for loading Zeta's catalog files. The API is well designed, so I will keep most of it, and fill in the missing functions. The ICU library will be used as a backend for everything except the translation. It provides all the needed data for doing all the formatting work properly.

The translation can be done with string-based or key-based lookup. The Locale Kit handles a list of catalogs, some of them are specific to an application and some are system- or user-wide. Catalogs can be stored on hard disk as plain files, resources in an application executable or bfs attributes. Catalog format can be added in the form of add-ons.

<h1>List of project goals</h1>
1) Integrate OpenTracker's Locale Kit to the Haiku build system. I've already got it building as part of the 3rdparty/ folder, and got the basic tests working. However a proper integration will need to get out of 3rdparty and fully integrated to the build system.
2) Create an example localizable "Hello World" application and test it. It will allow two things: testing of the kit and showing to programmers the way to use this kit properly.
3) Integrate the ICU library to do the collation (alphabetical sorting) and date/time/number/currency formatting. Don't try to reproduce their huge work in getting a database for all the countries. Modify their code so it compile cleanly under gcc2 (if needed) and integrates cleanly in the Be API.
4) Design and create a preflet for easily changing the language while running Haiku. It will have the following features :
* edit the settings for date, numbers and currencies and save them as user defined settings,
* allow to change the default settings for a country for all these settings,
* allow the user to select his preferred languages in a sorted list.
5) Create tools for translating an application. We need to extract translatable strings from a .cpp source file, and to save a compiled catalog for use at runtime. The current tools are working only under Haiku, and we need them under linux as part of Haiku's build process. If needed, change the catalog format to make it easy to work with, or add an importer add-on to read and write text files.
6) Write an importer (catalog add-on) for Zeta's catalogs and test it with some applications providing a Zeta catalog.
7) Write an importer for GNU gettext format.
8) Modify the code of all the preflets and applications in haiku so they use the localization system (if there is some time left at the end of summer ;))