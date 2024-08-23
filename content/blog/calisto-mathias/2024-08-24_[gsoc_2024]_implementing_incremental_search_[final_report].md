+++
type = "blog"
title = "[GSoC 2024]: Implementing Incremental Search [Final Report]"
author = "calisto-mathias"
date = "2024-08-24 01:46:45+05:30"
tags = ["haiku", "software", "gsoc", "gsoc-24", "tracker", "user-interface"]
+++

## Introduction

The goal of this post is to document the changes I’ve successfully made during the GSoC period, the current state of the project, future enhancement goals, and a few other topics. I also want to extend my thanks to the Haiku developers and community for the opportunity to work on this fantastic operating system. :)

## Background

Haiku is a feature-rich operating system known for its incredibly fast search system. This efficiency is largely due to its powerful Query system and the Be file system's effective use of file metadata, which provides superior indexing compared to many other operating systems.

So, what was my project about? Despite Haiku’s fast search capabilities, the Find Panel was outdated and lacked several features that could improve user experience. My research identified a few missing functionalities that could greatly enhance file searching:

1. The ability to limit searches to specific directories.
2. The option to pause a running query.
3. A more user-friendly Find Panel interface, with search columns aligned to the attributes being queried.
4. Support for incremental search, allowing users to see search results update as they modify their search terms.

These improvements are designed to make searching in Haiku even more powerful and intuitive.

## Incremental Search: A Bit More of an Explanation

Have you ever run a search and wanted to tweak your search terms repeatedly while seeing updates in real time? That’s what incremental search offers. It allows you to adjust search terms and see results update automatically, without having to start a new search or manually re-run the current one. Instead of executing and adjusting queries repeatedly, incremental search lets you type and modify terms in one go, updating results on the fly.

This was the central focus of my project and where I dedicated most of my efforts!

## What I Accomplished During My Google Summer of Code Period

### Cleaning Up the User Interface of the Find Panel

My first task was to reorganize the cluttered options in the Find Panel into a dedicated menu bar. This introductory task helped me get acquainted with Haiku’s development style. Although progress was slow initially due to my inexperience, I learned a lot from this process. Here’s a look at the initial changes and their appearance:

<figure>
	<img src="/files/blog/calisto-mathias/Final-Report/old-find-panel.png" alt="Old Find panel">
	<center><figcaption>Old Find Panel</figcaption></center>
</figure>

<figure>
	<img src="/files/blog/calisto-mathias/Final-Report/new-find-panel.png" alt="New Find Panel" width="598px">
	<center><figcaption>New Find Panel</figcaption></center>
</figure>

### Adding Folder Filtering Abilities to Searches Executed Through the Find Panel

The second task involved adding folder-based filtering to searches via the Find Panel. This enhancement was implemented at the application layer rather than the file system level. It maintains high search speeds while limiting results to selected directories. Users can now select multiple directories and merge the search results within the results panel. This functionality is accessible through the third drop-down menu from the left.

Users can select directories using the last option in this drop-down menu. This action opens a file panel where they can choose one or more directories (or symbolic links to directories). The selected directories then appear in a clearly visible section within the same drop-down menu. Users also have the option to unselect any directories they no longer want to include.

<figure>
	<img src="/files/blog/calisto-mathias/Final-Report/find-panel-with-directory-selectors.png" alt="New Find Panel Directory Selector" width="598px">
	<center><figcaption>Selecting Directories in the New Find Panel</figcaption></center>
</figure>

<figure>
	<img src="/files/blog/calisto-mathias/Final-Report/Selecting-Directories.png" alt="New Find Panel Directory Selector" width="598px">
	<center><figcaption>Selecting Directories in the New Find Panel (contd.)</figcaption></center>
</figure>

<figure>
	<img src="/files/blog/calisto-mathias/Final-Report/directories-entries-in-menu.png" alt="New Find Panel Directory Selector" width="598px">
	<center><figcaption>Selecting Directories in the New Find Panel (contd.)</figcaption></center>
</figure>

### Adding the Design for an Incremental Search Find Panel

