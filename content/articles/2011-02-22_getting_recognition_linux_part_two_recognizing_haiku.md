+++
type = "article"
title = "Getting recognition from Linux / Part Two - Recognizing Haiku"
date = "2011-02-22T22:40:07.000Z"
tags = ["ubuntu", "ppa", "grub"]
+++

{{< alert-info "" `This article was written when Ubuntu 10.10 was the latest version. Starting with Ubuntu 11.04 (Natty Narwhal), Haiku should be recognized out of the box. Just run <span class="cli">sudo update-grub</span> to add it to the GRUB menu.`>}}

<p>When I switched from Windows to Ubuntu, not only did I wonder why <a href="/articles/2011-01-26_getting_recognition_linux_part_one_recognizing_be_file_system">it wouldn't recognize the BFS file systems</a>, but also why Windows would automatically get added to the GRUB menu, but Haiku wouldn't.</p>

<!--more-->

<p>GRUB 2 uses its <span class="app">30_os-prober</span> script to detect other installed operating systems and add them to the menu. This script, in turn, uses the <span class="app">os-prober</span> utility to do the actual detecting. You can try it out with <span class="cli">sudo os-prober</span> to get a summary of all the recognized operating systems.</p>
<p>This utility didn't have any code to detect Haiku, so I <a href="http://git.debian.org/?p=d-i/os-prober.git;a=history;f=os-probes/mounted/x86/83haiku">wrote a module</a> that will look for the Haiku stage 1 bootloader, stage 2 bootloader and kernel. If all three are found, it will return the necessary information for GRUB to create a menu entry.</p>
<p>When I was about to submit the module to the maintainers, I discovered that François Revol had already <a href="http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=590897">submitted a module</a> to detect Haiku. But as it only checked for the stage 2 bootloader and was ignored by the maintainers for more than six months, I also submitted my module and after two days it got accepted. As of <span class="app">os-prober v1.44</span>, Haiku will be recognized by it.</p>
<p>Current versions of Ubuntu won't update to the newer <span class="app">os-prober</span> version, so I made a modified package and added it to my <a href="https://launchpad.net/~idefix/+archive/befs-support">Personal Package Archive</a> (PPA). When you have followed the steps outlined in the <a href="/articles/2011-01-26_getting_recognition_linux_part_one_recognizing_be_file_system">previous article</a>, you will also receive the modified <span class="app">os-prober</span> package when you update your system. After that, Haiku will automatically get added to the GRUB menu when you update the GRUB menu with:</p>
<pre class="terminal">sudo update-grub</pre>
<h3>Questions & Answers</h3>
<p><em>How do I disable automatically adding of Haiku (and other operating systems) to the GRUB menu?</em><br>You can disable the <span class="app">30_os-prober</span> script by adding the following line to the <span class="path">/etc/default/grub</span> file and then update the GRUB menu: <span class="path">GRUB_DISABLE_OS_PROBER="true"</span><p>
<p><em>How about other distributions?</em><br>Most distribution based on Debian should have <span class="app">os-prober</span> and there is <a href="https://bugzilla.redhat.com/show_bug.cgi?id=678442">a ticket</a> asking for inclusion in Fedora. If you use a different distribution, you will have to consult its package information whether it comes with <span class="app">os-prober v1.44</span> or higher.</p>
