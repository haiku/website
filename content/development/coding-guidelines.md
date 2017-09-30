+++
type = "article"
title = "Coding Guidelines"
date = "2009-09-11T06:48:52.000Z"
tags = []
+++

<style type="text/css">
div.content {
  tab-size: 4;
  -moz-tab-size: 4;
}
</style>

The document below outlines our code style guidelines. If you have suggestions for things that should be clarified better, etc. please [let us know](/contact "contact form"). Please _don't_ send us suggestions of the kind "I like this indenting style better, could we switch?".

<div class="alert alert-warning">The information in the document below is <b>extremely</b> important. If you will be contributing code or patches to Haiku, you will need to strictly follow the code style guidelines. Code which doesn't follow the guidelines below will <b>not</b> be accepted.</div>

Some code doesn't match our guidelines in some places, this is mostly due to it being written before the guidelines were defined. Assistance with cleaning up incorrect code is very welcome as long as you notate in the commit that there are "no functional changes" in this patch (don't bury code changes in style fixes).

With a continuous stream of external contributions and patches we would like the Haiku code base to remain clean, uniform, and easy to read and maintain.

### General

Make your code not stick out — make it consistent with the rest of the code you are contributing to. You will see this rule stressed over and over throughout the guidelines and when submitting patches.

### Indenting and whitespace

