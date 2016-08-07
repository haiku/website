+++
type = "article"
title = "Introduction"
date = "2010-05-26T02:06:32.000Z"
tags = []
+++

<h3>1 - Introduction</h3>
<p>The are a lot of programmers in the world but almost none of them know how to write a driver. Drivers are required for any operating system, in order to talk to the hardware. The lack of knowledgeable driver programmers is a serious problem, and one that I hope to rectify with this document. </p>

<p>This document offers practical support on this issue, and is written for people who are interested in knowing basic information about the makeup of a driver and how to write it. The basics of writing a video card driver will be explained here, along with directions to follow,  using the Be Operating System (BeOS henceforth) as our working environment. </p>

<p>Because most programmers do not have a lot of hardware knowledge, some explanation about hardware will be provided. Theory will be supported with examples, and the most important issues discussed thoroughly. <a href="/legacy-docs/writing-video-card-drivers/appendix-b-glossary">Appendix B</a> is a Glossary of common terms used throughout this document, which tries to explain as best as it can basic hardware terminology. </p>

<p>This document describes the various parts of a driver, and how these parts are woven into the BeOS. The layout and relationship of the Application Programming Interface (API henceforth) and the driver interface will be explained. To do this the API &quot;hooks&quot; will be explained for the various driver components. Finally the &quot;flag&quot; level of the driver interface will be explained in detail, as it has an important influence on the operation(s) of the API. </p>

<p>We will try to look from the perspective of a driver writer, so we'll provide more details about driver hooks than information about the API. An excellent reference to the BeOS API is <a href="/legacy-docs/bebook/index.html" target="_blank">The BeBook</a>. This document contains important supplemental information, because the BeBook is not complete enough regarding graphics card drivers. Some things are not described in the BeBook at all, while other things that are need extra explanation. </p>

<p>Modern graphics cards are built more or less on the VGA standard, and still have VGA modes built in. Because the VGA standard is still (patently) in affect, the documentation for old VGA standard cards is invaluable for writing video card drivers. A good reference is the &quot;<a href="http://www.amazon.com/exec/obidos/tg/detail/-/0201624907/" target="_blank">Programmer's Guide to the EGA and VGA Cards</a>&quot; (any edition). Technical information on PCI and AGP busses, and an example of a 2D accelerator card are described in &quot;<a href="http://www.amazon.com/exec/obidos/tg/detail/-/0201596164/" target="_blank">The Indispensable PC Hardware Book</a>&quot;. </p>

<p>Important to note is that this document does not claim to be 100% complete or accurate. It is impossible to know everything about drivers, hardware, or programming. Luckily it is not required to know everything in order to write a good graphics card driver. </p>

<p><b>The structure of this thesis:</b><br />
To explain the creation of graphics card drivers in BeOS as quickly as possible I chose the top-down approach. First some basic concepts will be explained, and then we will gradually go deeper into the more difficult material. The parts of the API that are relevant will be explained and after which the driver that lies deeper in the system will be described in detail. </p>

<p>When a video driver is written for BeOS, about 5% of the time will be spent on the kernel driver, the other 95% of the time on the accelerant. Therefore the major part of this thesis will be related to describing the accelerant. </p>

<p>In addition to the knowledge in the thesis for the reader, we will include a workable method (roadmap) for writing and testing video drivers in BeOS. When someone actually wants to write a video driver this will be a most important part of this document. The roadmap will point the reader to related, and more useful information that exists elsewhere in this document, when possible. </p>


<a name="1.1"></a>
<h4>1.1 - Problem Description</h4>
<p>It is difficult to write graphics card drivers. There is also not enough information available for BeOS to be able to build a good video driver without extra information. Because I still wanted to learn how to write such a driver, I invested a lot of time in researching all of the interfaces in BeOS needed of it and in the specific things that are important for the software in the hardware of the graphics card. </p>

<p>This took me at least twenty hours a week for two years. The better part was spent on research and testing because manufacturers of graphics cards release very little useful information. There were also a lot of tests needed to determine how the API and hooks work in detail inside of BeOS. </p>


<a name="1.2"></a>
<h4>1.2 - Thesis</h4>
<p>The knowledge I've collected is pretty specialized and is not known by a lot of other people (in the BeOS Community). The assignment is defined therefore as follows: <br />

The spreading of the knowledge acquired over the writing of graphics card drivers in the BeOS Community, and making a workable action plan available. </p>

<p><b>Knowledge transition.</b><br />
The thesis will be published on the internet. </p>


