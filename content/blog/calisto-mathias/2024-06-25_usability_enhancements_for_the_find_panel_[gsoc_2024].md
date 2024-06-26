+++
type = "blog"
title = "Usability Enhancements for the Find Panel [GSoC 2024]"
author = "Calisto-Mathias"
date = "2024-06-25 16:13:17+05:30"
tags = ["haiku", "software", "user-interface", "gsoc", "gsoc24", "tracker"]
+++

# Enhancing the Find Panel: A Comprehensive Update

## Introduction

Hi there everyone. Since I made my first contribution to the project, I thought making a blog post about it would be helpful. I’m excited to know your thoughts on the changes that have been made to the Find Panel. Most of the current changes are made with ease of use kept in mind.

These updates include the addition of a Menu Bar and the migration of the more-options section into this Menu Bar. This blog post details all the changes and how they are intended to be used.

## Key Changes and Their Benefits
<img src="/files/blog/calisto-mathias/new_save_panel_version_1.png">
<br><br>

### Menu Bar Integration

The latest change in the Find Panel includes adding a Menu Bar and migrating the more-options section into this Menu Bar. This new layout provides a more organized and intuitive interface, making it easier for users to access various options and features.

### Saving a Query
<img src="/files/blog/calisto-mathias/new_save_panel_query_menu.png">
<br><br>

#### Save As Option

The "Save As" option allows users to save a query directly to any location on their storage drive. Previously, this was only possible through a less obvious drag-and-drop icon. Now, with this option added to the Menu Bar, the Find Window maintains a uniform approach similar to other applications.

A new save panel has been implemented, enabling users to mark the query as a template while saving it. This panel also provides the option to add the query to a set of templates, regardless of the location where the query is saved.

#### Save Option

A new "Save" option has been added to the Find Panel’s Menu Bar. This option allows users to treat queries and query templates as documents rather than immutable entities. The Save option is context-sensitive, being enabled or disabled based on the situation.

- **Without Reference:** When the Find Panel is opened without selecting a template file, the Save option is disabled.
- **With Reference:** Once you save the current search terms using the Save As option (either as a query file or a template file), the Save option becomes enabled. This allows you to override changes to the file without needing to open the Save As panel. The save option is also enabled when you open up the Find panel by double-clicking on a template.

It’s important to note that the Save option always references the most recently saved file. If you use the Save As option twice and then use the Save option, it will update the second saved file. This new feature allows users to easily modify both queries and query templates, a functionality that was not available in previous versions of the Find Panel.

### Opening a Query

Users can open a query using the Find Panel, which brings up an Open Panel, allowing them to make a selection. This streamlines the process of managing and accessing saved queries.

### Templates Menu

The templates menu provides users with a convenient way to select a template in the Find Panel. Newly saved templates are immediately updated in this menu, unlike the previous Find Panel. Additionally, there is an option to clear all templates from the file system, regardless of their location.

### History Menu

The history menu offers users a convenient way to view their history in an organized manner. This allows them to easily review and save any entries that might not have been saved initially. Additionally, this approach aligns with the planned history menu for the Find Panel, which will eventually display only saved queries once incremental search is implemented.
<br><br>
<img src="/files/blog/calisto-mathias/new_save_panel_unsaved_history.png">
<br><br>
<img src="/files/blog/calisto-mathias/new_save_panel_saved_history.png">
<br><br>
### Options Menu
<img src="/files/blog/calisto-mathias/new_save_panel_options_menu.png">
<br><br>
The Options Menu consists of two options:

1. **Clear Templates:** This option deletes all the templates saved on the filesystem and refreshes the Template menu to reflect this change immediately.
2. **Clear History:** This option allows users to delete either all query files or only temporary query files from the filesystem.

### Improved User Flow for Saving Queries

#### The Mental Model on Saving a Query

The usual flow for searching and saving through the Find Panel now works as follows:

1. A user opens the Find Panel, edits the search terms, and executes a search.
2. To save a query, the user uses the Menu Bar, which offers options to save in the default `~/queries` folder and to save it as a favorite or not.
3. The user can also choose to save it in a different directory, giving them control over where exactly to save it.

### Query as a Document File

In this updated Find Panel, a Query is treated similarly to a document file. It includes properties specific to that query, such as:

- Details on the fields and search terms.
- Details of the directory selected by the user in the Find Panel.

When a user wants to save these details, they can. If a Query file is opened using the Menu Bar, the user can override and save the document using the same file. Thus, a Query contains all the information related to the search being executed on the file system. The options selected in the Find Panel are part of the query file itself.

## What About Searching In A Specific Directory?

On this front, there has been quite some progress that I have made but it isn’t published to the Gerrit Review system just yet. Despite that, I have marked the sections of code that are responsible for the processing of results. Although I would not be able to use the `TFilteredQuery` class to bring about the functionality due to the results window directly using a kernel function, I would still be able to filter out these results using some filter functions.

### Are Directories a Property of the Search Itself or Applied On a Query File Instead?

In the current state of things, we have decided to go ahead with treating the directories that are selected along with a query to be a property of the Query File/Template itself, much like the Volumes that it is searched on.

It is not something that is applied to a query; rather, it is a property of the query itself.

### When Will The Folder Filtering of Queries be Available?

I think I am very close to finishing up this feature and it should be available before the mid-term evaluation of the GSoC period gets over. 

### Relevant Code Sections That Will Be Modified in Upcoming MRs through Gerrit:

1. **PoseView.cpp:**
   - I am looking into adding a BObjectList to the PoseView file which can be used for storing filters. These filters could then be applied while loading the pose using the `GetNextDirents` function.
2. **FindPanel.cpp:**
   - Since directories will be considered properties of a query file, they will be stored as attributes within this file. When the tracker loads the file, it will read these attributes and apply the filters accordingly. We believe these enhancements will greatly improve the usability and flexibility of the Find Panel, offering a more intuitive and powerful search experience. We invite all users to explore these new features and provide feedback to help us keep enhancing Haiku OS.

I hope these enhancements improve the usability of the Find Panel, providing a more intuitive and powerful search experience. I encourage all users to explore these new features and provide feedback to help me continue improving Haiku OS.
