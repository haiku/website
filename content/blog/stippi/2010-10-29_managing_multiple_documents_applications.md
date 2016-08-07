+++
type = "blog"
author = "stippi"
title = "Managing multiple documents in applications"
date = "2010-10-29T12:41:22.000Z"
tags = ["S&T", "Stack&Tile", "window", "deskbar", "document", "api"]
+++

<p>
Working on my rewrite of WonderBrush, I've been thinking about the document management. As you may know, WonderBrush is a stricly single window application in its current release. It can still open more than one document at once, of course, and those are displayed in a list above the navigational preview of the current document. One of the drawbacks of this approach is that there are no previews of all the documents visible at once, and it's harder to make non-current documents the target of drag&drop operations, like when dragging objects from one document onto another document to move or copy them there.
</p>

<!--break-->

<p>
Many web browsers display multiple documents in a tabbed interface. Some web browsers show a preview of a non-current web page in a tool tip like fashion when you hover with the mouse over a tab. It seems to be useful to have a graphical representation which is bigger than a mere favicon. The same scheme is visible in other user interface features of current browsers or their extensions.
</p>

<p>
This got me thinking whether another approach to multiple document management could work for the new WonderBrush, and perhaps even become a standard among Haiku applications: Along the left side of the window, there could be a vertically scrollable area of previews of the currently loaded (or recent or whatever) documents. Absolutely similar to the page previews in many PDF readers. These previews could display the exact visual state of the documents they represent, i.e. they show the scrolled and perhaps zoomed portion of that document. For some applications, it could be better to show fixed previews, to make them more easily recognizeable and to support a more stable visual association with each respective document.
</p>

<p>
In WonderBrush, I plan to allow the same document to be opened an arbitrary number of times. Each instance would reflect the changes made in other instances, but could feature a different zoom level and scrolling portion, even a different current tool and selection. In some ways it would be similar to the split-view editing that some text editors, Pe for example, support.
</p>

<p>
This approach to multi-document may work well for browsers or feature rich editing applications, while opening and associating one window per document or the tabbed approach work better for other applications. I think the main difference is how much user interface is shown additional to the actual document contents. And how important a visual association for a particular document is.
</p>

<p>
For a text editor like Pe, the working set of documents can be very large and the visual preview quite meaningless. At the same time, the user interface consists only of a couple of icons and takes up very little space compared to the text. For this situation, I find multiple windows and management via Deskbar to be working fairly well. The same could be said about ShowImage, although in ShowImage, I imagine an area on the left of each window which shows the other images located in the same folder as the currently displaying image, would be very helpful.
</p>

<p>
For an application like WonderBrush, the editing interface takes up a lot of space, and avoiding to show the same redundant interface many times on the screen is a worthy goal. I still plan to allow multiple windows, though, in order to support multi-monitor setups. The new WonderBrush allows to hide each major area of the interface, and in a multi-monitor setup, the user could open one window per monitor, and hide parts of the interface in one window or at least to show another portion of the same document.
</p>

<p>
The tabbed interface could be extened and better integrated as well. On my way to the last BeGeistert, I've been thinking about this and also discussed it with Clemens and Christoph. BWindow could get an API extension to support multiple "titles". Currently we have SetTitle(const char*), but there could be AddTitle(const char*), AddTitle(const char*, int32 index) and SetTitle(const char*, int32 index) (along with RemoveTitle() variants of course). On the app_server side, a single window decorator could support multiple titles in the form of tabs. This new interface would merge the work done on Stack&Tile and allow to get the stacked window appearance within a single window. Stack&Tile could even use this to make the decorator rendering look more integrated, by moving the tabs of all windows within a stack into a master decorator, where one window in the stack takes the role of the master, if nothing else, at least for rendering.
</p>

<p>
The extened API could also feature associating icons with these window titles. The icons would be displayed in the tab, but more importantly in Deskbar as well. Managing multiple documents could then be done in Deskbar at least for the tabbed interface approach, regardless whether the application actually uses a single window or Stack&Tile. I can see this being extremely useful for WebPositive, but also other applications. Obviously Stack&Tile would have to be moved from living in an add-on back into the app_server. It is important to have a baseline of features in Haiku that all application developers can count on being supported and active. At the same time, the refactoring done as part of the work on Stack&Tile has resolved some long standing TODOs in the app_server code and was definitely a good thing.
</p>

<p>
Nothing represented here is anything new. But it would be unique if we managed to integrate these ideas as baseline features in Haiku across many applications and the application API. Hopefully this inspires other Haiku developers to work towards these goals and take multiple document and window managment one step further.
</p>