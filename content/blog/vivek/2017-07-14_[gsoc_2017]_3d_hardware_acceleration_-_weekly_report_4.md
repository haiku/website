+++
type = "blog"
title = "[GSoC 2017] 3D Hardware Acceleration - Weekly Report 4"
author = "vivek"
date = "2017-07-14 15:42:36+05:30"
tags = ["driver", "gsoc2017", "gsoc"]
+++

### Greetings

It has been a while since the last Report. So here I go. Firstly, I would like to thank all the Haiku mentors and developers for the first GSoC evaluation, thank you for believing in me. Now coming to the report.


### Progress

I am still at the Linux compatibility layer, adding new headers and dependencies one by one. Things are not moving as fast as I would like them to, mainly because of my lack of understanding of Haiku's internals. Linux has great documentation and thus a simple Google search brings up reading material which can be understood easily. It is pretty much the same with FreeBSD, but not the case with Haiku. Thus, the only two options I am left with is asking people in the mailing list and figuring it out myself. Both of which I try to do every time I face a problem but is a time-consuming process.

As per PulkoMandy's suggestion, I started posting my queries in the haiku-development mailing list, but still no response. Hence I am working on my own (with my limited knowledge of things). Shout out to korli for reviewing my [commits on GitHub](https://github.com/vivek-roy/haiku/commits/drm) and correcting me as I move forward. I would really appreciate if other developers could do the same.

Same as before, I am adding these headers (rather slowly), and trying to keep the #includes as tidy as possible. Once I have these important headers in place, things will be faster with every new addition. As of now I am trying to implement [dma-mapping.h](http://xref.plausible.coop/source/xref/freebsd-current/sys/compat/linuxkpi/common/include/linux/dma-mapping.h) using [mm.h](http://xref.plausible.coop/source/xref/freebsd-current/sys/compat/linuxkpi/common/include/linux/mm.h) and [page.h](http://xref.plausible.coop/source/xref/freebsd-current/sys/compat/linuxkpi/common/include/linux/page.h). Would really appreciate any kind of help.

Thank you for reading.