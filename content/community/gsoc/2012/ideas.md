+++
type = "article"
title = "Ideas"
date = "2012-02-26T21:07:18.000Z"
tags = []
+++

<p>
Qualifying students can apply for a Haiku project (see the list of <i>suggested</i> projects below) between March 26th and April 6th, 2012. For details about how to apply, please check out <a href="http://www.haiku-os.org/community/gsoc/2012/students">Students: How to Apply for a Haiku Idea</a>.</p>

{{< alert-info ""
"According to other mentor organizations, the most successful _Google Summer of Code_ projects are the ones proposed by the students themselves. The following list represents our ideas and wishes of our project. However, suggesting your own idea is encouraged!">}}

<p>If you find an idea marked as "big" interesting but feel you cannot completed in time, feel free to suggest splitting it into smaller parts in your proposal. Also, many of these ideas are not sufficient as stand-alone projects and would need to be combined with others on this list or of your own suggestion.</p>

<p>Students, who intend to submit applications on ideas that are part of other accepted mentoring organizations, need to contact both Haiku and the other mentoring organization.</p>

<h3>Project Areas</h3>

<ul>
<li><a href="#applications">Applications</a></li>
<li><a href="#kernel">Kernel</a></li>
<li><a href="#drivers">Drivers</a></li>
<li><a href="#media">Media</a></li>
<li><a href="#network">Network</a></li>
<li><a href="#user-interface">User Interface</a></li>
<li><a href="#other">Other</a></li>
</ul>

<a id="applications" name="applications"></a>
<h3>Applications</h3>

<h4 class="icon-app-medium">Updating AbiWord</h4>
Even though an older <a href="http://www.abisource.com/">AbiWord</a> port is being hosted at <a href="http://dev.osdrawer.net/projects/show/abiword">OSDrawer : AbiWord Project Page (2.0)</a>, the AbiWord project would prefer the port to use their current sources (2.8.x).

The student is responsible for determining which aspects of this project to persue. AbiWord/AbiSource has participated in past GSoCs and we expect that they will again this year. This could be a possible cross project with a co-mentor from each org, so if interested in this one you may want to apply to both orgs.

<ul>
<li>AbiWord: <a  href="http://www.abisource.com/wiki/Google_Summer_of_Code_2012#Haiku_Port_for_AbiWord">Official 2012 ideas page</a></li>
<li>Skill set: UI development, usability basics </li>
</ul>

<h4 class="icon-app-medium">Updating and Extending WebPositive</h4>

Haiku uses a WebKit based browser called WebPositive. This task would involve:

<ul>
<li>Update to newer WebKit codebase</li>
<li>Update (jam) build system to package WebKit as an OptionalBuildFeature, to be used by Haiku's build system</li>
<li>Native network backend. Currently we use the Curl backend, which is slow and has some other problems. Use the (unfinished) "Services Kit" instead.</li>
<li>various webpositive tickets.</li>
</ul>
<ul><li>
Skill set: userland development, kernel development, possibly x86 assembly
</li></ul>

<h4 class="icon-app-medium">VirtualBox port to Haiku</h4>

A port of VirtualBox to Haiku, would allow developers and users to run another operating system within Haiku.  <a href="http://article.gmane.org/gmane.comp.emulators.virtualbox.devel/3384">Preliminary VirtualBox port to Haiku</a>
<ul><li>
Skill set: userland development, kernel development, possibly x86 assembly
</li></ul>


<a id="kernel" name="kernel"></a>
<h3>Kernel</h3>

<h4 class="icon-app-medium">
Filesystems: general improvements (BIG)
</h4>
Haiku has great support for its own filesystem, but most others are only available read-only, or not at all. It is way better for interoperability with other systems to be able to read and write to these disks.
<ol>
<li>ReiserFS, BTRFS, exFAT: write support</li>
<li>UFS2, ZFS: Read (& Write) support</li>
<li>SMB, Windows shares: Read (& Write) support</li>
<li>HAMMER FS: Read (& Write) support</li>
<li>SquashFS: To support booting Haiku off SquashFS on a CD/DVD</li>
</ol>
<ul><li>
Skill set: kernel, and driver development
</li></ul>

