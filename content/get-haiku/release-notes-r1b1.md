+++
draft = true
type = "article"
title = "Release Notes"
date = "NEEDS_ACTUAL_DATE"
tags = []
+++

It's been almost five years since Haiku's last release in November 2012 &mdash; too long. Most of the delay was due to a handful of infrastructural issues that took some time to get ironed out. Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide any assurances against data loss.

As a result of such a long gap between releases, there are a lot more changes in this release than in previous ones, and so this document is weightier than it has been in the past. The notes are mostly organized in order of importance and relevance, not chronologically, and due to the sheer number of changes, thousands of smaller improvements simply aren't recognized here.

Before we start, let's take a moment to acknowledge:

## System requirements

This release sees the addition of official x86_64 images, alongside the existing x86 32-bit ones. Note that these images are incapable of running BeOS (GCC2) applications, but they are as (or more) stable than the 32-bit ones.

<table><tr><td>
<h4>MINIMUM</h4>
 - **Processor**: Intel Pentium II; AMD Athlon
 - **Memory:** 128MB
 - **Monitor:** 800x600
 - **Storage:** 1GB
</td><td>
<h4>RECOMMENDED</h4>
 - **Processor**: Intel Core 2 Duo; AMD Athlon II
 - **Memory:** 1GB
 - **Monitor:** 1366x768
 - **Storage:** 8GB
</td></tr></table>

## New features

### Package manager

By far the largest change in this release is the addition of a complete package management system. Finalized and merged during 2013 thanks to a series of contracts funded from donations, Haiku's package management system is unique in a variety of ways. Rather than keeping a database of installed files with a set of tools to manage them, Haiku packages are a special type of compressed filesystem image, which is 'mounted' upon installation (and thereafter on each boot) by the `packagefs`, a kernel component.

This means that the `/system/` hierarchy is now read-only, since it is merely an amalgamation of the presently installed packages at the system level (and the same is true for the `~/config/` hierarchy, which contains all the packages installed at the user level)


## New contributors

<new-committers>

<new-patch-submitters>

<new-translators>







<h3>Source Code</h3>

<p>The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is made available for download at: http://www.haiku-files.org/files/releases/r1alpha4/sources/</p>

<h3>Reporting Issues</h3>

<p>There are over 2400 open tickets on Haiku's bug tracker and over 6600 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket: https://dev.haiku-os.org/</p>

<p>To see the list of tickets reported in Haiku R1 Alpha 4, visit https://dev.haiku-os.org/wiki/R1/Alpha4/ReportedIssues</p>

<p>For information about major issues that have been fixed since the release, visit https://dev.haiku-os.org/wiki/R1/Alpha4/ReleaseAddendum</p>

<p>For more help see the 'Welcome' link on the Haiku desktop, or visit the Haiku Project's website at www.haiku-os.org.</p>