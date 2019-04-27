+++
type = "article"
title = "Writing The Driver"
date = "2019-04-27T11:02:03.000Z"
tags = []
+++

<h3>6 - Writing The Video Driver</h3>

<p>When writing a video driver, a number of issues are important:
-A plan is required to indicate the order in which the components can be constructed;
-There must be possibilities for testing the driver; And
-The driver must be constructed in such a way that its stability is ensured as well as possible.

This chapter will deal with these issues. The information given here is an important tool in actually building a video driver.</p>

<a name="6.1"></a>
<h4>6.1 Steps in Planning</h4>

<p>The writing of the video driver is described in the following in logical, testable steps. However, a decision must be taken to prepare before it can commence.</p>

<a name="6.1.1"></a>
<h5>6.1.1 Preparation</h5>

<p>How is the driver tested? Two methods are conceivable.
-With two video cards: The system can be equipped with two video cards of which one copy is used to work on a pre-existing driver, while the other is used to build and test the new driver, or:
-With one video card: One card can be used and the ' upcoming ' driver for it while this driver is under development.

Two video cards.
In the first case, a test program is required which will load the new accelerant directly in, so that the functions can be tested each while BeOS does not arrive. If the driver is sufficiently advanced to be able to display_modes it, the other card can be removed from the system so that BeOS can show the Desktop via the new driver and card. The final steps of the driver development can then be done in the same way as by using the method below.

To be able to work with two cards, a trick is needed: In the system BIOS the card for which the driver is going to be written must be set as the primary card. If this is not possible (there are only PCI cards present), the choice for a primary card can be forced by scrolling with the ' Insteek'volgorde of the cards in the PCI slots in the system.

The primary card is the card on which the system start is displayed (it is initialized by the system via the card BIOS): The secondary card remains disabled.

Besides the trick there is a condition that the existing driver for the NU secondary card must meet: This driver must be able to start the card ' cold '. This means that the card must be fully initialized: Among other things, the memory type must be set together with the refresh and the Clocksignaal before. Unfortunately, few BeOS drivers meet this condition. As far as known only the Matrox cards are started completely cold. This applies to both the Be drivers and the openBeOS Matrox driver (G100-G550 cards).

There is another condition: at least one of the cards must not use ISA resources. In The ISA standard there is no space for two cards to be placed. When this happens, conflicts will occur because both cards are placed on the same I/O addresses.

One video card.
In the latter case it is possible to write a driver in a testable way on a system in which no two cards can be installed, as is the case in a laptop. It is very pleasant to have at least VBE2 support for the card exists.  If this is not the case, everything up to the mode Setup must be written ' blind ' because it cannot be tested (can of course be logged). After that, the driver can be used successfully as it is further developed.

The process of writing the driver is described in this document for a card for which VBE2 support is present. Therefore, no test program is used to load the accelerant directly. VBE can set the map on request for us on a predefined fixed enhanced mode. This will actually put the card at the level of step 11 (enabled enhanced mode) of the roadmap for writing a video driver described below. This action plan also derives its effect. Additionally, this explains why the VBE mode setting can be removed once step 11 has been successfully completed.

<b>VBE</b>
VBE support exists in two ways. Usually the support is completely in the BIOS of the card. In older cards, this is not always (entirely) so and a DOS TSR must be loaded to obtain support. If this is necessary, BeOS must be loaded via DOS. This is possible by default with the Personal Edition version of BeOS R5: R5PE. This version of BeOS is installed by default in a single file as a Windows98 (or Linux) application. In This file there is a full virtual harddisk with BeOS.
By now starting ' bare ' to a DOS prompt (so without Windows98 active), such DOS TSR can be loaded. After this it can be restarted to BeOS via the folder in which BeOS is installed. To do this, the file loadbeos.com must be started.

Also, a version of BeOS installed in its own partition can be started in this way. Only the files loadbeos.com (the loader) and Zbeos (the kernel) are needed in the DOS partition.

