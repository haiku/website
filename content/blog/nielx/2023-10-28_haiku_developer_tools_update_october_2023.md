+++
type = "blog"
title = "Haiku Developer Tools Update (October 2023)"
author = "nielx"
date = "2023-10-28 10:35:19+01:00"
tags = ["haiku", "software"]
+++

This article lists some of the recent updates for developer tools that are available in the HaikuPorts repository. Many of these can be installed from HaikuDepot.

This is the first article on this topic, but it may become a regular (quarterly?) series. Let me know in the comments what you find of these notes, and what else you think should be covered.

<!--more-->

## GCC 13.2.0

The Haiku nightlies are now built with GCC 13.2.0 as the primary compiler (the previous version was GCC 11.3.0) and it is available for software developers. It can also be used on a Haiku R1 beta 4 system. The packages support **C, C++, and Fortran.**

The updated version includes all improvements in the [GCC 12](https://gcc.gnu.org/gcc-12/changes.html) and [GCC 13](https://gcc.gnu.org/gcc-13/changes.html) builds. Since Haiku's primary language is C++, it is particularly notable that there is now improved support for C++20 features, as well as some more early support for C++23.

Check out the packages on **HaikuDepot**:

- `gcc`: [64 bit](https://depot.haiku-os.org/#!/pkg/gcc/haikuports/haikuports_x86_64/13/2/0_2023_08_10/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/gcc_x86/haikuports/haikuports_x86_gcc2/13/2/0_2023_08_10/-/3/x86_gcc2)

- `gcc_fortran`: [64 bit](https://depot.haiku-os.org/#!/pkg/gcc_fortran/haikuports/haikuports_x86_64/13/2/0_2023_08_10/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/gcc_x86_fortran/haikuports/haikuports_x86_gcc2/13/2/0_2023_08_10/-/3/x86_gcc2)

- `gcc_jit` (new!): [64 bit](https://depot.haiku-os.org/#!/pkg/gcc_jit/haikuports/haikuports_x86_64/13/2/0_2023_08_10/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/gcc_x86_jit/haikuports/haikuports_x86_gcc2/13/2/0_2023_08_10/-/3/x86_gcc2)

- `gcc_syslibs`: [64 bit](https://depot.haiku-os.org/#!/pkg/gcc_syslibs/haikuports/haikuports_x86_64/13/2/0_2023_08_10/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/gcc_x86_syslibs/haikuports/haikuports_x86_gcc2/13/2/0_2023_08_10/-/3/x86_gcc2)

## Binutils 2.41

Binutils is a collection of tools to handle binaries, best known for the `ld` linker. Recently, binutils was updated to the 2.41 release. The previous version of binutils was 2.31.

Check the binutils package on **HaikuDepot**: [64 bit](https://depot.haiku-os.org/#!/pkg/binutils/haikuports/haikuports_x86_64/2/41/-/-/1/x86_64?bcguid=bc281-YHHL) | [32 bit](https://depot.haiku-os.org/#!/pkg/binutils_x86/haikuports/haikuports_x86_gcc2/2/41/-/-/1/x86_gcc2?bcguid=bc358-QDCL)

## LLVM 17

The LLVM Compiler Infrastructure Project provides libraries that power many modern languages, like Rust. It also ships with a C/C++ compiler called `clang` and the `clangd` package is the standard LSP-server for C/C++ used by many IDEs, including Qt Creator (see below). The package was recently updated to the [17.0.1](https://discourse.llvm.org/t/llvm-17-0-1-released/73549) release.

Check out the packages on **HaikuDepot**:

- `llvm17`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_python310/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64)

- `llvm17_clang`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_clang/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_clang/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

- `llvm17_clang_analysis`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_clang_analysis/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_clang_analysis/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

- `llvm17_libs`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_libs/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_libs/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

- `llvm17_libunwind`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_libunwind/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_libunwind/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

- `llvm17_lld`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_lld/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_lld/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

- `llvm17_python310`: [64 bit](https://depot.haiku-os.org/#!/pkg/llvm17_python310/haikuports/haikuports_x86_64/17/0/1/-/3/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/llvm17_x86_python310/haikuports/haikuports_x86_gcc2/17/0/1/-/3/x86_gcc2)

## Python 3.10, 3.11 & 3.12

The Python interpreter has been updated recently as well, and the standard python interpreter on Haiku is now Python 3.10.

Check out the packages on **HaikuDepot**:

- `python3.10`: [64 bit](https://depot.haiku-os.org/#!/pkg/python3.10/haikuports/haikuports_x86_64/3/10/13/-/1/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/python3.10_x86/haikuports/haikuports_x86_gcc2/3/10/13/-/1/x86_gcc2)

- `python 3.11`: [64 bit](https://depot.haiku-os.org/#!/pkg/python3.11/haikuports/haikuports_x86_64/3/11/6/-/1/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/python3.11_x86/haikuports/haikuports_x86_gcc2/3/11/6/-/1/x86_gcc2)

- `python 3.12`: [64 bit](https://depot.haiku-os.org/#!/pkg/python3.12/haikuports/haikuports_x86_64/3/12/0/-/1/x86_64?bcguid=bc2938-FWTK) | [32 bit](https://depot.haiku-os.org/#!/pkg/python3.12_x86/haikuports/haikuports_x86_gcc2/3/12/0/-/1/x86_gcc2)

## Qt Creator 11.0.3

This IDE from the makers of Qt supports full-fledged C++ development, including code completion using `clangd` (part of the LLVM package). See what's new in [version 11](https://www.qt.io/blog/qt-creator-11-released). Previous release on Haiku was 6.0.1.

Check out the package on **HaikuDepot**: [64 bit](https://depot.haiku-os.org/#!/pkg/qt_creator/haikuports/haikuports_x86_64/11/0/3/-/2/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/qt_creator_x86/haikuports/haikuports_x86_gcc2/11/0/3/-/2/x86_gcc2)

## CudaText 1.200.0.0

This modern text editor for developers is written in Object Pascal, is fast, and has a lot of features that are available as plugins, including code completion using `clangd` (part of the LLVM package). See the [change log](https://github.com/Alexey-T/CudaText/blob/1.200.0/app/readme/history.txt) to see what's new.

Check out the package on **HaikuDepot**: [64 bit](https://depot.haiku-os.org/#!/pkg/cudatext/haikuports/haikuports_x86_64/1/200/0.0/-/1/x86_64?bcguid=bc2503-PXKT) | [32 bit](https://depot.haiku-os.org/#!/pkg/cudatext_x86/haikuports/haikuports_x86_gcc2/1/200/0.0/-/1/x86_gcc2)

## haiku-format 17

This tool is a fork of the `clang-format` tool that is part of the LLVM package (see above). It features a code formatting that covers (almost all of) Haiku's coding style. It is beneficial to run this on your code changes before submitting it to Haiku. It has recently been updated with the latest changes in `clang-format`, and it includes some further refinements for the coding style. See the [announcement](https://discuss.haiku-os.org/t/haiku-coding-guidelines-and-haiku-format/14047/1) on our forums.

Check out the package on **HaikuDepot**: [64 bit](https://depot.haiku-os.org/#!/pkg/haiku_format/haikuports/haikuports_x86_64/17/0/1/-/2/x86_64) | [32 bit](https://depot.haiku-os.org/#!/pkg/haiku_format_x86/haikuports/haikuports_x86_gcc2/17/0/1/-/2/x86_gcc2?bcguid=bc3071-UTWU)

## DotNet GSOC Port

One of the Google Summer of Code programs this year was the porting of `dotnet` to Haiku. The student continued on previous work and touched a lot of code, including in the Haiku kernel itself. The [final blog post](https://www.haiku-os.org/blog/trungnt2910/2023-08-20_gsoc_2023_dotnet_port_final_report/) is a very interesting read!


