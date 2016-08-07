+++
type = "blog"
author = "meianoite"
title = "And those decisions lead us to..."
date = "2007-06-25T01:21:38.000Z"
tags = ["scheduler", "gsoc", "scheduling algorithm", "algorithm", "O(1)", "complexity", "data structure", "multiprocessor", "affinity", "fairness", "real time", "CFS", "Linux", "comparison", "threads", "responsiveness"]
+++

<i>(Or: knitting a delicate fabric, part II: sewing it all together)
(Or: Right, Joker, the underwear might be on the outside, but I get to drive the Batmobile!)
(Or: I just <b>had</b> to say something about Batman and the Batmobile. Couldn't help it.)</i>

Cool, <a href="http://haiku-os.org/blog/meianoite/2007-06-24/some_design_decisions">now we have</a> a space- and time-efficient data structure (which is nothing more than a nice structure to handle non-overlapping numeric ranges) we can use to implement the simplified stride scheduling thing I've been discussing ou the previous posts, which will remain small most of the time, and won't change its shape like mad, so it's also very gentle on the CPU cache. Not only that, but the same effects hold for <b>any</b> trees, shall we decide that red-black trees aren't adequate and set ourselves to use splay trees, AA trees, AVL trees, Huffman trees, unbalanced binary trees (please: <b>no</b>.), whatever. So far we took care of the (not any more) skewed proportions due to randomness (by using strides), the mapping of "tickets" to tasks (by using trees to store the queues, "indexes" as the tickets, offsets to simulate "special" tickets, and lazy evaluation to efficiently implement offset propagation to upper queues), and the order of complexity (by using the queues as the node elements of the tree, where the key is base priority times number of threads in that queue).<!--break-->

<blockquote>Haha! Gotcha! You really thought you'd get rid of the infamous reminder about <a href="http://haiku-os.org/blog/meianoite/2007-06-17/introduction_to_the_new_haiku_scheduler_and_other_tidbits#disclaimer">the disclaimer</a>, didn't you? Take a peek if you haven't before. Thanks.</blockquote>

<blockquote><blockquote>(BIG Sidenote: notice that hashtables that map index numbers to queues won't really work, for the same reason that using an array to do this mapping won't work: we're dealing with ranges, which are most commonly searched for. There's no decent way to use them with arrays because of offset propagation, as discussed in the previous post, and the same logic applies to hashtables. Using discrete tickets is a no-no: you really don't want to insert a hundred tickets in the hashtable every time a thread with priority 100 is spawned... Or clear the same amount when a thread blocks or otherwise must be taken off of the <i>ready threads</i> queues.
For the sake of clarity, let me re-state the problem by using an analogy: it's like having an arbitrary number of sticks of different sizes that are multiple of the same unit (perhaps a centimetre), and you arrange them in a circle. Now you begin at an arbitrary point and walk <b>R</b> unit-large steps. Which stick will you be standing next to when you finish walking?
The problem lies in expressing the following facts: the sticks can actually be placed arbitrarily, but once you lay them down, they must be kept in that order at least until a (new) stick is removed from(/introduced into) the circle; the number of steps you take depend on how big the circumference of said circle is; the circumference will evidently change when you change the number of sticks; after you finish taking <code>size_of_circumference</code> walks, you <b>MUST</b> have stood beside a given stick <code>size_of_stick</code> times.
In other words: the proportions that were discussed <a href="http://haiku-os.org/blog/meianoite/2007-06-22/going_back_to_the_basics_kinda#proportions">in a previous post</a>.)</blockquote></blockquote>

Now, responsiveness is another matter entirely, and I intend to take the "easy" way out: forget about the cap on priority levels. But hey, there's no need for this shock expression of yours ;)

First, it's already established that, on BeOS and Haiku, there are 100 "regular" priority levels and 20 real-time priority levels. As mentioned, RT levels would be scheduled separately (the separate "realms"), and only when RT queues are active (evidently). They should be scheduled unconditionally when active, and in priority order. So strides will never touch RT queues. Keep this in mind: RT realm first, non-RT realm later.

Axel mentioned he'd like to have some mechanism to prevent starvation of non-RT queues. I believe something as simple as randomly skipping RT scheduling 5% of the time if we detect that some RT thread has gone runaway, or something like that, should do it. Maybe demoting the runaway RT thread to some non-RT level. Travis mentioned that he'd rather kill a RT thread that consumes a whole quantum in a scheduling round. He has a point there: RT threads should never go runaway, ever. I'd like to know what you people think.

But now that RT is (mostly ;)) out of our way and scheduled completely apart from "regular" threads, there's <b>absolutely nothing</b> stopping us from pretending there exist "regular" priority levels that are way beyond 100. The 120 priority numbers are simply part of a protocol between userland and the kernel. They are only numbers. There's nothing (other than sanity) that prevents us from internally numbering levels counting from 39254, or having them spaced by 50 units. This means we really don't need to care if we artificially inflate those numbers to well beyond what user-land would consider part of RT-reserved levels if we never expose the internal numbering scheme to user-land: we have already taken care of the RT-realm.

