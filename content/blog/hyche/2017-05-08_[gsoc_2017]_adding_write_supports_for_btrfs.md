+++
type = "blog"
title = "[GSoC 2017] Adding write supports for Btrfs"
author = "HyChe"
date = "2017-05-08 13:49:47+07:00"
tags = ["haiku", "gsoc2017", "gsoc", "filesystem", "btrfs"]
+++

Hello everyone,

My name is Hy (Trac: hyche, freenode IRC: ugen), and this first blog is about my introduction and Btrfs. This is the first time I participate in Google Summer of Code, I also know Haiku through this event. My project in this summer is **write supports for Btrfs** and my main mentor is *mmu_man* (Fredrik Holmqvist).

During the community bonding period, I will 
* Set up my development environment (userlandfs and fs_shell).
* Dig into the codebase to know more about Haiku kernel, how other support filesystems work and derive it for Btrfs.
* Try to fix issues to get me familiar with the existed works.

### Btrfs
Btrfs (B-tree filesystem) is a filesystem uses **B+trees** as its main on-disk data structure. It is based on **Copy-on-Write** (CoW) principle which means it does copy only when a write is necessary. The following works will be implemented to bring off write features:

* Adding more Btrfs structures.
* Adding/Modifing tree manipulations (splitting, finding, CoW, etc).
* Implement file/directory operations.

That's all for now. You can read more details in the reference section.
Bye and have a nice day!

### References

* [My GSoC proposal](https://storage.googleapis.com/summerofcode-prod.appspot.com/gsoc/core_project/doc/5695133795221504_1491221770_Haiku-proposal-Write-supports-for-BTRFS.pdf?Expires=1494390719&GoogleAccessId=summerofcode-prod%40appspot.gserviceaccount.com&Signature=QULfCFIqknR4cAbBAaHOE6t6FqLRx%2F8pUUtTw8mO5srptrXyWCzVFuwgKapG6n%2B%2B3j6Qen96%2FT0rCai%2Bra0MfrLexgfo9cdu7hQMHscRH2rjzAXkrIgA5BqZWeXbTDpGSb1k9%2FhMXHLqeMB6zFc6KwRStN5mIdq9H42VXeJaZU1Ym7JwG1oxc83R0%2FeSNB83YWQ6vkbjYhEkh27%2FCMeT0XO2yHDzuqn4fzU2qRcrY%2FFq1IwZs08B4EE5sjjgqzx501oEBNSsZmwoK%2FnxO%2BCF5S6PpXa8oPvNd5gzRzHT3GyyAx7RZOtCmXV51tg1ozZfNju4MxXfOnkjVEQu41pmxQ%3D%3D)
* [Project overview](https://summerofcode.withgoogle.com/dashboard/project/4749427110576128/overview/)
* [Btrfs wiki](https://btrfs.wiki.kernel.org/index.php/Main_Page)
