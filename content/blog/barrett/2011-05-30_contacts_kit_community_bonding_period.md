+++
type = "blog"
author = "Barrett"
title = "Contacts Kit, Community Bonding Period"
date = "2011-05-30T11:17:14.000Z"
tags = ["gsoc", "gsoc2011", "contacts kit", "Services Kit"]
+++

During the community bonding period, i have researched around the project to prepare my work for the coding days that will follow. 
I also promised to talk with the other devs in the ml, it was not necessary in these days...i'm working with the help of Alex to a document describing the entire API in order to discuss it in the ml.

The first problem was to choose a Default Media Format for contact translators, my choice has been addressed to a flattened BMessage. BMessage will be used internally by BContact to represent the contact fields and the state of the object. BContact will be also a BArchivable object.

All that could look strange for a naive, but there are some aspects that should not be underestimated :

<ol>
 <li>Easily sendable through applications and network (useful in future when sync support will come)</li>
 <li>Make simple to save the state of an object on a disk and then restore it at the next boot</li>
</ol>

So one of the most important aspects of BMessage is their flexibility in storing informations. The contact kit will define a set of fields used to represent a generic contact in memory, but it's too restrictive! Apps and addons should be able to define custom types of fields since the API cannot in any case define a set of fields generic enough to support every existent and future API. This is already an obscure side for me and i need some hours to make clarity and choose the best solution.

<strong>Portable Contacts</strong>

Portable Contacts is REST API using OAuth with the aim to provide a generic access to contacts from different services, at the moment it support many services like the OpenSocial platform. Who has read my proposal probably remember something about a "Google Contacts Services Add-On". I have decided to switch it into a "Portable Contacts Addon". For more informations : http://portablecontacts.net/.

<strong>Goals For the first quarter </strong>

<ul>
 <li>A little patch for the translation kit to support the Contacts translators </li>
 <li>Basic BContact Implementation</li>
 <li>vCard and People translators </li>
</ul>


