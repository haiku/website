+++
type = "blog"
title = "[GSoC 2022] ARM port and device tree support Phase 1"
author = "Zhihong Niu"
date = "2022-07-28"
tags = ["haiku", "software", "gsoc2022", "arm", "device driver"]

+++

Hello everyone.

It's been a rough month, I'm having issues with the ARM port and it's holding me back.

Anyway, I'm on my way, which is great news.

##### TODO

1. Continue the ARM port

    The latest issue is a page fault occur at thread 778(which is the user thread).

    ```
    778:  init: libz.so.1
    vm_page_fault: vm_soft_fault returned error 'Bad address' on fault at 0x0, ip 0x0, write 0, user 1, exec 1, thread 0x30a
    thread_hit_serious_debug_event(): Failed to install debugger: thread: 778 (launch_daemon): Bad port ID
    ```

2. Prepare fdt

    When I was blocked, I read some relevant code and gained some experience with device driver architecture. I figured I could write a blog about it after I figured it out.

    Some of the code for fdt is already there and running, which reduces my workload, I need to interface them with fdt.

Thanks to my mentor David Karoly, David help me lot. The people in the community are very enthusiastic, and many people reply to me, which is a good encouragement to me, thank you!

Thanks for reading!
