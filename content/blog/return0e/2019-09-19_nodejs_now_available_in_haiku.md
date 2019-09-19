+++
type = "blog"
title = "Node.js now available in Haiku"
author = "return0e"
date = "2019-09-19 11:45:23+01:00"
tags = ["nodejs", "javascript", "typescript", "haiku"]
+++

TLDR: ``pkgman install nodejs``

As some have already known for a long time, many platforms have had support for writing software in JavaScript or TypeScript with the help of the Node.js runtime and over the years, much of the software written by developers these days have gradually been written in either of those languages. However, Haiku has lacked a Node.js port for quite sometime and it wasn't possible to run or develop JavaScript based software or libraries that depended on the Node.js runtime. Now I can say that Node.js is available for Haiku and can be downloaded from HaikuDepot on 64 bit (32 bit support is being worked on). The version which is currently available is 12.3.1 and is already being updated to the latest version at the time of this writing to 12.10.0 and support for the upcoming LTS version is also coming to HaikuPorts. Several patches have been upstreamed by members of the HaikuPorts team to projects such as libuv (cross-platform async I/O library), GN, etc and we hope to upstream to larger projects like V8 (Google's JavaScript engine used in Chromium and QtWebEngine) and the Node.js project, which will ease the bringup of a future Node LTS release for Haiku.

To install Node.js on Haiku, search for the package in HaikuDepot and click 'Install' or type ``pkgman install nodejs`` into the Haiku Terminal and it will automatically install everything.

So what does this actually mean for us users? Well you can now directly install and run software from the JavaScript and TypeScript ecosystems using npm (Node Package Manager) or yarn and most packages will work right out of the box. Here are some example packages that are running on the system:

React and TypeScript:

<img src="/files/blog/return0e/react-js-on-haiku.png" alt="react-and-typescript" class="img-responsive center-block">


Angular and TypeScript:

<img src="/files/blog/return0e/angular-demo.png" alt="angular-demo" class="img-responsive center-block">


Simple Express Web Server:

<img src="/files/blog/return0e/expressjs.png" alt="expressjs" class="img-responsive center-block">


Socket.IO Chat Demonstration:

<img src="/files/blog/return0e/socketio.png" alt="socketio" class="img-responsive center-block">


Creating a static site via Hexo:

<img src="/files/blog/return0e/hexo.png" alt="hexo" class="img-responsive center-block">

It is also possible to attach node programs for remote debugging via the Chrome Inspector remotely. Here are a few screenshots of Node.js running on a Haiku machine being remotely debugged with Chrome (macOS).

<img src="/files/blog/return0e/node-haiku-img.png" alt="node-haiku-img" class="img-responsive center-block">

<img src="/files/blog/return0e/node-inspect-mac.png" alt="node-macos-inspector" class="img-responsive center-block">

<img src="/files/blog/return0e/haiku-inspector-debugge.png" alt="node-haiku-img" class="img-responsive center-block">

Please note that since this is a very early port to a new operating system, it is expected that several packages require platform recognition for it to function correctly. Therefore, some packages will not work unmodified and would require patches. In relation to this, some features in this port are currently unavailable such as file system events _(fs-events)_ which is used for watching file changes in the file-system. While Haiku itself has the ability to monitor file system events, there is a plan to integrate this into the Node port in the future.

There is also some growing interest in the possibility of writing GUI apps with JavaScript/TypeScript via a wrapper around the Haiku API. Thanks to this port, it is now possible to interface with the Haiku C++ API using nbind to wrap the C++ classes and methods automatically to be called from JavaScript. The plan for these bindings is to create an idiomatic JS/TS API which will allow developers to quickly use the API without any difficulty. This will be released next week as the code will be prepared for open-source release. For now, here is a screenshot of a Haiku app with a large button sending a notification to the window manager 'app_server'.

Haiku JavaScript bindings demonstration:

<img src="/files/blog/return0e/notification-demo.png" alt="haiku-ui-bindings" class="img-responsive center-block">

I would like to thank all of those who were involved in making this port possible. This would not have been possible without the contributions from the following:

* [CodeForEvolution](https://github.com/CodeForEvolution), [Alaviss](https://github.com/alaviss) (Haiku-specific patches for libuv)
* [return0e](https://github.com/return) (GN and V8 port)
* [pahefu](https://github.com/pahefu) (Initial Node.js port)
* [The HaikuPorts Organisation](https://github.com/haikuports/haikuports) (Package repositories and buildbot infrastructure)
* [The Haiku Project](https://haiku-os.org) (Haiku Operating System)
