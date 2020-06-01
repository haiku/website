+++
type = "blog"
title = "GSoC 2020 Project: Improving and Extending Services Kit"
author = "leorize"
date = "2020-05-31 15:57:12-05:00"
tags = ["haiku", "software", "gsoc2020", "gsoc", "serviceskit", "network"]
+++

It's pretty long overdue for the post, but here I am.

# Introduction:

I'm Leorize, a past GCI participant and a former active member of HaikuPorts.
If you hang around the `#haiku` IRC channel, chances are that you might know me
:)

I started contributing to Haiku around 2017, when I joined GCI. Since then,
I've authored many bug fixes and ports, including some notable ports like
`libuv`, `mandoc`, `pkgconf`, and `pyqt`.

This year, I'm excited to be selected as a GSoC mentee! You may have noticed
that a lot of my work were mainly focused on the developer side of things, so
this year, I'm looking at improving the user experience on Haiku.

---

# About the project:

My project revolves around Services Kit. For those of you who don't know what
this is, it's the application networking library that powers many of the
applications that you may use: HaikuDepot, WebPositive, Weather...

This project aims to improve the performance/reliability of Services Kit,
to introduce better support for HTTP/1.1 and HTTP/2 (which should result in a
huge uplift in Web+ performance), to add support for more Internet protocols
(like FTP), and to make Services Kit easier to use for developers.

# Project plan:

I am spending a lot of time researching and experimenting with different designs
for Services Kit to iron out any bottlenecks. The plan as of now is:

- Further evaluate the API design for inefficiencies
  - Currently we decided to stick to the current threading-based design.
  - I'm looking into possible overhead associated with having to serialize
    the received data into `BMessage`s.
- Implement HTTP/1.1 support.
  - Also get proxies implemented.
- Implement FTP support.
- Give the documentation a nice touchup.

# Work done so far:

- Built the overhead benchmark suite: https://github.com/alaviss/haiku-net-bench
  - This suite will slowly expand as more and more benchmarks are written.

# Some links:
- [GSoC Project](https://summerofcode.withgoogle.com/projects/#5726383881322496)
- [Proposal](https://docs.google.com/document/d/1Urc3Us9_o7ACpXgKMKX4MqfnK8AUyRNZ7kC1rsrc2W0/edit?usp=sharing)
