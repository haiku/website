+++
type = "blog"
author = "mmu_man"
title = "Say what you want from us but not what we don't want to hear... Or how much did we regress ?"
date = "2008-11-04T04:42:20.000Z"
tags = ["Linux", "rant", "specifications", "drm", "tied sale", "moderation", "open source"]
+++

Last week I received a mail telling me MSI wanted to <a href="http://forum.msi.com.tw/index.php?topic=121215.0">hear from me what I wanted on their next products</a> on their forum. Frankly, I didn't even remember having an account on that forum, where I registered to help someone on a BeOS SMP question. So I jumped in and started telling what I, as an Haiku developer, really expected from a hardware manufacturer, trying to explain, with humour but determination, why open hardware is so important to me.

Then after some other's post I replied a second time, first to someone mentioning the need for <a href="http://en.wikipedia.org/wiki/HDMI">HDMI</a> support on why I didn't agree because of <a href="http://en.wikipedia.org/wiki/Digital_rights_management">DRM</a>, then a maybe-rantful-but-oh-so-true digression about the availability of specifications. Sadly, neither post are available for your reading pleasure, a moderator found them to be "rubbish" and removed them altogether, who obviously doesn't use alternative Operating Systems, never wrote a driver with only uncommented Linux code as reference, doesn't live in France, and never saw a TV set manual from before 1980.

Since my views weren't welcome there, I'll try to at least make them clear here, and either MSI (and other vendors) read them or not, but I'm used to the latter anyway. Please note that was the act of a moderator, which might or might not be part of MSI, nor reflect their own policy <i>(I wish)</i>.
<!--break-->

<h3>On open drivers</h3>

Oddly it seems I'm <a href="http://forum.msi.com.tw/index.php?topic=121215.msg915203#msg915203">not</a> <a href="http://forum.msi.com.tw/index.php?topic=121215.msg915223#msg915223">the</a> <a href="http://forum.msi.com.tw/index.php?topic=121215.msg915237#msg915237">only</a> <a href="http://forum.msi.com.tw/index.php?topic=121215.msg915244#msg915244">one</a> <a href="http://forum.msi.com.tw/index.php?topic=121215.msg915247#msg915247">asking</a> for opensource on that forum... But it seems to be more "politically correct" when it's for GNU/Linux... which usually means the result would be GPL, so unsuitable licence-wise for porting to Haiku, and unportable anyway because no stable driver API in Linux means no way to understand it easily. It's the very reason I directly ported <a href="http://opensound.com/">OpenSound System 4</a> instead of trying at ALSA, as I knew I had no single chance, because it's so tied to Linux.
Those who tried to write a driver using only the uncommented obscure contradictory source code for <a href="http://dev.haiku-os.org/browser/haiku/trunk/src/add-ons/media/media-add-ons/usb_webcam/README.txt#L60">5 different linux drivers</a> for the same hardware will <a href="http://dev.haiku-os.org/browser/haiku/trunk/src/add-ons/media/media-add-ons/usb_webcam/addons/sonix">know what I mean</a>. Oh yeah, I actually also found a "<a href="http://www.mnementh.co.uk/sonix/sn9c102.pdf">datasheet</a>"... well, it's quite incomplete and even wrong according to drivers I've seen and tests I made... plus that doesn't cover the CMOS sensor chip connected to it. I recall asking for a datasheet for this one, and actually getting one, though it wasn't of much help either, really.

