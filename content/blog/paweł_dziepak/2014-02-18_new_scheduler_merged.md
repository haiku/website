+++
type = "blog"
author = "paweł_dziepak"
title = "New scheduler merged"
date = "2014-02-18T03:47:00.000Z"
tags = ["contract work", "kernel", "scheduler"]
+++

As you undoubtedly know, my scheduler branch has been merged a month ago. Also, some important changes has been made since, including bug fixes and performance improvements. It is now time to sum up what already has been done, and show some long promised benchmark results. There are still some issues that need to be addressed, but I do not think that any of them is a major one.
<!--break-->
Most of the interesting work had already been done when I wrote my last report. The rest of my contract time was mostly spent tweaking, fixing and improving. However, in order to make this task easier I implemented very simple profiler which, when enabled, collects data regarding time taken to execute each function. Not wanting to spent to much writing this profiler, which is merely a tool, I have chosen the simplest approach that requires each function the profiler is to recognize to include macro <code>SCHEDULER_ENTER_FUNCTION()</code>. Additional and very important advantage of this solution is that the profiler is aware of inlined functions as well what would not be the case if the profiler relied solely on the information available at run time. As a result I got a very useful tool that is able to show me statistics: number of calls, total inclusive time, total exclusive time, average inclusive time per call and average exclusive time per call.

Using the information obtained by the profiler I was able to identify and deal with many unnecessary bottlenecks in the scheduler implementation. An example of one would be the effective priority of a thread. As I explained in my previous posts thread may earn a penalty that temporarily reduces its priority. Since the effective priority of a thread is needed by various parts of the scheduler logic and it was computed each time it was needed a lot of time was wasted. The solution was easy: remember the effective priority and recompute it only when the penalty or the basic priority are changed.

The profiler also showed that quite a large amount of time is spent determining which thread should run next. Improving this required changes both in run queue implementation and locking of scheduler internal structures. Originally, run queues used a bitmap to quickly determine what is the highest priority of enqueued threads. That made enqueueing very fast as it required only to set appropriate bit in a bitmap, but in order to dequeue a thread the most significant bit had to be found what is an O(n) operation, n being the number of possible thread priorities (note that the data structure is still O(1) as the number of possible thread priorities is bounded). I decided to use heap instead to store the information on the highest priority. This means that both enqueue and dequeue are now O(log n), n being the number of possible thread priorities (the run queue is still O(1)). Testing this change with the profiler confirmed that decrease in dequeue time is worth the slight increase in enqueue time as attempts to dequeue a thread are more often than enqueue operations.

Another change made to reduce time needed to chose next thread was using separate lock to protect per CPU run queues. Generally, every ready thread is stored in a run queue owned by the core it is assigned to. However, to allow temporarily pinning threads to a certain logical processor each CPU also has its own run queue that contains all ready threads that are pinned to that particular logical processor. For the sake of simplicity, run queue of a core and run queues of all logical processors that belong to that core were protected by a single lock. However, despite the changes I described in previous paragraph, operations on run queue are quite costly (compared to e.g. a simple FIFO) and there is no reason why each of these queues can not be protected by its own lock.

There was also a problem with thread migration when all cores became overloaded. Since the core load was computed as a percentage of time spent doing actual work its maximum value was 100%. In a 2 core system with 4 CPU bound threads the scheduler was not able to distinguish between a situation when 1 of the threads is on the first core and 3 on the second and a situation when both cores have two threads assigned, in each case core load would be 100%. To mitigate this problem I made quite serious changes in the way core load is computed. Firstly, instead of computing the load each thread produces the scheduler attempts to estimate how much load would that thread produce if there was no other thread in the system. Then, core load is computed by summing such load estimation of every thread that has been running on the core during previous measurement interval and is likely to return (i.e. still exists and has not been migrated). This solution allows load balancing to work properly even if all cores are overloaded.

The logic regarding thread management on a core also needed some tweaks. I was not satisfied by the performance of the scheduler in terms of responsiveness, during some more challenging scenarios and adding more heuristics did not seem to be a good idea. Instead, I made the effective priority of every thread continuously cycle between its basic priority minus penalty and the lowest possible. This enabled me to simplify the code that decides whether priority penalty should be increased or cancelled as priority penalties as no longer the main way to prevent thread starvation. In addition to that I made the limitation of thread time slice length more strict. The idea, which I described in my previous posts, was to define a maximum latency between a thread becoming ready and starting to execute. Then when a time slice length of a thread was computed that maximum latency value was divided by the number of ready threads. This was never meant to be very precise or strict (nor it is now), however, I attempted to make the enforcement of maximum latency more effective. To achieve that I took a different approach to dealing with thread time slices. Now, instead of keeping track of time left the scheduler stores information how much of its time slice thread has already used and, each time it is about to run, its time slice is recomputed using current number of ready threads in the run queue thus trying to dynamically adjust time slice length to the current situation.

