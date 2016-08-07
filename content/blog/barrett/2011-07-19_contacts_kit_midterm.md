+++
type = "blog"
author = "Barrett"
title = "Contacts Kit, Mid-term"
date = "2011-07-19T17:16:40.000Z"
tags = ["gsoc2011", "gsoc", "Services Kit", "contacts kit"]
+++

From my latest post, i had to do more work on the base classes, i realized that my implementation of BContactField was too inflexible for the use so my progresses were not fast as i hoped.
The main problem was to provide something that can fit the simplicity of the Person format (people files) and the complexity of VCard. The result was BContactField. Starting from a number of fields (defined in ContactDefs.h) the class provide some methods to access the field-type of a particular fields and give an interface able to manage properties and parameters as well. At the bottom there are some classes that implements BContactField, they will be used directly by the user, let me give some examples :

BStringContactField
This merge every fields that does not have any other object or special functionalities like B_CONTACT_NAME or B_CONTACT_EMAIL.

BUrlContactField
This is the first example of a field that will incorporate an object from the Haiku's API, in this case it's simple but will be helpful when the BAddressContactField will be added.

How the API help to distinguish between the type of the fields?

You can use the method BContactField::FieldType() but there's a more simple solution, using the visitor pattern i have created a BContactFieldVisitor class, it is nothing more than an interface that specify one Visit() method for every BContactField child class. Implementing a your own class, when you receive a BContactField you can pass your visitor into the BContactField::Accept() method without having any troubles converting the base class to the derived class. One pratical use is for example the EqualityVisitor that allow to implement the method BContactField::IsEqual() in a nice manner. Also the VCardTranslator use a private visitor as a class that convert every field into a VCard string.

While i should commit some changes for BContactField, BContact and BRawContact are basically complete and usable and seems working as well.

<strong>Translators</strong>

The state of translators is summarily good, at the moment VCard can read and write some basic properties, People is in full development state. The main problem with it was a intrinsic limitation of the translation kit, basically you have to pass a BPositionIO (BFile, BMemoryIO..) to a translator but people files are recorded as attributes. You cannot edit an attribute using a BPositionIO since they are data written outside the file, so at the moment the translator will check if the input/output (as the case) is a BFile and if not it will fail. 

<strong>Future</strong>
At this point i will not make forecasts, i'm working on a plan for the services kit and the addon API in order to begin discuss it with my mentor(s), the first part of the project seems close to be complete so i'll update you with a blog post in the next days.