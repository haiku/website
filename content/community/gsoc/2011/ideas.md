+++
type = "article"
title = "Ideas"
date = "2011-03-01T01:40:26.000Z"
tags = []
+++

<p><strong>The Haiku Project has been selected to participate in Google Summer of Code&trade; 2011!</strong>
</p>
<p>
Qualifying students can apply for a Haiku project (see the list of <i>suggested</i> projects below) 
between March 28th and April 8th, 2011. For details about how to apply, please check out 
<a href="http://www.haiku-os.org/community/gsoc/2011/students">Students: How to Apply for a Haiku Idea</a>.</p>

<p>According to other mentor organizations, the most successful 
<i>Google Summer of Code</i> projects are the ones proposed by the students 
themselves. The following list represents our ideas and wishes 
of our project. However, suggesting your own idea is encouraged!</p>

<p>If you find an idea marked as "big" interesting but feel you cannot completed in time, 
feel free to suggest splitting it into smaller parts in your proposal. 
Also, many of these ideas are not sufficient as stand-alone projects and 
would need to be combined with others on this list or of your own suggestion.</p>

<p>Students, who intend to submit applications on ideas 
that are part of other accepted mentoring organizations, 
need to contact both Haiku and the other mentoring organization.</p>

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
<p>Even though an older <a href="http://www.abisource.com/">AbiWord</a> port is being hosted at 
<a href="http://dev.osdrawer.net/projects/show/abiword">OSDrawer : AbiWord Project Page</a>, 
the AbiWord project would prefer the port to use their current sources. </p>
<p>The student is responsible for determining which aspects of this project to persue.</p>
<ul>
<li>AbiWord: <a  href="http://www.abisource.com/wiki/Google_Summer_of_Code_2011">Official 2011 ideas page</a></li>
<li>Skill set: UI development, usability basics </li>
</ul>

<h4 class="icon-app-medium">VirtualBox port to Haiku</h4>

A port of VirtualBox to Haiku, would allow developers and users to run another operating system within Haiku.  <a href="http://article.gmane.org/gmane.comp.emulators.virtualbox.devel/3384">Preliminary VirtualBox port to Haiku</a>
<ul><li>
Skill set: userland development, kernel development, possibly x86 assembly
</li></ul>

<h4 class="icon-app-medium">
Enhancements for Virtualization Software
</h4>

Haiku works nicely both on real hardware and virtualized machines, but lacks most of the so-called "guest additions" that allows smoother integration with the host. This include changing resolution on window resize, mouse automatically switching from host to guest and back, file sharing. Write such a guest addition package for virtualbox or/and vmware
<ul><li>
Skill set: userland development, driver development
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

<p>An often requested feature. This includes being able to resize the filesystem and it's descriptive structures (eg, think of resizing an image file) and being able to resize the partitions on the drive. Ideally integrated within DriveSetup.</p>

<ul>
<li>Skill set: Driver development</li>
</ul>

<a id="drivers" name="drivers"></a>
<h3>Drivers</h3>

<h4 class="icon-app-medium">
USB 3.0 support
</h4>

<p>XHCI implementation Haiku has already some support for UHCI, OHCI and EHCI.</p>
<ul>
<li>
Requirements: acquiring a PCI-e USB 3.0 board (30$).</li>
<li>Skill set: kernel, and driver development</li>
</ul>

<h4 class="icon-app-medium">
USB Video (UVC)
</h4>

<p>This driver will support higher end webcams and other devices. This should be designed with portability to other OSes, which encourages the re-use of coding efforts for both Haiku and non-Haiku operating systems.</p>

<ul>
<li>Requirements: owning an UVC webcam.</li>
<li>Related code: <a href="https://dev.haiku-os.org/browser/haiku/trunk/src/add-ons/media/media-add-ons/usb_webcam/addons/uvc">skeleton driver</a></li>
<li>Skill set: kernel, and driver development</li>
</ul>

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

<h4 class="icon-app-medium">
TTY Layer
</h4>
<p>The TTY layer is needed for proper serial port support in Haiku. Until now the serial port was reserved for kernel debugging, but it is now time for proper userland support. Rewrite the API that was available in BeOS R5, and make sure it can be used with a real serial port. USB to serial converter may or may not be included.</p>

<p>Currently, the TTY layer is written mostly with the usb_serial in mind, so it uses stuff that might not be easy or possible at all to use in more low-level drivers (like pc_serial). The API could use improvements. Locking issues exist. Also the generic module is not yet in the image due to these.</p>

<p>Note: This task could include finishing phoudoin's libusb port, which would help to make the driver more feature complete.</p>

