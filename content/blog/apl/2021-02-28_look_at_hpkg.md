+++
type = "blog"
title = "A Brief Look Inside HPKG"
author = "apl"
date = "2021-02-28 12:00:00+12:00"
tags = ["haiku", "haikudepot", "hpkg", "hpkr", "format"]
+++

The Haiku operating system has a packaging system that leverages a clever file format called HPKG.  This article provides a simplistic overview of how the file format is structured.

## Installing and Uninstalling HPKGs

To get a package installed on their Haiku computer, a user would download a package file in a format called HPKG.  The user would typically do this via the [HaikuDepot](https://www.haiku-os.org/docs/userguide/en/applications/haikudepot.html) desktop application or by using the `pkgman` command line tool.  Once an HPKG file is downloaded and moved into place at `/system/packages`, the contents of the package appear read-only in the file system.  An example file might be `pe-2.4.5-8-x86_64.hpkg` which would provide the necessary files for the popular Pe text editor to be used.

At some later date, should the user no longer want the package installed, they would move it out of `/system/packages` and instantly the files of the package would vanish from the file system.  The user would typically use HaikuDepot or `pkgman` to uninstall the package, but it would work equally well to just use [Tracker](https://www.haiku-os.org/docs/userguide/en/tracker.html) to remove the HPKG because it is simply a file.

The HPKG acts as an archive of the package's files but instead of the Haiku operating system unpacking the files into its own storage, it is instead mounting the HPKG file contents into its own file system.

The HPKG file format is designed to facilitate this mode of use.

## HPKG File Structure

(_Many of the fine details of the HPKG file format are glossed over here in order to provide the reader with an overview._)

### The Outer Container

The structure of the "outer container" of the HPKG file is shown in the following diagram.

![Outer Container](/files/blog/apl/look_at_hpkg/outercontainer.png)

The "Magic" section is just a short four bytes that identify this file as being an HPKG.  This acts as a sanity check to make sure this data is most likely an HPKG file and not some other sort of a file such as an image.  A few special characters placed at the start of a file is a commonly used technique to help with detecting the type of a file.

The "Header" then contains a number of critical pieces of information about the file.  The information constitutes a set of numbers that represent quantities of elements in the file, offsets into data etc... all of which is required to be able to make sense of the rest of the file.

The remainder of the file, shown as a grey box in the diagram above, is called "The Heap".  At an abstract level, the heap can be considered to be a large piece of uncompressed data.  When stored, the uncompressed data is broken into 64KB pieces.  Each 64KB piece is compressed and stored as a compressed Chunk in the HPKG one after the other.  At the end of the Chunks is an array of integers that contain the compressed lengths of the Chunks.

Data in the Heap is later addressed with a simple uncompressed-data offset and length.  By knowing the uncompressed chunks are (excepting the last one) 64KB in size and that the lengths of the compressed Chunks are known, it is possible to randomly access data within the Heap.

### The Uncompressed Heap Structure

Now that it is known roughly how the outer container works, it is possible to look into the uncompressed Heap itself without needing to consider the compression system further.

![Inside Heap](/files/blog/apl/look_at_hpkg/insideheap.png)

The Header provides coordinates specifying the location of two areas of the Heap used for two data structures called the Table of Contents (TOC) and the Attributes.  The TOC is a list of what file-system objects are provided for by the package.  The Attributes carry meta-data about the whole package such as the summary, description, copyrights etc...

At the start of the TOC and also the Attributes resides a String Table.  Again, the Header defines the size of the String Table in each case.  The String Table is a list of strings that can be referenced from the TOC / Attributes by their index in the table.  By means of example; should the string "How Now Brown Cow" appear three times in the Attributes then it would have a single entry in the Attributes' String Table with three references to it; meaning that the string only needs to be stored once and not three times.

The TOC and Attributes themselves form a tree structure.  Here is an example from the TOC expressed in textual debug output.  In reality the data for the TOC is stored in a binary format.

```
dir:entry : STRING : apps
  file:type : INT : 1
  file:atime : INT : 1551679116
  file:mtime : INT : 1551679116
  file:crtime : INT : 1551679116
  file:attribute : STRING : BEOS:TYPE
    file:attribute:type : INT : 1296649555
    data : RAW : 31 bytes {off:0, len:31}
  dir:entry : STRING : Tipster
    file:permissions : INT : 493
    file:atime : INT : 1551679116
    file:mtime : INT : 1551679116
    file:crtime : INT : 1551679116
    data : RAW : 153840 bytes {off:31, len:153840}
    file:attribute : STRING : BEOS:TYPE
      file:attribute:type : INT : 1296649555
      data : RAW : 35 bytes {off:153871, len:35}
    file:attribute : STRING : BEOS:APP_SIG
      file:attribute:type : INT : 1296649555
      data : RAW : 26 bytes {off:153906, len:26}
    file:attribute : STRING : BEOS:APP_FLAGS
      file:attribute:type : INT : 1095782470
      data : RAW : 4 bytes
    file:attribute : STRING : BEOS:ICON
      file:attribute:type : INT : 1447641934
      data : RAW : 544 bytes {off:153932, len:544}
...
```

It is possible to visualize the file structure from this debug output.  The first file entry seen here is `/apps/Tipster` and it has an HVIF formatted icon of only 544 bytes which can be obtained from the Heap at uncompressed offset 153932.  The data for the application's binary can be found in the Heap at offset 31 and the binary is 153840 bytes in length.

Likewise, here is an abridged snippet of the Attributes which are fairly obvious to understand;

```
package:name : STRING : tipster
package:summary : STRING : An application to display Haiku usage tips
package:description : STRING : Display brief but informative ...
package:vendor : STRING : Haiku Project
package:packager : STRING : Builder mmlr_x86_64 <hpkg-builder@haiku-os.org>
package:flags : INT : 0
package:architecture : INT : 4
package:version.major : STRING : 1
  package:version.minor : STRING : 1
  package:version.micro : STRING : 1
  package:version.revision : INT : 1
package:copyright : STRING : 2015 Vale Tolpegin
package:copyright : STRING : 2016 Hannah Pan
package:copyright : STRING : 2016-2018 Humdinger
package:copyright : STRING : 2017 Akshay Agarwal
package:copyright : STRING : 2017 vanishakesswani
package:copyright : STRING : 2018 Janus
package:license : STRING : MIT
...
```

## HPKR

There exists a cousin to the HPKG file format called HPKR.  The HPKR is similar but not the same as HPKG in structure.  Instead of carrying all of the files required for one single package, HPKR contains a catalog of meta-data about a number of packages for a repository such as Haiku Ports.  A repository is a collection of packages and in this way, the HPKR is the index into the repository of packages.

## Finding Out More

To find out more about the specific details of these file formats, see the [documentation](https://git.haiku-os.org/haiku/tree/docs/develop/packages/FileFormat.rst) in the Haiku source repository.

It may also be interesting to see the C++ [implementation](https://git.haiku-os.org/haiku/tree/src/kits/package/hpkg) in the Haiku source, or the Java reader [implementation](https://github.com/haiku/haikudepotserver/tree/master/haikudepotserver-packagefile) in the Haiku Depot Server source.  Haiku Depot Server has a reader for both the HPKR and HPKG file formats.
