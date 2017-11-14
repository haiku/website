+++
type = "blog"
title = "Scripting the GUI with 'hey'"
author = "humdinger"
date = "2017-11-05 08:16:58+01:00"
tags = ["haiku", "script", "hey"]
+++

Haiku's GUI is in principle entirely scriptable. You can change a window's position and size and manipulate pretty much every widget in it.
The tool to do this is `hey`. It sends BMessages to an application, thus emulating what happens if the user clicks on a menu, checkbox, or other widgets.

The seminal work on this application scripting is the [BeOS Application Scripting chapter of the BeOS Bible](http://www.birdhouse.org/beos/bible/bos/BeOS.scripting.PDF) by Chris Herborth. You should study that first and, if you're like me, will keep coming back to it every time you think about solving something via `hey`.

This blog isn't an introduction to scripting with hey, but more like a collection of useful hey-lines. It's intended to bring our GCI students up to speed, who have chosen the task to create hey-scripts to automate taking screenshots for the user guide.
Please comment, if you have more tips!

As example application, we have a look at the Time preferences.

![The Time preferences](https://www.haiku-os.org/files/blog/humdinger/time_prefs.png)

Moving and resizing a window
------------------------

You can get a window's size and position with:

    hey Time get Frame of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_RECT_TYPE) : BRect(163.0, 53.0, 649.0, 420.0)

The coordinates of the BRect are in the screen coordinates (left/top/right/bottom).

To set a new size/position:

    hey Tracker set Frame of Window 0 to "BRect(1329.0, 65.0, 1905.0, 968.0)"
    Reply BMessage(B_REPLY):
       "error" (B_INT32_TYPE) : 0 (0x00000000)

Don't be fooled, the "error" output of "0" is really a sign of success. You can avoid all junk output and limit it to the important essentials by adding the `-o` parameter. Makes for much easier scripting, too.

If you have a smaller resolution, you may want to adjust the screen coordinates accordingly.

As you can see, by forcing these absolute coordinates, the window layout isn't in any way restricted and can result in widgets being placed widely spaced in that new window frame.

Changing tabs
-------------

It's not as straight forward as expected... To change to the "Clock" tab:

    hey -o Time set Selection of View 0 of View 0 of Window 0 to 3

![The Clock tab](https://www.haiku-os.org/files/blog/humdinger/time_clock.png)

You can explore the hierarchy of an app's GUI by counting the views in the window, getting their "InternalName" and looking at the output of the various "getsuites":

    hey Time count View of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_INT32_TYPE) : 3 (0x00000003)


    hey Time get InternalName of View 0 of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_STRING_TYPE) : "baseView"
       "error" (B_INT32_TYPE) : 0 (0x00000000)

    hey Time get InternalName of View 0 of View 0 of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_STRING_TYPE) : "tabView"
       "error" (B_INT32_TYPE) : 0 (0x00000000)


    hey Time getsuites of View 0 View 0 of Window 0
    Reply BMessage(B_REPLY):
       "suites" (B_STRING_TYPE) : "suite/vnd.Be-tab-view"
       "suites" (B_STRING_TYPE) : "suite/vnd.Be-view"
       "suites" (B_STRING_TYPE) : "suite/vnd.Be-handler"
       "messages" (B_PROPERTY_INFO_TYPE) : 
            property   commands                            specifiers              types
    ---------------------------------------------------------------------------------------------------
           Selection   B_GET_PROPERTY B_SET_PROPERTY       DIRECT                  LONG 
                       Usage: 
    
       "messages" (B_PROPERTY_INFO_TYPE) : 
            property   commands                            specifiers              types
    ---------------------------------------------------------------------------------------------------
               Frame   B_GET_PROPERTY B_SET_PROPERTY       DIRECT                  RECT 
                       Usage: The view's frame rectangle.
              Hidden   B_GET_PROPERTY B_SET_PROPERTY       DIRECT                  BOOL 
                       Usage: Whether or not the view is hidden.
               Shelf                                       DIRECT                  
                       Usage: Directs the scripting message to the shelf.
                View   B_COUNT_PROPERTIES                  DIRECT                  LONG 
                       Usage: Returns the number of child views.
                View                                       INDEX REV.INDEX NAME    
                       Usage: Directs the scripting message to the specified view.
    
       "messages" (B_PROPERTY_INFO_TYPE) : 
            property   commands                            specifiers              types
    ---------------------------------------------------------------------------------------------------
              Suites   B_GET_PROPERTY                      DIRECT                  (suites CSTR)(messages SCTD)
                       Usage: 
           Messenger   B_GET_PROPERTY                      DIRECT                  MSNG 
                       Usage: 
        InternalName   B_GET_PROPERTY                      DIRECT                  CSTR 
                       Usage: 
    
       "error" (B_INT32_TYPE) : 0 (0x00000000)


