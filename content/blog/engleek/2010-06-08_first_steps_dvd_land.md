+++
type = "blog"
author = "engleek"
title = "First steps in DVD land"
date = "2010-06-08T10:39:21.000Z"
tags = ["gsoc", "gsoc2010", "dvd", "media player"]
+++

The first objective of this project is to give Media Player the ability to play DVD's. Here's a quick introduction of the tools I chose for the job.
<!--break-->
The DVD format is a bit of a nightmare. The actual disk information (chapters, audio track and subtitle information), is stored in IFO files and a navigation byte code which requires a custom virtual machine. The associated media data is stored in separate 1GB VOB (Video OBject) files, each containing both audio, video and subtitles in separate data segments.

Fortunately, the libraries available to actually interact with a DVD make it much easier than I thought, and as they are those used by VLC, they were already ported:
<ul>
 <li><strong>libdvdnav</strong> is the main protagonist, and provides an easy API for, you’ve guessed it, DVD navigation. Menus, streams, multi-angles...even those wonderful  interactive DVD games I’m dreading.</li>
 <li><strong>libdvdvm</strong> is directly included with libdvdnav, and provides a virtual machine for the navigation bytecode.</li>
 <li><strong>libdvdread</strong> is loaded by libdvdnav, and enables grabbing the media buffers. I’m considering replacing it with <strong>libdvdcss</strong>, which I think is more reliable.</li>
</ul>


Overlays, meaning subtitles and menus, are another matter. They’re both stored in sub picture units (SPU) and the actual image is in fact raw bitmap data, which implies both producing streams of timed images, but also video mixing. Fortunately, David’s video mixer node is working fine.

So just a quick intro to some of the tools, and I haven’t talked about any actual development, but I preferred to keep that for the next post, which is in progress!