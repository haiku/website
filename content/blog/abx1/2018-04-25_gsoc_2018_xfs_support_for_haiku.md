+++
type = "blog"
title = "GSoC 2018: XFS support for Haiku"
author = "abx1"
date = "2018-04-25 22:29:40+05:30"
tags = ["haiku", "blog", "gsoc18", "xfs"]
+++

<p>Hello everyone! My name is Abhinand and I am really happy to say that I am one of the people who has been selected for GSoC 2018. And more importantly, I will be working on adding support for XFS. If you would like to ask something to me/track my progress, I have added the contact links at the bottom of this page.</p>

<p>I would like to begin with a short introduction about me and the work that I did so far. I am a computer science undergraduate student from Amrita Vishwa Vidyapeetham, in India. I am active member of FOSS@Amrita, an open source community in the college, through which I got to know about Haiku. I came across the project list in Haiku while I was searching for a project to do this summer. I got interested in two of the listed projects and starting writing proposal for the same. I started reading documents related to XFS, B+Tree, and Haiku file system modules and wrote a proposal with my understanding of the project. Afterwards, I was trying to explore the BFS codebase, as it uses B+Tree to store data. I came to know that BFS uses B+Tree to store data and this implementation can be used for XFS as well. Also, I was trying to understand how the file system uses Haiku file system modules and was able to get an idea of the classes needed for the file system.</p>

<h3>Why XFS?</h3>

<p>XFS is a high-performance journaling file system which was designed for large-scale storage systems. XFS file system can provide some of the following support:</p>

<ul>
  <li>Large, sparse files</li>
  <li>Large file system</li>
  <li>Many inodes</li>
  <li>Large directories</li>
  <li>Large allocations</li>
</ul>

<p>XFS also employs a journaling log in which metadata changes are collected so that file system operations can be carried out automatically in the case of a crash. Furthermore, there is the concept of a real-time device wherein allocations are tracked more simply and in larger chunks to reduce uneasiness in allocation latency.</p>

<h3>Tasks planned</h3>

<ol>
  <li>Explore current B+Tree implementation in BFS</li>
  <li>Identify various classes which can be used for XFS and understand it's working</li>
  <li>An empty file system module which can run using fs_shell and start implementing FS on top of this</li>
  <li>Use bonnie++ and XFS test suite for testing</li>
</ol>

<h3>Contact</h3>
<ol>
  <li>IRC: abx1_</li>
  <li>github: https://github.com/abhinand4858</li>
  <li>Trac: https://dev.haiku-os.org/search?q=before0ne</li>
</ol>
