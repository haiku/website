+++
type = "blog"
title = "[GSOC 2017] TCP optimization Week 4"
author = "a-star"
date = "2017-06-24 01:05:41+05:30"
tags = ["haiku", "software", "gsoc", "gsoc17", "tcp"]
+++

<p>Hello everyone. It's been substantial time since I started working on the project and here's the progress report.</p>

<h3>On the reading end</h3>

<p>Finally got over with reading the source code. What took it so long was that I first read most of the rfcs, including those I will be implementing even later on, before reading the current code. That kind of helped me not only to understand the code better but to also jot down the areas, where a change would have to be made, as and when encountering them. But then it consumed a lot of time as well.</p>

<p>Among the rfcs that I am left to cover is the one I recently came across, rfc 6349 on Framework for TCP throughput Testing, and parts of rfc 7323 on TCP extensions.</p>

<h3>On the coding end</h3>

<p>I forked the repo, as suggested by jessicah, instead of opening issues on trac. Seems fair enough. The link to my fork is <a href="https://github.com/A-star-ayush/haiku">this</a>.</p>

<p>Kindly review the changes and provide your valuable suggestions. I am in the middle of compiling the changes and seeing their effect, so I haven't pushed a lot of them onto the fork. But shouldn't take much time. You can expect me to be rolling out changes at a quicker pace from now on.</p>


