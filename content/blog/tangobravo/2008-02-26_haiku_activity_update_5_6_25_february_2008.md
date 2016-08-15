+++
type = "blog"
author = "tangobravo"
title = "Haiku Activity Update #5: 6-25 February 2008"
date = "2008-02-26T22:15:03.000Z"
tags = ["activity update", "progress"]
+++

Here's a summary of the last 3 weeks in Haiku-land. Axel was off skiing for part of this period, but progress has continued apace (and Axel has still managed to make his way into almost all of my update sub-sections!).

Highlights include progress towards self-hosting, a new kernel allocator that is much faster and more scalable, improved VMware Image support in the build system, automatic syscall restarts, and the usual raft of bug fixes, stability updates and interface tweaks.

<!--break-->

<h3><a href="https://lists.berlios.de/pipermail/haiku-commits/">SVN Commit List</a></h3>

Michael Lotz reported on the commit list that he had managed to check out the Haiku source from SVN, build it, and run the resulting image in QEMU (with kqemu) all under Haiku. The compiler, flex and QEMU were BeOS R5 binaries; "but hey that's pretty close to self-hosting" as Michael put it. This is a nice milestone but Michael is keen to point out that "we're not there yet" - there are some memory leaks that prevent doing the whole process in one session and the toolchain should be built for Haiku before we can claim full self-hosting. Even so it is still a good demonstration of the great improvements in stability that Haiku has seen recently.

<h3 class="icon-app">Kernel</h3>
Axel fixed two instances of the same driver being loaded.
Ingo fixed some a few bugs in the new optimised syscall code.
Ingo fixed the runtime_loader to correctly recognise libraries that are already loaded - this makes perl run (though quite a few tests fail still).
Michael committed a completely reworked heap implementation for kernel allocations - this allows multiple heaps with dynamic growing. It performs much better and is much more scalable than the old allocator. He also added tracing support for allocations and frees to help tracking down memory leaks.
Axel and Ingo implemented automatic syscall restarts and fixed various aspects of signal handling.
Ingo altered thread_yield() to take a boolean parameter to allow the behaviour to be specified. Now if there are no other threads waiting it is possible the thread won't be rescheduled, which leads to huge speedups in /dev/urandom/ and other stuff (perl build, ssh, etc)
Axel fixed advisory file locking so sqlite works on Haiku now.
Ingo fixed some issues to do with process group control in the kernel, making setpgid() behave more like the POSIX specs.
Axel started work on node monitoring for drivers and devfs - when finished this should make enabling new hardware as simple as dropping the driver into the drivers directory.
Ingo fixed some incorrect infinite timeouts given certain negative timeout parameters, fixing some hanging issues.
The crash-on-exit of certain R5 binaries (such as SVN) was fixed.

<h3 class="icon-app">Build System</h3>
Samuel Rodriguez Perez added build system support for writing directly to a partition from FreeBSD.
Ingo started work on adding support to the build system for a haiku-native development package, which is now almost complete.
Axel and Ingo made some build system changes to allow the VMware image to be made in one go, and just update changed files in the image when recompiling whilst leaving all additional applications and other files intact on the image.

<h3 class="icon-app">Hardware Support</h3>
Multi-track CDs can now correctly mount both tracks (ie the BeOS/Zeta CDs now work).
Oliver Ruiz Dorantes continued his work on the bluetooth stack.
Marcus rewrote the mapping of domains and buses to virtual bus numbers in the pci bus manager to allow arbitrary bus numbers. This fixes booting on some setups.
An Intel ipro100 network driver was added to the image.

<h3 class="icon-app">Networking</h3>
Axel fixed sending large chunks of data over a TCP socket at once.
All of a socket's children are now deleted when their parent is, which fixes a common KDL on launching Firefox.
Syscall restart support was added to the network stack driver functions.

<h3 class="icon-app">Interface Kit/app_server</h3>
Stephan did some work on BTextControl and BTextView.
Rene Gollent (of Vision fame) produced a patch to improve various aspects of BListViews, such as the speed of getting the coordinates of individual items.
Stefano fixed embedding a TermView in other applications and slow word wrapping in BTextView.
Stephan enabled the double-buffered mode in the app_server if running in 32bit VESA mode, which gives a huge speed boost. Also in the app_server, he improved the mechanism for hiding overlays (such as the cursor), fixing some bugs and reducing code duplication.

