+++
type = "blog"
title = "[GSoC 2023] Improving Icon-O-Matic Final Report"
author = "Zardshard"
date = "2023-08-18 11:21:50-04:00"
tags = ["haiku", "software", "icon-o-matic", "gsoc", "gsoc2023"]
+++

## What is Icon-O-Matic?

![Screenshot of Icon-O-Matic](/files/blog/zardshard/icon_o_matic.png)

There's a good chance that not everyone reading this article will know what Icon-O-Matic is, so I'll start by explaining what it is. Icon-O-Matic is a vector graphics editing program like Illustrator or Inkscape. It is specifically made to work with Haiku's custom HVIF vector graphics format. This format is similar to the SVG format, except optimized to be much, much smaller. The blog post ["500 Byte Images: The Haiku Vector Icon Format"](http://blog.leahhanson.us/post/recursecenter2016/haiku_icons.html) provides a more in-depth discussion for those interested.

If you want to try Icon-O-Matic yourself, you will need to first install the Haiku operating system. Afterwards, you can launch it from the applications menu.

## My goals

The goals of my project were rather broad: to add features, refactor code, and fix bugs. I had, therefore, a lot of leeway to do what interested me. My early plans were detailed in a blog post entitled ["[GSoC 2023] Plans for improving Icon-O-Matic"](https://www.haiku-os.org/blog/zardshard/2023-05-05_gsoc_2023_plans_for_improving_icon-o-matic/). They changed rather significantly over the course of the project.

## What I got done

Below is a list of the things I got done during GSOC. For those interested in seeing the full list, it can be seen [here](https://review.haiku-os.org/q/owner:0azrune6%2540zard.anonaddy.com+mergedbefore:2023-08-28). This list does not include commits made outside of GSOC.

### Fixed memory leaks

For those not familiar with it, a memory leak occurs when a program requests memory from the operating system and later forgets to tell the operating system that it's done with it. This leads to memory being wasted. In the worse-case scenario, the program eventually uses up all of the system's memory.

One of my GSoC project ideas was to make a program to detect memory leaks. I had decided not to go with that. Later, I discovered that Haiku had a memory leak detector built-in! I wrote [a blog post](https://www.haiku-os.org/blog/zardshard/2023-05-23_how_to_find_memory_leaks/) detailing how to use it so that others knew of its existence and how to use it. I was excited to use this memory leak detector on Icon-O-Matic, so, that was one of the first things I did.

And, indeed, I did find and fix many memory leaks. Some of these leaks were caused by system libraries. This means that some of the bugfixes helped every application leak less memory.

**Commits:**

* [Icon-O-Matic: Fix memory leak](https://git.haiku-os.org/haiku/commit/?id=943b5775f875e9f3f6bb8edc222289e02faa0ef9)
* [Tracker: Fix memory leak](https://git.haiku-os.org/haiku/commit/?id=0e86ca77e77224b270dc3dff905907940cc74ae6)
* [Tracker: Fix memory leak](https://git.haiku-os.org/haiku/commit/?id=338fedd65a5bc57f3ec35b9c0d48ab5d8b013bd3)

### Added reference images

![Screenshot of three reference images](/files/blog/zardshard/reference_images.png)

This is probably the most useful feature that I added. This allows you to create an image in another program such as Inkscape or Illustrator and then use Icon-O-Matic to trace it. This is useful since Icon-O-Matic is required to make HVIF files but doesn't have as many features as many other programs. This also gives Icon-O-Matic greater ability to specialize in making small HVIF files as opposed to being a general-purpose vector graphics program.

**Commits:**
* [Icon-O-Matic: Add reference images](https://git.haiku-os.org/haiku/commit/?id=098eaec6305ae804d3eb6c8e6c6aad790fb4cfb1)
* [Icon-O-Matic: Save alpha of reference images](https://git.haiku-os.org/haiku/commit/?id=4ed150bdc36d063144a3552305c5d77ecac88427) (bugfix)

### Added perspective transformations

![Screenshot of a grid being put into perspective](/files/blog/zardshard/perspective_transformer.png)

I believe this feature will be a lot less useful than reference images. Ironically, it also took quite a bit more time to implement than reference images. Implementing this feature also took the most math. I used quite a bit of linear algebra to figure out how to determine whether a perspective transformation was valid or not!

**Commits:**
* [agg: Pull in updated perspective transformation](https://review.haiku-os.org/c/haiku/+/6808) (unmerged as of writing)
* [Icon-O-Matic: Add perspective transformations](https://review.haiku-os.org/c/haiku/+/6801) (unmerged as of writing)
* [Fix multiple definitions linker error](https://sourceforge.net/p/agg/patches/6/) (upstreams some changes to the AGG library)

### Reduced repeated code

This shaved off 1,300 lines of code from Icon-O-Matic. This one is the only change that caused a regression, at least, as far as I'm aware ;)

**Commits:**

* [Icon-O-Matic: Generalize some classes](https://git.haiku-os.org/haiku/commit/?id=6427935280aaac0a1a4557bae55184708819560d)
* [libicon: Notify Shape on transformer addition/removal](https://git.haiku-os.org/haiku/commit/?id=c5abd6a796982af7cc456f832086da2e4a13ad83) (regression fix)

### Miscellaneous improvements

There are various miscellaneous improvements that I made to Icon-O-Matic along the way. Some are bugfixes. Others introduce some simple features. None of these took very much work.

**Commits:**

* [Icon-O-Matic: Remove unused function parameter](https://git.haiku-os.org/haiku/commit/?id=8ffe04780def2570c3806e6c18fa14a79fd105eb)
* [Icon-O-Matic: Remove unused dependency](https://git.haiku-os.org/haiku/commit/?id=16edf24a3c77400a81110adb8933f640bf210089)
* [Icon-O-Matic: Remove dead homebrew translation system](https://git.haiku-os.org/haiku/commit/?id=a75a222b35d17cd83bc75253f3cd8e24a6a911f4)
* [Icon-O-Matic: Make left sidebar lists resizable](https://git.haiku-os.org/haiku/commit/?id=c70aca1135bb1e1999db080457a40e9d36989582)
* [Icon-O-Matic: Fix window resizing bug](https://git.haiku-os.org/haiku/commit/?id=6da29a769f1e2afb5d98f0470b35497d7f3ef3ea)
* [Icon-O-Matic: Improve saving-related error messages](https://git.haiku-os.org/haiku/commit/?id=405c9dc3f27cf660facae5253303ea24aaaf382e)
* and various others

A full list can be seen [here](https://review.haiku-os.org/q/owner:0azrune6%2540zard.anonaddy.com+mergedbefore:2023-08-28).

## Conclusion

It's surprising how long some of these things took to do. My original project proposal for GSoC included time estimates. Unsurprisingly, my plans changed over the course of GSoC. By the end of GSoC, I had only done one of the things I had originally planned to do: adding reference images. I had estimated that adding them would take 1 week. I was aware that things tended to take longer than estimated so I made room in my estimates for that. Despite that, adding reference images actually took, depending on how you count, 2-3 weeks!

I also learned about the importance of communities surrounding open-source projects. These communities influence what happens on the project, give developers ideas and feedback, and find bugs. The developers can help other developers, give them tips, or, just as importantly, criticize their ideas. These communities are also a nice place for people to simply hang out and socialize.

Thanks to Google for hosting Google Summer of Code. Without you, I would not be here. Thanks also to my mentors, PulkoMandy and Humdinger, and to the broader community surrounding Haiku. You have given me advice, pointed out pitfalls, and given me many ideas.
