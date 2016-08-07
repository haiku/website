+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #54"
date = "2014-11-28T08:30:50.000Z"
tags = ["contract work", "WebKit", "beta1", "ui"]
+++

Hello world!

Work continue this week with a lot of long overdue UI enhancements. Not very technical work there, but finally closing all those tickets allows us to more easily find the important ones in the bugtracker. These changes also make Haiku more polished and easier to use, which is one of the project goals, after all.
<!--break-->
First of all, I did some work to clean up the new network preferences. In no particular order:
<ul>
<li>The "DNS" panel has been renamed to "DNS Client", since there may be a "DNS Server" there (hrev48354).</li>
<li>The interface hardware view with trafic stats is updated in realtime now (hrev48355).</li>
<li>The settings are saved to disk now, so they persist accross reboots (hrev48373).</li>
<li>The network stats are rendered using string_for_size and will pick an appropriate unit if you have megabytes or gigabytes worth of data transfer (hrev48394).</li>
</ul>

A lot of small changes which don't really need further details:

Changes in the apps and preferences:
<ul>
<li>GLTeapot now waits for retrace. This means it won't draw more than (usually) 70 frames per second instead of the usual 200+. It saves a lot of CPU and has no visible effect on the rendered image. If you want to show how fast our OpenGL software renderer is, you will now have to run multiple instances of GLTeapot (hrev48356).</li>
<li>Added a warning message in pc_serial (the old COM port driver) when it skips a port because it is used by the kernel debug interface.</li>
<li>Added SerialConnect to the DeskBar menu. It was in the image for a while but only accessible from terminal; I've been using it for some embedded development for a while, and decided it was good enough to make it official (it's still missing text selection support).</li>
<li>Improve error reporting in BootManager to separate the cases of no MBR found or first partition starting too early (hrev48359).</li>
<li>Fixed a lot of typos and missing uses of plural formats reported by KapiX and spotted while translating Haiku to Polish (hrev48366, hrev48367).</li>
<li>Make the notification preferences properly report that notifications are enabled when there is no settings file (hrev48372).</li>
<li>Fixed dead key handling in Keymap, where after making a dead key character the keys would stay in "dead" state in the keymap view (hrev48379).</li>
<li>Fixed a truncated string in the Mouse preferences with some locales (hrev48380).</li>
<li>Icon-O-Matic now imports gradient names from SVG files (hrev48384). I did this to help debug some other SVG import issues for which I now at least have a better idea as to why they happen (but no fix, yet).</li>
<li>Removed the "about" menu from the Workspaces applet. It's still visible from the replicant mode.</li>
<li>Terminal preferences now consistently use BPopUpMenus in BMenuFields. Thanks to Diver for spotting the subtle issues caused by using plain BMenus there (hrev48390). We will have to check all other uses of BMenuField in our codebase to make sure of this, and probably add a note in the API for the class.</li>
<li>FontDemo was converted to use layout code, so it behaves well when increasing the system font size. Also fixed some issues with menu fields there as well (hrev48396).</li>
<li>Mouse preferences now has a more realistic looking mouse instead of the previous ugly rounded rectangle which was used as a placeholder since we removed the bitmap used there, that came from BeOS.</li>

</ul>

Changes in the APIs and tests:
</ul>
<li>Removed the default implementation of BApplication::AboutRequested which just showed a BAlert with the application name. This was useless, and sending a B_ABOUT_REQUESTED message to net_server or registrar would crash them (hrev48368).</li>
<li>The BOptionPopUp class received some changes to make it look nicer and easier to use in some cases (hrev48377, hrev48388).</li>
<li>Applied an old patch to the Storage Kit tests to convert from BList to BObjectList and test some more directory constants (hrev48358).</li>
<li>Fixed keyboard folding/unfolding in BOutlineListView. The BOutlineListView is one of the items on our "things to change in R2" list. It's a tree view with foldable items. The drawing part is implemented using a BList, which only holds the currently visible elements. In the backend, there is a "full list" with all the items, including the folded ones. This is a permanent source of confusion in both our BOutlineListView code and apps using it, because there are often mixups of the two lists. In this case again, an item index from the visible list was used to get an item from the full list, leading to the wrong item being used (hrev48383).</li>
<li>Improved C++ compatibility of gcc2 by fixing some broken headers in the libstdc++ (hrev48391, hrev48392)
</ul>

