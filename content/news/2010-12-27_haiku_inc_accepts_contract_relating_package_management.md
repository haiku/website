+++
type = "news"
title = "Haiku, Inc. accepts contract relating to package management"
date = "2010-12-27T23:50:26.000Z"
tags = ["contracting", "donations", "haiku inc.", "hiring"]
+++

As seen with the poll for the <a href="https://dev.haiku-os.org/wiki/FutureHaikuFeatures">must-have features for R1</a>, <strong>the lack of proper package management is clearly one of the items that are delaying the release of R1</strong>. More importantly though, as package management is an actual lacking feature (as opposed to a bug in an existing implementation), even the beta cycle is being blocked as a result. In order to progress, Haiku needs package management.

<!--more-->

Despite some <a href="https://dev.haiku-os.org/wiki/PackageManagerIdeas">brain storming</a>, an <a href="https://dev.haiku-os.org/browser/haiku/trunk/src/add-ons/kernel/file_systems/packagefs">initial implementation of a PackageFS</a>and the specification of its <a href="https://dev.haiku-os.org/wiki/PackageFormat">package format</a>, little else has been done and much remains. 
 
<strong>To help remedy this, Oliver Tappe has submitted a contract for 160 hours for a total of $2,622 USD</strong>. His efforts will center around doing the groundwork of getting package management actually started. 
 
Specifically, this involves, 
<ul>
<li>evaluating various existing package management components, to determine if any make sense as part of Haiku's package management system</li>
<li>evaluating the strengths and weaknesses of existing meta packages (e.g., apt, pacman, smart, ...,)</li>
<li>evaluating if (and how) PackageFS can be used in conjunction with any of those meta packagers</li>
</ul>
 
These tasks could be seen primarily as a research based contract. While this is not a direct coding task, it is part of the development process. More importantly, is it work that is needed for R1 and this contract will allow it to receive some much needed attention.
 
The year 2010 has been a milestone in the project. The level of financial support reaching the project, (primarily as donations to <a href="http://www.haiku-inc.org">Haiku, Inc.</a>, as well as to <a href="http://haikuware.com/bounties">Haikuware Bounties</a>, and the <a href="http://haiku-support-association.org/index-eng.html">Haiku Support Association</a>) has simply been overwhelmingly positive and encouraging.  All of these contributions allow Haiku to be put on the fast track to R1. <strong>Thanks to all of you for showing your support!</strong> 

If you appreciate this contract and would like to see more, please consider a <a href="http://www.haiku-inc.org/donations.html">donation to Haiku, Inc.</a>, as this will help to support the next contract.  As always, Haiku, Inc. is eager to consider contracts for developing Haiku, even for non-C/C++ tasks that help pave the way towards R1.