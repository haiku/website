+++
type = "blog"
author = "yongcong"
title = "cpuidle: quarter term report"
date = "2012-06-22T15:42:42.000Z"
tags = ["gsoc", "gsoc2012"]
+++

I completed my 1/4 goal ahead of proposal schedule. By the original plan, I should investigate whether we need necessary changes to x86 idle routine and x86 architecture specific instruction usage. The results were reported to gsoc maillist on 3rd Jun. Here are the copied results:
1. no need to change x86 idle routine
2. monitor/mwait works perfectly. I have measured the power consumption when using idle implemented with "monitor/mwait", it's the same as the version implemented with "hlt".
<!--more-->
After then, I wrote one haiku normal kernel module to change the idle routine during module initialization --"hlt" version => "mwait" version. It works too. My experiment goes further after that, make the cpu always enter the deepest sandybridge c-states using "mwait" instruction, it did show an impressive power saving.

Then it's time to design and implement the generic idle framework. After more code reading and careful consideration, the framework will be designed as following(this design was sent out a few days ago to gsoc mailist):


1. one generic cpuidle kernel module(similar as the bus_manager module)
which handle with idle routine, statics collection, etc. When loading, it
will enumerate drivers/cpuidle/ for available lowlevel idle implementaions

2. various lowlevel idle modules which implement the idle states entering
routines.

3. one cpuidle raw driver which will load the generic cpuidle kernel module
during initialization. This driver will export the userspace interface and
publish devices under /dev/

4. one userspace which interface with the cpuidle raw driver, it's used to
report statics, information

NOTE:4 is optional if we don't want the cstates statics report. Then 3 can also be removed if we add the cpuidle generic module auto loading logic to somewhere. We can easily change or remove 3 and 4 according to haiku reviewers when the cpuidle is merged to haiku master branch in the future.


Before Mid-term evaluation, the cpuidle framework should be ready. And if everything goes fine, we can saw a basic intel native idle implementation using the "mwait" instruction