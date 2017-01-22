+++
type = "blog"
author = "zhuowei"
title = "[GSoc 2014] Port of the Golang programming language: midterm report"
date = "2014-07-02T06:49:50.000Z"
tags = []
+++

Hello,

I'm currently working on a Golang port for Haiku as part of Google Summer of Code. Since the last blog post, there has been some progress: simple Golang programs can now be compiled and run.

<!--more-->

<h3>Status of the port:</h3>

What works:
 - Hello world
 - Basic input/output, file system functions
 - Some threading support

What doesn't work:
 - The garbage collector
 - The Go tool (for building the rest of the runtime)
 - spawning new processes
 - checking for stack overflows
 - handling signals
 - getting system time
 - pipes
 - any part of the runtime that needs the Go tool or Cgo
 - Other architectures (currently only 32-bit Haiku is supported)

What is kludged and needs to be fixed:
 - TLS storage of the M and G structures
 - semaphores used in the scheduler: sleeping for a certain time isn't implemented yet
 - address space reservation for the Golang heap

<h3>Porting tasks done for the port:</h3>

Here's a summary of the porting process so far. This is covered in (slightly) more detail on the haiku-gsoc mailing list.

<h4>Bonding period:</h4>

The first task I did was to get the runtime package to compile. The runtime package is the low-level code that implements Golang essentials, such as allocating memory and printing crash logs. To do so, it uses files specific to each OS. In the initial attempt, I simply copied the relevant files from Linux and commented out code until everything compiled.

Then, I worked on making the Golang toolchain generate an executable that can be loaded. Golang has its own toolchain and linker, but supports using an external linker to generate executables. I chose to use the external linker: executables linked by Golang's built-in linker won't load due to the ASLR applied by Haiku; external linking emits the required relocations.

Finally, I looked into implementing TLS support for the Golang runtime. Golang's scheduler uses two TLS variables, the m (which holds thread specific data) and the g (which holds Goroutine-specific data). Since a lot of Golang's functionality, such as its lightweight coroutines and its split stack, depends on these variables, this was the first thing that needed to be implemented. The correct way to get a TLS slot on Haiku is to ask the C library to allocate one, but to simplify things, I kludged, and hardcoded TLS slot 5 for these variables. (Later, this failed when Haiku itself started using TLS slot 5: I switched to slot 63, the last slot, but this is still hardcoded into the executable, and thus may break later on when Haiku starts to use more slots)

I also decided to take a look at the other Golang implementation, GCCGo. My initial attempt failed, as my attempts at compiling GCCGo using Haikuporter failed with a "waiting for build package" error.

<h4>First quarter term:</h4>

My mentor advised me to move the work that he and I have done to the Golang 1.3 codebase, as, at the time, Golang 1.3 was nearing release. I agreed, as Golang 1.3 includes support for Solaris, which also uses calls to libc to implement the runtime because, like Haiku, its syscalls were not considered stable. This was a good choice: as it turns out, most of the Haiku port was directly adapted from the Solaris code.

I replaced most of the files copy-pasted from the Linux port with the equivalent files from the Solaris port. At this point, I tried to get the adapted Solaris runtime to work, but I could not load function pointers from libroot - I always get four strange bytes instead of the address I wanted. After inspecting the memory in the debugger and disassembling the instruction, I could not find any error; the instruction was of the form

`mov 0x123456, %eax`

where 0x123456 was the address of the write() function in libroot. It looked fine to me: an instruction to load 0x123456 into eax - so why did it fail? I assumed that the reference Golang toolchain was incapable of generating executables for Haiku, and turned my attention to GCCGo again.

The remaining part of the quarter term was spent getting GCCGo, the other Golang toolchain, to partially work. GCCGo is a lot more portable than the reference Golang toolchain: it uses GCC to generate code, and calls the C runtime methods (like the Solaris port). By this time, a bug in haikuporter was fixed, and I was able to use haikuporter to build GCC with GCCGo support turned on, which meant I could start working on the GCCGo runtime.

GCCGo requires the methods getcontext() and setcontext() to save and restore the state of the currently executing method in its scheduler. These methods were not implemented in Haiku (they were removed from POSIX a while ago), so I borrowed getcontext() from libunwind (of all places), and, after reading the setcontext() implementation from Mac OS X, I implemented a simple setcontext(). 

GCCGo also as part of its build process generates a go definitions file from the operating system's headers. The generation code shipped with the latest GCCGo fails on Haiku's headers, so I used an older generator that was posted to GCCGo's mailing list, which runs the full GCC preprocessor against the system headers. (The generated file came handy when I needed a list of error codes for the reference toolchain: I could just copy and paste from this file)

Finally, GCCGo's garbage collector was crashing, so I disabled that. At that point, we did't need that much ram anyways.

