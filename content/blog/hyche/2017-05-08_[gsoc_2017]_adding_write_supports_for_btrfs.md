+++
type = "blog"
title = "[GSoC 2017] Adding write supports for Btrfs"
author = "HyChe"
date = "2017-05-08 13:49:47+07:00"
tags = ["haiku", "gsoc2017", "gsoc", "filesystem", "btrfs"]
+++

<p>Hello everyone,</p>

<p>My name is Hy (Trac: hyche, freenode IRC: ugen), and this first blog is about my introduction and Btrfs. This is the first time I participate in Google Summer of Code, I also know Haiku through this event. My project in this summer is <b>write supports for Btrfs</b> and my main mentors are <i>mmu_man</i> and <i>tqh</i> (Fredrik Holmqvist).</p>

<p>During the community bonding period, I will </p>
<ul>
<li>Set up my development environment (userlandfs and fs_shell).</li>
<li>Dig into the codebase to know more about Haiku kernel, how other support filesystems work and derive it for Btrfs.</li>
<li>Try to fix issues to get me familiar with the existed works.</li>
</ul>
<h3> Btrfs </h3>
<p>Btrfs (B-tree filesystem) is a filesystem uses <b>B+trees</b> as its main on-disk data structure. It is based on <b>Copy-on-Write</b> (CoW) principle which means it does copy only when a write is necessary. The following works will be implemented to bring off write features:</p>
<ul>
  <li>Adding more Btrfs structures.</li>
  <li>Adding/Modifing tree manipulations (splitting, finding, CoW, etc).</li>
  <li>Implement file/directory operations.</li>
</ul>
<p>That's all for now. You can read more details in the reference section.
Bye and have a nice day!
</p>

<h3> References </h3>
<ul>
  <li><a href= https://storage.googleapis.com/summerofcode-prod.appspot.com/gsoc/core_project/doc/5695133795221504_1491221770_Haiku-proposal-Write-supports-for-BTRFS.pdf?Expires=1494390719&GoogleAccessId=summerofcode-prod%40appspot.gserviceaccount.com&Signature=QULfCFIqknR4cAbBAaHOE6t6FqLRx%2F8pUUtTw8mO5srptrXyWCzVFuwgKapG6n%2B%2B3j6Qen96%2FT0rCai%2Bra0MfrLexgfo9cdu7hQMHscRH2rjzAXkrIgA5BqZWeXbTDpGSb1k9%2FhMXHLqeMB6zFc6KwRStN5mIdq9H42VXeJaZU1Ym7JwG1oxc83R0%2FeSNB83YWQ6vkbjYhEkh27%2FCMeT0XO2yHDzuqn4fzU2qRcrY%2FFq1IwZs08B4EE5sjjgqzx501oEBNSsZmwoK%2FnxO%2BCF5S6PpXa8oPvNd5gzRzHT3GyyAx7RZOtCmXV51tg1ozZfNju4MxXfOnkjVEQu41pmxQ%3D%3D
  >My GSoC proposal</a>
  <li><a href=https://btrfs.wiki.kernel.org/index.php/Main_Page>Btrfs wiki</a>
<ul>
