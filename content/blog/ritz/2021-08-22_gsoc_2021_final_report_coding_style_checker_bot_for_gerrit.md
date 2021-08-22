+++
type = "blog"
title = "GSoC 2021 Final Report: Coding style checker bot for Gerrit"
author = "ritz"
date = "2021-08-22 22:44:06+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2021"]
+++

Hey everyone! Since the GSoC period is nearing its end therefore here's the final report on my GSoC project **Coding Style Checker Bot**.

# Project Description:
Haiku has its own coding guidelines which describe how the code should be formatted. There is a tool (haiku-format tool) for reformatting or checking if code follows these guidelines, but it has to be compiled on the developer machine and then run manually. My project was to create a Coding Style Checker bot that runs haiku-review tool on files submitted as a patchset in our code review system and posts the report in the patchset comments.

# Work done:

## Added tools to the general-worker
* PR: https://github.com/haiku/infrastructure/pull/69

I have added the following to `general-worker` inside infrastructure repo
* jq
* clang-format
* git-clang-format

So now we can use these tools in the `general-worker` based images in the pipeline.

## Adding source code for gerrit-resource
* PR: https://github.com/haiku/infrastructure/pull/71
* My Fork: https://github.com/HrithikKumar49/concourse-resources
* My Docker Image: https://hub.docker.com/r/bluedocks/gerrit-resource

Using this repo, we can build and push `gerrit-resource` docker image which can be used as a resource in any concourse pipeline. It helps in triggering the pipeline every time a patchset is created. Currently, it needs to be built and pushed to the official haiku docker repository. The repo itself needs to be added in the haiku GitHub organisation as well. Although, anyone can try out the docker image on my account if needed.

## Adding Gerrit Checker bot pipeline
* PR: https://github.com/haiku/infrastructure/pull/70

This PR is to add the pipeline which can trigger and post the results of haiku-format tool run on the changed files in the patchset. End to end, it is working fine in my local development environment.

# Future:
Since the haiku-format tool isn't reliable yet, the bot can't be deployed yet. I will be looking forward to the day it will be deployed and used by developers, making their lives easy. As I am amidst my degree and will be taking courses like Operating Systems, DBMS etc. in the near future, so I will try to use my then gained knowledge in contributing to this project in my spare time.
I also hope that with this GSoC project it will open up more opportunities to create patchset triggered pipelines for Gerrit and to add various features to the bot/create new bots.

Some of the ideas that community and I came up with, which can be implemented to the Gerrit Checker bot in the future (when haiku-review tool would be trustable and bot would finally be deployed):
* Add a link to the results in the patchset comments
* Add a button/command that would run haiku-format tool on the files that were reported as unformatted by the bot
* Command that invokes bot and runs haiku-format tool to the said files in the command and shows the result in the patchset comments. Further, it can provide an option to create a new patchset with the said formatted files.
* We can even leverage `gerrit-resource` to create a bot which will check build status of the patchsets and report it back. This could replace the existing madmax's bot.

If you guys have other ideas, you can post it in the comments, so it can all be in one place.

# Final words:
I had a great time working on this project. Thanks to this project I have learned and worked on various technologies and languages like Concourse CI, Golang, Docker, Shell script, YAML, REST API etc. 

Finally, I would like to thank this amazing community and my mentors Alexander von Gluck and Suhel Mehta for helping me in this project.

Have a great day!

[Introductory blog](https://discuss.haiku-os.org/t/gsoc-2021-coding-style-checker-bot-for-gerrit-haiku-project/10772)  
[Progress 1](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-1-coding-style-checker-bot-for-gerrit-haiku-project/10814)  
[Progress 2](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-2-coding-style-checker-bot-for-gerrit-haiku-project/10962)  
[Progress 3](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-3-coding-style-checker-bot-for-gerrit-haiku-project/11074)  
