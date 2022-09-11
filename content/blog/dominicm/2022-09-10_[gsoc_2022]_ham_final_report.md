+++
type = "blog"
title = "[GSoC 2022] Ham: Final Report"
author = "dominicm"
date = "2022-09-10 10:42:14-04:00"
tags = ["haiku", "software", "gsoc2022", "ham"]
+++

Hello everyone. Thank you for having me the past few months; it's been a busy, fun ride. This is the final report for Ham, a replacement to the Jam build system.

I'd like to thank Stephan Aßmus for taking the time to mentor me, and the rest of the Haiku community for being responsive and receptive to Ham's development. 

You can find the Ham repo [on Github](https://github.com/dominicm00/ham), as well as a [project board](https://github.com/users/dominicm00/projects/1) for current issues. If you have any questions I'm always available on the forum/email/IRC, so give me a ping.

# Commits
**Original architecture:**
- [First GSoC commit](https://github.com/dominicm00/ham/tree/61bdbbcb86ea08b9a0ba317ed148320de16e025b)
- [Last GSoC commit](https://github.com/dominicm00/ham/tree/257e753335ab8327a5af0da6249e90b87dc5f29f)
- [All changes](https://github.com/dominicm00/ham/compare/e15b303a218be44a35a322d4cd1cb899ac537cf7...257e753335ab8327a5af0da6249e90b87dc5f29f)
- 79 commits; 19,123 additions; 10,679 deletions (these are inflated due to formatting/renaming, see below)
- [Code changes](https://github.com/dominicm00/ham/compare/5407b41efda06385abcbf463b55f21f9e2bf81cc...257e753335ab8327a5af0da6249e90b87dc5f29f); this comparison misses some genuine additions, but is past most of the formatting/other bulk changes so it's easier to see the work done
- 47 commits; 2,548 additions; 695 deletions

**New architecture:**
- [First GSoC commit](https://github.com/dominicm00/ham/tree/87e57f03d8028da9d93cb9996c4bbf07da8c6a57)
- [Last GSoC commit](https://github.com/dominicm00/ham/tree/39dd95a83a613aed37701c8f85ca975ff858de24)
- [All changes](https://github.com/dominicm00/ham/compare/87e57f03d8028da9d93cb9996c4bbf07da8c6a57...39dd95a83a613aed37701c8f85ca975ff858de24)
- 110 commits; 5,579 additions; 95 deletions

# Summary
This project is a continuation of Ingo Weinhold's [original Ham project](https://github.com/weinhold/Ham), which paused development in 2013. Over the course of the GSoC period, I completed the evaluation portion of Ham, which converts a Jam build system into a series of commands to run. There are some minor remaining bugs in the command execution code blocking the Haiku build, which will be worked out following the GSoC period. I also wrote a [Ham language specification](https://github.com/dominicm00/ham/blob/master/docs/Language-specification.md). It's purposely detailed, but I plan to make a simpler tutorial sequence for those learning the language.

However, the C++ ecosystem has changed significantly since work began on Ham 12 years ago. Namely, there are better parsing tools available, C++17/20 added APIs that are critically important for Ham, and [Ninja](https://ninja-build.org/) provides impressive build capabilities for projects that compile down to it. After discussing it with my mentor Stephan, we decided to lay the groundwork for porting to a new architecture that brings more user-facing benefits, including but not limited to:
- Source-level errors
- Advanced debugging output such as:
  + Parsing traces and an AST graph
  + Graph of target dependencies
- Exact header scanning
- Better incremental build times
- Optional whitespace and other language improvements

I've documented [why a second version was created](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0008-creating-a-version-2.md), [the goals for the project](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0009-ham-project-goals.md), and why certain libraries were chosen in the `docs/development/decisions` folder.

So far the parsing is complete, and the first couple evaluation classes have been ported over. Work on this portion will likely take some time, but the APIs are similar to the original architecture, so it's not being written from scratch.

You can find the original architecture in the `legacy` branch, and the new one in `main`. I'll be merging bug fixes into `legacy` until `main` is released, but feature requests will be focused on the new architecture.

# Work Report
## Original Architecture: 2022/6/13 - 2022/7/26
Work on the original architecture was primarily in implementing [action modifiers](https://github.com/dominicm00/ham/blob/master/docs/Language-specification.md#action-modifiers) and [built-in rules](https://github.com/dominicm00/ham/blob/master/docs/Language-specification.md#built-in-rules). Notable work includes:
- Choosing behavior for underspecified modifiers (notably [`together`](https://github.com/dominicm00/ham/pull/50) and [`piecemeal`](https://github.com/dominicm00/ham/pull/68))
- Creating an [efficient algorithm](https://github.com/dominicm00/ham/pull/68/commits/af226a55b458cbb43f60ec476a7cd2d408fa69f9#diff-1ffff3998df675053aac46b48a013ba5857e1fbd0b1e4191618dfe3ef4af3356R28) to determine command size for the `piecemeal` modifier without brute-force (how Jam implements it)
- Many bug fixes from evaluation logic to memory usage

For a more detailed breakdown of work done, see the [pull requests](https://github.com/dominicm00/ham/pulls?q=is%3Apr+is%3Aclosed+created%3A%3C2022-07-27+) done during this time.

## New Architecture: 2022/7/27 - 2022/9/5
The new architecture uses the new `string_view` and `ranges` APIs for efficient manipulation of string lists (important as that is Ham's primary data structure), a more flexible parsing system, and a bigger focus on unit tests rather than just integration tests. It also uses safe APIs whenever possible, greatly reducing the chance of memory errors.

### Documentation
- Created the [Ham language specification](https://github.com/dominicm00/ham/blob/master/docs/Language-specification.md)
- Started documentation on [how the Ham language translates to Ninja](https://github.com/dominicm00/ham/blob/master/docs/development/Ninja-translation.md)
- Documented the following decisions:
  + [Why a version 2 was created](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0008-creating-a-version-2.md)
  + [Project goals](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0009-ham-project-goals.md)
  + [Why STL containers were used for data structures](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0010-use-standard-library-containers.md)
  + [Why PEGTL was used for parsing](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0011-using-pegtl-for-parsing.md)
  + [Why Catch was used for testing](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0012-using-catch-for-testing.md)
  + [Why Ninja was used as a back-end build system](https://github.com/dominicm00/ham/blob/master/docs/development/decisions/0012-using-catch-for-testing.md)

### Testing
- Extensively unit tested all implemented parsing/evaluation functionality
- Mocks evaluation classes to isolate unit tests
- Created helper functions to expressively test ASTs (example of failing test below)
```
-------------------------------------------------------------------------------
Variable replacers
-------------------------------------------------------------------------------
/home/dominic/src/haiku/ham/tests/parse/Variables.cpp:125
...............................................................................

/home/dominic/src/haiku/ham/tests/parse/Variables.cpp:133: FAILED:
  REQUIRE( checkParse(decompose(parse("$(X:G=grist)"), {0}), T<Variable>( {....
with expansion:
  false
with messages:
  Variable[2]{$(X:G=grist)}
   Identifier[1]{X}
   VariableReplacer[2]{G=grist}
    VariableSelector[0]{G}
    Leaf[1]{grist} != Leaf[?]{gr}

===============================================================================
test cases: 132 | 131 passed | 1 failed
assertions: 342 | 341 passed | 1 failed
```

### Parsing
- [Mostly optional whitespace](https://github.com/dominicm00/ham/issues/119)
- Parses variable expressions at parse-time instead of dynamically at run-time
- Retains source information
- Customized errors (no obscure syntax error messages)

### Evaluation
- Input sanity checking
- Detailed source-level error messages

# Parting Words
Thank you all for the amazing few months I've had to work on this project. I plan to continue maintaining Ham, quickly reach a stable build of the original architecture, and - eventually - a full release of the new architecture. Ham has been a chance to breath new life into a great build system, and I look forward to making it useful for Haiku and other projects.
