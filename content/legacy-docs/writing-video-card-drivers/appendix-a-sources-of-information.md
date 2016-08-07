+++
type = "article"
title = "Appendix A: Sources Of Information"
date = "2010-05-26T02:31:27.000Z"
tags = []
+++

<h3>Appendix A - Sources Of Information</h3>

<p>The information that is needed to develop the driver is in most cases not fully available from the manufacturer.  There are however a lot of alternative sources of information available. </p>

<p>Possible sources are:

<ul>
    <li>The manufacturer.</li>
    <li>Linux (or freeBSD).</li>
    <li>The internet.</li>
    <li>Testing the card to get more specifications.</li>
    <li>Last but not least, reverse engineering.</li>
</ul></p>


<p>In this Supplement we dig some more in these possible sources.</p>


<a name="a.1"></a>
<h4>A.1 - The Manufacturer</h4>

<p>For a lot of graphics cards that do not have proper 3D support, including chipsets built on motherboards, there are specs available from the manufacturer. Manufacturers such as Matrox and ATI are known to partly support new developers with information. This information is restricted in use, and you are not allowed to share it: You first have to register as developer and you have to sign an agreement, called the 'non-disclosure agreement', otherwise known as an NDA. There are however a lot of manufacturers that do not want to share information or help in any way independent developers. </p>

<p>Most of the time the documentation is incomplete, due to the fact of competition and parts like Video-In/Out is mostly left out probably because of the film industry. Short timeline of the manufacturers makes it difficult to put together and publish well documented information. Sometimes there is internal information that may or can not been given to a certain group of developers. </p>

<p>Faults in the documentation happen from time to time.  It is possible to use the documentation from different generations that are more or less alike as it can be helpful to you in getting a better look at the various errors that crop up, and trak down a solution that works. </p>

<p>In some cases where not all information is available, you have to look for alternative sources. </p>


<a name="a.2"></a>
<h4>A.2 - Linux</h4>

<p>The problem of missing information is well known to open source operating systems such as Linux. There are a lot more developers on these system than there are on BeOS. </p>

<p>For BeOS developer this is a useful situation, because a lot of information can be found in these Linux sources. The graphics card drivers that can be used for information to develop a BeOS driver can mostly be found in the XFree86 sources. Text-mode drivers and alternative graphics drivers can sometimes be found in the Linux kernel sources too. </p>

<p>The XFree86 driver sources are a beautiful and useful source of information. The video drivers are reasonable structured and build in to different files. Mostly there are seperate files for standard driver functions (initialization and mode setup), acceleration and hardware overlay. When a card is completely based on standard VGA, a vga_hardware submodule is loaded by the Linux driver and used to execute the functions. If this is the case than you can use a book about the old 'standard' VGA cards. </p>

<p>Something that is implemented the same way as the standard VGA on Linux is the use of DDC channels. To make this possible, a submodule gets loaded to do the work. This is something BeOS could use (learn): a standard VGA and DDC support library would give the developer a lot less work. </p>

<p>If you don't want to make use of DDC in the driver for BeOS (probably not), you can let this part of the Linux driver be. </p>

<p>When a Linux driver exists for the graphics card you want to develop a BeOS driver for, you can use this Linux driver to get the programming specifications for this card. With this information you can write a 'standard' BeOS that isn't necessary linked or has to be published under the GNU license.</p>

<p>Completely porting a Linux driver to a BeOS driver is not the best way to go, the difference between the two systems are just too big.</p>

<p>It is worth to contact the developer of the Linux driver if he/she is known. The authors are mostly happy and willing to share information about their findings, even if this information can be found within the driver itself. This way it is possible to get the do and don'ts and why something is used the way it is. It could proof to be a very good aid for the right interpretation. It is even more fun if you come to a point where you can give some additional information back.  Two persons know and find out more than one.</p>


<a name="a.3"></a>
<h4>A.3 - The Internet</h4>

<p>A search query using an internet search engine (eg google, yahoo, webcrawler) to find some more information about the graphics card is always a good idea to start with. It wouldn't be the first time that the wanted information comes from an unexpected hangout.  It could very well be that there is somebody working on the same problem as you out there. </p>

<p>Besides the 'normal' graphics drivers there are also specific drivers/applications for special parts/features from the graphics card. For example the specific TVout solutions for Nvidia cards. BeTVout (for BeOS) and TVtool (for Windows) are good examples. These drivers work parallel with the normal graphics driver on the same card and share the same functions. </p>

<p>Drivers that are in a begin (alpha/beta) state can sometimes been tracked down with a searchengine too. These sort of Linux drivers  are almost  yet to make it in to the source-tree. </p>

<p>It is also possible that there is official information available, but not at the expected source. A manufacturer can go broke or can be taken over by another company. (Eg. Chips &amp; Technologies have to be looked for at Asiliant Technologies.) </p>


<a name="a.4"></a>
<h4>A.4 - Testing For Specifications</h4>

<p>When no specifications are available for the card and you  work with a Linux driver as a source for the specs, the best you can do is to verify to what extent the assumed specifications in the Linux driver are correct. </p>

<p>Drivers written for Linux have, as it happens, frequently the inclination to assume that the user is technically grounded and knows what he/she does. For example, range-checking  in Linux is not always applied.  Also limiting driver settings for the maximum specifications by the card isn't always implemented. </p>