<h4 class="icon-app-medium">
IMAP FS: File system access to an IMAP account
</h4>

<p>In Haiku emails are stored as individual file with extended attributes. Mounting an IMAP account as a local file system is therefore a natural fit. The file system should have full read and write support (deleting mails (files), creating folders, and moving mails between folders, etc.) with local caching for better performance.</p>
<ul><li>
Skill set: kernel and file system (driver) development, network development
</li></ul>

<h4 class="icon-app-medium">
NFSv4 client with xattr support and caching
</h4>

<p>Haiku has an NFS client, but using the out of date NFSv2 specification and the old file system API. This makes it unusable for any practical purpose. Also, the current implementation doesn't support caching, which makes it slow, and lacks xattr handling, which is very important in Haiku.</p>
<ul><li>
Skill set: network protocols, maybe kernel development, userland development
</li></ul>

<h4 class="icon-app-medium">
BFS Partition Resizer
</h4>

<p>An often requested feature. This includes being able to resize the filesystem and its descriptive structures (eg, think of resizing an image file) and being able to resize the partitions on the drive. Ideally integrated within DriveSetup.</p>

<ul>
<li>Skill set: Driver development</li>
</ul>

<a id="drivers" name="drivers"></a>
<h3>Drivers</h3>


<h4 class="icon-app-medium">
ACPI Video Extensions
</h4>

<p>ACPI Video Extensions, as specified in ACPI Spec 4.0a Appendix B, adds special support to handle multiple output devices such as panels and TV-out capabilities, brightness control as well as special power management features.</p>

<p>Suggested work: Detect attached devices for display adapters, implement a basic driver for a display, allow display switching and brightness control.</p>
<ul>
<li>Requirements: computer with ACPI that has Acpi Video Extentions (_DOS _DOD and so on)</li>
<li>Skill set: kernel development, general C/C++, userland development</li>
</ul>

<h4 class="icon-app-medium">
AV/1394 support
</h4>

<p>Our Firewire stack supports DV receiving, but not controlling the A/V device (ie play/stop). This requires to modify the Firewire stack for FCP frame support. See AV/C Digital Interface Command Set General Specification for reference.</p>

<ul>
<li>Requirements: a DV camera, a machine with a Firewire port.</li>
<li>Skill set: kernel development, API design, general C/C++, userland development</li>
</ul>


<a id="network" name="network"></a>
<h3>Network</h3>

<h4 class="icon-app-medium">
Bluetooth Stack Improvements
</h4>
<p>Haiku Bluetooth Stack implements basic functionality on lower and middle layers, this functionality needs to be completed and Bluetooth 2.X possibilities explored.</p>

<ul>
<li>Requirements: Bluetooth enabled Haiku system</li>
<li>Skill set: C++, kernel development, userland development, global bluetooth stack knowledge(optional)</li>
<li>Tasks: RemoteDevices Database, UserLand tools(Preferences), Pairing/Auth/Encryption use cases, etc.</li>
</ul>

<h4 class="icon-app-medium">
Integrate our PPP implementation
</h4>
<p>Port the PPP implementation to our new network stack. Add phone-line modem support, including HDLC framing and VJC compression (porting both algorithms is sufficient, but make sure the license is compatible to MIT). Implement CHAP authentication. Find and fix bugs.</p>

<ul>
<li>Tickets: <a href="https://dev.haiku-os.org/ticket/812">#812</a>, <a href="https://dev.haiku-os.org/ticket/869">#869</a>, <a href="https://dev.haiku-os.org/ticket/873">#873</a>, <a href="https://dev.haiku-os.org/ticket/922">#922</a>, <a href="https://dev.haiku-os.org/ticket/923">#923</a>, <a href="https://dev.haiku-os.org/ticket/1059">#1059</a>, maybe: <a href="https://dev.haiku-os.org/ticket/1057">#1057</a>, <a href="https://dev.haiku-os.org/ticket/1058">#1058</a></li>
<li>Skill set: multi-threading basics, maybe network protocols and some kernel/drivers development, maybe UI development</li>
</ul>
<h4 class="icon-app-medium">
IPv6 Polish
</h4>
The base framework for IPv6 support was implemented as a Google Summer of Code 2010 project. Even so, there remains a lot of smaller cleanup/polish tasks that can be done as a project.

