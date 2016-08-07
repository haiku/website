+++
type = "blog"
author = "czeidler"
title = "ALE (Auckland Layout Editor)"
date = "2012-09-03T09:49:26.000Z"
tags = ["Auckland", "BALMLayout", "GUI Builder"]
+++

Recently I spend some time to develop ALE the Auckland Layout Editor and now it's getting time to release a first testing version! ALE is a tool for developers to create GUIs. These GUIs can then be loaded from an application. This first version is still very basic and I hope I can get some feedback what can be improved and which features are most needed. It mainly focus on layout creation and less on editing view properties.

<a href="https://www.haiku-os.org/files/ALEScreenShot.png" target="_blank"><img src="https://www.haiku-os.org/files/ALEScreenShot.png" width="600" height="383"></a>

While working on user interface customization it turned out that the step to creating a GUI builder is not that big. When changing a layout at runtime the user must be able to move existing views around, insert them between other views or swap the position of two views. Furthermore, it should be possible to temporary remove unused views from the layout and add them again at a later point. It is also important that the user can't create invalid layouts. For example, views should never overlap each other and the layout must stay solvable. What is missing for a GUI builder is that new views can be created and added to a layout. Furthermore, it must be possible to save and restore a layout and access the items from within an application, i.e. get a pointer to the c++ object.

ALE is a constraint based layout editor that based on the BALMLayout layout class. BALMLayout is a very powerful constraint based layout and can describe layouts that can't be described with other layout classes, like for example the grid-bag layout. Layouts created with ALE are automatically resizable and overlap-free. This means while editing a layout you can't create a layout that has two overlapping views. 

ALE has a component factory that can be used to create GUI elements, e.g. buttons or text views. Each view in the layout gets a string id which can be changed in the editor. After the GUI developer designed a GUI the layout can be saved into a BMessage and be attached to a GUI specification file. From the c++ application this BMessage can be read and restored using a LayoutArchive class. This class also allows to map the string identifier of a view to an actual c++ object.

A test version of the editor can be downloaded from *) This is a debug version and relatively large. If you want to take a look at the source code, it is on github **). I you want to build it please come back to me and I will give you some more information about that.

There is also a very simple sample application in the Demo directory. This piece of code shows how to get a pointer to the objects in the layout. To build it just call make in the demo directory. It is using a GUI specification file called TestLayout which is also in the Demo directory. This file must be in the same folder as the app binary file is. Furthermore, it can be opened in the editor to change the layout or add new views. 

Known bugs:
- some crashes
- explicit sizes are not stored at the moment
- the layout min size is not restored from the layout specification, this means overlap can occur in your app.

thanks for testing and feedback is welcome!


*)
http://www.cs.auckland.ac.nz/~clemens/ALE_3_9.zip
**)
https://github.com/czeidler/haiku