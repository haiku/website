+++
type = "blog"
author = "Barrett"
title = "Contacts Kit, quarter-term report"
date = "2011-08-08T23:44:27.000Z"
tags = ["contacts kit", "serviceskit", "gsoc2011"]
+++

In these weeks i have improved the contacts kit core in order to have enough support for the formats supported. The vcard and people translators can now translate and exchange many types of field, though photo and groups aren't yet supported.

Main functionalities of the classes :
<strong>BRawContact</strong>
Their functionality is to deal with the BTranslatorRoster and keep track of basic informations, like the final format. The final destination is represented as a BPositionIO object. Basically the class find a suitable translator when initialized and provide two methods : Commit() and Read(). The first has as argument a BMessage that contain Flattened BContactFields, the second translate the source file (that can be a B_PEOPLE_FORMAT, B_VCARD_FORMAT, B_CONTACT_FORMAT) into a BMessage and return it.

<strong>BContact</strong>
BContact is the high level class representing a contact, it has the job to store informations about the raw contact, provide methods to add/remove/replace/compare the BContactFields. When initialized it use the BRawContact::Read() function to read fields from a location, and use BRawContact::Commit() to provide BContact::Commit().

<strong>BContactField and childs</strong>

BContactField is designed to support as well both People and VCard formats. The class is not intended to be used directly, but a common interface for the different types of fields that are supported. The usage of a field is defined by two enums at ContactDefs.h, it is a code that allow to specify additional informations for the data, for example if you want to add a phone number that is a fax you'll use this code :
<pre>
...
BContactField* field = new BStringContactField(B_CONTACT_PHONE, value);
field->SetUsage(CONTACT_PHONE_FAX_WORK);
contact.AddField(field);
...
</pre>
Another interesting function of BContactField is the Label() method, that return a friendly description of the field allowing to create easily apps like People without having care to translate a label for any field.

The class also accept any number of string parameters, the BFlattenable interface, and the BContactFieldVisitor interface.

<strong>BStringContactField</strong>
This is used for the major part of the fields, the value is represented as a BString object it is enough for fields like B_CONTACT_NAME, B_CONTACT_ORG...
<strong>BAddressContactField</strong>
It represent an address, allow to initialize a well-formed address via the constructor or alternatively the programmer can use the provided methods to set all the informations.

There are also other types of fields in the plans, one of these is the BCustomContactField. 

<strong>Translators</strong>
As said while not supporting all fields, they can translate and exchange fields with a common format. There are some bugs, but the whole process is working as well and i consider this part of the project complete.

<strong>Services Kit </strong>
Unfortunately this side is not close to be completed, i have a draft and i'm working to get it enough complete.

At the moment the main classes are :
BServicesRoster
A simple class that allow to manage the addons in a more low-level manner...something similar to BTranslatorRoster giving access to the add-ons so nothing specific to the contacts support but a base for many uses (including contacts addons).

BServicesAddon
This will be the class specifying the API used by the addons, using a generic set of methods...version, name, friendlyname, services_addon_type, init and so more. Providing a Process() method used to receive data as BMessages from the server. In the same manner, will be instantiated with a messenger object to talk with the server.

BContactRoster,
basically store the BContacts provided in the address book. The user will instantiate an own object reading only the contacts they want. In future would be nice to see classes like BContactQuery...at the moment they will specify simple access to the fields stored in the address book. Internally will use an instance of the BServicesRoster talking with contacts addons.

I have created a git branch of the Haiku's tree at the url :

https://github.com/Barrett17/Haiku-services-branch

At the moment it is a plain copy of the tree, in the next day's i'll update the code since using the osdrawer repo was limitative.