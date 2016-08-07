+++
type = "blog"
author = "Barrett"
title = "GSoC Project : Services Server And Contacts API"
date = "2011-04-28T21:05:32.000Z"
tags = ["services", "kit", "gsoc2011", "contacts api"]
+++

Unlike most students i'm not new to Haiku, i've already contributed around the Haiku community, maybe you can remember me for my work on Caya (msn plugin). Not by chance my gsoc project is somehow related to Caya (and every app that expose contacts).

The fundamental idea is to provide a core set of classes with the aim of contacts integration into the system.
The basic idea around the entire project is fairly simple in theory :<strong> The api should be easily extendable.</strong>

Originally, my idea was to provide an API for Person/People files only. The developers, which have a more large vision of the whole system, have warned me about it in discussions, providing very useful suggestions. The resulting proposal is interesting, and i hope you will enjoy it.

<strong>Services Server</strong>
The services server at the end of my work will only host add-ons, in future it will provide the necessary infrastructure to keep in sync contacts between different services (including contacts merge).

<strong>Services Addons and Contacts translators </strong>
The Services Add-ons will be used to extend the system functionalities, a contacts "provider" addon will be located here. As demonstration for the api will be created a Google Contacts addon. However, and addon will have the possibility to work as "consumer", i.e. it will only pubblish contacts in a defined manner. 

The "Contacts translators", are Haiku translators used to provide independent support for different contacts files, i will create two translators : vCard and People. These translators will never used by the final programmer, in fact, this is the first brick (providing the low level functionalities) of the whole "Contacts kit".

<strong>BContact And BContactRoster</strong>
BContact is the high level class (the class will use BContactFile internally), used to store and represent the contact (and their fields) in memory. It will be more generic as possible.

BContactRoster will make use of the Services add-ons. There will be add-ons used to store the files in a specified manner, one of these addons will be the People address book, that will store contacts in /boot/home/people as People files or pubblish them depending on the user's settings.


<strong>My Community Bonding Period </strong>

I'm planning to begin research about my project around the 10th may. During this time i want to do only two things :

<ul>
 <li>Look into Haiku translators and make design/plans about them</li>
 <li>Design the BContact and BContactRoster classes</li>
</ul>

Since i have already a know-how about the BeAPI and Haiku's sources, fortunately there's no need to lose time into preliminary things. Instead i want to prepare all ingredients to make the programming aspect nice and without hitches, i will also talk with mentors since i understand that design is the most difficulty part of this project and i am sure the experience of the devs will be useful.

