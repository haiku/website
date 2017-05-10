+++
type = "blog"
title = "[GSoC 2017] Porting the Swift Programming Language to Haiku"
author = "return0e"
date = "2017-05-10 12:58:17+01:00"
tags = ["swift", "gsoc2017", "gsoc"]
+++

<h3>Introduction</h3>

<p>Hello everyone! I'm Joseph 'Calvin' Hill, (irc nick: return0e) a third year computer science student at the University of Hull and one of the 7 GSoC students participating with Haiku. I'm also a active contributor to the HaikuPorts organisation, by porting over useful cross-platform software found on other platforms, to be made available on Haiku. This summer, I'll be <strong>porting the Swift programming language to Haiku</strong> with my mentors Jérôme Duval 'Korli' and Julian Harnath 'jua', with the intention of merging these changes upstream.</p>

<h3>Project Description</h3>

<p>Haiku has ports for several modern programming languages available to developers, but some of them are in the form of version specific patches, which haven't been upstreamed yet. As new releases of programming languages come by, maintenance of platform support through patches becomes increasing difficult and Haiku misses out on official support for those languages. By working directly with the Swift community, this task aims to add Haiku support specifically for Swift and its sub-projects in the effort to not only improve Haiku's programming language diversity for future developers, but to make swift a possible alternative programming language to develop Haiku apps in.</p>

<p>Once the compiler and its standard library is built, it will be possible to compile and run Swift code on Haiku which will then allow developers to build libraries and applications that are written in Swift. If this is achieved early, the other utilities Swift uses such as debugging/REPL support (LLDB), package management and its testing frameworks will follow afterwards. The following will be done within the duration of the GSoC:</p>

<ul>
<li>Building swiftc and its standard library.</li>
<li>Porting the core libraries to Haiku.</li>
<li>Ability to compile/run simple swift programs.</li>
<li>Run tests against the newly built standard library and swiftc.</li>
</ul>


<p>As this task only focuses on the bare-minimum needed to get swift functional, I will further maintain Haiku support after GSoC and include:</p>

<ul>
<li>Porting libdispatch.</li>
<li>Package Manager support on Haiku. (requires llbuild)</li>
<li>Support for LLDB debugging.</li>
</ul>


<h3>About Swift</h3>

<p>Swift is a general-purpose programming language built using a modern approach to safety, performance and modern software design patterns [1]. It was recently open-sourced by Apple in 2015 with goals such as being a C/C++ and Objective-C alternative, maintaining source compatibility with future releases and increasing portability with various platforms by leveraging the LLVM compiler for code generation and optimisation of source code. Swift is commonly used in the iOS/macOS communities for writing GUI apps, but it is also suitable for other scenarios, from teaching programming to server-side development.</p>

<p>It has several language features such as:</p>

<ul>
<li>Closures (unified with function pointers)</li>
<li>Optionals</li>
<li>Generics</li>
<li>Built-in REPL for debugging (LLDB)</li>
<li>Functional programming patterns support</li>
<li>C and Objective-C interoperability via ClangImporter</li>
</ul>


<p>Swift also provides additional libraries for functionality not included in the standard library. More information about them can be found here: [5]</p>

<h3>Goals for next week</h3>

<p>During the community bonding period, I will be in contact with the Swift team about which version I should port, as Swift 4 is scheduled to be released in late 2017. I'll also be discussing with my mentors on adding slight changes to the existing LLVM port in order for Clang to build itself, as using g++ to compile Swift is not supported. In the first two weeks (May 4th - May 18th) the following will be achieved:</p>

<ul>
<li>Add initial x86-64 platform recognition in the build script.</li>
<li>Add Haiku as a standard library target.</li>
<li>Haiku support for validation tests.</li>
<li>Complete build-script support for Haiku. (Includes building only with LLVM and Clang)</li>
</ul>


<p>I'll be continuing to patch the build-script for initial Haiku support and I aim to get the build-script patches upstreamed in late May / early June.</p>
<h3>References </h3>
[1] <a href="" title="https://swift.org/about">https://swift.org/about</a></br>
[2] <a href="https://www.dropbox.com/s/hp9z4azdem6gume/Final_Proposal.pdf?dl=0">GSoC Proposal</a></br>
[3] <a href="https://github.com/apple/swift" title="">Swift GitHub Repository</a>
</br>
[4] <a href="https://swift.org/compiler-stdlib/#compiler-architecture" title="">Swift Compiler Architecture</a>
</br>
[5] <a href="https://swift.org/core-libraries" title="">Swift Core Libraries</a>