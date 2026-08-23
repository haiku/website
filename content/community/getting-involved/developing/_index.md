+++
type = "article"
title = "Developing"
date = "2015-04-23T17:29:55.000Z"
tags = []
+++

Developing a whole operating system from scratch is a lot of work. Haiku developers have to contend with the fact that the Haiku project is not just a kernel, as with Linux, but is an integrated and interconnected kernel, windowing system, widget toolkit, desktop environment, and more. This abundance of work often results in areas of development that are left on the back burner because of the lack of developers with the needed knowledge (or available time) in these particular areas.

This does, however, mean there is room for new developers to take over these areas and "make them their own". Furthermore, those with more limited skills can participate in other ways that are meaningful to the overall project.

But don't be too intimidated: while there are certainly parts of Haiku that require significant computer science knowledge and low-level programming skills to work on effectively, these aren't as many as you might imagine, and much of the project (even inside the kernel and drivers!) is not much different from any other software project. Anyone with even just moderate coding ability can likely find contributions within their ability to make.

Check out the following areas that need help from new developers:

- - -

## Core System

You can contribute code to Haiku by submitting a patch to [Haiku's Gerrit](https://review.haiku-os.org). You should first read the [Haiku Coding Guidelines](/development/coding-guidelines) and the bug tracker and the bug tracker's [guide on etiquette](https://dev.haiku-os.org/wiki/BugTrackerEtiquette). There's a [step by step guide](/development/getting-started) aimed at new contributors.

After you get the Haiku [source code](https://www.haiku-os.org/guides/building/get-source-git/) and learn how to submit patches, you will need to learn how to [build Haiku](/guides/building) from source and [learn how to use git](https://dev.haiku-os.org/wiki/GitStarted), the source code repository management system.

Developers that aim to eventually gain direct commit access to the Haiku repository, need to be subscribed to the [commit mailing list](https://www.freelists.org/list/haiku-commits) to be able to participate in post-commit code reviews, and join the [development mailing list](https://www.freelists.org/list/haiku-development) for discussions.

A [development FAQ](/development/faq) is available to answer frequently asked questions and there is a [book available](/development/programming_with_haiku) to help you learn the Haiku API.

###### Highest Priority Items

*   [WebPositive Improvements](https://dev.haiku-os.org/query?status=assigned&status=in-progress&status=new&status=reopened&component=%5EApplications%2FWebPositive&col=id&col=summary&col=status&col=type&col=priority&col=milestone&col=component&order=priority)
*   [Improve the Installer Experience](https://dev.haiku-os.org/ticket/16217)
*   Good Media Support ([Media Player](https://dev.haiku-os.org/query?status=assigned&status=in-progress&status=new&status=reopened&component=%5EApplications%2FMediaPlayer&col=id&col=summary&col=status&col=type&col=priority&col=milestone&col=component&order=priority) Improvements)
*   [Bug fixes!](https://dev.haiku-os.org/query?status=assigned&status=in-progress&status=reopened&status=new&group=status)

###### Core Development Opportunities:

*   [Drivers](/community/getting-involved/developing/system#drivers)
*   [Kernel/File systems](/community/getting-involved/developing/system#kernel)
*   [Media](/community/getting-involved/developing/system#media)
*   [Network](/community/getting-involved/developing/system#network)
*   [User interface](/community/getting-involved/developing/system#user-interface)
*   [1st party applications](/community/getting-involved/developing/applications#1party)

- - -

## 3rd Party Applications

As 3rd party applications are developed externally from the Haiku source code repository, there are various processes that are used by the developers depending on whether the application is open source software or proprietary software. Nonetheless it is recommended to those wishing to participate in application development to read the '_[Programming with Haiku](/development/programming_with_haiku)_' textbook to give you a head start when writing applications for Haiku.

People wishing to contribute to the development of existing applications should contact the developers for the best way to do so. You can update open source BeOS software to better work on Haiku by helping out at the [HaikuArchives project](https://haikuarchives.github.io), which boasts a large number of [source code repositories](https://github.com/HaikuArchives/) for BeOS and Haiku applications.
You can fork a project from there and submit pull-requests to participate in the development. Many projects also have an issue tracker available that you can use to identify areas to work on.

If you want to develop a new application for Haiku, it is best to use some type of online source code repository service or you can add it to the [HaikuArchives project](https://haikuarchives.github.io/). Some of these online source code repositories are able to be set to private, so you can also use them when developing your proprietary software.

No matter if you're developing a native application or port something from another platform, you should use the [haikuporter tool](https://github.com/haikuports/haikuporter) and create a recipe for it. It automates the building and packaging in a clean environment which is essential especially when the project depends on external libraries etc. These recipes can be shared at [HaikuPorts](https://github.com/haikuports) where they can automatically re-build a project when it becomes necessary and upload the package to a public repository that's interfacing with the HaikuDepot application (refer also to 'HaikuPorts Project' below).

If you want to port software to Haiku then you should be aware of the ways that Haiku differs from the likes of Linux and other Unix like operating systems. There is a textbook that was written for the BeOS that is both valid for Haiku and still [available](https://github.com/haikuports/haikuports/wiki/PortingToBeOSBook) and there is a quick guide on how to use [Haiku's Find Directory functionality](https://github.com/haikuports/haikuports/wiki/FindDirectory).

It is **strongly recommended** that when porting open source software to Haiku, you submit your haikuporter recipe to the HaikuPorts project that is detailed below. This way your effort is not for naught, if by chance your changes are somehow lost.

###### Application Development Opportunities:

*   [3rd party development](/community/getting-involved/developing/applications#3party)
*   [Porting applications](/community/getting-involved/developing/applications#ports)

- - -

## HaikuPorts Project

#### HaikuPorts

HaikuPorts is a centralized collection of software ported to the Haiku platform; the main goal of the project is to facilitate cooperation towards porting efforts. There are a [number of guides](https://github.com/haikuports/haikuports/wiki/browse/) on its website that can be very useful when working with the Haiku build recipes and for porting software to Haiku in general. To help with creating HaikuPorts build recipes, you have to join [GitHub](https://github.com/) to suggest changes. If you want to really get cracking, then you should introduce yourself to the HaikuPorts team on their [discussion list](https://github.com/haikuports/haikuports/wiki/MailingList).

#### HaikuPorter

The HaikuPorter tool is a Python based tool that is provided to ease the fetching, patching and building of source code. It can be compared to a slim version of Gentoo Portage. Each port contains the Haiku-specific patches to the original source code. It fetches the original source code, applies the Haiku-specific patches, builds the software, and packages it. Python developers wishing to help with HaikuPorter have to join [GitHub](https://github.com/) to submit a pull request with your changes on the [HaikuPorter](https://github.com/haikuports/haikuporter) source code repository.

- - -

## Web Infrastructure

#### Haiku project website

While we are all about Haiku as an operating system, the website itself is an entirely different beast in comparison. The website is currently maintained by a small group of people, and we can always use some help. If you would like to give us a hand editing content and other website related chores, contact us on the [\[haiku-web\] mailing list](https://www.freelists.org/list/haiku-web "[haiku-web] mailing list").

#### HaikuDepot Server

The [HaikuDepot web application](https://depot.haiku-os.org) is a Java based online tool for working with Haiku software packages. It aims to be an internet-accessible catalog of these packages, a repository of package metadata and a user interface to edit this additional data. The metadata hosted on the website and sent remotely to the HaikuDepot desktop application includes data such as screenshots, icons, translations and user-feedback.

Java developers wishing to help with HaikuDepot Server only have to join GitHub to submit a pull request with your changes on the [HaikuDepot Server](https://github.com/haiku/haikudepotserver/) source code repository. Documentation for HaikuDepot Server consists of an official [development and deployment handbook](https://depot.haiku-os.org/__docs/index.html), which includes a [chapter](https://depot.haiku-os.org/__docs/ch11.html) on getting a system set for development purposes. A [mailing list](https://www.freelists.org/list/haiku-depot-web) has also been set up to support the development of the HaikuDepot project.

###### Infrastructure Development Opportunities:

*   [Haiku project websites](/community/getting-involved/developing/infrastructure#website)
*   [Web applications](/community/getting-involved/developing/infrastructure#webapp)
