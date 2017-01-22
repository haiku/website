+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #49 - Screensavers, ports, and memory leaks."
date = "2014-10-17T07:34:24.000Z"
tags = ["WebKit", "contract work"]
+++

Hello world!

This has been a busy week with activity on all fronts.

<!--more-->

<h3>Fixes in Haiku</h3>

I got a new version of fRiSS released. I finally converted it to use the layout kit but this led to discovering and fixing some bugs in the interface kit:
<ul>
<li>BDragger didn't have a layout-aware constructor. It does now.</li>
<li>BScrollView unarchiving was brokne, as it didn't reconnect the target view with the scrollbars. This works now.</li>
<li>BOptionPopUp can be properly disabled now.</li>
</ul>

I fixed a crash in BMessageFormat when the format string could not be parsed, and I added tests for some common cases to make sure this doesn't happen again. Speaking of tests, I've been writing some for the Locale Kit and Network Kit as I made change to these classes. It is useful to have those so when a change is made, we can easily check that it does not break what worked before. I hope to help keeping Haiku more stable and avoiding regressions with this.

I also spent some time debugging screensavers. This is bug number #511 in the bug tracker. I already had a look at this but several screen savers were still not working. Most of the issues were in Mesa code, and some had already been fixed but a new Mesa release was waiting. Some more bugs were discovered, too, and now the GL screensavers are working fine again (including Flurry). Bug 511 is not fixed yet, as there are some screensavers for which the source is currently missing. We have reached the author and are waiting for him to discover those in some old backup of his BeOS work.

I also fixed screensavers that had issues on their side, and we now have Haiku versions of BSOD and LicenseBreaker (both available at HaikuArchives).

I also fixed a longstanding bug in Chart where switching to DirectWindow mode would leave some artifacts on the screen.

I also found an issue with our gcc2 system headers where some constants were defined with a trick that didn't work well. This was fixed and it helps with running the testsuites for gettext and patch.

Two other changes are related to WebKit, too. First, this week the "poodle" vulnerability was revealed. This is a flaw in the SSL 3.0 protocol, which allows extracting cleartext data from SSL communications. SSL 3.0 was published in 1999, and replaced by TLS 1.0 a bit later. It was supported only for compatibility with old https websites. To avoid the attack, I have simply disabled this compatibility support, so anything older than TLS 1.0 will now be rejected by the browser (and anything using BSecureSocket). This fix is available immediately in the nightlies.

The other change is another round of improvements to our MIME sniffing rules, this time for XML, MHTML, and SVG. More of the WebKit tests are now detected and run with the correct file type.

<h3>Work at haikuports</h3>

I also did some work on haikuports recipes. This started with udis86, an x86 disassembler, that was needed to get the LicenseBreaker screensaver running (this screensaver disassembles the kernel and prints opcodes on the screen). This recipe is also a candidate for outsourcing from Haiku, as the same library is used in Debugger. So after working on this I took a look at the other outsourcing candidates.

This led to assorted fixes to the recipes for cpio, compress, bc, expat, libedit, unzip, zsh, patch, and gettext. Most of these were already existing, but lacked a test rule or needed some other cleanup. I have updated the trac ticket about outsourcing the packages to reflect the current state of the recipes.

Finally, I ran through the old tickets at ports.haiku-files.org (haikuports has migrated to bitbucket at haikuports.org, but tickets have not been migrated). Some of those were obsolete and I closed them, but there are still several open ones which need investigation.

<h3>And work on WebKit</h3>

Despite all this "side-work", WebKit is still the main focus of my work. And there are several small, but important changes this week.

The upstreaming efforts continue. Last week I reviewed all the differences between our version of WebKit and the main one. Some of those were old hacks that were not needed anymore and could be cleaned up. The remaining ones were submitted to WebKit bug tracker.

Our current stats are:
<ul>
<li>5 patches merged</li>
<li>2 patches needing more work on my side</li>
<li>2 patches waiting for review from WebKit</li>
</ul>

But merging these fixes does not really help with progress on the Haiku port itself, it only makes maintenance easier for us. So I also did some work on new features and fixing bugs.

I continued the work on the date and time input, enough to get the "time" part working (date was already working last week).

If you follow the mailing lists, you may have noticed my mail about SSE2 problems. If you run an old machine (Pentium 3, Athlon XP or older), you may have noticed that WebKit often crashes with "invalid opcode exception". This is because the JIT used for Javascript now makes use of SSE2 instructions, which these old CPUs don't handle. For about a week, the Win32 version of WebKit was built without a JIT at all. This was not an acceptable solution for us, since we have lots of 32-bit users. Fortunately, the WebKit developers have found a better solution, and now, both the Win32 and Haiku versions will detect SSE2 support at runtime. If SSE2 is missing, the JIT is disabled. The non-JIT engine is still available, so websites requiring JavaScript are still accessible. Performance is not as good as with the JIT, but the Alpha 4 release didn't have it enabled at all, and it had acceptable performance for such old machines (where you expect things to be a bit slower anyway).

I resumed my work on getting the testsuite passing. While investigating the test results I identified a bug in our drawing code where one variable was not initialized, and I fixed this, making our canvas support better. This will probably fix some drawing problems on real websites, too.

I also enabled WebP support, which worked out of the box. WebKit can now render WebP images.

