+++
type = "blog"
title = "Introducing myself gsoc 2019"
author = "RAJAGOPALAN"
date = "2019-05-08 12:19:38+05:30"
tags = ["haiku", "software","gsoc2019" ,"webkit2"]
+++

```cpp
BAlert("Hello World","Introducing myself",
"Awesome","Cool","Excited",B_SUMMER_IS_FUN);
```
# Introduction:
I am RAJAGOPALAN GANGADHARAN doing Computer science Engineering in India and a GSOC 2019 participant with aim of <b>porting Webkit2 to Haiku</b>. First of all I would like to thank everybody for giving me this wonderful opportunity and I promise to not let the hopes down. I didn't know much about BeOS until I saw Haiku. Well to be honest I fell in love with the GUI of haiku. The tabs and grouping is really what I wanted, and I was searching my entire life.I am really hoping to see Haiku organization badge in my GitHub profile.

# About my project:
WebKit2 is the latest browser engine and an updated version to the webkit legacy that is being used by our Web+. WebKit2 follows a multi process model so there is no more hangs if something goes wrong as each process performs a separate task UIProcess - Recognize user actions etc., WebProcess - The process that renders stuff., NetworkProcess - The part that actually talks with internet. There are other processes too like extension process which we will come to in a later point of time. Upgrading to web+ to webkit2 means, More speed 🚀 and more reliability 💪🏻 and private browsing, ad blocking many more.
I believe I could get the sample minibrowser that uses webkit2 to render a simple HTML page before the end of the program.

# Project Plan: 
So my previous work include getting webkit2 to compile on haiku. Created a minibrowser to have a start with. And also started with creating a simple web view to instruct our BView to draw stuff. We have couple of things to fix before it can render that includes
<li>IPC(inter process communication)</li>
Since webkit uses socket (client server model) and we would like to use our native messaging service BMessage we would have to work on revamping the connection.
<li>Coordinated graphics</li>
This is the actual part that renders HTML pages, so we would have to use existing parts from legacy port to work with webkit2 port. 


# Conclusion:
I would again like to thank everyone for giving me this opportunity and my mentor Pulkomandy for believing in me. That's all folks! Thank you for reading Hope you enjoyed. Keep checking this space !

P.S. Forgive me if my English is bad 😅

