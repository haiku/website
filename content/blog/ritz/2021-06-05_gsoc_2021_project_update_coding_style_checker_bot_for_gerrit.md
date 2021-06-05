+++
type = "blog"
title = "GSoC 2021 Progress Update 1: Coding style checker bot for Gerrit"
author = "ritz"
date = "2021-06-05 19:46:42+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2021"]
+++

Hey everyone! I am Hrithik (ritz), You can find about my project in my [introductory blog](https://discuss.haiku-os.org/t/gsoc-2021-coding-style-checker-bot-for-gerrit-haiku-project/10772). Here's what I have done so far.

I started by reading Concourse CI documentation in order to get myself familiarise with ci pipeline and various schema involved in it. I also looked at other resources provided by my mentors i.e. Suhel Mehta @suhel_mehta and Alexander von Gluck @kallisti5 . Below are some links if anyone wants to check out.
* [CI Documentation](https://concourse-ci.org/docs.html)
* [CI Examples](https://concourse-ci.org/examples.html)
* [Concourse tutorial by Stark & Wayne](https://concoursetutorial.com/) 
* [Blog on task inputs and outputs](https://blog.concourse-ci.org/introduction-to-task-inputs-and-outputs/)

After setting up Concourse CI and Gerrit instance locally, I started off by trying to implement a basic pipeline integrating both. So I created a test repo in gerrit and wrote a pipeline.yaml file for concourse having a simple job and tried to trigger it manually. Unfortunately I struggled to get the concourse clone the local gerrit repo and faced with errors. So I asked the same to concourse discord help channel and got to know that since concourse runs the job in a container it has a different meaning of `localhost` in the url. So I changed the gerrit url in the gerrit.config file by replacing `localhost` with my `machine-name` and it started working!


My next target was to trigger the job automatically whenever a commit happens, so I added `trigger:true` property in the get step.
I ran the whole thing only to later realise that it gets triggered everytime a merge happens in the master branch but not when a patchset towards master is created. I then looked more into how Gerrit works and got to know that commits get stored in `refs/changes/` namespace which is created by Gerrit itself so the master never changes unless the commit gets merged hence it doesn't get triggered whenever a patchset is created. Below is my pipeline.yml

    resources:
    - name: test
      type: git
      icon: github
      source:
        uri: "http://@hrithik:8090/test"
        branch: master
        
    jobs:
    - name: job
      public: true
      plan:
        - get: test
          trigger: true
        - get: commit
          trigger: true
        - task: hello
          config:
            inputs:
            - name: test
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: busybox
            run:
              path: cat
              args: ["./test/help.txt"]
        - task: bye
          config:
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: busybox
            run:
              path: echo
              args: ["bye"]


I found this docker image on docker hub named [gerrit-resource](https://hub.docker.com/r/matbain/gerrit-resource ) so I gave it a try and added it as my resource but it didn't work either.

    resource_types:
    - name: gerrit
      image:
        type: docker-image
        source:
          repository: malston/gerrit-resource

    resources:
    - name: test
      type: git
      icon: github
      source:
        uri: "http://@hrithik:8090/test"
        branch: master

    resources:
    - name: commit
      type: gerrit
      source:
        uri: "http://@hrithik:8090/test"
        branch: master

    jobs:
    - name: job
      public: true
      plan:
        - get: test
          trigger: true
        - get: commit
          trigger: true
        - task: hello
          config:
            inputs:
            - name: test
            - name: commit
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: busybox
            run:
              path: cat
              args: ["./test/help.txt"]
        - task: bye
          config:
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: busybox
            run:
              path: echo
              args: ["bye"]

Right now I am looking into [this resource](https://github.com/google/concourse-resources/tree/master/gerrit)
It is starting to look like I might have to create a custom resource type myself if this doesn't work out either.

Suggestions and ideas are always welcome :)
