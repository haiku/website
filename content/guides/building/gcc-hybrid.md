+++
type = "article"
title = "Haiku Hybrids"
date = "2009-06-03T14:05:45.000Z"
tags = []
+++

<h3>What is a Haiku Hybrid?</h3>
<p>
Haiku hybrid images are Haiku releases which can compile and execute programs built for incompatible ABIs. This may mean different architectures like x86-64 and x86, or different, incompatible compilers like gcc2.95 and gcc8.x for x86. Currently only the latter case is supported. gcc2.95 gives Haiku binary compatibility with native legacy applications written for the BeOS.
</p>

<p>
In a Haiku Hybrid, there is the primary GCC or architecture and the secondary GCC or architecture. The primary GCC is the version that was used to compile Haiku. The secondary GCC provides both a runtime time environment and a cross-compiler for using and creating other-GCC objects.
</p>

<p>
The architecture name used in the build system and in Haiku for x86 gcc2 is "x86_gcc2" and for x86 gcc8 "x86". In a Haiku Hybrid one can find subdirectories named like the secondary architecture in */lib/, */bin/, and other directories. They contain files specific to the secondary architecture portion of the Hybrid.
</p>

<p>
Since x86 is the only platform for which BeOS R5 binary compatibility is possible, no other target platforms need to be built with gcc2. Thus, until x86-64 Haiku has grown 32 bit support, x86 is the only platform that a Haiku Hybrid is usable.
</p>

<h3>Which GCC should I use?</h3>
<p>
In short, a gcc2 Hybrid. For R1 and earlier releases, gcc2 Hybrid is the official release style. As such you can expect the least amount of issues on it. Later we will likely switch to gcc8 Hybrids and eventually phase out the gcc2 part completely.
</p>

<h3>Why not gcc8?</h3>
<p>
For R1 and earlier releases, only the gcc2 ABI can be considered stable and future proof. Once R1 is released, binaries built with gcc8 will need to be recompiled (and more than likely have their sources updated for new API).
</p>

<h3>How are GCC Hybrids built?</h3>
<p>
Hybrids are built pretty much the same way as non-Hybrids. The only difference is that when configuring the build the secondary architecture respectively the secondary compiler needs to be specified.
<p>
<h3>Setting up directories</h3>
<p>Your working directory (also called a folder) may look like this:</p>
```
  sourcecode/haiku/buildtools/
  sourcecode/haiku/haiku/
  sourcecode/haiku/haiku/generated.x86gcc2
```
<p>You have created <i>sourcecode/haiku/</i> and from there cloned the Haiku repo (which created the <i>haiku</i> subfolder). If you're not building under Haiku, you also cloned the Buildtools repo (which created the <i>buildtools</i> subfolder). Now create the folder <i>sourcecode/haiku/haiku/generated.x86gcc2</i>.</p>

<h3>Configuring the directories</h3>
<div class="alert alert-info">
Be sure to consult the various <a href="/guides/building/configure">configure options</a>, such as `--use-gcc-pipe`, `--use-xattr-ref`, and `-j<N>`
</div>
<h4> ...within Haiku</h4>

```sh
  cd generated.x86gcc2
  ../configure --target-arch x86_gcc2 --target-arch x86
```

<h4> ...from another OS</h4>

```sh
  cd generated.x86gcc2
  ../configure --build-cross-tools x86_gcc2 ../../buildtools/ --build-cross-tools x86
```

<h3>Jamming inside one of the generated folders</h3>
<div class="alert alert-info">
Be sure to consult the various <a href="/guides/building/jam">jam options</a>.
</div>
```sh
  cd generated.x86gcc2
  jam -q @nightly-raw
```

<p>
If you have set up multiple generated.* directories, the builds won't affect each other. In each generated.* directory you can only build the exact Haiku configuration it has been configured for.
</p>
