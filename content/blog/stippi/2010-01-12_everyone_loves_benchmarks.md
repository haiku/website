+++
type = "blog"
author = "stippi"
title = "Everyone loves benchmarks"
date = "2010-01-12T15:23:47.000Z"
tags = ["benchmark", "hostplatform", "performance"]
+++

<p>
In these exciting times, during which Ingo Weinhold is making great progress with some performance optimizations in the Haiku kernel, I felt this strong urge to conduct some benchmark results, even if that caused me great deal of pain in setting up all the test platforms! The results are quite interesting, even though I didn't manage to test all possible combinations of host platforms and file systems.
</p>
<!--more-->
<p>
One thing we Haiku developers do all the time is building Haiku, so naturally this is one of the most interesting benchmarks for us. But it is also an informative system level benchmark. It gives an impression about various kernel related tasks such as the efficiency of locking primitives, concurrency in the kernel, task scheduling across multiple CPUs, forking and launching processes and to some degree file system performance and caching. During a Haiku build, the master build tool "jam" will repeatedly fork itself to launch build tools such as GCC, the linker, mimeset and various other useful command line programs. The jam address space will grow to about half a gigabyte of memory after having parsed all Jamfiles in the tree and cloning this address space when jam forks the various subprocesses to build individual targets puts a lot of stress on the kernel and its low level system services. Other operating system aspects such as the graphical user interface have very little influence in the outcome of the benchmark, only a badly implemented Terminal with slow text rendering and scrolling would be able to have any impact, but that should not be an issue with any platform I benchmarked.
</p>

<p>
Obviously I wanted to test all operating systems on the same hardware, yet it is easy to forget some minor but important details which can give an unfair advantage to one or more of the tested systems. Since I was planning to do some partition shuffling anyway, I could eliminate one important detail, which is <i>where</i> on the hard drive the source code and generated files are located. The testing hard drive was a 150 GB Western Digital VelociRaptor. This is a particularly fast drive (4,5 ms average seek latency), but streaming performance actually depends a lot on where on the drive data is being written or read. For all the tests, I used the same partition at the beginning of the drive. The rest of the hardware specs read as follows:
</p>

<ul>
<li>ASUS P5Q (Intel P45 chipset) with JMicron SATA controller in AHCI mode</li>
<li>Core2Duo E4300 CPU at 1.8 GHz</li>
<li>2x 1 Gig of DDR2 RAM at 800 MHz</li>
<li>NVidia Geforce 7200 Graphics board, native drivers on all tested platforms</li>
</ul>


<h3>Tested platforms</h3>

<p>
I decided to use the systems which are most frequently used as Haiku build host platforms. This included Linux in the form of openSUSE 11.2, FreeBSD 8.0, OpenSolaris 2009.06, Haiku r35024 and ZETA 1.2. ZETA is not actually used frequently for this purpose anymore, but nevertheless it is very interesting to compare the system performance of ZETA and Haiku, since Haiku is expected to live up to the BeOS heritage, which is supposedly even more advanced in the form of ZETA. Sadly, I don't have a system anymore which runs BeOS R5. Even for running ZETA, I have to put my SATA controller into IDE compatibility mode. So I couldn't detect if perhaps ZETA is actually slower than BeOS R5. From all my experience running BeOS R5 for several years and later ZETA as my main operating systems, I highly doubt that this would be the case.
</p>


<h3>File systems</h3>

<p>
For Linux I had initialized the partition with ReiserFS 3.6, since that is supposedly still the fastest file system for compiling Haiku. It is also the only Linux file system that offers xattr support well enough to be usable by the Haiku build process to store the many custom file attributes. The FreeBSD system was using the same partition as UFS2, which is the only other non-BeOS file system with adequate file attribute support. OpenSolaris ZFS would also support xattr, but our build system has no support for xattr on OpenSolaris at this time. From reading one benchmark that compared ZFS against the older UFS on Solaris, specifically at the task of compiling software, and which favored ZFS a lot, I concluded that repeating the benchmark on OpenSolaris with UFS would be a waste of time. Ext4 xattr support is inadequate for building Haiku, since there are limitations on the maximum attribute size. Even though I tried to repeat the benchmark on openSUSE with Ext4, the build was running out of disk space eventually, even after I removed the build tools source code. For Haiku and ZETA, I was using the same exact source tree on the said partition which has been initialized as BFS volume without indexes. The attribute indexes are said to have a bad impact on performance, since the indexing is built into the file system itself, such that file name and other indexes are constantly being updated during the build process.
</p>

<p>
Creating a BFS partition without index will make it possible to compare the raw file system design against the other systems, even though it is only one part of the whole benchmark and cannot be measured individually with this setup. Still, the Linux, FreeBSD and from what I can tell OpenSolaris platform don't do attribute indexing during the build, so the comparison is more fair this way.
</p>