<p>This setting is probably very well on Linux because of the more technical background the user group has for that the OS, but this isn't the case for BeOS. BeOS should be able to be used by everyone without specific technical knowledge. The OS should try to make these settings transparent to the user and keep it as much as possible free from errors. </p>

<p><b>Example: CRTC startaddress</b><br />
When, for example, a register must be checked on its bit length so that the correct range-checking in the driver can be applied, the best is to test this bit by bit. THE CRTC start address can be checked, very simply, by a so small as possible, but as high as  possible virtual screen. When the lowest colorspace is set, it is possible to check to what extent the bits of the startaddress are received by the graphics card, just by moving the cursor down. With this setting, the CRTC start address at the bottom of the screen is set as high possible and therefore the most bits are used. </p>

<p>If, unexpected, the contents of the screen jumps back to the upper part of the virtual screen during the scrolling down of the screen, the number of available bits in the CRTC start address register is exceeded. </p>

<p>If this is detected (and it is not caused by a programming error), setting up a virtual screen can be limited to the range of these 'variables' by using the accelerant function PROPOSE_DISPLAY_MODE. </p>

<p>Maybe it sounds illogical that the memory on the graphics card can not be used in full for showing a display, but nevertheless, in practice, this type of limitation is quite common! </p>

<p><b>Example: The PLL.</b><br />
Another example of a good part from the graphics card to test is the VCO used in the divers PLLs where the RAM, core and DAC (pixelclock) speeds are set. If so, these PLLs have a 'lock' indication bit exposable to the driver. </p>

<p>If this is the case, it should be possible to get the upper and lower limit for the range of the VCO, through a frequency sweep via a test version of the driver. If these tests point out that not all of the possible frequencies work, it should be possible to limit these settings in the driver. </p>

<p>Because the manufacturer is not able to give all of the graphics cards the same specification, it would be better to test multiple cards. You take the setting of the card that performs worst, and then distract an additional 5 to 10 percent. If you build in these new setting your driver should be rather safe. This way it is possible to prevent some of the graphic cards from showing artifacts with the higher/lower refresh rates. </p>

<p>The execution of the VCO sweeps gave the Matrox driver a better visual quality, as the specs for these parts of the graphics cards where not all released to developers. </p>


<a name="a.5"></a>
<h4>A.5 - Reverse Engineering</h4>

<p>Reverse engineering is retrieving the source code of a programm when only the binary version of the code is available. The source code can then be used to get the specifications of the card in question. </p>

<p>Reverse engineering is frequently entitled as prohibited. But when, for example, the aim of reverse engineering concerns obtaining compatibility of a video card with a new OS, this could very well be legal. This becomes clear from section 1201 (f) entitled 'Reverse engineering' of the American DMCA (Digital millennium copyright act) from the United States Code of  the U.S. House of Representatives. The interpretation of the rules differs often, so watch out! Also the rules differ from country to country. </p>

<p>The most important candidates for reverse engineering are graphics card BIOS and Windows drivers. </p>

<p><b>Graphics card BIOS</b><br />
The graphics card BIOS is mostly rather small. Only the very basic functions for the graphics card can be retrieved this way.</p>

<p>These are the principles that are described in the steps 4 (set up the framebuffer start address) to 11 (switch the enhanced mode on) from the 'stepping-plan' in this document. Sometimes it is possible to find the basic functions for the TVout in the BIOS. </p>

<p>The cold start of the graphics card is always built-in the BIOS too: this is step 14 from the 'stepping-plan'. The cold start is very card-type specific. An identical card that has for example slower memory, does already have a different start procedure: the RAM speed has to be set different. </p>

<p>When a cold start in a driver has to be set on information from the card BIOS, the best is to search for a pointer in a fixed place in the BIOS that points to a 'struct' in the BIOS, where at last the specifications for the cold start for the card are mentioned. This way it is possible to make an universal cold start for all cards that are supported by the driver. Matrox cards have this system of registration built-in the BIOS: the drivers makes good use of it. </p>

<p>The most advanced functions such as the hardware cursor, acceleration and hardware overlay are not in the BIOS, so it is not possible to get these functions from the BIOS. </p>

<blockquote><strong><i>Remark:</i></strong> The VBE functions up to version 2 are written for realmode execution. This means that these functions can not be called from a protected mode driver (as in BeOS). In BeOS, the BIOS can only be used at run-time to get the specifications of the cold start of the graphics card. The cold start has to be executed through the driver itself..
</blockquote>

<p>VBE2 has a protected mode hook, but is implemented very badly and is seldom used. </p>

<p>VBE version 3 (and higher) implements a good protected mode execution. So, a BeOS driver can make use of a VBE3 hook in the BIOS if present. A cold start for the graphics card is however not yet implemented in VBE3. Only display_modes can be set at run-time by the BIOS from VBE3 or higher. </p>


<p><b>Windows drivers</b><br />
It is possible to get all specifications/aspects needed for a BeOS driver in the windows driver, and more ... Besides the information about the basic functions that are available in the graphics card BIOS, it is also possible to find more information about the more advanced functions as the hardware cursor, acceleration and hardware overlay. </p>


<p>Information about the process of reverse engineering falls out of the scope for this document.</p>