A VBE TSR must be involved with the video card manufacturer because it depends on the TSR card.</p>

<a name="6.1.2"></a>
<h5>6.1.2 Step 1: Activate VBE2 (VESA mode)</h5>

<p>
Via the application VesaAccepted to Bits, or directly via the ' VESA ' settings file in the directory/boot/home/config/settings/kernel/it is possible to set a display mode for use in BeOS without a video driver for a card to the disposal To have. In the presence of a valid VESA settings file, BeOS will attempt to invoke the VBE2 hook of the video card BIOS before enabling protected mode of the CPU (VBE2 is written for realmode use as is the case in DOS). 
After this way the requested mode (for example 800x600 pixels in 8bit color depth) is set, switched to protected mode and BeOS is activated. The display mode can no longer be changed, so a system restart is required: Realmode programs do not work in protected mode. To obtain the optimal speed with scrolling in source files and the like, it is recommended to work in 8bit color depth: 16bit Color depth For example means that the CPU has to move twice as much data for image-related functions than that With 8bit is the case.

If when starting the App_server (which takes care of loading a video driver and displaying the desktop on it) now a video driver is found which supports the present card, then this driver is loaded and used. Activating the VBE mode was therefore redundant and was in fact undone. The VBE mode is then overwritten by the driver.

If no driver is found, then a VBE mode is active and we have a neat color screen without acceleration, hard cursor and overlay. It is now possible to work reasonably well on the system.

An overview of the starting method of BeOS is included as a picture in Chapter 3. This is a good way to recognize how, for example, the VBE support is performed by BeOS.

If a driver is written for an already supported card, if it is good the driver will soon be installed in the add-ONS directory structure (see Chapter 3.1: Interface to the OS) so that the new driver automatically takes precedence over the existing Driver.

Alternatively, the existing driver can be removed so it certainly won't load. This is not necessary unless this driver is causing problems. The new driver will automatically use the slightly previously started VBE2 mode.</p>

<a name="6.1.3"></a>
<h5>6.1.3 Step 2: Do not install active driver</h5>

<p>Now it's time to find a suitable open source candidate driver that we will copy and modify for the new proprietary driver. Selection criteria are, for example, finding a driver with a programming style that fits the programmer of the new driver, and for example whether the supported map of the source driver is similar to the card where the new driver is going to be used in terms of Specifications and way of steering. Questions that may be asked include:
-Is ISA I/O space access needed or not from the accelerant?
-Does PCI configuration space need access from the accelerant?
-Support the new-and the source driver TVout and/or DualHead modes?

When a choice for a source driver is made, the copy can be made. In the code of the copy accelerant, all registry controls are now disabled so that only the high-level code remains operational. This is the code that runs the interface to the Driverhooks.
The copy kerneldriver updates the card's recognition and folders to support the current card. Any registry programming other than intended for the map's folders is disabled. Consider activating ColorMode at the standard VGA registers for example: The ISA addressing depends partly on this (e.g. the CRTC index: on ISA I/O address 0x03b4 in black and white mode, 0x03d4 in ColorMode).

Now the new driver can be installed. If everything went well, a reboot will load the new driver and accelerant while the VBE mode remains active: nothing will be overwritten.

Only the frame buffer access is now actually made available to BeOS by the driver and accelerant. BeOS will build the Desktop at the indicated address within the frame buffer. If this is the RAM offset address $0, the screen output probably works properly because the VBE mode probably uses the same address for display on the screen.

In any case, this step is intended to allow this frame buffer to access and not disrupt the VBE mode. It is also very useful to build log functions to a file in the accelerant for testing purposes. For example, simply Omonstotelijk can be proven that the accelerant is actually active: otherwise, it will not be logged.</p>

<a name="6.1.4"></a>
<h5>6.1.4 Stap 3: Hardware cursor building/h5>

<p>When hardware cursor support is first built in, the next step can be tested with it. 

Once the cursorhooks are exported by the driver, the app_server will use it. This means that if the hard cursor doesn't work yet, no cursor is shown on the screen. However, with a little effort and some ' rest doctor ' it can be worked. 

