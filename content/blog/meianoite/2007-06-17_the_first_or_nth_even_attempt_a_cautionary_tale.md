+++
type = "blog"
author = "meianoite"
title = "The first (or nth, even) attempt: a cautionary tale"
date = "2007-06-17T22:27:44.000Z"
tags = ["scheduler", "gsoc", "scheduling algorithm", "algorithm", "O(1)", "complexity", "data structure", "multiprocessor", "affinity", "fairness", "real time", "CFS", "Linux", "comparison", "threads", "responsiveness"]
+++

<i>(Or: rose-coloured glasses are both the blessing and the curse of being in love)</i>
<blockquote>But first, the obligatory <a href="/blog/meianoite/2007-06-17/introduction_to_the_new_haiku_scheduler_and_other_tidbits#disclaimer">disclaimer</a>, in case you missed it. Thanks.</blockquote>

Remember where I left <a href="/blog/meianoite/2007-06-17/introduction_to_the_new_haiku_scheduler_and_other_tidbits#bench">on the previous post</a>? Now, with greater confidence, I set myself to improve my original algorithm's performance even further. But that's just because I <b>knew</b> it sucked. It was extremely inefficient as far as implementation goes; it looked great in the benchmarks because it was being compared to O(n) (<i>n</i> being the number of threads in the system) algorithms, while it had O(1) complexity, so I already had a head-start, so to speak. Still, I knew the algorithm very well and understood that there were plenty of bottlenecks to fix. I wrote it, after all.

[/pride mode=off]
<!--more-->
Well, things started to look great as I progressed. I eliminated a nested loop, then I eliminated an outer loop, then I benchmarked a little more, and I reached extremely small overhead (only 8x slower)<a href="#note1" name="mem_bound">[1]</a> compared to the theoretical lower bound, i.e., a standard "for" loop that reads sequentially from an array (and does nothing afterwards with the element it just read). 

But then something hit me.

<a name="flaw"></a>My algorithm made no distinction between absolute priority levels, only relative.

If you read the description of <a href="http://www.beunited.org/bebook/The%20Kernel%20Kit/Threads.html#set_thread_priority()">set_thread_priority()</a> and <a href="http://www.beunited.org/bebook/The%20Kernel%20Kit/Threads.html#suggest_thread_priority()">suggest_thread_priority()</a> on the BeBook, you'll realise that there should be an attempt to correlate priority levels and frequency of scheduling a given thread. This means that, at the very least, that if I have two threads in the system, one with a higher priority than the other, the higher-priority one shouldn't, for example, always be picked 66% of the time while the other one is picked 33% of the time. If those priorities happen to be, say, 20 and 10, then those numbers are OK (2:1 ratio). But if one has a priority of 40 and the other a priority of 10, the ratio they're chosen should be 4:1. My algorithm only cared if one had a higher priority than the other, and tended to pick ratios such that the highest priority one got the largest share, then it diminished progressively as levels became lower. If there were 3 threads in the system with different priority levels, the ratios would be 50:33:16; 4 threads, 40:30:20:10, and so on.

<a name="wrong"></a>I felt that this is just wrong. (<a href="http://jeffr-tech.livejournal.com/3729.html">And I guess I'm not alone</a>. Cf. 4th paragraph. Different issue, but the motivation is quite similar. And I'm baffled at how the Linux guys didn't realise the issue with implementing <a href="http://www.opengroup.org/onlinepubs/000095399/functions/nice.html">nice(2)</a> up-front, and they certainly have <b>way</b> more experience with the subject than I. Let alone the semi-priority round-robin effect. Unless their interpretation of priority really is regarding <i>urgency</i>, not <i>quality of service</i><a href="#note2" name="QoS">[2]</a>.)

And then I resorted to nasty workarounds. (And I'm <b>so</b> not alone in doing this, and there are a million different scenarios where this shows that it's not even worth linking. Most people with IT-related jobs know exactly what I'm talking about.)

First, I tried adjusting the ratios with an exponential function. Then I tried to come up with more efficient ways to implement the exponential function. And well, although the ratios actually improved, things already started to feel <a href="http://www.local6.com/news/1978066/detail.html">way</a> <a href="http://www.ducttapeguys.com">too</a> <a href="https://en.wikipedia.org/wiki/MacGyver#MacGyverisms">hackish</a> when I considered using a fixed-point library of helper functions to avoid touching the FPU. This is the kind of thing you resort to when you have absolutely no other way out. Not the kind of thing you use to fix a broken <b>design</b>.

You know what? <a href="http://www.cla.purdue.edu/English/theory/psychoanalysis/definitions/analphase.html">I was so infatuated with my own algorithm that I didn't see how plainly flawed it was</a>.

So, I admit: I, childishly, spent nearly 3 weeks polishing a turd.

<a name="polishing"></a>Here's a lesson I'd like to share: if you consider yourself a smart and reasonable person, and you believe you know what the hell you're trying to do, but you reach a point where you're effectively shoehorning your square-peg approach into a round hole (no pun intended, please!), give yourself a nice break to re-think things over. You might be wasting your time polishing a turd.

<a href="http://home.howstuffworks.com/toilet.htm">Let it go</a>.

<br><br>
Notes:
<ol>
<li><a name="note1"></a>Yes, in <a href="#mem_bound">that particular case</a> an 8x slowdown was <b>damn</b> efficient. Remember that the bottleneck on the theoretical lower bound is memory access, and the next element of the array was almost certainly in cache by the time it was accessed, and that any accesses to eight different memory positions will give you a similar 8x slowdown. Any 8 variables not in a register will do; temporary, global, local, loop counter, array element, struct member, you name it. Simply managing a linked list will easily eat 4 or 5 of those: a temporary pointer to the element to remove/insert, adjusting the previous node to point to the next node, adjusting the element counter, the key of the node that you use for comparisons, and so on...</li>
<li><a name="note2"></a>IMHO, the issue of <b>urgency</b> is better solved through the use of scheduling classes, like real-time, interactive, batch and so on. <i>Within</i> those classes, I believe the access to a limited resource (CPU time in this context) should be granted according to Quality of Service-like characteristics, namely by following proportionality ratios <a href="#QoS">like I mentioned</a>. Notice I'm not talking about QoS in the "special reservation" sense in that a resource is wasted when not used (<a href="http://blogs.msdn.com/oldnewthing/archive/2006/11/23/1128591.aspx">bogus</a> example <a href="http://www.lockergnome.com/nexus/news/2006/06/01/how-to-take-back-20-of-your-bandwidth-from-windows-xp/">here</a>), but the saner (IMHO) <a href="https://en.wikipedia.org/wiki/Quality_of_service#QoS_mechanisms">weighted fair queuing</a> (an alternative explanation is found <a href="http://www.cs.berkeley.edu/~kfall/EE122/wfq-notes/sld002.htm">here</a>) approach.</li>
</ol>

<br><br>
<blockquote>Don't miss the next chapter in the Scheduler saga! Tomorrow (hopefully), same bat time... Same <a href="/blog/meianoite">bat channel</a> (powered by <a href="/blog/1164/feed">RSS feeds</a>!)... <a href="/blog/meianoite">Right here</a>. Stay tuned.</blockquote>