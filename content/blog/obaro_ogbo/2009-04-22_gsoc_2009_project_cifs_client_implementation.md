+++
type = "blog"
author = "obaro_ogbo"
title = "GSoC 2009 Project: CIFS Client Implementation"
date = "2009-04-22T17:20:48.000Z"
tags = ["gsoc", "CIFS", "gsoc2009", "cifs client"]
+++

Greetings one and all!
I am Obaro Ogbo, one of the students selected for GSoC 2009. I also use the name nastee on irc and on <a href=http://dev.haiku-os.org>Haiku Bug Tracker</a>. I am a 3rd year student of Computer Science and Technology at Bells University of Technology Ota, Nigeria, and it appears I'm the first ever Nigerian GSoC student :-).

I began programming with Java, then learnt C before studying C++. I've done little PHP and Perl coding, however I'm learning Lisp presently. I participated in the Nigerian ACM/ICPC in 2007 and 2008 where my team came 3rd and 2nd respectively.

My primary OS has been linux (Debian/Ubuntu) since 2006. In my attempt to understand Operating Systems, I've tried lots of different OSes including OpenSolaris, GNU/Hurd and FreeBSD. I *discovered* Haiku in December 2008 but didn't run it till early 2009 and its quick boot time, responsiveness and general clean light feel got me hooked. It also seemed tailor made for me(an OS well developed, but very far from finished, so I can follow and participate in its development). I'm interested in low-level programming, but I've never really done any. I hope to get into kernel level development, understand compilers intimately and networking technologies.

Following is my project proposal as submitted.

<h3>Project Details</h3>
    <h4>* Project title    -    Implement a CIFS client</h4>
    <h5>* List of project goals</h5>
         1. Implement haiku native filesystem interface
         2. Copy data structure and header files that handle protocol definitions
         3. Implement Protocol Negotiation, User Authentication and other session requests
         4. Implement Directory requests
         5. Implement file requests
         6. Include encryption routines
         7. Write a GUI frontend to mount cifs volumes
         8. Implement Unix Extensions.
         9. Optimize and test
    <h5>* Description of project goals</h5>
         1. fs_interface.dox and fs_modules.dox describe how to do this.
         2. Linux's cifs implementation contains definitions for CIFS/SMB data structures which I'll largely use as is.
         3. Implement LANMAN2.1 and NTLM 0.12 dialect negotiation, SESSION_SETUP, LOGOFF, TREE_CONNECT, TREE_DISCONNECT and File System Information queries.
         4. Directory Requests are well documented in the SNIA/CIFS Technical Reference, I'll implement requests and actions for responses.
         5. There are a large number of file commands, and I expect to spend the most time in this step due to that. Similar to Goal 4.
         6. Implement NT and LM authentication modes and make default
         7. Graphical frontend to mount a share with user providing servername, sharename, username and password.
         8. These are small enhancements to enable Unix/Unix-like clients and servers exchange information used by both e.g symbolic links.
         9. Mainly try to optimize features like read-ahead and write-behind, and test extensively

    <h4>* Why I want to work on this project</h4>    -    I hope to understand an Operating System in its entirety, preferrably one not fully developed, so I can follow design decisions and help code someday. Haiku provides this opportunity, and implementing this project will serve as an entry point. I enjoy learning new things, and I've already learnt so much from researching this project I can hardly wait to start.
