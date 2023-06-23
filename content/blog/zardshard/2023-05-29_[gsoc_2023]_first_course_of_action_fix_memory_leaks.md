+++
type = "blog"
title = "[GSoC 2023] First course of action: fix memory leaks"
author = "Zardshard"
date = "2023-05-29 09:03:02-04:00"
tags = ["haiku", "software", "icon-o-matic", "gsoc", "gsoc2023"]
+++

The coding period has started today! In the [last blog post related to GSOC](/blog/zardshard/2023-05-05_gsoc_2023_plans_for_improving_icon-o-matic/), I said "Here are the plans that I currently have. As with all plans, they are subject to change." They did indeed change since I found a tool to find memory leaks.

Before I was accepted into GSOC, I had been thinking about porting AddressSanitizer to Haiku to find memory leaks. I decided against it. During the community bonding period, I found a file called leak_analyser.sh, which was made for finding memory leaks, exactly like AddressSanitizer! It was a good thing I had decided against porting AddressSanitizer to Haiku. I now want to work on getting rid of the memory leaks from Icon-O-Matic.

I've already made some progress in removing the memory leaks. When I started, simply opening and closing Icon-O-Matic yielded 75 memory leaks, as reported by leak_analyser.sh. I looked at the leaks reported and fixed a relatively simple one to see if the leak analyzer actually worked. This brought down the leak count by 2. This is where the master branch stands. I have one uncommitted change that brings the leak count down by another 42. This change applies to the Tracker kit, so more applications than Icon-O-Matic will have their memory leak counts reduced.

I estimate that getting rid of the rest of the leaks in Icon-O-Matic will take 4 or maybe even 6 weeks. I've been told that projects will tend to take longer than you expect them to. Thus, I made my estimate rather large to account for this. There are several factors influencing this estimate. One is that I've found finding a single memory leak can be rather hard. I'm currently in the middle of fixing one rather evasive memory leak. Another factor is that, although I have brought the memory leak down from 75 to 31 with two changes, things are unlikely to continue at this rate. I expect that most of the memory leak count will decrement slower in the future. Finally, I have no idea how many memory leaks that I will find from actually using the application as opposed to simply opening and closing it. Thus, I estimate 4 to 6 weeks to fix the memory leaks. Hopefully it turns out that I need less time than that!
