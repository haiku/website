+++
type = "blog"
author = "PulkoMandy"
title = "On spatial mode and the document-centered interface"
date = "2011-07-27T19:37:27.000Z"
tags = ["GUI tracker spatial"]
+++

Once ag<h1>ain, the idea that tracker should use single-window mode was raised as a trac ticket. This discussion was made multiple times on the mailing list, and each time the answer from the developper was no. However, users still seem to prefer the single window mode, and other OS are switching to it. Maybe we just need to explain how to efficiently use this mode, and why we think it's better. I'll try to do that in this blogpost, with my own point of view on it.

<h1>A bit of history</h1>

The spatial metaphors was used quite early in graphical user interfaces. You can already see it in the first version of Mac OS. It was adopted in windows 95, made optional and non-default on windows 98.

The Mac OS version of spatial navigation was quite well done. The desktop is at the root of everything and shows a list of volumes (or disks). In each volume, you can find folders and files. When a folder is already open, it will be grayed out in the parent so you can see that's the case. Double clicking on a grayed icon will raise the already open window.

From the very start, there were other ways of working. While Windows 3.1 program manager was sort of spatial, it didn't match the filesystem hierarchy at all and offered only one level of windows. The file manager was working with a tree view, a concept still visible in later versions of Windows in "explore" mode, and also part of OS/2 way of working. This kind of browser is now known as "single window" or "navigational". Typical features include not opening a window for each folder, allowing a folder to be open multiple times, and a web-browser like history allowing to go back in time.

BeOS did only allow spatial mode. When OpenTracker got released, one of the first changes done by the community was adding a single-window navigational mode to it. This shows how even BeOS users wanted this feature.

Still, 10 years later, we're still using spatial mode in Haiku as the default one.

<h1>Spatial navigation</h1>

As I said, in spatial mode, a window is binded to a single folder, and each folder can only be shown in a single window. When opening another folder, another window is opened. Each window stores its position and size, as well as the content (icons) positions inside itself. This makes navigating the filesystem a tangible operation. Beginner users quickly get what "opening" a folder means, and how the hierarchy of files work.

There are some quirks to make it more convenient. On Haiku, these include allowing different workspaces to have the same folder open, possibly at different positions ; and symlinks, which are shortcuts in the directory tree to get somewhere quickly. These are hinted by a slight underlining.

The main complaint we hear about spatial mode is that one always end up with a lot of windows opened. This is a learning problem. When programming in C++, each object you create with new must be released by delete (sorry for the technical comparison). Likewise, in a spatial mode file browser, every folder-window you open by clicking must be closed by clicking - keyboard shortcuts also work. It's just done this way. If you end up with too many windows (in C++ this would be called a memory leak), either you open too much, or you don't close enough of them.

In Haiku, we have a nice feature called drill-down menus. When you right click any folder icon, you can see what's inside and navigate through popup menus to your target. The target is then opened in a window, while the path isn't. Learning how to use that allows you to quickly et anywhere without opening more windows than you need. This really seems to be the key, along with getting used to close windows when you don't need them anymore.

On the other hand, there is a lot of material on the internet showing the drawbacks of navigational mode. I just want to point out I'm so used to spatial mode that I now find it annoying to have to explicitly open a new window when navigating to another directory if I want to keep the one I'm in at  the same time. Some file browsers (I use pcmanfm on linux) even added tabs in the windows, which make things sometimes even more confusing, as you may have something open in a background tab which itself is somewhere in an hidden window, and thus won't show up in the taskbar. In Haiku I get a list of all the open folders at a glance. I don't see people really using the navigation support besides the "parent folder" button, or even trying to use the "back" button when they actually mean "parent". Going to the parent folder in spatial mode is as easy as typing alt+up, we could have a toolbar button for it if people really want that.

<h1>Document-centered</h1>

Another feature of Haiku is that it is document-centered. This goes outside of Trancker and file navigation and defines how applications work and look like. The idea is that a window in Haiku maps to a document on the filesystem. You see how this matches spatial mode navigation.

With the document-centered system, you get more windows on screen than when using other systems like MDI (Multiple Document Interface). But you get to manage all these window the same way, and you can mix them together as you need. It doesn't make snese to group your documents in applications, by filetypes, however, it does make sense to put together a sourcecode editor and a debugger, or a word processing application and a drawing application used to insert diagrams in the document.

The problem is a lot of GUI elements are duplicated : toolbars and menus are shown for each document. Mac OS tried to solve that by moving the menu outside of windows, at the top of the screen. This way, it is shown only once for all documents in an application. However, activating a window suddenly shows the associated menu, which is sometimes a bit confusing, and you can't use toolbars.

A later alternative to MDI and SDI appeared later, it's called TDI for Tabbed Document Interface. The idea is to have tabs for each document in an application. You can see that in any modern web browser, or in Haiku's terminal. TDI avoids nested windows like MDI does it, and makes it a bit easier to manage the documents. However, it still doesn't allow to mix documents from different apps in the same area. Haiku has a solution for that, it's called Stack&Tile. Stack&Tile allows to use tabbing accross applications. This makes it a lot more powerful and allows to group windows by their actual use, not by the document type/associated application. Stacked windows suddenly make it a lot easier to manage all these windows. And tracker in spatial mode just fits this perfectly. Tracker is then the application for opening folders, and it works just like any other application.

Note this is very different from the way other OS work. They tend to have one single application take the whole screen space, while we have multiple ones sharing the space, with ability to operate them together (drag and drop, copy and paste, and other ways of sharing data). This is why tracker windows zoom button will make them shink to fit the contents, instead of growing to hide the whole screen. Any application zooming to the whole screen can get very annoying, because that's of no use, unless you're trying to view a really, really big document. With modern high-resolution screens, it's time to share the space ! StyledEdit should enlarge the window to ensure there are no forced line breaks; showimage will fit the current image, some apps are even not scalable at all since the contents always has the same size. Making the zoom button work that way helps getting things done much more efficiently.

<h1>Making it more visible</h1>

Working the document-centered way takes some learning, but it's reallyworth it. Having tracker fitting in with spatial mode may be of some help, but it won't do everything. Here are some more things we could do (or try to do) :
<ul>
<li>Icon showing open/closed state : this is something that was available in Mac OS since the very beginning. An open folder is grayed out, or shown with an "open" icon. So you know it's already somewhere. The same applies for other documents.</li>
<li>Document-centered deskbar : currently the deskbar groups things together by application. This makes it hard to see the document nature of things. Grouping the documents could be done by projects, or S&T groups instead. This would help making the grouping more visible.</li>
<li>S&T groups persistence : I already said tracker windows keep their position and size. All windows should also keep their S&T grouping state accross reboots. Even better, this state could be stored as  a "project" and reopened later, as needed, restoring the windows as they were. Projects could be mapped to folders, and show all the documents inside the folder. Or they could be an independant stuff on another layer. Projects would be the grouping criterion in Deskbar, so the deskbar menu for a project would allow to save it, besides closing and hiding it.</li>

<h1>Single window mode has some points</h1>

There are still things that work really well in single window mode and can't be done in spatial. They relate to the ability to decouple windows from folders. So you can have multiple windows showing the same folder. While harder to understand for beginners, this allows for quite powerful use, as each window can then offer a different "view" on the same folder : one may be sorted by filename, and another by date, so you can quickly grab what you're after. The only way to do that in spatial mode is to cheat using workspaces. A partial answer to this is queries : they are window with a different point of view on the whole filesystem. An application called Trax allows you to do queries with a constraint on the filepath.