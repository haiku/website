+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 07/2017"
date = "2017-08-04T20:26:14.000Z"
tags = []
+++

<p>Hi there,</p>

<p>Time for another monthly report! It covers hrev51254-hrev51346</p>

<h3>Network</h3>

<p>Waddlesplash merged some changes to netresolv (the DNS resolver), from NetBSD.</p>
<p>The virtio_net driver was completed by phoudoin, and is now somewhat working. This driver is used for the virtual network device provided by some virtual machines, and should be simpler to implement and keep up to date than the more or less correctly implemented emulated devices that are used otherwise. In particular, we plan to use this driver on some virtualized buildbots.</p>

<h3>Build system</h3>

<p>Korli and mt worked on fixing some issues found by gcc6, so we can prepare the migration to it.</p>
<p>Kalliti5 fixed some issues in the PowerPC port in an attempt to get it to build again. He also worked on improving the ARM port to provide an universal kernel, which can be used on various boards without recompiling. Currently there are still some hardcoded bits in the kernel which means a different version needs to be compiled for each target board.</p>
<p>Both jam and gcc2 got updates. gcc2 had only minor fixes (it's pretty mature by now!), but Jam saw important fixes to problems which would lead to stack corruption and crashes.

<h3>Software updater</h3>
<p>perelandra continues to work on the softawre updater, fixing various bugs and polishing the user interface.</p>

<h3>News from the summer of code</h3>

<p>The summer of code will end this month, but we're starting to see some of the result of the student's work being merged in, already.</p>

<p>Joseph Calvin Hill made some fixes to Haiku POSIX support, as required for his ongoing port of the Swift language. Some of the issues are still being investigated, but we now advertise support for _POSIX_BARRIERS.Korli also replaced the implementation of pthread_rwlock so it can be initialized statically (as required by the spec).</p>
<p>Akshay Agrawal made several fixes to the locale kit and BCalendarView, which will now highlight the current date, separately from the selected one and the keyboard focus.</p>
<p>Hy Che merged in a first round of patches cleaning up btrfs and enabling to use it with the fs_shell for testing. While write support isn't there, we now have a clean implementation of the low level primitives which open the way for it. There is more to come from him, but the next patches are still being worked on and will only be merged when they are a little more mature.</p>

<h3>64-bit support</h3>
<p>As the Beta1 release will officially support 64-bit machines, we are currently reviewing the few remaining 64-bit specific issues and fixing most of them.</p>
<p>Who doesn't like screensavers? Nebula's motion blur would crash on 64-bit systems, now it doesn't.</p>
<p>Korli also investigated and fixed several problems related to printing, mostly on 64bit but also on 32bit systems.</p>
<p>ffmpeg now forces RGB32 output when using swscale to change the video colorspace, avoiding useless extra conversions. It can also deinterlace videos.</p>

<h3>SerialConnect</h3>
<p>SerialConnect is Haiku's Serial Terminal. Admittedly not an often used feature, except in some cases. It now supports sending files using the XMODEM protocol.</p>

<h3>Bugfixes</h3>

<p>The rootfs does not allow to open directories in "write" mode (as it should be for a filesystem - they are not meant to be manipulated directly by userland programs)</p>
<p>The PNG translator does not crash anymore on invalid/corrupt files. It cleanly reports an error instead.</p>
<p>Several old files were removed form the Locale Kit (no functional changes, they were not even compiled in). BNumberFormat got a Parse and GetSymbol functions, so you can now parse numbers in a locale aware way.</p>
<p>accessays helped find some bugs in the HTTP code and in WebKit, leading to crashes or failed page loads in WebPositive.</p>

<h3>User interface</h3>

<p>Notifications now include the application icon by default, as it seemed to be a popular choice for icons (apps can still specify a different icon if they need to).</p>
<p>The "full" date format was removed from Tracker date columns. This format includes lots of extra words but is not really useful. It makes more sense to limit ourselves to a slightly shorter format.