Thus, we could practically force any thread to run by simply placing it in a "fictitious" priority level (queue) that results from adding, say, 1000 to that given thread's base priority level. This way, if we detect that a thread that just woke up is interactive (using some heuristics, like those found on FreeBSD's ULE scheduler; but I have greater plans), we could boost it through the rooftop so it will (almost) certainly run next (unless a thread with even higher priority also received this "mega-boost"). Notice that:

<ul>
<li> said "mega-boosts" <b>do not</b> interfere with RT scheduling; those are separate scheduling realms</li>
<li> they are only good for a single scheduling round; after the boosted thread gets scheduled, it should be placed right back into its "native" queue, unless it blocks once again. Thus, those boosts should be completely transparent to the thread.</li>
<li> they should <b>only</b> be used to boost interactive threads (or otherwise "boostable" threads), preferably those associated with the GUI; boosting CPU-bound "batch-like" threads is a sure way to have crappy responsiveness.</li>
<li> the whole "mega-boosting" thing is effectively an expression of "scheduling classes". By boosting threads to a new "base" level that's much higher than the former ceiling of 100, we're actually creating <i>plateaus</i> of scheduling. This way, we can transparently prioritize certain patterns like interactive behaviour, and let CPU-bound threads be (quasi-optimally) handled by the variant of stride scheduling previously described. And by doing that we can emulate the ideal, and impossible to achieve in a general setup, shortest-job-first scheduling, quite successfully! And we don't need to stop here:</li>
<li> <b>Greater Plan Warning!</b> I once mentioned in a message to the Haiku mailing list that I'd like to "brand" semaphores with the subsystems they belong to, like GUI, disk I/O, network I/O, HID I/O and so on. This would be as simple as adding a field to <a href="http://svn.berlios.de/viewcvs/haiku/haiku/trunk/src/system/kernel/sem.c?view=markup"><code>struct sem_entry</code></a>, and versions of the relevant <code>*_sem()</code> functions that understand the extra "brand" argument. It would be a simple numeric argument that corresponds precisely to the desired boost. Like

<pre>
#define SEM_GUI  1000
#define SEM_HDIO  500
#define SEM_NET   200</pre>