The most crucial and challenging aspect of my project was implementing the design for the incremental search find panel, which associates attribute columns with their corresponding search columns. While I managed to implement the core functionality, there are a few limitations that need to be addressed in the future.

Currently, the incremental find panel integrated into the Find Panel results window is under review on GitHub (and soon on Gerrit). It will take some time before it is merged into the main codebase. Despite the challenges, I managed to get the core functionality working, allowing users to pause and restart their queries, as well as adjust search terms, all within the results window without switching back and forth repeatedly.

<img src="/files/blog/calisto-mathias/Final-Report/incremental-search-first-look.png" alt="Incremental Search panel">
<br><br>

The user can select the various methods of combination in the same column. This combination follows the same rules as the searcy "by-attribute" mode in the old find panel. 

<img src="/files/blog/calisto-mathias/Final-Report/selecting-combination-options.png" alt="Incremental Search Panel">
<br><br>

Apart from this, users can pause and re-execute their queries on the file-system without any hassle now. The columns can also be moved around with each other, in order to set more powerful combination modes. The only caveat at the moment is that the two different combination modes for the incremental find panel hasn't been completed. As of now, the columns are always combined using the "AND" operator (so the order does not matter, but this is temporary!)

## What’s Still Left to Do?

Implementing this project in one go was quite challenging. Initially, I hoped to complete everything by the project deadline, but that proved unrealistic. It took me some time to grasp the technical details involved. However, I believe I can complete the remaining work with a bit more time and by tackling it in smaller steps.

Here’s what remains to be done in the incremental find panel:

1. **Incremental Search with Keystrokes:** The goal was to refresh results with each keystroke. Although I implemented this, it turned out to be unstable due to the high load from frequent clearing, refreshing, and restarting of queries. I had planned to develop a debouncer to manage this load but didn’t manage to complete it. This will be my primary focus after the GSoC’24 period ends.
2. **Folder Filtering Integration:** Folder filtering is not yet functional in the incremental search panel within the results window. This should be a straightforward addition, and I plan to incorporate it as soon as the initial code is merged.

## Learning Experience from GSoC’24

GSoC’24 with Haiku has been an incredibly rewarding experience. Before starting, I was relatively new to C++ and struggled with using git effectively. Thanks to GSoC, I’ve gained confidence and skills. Although I still have a long way to go, working on Haiku has inspired me to explore further and contribute more to both Haiku and other open-source projects.

Interacting with the Haiku community and receiving their advice has been invaluable. I feel like I’ve made some great friends along the way, which has made the experience even more enjoyable.

Here are some key lessons I’ve learned during my time with Haiku:

1. **Git:** Initially, I struggled with git, having only used it for small projects. Working with Gerrit taught me how to use git more effectively for collaboration. Special thanks to zardshard and waddlesplash for their guidance and resources. I particularly appreciated waddlesplash’s detailed explanation of git fundamentals.
2. **Importance of Style Guidelines:** I never used a style guideline for my personal projects, but I’ve learned how crucial they are for development speed. The Haiku style guide has proven to be highly effective, and I plan to adopt it for all my future C++ projects.
3. **Navigating Large Codebases:** At first, I found it challenging to work with a large codebase. I felt overwhelmed by its size and complexity. However, over time, I improved my ability to navigate and contribute to the codebase, including adding a new view to the Haiku Results panel.
4. **Communication Skills:** This project has significantly enhanced my ability to communicate effectively with community members.

## Conclusion

I’m deeply grateful to the Haiku community and development team for giving me the chance to contribute to Haiku. This project has not only improved my programming skills but also made me a fan of the Haiku operating system. I’m eager to keep contributing and learning as I continue my journey with Haiku.

A big thank you to my mentors, Niels Sascha Reedijk and Humdinger, for their ongoing support and guidance throughout the GSoC project. Their timely responses and insightful advice made the process smoother and helped me overcome many challenges and self-doubt.

I’m excited to keep contributing to the Haiku operating system and look forward to future opportunities to grow and learn.