Running the testsuite had some random problems for quite a while now. Sometimes the computer would appear to freeze completely and do nothing on any input. No KDL, no debugger, and nothing moving on the screen. This was happening randomly and usually, starting the testsuite again would let it run through. But this week the bug started to appear reliably, always at about the same place in the testsuite. This means I could more easily investigate it. I connected to the computer through ssh while the testsuite was running, and waited for the crash to happen. First I noticed that my ssh connection didn't die when the bug was triggered. So I tried to attach a debugger to the app_server, but I found that app_server had stopped running! This explains why nothing was drawing on the screen, but Debugger should have caught the crash. I looked at the syslog and found that this also had failed, because the system had run out of ports.

Ports are an IPC (inter-process communication) mechanism specific to Haiku. It completes the other available IPCs (pipes, shared memory, UNIX local sockets, etc) and is used in several places in the system: for sending BMessages, for the app_server link, for connecting the debugger with debugged applications, and many other places. There is a system-wide limit of 4096 ports at once. But the WebKit testsuite is run by 4 workers on my machine (one per CPU core), and each thread was needing more than 1000 ports, so they grabbed everything. At some point creating a new BWindow failed, and in the end both the app_server and the test runner crashed.

Since the crashing tests were in the "media" part of the code testsuite, I first looked at the media player code. I found a leak of BBitmaps there, but it was a "small" one (one bitmap per played video was leaked). I fixed it but it didn't help much, and the testsuite was still crashing.

So I searched for all places where the WebKit code is creating BBitmaps. There are fortunately not many of those. I also found some tests which were good at replicating the problem, and started to look for a place where we would allocate bitmaps and never free them. While debugging this, I found that when running just one test, the bitmaps were properly destroyed at the end of the test. But when running multiple tests in a row as the testsuite does, the number of bitmaps would keep increasing during the testsuite run, then they would all be freed at once at the end of the complete run.

This was not so much of a problem as long as the testsuite was crashing often enough, and the bitmaps were cleared by the crashes. But now most of these are fixed, and the testsuite runner keeps running for a long time, until it hits this problem.

Since most of WebKit classes use reference counting (with the RefPtr class, which is similar to our BReference), there are not many places where a memory leak can happen. I couldn't find anything in our platform specific code, but after adding some tracing I found that the bitmaps were allocated for the texture mapper. The texture mapper in WebKit is used for implementing various off-screen effects. Any part of the code can request a texture, and do some drawing to it. On other platforms, this is used with OpenGL textures. Since these have a costly construction (they need to allocate GPU memory, and there may be fragmentation problems there), WebKit keeps them in an object pool, so they can be reused when a new drawing operation needs to be done. Textures are dropped from the pool only when they were left unused for 3 seconds.

In our case, I found that textures would quickly pile up in the pool, but more and more new ones would be allocated. This was the cause of our bug. I studied the code more closely, and I finally found the problem. We don't use OpenGL in our port, as it is not hardware accelerated and there wouldn't be much gain in doing so. Instead, our "textures" for the texture mapper are implemented as ImageBuffers, which is implemented in our port as a wrapper around BBitmap. At this point I should mention that in order to draw to these BBitmaps, a view is added to them. Since in Haiku all drawing happens on app_server side, these BBitmaps are created with a hidden BWindow, which allows a connection to the app_server. This is where the ports are used.

So, the version of the texture mapper with ImageBuffers, rather than OpenGL textures, was missing just one line of code. In OpenGL, the goal is to keep the textures allocated on the GPU side and reuse them as much as possible. For this, there is a "canReuse" flag which checks that the texture is allocated with a big enough size, as well as the proper flags for the caller. In the ImageBuffer version, this method is implemented as "return false". This means the buffers are never reused, and they are kept in the pool for no reason since they can't be reused. While they are eventually deleted by the "garbage collector" timer (after 3 seconds of inactivity), this wasn't enough in our case, as it meant a lot of objects would be stacked there during the page rendering, to be cleaned only 3 seconds later. While this is usually not a problem in normal web browsing situations, 4 running instances of the test runner can start a lot of tests in 3 seconds, and this quickly filled the pool with non-reusable buffers, each keeping a BBitmap and a BView instance and eating 2 ports.

So, after one day spent in debugging this, the fix was... changing the method to "return true;". Now the ImageBuffers can be reused. Since the size of the BBitmap may not match, it is deleted and recreated when this happens. But the old BBitmap is deleted immediately instead of 3 seconds later, keeping the number of allocated bitmaps (and ports) much lower.

You may now be wondering why this was triggered by running "media" tests. It turns out the problem was not the video itself, but the media controls. The play/pause/... buttons are drawn with some shiny effect which requires use of an offscreen texture. This is a small 16x16 or 32x32 texture, which does not use much memory. But repeat the operation often enough during 3 seconds and you get problems.

After fixing this I could run the testsuite in full again, and without app_server crashes. I'm now reviewing the results and trying to fix more tests.

<h3>The WebKit buildbot</h3>

As announced last week, there is now a BuildBot for our WebKit port at http://build.pulkomandy.tk/ .  I was running into some problems last week where the build would time out after a while. I have switched the BuildBot from make to ninja, and it seems that was enough to get it running. The machine will soon receive a memory upgrade (using memory sticks that were formerly in my laptop, which I had upgraded when I started to work on the WebKit contract for Haiku - as you can see nothing is lost). I have sent these to Korli, who will carry them to the US when he goes to the GSoC summit next week. The machine will go from 2 to 4GB. Currently the memory use is as follows:

<ul>
<li>256 MB for the graphics chipset</li>
<li>1GB for the Haiku VM</li>
<li>768MB remaining for the host Linux system</li>
</ul>

With 4GB RAM we will be able to run the VM with 2 or 3GB RAM. This should help with making the build faster (more caching from disk to ram) and may even be enough to try running the testsuites more systematically, now that they don't crash the system anymore.