These are the most important changes I made since my last post in December. My goal was to introduce a modern scheduler algorithm that is aware of the hardware properties including cache, power usage, SMT and to make the whole kernel perform better on multiprocessor systems by either making locks more fine grained or trying to avoid them at all. There is still room for improvement both in the scheduler and the whole kernel, though, the benchmark results show that there is a decrease of performance in some scenarios. Identifying some of these problems may be more challenging because of the significant changes in locking in the kernel which shifted lock contention to other places that were not bottlenecks earlier.

All test were done using UnixBench 5.1.3 on gcc2h build with test programs built with gcc2. More is better in all tests. The last column is the difference between hrev46689 (the last revision before the new scheduler was merged) and hrev46861. The scheduler was set to low latency mode. Test on Intel i7 4770 were run with both cpuidle and cpufreq enabled.

<pre>
Intel Core 2 Duo

1 thread:
                                               hrev46689            hrev46861
Dhrystone 2 using register variables        7115136.8 lps        7280919.5 lps      2.3%
Double-Precision Whetstone                     2053.7 MWIPS         2053.3 MWIPS    0.0%
Execl Throughput                                944.6 lps           1089.3 lps     15.3%
File Copy 1024 bufsize 2000 maxblocks        297053.1 KBps        333946.7 KBps    12.4%
File Copy 256 bufsize 500 maxblocks           77672.1 KBps         88647.2 KBps    14.1%
File Copy 4096 bufsize 8000 maxblocks        716887.5 KBps        788334.1 KBps    10.0%
Pipe Throughput                              725684.6 lps         860490.1 lps     18.6%
Pipe-based Context Switching                 170368.4 lps         128296.0 lps    -24.7%
Shell Scripts (1 concurrent)                    637.5 lpm            573.9 lpm    -10.0%
Shell Scripts (8 concurrent)                    119.3 lpm             81.6 lpm    -31.6%
System Call Overhead                         775816.8 lps         960850.4 lps     23.9%

2 threads:
                                               hrev46689            hrev46861
Dhrystone 2 using register variables       13984823.4 lps       14114026.6 lps      0.9%
Double-Precision Whetstone                     4092.9 MWIPS         4099.5 MWIPS    0.2%
Execl Throughput                               1706.7 lps           1941.1 lps     13.7%
File Copy 1024 bufsize 2000 maxblocks        446325.4 KBps        457893.4 KBps     2.6%
File Copy 256 bufsize 500 maxblocks          117417.7 KBps        119450.6 KBps     1.7%
File Copy 4096 bufsize 8000 maxblocks        145707.2 KBps       1076602.3 KBps   638.9%
Pipe Throughput                             1449905.9 lps        1711562.9 lps     18.0%
Pipe-based Context Switching                 226215.1 lps         190808.2 lps    -15.7%
Shell Scripts (1 concurrent)                    908.3 lpm            685.8 lpm    -24.5%
Shell Scripts (8 concurrent)                    117.7 lpm             75.4 lpm    -35.9%
System Call Overhead                        1490019.4 lps        1830241.4 lps     22.8%
</pre>

