+++
type = "article"
title = "Appendix B: Glossary"
date = "2010-05-26T02:34:56.000Z"
tags = []
+++

<h3>Appendix B - Glossary</h3>


<a name="AGP"></a>
<h4>AGP</h4>
<p>AGP is an extension on the older PCI bus. AGP cards act like a PCI card from software perspective, and were introduced to remove various problems that PCI graphics cards had. AGP have a data bus of 32bits just like the standard PCI bus, but the clockspeed can be much higher. The standard AGP bus speed is 66Mhz whereas PCI is 33Mhz, in addition, the AGP bus can operate at 2x, 4x and 8x mode. Where PCI has a theoretically maximum transfer rate of 133Mbyte/sec, AGP in 1x mode starts at 266 Mbyte/sec, rising to a fast 2 Gbyte/sec in 8x mode. <br />
Furthermore AGP has direct access to the system memory, whereas the PCI bus is shared amonst all cards connected on it. The AGP port has its own dedicated controller as well. <br />
The AGP port is typically connected via the Northbridge controller in contrast to the PCI bus being connected by the Southbridge controller of the motherboard. The Northbridge controller is directly connected to the CPI and memory system, therefore much faster than the Southbridge controller which has to use a chipset specific and relatively slow bus which can be a speed bottleneck. </p>


<a name="API"></a>
<h4>API</h4>
<p>Application Programming Interface. The program interface which applications use, supplied by the operating system, to deal with hardware drivers. </p>


<a name="BackendScaler"></a>
<h4>Backend Scaler</h4>
<p>See <a href="#HardwareOverlay">Hardware Overlay</a>. </p>


<a name="ColdStartOfTheVideoCard"></a>
<h4>Cold start of the video card</h4>
<p>The VGA card is initialized at the "cold start" point in time; when it is first powered up. The type and volume of memory is set, the memory speed is set, the memory refresh rate is activated and the chip core speed is set. At the same moment all the needed hardware components on the card are activated. All of these actions are done once, during the cold start. </p>


<a name="Colorkey"></a>
<h4>Colorkey</h4>
<p>A colorkey is a specific color which the video card uses to show the output from the backend scalar, if the output of the video ram buffer is signed. This key value is a color defined in advance. Color keys are generally used by 'hardware overlay' features of the video card. </p>


<a name="CRTC"></p>
<h4>CRTC</h4>
<p>Cathode Ray Tube Controller. This is a group of registers in a logical unit inside the video card which takes control of the monitor bus at its expense. The place of the electronenstraal (ed: ??) and the speed of scanning the picture are controlled because of this. Synchronisation indicators is the means by which this control takes places. </p>


<a name="DAC"></a>
<h4>DAC</h4>
<p>Digital to Analog Converter. This is a graphic card function that takes digital information from video memory and delivers an analog signal. There are three DAC's in use: one for each basic color. The three signals are sent to the color monitor in various intensities, which produces the pattern being displayed on the screen. </p>


<a name="DDC"></a>
<h4>DDC</h4>
<p>Display Data Channel. A serial port in the VGA connector with which the properties of the monitor can be asked. Information such as the make and model of the monitor, the maximum and preferred resolution, the minimum and maximum refresh rates, and so forth can be requested. </p>


<a name="DirectX"></a>
<h4>DirectX</h4>
<p>Microsoft DirectX is a collection of application programming interfaces for handling tasks related to multimedia, especially game programming and video, on Microsoft platforms. Microsoft’s counterpart for the OpenGL standard. This standard is not open, and can only be used on Windows systems. Because Microsoft is so powerful, this ensures that most of the graphic card producers support DirectX. DirectX also supports features other than the mentioned 3D acceleration used for gaming, such as audio.</p>

<a name="DMA"></a>
<h4>DMA</h4>
<p>It is possible for several hardware components to access memory directly without passing through the CPU first, which allows the CPU to be occupied with other tasks. Most motherboards have two DMA controllers present for use by ISA cards, but this is no longer necessary for PCI (AGP) devices. Terwijl ISA kaarten daar soms gebruik van maken, is het voor PCI en AGP kaarten niet langer nodig. De PCI (AGP) controller combineert zelfstandig toegangsaanvragen tot aaneengesloten reeksen adressen zodat een soort vervangend DMA systeem ontstaat. Hiervoor is geen programmering nodig: het is in de hardware van de controller 'ingebakken' en gedraagt zich transparant. </p>

<a name="DoubleBuffering"></a>
<h4>Double Buffering</h4>
<p>While one buffer (filled with a picture) is presented on the screen, work on second buffer in the background can occur with another picture. During the vertical refresh period the buffers can be switched and the process repeats, making for very smooth on-screen updates. </p>


