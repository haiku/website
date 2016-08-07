+++
type = "blog"
author = "anevilyak"
title = "Debugger: Editing Memory"
date = "2015-05-27T03:33:40.000Z"
tags = ["debugger", "memory", "editing"]
+++

As those who make regular use of it probably already know, one of the features of Haiku's integrated debugger is the ability to inspect the contents of arbitrary (mapped) locations in the target team's address space. This can be handy in various instances, such as when trying to track down bugs that are likely due to a piece of code overwriting part of another data structure, since the data that's been written to memory might contain some pattern or even a familiar string that might hint at the culprit.
<!--break-->
Up until recently, however, looking is all that one has been able to do. There are other circumstances in which one might actually want to modify the data for various reasons. The inspector is now able to do precisely that.

<img src="https://www.haiku-os.org/files/inspector1.png"/>

Shown above is a block of memory in the target team that contains, among other things, the arguments and environment variables passed to the program when starting. The inspector window now has an indicator to show whether the current block is editable or not (some regions of memory are not, since, for instance, executable images are mapped into memory with read-only permissions). If the block is editable, as is the case for the one above, one can now click the accompanying Edit button to switch the inspector over into an editor mode. This currently takes the form of a hex editor similar to the one that can be found in applications such as Diskprobe. Any changes made will also be highlighted:

<img src="https://www.haiku-os.org/files/inspector2.png"/>

After making the desired edits, the Commit button allows you to write said changes back to the target team (or alternatively, revert back to the state the block was in before edits were started). Any subsequent steps through the code will then see that region of memory in its new state. This feature can also be used in another way, namely to edit the values of variables. The context menu that's presented when one right clicks a variable contains, among other things, an Inspect option, which takes you to an inspector window targetted at the corresponding location in memory. From there, the same edits as before can be used to update the value of the variable, e.g. to force an error at a particular location in order to step through and test how some code responds to such a condition.

While this makes editing variables possible, this isn't the friendliest way to handle the latter case though, since e.g. changing things like 32-bit integers would require one to know how they're represented by the target architecture, and editing strings in hex is not very fun or intuitive. The eventual goal will be to allow editing directly from within the variables view, in a manner that more naturally corresponds to the type of the variable, (i.e. booleans would present a choice of true/false, integers or strings could be typed in their normal format, etc.). The debugger would then take care of ensuring that the correct/appropriate edits are made behind the scenes. However, this carries with it quite a bit more complexity, so it will be a while before that capability is ready.