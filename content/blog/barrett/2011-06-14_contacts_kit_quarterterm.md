+++
type = "blog"
author = "Barrett"
title = "Contacts Kit, Quarter-term"
date = "2011-06-14T22:46:45.000Z"
tags = ["gsoc", "gsoc2011", "contacts kit", "Services Kit"]
+++

These weeks were prolific in terms of design and experiments but due to university commitments i am a bit late with the expected goals.
At this point i have an implementation of BContact / BRawContact and i'm working to get the VCard translator functional. In these hours my focus is the communication part between the raw contacts and translators.

One of the latest design decisions was to make BRawContact own a translator that is suitable for writing the format specified by the user, otherwise it will use the default B_CONTACT_FORMAT (a flattened BMessage) for the final file. The passage of the data between the object and the translator will be done every time the programmer want via the Commit() method. If a path is not passed, the BRawContact will be virtual and stored in memory.

An example of how the api will look approximately :

<pre>
	BContact contact = BContact(new BRawContact(B_VCARD_FORMAT, "/boot/home/"));
	status_t ret = contact.InitCheck();
	BContactField* field = new BContactField();
	field->Add(new BPhoneNumber(..));
        ...
        contact.AddData(field);
        ...
	ret = contact.Commit();
</pre>

Most of you probably already know that one of my major inspiration sources was the Android's ContactsContract API. It is already giving some ideas, like the BContactField object. In fact they use a class named ContentValues, that is similar for some aspects to BMessage as a generic data container, i'm thinking to make a wrapper for BMessage in order to provide an object (BContactField) that makes comfortable passing data fields to BContact / BRawContact. It will help also internally, since as said a flattened BMessage is the common translation format (B_CONTACT_FORMAT).

In the immediate future i'm also planning to implement a set of functions in TranslationUtils.h able to convert a BPositionIO or a file into a BContact in a similar manner as the already existent functions for BBitmap and other formats but using the provided Contact API.

There is a new osdrawer project at http://dev.osdrawer.net/projects/contacts-kit, i'm planning to update here some code during the next days.

At this point i expect to get a first working version of both translators in 7 days, in order to begin working on the services_server part. The first goal will be getting the BContactRoster class up, then to add some functions like unique ids for translator (only BContactRoster will be able to edit the id of a BContact because the first goal of the class will be to provide a centralized management of the contacts) and then focusing on the implementation of the services add-on hosting server including an add-on API. My major idea about that is to implement it using a BMessage protocol and some basic hook functions for the services server -> add-on communication.