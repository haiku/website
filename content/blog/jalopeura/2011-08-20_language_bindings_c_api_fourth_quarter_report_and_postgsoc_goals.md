+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: Fourth Quarter Report and Post-GSoC Goals"
date = "2011-08-20T15:56:50.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

The following classes have been implemented; some methods and functions have not been implemented due to dependencies on unimplemented classes, but the classes below are otherwise complete:

<table>
<tr>
<td>From the Application Kit:</td>
<td>From the Interface Kit:</td>
<td>From the Storage Kit:</td>
<td>From the Support Kit:</td>
</tr>
<tr>
<td>Application
Clipboard
Cursor
Handler
Invoker
Looper
Message
Messenger</td>
<td>Alert
Box
Button
CheckBox
ColorControl
Control
Font
Menu
ListItem
ListView
MenuBar
MenuField
MenuItem
OutlineListView
Picture
PictureButton
Point
Polygon
PopUpMenu
RadioButton
Rect
Screen
ScrollBar
ScrollView
SeparatorItem
Shape
Slider
StatusBar
StringItem
StringView
TabView
TextControl
TextView
View
Window</td>
<td>Entry
EntryList
FindDirectory*
Mime
MimeType
Node
NodeInfo
NodeMonitor*
Path
Query
Statable
Volume
VolumeRoster</td>
<td>Archivable
Beep*
Errors*
TypeConstants*</td>
</tr>
</table>

*These don't actually contains any classes, Errors and TypeConstants expose constants; Beep exposes functions; FindDirectory and NodeMonitor expose constants and functions.

The following classes were partially implemented, but had bugs that could not be resolved before the end of GSoC:

Bitmap
FilePanel
ChannelControl
ChannelSlider
ColumnListView
Gradient (and derived classes)
OptionControl
OptionPopUp

The following classes from the original timeline were not implemented:

Dragger
Shelf
Region
PrintJob

My goals for the fourth quarter were:

- Fix bugs reported by users (<b>None reported</b>)
- Add documentation (<b>Done</b>)
- Write additional example programs and enhance existing ones (<b>Done</b>)

The generator and interface language have been documented; the documentation on the classes themselves is still limited.

Post-GSoC goals:
- Add support for keyword-style entry
- Add support for functions as parameters if possible
- Add support for templates as parameters if possible
- Continue to add new bindings
- Fix bugs as they are discovered

I don't know how long it will take me to meet these goals; now that GSoC is over, I won't be able to spend as much time on this project.

The Python extensions have not been tested very well; there are two simple programs that test the basic functionality, and those work. In addition, work on the Perl test programs exposed a number of bugs that were due to mistakes in the definition files, which means that those particular bugs were fixed for Python as well. But there are very likely a large number of Python-specific bugs that will only come to light with more testing.

As always, the files are available via the project page: http://dev.osdrawer.net/projects/perl-haiku-kits/; as requested by jrabbit, the Python extension is also available via PyPI. The Perl extension should be available on CPAN soon; I'm waiting for approval of the namespace from the maintainers.

Note: To report bugs, attach a comment here or request to be added as a project member via OsDrawer.net so you can report bugs via the project site.
