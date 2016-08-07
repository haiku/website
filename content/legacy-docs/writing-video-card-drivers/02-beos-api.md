+++
type = "article"
title = "BeOS API Classes For Video Card Drivers"
date = "2010-05-26T02:15:37.000Z"
tags = []
+++

<h3>2 - BeOS API Classes For Video Card Drivers</h3>

<p>For normal use in BeOS the BScreen class from the Interface Kit is of great importance, because it is the main class that will control the driver. </p>

<p>For special application categories such as games or multimedia, there are two classes from the Game Kit that are important; BWindowScreen and BDirectWindow. These special classes are used to enable fast direct access to the graphics card memory (the framebuffer). </p>

<p>Last but not least we have the capability within BeOS to use hardware overlay for video playback use. For this function the classes Bview and Bbitmap are partly used. The part of these classes that apply to hardware overlay will be described here more thoroughly so a better understanding of how overlay works might be gained. Besides the BeBook is incomplete and unclear in this regard. So describing it here will have to do for now, until the BeBook can be updated.  (sorry ;-) </p>


<a name="2.1"></a>
<h4>2.1) BScreen (Interface Kit)</h4>
<p>The BScreen class is very important indeed, as it allows us to control the video card directly by:

<ul>
    <li>setting and calling of mode's (screen size, color depth, refresh rate and such)</li>
    <li>mode proposition can be done which is checked on feasibility by the driver. If necessary the driver can modify the proposed mode to something it actually is capable of doing</li>
    <li>in 8bit mode a colormap can be setup (from which a 24bit color can be extracted onto the screen)</li>
    <li>synchronization to the vertical retrace can be done (important when modifying the content of a screen to prevent glitches)</li>
    <li>calling information about the graphics card</li>
    <li>calling timing limitations</li>
    <li>DPMS states can be set and the current state can be requested (power-save feature of the monitor)</li>
</ul></p>


<a name="2.2"></a>
<h4>2.2 - BWindowsScreen (Game Kit)</h4>
<p>A BwindowScreen object sets up exclusive access to the entire screen (so no visible windows possible). The application using this object will circumvent the app_server. There is direct access to the driver, a display mode can be selected from a pre-defined list, and the driver's acceleration functions can be used, if available. The screenbuffer can be manipulated directly, while the mouse and keyboard remain under control of the app_server. </p>

<p>This class enables (among other things):
<ul>
    <li>scrolling and panning in virtual screens (the screenbuffer is bigger than the visible display) if 
        this is supported by the driver</li>
    <li>the accelerant hooks can be requested and therefore used (except the cursorhooks which are shielded here)</li>
    <li>information about the current modes can be requested</li>
</ul></p>


<a name="2.3"></a>
<h4>2.3 - BDirectWindows (Game Kit)</h4>
<p>The BdirectWindow class also gives applications direct access to the frame buffer of the graphics card. BDirectWindow can be used in both fullsceenspelling mode and in windowed mode however, while BwindowSreen only works in fullscreen mode. With BdirectWindow you can make a window that looks like any ordinary window, but the application can draw directly into the window by using it's direct access to the frame buffer. With normal windows this possibility doesn't exist as drawing into the window is handled by the BeOS API as required. </p>

<p>BdirectWindow can't do anything other than give the application access to the frame buffer. Even though setting a video mode for instance is not possible, the driver does have influence on the behaviour of the BDirectWindow class, which is why it is mentioned here. </p>

<p>In the BeBook the description of the function BDirectWindow.SupportsWindowMode() explains that windowed mode availability depends on the current hardware restrictions. </p>

<p>The listed prerequisites for windowed mode availability are:
<ul>
    <li>hardware cursor support</li>
    <li>DMA support</li>
    <li>Parallel access to the hardware</li>
</ul></p>

<p>The mode.flags <code>B_IO_FB_NA</code>, and <code>B_PARALLEL_ACCESS</code> most likely have influence on the operation of BdirectWindow. </p>


<a name="2.4"></a>
<h4>2.4 - Classes For Hardware Overlay: BBitmap (Interface Kit)</h4>
<p>A BBitmap is created to store data that will be used for display in a BView. In a BBitmap the memory can be directly manipulated, which means  the data can be drawn pixel by pixel directly into the bitmap: this is a quick way for display of video. When you construct a BBitmap, you also indicate what type the BBitmap will be: an overlay bitmap, or a normal bitmap. </p>

<p>An overlay bitmap is created directly in the video card's memory (outside the visible area, so outside the Desktop) via a function of the video card driver, whereas a normal bitmap is created in the main system memory. </p>

<p>The advantage of having a bitmap in the video card memory is that it does not have to be copied to be displayed. For example changing the pointer of the frame buffer to the BBitmap in graphics card memory is enough to allow the contents to be displayed. A bitmap in main system memory however must first be copied to the memory of the graphics card, with or without using DMA (Direct Memory Access), before it can be displayed.</p>

<p>It will be obvious that the choice of bitmap type used will have a huge impact on processor usage when displaying a picture, video, etc. </p>

