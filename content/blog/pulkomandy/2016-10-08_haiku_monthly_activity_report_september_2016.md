+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - September 2016"
date = "2016-10-08T18:16:37.000Z"
tags = []
+++

Hey there, time for a report! (I'm really out of ideas for taglines. Any suggestions?)
This report covers hrev50529-hrev50576
<!--break-->
A bug prevented debugger from debugging make 4.2 sources, which had an unusual way of specifying source paths in the ELF debug info. It is also possible to step instruction by instruction when viewing the assembler code.

Screenshot now creates the target directory if it doesn't exist, and warns you if it can't save the files.

The support for streamed audio in media kit and MediaPlayer continues, with various fixes to the http backend and media kit classes.

DiskProbe Find window now has its text selected by default, making it easier to perform a new search.

When using setarch, the selected architecture is added to the bash prompt as a reminder.

The Canna input method works again, including its deskbar icon.

The Be decorator is back! If you prefer the old, gradient-less look of Be window tabs, you can now enjoy it in Haiku as well.

Media preferences will display the current MIDI soundfont.

Workspaces auto-raise works better now. If the window is snapped to a screen edge, the app will be raised when the mouse hovers over that edge.

Some missing localizations in Tracker were added, it should now be completely translated.

A new part of the Locale Kit was implemented: a service to detect the encoding of a text file. StyledEdit now uses this to open text files with the right encoding.

The wacom driver handles Intuos tablets again, and supports the "eraser" side of the pen.

A stub implementation for get_nth_pci_info was added, which allows to run BeOS apps using it, such as BeRoMeter. There is no actual implementation however, so the apps will think you have no PCI devices. Since this is a private call and it was not used too often by BeOS apps, it should be ok.

Several fixes were made to BNetEndpoint, to fix the handling of timeouts. It should now be safer to use this class with timeouts without getting it waiting forever on something.

The NFS filesystem now properly reports file sizes (this is the old NFS 2/3, not the new NFS4 which already did that).

The radeon_hd driver supports the new rx480 boards.

TextSearch can search XHTML files (which have a mime type that does not start with "text").

As you can see, this was a rather quiet month with mostly small changes and bugfixes.