+++
type = "blog"
title = "[GSoC 2023] Next up: Add reference images"
author = "Zardshard"
date = "2023-06-01 08:39:43-04:00"
tags = ["haiku", "software", "icon-o-matic", "gsoc", "gsoc2023"]
+++

I have fixed three memory leaks. Before, leak_analyser.sh found 75 leaks from simply opening and closing Icon-O-Matic. It now reports only 27.

I am now planning to implement a new shape type called "reference images". This implements [ticket #2748](https://dev.haiku-os.org/ticket/2748). As discussed in the ticket, having a reference image in the background greatly assists in vectorizing it. Reference images are just for reference. They will not be exported to the final HVIF file.
