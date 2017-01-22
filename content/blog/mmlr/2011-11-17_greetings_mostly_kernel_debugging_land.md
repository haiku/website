+++
type = "blog"
author = "mmlr"
title = "Greetings (mostly) from the Kernel (Debugging Land)"
date = "2011-11-17T17:00:07.000Z"
tags = ["contract work", "allocation tracking"]
+++

So what is going on right now in the time I spend on my Haiku contract? For the past two and a half weeks I've had my mind wrapped around various parts of the kernel. Things started out at BeGeistert and the coding sprint following it. The nice thing about the coding sprint is that you spend a lot of time with very knowledgeable people and can therefore tackle things that you would usually shy away from. In this case, Ingo Weinhold and I were seeing some random memory corruption problems and an apparent memory/pages leak. So we started investigating those by adding more debug functions into the relevant parts.

<!--more-->

<b>Debug Memory Initialization for the Slab</b>

The old (non-slab) heap implementation Haiku used for quite a while had gained a lot of debugging features over the time. When switching to the slab those were "lost" in a sense. Since the general stability was far better at that point it didn't really hurt to lose them though, so the pressure of adding them there again was quite low.

One of the debug features was initializing all allocated memory to some non 0 value (0xcc in our case). This ensures that code assuming 0 initialized memory trips up and crashes so that these bugs can be found and fixed. On the other side freed memory is reset to (0xdeadbeef), a value some might already be familiar with. When some code uses already freed memory that value usually pops up somewhere and pretty clearly indicates what happened. Bugs like these are normally well hidden, because if the memory isn't re-used by someone else in the meantime, accesses to it usually still work, leading to very hard to trace bugs where only certain timing of things trigger an actual crash or misbehaviour. By ensuring that freed memory is "invalidated" it becomes easier to spot such problems.

So these two things were the obvious first choice in trying to track down memory corruption. Indeed it already triggered at least once and lead to bug report #8123 where apparently an already freed kernel structure was freed again. I've got some leads as to where the actual problem might be, but I haven't been able to find a way to reproduce that error yet.

<b>Allocation Tracking</b>

Another thing that the old heap implementation was able to do, is tracking what allocations are currently active and who allocated them. This is immensely useful when you're seeing a memory leak that slowly (or not so slowly) eats up memory. As mentioned we also saw some increasing memory usage on a supposedly completely idle system.

We used a combination of the excellent kernel tracing mechanism and some helper structures to construct the same allocation tracking that was present on the old heap. The tracing mechanism already stores the team, thread and time of when the entry is created. Also there are trace objects available that allow to get a stack trace of where an entry was created. That means all the information we were looking for would already be present in the tracing entry we created, so basically we "only" needed to associate the entries with the actual allocation. Implementing this, and the corresponding functions to analyze that collected data got us a few very neat KDL commands that can now be used to easily see who's burning through memory without returning it.

We obviously applied that functionality to check up on what was going on. But well, it didn't actually reveal anything unusual. So the problem had to be somewhere else. If it wasn't in the heap, then it had to be a pages leak, meaning that raw page allocations were causing the memory usage to increase.

<b>Page Allocation Tracking</b>

With the slab allocation tracking just done it was pretty easy to apply the same to page allocations. So we did, the same tracing entry leveraging tracking infos were added to the page allocations. Also the analyzing function was pretty similar.

Before being able to make use of that page allocation tracking the coding sprint was sadly already over.

<b>Reporting Errors</b>

After getting home I continued analyzing the supposed leak using that mechanism and reviewing some code. During coding sprint there were a lot of other changes, and one of them concerned what is included in the "used pages" number, meaning the reported amount of "used memory" in the broader sense. Since by now the numbers were off by so much it became obvious that this couldn't really be a leak, it had to be some error in reporting the numbers.

So I started getting into the code and check what as really going on and what was supposed to happen. It turns out that the number of total pages is made up of quite a few different numbers, some overlapping each other. The change in question didn't take that into account, so some pages were accounted for twice resulting in inflated numbers for the used_pages count. Since this is a rather complex matter it took a while to fully grasp what each of the values really represented, but after understanding it it was rather easy to come up with a calculation that would add up the right numbers.

This change fixed the wrong reporting. While this might look like a purely cosmetical change at first ("so the numbers are a bit off, who cares?"), but it really is more than that. The same numbers are used internally to judge how critically the system is in need of freeing up resources to continue to function. So having wrong numbers there would eventually cause wrong decisions to be made.

<b>Diverse Bug Reports</b>

During all that time there's pretty much always a steady stream of bug reports being created and updated. So a relatively large chunk of time again was spent to get the relevant information out of these and trying to track down their causes.

Frustratingly I am yet unable to trigger any of these bugs locally, making it really hard for me to figure out the problems behind them. I've reviewed quite a bit of code to try and spot logic errors in the code, but it is not really an all that efficient approach. Due to the size and reach of some components it is nearly impossible to find all the places involved and keeping all the interactions in mind.

Faced with that situation I've also started to let some of my other computers run through stress tests to try and trigger edge cases (running out of memory, out of pages and/or address space), fixing a debug helper along the way. So far all these machines run through the tests just fine though. There's some potential for optimization, but that isn't really my concern for now.

Eventually I think a combination of code review leading to educated guesses and stressing the corresponding parts will lead to success, so I'm keeping on it.

<b>Outlook</b>

I've been asked for an outlook on what I'm going to work on and why I am getting "held up" with this kernel stuff right now. I've explained it in a recent email like this:

"Why am I working on it right now? Easy: with the coding 
sprint at BeGeistert I could dig into that area of the kernel with 
Ingo, who has a more intimate knowledge there. I'm continuing now 
because my mind is set into that mode and the knowledge is still fresh 
so that I can be more productive. Pushing that work out to a later 
point in time would essentially mean that I'd have to re-enter that 
mindset then, simply wasting time on refreshing knowledge that would 
still be here for free right now. I deemed that an inappropriate use of 
my contract time."

I realize that this is work that is very hard to see from the outside, often only indirectly leading to fixes and sometimes plain simply resulting in nothing (i.e. the problem is not in the suspected part of the code at all). Believe me that this is at least as frustrating to me as it is for people watching the progress of Haiku. But eventually this work will have to be done, and since I am in the fortunate situation of having the time to really dive into these things and keep at them, I do so.

What happened to the wireless situation? My first priority when starting my contract was clearly getting the wpa_supplicant going so that WPA/WPA2 encryption would work. This task is technically done now, meaning that the encryption and authentication works. The wpa_supplicant optional package is available and to my knowledge works fine (apart from some cases where the driver involved doesn't work, which is a driver issue though). I say technically complete because it isn't quite as user friendly as it eventually needs to be. Storing the password isn't yet implemented and the manual configuration of known networks is "unhandy" at best. I am fully aware of that and will return to that work relatively soon. I felt the situation to be usable enough to let it rest for the moment though.