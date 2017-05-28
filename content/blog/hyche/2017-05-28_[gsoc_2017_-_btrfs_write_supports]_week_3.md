+++
type = "blog"
title = "[GSoC 2017 - BTRFS Write Supports] Week #3"
author = "HyChe"
date = "2017-05-28 18:24:27+07:00"
tags = ["haiku", "gsoc", "gsoc2017", "filesystem", "btrfs", "driver"]
+++

<p>Hi everyone,</p>

<p>It's me again, this is my third report of my project about what I have done in this week. There is no coding, just reading and reading a lot. Now, I am confident to say that I can fully understand all the things in Btrfs codebase. I lurked a little around Linux's source and mailing list for Btrfs, but it didn't help much since the source is large, complicated and I don't know where to start to read, so I decide to implement Btrfs in my own way and back to read if encounter problems. I have tried to produce some bugs by making many directories and files with different size, and then see that can Haiku's Btrfs handle (cd and ls) it, lucky that it worked well otherwise I had works to do.</p>

<p>Also in this week, PulkoMandy help me to separate command results from fs_shell and tracing log because these are all redirected to stdout. I know how to read raw data from a disk device or file in Linux, with the help of PulkoMandy and axeld, this make debugging is easier.</p>

<h2>Next week works</h2>

<p>Next week is a first week of the coding period which mean I will follow what I listed in the proposal. But since I finished the first week works (set up fs_shell) in the previous week, so I will do the second week works, there are: Adding new structures btrfs_path and cache_extent. Those structures are helpful for manipulating trees and writing data. I may change, add or remove some things during the process because I lacked of understanding at the time of preparing the proposal, if there are any changes I will update it in weekly report.</p>

<p>Thanks for reading, see again next week.</p>
