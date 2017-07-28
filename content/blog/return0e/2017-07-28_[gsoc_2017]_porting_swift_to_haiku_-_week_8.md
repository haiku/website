+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #8"
author = "return0e"
date = "2017-07-28 16:12:13+01:00"
tags = ["haiku", "gsoc17", "swift", "software"]
+++

Hello everyone!

Since last week I worked on enabling Haiku support for running the swift test-suite. This allows the newly built compiler to be put through the same series of test-cases run by the swift buildbots for macOS, Linux and FreeBSD platforms. These tests cover different areas of the toolchain, from simple unit-tests to validation-tests that cover the compiler internals, major standard library API changes and most importantly, compiler stability via testing with malformed inputs. I ran the Swift 3.1 tests with the command `./utils/build-script -R -x` , in which 2022 tests passed and 149 failed. A brief summary of the test results can be found [here](https://gist.github.com/return/0ff2de707abdfe0bc2da33058071025c), and a list of the [tests that have failed](https://gist.github.com/return/6af6bbf84fa507d9ad6043fb593942b7).

These failures seem to be related to the missing SDK paths or the system header locations not being passed down to the test-suite. Moreover, some of the tests that failed were only supported on macOS/iOS simulator platforms, thus are unsupported by all other platforms. I had to adapt these changes by adding Haiku to any test that is known to fail or be unsupported by Glibc platforms. This significantly reduced the number of failures Haiku was receiving, but more Glibc  testing still needs to be done. Apart from that, I added support for using the swift integrated REPL (Read-Eval-Print-Loop), which is very useful for testing purposes, as you can see in the screenshot below:

<img src="https://user-images.githubusercontent.com/7050293/28718645-c4e2380c-739e-11e7-9283-5dfdcf45fb14.png" alt="Swift-REPL" class="img-responsive center-block">

I've also migrated and adapted all my Swift 3.1 work and rebased these patches to the upstream master branch, plus I'll be targeting Swift 4 via the [swift-4-haiku-support]() branch. Due to tickets [#8798](https://dev.haiku-os.org/ticket/8798), [#7859](https://dev.haiku-os.org/ticket/7859) (thanks phoudoin!), [#11124](https://dev.haiku-os.org/ticket/11124) and [#13601](https://dev.haiku-os.org/ticket/13601) being either fixed or pending to be upstreamed, I've removed some of my workarounds and will be cleaning up my patches to avoid potential conflicts on my branch. Any patches that are unsuitable for upstream will have to be remain as a patchset in HaikuPorts. 

Porting the foundation-libraries will be the next focus area after testing the compiler. These libraries hold extended functionality outside of the default standard libraries and are very important for using other 3rd party libraries. The swift recipe will be updated to include the above fixes, then I'll add a recipe for 4.0 afterwards.