<h3 class="icon-app">Translation Kit</h3>
PCX, EXR (an open HDR format) and RAW image translators added to the build.
Jerome refactored common translator code into a shared library and changed all of the translators to use this rather than copying code.

<h3 class="icon-app">Other Stuff</h3>
In one of last year's activity updates I mentioned a discussion on the GlassElevator Mailing List about a new Layout Model by Christof Lutteroth. James Kim took the model and made it compatible with the new Haiku Layout system. Christof himself has also contributed some changes to the linear constraint solver.
Ithamar made the print_server track transport add-ons to allow for new transport add-ons that can auto-detect devices (eg USB printers).
Stefano updated bash to 3.2.
Julun committed a ref-counted BString implementation which makes passing copies of BStrings to functions quicker.
Alexandre Deckner produced a patch to make Keymap draw to an offscreen bitmap to increase speed and reduce flickering.

<h3><a href="http://www.freelists.org/archives/openbeos/">General Mailing List</a></h3>
David McPaul and others successfully managed to build the latest version of nasm for BeOS.

There was a fun emacs/vi flamewar (we never have real flamewars in the Haiku community, we're all far too laid back for that...) Turns out that the BeOS editor Pe is slated to be the default programming editor in BeOS, it's nice to use and is consistent with other Haiku apps, and is still maintained - the latest version of it can be found on <a href="http://developer.berlios.de/projects/pe-editor/">Berlios</a>.

There was a discussion of the philosophical impact of porting widget toolkits such as wxWidgets - although it will bring lots of ports in the short term, will it reduce the overall consistency of the Haiku experience and reduce the incentive for people to port fully-native applications? Answers on a postcard ;)

Fredrik Holmqvist reported success in building Firefox for GCC4-Haiku so people using that platform can now have access to a nice modern browser in addition to people running the default GCC 2 Haiku with one of the BONE Firefox builds from BeBits.

<h3><a href="http://www.freelists.org/archives/haiku-development/">Development List</a></h3>
The development list saw a discussion on how to co-ordinate porting efforts for standard tools such as perl and autoconf. Urias pointed out the BePorts project that I had not seen before, but seems a useful place for this co-ordination to happen: <a href="http://tools.assembla.com/BePorts">http://tools.assembla.com/BePorts</a>. Axel explained that as Haiku is much more POSIX compliant than BeOS, old ports should be checked through in order to remove any workarounds which are no longer necessary and make the port simpler.

The <a href="http://dev.haiku-os.org">http://dev.haiku-os.org</a> section of the website was moved to a new server which should improve the performance of the bug tracker. The move triggered a bug preventing us lowly users from commenting on tickets, but Niels managed to track that down and fix it.

Gerald Zajac announced he'd completed a driver for some S3 graphics chips in the Trio and Virge families.

There was a discussion about adding a menu item to open Email Preferences directly from Mail, which led on to a discussion on where the best location for "Preferences..." menu items in general. We also discussed the location of other application-related functions, such as "About..." and "Quit". The idea of a separate "Application" menu, perhaps represented by an icon, was discussed but as yet no decisions have been made.

<h3><a href="http://sourceforge.net/mailarchive/forum.php?forum_name=open-beos-kernel-devel">Kernel List</a></h3>
Craig Magina introduced himself to the kernel mailing list - he's found some free time and wants to help out with Haiku. Welcome to the project Craig, I hope you find something interesting to work on in the kernel - if only to add a bit of variety to that section of my update posts (not that Axel, Ingo and Michael aren't doing a great job)!

<h3><a href="http://www.haiku-os.org">Website</a></h3>
Haiku has been exhibited at a couple of events recently - have a look at <a href="/blog/koki/2008-02-11/haiku_at_scale_6x_overall_impressions">Koki's report</a> on the SCaLE conference in Los Angeles, and <a href="/blog/mmu_man/2008-02-25/hello_from_fosdem">François' report</a> on the Haiku presence at FOSDEM in Brussels.

<h3>The End</h3>
That's it for another update. Feel free to point out any errors you notice and I'll correct the post.

Until next time...