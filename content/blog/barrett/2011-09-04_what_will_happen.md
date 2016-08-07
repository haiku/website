+++
type = "blog"
author = "Barrett"
title = "What Will Happen...."
date = "2011-09-04T02:23:14.000Z"
tags = ["contacts kit", "Services Kit", "gsoc2011"]
+++

You probably know that i have not passed the GSoC final evaluation. Although i am a bit discouraged (it's natural i think), as said from the begin, it's not my intention to abandon my project. Money wasn't my first motivation to work, and it will not be in any case.

It's just a short post to tell you what is the state of my code, and about which i'm working on.

At the end of gsoc, contacts kit's base classes are working fine, People were refactored to use my contact API, so i'm writing here my goals for the next period (deadline is presumably before january) :

* Move attribute indexing from People to the PeopleTranslator.
* Adjust file changes monitoring in People.
* Add a PeopleFilePanel class to export contacts into formats different than Person format.
* Fix all TODO and my late mentor's suggestions

* Create BContactList and BContactFieldList classes to make basic operations on collections of objects...like merging of contacts.
* Finalize BContactGroup by using the mentioned classes.
* Create the BContactRoster class, and make working the BAddressBook class (that will wrap /boot/home/people).
* Integrate Mail with BAddressBook.


Sorry for few details, my first need was to notice you that i'm already working on the project.

Below some screenshots about my latest gsoc work :

http://imageshack.us/f/856/screenshot2kz.png/
http://imageshack.us/photo/my-images/853/screenshot2km.png/
