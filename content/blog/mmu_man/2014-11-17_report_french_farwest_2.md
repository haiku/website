+++
type = "blog"
author = "mmu_man"
title = "Report from the french far-west"
date = "2014-11-17T00:29:00.000Z"
tags = ["undefined", "FLOSS", "event"]
+++

<a href="/images/capitole_du_libre_haiku_booth_1"><img src="/files/screenshots/Capitole_du_libre_2014_DSCN2119.thumbnail.jpg" align="right"></a>I'm heading back home from <a href="http://2014.capitoledulibre.org/" title="Capitole du libre">Capitole du libre</a>, held this week-end in Toulouse, where I helped Adrien on the Haiku booth. I even just distributed two more flyers, since I've gone car-sharing for a change for both ways. I decided quite late, but Adrien kindly offered his sofa so I couldn't resist.
<!--break-->
I arrived on friday evening, and after spending five hours in a car had one more hour and a half with the metro and tram. It was raining almost all along.

<h3>Saturday</h3>

After a short night we had to take quite a long walk to the tram stop, but managed to avoid the rain, then went to the town center for the event. Just in time to set up the booth, and check the schedule for the not-to-miss talks.

Among the people who passed by our booth, a few still remembered BeOS and were happy to see we kept the torch alight. We showed the desktop, explained the new package management system while moving around the cdrtools package to show how cdrecord was getting in and out of /bin.

<a href="http://2014.capitoledulibre.org/programme/presentation/10/" title="Rendre un projet libre accessible : le cas Framadate">The talk</a> before Adrien's was about adding proper accessibility to the <a href="http://framadate.org/index.php?lang=en_GB" title="Framadate">Framadate online polling service</a> (just like Doodle but using FLOSS), which isn't that hard if done properly from the start, but took some time to replace all the hidden &lt;table&gt; tags with better code.

Adrien started <a href="http://2014.capitoledulibre.org/programme/presentation/14/" title="Découverte du système Haiku">his talk</a> a bit late due to a drifting schedule, but the room was quite filled. He explained how our API was designed, and made a little Haiku demo. We also had some interesting (maybe interested?) questions.

Then I headed to <a href="http://2014.capitoledulibre.org/programme/presentation/83/" title="Mixed ASIC/FPGA and software design and simulation using Verilator">a talk</a> from a friend about Verilator, a tool that generates C++ code from Verilog designs and allows mixing software and hardware implementations for much faster testing.

I also went to <a href="http://2014.capitoledulibre.org/programme/presentation/23/" title="La diversité pourrait sauver l'accessibilité">the talk</a> about desktop accessibility by someone I regularly see at RMLL. As a blind, he has a quite different 'view' on desktop, screen readers, keyboard shortcuts... He discussed the advances and regressions in desktop accessibility from the first versions of GNU/Linux desktops to the latest Gnome and KDE. Basically, Gnome 2 was quite good because Sun paid someone who had disabilities to work on it, the rest was almost non-working, then Gnome3 screwed up badly while some Qt apps work but KDE itself isn't usable yet. I think Haiku also should try to implement proper accessibility, starting by full keyboard navigability, which won't only benefit disabled people but everyone. I've been thinking about porting a screen-reader to Haiku, I believe our scripting API is well designed enough to provide most of the required informations, so it shouldn't be that hard.

The <a href="http://2014.capitoledulibre.org/programme/presentation/125/" title="Panorama des Internets actuels en politique : rires, pleurs et facepalms">closing talk</a> was jointly held by someone from <a href="https://www.laquadrature.net/en" title="La Quadrature du Net">La Quadrature du Net</a> and the former president of <a href="http://fdn.fr/" title="French Data Network">French Data Network</a> (the oldest french ISP, which happens to be a non-profit (yes, <a href="http://www.ffdn.org/en" title="Fédération FDN">you can do it too</a>!)), about the latest funny and ugly things happenning on the Internet about privacy and net neutrality (some awful french bill about terrorism, <a href="https://www.laquadrature.net/en/TAFTA" title="TAFTA">TAFTA</a>/TTIP...). We indeed had a good laugh at our clueless politicians.

We stayed a little while at the buffet, then we went to the birthday dinner of the friend who gave the Verilator talk (he also started writing a <a href="https://github.com/Torlus/qemu/tree/rpi" title="raspberry-pi branch on github">raspberry-pi target for QEMU</a>, btw). We had to leave and managed to get the metro just in time to grab the last shuttle to Adrien's house.

<h3>Sunday</h3>

On sunday we didn't have to walk as Adrien had the on-demand shuttle booked the day before. Some more people asked about Haiku at the booth, often starting with "is it a Linux distro ?".

<a href="/images/capitole_du_libre_haiku_booth_2"><img src="/files/screenshots/Capitole_du_libre_2014_DSCN2121.thumbnail.jpg"></a>

<a href="http://2014.capitoledulibre.org/programme/presentation/7/" title="Monnaies libres">One of the talks</a> I saw was about Free Moneys (like <a href="http://www.openudc.org/" title="OpenUDC">OpenUDC</a> and uCoin), as I've been involved into the creation of a <a href="http://en.wikipedia.org/wiki/Complementary_currency" title="Complementary currency on Wikipedia">local complementary currency</a> in my town, and ended up looking at those as well. I already started porting the dependencies for OpenUDC. ;-)

Then I had to pack up quickly to head for the meeting place for my car. The car driver being an Apple user we started to discuss about that, Free Software and the rest. I should soon get home and have some rest, as tomorrow I'm going to talk about Free Software to some students at the local Fab-Lab.

Some more photos on <a href="http://blog.l0ad.org/?p=1918" title="Nouvelles du far-west">this article</a> for my hackerspace website.