<a name="1.3"></a>
<h4>1.3 - About The Author</h4>
<p>From elementary school onwards I was a real &quot;technician&quot;. Once when I was ten, I found a broken transistor radio in the attic and as soon as I experimented with is I became hooked on electronics. </p>

<p>After I completed my studies in MTS and HTS electronics, I found out that my interest was shifting to &quot;information technology&quot;, This is a good thing, because as a electronics designer you get to work more and more with micro-controllers and PC's, while in the old days I was used to working with hardwired logic devices. Finally I wanted to learn more about computers and technical &quot;informatica&quot; to improve my knowledge base when working in the field in between electronics engineering and software engineering. </p>

<p>At this moment I am interested in the flip-side of PC's. This means that I want to work with peripherals like USB or PCI cards. But it is difficult for two reasons:
<ul>
    <li>The manufacturers of the equipment in effect hamper by giving no information about the 
        products they're making. Even the most basic information is hard to find.</li>
    <li>The writing of drivers is an area between electronics and &quot;information technology&quot; 
        which requires knowledge of both.</li>
</ul></p>

<p>Because this middle area is such a challenge for me I chose to get an education at the Hanzehogeschool Groningen in software engineering (HIO) to enhance my knowledge in the software field. </p>

<p>What are the upsides of education in regards to the electronics and information technology areas? 
<ul>
    <li><b>The technical side.</b><br />
        Especially the theory of the third year: everything surrounding JAVA. Not as a language but 
        as a tool to the explanation of different principles. Multi-threading and the use of semaphores 
        are everywhere in the system: even in drivers. Object oriented programming was also interesting 
        because application software (read: BeOS) is built like this.</li>

    <li><b>The Lowlevel side.</b><br />
        For drivers in general this kind of knowledge is important. An example would be for network 
        card drivers. The Networking and Communication course from the forth year was indispensable. 
        The knowledge of Intel x86 architecture did help, and was especially handy for reverse engineering.</li>
</ul></p>

<a name="1.4"></a>
<h4>1.4 - About BeOS</h4>
<p>BeOS stands for The &quot;Be Operating System&quot;, designed by Be Inc., which was housed in Menlo Park, California, USA. Be Inc. no longer exists as they were unable to get enough OS market share, and due to circumstances beyond their control related to Microsoft. </p>

<p>Many components of the BeOS can be found on <a href="http://www.bebits.com" target="_blank">BeBits</a>, an online file repository for all BeOS software. The company is &quot;kept alive&quot; while the ongoing lawsuit against Microsoft and possible positive financial results take their course, in the best interest of the shareholders. </p>

<p>BeOS is according to a lot of people a schoolbook example of an OS : straight to the point. Free of legacy problems. With a well thought out API. The best pieces of many different OS worlds have been put together into one easy to use operating system, specifically designed for  multimedia applications. Server functionality was not a top priority when BeOS was first designed, but with projects such as openBeOS, and Zeta from YellowTab, these issues could be resolved. The one key aspect of the BeOS that most people agree with is that it just works. No fuss no muss. Very consistant. </p>

<p>BeOS has a small but dedicated Community of people who hold dear the values that make up the OS. When Be Inc. sold the Intellectual Property of BeOS to Palm Inc in 2001, members of the BeOS Community decided to recreate an open source version of BeOS R5 Pro. The openBeOS project was born (after a time in finding of a new (licenced free) project name openBeOS was renamed to <a href="http://www.haiku-os.org" target="_blank">Haiku</a>). </p>

<p>The group did not have to start from scratch however, as some parts of the OS like Desktop and Tracker were previously open sourced by Be Inc. Separate from the openBeOS project are other commercial attempts to continue BeOS. <a href="http://www.yellowtab.com" target="_blank">YellowTab Inc.</a> is working on Zeta, a version of BeOS that would have been how BeOS R6 would have looked. Before the Be Inc. - Palm Inc. deal, YellowTab has arranged through a contract deal to license various parts of the operating system, and continue developing it. This frees them of any legalese from Palm Inc., and allows the ideas and concepts inherent in BeOS to live on commercially. </p>

<p>New drivers and applications must be developed. Most developers know how to build applications, but there are not enough that know how to create drivers. The holes have to be closed somehow. This is where a document like this might help. </p>


<a NAME="1.5"></a>
<h4>1.5 - About Video Card Drivers</h4>

<p><b>In general</b><br />
A driver is used by applications, and the OS itself, to allow access to the hardware. Drivers also sometimes incorporate complete functions for setup up (parts of) the hardware. Because drivers are sort of a part of the OS, reliability is a big factor for the stability of the system as a whole. </p>

