+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: First Quarter Goals"
date = "2011-05-25T09:03:37.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

During the bonding period I looked into Python's extension tools; they seem to be straightforward and at first glance look relatively easy, so Python is definitely an option. I asked on the mailing list what other languages people were using on Haiku, and Neil kindly made a poll based on the results. Depending on the popularity of the language (based on the poll results) and the ease of writing extensions, I will make a final decision on which langauges to target during GSoC.

I also looked into various ways of defining the extensions. I have decided to use an interface definition and generate bindings from that. I looked at pidgen's IDL, but it didn't have all the necessary information. I also considered parsing the header files directly, but that would also lack some necessary information. I am currently working on defining an SGML-esque interface language. Using an SGML-like language means that if a new target needs information not currently contained in the interface definition, this information can be added without disrupting the parsers for existing targets. SGML also compresses nicely. I am, however, still open to suggestions for other solutions, since I haven't (yet) put enough time into this one to be irreversibly committed to it.

My goal for the first week is to get minimal functionality; I have selected Perl as the target for this portion because I already know how to write extensions for Perl. I am implementing enough of the Application, Message, Window, and Button objects to write a small test program. This should let me work out any issues with the interface language.

Once this test program is working, it should also allow me to test for thread issues. While I could deliberately write a program that blocked, what I'm looking for is situations where C++ would not block with equivalent code. As soon as the test program is working, I'm going to look at changing some data via the from the target language (running in an interpreter in the main thread) when called from Window::MessageReceived (running in the window's thread). If anyone has any other suggestions for creating blocking situations, let me know.

After I have made the final selection on target languages and determined the best way to avoid thread issues, I will continue by expanding the interface definitions used for the test program and creating new interface definitions for additional classes. I will also need to document the interface definition language and each of the classes. Class documentation, at least initially, will consist of the differences between the C++ interface described in the Be/Haiku Book and the interface for the target language in question, along with a link to the relevant page in the Be/Haiku Book.

Unfortunately, I haven't been able to stay online much so far. We have company visiting us, and they're staying in the room with the wireless router/modem. Since Haiku can't do encrypted wireless, and I can't use the only space physically close enough to the router to use an ethernet cable, I have to leave Haiku and boot into Windows whenever I want to use the internet. I tried running Haiku from the physical drive with VMware in Windows, but it's too slow. Does anyone know whether VirtualBox can use the physical drive, and if so, is it faster than VMware?

In summary, my goals for the first quarter are:
- Define an interface definition language
- Define preliminary bindings for a minimal test program
- Write a preliminary generator to create the bindings
- Write the minimal test program
- Test threading issues
- Make a final choice on target languages
- Expand preliminary bindings and add new bindings
- Write test programs for the bindings
- Write documentation for the bindings