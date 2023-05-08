+++
type = "blog"
title = "[GSoC 2023] Plans for improving Icon-O-Matic"
author = "Zardshard"
date = "2023-05-05 14:07:09-04:00"
tags = ["haiku", "software", "icon-o-matic", "gsoc", "gsoc2023"]
+++

Icon-O-Matic is the editor for HVIF files, the format that Haiku's icons are in. It's a relatively simple but impressive aplication. It does have room for improvement, however.

There are three things I am planning to do during GSoC: fix bugs, refactor the code, and improve the UI. There is a list of known bugs that Icon-O-Matic has over on [Trac](https://dev.haiku-os.org/query?component=%5EApplications%2FIcon-O-Matic&status=assigned&status=in-progress&status=new&status=reopened&order=priority&col=id&col=summary&col=status&col=type&col=priority&col=milestone&col=component). You can help, too, by reporting bugs in Icon-O-Matic over there. Less obviously, you can also vote for tickets that you would like to be resolved. To do this, click on the ticket that interests you, then click one of the buttons highlighted by the arrow: ![The buttons are in the upper-right hand corner among the navigation links](/files/blog/zardshard/trac_upvoting.png)

## My current plans

Here are the plans that I currently have. As with all plans, they are subject to change.

### Add reference images

A feature that would be very nice for Icon-O-Matic to have is reference images. People have asked for this in [bug #2748](https://dev.haiku-os.org/ticket/2748) and [bug #8758](https://dev.haiku-os.org/ticket/8758).

### Add previews to shapes

Being able to see how a shape looks can help speed up navigation significantly.

### Improve conversion from SVG to HVIF

This would allow using more complete tools like Inkscape to create the vector files. This one is tentative. I haven't looked into whether this can be improved much, and it is likely a very hard problem since SVGs are a very complicated format.

### Allow grouping shapes

Being able to group shapes would be helpful in organizing them.

### Switch the code to using `BReferences`

Currently, `BReferenceable` is used directly. This has the potential to lead to bugs when one forgets to acquire/release the reference. This is the source of one of the bugs I fixed in https://review.haiku-os.org/c/haiku/+/6182.

### Get code out of the Icon library

Currently, icon-o-matic's source is split across two directories: src/apps/icon-o-matic and src/libs/icon. The latter is the icons library. It is, however, littered with `#ifdef ICON_O_MATIC`'s, which isn't very appropriate for a library to do!

### Bugfixes

I plan on working on bugs approximately in order of importance. This means bugs that are highly upvoted, on the roadmap for R1, or otherwise feel important will get worked on first.

## Conclusion

A big thank you to Google for hosting GSoC and all the work they put into it. Were it not for them, I would not be here today. I would also like to thank my mentors, PulkoMandy and Humdinger. You have been doing a great job so far!
