+++
type = "blog"
title = "[GSoC 2024] Enhancing Tracker: Next-Gen Find Window and Functionalities"
author = "Calisto-Mathias"
date = "2024-05-15 14:52:36+05:30"
tags = ["haiku", "software","gsoc","gsoc24","user interface"]
+++

# Introduction

Hey There!

My name is Calisto Abel Mathias, and I am excited to introduce myself as a first-year undergraduate student at the National University of Technology in Karnataka, India. I am honored to have been accepted into the Google Summer of Code (GSoC) program for 2024 under the mentorship of the Haiku project. A huge thanks to my two mentors - Neils and Humdinger for embarking on this journey with me.

This summer, I will focus on enhancing the Tracker application’s Find Panel in Haiku. The Find Panel is essential for efficient file searches and management. Although new to Haiku, I am eager to learn and contribute to this vibrant open-source community.

Stay tuned for updates as I embark on this exciting journey!

# What My Project Is All About

The current design of the Find Panel in Haiku lacks easy and seamless query editing. Traditionally, users input their search attributes, execute the search, and wait for a new window to display results as they are found. However, this method can be cumbersome, requiring users to repeatedly edit their queries. A more intuitive approach, widely adopted in other operating systems, is to provide real-time feedback as users edit their search terms. This dynamic interaction greatly enhances the user experience by providing instant results and eliminating the need for multiple query edits. My project aims to implement this feature, ensuring a smoother and more intuitive search process for all users.

I plan to integrate new features, such as targeted directory searches for files to improve efficiency, and displaying non-indexed attributes in the column list view as part of the results, enhancing the search experience. However, users won’t be able to add search terms specifically for these attributes.

# Goals

## Rework the User Interface for the Find Panel

The foundation of the project centers on developing a contemporary and user-friendly find panel, leveraging classes from the Interface Kit to enhance the search experience. Depending on time feasibility, exploring the creation of a custom column class to display more complex views in the Column Types could be considered. The find panel would comprise a Column List View, featuring selected search attributes with corresponding input fields positioned above the relevant columns, streamlining the process of executing queries and locating files faster and more efficiently.

## Introducing Directory-Specific Search Capability

The project also aims to introduce the capability of executing search queries within specific directories, in addition to searching across entire volumes. This feature enhancement will offer users greater flexibility and precision in their file searches, further enhancing the overall functionality and usability of the find panel.

## Inclusion of Non-Indexed Attributes in Search Results

In further enriching the Find Panel’s functionality, the project includes the incorporation of non-indexed attributes in search results. Recognizing that these attributes often hold valuable information for users to identify their files, this enhancement aims to provide a more comprehensive search experience. Each non-indexed attribute will also be displayed in its specific column along with the result entries, complemented by a singular disabled search input field above it. This design element serves to indicate that these attributes cannot be used for direct searching, yet their presence offers users additional context and insight into their files.

## Tracking Progress of This Project

Right now, my mentor Neils and I are figuring out the best way to keep track of the changes I make to the code. Since the project involves a lot of reworking and adding new features, it’s important to have a plan for how these changes will fit into the Haiku software smoothly. As soon as we come to a good workflow, it will be uploaded on this blog-post. Stay tuned for updates!

# Final Remarks

It’s my first time writing code for such a large codebase, and I’m excited about the opportunity to learn and grow in this environment. I also hope to maintain this project for a long time, making it a part of my coding journey.

