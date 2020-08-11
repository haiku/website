+++
type = "blog"
title = "GSoC 2020 Project Update: XFS"
author = "CruxBox"
date = "2020-06-07 20:45:56+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello there!
It's been exactly a month since my last post. Sorry for not posting much!

---

Work done so far:
You can check for the patches here: https://review.haiku-os.org/q/hashtag:gsoc2020+owner:shubhambhagat111%2540yahoo.com

But in short this is what is done,

- Made some small change in the File System interface docs to make the working of readdir a little more understandable.
- Inodes can now be read from disk, it was interesting to see how inode was located on the disk itself though. Had to try a few times until I got it right.
- Implemented read_stat and get_vnode hook. It's not really anything complex I think. I took inspiration of implementation from other FileSystems we have and I guess by reading the docs.
- Short Directories can now be read. This means when the entries inside a directory are less, all the entry metadata can be stored inside the inode itself. Getting this to work was exciting!
- Block Directories can now be read. Ofcourse the number of entries might increase and we might want to do better than short directories. Hence, a directory block (4KB in my test), is used to store all metadata of entries. I tried and I could have around 100ish directory entries inside a block directory.

I feel initially quite some time was spent on structuring things a little bit. To understand how to make something work.

---

Next Steps:
In my previous post I had mentioned about Extent List based directories. Extent list based consists really of block and leaf directories. So since half of it is complete, I will now work on the other half.
And after that I will move on to B+Trees. Let's see how it goes :)

---

What I learnt:

- A lot of git
- Quite a lot about the subtle differences in C and C++
- Hopefully our coding guidelines :P
Probably a lot more things that I don't remember right now.

I personally enjoyed so far and hope that you liked my work (and also maybe liked working with me :P).

I accept feedback and criticism!
