+++
type = "article"
title = "How to document a class in the API documentation (Haiku Book)"
date = "2011-11-16T18:41:10.000Z"
tags = ["documentation howto api haiku-book"]
+++

The very first thing you need to do is install Doxygen and git onto your system if you haven't already done that. The best version of Doxygen to use is 1.7.3 since that is what is used on the server to automatically build the documentation, but, the latest one should work fine.

Next grab the Haiku source from git by running: <code>git clone git://git.haiku-os.org/haiku</code> in the directory you wish to work (note it will automatically create a <code>haiku/</code> sub-directory for you.)

If you just want to write documentation then you don't need to worry about building the operating system and running it so you don't have to go through the steps of getting the buildtools running or the prerequisite software. However, if you also want to build the OS follow the guide here: <a href="/guides/building" title="Haiku Building Guide">/guides/building</a> to learn how to get started building Haiku.

The existing documentation can be found in the <code>docs/user/</code> directory in the source tree. There are a number of directories located there for each kit and topic such as <code>interface/</code>, <code>app/</code>, <code>storage/</code>, etc. The documentation is not written directly in the source files in Haiku, instead it is separated out into separate files in the <code>docs/user</code> directory. You can look at the .dox files located there to get a feel for what the documentation files should look like.

Next decide which class you wish to document. You can look at the <a href="/legacy-docs/bebook/ClassIndex.html" title="BeBook Class Reference">BeBook</a> to get a list of classes from BeOS R5, most of which are also in Haiku or you can browse through the source tree in <code>src/kits/kitname</code> (for the cpp files) and <code>headers/os/kitname</code> (for the header files) to find the list of classes in Haiku.

Note, do NOT copy from the BeBook. We do not have the legal rights to create modified versions of the BeBook so use it for reference only! Copying from the BeBook is plagiarism.

Once you have found a class that you want to document create a file in the format of Classname.dox in the appropriate kit directory under <code>docs/user</code>.

For example let's say that you want to document the BPath class which is in the storage kit -- create a file named Path.dox under <code>docs/user/storage</code> (don't include the leading B in the filename).

The <a href="http://api.haiku-os.org/apidoc.html" title="Documenting the API">Documenting the API</a> page in the Haiku Book gives a really good overview of how to fill out the file with documentation but here is the basic process:

Open up the documentation file that you created (Path.dox) in an editor as well as the corresponding source file (src/kits/storage/Path.cpp) and header file (headers/os/storage/Path.cpp) for reference.

At the very top of the documentation file, add a header like so:

<pre>/*
 * Copyright 2011 Haiku Inc. All rights reserved.
 * Distributed under the terms of the MIT License.
 *
 * Authors:
 *               Authors name, authors email@domain.com
 * Corresponds to:
 *               /trunk/headers/os/support/Path.h  rev 43272
 *               /trunk/src/kits/support/Path.cpp  rev 43272
 */</pre>

Copy any authors from the source or header files if there is documentation already in those files (for instance there is some documentation already in <code>src/kits/storage/Path.cpp</code>), otherwise just add your own name and email to the Authors list. You can choose to copyright the file to yourself if you wish, but we'd prefer if you would assign the copyright to Haiku, Inc. as it makes things easier to manage in the long run.

Most every section is separated by two newlines so put two newlines after the header and then insert a <code>\file</code> command like this:

<pre>/*!
       \file Path.h
       \brief BPath class definition.
*/</pre>

These lines are very important, without them, none of the documentation will get generated!

Now you are going to want to refer to the header file of the class.

Add another 2 newlines and then add documentation for any enums, structs, unions, etc. that appear at the top of the file. Sometimes there are none of these like in the case of BPath.

You can look at some examples in the existing documentation pages to see how to document these structures or you can look it up the Doxygen documentation.

Add another 2 newlines and then add the class documentation.

<pre>/*!
       \class BPath
       \ingroup support
       \ingroup libbe
       \brief Brief description of what the class does.

       Detailed description of what the class does. Generally this is an
       outline of the methods available in the class so you might
       want to wait until the rest of the documentation is finished
       before filling this out. Also code examples sometime go here like
       this:

\code
code goes here
\endcode
*/</pre>

You are now done with the header file and now you want to refer to the source file. In the source file go through each of the methods one-by-one and add a documentation block for each method. The first methods in the file are (almost) always the constructor and destructor methods. Add a block that looks for each constructor like this:

<pre>/*!
       \fn BPath::BPath()
       \brief Creates an uninitialized BPath object.

       Detailed description goes here.
*/</pre>

After the constructor and destructor methods document each method like so:

<pre>/*!
       \fn status_t BPath::SetTo(const entry_ref* ref)
       \brief Reinitializes the object to the filesystem entry specified by the
              given entry_ref struct.

       \param ref the entry_ref

       \returns A status code.
       \retval B_OK The initialization was successful.
       \retval B_BAD_VALUE \c NULL \a ref.
       \retval B_NAME_TOO_LONG The pathname is longer than \c B_PATH_NAME_LENGTH.
       \retval B_ERROR other error codes.
*/</pre>

Note that you want to copy the method declaration from the source file (or the header file) in the <code>\fn</code> line for each method (this is how doxygen knows what method you are talking about.)

The most important pieces to document are a good brief description and the meaning of each parameter as well as the return value. Note that many methods return a status code -- in this case you want to document the meaning of each return code with a <code>\retval</code> command like in the example above. This is not always easy to do though since methods call methods call methods which return return return so it can be hard to figure out all the cases. Do your best.

Mark keywords with <code>\c</code> command (as in <code>\c NULL</code> or <code>\c true</code>) and method names with the <code>\a</code> command (as in <code>\a ref</code>.)

A good detailed description is sometimes helpful as well. You can use the <code>\remark</code> <code>\note</code> <code>\warning</code> and <code>\attention</code> commands to call out important pieces of information visually. <code>\remark</code> is the least serious callout, <code>\attention</code> is the most serious callout. Look in the Documenting the API page for more details on when to use each of these commands.

Finally, you can use the <code>\sa</code> (as in see also) command to refer to another method somewhere else in the documentation. For example:

<pre>\sa BPath::Append()</pre>

Repeat this process for each method in the file.

Once you have documented all the methods group related methods together. To do this add blocks before and after a group of methods like this:

<pre>/*!
       \name Group Name
       Detailed description of how the methods are related.
*/

//! @{</pre>

documentation of related methods goes here

<pre>//! @}</pre>

You may need to re-organize the methods a bit to put them in related groups, but most of the time the methods are in a pretty good order right from the source.

To build the Haiku Book run '<code>doxygen</code>' from the <code>docs/user</code> directory. You'll get a bunch of warning messages from other class documentation that we can't fix right now and you might get a few from the documentation that you added as well. If you do, fix those.

To see the html output open the <code>generated/doxygen/html/index.html</code> file in your favorite Web Browser. You should see your new class documentation there somewhere. For example click on the Storage kit link and a link to BPath should show up in the table.

Once you are happy with the output and want to submit the result, create a ticket of type 'enhancement' in category 'documentation' on trac (<a href="http://dev.haiku-os.org/" title="Haiku Trac">http://dev.haiku-os.org/</a>) and attach the .dox file to it. One of the many developers interested in the documentation will take a look at the file, comment on the ticket, or if it is acceptable, commit the result.