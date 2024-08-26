+++
type = "blog"
title = "Debugging when the Debugger doesn't work right"
author = "Zardshard"
date = "2024-08-26 8:54:30-04:00"
tags = ["tutorials", "debugger"]
+++

Well, while working on HaikuWebKit, I've had to wrangle with the Debugger a lot. As you may know, Debugger, is, well, buggy. This blog post documents the workarounds I've developed for two bugs: Debugger failing to resolve a function name, and Debugger's disassembly of a function being incorrect.

But, first off, the GDB port got updated in a recent [GSoC project](https://www.haiku-os.org/blog/trungnt2910/2024-08-18_gsoc_2024_debugging_final_report), so give it a try! It may work better than Debugger for your problem. If you're new to GDB, referencing a cheatsheet, such as [this one](https://darkdust.net/files/GDB%20Cheat%20Sheet.pdf), should make things easy.

With that, let's get started with the first bug:

Dealing with unresolved function names
--------------------------------------

![Screenshot of Debugger showing an unresolved function name.](/files/blog/zardshard/Debugger/undecoded_function_name.png)

Sometimes the Debugger fails to figure out the function (aka symbol) name. In the image above, Debugger displays the name of the executable or library from which the symbol comes from and the offset into the library.

Even though Debugger hasn't been able to get the name, you probably can manually. Using `addr2line` usually works to resolve the problem. Run `addr2line -f -e <path to file> <address in hexadecimal>`. The result will look something like

```
_ZZN3IPC10Connection22enqueueIncomingMessageEN3WTF9UniqueRefINS_7DecoderEEEENKUlvE0_clEv
/Storage/haikuwebkit/Source/WebKit/Platform/IPC/Connection.cpp:1289
```

Dealing with an incorrect/missing disassembly
----------------------------------------------

While working on HaikuWebKit, I've encountered plenty of times where the Debugger fails to show a disassembly. Or else the disassembly is wrong. There are two methods of working around it:

### Using objdump

<!-- This yields the best disassembly, since `call` and `jmp` instructions actually show the function that will be jumped to. However, this only works if you know the mangled name, which is difficult to find out since Debugger demangles all of the names before displaying them. -->

The only way I know of mangling demangled names is to run `nm <library or executable with function> | grep <search string>`. If you manage to figure out what the mangled function name is, you can then run

```
objdump --disassemble=<symbol> <executable>
```

### Using udcli

This is the fastest way of creating a disassembly, especially for large executables. However, it cannot tell you the function names that are being called which can make interpreting the disassembly harder.

First, switch from the variables tab to the registers tab. The `rip` register contains the address of the instruction that the CPU is going to execute next. Right-click it and press inspect. You will now see the machine code that the CPU will inspect.

![Screenshot of Debugger's inspector with around 80 bytes selected starting at the highlighted byte.](/files/blog/zardshard/Debugger/inspector.png)

Select a good bit of memory, starting from the highlighted byte. The more memory you select, the more disassembled instructions you will get. Copy this into your clipboard. Finally, run `udcli -64 -x`, paste in the copied memory, and press enter. You should get something like

```
0000000000000000 e8463ffeff       call 0xfffffffffffe3f4b
0000000000000005 4885c0           test rax, rax
0000000000000008 7431             jz 0x3b
000000000000000a 4889c3           mov rbx, rax
000000000000000d 498b0424         mov rax, [r12]
0000000000000011 4c89e7           mov rdi, r12
0000000000000014 8b55ec           mov edx, [rbp-0x14]
0000000000000017 4889de           mov rsi, rbx
000000000000001a ff90f8000000     call qword [rax+0xf8]
0000000000000020 4889df           mov rdi, rbx
0000000000000023 4989c4           mov r12, rax
0000000000000026 e8d868feff       call 0xfffffffffffe6903
000000000000002b 4883c410         add rsp, 0x10
000000000000002f 4c89e0           mov rax, r12
0000000000000032 5b               pop rbx
```

Note that the addresses shown for the `call` and `jmp` instructions will be incorrect. Specifying the `-o <rip register value>` parameter may help.

<div class="alert alert-warning">
There may not be enough bytes available for udcli to decode the final instruction of the bytes you pasted in. If so, udcli will keep the partial instruction in memory and wait for the final few bytes. If you paste in more machine code from an unrelated section of code, the instruction will be completed incorrectly, and you could get nonsense as an output. One way of preventing this is to restart udcli before pasting in more instructions.
</div>
