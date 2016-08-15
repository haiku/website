+++
type = "blog"
author = "anevilyak"
title = "Debugger: Four Trapped Dwarves"
date = "2013-07-22T13:14:02.000Z"
tags = ["output capture", "images", "dwarf", "debugger"]
+++

This time around, we only have one or two new features to cover as such, since most of my time recently has been spent under the hood.
<!--break-->
<h4>Output capture</h4>
A capability that was requested some time ago was viewing/capturing the console output of the debugged program. This can be handy since, depending on how the program was launched this might not necessarily be available on a terminal, or it might generally be a bit unwieldy to have to keep switching windows between the app, debugger and terminal in question. This feature has now been implemented:
<p>
<a href="/files/output_capture.png"><img width="640" height="401" src="/files/output_capture.png" /></a>
<p>
As can be seen here, the feature supports selectively capturing only one or the other of the possible console outputs, or it can be disabled entirely and the output view hidden via the splitter.

<h4>Image loading</h4>

Another recently requested feature was having the debugger stop when a new executable image is loaded. The most common use case for this is if your program relies on add-ons, in which case one most likely wants the debugger to stop when one of said add-ons is loaded, in order to be able to set breakpoints in it before it begins execution. This feature has now been added, with some nuances. First of all, it can be accessed from the Breakpoints tab along with exception settings, via the renamed "Configure break conditions" button:
<p>
<a href="/files/stop_0.png"><img width="640" height="512" src="/files/stop_0.png" /></a>
<p>
The feature allows one to unconditionally stop when every single image is loaded, or if one desires it can be fine-tuned to only stop on particular image matches. The latter can be handy if the program in question loads a large number of add-ons, such as a program that makes use of translators, but those aren't necessarily the point of interest debugging-wise.

<h4>DWARF4</h4>

As stated previously, I've mostly been spending my time down in the depths of the debugger since my last post, the reason being to implement support for version 4 of the DWARF standard. The new version doesn't add much in the way of new features per se, but gcc will be switching over to it as of version 4.8, so this preemptive move allows us to ensure that Debugger will "just work" once we update compilers again. What this version does do, however, is focus on making the format more compact, via a number of measures.
<p>
The most significant of these involves the addition of a new debugging information section, .debug_types. As its name indicates, this is used to store type information for the program in question. In previous DWARF revisions, type information was stored on a per-compilation-unit basis, ergo for any given .o file, all types that it referenced resulted in generating debug information entries for them. This results in a large amount of duplication, since many files refer to the same types, and consequently significantly bloats the debug information sections, particularly for something like Webkit that has a huge number of types.
<p>
In order to resolve this kind of issue, DWARF4 isolates all type information entries into a separate section, and generates a unique hash signature for each one. Other parts of the debug information, rather than generating duplicates, simply generate a reference to the types section, using the aforementioned signature as a key. This allows a quite significant space saving, as can be seen in a number of cases. A simple example would be that of the debugger itself: With DWARF2/3, the latter results in a 13.5MiB executable. DWARF4 reduces this to around 7.8. Vastly more significant savings can be seen with something more complex such as webcore (579MiB vs 294MiB) and javascriptcore (68MiB vs 36MiB). Note that this means that the debugger itself will also use correspondingly less memory when debugging such programs, since the in-memory data structures it needs to build from the debug information are likewise reduced.
<p>
Unfortunately, despite the significant savings seen above, this still doesn't suffice to allow us to handle debugging WebKit on x86 Haiku. With DWARF2/3, we run out of address space attempting to do so because of the sheer amount of debug information that must be loaded/processed for those libraries. With DWARF4 the problem shifts in a different direction, namely gcc/ld itself runs out of memory trying to link the libraries. This does, however, succeed on x86-64, provided you have ~3.5GB of memory for ld to make use of. Until next time!