HaikuWebKit 1.4.7 was released, which fixes several issues, but also introduce new ones (it seems redirects are not always working). I've been spending most of my time in the last month on issues in Haiku, and this HaikuWebKit release is not as well tested as the previous ones. It would be great to have more people look at HaikuWebKit development, as other devs would probably find and fix my bugs much faster than I can (it's hard to fix your own code).

A new contributor to Haiku: I helped dsizzle refine a set of patches for CharacterMap which are now merged. They improve several things to make the application more useful (hrev48376, hrev48387, hrev48389)

Fixed a bug in ActivityMonitor which would happen sometimes when adding a graph. This one was interesting to track and deserves some explanations. What happened is when adding a new graph, the ActivityMonitor window would freeze. This didn't always happen, but was reproducible after adding enough graphs. I started to debug the issue and noticed that ActivityMonitor was locked trying to grow the storage for a BShape. BShape is an object used to describe a complex shape for drawing, it is a list of pen movements (move, draw line, and draw bezier curve), and can be either stroked (to draw the shape outline) or filled (to draw the inside). The drawing operations are stored in an array which is grown using realloc when it's full.

The ActivityMonitor code used a BShape and filled it with LineTo calls to draw the graph contents. This is not the optimal solution, as when drawing only straight line there is a faster way. You can use BView functions BeginLineArray, AddLine and EndLineArray. BeginLineArray takes the number of lines as a parameter, so the memory for the whole operation can be allocated upfront and there is no need to grow the buffer (realloc is an expensive operation, as it is often not able to grow the buffer directly, and must instead allocate a new bigger one, copy the data there, then free the original buffer). So I modified ActivityMonitor to use a line array instead of a BShape. And... instead of freezing, the app started to exit immediately by calling abort(). This is a bit unfriendly as this exits the app directly without the usual debug_server dialog allowing you to attach a Debugger to the app before it's gone. Some debugging later, I found that BeginLineArray was throwing a C++ bad_alloc exception. These happen when you try to allocate an object (with new) and there is not enough memory for it. The BeAPI doesn't use exceptions in most cases, instead you are expected to use InitCheck to make sure your objects initialized properly, or check the status_t returned by some methods. In the case of BeginLineArray, however, the BeAPI has no way to report the error, so for this exceptional case we used an exception.

After adding a try/catch block around my BeginLineArray call, I could get past the problem. But not for long. The failed BeginLineArray would let the BView in an inconsistent state after the exception was raised, so an attempt to call EndLineArray would complain that BeginLineArray had not been called, and a new call to BeginLineArray would complain that EndLineArray was not called for the previous array. No way to get out of that. I modified the code a bit to leave the object in a coherent state (with a line array of size 0) when BeginLineArray failed to allocate the memory. Now EndLineArray can be called to clear the error and then operations can resume as usual. So the exception can be caught, the drawing skipped, and then the next time it will work.

But I was still worried about this exception. It happened at times where the memory use of ActivityMonitor was still reasonably low (about 700MB, far from the 2GB address space limit), and the line array itself should be small (about a hundred of points), so there were no obvious reason for the allocation to fail. So I added some tracing to ActivityMonitor to see what the size of line arrays was. Most of the times it was ok, but in some occasions when adding a new graph it would try to allocate an huge one, which is the root cause of the failure. It turns out the line array size depends on the view width, and in some case ActivityMonitor would try to draw a view before it was fully layouted. In that case the view had a very small width, and ActivityMonitor substracts 10 from the width to have a margin on the right of the graph. This would lead to a negative number which was unfortunately stored in an unsigned variable. It overflowed to an huge value, which we would feed to the unsuspecting BeginLineArray call, or, before the changes, use as a loop bound when calling BShape::LineTo. The fix for this was very simple: check for a view width less than 10 pixels and don't draw anything. Problem solved with a two lines fix!

I also spent some time triaging tickets in the bugtracker, we are now approaching the mark of "2500 tickets to R1".

I received the package with a new USB gamepad (which works just fine) and USB CD drive. The latter does not work that great. I can use it to mount plain CDs, but CDDA and multi-session won't work over USB currently. The USB mass storage driver does not use the standard SCSI commands handler as the other storage drivers do, because a lot of USB devices are known to fail in unrecoverable ways when sent SCSI commands they don't handle. But for CDs, there are some commands we need working (like the "read table of contents" one). It is difficult to make sure we don't confuse a device by sending it an unknown command without having to grow either a blacklist or a whitelist of devices. I'm not sure I want to start this work just now, but we'll have to get it done at some point.