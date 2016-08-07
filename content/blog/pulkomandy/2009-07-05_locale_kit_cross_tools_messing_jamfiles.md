+++
type = "blog"
author = "PulkoMandy"
title = "Locale kit: cross tools, messing with jamfiles"
date = "2009-07-05T21:29:39.000Z"
tags = ["gsoc", "localekit", "gsoc2009", "jam"]
+++

This week i've been working on a big red post-it that was on last week's picture. It was about wo things : make the catalog handling tools work as build tools, and test them in some special cases.

The first part took me almost the whole week. I started doing a full port of the locale kit, but noticed it would probably be too complex to do that. Instead, I started over with a simpler solution. I only compiled the tools I needed, statically including the catalog add-ons inside them. It is now possible to extract the keys (original string) from a BeOS program, translate them to a new language, and integrate them in the Haiku Image. I did not have much problems with C++, but Jam caused me some difficulties, as I had never worked with it before except copypasting things around to integrate my code to the haiku image. This time I had to build up a new part of th toolchain, creating two rules and two actions. Ingo helped me a lot on that and now I have a better understanding of the whole Jam system. The rules I wrote are still not perfect, there are already some plans to make them simpler to use.

The second part of the post-it was about checking if collectcatkeys could extract strings correctly from sourcecode if they contained escape characters (\", \n, \t). Of course, that did not work at all. The problem is that we have to remove these escaped characters at some point and replace \t by tab, \n by newline. gcc will do that when compiling something, so if the program asks us to translate a string, we have to have it in unescaped form. This is currently done in collectcatkeys. But the change I made to collectcatkeys make it save the extracted string in a simple text file, and worse, I use tabs as delimiters. So this unescaping work will have to be done in linkcatkeys instead. This way, it is possible to translate the string easily, and then it is converted so the program will still find it back after compilation.

So, work for next week will start with a cleanup of my jam rules if I manage to do it (I'm still not very skilled at Jam), and fix of this quite important bug. But, next week I will be at the RMLL with some other Haiku developpers, so I'm not sure I will have much free time for coding. Well, there will be at least the hours I will spent in the train to go there.

Also, Oliver has made good progress on the wchar_t fixes. So I'm getting ready for messing with ICU and integrating it in the API. First step will be to build it with the new wchar-fixed gcc, then to make sure the tests are working ok before I do any integration work.

Finally, I also plan on making the Locale Preflet the first fully localized application in Haiku. This will allow me to test the catalog part and some other features such as the broadcast BMessage sent to all applications when the user change the default system language. The locale preflet will serve as a reference implementation of what to do when localizing an application.