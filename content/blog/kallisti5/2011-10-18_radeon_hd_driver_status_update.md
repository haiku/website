+++
type = "blog"
author = "kallisti5"
title = "Radeon HD driver status update"
date = "2011-10-18T17:11:39.000Z"
tags = ["radeon_hd", "accelerant", "development"]
+++

<strong>UPDATE 10/19/2011!</strong> Older Radeon HD cards seem fully working minus HDMI. See below.


After several months of hard work (including some redesign of the driver) basic mode setting is working on a small number of Radeon HD cards after r42877. I am using the AMD AtomBIOS parser which executes binary functions on the Radeon HD card to do the real register hitting.

<strong>Limitations:</strong>
<ul>
 <li><strong>No 2D acceleration</strong> - 2D acceleration hasn't been started yet. These cards are fast without it however.</li>
 <li><strong>TV not working</strong> - I haven't put a lot of focus on TV just yet</li>
 <li><strong>Later cards</strong> - Radeon HD 5xxx+ cards are still having issues</li>
 <li><strong>DIG encoders</strong> - Later (r700?) Radeon cards can have DIG encoders. These are like digital encoders... but newer and not done yet. </li>
</ul>

<strong>Features:</strong>
<ul>
 <li><strong>Connector walking</strong> - We walk over all possible connectors and probe EDID data on each.</li>
 <li><strong>Multi-monitor</strong> - We can easily support multiple monitors in the driver. We just need to tie in the Screen Preflet code to make it happen. For the moment we set the same VESA EDID video mode on each attached display and get mirroring (as long as your displays are identical).</li>
 <li><strong>Monitor detection</strong> - We can manually trigger monitor detection (in the code, needs a Screen Preflet option) and set the initial mode on each display, hotplug support is planned.</li>
 <li><strong>Analog video</strong> - VGA, DVI-A, DVI-I (VGA)</li>
 <li><strong>Digital video</strong> - DVI-I (digital)</li>
</ul>

<strong>Card support:</strong>
<ul>
 <li><strong>Radeon HD 2350 - Radeon HD 3450</strong> - Analog / Digital (minus HDMI) working</li>
 <li><strong>Radeon HD 3470 - Radeon HD 4890</strong> - Unknown. Please test!</li>
 <li><strong>Radeon HD 5450+</strong> - Analog mode change works, no video. Digital DIG encoder not complete</li>
</ul>

Things should get smoother at this point as we have a working video for reference.

The radeon_hd driver should be in the nightly images starting with r42888+.  If you have a Radeon HD card, feel free to report functionality here or by emailing me.

In closing, for those "pictures or it didn't happen" people... http://twitpic.com/71xhll