+++
type = "article"
title = "Flags"
date = "2019-04-27T12:35:33.000Z"
tags = []
+++

<a name="5.0"></a>
<h3>5 - Flags</h3>

<p><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
  <tr>
    <td width="60%" valign="top" align="center"><img src="/files/images/writing-video-card-drivers/5.flags.png" alt="Flags Chart"></td>

<p>A flag is basically a single tray. This tray has two states: TRUE or false. Flags can be given a command, or a status is indicated. The flags in BeOS are passed through 32bits words so that 32 flags can be passed.

There are several types of flags for video drivers. They have all in common that they are useful for applications from within the API. A subdivision of the types of flags can be created:

-There are flags that are passed on to the accelerant;

-There are also flags that are not passed on to the accelerant. These are flags that tell the App_server how to deal with the accelerant.

Flags that are passed on to the accelerant consist of two types:

-Status flags only indicate a state in the accelerant;

-command flags are used to pass a command to the accelerant. In addition, they sometimes indicate the status of the execution of the command.

A number of flags are passed in a single direction (direction accelerant: command, from accelerant: status), while others are basically passed in both directions (command with the status of the command, or only status information: the ' Command ' is then ignored).

Last but not least, there are some special Flaggen:

-Command flags for the accelerant in the API, but also used by the app_server itself;

-Status flags that are in the accelerant for the API but also influence the behavior of a class or the app_server (directly).

When this particular situation is in force, this is indicated in the detailed description of the flag in question. This is not indicated In the table below. 

Overview of video driver related Flags in BeOS
Name of the flag place in the API C S P A

<b>For overlay use:</b>	
<ul><li>B_BITMAP_WILL_OVERLAY	BBitmap: constructie	+		+	</li>
<li>B_BITMAP_RESERVE_OVERLAY_CHANNEL	BBitmap: constructie	+		+	</li>
<li>B_OVERLAY_TRANSFER_CHANNEL	BView: SetViewOverlay()	+			+ </li>
<li>B_OVERLAY_MIRROR	BView: SetViewOverlay()	+			+ </li>
<li>B_OVERLAY_FILTER_HORIZONTAL	BView: SetViewOverlay()	+			+ </li>
<li>B_OVERLAY_FILTER_VERTICAL	BView: SetViewOverlay()	+			+  </li>
</ul>					

<b>For mode setup: </b>					
<ul>B_SUPPORTS_OVERLAYS	BScreen: struct display_mode.flags 		+		+</li>
<li>B_HARDWARE_CURSOR	BScreen: struct display_mode.flags		+		+</li>
<li>B_IO_FB_NA	BScreen: struct display_mode.flags		+		+</li>
<li>B_PARALLEL_ACCESS	BScreen: struct display_mode.flags		+		+</li>
<li>B_8_BIT_DAC	BScreen: struct display_mode.flags		+		+</li>
<li>B_DPMS	BScreen: struct display_mode.flags		+		+</li>
<li>B_SCROLL	BScreen: struct display_mode.flags		+		+</li>
<li>B_BLANK_PEDESTAL	BScreen: struct display_mode.timing.flags	+	+		+</li>
<li>B_TIMING_INTERLACED	BScreen: struct display_mode.timing.flags	+	+		+</li>
<li>B_SYNC_ON_GREEN	BScreen: struct display_mode.timing.flags	+	+		+</li>
<li>B_POSITIVE_HSYNC	BScreen: struct display_mode.timing.flags	+	+		+</li>
<li>B_POSITIVE_VSYNC	BScreen: struct display_mode.timing.flags	+	+		+</li>
</ul>

<b>Legend</b>
<ul>
Name: the name as defined in the BeOS header files
Place: The name of the class and function
C: command: From API to App_server or accelerant
S: Status: From accelerant to API
P: The App_server is target
A: The accelerant is source or purpose
</ul>
</p>

<a name="5.1"></a>
</h4>5.1 Flags for overlay use</h4>

<p>This section discusses the flags that are directly relevant to the operation of hardware overlay in BeOS. These flags are only passed ' direction ' accelerant: they cannot be read.</p>

<a name="5.1.1"></a>
<h5>5.1.1 B_BITMAP_WILL_OVERLAY</h5>

<p>In the construction of a bitmap, this flag is provided to ensure that the corresponding bitmap is created in the video card's memory instead of in the computer's normal working memory. Putting this flag makes sure that the system does not create a bitmap itself, but instead asks the Videodriver's accelerant to create the bitmap. This is done via the Allocate_overlay_buffer hook. 

The accelerant determines according to:
-The still available memory in the video card;
-The specified colors pace for which the bitmap should be created, and
-The size of the bitmap in pixels

Whether the bitmap can be created. Therefore, if the accelerant to the conclusion that the bitmap cannot be created, the structure of the bitmap will fail.

