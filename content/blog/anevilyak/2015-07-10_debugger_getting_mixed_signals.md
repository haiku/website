+++
type = "blog"
author = "anevilyak"
title = "Debugger: Getting mixed signals"
date = "2015-07-11T03:37:20.000Z"
tags = ["debugger signals manual"]
+++

As an operating system that implements the POSIX specification, Haiku includes support for signals, and the requisite API calls for an application to decide how it will handle them. While these aren't really used by the Be API in any meaningful way, they do frequently come into play for ported applications and libraries. Up until now, however, our debugger has lacked support for them, which could make debugging situations involving signals a less than convenient affair if one didn't already know what to look for. As of hrev49356, this has been rectified.

<!--more-->

<h3>Basics</h3>

POSIX defines a broad variety of default signals, and the various cases in which they should be sent to a running application. Some of these are simply intended to inform the application of environmental changes so that it can adapt accordingly if needed, while others can be of a more fatal nature. The API includes the ability for the application to control how such signals are responded to, i.e. by ignoring them entirely, or by installing an application-supplied function to handle them as they're received.

For signals that are considered fatal or critical, the most typical result if unhandled is a debug exception, which leads to the all familiar crash dialog most users have seen at least once. In such a case, these would also have been intercepted by the debugger even before the latest changes. However, this isn't always true. As an example, one of the most common signals leading to a crash is SIGSEGV, aka segmentation fault, which occurs when application code attempts to access memory in a disallowed way, such as accessing an unmapped address. While this is typically indicative of a bug, this isn't universally the case. The runtimes for many high level languages such as Ruby or Java actually allow this to occur in a controlled manner, and use signal handlers accordingly to detect when, for instance, more memory needs to be allocated for the stack of a managed thread, or for objects that are part of the managed runtime as a whole. 

In such a case, the debugger would previously have been blissfully unaware of anything occurring, since the signal handler would result in the signal being considered non-fatal, and no exception would consequently be raised. However, if something went wrong in the handler in question, i.e. a work-in-progress port where a required function was either not implemented at all, or implemented incorrectly, this could lead to a situation where incorrect behavior was observable, with no obvious way to determine the cause, especially if one isn't immediately aware that the application is using such handlers.

<h3>Implementation</h3>

The newly added support allows the debugger to be notified of signals prior to them being handed off to the application, consequently making such situations much more straightforward to analyze. This support is customizable, since not all signals are necessarily of interest. To go with the additional UI to handle the aforementioned configuration, some rearranging has been done to make things more accessible. Some of the advanced options that were previously hidden behind the "Configure break conditions" button in the Breakpoints tab have now been relocated to a general team-wide settings window, accessible from the Teams menu, along with the newly added UI for signals, as can be seen below:
<br/>
<img src="/files/settings_main.png" />
<br/>
Three possible dispositions can be configured for how a signal is dealt with by the debugger:

<ul>
<li><b>Ignore</b> - This is essentially the behavior that would occur prior to support being added, where the debugger does nothing with the signal and simply allows the application to continue execution as usual.</li>
<li><b>Stop at receipt</b> - In this instance, the thread which receives the signal halts execution immediately. The signal number and description that caused the halt will be listed in the stop reason column of the threads view.</li>
<li><b>Stop at signal handler</b> If this option is selected, and the application has in fact installed a signal handler for the signal in question, then execution will be allowed to continue until that handler is reached. Note that if no handler has been installed, the debugger will fall back to the stop at receipt behavior. Also, a caveat to be aware of is that nothing in the APIs prevents an application from installing an invalid handler pointer, in which case the behavior is undefined.</li>
</ul>

The drop down seen at the top allows a global default to be set for how signals are handled, while the lower half allows custom overrides for specific signals. This is necessary because, depending on the nature of the application, there may be many signals in play, most of which aren't of interest for the situation being debugged. Such a case is illustrated in this screenshot, where the default is to ignore signals, but with two signals specified as being handled differently. The inverse is also possible, where one can set all signals to halt execution by default, but ignore a specific subset. 

<h3>Manual v1</h3>

While signals are the only new actual feature to be noted this time around per se, I have also been working on a reference manual for the debugger in order to help new developers learn how to use its capabilities, and where/how they can be found. I am happy to announce that I believe the manual is now in a state where it's ready for broader distribution, and can be found for download in PDF format <a href="/files/DebuggerReferenceManual.pdf">here</a>. Feedback and suggestions for improvements welcome!