To begin with, the cursor enable/disable registry could be programmed. If the foreground and background colour registers are also filled with white and black, you will probably see a cursorbitmap somewhere on the screen. The bitmap will be random, but visible.

If now the position of the cursor is programmed, so the X and Y coordinate where it is on the screen can be worked again: the random bitmap can now be moved over the screen.

As the last basic function, the bitmap provided by the App_server should be programmed correctly in memory. This may require some patience, because the implementation of map to map may be quite different:
-	Sometimes normal video card memory is used, but sometimes also ' dedicated ' memory can be accessed in a separate place via a number of registers.
-	For example, the reference point of the cursorbitmap can be left-up or right-below.
-	The cursor works with four ' colors ', in two bits per pixel. The colors are (in BeOS) white, black, geinverteerd and translucent. Therefore, a single byte of memory fits four pixels. From map to card, the order of storing these pixels differs. Sometimes they are placed consecutively from left-top to right-bottom. Sometimes it also follows the ' bit 1 plane ' data for all pixels, and then the ' bit 0 plane ' data (or vice versa).

For example, when normal video card memory is used for the Cursorbitmap, this bitmap can be placed on the first memory address that exists on the card. Because in the previous step the space for the desktop has already been placed there, the App_server will overwrite the first part of the Desktop. This is a useful tool to note that the cursor data is indeed placed in the expected place.

In addition, this is also a tool for testing the next step: If that step works, this malfunction no longer exists: the Desktop can then be placed in memory after the Cursorbitmap.

The cursorbitmap is usually 64 at 64 pixels large in the cards. BeOS uses only 16 by 16 pixels: The rest must be set to ' transparent '. The 64 at 64 pixels à two bits per piece take a total of 1024 bytes of memory. If the Cursorhardware only supports a single pixel per byte of memory (also occurs), then 4096 bytes for the cursor data should be reserved. After this, the Desktop space can be placed in the map.

The cursor itself must be tested for disturbances occurring during movement. If so, the programming of the coordinate registers must be synchronized to the vertical retrace. More information about this can be found in the description of the accelerant function MOVE_CURSOR.</p>

<a name="6.1.5"></a>
<h5>6.1.5 Step 4: Set Frame buffer start address/h5>

<p>The lowest few bits of the start address are often not saved. This means that there is a minimum step size (granularity) for putting this start address. This is important for the next step.

After the relevant CRTC registers have been programmed, any failure caused by the hard cursor (see the previous step) should have disappeared.

When a display mode is set on the screen with a height greater than the visible part of it, it can be tested whether the start address setting is working properly. When the cursor is moved down the screen, the screen follows the cursor by putting this start address. 

Make sure all the bits of the start address work by scrolling down to the highest possible virtual screen as far as possible. This can be set via BScreen. Setmode (). Make sure that the width and other properties of the screen remain unchanged.

Also, check for short-term failures when moving the screen. If this is the case, setting the start address must be synchronized with the vertical retrace. A timeout has to be built in here: The start address is also set during a SetMode command. However, there are no vertical retraces at that time!</p>

<a name="6.1.6"></a>
<h5>6.1.6 Step 5: Set Frame buffer pitch</h5>

<p>The CRTC pitch (offset) registers set the distance between two ' lines ' of the screen. If this is programmed, a virtual screen can be set with a larger width than the visible screen. The main test here is to see if the screen output is as expected. If a programming error is created, the screen is ":" The second line is not right under the first line, and so on.

Note that in the MOVE_DISPLAY and MOVE_CURSOR functions the step size for moving the screen is set correctly, derived from the previous step. The step size is given in pixels, while the previous step yielded byte information: The step size is therefore dependent on the set color depth.

It can now be tested by moving the cursor or the part outside the visible screen is also OK. At the top right, for example, the BeOS menu is normal. Also can now be looked at whether the step size of moving the screen is as expected.</p>

