+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: Mid-term Report and Third Quarter Goals"
date = "2011-07-09T23:45:02.000Z"
tags = ["python", "perl", "gsoc2011", "api"]
+++

The following objects have at least partial bindings:

<table>
<tr>
<td>From the Application Kit:</td>
<td>From the Interface Kit:</td>
<td>From the Support Kit:</td>
</tr>
<tr>
<td>Application
Clipboard
Cursor
Handler
Invoker
Looper
Message</td>
<td>Alert
Box
Button
Control
Font
Menu
MenuBar
MenuField
MenuItem
Point
PopUpMenu
Rect
Screen
StringView
TextControl
TextView
View
Window</td>
<td>Archivable</td>
</tr>
</table>

At the moment, some of the classes are not very usable; they're necessary because other objects inherit from them. They will later be expanded to allow creation of custom objects based on them, so users could subclass a Looper or a View the same way they can now subclass Application and Window.

Python has a minimal test program that uses Application, Window, and Button, but the other objects have not been tested. It would be helpful if interested Python programmers could start coding (and thereby discovering bugs). In addition, I get a large number of warnings about multi-character constants when compiling. Despite following the instructions in the documentation, I cannot get the installer to pass options to the compiler to turn these off. There are also a few other warnings I'm working on eliminating, but the extensions successfully compile and the test program works.

For the time being, the Python objects are all named Haiku.<code>Object</code> instead of Haiku.<code>Kit</code>.<code>Object</code>. This allows me to split up the kits into different extensions; since an extension does not know what kit a foreign object is defined in, the kit name cannot be part of the object name. Since this naming scheme is apparently not good Python practice, I am still looking into alternatives; currently I am considering either placing everything into a single extension or adding some data to my definition files that lets an extension know what kit/extension a foreign object belongs to.

Perl has the minimal test program and it also has a slightly more complex test program (a small Person viewer app). There are also a few compiler warnings I'm still working on eliminating.

The bindings can be found at http://dev.osdrawer.net/projects/perl-haiku-kits. The downloadable files are under "Files"; there are also Forums and a Wiki, and (under "Issues") a bug tracker. Anyone can download the files and look at the content, but if you want to report bugs, post to the forums, or edit the wiki, you need to be added to the project. Interested users with an OsDrawer.net account can email me or post a comment here, and I will add you as a member of the project.

There may be some trial and error involved in adding members; OsDrawer.net has defined some roles for members of a project, but I can't find any documentation on what permissions each role has. There is a role called "Reporter" that I assume lets the user post new bugs, and there's one called "Wiki editor" that's self-explanatory. But there's no role for Forum poster, so I assume one or more of the other roles has that permission included. But I don't know which one(s).

Okay, let's take a look at my second-quarter goals:

- Bring the Python bindings to minimal functionality (<b>Done</b>)
- Write a minimal Python test program (<b>Done</b>)
- Continue to test threading issues (<b>See below</b>)
- Expand preliminary bindings and add new bindings (<b>Done</b>)
- Write test programs for the bindings (<b>Partially done</b>)
- Write documentation for the bindings (<b>See below</b>)
- If there is sufficient time, select a third target language (<b>Insufficient time</b>)

<b>Threading:</b> I have found several issues I thought might be threading issues, but upon closer examination, they were not. I did find one genuine threading issue - but it was because I forgot to lock a window before updating data.

<b>Documentation:</b> I have written some documentation and I am working on programmatically adding it to the bindings. Python has fields in the underlying C++ structures to add documentation, and Perl allows documentation to be mixed in with the code.

Now for my upcoming goals. In general, during the next quarter I will continue to keep an eye out for threading issues, add new bindings, and fix reported bugs. There are also a few more specific things I want to work on:

There are a number of methods that haven't been implemented yet because they have structs as input or output, and the bindings do not handle structs yet. It should not be too difficult to map these to appropriate data types in the target language (Perl hash, Python dictionary).

I'm not sure what to do about globals like <code>be_app</code> and <code>be_clipboard</code>; on the one hand, they could be treated like constants and restricted to a particular namespace, in order to not pollute the global namespace. This is the way I'm leaning right now. On the other hand, there are relatively few of them, and so it would probably not result in a great deal of pollution if I were to put them in the global namespace.

Several of the C++ objects have overloaded operators. I would like to expand the bindings to support these overloaded operators. I'm not sure how much time I want to spend on this issue right now, though. It depends on how much users want this feature.

- Continue to test threading issues
- Expand existing bindings and add new bindings
- Fix bugs reported by users
- Enable structs
- Expose globals
- Add documentation
- Write additional and more complex test programs
- If there is sufficient time, select a third target language
- If there is sufficient time and user interest, work on overloaded operators