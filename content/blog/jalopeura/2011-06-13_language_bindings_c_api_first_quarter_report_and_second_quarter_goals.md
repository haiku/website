+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: First Quarter Report and Second Quarter Goals"
date = "2011-06-13T16:46:27.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

During the first quarter, I defined an interface language to use for creating the bindings. I had to create my own for several reasons. Probably the biggest factor was the need to know whether the target language has the right to destroy an object. Most of the target languages has some kind of automatic garbage collection; the programmer never needs to worry about whether to delete an object to free up memory. I didn't want to force programmers to worry about it when they don't normally need to. Therefore, I had to be able to mark whether an object was delete-able, so the generated bindings could delete it automatically if necessary.

I also defined preliminary bindings for a minimal test program, wrote a preliminary generator to create the bindings, and wrote the program itself (a simple application with a window which has a single button). The preliminary generator and the test program targeted Perl.

I also tried changing some data from the test program (with the interpreter running in the main thread) while in the MessageReceived method for the window (which should theoretically lock the window's thread). I was unable to make the program block, so I will need to continue testing for thread issues as I go along. Suggestions are welcome.

I in an earlier post that I would make a decision on target languages based on two criteria, popularity with the Haiku user base and ease of writing extensions. The popularity, based on a poll on the Haiku home page, is as follows:

42  51%  Python
14  17%  Ruby
12  14%  Lua
06  07%  Haskell
04  05%  Perl
03  04%  Scheme
02  02%  Squirrel

As you can see, Python won in the popularity category, with over half the total votes and three times as many votes as the next highest language. Extension writing looks like it will be relatively easy as well. With good scores in both categories, Python will be one of the target languages. (In fact, I've already started work on them.)

I already know how to write extensions for Perl, which means it wins in the ease category. Since I did my initial tests with Perl, it will continue to be one of the target languages as I expand the number of bindings.

However, Perl scored quite low in popularity, so I would like to add another of the more popular languages as well. Ruby and Lua both scored more than 10%. If I am able to get the Python bindings working in time, I will research extensions for those two languages. Their scores were close enough that ease of writing extensions will be the deciding factor here.

Report on first-quarter goals:

- Define an interface definition language (<b>Done</b>)
- Define preliminary bindings for a minimal test program (<b>Done</b>)
- Write a preliminary generator to create the bindings (<b>Done</b>)
- Write the minimal test program (<b>Done</b>)
- Test threading issues (<b>Will continue into the second quarter</b>)
- Make a final choice on target languages (<b>Done</b>)
- Expand preliminary bindings and add new bindings (<b>Not done</b>)
- Write test programs for the bindings (<b>Not done</b>)
- Write documentation for the bindings (<b>Not done</b>)

My goals for the second quarter (including the ones brought forward from last quarter) are:

- Bring the Python bindings to minimal functionality
- Write a minimal Python test program
- Continue to test threading issues
- Expand preliminary bindings and add new bindings
- Write test programs for the bindings
- Write documentation for the bindings
- If there is sufficient time, select a third target language