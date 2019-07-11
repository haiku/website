+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 06/2019"
date = "2019-07-11T10:52:44.000Z"
tags = []
+++

<p>Hey, it's time for a new monthly report already! This one is a bit shorter
than usual as the previous one was a bit late, but let's try to get mostly back
on schedule. This report covers hrevs 5317553238</p>

<h3>Optimizations</h3>

<p>We are now in beta phase, and besides the usual bugfixes, it's time to start
investigating performance bottlenecks in Haiku. Waddlesplash has been hard at
work in that area this month, starting with tuning of the newly integrated
rpmalloc allocator.</p>

<p>He also started benchmarking the uses of the allocator and found various
opportunities to save memory, and use dedicated object caches instead of the
generic malloc allocator, helping reduce memory fragmentation. The first
patches have just started to land (in packagefs), there will likely be more.
Ideally beta2 will be able to boot and install with 256MB of RAM or maybe
even less thanks to this work.</p>

<h3>Polishing</h3>

<p>Sometimes a lot of the work isn't about exciting new features, but the
attention to detail and little polishing here and there, that really makes
a difference to users.</p>

<p>Waddlesplash continues to work on improving error reporting from the package
management system. HaikuDepot will now notify you if one of the packages you
installed requires a reboot (usually when core system packages were updated
in the process).</p>

<p>PulkoMandy reworked the alert that shows when a program has crashed. It now
features a specific icon (of, appropriately, a bug), and more importantly uses
a different layout with radio buttons instead of checkboxes, making it easier
to use longer text for the different available actions. This will help some
translators who were struggling to fit the text on screen in the previous
layout.</p>

<p>PulkoMandy also removed the annoying tooltip that would get in the way when
Terminal was in fullscreen, indicating the shortcut to get out. Instead a
button has been added to the tab bar, as is done in Wonderbrush and WebPositive
in similar situations.</p>

<p>Fabio Tomat contributed a Friulian keyboard and is now working on localizing
Haiku to this language used in northern Italy.</p>

<h3>New architectures</h3>

<p>Kallisti5 is currently working on the RISC-V and ARM ports. As part of this
work, he upgraded our compiler to GCC 8 and binutils to the latest 2.32. This
was an opportunity to cleanup some problems in the ARM port involving a
statically linked libstdc++. It's now possible to get the bootstrap packages
built, but the build of Haiku itself hits more similar linking problems later
on. For now the workaround is to use LLD (from llvm/clang) instead of the
traditional ld linker.</p>

<p>On the RISC-V side, the focus is currently on getting our libc to include
at least enough support for the "long double" type that we can link it.
"long double" is a different type on many architectures (ARM uses 64 bit, x86
uses 96, and sparc and ppc both use 128 bits but with different formats).
RISC-V could either use the same format as sparc, or use 64bit types like ARM,
but in either case, we need to import some support files from glibc into our C
library, and they don't integrate that easily.</p>

<p>For both architectures, the docker container including all the needed
dependencies was also updated (it was missing some things). This may make it
easier to start hacking on these new platforms if you don't want to install the
dependencies manually (which is also perfectly possible).</p>

<p>Waddlesplash and kallisti5 also worked on updating the set of bootstrap
packages, keeping it more in line with what we ship currently for x86.</p>

<h3>Bugfixes</h3>

<p>No one likes it when their apps crashes, so let's catch all the bugs!</p>

<p>Kerwizzy finished the rework of Mandelbrot to fix various race conditions
and missing intializations, so it should be a lot harder to crash now. Have
fun exploring some fractals!</p>

<p>Axeld fixed a problem in the BFS block allocator that could result in a
panic attempting to mount a corrupt volume.</p>

<p>Waddlesplash continues his work on the XHCI driver, continuing to clean it
up and squash bugs. He also made some improvements to the nvme driver, to
better manage errors and improve performance.</p>

<p>jscipione made some fixes to the buildsystem to attempt to get it working
again on MacOS. We are currently stuck with a problem of case insensitiveness,
despite using a case-sensitive filesystem it seems the preprocessor is mixing
up String.h with string.h.</p>

<p>PulkoMandy and korli fixed an issue in the USB serial port driver which
occasionally crashed the system when switching between different ports.</p>

<p>korli also fixed a problem in the "console" driver (which allows to show
KDL and Debugger when app\_server crashes) to avoid a crash when multiple
programs are trying to use the console at the same time.</p>

<h3>System libraries</h3>

<p>Waddleshash added a missing "noreturn" attribute to the declaration of exit()
in the C library, indicating to the compiler that this function indeed never
returns to the caller. This allows to build SDL without warnings. Thanks to
Ryan from the SDL team for reporting the problem!</p>

<p>mt fixed many instances of the -Wformat warning, making sure our formatted
print work correctly on all architectures.</p>