<a name="6.1.7"></a>
<h5>6.1.7 Step 6: Set color depth</h5>

<p>The next step is to set the ColorDepth registry in the video card. This registry determines the color depth and attaches the number of clock cycles needed to extract the required data for a pixel from memory. For example, a 32 bit mode requires four times as much data as for an 8 bit mode.

Now, the BeOS Screen preferences Panel can be used to test whether this feature works as well. When a different color depth is chosen than the one with which it was booted (i.e. VBE2 mode), the pixels on the screen should be the same width. If pixels narrower (the screen repeats itself) or wider (also only a part of the screen to see), then the function does not work.

The colors shown will probably be wrong: this is normal and will be corrected in the next step. For example, the screen might contain incorrect colors with the correct brightness, or only have dark, lighter, or only black and white colors. Possibly it can be tested with a different color depth in the VBE mode so that the colour palette is set differently.</p>

<a name="6.1.8"></a>
<h5>6.1.8 Step 7: Colour palette Setup</h5>

<p>Setting the CRTC palette RAM is now the turn. In 8 bit color depth The palette is set by the App_server via SET_INDEXED_COLORS. The description of this accelerant function is accompanied by a comprehensive explanation of how to perform it in the driver.

The function is tested with the BeOS Screen preferences Panel. When a different color depth is set, the screen will continue to look fine. The BeOS Backgrounds Preferences program is a useful tool that allows the content of the palette RAM to be viewed in a graphical way. Test all color depths to make sure that the palette RAM program does not contain any errors.</p>

<a name="6.1.9"></a>
<h5>6.1.9 Step 8: DPMS Installation</h5>

<p>Now you need to turn the monitor on and off. This function is important as soon as we start (RE) program the monitor timing, or change the pixelclock. While the timing in the video card is programmed, the monitor must be turned off to prevent any damage to it. Moreover, otherwise possibly temporary failures are visible on the screen and that is not very neat.

The ' Display Power Management System ' is nothing but switching the Hsync and Vsync signals sent to the monitor. The monitor uses the presence or absence of these signals as an indication of the ' depth of sleep ' to be set. Both signals present means that image must be given, while the monitor is brought into the deepest sleep mode by the absence of both signals. There are also two intermediate sleep modes: only Hsync present and only Vsync present.

Internally in the driver, another third signal is used next to the Vsync and Hsync. This third signal enables and disables the timing generation in the card. This is done by using the ' screen off ' bit in the sequencer ' clocking mode ' register on index 1, as it does according to the VGA standard. Sometimes a combination is made with the sequencer ' synchronous reset ' condition (index 0).

When a card does not support the switching of the synchronisation signals, the internal ' third ' signal is still required in order to be able to safely execute a mode switch.

DPMS can be tested via the BeOS Screensaver preference application. Set the asset time for the screensaver as short as possible (30 seconds). Disabling the monitor is best chosen slightly later, for example, after one minute. When a monitor is used with full DPMS support, you can simply wait for the monitor to turn off after one minute to control the operation of power management more or less. Which of the three sleep modes is actually chosen after one minute can usually not be controlled via the monitor unless for example the color of the power LED indicates the sleep depth.

Watching the accelerant on a remote computer through a Telnet session and the tail command on a logfile can be useful. See chapter 6.2.2 For more details on this.</p>

<a name="6.1.10"></a>
<h5>6.1.10 Step 9: Set up Refresh rate</h5>

<p>Detailed information about the limitations of the pixelclock speed and thus the refreshates that are supported is given in the explanation of the accelerant function GET_PIXEL_CLOCK_LIMITS.