<a name="DPMS"></a>
<h4>DPMS</h4>
<p><a href="https://en.wikipedia.org/wiki/DPMS" target="_blank">Display Power Management System</a> (courtesy: <a href="http://www.wikipedia.org" target="_blank">Wikipedia</a>). Power management offer two important advantages: energy saving and lengthening of the life span of the monitor. </p>


<a name="DriverInterface"></a>
<h4>Driver Interface</h4>
<p>The combined software interface through the Operating System to the driver. </p>


<a name="Filters"></a>
<h4>Filters</h4>
<p>See <a href="#Interpolers">Interpolers</a>. </p>


<a name="GameKit"></a>
<h4>Game Kit</h4>
<p>Be, Inc. divided the BeOS API into kits in order to keep the system flexible. The Game Kit is one of these and provides an interface for game programmers to tap into. </p>


<a name="MemoryRefresh"></a>
<h4>Memory Refresh</h4>
<p>Because low-priced dynamic memory is used so heavily its contents must be refreshed on a regular basis. If this update does not occur often enough, the contents will disappear in only a few milliseconds, due to the low capactitor reserve. Memory refresh uses a small percentage of the address bus bandwidth to achieve this. </p>


<a name="Granularity"></a>
<h4>Granularity</h4>
<p>Stapgrootte. De granulariteit van een coordinaat is het grootste getal waardoor de coordinaat waarden deelbaar zijn zodat de uitkomst een geheel getal blijft. <br />
In videokaarten wordt de coordinaat gedeeld door de granulariteit als coordinaat-waarde in een register opgeslagen, waardoor deze granulariteit dus ontstaat.</p>


<a name="HardwareOverlay"></a>
<h4>Harware Overlay</h4>
<p>Een 'truc' methode om video goed te kunnen afspelen in computers zonder dat daarvoor enorm veel rekenkracht van de systeem processor nodig is. In het algemeen is het zo dat dingen die veel processorkracht kosten als ze in software zouden worden uitgevoerd, vaak in een stuk speciale hardware worden ondergebracht. <br />
Naarmate de processoren sneller worden, wordt de behoefte aan 'trucs' kleiner. In de praktijk wordt dit vaak bevorderd doordat minder hardware minder geld kost: Een bekend voorbeeld hiervan zijn de soft- of winmodems. </p>


<a name="Hook"></a>
<h4>Hook</h4>
<p>Een hook is een 'standaard entry point' voor software. Een aantal standaard routines wordt in de driver geimplementeerd. De ingang naar zo'n standaard routine is de hook. </p>


<a name="InterfaceKit"></a>
<h4>Interface Kit</h4>
<p>Be, Inc. divided the BeOS API into kits in order to keep the system flexible. The Interface Kit is one of these and provides an interface for various components of the Operating System such as buttons, sliders, menus, and more. </p>


<a name="InterlacedMode"></a>
<h4>Interlaced Mode</h4>
<p>The "screen" is divided into two "half" screens before it is shown on the monitor, consisting of "even" and "odd" fields. The "even" field consists of the even numbered horizontal scanlines, and the "odd" field consists of the intermediate scanlines. The original screen is shown in two steps. First the first half segment, and then the second. As both half fields are shown one after another, it is possible that they can be reordered, one after another. Mostly this is the case.<br />
Interlaced mode is used for the television system to save bandwidth. By showing just the half field the human eye sees a normal screen and so blinking is reduced. Older PC VGA cards and PC monitors used this method for the screen too, as this was chearper than the better progressive scan method. </p>


<a name="Interpolers"></a>
<h4>Interpolers</h4>
<p>Also known as 'Filters'. <br />
A pixel is interpolated when there is no effective information for it, derived from the (weighted) average of the previous and next pixels surrounding it. When this watered effect is present, it prevents sharp edges from forming in the picture. </p>


<a name="ISA"></a>
<h4>ISA</h4>
<p>Industry Standard Architecture. The ISA bus was the generally accepted standard before the introduction of the PCI bus. Older motherboard that have PCI systems do have some ISA buses still. The original ISA standard was used in older PC/XT computers and had an 8-bit databus, 64 kilobyte  Input/Output address space, and a speed of 8.333 MHZ.<br />
This bus was upgraded to a 16-bit databus when the 286 was introduced. A lot of PCI and even AGP cards are used within the ISA I/O space. the configuration then can be done with the help of the PCI configuration space. </p>


<a name="LittleEndian"></a>
<h4>Little Endian</h4>
<p>When a data string consists of more data than can be transmitted at once by the databus (or is bigger than the present memory) the string must be split into smaller parts for transmission one by one. Little Endian first transmits the most important parts. Big Endian does this the other way around. </p>


