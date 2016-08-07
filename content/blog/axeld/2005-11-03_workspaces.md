+++
type = "blog"
author = "axeld"
title = "Workspaces"
date = "2005-11-03T08:43:00.000Z"
tags = ["workspace", "app_server"]
+++

<p>Most of us are used to how BeOS handles multiple workspaces: each workspace represents a configuration for the screen, including resolution, colours, and desktop background. The visual appearance, that is UI colours, scroll bar design, etc. is maintained per desktop, though - all workspaces share the same properties in this regard.</p>

<p>It's maybe not so obvious that every workspace also knows which windows are open on it, and in what order they are. When you switch between workspaces the position and order of the windows is usually preserved. There are exceptions when it comes to windows that are visible on multiple workspaces, but I never quite understood why this is and how it is working. Adi Oanca has implemented a similar behaviour for the Haiku app_server, and I hope that he figured out how it worked or even found a better way how these windows are handled.</p>

<p>Anyway, there can be up to 32 different workspaces for each user. And that makes 32 workspaces for each desktop, too. The desktop class manages the list of workspaces - it makes sure that every time you log into your computer, your workspace configuration is restored.</p>

<p>The Haiku app_server extends the idea of workspaces to multiple physical screens. How does that work? Every workspace will not only store the configuration of one physical screen, but all physical screens that are or were once attached to your computer. So in one workspace, you can have the second head of your graphics card (or even your second graphics card) configured to deliver a nice TV out signal, while in another workspace, it's configured to feed your second TFT panel right beside the first one. Of course, you would still need to switch the cables yourself in case you don't have a KVM switch :-)<br/>
Unlike the situation found in other famous operating systems, the screen settings are not lost if you change the screens attached to your computer (and not even if you don't change it) - or the graphics card for that matter. The configuration of each screen is preserved: if you only attach the video projector to your laptop during lectures, the app_server is supposed to recognize this and restore the configuration you had used for this output device. We'll see how well that works in reality - in R2, though, I'd guess.</p>

<p>In any way, the desktop spans over all physical screens, they share a single coordinate system. If a window asks for the screen size, it will only get the size of the screen it is asking for, though - if it wants to span over all screens attached, it needs to be adapted to know about multiple screens. This is even possible without any API extension, the BScreen class already covers this use completely.</p>
