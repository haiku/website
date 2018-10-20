+++
type = "article"
title = "Haiku Ecosystem"
date = "2018-10-19T19:41:00.000Z"
tags = ["Development","Ecosystem","ports","HaikuArchives","source","code"]
+++

<p class="intro">Besides the core operating system with its servers, daemons, libraries and applications whose sources are in the Haiku tree, other software is included in packages that are built from recipes at the HaikuPorts project.</p>

<a name="haiku"></a>
### The Haiku Operating System

*Haiku source code:* https://github.com/haiku/haiku

Known simply as "Haiku" rather than "Haiku OS", the core operating system consists of the kernel and built in Haiku native applications that are always installed with the operating system. This includes everything from device drivers all the way up to system settings apps, the Tracker file browsing app, the Deskbar that allows launching and switching between apps, all the way up to how to build the Haiku anyboot images for installing Haiku.

<a name="haikuarchives"></a>
### HaikuArchives

*HaikuArchives source code:* https://github.com/haikuarchives

The HaikuArchives team hold the primary source code for most native Haiku applications created by the community. This includes many applications where development has stalled, but the source code has been retained for safe keeping as the apps still work in Haiku. Once active development recommences on an app, it may be transferred to the new owner, but a fork of the code is still maintained on Haiku Archives. These app releases can be incorporated in to the build system for Haiku Packages (hpkg app files), by creating a "recipe" at HaikuPorts, and are then available from the HaikuDepot application to install.

Alternatively, packages can be submitted to third-party repositories like BeSly, Clasqm or Fat Elk (see <a href="/community/software">Software Sites</a>).

<a name="haikuports"></a>
### HaikuPorts

*Ports source code:* https://github.com/haikuports/haikuports

If an application or library of another operating system shall be made to work on Haiku, a "recipe" file is created. This describes how to access the source code from the original app and modify its code (through patch files) and build flags to create a working Haiku Package (hpkg) file for Haiku, using the python tool "haikuporter". Many common applications and libraries from the Open Source movement are available within this repository. Writing a port is simpler than re-writing an application, although the port files still have to be maintained and tested for each release of the original application. Volunteers are always needed to help port software, and keep ports up to date.
