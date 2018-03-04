+++
type = "article"
title = "Creating an OptionalPackage"
date = "2009-05-10T01:23:57.000Z"
tags = []
+++

<p>
This page details the steps in creating an OptionalPackage. In addition to being a regular binary distribution archive, an OptionPackage includes a plain text file called <code>.OptionalPackageDescription</code> and possibly the license file.
</p>

<div class="alert alert-info">NOTE: With the recent incorporation of package management, OptionalPackages are obsolete. Haiku package files (HPKG) replace them. See <a href="https://github.com/haiku/haiku/blob/master/docs/develop/packages/BuildingPackages.rst">PackageManagement/BuildingPackages</a> and <a href="https://github.com/haikuports/haikuports/wiki/HaikuPorter-BuildRecipes">HaikuPorter / BuildRecipes</a> for instructions on creating HPKG's.</div>

<h3 class="icon-document-medium">.OptionalPackageDescription</h3>
<p>In <a href="https://dev.haiku-os.org/changeset/25050">changeset 25050</a>, support for these files was introduced. The contents of <code>.OptionalPackageDescription</code> is appended to AboutSystem's "COPYRIGHTS" attribute, which will cause the respective info to be shown in the about view.</p>
<h4>Creating from scratch</h4>
<p>
When creating a new <code>.OptionalPackageDescription</code> file, it is advisable to use a monospaced font, such as "DejaVu Sans Mono". This will make it easier to ensure the accuracy of white space formatting. Every <code>.OptionalPackageDescription</code> file must contain the same six fields, "Package:", "Version:", "Copyright:", "License:", "URL:", "SourceURL:". The whitespace separating the fields from the values are tabs and not spaces. "Copyright:" lists copyright years and the copyright holders. Multiple "Copyright:" lines are allowed. Each is displayed on a separate line in AboutSystem. "License:" refers to the filename of the license used by a particular OptionalPackage. Haiku includes several <a href="https://dev.haiku-os.org/browser/haiku/trunk/data/system/data/licenses">often-used licenses</a>, which can be used. If the OptionalPackage uses a different license, it is suggested to simply rename its license file to the Package name. In addition, multiple "License:" lines can be used when necessary. "SourceURL:" is used to provide links to patched source code, build instructions, and the like. There can be multiple "SourceURL:" line, each displaying as an embedded url in a comma separated list. eg: "Source Code: Instructions, Download".
</p>

<h4>Example</h4>
This is the <code>.OptionalPackageDescription</code> file from the OptionalPackage <code>openssl-0.9.8k-gcc2-haiku-2009-05-09.zip</code>. For the sake of this example, it has been modified by the addition of dummy SourceURL lines.
<pre>
Package:	OpenSSL
Version:	0.9.8k
Copyright:	1995-1998 Eric Young , 1998-2008 The OpenSSL Project.
License:	OpenSSL
URL:		http://www.openssl.org/
SourceURL:	Instructions &lt;http://ports.haiku-files.org/wiki/dev-libs/openssl/0.9.8k/1&gt;
SourceURL:	Download &lt;http://www.haiku-files.org/files/optional-packages-sources/openssl&gt;
&lt;end with a blank line&gt;
</pre>

<h3 class="icon-document-medium">License File</h3>
<p>
Depending on the type of license, it may be necessary to include a copy of it with the binary distributions. Due to the multitude and variance of open-source licenses, the safest way to be sure of what to do is to simply read the license file. 
</p>
<h4>Possible Locations</h4>
These are all of the supported locations for licenses. 
<ul>
<li class="icon-folder"><code>/boot/common/data/licenses/</code></li>
<li class="icon-folder"><code>/boot/home/config/data/licenses/</code></li>
<li class="icon-folder"><code>/boot/system/data/licenses/</code>
Technically this is a valid location for licenses. However by convention, third-party apps and end-users should never place files in <code>/boot/system/</code>. 
</li>
</ul>
<h4>Filename</h4>
<p>
It is necessary to rename that particular license file to the name of the software package. For example, <code>LICENSE</code> from <code>openssl-0.9.8k.tar.gz</code> should be renamed to "OpenSSL".  Details such as version number, gcc, and build date are omitted. Renaming of the license file must be done because licenses from other software packages will reside in the same folder and it is important to be able to easily determine which license belongs to which software package. As mentioned above, the filename must be the values for "License:".
</p>

