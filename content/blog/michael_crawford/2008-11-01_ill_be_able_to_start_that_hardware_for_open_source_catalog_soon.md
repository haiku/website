+++
type = "blog"
author = "michael_crawford"
title = "I'll Be Able To Start That Hardware For Open Source Catalog Soon"
date = "2008-11-01T11:04:19.000Z"
tags = ["hardware", "Recycling", "Device Drivers", "Testing", "SPARE", "Quality Assurance", "QA"]
+++

I have some happy news: I'll be able to start coding <a href="http://www.haiku-os.org/blog/michael_crawford/2008-10-26/cheap_hardware_for_open_source_developers">the cheap hardware for Open Source catalog soon</a>, I expect by the middle of the coming week.

For reasons of personal preferences as well as sharpening a salable job skill, I'll be doing it in Python.  I have <a href="http://www.thomasleavitt.org/">a friend who is an expert web programmer</a> who could advise me on the design of the database schema.

I will also start by reviewing the available Python code libraries to find components that I can reuse.

Rèmi Grumeau said:

<blockquote>Would you see such a program hosted on the Drupal Haiku-OS.org ?<p></blockquote>

At least for now I would prefer to host it on SPARE's website (Students Promoting Awareness of Recycling and the Environment).  That's the name of the Branham High e-Waste club.  (They have registered a domain name, but have not yet created a website.  I'll be helping with that.)

What I envision though is to define some kind of network data interchange format, perhaps using an XML schema.  What I would do is get Version 1.0 working just on SPARE's own website.  But then a later release would periodically submit catalog updates to a central server.

The way it would work is that one would search a local site - Silicon Valley residents would search SPARE's website, because they could obtain the cards just by visiting the school.

But if the desired card cannot be found on the local site, the web application would offer to do a broader search, and would pass the inquiry to the central server.  It would search first the current state or province, then the country, then the entire world.

The idea being to find a participating e-Waste recycler that is as geographically close as possible, to reduce shipping expense and speed delivery time.

A list of sites with available cards would be presented, then one would go directly to the local site to actually order and pay for the card.

An important reason for ordering directly from a local site is that every organization would need to have its own procedures for handling the transaction.  SPARE is a high school club, with students and a teacher volunteer, and now me volunteering technical expertise.  I'm afraid the process is going to need to be much lower-tech than your typical e-Commerce site.

When I get the first cut of the web catalog working, I'll Open Source it.  I'll clearly document that the catalog will be isolated at first, but that a later upgrade will provide data interchange with the central server.

The central server would provide the same interface.  One would register for a free account, and enter one's location - ZIP or Postal Codes would be the best.  So if one does a search at the central server, again it will search locally at first but then more widely if a card isn't found at first.