<ul>
<li>Skill set: kernel, and driver development</li>
<li>Tickets: <a href="https://dev.haiku-os.org/ticket/35">#35</a> <a href="https://dev.haiku-os.org/ticket/3232">#3232</a></li>
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

<a id="user-interface" name="user-interface"></a>
<h3>User Interface</h3>

<h4 class="icon-app-medium">
Preflet GUI refactoring
</h4>
Several preference applications (aka preflets) could be redesigned. This includes (but not limited to) :
<ol>
<li>combining Keymap and Keyboard</li>
<li>combining Mouse and Touchpad</li>
<li><a href="https://dev.haiku-os.org/ticket/6983">#6983</a> Printer</li>
<li><a href="https://dev.haiku-os.org/ticket/6206">#6206</a> integrate scrollbar options into a new Appearance preflet</li>
<li>Shortcuts</li>
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
Fix and improve Haiku's mail system
</h4>
<p>
Haiku features an integrated mail management system allowing to manage your mail using Tracker, the file explorer. This system needs some improvements and updates. See this <a href="http://www.freelists.org/post/haiku-commits/r40398-in-haikutrunksrc-addonsmail-daemon-addonsmail-daemoninbound-filters-addonsmail-daemoninbound-filtersmatch-header-addonsmail-daemoninbound-filtersnotifier-addonsmail-daemoninbound-filtersspam-filter,2">mailing list post</a> for a list of TODO and related ideas
</p>

<ul>
<li>Skill set: Network protocols, general C/C++</li>
</ul>


<h4 class="icon-app-medium">
Hardware 3D acceleration
</h4>
<p>Design or port an existing 3D driver interface. See for example the Gallium3D project. Another option is to write a compatibility layer to load binary Linux 3D graphics drivers. There should probably still be our own 3D acceleration API for drivers.</p>

<ul>
<li>
Skill set: graphics drivers, API design</li>
<li>Related code: <a href="https://dev.haiku-os.org/browser/haiku/branches/components/gallium3d">development branch</a>, containing gallium3d port</li>
</ul>

<a id="other" name="other"></a> 
<h3>Other</h3>

<h4 class="icon-app-medium">
BuildBot for Haiku's source tree (small)
</h4>
<p>Currently Haiku uses an in-house continuous integration solution  Haiku <a href="http://dev.osdrawer.net/projects/haikubuildomatic/repository/show/branches/rewrite2">Build-O-Matic</a>. Implementing a BuildBot would provide numerous features over Build-O-Matic. Some basic requirements would be to supporting building the various aspects of Haiku from source on numerous platforms (FreeBSD, linux based OS's, Haiku, ...,) <a href="http://www.freelists.org/post/haiku/ATTN-Python-Developers-opportunities-for-contributing">related thread</a></p>

<ul>
<li>Skill set: Python</li>
<li>Related information: <a href="http://www.freelists.org/post/haiku-development/Haiku-Project-GSoC-Idea-Buildbot-for-Haiku,1">Important information about BuildBot as a project idea</a></li>
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
Create Language Bindings to Haiku's C++ API
</h4>
<p>Scripting languages should be able to use the system API directly. Python and Perl have an object-oriented approach that would allow using the Be API and using the full power of the Be API right inside your scripts. This includes displaying windows, but also accessing the locale kit, or other native stuff.</p>

<p>In previous years, it has been discussed to utilize a dual-layer approach: First to use SWIG to generate uniform bindings and then to have a more natural syntax that binds to the SWIG bindings.</p>

<ul>
<li>Skill set: C++, Maybe Python and/or Perl</li>
</ul>


<h4 class="icon-app-medium">
Update Haiku support in SDL 1.3
</h4>
<p>SDL 1.2 branch works on Haiku, but is a bit buggy still. The new development is now focused on 1.3, which does not yet have native Haiku support. Since the code in the 1.2 branch is so buggy, this may need a complete rewrite.</p>

<ul>
<li>Skill set: C, userland development</li>
</ul>


<h4 class="icon-app-medium">
Add Haiku support to Allegro 5.0
</h4>
<p>Allegro is a gaming library, it has support for BeOS/Zeta/Haiku in the 4.4 branch, but they dropped BeOS from the 5.x branch. Now that Haiku is in a usable state it would be nice to get the latest builds of Allegro 5.0 working on Haiku. It's still unclear if Allegro will be applying for GSoC but they do have a developer who'd be willing to co-mentor this with a Haiku mentor.</p>

<ul>
<li>Skill set: C++, userland development</li>
</ul>