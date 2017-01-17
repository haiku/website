+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #50 - One year of WebKit!"
date = "2014-10-24T07:33:00.000Z"
tags = ["webpositive", "WebKit", "php", "media kit", "lighttpd", "ffmpeg", "contract", "agg", "contract work"]
+++

Hello everyone!

This week is a bit special, as it closes the first year of my contract with Haiku. I wish to thank everyone for their support through donations, bug reports, comments on these articles, and general support for my work. I hope this will continue into next year.

This was again a rather busy week, but there was not much work on WebKit itself. I'll keep the breakdown I used last week (haiku/haikuports/webkit) as it seems to work well.
<!--more-->
<h3>Changes in Haiku</h3>

I worked on several things in Haiku this week, some of which could be considered "off-topic". I'm trying to remove the most obvious bugs and make things more ready for a release. This started last week with the screensaver fixes, but there is more this week.

There were some missing checks in BNetBuffer which could lead to a crash in out of memory conditions. It is fixed now.

The Canna input method was removed from our source tree as there is now a package for it in the haikuports repository. This closes the work on making the input method work again after the merge of the package manager.

I started investigating the issues with MediaConverter which fails to convert most files. First I'll give some explanation of the situation here. MediaConverter is a simple application, which is used to convert media files (sound and videos) from one format to another. It is bundled with Haiku and uses the Media Kit to do the work.

Our implementation of encoders and decoders in the Media Kit relies on "plugins". These are add-ons loaded in the application address space to perform the actual work. the Media Kit provides a common API to all the plugins, allowing applications to read and write any format easily. Haiku currently includes only one plugin, which is based on FFMPEG. This is used for all the decoding and encoding work, and it works fine for example in MediaPlayer. However there is something going wrong with it, because MediaConverter will fail to encode anything, and either crash or output an empty file.

I first wanted to test encoding with another one of the plugins. We have several that talk directly to different libraries instead of going through ffmpeg. I started reviewing and fixing the Musepack one, but I noticed it doesn't support encoding. None of our plugins besides the ffmpeg one does! So this left me with only ffmpeg to test with.

Then I had a look at the ffmpeg plugin code. There is a list of supported encoding formats, so I decided to try a few more of those to see if I could find something relevant. I found that the FLAC encoding works fine, but anything else I tried fails or crashes. So in a current version of Haiku, you can at least encode to FLAC, and the other formats are disabled. This only exposed more issues in MediaConverter, however. While the encoding works fine, there is a problem with handling the end of the file, and as a result, a few seconds of audio go missing from the output file.

Since it is not easy to debug things in MediaConverter, where issues can come both from decoding the source and encoding the output, I started looking at the tests for the media kit. I found that most of them were not converted yet to the unit test framework and started doing so. A comment in one of the tests reminded me of an issue I had introduced earlier and forgot to fix. BMediaFormat::GetFormatFor works again and this will help Colin continue his work on DVB support.

While researching these media issues, I tried generating some test tones with Sawteeth. I exported those to AIFF and found that MediaPlayer would play only noise. This was also a known issue, but everyone assumed it was a bug in ffmpeg. I decided to take a closer look and found the bug was actually on our side, and I could easily fix it. Basically, we were computing the endianness of the samples, but not using it at all. This is now fixed and playing AIFF files works again. While I was at it, I also fixed the sniffing rule so it actually detects AIFF files correctly.

I then started investigating the problem with ogg encoding more closely, and looked at different ffmpeg versions. I found that the error we were hitting was an overflow of a static buffer, which was removed from later versions of ffmpeg. So I decided to have a try at porting ffmpeg 0.11 and trying to encode using that version. It was a bit more work than I expected to get ffmpeg 0.11.5 to run on Haiku, and in the end I hit an apparently different error. The ffmpeg team added a new safety check, and we are hitting it. We are feeding the vorbis encoder with integer values, and it can only use floating point. This shows there is a problem with the format negotiation between our encoders and decoders. I didn't have time to see if I could fix this. I will do more testing with the new ffmpeg, as the previous attempt to update to 0.11.1 led to breakage of video replay in Haiku. I think this is fixed now (at least youtube seemed to work) so we should attempt an update again.

