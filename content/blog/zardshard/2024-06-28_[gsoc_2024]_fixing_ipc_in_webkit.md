+++
type = "blog"
title = "[GSoC 2024] Fixing IPC in WebKit"
author = "Zardshard"
date = "2024-06-28 13:34:42-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

WebKit is split into several processes. One of these processes is the browser itself. In my case, this is MiniBrowser, but, hopefully, in the future, it is WebPositive. Since browsers can have any name, WebKit refers to this process as the UIProcess. And, indeed, that process is mainly responsible for the UI. Our port will also be using two other processes: NetworkProcess and WebProcess. Unsurprisingly, NetworkProcess does the networking. WebProcess does all of the work associated with a single web page. For example, it is responsible for running JavaScript and does most of the work for rendering the web page. There is one WebProcess for each web page.

Now, it should come as no surprise that all of these processes need to communicate with each other to work together. And that's what IPC (Inter-Process Communication) is for. Currently, we have a partially-working implementation of IPC. Currently UIProcess can create a connection to WebProcess and to NetworkProcess. But WebProcess can't create a connection directly to NetworkProcess. This is what I need to fix.

Now, let's dive into the details.

How connections are established
-------------------------------

To keep things general in this section, I won't be referring to any specific implementation of IPC. Instead, I'll just be talking about a general communication channel. This channel has two sides. You can give a side to each of the two processes you want to connect. Then, if one process wants to send information, it can put it into the communication channel, and the process on the other side will receive that data.

In general, to send one end of the communication channel to another process, the one process needs to pass a token of some kind to the other process. This token could be passed via a command line parameter, or through an intermediate process that both processes already have a connection to. Once that's done, the receiving process should be able to use the token to get access to the one end of the communication channel. With that, both processes each have one end of the communication channel and should be able to communicate with each other.

WebKit uses two different processes for establishing a connection for the two different situations that come up:

### Process 1: How UIProcess connects with its children

UIProcess is in a special position. It is responsible for creating all of the WebProcesses and NetworkProcesses. It therefore gets to specify command line parameters for all of these processes. And so, it can simply pass the token along with the other command line parameters. And with that, it should have a connection with the child process.

This is the process that currently works. On to the process that currently does not work.

### Process 2: How WebProcess connects with NetworkProcess

No, WebProcess doesn't have it that easy. Instead, it needs to communicate with the UIProcess to create the connection.

![The communication that occurs between the three processes as WebProcess tries to create a connection with NetworkProcess](/files/blog/zardshard/MiniBrowser_development/IPC/aux_to_aux_connection_establishment_overview.svg)

<details>
<summary><i>How do I read this chart?</i></summary>
Here's a brief explanation. Each of the three dashed vertical lines represents one of the processes. The left-most dashed line represents WebProcess, the middle dashed line represents UIProcess, and the right-most dashed line represents NetworkProcess. The arrows are messages that are sent between processes. So the arrow labeled "Send message GetNetworkProcessConnection" is a message sent from WebProcess to UIProcess. Finally, time flows from top to bottom.
</details>
<br/>

As shown above, WebKit uses the following steps to create the connection:

1. WebProcess sends the `GetNetworkProcessConnection` message to UIProcess using the connection to UIProcess that it already has.
2. UIProcess then sends a `CreateNetworkConnectionToWebProcess` message to NetworkProcess.
3. NetworkProcess then creates a communication channel. It keeps the one end of the channel for itself, and sends the token for the other end to UIProcess.
4. UIProcess then sends the token to WebProcess.
5. Finally, WebProcess uses the token to get the other end of the communication channel.

Now, WebProcess has the one end and NetworkProcess has the other. They can now communicate directly with each other. Success!

How the ports of WebKit implement IPC
-------------------------------------

In this case, I will discuss the UNIX port, but it appears all of the other ports work similarly. To establish a connection, UNIX creates a pair of connected sockets. It then sends one of the sockets to the other process using one of the methods listed above.

How will I implement IPC?
-------------------------

Haiku's native IPC mechanism is ports. Of course, we rarely use ports directly. Instead, we usually use a `BMessenger`, which is a wrapper around a port. There's one significant difference between `BMessenger`s and IPC on other platforms: `BMessenger`s are one-way. A `BMessenger` can send a message and the other process's `MessageReceived` method will be called with that message. But the other process has no way of communicating back with the holder of the `BMessenger`. That is, as long as we don't get creative.

The way we get around this is we send a `BMessenger` to the process we want to establish a connection with. This creates a one-way communication channel. Then, the other process, once it receives the `BMessenger`, will create a new `BMessenger` that messages itself and send it back to the first process. Now, we have two `BMessenger`s, each going the opposite direction. With that, we have a two-way connection. Success!

We currently use this method successfully for UIProcess to create a connection with its children. We can also use this method to create a connection between WebProcess and NetworkProcess. There are three ways of implementing this:

### Method 1 - The fastest

![The communication that would happen between WebProcess and NetworkProcess with this method](/files/blog/zardshard/MiniBrowser_development/IPC/aux_to_aux_connection_establishment_method_2.svg)

Here, we send a `BMessenger` along with the request to make a connection, and then reply with a `BMessenger`.

This requires no extra message passing, but it does require modifying WebKit's code. WebKit makes it easy to send `BMessenger`s in the replies to the messages. But we would have to modify the code a bit in order to allow passing a `BMessenger` along with the messages themselves. And, if another set of two processes want to establish a connection between themselves, I would also have to modify those messages as well.

### Method 2 - The easiest to implement

![The communication that would happen between WebProcess and NetworkProcess with this method](/files/blog/zardshard/MiniBrowser_development/IPC/aux_to_aux_connection_establishment_method_1.svg)

As far as I can tell, this is the basic idea behind Rajagopalan's implementation of IPC in 2019. NetworkProcess replies to the request to create a connection to it with a `BMessenger`. This `BMessenger` is then passed to WebProcess. WebProcess then creates a new `BMessenger` that points to itself and sends it over the `BMessenger` the first process sent.

This is the easiest method and shouldn't require changing any of WebKit's code (except for platform-specific code, naturally). It does require one extra message compared with the previous method.

### Method 3 - UNIX sockets

We could just switch to using UNIX sockets. The code for this already exists. We would likely need to write code to make the UNIX sockets play nicely with our implementation of run loops. Or we could switch to UNIX's implementation of run loops. But one run loop runs directly on the BApplication thread. So we would likely need to write code to make BApplication's run loop and UNIX's run loop play nicely together.

At the end of the day, it seems the method would require about as much Haiku-specific code as the other two methods, which undoes the potential maintenance benefit that could be gained from it.

Conclusion
----------

I think method 1 and method 2 are pretty close, but I believe I'll implement method 2. I doubt the performance impact is large at all, and it allows us to avoid modifying WebKit's code.
