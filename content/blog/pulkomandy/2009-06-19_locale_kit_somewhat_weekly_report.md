+++
type = "blog"
author = "PulkoMandy"
title = "Locale Kit: (somewhat) weekly report"
date = "2009-06-19T18:42:41.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

Mid-term evaluations for GSoC are already coming...

I'm still working on the catalogs for translating applications. I got the system working and integrated it into Haiku, so now any application can be translated. However, there is still a lot of work to do. I'm now working on a plaintext catalog add on.

Catalogs are the files that store translated strings. There is a catalog add-on called "default" that is used in applications. The problem is that the files for this add on are stored in binary form (as archived BMessages), so it's not easy to translate them.

So, the plaintext catalog add-on will allow developers to extract strings from their source programs and easily translate them in a plain text file. Then it will be possible to convert it to a binary file for use in the application. This is simpler to code than a full featured translation tool (that may come later), and also allow testing of the add-on system.

This is about everything for the catalog system, the other part of the work on this project is the formatting toolkit with functions for formatting dates, times, and numbers. This should be done using ICU, a library that provides all the needed classes, but will be wrapped in the already designed Locale Kit API, which feels more in accordance with the rest of the BeAPI. ICU will also be used to manage a big part of the preflet : language listing, and mapping languages to presets for all the settings.

The last part of the project will be mostly centered on the preflet. It will have to send a message to all the application when the user select a different language, so all the opened window are refreshed automagically.

I have a little problem with my debian setup this week, and for now I can't build haiku under debian anymore. But I will try to build directly under haiku if possible to keep working.
Also, I just finished school exams last week, so from now I will have a lot more free time and I hope the project will speed up a lot.