<a name="OpenGL"></a>
<h4>OpenGL</h4>
<p>SGI and the Khronos Group's open standard for 3D hardware acceleration. The OpenGL Registry contains specifications of the core API and shading language; specifications of Khronos- and vendor-approved OpenGL extensions; header files corresponding to the specifications; and related documentation including specifications, extensions, and headers for the GLX, WGL, and GLU APIs. Because this is an open standard, it makes it possible to be used by various platforms. </p>


<a name="OSD"></a>
<h4>OSD</h4>
<p>On Screen Display. Modern VGA monitors offer their controls via an OSD, such as the vertical and horizontal refresh rates, pixel speed, timing signals, and more. </p>


<a name="PCI"></a>
<h4>PCI</h4>
<p>Pheripheral Component Interconnect. See <a href="#AGP">AGP</a>. </p>


<a name="PCIConfigurationSpace"></a>
<h4>PCI Configuration Space</h4>
<p>PCI (AGP) kaarten hebben alle een aantal configuratie registers welke zich in de configuration space bevinden. <br />
Deze configuratie registers bepalen waar de eigenlijke resources van de kaart (zoals registers en video geheugen) op de  bus zullen verschijnen wanneer ze worden geactiveerd. <br />
Bij een systeemstart zijn alle kaarten gedeactiveerd: activatie vindt plaats nadat configuratie heeft plaatsgevonden. Activatie vind ook plaats via de configation space. Als een kaart gedeactiveerd is, is alleen de configuration space bereikbaar op een gestandariseerde manier. <br />
Voor nieuwere ISA kaarten bestaat een vergelijkbaar systeem: de PnP standaard. Oudere ISA kaarten zijn geconfigureerd via jumpers en zijn altijd geactiveerd. </p>


<a name="POST"></a>
<h4>POST</h4>
<p>Power On self test. Deze test wordt door elk moederbord verricht na het inschakelen van het systeem. De eigen componenten worden getest om te zien of het systeem in orde is. Naast de ouderwetse POST meldingen naar de ISA I/O space poort $80 worden tegenwoordig ook meldingen op het scherm gezet. Soms is een audio POST reporter ingebouwd. Een stem laat dan de resultaten van de POST horen. <br />

POST is een handig hulpmiddel om fouten in het moederbord op te sporen, hoewel meestal het geheel vervangen van het moederbord noodzakelijk geworden is door de hoge integratie van de componenten. </p>


<a name="ProgressiveScan"></a>
<h4>Progressive Scan</h4>
<p>Bij een (moderne) computermonitor wordt deze manier van scannen door de electronenstraal toegepast. Het volledige beeld ('frame' genoemd) wordt in keer van links-boven met horizontale lijnen naar rechts-onder afgebeeld in licht op de beeldbuis. Interlaced mode is het 'tegenovergestelde' van progressive scan.</p>


<a name="RefreshRate"></a>
<h4>Refresh Rate</h4>
<p>De refreshrate gebruikt in een display mode geeft aan hoe vaak per seconde het beeld op de monitor wordt ververst. <br />
Hoge refreshrates zijn populair omdat het resulterende beeld minder of in het geheel niet flikkert voor het menselijk oog. <br />
Het menselijk oog kan tot ongeveer 30 bewegende beelden per seconde zien flikkeren: Stilstaande beelden zoals op een computer gebruikt kan men zien flikkeren tot ongeveer 70 beelden per seconde: 70Hz. Refreshrates boven de 70 Hertz worden dan ook als ergonomisch beschouwd. <br />
Deze uitspraak geldt niet voor moderde (TFT) LCD schermen: die kunnen met 60Hz prima worden aangestuurd, omdat ze intern het beeld bufferen en continue aan de kijker laten zien. Er is dus een statisch beeld dat perfect stabiel is. </p>


<a name="ResourceMapping"></a>
<h4>Resource Mapping</h4>
<p>Beside I/O address space, it is also possible to use the registers aas if they are normal memory addresses. In this manner the registers can be used much faster, without the use of specific I/O commands (which normally would belong to the kernel of the OS). </p>


<a name="SingleBuffering"></a>
<h4>Single Buffering</h4>
<p>See also double buffering. Single buffering is only applied if not enough video card memory is available to create more than one hardware overlay bitmap as is often the case on laptops. Because single-buffering can also be used with the hardware overlay unit or backend scaler, a considerable gain is achieved in video quality and reduced CPU load.</p>


<a name="Slopspace"></a>
<h4>Slopspace</h4>
<p>If a coordinate value does not meet the granularity that is set, the coordinate value is rounded up so that the granularity is met. The difference between the requested and the obtained coordinate value is kept separately for reference for the actual used ' space '.</p>


