+++
type = "blog"
author = "general_maximus"
title = "Introduction to the (Unnamed) Full Text Searching and Indexing Tool"
date = "2009-05-17T13:29:50.000Z"
tags = ["hcd", "hcd2009"]
+++

Hi, I'm Ankur Sethi. I'm a first year Information Technology student at Indraprastha University, New Delhi. I will be working on a full text indexing and search application for Haiku Code Drive 2009.

I use Mac OS X as my primary OS. Before I switched to the Mac, I had been an Ubuntu user for four solid years. I first read about Haiku on OSNews back in 2007 (my profile says my account is 1 year 36 weeks old), and I was hooked. What first caught my attention was the incredibly short boot time, and the low resource usage. When I read up more about what Haiku is like under the hood, this is what I thought: WANT (excuse the meme). I'm waiting for the day I can just pop a Haiku install disk into my PC and use Haiku as my primary OS.

<h3>About The Project</h3>

The objective is to build an application that can be brought up with a simple keystroke and used to navigate to important documents and applications quickly, thus reducing mouse usage.

Here are my project goals, exactly as I listed them in my GSoC application:

<ul>

<li>Implement a full-text indexing tool which uses a database for indexing files containing textual content, and filesystem attributes for non-text files (MP3s, images, etc.).</li>

<li>Create a plugin-based architecture that allows the indexer to index different kinds of textual content (i.e., PDFs, ODFs etc.).</li>

<li>Implement a userland process to keep the index in sync as the files change on disk.</li>

<li>Create a mechanism to query the index and implement an algorithm to sort search results by relevance.</li>

<li>Create a GUI front end for querying the index.</li>

</ul>

I will keep the Haiku world updated on what I'm doing through this blog. Looking forward to a fun summer :)

EDIT: Changed title. Names, anyone?