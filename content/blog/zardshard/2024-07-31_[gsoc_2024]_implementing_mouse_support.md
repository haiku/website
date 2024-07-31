+++
type = "blog"
title = "[GSoC 2024] Implementing Mouse Support"
author = "Zardshard"
date = "2024-07-31 10:58:12-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

Success! Now MiniBrowser displays things once again. Here is MiniBrowser showing https://review.haiku-os.org/

![MiniBrowser showing review.haiku-os.org. All the text's characters are rendered as squares with black borders.](/files/blog/zardshard/MiniBrowser_development/2.png)

So, yeah, there's still plenty of work left to do. Text isn't rendered properly, keyboard and mouse support is missing, the window can't be resized without MiniBrowser crashing, and it crashes when exited. I'll take it one step at a time. Let's make the mouse work! Then I can actually click on stuff. I think implementing that will be straightforward.
