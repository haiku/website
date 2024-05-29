+++
type = "blog"
title = "An odyssey to port compcert"
author = "Anarchos"
date = "2024-04-09 09:44:28+00:00"
tags = ["haiku", "software"]
+++


### The goal 
My goal is to be able to use [CompCert](https://compcert.org), a certified compiler.
It is a compiler whose passes are formally verified to not introduce change in the semantics from the `C` code to its translation in `asm`.

### The installation goals

- `Compcert` is installed from its `Coq` sources. So i need `Coq`.
- `Coq` is installed from sources or as an OPAM package. OPAM being the *Ocaml PAckage Manager*.
- `opam` needs *OCaml* anyway. So I need *OCaml*.
- `OCaml` is installable through *OPAM* or from sources.

### The easiest part

Porting OCaml was not too hard: copying most of Linux configuration in the `configure{.ac}` files work as is. 
Don't forget to add some platform detection in `config.guess`, and some libraries tweaking:
- -lm is not necessary
- -lbsd is mandatory to use `getentropy`
- -lnetwork to use... well networks :)

### The easy part

Compile `opam`.
This one runs smoothly as soon as you have a working Ocaml compiler : `./configure && make && make install` does the trick.
Don't forget to add the ususal ` --prefix ~/config/non-packaged` to avoid installing in `/usr/...`.

### The normal part

Try to install `Coq` : 
`opam install coq` --> The coq package relies on the (ocaml) package `lablgtk3`. This one is used in `coqide` an IDE for Coq.
The critical component used there is `gtksourceview3`, used to render Coq source files with syntax coloring. 

### The journey begins...
For months or even more than a year, i could not get past this lablgtk3 package, cause *Haiku* only gets `gtksourceview-4` in `haikuports/x11-libs/gtksourceview`.
So i tried to trick lablgtk3 to compile with gtksourceview-3 files symlinked to gtksourceview-4 files, and a bit of renaming 3 <-> 4 here and there. 
It worked but `coqide` crashed pretty soon when used due to this poor setup.

So i decided to take the other way: port `gtksourceview3` properly.
I achieved that last month, the PR is in phase of polishing, but was enough for me to carry on the work further.

### The journey continues
During my tasks, i encounter some annoying behabviour by `opam`:
the `opam install` command uses the _Ocaml_ *dune* build system. But in some cases *dune* fails with a rather cryptic (at this time for me, not for more experienced Haiku developers than me) message:
`execve() : Operation not supported`.
At first, i thought it was because of the spawn submodule of dune. So I tried for months to do a pull request (PR) on Haiku, to kill other threads and do a fork() from another thread of the team than the main thread. I could never finish that because the main thread is very special, so you can't easily do a `fork()` from a non-main thread. But indeed it was in a file which calls execve (which is incompatible with `fork()` on Haiku if the team has more than one thread. So I disabled the call to execve(), as for the Win32 platform.

### Finally, land is in sight
When i am able to have a working `dune`, I can compile Coq : <img src="/files/blog/anarchos/coqide.png"/>

### Ulysses goes home
with coq available, i was able to compile `ccomp`, the CompCert certified compiler.
First test:
```
[Rocker] ~/OCAML/Compcert> ccomp
ccomp: error: no input file
1 error detected.
```
At last, the binary runs.

Next test : compile "int main(int argc, char**argv) {return 0;}" and runs `./a.out;echo $?` --> 0
To be sure : compile "int main(int argc, char**argv) {return 1;}" and runs `./a.out;echo $?` --> 1

Success !

Now i try to use standard headers (an include to <stdio.h>:
```
ccomp test.c 
In file included from /boot/system/develop/headers/posix/sys/types.h:11,
                 from /boot/system/develop/headers/posix/stdio.h:9,
                 from /boot/system/develop/headers/bsd/stdio.h:9,
                 from test.c:1:
/boot/system/develop/headers/os/BeBuild.h:59:9: error: #error Unsupported compiler!
   59 | #       error Unsupported compiler!
      |         ^~~~~
ccomp: error: preprocessor command failed with exit code 1 (use -v to see invocation)
```
It seems BeBuild.h restricts the usable compilers to gcc or tinyc :
`#if __GNUC__ == 2
#       define B_HAIKU_ABI                                      B_HAIKU_ABI_GCC_2_HAIKU
#elif (__GNUC__ >= 4 && __GNUC__ <= 14) || defined(__TINYC__)
#       define B_HAIKU_ABI                                      B_HAIKU_ABI_GCC_4
#else
#       error Unsupported compiler!
#endif`

### Conclusion
Now that i have a proof of concept, i try to do all the necessary pull requests to OCaml, dune, Compcert to get the tools compile on Haiku. Next step is to do the necessary housework to let Haiku uses Compcert (so tweak BeBuild and surely many other develop headers).
What a journey!
