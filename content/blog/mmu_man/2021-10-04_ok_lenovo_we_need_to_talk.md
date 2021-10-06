+++
type = "blog"
title = "OK Lenovo, we need to talk!"
author = "mmu_man"
date = "2021-10-20 16:00:00+02:00"
tags = ["BeOS", "Linux", "rant", "specifications", "drm", "tied sale", "open source", "right to repair"]
+++

I've been wanting to publicly comment on Lenovo's statement on Linux support for a while, as there's much to say about it, and my failing attempt at finding a suitable replacement for my venerable T510 gave me an excuse to document my love-hate relationship with Lenovo all at once.

This is of course my own personal views and ideas, and does not reflect the Haiku project's position on the topic, nor that of Haiku, Inc. But I feel they deserve to be brought here due to history and the direct and indirect effect it might have had on the project, including previous failed attempts at commercial applications using it.

While Lenovo is still above many other manufacturers on some aspects, and on others domains, well, nobody does any better anyway, they purport to perpetuating the IBM legacy, so I think (sic) they should be held up to the standard they claim to follow. Yet the discussion about repair and documentation pertains to almost every vendor.

<!--more-->

Also, it's a long read, an hour or so, so make yourself comfortable, get a coffee, or tea and biscuits.

Skip [to the middle](#lenovo-supports-linux) for the more political views on Right to repair, schematics and specifications, but you'd really be missing some history and facts for the subsequent discussion, and rants about [the T510 and nvidia](#iced-t510). If you just want to see me complain about current hardware [just go further down](#wtf541).

## Time travel

I had several computers before ThinkPads, not all of which were good, so I'll go through them for context. It's also of historical interest to BeOS and Haiku fans I suppose. That's only the ones I actually used for coding and daily tasks, not those I try not to collect because my flat is already full.

### ORIC Atmos

The [ORIC Atmos](https://en.wikipedia.org/wiki/Oric#Oric_Atmos) had a MOS 6502 CPU and 64KB of RAM. We had three of them at the back of the class in 1989, and I managed to get my mum to buy me one.

It's still working, [the user manual](https://library.defence-force.org/index.php?page=books&sort_by=date&entries_per_page=13&content=any&author=IanAdamson&type=manual&language=fr&sort_by=name) has all the register descriptions to program it in assembly language, and I have [the full schematics](https://wiki.defence-force.org/doku.php?id=oric:hardware:motherboard) in case I need to fix it. And I still write software and make hardware for it.

Some hardware limitations but still respectable specs with regards to contemporary machines.

And it's black and red. 😎

And it's beautiful. 🤩

And it has a real keyboard.

### FIC 386 laptop

I was given this <abbr title="First International Computer">FIC</abbr> laptop. I used Windows 3.0 in real mode on it for a while, until one day I opened it, and counted the RAM chips, and wondered why it didn't see all of the 1MB of them.

I remember playing with `debug` in MS-DOS, poking around the chipset, because it wasn't documented (or at least I didn't have the document), and finally finding a way to unmask it, then writing a DOS driver to do it at boot.

Oh the joy of finally starting Windows in protected mode!

### AMD K6-2 350MHz

This machine I bought when starting engineering school. Had Windows 95, then 98. I also installed Slackware GNU/Linux, and BeOS, from an R4 demo CD that wasn't supposed to allow installation. They should have removed `dd`… I later found `mkbfs` in an upgrade package and moved it to a larger partition.

At some point, two things made me move to BeOS as my main OS for about 10 years. One, experimenting in some link driver for my Ti calculator froze the Linux kernel. Back then it wasn't preemptible, unlike the BeOS one and I just felt it was so lame I wanted to use something more advanced. Second, a Linux distro CD overwrote my existing Linux partition when trying to install it for testing.

The video card was an ATI Rage Pro, which worked fine in Linux: Slackware just asked a dozen question at install (like, exact model, how much RAM…) and it worked. In BeOS it just worked as well, with only some clocking issue when using the overlay that made it show weird stuff, but an updated driver fixed it. Windows 98 though, at one point I had the bad idea of trying to upgrade the driver. Windows wouldn't boot anymore. I don't really remember what had to be done to get it back.


### Abit PB6

Noisy as a helicopter, but neat SMP motherboard to run BeOS. There's still [a forum for BP6 fans](https://www.bp6.com/). I recapped it last year and it works again. I might make a Blinkenlights for it someday to spice up the beige case, even if it'll never look as cute as a [BeBox](https://en.wikipedia.org/wiki/BeBox).

And it was much faster at compiling stuff.

### ASUS L4R laptop

I got it when I worked for yellowTAB…

"You make it work, you keep it!"

It had no serial port, so I had to implement [LapLink](https://en.wikipedia.org/wiki/LapLink_cable) debug output in the kernel to find out why it wouldn't start [ZETA](https://en.wikipedia.org/wiki/Magnussoft_ZETA).

Oddly, the kernel log wasn't very helpful. It would just stop at the first disk access. However, pressing a key would get a little further. And again with more key presses.

Turns out I found a bug in the ATI IXP chipset. They answered by mail something like "why are you using the timer in this mode?". Well, because it exists. You see, BeOS used *tickless* way before the Linux devs ever thought about it and gave it a name. Linux now also has a fixup for this chipset btw.

It still works, however I had to re-solder the power jack, at least two times. That's something ThinkPads got right, not having the power connector soldered to the motherboard to limit the solder joint stress.

I also had to clean the keyboard several times, popping out keys, and sliding a tiny piece of paper between the two membranes to remove whatever crap got in. Last time the left ctrl key definitely stopped working.


### Macbook

For two years, I had to use an Apple computer at work, some intel-based Macbook. Hardware was not too bad at the time, but that was before they started gluing things in. But at some point I found a bug a day in the OS. Really. Between the unfinished *Spaces* virtual screen thing locking up for 20 seconds before finishing the animation if you hit the shortcut too many times, to their "industrial protocol" but spec-violating VNC implementation that hung QEMU when connecting to it. I hated it.

Also, I'm usually careful with my hardware, but it made me really afraid of scratches, like a real Mac fanboy…

## Iced-T510

After the macbook I wanted something sturdy. I knew the ThinkPad reputation, I had seen some already, many Haiku devs already brought one at coding sprints, and other people I know had one too. For about a month, I looked for one that could be compatible with Haiku, but I eventually got tired and took one that seemed ok on paper and also had a rebate on some online shop in June 2011.

I should have spent some more time I suppose. Although I do have Haiku partitions on it, I never really used it natively since it didn't have a driver for the ethernet port (it does now), and also… the nvidia card inside has a crappy VESA BIOS which only knows of resolutions like 1024x768. On a FullHD panel it's… painful to use, as it's either overly stretched or thumbnail size. Damn, I paid for the FullHD, not just 1024x768!

Even on Linux I had trouble. For 10 years I've had the nvidia card freezing on me every month or so, and 10 times in a row after a reboot until it settles down. With both the proprietary and opensource drivers, as I switched back and forth when one had too many bugs. And I don't even do gaming or any 3D stuff, just showing windows on screen. That's my number one requirement for my new laptop: no nvidia because it's crap. Their own driver is crap, and well, [Nouveau](https://nouveau.freedesktop.org/) would work better if nvidia just documented their hardware like should be. I should just bill nvidia for all the wasted hours rebooting.

Currently I'm stuck with the 5.7 kernel on it, with the 5.10 it just freezes during the first 5 minutes after boot. And the proprietary driver just doesn't even start anymore, it complains about memory size:

	resource sanity check: requesting [mem 0x000c0000-0x000fffff], which spans more than pnp 00:00 [mem 0x000c8000-0x000cbfff]
	caller _nv000788rm+0xe4/0x1c0 [nvidia] mapping multiple BARs
	NVRM: VM: nv_alloc_contig_pages: failed to DMA-map memory
	NVRM: RmInitAdapter failed! (0x24:0xb:1171)
	NVRM: rm_init_adapter failed for device bearing minor number 0
	NVRM: nvidia_frontend_open: minor 0, module->open() failed, error -5

It still runs after 10 years, modulo the regular freeze of course, but I had to repair it twice myself:

<img src="/files/blog/mmu_man/Lenovo_T510_DSCN5020.jpg" title="Will it desolder without screwing up the board?" alt="The Ethernet PHY quartz with aluminum foil aroind, waiting to be desoldered." width="30%" align="right" />

First repair: Ethernet port stopped working. I spent the week fixing it. First locating the service guide, opening the thing (and finding out there was one screw missing on the drawing), locating the ethernet chips by looking up part numbers (because no schematics…), understanding what could be broken… turns out it was the PHY clock crystal (tip: bridge another quartz of the same frequency in parallel and see if it oscillates), [swapping the part for a good one](https://twitter.com/mmu_man/status/772080539805376512) from a donor board from the computer shop downstairs, trying to solder it with the iron as large as the part itself because I didn't have better at the time… And I didn't have much experience yet with hot air either. All without any help real from Lenovo. Ah yes, they actually liked [the tweet](https://twitter.com/mmu_man/status/769285984265515008) saying "it's working".

Second repair: One week before the [CCCamp 2019](https://events.ccc.de/camp/2019/wiki/Main_Page), the biggest hacker camp in Europe and maybe the world, this thing just stopped working suddenly. It would not <abbr title="Power-On Self-Test">POST</abbr> anymore, just beep and say "Fan error". After taking the disk out so I could work from another machine, I found one single fan that would ship in time to have it before the CCCamp. Likely not a genuine part but at least it could maybe make it in time. It did arrive in time, but it didn't exactly fit (I had to file the plastic a bit), and the connector was the wrong one (4 pins) so I had to replace the plastic part with the one from the old one. And still, it would spin but give me a "Fan error". I ended up finding the schematics this time on a obscure forum to understand what was going on, and managed to get it working by [soldering a potentiometer to the motherboard](https://twitter.com/mmu_man/status/1162145729307131910) to adjust the fan sensor bias voltage to its liking. And it worked. A few times it complained about Fan error but popping the keyboard to fiddle with the potentiometer just works around that.

Still, I spent the week fixing my machine instead of preparing properly for the CCCamp, but at least I made it. Without the schematics I'd probably have spent half the camp trying to fix it blind. Reminds me I need to document those on [repair.wiki](https://repair.wiki/).  Also, reading the schematics reveals the truth: what Lenovo sells as a "ThinkPad T510" is actually a "Kendo-1" from a company called Wistron. More on that later.

Changing the thermal paste along with the fan also improved the CPU temperatures, it never did any emergency stops like it would the year before in summer despite the extra fan outside to pull from it. The fan is noisier than the original one though, I should probably get a proper one someday, but at least it's been working for 2 years now.

<img src="/files/blog/mmu_man/Lenovo_T510_DSCN1444.jpg" title="I wanted to wait for the refund before removing this now completely washed-out Windows7 logo sticker from the T510." alt="Left corner of the T510 palm-rest, with a white sticker that used to have the Windows7 logo." width="30%" align="right" />

By the way, I'm still waiting for a refund on the Windows&nbsp;7 I never asked for. I couldn't actually "refuse" the EULA because well, you only had an "accept" button, so I rebooted and overwrote it. I even have it on video. Someday maybe I can finally remove this sticker?

<br style="clear: both" />

## Lenovo "supports" Linux


Last year [Lenovo announced a Linux certification program](https://news.lenovo.com/pressroom/press-releases/lenovo-brings-linux-certification-to-thinkpad-and-thinkstation-workstation-portfolio-easing-deployment-for-developers-data-scientists/) for all ThinkPad P Series models… I finally get to reply to this.

First, it's called GNU/Linux, and even though it's mostly about the kernel we'll be talking about here (Linux), the GNU part is still relevant to some degree.

In the press release you (Lenovo) talk about "Preloaded OEM version" of Ubuntu LTS, sorry but your [history of preinstalled stuff](https://www.forbes.com/sites/thomasbrewster/2015/02/19/superfish-need-to-know/) on Windows doesn't really entice me to it. Anyway.

The same article says, I quote:

> *While many users prefer to customize their own machines – either on hardware without an OS or by wiping an existing client OS, then configuring and installing Linux – this can raise uncertainty with system stability, restricted performance, compatibility, end-user productivity and even IT support for devices.*

See, it's funny because in the many reasons for this a large part can be attributed to the lack of proper documentation from vendors like you, as I'll explain below.

### Open Source vs Free Software (ethics)

As I said, the operating system is GNU/Linux, Linux being just the kernel, the <abbr title="GNU's Not Unix">GNU</abbr> tools and libraries forming the first layer atop, with many other layers above, for the packaging, graphical interface and desktop environments, each from different projects with their own governance and development practices and ethics.

Each distribution (Ubuntu, Red-Hat, Fedora, Debian…) is basically yet another project aiming to package and provide all this ecosystem to the user with varying degrees of ease of use and consistency.

The lovely people at [Framasoft](https://framasoft.org/en/), a French non-profit proposing <abbr title="Free, Libre Software and Open Source Software">FLOSS</abbr> alternative services to mainstream proprietary solutions, came up with this simple equation to explain why they care more about Free Software than OpenSource:

	Free Software = OpenSource + ethics

While it's a bit rude it's not that much of an approximation. Google or Microsoft "love" OpenSource, they like it because it gets them faster to market or brings them more customers from hype, and yet they despise Free Software, or else they'd publish their core product under a FLOSS licence.

Said another way, [Richard Stallman](https://stallman.org/) (aka RMS, the founder of the GNU Project and Free Software mouvement) explained that "OpenSource" is a technical term, while "Free Software" is a political one.

OpenSource is conceived as a way of producing software that is more efficient, and that's about it.

Free Software meanwhile is the legal embodiment of shocking ideas, like letting users control their machine instead of being controlled by it, or treating everyone equally regardless of them being user or author, and [misinterpreted in stupid memes as communism](https://souravroy.com/2010/01/01/is-open-source-pro-communist/).

RMS liked to explain Free Software with France's official motto: *Liberté, Égalité, Fraternité* (Freedom, Equality, Fraternity).

It's not unrelated to hackers ethics and philosophy, where opening things allows learning how they work in order to control them when most people just relinquish their freedom to closed and proprietary things without question.

While Linus Torvalds admittedly chose for his work the GNU General Public Licence without much ethical consideration, the GNU project on the other hand originates from this philosophy. And some of its users do also care about this.

Also, your press release talks about Fedora as a *"pure open source platform"*. I beg to disagree here: Where is the source code for your UEFI, the Embedded Controller firmware, the one for the WiFi chip, Bluetooth? Ideally all firmwares ought to be OpenSource. How else can we trust them, really? Your history of preinstalled Windows bloatware doesn't inspire trust.

Besides, having the source code for all those is not only about security, also sustainability. Proposals like the [FSFE's upcycling of software](https://fsfe.org/news/2021/news-20211015-01.html) would also ensure hardware stays usable beyond manufacturers' support. Remember, I'm still using my ten years old T510, which was EOLed… when actually, I can't find it on your website? How am I supposed to fix critical security flaws without the source code? I know [the European Court of Justice recently stated](https://www.technologylawdispatch.com/2021/10/in-the-courts/ecj-top-system-ruling-grants-right-to-correct-software-errors/) it was always legal to de-compile code to fix bugs, but still, I have other things to do in life. Reverse-engineering is fun when you're at school, much less when you have real work to do, and when you understand you actually shouldn't need to do it in a sane world.

### On repairability

Last Saturday was [World Repair Day](https://openrepair.org/repair-day/). Funny coincidence.

This year was marked by a real traction on the *Right to repair* idea, thanks to people like [Louis Rossmann](https://twitter.com/fighttorepair), who has been doing board-level repairs for a decade now [and documenting it on his Youtube channel](https://www.youtube.com/channel/UCl2mFZoRqjw_ELax4Yisf6w) for people to enjoy, learn, and think about. He has also been advocating to lawmakers in the US for years, during countless hearings without much political effect as expected, and recently created two non-profits to fight for repair, one to help document repairs, and another one to push for proper laws about it.

A few like me have been preaching in the desert for decades about device repairability, and while it's refreshing and relieving to see all the recent buzz about *Right to repair* thanks to people like Louis Rossmann, the [Electronic Frontier Foundation](https://www.eff.org/) digital rights advocacy organisation, and others like [Linus Sebastian explaining this](https://www.youtube.com/watch?v=nvVafMi0l68) to the 14 million subscribers of his [Linus Tech Tips youtube channel](https://www.youtube.com/channel/UCXuqSBlHAE6Xw-yeJA0Tunw), it's also frustrating to see it took so long for people to realize how much we regressed on this.

My parents' TV set from 40 years ago had the full schematics on an A1-sized sheet folder several times in the last page of the user manual. The record player had it… Some other equipments had schematics directly glued inside the case. It was all normal practice. It was just logical. These gears were expensive and we had to be able to repair them.
And you can still find [schematics for vacuum-tube radios](http://www.nostalgiaair.org/Resources/) around.

Companies have come up with so many excuses through the years to justify making unrepairable devices, not publishing documentation, not proposing replacement parts, and forbidding independent repairs. I'll spare my time and yours by not even attempting to list them, none are valid anyway. [Even the FTC agrees](https://www.youtube.com/watch?v=ZKALUEoRd7E).

I'm not talking about devices being more fragile than before, that's another topic, with reasons ranging from acceptable to completely ridiculous, be it tighter integration, lower production cost, or consciously planed obsolescence to make clients buy newer products. That's a whole other debate, but even an expensive and well designed equipment can be a repair nightmare if it lacks proper documentation and replacement parts. 

I'm not talking either about changing a battery. This is *not* repair: It's maintenance, just like an oil change on a car. Sadly though even doing this on a car now often requires an expensive device to tell the car about it. I'm talking real repair, from just replacing a broken screen to a board-level repair like I did on my T510. Repair is all of this, there is no reason vendors would get to choose which repair they allow on *our* device.

Something French lawmakers sadly disregarded, giving us some "[repairability index](https://www.indicereparabilite.fr/)" where, just like food companies self-note themselves, Apple gives itself [6.2/10 for its iPhone 13 Pro](https://www.indicereparabilite.fr/produit/smartphone-apple-iphone-13-pro/) because they tell how to open the thing, yet don't sell replacement parts and serialized the parts so replacing the camera circuit with another genuine Apple part makes the phone complain and stop working properly [as demonstrated](https://www.youtube.com/watch?v=8s7NmMl_-yg) by youtuber Hugh Jeffreys. This is just insane and insulting the independent repair industry and companies like Fairphone, Framework and others who do what actually ought to be the bare minimum for repairability. Any vendor not offering replacement parts, using tactics to forbid finding replacements (like sanding chip references), and not publishing schematics should *never* be getting anything more than 1/10.

Times change, and as with other markets, many vendors actually delocalize manufacturing and even design. In the case of Lenovo, it seems the T510 motherboard was designed by a company called Wistron. It has been suggested that these companies reusing existing designs for other customers is a reason even companies like Framework can't publish their schematics. Oh, and "trade secrets" to maintain the "competitive advantages", LOL, like if AMD wants to throw an army of engineers to reverse-engineer nvidia's latest chips they will be stopped by missing documentation? No, it will cost them more but they can do it. It's just another security-by-obscurity scheme and it just hurts FLOSS operating system editors who don't have millions to throw at it, just their spare time and pizza. And that's what patents (not software patents, those are an abomination) are for anyway, at least in theory, and this means correctly disclosing (as in, so as to be reproducible by anyone, not just two drawings on a table corner) in exchange for a temporary monopoly on the invention. Oh, and datasheets under NDA, like with [Purism](https://puri.sm/faq/can-i-have-your-motherboard-schematics/) not releasing schematics due to Intel's reference designs… Same here, seriously who cares about NDAs… I'd bet nvidia would use them to hide their hardware bugs 😒
But NDAs, trade secrets, and even subcontracting board design to firms like Wistron is not a reason not to publish the proper documentation of the hardware *you* sell. [As a customer I don't care](https://store.rossmanngroup.com/schematics-or-die-t-shirt.html) what stupid contract you signed with your suppliers. I *bought* the thing, it's mine, and I intend to use and abuse it as I see fit, including repairing it.

I legally do have the right to repair it myself whatever "warranty void" sticker you illegally put on ~~your~~**my** gear (cf. [Magnuson-Moss](https://www.vice.com/en/article/gv5ddm/warranty-void-if-removed-stickers-are-illegal)… nice to see [the FTC finally acting about that](https://www.ftc.gov/news-events/press-releases/2018/04/ftc-staff-warns-companies-it-illegal-condition-warranty-coverage) after 40 years), but what right is it if you make sure I can't exercise it properly by obfuscating stuff, gluing stuff, and hiding documentation that could make it successful? How am I supposed to fix this laptop not powering up if schematics aren't public?

Repairing it also means having whoever I want to do the job. Be it me, myself and I, or Louis Rossmann, or maybe [WeKeys](https://peertube.we-keys.fr/a/wekeysrepair/videos) who is much closer than Louis and also does board-level repairs and videos about it… There is no reason vendors would get to choose who does the repair on *my* device.

### On hackability

I mentioned ownership several times already. Property is a weird thing. Not unlike some other rights though, like privacy and freedom of speech, it has a kind of variable geometry where the more money you have, the more rights you have.

Don't believe me?

I know the US and Europe have different visions on things like free speech and privacy, but still, we have in common that dichotomy of noble general principles on paper and much less really applicable rights in real life.

On paper we all have equal rights to freedom of speech. But some are more equal than others, as would French humorist Coluche say. Companies with millions in advertising budget speak to us through TV, radio, websites or whatever, to tell us anything about their product except facts (and schematics…), to make sure we want to buy them even without a need. On the other hand proponents of right to repair, well, they don't have money, so why should they have the right to tell the world about it?

Privacy, well, when real people get spied upon by whichever agency designated by a 3-letter acronym, corporations happily benefit from trade secrets and other tax havens, and even {Panama, Pandora, You-name-a…} Papers don't seem to change anything about it.

Same happened with property.

It always hurts my feelings seeing French police fearlessly cut into migrants' tents, their sole *property*, and at the same time others worrying about their second or third residence being requisitioned to host homeless people, because, you know, property is a "sacred" right in our Constitution.

> *[Selon que vous serez puissant ou misérable, les jugements de cour vous rendront blanc ou noir.](https://mobile-dictionary.reverso.net/en/french-english/selon+que+vous+serez+puissant+ou+mis%c3%a9rable%2c+les+jugements+de+cour+vous+rendront+blanc+ou+noir)* \
> Jean de la Fontaine (1621-1695)

But I digress.

Companies, "corporation" as they've oddly become designated by law, have become so powerful they reserve for themselves rights that used to belong to people, human people.

They subverted property rights to include and protect more vigorously rights to imaginary things that were coined "intellectual property", and use this to deny real people real property of the devices they bought.

Yet I don't recall ever reading the "Universal Declaration of Enterprise Rights". Or did I miss something? I haven't been to the US lately, did the last President change your Constitution to start with "We the Corporations"?

Corporations wouldn't exists without humans, they wouldn't have a purpose without clients. Maybe they should start accepting the fact that they are here to provide a service to us, not to be using us.

Do I still digress? Oh well… I'm actually right on the spot on hackability since I'm using this digression to hack your brain into accepting my arguments. 😝

So yeah, property. I bought the thing from you. I own it. Not just the right to put it on a shelf to decorate. Plain ownership: *Usus, fructus et abusus*. This means reparing it when it breaks, but also making it do things I want that it wasn't planed or designed for. It's my call.

Just like I happen to use a clothesline to hold not clothes to dry but a Haiku-branded tablecloth to use not on a table but as a backdrop when filming myself during our [Coding Sprint](https://www.haiku-os.org/conference/2021_online_coding_sprint/), there is no reason I should use a laptop just as a laptop, and I should have the documentation to know how it works to understand what else I could possibly do with it.

*If it's really mine, [it should be hackable](http://www.shouldbehackable.org/).*

### On the Microsoft monopoly

[I've explained this already](/blog/mmu_man/2008-11-03_say_what_you_want_from_us_but_not_what_we_dont_want_to_hear_or_how_much_did_we_regress), oh wow, 13 years ago, but Microsoft still has a monopoly on the PC market, and hardware vendors are complicit. I know that might sound crazy nobody fixed that including at the FTC if that were true, but read on, I'll try to explain it again and hopefully it'll make sense to you as well.

It starts right away with the firmware. [He Who Controls the Bootloader](https://birdhouse.org/beos/byte/30-bootloader/) in 2001 still controls it now with SecureBoot.

Back in 2001, Be, Inc. managed to get BeOS pre-installed on one computer model from Hitachi. Just one. On the entire PC market. Microsoft forced Hitachi to drop the bootloader entry to hide BeOS from customers buying it. They enforced their monopoly over the only possible niche BeOS could find on the PC market, crushing Be, Inc. in the process. Please read [the whole story](https://birdhouse.org/beos/byte/30-bootloader/) by Scot Hacker, his last Byte.com column is enlightening.

I'll just re-quote this from the article:

> *What we know for sure is that Microsoft treated the PC hardware platform as if it owned it, and thus hurt consumers, software developers, PC OEMs, OS competitors, and the industry in general. That's a layman's definition of abusing a monopoly.* \
> \- Jean Louis Gassée, July 2000 

Sure they sued Microsoft, and they finally settled, and Microsoft "admitted no wrongdoing". Yeah, you really believe that?

While Haiku itself is more of a pet project, not aiming for even the modest success of the BeOS that inspired it, there were some commercial attempts using it, they failed for various reasons, and you can't help but think Microsoft has at least a tiny part of responsibility in this.
The only working commercial application still around is the [TuneTracker Radio Automation System](http://www.tunetrackersystems.com/), dating back to the BeOS era.

Fast forward 20 years later. Think SecureBoot is about security? It's probably as much about securing Microsoft's own monopoly than your computer.

Yes, you can disable it, at least in theory although some versions of <abbr title="Unified Extensible Firmware Interface">UEFI</abbr> won't let you. Did you try? It's not the most user-friendly process, specially the part asking you for the 4th letter of the password, then the 1st, then the 7th… I had to do it several times on computers running Ubuntu because Ubuntu started enforcing this on drivers, breaking wifi support because the binary driver requires compiling some glue code on the very machine it will be running on, and yet because it can't sign what it just compiled it will refuse to load it.

Supposedly you can upload your own keys to the firmware to sign your own bootloader. I don't know of anyone ever having attempted this, nor do I remember any firmware showing this option anywhere either.

Even the Linux Foundation had to pay Microsoft to get GRUB signed. How are we supposed to get Haiku's bootloader signed without being racketed by them?

I won't even list problems like UEFI forgetting the bootloader entry just installed to instead force Windows back on you when you just had your dual-boot setup done to go through GRUB first. Countless times.

Some people from IRC reading my draft had precisions to add:

	<@puck_> mmu_man: the linux process for secure boot mostly involves getting Microsoft to sign a shim (https://github.com/rhboot/shim-review), which has a secure boot key for the chainloaded bootloader -- the shim also knows how to enroll machine owner keys anyways, even if the BIOS doesn't.
	< nephele[m]> puck_, mmu_man: the key microsoft signs the shim with is the "extended" key, which incidenatally they don't require firmware to ship, they do require the normal key though if you want your fancy label or whatever :)

So: one more step to load Linux due to the shim, and you're not even guaranteed the firmware will accept it since it might just not ship with the key used to sign it. Great. Thanks Microsoft!

So yes, you can install GNU/Linux, but it's far from an easy experience. All thanks to Microsoft. And to the companies writing those buggy firmwares.

Linus Sebastian from *Linus Tech Tips* incidentally decided to switch to Linux and will be doing videos about it. In [a recent one](https://www.youtube.com/watch?v=6AzidWpIny0) he complains about "a vendor who has zero acknowledgement that Linux exists at all". Oh dear, spend 10 years like me using BeOS (or Haiku, or even BSD…) and we'll talk about vendor support.
In a normal world with sane competition vendors would publish hardware specifications instead of Windows drivers, and every OS vendor would just write drivers for their OS, like everyone else but Microsoft does already. Instead we have a monopolistic company which is helped by all hardware vendors who publish ready-to-use drivers for their OS, as well as software editors publishing Windows-only software, and computer manufacturers selling machines with Windows preinstalled without telling buyers about it. They are all complicit of Microsoft on this.

And when you try to escape this walled garden all you get is an OS which might or might not run, with peripherals you have no clue if they will be supported. Yes some hardware brands finally started writing Linux drivers, but:
* sometimes they just don't work or miss features because even if the intention is good there isn't the manpower to do it right, or it's just done for PR and without care for support like nvidia,
* they do it once and let it bit-rot for years without maintaining it so it won't work anyway, and it's only for 32bit x86, and you have to fix it yourself to load on a 64bit kernel. At least sometimes there is partial source code, like for the former-Hitachi Starboard, [which I had to fix for newer and 64bit kernels](https://github.com/mmuman/starboard-lsadrv). But then what if you want to use it on ARM or PowerPC, when all the userland code is x86 binaries without source code? Linux is *not* only about x86. It runs on dozens of platforms, and publishing "Linux" binary-only drivers that only runs on x86 is *not* supporting Linux.
* or vendors retain bad habits from Windows like feature-creep and <abbr title="Not Invented Here">NIH</abbr> syndrome, like some printer maker insisting on installing its own print server in-lieu of <abbr title="Common Unix Printing System">CUPS</abbr>, breaking support for other installed printers on the machine.

So yes, you can use GNU/Linux, but it's far from an easy experience. All thanks to Microsoft. And to the companies writing those Windows-only drivers.

But again, it's not Linux' fault, it's nvidia's and friends. I know people don't care who's fault is it when it doesn't work, it just doesn't work. Still, Windows has such a huge competitive advantage as vendors just write drivers for Microsoft for free…

I never asked for vendors to provide drivers for Linux (or even Haiku, that'd be shouting at the wind), I just want them to f*** document their hardware by publishing the specs and datasheets so every OS vendor (I, in this case) can write drivers and compete in a fair way. Not only Linux. What use do I have of a Linux driver in Haiku? Close to none, specially if it's closed-source.

And even when you by chance find the source code for a Linux driver to study to write a Haiku one, be it from the vendor or someone else, sometimes it's just too cryptic to understand, or buggy, or both. Once I even found 5 different Linux drivers for the same hardware to read from. Now which is right?

I recall seeing [a talk from Lenovo](https://debconf20.debconf.org/talks/67-lenovo-debian/) at [DebConf20](https://debconf20.debconf.org/), and the speaker saying:

> *"We had people asking how we [Lenovo] can support Linux on ARM… It's complicated."*

No it's not:

Just…

publish…

the specs.

Once you admit the hardware and the OS are different products, as was decided clearly in various courts, you must admit that users have the right to use whichever OS they want, and that includes being able to write drivers for it, which means having proper documentation.

Of course, this means the documentation must exist in the first place, but that's your problem if you don't know how the things you sell work. Not mine.

In [another video with Linus](https://www.youtube.com/watch?v=MreyOrYItr4), there's mention of not "expecting regular users to run scripts". Yes it shouldn't be part of the Linux user experience, but then hardware vendors publishing only windows drivers instead of specs shouldn't be part of it either. Some of the times you are required to run odd scripts on Linux it is to work around bad vendor behavior (be it fetching firmware from a windows install exe, or fixing badly packaged drivers when there are some, or downloading data files that you are forbidden by the EULA to publish elsewhere preventing anyone to properly package them for their distro). (Besides, Windows users rarely admit how many times they have to run a `.bat`/`.cmd`/`.reg` or `install.exe` file from a hidden location.)

Oh, sure, Microsoft now "loves" OpenSource, and Linux as well, they even have WSL2 so you can run it inside Windows. Just another twist on their eternal strategy: Embrace, Extend, Extinguish.

Tied sale, or bundle sale, is yet another aspect of the Microsoft monopoly.

I'm getting tired so I'll just copy this paragraph from my previous article:

When you go to your local store, and want to buy a PC, usually you don’t even get asked what you want with it, nor do most people wonder what they want with it. You usually just buy a working “solution”. And that “solution” happens to be a PC, with Windows installed on the disk. Or a Macintosh, with macOS installed as well, even though many other OSes run on the Macintosh as well. Most non-tech-savvy people actually don’t even know what Windows is, let alone an Operating System. They just want something that they can use. But sometimes, what they *need* is not actually what they *get*. Sometimes they would need Linux, or BSD or something else, because it would suit their usage pattern better. But there is no way they can even know about this, because shops are contractually linked to OEMs and Microsoft, and are forbidden to ship with anything else than Windows. The contracts themselves are just secret, so you don’t even know what they tell, and what threats are made to OEMs.

There was one attempt at Linux on mainstream computers, and no I'm not talking about Chromebooks, but way before, with the first [Eee PC](https://en.wikipedia.org/wiki/Asus_Eee_PC), some lightweight sub-notebook. The first model shipped with Linux preinstalled, and it worked well, and most people didn't even realize it wasn't Windows they were using. Windows would be too bloated for it anyway. But Microsoft didn't like this, no. So the next year they released a custom crippled Windows version that would run on it, and forced it onto ASUS.

Computer vendors are complicit of Microsoft on this monopoly. I wonder what to throw at these OEM contracts to get them published, do we need to put Wikileaks on the case?

I believe they have integrated this idea so well that it's became subconscious.

I remember calling the Sony hotline before settling for the T510 to ask how to get a Vaio without Windows, and I recall them saying "No because people prefer Windows". Gee, it's like saying people prefer a blue sky. Very few of them actually tried a green one.

Oh, and I also couldn't resist making a screenshot of Lenovo's configurator website for the T520, where you could choose the operating system between… Windows. Thanks Lenovo! And 63% preferred it. I really wonder what the other 37% preferred though…

<img src="/files/blog/mmu_man/Lenovo_t520_chose_OS_between_Win7Pro.png" title="Of course you have the choice!" alt="Screenshot of the Lenovo configurator website for 2011, proposing the choice of the operating system, between one single entry: Windows 7." />

During tied sale trials, vendor lawyers usually resorted to the car metaphor, saying "it's just like the car radio, it comes with the car, it's just part of it". Same with Windows users when I tried in vain to convince them.

I usually got laughed at explaining that no, it's more like, you buy a car, but the merchant forces you to hire the driver along with it. It's more logical because an OS is a service (like the driver who provides the service of routing and conducting you somewhere, using the car).
Until I learned a judge in Aix-en-Provence explained the exact same thing in a case. Maybe I'm not that stupid after all. 🤔

Tied sale is equivalent to forcing all corn plants in the world to be from Monsanto. Just like biodiversity is essential for resilience of ecosystems, techno-diversity also helps when malware spread. It also helps foster new ideas so mainstream OS vendors can steal from them, or reinvent them a 3rd time, like *tickless* on Linux.

And yet, even militant non-profits like [AFUL](https://aful.org/), the French association behind the [Racketiciels initiative](https://non.aux.racketiciels.info/), don't even demand that every PC be shipped bare without any OS. All they ask for is the "optionality" of the OS, asking people if they need and want it or not when making the sale. Is that already too much to beg for? Just a "None" radio button on the configurator website, and if you choose Windows you get the license number sent by mail or whatever to activate the pre-installed Windows copy. It's exactly what is done for the Office Suite: It comes pre-installed, but you get to pay for the licence number if you want to use it. It would even simplify the production line, less stickers to put on. This would still give Microsoft an unfair advantage, but that's all they ask for, when they could argue and demand a strict neutrality with no pre-installation at all. But even this is too much for Microsoft to grant.

Note tied sale is not only about Windows. It also happens on Macintosh which ship with macOS. Of course, people buying Macs usually do this also for the OS, because unlike me they find it easy to use. But still, some do buy Macs to run Linux because they like the hardware, and why should they be prevented from doing so because Apple doesn't release specifications to allow writing drivers?

You could say that this Microsoft monopoly didn't prevent Linux from becoming usable.

Fact is, many Linux drivers were written from reverse engineering, *despite* all this, and with countless hours wasted doing so. While it allowed us to use Linux on more hardware, it also hides this monopoly by making it appear as there was at least some real competition going on.

And the same happens with applications. How many niche or mainstream applications exist that are Windows-only? Some happen to have a macOS version, but rare are those daring to publish Linux binaries. Even rarer are those with proper packaging for them. (No, I'm not counting Snap or Flatpak as proper packaging.)

All of this makes a reinforcing feedback loop where hardware vendors don't care about Linux support because nobody uses it because no mainstream applications exist because no hardware vendor support it because nobody uses it because no mainstream applications exist because no hardware vendor support it because nobody uses it because

	Stack Overflow Error.

<img src="/files/blog/mmu_man/XBill.png" title="XBill, the computer nerd version of whack-a-mole." alt="The game shows various computers with their own operating system logo, and clones of Bill Gates trying to reach them to install Windows instead." width="50%" align="right" />

In [her memorandum to FTC staff and commissionners](https://www.ftc.gov/system/files/documents/public_statements/1596664/agency_priorities_memo_from_chair_lina_m_khan_9-22-21.pdf), the new chair Lina Khan talks about how *"targeting and rectifying root causes \[of bad business behavior\] can avoid a whack-a-mole approach"* to regulation. I'm glad someone finally comes to it, although I'd have probably mentioned [XBill](http://www.xbill.org/) instead, which is actually a good simulation of us FLOSS advocates trying to outplace the Microsoft monopoly for 3 decades.

I hope this text brings some more hindsight and incentive for her to install XBill…, ugh, no, well, make it so we don't ever again have to play XBill for real.

### On mobile phones

Just as a reminder, this long complaint is not solely about regular computers, or even computers. Mobile phones, "smartphones" as they are incorrectly named (hopefully the user is smart, but the hardware rarely is), really are general purpose computers, and should be treated as such.

This means we also should be able to choose which OS we want to use on whichever hardware we want to buy, which is a much more daunting tasks than on PCs.

"But you can't phone without an OS on it…" Yeah, and you can't phone without a carrier SIM inside either, and yet you can buy them without.

It really is a computer. Just a bad one, lacking a real keyboard and screen estate, but a real computer.

Sadly the level of documentation for this kind of hardware is just abysmal. <abbr title="System on a Chip">SoC</abbr> and other chip vendors just don't care about documentation, nor do the phone makers. Also their architecture is based on fixed arbitrary device addresses in memory, instead of discoverable busses like PCI, where you can enumerate devices on them, and load drivers accordingly. Here you must know that the temperature sensor is at location xxxx, and of model yyyy, but it's different on this newer revision of the very same telephone. There are solutions to this like <abbr title="Flattened Device Tree">FDT</abbr>s, but they still make it harder to generate a single OS distribution image that would run on all phones of even a single brand, whereas a PC Linux distro can run on most PCs from Dell to HP or ASUS.
Projects like [Replicant](https://www.replicant.us/) which tries to fix Android to not use proprietary apps and drivers barely supports a dozen phone models due to this.

And the Google monopoly with Android doesn't help either.

The same goes for all the rest, "smart"-watches, connected fridges and hearing implants, all should be documented, repairable and hackable.

### On responsibility

Vacuum tube radios of the last century had mains voltage inside, even more for CRT TV sets, with much less insulation than we're now required to have. And yet they were easy to open, and came with schematics, and it didn't cause an epidemy of [Darwin Awards](https://darwinawards.com/).

Vacuum tube radios of the last century also had fragile parts inside made of glass, same for CRT TV sets. And yet they were easy to open, and people with the skill-set could try and repair them.

Many vendors claim people must not open "their" thing because they can damage it by doing so, or it could be dangerous to them. Indeed, opening something without knowing about the booby traps vendors placed inside for various reasons (sometimes cost, or performance, but also sometimes just to piss people off) definitely is hazardous.

<abbr  title="I Am Not A Lawyer">IANAL</abbr>, but on the contrary, while there might be intrinsic danger sometimes, I believe vendors not documenting properly actually makes it more dangerous than it should be, by not warning people of possible problems when they attempt it anyway, as they are entitled to as we already discussed.

Now about software…

Writing drivers for Linux (or Haiku, or any other OS actually) is hard, even more when the specs aren't available, as has been the case for two decades at least. Although some vendors have progressed on that. Well, except nvidia, of course.

This has several consequences.

First, we waste time. Because we first have to reconstruct the specs by reverse-engineering the Windows driver, or poking the hardware until it does something. By the time we actually have a mostly working driver we just lost the motivation to finish it. And we probably didn't find the detail we would need anyway because we don't have proper documentation. Then of course people complain that "Linux doesn't work with my printer" or whatever. But whose fault is it? Oh, and who do I send the bill for all those wasted hours trying to figure out what should just be documented? All that time could have been spent on writing yet another driver, or some killer-app that would be much needed.

Second, we take risks. Well, we actually make users take risks, as most FLOSS licenses usually have an all-caps warranty dismissing clause anyway. It's like a Russian roulette. When I write a driver from reverse-engineered specs and it blows up something because I didn't know that you must do X or Y before doing Z because there's no public documentation, is it my fault, or the hardware vendor not documenting his hardware properly? Sadly we can't [call the tech support and shout Shibboleet](https://xkcd.com/806/).

And you take risks too. When you sell "certified" ThinkPads with Linux, do you understand you are actually certifying that this machine will run correctly with drivers written by people who had to *guess* how the hardware should be used because vendors like *you* didn't properly document it in the first place? Isn't this mind-boggling?

You could say the same about repairs. Whose fault is it when you mix up screws and destroy the front of your device because you put the long screw in the wrong place? If there's a service guide and it's publicly and easily available, sure, my fault. But if you didn't tell me, how am I even supposed to know?

This is one point where I disagree with Louis Rossmann. Vendors have a responsibility in documenting their hardware to ensure safe repairs. Also, when Louis says he doesn't care if batteries are glued or not, I do. Because even if he will find a way to remove it, this causes more time waste finding ways to do it, and also actually doing it. Time is money, and making sure technicians waste time trying to fix stuff ensures repairs aren't economically viable, which ends up with people not even trying to repair something because it would cost them too much, and instead buying new gear. Glue on batteries or in Surface tablets are not only about production costs, but also about making things time-consuming enough for repairs to not be interesting versus buying new. Same for working out the circuit without schematics when troubleshooting a <abbr title="Printed Circuit Board">PCB</abbr>, all that time has to be billed when you do it as a professional, making it less attractive to people already inclined to rather buying a new item.

Again, most vendors are still way below Lenovo in terms of service guide availability, even though you sometimes need to ask Google to find it because your own website can't. But schematics, where are they?

With all that said, do you still really support Linux?

I'm not even daring to ask about official Haiku support from Lenovo, that'd be extravagant. Funny, but extravagant. And you can't expect a company to support the more than 60 existing Operating Systems beyond the three you know about. What I expect is to properly support your own hardware by documenting it.

<br style="clear: both" />

## WTF541

To replace my aging T510, well, rather have something with more than 8GB of RAM to run other stuff besides just Firefox, I wanted some second-hand recent model without nvidia, which is quite hard to find these days.
I originally looked at T15, but I was told there were lots of returns on the first generation. I was proposed a W541 which was said to be rock solid and without any return. It had an nvidia card but with "optimus" so supposedly it could be just ignored, at least I thought so.

When it finally arrived, I was too tired and sick to install it so I just made sure it powered up but then it took dust for two months. Also because I wanted to make a clean install and not just clone my decade-old GNU/Linux and I had so many options to think about. And then last month I finally managed to have a start. I installed Debian Bullseye and started by migrating my Thunderbird and Firefox profiles. And… nothing else since. Three weeks I've been sleeping even worse than usual because I can't figure what to do with this thing.

The first week I found at least one problem a day. It felt like when I had a Mac again, but this time on the hardware.
The second week I just dragged myself trying to start writing this out, procrastinating. I mean, I had it all in my head, it just didn't want to get out. And now I feel I'll spend the night writing this. Took me more than a week to finish it.

So, which problems? Well, I don't know where to start.

### The case

That's really the least of my concern, but since I paid more than 1k€ for this and it was sold for 2.5k€ new, I believe I have the right to be picky.

<img src="/files/blog/mmu_man/Lenovo_W541_DSCN1424.jpg" title="It probably wouldn't show up in black." alt="Some homogeneity issue on the palm-rest, next to the F8 key." width="30%" align="right" />

The color. What is it? Is that supposed to be grey? Under some lights it looks more like… *vert caca d'oie* as we say in French, goose-poo green.

This V-shaped mark in the plastic due to some turbulence during the plastic injection or something alike… If you don't know how to mold plastic, at least use a color that won't show it, like, I don't know, black.

<img src="/files/blog/mmu_man/Lenovo_W541_DSCN1426.jpg" title="Quite sharp this side of the palm-rest." alt="Right side of the palm rest, with bits of plastic protruding due to the injection process." width="30%" align="left" />

And the palm rest could use some deburring on the side, it feels like it wants to slice my fingers when I touch it.

It's a ThinkPad, dammit, not an ASUS!

At least the corners are still real corners, not 2cm radius roooooound thingies like on the Edge series.
<br style="clear: both" />

### The screen

<img src="/files/blog/mmu_man/Lenovo_W541_DSCN1417.jpg" title="It's bleeding from the left as well." alt="The screen bezel doesn't stick on the left and leaves a view into the backlight." width="30%" align="right" /><img src="/files/blog/mmu_man/Lenovo_W541_DSCN1421.jpg" title="It's bleeding from the bottom." alt="Halos of backlights near the screen hinges." width="30%" align="right" />

The LCD. Ok, 3k was a bad idea, I hate not seeing individual pixels and my eyes are getting older so I had to force it to FullHD resolution. Not the biggest problem though. The backlight… Tis bleeding! From the bottom and on the left bezel which is raised like 1mm from the panel. All that to make it 4mm thinner?

It's a ThinkPad, dammit, not a Macbook!

Oh, and the brightness control just doesn't work. At least it didn't until I actually finished installing and rebooted into Xorg. Not working at POST, not working on the Linux console, and certainly not working in Haiku either. I suppose it must go through the nvidia crap instead of just being handled by ACPI like should be. I thought optimus would at least allow me to not touch the nvidia part, but eh, it still wants to annoy me regardless.

And of course, it's missing the latch on the lid because, yeah, nobody wants this, right?

Oh, and the lid close detection switch is replaced by a reed switch, and a magnet which on mine seems to be missing from the base, so it doesn't know when it's closed and doesn't suspend. On the other hand, waving my phone around the webcam makes it think it's closed… Wouldn't happen with a proper switch. Really, I thought kids were forbidden from playing with magnets.

Update: Indeed, [the magnet is missing from the keyboard bezel](https://twitter.com/mmu_man/status/1449443801332846595). I guess it didn't even wait for the end of the assembly line to jump out of this miserably cheap plastic. And the clips on the bezel all look like they won't survive another teardown.


### The key⎙⃣ ␛⃣board

Oh, that keyboard. I didn't notice issues at first because it came with the german layout. But trying to use it…

PrintScreen. Seriously? On the modifier row?? I can't understand how any sane mind would put this key between AltGr and Ctrl. Removing the Menu key itself I wouldn't care much (although some people with disabilities might actually have a use for it if they can't use the mouse buttons, and some Linux users re-purpose it as a Hyper modifier key), though currently Haiku uses it to get the Leaf Menu (I think we should just use the Win key like other OSes though for that). It's also impossible to single-handedly do a Win-Shift-PrintScreen to do a rectangular capture, which I do a lot. I mean a lot. Yes, I mean it.

How can you justify such placement? It's even there on 7k€ machines. Oddly the 600€ non-thinkpad Lenovo machines seem to have a proper PrintScreen key at the intended location. Go figure.

There's a reason these keys exist in the first place, and it's not to piss off your designers. And there's a reason they are still on keyboards: people keep using them. For other stuff maybe, but they do. Ok, ScrollLock I don't use much except on the external keyboard for the KVM, and Pause, actually pause is still useful at POST when you want to read something before it disappears.

This one alone wouldn't be much of a problem, I could remap it at various levels in the OS. The more worrying ones are not even labeled anywhere, and you have to dig the user guide (well, what claims to be a user guide but misses important things like hardware specs and schematics) to find out where they are:

    Fn+B: Break
    Fn+K: ScrollLock
    Fn+P: Pause
    Fn+S: SysRq

Wait, are you suggesting SyrRq is not even AltGr+PrintScreen?? So, tell me then, how on Earth do I [SysRq+s then SysRq+b](https://en.wikipedia.org/wiki/Magic_SysRq_key) when Linux freezes then? I've been doing this for a decade when the nvidia card screws up on the T510, even if the chip in this one leaves me alone, surely at some point I will need it. Just how?

You pretend to support Linux, you even *certify* it, and yet your hardware is physically incapable of supporting this Linux feature that could save my data from a catastrophic kernel bug (no, a journaling filesystem alone won't always save your data).

Ohhhh… Function keys… oh my. My only fear before getting it was to have an always-on LED due to having to force Fn-Lock to get proper function keys by default, but oddly there's a BIOS setting to swap the Fn-Lock state that leaves the LED off by default. The real problem is elsewhere.

THEYAREJUST TOODAMNSMALL ANDTOOCROWDED. 🤦

Really. Not only are they much smaller (more than 1mm less each on the width, 5mm less for the group of 4, and 1mm less on the other direction), the spacing between the groups is also smaller, and Escape is fused into the first group, making it even harder to look up by touch.

<img src="/files/blog/mmu_man/Lenovo_function_key_size.jpg" title="ThinkPad function keys width comparison" alt="T510 on the left, W541 on the right, both have a digital caliper mesuring the first four function keys width." />

I kinda understand why you wanted to stick to a single line for the function keys for the look. But even design is not about the look, it's about the feel, baby. I want to feel the keys and recognize them instantly, not have to look at them thinking they are beautifully lined up or wasting 3 seconds searching for the correct one with a finger.

It's a ThinkPad, dammit, not a Macbook!

Maybe you don't use them often. I do. I do use them. A lot. Not only for Alt-F4. I used BeOS for 10 years, I can't live without at least 8 virtual desktops. And BeOS uses Alt-Fx to switch them instantly, not with "oh let's waste time browsing through them all before finding the good one" shortcuts, not with useless "let's ask the GPU to make some slow sliding effect" waste of time like on macOS. On GNU/Linux I painfully used Ctrl-Alt-Up/Down to move through them in GNOME, before switching to KDE and one day noticing I could use Ctrl-Fx. What a relief!

But I just can't do that properly on this keyboard. I regularly miss the key I want because they're just too small. Because they aren't intended to be used. No wonder it's called a "Precision keyboard" with such small targets. Looking at the T15p version, they are even smaller due to backspace being narrower. Look, if you don't want us to use them, just remove them altogether, at least that'd be more obvious.

And then there's those 4 completely useless keys on top of the numpad. Calculator… 😒 Oh, worse, I just noticed those four are even larger than the function keys… 🤬

Sure, I do have an external keyboard, but I don't fancy bringing my Model M in the backpack everywhere I go.

### The rest…

LEDs. Where are the LEDs!?? They've all gone missing: battery, WiFi, Bluetooth, HDD… even Capslock.

<img src="/files/blog/mmu_man/Lenovo_T510_DSCN1416.jpg" title="T510: Yeah, Much more useful than a glowing red dot." alt="Yeah, Much more useful than a glowing red dot. Close-up of the battery and sleep LEDs, the battery one is yellow meaning it's low." width="30%" align="left" />

Long ago, I was a bit jealous of models with the glowing red dot on the logo. Not anymore. As an indicator it's pointless and I'd trade it for proper LEDs in a heartbeat. It only tells if it's on, off or sleeping. Want to know if it's on mains? Plug it out then back in and wait to see if it blinks 3 times. Even for sleep, you have to wait at least one second to make sure it's not solid on. Is it charging? Is the battery empty? No idea. The T510 has two separate LEDs for that, for a reason. Yes, they are way brighter (maybe a bit too much) and you have to cover them with a book when you want to sleep in a hotel room, but at least you know exactly and immediately what it's doing.

No hardware switch for the WiFi either. So you can't reach with the finger to feel if it's on or off, you have to look at the LED… Wait, oh right, there's no LED for that. It's not like it has any significant draw on the battery that you'd want to immediately notice you forgot to cut it, right?

Disk activity LED… who cares, it doesn't spin anymore anyway. I do. I want to know if that lag is due to it thrashing the SSD or if it's something else. I want to know if it's still accessing the disk anyway after doing a SysRq+s when I'm about to do a SysRq+b to limit the risk. Oh wait, right, you can't do that anyway. 🤷

Capslock? Numlock? Just guess. The stock KDE install here has a Capslock indicator in the tray, but nothing for Numlock. Not the most important ones, but still… And some people do need to work on the text console, where you don't have a system tray to show anyway…

I know you want to simplify things but, as much as the T510 felt like a space ship deck, this one feels like a push scooter without even a handlebar. I like space ships, and I like being at the bridge, as the captain, ready to say "Engage!".

It's a ThinkPad, dammit, not a Macbook!

The clickpad, ugh, first thing I did was to go enable click-on-tap in the KDE settings, and it works not too bad, even with two-fingers as right click. Still, sometimes I push it more and it starts to depress and click, interrupting my current move and making the experience quite unpleasant. At least the version I have does have proper buttons for the Trackpoint. But I'm used to the buttons under the touchpad… so much so that the left one on my T510 got so tired it just stopped working.

Again, it's not supposed to be a Macbook.

The "always-on" USB port doesn't seems to like its name, as when plugging my phone in it powers it on, then off, then on again. But maybe it's just Linux acting up (or probably a bad ACPI table), don't know, I erased Windows anyway. I could try in Haiku I suppose.


### The Dock

Unlike the unit, the dock is supposedly brand new. And yet it makes a horrible noise for five seconds in the audio amplifier when powered up until it registers there's a jack plugged in. It's painful when you still haven't got your morning coffee. It seems to be mitigated by passing it through the KVM I just bought (and fixed, too small jack had bad solder joints), it now just gives a "pop" when registering the jack, but it's still a defect. I couldn't find any report of it online, but I've heard from people who also had this issue. And the seller I got it from told me it's "normal". Making an awful noise for 5 seconds on startup is now considered normal. I really have a hard time believing this.

And why a combo jack on the dock? What if you want to only plug a mic in?

Also, at one point I raised the laptop a little and it just lost the external screen, probably some bad contact. And… it just did it again. And the ethernet as well. The T510 that I've been using for ten years on its dock has no such issue. I can pull it up by the front, or lift it completely, and it just stays connected. I even had them both on a reclining laptop stand with all the cables dangling behind for years, no problem.

The corner block is still in the middle of the fan exhaust, but then it's been this way for as long as I remember anyway, and it actually seems to block less of it than with the T510.

### What works?

Some things do work, they better do considering how much I paid for.

The large battery protruding at the back does make a good place to hold it, and at least it's still removable without a screwdriver as should be on any laptop.

The microphones at the top of the screen seem to get less noise from the internals than when they are under the LCD panel as on the T510.

Despite the crappy plastic outside, the chassis feels sturdy enough, but I can't believe I have to write this about a ThinkPad.

The chiclet keyboard, well, apart from the brain-dead layout, typing text on it doesn't feel bad at all, and I could probably get used to it, if the other keys were in a sane location. But that won't happen any time soon.


## So what?

I heard people saying quality was going down on ThinkPads, but I thought I could still find some usable model, turns out it's not an easy task. I really wonder, did people get used to mediocrity? If I want a low grade laptop, I'll get 300€ crap, not 1000€ crap. I can't afford it. My computer is not only my main working tool, it's also an extension of my own brain, and I'm emotionally attached to it, so it better work reliably.

So now, I have like, three options:
- spend months to try and fix all those, like reverse-engineer the EC firmware to put SysRq in a sane location, but then, where, since I can't just physically fix the key spacing anyway, unless I design my own keyboard, and I don't have the time nor motivation (where are the schematics, mechanical design and pinout documentation for the keyboard? And the source code for the Embedded Controller so it can be patched??);
- throw it out the window, but I don't have the budget for that;
- find a way to send it back for a refund, or sell it and loose money, and find a usable machine, which means before chiclet but with at least 32GB of RAM… but candidates are scarce, possibly by swapping the chiclet keyboard with the previous model one [like done on T530](https://www.thinkwiki.org/wiki/Install_Classic_Keyboard_on_xx30_Series_ThinkPads). But that also means [living with old firmware](https://github.com/hamishcoleman/thinkpad-ec) and [known CVEs](https://nvd.nist.gov/vuln/detail/CVE-2019-6171).

Sadly, as much as I like projects like the [Mntmn Reform](https://mntmn.com/media/reform_md/2020-05-08-the-much-more-personal-computer.html) fully opensource hardware laptop or the [Framework](https://frame.work/) Macbook Air-like laptop that's so easy to replace parts in and even ships with the only screwdriver required for all screws inside, or the [Pinebook Pro which provides full schematics](https://wiki.pine64.org/wiki/Pinebook_Pro), they don't really fit my needs anyway.

Update: It's going back to where it comes from. It was weird erasing the disk, and putting it in a box, It felt like coming home from a month trip to the jungle…

Sorry Lenovo, but you've lost your Mojo.
