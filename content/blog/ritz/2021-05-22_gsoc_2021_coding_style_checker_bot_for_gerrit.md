+++
type = "blog"
title = "GSoC 2021: Coding style checker bot for Gerrit"
author = "ritz"
date = "2021-05-22 20:31:22+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2021"]
+++

# Introduction
Hey everyone! I am Hrithik Kumar, a sophomore at National Institute of Technology Agartala, India majoring in Computer Science and Engineering (CSE). I am happy to say that I will be working on creating a **Coding style checker bot for Gerrit** as part of the GSoC 2021 project. My mentors are Alexander von Gluck and Suhel Mehta.  
* IRC nick: ritz  
* Matrix: ritz (@ritzkr:matrix.org)

---

# Project
Haiku has its own coding guidelines which describe how the code should be formatted. There is a tool ([haiku-format tool](https://github.com/owenca/haiku-format)) for reformatting or checking if code follows these guidelines, but it has to be compiled on the developer machine and then run manually. Now this is extra work but what if it could be automated! That's what I'll be working on this summer i.e. creating a Gerrit bot that would use haiku-format tool for checking whether the patch submitted follows the community guidelines of Haiku and post the report in the comments.

A high level architecture of this project will include the following steps:
* For every event (change, patch etc.), trigger the [Concourse CI](https://ci.haiku-os.org/) pipeline.
* Implement pipeline in concourse CI for fetching the Git repo and running the haiku-format tool on the relevant files and create appropriate report out of the tool.
* Implement REST API call to post the result back to Gerrit reviews as a robot comment.

The problem with haiku-format tool is that it is a work under progress and cannot be trusted completely so it requires human intervention to make sure that the code follows the coding guidelines. Luckily another GSoCer this year is working on improving the haiku-format tool itself so if all goes well then hopefully the entire thing will get automated. Although I was already planning on working on improving the haiku-review tool after GSoC itself. 

At last a big thank you to everyone and I'm looking forward to working with this amazing community. :)
