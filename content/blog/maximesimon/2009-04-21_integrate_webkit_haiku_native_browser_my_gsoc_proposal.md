+++
type = "blog"
author = "maximesimon"
title = "Integrate WebKit in Haiku native browser, My GSoC proposal."
date = "2009-04-21T14:13:34.000Z"
tags = ["gsoc", "WebKit", "browser", "gsoc2009"]
+++

<h3>Personal Profile</h3>

<ul>
<li><h4>Maxime Simon</h4></li>

<li><h4>Brief biography:</h4>

I am currently in my third year studying Computer Science at Rennes 1 University in France.

I have some experience with development thanks to several academic projects, chiefly written using the Java and C languages.

Our first big project used an obscure language called "oRis", an object and agent-oriented language developed as part of the doctoral thesis of Fabrice Harrouet. The project's objective was to design a simulation of pathfinding robots, with basic behaviour and capable of cooperating to achieve goals in a virtual maze. This project enabled us to learn how to manage a project using Subversion, and how to organise its development.
The project was managed at this page:
<a href=http://code.google.com/p/csr/>http://code.google.com/p/csr/</a>
<!--break-->
This year, our main project was to write a compiler in Java for a natural imperative "project" language, a good introduction to understanding and using widespread compilers.
The project was managed at this page:
<a href=http://code.google.com/p/compilateur-projet/>http://code.google.com/p/compilateur-projet/</a>


We also completed some smaller projects such as servers in Java, data structures in Java and C, a small file system in C and several TASM based projects.
I also participated in several personal projects with a friend:
The first was a try to redesign the previously mentioned simulator, this time using C++ and the Qt framework, to be more efficient, polyvalent, and user-friendly. This enabled me to learn how to program in C++, Qt and OpenGL. Sadly its development has been on hold for a while, due to lack of time.
The project was managed at this page:
<a href=http://code.google.com/p/projet-csr-cpp/>http://code.google.com/p/projet-csr-cpp/</a>


Our latest project is a micro-blogging website, mainly to address features and restrictions we disliked in Twitter and other similar sites. We decided to use the Google AppEngine framework to develop and deploy this site. We also decided to use Git instead of Subversion this time, partly out of interest, but also because it is much more flexible.
The project was managed at this page:
<a href=http://github.com/iMax-pp/pintme/tree/master>http://github.com/iMax-pp/pintme/tree/master</a>
</li>
</ul>


<h3>Project idea information</h3>

<ul>
<li>Integration of WebKit into the Haiku native browser</li>

<li><h4>Project goals</h4>
<ol>
<li>Integrate WebKit into the Haiku native browser</li>
<li>Design a library class providing an HTMLView frame</li>
<li>Write documentation for this library</li>
</ol>
</li>

<li><h4>Project description</h4>
The main goal of this project is to integrate WebKit into the native browser.
To do so, ideas of implementation into the browser will be taken from previous BeOS browsers such as NetOptimist, Themis or current browsers like NetSurf. For the WebKit part we would take example on the previous port of WebKit for Haiku.
Then, with the work done into the browser we would design a library using WebKit and the BeOS Interface. This library will provide a View component to display HTML using the WebKit renderer. It will be globally available in Haiku for any part of the system.
Documentation will be written using doxygen as required by the Haiku project.


<h5>Why do I want to work on this project?</h5>
First of all I want to work on this project in order to gain a strong knowledge in software engineering. I also want to work on an alternative operating system, mostly because I find it interesting as a personal goal but also as a professional goal. I am also interested in developing for the open source community, as I have only developed code for educational purposes or for myself, but never to help a community of users. This would also be an important experience.


<h5>What makes me the best person to work on it?</h5>
I already have experience with working in teams so I know how to organise myself, and this allowed me to be familiar with source code management. I also have some experience coding with C++ and additional frameworks, and I am comfortable with documentation, re-using source code from old projects, or making source code from scratch.
</li>
</ul>

