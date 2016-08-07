+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 09/2015"
date = "2015-10-03T07:40:53.000Z"
tags = []
+++

Hi there, here comes the report for the month of September!

This report covers revisions hrev49453-hrev49663.
<!--break-->
<h3>User interface</h3>
mmlr made some fixes to the keystore server request window. This is the alert-like window that asks the user if it should let an application access the keystore and store or read "keys" stored there. The keystore is used to store wifi passwords, haikudepot accounts, and could be used by any application eeding to store 'secret' data such as passwords in a secure way, and not in plain sight in a settings file.

jackburton and jessicah investigated and fixed a crash in BPrintJob, which turned out to be a BeOS compatibility breakage in recent changes to extend BAlert with rich text support.

miqlas contributed a port of the Solarized color scheme to Terminal.

axeld added a BWindow::MoveOnScreen method which will make sure a window fits inside the screen, and adjusted some applications to make use of it, instead of various custom ways of trying to do the same.

axeld also started work on font sensitvity in several applications. This includes a rewrite of the mail client to use the new layout API, fixes to the interface kit and BToolBar, and a lot of fixes to several applications to scale appropriately when a big font size is used.

<h3>Interface Kit and app_server</h3>

A lot is happening in this area these days. Jua continues his work (in a branch for now) to speed up drawing in WebKit. Meanwhile, mmlr and jackburton started refactoring BPicture and PicturePlayer to make them safer to use. It was possible to crash the app_server in some cases as the previous code wasn't checking enough things. jackburton also wrote several tests for BPicture in order to identify remaining problems.

We have also seen activity from looncraz, who started work to allow realtime changes of colors and fonts from Appearance preferences. Currently, these changes are only applied to windows created after the changes have been made. It is not trivial to change these things in realtime behind the application's back. The first change is sending a notification to all applications when the settings change. Then, the BView API was changed to allow applications to set the color using an ui_color directly. This ways the view knows which ui_color it is using and can follow the changes as they happen (the current APIs only allow setting the view color directly with an RGB value, which can't then follow changes in appearance because there is no way to map the RGB values back to the matching ui_color). Finally, there is also some work on adding some features from BeOS R6, such as a way to delay and merge BMessages together. This can be used to group similar events together, and, for example, redraw a window only once, even of many ui_colors change at the same time and send a lot of notifications.

stippi continued his work on the generic text document framework he started for HaikuDepot. This will eventually replace or complement BTextView for better handling of formatted text.

jessicah changed the look of the boot menu so the title and the selection are not easily confused.

<h3>Launch daemon and system booting</h3>
mmlr wrote a script to help benchamrking the time needed to boot the system. The script can be run during boot and will wait for all servers to be started, then print the uptime. This allows for comparing the boot speed of Haiku between different revision, on different hardware, or with different compilers and optimization settings.

axeld fixed an issue with file descriptors which would lead to all file descriptors opened by the launch daemon to remain visible for everything launched by it (this was already the case with the older bash-based method, but bash had less file descriptors open and didn't use them as much). The launch daemon will also make sure stdout, stin and stderr are redirected to /dev/null like the old boot script did, fixing various issues with running command line apps through system() or similar calls.

<h3>Drivers</h3>
Last month Anarchos submitted a patch to improve AHCI support on his system. Unfortunately the changes were not completely correct and broke booting Haiku for several other persons. mmlr started work to clean up the AHCI driver in order to avoid such problems in future changes.

kallisti5 joined and started adding support for SCSI VPD query. This will allow to get information from the AHCI devices (hard disks) in a machine and identify the exact model and firmware. We can add this to the debug reports for AHCI problems in the future so it's easier to see if a problem is hardware specific.

axeld also provided some fixes to improve the work done in the initial patch, but things are still not completely right there, so ultimately the patch has been disabled. A more complete and correct implementation is needed before we can actually use it.

tqh updated ACPICA to the latest version, and made some minor fixes to get our ACPI support running with it.

<h3>Media</h3>
PulkoMandy updated the ffmpeg add-on to not use very old and deprecated functions (most of them being already deprecated in the 0.10 version of ffmpeg currently used). This makes it possible to build the ffmpeg add-on against newer versions of ffmpeg, at least for the non-gcc2 architectures. There wasn't a strong need for that, since the 0.10 branch of ffmpeg is still getting frequent releases, but at least our ffmpeg 0.10 recipe can now be made gcc2-only, making it easier to keep it running, and we can upstream our other patches (needed also for gcc4 haiku support) to newer versions of ffmpeg.

Our ffmpeg plugin now also declares support for tracked MOD-type files. These come from the Amiga and ffmpeg supports them just fine, so we now allow playing them in MediaPlayer and other MediaKit enabled applications.

Barrett continued his work on refactoring the media kit, this month focusing on the BMediaRoster life cycle. The BMediaRoster is currently an independant BLooper running in an independant thread (as it was in BeOS R5). Unfortunately, this creates some problems as the life cycle of the thread is not very clear, and it's hard to know when the thread should be stopped and exited. If we do it too early, the application may try to use the roster after it is gone, leading to a crash or freeze. If we do it too late, the roster will try to use the BApplication when destroying itself, and the BApplication may already be gone. Be engineers had already identified this problem, and planned an API/ABI change (making the BMediaRoster a BHandler and attaching it to the application looper) as hinted by some defines and comments in BeOS R5 headers. We will probably do it that way in R2, but for now we are sticking with R5 compativbility and the required workarounds.

Barrett also fixed some issues with lateness computation and the handling of buffer groups.

<h3>Networking</h3>

The implementation of _res was reworked so it actually works as expected now. This is used for domain name resolution, and was lost during the move to netresolv as a libbind replacement. Part of our code had been replaced with the thread-safe code from NetBSD, however NetBSD will simply not allow _res to be used at the same time as pthreads. Since Haiku always has pthreads linked in, this is not a suitable solution. We are now using our old code again for _res, and we let applications handle thread safety problems with it if they need to (or use the thread-safe alternatives which we also provide).

<h3>Packages</h3>

mmlr found and fixed some use-after-free problems in WebKit. The new 1.4.12 WebKit version should crash a little less often with those fixed.

humdinger updated the Slime Volley game so it is actually installable, includes an icon and app signature, and saves settings in the right place. He also updated Quicklaunch to fix some bugs and add an Italian translation. He also added an fasm package (yet another x86 assembler).

AnEvilYak updated a lot of packages for the x86 (gcc4) and x86_64 architectures.

mmu_man updated libmpdclient and mpd.

<h3>Ports</h3>

mmu_man made some steps towards getting the PPC and m68k ports building again, with some changes to the glibc code and build files.