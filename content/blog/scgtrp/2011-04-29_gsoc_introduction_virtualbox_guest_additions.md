+++
type = "blog"
author = "scgtrp"
title = "GSoC Introduction: VirtualBox Guest Additions"
date = "2011-04-29T11:45:36.000Z"
tags = ["gsoc2011", "virtualbox"]
+++

Hello. I'm Mike and I'll be porting part of the VirtualBox guest additions to Haiku. My full proposal is <a href="http://www.google-melange.com/gsoc/proposal/review/google/gsoc2011/scgtrp/1">here</a>, but briefly, the features I plan to port include:

<ul>
<li>Mouse pointer integration</li>
<li>Shared folders</li>
<li>Shared clipboard</li>
<li>Time synchronization</li>
<li>An improved video driver</li>
<li>Guest control (executing commands on the guest from the host)</li>
<li>Guest properties</li>
</ul>

During the community bonding period I plan to spend a bit of time reading more code and discussing with the developers to learn more about how things work in both Haiku and VirtualBox. I also plan to play with mmu_man's patch to get it to work with the latest versions of VirtualBox and Haiku so that I have a working base to start from when the coding period starts.