Now come some interface kit fixes. I noticed that the "stop" sign in the ScreenSaver preflet was not drawing correctly. This sign is used for the "active corners" view. It turned out to be a matter of enabling subpixel precise drawing and removing unneeded rounding.

I also fixed an issue with BMenu, which would crash if an application changed the selected item in a radio menu while the user was browsing it. Not a common case, but there was no reason to crash, anyway.

Finally, I fixed an issue in agg. Trying to draw a curve with one of the coordinates set to NaN (not a number) would lead to an infinite recursion in agg, freezing the app_server. This issue was first discovered with the Firefox port, was reproducible for some time with a test in WebKit, and finally started happening with NetSurf when browsing to some pages as well. It was fixed independently by some other people using agg, but unfortunately the development of the library is not very active anymore (the main developer stopped working on it in 2006). So I merged the fix in our copy of agg for now.

I also did some work on fixing compiler warnings. We have a goal of absolutely no warnings in our source tree, but we are doing this one component at a time and slowly fixing the issues. And of course, compiler updates (newer versions of gcc4 or clang) make new warnings appear, as well as ports to new CPU architectures. So this week I fixed warnings in all video card drivers and enabled the compiler switch that turns the warning into errors for those. No functional changes, bugfixes or new shiny features, but it makes sure the code stays clean and safe.

The BMessageFormat class started getting some use, and I got bug reports about it. It was fortunately a simple fix and things are working correctly now. As such, Polish and Russian (and a few other) translations can finally get correct plural forms in UI messages.

I fixed a small, but very annoying regression introduced by the outsourcing of Bash. It had stopped adding a / when tab completing a directory. Small change, but very annoying when you are used to it. It turned out to be a missing setting in our default readline configuration file.

I rewrote BNotification preferences and server to use a single settings file instead of 3. No functional change here, just some cleanup.

And finally, something related to WebKit: I fixed handling of file URsL for files with the '+' character, and added more support for IDNA (unicode in domain names) to the BUrl class.

<h3>Work on HaikuPorts</h3>

Various things. Besides the already mentioned ffmpeg 0.11.5 port, I added recipes for gptfdisk (currently not working), libuuid, and fixed the recipe for Paladin (pointing to the WIP 1.4 version at HaikuArchives).

I fixed an issue with OpenGL and SDL which would make apps render in a 32px area in a corner of their window, and finished work on the DragonMemory recipe using this fix. I also added a recipe for BeBRexx, an implementation of Rexx (Amiga users know about this one) with support for BeOS scripting (like 'hey').

<h3>Work on WebKit</h3>

The most important part is work to enable the HTTP part of the WebKit testsuite. I had completely missed the fact that WebKit had an HTTP testsuite before. This was pointed to me in the comments for one of the patches I sent to WebKit bugtracker. This testsuite needs a webserver with php and cgi support, and can use either lighttpd or apache 2. I decided to use lighttpd, which I know as I use it on my linux servers, and it is quite easy to port. PHP is more of a problem, while I could get it to compile after some build script hacking, the resulting php-cgi binary will KDL the system. I tried some older versions, but they all have the same problem.

Until this gets fixed, I'm using the old PHP 5.2 for BeOS port I found on Haikuware. This one seems to be working fine, and can be used to run the testsuite. And the result is the testsuite found a crash in our WebKit network code and several tests are timing out. I will have to fix those now.

This new addition to the testsuite also exposed a problem in the webkit testsuite harness, where we would sometimes fail to dump results at all for some tests. I already fixed this one, and this increases our testsuite score a bit more. There is still a lot of work to get all tests passing, however.

And that's all for the WebKit side. I have let it rest a bit while I worked on issues on Haiku side.

To close this report, I remind you that next week is the BeGeistert coding sprint, so I will be working from Düsseldorf Youth Hostel, with several other Haiku developers. A BeGeistert coding sprint report will thus replace my usual report.