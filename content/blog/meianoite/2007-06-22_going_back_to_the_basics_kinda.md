+++
type = "blog"
author = "meianoite"
title = "Going back to the basics... kinda."
date = "2007-06-22T05:52:42.000Z"
tags = ["scheduler", "gsoc", "scheduling algorithm", "algorithm", "O(1)", "complexity", "data structure", "multiprocessor", "affinity", "fairness", "real time", "CFS", "Linux", "comparison", "threads", "responsiveness"]
+++

<i>(Or: what you finally learn to do after a number of false starts)</i>
<blockquote>But first, the obligatory <a href="/blog/meianoite/2007-06-17/introduction_to_the_new_haiku_scheduler_and_other_tidbits#disclaimer">disclaimer</a>, in case you missed it. Thanks.</blockquote>

After I admitted the <a href="/blog/meianoite/2007-06-17/the_first_or_nth_even_attempt_a_cautionary_tale#flaw">basic flaws</a> of my previous attempts, I decided to go back to the basics and use a "bottom-up" approach to come up with a solution that suited the needs of the Haiku scheduler: fairness, responsiveness, responsive, scalability, succinctness and efficiency.

Right. So let's keep in mind that the BeBook <a href="http://www.beunited.org/bebook/The%20Kernel%20Kit/Threads.html#set_thread_priority()">already hints</a> at what the priority numbers should roughly mean: frequency of scheduling. We have <a href="http://svn.berlios.de/viewcvs/haiku/haiku/trunk/headers/os/kernel/OS.h?view=markup">120 priority levels</a>; the higher 20 are reserved to real-time threads.

This post is not going to address these directly. Instead, today I'll be telling the background story of how quite a number of pieces are being woven together to fulfill those specific needs and constraints. OK, enough metablogging ;)

After <a href="/blog/meianoite/2007-06-17/the_first_or_nth_even_attempt_a_cautionary_tale#polishing">letting go of the previous approach</a>, I decided to study the subject on the very traditional literature about it. And while I was studying classic scheduler approaches on the Minix book, I noticed that the description of lottery-based scheduling was very compatible with that description of priorities meaning approximate frequency of being chosen by the scheduler. Lottery scheduling was <a href="http://www.waldspurger.org/carl/research.html">proposed by Carl Waldspurger</a> in 1994, and it works roughly like this<a href="#note1" name="lottery">[1]</a>:

<!--more-->

Let's use a supply vs. demand analogy. Think of a very popular store you know, and suppose there's a <b>big</b> sale going on. Only one person can go inside the store at any time, and only when someone else gets out of it. The people outside refused to form a line, but they accepted participating in a lottery-like system, where numbers are drawn randomly and the person holding the winning ticket gets inside the store. 

Suppose you could assign different priorities to people with special needs; for example, the elderly and the pregnant could receive more than one ticket to increase their chances of going inside sooner than others.

Seems fair, right? So let's go back to computers. Suppose there exists some resource that is available in limited quantities (like CPU power, I/O bandwidth, network bandwidth, and so on). Suppose there are several processes competing for those resources, and they can have different priorities. Now, suppose that you could assign those processes "tickets" that can be used to organise how they will be served.

A ticket corresponds to slot of time during which a process can make use of those limited resources. Like in a lottery, the ticket number is drawn at random, and the process with the winning ticket is allowed to use the resource. Suppose it's possible to give many tickets to process; it will then be allowed to use those limited resources proportionally to the number of tickets it holds. So processes holding 20 tickets will be allowed inside 20 times, process 10 tickets, 10 times; and so on.

<i>Except that those tickets don't expire, and are good for as many trips inside as the process wishes</i>. This effectively makes it so that, during their lifetime, a process holding 20 tickets will be allowed inside twice as many times as one holding 10 tickets. <i>As time goes by, the processes will have used the resource proportionally to the number of tickets they hold</i>. Cool, eh? Priorities can be easily implemented by simply handing a process a number of tickets proportional to what its priority should be.

I had to stop for a moment to really appreciate how elegant this is. I mean it; I just felt like staring at the void for a good time until things clicked together. It seems that people have no problem understanding priorities when dealing with an one-shot event (like a queue on the bank where the elderly, the pregnant etc have higher priority to be attended to by the cashier), but priorities when dealing with cyclical events <a href="/blog/meianoite/2007-06-17/the_first_or_nth_even_attempt_a_cautionary_tale#wrong">are not this straightforward</a>. The idea of being cyclically served, with the cycles expressed as temporal frequencies, and noticing that the ratios between frequencies can be understood as differences in priority, is very simple, very powerful, and very elegant. The concept of <a href="http://www.princeton.edu/~unix/Solaris/troubleshoot/schedule.html#FSS">fairness</a> stems naturally from it.

