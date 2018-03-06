+++
type = "article"
title = "Writing Video Card Drivers In BeOS"
date = "2010-05-26T02:02:46.000Z"
tags = []
+++

<h2>A Thesis By:</h2>
<p><strong>Rudolf Cornelissen</strong><br />
part-time student<br />
06 June 2003<br /></p>

<h2>Table Of Contents</h2>

<p>
<ol type="1">
    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/01-introduction">Introduction</a></font>
        <ol type="1.0" start="1">
            <li><a href="/legacy-docs/writing-video-card-drivers/01-introduction#1.1">Problem Description</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/01-introduction#1.2">Thesis</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/01-introduction#1.3">About The Author</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/01-introduction#1.4">About BeOS</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/01-introduction#1.5">About Video Card Drivers</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/02-beos-api">BeOS API Classes For Video Card Drivers</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.1">BScreen (Interface Kit)</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.2">BWindowsScreen (Game Kit)</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.3">BDirectWindows (Game Kit)</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.4">Classes For Hardware Overlay: BBitmap (Interface Kit)</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.5">Classes For Hardware Overlay: BView (Interface Kit)</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/02-beos-api#2.6">Conclusion</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver">Kernel Driver</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1">Interface To The OS</a></h4>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1.1">init_hardware()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1.2">init_driver()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1.3">publish_devices()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1.4">uninit_driver()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.1.5">find_device()</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2">Interface To The User</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.1">open_hook()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.2">close_hook()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.3">free_hook()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.4">control_hook()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.5">read_hook()</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.2.6">write_hook()</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/03-kernel-driver#3.3">Conclusion</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant">Accelerant</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1">The Hooks Of The Accelerant</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.1">INIT_ACCELERANT</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.2">CLONE_ACCELERANT</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.3">UNINIT_ACCELERANT</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.4">ACCELERANT_RETRACE_SEMAPHORE</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.5">ACCELERANT_MODE_COUNT &amp; 
                                                                            GET_MODE_LIST</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.6">PROPOSE_DISPLAY_MODE</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.7">SET_DISPLAY_MODE</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.8">GET_FRAME_BUFFER_CONFIG</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.9">GET_PIXEL_CLOCK_LIMITS</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.10">MOVE_DISPLAY</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.11">SET_INDEXED_COLOR</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.12">GET_TIMING_CONSTRAINTS</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.13">SET_CURSOR_SHAPE</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.14">MOVE_CURSOR</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.15">2D Accelerant Functions</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.1.16">Hardware Overlay Functions</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/04-accelerant#4.2">Conclusion</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/05-flags">Flags</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1">Flags For User Overlay</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.1">B_BITMAP_WILL_OVERLAY</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.2">B_BITMAP_RESERVE_OVERLAY_CHANNEL</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.3">B_OVERLAY_TRANSFER_CHANNEL</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.4">B_OVERLAY_MIRROR</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.5">B_OVERLAY_FILTER_HORIZONTAL</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.1.6">B_OVERLAY_FILTER_VERTICAL</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2">Flags For Mode Setup: Mode Flags</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.1">B_SUPPORTS_OVERLAYS</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.2">B_HARDWARE_CURSOR</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.3">B_IO_FB_NA</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.4">B_PARALLEL_ACCESS</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.5">B_8_BIT_DAC</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.6">B_DPMS</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.2.7">B_SCROLL</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.3">Flags For Mode Setup: Mode Timing Flags</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.3.1">B_BLANK_PEDESTAL</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.3.2">B_TIMING_INTERLACED</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.3.3">B_SYNC_ON_GREEN</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.3.4">B_POSITIVE_HSYNC &amp; 
                                                                       B_POSITIVE_VSYNC</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/05-flags#5.4">Conclusion</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver">Writing The Driver</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1">Action Plan</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.1">Preparations</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.2">Step 1: VBE2 (Vesa Mode) 
                                                                                    Activation</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.3">Step 2: Non-Active Driver 
                                                                                    Installation</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.4">Step 3: Hardware Cursor
                                                                                    Building</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.5">Step 4: Setting The Frame Buffer 
                                                                                    Start Address</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.6">Step 5: Setting The Frame Buffer 
                                                                                    Pitch</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.7">Step 6: Setting The Color 
                                                                                    Depth</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.8">Step 7: Setting The Color 
                                                                                    Pallete</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.9">Step 8: DPMS
                                                                                    Building</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.10">Step 9: Setting The Refresh 
                                                                                     Rate</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.11">Step 10: Setting The Monitor
                                                                                     Timing</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.12">Step 11: Switching On 
                                                                                    'Enhanced Mode'</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.13">Step 12: Setting The 
                                                                                     Acceleration</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.14">Step 13: Building Hardware 
                                                                                     Overlay</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.1.15">Step 14: Cold Start Of The 
                                                                                     Video Card</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.2">Testing The Driver</a>
                <ol>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.2.1">Kernel Driver</a></font></li>
                    <li><font size="-1"><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.2.2">Accelerant</a></font></li>
                </ol>
            </li><br />

            <li><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.3">Stability</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/06-writing-the-driver#6.4">Conclusion</a></li>
        </ol>
    </li><br />


    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/07-conclusion">Conclusion</a></font></li>
</ol>
</p>


<h2>Appendix</h2>
<p>
<ol type="A">
    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information">Sources Of Information</a></font>
        <ol>
            <li><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information#a.1">The Manufacturer</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information#a.2">Linux</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information#a.3">The Internet</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information#a.4">Testing For Specifications</a></li>
            <li><a href="/legacy-docs/writing-video-card-drivers/appendix-a-sources-of-information#a.5">Reverse Engineering</a></li>
        </ol>
    </li><br />

    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/appendix-b-glossary">Glossary</a></font></li>

    <li><font size="+1"><a href="/legacy-docs/writing-video-card-drivers/appendix-c-references">References</a></font></li>
</ol>
</p>