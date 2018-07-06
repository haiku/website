+++
type = "blog"
title = "The State of Rust on Haiku - July 2018"
author = "nielx"
date = "2018-07-05 07:31:51+02:00"
tags = ["haiku", "rust", "developer"]
+++

The Rust programming language belongs to the category of modern programming languages that aim to provide a reliable
and safe alternative to C and C++. In the past few years, few people have been working on getting the compiler, and
the other build tools to our platform. And in fact, since Rust 1.0 there have been reasonably working binary packages
for building Rust projects on Haiku. 

With the recent addition of Rust 1.27.0 in the HaikuPorts repository, I thought it would be good to do a short, public
write-up of the current state of Rust on Haiku, and some insight into the future.

## Current state of Rust

Immediately available through HaikuPorts is 
[the complete Rust package](https://depot.haiku-os.org/#!/?bcguid=bc1-LMVU&repos=haikuports&arch=x86_gcc2&srchexpr=rust_bin&viewcrttyp=FEATURED)
for version 1.27.0. This is the version that has been released the 21st of June. The exciting part is that this is 
the first time we have a Haiku build very shortly after the official release. It is my intention to also make future 
packages for Haiku available after it comes out.

The package contains the `rustc` compiler, as well as the `cargo` package manager and some additional development tools.
In order to test builds, I always use the freshly built package to (re-)build the `cargo` package manager. As this is a
fairly complex build, success indicates that the toolchain will very likely work correctly in other projects.

The source of the package is a patched version of the official source. The 
[patched git repository](https://github.com/nielx/rust) is available on Github. For each official release, I create a
corresponding branch that adds the Haiku-specific patches on top. See for example the `rust-haiku-1.27.0`-branch. 
The source is then compiled on a Ubuntu system  that has a cross-compiler set up for both x86 and x86_64.
The [generated artifacts](http://dl.rust-on-haiku.com/dist/) are then used in a 
[recipe](https://github.com/haikuports/haikuports/blob/master/dev-lang/rust_bin/rust_bin-1.27.0.recipe) that builds 
the packages for Haiku. In theory it should be possible to build the Rust toolset on a 64-bit Haiku system itself. 
There is an issue with memory usage which prevents me from doing this.

This brings me to the **most important current issue**: the `rustc` compiler seems to 
[use a lot of RAM](https://github.com/nielx/rust/issues/4) in instances where a large project is built. Most 
notably, this is visible when compiling `librustc` itself. On the (default)  32-bit Haiku image, the binary runs out 
of addressable memory. And with version 1.27 I also run into issues on building it in VirtualBox, even with 5.4 GB 
assigned to the virtual machine. Rustc memory usage on Linux is also high, but it never runs out of memory. I would 
like to figure out the cause of this issue.

## Short term goals: building Rust for Haiku from the official source

One of my main goals is that Rust should be buildable from the official source somewhere in the near future. This means
that the customizations that are necessary now should no longer be necessary in the future. In order to reach that goal,
every commit either needs to be upstreamed, cleaned up or become unnecessary. Of course, this is and will be work in
progress. Rust is a moving target, and furthermore many parts, like `cargo`, have additional dependencies that might
break. 

However, that should not stop us from trying. In the [issues tab of Github](https://github.com/nielx/rust/issues),
I will maintain a list of tickets related to tree customizations. These will indicate which bugs are there to 
be fixed, and which patches should be upstreamed.

## Future plans: packaging, Haiku bindings and stabilizing the toolchain

I personally enjoy working with Rust, and I know that there are several other Haiku developers that have an interest in
the language and the philosophy behind it. I want to keep working on improving the experience of the languages for
developers on our platform. 

First of all, I want to figure out if we can do better with packaging and distributing Rust. The current package is a
complete set, which includes the Rust standard library, the compiler `rustc`, the package manager `cargo`, some other 
tools, and the complete set of documentation. The question is whether it is good to split it into multiple packages. An
additional consideration should be the fact that the [rustup](https://rustup.rs/) tool is a part of the Rust philosophy.
It allows developers to install multiple versions of the toolchain, or adding libraries for additional target platforms.
While we might not be able to use the rustup tool, or we might not want to provide it, it does beg the question which
use cases and functionalities we want to replicate and how we can do that with our packaging infrastructure.

The second aspect is that I want to take a stab at implementing Rust-style bindings to some of our API's, in order to
allow the usage of Rust for building platform-specific tools. Now to make it clear: the bindings will not target any of
higher level APIs, such as the interface kit. So it is not any (immediate) goal to build GUI-applications using Rust.
But there are some low-level APIs that can be useful for programmers. One of my first thoughts is to implement the
messaging API in Rust so that developers can use messages to access Haiku functionality. 

The final aspect I would like to figure out, is how we support applications and libraries based on Rust from a users'
point of view. There are questions about packaging, about using Haiku-specific features such as resources, but I also
want to map how backwards compatibility will work in the future. How do we keep binaries running when the underlying
system libraries change ABI? And what is our philosophy and promise to the users on how long old binaries are supported?

But that's all for the slightly longer term. First I have [some patches](https://github.com/nielx/rust) to send 
upstream. Enjoy Rust 1.27.0!