Of course, people will just say "Why do you ask for specs or opensource drivers ? It's all fully supported by Linux!"
Sure... But:
<ul>
<li>Not everyone uses GNU/Linux. Yes, you've had to learn the hard way that there wasn't only Windows, but also GNU/Linux. Now it might be time to learn there is not only Linux in the <a href="http://en.wikipedia.org/wiki/Free_and_open_source_software">FOSS</a> world. There are actually many, many "Operating System" (you'll understand that term one day...): AmigaOS, <a href="http://aros.sourceforge.net/">AROS</a>, <a href="http://www.freebsd.org/">FreeBSD</a>, NetBSD, OpenBSD, <a href="http://www.minix.org/">Minix</a>, <a href="http://web.syllable.org/pages/index.html">Syllable</a>, <a href="http://www.gnu.org/">GNU</a>/<a href="http://www.gnu.org/software/hurd/hurd.html">Hurd</a>, <a href="http://sourceforge.net/projects/v2os/">V2OS</a>, <a href="http://en.wikipedia.org/wiki/MiNT">MiNT</a>, <a href="http://www.reactos.org/en/index.html">ReactOS</a>, <a href="http://www.freedos.org/">FreeDOS</a>, Haiku..., each with their own pros and cons, but each with their own reason of existing in the software ecosystem. Thinking a single OS for everyone is enough is foolish. It's because there are so many different projects with different goals that innovation can really happen, because people exchange ideas and code. That's called <i>technodiversity</i>, and was the conclusion of <a href="http://revolf.free.fr/RMLL/2008/Haiku/Haiku_RMLL_2008.pdf">my talk</a>(fr) at the last <a href="http://2008.rmll.info/">RMLL</a> in july...</li>
<li>Not everyone uses Linux on x86. Yeah you know there are other architectures out there... And since half of the "supported by Linux" hardware is actually supported by the means of a binary blob with an "open" kernel glue, this scam only works on Linux on x86. No problem for x86 motherboards, sure, but well video cards, NICs, wifi cards and others... Just try to use them even in Linux on ppc.</li>
<li>Sometimes the claimed "support" for Linux just doesn't exist, or is just the bare minimum, and often isn't the fact of the vendor itself but actually the act of developers writing drivers <i>against the very will</i> of the same vendor.</li>
</ul>
Of course FreeSoftware developers are smart, and devise many strategies to work around this.
<ul>
<li>virtualization. Yes of course, you can run Linux on anything that can run vmware, but well if that's not cheating, I don't know what cheating is.</li>
<li>Linux emulation: FreeBSD has a Linux emulation layer allowing it to run Linux binaries, but that doesn't work for kernel drivers. At least they can run flash player (but <a href="http://revolf.free.fr/img/why_I_banned_flash.png">that</a> <a href="http://revolf.free.fr/img/why_flash_sux_even_on_linux.png">sux</a> anyway).</li>
<li>Windows emulation (<a href="http://ndiswrapper.sourceforge.net/">ndiswrapper</a>, <a href="http://www.mplayerhq.hu/">mplayer</a>'s <a href="http://en.wikipedia.org/wiki/Dynamic-link_library">DLL</a> loader, <a href="http://www.winehq.org/">wine</a>)... but of course, that means it restricts using the driver or application to Linux on x86, and you've just learnt that there is not only x86 around. Also, it is often criticized by FreeSoftware proponents as giving vendors one more excuse for avoiding real open drivers, as "hey you see, it works in Linux now!", which is wrong, depending on the platform you run it.</li>
<li>Other OS emulation. Haiku for example, has a FreeBSD compatibility layer that allows it to port BSD network drivers quite easily (BSD drivers are often regarded as cleaner, simpler to understand, using a stable driver API unlike Linux, and have a much more permissive licence than Linux' GPL), even though there are fewer than Linux ones.</li>
<li>Reverse Engineering: That's the most widely used method of providing drivers to Linux and other alternative OSes (not only FOSS ones!). While it sounds great because developers don't rely on vendors, it's really a problem because:
<ul>
<li>It once again gives an excuse to the vendor to say "Oh it already works in Linux, you don't need open drivers", even sometimes claiming their "support" for Linux. And usually they just forget about other OSes along the way.</li>
<li>It wastes precious developer time and resource and money (they must buy many different models to make sure they work), instead of having them work on other useful stuff that could actually bring advantages over competition ("kill apps", or just fixing bugs).</li>
<li>While it "seems" to work, this time not only on x86, it usually only supporting the minimum features of the hardware, those which the developer really needed, and only that, because it just takes time and money even if (because!) they do that in their spare time.</li>
<li>Also, because they come from source that cannot be ascertained (reverse engineering is about as much as russian roulette), and even though FOSS devs know their field, there is no single way one can make a guarantee about the correctness of the driver. It might be missing safety checks, making the hardware do weird things, or even destroy it. It stems from this that most vendors "certifying" their hardware on Linux are just certifying the fact they tried to boot it and it works (sometimes not even this), but not the fact that it acts according to the specifications, because those same specifications were not made available. Therefore, many (not all hopefully) hardware vendors certifying Linux are actually making false claims, and might (and should) even be potentially considered responsible for misbehaviour from such drivers.</li>
</ul>
</li>
</ul>

<h3>On schematics of 30 years old TV sets</h3>

I suppose some people won't trust me when I say I actually have the full schematics of my parent's TV set, but it's true. It came along with the blue covered user manual, glued to the last page. At that time it wasn't a problem because hardware was meant to be repared, not thrown away on the first issue. It was actually much more ecological, and was even of interest to hobbyists to try to understand how it worked. At that time, there were many publications about RF and TV design, with explained schematics, an actually quite long tradition as even the vacuum tube radio era also had all those schematics published, most of which are <a href="http://www.one-electron.com/FC_Radio.html">still</a> <a href="http://www.nostalgiaair.org/Resources/">available</a> on the Web. Of course, now TV sets are much simpler, all is crammed into a few ASICs and CPUs... But then again, the datasheets for the 30 years old chips used in the designs were also available, why can't it be true of current dies, whatever size they are ? We can't have regressed that much, can we ? I just hope we won't end up "buying" something with just the usufruct right of using it, not owning the real hardware to be able to adapt it to our real need.
All this is actually also true about computers. Yes, I do have the <a href="http://www.48katmos.freeuk.com/oric1-1.gif">full</a> <a href="http://www.48katmos.freeuk.com/oric1-2.gif">schematics</a> for my <a href="http://www.old-computers.com/MUSEUM/computer.asp?c=79">ORIC Atmos</a>, which were even published in an issue of the french importer's magazine, "Micr'ORIC". And those magazines weren't afraid either of showing source code, often assembler at the time.

<h3>On fake trade secrets</h3>
If you actually develop drivers you probably know the common reason invoked when asking a company for specifications.
<i>We are sorry, but this is secret trade secret and cannot be disclosed to maintain our competitive advantages.</i>
The most obvious examples are graphics card makers, because they cost more and more, and use more silicium surface each year.
This simply doesn't hold, because:
<ul>
<li>That's what patents are for. They provide you a monopoly on the exploitation of an invention for a (quite long by comparison with current technology lifespans) time in exchange for public disclosure of the inner workings of the invention. (Though I should write about that plague that is called software patents one day, but that'd deserve a whole article.)</li>
<li>Just as with security, the "by obscurity" way didn't, doesn't, and will never work.</li>
<li>Each competitor in the market (certainly the GPU one) have largely the resources to employ an army of people to reverse engineer each others chip, and certainly does, making this "advantage" moot. Of course FOSS developers don't have this manpower available, so once again, they are the only ones hurt by these unfair practices.</li>
<li>Besides, mostly those NDA-covered specs are actually an excuse to hide hardware bugs they are just ashamed of anyway, so-called erratas...</li>
</ul>

A "special" case are WiFi chips. Makers hide behind an FCC ruling, that forbids chip makers from allowing users to use the chip beyond the allowed power for each frequency band. But of course chips now are based on generic circuits that are controlled by the driver which sets the frequency and requested power as it sees fit. Of course, opening the driver or the specs would mean the vendor "deliberately" gives the customer the possibility to break the FCC requirements.
But well, we all know this just doesn't work because in the end someone will rightfully reverse engineer the driver and write an opensource one which will allow it.
Btw, RE is absolutely legal in France, when done for interoperability reasons, which is exactly the case for drivers, and probably in other countries also... And of course the FCC has no jurisdiction in France (but probably there are similar legislation, I didn't check and it's 4am now).
In the end, it's the rights of the purchaser to actually use what they <b>cashed for</b> vs. a rule that will be broken anyway...

<h3>On tied sale</h3>

When you go to your local store, and want to buy a PC, usually you don't even get asked what you want with it, nor do most people wonder what they want with it.
You usually just buy a working "solution". And that "solution" happens to be a PC, with Windows installed on the disk. Or a Macintosh, with MacOSX installed as well, even though many other OSes run on the Macintosh as well. Most non-tech-savvy people actually don't even know what Windows is, let alone an Operating System. They just want something that they can use. But sometimes, what they <i>need</i> is not actually what they <i>get</i>. Sometimes they would need Linux, or BSD or something else, because it would suit their usage pattern better. But there is no way they can even know about this, because shops are contractually linked to OEMs and Microsoft, and are forbidden to ship with anything else than Windows. The contracts themselves are just secret, so you don't even know what it tells, and what threats are made to OEMs.

All could be well, if Windows was the only OS around, and if it was <i>only</i> available preloaded on PCs, then it would be just logical. But here is the trick: It is also available in boxed version, <b>separately</b> from the PCs. Therefore, it is obviously a <i>distinct</i> product than the PC. The french law, and many others alike, define the act of selling two separate products as a bundle without proposing the option to only purchase one as <a href="http://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069565&idArticle=LEGIARTI000006292153&dateTexte=20081104">Tied Sale</a> and clearly forbids it.

Yet all goes unnoticed, because vendors just don't care about "Linux freaks" who rant instead of just using what they are sold. For years, this fight has been disregarded as such by Windows users who just didn't care about their own freedom. Back then, BeOS also <a href="http://www.birdhouse.org/beos/byte/30-bootloader/">suffered a lot from it</a>, and it was probably the major cause of its doom. And Linux didn't receive all the light it deserved. Until recently, where the Vista release actually changed the game. Indeed, long time windows users are starting to see the fight against vendor lock-in with a different angle, as they are getting forced into buying Vista when they still have their XP licence that they paid for and would like to use instead. Ain't it funny ?

The recent appearance of so-called "netbooks" (this term was actually a PSION trademark long ago btw...) seems to have changed the game a bit, but still, returns seem to be higher on Linux devices than XP ones, because people are still so impregnated by Windows they can't imagine something working just a little differently (eh, they even copied the Luna grey Windows decor on the eeePC Linux distribution, isn't that ridiculous ???). And of course, with drivers coming either from binary blobs or RE-ed sources vendors cannot really certify their stuff works with Linux anyway...

<h3>On availability of specifications</h3>

Now that I explained why open drivers are important, how it already used to be the way we are just asking it to be, why the vendor excuses simply don't hold, and finally why the computer and the OS are two separate products, it should become obvious that providing specification is not only needed, but also a moral (and maybe legal in some countries) right of the purchaser.
I don't know how to make myself understood... I mean, when you buy a tv, you get a manual telling how to use it. When I, as an OS developper, buy a computer, <i>not</i> an OS, I <i>need</i> a manual telling me how to use it. That manual is called the specification. It's the clearest I can be.

Yes, I know mainboard makers don't always have much choice over getting the specs or not. But they have the choice of buying from a chip maker that provides specs, and one that doesn't.

I recall of a sound and video card maker called Guillemot... which when asked to provide specs so <i>others</i> could write Linux drivers for them, replied "We will not provide Linux drivers for now", either not understanding they didn't have to, or just not getting it at all. I actually learnt later that they didn't even have the source code for the drivers of their own video cards, but instead got them readymade from nvidia... How could they just provide support for that ? That's desperating.

<h3>On DRM</h3>

Along with SATA, which I had to purchase an add-in card to buy a new harddrive because I couldn't find a 500GB IDE one and I didn't like being imposed that, I complained in my forum post about people asking for HDMI. Not because HDMI might be technically better than DVI (which I'm not even sure it is), but because this standard (I'm not even sure it can be called a "standard", is the specification publically available ?) imposes using DRM over it, which is both technically and ethically <a href="http://www.defectivebydesign.org/">defective by design</a>.

I've still yet to see any formal (read: mathematical) proof that DRM is actually possible.

Besides, it locks people into using <i>their</i> data on selected hardware, and, of course, selected Operating System(s), which is always welcome by our friends in Redmond and Cupertino. It denies you the very right of actually playing the data. As a trivia, when the French parliament transposed the EUCD (the european worse-than-original DMCA) into French law, then dubbed DADVSI, which of course started <i>2 days before christmas</i> and was supposed to be done in one night, but ended up being a little longer, the parliament legalized and protected DRMs, forbidding writing software that broke them, therefore getting around my constitutionnally given freedom of speech (software <i>is</i> speech), and even funnier, they wrote in the law, that for each medium, there could be a limited number of copies allowed, which, in the case of DVDs would actually be 0. Yes, you read it, you have the right to make copies of your DVDs in France, as long as it's 0. Much much funnier than Ford's black or black cars, isn't it ?

<h3>Conclusion</h3>

I really wonder how much we regressed over the years... sure, the complexity of TV sets grew... but so did their design opacity. Same for other hardware.

As for MSI, well, it's probably not their fault, but I'll use another vendor for the time being.

I've just came up with this thought, and wonder why I didn't get it earlier in that formulation... It's <i>so</i> obvious now.
<b>Hardware vendors who do not provide open drivers and specs are accomplices of the OEM imposing tied sale and Microsoft monopoly.</b>
And here is why:
<ul>
<li>Not providing open drivers and/or specs implies not allowing FOSS/alternative OSes to get support on par with Windows</li>
<li>Other OSes not being able to grow proper hardware support prevents them from effectively competing with Windows</li>
<li>Not being able to compete on par with Windows due to lack of hardware support forbids OEM to eventually propose a viable alternative</li>
</ul>
As such, all vendors not providing the base requirement for OS developers are as guilty as the one maintaining its monopoly on 90% of the desktop OS market.


Hopefully I'll sleep better tonight, well the remainder of it, at least I feel relieved from something.


Oh, by the way...

<pre>
;
</pre>


<br/>
<br/>
<br/>
<br/>

Your brain has been tainted by 1 line of SCO code... You can't write Linux code anymore ;-)