Specifying the B_BITMAP_WILL_OVERLAY flag automatically sets the B_BITMAP_IS_OFFSCREEN flag as well. An overlay bitmap is by definition ' offscreen ': placed outside the field of vision in the video card memory.</p>

<a name="5.1.1"></a>
<h5>5.1.2 B_BITMAP_RESERVE_OVERLAY_CHANNEL</h5>

<p>This flag is special because it is not passed on to the accelerant, but is used to the behavior of
 Influence the App_server relative to the accelerant.

When an application wants to use hardware overlay, there are basically two options:
-One makes the required bitmaps, with reserves the overlay channel (the hardware so), and one displays the bitmaps;
-One reserves the overlay channel, one makes the required bitmaps, and one displays them.

The first option is performed by creating the bitmaps without using the B_BITMAP_RESERVE_OVERLAY_CHANNEL flag. When now via BView. SetViewOverlay () One of these bitmaps is shown with the B_OVERLAY_TRANSFER_CHANNEL flag in the function call, ' under the hood ' the App_server will automatically ensure that the OVERLAY channel is reserved.

The second option is to create the first bitmap with the B_BITMAP_RESERVE_OVERLAY_CHANNEL, while the other bitmaps are created without this flag. Now the bitmaps can be displayed by calling BView. SetViewOverlay () with the B_OVERLAY_TRANSFER_CHANNEL flag set.

The first option therefore implicitly requests the overlay hardware, while the second option explicitly does this. Because the second option so used in the process requires ownership of the hardware, the probability of success here will be greater than through the other option when multiple applications simultaneously try to start overlay rendering.

Note:
When the overlay channel is explicitly requested, it may only occur when the first bitmap is created. When attempting to create a later bitmap in the same way, this will fail because the overlay hardware is already busy.</p>

If a video card has more than one overlay unit, creating multiple bitmaps with the B_BITMAP_RESERVE_OVERLAY_CHANNEL flag can be successful. Playback will in principle then be done via different overlay units.
Cards with more than one single overlay unit (backend scaler) have not yet been spotted by the author.</p>

<a name="5.1.3></a>
<h5>5.1.3 B_OVERLAY_TRANSFER_CHANNEL</h5>

<p>This flag is special because it is not passed on to the accelerant, but is used to influence the behaviour of the app_server relative to the accelerant.

B_OVERLAY_TRANSFER_CHANNEL is used when calling BView. SetViewOverlay () to indicate that the overlay unit must switch to the new overlay bitmap that is given. 

Normally, during Dubbelgebufferde overlay display, the application toggles each frame between the different overlay bitmaps created beforehand. While a single buffer is displayed on the screen, another is refreshed in the background with new data. For only buffered overlay playback, this is not the case: the application will refresh the always displayed bitmap during the vertical retrace of the monitor.

This means that BView. SetViewOverlay () is invoked by the application only during Dubbelgebufferde video playback. For Enkelgebufferde playback, this is done once at the start of the playback.

For all the above applications, SetViewOverlay () is called with the B_OVERLAY_TRANSFER_CHANNEL flag. The flag owes its right to existence only to the internal functioning of the app_server.

The app_server can also independently call the accelerant function CONFIGURE_OVERLAY which is also used for the export of the BView. SetViewOverlay () API function. This is because the user can easily move or scale the Output window on the screen. In Such a case, the application will not be harassed to make adjustments, but the App_server will pass the new data independently to the accelerant.
Because the input bitmap does not have to be switched now (that is the responsibility of the application when the time is ripe), the B_OVERLAY_TRANSFER_CHANNEL flag is not used now.

Note:
There is another situation where calling the Accelerant function CONFIGURE_OVERLAY takes place with unused B_OVERLAY_TRANSFER_CHANNEL flag: This is an internal call from the MOVE_CURSOR function.
When the cursor moves outside the visible part of a virtual screen, the visible part of the screen is moved. Because the overlay unit relates its output to the visible screen (the CRTC buffer start address), the ' new output position ' of the overlay Output window should also be passed to the hardware. Also now does not have to be switched to another inputbitmap, so the B_OVERLAY_TRANSFER_CHANNEL is ' cleared '. As a result, the necessary calculations for the overlay unit can be performed faster because only part of the whole need to be refreshed.</p>

<a name="5.1.4"></a>
<h5>5.1.4 B_OVERLAY_MIRROR</h5>

<p>This flag can be used by the accelerant as a trigger to flip the overlay output horizontally when the hardware supports it. This feature can be useful when video is displayed through a projection screen with a mirror rather than a standard computer monitor. 
Output of this command in the accelerant is optional and it is probably (almost) never used.</p>

<a name="5.1.5"></a>
<h5>5.1.5 B_OVERLAY_FILTER_HORIZONTAL</h5>

