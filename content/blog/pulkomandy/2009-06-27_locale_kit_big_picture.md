+++
type = "blog"
author = "PulkoMandy"
title = "Locale Kit: the big picture"
date = "2009-06-27T19:14:14.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

<span class="inline inline-left"><a href="http://www.haiku-os.org/files/screenshots/fig128170.png" onclick="launch_popup(2576, 567, 768); return false;" target="_blank"><img src="http://www.haiku-os.org/files/screenshots/fig128170.thumbnail.png" alt="almost-UML diagram of the locale kit" title="almost-UML diagram of the locale kit"  class="image image-thumbnail " width="148" height="200" /></a><span class="caption" style="width: 146px;"><strong>almost-UML diagram of the locale kit</strong></span></span>

This week, I finally got the plaintext catalog add on working. Then today, Oliver reviewed my work and we had a meeting on IRC. We agreed on some changes to the internal architecture of the locale kit, and also to the classes I added. Some classes in this kit have unappropriate names, and the kit was designed with zeta compatibility in mind, whereas in today's Be-World it seems more important to focus on gettext. I summarized our meeting in this somewhat-UML diagram. It's not really an UML object diagram as I added informations about the workflow and the tools to use when working on a localized application, and a lot of notes and remarks. I think it shows well the status of the kit: a clearly designed API, but some missing code and a lot of TODO notes. I did not fully reported the parameters of the methods and the attributes of all the classes, look at the headers if you need some information on that. This diagram is not meant as a technical reference, but as a colourful and efficient way of cleaning up my personal notes. I think I'm better at organizing my tought in a spacial way than laying them down linearly in a text. Click on the image to enjoy it at full size :)

