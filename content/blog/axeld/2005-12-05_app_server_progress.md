+++
type = "blog"
author = "axeld"
title = "app_server progress "
date = "2005-12-05T18:12:00.000Z"
tags = ["app_server", "clipping"]
+++

In the last couple of days, I reworked the workspace and modal/floating window code of the app_server. But that work got interrupted for the weekend: you know, I don't work on the weekend. Nah, that's not it. Actually, Stephan Aßmus finished prototyping the new clipping code for the app_server.

That leads to some interesting changes, and should gain a noticeable amount of speed, especially on multi CPU machines. Before, all objects on the screen, and even the screen itself had a common base class (Layer) and were managed by the Layer subclass RootLayer.
While the original idea of having a common base class sounds nice, it doesn't work out in reality. RootLayer used to be the mother of everything, and hence, was a quite bloated piece of code. When you moved a window, the RootLayer would have locked the screen, and then computed the new clipping for all affected layers on the screen, updated the window borders (Decorators), and triggered a redraw of the BViews. During that time, no other window could draw on the screen. When you moved a window around the screen, you would have been able to experience lots of frame drops in a window playing some video (if that would have worked yet :-)).

With the new clipping code, the RootLayer is completely gone, and the Desktop thread takes over its job (I already started this transition before, but it's about perfect now). And it only cares about the windows visible on screen, the WindowLayers - it doesn't really know what a ViewLayer is (that's now the counterpart of a BView in an application). When you now move a window, the Desktop will lock the screen, compute the visible regions of the affected windows (note, only the windows, not the views they contain), and will notify the window that it must be updated. A video running in another window is halted for such a short time that you should not notice any frame drops during that time.

The window can then recalculate the visible regions of its layers and trigger a redraw of them. And, you guessed it, the Desktop and the windows run in different threads. That means (unlike before) that every window can draw whatever they have to do without affecting other windows at all. Since windows are now more independent, it also noticeably simplifies the code.

In the last few days, we made good progress integrating the prototype Stephan had written (in src/tests/servers/app/newerClipping), and we'll probably complete that work in the next couple of days.