<p>When a BBitmap is created the colorspace it will use has to be specified too. For normal bitmaps this will usually be the active colorspace used for the Desktop in the graphics card. So for example: B_CMAP8, B_RGB16 or B_RGB32(Intel architecture: little endian). Overlay bitmaps usually make use of B_YCbCr422 (registered as 'industry standard' colorspace YUY2 by NVidia(8)). It's supported by most graphics cards. Sometimes B_YCbCr411 is used for example as it has a higher compression factor (averaging less bits/pixel) and therefore a lower processor load. </p>

<p>In addition to scaling and interpolation (if desired), the overlay unit provides a colorspace conversion feature: it converts for example YUY2 to RGB. </p>

<p>There's one more nice thing about using overlay: Let's pretend you have a video file that you want to show using hardware overlay, but your desktop is in 8bit colorspace. Since the output from the overlay unit is not stored back in the video memory but gets directly sent to the graphics card's DAC (Digital to Analog Convertor) for display on your monitor, the output of the overlay unit can be (and always is) shown in 24bit color. So this does not depend on the Desktop colordepth you have chosen. </p>

<p>Upon creation the properties of an overlay BBitmap will be restricted to whatever limitations the graphicscard (driver) has for the current bitmap, which are listed as follows:
<ul>
    <li>a maximum and a minimum scaling factor for displaying the bitmap via an overlay window on the screen</li>
    <li>a minimal and maximum size of the bitmap</li>
    <li>a granularity value for the horizontal and vertical size of the bitmap<br />
        The size given to the bitmap must be divisible by this value. If the (already created) bitmap 
        does not respect the granularity needed by the graphics card hardware, the driver will 
        automatically create slopspace at the end of the bitmap so that it can support the requested 
        size anyway, while internally the modified (increased) size is used. The slopspace will not 
        be shown onscreen.
</li>
</ul></p>

<p>After a BBitmap is created, all this information (the overlay restrictions) can be retrieved from the BBitmap. Also the number of bytes per row used in the overlay bitmap can be retrieved from the BBitmap via a separate function. The returned value includes slopspace if that was created. </p>


<a name="2.5"></a>
<h4>2.5 - Classes For Hardware Overlay: BView (Interface Kit)</h4>
<p>BView is used for drawing in a BWindow. BView knows the following hardware overlay functions: SetViewOverlay() and ClearViewOverlay(). When an application desires to use hardware overlay and there is no overlay available, either due to the graphicscard not supporting it, or the driver not yet supporting it, the application can use SetViewBitmap() and ClearViewBitmap() in the same way instead. </p>

<p>SetViewOverlay() is used to switch on the overlay unit, and point it at a previous defined overlay bitmap that will be placed onscreen after it's scaled, filtered and colorspace converted. This function is also used to switch between different overlay bitmaps in case of double buffered playback (which uses three bitmaps). The bitmaps used may have different sizes and colorspaces. </p>

<p>With SetViewOverlay() it is also possible to show the entire input bitmap at once, or a small portion of it bigger by zooming that portion into the current BView. This concept is known as &quot;hardware zoom&quot;, and is quite useful for easily zooming into a section of a (moving) video image without taxing the processor. </p>

<p>The nice thing about using SetViewBitmap() if overlay is not available is that you can just as easily use hardware zooming here, only now it's done in software of course. This also will not tax the processor anymore than when it's not used.</p>

<p>After executing, SetViewOverlay() returns the application what is called a &quot;magic color&quot;, which is used as a color key to determine if the output from the overlay unit should be displayed on screen, or the 'locally' drawn content there. In BeOS this color key is one specific color that's used to let the graphics card hardware switch between overlay output (a video for instance) and the picture drawn in the visible area of the graphics card memory (a pull-down menu on top of the video for instance) as the source for the screen shown on the monitor. This implies that the color used as the key may not be used for normal drawings on the desktop or anything that's in it: otherwise a 'bleed though' effect will occur: even on other workspaces. At least within the coordinates that are used for the overlay output window, anyhow.</p>

<p>Normally the application draws the color key into the entire area of it's output window onscreen. If you take a normal screenshot (via the 'printscreen' keyboard key) you will capture the color key as this is what's drawn in the window or on the entire screen if using fullscreen mode for video.<br />
<small>(editor: need more info on this.) Hope this helps ;-)</small> </p>

<p>The color key value is decided by the app_server and is available to the driver and the application through the BeOS API. </p>

<p><code>ClearViewOverlay()</code> switches the overlay mechanism in the video card off. </p>


<a name="2.6"></a>
<h4>2.6 - Conclusion</h4>
<p>Be has clearly striven to make use of a graphics card driver plain and simple. This also shows because in fact only the most common functions built in graphics card hardware are supported. </p>

<p>After looking at the accelerant hooks and some hardware restrictions later on in this document it will become clear however that some functionality is lacking for good support of functions that are implemented in the API. </p>

<p>This can partly be explained by the fact that some functions are still incorporated experimentally in BeOS R5 such as hardware overlay functions and BWindowScreen. </p>

<p>This doesn't mean to say that the BeOS API hasn't achieved basic functionality, it just means there is more work yet to be done, especially in BWindowScreen. </p>

<p>Features such as functions for TV Out, Dualhead Support, and DDC (Display Data Channel, see: <a href="http://www.webopedia.com/TERM/D/DDC.html/" target="_blank">http://www.webopedia.com/TERM/D/DDC.html/</a>.) should be implemented. </p>

