+++
type = "blog"
author = "PulkoMandy"
title = "The summer is back, and HCD comes with it"
date = "2010-06-21T09:20:10.000Z"
tags = ["localekit", "locale", "hcd2010", "hcd", "hcd hcd2010 locale localekit", "contract work"]
+++

Hello Haikuers,
As you know, I worked last year as a GSoC student on the Locale Kit. Unfortunately, I had to get back to school in september and had not much free time to spend on Haiku. I attended the coding sprint at BeGeistert, but my laptop fan died while I was there and forced me to run my cpu at 800MHz, which was quite painful for coding.

<!--more-->

Anyway, I now have a new laptop and I'm getting ready for another summer working for Haiku. This time I'm paid directly by Haiku, Inc.. I will work on the next part of the Locale Kit. The catalogs are working fairly well and there is an ongoing effort to translate Haiku to various languages. There are a lot of translations available in alpha2, and the next release will include even more. However, fully translating a system like Haiku requires more work than just replacing strings. Part of it was already in my GSoC proposal, other things got added while encountering translation problems, and there are also some small (but very annoying) bugs I'd like to solve.

Here's the task list we agreed on with the NPO :

<ul>
 <li>Fix a crash on native collectcatkeys : while the executable used in the build system works fine, the one meant to be used for 3rd-party applications is not</li>
<li>Provide localization support for libraries : as of now, we have support for localizing apps, add-ons, and some things in libbe. There are, however, a lot of strings to trasnlate in libracker and libbluetooth, and currently this is not possible. Design and code an API for that.</li>
<li>Apply localization patches that are waiting for me on trac</li>
<li>Fill in, complete, and test the API for formatting dates, times, money, and other numbers in a locale-aware way.</li>
<li>Design and code an API for properly handling plurals in things like "1 file found". English only have singular and plural (so it's a matter of putting an s or not), but other languages have more complex rules. It is not possible to slve this without a proper API.</li>
<li>Document the kit using Doxygen, so others can see how it works. It will also help me, because I tend to get lost with all these classes</li>
<li>Make sure the ABI is stable and the version of ICU we have can be replaced without breaking binary nor source compatibility</li>
<li>Speed up and optimize some parts of the Locale Kit, most notably catalog loading and parsing as it affects every app the user is launching</li>
<li>Localize more applications and use the new APIs (for example Deskbar is localized, but lacks date formatting)</li>
<li>Fix handling of add-ons localization, the current API can't work.</li>
<li>Fix namespace pollution if there is some left (there were TR* macros but these were replaced already)</li>
<li>Improve collectcatkeys to be more robust and handle more possible uses of catalogs in applications</li>
</ul>

So, that's quite a lot of work, that's why I'm starting right now. I've set up my Haiku development environment properly and just finished building my first Hybrid build of Haiku. On this computer I don't have network card problems anymore, so I can write code under Haiku, which is a lot more efficient.

I'll try to keep you updated weekly with some blog entries.