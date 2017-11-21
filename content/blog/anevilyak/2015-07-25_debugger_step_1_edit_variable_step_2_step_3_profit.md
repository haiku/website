+++
type = "blog"
author = "anevilyak"
title = "Debugger: Step 1: Edit variable, Step 2: ..., Step 3: Profit!"
date = "2015-07-25T04:16:17.000Z"
tags = ["debugger edit variable"]
+++

In a previous blog post, I had described the newly added ability to <a href="/blog/anevilyak/2015-05-26_debugger_editing_memory">edit raw memory</a>. While this makes a number of things possible that otherwise wouldn't be, it generally isn't the most convenient approach for the more general case one runs into over the course of debugging. As of hrev49449, some new enhancements have been introduced that should make life much simpler in many cases.

<!--more-->

Suppose the debugger is stopped in a particular function containing a for loop, where a breakpoint is set allowing each pass of it to be run. Suddenly, after running a pass, the results yield unexpected values and/or behavior that needs to be analyzed, but the only way to do so would be to repeat that pass. Normally, this would require restarting the program or otherwise exiting the function and re-entering it via some triggered way, which depending on circumstances may not easily be possible. It would be nice if, alternatively, one could simply edit the value of the loop counter to repeat said pass. This can now be done by either double clicking the variable in question, or right clicking it and choosing "Edit". Doing so for an integer will bring up a window like the following:

<img src="/files/edit_window.png" />

From here, one can input the desired new value, pick save, and memory in the target program will be updated accordingly. This can also be useful if one wants to try stepping through e.g. a code path that would normally only be hit if an error occurs, by editing the returned error code of a function to force an error.

Editing is also supported for floating point values, as well as more restricted types such as enums or booleans. The latter will bring up a slightly different type of editor though, which automatically lets one only choose the relevant values specified for that type:

<img src="/files/edit_window_picker.png" />

This completes the missing pieces mentioned in my previous linked post, and I hope will make the life of our OS and app developers at least a little bit easier. Correspondingly, the <a href="/files/DebuggerReferenceManual.pdf">reference manual</a> has been updated to include these new features. As always, feedback, comments, suggestions for improvements, etc. are welcome!
