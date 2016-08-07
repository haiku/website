+++
type = "blog"
author = "sil2100"
title = "The Package format"
date = "2007-06-08T17:07:24.000Z"
tags = ["gsoc", "pkg", "packages"]
+++

Personal rant: my university examination session draws near and with it all credit tests as well. I'm doing my best in time management not to put any of my current tasks and projects into starvation, but exactly as Ryan wrote to me - it's <u>not</u> easy.

Going back to more Haiku-specific topics, last week I was mostly analyzing the .pkg format Be Inc. left us behind. After some tests, most crucial parts of it are clear to me now. I must say  most of their design solutions for this particular chosen concept had logical and technical grounds. To tell the truth, when I started hacking on this format I thought to myself: “Good god, who did this to you?”. I was wrong. Well... it's a very interesting one nevertheless. 
I'll try to throw a little light on the internals of this system. Keep in mind that all this information comes from Ryan's and my personal investigations – in this stage of development, it might not be as accurate as everyone would like it to be.

Anyway, with the information I gathered, I'm more or less able now to parse a normal everyday package. I will explain only those tags that I know the meaning of - don't get confused when some tags you see in the packages are not mentioned here. Also, some might get omitted if not needing much attention.

Let's start with the overall structure. One can say a package file consists of 6 sections: package header, file/folder data, file/folder info, group info and package info (along with license information) - usually appearing in this order. Deflated file data and attributes, along with folder attributes, are stored in the file/folder data section, beginning with either the FiDa (file data) or FoDa (folder data) tag. The actual deflated file data is included after the FiMF tag. The FBeA tag shows the beginning of the attribute sub-section, where afterwards all file/folder attributes are enlisted in BeAI (attribute info beginning tag), BeAN (name), BeAT (type) and BeAD (data) set of tags. 
All information such as filename, destination and group membership are included in the file/folder info section (FilI or FldI tag), along with the offset to the given file/folder data and attributes in the package (OffT tag). Most of the tags in this sections are self explanatory, so I will concentrate only on those more 'interesting' ones.

<pre>FilI/FldI: File/Folder information (section header)
Mime: File MIME type
Mode: File mode
Name: File/Folder name
Grps: Groups to which the file/folder belongs to (see below)
Dest: Destination path
Cust: Custom path flag (0 - predefined, 1 - custom)
Repl: Replace, collision philosophy
Plat: Package platform
CTim: Creation time
Mtim: Modification time
OffT: Offset to file/folder data
CmpS: Compressed size
OrgS: Original size
</pre>

Let's move on to groups. As you know, groups are installation profiles (types), where each can install different files into different locations. By default, there are always two profiles – Standard Install and Minimal Install. How are groups stored and recognized in the package? The group info section, beginning with the IGrp tag, enumerates all groups available (name, description and help text). The GrId tags at the end of this section tell the package manager in what order should the groups be printed on the screen for the user.
Each file has the groups that it is in written in the Grps tag. A value of 0 means no group, 1 being the first group (in order of appearance in the groups section), 2 - the second. This is not everything though, since a file can be a member of more than one installation profile. Let's consider a package with three groups. In this case:

0 – no group
1 – first group
2 – second group
3 – first and second group
4 – third group
5 – third and first group
6 – third and second group
7 – all three groups

After each group, the next indexes are all possible combinations of all other, already defined groups with the current one. 

File and folder destination paths. How does the package manager know what file goes where? In packages with files only, the algorithm is quite simple. The Dest tag holds the path index, but it's either the index of a predefined, system default path or defined by the user/package creator. The Cust tag seems to act as a flag which tells the package installer which it really is. When it is equal to 0, it looks in the predefined destination paths. All paths in the package start with a BPat tag and include a PaNa (path name) tag. But only predefined ones are followed by a FDst tag, which – from my experiments – contains a handle to the actual path.
The Dest tag can also have the value of 0xFFFFFFFF, meaning the install directory, or 0xFFFFFFFE when the file should reside in a directory packaged along with the file – which is the case I will discuss right now.

What about more complex packages, with nested directory trees, multiple folders and the like? From my observations this is done by, as I call it, shifting. Let's consider a simple example to illustrate this. We have two packages – each of them has a folder and a file. In the first one, the file was originally part of the folder, wheres in the second one, it was residing beside the folder (at the same directory level). This is how the FldI and FilI subsections would be packaged in the file:

(File in Folder case)
<pre>Folder
File
7 empty bytes
</pre>

(File outside Folder case)
<pre>Folder
7 empty bytes
File
</pre>

Those 7 empty (0 valued) bytes act as a end of directory (EOD for short) sub-tree mark. All package directory trees are created using this method – quite useful if I might say. A package might look like this:

<pre>Folder: CoolFolder1
File: File1
File: File2
Folder: AnotherFolder1
File: CoolFile1
EOD
Folder: AnotherFolder2
Folder: SubFolder
File: CoolFile2
EOD
EOD
EOD
</pre>

Which would in fact give the following directory tree:
<pre>
+ CoolFolder1
	- File1
	- File2
	+ AnotherFolder1
		- CoolFile1
	+ AnotherFolder2
		+ SubFolder
			- CoolFile2
</pre>

There's still many unknowns, but I think the most crucial parts of the format have been taken care of already. I'll make some additional tests to check if I didn't mistake anything till now. The next step would be implementing the actual package parser. With it, it would be much easier to check if I got everything right. Maybe after the nearest exam, I suppose?