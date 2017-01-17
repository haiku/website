+++
type = "blog"
author = "leavengood"
title = "Our first decent WebKit rendering!"
date = "2007-12-19T00:04:58.000Z"
tags = ["development", "porting", "WebKit"]
+++

<p>The WebKit Haiku port team has seen some nice progress lately in the form of our first decent rendering. Read more to see it...</p><!--more-->

<img src="http://ryanleavengood.com/files/bebits-render2.png" />

<p>I cannot take all the credit for this as the latest push to fix some bugs and implement font loading and text rendering has been courtesy of Andrea Anzani. In fact he created the above screenshot.</p>

<p>Now a few caveats about the above:</p>
<ul>
<li>BeBits is being loaded from disk, not the network. We still need to work out the bugs in the Haiku GCC4 port of CURL.</li>
<li>Scrolling is disabled at the moment because we still have some work to do there. You can kind of see blank spots at the bottom and sides where scroll bars would render.</li>
<li>There are obviously some rendering bugs here and there.</li>
<li>The HaikuLauncher is still very basic without any chrome (back and forward buttons, URL bar, status bar, etc.)</li>
</ul>

<p>But overall, not too bad! It makes me feel pretty good to see all my hard work finally producing a decent result, and I'm glad I have help now because it results in screenshots like the above.</p>

<p>As usual I will try to keep everyone updated as the port continues to progress.</p>