Not to mention how plainly intuitive this is. Isn't it great to have something palpable to relate to when discussing priorities? Isn't it better to think in terms of physical tickets instead of cold numbers?

Well, great!
<br><br>
<blockquote>I really wished things were just this simple.</blockquote>
<br>
So far, I've been trying to avoid sounding too technical, because until now most of the feedback I received came from a non-technical audience. Sorry, folks, I can't avoid going a little deeper into the technical details right now. But I'll try my best not to make things sound too hairy.

Lottery scheduling sounds very nice in theory, but there are some problems. The most obvious problem is the randomness: the first several rounds of scheduling will resemble anything but the proportion we'd like to attain. We only observe the desired ratios in the long run.

A possible solution to this was proposed by Waldspurger himself in 1995, when he introduced the <a href="http://www.waldspurger.org/carl/research.html">Stride Scheduling</a>. In a nutshell, he replaced random lotteries with strides and passes. All processes had a property called "pass" and a property called "stride". Strides are inversely proportional to the priority. Each time a process is chosen, its pass is increased by stride. The scheduler always picks the process with the lowest pass<a href="#note2" name="stride">[2]</a>.

The second problem lies in the mapping between tickets and processes. Searching for a ticket by visiting every process is very inefficient. We could use hash tables, or trees, to do this indexing. I'll tackle this in a following post.

The third problem is that one of the requirements of Haiku's scheduler is that it should have constant (<a href="https://en.wikipedia.org/wiki/Big_o_notation">O(1)</a>) complexity regarding the number of processes (threads, in our case). I didn't manage to find<a href="#note3">[3]</a> whether Waldspurger's work touches this issue at all, but at least <a href="#note3">one implementation</a> used a tree to organise the threads. And there was this thing called "Hierarchical Stride Scheduling" on his thesis and the sound of those words ringed some bells here. I'll address this one right in the next post.

The fourth and worst problem is that both lottery- and stride-based scheduling are great for processes that want to use as much of the limited resource as possible during their time share. In the case of CPU power, those would be CPU-bound threads. BeOS and Haiku are desktop operating systems, where interactive threads are prevalent. This means that there will be plenty of threads that spend most of their time waiting for user input instead of using the CPU.

<br>
Uh, quite a handful of tricky problems. Kind of discouraging, no?
<br><blockquote>But wait, all is not wasted ;) There are solutions for all those problems. I have come up with some twists that I'd like to share with you.</blockquote>
<br>
I'm convinced that even if the stride scheduling as expressed in Waldspurger's thesis could be less than optimal for interactive tasks (i.e., it doesn't approach the static version of <a href="https://en.wikipedia.org/wiki/Shortest_remaining_time">shortest-remaining-time scheduling</a>, which is proven to provide the best possible average response times), there's no doubt in my mind that the idea of using strides results in perfect fairness when all tasks are equal. One can actually prove this mathematically. Not necessarily his stride + pass approach, though. <a href="https://en.wikipedia.org/wiki/Stride_of_an_array">Simple strides</a> will do.

For example, for modeling purposes, suppose you have an array where you store a task T as many times as T's priority is (let's call this the temporal frequency property, or TFP). So let task A have priority 1, task B have priority 2, task C have priority 3. One possible array where the TFP holds is
<b>A B B C C C</b>
but so does <i>any permutation of this array</i>. If you multiply the occurrences of every element by a constant factor, for example 2, the array becomes
<b>A A B B B B C C C C C C</b>.
The TFP still holds for this array, as well as for <i>any possible permutation of it</i>. This is the key of the discussion that follows, so please take a moment to convince yourself that this is true.

It turns out that for any array for which the TFP holds, it's possible to reduce it to the "trivial" array by ordering the array by task size (i.e., making it "non-permuted") and "scaling" it so that the fewest occurring element appears divided by Greatest_Common_Divisor(A.prio, B.prio, C.prio, ...) times.

<i>In other words, doing exactly what we do when reducing fractions</i>. Eh. Sorry if that sounded scary.

Nice, so now we have an invariant :) So, for clarity, let's keep the trivial array,
<b>A B B C C C</b>.

Ideally, we'd like those three tasks to be run with a fixed temporal frequency, to ensure fairness and to have smooth response times. If we were to access this array sequentially, the ideal permutation of this array would be
<b>C B A C B C</b>
or some slight variation of it. However, finding such permutation when the array is much bigger than this one (which would be the common situation in our case) is not a cheap operation.

However, we can do some math tricks to try to approach this ideal situation. In Computer Science, those kinds of tricks are called <a href="https://en.wikipedia.org/wiki/Heuristic_%28computer_science%29#Heuristic_algorithms">heuristic algorithms</a>.

