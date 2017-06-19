+++
type = "blog"
title = "[GSoC 2017] 3D Hardware Acceleration - Weekly Report 3"
author = "vivek"
date = "2017-06-19 15:42:36+05:30"
tags = ["driver", "gsoc2017", "gsoc"]
+++

### Greetings

Almost 2 weeks since the last Weekly Report, so here goes what I have been up to in the last two weeks.


### Adding code

I am slowly adding new code as you might see [here](https://github.com/vivek-roy/haiku/commits/drm). Each commit represents a new file and its dependencies compiling successfully in my machine(gcc5). In [asm/atomic.h](https://github.com/vivek-roy/haiku/blob/9026ac8d45499d16e78b16058ba580467e9fbe3d/headers/compatibility/linuxkpi/asm/atomic.h) I have commented out some of the [functions](https://github.com/vivek-roy/haiku/blob/9026ac8d45499d16e78b16058ba580467e9fbe3d/headers/compatibility/linuxkpi/asm/atomic.h#L113) which I believe is not required for DRM. If I find some use of those functions then I will have to revisit this file and make the necessary changes. Also, I have used some compiler (gcc5) [functions](https://github.com/vivek-roy/haiku/blob/9026ac8d45499d16e78b16058ba580467e9fbe3d/headers/compatibility/linuxkpi/asm/atomic.h#L60) in [asm/atomic](https://github.com/vivek-roy/haiku/blob/9026ac8d45499d16e78b16058ba580467e9fbe3d/headers/compatibility/linuxkpi/asm/atomic.h) which will later have to be changed appropriately for use with gcc2 if that is desired.

I am adding these headers (rather slowly), and trying to keep the #includes as tidy as possible. Once I have these important headers in place, things will be faster with every new addition. Whatever questions I have, I keep asking in the GSoC mailing list (haiku-gsoc@freelists.org). I would love some feedback and/or recommended changes, either in the GSoC mailing list or comments to my [commits on GitHub](https://github.com/vivek-roy/haiku/commits/drm). As of now I am trying to implement linux/mutex.h using [lock.h](http://cgit.haiku-os.org/haiku/tree/headers/private/kernel/lock.h).

Thank you for reading.