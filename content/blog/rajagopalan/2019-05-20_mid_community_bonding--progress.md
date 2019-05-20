+++
type = "blog"
title = "Mid Community Bonding--Progress"
author = "rajagopalan"
date = "2019-05-20 23:31:39+05:30"
tags = ["haiku", "software"]
+++

# Introduction:
Hello Everybody, I am G.Rajagopalan working on porting webkit2 to haiku as a part of my GSoC project. So here I am to share our experiences and work regarding the project 😄.

# Bonding Process:
I have been with haiku for the past 6 (or 7 months I think) which went like a blink of an eye. I can definitely say that it is a memorable journey with Haiku. I owe it to the beautiful and friendly people who work for haiku. My friends circle has definitely increased. So I can concretely conclude the community bonding process is both fruitful and fun ❤😊😄.

# Work's Progress:
WebKit2 is a very big project hence it deserves lots of love and attention and here we are providing it in small steps. Let me run through the work till date:

* We got it to compile on Haiku 
    * OMG it was such a tedious step but totally worth it!

* Cleaning up of git history 
    * Pulkomandy said that we need to maintain a clean git history if we want our patches to be accepted by the upstream branch. So I had to sharpen my git skills like rebasing, cherry-picking. They sure are scary at first seems fun and interesting after I played with it. Pulkomandy spent a good amount of time rebasing and picking required commits while I create a dummy repo to put my git skills into battle.

* First things first!
    * WebKit2 follows a multi-process model. So to actually do anything, the process had to be launched. So we used ``` BRoster ``` to launch the executables using their MIME types but, soon realized it is not a good choice hence we changed it to launching by finding the path using the **HAIKU** way😎🔥.

* They really have to talk😬🙊

    * Yes we had to make the Processes talk with each other. So we started fixing the IPC with our native messaging framework. The handlers were attached to the MainLoop(attached to the application's main looper) and things started to talk for quite a while until we hit on a fact that JS execution may block the MainLoop so its evil to attach it there.

* Phew an alternate way to make them talk🤞
    * As Attaching the handlers that receive function calls from other messages to the MainLoop didn't turn out to be expected. We had to attach it to the WorkQueue's Looper just like all the other platforms. So currently we have to do extra work to send message from application's looper to WorkQueue's looper. Take a look of the rough schema I made for the above plan ✏📝.
    ![Rough IPC Schematics doodled](Ipc.jpg?raw=true "Rough IPC doodle")

#  TL;DR
So currently the peek is at fixing the IPC by attaching it to WorkQueue and pray for it to work.

```cpp
return(0);
```
That's all folks. Hope everybody enjoyed it and sorry if my English is too funny 🤣. Thanks for scrolling by 💻🎉.
