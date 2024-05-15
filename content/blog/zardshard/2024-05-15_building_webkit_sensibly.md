+++
type = "blog"
title = "Building WebKit Sensibly"
author = "Zardshard"
date = "2024-05-15 10:44:31-04:00"
tags = ["WebKit"]
+++

WebKit builds can take a lot of space and time to build on Haiku.

<div class="alert alert-info">
To those working on WebKit, welcome! This blog post is primarily for those working on HaikuWebKit, Haiku's fork of WebKit, but it may also be useful for you.
</div>

I will be covering some techniques that are useful to reduce the size of build files without significant disadvantages. I'll also cover how to speed up linking.

There are some more techniques that can further reduce space such as shallow cloning and sparse checkouts that I won't be discussing here. Maybe in a future blog post? With all the techniques combined, I've managed to get WebKit's code and build in around 12 GB.

## Compiling

Vanilla debug builds can be *huge*. This is due to the lack of build optimization and the inclusion of debug information.

### Optimization level

By default, debug builds are unoptimized. But a little bit of optimization can, IIRC, reduce the build size by two or three times! In this case `-Og` is a good optimization level since it doesn't affect compilation time or debuggability significantly but yields a significant size reduction.

To use the `-Og` optimization level add the following to Source/cmake/OptionsHaiku.cmake:

```cmake
string(APPEND CMAKE_CXX_FLAGS_DEBUG " -Og")
```

<div class="alert alert-warning">
This code won't run unless the build is a debug build. Make sure you pass the `--debug` option to build-webkit.
</div>

### Debugging information

A quick test suggests that debugging information can double the size of the build! It makes sense, then, to only include debugging information for the folders you care about. So, start off by disabling debugging information everywhere by adding the following to Source/cmake/OptionsHaiku.cmake:

```cmake
string(REPLACE "-g" "" CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG}")
```

Enabling debugging information for a subdirectory should then be as simple as adding the `-g` flag to the `CMAKE_CXX_FLAGS_DEBUG` variable. Unfortunately, the Debugger fails to read the source code lines in that case (likely a bug), so it is necessary to specify `-gdwarf-4`. So, to enable debugging information for a directory, add the following to that directory's CMakeLists.txt or PlatformHaiku.cmake file:

```cmake
string(APPEND CMAKE_CXX_FLAGS_DEBUG " -gdwarf-4")
```

## Linking

By default, debug builds, and maybe release builds, attempt to use lld when possible. So, simply installing lld should suffice. Note that cmake must be rerun in order for the build system to recognize its existence and start using it. My tests show that this reduces recompilation times from 30 minutes to 1 minute for a small change.