Quite predictable. First two tests do not show much difference since they depend mostly on the CPU performance. "File copy" tests are the one that use cache most hence the significant increase in performance in one of them. Intel Core 2 Duo has enough L1 cache to fit most of the data used by both threads during the tests and, obviously, nothing else was running during that benchmark, as a result the benefits of cache affinity are not fully shown here. Also, "Pipe-based Context Switching" and "Shell Scripts" show decrease in performance which, despite being a bad thing, is not very surprising. The complexity of the scheduler has increased and it has problems with short lived threads (bug <a href="https://dev.haiku-os.org/ticket/10454">#10454</a>).

<pre>
Intel i7 4770

1 thread:
                                               hrev46689            hrev46861
Dhrystone 2 using register variables       11982727.0 lps       12005758.1 lps      0.2%
Double-Precision Whetstone                     2514.3 MWIPS         2515.7 MWIPS    0.1%
Execl Throughput                               1587.8 lps           1794.9 lps     13.0%
File Copy 1024 bufsize 2000 maxblocks        538815.6 KBps        593178.5 KBps    10.1%
File Copy 256 bufsize 500 maxblocks          137242.3 KBps        155385.4 KBps    13.2%
File Copy 4096 bufsize 8000 maxblocks       1615828.2 KBps       1584127.7 KBps    -2.0%
Pipe Throughput                             1422386.5 lps        1608623.9 lps     13.1%
Pipe-based Context Switching                 227089.9 lps         179972.5 lps    -20.7%
Shell Scripts (1 concurrent)                    881.5 lpm           1026.3 lpm     16.4%
Shell Scripts (8 concurrent)                    267.6 lpm            265.9 lpm     -0.6%
System Call Overhead                        1465359.6 lps        1670277.3 lps     14.0%

4 threads:
                                               hrev46689            hrev46861
Dhrystone 2 using register variables       41485947.8 lps       47924921.0 lps     15.5%
Double-Precision Whetstone                     9639.3 MWIPS        10061.3 MWIPS    4.4%
Execl Throughput                               1572.6 lps           1920.5 lps     22.1%
File Copy 1024 bufsize 2000 maxblocks        171534.6 KBps         73747.3 KBps   -57.0%
File Copy 256 bufsize 500 maxblocks           46656.0 KBps         49328.8 KBps     5.7%
File Copy 4096 bufsize 8000 maxblocks        182597.6 KBps        294309.9 KBps    61.2%
Pipe Throughput                             4943965.2 lps        6385496.1 lps     29.2%
Pipe-based Context Switching                 235802.3 lps         529553.1 lps    124.6%
Shell Scripts (1 concurrent)                   2180.3 lpm           2087.7 lpm     -4.2%
Shell Scripts (8 concurrent)                    280.2 lpm            255.6 lpm     -8.8%
System Call Overhead                        4262084.0 lps        5017380.6 lps     17.7%

8 threads:
                                               hrev46689            hrev46861
Dhrystone 2 using register variables       53714831.3 lps       54277995.3 lps      1.0%
Double-Precision Whetstone                    17506.3 MWIPS        17812.0 MWIPS    1.7%
Execl Throughput                               1606.1 lps           1747.1 lps      8.8%
File Copy 1024 bufsize 2000 maxblocks         74140.5 KBps         57900.0 KBps   -21.9%
File Copy 256 bufsize 500 maxblocks           43026.5 KBps         46933.9 KBps     9.1%
File Copy 4096 bufsize 8000 maxblocks        173899.3 KBps        207896.0 KBps    19.5%
Pipe Throughput                             7285875.6 lps        8710492.6 lps     19.6%
Pipe-based Context Switching                 300171.7 lps         864860.7 lps    188.1%
Shell Scripts (1 concurrent)                   2150.6 lpm           1986.6 lpm     -7.6%
Shell Scripts (8 concurrent)                    267.3 lpm            230.8 lpm    -13.7%
System Call Overhead                        6429142.5 lps        6818879.6 lps      6.1%
</pre>

Results of "File Copy" tests are surprising. Unfortunately, these tests involves almost all kernel subsystems (vm, vfs, block drivers) and BFS implementation what will make tracking this problem a bit more complicated. Since this performance drop is not present on all machines it is possible that it is not directly caused by the scheduler but rather an suboptimal implementation somewhere else. That needs to be investigated though. As for other tests, running four threads is the only situation that shows noticeable performance increase in the first two more CPU bound tests. That is what one would expect since Intel i7 4770 implements SMT and the new scheduler is aware of the problems it may create. There is also very significant increase in performance of "Pipe-based Context Switching". The reason for that is the fact that the old scheduler did not scale at all since it was protected by big <code>gSchedulerLock</code> (you can actually see that in the results of this test as they do not change much no matter whether one or eight threads are involved). This is no longer true, the scheduler uses much more fine grained locking.

Definitely, there are still many things that need to be taken care of. Some tunables could be set better, starvation prevention could be more effective what would allow time slices to be longer, thread migration could make better decisions. There is also the rest of the kernel which could avoid extensive lock contention more. However, the scheduler and the other changes were necessary and inevitable since sooner or later we would have to start caring about cache affinity, SMT, power usage and lock contention. I hope that what already has been done will make further improvements in that area much easier to achieve.