<h3 class="icon-archive-medium">Packaging Archive</h3>
<p>
Create your archive as you typically would. HaikuPorts has a wiki page describing some <a href="http://ports.haiku-files.org/wiki/PortingTips#Preparingfordistribution">methods for creating an archive from ported software</a>. Include <code>.OptionalPackageDescription</code> in the top-most directory of the  binary distribution archive. If the license file declares that a copy must accompany binary distributions, be certain to include the renamed license as noted above. It is preferable to use the following naming scheme for the archive:
<b>&lt;softwareName&gt;-&lt;softwareVersion&gt;-&lt;platform&gt;-&lt;buildDate&gt;.zip</b>

Notes:
<ul><li>when &lt;platform&gt; is x86, differentiate between x86-gcc2 and x86-gcc4</li>
<li>&lt;buildDate&gt; is YYYY-MM-DD format, also known as <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a></li>
</ul>
</p>
<h3 class="icon-ide-project-medium">Creating and Submitting Patch</h3>
Most of the time, <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/OptionalPackages"> OptionalPackages</a> is the file that needs to be edited to add or update your OptionalPackage. Once in a while, <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/OptionalPackageDependencies">  OptionalPackageDependencies</a> may need to be updated. Below is an example on how to properly create a patch for <code>/path/haiku/build/jam/OptionalPackages</code>.
<pre>
cd /path/haiku/
git diff build/jam/OptionalPackages > ~/OptionalPackage-&lt;new-pkg&gt;.patch
</pre>
From the above OpenSSL example, "&lt;new-pkg&gt;" could be "openssl-0.9.8k". 
Submit this patch to Haiku's <a href="https://dev.haiku-os.org">Bug Tracker</a> as a new enhancement ticket. It is advisable to have a subject similar to <br> "[patch] OptionalPackages - Updated &lt;new-pkg&gt;" 

<h3>Notes</h3>
<p>
See <a href="https://dev.haiku-os.org/ticket/3930">Ticket #3930</a> and <a href="https://www.freelists.org/post/haiku-development/OptionalPackages-how-to-properly-package-its-dependencies,1">haiku-development ML thread</a> for some relevant information. These two links discuss the issue of giving attribution to an OptionalPackage's included dependencies and that AboutSystem needs a mechanism for handling duplicate entries.
</p>
<p>
Multiple OptionalPackageDescriptions can be encapsulated within the same file. Simply separate them with a blank line.
</p>
</p>
Some software uses multiple licenses.  To handle this, simply mention each <code>"License: <licenseFilename>"</code> on a separate line.
</p>

<h3>Sharing Your Optional Package</h3>
<p>
Now that you have created an optional package, it's time to suggest having it included as part of Haiku's build system. Just be aware that the Haiku Project may not want every package to be part of the build system.</p>
<p>
The next steps include creating a patch of Haiku's build system and creating a new ticket on the development tracker. 
The patch should be for build/jam/OptionalPackages, build/jam/OptionalLibPackages,build/jam/OptionalPackageDependencies , depending on what the software is and if it depends upon other packages. See <a href="https://dev.haiku-os.org/wiki/SubmittingPatches">Submitting Patches</a> for more information on how to create a patch for reviewal. In the <a href="https://dev.haiku-os.org/newticket">new ticket</a> mention why the package should be made available in Haiku's build system. For instance, does it make contributing to Haiku easier? Does it fill a common need for many people? If the program is accepted, the binary will then be mirrored on one of Haiku's mirrors.
</p>