*   **Set your editor to 4 spaces per tab.** (_This is the standard used for the line-limit and for alignment [e.g. in class definitions], but if you aren't doing either of these things you can set your editor to whatever you want._)
*   A line must not have more than 80 columns; when wrapping a line, you usually indent one extra tab, but that can get more depending on the contents.
*   Use tabs to indent blocks.
*   Lines that need broken up due to length need to have one additional indention.
*   Functions/classes in namespaces are not indented.
*   In general you use one tab per expression level, see the examples below.

First, let's use some examples to illustrate the main formatting conventions:

```cpp
class Foo : public Bar {
public:
                                Foo(int32);
    virtual                     ~Foo();

    virtual void                SomeFunction(SomeType* argument);

    // indent long argument lists by a tab:
    virtual const char*         FunctionLotsOfArguments(const char* name,
                                    const char* path, const char* user);

private:
            int32               _PrivateMethod();
    static  int32               _SomeStaticPrivateMethod();

    volatile int32              fMember;
        const char*             fPointerMember;
};

// The ':' always comes on its own line, initializers following

Foo::Foo(int32 param)
    :
    Bar(int32* param),
    fMember(param),
    fPointerMember(NULL)
{
    ...
}

/*! Function descriptions are using doxygen style. Please note, this is not
    a place for end-user documentation, but for documentation that helps
    understanding the code, and using the functions correctly.
*/
template const T*
Foo::Bar(const char* bar1, T bar2)
{
    ...
}
```

```cpp
static int32
my_static_function()
{
	return 42;
}
```

```cpp
if (someCondition) {
	DoSomething();
		// Comments that only affect a single line are usually
		// written after it, and are indented by a single tab
	DoSomethingElse();
} else if (someOtherCondition) {
	DoSomethingElse();
	DoSomething();
}

if (someVeryVeryLongConditionThatBarelyFitsOnALine
	&& someOtherCondition) {
	// && operator on the beginning of the next line,
	// indented by a tab
	...
}

if (someVeryVeryLongConditionThatBarelyFitsOnALine
	&& (someVeryLongNestedConditionPart1
		|| someVeryLongNestedConditionPart2)
	&& lastPartOfSomeVeryVeryLongCondition
		!= 0) {
	// Indent one tab per expression level
	...
}

if (fMemberPointer->VeryLongFunctionCall(uint32 argument1,
		uint32 argument2, uint32 argument3) != NULL
	&& someOtherCondition) {
	// Function call parenthesis count as an expression
	// level thus the additional tab on the second line.
	...

	localVariable = AnotherLongFunction(uint32 argument1,
		uint32 argument2, uint32 argument3);
		// For this simple assignment though
		// an additional tab wouldn't help readability.

	anotherVariable = fSomeUselessRGBColor.alpha
		* (fSomeUselessRGBColor.red + fSomeUselessRGBColor.green
			+ fSomeUselessRGBColor.green + fOffset.blue)
		/ 3 + fBrightness;
		// This one spans more than two lines, we add
		// a tab to distinguish the expression level
		// in parenthesis.
}

for (int32 index = 0; index < count; index++) {
	DoSomething(index);
	DoSomethingElse(index);
}

// Omit braces for single line statements, place statement on a new line
// (but always use braces around multi-line statements)

if (condition)
	DoOneThingOnly(index);

for (int32 index = 0; index < count; index++)
	DoOneThingOnly(index);

// switch statement formatting

switch (condition) {
	case label1:
		DoSomething();
		break;

	case label2:
	{
		// need extra curly brackets here because of count
		// declaration
		int32 count;
		...
		DoSomething();
		break;
	}
}

...
	CallingSomeFunction(firstArgument * 2 + someMoreStuff,
		secondArgument, thirdArgument);
		// Indent long argument lists by a tab
...

	const rgb_color kNeonBlue = {10, 10, 50, 255};
```

### Misc. formatting

*   Put exactly two blank lines between functions.
*   Include a newline at every file end.

### Identifiers

*   Use self-describing well chosen identifiers whenever possible. Avoid identifiers such as `r` (hard to search for), `aMessage`, `theView`, `MyDraw` (who's draw?). Avoid identifier pairs such as `ProcessMessage` and `DoProcessMessage`, `AddTasks` and `AddTasks1`. Use names such as `rect`, `message`, `invokeMessage`, `view`, `targetView`, `DrawBorder`, `ProcessMessage`, and `ProcessMessageInternals` or `ProcessMessageDetails`, etc.
*   Classes, structs, type names, namespaces and function names start with uppercase letters and use InterCapsFormatting (no underlines).
*   Variables start with lowercase letters and use interCapsFormatting.
*   Member variables start with `f` like so:

```cpp
int32 fMemberVariable;
```

*   Constants start with a k like so:

```cpp
const uint32 kOpenFile = 'open';
```

<dl>

<dd>(note that this is different from the standard Be API constant names)</dd>

</dl>

*   Global variables are prefixed with a `g`, static variables with an `s` using the same scheme as above.
*   Private methods are prefixed with an underscore.

### Variable declarations

*   Declare variables as local in scope where possible, avoid declaring all variables at the top of a function like you have to do in C. The advantages here are it is easier to make sure variables are properly initialized and small code snippets are easier to copy-paste around.
*   Use descriptive names, avoid reusing a single temporary variable for different purposes.
*   Use full names such as `message` over abbreviations such as `msg`. Use `rect`, `frame`, `bounds` over `r`, `menuItem` over `mi`.

### Use Haiku-defined APIs, types, etc.

*   Prefer using an Haiku API utility call over "rolling your own".
*   Prefer using BObjectList over BList. BObjectList provides type-safety, optional item ownership and is designed such that additional template instantiations will not grow the code considerably.
*   Prefer BString over malloc, strdup, free, etc. for string operations.
*   Prefer BString's `<<` operators and SetToFormat() over fixed size buffers and sprintf.
*   Prefer using types defined in SupportDefs.h such as int32, uint32, over int, long, etc. Use status_t over int, int32 where errors are returned. Use off_t over int64 where appropriate.

### Comments

*   Comment your code properly.
*   Prefer C++ style comments.
*   Comment properly but not excessively. (some examples of excessive commenting:)

```cpp
	...
	index++; // increment the index
	...

	...
	/* InitProgress
	 *
	 */
	void
	InitProgress(int param1)
	{
	...
```

*   Prefer commenting over and under the commented line (over when a comment relates to a chunk of code, under and indented by a tab when it relates to one specific line.

```cpp
	// the trash window needs to display a union of all the
	// trash folders from all the mounted volumes
	// (comment about a block of code)
	BVolumeRoster volumeRoster;
	volumeRoster.Rewind();
	BVolume volume;
	while (volumeRoster.GetNextVolume(&volume) == B_OK) {
		if (!volume.IsPersistent())
			continue;
		...
	}
```

```cpp
	...
	BPoseView::WatchNewNode(&itemNode,watchMask, lock.Target());
		// have to node monitor ahead of time because
		// Model will cache up the file type and preferred
		// app (comment about the above line)
```

*   Avoid comments on the same line that create long lines (prefer comments on a separate line in general):

```cpp
	...
	if (this < is && a < very && long != condition) { // ...
```

```cpp
	...
	if (this < is && a < very && long != condition) {
		// this comment is about the long condition
		// above and is much easier to read!
	...
```

*   Do not annotate your comments with your name or initials — when your patch gets submitted, Git will have your name and email in the log. Anyone can identify your code that way.
*   Avoid expressing your sentiments in comments, do not include comments like this:

```cpp
	// this is a hack!
```

<dl>

<dd>Instead explain why you consider the respective code a hack:</dd>

</dl>

```cpp
	// the following code is fragile because it doesn't
	// handle overflows properly
```

### License and Copyright

*   The **preferred** format for source file copyright and license notices is:

```cpp
/*
 * Copyright 2004-2007 Haiku, Inc. All rights reserved.
 * Distributed under the terms of the MIT License.
 *
 * Authors:
 *		Jonathan Smith, optional@email
 *		Developer Name, optional@email
 */
```

<dl>

<dd>In case everything is copyrighted to "Haiku, Inc." and authors are listed in lexicographic order by last name.</dd>

</dl>

*   **Public headers** should always be copyrighted to "Haiku, Inc." without listing any authors.

*   In case you prefer to keep the copyright to yourself, the license header should look like the following; multiple authors can be listed like in this example:

```cpp
/*
 * Copyright 2007 Jane Doe, optional@email
 * Copyright 2003-2005 Some Developer, optional@email
 * All rights reserved. Distributed under the terms of the MIT License.
 */
```

*   In some cases you might have to extend the copyright list of an existing file. Instead of using the alternative scheme like in the latter example the **preferred** method is to add a copyright line for "Haiku, Inc." and then list authors like in the first example.
*   In header files, there is no blank line between the license text and the header guard.
*   After the copyright header (including the header guard in header files), there are exactly two blank lines before the rest contents.

### Dead code and Debugging code

*   Do not leave dead, commented, or `#if 0`'ed code behind just because you are not sure about your contribution. Your change should be top quality to begin with, improving the code you are replacing. Should there be a reason to back your change out or used for a reference, this can be done using the source control tools.
*   Do not leave simple commented out debugging printfs behind. These days bdb does a great job eliminating the need for most debugging printfs. Use `ASSERT`s for debugging purposes. Include debugging code in `#if DEBUG` blocks. Make sure debugging code compiles (make sure your change doesn't break existing debugging code, if it does, fix the debugging code as a part of the change) without warnings and stays correct. Use all the other tools from `Debug.h` to your advantage.

### Miscellaneous

*   Use C++ casts (`dynamic_cast`, `static_cast`, `const_cast`, `reinterpret_cast`) over C casts.
*   Use `const` properly.
*   Prefer stack-allocated objects over heap-allocated ones whenever possible.
*   Use `AutoLock`, etc. for all locking and other resource acquisition, don't use `Lock()` and `Unlock()` on a `BLocker` directly. Don't use `BAutolock`, use the `AutoLock` template instead.
*   Don't assign in `if` and `while` statements:

```cpp
	// wrong
	if ((err = entry.GetRef(&ref)) == B_OK)
		...
```

*   Avoid using assignments in `while` loops:

```cpp
	// wrong
	BMenuItem* item;
	int32 index = 0;
	while ((item = ItemAt(index++)) != NULL) {
		...
```

<dl>

<dd>Instead use the wordier but just as efficient `for`:</dd>

</dl>

```cpp
	for (int32 index = 0; ; index++) {
		BMenuItem* item = ItemAt(index);
		if (item == NULL)
			break;
		...
```

*   Don't check for `NULL` before `delete` and `free`:

```cpp
	// wrong
	if (fIcon != NULL)
		delete fIcon;

	// wrong
	if (fIconBuffer != NULL)
		free(fIconBuffer);
```

*   Don't put parentheses around return values:

```cpp
	// wrong
	return (fList.ItemAt(index));
```

*   Don't put redundant parentheses in `if` statements:

```cpp
	// wrong
	if ((a == 3) && (b != 4))
		...
```

*   However, use parenthesis when checking bitmasks, and always use this form:

```cpp
	if ((a & 3) != 0 && (b & 4) == 0)
		...

	// wrong - C/C++ operator precedence works differently
	if (a & 3 && xyz)
		...
```

*   Always use boolean conditions, instead of pointer/integer logic:

```cpp
	// This is how it should look like:
	if (pointer != NULL || anotherPointer == NULL || intValue != 0)
		...

int32 value;
bool doThings = (value != 0);

	// wrong - don't use the following style
	if (pointer || !anotherPointer || intValue)
		...

int32 value;
bool doThings = value;
```

*   Use inlines sparingly.
*   Use constructor initializer lists over initializing members inside the constructor body
*   When you return in an `if`-block, don't use `else` — it's superfluous, and reduces the clarity of the code:

```cpp
	// This is how it should look like -- notice, no 'else':
	if (something) {
		...
		return true;
	}
	if (somethingElse) {
		...
		return true;
	}
	return false;

	// Wrong - don't use code like below:
	if (something) {
		...
		return true;
	} else if (somethingElse) {
		...
		return true;
	} else
		return false;
```

*   Use the built-in `false`/`true` instead of the `FALSE`/`TRUE` `#defines`.
*   Alphabetize `#include` statements, group `"includes"` and `<includes></includes>` separately.
*   While the header that belongs to a source file should be included first to ensure self containment, all other headers are specified from most general (POSIX) to most specific (local directory). In order to alphabetize them, please group them by API origin, like (but without the comments, of course):

```cpp
#include "ThisClass.h"

// POSIX API headers
#include <stdio.h>
#include <string.h>

// Haiku API headers
#include <file.h>
#include <os.h>

#include <privateheader.h>

#include "OtherLocalHeaders.h"
```

*   Don't use `<pathname/include.h>` if they aren't necessary; (like for `<sys/stat.h>`).
*   Use `NULL` instead of `0` for pointers.
*   Avoid gotos.
*   Don't use constructor call syntax for initializing pointers, etc. to `NULL` like this:

```cpp
	// wrong
	BView* view(NULL);
```

<dl>

<dd>Use the more traditional assignment:</dd>

</dl>

```cpp
	BView* view = NULL;
```

<dl>

<dd>(Don't confuse this with the appropriate use of constructor calls for stack based objects and objects allocated with new).</dd>

</dl>

*   When comparing a function call result/variable with a constant, don't place the constant on the left side of the comparison like this:

```cpp
	if (B_OK == file.InitCheck()) // don't use this style
		...
```

<dl>

<dd>Programmers use this to make sure they do not end up assigning instead of comparing. The notation is a bit unusual though, placing the more important function call/variable to the less prominent position on the right. Haiku does not use this notation, a mistaken assignment will get caught by a warning.</dd>

</dl>

*   Prefer C-style headers (string.h, stdlib.h) over their C++ equivalents (cstring, cstdlib): Haiku's headers are generally C++ safe, and don't need this workaround.

### Style Checker Tools

While the following tools still miss some issues and sometimes report false positives, they are most of the time correct and help to spot the most common issues. Those are still in development and improvements are of course welcomed.

*   checkstyle.py is a stand-alone python program (found in the Haiku source tree in src/tools/checkstyle/). It reports style problems on the standard output and also generates an easy to read highlighted html report. Example:

    <pre>python src/tools/checkstyle/checkstyle.py src/apps/deskcalc</pre>

    (supposing you're at the root of the haiku tree) this will check the src/apps/deskcalc directory recursively. Try the --help option to see the usage.

*   [checkstyle.vim](https://cgit.haiku-os.org/haiku/plain/3rdparty/pulkomandy/checkstyle.vim) is a script that integrates with the Vim text editor.
