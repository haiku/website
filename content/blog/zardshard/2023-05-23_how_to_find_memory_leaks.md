+++
type = "blog"
title = "How to find memory leaks"
author = "Zardshard"
date = "2023-05-23 10:44:38-04:00"
tags = ["malloc_debug", "libroot_debug.so", "heap", "memory", "debugging"]
+++

In 2010-2011, mmlr created a new memory allocator: the guarded heap memory allocator. This allocator helps detect various bugs such as writing past the end of allocated memory, reading uninitialized memory, and freeing freed memory. These uses are detailed in ["Using malloc_debug to Find Memory Related Bugs"](https://www.haiku-os.org/blog/mmlr/2010-02-08_using_malloc_debug_find_memory_related_bugs/). Later, in 2015, mmlr had a new project: updating the memory allocator to be able to report memory leaks.

To use this feature, start by loading `libroot_debug.so` instead of `libroot.so`. This can be done using the `LD_PRELOAD` environment variable. Once loaded, the `MALLOC_DEBUG` environment variable can be used to set various options. PulkoMandy added some notes to the end of ["Using malloc_debug to Find Memory Related Bugs"](https://www.haiku-os.org/blog/mmlr/2010-02-08_using_malloc_debug_find_memory_related_bugs/) describing what options are available. Relevant to finding memory leaks are enabling the guarded heap with `g`, dumping memory that is still allocated on exit (most of which should have been freed before the program exited and are memory leaks) with `e`, and telling it to show a stack trace with up to 50 items with `s50`. Putting it all together, the command to run a program with memory leak detection is `LD_PRELOAD=libroot_debug.so MALLOC_DEBUG=ges50 program`.

The output of this command will include many entries that look like

```
allocation: base: 0x103cf485f60; size: 160; thread: 3130; alignment: 16
        <libroot.so> _Znwm + 0x20
        <libroot.so> _ZnwmRKSt9nothrow_t + 0x9
        <libbe.so> _ZN5BMenu7AddItemEPS_ + 0x27
        <libbe.so> _ZN10BMenuField8_AddMenuEP5BMenu + 0x182
        <libbe.so> _ZN10BMenuField12_InitMenuBarEP5BMenu5BRectb + 0x1ac
        <libbe.so> _ZN10BMenuFieldC2E5BRectPKcS2_P5BMenujj + 0xcc
        <libtracker.so> _ZN8BPrivate10TFilePanel4InitEPK8BMessage + 0x432
        <libtracker.so> _ZN8BPrivate10TFilePanelC2E15file_panel_modeP10BMessengerPK6BEntryjbP8BMessageP10BRefFilterj11window_look11window_feelb + 0x977
        <libtracker.so> _ZN10BFilePanelC2E15file_panel_modeP10BMessengerPK9entry_refjbP8BMessageP10BRefFilterbb + 0xe3
        <_APP_> _ZN9SavePanelC1EPKcP10BMessengerP9entry_refjbP8BMessageP10BRefFilterbb + 0x99
        <_APP_> _ZN13IconEditorAppC1Ev + 0x1f6
        <_APP_> main + 0x27
        <_APP_> _start + 0x3f
        0xf821926ae5 (lookup failed: Invalid Argument)
        0x7ffefb24d258 (lookup failed: Invalid Argument)
```

There are two things to note about the output as shown. First, the names shown in the backtrace, such as `_ZN9BMenuItemC1EPKcP8BMessagecj`, are quite messy and are not what the functions are called in the C++ source file. Secondly, not all of the allocations remaining on program exit are bugs.

Both of these concerns can be addressed by using the `leak_analyser.sh` script. This program comes with Haiku by default and can be run directly from the command line with no special setup. First, put the output into a file by running `LD_PRELOAD=libroot_debug.so MALLOC_DEBUG=ges50 program > leaks`. Then, run `leak_analyser.sh leaks`. This will decode the function names and filter out allocations that are normal for a program to exit with. The result will look like

```
allocation: base: 0x103cf485f60; size: 160; thread: 3130; alignment: 16
        <libroot.so> operator new(unsigned long) + 0x20
        <libroot.so> operator new(unsigned long, std::nothrow_t const&) + 0x9
        <libbe.so> BMenu::AddItem(BMenu*) + 0x27
        <libbe.so> BMenuField::_AddMenu(BMenu*) + 0x182
        <libbe.so> BMenuField::_InitMenuBar(BMenu*, BRect, bool) + 0x1ac
        <libbe.so> BMenuField::BMenuField(BRect, char const*, char const*, BMenu*, unsigned int, unsigned int) + 0xcc
        <libtracker.so> BPrivate::TFilePanel::Init(BMessage const*) + 0x432
        <libtracker.so> BPrivate::TFilePanel::TFilePanel(file_panel_mode, BMessenger*, BEntry const*, unsigned int, bool, BMessage*, BRefFilter*, unsigned int, window_look, window_feel, bool) + 0x977
        <libtracker.so> BFilePanel::BFilePanel(file_panel_mode, BMessenger*, entry_ref const*, unsigned int, bool, BMessage*, BRefFilter*, bool, bool) + 0xe3
        <_APP_> SavePanel::SavePanel(char const*, BMessenger*, entry_ref*, unsigned int, bool, BMessage*, BRefFilter*, bool, bool) + 0x99
        <_APP_> IconEditorApp::IconEditorApp() + 0x1f6
        <_APP_> main + 0x27
        <_APP_> _start + 0x3f
        0xf821926ae5 (lookup failed: Invalid Argument)
        0x7ffefb24d258 (lookup failed: Invalid Argument)
```

These, then, are two leaks accompanied by a stack trace giving directions to where in the code the memory was allocated. Unfortunately, these do not have line numbers associated with them. For example, `BMenuItem::SetLabel(char const*) + 0x4c` has a `+ 0x4c` instead of a line number. This is the offset to the assembly instruction immediately _after_ the assembly instruction in question.

The Debugger can be used to find what line of source code `BMenuItem::SetLabel(char const*) + 0x4c` is referring to. First, get the disassembly of the function in question. Second, add the offset (`0x4c` in this example) to the address of the first instruction in the function. Third, set a breakpoint to the instruction _before_ the instruction indicated by the offset. Finally, switch back to source code view. The line highlighted by the breakpoint is the line that called the next function in the stack trace or allocated the memory.