<p>Drivers are for example used for:
<ul>
    <li>network cards</li>
    <li>sound cards</li>
    <li>modems</li>
    <li>keyboard and mouse</li>
    <li>graphics cards</li>
</ul></p>


<p>Because video works with enormous amounts of data in very short timespans (e.g. displaying moving pictures), graphics card drivers are a special breed of driver. </p>

<p>The underlying hardware is also kind of special: in this case among the add-on cards used in the computer. The PCI bus is a bottleneck as far as the video card is concerned, as it has low bandwidth available, hence the creation of the AGP bus. The single AGP slot is kind of an extended PCI slot. AGP has a higher bus speed, it can supply more power and more bandwidth to the card, is closer to the processor, has extra operating features, and has a dedicated controller. PCI slots usually have to share one single PCI controller which therefore limits the bandwidth available even further. </p>

<p><b>BeOS Video Drivers:</b><br />
Most drivers in BeOS consist of only one single file: the kernel driver. The video driver however consists of two parts: the kernel driver and the accelerant. </p>

<p>The kernel driver however is used to just give the accelerant access to the video card. On startup the accelerant gets as much resources from the kernel driver as is possible so that the accererant can use the many video features without actually using the kernel driver. The rest of the resources can easily be accessed through API functions of the kernel driver. This method has two upsides: speed, and stability because the kernel driver is not used very much. </p>

<p>Drivers for BeOS are largely written in the C language, as it is very close to the hardware, and is fast. Applications are written in C++ because object oriented programming and multithreading can be applied easily. </p>

<p>BeOS R5 supports the following display features:
<ul>
    <li>setting display modes</li>
    <li>hardware based scrolling and panning in virtual screens</li>
    <li>hardware based cursors</li>
    <li>hardware based 2d acceleration</li>
    <li>hardware overlay (motion video)</li>
</ul></p>

<p>Hardware 3D acceleration is not suported in BeOS R5, only software emulation of <a href="http://www.opengl.org/" target="_blank">openGL</a> is. (There are two commonly used 3D acceleration standards in the world: openGL is a standard that is used on different &quot;platforms&quot;, DirectX is a closed standard owned by Microsoft and used for 3D acceleration, etc. DirectX is only used in windows at this time.) Hardware acceleration with OpenGL was planned for BeOS R5 Pro/PE, but was delayed and eventually abandoned. </p>

<p>As a guideline for testing and determining how graphicscard drivers work, the BeOS R4 Graphics Driver Kit is used as a reference. Its the youngest known version of a description of graphicscard drivers by Be Inc. </p>

<p><b>Access To BeOS Graphics Card Drivers</b><br />
There are many ways to get access to (parts) of the graphics card in BeOS. This has been done to ensure the best speed and simplicity was reached. The picture below illustrates all of the different ways possible to access the hardware. </p>

<p align="center"><img src="/files/images/writing-video-card-drivers/1.5.access.png" width="626" height="251" alt="1.5 Access To BeOS Graphics Card Drives"></p>

<p>The usual way to gain access to graphics card hardware for applications or the application server is through the primary accelerant and the kernel driver. </p>

<p>For special applications there are different ways possible:
<ul>
    <li>An application can get direct access to the video memory via the classes BWindowScreen or BDirectWindow.</li>
    <li>An application can get direct access to the accelerant for 2D acceleration via BwindowScreen. (The application server shields some other functions however.)</li>
    <li>The application server (app_server) can get direct access to the video memory via the <code>frame_buffer_config</code> struct. This struct can be obtained with the hook GET_FRAME_BUFFER_CONFIG.</li>
    <li>The accelerant has direct access to the video memory and all mapped registers. For the accelerant this is the most commonly used method for direct access to the hardware. The kernel driver gives the accelerant the needed information for direct acces via the struct <code>shared_info</code>. This struct will be obtained by the accelerant when initialization is done via the kernel driver user hook &quot;control&quot;</li>
    <li>In addition to the above mentioned access to video memory and mapped registers the kernel driver also has access to I/O commands. With this the kernel driver can also access registers that can not be mapped. The possibilities to map certain registers is determined in the hardware.</li>
</ul></p>

<p>A different way an application can get access to the graphics card is via direct load of a &quot;private&quot; accelerant. When an accelerant for that card is already loaded, the application is provided with a &quot;clone&quot; accelerant. This clone has the same information as the original accelerant, therefore they can work next to each other using the same kernel driver. </p>