(or an enum version, if that's preferred) and so on. Just like how priority levels are numeric constants but are #defined with mnemonic names. Just like priority mnemonics don't cover the full gamut, only "key" points, and don't prevent one to use some number in-between.

(And note that the numbers I just used don't make any sense, I picked them only for the purposes of exemplification. I still don't know what the ideal boosting for any scenario would be! And this is something that can't be really decided without empirical testing)

So in the future, if we get to brand semaphores with the subsystems and purposes they serve, this boosting mechanism (which effectively creates additional <i>implicit scheduling classes</i>), possibly even coupled with variable quanta, could even be extended to transparently shape loads in any way we desire, be them I/O loads, CPU loads, network loads etc. Said transparency is in the sense that the <i>application developer</i> doesn't need to explicitly guesstimate how to parametrize his threads, or even find him/herself in the uncomfortable position of needing create separate threads just to perform trivial operations because otherwise such operation could mischaracterise the main thread's behaviour (which would undermine the efficiency of heuristic approaches). Well, we're doing away with the heuristics entirely! The thread will <b>always</b> be adequately responsive depending on the code path it follows. Cool, huh?
One obvious application that comes to mind is providing time-sensitive multiplayer games like FPS, RTS and so on, quality-of-service-like reserved shares of resources such as network bandwidth, CPU time and so on, while you have dozens of torrents happily downloading, and any number of distributed computing projects crunching in the background. And your framerate remains undisturbed.</li>
</ul>


<b>The sky is the limit.</b>

In a nutshell: effective scheduling classes, transparent to the application developer and <b>not requiring pages and pages of code</b> to implement. Always doing the right thing depending not on explicit hints or complicated window-of-time heuristics, but actual code path behaviour. Load shaping based on whatever we wish, tweakable by user-land with the simple and familiar "priority level" interface, but extended to well beyond just CPU priorities.

Sure, it probably doesn't make much sense to have the <i>thread</i> scheduler take care of all those tasks, but its <i>code</i> could be redeployed to manage many kinds of subsystems that would benefit from this mix of tweakable fairness and responsiveness. I/O scheduler, network scheduler, and so on.

Now, for SMP... Well, that definitely deserves some further discussion. I've already hinted that I'm pretty much set on local, per-CPU queues, and, if possible, every CPU should schedule its threads independently. Having a global "rescheduling time" trigger or a single CPU handing tasks to other CPUs is pretty sub-optimal and almost nobody uses such master/slave scheme anymore. So I'd like to disturb CPUs as little as possible, by reducing IPIs and cache line syncs.

Let's consider the direction technology is heading. Intel is suggesting their future multicore CPUs will allow disabling select cores and overclocking the active ones when load is low. We could have threads spawned on any (enabled) CPU/core (from now on I'll use the term CPU to mean "processor unit", be it a core on a multicore chip, or in a multi-socket setup. I know this generalization is far from optimal when IPI and caches enter the equation, but read on!), and each CPU is responsible for balancing the load. If one CPU "sees" another that is less loaded, according to some threshold, or even that the system could benefit from re-enabling a CPU, it then migrates a thread to that CPU (actually, things should be a little more sophisticated than this; more on that in a bit). Thread migration could be implemented by having per-CPU "incoming" queues.

CPU <b>F</b> would move that a thread into CPU <b>G</b>'s incoming queue, and every time CPU <b>G</b> runs the scheduler, it takes (one? All? Some? To be decided; suggestions are appreciated!) thread(s) from this queue and puts them in the appropriate, priority-level-related queue (on the front? on the back? TBD as well). Such incoming queues should be non-blocking (i.e., if you can't move a thread to it right now, forget about it, or find another CPU that's available) and mutex-protected, of course. Alternatively, there could be "outgoing" queues instead, and "idling" processors could actively fetch those left-behind threads... But that doesn't feel very intuitive, IMHO. I'd like to know what you think.

Regarding affinity, well, using the apparatus just described, implementing it became surprisingly easy. With per-CPU queues, the dreaded "ping-pong" effect simply doesn't happen: threads will not be migrated unless load is unbalanced, and said threads don't have an "affinity flag" set. Affinity flags could come in several flavours: migrate as you wish (i.e., not set), do not migrate at all, migrate only to those CPUs in a given CPU pool, and so on.

"Hey!! CPU <i>pools</i>??"

Yes, but not in the NUMA/cluster sense. Remember when I mentioned that generalising processor units was a bad idea? It's because <b>this</b> is what I actually had in mind. Using a CPU pool abstraction is very powerful, because it allows us to encapsulate things like multi-cores and multi-sockets, SMT/Hyperthreading, shared/discrete caches and so on, behind several pre-cooked<i>CPU pool profiles</i>, and even allow the creation of custom ones. The CPU affinity API should be designed in such a way that exploring those incarnations of SMP is straightforward and very close to optimal without having to resort to the amount of exceptions and special cases that abound on Linux's and FreeBSD's schedulers.


OK, those last paragraphs were surprisingly small for such hairy themes. Well, let me know what you think, and feel free to ask for further clarification on parts that weren't explained well enough, or to correct me if I goofed up.

I hope you enjoyed the ride so far! Next post... <b>The obligatory comparison to Linux's <i>Completely Fair Scheduler</i></b>!

<br><br>
<blockquote>Don't miss the next chapter in the Scheduler saga! Tomorrow (hopefully), same bat time... Same <a href="http://haiku-os.org/blog/meianoite">bat channel</a> (powered by <a href="http://haiku-os.org/blog/1164/feed">RSS feeds</a>!)... <a href="http://haiku-os.org/blog/meianoite">Right here</a>. Stay tuned.</blockquote>