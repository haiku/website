+++
type = "blog"
author = "Barrett"
title = "Media Kit: New And Old Pieces"
date = "2015-07-29T18:00:29.000Z"
tags = ["media_kit", "BMediaRoster", "media_server"]
+++

Hello, it has been some time since my last article, in the meantime I continued to improve things out and since I changed some important parts of the media_kit, I think it's correct to notify the community about new and 'old' features added recently. This is an article mostly written for application developers, but I tried to explain the improvements made with simple words so I hope it will be interesting to anyone.

<!--more-->

<h1><strong>The Old Ones</strong></h1>

One of my goals was to implement some important parts of BMediaRoster which were still missing from the Haiku implementation:

<strong>BMediaRoster::RollNode</strong>

This is a function allowing to execute in a atomic operation the Start, Stop and Seek functions. This is needed if you want to be certain that a BMediaNode will start and stop at some frames. This is very useful, and needed, if you want to use nodes for media data filtering such as in a video editing program.

<strong>BMediaRoster::SyncToNode</strong>

This function allow to synchronize some thread or team so that it will be notified when the BMediaNode reach a performance time. This is handy, for example, when you want to have some action occur only at some performance time.

<strong>BMediaRoster::GetFileFormatsFor</strong>

This method is useful only when working with BFileInterface nodes, and this is used to query a certain node for it's supported formats.

<strong>BMediaRoster::GetNodeAttributesFor</strong>

BMediaNodes might want to implement this to add additional data available to other nodes, this is mostly a customization feature and might serve to various purposes. When developing a complex framework of nodes, this can serve as base to create extensions to the media_kit and making it available to nodes that want to support it.

This is a list of 'old' things that I added, but I am more interested in showing the new features available. To be more clear this is stuff that go over the BeOS R5 API.

<h2><strong>The New Ones</strong></h2>

<strong>BMediaRoster::IsRunning</strong>

This function was really needed for consistency reasons and to avoid private parts of the media_server such as the signature spread in the code possibly creating room from functionalities breaks. IsRunning simply return whether the media services are running and it should be used to verify the status of them.

<strong>Media services notifications</strong>

Along with the previously mentioned function, there was need to provide a way for watching the media services status. What I have done is to add two new notifications to BMediaRoster::StartWatching, B_MEDIA_SERVICES_STARTED and B_MEDIA_SERVICES_QUIT. This allowed to provide the BMediaRoster a way for staying up and automatically restore it's connection with the media_server without any need to reconstruct the object so that interferences can be limited as well.

The Haiku code is now making advantage of both functions and possibly more parts will make use of it. What I would like to warn about is calling BMediaRoster::Quit explicitly, recent commits show that it's highly discouraged and it caused various problems in the system. I've removed any attempt to use it relying instead on the system to manage this when a team die.

<strong>launch_media_server and Deskbar notifications (BNotification)</strong>

Working on the ticket #10770, I have come to the point that the actual system used by the Media preflet to notify when restarting the media services, should be moved to the media_kit. The result of this, from user and applications developers perspective is that the old <em>launch_media_server(uint32 flags)</em> is deprecated and it's replacement, showed above, allow to specify a custom notification hook differently from the old one which just didn't provide any way to do this.

<pre>status_t launch_media_server(bigtime_t timeout = B_INFINITE_TIMEOUT,
	bool (*progress)(int stage, const char* message, void* cookie) = NULL,
	void* cookie = NULL, uint32 flags = 0)</pre>

The important change from the user perspective is that the notifications are now displayed in the Deskbar by default and there's not possibility that the notification process stop before the end. Also every app using launch_media_server will automatically take advantage of this.

<strong>BMediaRecorder</strong>

While still not public, this is a class allowing to record any kind of media from any node in the system. From some months to now the SoundRecorder app is using this class instead of a more custom one which was used before.

The current plan is to go over and complete it with it's complementary classes, BMediaPlayer and BMediaFilter. The first will allow to just do the inverse of BMediaRecorder, just like BSoundPlayer but without being restricted to audio. The second will be a mixture of the two allowing to receive, filter and then send out any media. The reason for doing this is that in the system there are a lot of similar functionalities using different classes, reducing duplication as more as possible will allow to concentrate the development on improving just three classes making more easy to supply a strong performance. This is also useful for future and R2 API as it will allow a more easy transition to an updated media_kit.

This is all for now, have a good day!