<a name="proportions"></a>Notice that any strided, <i>modulo</i> size of the array (which is identical to the sum of all priorities), traversal of this array, where the stride is coprime to the size of the array (let's call it Good Stride Property), will return a given task proportionally to the number of times it appears on the array, divided by the size of the array (i.e., the sum of the priorities of all tasks). (Alternatively, if we don't scale the array, it's enough to calculate the stride using the trivial array, and then scale the stride using the GCD.)

So in our example A will appear 1/6 of the times, B, 2/6 (1/3) of the times, and C, 3/6 (1/2) of the times. For <b>any</b> stride for which the GSP holds.

Trivial case: stride = 1. Traversing the array will output <b>A, B, B, C, C, C, A, B, B, ...</b>
Next case, stride = 2: not coprime, GSP doesn't hold. Would output <b>A, B, C, A, B, C...</b>, and the proportions are gone.
Next case, stride = 3. not coprime, GSP doesn't hold, would output <b>A, C, A, C, A, C...</b>, and <b>B</b> doesn't even show!!
Stride 4: <b>A, C, B, A, C, B, ...</b> Not coprime, GSP doesn't hold, same situation as stride = 2.
Stride 5: <b>A, C, C, C, B, B, ...</b> OK.
Stride 6: not coprime (doh).

(well, unfortunately 3 tasks with respective priorities of 1, 2 and 3 are a <b>terrible</b> example,  as their sum is 6, only 1 and 5 are coprime to 6, and the modular distance of both 1 and 5 to 6 is 1... But I chose them on purpose. Because they're simple enough to make the example clear, and also because this already proves that <i>there's no algorithm that will return a stride that displays this even-ness property in every possible case</i>, for the simple fact that such stride might not even exist.)

(And notice that actually it would suffice to test only half of the possible strides smaller than sum_of_priorities (let's call it SoP from now on), because since the strides are <i>modulo</i> SoP, the second half is just mirroring the first half.)

Anyway, just trust me on this one. Picking a good stride (when available) <b>does</b> ensue a distribution of tasks in time that is more evenly spaced, but even in the worst case, the correct proportions <i>will have to emerge, by construction</i>, after SoP scheduling rounds.

Now, what if we add a new task? Should we abandon the current strided traversal and start anew? Well, I still haven't decided what to do here. So far I considered starting anew but with a different stride, starting from a random position. Perhaps even taking the opposite direction (subtracting strides if they were being added in the previous scheduling round, and vice-versa). This should eventually converge to a fair distribution. Simply finishing the current strided traversal until it completes SoP scheduling rounds and ignoring new tasks until then would be <b>terrible</b> for responsiveness when the number of tasks grow. I believe using the rule of thumb I described above as a compromise should be reasonable enough, but I'm open for suggestions.

<br>
I hope that by now you're feeling that the pieces are finally starting to fall together. And they are! I'll try to cut the math abstractions to the minimum on the next blog post. It will be more algorithm-oriented. 

See you then! ;)
<br><br>

Notes:
<ol>
<li>
<a name="note1"></a>I'm aware that both lottery scheduling and stride scheduling <a href="http://wwwagss.informatik.uni-kl.de/Projekte/Squirrel/stride/thesis.html">were implemented in the Linux kernel</a> several times before as academic exercises. While there's no doubt that <a href="http://wwwagss.informatik.uni-kl.de/Projekte/Squirrel/stride/node5.html#SECTION00560100000000000000">fairness  and multimedia responses improved</a>, nobody (that I'm aware of) made an effort to reimplement these ideas on the 2.6 kernel series. Actually, I'm not being completely honest here. Those ideas did make a comeback in recent versions of the 2.6 Linux kernel series. I'll get to it in due time. Stay tuned!
</li>
<li>
<a name="note2"></a>Linux followers: does <a href="#stride">that</a> ring a bell? <i>*hint*</i>
</li>
<li>
<a name="note3"></a>OK, I have to admit that I haven't really looked <i>deep</i> into that, but I didn't find anything that suggested he himself considered discussing the complexity regarding the number of threads in the system of his implementation. But the fact is, since the most complete implementation made for the Linux kernel so far <a href="http://wwwagss.informatik.uni-kl.de/Projekte/Squirrel/stride/node4.html#SECTION00430000000000000000">used a tree</a>, you can already assume that there's at least the possibility of such complexity being O(lg n) where <i>n</i> is the number of threads. But rest assured, my solution is even better. Or so I guess ;)
</li>
</ol>

<br><br>
<blockquote>Don't miss the next chapter in the Scheduler saga! Tomorrow (hopefully), same bat time... Same <a href="/blog/meianoite">bat channel</a> (powered by <a href="/blog/1164/feed">RSS feeds</a>!)... <a href="/blog/meianoite">Right here</a>. Stay tuned.</blockquote>