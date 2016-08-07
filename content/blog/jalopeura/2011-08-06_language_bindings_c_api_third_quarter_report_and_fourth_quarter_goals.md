+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: Third Quarter Report and Fourth Quarter Goals"
date = "2011-08-06T08:10:42.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

The following classes are now mostly implemented; there are some methods that cannot be implemented yet because they require objects that are not yet implemented, but otherwise these classes are complete.

<table>
<tr>
<td>From the Application Kit:</td>
<td>From the Interface Kit:</td>
<td>From the Support Kit:</td>
</tr>
<tr>
<td>Application<br>
Clipboard<br>
Cursor<br>
Handler<br>
Invoker<br>
Looper<br>
Message</td>
<td>Alert<br>
Box<br>
Button<br>
CheckBox<br>
Control<br>
Font<br>
Menu<br>
ListItem<br>
ListView<br>
MenuBar<br>
MenuField<br>
MenuItem<br>
OutlineListView<br>
Point<br>
PopUpMenu<br>
RadioButton<br>
Rect<br>
Screen<br>
ScrollBar<br>
ScrollView<br>
SeparatorItem<br>
StringItem<br>
StringView<br>
TabView<br>
TextControl<br>
TextView<br>
View<br>
Window</td>
<td>Archivable<br>
Errors*</td>
</tr>
</table>

*<code>Errors</code> doesn't actually have any classes, it merely exposes a lot of constants to the target language.

My goals and results for the last quarter:
- Continue to test threading issues (<b>Done</b>)
- Expand existing bindings and add new bindings (<b>Done</b>)
- Fix bugs reported by users (<b>None reported</b>)
- Enable structs (<b>Done</b>)
- Expose globals (<b>Done</b>)
- Add documentation (<b>Partially done</b>)
- Write additional and more complex test programs (<b>Done</b>)
- If there is sufficient time, select a third target language (<b>Insufficient time</b>)
- If there is sufficient time and user interest, work on overloaded operators (<b>Done</b>)

No users have reported bugs yet, but I found several of my own, including a threading problem. Perl passes arguments and fetches results via a stack. The stack is maintained by the interpreter, which lives in the main thread. When multiple threads write to the stack at the same time, the arguments and return values can end up mixed. I solved it by calling <code>be_app->LockLooper()</code> before doing any stack manipulation and <code>be_app->UnlockLooper()</code> once I was done.

I didn't uncover this bug until I was writing a complex example program, with lots of events coming back from the system. I learned enough Python to write minimal test programs, but I don't have any complex examples in Python, so there may be hidden bugs in the Python bindings. (This particular bug won't be an issue though, because Python doesn't use a stack to pass values to and from functions.)

It would be a big help if interested users were to download the bindings and try them out, especially the Python bindings. The bindings can be downloaded from the files pages on the project site (http://dev.osdrawer.net/projects/perl-haiku-kits/files). (<b>Edit:</b> Removed erroneous '&gt;' from the end of the URL.)

While researching the best way to handle structs, I found a reference (http://www.parashift.com/c++-faq-lite/classes-and-objects.html#faq-7.8) which indicated that classes and structs are the same thing as far as the compiler is concerned. And some Haiku structs do in fact take constructors and methods. So since I already had a way to expose classes, I used the same method to expose structs.

I have some more partial documentation for the classes, and I have started on documentation for the generator itself.

There was no time to add additional target languages. I'd still like to, but I won't be able to fit it into GSoC.

During the rest of GSoC, I will be fixing bugs, writing documentation, and creating more code examples. I still have several groups of classes that I want to include, but I won't have time to implement them before GSoC ends. (Mostly these classes are layout-related, drawing-related, and query-related.)

Goals for the fourth quarter:
- Fix bugs reported by users
- Add documentation
- Write additional example programs and enhance existing ones