<h3>Haiku build configuration</h3>

<p>
To avoid any trouble with ZETA being an outdated build host platform, I used quite an old Haiku source tree, revision 28969. Since that revision of the source tree does not support the other host platforms anymore, I had to compare ZETA and Haiku individually, while I used a newer source revision (r34844) to compare Haiku, Linux, FreeBSD and OpenSolaris. The compiler being used was always GCC 2.95.3, which is the same version across all platforms since it is built as a cross-compiler from the Haiku repository itself. The respective system compiler on OpenSolaris, Linux and FreeBSD are out of the equation this way, although they are used to compile some build tools that are supposed to run on the host platform. The impact of using different compiler versions for these few build tools should be minimal. Slightly unfair in favor of Linux, OpenSolaris and FreeBSD is the configuration of these tools such as mimeset, keymap, xres and so on, which use the Be API and link against libbe. On Linux, FreeBSD and OpenSolaris, these tools link against a minimal "fake" libbe built for the host platform which contains the bare minimum libbe functionality needed by these tools. On Haiku and ZETA, the real libbe is used and each invocation of any such build tool will have to run through static initialization code in the library which is not the case on the other build hosts. Other than that, I am building the "haiku-image" target using two jobs without any UserBuildConfig customizations.
</p>

<h3>On to the numbers</h3>

<p>
When invoked for the first time, jam will create a bunch of cache files which will speed up later invocations. After each run, I invoked rm -rf on the "objects" folder inside the "generated" folder and also removed the haiku-image file. Then I rebooted the respective system, launched a Terminal which I configured to be 134 by 24 chars in size and ran the build leaving the machine completely alone. This cycle was repeated more then once and I took the best out of all results:
</p>

<pre>
$ time jam -q -j2 haiku-image

FreeBSD 8.0:
real	11m53.918s
user	17m11.611s
sys	2m39.864s
(713.9 seconds)

Linux 2.6.31:
real	13m32.431s
user	17m10.099s
sys	2m49.717s
(812.4 seconds)

OpenSolaris 2009.06:
real	14m20.792s
user	18m36.871s
sys	5m39.549s
(860.8 seconds)

Haiku r35024:
real	17m18.436s
user	27m22.108s
sys	5m0.447s
(1038.4 seconds)
</pre>

<p>
Comparing Haiku r35024 and ZETA 1.2 (compiling r28969):
</p>

<pre>
ZETA 1.2 (with StatCacheServer running to accelerate jam file lookup):
real	86m54.680s
user	22m8.017s
sys	80m48.841s
(5214.7 seconds)

Haiku r35024:
real	13m0.474s
user	20m30.814s
sys	3m36.103s
(780.5 seconds)
</pre>

<h3>Conclusion</h3>

<p>
As you can see, FreeBSD 8.0 kicks butt in this particular benchmark. The concurrency in that kernel on a 2-way SMP system is the most optimized out of all these systems. It beats Linux by a factor of 1.14 and OpenSolaris by a factor 1.21. Seems like the FreeBSD guys have done a good job at eliminating their giant kernel lock effectively.
</p>

<p>
What is also noteworthy is that Ingo managed to bring Haiku up to speed. As expected, it is still lagging behind the other guys: 1.45 times slower than FreeBSD, 1.28 times slower than Linux and 1.21 times slower than OpenSolaris. At least in this particular benchmark. I still find that quite exciting, considering how advanced and well optimized these other systems are. Large corporations are putting a lot of money into making these platforms fast. What also sticks out is that Haiku is seriously kicking ZETA's butt. Wow, 6.68 times faster? ZETA's app_server may still be a lot snappier than Haiku's, but boy the Haiku kernel is running circles around the ZETA one! Also, in previous discussions, I remember it being mentioned often that for compiling software, the BFS design is quite a bottleneck. But to me it seems that this cannot be the case. At least it cannot be the main reason that ZETA is performing so badly. From what I learned in various IRC channels and reading other benchmarks, the file system is probably not a very important factor in this particular test. The optimizations that Ingo did in the Haiku kernel hint that reducing waiting times on important kernel locks (contention) as well as efficient algorithms in the kernel have the greatest impact. The work that Ingo and Axel have put into kernel tracing and graphical analysis tools is paying off. And of course it helps that Ingo knows what he is doing when he applies optimizations. From talking to him it seems there are still a lot of opportunities to optimize stuff in the kernel and further reduce lock contention. Ingo is using an 8 core machine for development now, and since Haiku's kernel does not scale as well as the other platforms, the numbers are different on an 8 core machine versus only 2 cores, putting Haiku further behind the other systems. I am excited about the work Ingo is doing and it will be interesting to watch how Haiku is steadily catching up in becoming a very viable host platform for compiling itself.
</p>