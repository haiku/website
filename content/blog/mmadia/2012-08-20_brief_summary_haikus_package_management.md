+++
type = "blog"
author = "mmadia"
title = "A brief summary of HAIKU's package management."
date = "2012-08-20T21:26:09.000Z"
tags = ["package management"]
+++

With the announcement of Ingo and Oliver's contracts for package management, it is worthwhile to revisit how package management will function. When reading, keep in mind that this explanation will be condensed, simplified, and partially incomplete. Nonetheless, it will provide a general overview on how things will work.
<!--break-->
Each piece of software lives on the hard drive as a type of compressed archive. For this explanation, let us call that file a "package-archive". That package-archive contains directory information for all of its contents. As an example, the settings file goes here, the binary there, etc.


The package-archive is never decompressed onto the filesystem. Instead, Haiku gives the appearance that the package-archive is extracted. There is no mess of files being scattered about in obscure locations. In other words, a single package-archive contains the software itself, its associated data files, and a list of its dependencies. The dependencies themselves exist as individual package-archives.


There are many reasons to avoid including the actual dependencies (and their dependencies and those dependencies and so on) inside the package-archive. To give a very simple explanation, BeOS and Haiku are designed to be modular. Think of image translators. There is a single PNGTranslator which can be used by every program that uses Haiku's API. If a critical memory leak was found in PNGTranslator, every one of those programs would be affected (ShowImage, WebPositive, WonderBrush, slide show screensavers, ...). Once that bug gets fixed, instead of needing package maintainers to rebuild, repackage, and reupload all of those programs (and then for each and every end user to download and install all of the affected software), a user can simply install a new version of PNGTranslator and every thing is fixed. To put it simply, it would be blasphemous and completely against the design of BeOS and Haiku to suggest that every Haiku application include its own copy of PNGTranslator. This concept of "re-use as much as possible, in as many places as needed" extends to software dependencies, as well.


OK, back to the explanation ... As an example of installing software, let us imagine WebPositive was a separate download. At the moment, WebPositive requires Curl LibXML2 SQLite WebKit. Those dependencies require OpenSSL and XZ-Utils. (Don't believe me? See <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/OptionalPackageDependencies#n39">OptionalPackageDependencies</a>)


There would be the following files:
 * webpositive-&lt;version&gt;.package-archive
 * curl-&lt;version&gt;.package-archive
 * libxml2-&lt;version&gt;.package-archive
 * openssl-&lt;version&gt;.package-archive
 * sqlite-&lt;version&gt;.package-archive
 * webkit-&lt;version&gt;.package-archive
 * xz-utils-&lt;version&gt;.package-archive


For installing software, you can manually download and copy the package-archives into the watched directories --or-- you can use a guided process. (At this time, I'm not certain if that guided process will be available as a Haiku application or some type of website framework or both as options).


To install the software, webpositive-&lt;version&gt;.package-archive gets copied to one of several watched directories. Haiku determines which dependencies need to be installed. You will be informed of that and given the choice to either get them manually or to have Haiku get them for you. That's it, you're done.


To uninstall the software, simply move that compressed archive out from the directory. You can choose to completely delete the package archive or simply relocate it to a non-watched directory. That's it, you're done. (To note, the package system will even notice when there are packages that are no longer needed.)


For a complicated problem that many operating systems do not handle gracefully, this implementation sounds like the perfect fit for Haiku. There is no need to compile software, just to install it. There are no littering of your filesystem from installing software. It simply works.