After getting the GCCGo runtime working, I managed to compile and run a Hello World and the parallel processing prime sieve demo program with GCCGo. However, GCCGo took too long to compile, and only supported up to Go 1.1.1. Moreover, my runtime was kludge-filled: I had used a runtime for Go 1.2 and shoehorned it to compile for Go 1.1.1. So after discussion on the mailing list, work on GCCGo was ended.

<h4>Second quarter term:</h4>

At this point, I had tried porting two toolchains, and both ended in failure. So I gave up - until my mentor adviced me to try again and to ask for help when stuck. As it turns out, that was good advice - I decided to give one more look at the strange bytes error from the reference toolchain.

I wrote a program to reproduce the error outside of the Go runtime. Then I noticed that the "junk" bytes being moved changes with different build options, and it hit me: the "junk" bytes were the first four bytes of the method's code!

It turns out that the Golang toolchain, at least on Haiku, instead of loading the address of the function, loaded the first four bytes of the function. And since I am more familiar with NASM syntax instead of the AT&T syntax used by Objdump and GCC, I assumed that the mov instruction was loading the address, when it was loading the contents at the address. So I worked around this by adding an & in front of every libc method imported to take the address instead. (I have no idea why I needed to do this - the Solaris port did not need this. Still, it let me continue porting.)

After making this change, the runtime crashed... in runtime.exit?! That's right: the runtime managed to run past the main.main method, the entry point of a Go program. So of course I had to try running a simple Golang program; input/output wasn't working, but the panic() method, used to throw an error, was, so I was able to run my first Golang program using the reference toolchain.

From there, the Solaris syscall package was adapted for Haiku, and input/output started working. Then, I looked for files marked to be built for Unix-like OSes, added Haiku to the list, and then the Go utility built.

The Go utility is a command line tool, written in Golang itself, to build Golang packages with dependency resolution. It is used to compile the Go standard library, needed to compile most Go programs. The authors of the Solaris port considers it a good test case for the runtime, since it uses input/output, subprocesses, concurrency, and even a bit of networking. So getting this utility to run became my next goal for the port.

First of all, the garbage collector (again) crashed, so I disabled that, since the Go tool doesn't use that much RAM anyways.

The Go utility needed to list directories to find source files to build. On most OSes, this is done by calling the lower level method getdents() with a file descriptor. On Haiku, though, there is no getdents method in libroot, and anyways the file descriptor used for a directory needs to be opened in a different way. I decided to use the standard readdir() method instead, and after prototyping it on Linux with Cgo, I adapted the code to work on Haiku. 

The Go utility also needed to make temporary directories. The MkdirAll method was failing, complaining that the directory exists when it clearly didn't. As it turned out, that was because I never read the value of errno, so when Go stat()s the path, it receives no error, and thus concludes the path already exists. A quick copy-and-paste of the code from the Solaris port and errno was read from C code on every command. Another copy-and-paste from the GCCGo generated definitions file gave me the list of errnos for Haiku.

Most importantly, the Go utility needs to spawn new processes to compile the source files. This is the task I'm currently working on. Golang reserves a large 769MB area for heap space; Haiku refuses to fork() the process and gives an out of memory error. Pulkomandy explained that this was because Haiku doesn't like to overcommit memory, meaning that it doesn't want to allocate more memory than the system actually has, even if that memory would never be used. I looked into spawning the process using the Images api in the Kernel Kit instead of fork() and exec(), but unfortunately the images API doesn't seem to allow me to redirect standard input and output. So I'm now looking into the kern_reserve_address_range call as an alternative to the mmap() call that Golang currently uses to reserve address space.

<h3>Future Plans</h3>

The short term goal is to get the go tool functioning to the point of building the rest of the standard library. Doing so will build the cgo utility, which is used to generate definition files, making the porting process easier: I would no longer have to copy-paste definitions from my GCCGo port.

The immediate next step, then, is to get process spawning working, and fix the heap allocation problem. time.Sleep also needs to be implemented, I think, since the Go tool uses that.

The goal after that is to fix some of the things that don't work. Some are more simple (the stack check only needs a call to get_thread_info to find the stack size) and some are more difficult (I need to understand how the garbage collector works before I can figure out why it is broken).

Those are the goals for the third quarter-term. If I can accomplish these tasks, then I should be able to compile both cgo (which makes porting easier) and the various Golang unit tests (which makes verification of the runtime easier). At that point, the code would be functional enough that I would be able to cleanup the code and remove the various kludges.

<h3>Acknowledgements</h3>

Thanks to Aram Hăvărneanu for his work on the Solaris port of Golang, which this port is heavily based on, and thanks to Elias Naur for answering my questions about shared libraries and Golang. Thanks to everyone on the haiku-gsoc mailing list for advice and encouragement. Most importantly, thanks to my mentor, Bruno Albuquerque, for helping me in the project and for getting me back on track.