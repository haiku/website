+++
type = "article"
title = "Getting recognition from Linux / Part One - Recognizing The Be File System"
date = "2011-01-26T12:11:48.000Z"
tags = ["ubuntu", "bfs", "ppa"]
+++

{{< alert-info "" "This article was written when Ubuntu 10.10 was the latest version. Starting with Ubuntu 11.10 (Oneiric Ocelot), BFS file systems should be recognized out of the box.">}}

<p><a href="/files/1-menu-before.png"><img src="/files/1-menu-before-small.png" alt="places menu" align="right" width="54" height="64"></a>Late 2009 I made the switch from Windows to Ubuntu as my primary operating system. During the first weeks of using it, I began to wonder why it would recognize my old Windows file system on the hard disk but not the BFS file systems. The partitions were correctly recognized as BeOS BFS (0xEB) and I could mount them from the command-line with <span class="cli">mount -t befs /dev/sda5 /media/Haiku</span>, but they didn't show up in the Places menu or elsewhere in the system.</p>

<!--more-->

<p>After some investigation it turned out that Ubuntu uses a library called <span class="app">libblkid</span> to get the necessary information from the file system it needed to recognize it. This library is part of <a href="http://userweb.kernel.org/~kzak/util-linux/">the util-linux project</a> and it probes each file system for known magic constants. If a magic is found, the library will return -among others- the file system's type, label and uuid. You can try it out with the <span class="app">blkid</span> program: <span class="cli">sudo blkid</span> to get a summary of all the recognized file systems, and <span class="cli">sudo blkid -p /dev/sda1</span> to get a detailed report of the file system on <span class="path">/dev/sda1</span>.</p>
<p>As expected, this library didn't have the code to recognize the Be File System, so I began the task of <a href="http://git.kernel.org/?p=utils/util-linux/util-linux.git;a=history;f=shlibs/blkid/src/superblocks/befs.c">implementing it</a>. Thankfully, this was made relatively easy due to the excellent <a href="/documents">book by Dominic Giampaolo</a>, the BFS driver in Haiku and the BeFS driver in Linux. (Note: in Linux, BeFS is used to refer to the Be File System.) And as of <span class="app">util-linux v2.18</span>, <span class="app">libblkid</span> correctly recognizes the Be File System.</p>
<p>But that is not the end of the story. Contrary to Fedora (which uses <span class="app">util-linux v2.18</span> in its 14th edition), Ubuntu stays with <span class="app">util-linux v2.17</span> for now. The solution to this problem was to backport the BFS recognition code to <span class="app">v2.17</span> and provide a <a href="https://launchpad.net/~idefix/+archive/befs-support">Personal Package Archive</a> (PPA) for the modified <span class="app">util-linux</span> package. This package is now ready for your testing pleasure, just follow the following steps to install it:</p>
<ol>
 <a href="/files/2-add-ppa.png"><img src="/files/2-add-ppa-small.png" alt="add ppa dialog" align="right" width="61" height="64"></a><li>Open <span class="app">Update Manager</span> and click the <span class="button">Settings...</span> button.</li>
 <li>In the window that opens, select the <span class="button">Other Software</span> tab and click the <span class="button">Add...</span> button.</li>
 <li>In the dialogue box that opens, add the following text to the text box: <span class="path">ppa:idefix/befs-support</span></li>
 <a href="/files/3-updates.png"><img src="/files/3-updates-small.png" alt="update manager" align="right" width="61" height="64"></a><li>After clicking the <span class="button">Add Source</span> button and then the <span class="button">Close</span> button, it will ask you to reload the information about available software.</li>
 <li>Click the <span class="button">Reload</span> button and after a while you will be greeted by the main window showing that there are 6 updates.</li>
 <li>Click the <span class="button">Install Updates</span> button and restart the computer after it has finished updating.</li>
</ol>
<p><a href="/files/4-menu-after.png"><img src="/files/4-menu-after-small.png" alt="places menu" align="right" width="48" height="64"></a>If all went well you should now see your BFS file systems in the Places menu and elsewhere in the system.</p>
<h3>Where to go from here?</h3>
<p>If you have followed the previous steps and played a little with the BFS file systems, you will probably have found out that you can't write to the BFS file systems. This is a limitation of the BeFS driver in Linux - it is read-only. But thanks to <a href="/news/2009-09-20_wrapup_reports_2009_google_summer_code_haiku_code_drive">HCD student Raghu Nagireddy</a> there is a FUSE module for BFS that can also write to the Be File System. I intend to create a PPA package for it, but for now you will have to <a href="https://dev.haiku-os.org/ticket/6014">build it yourself</a>. However, Ubuntu won't automatically pick up the BFS FUSE module to mount BFS file systems. It needs a mount-helper for that to work, which needs to be written.</p>
<h3>Questions & Answers</h3>
<p><em>Is it safe?</em><br>The BFS recognition code will only read from the file system, so you don't have to worry about any data loss. It could -theoretically- crash as I have only tested it on my two computers running Ubuntu Lucid and Ubuntu Maverick.<p>
<p><em>Can I remove the modified util-linux package?</em><br>Yes, the <span class="app">ppa-purge</span> program will revert the package to the one provided by Ubuntu. Just run:</p>
<pre class="terminal">sudo ppa-purge ppa:idefix/befs-support</pre>
<p><em>How about other distributions?</em><br>I only know that Fedora 14 ships with BFS recognition support out of the box. You will have to consult the package information of your favourite distribution whether it comes with <span class="app">util-linux v2.18</span> or higher.</p>
