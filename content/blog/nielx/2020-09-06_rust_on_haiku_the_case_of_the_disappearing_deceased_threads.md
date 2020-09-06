+++
type = "blog"
title = "Rust on Haiku: the Case of the Disappearing Deceased Threads"
author = "nielx"
date = "2020-09-06 07:21:48+01:00"
tags = ["haiku", "software", "rust", "developer"]
+++

Summer! The time to slow down, relax, go to strange places, and do the projects that are long overdue. This summer I had the joy of spending my time in a lovely house near Lyon in France. In many ways the summer was like others, meaning there was plenty of wine and a lot of relaxing activities. At the same time, the Covid situation did give me a lot of reasons to scale back exploratory activities at the tourist hot spots, and instead focus on activities close to home. I decided to seize the opportunity and to see if I could dive into one of my long-standing pet peeves in the Haiku ecosystem.

For a long time I have been maintaining the build of the Rust compiler and development tools on Haiku. For this purpose, I maintain a separate tree with the Rust source, with some patches and specific build instructions. My ultimate end goal is to have Rust build on Haiku from the original source, without any specific patches or workarounds. Instead we are in the situation where we cannot build rust on Haiku itself (instead we need to cross-compile it), and we need a customization to be able to run the Rust compiler (`rustc`) and package manager (`cargo`) on Haiku. This summer my goal would be to find out the underlying issue, and fix it so that the patch will no longer be necessary in the future. Let's go!
<!--more-->

## The Issue: Disappearing Threads

The issue first appeared when trying to use `rustc` and `cargo` from Rust 1.21.1 to compile packages.  One of the tests I always do to see whether a generated Rust works, is to compile `cargo` itself. And the 1.21.0 version of cargo just failed. In particular, it failed with the following error: 

```
thread 'main' panicked at 'failed to join thread: No such process (os error -2147454963)', library/std/src/sys/unix/thread.rs:193:13
```

