+++
type = "blog"
author = "PulkoMandy"
title = "Locale Kit: everything about catalogs and catalog add ons"
date = "2009-06-01T19:52:17.000Z"
tags = ["gsoc", "localekit", "gsoc2009"]
+++

Today I have started to write a catalog add-on to save catalogs in plain text for easy translation. I've spent some time looking at the involved C++ classes, and here is what I found.

A catalog is a collection of strings, stored as <hash,value> pairs. It is used in the locale kit to translate the text in an application to the system language at runtime. When an application starts, it asks the locale roster to find its catalog and return it back. Then, each time a strig needs to be displayed, it goes trough the catalog and is translated automatically.

Catalogs are stored on disk, and can use various formats. For example, there are files originating from zeta's locale kit, unixish po files, and our own format or haiku. The app doesn't need to know which of them it is using, so finding the right one is the job of the locale roster. All the different formats are handled by catalog add-ons. Every catalog knows which add on it needs to use to do all the work of loading and saving. An EditableCatalog can be modified, it's not meant to be used by a regular application, but only by the apps made for editing catalogs. For now, we will use collectcatkeys to extract all the strings from a sourcecode and dump them to a plain text catalog. Then, linkcatkeys will convert this catalog to one in the native format, which is faster to parse at runtime. Later it will be possible to create an app that allows direct editing of the compiled catalog with a nice graphical interface.

This will allow me to easily create test catalogs in different languages and use them in my HelloWorld test app. Then, i will add language swtching to the locale preflet, and test it so the testapp updates all its strings in realtime when a new language is selected in the preflet.