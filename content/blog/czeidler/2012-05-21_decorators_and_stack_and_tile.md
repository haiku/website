+++
type = "blog"
author = "czeidler"
title = "Decorators and Stack and Tile"
date = "2012-05-21T21:40:47.000Z"
tags = []
+++

Just saw on Haikuware that there is another GUI for setting a decorator. First, I'm happy that people are actually using this "hidden" functionality to write custom applications. However, after Alpha 3 I changed the decorator API which broke all other decorators.

The reason for that is that the stacking feature of Stack and Tile is now integrated into the decorator. In other words all decorators have to support Stack and Tile now! Stacked windows share the same decorator and the decorator is responsible to display multiple tabs. This has the advantage that the developer has more freedom to design the appearance of the tabs. Furthermore, tabs can be arranged more flexible. For example, you can add the stacking features to the Amiga decorator by drawing the tabs beside each other into the title bar.

Updating the existing decorators is not too difficult but it's a bit of work. First, most decorator methods take a tab index now which has to be handled correctly. Secondly, the decorator must be able to somehow draw multiple tabs.

If you are interested to port an alternative decorator to the new API and so make it support Stack and Tile take a look at Decorator.h header and the DefaultDecorator *).


http://haiku.it.su.se:8180/source/xref/src/servers/app/decorator/