+++
type = "blog"
author = "engima"
title = "Haiku SVN: Debugging and UserlandFS"
date = "2007-04-12T12:19:28.000Z"
tags = []
+++

<h3>Quick Updates</h3>
<em>r20100-r20200</em>
<ul>
<li>Updates to Mesa 6.5.2 and binutils 2.17</li>
<li>Consoled debugging of app server, input server and the registrar</li>
<li>CPU initialisation fixes</li>
<li>Introduction of the UserlandFS</li>


<!--more-->


<h3>Full Updates</h3>

<p>DarkWyrm continued his efforts in the usability area with improvements to the CD player application's visuals and consistency with respect to MediaPlayer.</p>

<p>OpenGL continues to be updated with the upgrade of Mesa from 6.3 to 6.5.2; the mesa software addon should now be using this updated version. Additionally binutils-2.7 was updated in this period.</p?

<p>The list of contributers grew this period with the well deserved addition of Andrea Anzani, with many patches in the display and user interface arena, and Troeglazov "3dEyes**" Gerasim, known for ntfs-3g port in particular.</p>

<p>Ingo committed a series of changes leading up to the ability to automatically debug all the 'gui servers' in a consoled session, including the app server, input server and registrar.</p>

<p>Geist worked fruitfully on the kernel and threading with a low level fix for CPU initialisation. First discovering CPU detection code running prior to thread pointers being initialised, then moving to a process of setting up 'fake threads' early in the boot process for purposes of identifying the current CPU.</p>

<p>Ingo, ever the busy coder, introduced the UserlandFS module as previously widely reported. Including a ReiserFS 3.6 and parts of a RAM FS and BeOS networked FS it promises to be an excellent tool for the development and usage of filesystem drivers alike.</p>