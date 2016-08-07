+++
type = "article"
title = "Accelerant"
date = "2010-05-26T02:22:03.000Z"
tags = []
+++

<a name="4.0"></a>
<h3>4 - Accelerant</h3>
<p>The accelerant portion of the video card driver resides in user space. The accelerant makes available the necessary functions needed by the oprating system (app_server), and any applications, to control the video card. These functions could be merely informative in nature, or could be used to set refresh rate, display size, and so forth.</p>

<p>The separation of the video card driver into two components, a kernel driver component, and a user space accelerant, is done for a few different reasons:

<ul>
    <li><i>Speed</i>. With system memory holding mappings to the Input/Output of the video card, 
    we can use pointers to handle any I/O operations, without having to go through kernel space 
    to do so each time. Context-switching (twice per I/O) back and forth between kernel space and 
    user space costs a lot of time, especially if tens or even hundreds of registers need to be 
    accessed. <br />
    We can speed up operations by providing lists of registers from system memory, and therefore 
    limit the the number of context switches required.</li>

    <li><i>Stability</i>. A user space program can not crash the system, but a crash in kernel 
        space will spell trouble. If the accelerant component crashes, the app_server will no 
        longer be responsive and will usually die, but system services such as telnet and ftp 
        (run as daemons, really.) will still accept incoming connections, and allow you to 
        &quot;log in&quot; and still interact with the system. There would be at this point still 
        be a modicum of control allowing the user to tell the system to reboot gracefully, 
        transfer files, etc.</li>

    <li><i>Debugging</i>. By separating the code into two parts, we can more easily add features 
        to the driver over time, and see what impact our changes have on the system more easily. 
        If something goes wrong, it's far easier to narrow down the offending piece of code, then 
        wading through one gigantic set of code. Plus, it further refines the coding style, as it 
        were, in case other programmers take a peek at how things were done.</li>
</ul></p>

<p  align="center"><img src="/files/images/writing-video-card-drivers/4.accelerant.png" width="626" height="249" alt="Theoretical possible BeOS setup with multiple graphics cards."></p>


<a name="4.1"></a>
<h4>4.1 - The Hooks Of The Accelerant</h4>
<p>Hooks which are not implemented are not exported. The accelerant will return a nullpointer instead. Beware: except where pointed out, the hooks won't be requested again after a modeswitch!</p>

<p>When either of the two hooks B_INIT_ACCELERANT and B_CLONE_ACCELERANT are requested by the app_server, they are executed before any other hook can be requested. All other hooks are declared and assigned as per appointed variables during the accelerant initialization process and of course the availability of that function.</p>

<p>The BeOS R5 supported hooks are: <br />

<b>Initialization:</b>
<ul>
  <li>INIT_ACCELERANT</li>
  <li>CLONE_ACCELERANT</li>
  <li>ACCELERANT_CLONE_INFO_SIZE</li>
  <li>GET_ACCELERANT_CLONE_INFO</li>
  <li>UNINIT_ACCELERANT</li>
  <li>GET_ACCELERANT_DEVICE_INFO</li>
  <li>ACCELERANT_RETRACE_SEMAPHORE</li>
</ul><br />

<b>Mode configuration:</b>
<ul>
  <li>ACCELERANT_MODE_COUNT</li>
  <li>GET_MODE_LIST</li>
  <li>PROPOSE_DISPLAY_MODE</li>
  <li>SET_DISPLAY_MODE</li>
  <li>GET_DISPLAY_MODE</li>
  <li>GET_FRAME_BUFFER_CONFIG</li>
  <li>GET_PIXEL_CLOCK_LIMITS</li>
  <li>MOVE_DISPLAY</li>
  <li>SET_INDEXED_COLORS</li>
  <li>GET_TIMING_CONSTRAINTS</li>
</ul><br />

<b>Powersave functions:</b>
<ul>
  <li>DPMS_CAPABILITIES</li>
  <li>DPMS_MODE</li>
  <li>SET_DPMS_MODE</li>
</ul><br />