<ul>
<li>Tickets: 
<ul>
<li><a href="https://dev.haiku-os.org/ticket/8293>#8293</a> -- BNetworkAddress needs to check if there is an available IPv6 connection.</li>
<li><a href="https://dev.haiku-os.org/ticket/7228>#7228</a> -- RFC: BNetworkInterfaceAddress needs to store auto-configuration flags</li>
<li><a href="https://dev.haiku-os.org/ticket/6489>#6489</a> -- ifconfig needs to validate availability of ipv6 module prior to utilization</li>
<li><a href="https://dev.haiku-os.org/ticket/2632>#2632</a> -- Possible redefinition for struct sockaddr_in, related to IPv6</li>
<li><a href="https://dev.haiku-os.org/ticket/8319>#8319</a> -- Haiku needs IPv6 duplicate address detection during link scope ip configuration.</li>
<li><a href="https://dev.haiku-os.org/ticket/8317>#8317</a> -- Haiku needs IPv6 global scope Auto Configuration (router advertisement + DHCPv6)</li>
</ul>
</li>
<li>Skill set: IPv4 and IPv6 protocols, kernel and network stack development
</ul>

<a id="user-interface" name="user-interface"></a>
<h3>User Interface</h3>

<h4 class="icon-app-medium">
Preflet GUI refactoring
</h4>
Several preference applications (aka preflets) could be redesigned. This includes (but not limited to) :
<ol>
<li>combining Keymap and Keyboard</li>
<li>combining Mouse and Touchpad</li>
<li><a href="https://dev.haiku-os.org/ticket/6983">#6983</a>Printer</li>
<li><a href="https://dev.haiku-os.org/ticket/6206">#6206</a>integrate scrollbar options into a new Appearance preflet</li>
<li>Shortcuts</li>
<li>Notifications</li>
</ol>
<ul>
<li>Skill set: c++, UI development, usability basics</li>
</ul>

<h4 class="icon-app-medium">
Modular edit view (BIG)
</h4>
<p>
Many Haiku applications are using their own edit view to provide basic editor functionalities. All these implementations work a little bit different and create an inconsistent user experience. 
One solution is to provide a modular and powerful editor view that could be used in various Haiku applications.</p>
<p>The edit view design should be modular and extensible to make it easy to implement e.g. following features:</p>
<ul>
<li>syntax highlighting</li>
<li>spell checker</li>
<li>code completion, word completion</li>
<li>line numbers, ruler, 80 character limit line, hyper links</li>
<li>working on an input stream rather than on a input file e.g. to be able to open files ~100Mb without loading them into memory in one go.</li>
<li>interface to external applications e.g. to jump from a compiler error to the according line in the code</li>
</ul>
<ul>
<li>
Skill set: C++, UI development
</li>
</ul>


<a id="media" name="media"></a>
<h3>Media</h3>

<h4 class="icon-app-medium">
Merge CDPlayer into MediaPlayer
</h4>
<p>
The functionality of CDPlayer could be migrated into MediaPlayer, allowing the play back of audio cd's. An alternative to CDPlayer's way of controlling the device in a low-level fashion would be to make it use the wave files as presented by the cdda-fs, subscribe to volume mounts via BVolumeRoster, present a menuitem for the CD similar to one for DVDs in the VLC Media Player, having this option populate a playlist and start playing.
</p>

<ul>
<li>Skill set: general C/C++, userland development</li>
</ul>

<h4 class="icon-app-medium">
Streaming support for Media Kit and applications
</h4>
The media kit and related applications in Haiku relies a lot on the BMediaFile being seekable. This makes it difficult to use with non-seekable media sources such as internet streams or DVD media. Rework what's needed to get them working properly.

