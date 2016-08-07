+++
type = "blog"
author = "dewey_taylor"
title = "New Work on Affine Scheduler"
date = "2011-10-27T01:01:54.000Z"
tags = ["scheduler", "affinity", "hyperthreading"]
+++

When I first started working on the scheduler I didn't make a big deal about it, but when I did mention it I was quite surprised at the amount of interest there was in what I was doing. So much so that it was suggested that I start blogging about it, so here I am! I would like to take this time to introduce myself as well as the work that I am doing on the scheduler.
<!--break-->
<strong>Who Am I?</strong>
My name is Dewey Taylor, but those on IRC know me as Duggan. I have a BS in CS and I am an original BeOS user starting with R5, so I was somewhat of a late-comer. I followed the Haiku project (then OpenBeOS) since it's inception from a distance but joined the community-proper about 4 or 5 years ago. My major focus has been on third-party native application development, but it's not uncommon for me to delve into the Haiku trunk as well.

<strong>What Am I NOT Doing?</strong>
There are a couple things I would like to make clear before I go into the details about the scheduler. There is an existing affine scheduler in the trunk which I am only modifying. This scheduler is not even enabled by default, but if you apply a patch which I submit it will be. I'm also not implementing a different scheduling algorithm, but just adding functionality around it.

<strong>What I AM Doing!</strong>
The first thing I've been working on has been hyperthreading. I've already implemented a cpu map to provide an indirection layer to map a logical cpu id to a ready queue bound to a physical core; that was the easy part. The hard part is using the CPUID instruction and APIC IDs to determine the topology of the processor(s) on the system. This is still quite buggy and likely will be completely reworked soon.

After that comes affinities to bind a thread to a specific core. There are two different types of affinities that can be applied on two different levels. First there are soft affinities which simply means the system would prefer to run a given thread on a particular core, but it's able to move if necessary. Hard affinities mean the thread must operate on that core so long as it's physically possible. As far as levels, the first level is the per-thread level and the second being the team level. Ideally the system would give all threads for the same team a soft affinity on the same core since it is common for threads in a team to share some memory space. This would allow data to remain cached as threads change, increasing execution speed. Another modification on this topic include adding API calls to modify affinities. Soft affinities for threads already exists but without proper load balancing, you wouldn't know it.

So on to load balancing... With the simple smp scheduler Haiku currently uses, threads suffer from what I call "bouncing thread syndrome" which occurs as an idle cpu pulls threads from other cpus, meaning threads are constantly bouncing from one cpu to the next. Proper load balancing will allow teams and threads to stay put when a particular core isn't overloaded, be pulled from an overworked core, or being pushed to a less busy core.

One more thing I would like to implement would be the dynamic shutdown and restart of unneeded cores. For example: if in a dual core system, all threads can run on one core, then move all threads to one core and shut the other down. If the one core becomes overloaded (stays busy over some threshold of time) then that other core should be restarted to alleviate the load on the first core.

<strong>What I MIGHT Be Doing...</strong>
There are some additional ideas I've been toying with too, but these will come much later (if at all):

At present, the scheduling system uses one global scheduler lock which I think would be better off as one lock per ready queue. My understanding is this idea isn't feasible, but I'd like to look into it anyway.

I may convert the ready queues into trees instead of lists, but this isn't particularly high on my list.

I may convert the topology data into a tree, but again, this isn't very high on my list.

An OO wrapper class would be a nice touch once everything else is done.

<strong>Conclusion</strong>
Real life has a tendency to get in the way at times, and right now work on the scheduler is slow for just that reason. In a couple days it will speed back up again though and there will be more blog entries as well as patches as work is done. For patches, more information, and to follow progress check out ticket <a href="http://dev.haiku-os.org/ticket/1069">#1069</a>. I spend a reasonable amount of time in the official chatrooms on IRC so feel free to catch me there if you like!