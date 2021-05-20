+++
type = "blog"
title = "GSOC 2021 : Improvements to clang-format and clang-tidy to format code according to haiku coding guidelines"
author = "saloni"
date = "2021-05-20 18:54:26+05:30"
tags = ["haiku", "software"]
+++

# Introduction:

I am Saloni B.Tech.(3rd year), Computer Science and Engineering(CSE) student of Guru Nanak Dev Engineering College, India. I have been selected for Google Summer of Code 2021 to work with Haiku on the project **Improvements to clang-format and clang-tidy to format code according to haiku coding guidelines**. My mentors are Preetpal Kaur and Adrien Destugues.

# About my project:

Haiku has its own coding standards which describe how the code should be formatted. [Haiku-format](https://github.com/owenca/haiku-format) is a tool that reformats code according to Haiku coding style but it is not giving desired results. So, we need to format the code such that when this code is run on [Haiku](https://review.haiku-os.org/plugins/gitiles/haiku/+/refs/heads/master) the coding style of code gets updated according to haiku guidelines, but it has to be compiled on the developer machine and then run manually.

The tool ' haiku-format ' is work in progress which can be used to check the format according to guidelines which will be integrated with concourse to automate the process of checking coding style.

# Existing problem in Code review:

  Haiku code review is done manually due to which there was some delay between the patch submission and the initial feedback. A lot of time is spent just on checking the code format due to which most review comments are only about code formatting and it becomes difficult for reviewers to focus on functionality of the patch.

# Work done so far

1.  Solved an issue to remove extra spacing for [std::nothrow](https://github.com/owenca/haiku-format/issues/17).

2.  [Gerrit merged changes](https://review.haiku-os.org/q/owner:saloniggoyal%2540gmail.com+is:merged) according to haiku guidelines.

3.  [Updates coding guidelines](https://github.com/haiku/website/pull/489)

# Ongoing review/Discussion

1.  [Updates code according to haiku guidelines](https://review.haiku-os.org/c/haiku/+/3827)

2.  [Improving haiku format](https://review.haiku-os.org/c/haiku/+/3826)

3.  [Empty functions to inline](https://github.com/owenca/haiku-format/issues/23)

4.  [' : ' should come on its own line and initializers in following lines](https://github.com/owenca/haiku-format/issues/18)

5.  [Discussion about clang-tidy](https://review.haiku-os.org/c/haiku/+/3826/1/src/preferences/input/InputMouse.cpp#145)

-  According to Haiku’s requirement for if-else statement clang-tidy google-readability-braces-around-statements.ShortStatementLines with value '2' can be used i.e. adding braces to if statement will only trigger when there will be 2 or more lines. So, the idea is to extract the code from clang-tidy and integrate it in the clang-format for better results.

# Conclusion:

First of all I say a big thank you to the haiku community for selecting me this year. I will try to give my best to make this project more successful. :)

# Important Links:

-  [Development logs](https://hackace2.wordpress.com/)

-  [GSoC Link](https://summerofcode.withgoogle.com/organizations/5689314786148352/)

-  [Proposal](https://docs.google.com/document/d/19jQsWTde5_ca514YbIOxFb882BRB_B4dbkRZ5polIIU/edit?usp=sharing)


Thankyou to all :)