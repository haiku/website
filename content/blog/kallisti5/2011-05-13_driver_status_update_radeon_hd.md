+++
type = "blog"
author = "kallisti5"
title = "Driver status update : Radeon HD"
date = "2011-05-13T15:35:04.000Z"
tags = ["radeon_hd", "radeon", "ATI"]
+++

<strong>EDIT: 05/28/2011:</strong> Add card functionality as of r41792

I have recently been working on the radeon_hd graphics driver and accelerant to get extended mode setting complete for the Radeon r600-r800 chipsets (Roughly Radeon HD 31xx - Radeon HD 59xx)

<strong>We still have a *very* long way to go, however the following is now working in the driver:
</strong>
<ul>
<li>Identifying a pretty large range of Radeon HD cards based on PCIID</li>
<li>Reading card information such as Memory and recording it</li>
<li>Reading the active monitor EDID</li>
<li>Creating mode lines from the EDID information above and adding them to the available mode lines</li>
<li>Passing the active monitor EDID to the screen preflet for monitor vendor/model/serial identification</li>
</ul>


<strong>Here are the short-term todo items (with focus on getting extended mode setting working):
</strong>
<ul>
<li>Set non-vesa (extended) mode lines by toggling the vendor-specific Radeon registers</li>
<li>Implement PLL controls</li>
<li>Add a few card-specific screen preflet options</li>
</ul>


<strong>Here are the long-term todo items:
</strong>
<ul>
<li>Finish AtomBIOS support to support advanced card functionality</li>
<li>Multi-monitor support</li>
</ul>

I am looking forward to (hopefully!) getting base functionality to the ATI Radeon HD cards. If you have and comments / PCI ID numbers / etc feel free to contact me and let me know.


<strong>Here are the current card test results as of 5/28/2011 r41792</strong>

<pre class="terminal">
Radeon HD 3450 r620  -- kallisti5
   Primary monitor works at native resolution of
   1440x900 but image offset and cut off.

Radeon XT 2600 r630 -- Benjamin Angerer 
  Primary monitor works perfectly. Plugging secondary
  monitor causes major issues as we are using EDID VESA
  results. (we try to use the VESA primary monitor modelines
  on the secondary monitor)

Radeon HD 4350 r710 -- kallisti5
  White screen of doom, incorrect screen mode change.

Radeon HD 5830 r800 -- kallisti5
  White screen of doom, incorrect screen mode change.
</pre>