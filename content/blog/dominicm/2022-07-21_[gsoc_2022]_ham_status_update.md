+++
type = "blog"
title = "[GSoC 2022] Ham: Status Update"
author = "Dominic Martinez"
date = "2022-07-21 09:02:43-04:00"
tags = ["haiku", "software"]
+++

Hello everyone. This is a brief update on the Ham project - a drop in replacement for the Jam build system. For those more curious about the technical details, there will be a larger blog post on Ham's action modifier implementation coming soon.

# What's been done so far?

The majority of the work has been in implementing Jam language features. Today, Ham hit a major milestone by supporting all of Jam's action modifiers (`updated`, `together`, `quietly`, `piecemeal`, `ignore`, and `existing`). Ham specifies the semantics of these modifiers in much greater detail than Jam, and has improved performance (especially with `piecemeal`). This means you should see better performance on commands like `jam clean`. Centralized documentation of Ham's language semantics is ongoing, but you can see the discussions and remaining tasks on the [language issue tracker](https://github.com/dominicm00/ham/issues/48).

There's also been plenty of documentation improvements, bug fixes, miscellaneous features, and (in-progress) refactoring to make better use of the C++ standard library.

Ham is currently able to build itself, meaning it can parse the built-in rules and build a shared library/binary correctly.

# What's left to do?

The current goal is to do a successful build of Haiku, which you can track on the [GitHub milestone](https://github.com/dominicm00/ham/milestone/9). This should weed out most remaining major bugs.

After that, there's plenty of work to do, including:
- More documentation ([#64](https://github.com/dominicm00/ham/issues/64), [#63](https://github.com/dominicm00/ham/issues/63), [#16](https://github.com/dominicm00/ham/pull/16))
- Better platform compatibility, including Windows support ([#27](https://github.com/dominicm00/ham/pull/16))
- Better debugging output ([debug issues](https://github.com/dominicm00/ham/issues?q=is%3Aissue+is%3Aopen+label%3Ais%3Adebug))
- Support for outputting a clangd compilation database
- Syntax highlighting for major editors
- Refactoring to use standard parsing/testing libraries

You can always track what's being worked on on the [Ham project board](https://github.com/users/dominicm00/projects/1/views/1).
