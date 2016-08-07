+++
type = "blog"
author = "michael_crawford"
title = "Cheap Hardware For Open Source Developers"
date = "2008-10-26T12:47:35.000Z"
tags = ["hardware", "Recycling", "Device Drivers", "Testing", "SPARE"]
+++

Matt Zehner, a teacher at <a href="http://branham.cuhsd.org/">Branham High School</a> in San Jose, sponsors the school's SPARE e-Waste recycling program: Students Promoting Awareness of Recycling and the Environment.  

Their focus is on putting discarded hardware back into productive use so it doesn't enter the waste stream, as many electronic products are full of toxic materials like lead and arsenic.

His club was featured in the Cambrian Times' article <a href="http://www.cambriantimes.com/120407/waste.htm">Branham High School club masters art of turning trash into treasure</a>.
 
He is also one of my two housemates.  

When I killed my PC's motherboard with a failed firmware upgrade, he suggested I help myself to his goodies.  I came home with six Pentium III boxes, the fastest being 700 MHz.  

I've only examined two so far, but the only problems with either of them were worn out CD-ROM and floppy disk drives.  Such drives are so cheap these days that I replaced the CDs on both units with Dual-Layer DVD Burners!  <i>Oh, Man, I remember when my first 4x SCSI CD burner set me back four hundred hard-earned bucks...</i>

Matt was very excited about my proposal to offer salvaged AGP, PCI and even ISA cards to Open Source developers.  They could supply whole working computers, but shipping wouldn't be economical outside of Silicon Valley.  But for motherboards with onboard video, sound or ethernet, it <em>would</em> be economical to ship just the motherboard, CPU and memory.

(Complete computers could be provided to those able to pick them up at the school.)

SPARE would ask for a modest donation, but it would be way cheaper than buying such cards from a computer dealer.

I'm going to propose that we develop a web application that would catalog all these cards in a way that would aid developers in finding specific products.  

What I have in mind is a very stripped-down Linux install on a floppy, CD or USB Flash drive.  It would boot, scan the PCI bus then record the slot numbers, PCI Vendor and Device IDs in an XML file on a Flash drive, then shut back down.  The student would then insert this Flash drive in another computer dedicated to this purpse, that would upload all the ID numbers to their website's database.

The web application would have a textual description of all the products in the database - there is someone who maintains such a listing specifically for Open Source use - so each card would be listed according to its function, manufacturer, model number and possibly revision number.

One problem they have is that the hard drives in their older computers aren't really big enough for use with "modern" operating systems like WinXP and Vista - they're typically ten or twenty gigabytes.  Thus they're not able to put these hard drives back into service, so they have to be scrapped.

But it occurred to me that the kids could pre-install Ubuntu and Haiku on them, which would do just fine with such small drives.  I vaguely recall that back in the day most of my own BeOS drives were only two gigabytes.  <i>(And one of those two-gig drives cost twelves hundred clams!)</i>