+++
type = "blog"
author = "PulkoMandy"
title = "Locale Kit : ICU integration on the way"
date = "2009-07-25T14:46:56.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

<span class="inline inline-left"><a href="/images/locale_kit_interfacing_icu"><img src="/files/screenshots/ICU_Interfacing.thumbnail.png" alt="Locale Kit Interfacing with ICU" title="Locale Kit Interfacing with ICU"  class="image image-thumbnail " width="200" height="171" /></a><span class="caption" style="width: 198px;"><strong>Locale Kit Interfacing with ICU</strong></span></span>

This week two important things happened for my GSoC project: I got commit access to Haiku and I finished working on the catalog part. This mean I can now work more efficiently without having to send my patches trough the GSoC mailing list (you may have noticed I still need my code to be reviewed, however :/).

The catalogs allow strings in an application to be translated. At a first glance you may think this is the only needed thing in a Locale Kit and my work is finished, but it is not the case. The first missing part is the preflet allowing you to select your favorite language. The locale kit will now always try French, if not found default to German, then finally to English. I think this is not the setup most of you want to use.


<!--more-->


But that's not all we need. Good localization needs to provide services to format numbers, dates and some other things. Each country keeps its own system when it comes to formatting. In France you write 1 000,23 while some other countries will use 1,000.23 for the same number. Dates may use YYYY/MM/DD or DD/MM/YYYY or some other more complex format. There are a lot of subtle differences, some countries even use a different format for numbers when it's a monetary value (ie. $600) or a percentage. These things can't be handled properly by the catalog system.

For all these tasks, we have chosen to use ICU as a backend. ICU is an open source library developed by IBM and precisely made to take care of all this aspects of localization. It is an old and mature project that gather a lot of data about the settings for each country. It would be silly to try rewriting all their code in the time allowed for a GSoC project. So this week we started to import ICU in Haiku's source repository. As I'm not very confident with Jamfiles and build systems, Oliver has done a big part of this work while I'm designing the code-side integration of things. Some time ago I posted an UML diagram showing all the classes provided by the locale kit and the API they offered. This API was designed with only OpenTracker in mind at a time when Haiku was still called OpenBeOS. The problem is that some parts of this API don't match ICU's way of doing things very well. ICU has a really high abstraction level, allowing for example the use of roman numerals (XXVII) instead of the decimal system. In this context, there is no thing such as a "decimal point" or "thousand separator". So ICU simply offer no way accessing this kind of details, but only provide methods taking an int as a parameter and returning a formatted string. So it's likely that the API on Haiku's side will change to match this philosophy. The part where this is more visible is the BLanguage class. This was just meant to tell if the current locale use a Right-to-left or a Left-to-right script. The information would then be used by the Interface Kit to display things properly. But in ICU, there is a generic LayoutEngine doing all the formatting work, and there is not even a way to know if a language is Right-to-left or Left-to-right! (or at least I haven't found one yet).

The Interface Kit changes needed for right-to-left language handling are out of the scope of my GSoC project, but I may work on that after GSoC is finished. I will now concentrate on the number and date formatting. As long as ICU integration is not finished, it is not possible to test what I do. In the current state, ICU libraries are compiled, I can link to them, but no data is integrated to the Haiku Image so there is no language available and no formatting can be done. So I spent this week writing untested code, looking at ICU API to find how to interface it to our classes, and thinking a little more on the design of the whole thing. I attached a little diagram showing what it will look like once finished.