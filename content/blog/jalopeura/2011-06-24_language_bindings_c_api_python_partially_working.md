+++
type = "blog"
author = "jalopeura"
title = " Language Bindings for the C++ API: Python partially working"
date = "2011-06-24T01:21:24.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

I've just uploaded some files onto http://dev.osdrawer.net/projects/perl-haiku-kits/files They are minimal implementations (window with a button) for Perl and Python. The Perl one works fine, but I'm still having issues with the Python.

Here are some of the issues with Python:

Apparently by convention packages start with a lower-case letter. The bindings are currently in the 'Haiku' package. This would be a trivial change; it depends on how important it is to Haiku's Python user community.

PyModules and PyTypes (= classes) cannot share the same name, as far as I can tell. Thus, in order to have constants and plain functions available from (for example) Haiku.Application, the Application PyType must be in a separate namespace, currently Haiku.Application.Application. Depending on what the community wants, I could move all the constants and plain functions into the ApplicationKit PyModule, and have the PyType be Haiku.Application.

The really big problem, however, is passing objects. BWindow::MessageReceived gets a BMessage object. In order to pass this to Python, I need to have a PyType. But the PyType in question is defined in the ApplicationKit, which is a separate package. So I don't have access to it.

In Perl, this was not a problem; I simply used a string containing the Perl class name, and as long as the user had loaded the relevant package, Perl took care of it. But Python wants the PyType, not just a string. I'm still looking into a way to get around this problem. I'm trying to do it by eval'ing some Python code, but so far I have been unsuccessful. If I can't do it any other way, I could export the PyType from the other package, but then Python would be loading the .so and I would be loading it a second time, in addition to the extra overhead of exporting and importing. It just seems like a waste of resources.

In any case, the Python test script displays the window, and calls event hooks on the Application object (ArgvReceived, ReadyToRun, QuitRequested), but when you click the button and it tries to call the Window's MessageReceived event, it dies.
