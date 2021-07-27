+++
type = "blog"
title = "GSoC 2021 Progress Update 2: Coding style checker bot for Gerrit"
author = "ritz"
date = "2021-06-27 14:50:01+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2021"]
+++

Link to [Introductory blog](https://discuss.haiku-os.org/t/gsoc-2021-coding-style-checker-bot-for-gerrit-haiku-project/10772)  
Link to [Progress 1](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-1-coding-style-checker-bot-for-gerrit-haiku-project/10814)  

On my quest to finding a way to trigger my jobs anytime a commit happens in gerrit I was looking into [this repo](https://github.com/google/concourse-resources/tree/master/gerrit) and trying to make it work. I tried using it as a resource but it turns out either it's not public anymore or it was deleted. Then I went through the list of forks in that repo and found [this](https://github.com/ecbaldwin/concourse-resources). He claimed to have a base for a somewhat working resource after he made some changes. I cloned his repo and tried building the Dockerfile but it threw some errors. After struggling on it for quite some time and making some minor changes to the files I finally managed to build it and upload it to dockerhub. Then I tried using it as a resource but it failed to fetch my local gerrit repo. Also, the whole thing was written in go which was totally new to me so I started by learning "go" and after some time when I got the hang of it, I started the debugging phase.

First, I started with the idea of running the docker image manually in local, entering inside its shell and studying the behaviour of `check` binary. I struggled a bit and had to look at the concourse documentation to learn about its I/O format. After studying, I created the necessary json input and provided it to `check`. Unfortunately, it did not work, since my local gerrit url was not recognised. I found a `--network=host` flag for docker run command which solves this issue and was able to get the desired output from the `check`. So I concluded that the entire thing seems to be working perfectly when run manually on shell. 

For reference `check` input looks like this

    {
      "source": {
        "url": "http://hrithik:8090/",
        "query": "status:open project:test"
      }
    }

and `check` output looks like this

    [
        {
            "change_id": "test~master~I2a33f7448147f9aab068df24e4a31bb7f0e974f4",
            "revision": "916609dc2d5f6d4a51bb6510fc37d4366efbae97",
            "created": "2021-06-03T15:38:59Z"
        }
    ]

But still concourse was not fetching the repo, I read [this](https://github.com/concourse/registry-image-resource) and changed the type from `docker-image` to `repository-image` with full url of my docker hub image in my concourse pipeline YAML file. Along with this I had to put `latest` tag during image push and update my docker image at dockerhub since it was giving manifest errors.

After all this struggle, finally it worked! :) I ran various experiments and it seems to be working perfectly i.e. triggering the job anytime a patchset is created. The Docker image can be found [here](https://hub.docker.com/r/bluedocks/gerrit-resource). Below is my sample pipeline.yml I ran using it.

    resource_types:
    - name: gerrit
      type: registry-image
      source:
        repository: docker.io/bluedocks/gerrit-resource

    resources:
    - name: test
      type: gerrit
      source:
        url: "http://hrithik:8090"
        query: "status:open project:test"

    jobs:
    - name: job
      public: true
      plan:
        - get: test 
          trigger: true 
        - task: list_repo
          config:
            inputs:
            - name: test
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: busybox
            run:
              path: /bin/sh
              args:
                - -c
                - |
                  ls -a test

While my mentors will be testing this docker image, I started working on the next phase of this project i.e. running haiku review tool with every job that gets triggered. For reference the basic parts in which I divided my project are given below:

* For every event (change, patch etc.), trigger the Concourse CI pipeline.
* Implement pipeline in concourse CI for fetching the Git repo and running the haiku-format tool on the relevant files and create appropriate report out of the tool.
* Implement REST API call to post the result back to Gerrit reviews as a robot comment.

Now in order to start working on haiku review tool I cloned this [repo](https://github.com/viveris/llvm-project) and as suggested by my mentor @suhel_mehta ran the necessary commands for building it. I used `clang-format` binary on various C++ files and tried to familiarise myself with its working.

Since building haiku-review tool might take some time each time concourse is triggered, hence I created a simple server using golang to host the already built `clang-format` binary file. Running the tool was an issue in alpine linux, so I had to use ubuntu linux as base docker image. Then I wrote the necessary commands required to run haiku-review tool in my pipeline.yml file and then ran the pipeline and it worked like a charm. Below is a sample pipeline.yml I ran using it.

    resource_types:
    - name: gerrit
      type: registry-image
      source:
        repository: docker.io/bluedocks/gerrit-resource

    resources:
    - name: test
      type: gerrit
      source:
        url: "http://hrithik:8090"
        query: "status:open project:test"

    jobs:
    - name: job
      public: true
      plan:
        - get: test 
          trigger: true 
        - task: haiku_review_tool
          config:
            inputs:
            - name: test
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: ubuntu
            run:
              path: /bin/sh
              args:
                - -c
                - |
                  apt update && apt install -y wget 
                  wget http://hrithik:9000//clang-format
                  chmod 777 ./clang-format
                  ./clang-format -style=haiku ./test/*.cpp
              
## Suggestion Box:
These are couple of observations regarding haiku review tool
* The llvm project is over a GB in size
* Building the clang-format tool takes some time

It doesn't look like a good idea to clone llvm project and build it everytime the pipeline is triggered maybe we can provide prebuilt `clang-format` hosted somewhere.

Also, I would like to hear from devs on what kind of report/analysis (by haiku review tool) will be helpful to present in the gerrit patchset comments (posted by robot)?