Looking at the [source](https://github.com/rust-lang/rust/blob/c3364780d2cfddfe329f62a3ec138fd4f9a60e27/library/std/src/sys/unix/thread.rs#L193), it seems to fail because of an error when the Rust library calls the `pthread_join()` function in Haiku's libraries. The entire method for `std::sys::unix::thread::Thread::join()`is:

```rust
pub fn join(self) {
    unsafe {
        let ret = libc::pthread_join(self.id, ptr::null_mut());
        mem::forget(self);
        assert!(ret == 0, "failed to join thread: {}", io::Error::from_raw_os_error(ret));
    }
}
```

It seems like the issue is that `pthread_join()` fails. The error code corresponds to `B_BAD_THREAD_ID`. This leads to the question: why does it fail? I mean, we spawned (or: created) the threads, so why would they disappear?

The initial impulse for determining what happened is to determine what has changed from the standard library code in Rust 1.20.0 to make it behave this way? Let's compare to the previous version of this function:

```rust
pub fn join(self) {
    unsafe {
        let ret = libc::pthread_join(self.id, ptr::null_mut());
        mem::forget(self);
        debug_assert_eq!(ret, 0);
    }
}
```

It is not that the previous version worked differently, but it is that the error was only checked if the library was built in debug mode. Apparently the developers were confident enough that their library implementation was sound, so that they put this check in their production code. And since the binaries of `cargo` and `rustc` that I distribute are built in production mode, this means that on Haiku this error suddenly surfaced! It is very likely that `pthread_join()` has always ended with errors, it is just the case that now this leads to an end in the execution of the program because of the unconditional `assert!`. 

In other words, the issue seems to be an interplay between the thing you are trying to do with `cargo`, Cargo's use of Rust's standard library, and the system.

## Intermezzo: Joining Threads

The issue seems to be in how `cargo` and/or the Rust standard library are using the threading system. As a quick catchup: threads are a technique for applications to execute code separately or independently from other parts of the program. It is often used to split up CPU intensive work, to take advantage of multiple cores. Rust uses the standardized [Posix Threads API](https://en.wikipedia.org/wiki/POSIX_Threads) (known as _pthreads_) to create and manage threads. Haiku has its own threading API, but it does support (a subset of) _pthreads_. 

When a developer spawns threads, they may or may not care about the outcome of the thread. Let's say we have a tool that processes a file on the file system, and compares it against something on the network, we may want to get the network file in a separate thread, so that we can continue processing the file while the (slower) network operation is underway. In that case, I would spawn a thread using `pthread_spawn()` (let's call it `network-thread`), continue with the processing of the file in the `main-thread`, and afterwards use the result to compare. That means that after I am done in the `main-thread` , I will use `pthread_join()` to join with the other thread. If the `network-thread` is already finished, the call will return and I know I can use the result. If the `network-thread` is still busy, the `main-thread` will be blocked on `pthread_join()` until it is finished. 

An alternative scenario is where a developer spawns a thread, but then does not care about its outcome. In that scenario they would call `pthread_detach()`, which tells the OS that the program does not care about the outcome and that it should not put any effort into tracking ended threads.

In the way the Rust standard library uses the threads, they are not detached in any way. This means that `pthread_join()` should work! In other words, the issue seems to be that the system is forgetting about certain threads that were created.

## Reproducing the Problem in Cargo

The first step to fixing the issue is to find a way to reproduce it, preferably _reliably_ and _consistently_. For me, _reliably_ means being able to reproduce the problem using a set of predefined steps. Reproducing it _consistently_ means finding a fixed list of steps that will trigger the issue. 

The first step then, was to create a build of Rust and its tools without the workaround, so that the error could occur. I used this custom build to then reproduce the issue.

On the face of it, the issue was not that easy to catch. For example, it did not happen on every rust crate that you were trying to build. Some crates, like `socket2` and `libgit2-sys` would just succeed. Building `cargo` itself would trigger the issue, but only if it would build from scratch. That means that if I build the crate, and it fails with the error, re-running `cargo` would succeed. It would only fail again after cleaning out build artifacts.

In order to find out more about what exactly leads to the failure, I decided to rerun the command with the `RUST_BACKTRACE=full` environment variable, in order to use Rust's internal stack trace mechanism. That lead to the following result:

![Backtrace from Rust](/files/blog/nielx/20200906-rust-backtrace.png)

Unfortunately, it is not very useful and has been broken [for a while](https://github.com/nielx/rust/issues/2). Let's see if our friend Debugger can help us get a stack trace. 

![Backtrace from Debugger](/files/blog/nielx/20200906-debugger-backtrace.png)

This gives us a more useful stack trace. The issue seems to be in threads that were created (and then joined) by the [jobserver crate](https://crates.io/crates/jobserver). This crate implements a method pioneered by `make` to allow   a ["form of parallelism limiting across process boundaries"](https://docs.rs/jobserver/0.1.21/jobserver/). I added more debug output to the code, and I found that for each crate that cargo has to build, it spawns a helper thread. Then at the end of the build process, `cargo` would try to join all the helper threads, failing on the first helper thread that was joined.

## Writing a Test Case

Now that we sort of have the rough outline, it would be helpful to narrow down the issue and to try to write a manual test that consistently and reliably fails in the same way. The reason is that it is reasonably easy to reproduce the issue with `cargo`, but that application itself does a lot of complex operations that obfuscate the issue at hand and might even make you go down rabbit holes. 

In the initial simplest version we just spawn one thread and join it in later. This should not fail (applications on Haiku spawn threads all the time so any issues with this should be apparent. The source:

```rust
use std::thread;

fn main() {
    println!("Hello, world!");
    let builder = thread::Builder::new();
    let handler = builder.spawn(|| {
    	println!("Hello, threaded world!");
    }).unwrap();
    
    handler.join().unwrap();
}
```

Let's run this 10,000 times to see if it breaks.

```bash
for i in `seq 10000`; do pthread_test ; done
```

Even running it a multiple of 10,000 times does not break. So let's see what happens if we spawn multiple threads within the same team. 

I created a second version and I made some changes:

* I create 57 threads, to emulate the behavior of cargo building cargo.
* I run the threads for a little while (500 miliseconds).
* I wait for all the threads to finish, before joining them. While analyzing the cargo case, I found the issue only occurred with threads that already ended.

```rust
use std::thread;
use std::time::Duration;

const NUM_THREADS: usize = 57;

fn main() {
    println!("Generating {} threads!", NUM_THREADS);
    let mut handlers: Vec<thread::JoinHandle<_>> = Vec::new();
    for _ in 0..NUM_THREADS {
		let builder = thread::Builder::new();
		let handler = builder.spawn(|| {
			let timeout = Duration::from_millis(500);
			println!("Hello, threaded world! Timeout: {} ms", 500);
			thread::sleep(timeout);
    	}).unwrap();
    	handlers.push(handler);
    }

	let timeout = Duration::from_secs(60);
	thread::sleep(timeout);
	println!("Waited for threads to finish");

    for handler in handlers {
    	handler.join();
    }
}
```

On a Rust build with the workaround, this worked fine, but the issue did occur in the custom unpatched Rust build!  That's good, it seems like we are on to something. 

## Down in the kernel

The final part of our summer trip takes us into the depths of the kernel. Threads are created and maintained by the kernel. The `pthread_create()` ([source](https://github.com/haiku/haiku/blob/603367cf7e5d55b5d065b368b6d5f83b88db903f/src/system/libroot/posix/pthread/pthread.cpp#L147)) and `pthread_join()`([source](https://github.com/haiku/haiku/blob/603367cf7e5d55b5d065b368b6d5f83b88db903f/src/system/libroot/posix/pthread/pthread.cpp#L199)) functions are deferring to the kernel to do the heavy work. Our issue is in the `pthread_join()` method, which eventually ends up in the kernel's `wait_for_thread_etc()`([source](https://github.com/haiku/haiku/blob/603367cf7e5d55b5d065b368b6d5f83b88db903f/src/system/kernel/thread.cpp#L2453)) function, which does two things:

1. Check if the thread is currently running.
2. Check if the thread is on a _dead thread list_ for the team that is calling `pthread_join()`. ([source](https://github.com/haiku/haiku/blob/603367cf7e5d55b5d065b368b6d5f83b88db903f/src/system/kernel/thread.cpp#L2493))

If the thread cannot be found on either of those lists, then the error will be `B_BAD_THREAD_ID`. And that's the familiar error with which this all started. Now from debugging `cargo`,  I knew that the threads that we were joining were no longer alive, so it is worth investigating how threads end up on this _dead list_. There is actually a kernel function named `thread_exit()`([source](https://github.com/haiku/haiku/blob/e65c8deae2bc8c8c9cd9285794ef926177bb9e8c/src/system/kernel/thread.cpp#L1945)) that does the cleanup when a thread ends, including adding things to the _dead list_. 

```c++
if (threadDeathEntry != NULL
	&& list_is_empty(&thread->exit.waiters)) {
	threadDeathEntry->thread = thread->id;
	threadDeathEntry->status = thread->exit.status;

    // add entry -- remove an old one, if we hit the limit
	list_add_item(&team->dead_threads, threadDeathEntry);
	team->dead_threads_count++;
	threadDeathEntry = NULL;

	if (team->dead_threads_count > MAX_DEAD_THREADS) {
		threadDeathEntry
			= (thread_death_entry*)list_remove_head_item(
				&team->dead_threads);
		team->dead_threads_count--;
	}
}
```

[Source.](https://github.com/haiku/haiku/blob/e65c8deae2bc8c8c9cd9285794ef926177bb9e8c/src/system/kernel/thread.cpp#L2137)

Now this is where things get interesting. My eye immediately was drawn to this `MAX_DEAD_THREADS`, because if the number of dead threads in a team would be higher than this number, a thread would be thrown out of the _dead list_ meaning that `pthread_join()` would no longer be able to find it! The constant itself could be found in the private header [`thread_types.h`](https://github.com/haiku/haiku/blob/13beda00d3b2f67f45d9427396b9785145d07fb6/headers/private/kernel/thread_types.h#L99):

```c++
#define MAX_DEAD_THREADS	32
	// this is a soft limit for the number of thread death entries in a team
```

After seeing this line, a long and loud 'Gotcha!' could be heard over the countryside in the Rhône-et-Loire province. Changing the test to lower the number of threads to 32 no longer created an error, and after I tweaked the Haiku kernel to allow for a higher limit of dead threads, all the previously failing tests and compiling Cargo worked!

## Finalizing the Solution

The final step of my summer bug hunt was to get the actual solution in the Haiku repository. After a [short discussion](https://www.freelists.org/post/haiku-development/Kernel-questions-joining-threads-and-the-limited-death-list) on the mailing list, I proposed a [change](https://review.haiku-os.org/c/haiku/+/3178) which was accepted after some tweaks. The Haiku kernel now no longer has a limit on the number of dead threads. There is an implicit trade-off here: the previous version uses a soft limit to impact the potential misuse of a developer that creates a lot of threads, but that never cleans it up. After discussing the downside to this, we decided that there are plenty of other ways to break a user's system, and misusing or abusing the threading system is very low down the list of things that might break a system. 

The fix has landed in [hrev54540](https://git.haiku-os.org/haiku/commit/?id=331889d067f9a4c6984a8e34e55e73915e711754), meaning that every Haiku build after that revision, the Rust standard library will no longer need the workaround. Having said that, the binaries I am building will probably keep the workaround until Haiku Beta 3 is released.

And with that, the summer is over!

## Things along the way

Some final notes, as one might wonder why it took me two weeks to actually find and fix the issue. During work I ran into a few mishaps along the way, that I patched or sent in patches for:

* With the Rust 1.47.0 development code, cross compiling rustc seemed to fail suddenly. I asked for [some help](https://internals.rust-lang.org/t/solved-cross-compiling-rustc-from-bootstrap-broken-in-current-master-1-47-0/12902?u=nielx), and it turns out that this is a change in the build system and tweaking the command line options fix the issue, but [discussion is ongoing](https://github.com/rust-lang/rust/issues/76333) on whether this actually is a bug/regression in the Rust build system.

* Also in Rust 1.47.0, the developers decided to enable zlib for LLVM. This means that the Rust build should link to `libz.so`. There's a [patch merged](https://github.com/rust-lang/rust/pull/75655) that fixes this.

* On one of the side roads I took when trying to figure out how to reproduce it, I ran into the issue that the [net2 crate](https://crates.io/crates/net2) is still broken. While the crate is deprecated, it is still relied on by a lot of crates. I created a new [pull request](https://github.com/deprecrated/net2-rs/pull/103) that will hopefully make it in a future maintenance release.

* Also I noted that Debugger support for Rust is lacking. The main issues are that (1) it does not seem to be able to map the symbols to files, even if the binary has the debug support, (2) for templated functions that are instanced for a specific type, Debugger gets confused on where the source is located and (3) Debugger does not find the main function. I will submit patches for (1) soon.
