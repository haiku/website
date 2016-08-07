+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Report #7"
date = "2016-07-15T10:39:58.000Z"
tags = ["streaming contract", "media server", "media_kit"]
+++

Let's talk about the most recent improvements in streaming support, this is perhaps a bit more technical than in past but in this case most of the work was related to refine internal mechanisms. I'm going to talk also about recent MediaPlayer changes, as well as other things.
<!--break-->
<strong>hrev50369</strong>

This was a very variegated hrev, with different areas being worked on.

After trying to keep the ape_reader working with streamed data, I finally realized thanks to debugging info that it was not working properly with finite size streams.

What happens is that the Monkey's Audio lib always try to read the whole file to find the APE_DESCRIPTOR. Even the official code does the same, at this point the only thing I could do is to have it refuse to work with non local streams. One of the aims of the recently introduced classes was in fact to make system components able to detect when certain functionalities are supported and eventually refuse to work.

Other fixes were targeted at improving the code consistency of the PluginManager and add debugging info in the network adapter code. The thread control of the http_streamer has been improved to have it wait in the sniffing phase until we receive a meaning error from the backend. Other fixes include better management of the stream size, and related inheritance.

<strong>hrev50371/hrev50372/hrev50373</strong>

In this timeframe the changes were targeted at moving the current pointer base argument to be of const reference kind. This is probably a hardly understandable change for non programmers people around, but this was a good move in keeping the API more safe and avoiding possible memory leaks from client code.

Other fixes are still related to the http_streamer init, checking it's request status and handle of failed connections.

<strong>hrev50379</strong>

The BAdapterIO interface has been developed further :

<ul>
 <li>Added an Open/Close mechanism</li>
This was needed to have an entry point for every streamer to get the initial status of the connection.
 <li>Implement a way to set a custom buffer</li>
That functionality was planned since the begin but never included really in the code.

The idea is that clients can change the internal buffering class, for example from a memory based BPositionIO to a file.
 <li>Implement timeout handling</li>
 <li>Improve Seek mechanism by using a semaphore and so lock the client thread until this operation finished</li>
</ul>

At this point I was ready to include a preliminary streaming support into MediaPlayer.

Most notably I added an inital GUI to open network streams and some refactoring of other internal functionalities relating the code which interface MediaPlayer with BMediaFile.

<strong>hrev50383/hrev50384</strong>

Other minor refinements of GetSize/SetSize inheritance in BAdapterIO and subsequent changes in the http_streamer. The flags published by the streamer and in particular those that allow the client to know if the stream is mutable (for example an http radio) or not are now set at runtime taking advantage of inheritance.

The MediaPlayer window has been made modal and centered on screen by default.

<strong>hrev50394</strong>

The live555_x86 source package has been removed as it was a duplicate uploaded by me in past. There were other changes in MediaPlayer, one that resolved a leak introduced in past and some unneeded locking of the BMediaRoster.

<strong>hrev50395</strong>

With this hrev the network window is now able to look into the clipboard and if the user copied previously an URL it's automatically insterted in the text field. This is working both at window creation and activation.

The enter key is also handled in place of pushing Ok with the mouse.


<strong>hrev50398</strong>

The playfile CLI tool has been updated to play URLs along with files, this is provided as a lightweight alternative to use MediaPlayer for web radio as well as an alternative testing tool.

<strong>hrev50399/hrev50400</strong>

BAdapterIO is provided with an IsRunning method used in the backend to check the status of the connection and avoid locking on data which will never come.

There are other subtle fixes avoiding possible missmatch with the API default arguments.
The http_streamer has been updated accordingly.

<strong>hrev50403</strong>

In this hrev I made fixes to both the backend and the streamer causing problems with calling virtual functions that may have potentially led to a crash.

<strong>hrev50407</strong>

MediaPlayer's UrlPlaylistItem item has been updated to support saving it into an external playlist, and using a more smarted of _CalculateDuration. This fixes #12853.