In addition to the information given there, there are still a number of points to be considered. These points relate to the internal functioning of a PLL:
-The VCO has a minimum and a maximum achievable frequency. A VCO in a card may impose additional restrictions on the PLL programming: not all scale factors are possible. An example of this can be found in the Matrox maps and the openBeOS Matrox driver;
-The comparator also has minimum and maximum frequency restrictions for both inputs. This can also provide additional restrictions for programming the PLL. An example of this can be found in the Chips and Technologies chipsets, for example the C &T 69000;
-On some maps, a feedback filter should be chosen depending on a chosen VCO frequency. It may be that such a filter is intended for a fixed frequency range such as on Matrox G100-G400 cards, but it may also be that the manufacturer cannot guarantee that a certain range is reached. In the latter case, experimental must choose a filter that works on that one card instance accidentally. The operation of a filter can be controlled using the ' lock ' information of the PLL. Matrox G450 and G550 maps work for example with this principle: see for example the openBeOS Matrox driver.

Explanation of the theory behind the PLL is beyond the scope of this document. Information about this can be found in books that describe high frequency electronics for transmitter technology and in various graphic chip documentation, but then focus on the relevant chip (some features are missing or are fixed in Some maps). See the Chips & Technologies CT69000 documentation for an example.

Testing the operation of the PLL can be controlled by the PLL-lock bit in a register if the map to be operated makes this information available. Another important tool is the computer monitor. In addition to the monitor settings, the OSD can also be used to retrieve information about the control. The RefreshRate (the vertical verversfrequentie) and the horizontal verversfrequentie are usually available.

