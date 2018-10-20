+++
type = "article"
title = "Haiku Design"
date = "2018-10-19T19:23:00.000Z"
tags = ["Development","Design"]
+++

<p class="intro">This page describes the high level architecture of the Haiku operating system, and its design philosophy.</p>

Haiku was originally started under the name "OpenBeOS" that aimed to create a free and open source operating system that was backwards compatible with the BeOS. Haiku still maintains backwards compatibility for BeOS apps in the 32bit build, and a 64bit compatibility layer is being worked on. It is now though its own distinct Operating System, compatible with both modern and legacy hardware.

Haiku, like the BeOS before it, is designed as a pervasively multi-threaded operating system. Haiku services ("Servers") and GUI applications are composed of many threads, making the applications very responsive.

A Messaging system within and between applications and Haiku servers allows asynchronous invocation of functionality across different applications. This may be used within an application to have one dialog box invoke functionality in another part of the application. In the Paladin IDE, for example, a Project Window will pass a message to open a File Open dialog box when an existing file needs adding to a project. This BFilePanel instance in return will pass a message indicating that one or more files or directories have been selected.

Similarly, the Paladin IDE will pass a message to the launch_roster, within Haiku to indicate that a source code file should be opened with the user's preferred text editor. For full details on Messaging, see the <a href="/docs/api/app_messaging.html" target="_blank_">Messaging section in the Haiku Book</a>.

Haiku includes the Be Filesystem. This filesystem has file attribute (metadata) indexing built in to the file system itself, rather than having metadata indexing added as a separate service in the OS. This makes searching for files very fast. Applications can add attributes and file types to Haiku, allowing a developer to take advantage of this system natively in their applications. The Contacts app, for example, uses attributes to index Names, Phone numbers and Email addresses. Each Contact becomes a file in the operating system, visible within the file browsing application, Tracker, with its attributes listed as any other file attribute would be in other operating systems.