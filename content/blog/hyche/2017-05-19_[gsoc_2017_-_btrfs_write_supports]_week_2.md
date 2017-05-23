+++
type = "blog"
title = "[GSoC 2017 - BTRFS Write Supports] Week #2"
author = "HyChe"
date = "2017-05-19 21:42:20+07:00"
tags = ["haiku", "gsoc", "gsoc2017", "filesystem", "btrfs", "driver"]
+++

<p>Hello everyone,</p>
<p>This is my second report about my project <b>"Adding write supports for BTRFS"</b>. There hasn't been much coding in this week and previous week, just some researchs, some style fixes in btrfs code base, and I have managed on setting up fs_shell for btrfs, or now you can say btrfs_shell, based on bfs_shell work. fs_shell is a framework containing all the kernel emulation and the user and scripting interface (Thanks Ingo for the info), this allows to compile and run filesystem (Haiku's, for example btrfs) in userland under Linux or any host systems that can build Haiku.</p>

<p>With fs_shell, now I can test btrfs in many files with different size after only 5 second of building. Initialy, I had to build btrfs source, made hpkg for it, move the package to /system/packages and restart to get it kicked in, luky for me that Haiku took few seconds to boot. Thanks axeld for recommending me fs_shell, and pulkomandy for helping me compile zlib for btrfs_shell and fix code styles.</p>

<p>Also in this week, I learnt more about Git and Jam. Before attending GSoC, I only knew git clone, commit and push with no arguments. The first blog of my introduction is also my first pull request. Now I know I should sync my local repository with the upstream haiku repository with git pull --rebase instead of normal git pull, this help clean the git history. Moreover, git commit --amend to fix the HEAD commit, or git rebase --iterative to fix previous commits that are before HEAD. I recommend this <a href=https://git-scm.com/book/en/v2>link</a> for who want to learn about Git. With Jam, I know more some rules, some Haiku's built-in variables for example HOST_LINKFLAGS, it help me link zlib to compile btrfs_shell.</p>

<h2> Next week works </h2>
<p>Because I have set up my development evironment sucessfully, next I will continue dive into code base, read more about btrfs to understand more about it and will do some code if necessary. I made a branch for my work in <a href=https://github.com/hyche/haiku/tree/btrfs>my Haiku's fork</a>, still there is nothing there. If someone is interested, you can have a look at anytime and give me some comments if possible.</p>

<p>That's all, thanks and have a nice day, see you again next week.</p>
