+++
type = "blog"
title = "GSoC 2021 Project: Modernizing Caya"
author = "JadedCtrl"
date = "2021-05-20 09:46:10-05:00"
tags = ["gsoc", "gsoc2021"]
+++

# Introduction
Hi! I'm Jaidyn Levesque (jadedctrl on IRC and elsewhere), a 2nd year Computer
Science student. I've been using \*nixes for several years now, and just
moved over to Haiku as my main OS a little over a year ago. I'm lucky enough to
be a mentee this summer, and I'm excited to get started!

---

# Project
My GSoC project is to modernize [Caya](https://github.com/Barrett17/Caya), a
multi-protocol chat program. "Modernize" here means a couple different things:
General updates, multi-user chats, and libpurple support. Caya is oriented
around two-member chats, whose protocol is arbitrary, with protocol support
being done through add-ons. It hasn't seen much activity in the past few years,
so my first goal is to get it running on modern Haiku. Afterwards, chats will be
abstracted to allow for multiple users, enabling protocols like IRC to be
implemented. The last goal, libpurple support, will involve writing a generic
libpurple protocol for Caya.

libpurple is a multi-protocol chat library used by programs like
[Pidgin](https://pidgin.im/) and Finch (`libpurple-finch` in ports). It has
varying degrees of support for several protocols that right now lack native
Haiku clients:
[Matrix](https://github.com/matrix-org/purple-matrix/#readme),
[Discord](https://github.com/EionRobb/purple-discord/#readme), 
[Slack](https://github.com/dylex/slack-libpurple/),
and [others](https://pidgin.im/plugins/?type=Protocol). With a libpurple
addon, Caya should work as a native client for just about any of these
protocols in one fell swoop.

As a part of this effort, I'll also be writing ports for some of these libpurple
add-ons. Right now Matrix and OMEMO ([lurch](https://github.com/gkdr/lurch))
look like safe bets, being popularly used in libre communities, but I'd like to
work on what people would find most useful.

If all goes well, Caya should be a usable chat program by summer's end. I'll
make sure to add any updates to this article's forum thread. Right now, you can
find the git repository [here](https://github.com/JadedCtrl/Caya).

Cheers! :)