<a name="TSR"></a>
<h4>TSR</h4>
<p>' Terminate and Stay Ready ' program. These types of programs often concern some kind of drivers for DOS. Sometimes in the DOS era, for example, the size of the BIOS ROM in video cards was not large enough to contain all the functions. Or later came updates that added functionality to the card. A TSR could then bring the result: for the user it seemed as if the BIOS was extended as soon as this file was loaded. In this way for example VBE 2 support could be added to VBE 1.2 compatible cards.</p>


<a name="UnifiedDriver"></a>
<h4>Unified Driver</h4>
<p>A driver that supports a whole series of video cards, usually placed on the market by the manufacturer. </p>


<a name="VBE"></a>
<h4>VBE</h4>
<p>VESA BIOS Extensions. In addition to the standard graphics and text modes present in the VGA BIOS, later graphical modes were introduced for modes that were not fitted with the VGA standard. In order to give application programmers easy access to these additional modes, a standard was conceived by the VESA organization which made this possible without the use of specific drivers for a card.

This new standard uses the so-called VGA BIOS INT10 (hex) Hook and conventions to activate the modes. Because the graphics cards could always have higher resolutions and colour depths, VBE also had to be extended regularly. Several versions of the VBE were created: 1.0, 1.2, 2.0 and nowadays 3.0.

Version 3.0 is the first version of VBE which allows the VBE modes to be implemented in protected mode in a usable way. For this, a special ' protected mode hook ' has been introduced, which (some of) the same modes can be set as possible via the old ' realmode ' hook: INT10.</p>


<a name="VCO"></a>
<h4>VCO</h4>
<p>Voltage controller oscillator. This is part of a PLL in the context of this document. It is a ' frequency source ', the frequency of which can be set by a number of registers (the ' divisors ' or ' scalers '). </p>


<a name="VerticalRetrace"></a>
<h4>Vertical Retrace</h4>
<p>When building an image on an image tube (CRT) monitor, a electronenstraal over the surface of the tube is moved at high speed, which creates the image. The CRT is ' scanned ' from left to right and from top to bottom with almost horizontal lines. When the beam is in the lower right hand side of the image, it is turned off and quickly sent to the top left of the screen.

This return action is the vertical retrace. During the vertical retrace no image points are generated (because the beam is off) so that the image can be swapped or disturbed without seeing it. The image is stable for the human eye because the image is always scanned quickly, and the image tube also has an after-glow time.
</p>


<a name="WarmStartOfTheVideoCard"></a>
<h4>Warm start of the video card</h4>
<p>The driver assumes that the card has already made a cold start. Only the required display mode is set, including the Pixelclock of the DAC. The typical cold start initialization is not done. Any necessary information collected by the VGA BIOS during the cold start, such as memory size, is read from map registers that were initialized during this cold start. Sometimes the required information can also be read (directly) from the VGA BIOS.

In the map BIOS, the data specified in the production can be predefined.
</p>


<a name="YCbCr411"></a>
<h4>YCbCr411</h4>
<p>See YCbCr422. In The colors pace YCbCr411, the brightness information is stored from each pixel (4 pixels viewed), while the color information is stored in one of the four pixels (1 from the 4 pixels viewed).</p>


<a name="YCbCr422"></a>
<h4>YCbCr422</h4>
<p>A colors pace with compression used to store video. Originally, the compression technique used was introduced for the colour television signal CVBS (composite Video Base band System) due to limited bandwidth of the existing transmitters and TV sets. The color information had to be sent in compatible mode.

In a TV set, the images are made up of three basic colours. Red (R), Green (G) and Blue (B). Red, green and blue mixed light produces the ' colour ' white when mixed in the right proportion. When these basic colours are mixed in the ratio that they deliver white, all shades of gray between black and white can be generated by variation of the joint intensity: the so-called luminance information ' Y '. The color information found in the basic colors is called chrominance: ' C '.

When one basic colour is missing but luminance is present, the missing base colour can be derived from the present information, for example: G = Y – R – B.

In YCbCr, the luminance Y, the blue base color Cb and the red base color Cr are present. This has been chosen because the human eye is more sensitive to clarity than to colours. In YCbCr422, the brightness information is stored for each pixel, (viewed by 4 pixels) but the two base colors only to the pixel (2 pixels in the viewed 4 pixels).

In this standard, compression is performed in one direction. Pixels immediately consecutively (from left to right) are executed. The pixels above and below are separate from the viewed ' row '. There are also colorspaces where the compression is performed two dimensional: this creates a higher compression.

A backend scaler of a video card can convert this type of colorspaces to ' standard ' RGB. Some scalers may choose to interpolate the color information for the ' missing pixels ', while other scalers can only duplicate pixels.
</p>

