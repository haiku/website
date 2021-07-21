+++
type = "blog"
title = "GSoC 2021 Progress Update 3: Coding style checker bot for Gerrit"
author = "ritz"
date = "2021-07-21 17:55:41+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2021"]
+++

Tl;dr I have completed the bot with basic functionality for my local gerrit instance

Link to [Introductory blog](https://discuss.haiku-os.org/t/gsoc-2021-coding-style-checker-bot-for-gerrit-haiku-project/10772)  
Link to [Progress 1](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-1-coding-style-checker-bot-for-gerrit-haiku-project/10814)   
Link to [Progress 2](https://discuss.haiku-os.org/t/gsoc-2021-progress-update-2-coding-style-checker-bot-for-gerrit-haiku-project/10962)

As I have said before I divided my project in the following parts
* For every event (change, patch etc.), trigger the Concourse CI pipeline.
* Implement pipeline in concourse CI for fetching the Git repo and running the haiku-format tool on the relevant files and creating appropriate reports out of the tool.
* Implement REST API call to post the result back to Gerrit reviews as a robot comment.

Since last time I started working on creating a report that could be displayed under patchset comments by the bot. I started by looking at various flags of `clang-format` command out of which `--dry-run`, `--Werror` seemed to be working just fine. But I wanted to run the tool only on the files that have been updated/added since last commit and not the entire project. Eventually I found a better way for this i.e. `git-clang-format` python script which is already present in the [llvm project](https://github.com/viveris/llvm-project/blob/viv_haiku_format/clang/tools/clang-format/git-clang-format). After installing `clang-format`, we just need to put this script in `/usr/bin/` folder. We can invoke the script using `git clang-format` directly. `git clang-format --diff --style=haiku HEAD~1` would run `clang-format` with haiku style on the files that have been updated/added since last commit and showcase the diff of it. In order to use this diff information later I dumped the output of the previous command in a file named `diff.txt`. To use it in my concourse workflow, I added the `git-clang-format` script on my local server that I created last time using golang to host the `clang-format` file. Now this seemed rather promising so I went ahead onto the next task i.e. Implement REST API call to post the result back to Gerrit reviews as a robot comment.

Before starting GSoC, I had already achieved posting the comments on Gerrit using REST API. Anybody interested can look into https://gerrit-review.googlesource.com/Documentation/config-robot-comments.html and https://gerrit-review.googlesource.com/Documentation/rest-api-changes.html `Set Review` Section

The following is the API signature:


    POST /changes/{change-id}/revisions/{revision-id}/review

    [HEADER]
    - Authorization: 'Basic <Basic-Auth-Key>'
    - Content-Type: application/json

    [BODY]
    {
      "tag": "test tag",
      "message": "Hi! This is robot!",
      "labels": {
          "Verified": 1
      }
    }

Now the url for calling the above API requires `change-id` and `revision-id`. After searching for it I found that `change-id` and `revision-id` are already stored in the `.gerrit_version.json` file inside the container under the cloned repo folder which is created by the gerrit resource. Below is a sample `.gerrit_version.json`

    [
        {
            "change_id": "test~master~I2a33f7448147f9aab068df24e4a31bb7f0e974f4",
            "revision": "916609dc2d5f6d4a51bb6510fc37d4366efbae97",
            "created": "2021-06-03T15:38:59Z"
        }
    ]

Now I needed to parse `change_id` and `revision` from this json file so I used the `jq` utility. I created the necessary commands for `jq` and stored `change_id` and `revision` in the `CHANGE_ID` and `REVISION_ID` variable respectively. I then created a basic logic for assigning +1 to the `verified` variable in case the files are formatted correctly according to haiku coding guidelines and -1 in case the files are not properly formatted. Then I constructed the necessary json input for the API.

I pulled up the curl command for calling the API from postman, added the variables created previously at necessary fields and added the entire curl command formed inside the pipeline.yml file. Now it was time for testing the pipeline so I ran a new build manually, everything seemed to be working perfectly except the fact that it would also print terminal color codes along with diff in the patchset comments (patchset comments in gerrit do not seem to support coloring text). After looking for various ways to remove it I settled with using `git config color.diff false`. Now it was time for the final test.

First I created a new change set in my local gerrit that **added** a new **unformatted** .cpp file and everything worked perfectly. `clang-format` ran only one file and gave "-1" in "Verified" in the patchset along with the diff in the comment.

Then I added another change set in my local gerrit that **updated** already existing .cpp to the **formatted** one according to haiku guidelines. This time again everything worked perfectly and `clang-format` ran only on this updated cpp file and did not report any issues, only "Verified" was changed to "+1".

The following pipeline.yml was used for it.

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
        - task: check_coding_style
          config:
            inputs:
            - name: test
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: ubuntu
                tag: 20.04
            run:
              path: /bin/sh
              args:
                - -c
                - |
                  apt update && apt install -y wget curl jq python3 git python-is-python3
                 
                  # setup clang-format and git-clang-format
                  wget http://hrithik:9000//clang-format
                  wget http://hrithik:9000//git-clang-format
                  chmod 777 ./clang-format
                  chmod 777 ./git-clang-format
                  mv ./clang-format /usr/bin
                  mv ./git-clang-format /usr/bin

                  cd ./test
                  git config color.diff false
                  git clang-format --diff --style=haiku -q HEAD~1 > diff.txt
                  cat diff.txt

                  # check if diff.txt is empty or not and set verified
                  if [ -s diff.txt ]
                  then
                    verified=-1
                  else
                    verified=1
                  fi
                  echo "verified: $verified"

                  BASE_URL=http://hrithik:8090
                  CHANGE_ID=$(jq -r '.change_id' ./.gerrit_version.json)
                  REVISION_ID=$(jq -r '.revision' ./.gerrit_version.json)
                  TOKEN=Y2hlY2tlcmJvdDpnUlBONXdQQ0tVOTIxTUNzNitBc1dXclNSYzd4Mm9wWlNXNzNtYTRUOFE=

                  jq --null-input -M --rawfile message diff.txt --arg verified $verified \
                  '{
                      "tag": "test tag",
                      "message": "```\n\($message)\n```",
                      "labels": {
                          "Verified": $verified
                      }
                  }' > data.json

                  curl --location --request POST "${BASE_URL}/a/changes/${CHANGE_ID}/revisions/${REVISION_ID}/review" \
                  --header "Authorization: Basic ${TOKEN}" \
                  --header 'Content-Type: application/json' \
                  --data-binary '@data.json'

So end to end everything is working well on my local machine :)

Now my main focus would be on integrating my work in haiku infrastructure.

As always suggestions and ideas are welcome.