<b>Cursor management:</b><br />
<i>The cursor management hooks are only exported when the accelerant and the card support a hardware cursor.</i>
<ul>
  <li>SET_CURSOR_SHAPE</li>
  <li>MOVE_CURSOR</li>
  <li>SHOW_CURSOR</li>
</ul><br />

<b>Synchronization of the acceleration engine:</b>
<ul>
  <li>ACCELERANT_ENGINE_COUNT</li>
  <li>ACQUIRE_ENGINE</li>
  <li>RELEASE_ENGINE</li>
  <li>WAIT_ENGINE_IDLE</li>
  <li>GET_SYNC_TOKEN</li>
  <li>SYNC_TO_TOKEN</li>
</ul><br />

<b>2D acceleration:</b><br />
<i>The first four 2D hooks are used by the app_server. All hooks can be used by applications, such as BwindowScreen, for example.</i> <br />

The 2D hooks are requested by the app_server after every display_mode switch, and applications should do the same if they use them directly. This way, a different routine can be used to execute the acceleration function, depending on the architecture of the engine. <br />

It's possible that in another colourdepth a different setup is required. It's also possible NOT to execute the function by not returning a hook. It is expected of the app_server or application to do it by itself.
<ul>
  <li>SCREEN_TO_SCREEN_BLIT</li>
  <li>FILL_RECTANGLE</li>
  <li>INVERT_RECTANGLE</li>
  <li>FILL_SPAN</li>
  <li>SCREEN_TO_SCREEN_TRANSPARENT_BLIT</li>
  <li>SCREEN_TO_SCREEN_SCALED_FILTERED_BLIT</li>
</ul><br />

<b>Hardware overlay:</b><br />
<i>The following hooks are used for hardware overlay. Depending on the architecture of the engine different functions can be used in different colordepths. The overlay hooks below can be requested again after every modeswitch!</i> <br />

It's permitted to either export the hooks or not to export them. In this way the accelerant can tell you if hardware overlay is supported in that mode or on the card.

<ul>
  <li>OVERLAY_COUNT</li>
  <li>OVERLAY_SUPPORTED_SPACES</li>
  <li>OVERLAY_SUPPORTED_FEATURES</li>
  <li>ALLOCATE_OVERLAY_BUFFER</li>
  <li>RELEASE_OVERLAY_BUFFER</li>
  <li>GET_OVERLAY_CONSTRAINTS</li>
  <li>ALLOCATE_OVERLAY</li>
  <li>RELEASE_OVERLAY</li>
  <li>CONFIGURE_OVERLAY</li>
</ul>

The most important hooks will be discussed in the next section.</p>


<a name="4.1.1"></a>
<h5>4.1.1 - INIT_ACCELERANT</h5>
<p>This hook is called first. This hook will request the shared_info from the already loaded kernel driver and make a clone of it for its own use. If the kernel driver doesn't belong to the accelerant, it will be reported as such and stopped. If successful, the card will be initialized, and either a 'cold start' or 'hot start' will be executed. The video RAM location and visible framebuffer and cursor data is determined next. The needed semaphores are made, and all variables are initialized.</p>

<p>The accelerant creates a mode list of the available modes that the card supports. This list is made accessible through the shared_info structure. The maximum possible modes listed is integrated in the code of the accelerant, and is validated through the <code>PROPOSE_DISPLAY_MODE</code>. That means that a model is created for the currently controlled card. As such, the maximum DAC speed and the ammount of video RAM are of big influence for the supporting modes.</p>

<p>The app_server in BeOS requires that for each supported resolution in the BeOS screen preferences panel at least one mode is in the list. If the resolutions are not provided they will be greyed out. It's possible to have multiple modes per resolution, and they can have different colordepths, refresh rates, and monitor timings (different relative place and length of the horizontal and vertical sync signals).</p>

<p>The mode list can later be requested by a hook that will use it as a reference. In this way the app_server also can obtain the list.</p>

<p><b>Remarks:</b><br />
As stated in the R4 graphics driver kit, during the creation of the display_mode list in the internal function create_mode_list() two things have to be done different:

