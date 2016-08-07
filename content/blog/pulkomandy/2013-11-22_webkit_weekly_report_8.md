+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #8"
date = "2013-11-22T08:19:40.000Z"
tags = ["WebKit", "webpositive", "contract", "contract work"]
+++

Hello there!

So, this wasn't a fun week. Last week I had finished merging all commits from WebKit main repo. I got Web+ to run fairly well with these changes and I wanted to merge this into Haiku. However, while this works for the gcc2-hybrid version, I was not able to build a package for gcc4 and gcc4h. As a result, there were no nightlies published (the script wants all the architectures to work for a given revision before it gets published).

When trying to build the gcc4 package, I ran into several different problems: haikuporter triggering a KDL when running webkit "make install", the CMake script I used to build the gcc2h packages not working as it should on gcc4, and a few more. Since I don't usually run a gcc4 install, I had to do all this from a temporary install on an SD card, which is very slow at compiling, or, actually, at doing anything. Even a simple rm -r can take a minute or so to complete.

Meanwhile, I'm making some (slow) progress on getting the testsuite to run. For this to run I have to fix a tool called DumpRenderTree. This is a small executable wrapped around WebKit that renders a web page, and dumps to the console either a tree structure of it, or a plain-text dump of the page contents. It should also generate PNGs of the pages in some case. The testsuite runs DumpRenderTree on a set of pages and compares the results with "expected" files, and makes sure everything matches.

The problem I have is DumpRenderTree is always dumping the render tree instead of the plain text dump the "expected" files have. To switch between the modes, DumpRenderTree expects the page to call Javascript code to configure the output. The javascript interface can also do some other useful things, like clearing cookies, or otherwise interacting with the tool.

Since the WebKit API is specific to each port, the DumpRenderTree tool must be rewritten to use each of these APIs. I updated our version, modelling it on the EFL one. I now have something that should work, but somehow the JS callbacks aren't working.

I tried building WebKit with all assertions enabled to mak sure everything was right. I had to fix some minor harmless things to get HaikuLauncher to run, but DumpRenderTree would hit asserts over and over again. I tried disabling one, only to hit the next. Something looked strange, with methods as basic as isMainThread() failing (this is just comparing a TLS value with a global). I added some traces, and noticed the TLS was ok, but the global was changing value. I spent some time trying to look for something overwriting it, but then I noticed it was also changing address. This shouldn't be possible. Well, that hinted me to the actual cause for the problem: some files are getting linked twice into DumpRenderTree. what happens is we first build a big "libWebKit" library. This exports only our WebKit API, and inside it, there is also all the core code (WTF, JavaScriptCore and WebCore), the cross-platform parts of WebKit. The idea is we want the library to only export our official API, and not let apps mess with the internals.

However, DumpRenderTree does need to mess with the internals. It adds custom JS APIs for the app to access, reads internal data to extract frame content as text, and takes some shotcuts calling WebCore directly to do things in a way that works on all platforms. So, DumpRenderTree links not only our libWebKit, but also the WTF, JSC and WebCore libs again. Since we build these as static libs, we end up with code both in DRT itself and in libWebKit. Things then start breaking apart because these can't see each other. We get duplicated static variables, initializations called on one side that set variables the other side can't see, etc.

So, I moved back to the shared mode. This is what we used to do when WebKit was built with Jam. In this mode, WTF, JSC and WebCore are built as shared libraries, and libwebKit only links against them instead of embedding them. This allows things to exist only once in the running executable and DRT to access all the internal as it should.

But... that didn't work. I hit a command-line length limitation.

In the Jam build, we used to build multiple small static libraries (webcore1.a, webcore2.a, etc) and then link them together in a big shared library. This allows us to send a smaller set of files to ar to create the static libs and stay under the maximal command-line length. CMake uses a different trick to keep command lines short: it uses response files. These were added to gcc and the binutils to solve the very same problem on Windows. The idea is to put the command-line args into a file, and give it to the tool on the command line using te @file syntax. This works well with ar (when building the static libs), but our gcc will unfold the thing before calling some of the internal tools, and we hit the problem again when invoking collect2 (this is an internal executable used by gcc) or ld. It seems this is because gcc doesn't know that the linker it is calling is compatible with response files, so it tries unfolding the command line to be more compatible.

I'm now rebuilding gcc with the --with-gnu-ld configure option. This should force it into using response files when invoking the linker, and finally get our libraries built. Not this will change the ABI again and the haikuwebkit packages for both gcc2hybrid and gcc4 will have to be rebuilt. I'm not sure yet if we should do this only for the tests, or if we should also do it for the distributed libraries. It makes sense to distribute the ones we have tested, but the single-library solution should be faster (less symbol lookup) and use less memory at runtime.

If the gcc rebuild doesn't work, I'll have to use the same trick we did with Jam, making invasive changes to the cmake build. This would make it more difficult to merge with the official WebKit sources in the future.


Also, some sidenotes:
<ul>
<li>My patches to CD, IM, and IUP have been upstreamed. We now have a portable UI toolkit that uses native widgets</li>
<li>Kallisti5 is working on providing a server that runs Haiku. We will use this once he is done setting up to run the CMake testsuite/nightly builds, and run the WebKit tests. This is a step towards getting parts of our port merged upstream again.</li>
</ul>