The refreshrate which is indicated does not have to be accurate because the CRTC timing is not yet programmed. The actual active CRTC timing (from the card's BIOS, activated via the VBE2 mode) may differ from the timing that the driver assumes as being active.  The CRTC timing is taken in the next step.

A refreshrate can now be selected Via the BeOS Screen preferences Panel. Control takes place via the OSD of the monitor. Take the time to test different settings. Failures in unrespected boundaries are visible through vibrating image, no image, missing pixels in the image, very wrong refreshrates and the like.

Note:
Beware of internal LCD displays of laptops and the like! These can only be used at 60Hz. Refreshrate tests should take place via an external monitor.</p>

<a name="6.1.11"></a>
<h5>6.1.11 Step 10: Set Monitor timing</h5>

<p>The next item is to set the CRTC timings registers. These registers determine the size of the visible part of the (virtual) screen on the monitor, and the length and relative location of the synchronisation pulses and the ' blanking ' pulses. The total of all times must also be programmed: this is the gross timing which, together with the Pixelclock, determines the refreshrate. (The visible part of the screen could be perceived as the net timing.)

The CRTC registers are usually still in the standard VGA way built in the card (with some extensions). Sometimes they even have to be approached by ISA I/O space. Examples include the C&T 65554 (the later chips are fully accessible via PCI space) and all NeoMagic Magicgraph and Magic Media chips. 

When programming this type of CRTC implementations, two original standard VGA ' locks ' are likely to be opened. CRTC registers on index 0 through 7 are protected via index $11 (Vsync_end), while the Vsync signals are protected via index 3 (Hblank_end). Note that this looks like there is a visieuze circle because the registers seem to secure each other. For Neomagic cards, the registers on index 0-7 can be released first, followed by the Vsync registers. 

For example, with Nvidia TNT and later maps it is possible to access the CRTC registers via ISA, but also via PCI space. While the registry and bit formats are identical via both access roads, the locks are different here! This example has been worked out in the sources of BeTVOut.
After the CRTC programming is included in the driver, it can be tested. For this, various resolutions can be set via the BeOS Screen preferences Panel. On the monitor then see if the case works. Also check the RefreshRate for various resolutions: errors in the refreshrate indicate errors in CRTC (or PLL) programming. A disabled screen may also be the result of CRTC programming errors. PLL programming errors will never be very large, as the PLL programming has already been tested at the previous step.</p>

<a name="6.1.12"></a>
<h5>6.1.12 Step 11: Enable enhanced Mode</h5>

<p>This is the step in which we will remove the VBE2 mode which is still active under the driver. At the moment, the VBE2 mode is only used to change the map of an old-fashioned standard VGA mode (less than 256 colors with up to approximately 640x480 resolution) to the ' Enhanced modes ' (modes with 256 colors-8 bit-or more in at least 640x480 resolution) used with BeOS.

Enhanced modes generally have the sole disposal of the graphics hardware cursor (which is described in this document), the acceleration engine and hardware overlay. The enhanced modes are by definition graphical modes, not textmodes.

The way of switching depends on the specific card. For example, with Matrox they call the enhanced modes ' MGA mode ' or ' PowerGraphics ' mode.

To make the switch must be sure that the ' enhanced ' electronics is switched on. TVout chips, for example, are often supplied separately from power via a configuration register in the graphics chip. Also, some ' standard VGA ' registers should be programmed such as some sequencer registers related to ' clocking modes '.

Testing this step works in portions. First, it can be tested if the switched programming does not disrupt the proper operation of the driver with activated VBE2 mode. If that goes well there may still be something missing, but (probably) nothing is done wrong at least.
After this, the VBE2 mode can be removed and the driver will be checked to function properly. As usual, the image on the monitor can provide useful information (hints) as well.

Note:
If this step is successfully completed, we complete the basic driver! Methods for developing a driver that are not based in the VBE2 way can still be used in this step-by-step plan. The following steps can in principle be done in any order. However, the order listed here seems to be the most logical.</p>

<a name="6.1.13"></a>
<h5>6.1.13 Step 12: Build in acceleration</h5>

<p>First of all, it is best to set up the SCREEN_TO_SCREEN_BLIT because it provides the most visible acceleration of all 2D acceleration functions. For errors, failures are visible when moving windows and scrolling/panning in Windows (' dropping ', ' degrading ' content of the window).

A good second candidate is the FILL_RECTANGLE hook which is used for creating background colors in Windows and on the Desktop. Errors here show malfunctions for example, screen changes (background error)

INVERT_RECTANGLE and FILL_SPAN can now be set up. These functions are used just like the first two by the app_server, only less often.

The last two functions SCREEN_TO_SCREEN_TRANSPARANT_BLIT and SCREEN_TO_SCREEN_SCALED_FILTERED_BLIT are not used by the app_server and are therefore only fun as an extra. They can only be used by applications via BWindowScreen or via the direct loading of the accelerant. The last mentioned function is unlikely to be implemented on 2D only maps because this function basically uses (part of) the 3D texture engine.

It is important to take a lot of time to be sure that all relevant registers are programmed, otherwise problems may occur on some card/motherboard combinations For example (' Random ' errors).
Furthermore, restrictions on acceleration may differ from the CRTC restrictions. For example the frame buffer pitch. This specific issue can be solved through fashion slopes: More information about this problem is described in the accelerant function INIT_ACCELERANT.

Testing accelerant functions runs through working with BeOS and looking carefully at the screen. The image errors can give hints to the underlying problem. It is useful to build the acceleration functions one by one and export the corresponding hooks one by one.</p>

<a name="6.1.14"></a>
<h5>6.1.14 Stap 13: Hardware overlay building</h5>

<p>When the card that the driver is written for has a hardware overlay unit, also called Backend Scaler (BES), support for this hardware can be built into the driver. This feature is important for playback of animated image video such as MPEG1, MPEG2 Vcds and Dvds. Not only can it suffice with a much slower CPU when overlay is used, also the image quality is much better. Software output dropt or usually copies pixels when it needs to be scaled down, while the overlay unit can typically interpolate neatly. Note that the driver supports at least three overlay bitmaps: This is required for double-buffered video playback.

First, the best unscaled output can be programmed. Colorkeying can probably be turned off on the card so that the ' gross ' output is visible on the screen. The video display is now determined only by the OutputWindow coordinates specified by the hardware. 

Disabled colorkeying is an important tool in debug and testing the output on the correct operation. For example, when the window in which the video is played is dragged from the visible screen with the mouse, the contents of the window will also leave the screen. However, this should not be done at overlay output: it should remain partially visible on the screen. For Matrox cards, for example, a block of at least two by two pixels must always exist. When Colorkeying is deployed, these pixels are automatically suppressed. Also switching to other workspaces in BeOS goes well, because the Colorkey on the other workspaces is not depicted.

It is important to test correctly whether the overlay code is in order. When the scaling of the video is built in, a good test for example is the following:
Scale the OutputWindow to 50% or 150%. Then drag this window along all sides of the screen, while half of the OutputWindow remains outside the screen. Pause the image and make sure that the entire part of the video window is shown, and whether the positioning is correct. 

Via logging can be viewed whether the clipping (cutting off) of the output works properly. On Matrox maps, no video can be displayed outside the visible part of the screen: this sometimes generates inadmissible high load on the card, which can be expressed among other things in malfunctions in the Desktop or video display. There are bandwidth problems that cause the required data for the active functions to not be reached in time from the Video RAM.

For example, when rounding errors in the video scaling, one pixel-wide fault streaks may appear along the right or bottom of the video when it is in full focus: at least when left-above the reference point in the map. Test This by scaling the window by dragging the mouse.

When the overlay Functonaliteit works properly, filtering and colorkeying can be activated last.

Note that the code for CONFIGURE_OVERLAY must be fast because it is executed at a double buffered OVERLAY up to 30 times per second. For overlay hardware that is only accessible via ISA I/O space, therefore, programming the registers must be done in the kernel driver at one time because of the slow context switch! This situation applies, for example, to the NeoMagic MagicGraph and Magic Media cards.

More information about hardware overlay can be found elsewhere in this document, for example in chapter 4.1.16: the hardware overlay functions.</p>

<a name="6.1.15"></a>
<h5>6.1.15 Step 14: Build cold start of the map</h5>

<p>If the specifications of the card are well known, perhaps a cold start of the card can be set up. This makes working with the card as a secondary card in a system possible. Also, this often speeds up the operation of the card because chip-core and RAM velocities in ' enhanced mode ' are often higher than in the old-fashioned standard VGA modes in which the card is placed on primary use during the system start by its VGA BIOS.

Testing of secondary use of the card can be by using a test application which loads and tests the accelerant. Alternatively, the ' trick ' with two video cards from the preparatory step for writing drivers can be used. This time we consider our driver and card as usable for secondary use, so we need a different, ' unsupported ' card for the system boot view.

In this way our driver will load our card (try) to start cold.  While the boot screen remains on the primary display, the BeOS Desktop will appear on the test driver provided the cold start is working properly. 

Problems with, for example, the hard cursor, acceleration and overlay can be solved. This requires good documentation of the card, or a lot of patience.
Display mode problems (so no picture at all) are trickier: A test program can be more convenient in this case. </p>

<a name="6.2"></a>
<h4>6.2 Testing with the driver</h4>

In addition to looking closely at the driver-produced image and the timing produced via the OSD on the monitor, logging actions that are done in the driver can greatly simplify the debug when writing the driver. The reading of just programmed registers can be useful, for example, to see if the registers are writable: for example, think of the CRTC locks.</p>

<a name="6.2.1"></a>
<h5>6.2.1 Kernel driver</h5>

<p>The kerneldriver can be used in the BeOS-implemented function dprintf (). The output of this function can be sent by the system to a serial port if "debugging" is enabled.

Enabling debugging can be in several ways. For example, during the system start, debugging can be enabled via a menu. The output of the kerneldriver is then sent to COM1 along with the output of all other system components. A terminal program can be used to examine these notifications on a second system.

A second method for enabling debugging is via the ' kernel ' configuration file in BeOS in the directory/boot/home/config/settings/kernel/. Specifies whether debugging must be enabled or disabled, and to which port the information should be sent. Candidates are COM1 and COM2.

Debugging can also be enabled and disabled in the driver's code via the BeOS function set_dprintf_enabled (bool). In this way, information from the driver can also be sent out. In principle, a dprintf () command is always accompanied by the disabling of debugging. It is important to ensure that the logging is eliminated if this method is used. During normal use, logging is undesirable because of, for example, the delay it generates.

Note:
Unfortunately it seems that this form of debugging when using a VBE gives fashion problems in BeOS. It occurs that use of dprintf () produces a hanging system when such a mode is active. The dprintf () output itself is then even lost. When unexpected problems with this form of debugging occur in the driver, it may be useful to exclude this problem by keeping debugging disabled. Perhaps it would be better to choose another method, such as creating a file in which log messages are placed. This (for Kerneldrivers alternative) method is described below.</p>

<a name="6.2.2"></a>
<h5>6.2.2 Accelerant</h5>

<p>In the accelerant, information can be written to a file (in a kerneldriver also by the way). For example, a accelerant can create its own logfile and always provide a new line of text using a macro if it is the reason.

When the user opens a terminal session and runs a tail command on the logfile, each new line is displayed directly on the screen. This can also be done with a remote computer through a Telnet session. Using <alt>and the cursor keys can be scrolled through the output.

Tail should be started as follows:
Tail – f logfile. txt
LogFile. txt is the name of the logfile. In this example, the tail command is given in the directory where the logfile is located.

In the accelerant It is better not to be logged via the Kerneldriver! The context switch between users pace and kernelspace should be avoided as much as possible because of its inertia.

In order not to slow the accelerant too much during normal use, it is useful if the logging is switchable. Especially for hardware overlay This is important because the associated accelerant function CONFIGURE_OVERLAY in double buffered overlay is executed up to 30 times per second. The cursor functions are also performed very frequently!
</p>

<a name="6.3"></a>
<h4>6.3 Stability</h4>

<p>Because the kernel driver in an error can cause the entire system to crash and the accelerant in an error can cause the App_server to crash, it is important to work accurately. Whatever happens, the user of the computer should not be able to crash the driver.

This means that the driver needs to be meticulously written. Work step by step: solve one problem before starting the next. Add function to driver function and test extensively. Sometimes it may be necessary to somewhat slow down programming actions because the card needs time to perform some things. Always make sure there is sufficient margin between the supposed worst case scenario and the programmed speed: at least a factor of two. Even programming speficicaties provided by card manufacturers contain incompleteness and errors!

Variables that are provided to the driver by an application via the App_server or should be checked directly before being used. For example, it is quite possible that an application tries to set up hardware overlay, but accidentally gives a NULL pointer or pointer to a wrong (non-overlay) bitmap when calling the CONFIGURE_OVERLAY hook in the accelerant (via BView.SetViewOverlay()).
If no check occurs on this type of error, sooner or later an application will cause the entire system to go flat via the new driver. If the driver was in control, the user would be confronted with a neat error message regarding the application and the application would then be closed.

It is also important to ensure that portions in the driver that are not interrupted by itself or by other functions in the driver are protected via semaphores (critical sections). A command sent over an I2C bus for example should never be interrupted for another command. The first must be awaited: This bus must be free before a new message is sent.

When waiting for information from the card, a register should not be constantly queried. A short waiting time must always be built between the repeated (in a loop) query of a registry. If this is not done, a very high peak load of the AGP or PCI bus can cause the operation of other cards or system components to be delayed or disrupted in principle. Waiting should be done passively so that no costly CPU time is lost: Use Snooze () instead of spin ().
</p>

<a name="6.4"></a>
<h4>6.4 Conclusion</h4>

<p>Using the roadmap presented here for writing a video driver coupled with log functionality can very well be set up a driver. The roadmap has been fully tested: It has also been established.

The information from the preparatory ' step ' comes from the BeTVout time (Nvidia) when, among other, the first tests with two video cards were done in the computer. The openBeOS NeoMagic video driver is set up and tested in a period of two weeks (full-time) to step 11 (Enable enhanced mode). This has happened simultaneously with the writing of this document. The later steps of the plan have already been performed extensively with the openBeOS Matrox driver.

In the projects mentioned, information gathered from the Linux world played an important role. The information concerned in all cases outdated programming specifications for the used video cards.</p>
