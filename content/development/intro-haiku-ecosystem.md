+++
type = "article"
title = "Haiku Ecosystem"
date = "2018-10-19T19:41:00.000Z"
tags = ["Development","Ecosystem","ports","HaikuArchives","source","code"]
+++

<p class="intro">Haiku is composed of the core Operating System itself, Haiku apps under the Haiku Archives project, and applications ported from other operating system held by the Haiku Ports project.</p>

<a name="haiku"></a>
<h3>The Haiku Operating System</h3>
<p>*Haiku source code:* https://github.com/haiku/haiku</p>
<p>Known simply as "Haiku" rather than "Haiku OS", the core Operating System consists of the Kernel and built in Haiku native applications that are always installed with the operating system. This includes everything from device drivers all the way up to system settings apps, the Tracker file browsing app, the Deskbar that allows launching and switching between apps, all the way up to the downloadable Haiku anyboot images for installing Haiku.</p>

<a name="haikuarchives"></a>
<h3>Haiku Archives</h3>
<p>*Haiku Archives source code:* https://github.com/haikuarchives</p>
<p>The Haiku Archives team hold the primary source code for most native Haiku applications created by the community. This includes many applications where development has stalled, but the source code has been retained for safe keeping as the apps still work in Haiku. Once active development recommences on an app, it may be transferred to the new owner, but a fork of the code is still maintained on Haiku Archives. These app releases are incorporated in to the build system for Haiku Packages (hpkg app files), and are available from within the Haiku Depot application to install.</p>

<a name="haikuports"></a>
<h3>Haiku Ports</h3>
<p>*Ports source code:* https://github.com/haikuports/haikuports</p>
<p>Where there is an application or library on another operating system that people want to work on Haiku, a 'port' file is created. This describes how to access the source code from the original app and modify it's code (through patch files) and build flags to create a working Haiku Package (hpkg) file for Haiku. Many common applications and libraries from the Open Source movement are available within this repository. Writing a port is simpler than re-writing an application, although the port files still have to be maintained and tested for each release of the original application. Volunteers are always needed to help port software, and keep ports up to date.</p>
