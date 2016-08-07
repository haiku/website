+++
type = "blog"
author = "jalopeura"
title = "Language Bindings for the C++ API: Git Mirror, Gcc4, and Other Changes"
date = "2011-07-16T23:48:29.000Z"
tags = ["api", "gsoc2011", "perl", "python"]
+++

A status update for those interested:

Bindings now return multiple values when appropriate (this was not working before).

Bindings now return <code>undef</code> (in Perl) or <code>None</code> (in Python) for a <code>NULL</code> object pointer; previously a target language object with an underlying <code>NULL</code> was returned, which obviously caused problems.

For errors, Perl returns <code>undef</code> and sets an error variable. Python raises an exception. However, when the status code is also the return value, Perl returns true if there is no error. Python simply returns the status code.

Perl builds under gcc2 and gcc4. Python builds under gcc2 and gives the following warnings/errors under gcc4:

<pre>gcc -fno-strict-aliasing -I/boot/develop/headers/3rdparty -DNDEBUG -g -O3 -Wall -Wstrict-prototypes -fPIC -I/boot/common/include/python2.6 -c Haiku.cc -o build/temp.haiku-1-BePC-2.6/Haiku.o -Wno-multichar
cc1plus: warning: command line option "-Wstrict-prototypes" is valid for C/ObjC but not for C++</pre>

As far as I can tell, this has to do with the fact that the python executable was originally compiled with this flag. There seems to be no way to turn the flag off using <code>distutils</code>.

<pre>g++ -shared build/temp.haiku-1-BePC-2.6/Haiku.o -lpython2.6 -o build/lib.haiku-1-BePC-2.6/Haiku.so
/boot/develop/abi/x86/gcc4/tools/gcc-4.4.4-haiku-101111/lib/gcc/i586-pc-haiku/4.4.4/../../../../i586-pc-haiku/bin/ld: cannot find -lpython2.6
collect2: ld returned 1 exit status
error: command 'g++' failed with exit status 1</pre>

I'm guessing that this command will work with gcc4 if python is installed normally on a gcc4 Haiku. If not, I'm not sure how to fix it.

For those interested, I have created a git mirror of the SVN repository at https://github.com/jalopeura/Haiku-API-Language-Bindings. Note that the repos contain the perl code and definition files used to generate the bindings; they do not contain the bindings themselves. The bindings are available for download from the project page at http://dev.osdrawer.net/projects/perl-haiku-kits.

Please note that this is a mirror. Its function is to reflect the state of the real repository for those who do not wish to use SVN. I will still be working from the OsDrawer.net repository. If you make changes and you want me to be aware of them, you must notify me. You can use an email, a comment to this blog, a github pull request, whatever you want.

The next items on my list are structs and global variables. Structs will be an appropriate data type (Perl hash or Python dictionary) and globals are going to be accessed via a class method, rather than actual variables.

For example, <code>be_app</code> would be avilable as <code>Haiku::Application->be_app()</code> in Perl and <code>Haiku.Application.be_app()</code> in Python. Or if people prefer, I could put them into the Haiku namespace: <code>Haiku->be_app()</code> or <code>Haiku.be_app()</code>. (And if people really would prefer a variable to a class method, I can do it that way as well.)