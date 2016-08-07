+++
type = "blog"
author = "antirush"
title = "Network Services Kit Introduction"
date = "2009-05-17T03:20:09.000Z"
tags = ["hcd", "hcd2009"]
+++

Hello Haiku World, I'm Tom Fairfield and I've been chosen to work on a project for the Code Drive this summer.  You'll see me around IRC and elsewhere as fairfieldt or AntiRush.  I'm a 4th year computer science major at Xavier University in Cincinnati, Ohio. 

I've been interested in operating system development for quite some time and Haiku is a great looking project in that regard.   

The project I proposed and was chosen to complete is a Network Services Kit for Haiku.  

    List of project goals:
       o Design an API for the Services kit
          o Implement a basic Services Kit that provides this base API that's extendable for any web service
          o As a byproduct create various utility classes for HTTP/HTTPS and other web-oriented functions that can be easily re-used.
          o Build a Twitter service on top of the base Services Kit
          o Write a proof-of-concept application that utilizes the Twitter functions of the Services Kit
          o Fully document the base Services Kit so that it is easy for future developers to add their own services.  This will be both documenting the API and with a tutorial following the implementation of a protocol.  Given time the tutorial will be written in conjunction with another server. Flickr?  Facebook?
       o Fully document the Twitter Service as well as the application.  Again this will be both API documentation and a tutorial following the development of the Twitter application to demonstrate the use of the Services Kit.   

The first step is to design and implement the HTTP library.  I've been working with Pier Fiorini to design an api for both the HTTP library and the Network Services kit itself.  At this point I've begun writing code for the HTTP side of things.  

I'll try to frequently update with new blog posts to keep the community involved.  Any comments or suggestions are more than welcomed - it can only make my project better!
