+++
type = "blog"
author = "PulkoMandy"
title = "HCD : Locale Kit progress report"
date = "2010-07-14T08:30:43.000Z"
tags = ["hcd2010", "hcd", "locale", "localekit", "contract work"]
+++

Hello readers !

As you know, I'm currently working on the locale kit to bring it to a more polished state. The work is going well, and it's about time for a status update. I've been quite busy at school for the whole year and committed few time to Haiku, so I'm catching up with a lot of things.
<!--more-->
I started by fixing one of the most long-standing bugs in the locale kit : the version of collectcatkeys provided in Haiku was broken. This made it impossible to localize 3rd-party applications. I also applied a lot of patches from Jorma Karvonnen to localize many applications. You can't really see the effects of this, because hta (the online tool to translate applications) is offline, so no one provided catkeys for these new applications.

This was only a warm-up. Once my ticket list was a bit cleaned up, I started working on some more interesting things. I made the deskbar use the locale kit to render the date and time. This means you can have the date in arabic or japanese format if you want. There are some problems with it still, related to timezone changes, but I'm going to fix them as I localize the time preflet. It also exposed the Locale API to more use, and helped spot memory leaks and missing parts. I also had to improve the locale preflet to allow more finegrained settings (the buttons were there, but not working).

I also reworked the catalog API so that it can work for add-ons and libraries. This required some API changes, but openend the way for localization of replicants, tracker, and other things. T. Murai (mt) and Jorma Karvonnen localized them, I wish to thank them for the great efforts they are putting into it.

The next step was adding a font overlay to Haiku. This is a system to allow using another font if the one you selected doesn't provide the character you need. I went on a really simple approach for now : if the font you selected doesn't have the requested character, it will try to use the VL Gothic font instead. This allows to display japanese characters out of the box in Haiku, but doesn't help with other languages using other scripts. I will have to improve the system for handling multiple fonts, but it's slightly more complicated to do and will take some more time.

finally, the locale kit was made hybrid build aware, so that it is possible to localize gcc4 applications in an hyrid system.

I'm currently working on localizing the time preflet. This one may seem simple at first glance, but it is actually quite complex to localize because it plays a lot with the dat eand time formats. To handle this properly, I need to use APIs that only exist in ICU 4.4, so I updated the 4.2 version we have been using since last year, and plugging this new API inside the locale kit.

Well, that's all for now ! I still have some other things I want to fix, I'll do another status update later to tell you :)