<ul>
<li>Skill set: general C/C++, userland development</li>
</ul>


<a id="other" name="other"></a> 
<h3>Other</h3>

<h4 class="icon-app-medium">
Fix and improve Haiku's mail system
</h4>
Haiku features an integrated mail management system allowing to manage your mail using Tracker, the file explorer. This system needs some improvements and updates. See this <a href="http://www.freelists.org/post/haiku-commits/r40398-in-haikutrunksrc-addonsmail-daemon-addonsmail-daemoninbound-filters-addonsmail-daemoninbound-filtersmatch-header-addonsmail-daemoninbound-filtersnotifier-addonsmail-daemoninbound-filtersspam-filter,2">mailing list post</a> for a list of TODO and related ideas

<ul>
<li>Skill set: general C/C++, userland development</li>
</ul>

<h4 class="icon-app-medium">
Trac Plugin: "Test and Commit Patch" functionality
</h4>
<p>
Several developers have requested the ability to simply press a button that would trigger an automatic system to test and (conditionally commit) a supplied patch.
</p>
<ul>
<li>Skill set: Python</li>
</ul>


<h4 class="icon-app-medium">
Add Haiku support to Allegro 5.0
</h4>
<p>Allegro is a gaming library, it has support for BeOS/Zeta/Haiku in the 4.4 branch, but they dropped BeOS from the 5.x branch. Now that Haiku is in a usable state it would be nice to get the latest builds of Allegro 5.0 working on Haiku. It's still unclear if Allegro will be applying for GSoC but they do have a developer who'd be willing to co-mentor this with a Haiku mentor.</p>

<ul>
<li>Skill set: C++, userland development</li>
</ul>

<h4 class="icon-app-medium">
Graphical project manager tool
</h4>
BeOS had CodeWarrior IDE built-in, which makes it easy to create a new project and get started on development. Haiku currently only provide make and jam in the default installation, which is far less easy to use for starting developpers. The makefile engine is somewhat simpler, but more limited. All of these tools are to be used in text mode, not so good for beginners. Create some graphical tool to easily get started on 3rd party development in a few clicks. No need for a full-blown IDE.

<h4 class="icon-app-medium">
Tracker add-on for source control
</h4>
Windows has TortoiseSVN and TortoiseGIT. Do something similar with Haiku Tracker.
<ul>
<li>Write a Tracker add-on that has the functionality</li>
<li>Extend support in Tracker itself where needed : icon overlays, ...</li>
</ul>

<h4 class="icon-app-medium">
Modify the app_server to support compositing
</h4>
This would be a step towards faster/smoother scrolling, window positioning and drawing. Once compositing is in place, it would also be possible to create Compiz-like effects in Haiku, eg. drop shadows and window animations. There's lots of info on what would need to be done and how to go about it in this article: https://www.haiku-os.org/articles/2011-06-15_how_transform_app_server_code_use_compositing .
<ul>
<li>Skill set: C++, graphics development</li>
</ul>

<h4 class="icon-app-medium">
Evaluate Qt as a potential Haiku R2 API
</h4>
While in comparison with other frameworks the BeOS API was quite nice back in the day, save for a few additions (like layout management, an improved archiving mechanism, tool tips) very little has changed since. Particularly the interface kit leaves a lot to be desired these days, both in general design and completeness. The Qt toolkit on the other hand has evolved quite nicely over time and now presents a very complete and well designed API. This project shall evaluate Qt as a potential native Haiku R2 API, replacing partially or even completely the previous BeOS/Haiku API.
<ul>
<li>Analyze the current state of the <a href="http://qt-haiku.ru/">Qt port</a> and add/complete what is missing/incomplete.</li>
<li>Add extension in or on top of the Qt API to provide access to Haiku specific functionality (attributes, entry_refs, resources, translators, etc.)</li>
<li>As a proof of concept port an existing Haiku application (e.g. StyledEdit) over to the extended Qt API.</li>
</ul>
<ul>
<li>Skill set: C++, API development</li>
</ul>
