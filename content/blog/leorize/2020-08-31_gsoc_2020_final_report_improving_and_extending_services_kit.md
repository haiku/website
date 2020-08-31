+++
type = "blog"
title = "GSoC 2020 Final Report: Improving and Extending Services Kit"
author = "leorize"
date = "2020-08-31 02:00:18-05:00"
tags = ["haiku", "software"]
+++

Hi all. This is my final report on my project aiming to improve Services Kit,
the networking backend behind most native Haiku application, most notably
WebPositive.

# Progress made during GSoC

You may find the patches here:
- [Haiku's Gerrit](https://review.haiku-os.org/q/hashtag:gsoc2020+owner:leorize%252Boss%2540disroot.org)
- [HaikuWebKit's Github](https://github.com/haiku/webkit/pull/35)

Here's the summary of some of the outstanding changes:
- `BMemoryRingIO` is introduced for high-speed cross-thread communication. This
  is an implemenation of a circular buffer with `BDataIO` interface. The
  intended use case for this is for a HTTP/2 implementation, where one thread
  will be the multiplexer and request threads will make use of this to retrieve
  from the multiplexer.
- `BUrlRequest` will now output directly into a `BDataIO`. This simplifies the
  API for users as they can now reuse `BDataIO` implementations within Haiku
  like `BFile`, `BMallocIO`, etc. without having to implement a
  `BUrlProtocolListener`.
- Introducing `BUrlSession` as a context manager allowing request handlers to
  access and store session data. What this will enable is the ability to
  reuse previously opened connections, which should reduce latency when
  requests are opened against previously connected hosts. This portion is still
  a WIP. At the time of writing you might not find patches for this, and that's
  because Gerrit appears to be unresponsive and my uploads are not going up. I'll
  update this post once the patch went up.
- A clean up and rearchitecture of HaikuWebKit (WebPositive's engine) networking
  was done which should improve reliablity. The rearchitecture also come with
  fixes for HTTP authentication and redirection, which should now function
  as well as other browsers.

I'll be honest, I'm not happy with (relatively) small the amount of work that I
have done during this GSoC, and I'm sorry for have not followed up with my set
goals.

# What's next?

I'll continue to refine the changes as needed and potentially work on
some optimizations like connection reuse that will be made possible by the
changes done, but with my withering interest on this project, I can't promise
anything.

# Program experience

I've learned a lot working on this project, especially about how much I still
don't know about thread-safety, and I got to experience first hand the need for
the many modern C++ features that I've come to take for granted
(Services Kit has to be written in C++98 for gcc2 support).

Regarding the mentorship, I have to thank waddlesplash and PulkoMandy for being
very patient with my slow work pace, and for the helpful advices as well as
the quick turnaround for all of my questions.