<p>Via This flag an application can ask the accelerant to have the hardware filter (interpolate) during horizontal scaling of the overlay output. If the flag is not used, copying of pixels is applied to omhoogschalen, and pixels are "dropped" (dropped) during down scaling.
Implementing this flag in the accelerant is optional, but it is highly recommended. The image quality increases considerably when interpolation is applied.</p>

<a name="5.1.6"></a>
<h5>5.1.6 B_OVERLAY_FILTER_VERTICAL</h5>
<p>Via This flag an application can ask the accelerant to have the hardware filter (interpolate) during vertical scaling of the overlay output. If the flag is not used, copying of pixels is applied to omhoogschalen, and pixels are "dropped" (dropped) during down scaling.
Implementing this flag in the accelerant is optional, but it is highly recommended. The image quality increases considerably when interpolation is applied.</p>

<a name="5.2"></a>
<h4>5.2 Flags for Mode Setup: mode. Flags </h4>

<p>Mode. Flags are basically passed through applications through the API to the accelerant via BScreen. SetMode () or via BScreen. ProposeMode (). Via BScreen. GetMode () and BScreen. ProposeMode () They can also be retrieved again. The app_server itself also uses these flags for communication with the accelerant.
In the accelerant, the modes and thus the flags 1:1 are passed on to or from the SET_DISPLAY_MODE, PROPOSE_DISPLAY_MODE and GET_DISPLAY_MODE hooks.</p>

<a name="5.2.1"></a>
<h5>5.2.1 B_SUPPORTS_OVERLAYS</h5>

<p>Through this statusflag, the accelerant indicates whether the current Display_mode on the card supports hardware overlay. For example, Matrox maps does not support hardware overlay in interlaced modes.</p>

<a name="5.2.2"></a>
<h5>5.2.2 B_HARDWARE_CURSOR</h5>

<p>Via this status flag, the accelerant indicates whether the current Display_mode on the map supports a hardware cursor. Unfortunately, the app_server does not listen to this flag. If this were the case then it was possible to fall back on a software cursor when a display_mode would be switched which does not support a hard cursor.</p>

As it is now (BeOS R5) This choice can only be made during system start by either exporting the accelerant CURSOR hooks, as these hooks are only requested once by the App_server. When these hooks would be re-applied to the app_server after each mode switch, the ' on the fly ' switch between soft and hard cursor would also be possible.

Switching can be useful when a display_mode just cannot be created due to lack of card memory: The hardware cursorbitmap usually takes up a piece of this memory.</p>


<a name="5.2.3"></a>
</h5>5.2.3 B_IO_FB_NA</h5>

<p>This flag indicates that the video memory of the graphics card should not be used by the app_server when the card's acceleration engine could be engaged with it. This situation is likely to apply only to older cards.

B_IO_FB_NA and/or B_PARALLEL_ACCESS are likely to affect the operation of the API class BDirectWindow. BDirectWindow can basically be used in fullscreen mode and in windowed mode. In the Book, the function BDirectWindow. SupportsWindowMode () indicates that the availability of windowed mode depends on the graphics card hardware.
Mentioned as conditions for the usability of windowed mode are:
-Hardware cursor Support,
-DMA Support and
-Parallel access to the Kaarthardware.
</p>

<a name="5.2.4"></a>
<h5>5.2.4 B_PARALLEL_ACCESS</h5>

<p>B_PARALLEL_ACCESS indicates that parallel access to the map is allowed in the current display mode. Probably only a problem with older cards.

B_IO_FB_NA and/or B_PARALLEL_ACCESS are likely to affect the operation of the API class BDirectWindow. BDirectWindow can basically be used in fullscreen mode and in windowed mode. In the Book, the function BDirectWindow. SupportsWindowMode () indicates that the availability of windowed mode depends on the graphics card hardware.

Mentioned as conditions for the usability of windowed mode are:
-Hardware cursor Support,
-DMA Support and
-Parallel access to the Kaarthardware.
</p>

<a name="5.2.5"></a>
<h5>5.2.5 B_8_BIT_DAC</h5>

<p>This status flag indicates that the DAC is in 8-bit mode. This is again a somewhat vague flag in terms of definition. This flag should probably only be ' cleared ' with older cards.
  
In any case, the App_server does not use this flag to distinguish between cards with 3x6-bit wide palette RAM and 3x8-bit wide palette RAM. With and without this flag, the App_server will continue to use all 8-bits to create the B_CMAP8 colors pace colour palette.</p>

<a name="5.2.6></a>
<h5>5.2.6 B_DPMS</h5>

<p>This flag indicates that the current Display_mode supports DPMS. (DPMS stands for ' Display Power Management System ', used for energy-saving standby modes of the monitor when not in use.)5.2.7 B_SCROLL

