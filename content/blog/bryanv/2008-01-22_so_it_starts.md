+++
type = "blog"
author = "bryanv"
title = "So it starts."
date = "2008-01-23T04:43:28.000Z"
tags = ["OpenJDK"]
+++

As I write this first post, I'm in the process of sending off the initial OpenJDK project page content to Mark Reinhold for public posting. I'm grinning wildly, and I'm having some great flash-back style memories of working on the JDK 1.4 port.

I think now is a good time for a general status report, to communicate where we're at, where we're going, how we'll get there, and how you can get involved.

<h3>Where we are</h3>
I'm in the process of working with the fine folks at <a href="http://openjdk.java.net">OpenJDK</a> to get the project infrastructure setup. This will include <a href="http://mail.openjdk.java.net/mailman/listinfo/haiku-port-dev">a mailing list</a>, <a href="http://openjdk.java.net/projects/haiku-port">project page</a>, and eventually -- our own mercurial repository. OpenJDK recently switched to mercurial, and they're in the process of getting everything setup to support our own repository.

<h3>Where we are going</h3>
The Haiku Java Team was created with the task of porting, maintaining, and developing Java technologies for Haiku.

Short-term this means getting a world-class, standard JDK implemented on Haiku. To that end, OpenJDK is the best option out there, and it's where we're planning to start.

Long-term this means far more. Ideas floating around in my head include porting common toolkits (SWT), creating bindings to the BeAPI (build a Haiku app in Java), and tightly integrating our tools into Haiku. Clearly, these goals depend on having a working JDK, which is why OpenJDK is currently our only focus.

<h3>How we'll get there</h3>
There's really two projects here, being managed together at the same time. There's the Haiku side of things, and the OpenJDK side of things.

We're participating in the OpenJDK project, building an official port that will (hopefully) someday be merged into the OpenJDK trunk. In order to accomplish this, any changes we have to make to OpenJDK will be committed back to the OpenJDK project. The haiku-port project is being sponsored by the porters-dev OpenJDK group. Individuals wishing to contribute to this effort will need to sign an SCA, adhere to the rules of the OpenJDK, join the haiku-port mailing list and the porters-dev mailing list.

On the Haiku side of things, we expect to further the development of Haiku. This could mean a lot of things. Implementing more posix API's in Haiku, new kernel functions, porting libraries or support tools to Haiku, etc. Any changes we make to support OpenJDK at the OS level will go back into Haiku. Getting involved on this end of things is just like getting involved in any other portion of Haiku. No licenses to sign, no IP waiver, just send the code along to the team lead (myself) or any other Haiku Dev involved in the are you're submitting changes for.

<h3>How you can get involved</h3>
Join the OpenJDK <a href="http://mail.openjdk.java.net/mailman/listinfo/porters-dev">porters-dev</a> mailing list.

Join the OpenJDK <a href="http://mail.openjdk.java.net/mailman/listinfo/haiku-port-dev">haiku-port-dev</a> mailing list, and introduce yourself.

Learn aboout <a href="http://openjdk.java.net/contribute/">contributing to OpenJDK</a>.

Watch the Java Team page, this blog, or just lurk on the mailing lists.