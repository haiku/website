+++
type = "blog"
author = "anevilyak"
title = "'Tis the season for debugging"
date = "2014-12-15T14:05:16.000Z"
tags = ["debugger", "expressions", "syntax highlighting"]
+++

Since the last <a href="/blog/anevilyak/2014-10-30_code_sprint_2014_debugger">time</a>, I've put a bit more work into improving the expression evaluator that was started as part of the sprint. Since some of its new capabilities are likely to be useful to others, and might not necessarily be obvious from simply reading the commit list, I thought I'd elaborate on them a bit here.
<!--more-->
<h3>Expression improvements</h3>

Since the last time, the expression parser has grown several new capabilities. We are now able to infer the types of operands, and as such one no longer needs to set the type that one wishes the value to be returned as. A further consequence is that expressions can now return arbitrarily typed values as results, not just simple numeric values. This means that, for instance, an expression can return a data member of a class, and if that member is itself an object or other more complex type, it can then be expanded to look at its internal values.

In conjunction with the above, the evaluator can now recognize typecasts. This brings quite a few more interesting possibilities to the table, especially when debugging more complicated issues. Let's say that a bug has led one to need to inspect a block of memory, and within that block one can see some data that looks like it might belong to a particular type of object. One can now set up an expression that asks to treat that memory address as such an object, and the returned node will then attempt to read that area of memory as if a class instance was there, ergo try to map internal members to that region of memory and such, which is likely a much more intuitive way of looking at the data than trying to interpret raw binary:

<img src="/files/address_expression_1.png" />

<h3>Watch expressions</h3>

In the variables view, one can now right click to add what we refer to as a watch expression. This is essentially an expression that's treated as if it's a local variable belonging to the currently active function, and as such gets re-evaluated with each step. This can obviously be used for a number of different purposes. A simple example is if the value of one particular data member of the current class is of interest, you can use an expression to keep an eye on it without having to expand the entire (potentially large) subtree of 'this'. Another use of this capability is if one has an object elsewhere in the application/library in question that's of interest to look at, but isn't referenced via a variable in the scope of any of the frames of the current call stack:

<a href="/files/expression_variable_0.png"><img width="80%" height="80%" src="/files/expression_variable_0.png" /></a>

 As long as the address is known, you can set up an expression using the address and type of that object in order to keep it visible in the current frame. This screenshot also illustrates a smaller, but still useful feature that's been added since the last time, namely that the variables view will now highlight values that have changed since the last step. This is handy for seeing what effect a statement had at a quick glance, or even spotting when a statement unexpectedly changes a value that wasn't expected to change. It should be noted that this only tracks variables that are currently visible though, i.e. nodes that are collapsed under a subtree will not be highlighted.

A further minor tweak since the last time is that breakpoints that have a condition associated with them are now drawn in a different color from regular breakpoints, in order to make that distinction clear at a glance. Furthermore, one can now right click on a breakpoint marker in order to reconfigure it directly, rather than having to go through the breakpoint manager tab to do so.

<h3>Oh, and one more thing</h3>

Last but not least, the additional work done on the evaluator has also allowed for parts of it to be reused in order to implement a syntax highlighter, as can be seen below:

<a href="/files/syntax.png"><img width="90%" height="90%" src="/files/syntax.png" /></a>

While this doesn't in and of itself present any new debugging capabilities, it does make the code that's currently visible a bit easier to look at and quickly find things in, as is the case in syntax highlighting code editors/IDEs elsewhere. The only (known) missing piece is that it doesn't yet recognize type names, since doing so efficiently enough for our needs here will require some additional work in the DWARF subsystem. This will be worked on in time though, as will the remaining missing pieces of expression parsing. Until then, happy debugging!