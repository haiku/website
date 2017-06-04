+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 05/2017"
date = "2017-06-04T20:26:14.000Z"
tags = []
+++

<p>Hey there, it's time for the monthly report again!</p>
<p>This report covers hrev51139-hrev51195.</p>

<h3>User interface</h3>

<p>Brian Hill fixed a glitch in the Screen preferences. The preference panel
shows a preview o the screen, and as a nice finishing touch, it adopts the
current background color. However, this did not anticipate that the color
could change while the application is running. Now the screen preferences is
notified when such a change happens, so it can update itself completely to the
new color.</p>

<p>PulkoMandy fixed a localization problem in DataTranslations, which would lead
to out of sync formatting and text (with bold text appearing at seemingly random
places).</p>

<p>Brian Hill continued his work on the Software Updater, which is now running
quite well.</p>

<p>The "open" dialog will now allow to select the current directory by pressing the "Open" button with nothing selected.
The UI research and implementation for this was driven by Owen, one of our past GCI students. He also fixed some
drawing glitches in the window.</p>

<p>Rahul Jain contributed his first patch, a rework of the "video mode" text in the boot loader. There was always some confusion between the unrelated settings "use fail safe video mode" (to force the VESA or frame buffer driver), and "select fail safe video mode" (to force a video resolution, no matter chich driver is used). Now the labels of the two items should be more clear about what they do.</p>

<h3>app_server</h3>

<p>An old and unused font was removed from app_server sources by luroh.
AboutSystem was adjusted accordingly to remove some copyrights.</p>

<p>dsizzle implemented BFont::Blocks. He started working on this several years ago,
but turned back to working on it now, as there is suddenly more interest on this.
This API allows to know which unicode blocks are covered by a given font, and
ultimately this will be used by the ongoing GSoC project to add Hindi script
support to Haiku.</p>

<p>PulkoMandy fixed the intel_extreme driver to work again with i85x cards (the ones it was originally written for). The many reworks of this driver by different people over time led to the loss of some i85x specificities. Fortunately, some users provided helpful syslogs and the problem was identified and fixed.</p>

<h3>Filesystems</h3>

<p>Axeld reworked some internals of the VFS (the common code that handle all
file systems in the Haiku kernel), and in particular the KPath class, to fix
some missing NULL checks. The code was also run through some new unit tests,
and some bugs were uncovered and fixed.</p>

<p>James Woodcock fixed some issues with multiple users and file permissions.
The "login" tool actually switches to the new user without leaving root rights
enabled, and the links in / to various directories are readable by all users.</p>

<h3>Media Kit</h3>

<p>Barrett fixed some problems in the destruction order of URL-based media sources.
This should fix some cases of crashing MediaPlayer or WebPositive when quitting them.
He also fixed some missing initialisations in the ffmpeg encoder plug-in, which could help with getting the encoder to actually work.</p>

<p>PulkoMandy implemented GBRP color space support in the ffmpeg plug-in, which fixed a black screen in some MKV videos. He also added a way to autodetect subtitles encoding, making it possible to use subtitles in SRT files not using UTF-8.</p>

<h3>APIs</h3>

<p>B_BEOS_DATA_DIRECTORY was removed. It didn't exist in BeOS and was added by
error in Haiku a long time ago. It was already marked as deprecated. B_SYSTEM_DATA_DIRECTORY remains, of course.</p>

<p>Andrew Lindesay contributed a streaming JSON parser. This will be used by HaikuDepot to allow loading a
continuous stream of data from the HaikuDepot server. The previous implementation was creating many HTTP requests to get small chunks of data,
which ended up being very slow.</p>

<p>Akshay Agarwal is hard at work on his GSoC project of writing a calendar/agenda application for Haiku. While most of his work is on designing an user interface prototype, while doing so, he found several limitations and problems in the Locale Kit API, and in particular in the classes dealing with parsing and formatting dates. It is now possible to format dates and times using short unit formats ("hrs" instead of "hours", for example), to format a date and know the character range where the week of day is (the other fields where there but this one was somehow missed).</p>

<p>Sean Healy fixed archiving of BTextView when using the feature to disallow some characters. The restored view would be in a confused state.</p>

<p>PulkoMandy changed the BCollator API for better performance and simpler usage. This API is used to sort strings in a locale aware way. It is now used in Tracker and Deskbar to implement natural sorting, which was working only for English before. For exemple in French, a file starting with 'à' sorts between files starting in 'a' and 'b', not after 'z'.</p>

<p>Mark Hellegers fixed an issue in BHttpTime which led to failure handling cookies set to expire on a sunday. Basically, parts of the code number weekdays from 0 (sunday) to 6 (saturday), while other go from 1 (monday) to 7 (sunday). The values were not properly converted and as a result we would send a bogus cookie string to websites.</p>

<h3>Bootloader</h3>

<p>jessicah made the EFI bootloader look beyond the first BFS partition on a disk. If your data partitions are before the system one, you can now boot using UEFI without having to manually select the boot volume from the early boot menu.</p>

<p>Kallisti5 started investigating a compatibility problem with some BIOSes that has been preventing Haiku to boot on some hardware for quite a long time, since he now has some affected hardware to test with. So far, it is just some extra tracing and examinating what is going on. He also did some work on enabling our anyboot images to embed an UEFI loader, in addition to the BIOS one (as it is done by most Linux distros)</p>

<h3>Debugger</h3>

<p>More work from DeadYaK on remote debugging, with an actual user interface to connect to a remote host.</p>
