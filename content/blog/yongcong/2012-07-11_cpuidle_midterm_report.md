+++
type = "blog"
author = "yongcong"
title = "cpuidle: midterm report"
date = "2012-07-11T13:04:01.000Z"
tags = ["gsoc", "gsoc2012"]
+++

With the good preparation in quarter term/bonding period, I have completed the generic cpuidle kernel module, native intel cpuidle module and cpuidle driver(for states/info reporting). By original plan, these tasks will be all completed by the end of 3/4 term...

<!--more-->

Well I want to show the power saving result on my laptop(i5-2520M CPU, 4G memory, 320GB harddisk), after enabling the cpuidle and native intel cpuidle module, I saved about 2.5watt. Note, such power saving is achieved after removing ipro1000 driver and disabling Tracker, Deskbar.

After then, I added support to get c-state information such as, how many c-states there are, how long does each cpu spend on each c-state. It works well, here is output of my laptop c-states report after booting up 1-2 minutes
<pre>C-STATE COUNT: 5
CPU0
C1-SNB
15904 21091650us
C3-SNB
323 726222us
C6-SNB
136 55531us
C7-SNB
5305 66519576us
CPU1
C1-SNB
10846 27279470us
C3-SNB
223 477981us
C6-SNB
111 132995us
C7-SNB
4741 60377828us
CPU2
C1-SNB
15784 21833087us
C3-SNB
291 1098679us
C6-SNB
116 316450us
C7-SNB
4076 65310174us
CPU3
C1-SNB
12503 19676736us
C3-SNB
191 352467us
C6-SNB
26 156587us
C7-SNB
3858 68084986us</pre>

As can be seen, although we spent most time on C7 during idle, but the time spent on C1 state is still   unsatisfied. It means there are still more wakeups. However finding and removing the root cause of those unnecessary wakeups is my future work after gsoc and need haiku experts hand.


So far, I have one remaining task during summer by my proposal -- implement the acpi cpuidle module, so that old platforms and non-intel platforms can benefit the feature too.