According to the B_SCROLL, it indicates that a virtual screen is used: a large screen is simulated by the Rondscrollen in a smaller screen.
However, it seems (after testing done) that this flag must be set when the driver supports virtual screens in the current display_mode. This means that the flag must also be set when the current Display_mode itself does not (yet) propose a virtual screen!
This flag is sometimes passed to the API (R5): BWindowScreen. CanControlFrameBuffer () sometimes returns a FALSE status when this flag is not set! This means that BWindowScreen in this case cannot be used for virtual screens: the member functions SetFrameBuffer () and Move Display Area () will not work.

It is therefore wise to always put this flag when the driver is ' complete '.</p>

<a name="5.3"></a>
<h4>5.3 Flags for Mode Setup: mode. Timing. Flags</h4>

<p>Mode. Timing. Flags are basically passed through applications through the API to the accelerant via BScreen. SetMode () or via BScreen. ProposeMode (). Via BScreen. GetMode () and BScreen. ProposeMode () They can also be retrieved again. 
In the accelerant, the modes and thus the flags 1:1 are passed on to or from the SET_DISPLAY_MODE, PROPOSE_DISPLAY_MODE and GET_DISPLAY_MODE hooks.

Timing. Flags can be interpreted as command and status flags, depending on the requirements of the driver.</p>

<a name="5.3.1"></a>
<h5>5.3.1 B_BLANK_PEDESTAL</h5>

<p>This flag indicates that a ' 7.5 IRE blanking pedestal ' should be used instead of a ' 0.0 IRE blanking pedestal '. Usually, 0.0 IRE is used, and usually this is fixed in the driver. This flag is probably only needed for older monitors.

When the flag is set, it is intended that the video signal to the monitor in Spanningsnivo is lifted slightly compared to the synchronisation signal level. This is probably a tool for older (Sync_on_green) monitors to be able to reliably distinguish between video and timing signals.</p>

<a name="5.3.2"></a>
<h5>5.3.2 B_TIMING_INTERLACED</h5>

<p>If this flag is set, the driver is expected to setup the current Display_mode as interlaced mode. An interlaced mode is a mode in which a frame is split into two fields: an even and an odd field. These fields are displayed consecutively on the screen. As a result, a low signal bandwidth can still display a high resolution. A field contains only the odd or even horizontal ' scan lines ' of an image.

For example, interlaced playback is still applied to television, and to older VGA monitors. Most current video cards and monitors do not support interlaced modes anymore: Only progressive scan modes are used nowadays. Exception to this are TVout modes: these work in principle in interlaced mode because a TV set works with it. </p>

<a name="5.3.3"></a>
<h5>5.3.3 B_SYNC_ON_GREEN</h5>

<p>Sync_on_green indicates that the synchronization signals for the monitor superimposed should be sent on the green video signal, instead of via separate signal lines. Older monitors sometimes do not have separate synchronization inputs and therefore need this system.
As far as known, Sync_on_green monitors do not have DPMS support. It is likely that when Sync_on_green is activated for a card, DPMS is no longer supported. DMPS should therefore be disabled in the driver. For Matrox MGA Cards This applies in any case.

Sync_on_green is currently no longer used and is only supported in some older video cards. Matrox cards after the G200, for example, miss the necessary hardware, while the older cards do sync_on_green support.</p>

<a name="5.3.4"></a>
<h5>5.3.4 B_POSITIVE_HSYNC and B_POSITIVE_VSYNC</h5>

<p>With original VGA monitors and in original VGA modes, the polarity of the synchronization signals is used to indicate which resolution is active. Nowadays it no longer makes the monitors what polarity they are offered: they are adaptive in all timings-respects. For many modes, positive synchronisation signals are used today. 

The fashion list as it is exported by the accelerant contains both modes with negative and positive synchronization signals. This list is usually (partially) copied from the list as mentioned in the R4 Graphics Driver Kit.</p>

<a name="5.4"></a>
<h4>5.4 Conclusion</h5>

<p>The intended use of the video driver related flags is unfortunately not optimally documented in BeOS. This is why this document does not clearly indicate the exact function of each flag.

It is prudent to carry out further research in this area in order to achieve the best possible lack of information. What is undetectable must be respecified so that good use is possible in the future.

An interesting phenomenon in the implementation of the flags which are passed on to-or from the accelerant is that also the bit places who know no definition are passed on. In theory, these could be reset by the app_server to prevent undefined states.

Because the undefined bit places are passed unchanged, while applications and drivers in practice create the unused bit places neatly ' reset ', it is possible to set up their own extension in the flags. For example, the Matrox driver makes use of it to let applications know whether TVout and DualHead are supported on a map. In addition, the respective modes can be activated with other custom flags.

For extensions of the API and the driver interface, there are possibilities that can be used directly in the flag space. It would be nice if this were to be considered and a ' standard ' would be set up. If this does not happen, for example, there is a danger that each "with extensions" driver must have its own preferences application written.</p>
