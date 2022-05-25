+++
type = "blog"
title = "[GSoC 2022] Ham: A Jam Replacement"
author = "Dominic Martinez"
date = "2022-05-25 05:13:25+00:00"
tags = ["haiku", "software", "gsoc", "gsoc2022", "ham", "jam"]
+++

# Introduction

Hello everyone! I'm Dominic Martinez, a current rising junior at Duke University, USA. Being a personal victim of build system trauma (looking at you web-dev), I've become increasingly fascinated (and frustrated) by build system design, and have been waiting for the chance to build one myself. As such, I'm excited to have been selected to work on Ham - a replacement for the Jam build system - alongside my mentor [Stephan Aßmus](https://discuss.haiku-os.org/u/stippi/).

I hope to get to know you all throughout this summer (and beyond). Feel free to reach out to me on IRC (dominicm) or via email (dom@dominicm.dev).

# Project Overview

Haiku currently uses a fork of [Perforce Jam](https://swarm.workshop.perforce.com/view/guest/perforce_software/jam/src/Jam.html) as its build system. While Jam is a great build system, its legacy codebase makes it difficult to fix bugs or introduce new features.

Ham is a complete Jam rewrite that [was started by Ingo Weinhold](https://github.com/weinhold/Ham), but wasn't completed. This project starts where Ingo left off to bring Ham to where it can be used as Haiku's official build system. The new repository can be found [here](https://github.com/dominicm00/Ham).

# Goals

Ham is a drop-in replacement for Jam, with compatibility modes for [Boost.Jam](https://www.boost.org/build/doc/html/bbv2/jam.html) and [Perforce Jam](https://swarm.workshop.perforce.com/view/guest/perforce_software/jam/src/Jam.html). Alongside supporting various Jam versions and being more rigorously tested, Ham will have the following features:
- More robust multithreading support, fixing multithreaded build failures like [#15620](https://dev.haiku-os.org/ticket/15620)
- A granular caching system that can detect Jamfile/environment variable changes and correctly decide which targets need to be rebuilt
- Ability to output a `clangd` [compilation database](https://clangd.llvm.org/installation#project-setup) (`compile_commands.json`) directly, without actually building the project
- Written as a library for potential IDE integration
- Platform support for, at minimum, all platforms Haiku can be built on (Haiku, Linux, BSD, OSX)

If the above goals are completed early, there are also some stretch goals:
- Direct `clangd` integration, without having to manually create/update a `compile_commands.json` database
- Integration with common IDEs

Thank you all for giving me the chance to get involved, and I can't wait to get started!