It also often helps to look into the [app's source code,](http://cgit.haiku-os.org/haiku/tree/src/preferences/time/TimeWindow.cpp#n123) of course. Find the place where the window layout is created and see if you can follow the view hierarchy.

Any visible control widget is usually some view contained in another view, which is contained in another view, which may be contained in another view, ... which in the end is contained in the window.
Like: A button view sits in a view, which sits in a container view, which sits in a tab view, which sits in a base view, which sits in a window. Turtles, all the way down...

**However!**
You shouldn't use such a View-of-View-of-concatenation in a script if you care about the script keep working if the app's GUI changes.
Use the "InternalName" instead. So this:

    hey -o Time set Selection of View 0 of View 0 of Window 0 to 3

becomes:

    hey -o Time set Selection of View "tabView" of Window 0 to 3

Checking a checkmark
-----------------

We're on the "Clock" tab of the Time preferences:

    hey Time get InternalName of View 3 of View 0 of View 0 of View 0 of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_STRING_TYPE) : "Clock"
       "error" (B_INT32_TYPE) : 0 (0x00000000)

![The Clock tab](https://www.haiku-os.org/files/blog/humdinger/time_clock.png)

Find the "Show clock in Deskbar" checkbox by checking the 'InternalName' of the views inside the "Clock" view. The checkbox itself is in another view "show clock box":

    hey Time get InternalName of View 0 of View "Clock" of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_STRING_TYPE) : "show clock box"
       "error" (B_INT32_TYPE) : 0 (0x00000000)

We can get the label of the checkbox as it appears in the GUI (and by using "set" instead of "get" we could even change that):

	hey Time get Label of View 0 of View "show clock box" of Window 0
    Reply BMessage(B_REPLY):
       "result" (B_STRING_TYPE) : "Show clock in Deskbar"


Now, to simply remove the checkmark:

    hey -o Time set Value of View 0 of View "show clock box" of Window 0 to 0

But as you see, that only un-draws the checkmark - it doesn't actually run the code as if the user clicked the checkbox!
Sometimes that might be enough if you only want to take a screenshot of the window. But in this case, actually unselecting the checkbox should also disable the checkboxes below. And of course hide the clock in the Deskbar.

We have to actually send the BMessage that will trigger all that. For this, we again need to look through the code.
The BMessages for a view arrive at its MessageReceived() function, in our case in [ClockView.cpp](http://cgit.haiku-os.org/haiku/tree/src/preferences/time/ClockView.cpp#n151). We see the BMessage's 'what' field's matching constant 'kShowHideTime'. Now we just need to find the actual value of that constant and do so in [TimeMessages.h](http://xref.plausible.coop/source/xref/haiku/src/preferences/time/TimeMessages.h#53): 'ShTm'
[OpenGrok](http://xref.plausible.coop/source/) is very useful for these things.
Now everything becomes even much easier:

    hey -o Time 'ShTm'

That's generally how you deal with all BControls that should trigger some action, like clicking a button.

Filling out a text field
---------------------

The 'Network time' tab has a text field at the top:

![A text field](https://www.haiku-os.org/files/blog/humdinger/time_textfield.png)

    hey -o Time set Value of View 0 of View 2 of View 0 of View 0 of View 0 of Window 0 to "Example text"

Or after a bit of nosing around with "get InternalName":

	hey -o Time set Value of View 0 of View "Network time" of Window 0 to "Example text"
