+++
type = "news"
title = "Switch to XEmacs and fish"
date = "2011-04-02T00:11:07.000Z"
tags = ["R1", "XEmacs", "fish"]
+++

On this first of April, the main Haiku developers wish to announce an important change that will likely increase user friendliness of the overall Haiku experience. We are a bit late to report the news due to the excitement and the required planification work, but we hope everyone will enjoy the move.
<!--more-->
First, many system applications will be replaced by <a href="http://xemacs.org/">XEmacs</a>, which is already being ported to Haiku:
<ul><li>StyledEdit</li>
<li>Pe</li>
<li>Terminal</li>
<li>WebPositive will be replaced by W3 which is integrated into XEmacs</li>
<li>ActivityMonitor is no longer needed thanks to <span class="key">Meta</span>-x display-time <span class="key">RET</span></li>
<li>Debugger will be dumped in favor or gdb running in a shell buffer</li>
<li>Icons will now be using the XPM format for which XEmacs has a mode for, removing the need for Icon-o-Matic</li>
<li>Installer will be replaced by an insanely complex Lisp script</li>
<li>Mail function will be largely replaced by the GNUS mode</li>
<li>MediaPlayer will not be required for audio files, since XEmacs has the ability to play audio</li>
<li>XEmacs will bring new games to Haiku, including a Tetris game</li>
<li>Tracker will not be really useful anymore since <span class="key">Meta</span>-x dired <span class="key">RET</span> is so much simpler</li>
<li>AboutSystem will be integrated into <span class="key">Meta</span>-x about <span class="key">RET</span></li>
<li>And finally Haiku users will be healthier computer users now thanks to <span class="key">Meta</span>-x doctor <span class="key">RET</span></li>
</ul>
While removing those applications might not balance the required space for XEmacs, we believe it is for the greater good.

Also, since we believe Haiku to be powerful enough to rival the technology created by the <a href="http://www.gateworld.net/wiki/Ancients">Ancients</a>, the default font will be changed to <a href="http://wurdbendur.deviantart.com/art/Anquietas-11065570">anquietas.ttf</a> to help all the smart people that Haiku users are to learn the language of the creators of the stargate.

Here is a screenshot giving you an idea of what the new Haiku desktop will look like, including a brand new color scheme thanks to our Theme Manager:
<img src="/files/images/shot_SGA_ancient_XEmacs.png" />
Haiku users will finally be able to exercise all the keys on their keyboard, including <span class="key">Escape</span>, <span class="key">Meta</span>, <span class="key">Alt</span>, <span class="key">Control</span>, <span class="key">Shift</span>.

Moreover, in order to make terminal interaction easier on the user, the default shell will be changed to the <a href="http://community.gotpike.org/fishshell/">Friendly Interactive Shell (fish)</a>. Likely this new setup will help users feel welcome to our wonderful operating system !