<ul>
  <li>Implicitly point out that some hardware needs a bigger pitch (distance between two lines) 
      to make a mode. The author says that it needs to be done with virtual_width. This is NOT 
      the case. The so called 'slopspace' as what they refer to has to be done with 
      <code>frame_buffer_config.bytes_per_row</code>. Only in this way will the app_server 
      correctly use the 'slopspace'. In other cases a virtual screen is created which can be 
      panned.</li>

  <li>Calling the <code>PROPOSE_DISPLAY_MODE</code> as pointed out isn't correct. While in the 
      correct way a margin is given to <code>PROPOSE_DISPLAY_MODE</code> for the asked for pixel 
      clock, it is not considered if the mode can be made within the given limits. Instead of 
      taking over the mode if <code>PROPOSE_DISPLAY_MODE</code> doesn't return a 
      <code>B_ERROR</code>, the mode only can be taken over if the function returns a 
      <code>B_OK</code> status.</li>
</ul></p>

<a name="4.1.2"></a>
<h5>4.1.2 - CLONE_ACCELERANT</h5>
<p>When the driver and accelerant is running and another application wants to load the accelerant, it must 
   be done through the <code>CLONE_ACCELERANT</code> hook. Because the card is already initialised there's 
   not much to be done.</p>

<p>First, the hook will open the kernel driver (for the 2nd or 3rd, etc). After this <code>SHARED_INFO</code> 
   is requested and cloned. After that the previously made list will be cloned as well.</p>


<a name="4.1.3"></a>
<h5>4.1.3 - UNINIT_ACCELERANT</h5>
<p>When the current accelerant is the original accelerant this function destroys the semaphores that the 
   accelerant uses, and also the cloned shared_info and mode_list. When it's a clone accelerant, the 
   cloned shared_info and mode_list will be destroyed and the kernel driver will be closed.</p>


<a name="4.1.4"></a>
<h5>4.1.4 - ACCELERANT_RETRACE_SEMAPHORE</h5>
<p>This hook only returns the semaphore that the kernel driver made for synching with the vertical retrace, 
   which is important for interference free displaying of video (as example). If there's a need for 
   synchronisation by an application, a semaphore lock is required. This will not succeed until the kernel 
   driver releases it during the retrace interupt routine.</p>


<a name="4.1.5"></a>
<h5>4.1.5 - ACCELERANT_MODE_COUNT &amp; GET_MODE_LIST</h5>
<p><code>ACCELERANT_MODE_COUNT</code> returns the number of modes that are in the <code>MODE_LIST</code> 
    (made during the 'original' accelerant initialization). The application (or app_server) which wants 
    requests the <code>MODE_LIST</code> has to allocate enough space for the accelerant to make a copy of 
    the list which is returned via <code>GET_MODE_LIST</code>.</p>

<a name="4.1.6"></a>
<h5>4.1.6 - PROPOSE_DISPLAY_MODE</h5>
<p></p>

<a name="4.1.7"></a>
<h5>4.1.7 - SET_DISPLAY_MODE</h5>
<p></p>


<a name="4.1.8"></a>
<h5>4.1.8 - GET_FRAME_BUFFER_CONFIG</h5>
<p></p>


<a name="4.1.9"></a>
<h5>4.1.9 - GET_PIXEL_CLOCK_LIMITS</h5>
<p></p>


<a name="4.1.10"></a>
<h5>4.1.10 - MOVE_DISPLAY</h5>
<p></p>


<a name="4.1.11"></a>
<h5>4.1.11 - SET_INDEXED_COLOR</h5>
<p></p>


<a name="4.1.12"></a>
<h5>4.1.12 - GET_TIMING_CONSTRAINTS</h5>
<p></p>


<a name="4.1.13"></a>
<h5>4.1.13 - SET_CURSOR_SHAPE</h5>
<p></p>


<a name="4.1.14"></a>
<h5>4.1.14 - MOVE_CURSOR</h5>
<p></p>


<a name="4.1.15"></a>
<h5>4.1.15 - 2D Accelerant Functions</h5>
<p></p>


<a name="4.1.16"></a>
<h5>4.1.16 - Hardware Overlay Functions</h5>
<p></p>


<a name="4.2"></a>
<h4>4.2 - Conclusion</h4>
<p></p>

