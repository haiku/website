+++
type = "blog"
title = "GSoC 2021 Improvements to Haiku-format Final update"
author = "saloni"
date = "2021-08-18 12:07:58+05:30"
tags = ["haiku", "software"]
+++

# GSoC 2021 Improvements to Haiku-format Final update

It has rightly been said - “All good things come to an end”. Google Summer of Code too was one of the good experiences I've had, in the sense that I didn’t know anything about the Open Source world. It provided the exact platform that I needed to kickstart my open source contributions.

# About my project:

Haiku has its own coding standards which describe how the code should be formatted. [Haiku-format](https://github.com/viveris/llvm-project) is a tool that reformats code according to Haiku coding style but it is not giving desired results. So, we need to format the code such that when this code is run on [Haiku](https://git.haiku-os.org/haiku/tree/) the coding style of code gets updated according to haiku guidelines, but it has to be compiled on the developer machine and then run manually.

The tool ' haiku-format ' is work in progress which can be used to check the format according to guidelines which will be integrated with concourse to automate the process of checking coding style.

## What we achieved?

I started with the input preferences directory and started solving the issues according to haiku guidelines. Following erros were solved:

- Preserve the indentation of comments
- Removal of braces for multiline control statements
- Line break after return type in function definitions
- Unusual indentation of BLayoutBuilder block
- Extra space before ++ operator in for loop
- Tabs are converted into spaces
- Remove extra spacing for std::nothrow.
- ' : ' should come on its own line and initializers in following lines
- Empty functions to inline

Along with the errors in input directory, same errors persist in other directories too. So they also got solved. With these major bugs got solved and the clang-format further doesn't lead to break the code or build anymore.

## But where’s the code?

|         |                                                                       |                                                                                                                                                                                                                                                                                                                                                                                |
| ------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **S/N** | **What I did?**                                                       | **Merge Request or Code Link <br>**                                                                                                                                                                                                                                                                                                                                            |
| 1.      | Removes extra space between new and (std::nothrow)                    | [https://github.com/viveris/llvm-project/commit/e7062af694d377f000fecd5259a0cbf093abbdeb)](https://github.com/viveris/llvm-project/commit/e7062af694d377f000fecd5259a0cbf093abbdeb)                                                                                                                                                                                            |
| 2.      | ' : ' should come on its own line and initializers in following lines | [https://github.com/viveris/llvm-project/commit/df2208a9e66f87a1bd6f0bd68ed973ace901427b](https://github.com/viveris/llvm-project/commit/df2208a9e66f87a1bd6f0bd68ed973ace901427b)                                                                                                                                                                                             |
| 3.      | Empty functions to inline                                             | [https://github.com/viveris/llvm-project/commit/df2208a9e66f87a1bd6f0bd68ed973ace901427b](https://github.com/viveris/llvm-project/commit/df2208a9e66f87a1bd6f0bd68ed973ace901427b)                                                                                                                                                                                             |
| 4.      | Preserve indentation of comments                                      | [https://github.com/viveris/llvm-project/commit/f85ea5013b42a3dd2e983e1912d52c83e917e01b](https://github.com/viveris/llvm-project/commit/f85ea5013b42a3dd2e983e1912d52c83e917e01b) <br> <br>[https://github.com/viveris/llvm-project/commit/51b07e72dea5ce2db8be569ab2f47c86b7ea0bf7](https://github.com/viveris/llvm-project/commit/51b07e72dea5ce2db8be569ab2f47c86b7ea0bf7) |
| 5.      | Removal of braces for multiline control statements                    | [https://github.com/viveris/llvm-project/commit/ea033bd4925eb9551d2d40625b490f82c98f5196](https://github.com/viveris/llvm-project/commit/ea033bd4925eb9551d2d40625b490f82c98f5196)                                                                                                                                                                                             |
| 6.      | Line break after return type in function definitions                  | [https://github.com/viveris/llvm-project/commit/220a2bbe6bdf23c291cd3f5205cfdadf05622a9b](https://github.com/viveris/llvm-project/commit/220a2bbe6bdf23c291cd3f5205cfdadf05622a9b)                                                                                                                                                                                             |
| 7.      | Unusual whitespace for multiline for loop                             | [https://github.com/viveris/llvm-project/commit/6fd97f0d9705d9597d09abdad3742d52de124ae2](https://github.com/viveris/llvm-project/commit/6fd97f0d9705d9597d09abdad3742d52de124ae2)                                                                                                                                                                                             |
| 8.      | Unusual indentation of BLayoutBuilder block                           | [https://github.com/saloniig/llvm-project/commit/c63b4b2d001406ca178bbdd02a5b3da8866f459d](https://github.com/saloniig/llvm-project/commit/c63b4b2d001406ca178bbdd02a5b3da8866f459d)                                                                                                                                                                                           |
| 9.      | Tabs are converted into spaces                                        | [https://github.com/saloniig/llvm-project/commit/efb5ae15b5a19b23f54b717925a07592085f2911](https://github.com/saloniig/llvm-project/commit/2892ce0387f356576b1de2ea07cadeda79ac399b)                                                                                                                                                                                           |
| 10.     | Input preferences: test reformatting with haiku-format                | [https://review.haiku-os.org/c/haiku/+/3826](https://review.haiku-os.org/c/haiku/+/3826)                                                                                                                                                                                                                                                                                       |
| 11.     | Updates code according to haiku guidelines with clang-format          | [https://review.haiku-os.org/c/haiku/+/4098](https://review.haiku-os.org/c/haiku/+/4098)                                                                                                                                                                                                                                                                                       |
| 12.     | Updates code according to haiku guidelines with haiku-format-10.x     | [https://review.haiku-os.org/c/haiku/+/4325](https://review.haiku-os.org/c/haiku/+/4325)                                                                                                                                                                                                                                                                                       |

## What’s next?

Time and again, I’ve written about my love for open source software and the freedom it brings. I’ve decided that I’ll continue contributing to open source in my spare time. I’ll keep contributing to these projects because the codebase is really interesting and that they’ve provided me the stepping stones into the open source world.

## What we under-estimated?

I wrote in my proposal that to solve input directory errors which was supposed to be done before the first evaluation but I did the mistake of under-estimating how much time it takes to produce efficient result. This work takes a lot of time because it needs a complete understanding of how the llvm code works. But Pulkomandy and Preetpal explained me how the code works. As there was number of files, it was difficult to figure out which file should contain the solution of the problem

Next problem which I face was solving the unusual indentation of BLayoutBuilder block. As it was almost impossible for the clang-format to do this. Another one was tabs were converted into spaces.

The basic idea was :

    indented 1 tab: qualifiers (volatile, virtual, static)
    indented 3 tabs: type of fields and return type of functions
    indented 2 tabs: function or field name

These take alot of time and patience. Even sometimes I messed up with github branches but Pulkomandy always patiently explained me and corrected my mistakes.

I have learnt so many new things in these months about haiku and git.

## Work to do:

I have setup a base for us to work upon this but this needs testing on other directories that are pending. As much I have tested the major errors have been solved and there might be some minor errors which will not break code.

## Final Note

All in all, this journey of GSoC has been one of the most beautiful ones when it comes to my career. It was a really wholesome experience with the whole community. I’d like to extend my gratitude to each and every person involved with me over this journey.

A special thanks to my mentors Preetpal Kaur and Adrien Destugues. They mentored me really well and was always ready to help. Thank you for being patient with me and clarifying my doubts.

Also, a big thanks to owenca and Suhel for helping and clarifying my doubts. Thank you Haiku members and Google supporting open source software for providing students like me with this opportunity.

## Weekly Blogs:

[https://hackace2.wordpress.com/category/gsoc/](https://hackace2.wordpress.com/category/gsoc/)
