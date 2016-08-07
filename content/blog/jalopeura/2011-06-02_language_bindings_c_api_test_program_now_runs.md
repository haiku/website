+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: Test Program Now Runs"
date = "2011-06-02T19:49:56.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

In my last blog post, I mentioned the following goals:

- Define an interface definition language
- Define preliminary bindings for a minimal test programy
- Write a preliminary generator to create the bindings
- Write the minimal test program

These have now been achieved, and the minimal test program (in Perl) runs. It shows a window with a button, and the button label changes when the button is clicked.

It still has problems, of course. For example, after 32 messages pass through MessagesReceived, it dies. But it's nice to see something actually running.

Anyone who would like to test it may check out the code at <a href="http://svn.osdrawer.net/perl-haiku-kits">http://svn.osdrawer.net/perl-haiku-kits</a>. There are instructions for generating and compiling the bindings in the repo.

The priority goals remaining for the first quarter are:
- Test threading issues
- Make a final choice on target languages

These additional goals (mentioned in the last post) may need to be postponed to the second quarter.
- Expand preliminary bindings and add new bindings
- Write test programs for the bindings
- Write documentation for the bindings
